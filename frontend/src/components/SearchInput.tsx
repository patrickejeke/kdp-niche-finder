import { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import type { Niche } from '../types';
import { searchNiches } from '../services/api';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Niche[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          const results = await searchNiches(query);
          setSuggestions(results.slice(0, 6));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (niche: Niche) => {
    setQuery(niche.name);
    onSearch(niche.name);
    setShowSuggestions(false);
  };

  const clearInput = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Enter your interests (e.g., dog training, budgeting, keto diet)"
            className="w-full bg-bg-secondary border-2 border-border rounded-xl pl-12 pr-12 py-4 text-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue transition-colors"
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-bg-tertiary transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="mt-4 w-full btn-primary flex items-center justify-center gap-2 text-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
              Analyzing Markets...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Find Profitable Niches
            </>
          )}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {suggestions.map((niche) => (
            <button
              key={niche.id}
              onClick={() => handleSuggestionClick(niche)}
              className="w-full px-4 py-3 text-left hover:bg-bg-tertiary transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                  {niche.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {niche.category} • {niche.books_count.toLocaleString()} books
                </div>
              </div>
              <div className={`badge ${
                niche.opportunity_score >= 71 ? 'badge-green' : 
                niche.opportunity_score >= 41 ? 'badge-amber' : 'badge-red'
              }`}>
                {niche.opportunity_score}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-xs text-text-secondary">Popular:</span>
        {['Senior dog care', 'FIRE movement', 'Keto diet', 'Imposter syndrome'].map((term) => (
          <button
            key={term}
            onClick={() => {
              setQuery(term);
              onSearch(term);
            }}
            className="text-xs px-2 py-1 rounded-full bg-bg-tertiary text-text-secondary hover:text-accent-blue hover:bg-bg-tertiary/80 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
