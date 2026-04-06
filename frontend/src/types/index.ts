export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  niche_count: number;
}

export interface Niche {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory: string | null;
  description: string;
  opportunity_score: number;
  competition_level: 'low' | 'medium' | 'high';
  competition_count: number;
  avg_rating: number;
  avg_price: number;
  monthly_revenue_low: number;
  monthly_revenue_high: number;
  trend_direction: 'rising' | 'stable' | 'declining';
  trend_percentage: number;
  avg_reviews: number;
  books_count: number;
  keywords: string;
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: number;
  niche_id: number;
  keyword: string;
  search_volume: number;
  competition: 'low' | 'medium' | 'high';
  category: 'primary' | 'longtail' | 'related';
}

export interface Trend {
  id: number;
  niche_id: number;
  month: string;
  books_published: number;
  avg_price: number;
  avg_rating: number;
  search_interest: number;
}

export interface Competition {
  id: number;
  niche_id: number;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  categories: string;
  published_date: string;
}

export interface NicheFilters {
  category?: string;
  competition?: 'low' | 'medium' | 'high';
  minScore?: number;
  maxScore?: number;
  minRevenue?: number;
  maxRevenue?: number;
  trend?: 'rising' | 'stable' | 'declining';
  search?: string;
  sort?: 'opportunity_score' | 'monthly_revenue_high' | 'books_count' | 'competition_count' | 'avg_rating' | 'trend_percentage';
  order?: 'asc' | 'desc';
}

export interface NicheResponse {
  niches: Niche[];
  total: number;
  limit: number;
  offset: number;
}

export interface Stats {
  totalNiches: number;
  avgScore: number;
  risingNiches: number;
  lowCompetition: number;
  topCategories: {
    category: string;
    count: number;
    avg_score: number;
  }[];
}
