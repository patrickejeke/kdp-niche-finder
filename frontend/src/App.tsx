import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilters } from './components/CategoryFilters';
import { NicheCard, NicheCardSkeleton } from './components/NicheCard';
import { Filters } from './components/Filters';
import { NicheModal } from './components/NicheModal';
import { getCategories, getNiches, getStats } from './services/api';
import type { Category, Niche, NicheFilters, Stats } from './types';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filters, setFilters] = useState<NicheFilters>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [savedNiches, setSavedNiches] = useState<number[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    Promise.all([getCategories(), getStats()]).then(([cats, st]) => {
      setCategories(cats);
      setStats(st);
    });
  }, []);

  useEffect(() => {
    const fetchNiches = async () => {
      setLoading(true);
      try {
        const activeFilters: NicheFilters = {
          ...filters,
          category: selectedCategories.length === 1 ? selectedCategories[0] : filters.category,
        };
        const response = await getNiches(activeFilters);
        setNiches(response.niches);
        setTotalResults(response.total);
      } catch (error) {
        console.error('Failed to fetch niches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNiches();
  }, [filters, selectedCategories]);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    setSelectedCategories([]);
    try {
      const response = await getNiches({ search: query, sort: 'opportunity_score', order: 'desc' });
      setNiches(response.niches);
      setTotalResults(response.total);
      setFilters({ search: query });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories([]);
      setFilters({ ...filters, category: undefined });
    } else {
      setSelectedCategories([category]);
      setFilters({ ...filters, category, search: undefined });
    }
  };

  const handleFilterChange = (newFilters: NicheFilters) => {
    setFilters(newFilters);
    setSelectedCategories([]);
  };

  const handleSaveNiche = (id: number) => {
    setSavedNiches((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const displayedNiches = useMemo(() => {
    if (selectedCategories.length > 1) {
      return niches.filter((n) => selectedCategories.includes(n.category));
    }
    return niches;
  }, [niches, selectedCategories]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <Hero onSearch={handleSearch} isLoading={searchLoading} />
      <CategoryFilters
        categories={categories}
        selected={selectedCategories}
        onSelect={handleCategorySelect}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Filters
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            stats={stats ? {
              totalNiches: stats.totalNiches,
              risingNiches: stats.risingNiches,
              lowCompetition: stats.lowCompetition,
            } : undefined}
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {filters.search ? `Results for "${filters.search}"` : 'All Niches'}
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {loading ? 'Analyzing...' : `${totalResults} niches found`}
                </p>
              </div>
              
              {selectedCategories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-stagger">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <NicheCardSkeleton key={i} />
                ))}
              </div>
            ) : displayedNiches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-stagger">
                {displayedNiches.map((niche) => (
                  <NicheCard
                    key={niche.id}
                    niche={niche}
                    onClick={() => setSelectedNiche(niche)}
                    onSave={handleSaveNiche}
                    isSaved={savedNiches.includes(niche.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No niches found</h3>
                <p className="text-text-secondary max-w-md mx-auto">
                  Try adjusting your filters or search for different interests.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm text-text-secondary">KDP NicheFinder</span>
            </div>
            <p className="text-sm text-text-secondary">
              Built for serious KDP publishers. Data simulated for demonstration.
            </p>
          </div>
        </div>
      </footer>

      <NicheModal
        niche={selectedNiche}
        onClose={() => setSelectedNiche(null)}
        onSave={handleSaveNiche}
        isSaved={selectedNiche ? savedNiches.includes(selectedNiche.id) : false}
      />
    </div>
  );
}

export default App;
