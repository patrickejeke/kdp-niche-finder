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
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden sticky top-20">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-white">Filters</span>
            </div>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {stats && (
          <div className="p-4 border-b border-gray-700 bg-gray-700/30">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold font-mono text-blue-400">{stats.totalNiches}</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-green-400">{stats.risingNiches}</div>
                <div className="text-xs text-gray-400">Rising</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-yellow-400">{stats.lowCompetition}</div>
                <div className="text-xs text-gray-400">Low Comp</div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-400 mb-2">Competition Level</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleChange('competition', filters.competition === level ? undefined : level)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    filters.competition === level
                      ? level === 'low' ? 'bg-green-500/20 border-green-500 text-green-400'
                      : level === 'medium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Opportunity Score</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                min={0}
                max={100}
                value={filters.minScore || ''}
                onChange={(e) => handleChange('minScore', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                min={0}
                max={100}
                value={filters.maxScore || ''}
                onChange={(e) => handleChange('maxScore', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Trend Direction</label>
            <div className="flex gap-2">
              {(['rising', 'stable', 'declining'] as const).map((trend) => (
                <button
                  key={trend}
                  onClick={() => handleChange('trend', filters.trend === trend ? undefined : trend)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all capitalize ${
                    filters.trend === trend
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Revenue Potential (Monthly)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="$ Min"
                value={filters.minRevenue || ''}
                onChange={(e) => handleChange('minRevenue', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="$ Max"
                value={filters.maxRevenue || ''}
                onChange={(e) => handleChange('maxRevenue', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-700">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-400 hover:text-white transition-colors"
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
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
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
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Desc
                  </button>
                  <button
                    onClick={() => handleChange('order', 'asc')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      filters.order === 'asc'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700'
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
