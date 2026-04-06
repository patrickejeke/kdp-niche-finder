import type { Category, Niche, Keyword, Trend, Competition, NicheFilters, NicheResponse, Stats } from '../types';

const categories: Category[] = [
  { id: 1, name: 'Pets', slug: 'pets', icon: 'paw-print', niche_count: 15 },
  { id: 2, name: 'Finance', slug: 'finance', icon: 'wallet', niche_count: 14 },
  { id: 3, name: 'Health', slug: 'health', icon: 'heart-pulse', niche_count: 13 },
  { id: 4, name: 'Business', slug: 'business', icon: 'briefcase', niche_count: 12 },
  { id: 5, name: 'Self-Help', slug: 'self-help', icon: 'brain', niche_count: 11 },
  { id: 6, name: 'Cooking', slug: 'cooking', icon: 'utensils', niche_count: 10 },
  { id: 7, name: 'Education', slug: 'education', icon: 'graduation-cap', niche_count: 10 },
  { id: 8, name: 'Hobbies', slug: 'hobbies', icon: 'palette', niche_count: 8 },
  { id: 9, name: 'Parenting', slug: 'parenting', icon: 'baby', niche_count: 7 },
  { id: 10, name: 'Crafts', slug: 'crafts', icon: 'scissors', niche_count: 5 }
];

const niches: Niche[] = [
  { id: 1, name: 'Senior Dog Care & Health', slug: 'senior-dog-care-health', category: 'Pets', subcategory: 'Dogs', description: 'Comprehensive guides for caring for aging dogs, including nutrition, exercise modifications, and common health issues.', opportunity_score: 87, competition_level: 'medium', competition_count: 234, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 2800, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 23.5, avg_reviews: 89, books_count: 234, keywords: '[]', created_at: '', updated_at: '' },
  { id: 2, name: 'Pet Anxiety & Separation Solutions', slug: 'pet-anxiety-separation-solutions', category: 'Pets', subcategory: 'Dogs', description: 'Training methods and products to help anxious pets cope with separation and environmental stressors.', opportunity_score: 92, competition_level: 'low', competition_count: 156, avg_rating: 4.1, avg_price: 12.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 31.2, avg_reviews: 67, books_count: 156, keywords: '[]', created_at: '', updated_at: '' },
  { id: 3, name: 'Exotic Pet Ownership Guide', slug: 'exotic-pet-ownership-guide', category: 'Pets', subcategory: 'Exotic', description: 'Care manuals for reptiles, amphibians, and small exotic mammals.', opportunity_score: 78, competition_level: 'low', competition_count: 89, avg_rating: 4.5, avg_price: 18.99, monthly_revenue_low: 1900, monthly_revenue_high: 4500, trend_direction: 'rising', trend_percentage: 18.7, avg_reviews: 45, books_count: 89, keywords: '[]', created_at: '', updated_at: '' },
  { id: 4, name: 'Cat Behavior Training', slug: 'cat-behavior-training', category: 'Pets', subcategory: 'Cats', description: 'Understanding and modifying cat behavior problems through positive reinforcement.', opportunity_score: 71, competition_level: 'medium', competition_count: 312, avg_rating: 4.2, avg_price: 11.99, monthly_revenue_low: 2100, monthly_revenue_high: 4800, trend_direction: 'stable', trend_percentage: 4.2, avg_reviews: 112, books_count: 312, keywords: '[]', created_at: '', updated_at: '' },
  { id: 5, name: 'FIRE Movement & Early Retirement', slug: 'fire-movement-early-retirement', category: 'Finance', subcategory: 'Investing', description: 'Financial independence retire early strategies including savings rates and investments.', opportunity_score: 94, competition_level: 'low', competition_count: 178, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 4200, monthly_revenue_high: 9800, trend_direction: 'rising', trend_percentage: 34.5, avg_reviews: 145, books_count: 178, keywords: '[]', created_at: '', updated_at: '' },
  { id: 6, name: 'Minimalist Budgeting for Millennials', slug: 'minimalist-budgeting-millennials', category: 'Finance', subcategory: 'Budgeting', description: 'Modern budgeting approaches for millennial values and lifestyle goals.', opportunity_score: 89, competition_level: 'low', competition_count: 134, avg_rating: 4.3, avg_price: 11.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 28.9, avg_reviews: 89, books_count: 134, keywords: '[]', created_at: '', updated_at: '' },
  { id: 7, name: 'Side Hustle Income Streams', slug: 'side-hustle-income-streams', category: 'Finance', subcategory: 'Income', description: 'Building additional income sources outside traditional employment.', opportunity_score: 86, competition_level: 'medium', competition_count: 345, avg_rating: 4.1, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 22.1, avg_reviews: 156, books_count: 345, keywords: '[]', created_at: '', updated_at: '' },
  { id: 8, name: 'Keto Diet for Athletes', slug: 'keto-diet-athletes', category: 'Health', subcategory: 'Diet', description: 'Optimizing athletic performance while maintaining ketosis.', opportunity_score: 88, competition_level: 'low', competition_count: 134, avg_rating: 4.3, avg_price: 16.99, monthly_revenue_low: 3200, monthly_revenue_high: 7400, trend_direction: 'rising', trend_percentage: 26.4, avg_reviews: 87, books_count: 134, keywords: '[]', created_at: '', updated_at: '' },
  { id: 9, name: 'Meditation for Anxiety Relief', slug: 'meditation-anxiety-relief', category: 'Health', subcategory: 'Mental Health', description: 'Guided meditation practices for managing anxiety and stress.', opportunity_score: 91, competition_level: 'medium', competition_count: 289, avg_rating: 4.4, avg_price: 12.99, monthly_revenue_low: 3600, monthly_revenue_high: 8300, trend_direction: 'rising', trend_percentage: 32.1, avg_reviews: 167, books_count: 289, keywords: '[]', created_at: '', updated_at: '' },
  { id: 10, name: 'Gut Health Protocol', slug: 'gut-health-protocol', category: 'Health', subcategory: 'Digestive', description: 'Improving digestive health through diet, probiotics, and lifestyle.', opportunity_score: 90, competition_level: 'low', competition_count: 156, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 29.7, avg_reviews: 98, books_count: 156, keywords: '[]', created_at: '', updated_at: '' },
  { id: 11, name: 'Overcoming Imposter Syndrome', slug: 'overcoming-imposter-syndrome', category: 'Self-Help', subcategory: 'Confidence', description: 'Breaking through self-doubt and owning your accomplishments.', opportunity_score: 93, competition_level: 'low', competition_count: 145, avg_rating: 4.5, avg_price: 13.99, monthly_revenue_low: 3800, monthly_revenue_high: 8800, trend_direction: 'rising', trend_percentage: 35.2, avg_reviews: 156, books_count: 145, keywords: '[]', created_at: '', updated_at: '' },
  { id: 12, name: 'Habit Stacking for Success', slug: 'habit-stacking-success', category: 'Self-Help', subcategory: 'Productivity', description: 'Building powerful routines by stacking new habits onto existing ones.', opportunity_score: 89, competition_level: 'medium', competition_count: 234, avg_rating: 4.4, avg_price: 12.99, monthly_revenue_low: 3300, monthly_revenue_high: 7600, trend_direction: 'rising', trend_percentage: 26.8, avg_reviews: 145, books_count: 234, keywords: '[]', created_at: '', updated_at: '' },
  { id: 13, name: 'Remote Work Productivity', slug: 'remote-work-productivity', category: 'Business', subcategory: 'Work', description: 'Thriving in remote work environments with systems for focus.', opportunity_score: 88, competition_level: 'medium', competition_count: 312, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 24.8, avg_reviews: 178, books_count: 312, keywords: '[]', created_at: '', updated_at: '' },
  { id: 14, name: 'Virtual Assistant Training', slug: 'virtual-assistant-training', category: 'Business', subcategory: 'Freelancing', description: 'Starting and growing a virtual assistant business.', opportunity_score: 86, competition_level: 'low', competition_count: 167, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 22.7, avg_reviews: 98, books_count: 167, keywords: '[]', created_at: '', updated_at: '' },
  { id: 15, name: 'Candle Making Business', slug: 'candle-making-business', category: 'Hobbies', subcategory: 'Craft Business', description: 'Starting a handcrafted candle business from home.', opportunity_score: 89, competition_level: 'low', competition_count: 134, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3200, monthly_revenue_high: 7400, trend_direction: 'rising', trend_percentage: 27.8, avg_reviews: 98, books_count: 134, keywords: '[]', created_at: '', updated_at: '' },
  { id: 16, name: 'Tantrum Management Toddlers', slug: 'tantrum-management-toddlers', category: 'Parenting', subcategory: 'Toddlers', description: 'Understanding and responding to toddler tantrums with compassion.', opportunity_score: 90, competition_level: 'medium', competition_count: 189, avg_rating: 4.5, avg_price: 13.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 30.2, avg_reviews: 145, books_count: 189, keywords: '[]', created_at: '', updated_at: '' },
  { id: 17, name: 'Teenage Mental Health Support', slug: 'teenage-mental-health-support', category: 'Parenting', subcategory: 'Teenagers', description: 'Helping teenagers navigate mental health challenges.', opportunity_score: 92, competition_level: 'low', competition_count: 112, avg_rating: 4.6, avg_price: 16.99, monthly_revenue_low: 3500, monthly_revenue_high: 8100, trend_direction: 'rising', trend_percentage: 33.6, avg_reviews: 89, books_count: 112, keywords: '[]', created_at: '', updated_at: '' },
  { id: 18, name: 'Keto Meal Prep Sunday', slug: 'keto-meal-prep-sunday', category: 'Cooking', subcategory: 'Meal Prep', description: 'Weekly meal prep strategies and recipes for maintaining ketosis.', opportunity_score: 86, competition_level: 'low', competition_count: 156, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 24.1, avg_reviews: 112, books_count: 156, keywords: '[]', created_at: '', updated_at: '' },
  { id: 19, name: 'ADHD Study Strategies', slug: 'adhd-study-strategies', category: 'Education', subcategory: 'Learning', description: 'Study techniques designed for students with ADHD.', opportunity_score: 90, competition_level: 'low', competition_count: 98, avg_rating: 4.6, avg_price: 14.99, monthly_revenue_low: 3300, monthly_revenue_high: 7600, trend_direction: 'rising', trend_percentage: 28.4, avg_reviews: 78, books_count: 98, keywords: '[]', created_at: '', updated_at: '' },
  { id: 20, name: 'Service Dog Training', slug: 'service-dog-training', category: 'Pets', subcategory: 'Dogs', description: 'Training protocols for owner-trained service dogs.', opportunity_score: 91, competition_level: 'low', competition_count: 45, avg_rating: 4.6, avg_price: 24.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 27.8, avg_reviews: 28, books_count: 45, keywords: '[]', created_at: '', updated_at: '' },
  { id: 21, name: 'Pinterest Marketing Strategy', slug: 'pinterest-marketing-strategy', category: 'Business', subcategory: 'Marketing', description: 'Driving traffic and sales through Pinterest.', opportunity_score: 87, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 3000, monthly_revenue_high: 7000, trend_direction: 'rising', trend_percentage: 28.3, avg_reviews: 78, books_count: 123, keywords: '[]', created_at: '', updated_at: '' },
  { id: 22, name: 'Decluttering Your Mind', slug: 'decluttering-your-mind', category: 'Self-Help', subcategory: 'Mental Health', description: 'Mental clarity techniques for reducing overthinking.', opportunity_score: 87, competition_level: 'low', competition_count: 156, avg_rating: 4.5, avg_price: 12.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 23.9, avg_reviews: 112, books_count: 156, keywords: '[]', created_at: '', updated_at: '' },
  { id: 23, name: 'Online Tutoring Business', slug: 'online-tutoring-business', category: 'Education', subcategory: 'Business', description: 'Starting and growing a profitable online tutoring practice.', opportunity_score: 88, competition_level: 'low', competition_count: 134, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 26.2, avg_reviews: 98, books_count: 134, keywords: '[]', created_at: '', updated_at: '' },
  { id: 24, name: 'Resin Art & Crafts', slug: 'resin-art-crafts', category: 'Hobbies', subcategory: 'Art', description: 'Creating stunning resin art pieces.', opportunity_score: 88, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 15.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 25.3, avg_reviews: 87, books_count: 123, keywords: '[]', created_at: '', updated_at: '' },
  { id: 25, name: 'Postpartum Recovery Guide', slug: 'postpartum-recovery-guide', category: 'Health', subcategory: "Women's Health", description: 'Physical and emotional recovery after childbirth.', opportunity_score: 89, competition_level: 'low', competition_count: 98, avg_rating: 4.7, avg_price: 14.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 23.6, avg_reviews: 72, books_count: 98, keywords: '[]', created_at: '', updated_at: '' }
];

const keywordsData: Record<number, Keyword[]> = {
  1: [
    { id: 1, niche_id: 1, keyword: 'senior dog care', search_volume: 18200, competition: 'medium', category: 'primary' },
    { id: 2, niche_id: 1, keyword: 'old dog health problems', search_volume: 12100, competition: 'low', category: 'primary' },
    { id: 3, niche_id: 1, keyword: 'best dog food for seniors', search_volume: 24600, competition: 'high', category: 'primary' }
  ],
  5: [
    { id: 4, niche_id: 5, keyword: 'fire movement', search_volume: 45000, competition: 'medium', category: 'primary' },
    { id: 5, niche_id: 5, keyword: 'financial independence retire early', search_volume: 38200, competition: 'medium', category: 'primary' },
    { id: 6, niche_id: 5, keyword: 'how to retire early', search_volume: 67800, competition: 'high', category: 'primary' }
  ],
  9: [
    { id: 7, niche_id: 9, keyword: 'meditation for anxiety', search_volume: 89000, competition: 'high', category: 'primary' },
    { id: 8, niche_id: 9, keyword: 'guided meditation anxiety', search_volume: 45600, competition: 'medium', category: 'primary' },
    { id: 9, niche_id: 9, keyword: 'breathing exercises anxiety', search_volume: 34200, competition: 'medium', category: 'primary' }
  ]
};

function generateTrends(nicheId: number, baseInterest: number): Trend[] {
  const months = ['2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];
  return months.map((month, i) => ({
    id: nicheId * 100 + i,
    niche_id: nicheId,
    month,
    books_published: Math.round(5 + Math.random() * 15),
    avg_price: 12.99 + Math.random() * 5,
    avg_rating: 4.0 + Math.random() * 0.6,
    search_interest: Math.max(10, Math.min(100, baseInterest + (i * 2) + Math.random() * 10))
  }));
}

function generateCompetition(nicheId: number, count: number): Competition[] {
  const authors = ['Sarah Mitchell', 'James Anderson', 'Emily Chen', 'Michael Roberts', 'Jennifer Lee'];
  return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
    id: nicheId * 1000 + i,
    niche_id: nicheId,
    title: `Complete Guide ${String.fromCharCode(65 + i)}`,
    author: authors[i % authors.length],
    rating: 3.5 + Math.random() * 1.5,
    reviews: Math.round(20 + Math.random() * 300),
    price: 7.99 + Math.random() * 15,
    categories: 'Category > Subcategory',
    published_date: `202${Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`
  }));
}

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function getNiches(filters: NicheFilters = {}): Promise<NicheResponse> {
  let filtered = [...niches];

  if (filters.category) {
    filtered = filtered.filter(n => n.category === filters.category);
  }
  if (filters.competition) {
    filtered = filtered.filter(n => n.competition_level === filters.competition);
  }
  if (filters.minScore) {
    filtered = filtered.filter(n => n.opportunity_score >= filters.minScore!);
  }
  if (filters.maxScore) {
    filtered = filtered.filter(n => n.opportunity_score <= filters.maxScore!);
  }
  if (filters.trend) {
    filtered = filtered.filter(n => n.trend_direction === filters.trend);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(n => 
      n.name.toLowerCase().includes(q) || 
      n.description.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    );
  }

  const sortField = filters.sort || 'opportunity_score';
  filtered.sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    return filters.order === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  return Promise.resolve({
    niches: filtered,
    total: filtered.length,
    limit: 50,
    offset: 0
  });
}

export async function getNiche(id: number): Promise<Niche | null> {
  return Promise.resolve(niches.find(n => n.id === id) || null);
}

export async function getNicheKeywords(id: number, _category?: string): Promise<Keyword[]> {
  return Promise.resolve(keywordsData[id] || []);
}

export async function getNicheTrends(id: number): Promise<Trend[]> {
  const niche = niches.find(n => n.id === id);
  return Promise.resolve(generateTrends(id, niche?.opportunity_score || 50));
}

export async function getNicheCompetition(id: number): Promise<Competition[]> {
  const niche = niches.find(n => n.id === id);
  return Promise.resolve(generateCompetition(id, Math.round((niche?.competition_count || 100) / 25)));
}

export async function searchNiches(query: string): Promise<Niche[]> {
  const q = query.toLowerCase();
  return Promise.resolve(
    niches.filter(n => 
      n.name.toLowerCase().includes(q) || 
      n.description.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    )
  );
}

export async function getStats(): Promise<Stats> {
  const totalNiches = niches.length;
  const avgScore = Math.round(niches.reduce((sum, n) => sum + n.opportunity_score, 0) / totalNiches);
  const risingNiches = niches.filter(n => n.trend_direction === 'rising').length;
  const lowCompetition = niches.filter(n => n.competition_level === 'low').length;
  
  const categoryGroups: Record<string, { count: number; totalScore: number }> = {};
  niches.forEach(n => {
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

  return Promise.resolve({
    totalNiches,
    avgScore,
    risingNiches,
    lowCompetition,
    topCategories
  });
}
