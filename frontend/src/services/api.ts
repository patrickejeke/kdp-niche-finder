import type { Category, Niche, Keyword, Trend, Competition, NicheFilters, NicheResponse, Stats } from '../types';

const API_BASE = 'http://localhost:3001/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories');
}

export async function getNiches(filters: NicheFilters = {}): Promise<NicheResponse> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value));
    }
  });
  
  const queryString = params.toString();
  const endpoint = queryString ? `/niches?${queryString}` : '/niches';
  
  return fetchApi<NicheResponse>(endpoint);
}

export async function getNiche(id: number): Promise<Niche> {
  return fetchApi<Niche>(`/niches/${id}`);
}

export async function getNicheKeywords(id: number, category?: string): Promise<Keyword[]> {
  const endpoint = category 
    ? `/niches/${id}/keywords?category=${category}` 
    : `/niches/${id}/keywords`;
  return fetchApi<Keyword[]>(endpoint);
}

export async function getNicheTrends(id: number): Promise<Trend[]> {
  return fetchApi<Trend[]>(`/niches/${id}/trends`);
}

export async function getNicheCompetition(id: number): Promise<Competition[]> {
  return fetchApi<Competition[]>(`/niches/${id}/competition`);
}

export async function searchNiches(query: string): Promise<Niche[]> {
  return fetchApi<Niche[]>(`/search?q=${encodeURIComponent(query)}`);
}

export async function getStats(): Promise<Stats> {
  return fetchApi<Stats>('/stats');
}
