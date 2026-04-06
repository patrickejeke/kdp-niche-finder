import express from 'express';
import cors from 'cors';
import { db, initDatabase } from './database.js';

initDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/categories', (req, res) => {
  try {
    res.json(db.data.categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/niches', (req, res) => {
  try {
    const { 
      category, 
      competition, 
      minScore, 
      maxScore, 
      minRevenue, 
      maxRevenue, 
      trend,
      search,
      sort = 'opportunity_score',
      order = 'desc',
      limit = 50,
      offset = 0
    } = req.query;

    let niches = [...db.data.niches];

    if (category) {
      niches = niches.filter(n => n.category === category);
    }

    if (competition) {
      niches = niches.filter(n => n.competition_level === competition);
    }

    if (minScore) {
      niches = niches.filter(n => n.opportunity_score >= parseInt(minScore));
    }

    if (maxScore) {
      niches = niches.filter(n => n.opportunity_score <= parseInt(maxScore));
    }

    if (minRevenue) {
      niches = niches.filter(n => n.monthly_revenue_high >= parseInt(minRevenue));
    }

    if (maxRevenue) {
      niches = niches.filter(n => n.monthly_revenue_low <= parseInt(maxRevenue));
    }

    if (trend) {
      niches = niches.filter(n => n.trend_direction === trend);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      niches = niches.filter(n => 
        n.name.toLowerCase().includes(searchLower) || 
        n.description.toLowerCase().includes(searchLower) ||
        n.category.toLowerCase().includes(searchLower) ||
        (n.subcategory && n.subcategory.toLowerCase().includes(searchLower))
      );
    }

    const validSorts = ['opportunity_score', 'monthly_revenue_high', 'books_count', 'competition_count', 'avg_rating', 'trend_percentage'];
    const sortField = validSorts.includes(sort) ? sort : 'opportunity_score';
    
    niches.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    const total = niches.length;
    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);
    niches = niches.slice(offsetNum, offsetNum + limitNum);

    res.json({
      niches,
      total,
      limit: limitNum,
      offset: offsetNum
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/niches/:id', (req, res) => {
  try {
    const niche = db.data.niches.find(n => n.id === parseInt(req.params.id));
    
    if (!niche) {
      return res.status(404).json({ error: 'Niche not found' });
    }

    res.json(niche);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/niches/:id/keywords', (req, res) => {
  try {
    const { category } = req.query;
    let keywords = db.data.keywords.filter(k => k.niche_id === parseInt(req.params.id));

    if (category) {
      keywords = keywords.filter(k => k.category === category);
    }

    keywords.sort((a, b) => b.search_volume - a.search_volume);
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/niches/:id/trends', (req, res) => {
  try {
    const trends = db.data.trends
      .filter(t => t.niche_id === parseInt(req.params.id))
      .sort((a, b) => a.month.localeCompare(b.month));
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/niches/:id/competition', (req, res) => {
  try {
    const competition = db.data.competition
      .filter(c => c.niche_id === parseInt(req.params.id))
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 20);
    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const searchLower = q.toLowerCase();
    const niches = db.data.niches
      .filter(n => 
        n.name.toLowerCase().includes(searchLower) || 
        n.description.toLowerCase().includes(searchLower) ||
        n.category.toLowerCase().includes(searchLower)
      )
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 20);

    res.json(niches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const totalNiches = db.data.niches.length;
    const avgScore = Math.round(db.data.niches.reduce((sum, n) => sum + n.opportunity_score, 0) / totalNiches);
    const risingNiches = db.data.niches.filter(n => n.trend_direction === 'rising').length;
    const lowCompetition = db.data.niches.filter(n => n.competition_level === 'low').length;
    
    const categoryGroups = {};
    db.data.niches.forEach(n => {
      if (!categoryGroups[n.category]) {
        categoryGroups[n.category] = { count: 0, totalScore: 0 };
      }
      categoryGroups[n.category].count++;
      categoryGroups[n.category].totalScore += n.opportunity_score;
    });

    const topCategories = Object.entries(categoryGroups)
      .map(([category, data]) => ({
        category,
        count: data.count,
        avg_score: Math.round(data.totalScore / data.count)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    res.json({
      totalNiches,
      avgScore,
      risingNiches,
      lowCompetition,
      topCategories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`KDP NicheFinder API running on port ${PORT}`);
});
