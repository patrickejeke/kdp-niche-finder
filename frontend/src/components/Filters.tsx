import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import type { Category, NicheFilters } from '../types';

interface FiltersProps {
  categories: Category[];
  filters: NicheFilters;
  onFilterChange: (filters: NicheFilters) => void;
  stats?: {
    totalNiches: number;
    risingNiches: number;
    lowCompetition: number;
  };
}

export function Filters({ categories, filters, onFilterChange, stats }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof NicheFilters, value: string | number | undefined) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="card sticky top-20">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-accent-blue" />
              <span className="font-semibold text-text-primary">Filters</span>
            </div>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-xs text-accent-blue hover:text-accent-blue/80 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {stats && (
          <div className="p-4 border-b border-border bg-bg-tertiary/30">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold font-mono text-accent-blue">{stats.totalNiches}</div>
                <div className="text-xs text-text-secondary">Total</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-accent-green">{stats.risingNiches}</div>
                <div className="text-xs text-text-secondary">Rising</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-accent-amber">{stats.lowCompetition}</div>
                <div className="text-xs text-text-secondary">Low Comp</div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              className="input-field w-full text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.niche_count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Competition Level</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleChange('competition', filters.competition === level ? undefined : level)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    filters.competition === level
                      ? level === 'low' ? 'bg-accent-green/20 border-accent-green text-accent-green'
                      : level === 'medium' ? 'bg-accent-amber/20 border-accent-amber text-accent-amber'
                      : 'bg-accent-red/20 border-accent-red text-accent-red'
                      : 'bg-bg-tertiary border-border text-text-secondary hover:border-text-secondary'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Opportunity Score</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                min={0}
                max={100}
                value={filters.minScore || ''}
                onChange={(e) => handleChange('minScore', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field w-full text-sm font-mono"
              />
              <span className="text-text-secondary">-</span>
              <input
                type="number"
                placeholder="Max"
                min={0}
                max={100}
                value={filters.maxScore || ''}
                onChange={(e) => handleChange('maxScore', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field w-full text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Trend Direction</label>
            <div className="flex gap-2">
              {(['rising', 'stable', 'declining'] as const).map((trend) => (
                <button
                  key={trend}
                  onClick={() => handleChange('trend', filters.trend === trend ? undefined : trend)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all capitalize ${
                    filters.trend === trend
                      ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
                      : 'bg-bg-tertiary border-border text-text-secondary hover:border-text-secondary'
                  }`}
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Revenue Potential (Monthly)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="$ Min"
                value={filters.minRevenue || ''}
                onChange={(e) => handleChange('minRevenue', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field w-full text-sm font-mono"
              />
              <span className="text-text-secondary">-</span>
              <input
                type="number"
                placeholder="$ Max"
                value={filters.maxRevenue || ''}
                onChange={(e) => handleChange('maxRevenue', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field w-full text-sm font-mono"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <span>Sort By</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {isExpanded && (
              <div className="mt-3 space-y-2">
                {[
                  { value: 'opportunity_score', label: 'Opportunity Score' },
                  { value: 'monthly_revenue_high', label: 'Revenue Potential' },
                  { value: 'books_count', label: 'Book Count' },
                  { value: 'competition_count', label: 'Competition' },
                  { value: 'avg_rating', label: 'Avg Rating' },
                  { value: 'trend_percentage', label: 'Trend' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChange('sort', option.value as NicheFilters['sort'])}
                    className={`w-full px-3 py-2 text-sm text-left rounded-lg transition-colors ${
                      filters.sort === option.value
                        ? 'bg-accent-blue/20 text-accent-blue'
                        : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleChange('order', 'desc')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      filters.order !== 'asc'
                        ? 'bg-accent-blue/20 text-accent-blue'
                        : 'text-text-secondary hover:bg-bg-tertiary'
                    }`}
                  >
                    Desc
                  </button>
                  <button
                    onClick={() => handleChange('order', 'asc')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      filters.order === 'asc'
                        ? 'bg-accent-blue/20 text-accent-blue'
                        : 'text-text-secondary hover:bg-bg-tertiary'
                    }`}
                  >
                    Asc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
