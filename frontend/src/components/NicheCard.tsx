import { TrendingUp, TrendingDown, Minus, Star, BookOpen, DollarSign, Users, Heart } from 'lucide-react';
import type { Niche } from '../types';

interface NicheCardProps {
  niche: Niche;
  onClick: () => void;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

export function NicheCard({ niche, onClick, onSave, isSaved }: NicheCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 71) return 'badge-green';
    if (score >= 41) return 'badge-amber';
    return 'badge-red';
  };

  const getCompetitionColor = (level: string) => {
    if (level === 'low') return 'text-accent-green';
    if (level === 'medium') return 'text-accent-amber';
    return 'text-accent-red';
  };

  const getTrendIcon = () => {
    if (niche.trend_direction === 'rising') {
      return <TrendingUp className="w-4 h-4 text-accent-green" />;
    }
    if (niche.trend_direction === 'declining') {
      return <TrendingDown className="w-4 h-4 text-accent-red" />;
    }
    return <Minus className="w-4 h-4 text-text-secondary" />;
  };

  const formatRevenue = (low: number, high: number) => {
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
  };

  return (
    <div 
      className="card card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 bg-bg-tertiary text-accent-blue text-xs rounded mb-2">
              {niche.category}
            </span>
            <h3 className="font-semibold text-text-primary group-hover:text-accent-blue transition-colors line-clamp-2">
              {niche.name}
            </h3>
          </div>
          {onSave && (
            <button 
              className="p-1.5 rounded-lg hover:bg-bg-tertiary transition-colors ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onSave(niche.id);
              }}
            >
              <Heart 
                className={`w-4 h-4 ${isSaved ? 'fill-accent-red text-accent-red' : 'text-text-secondary'}`} 
              />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className={`badge ${getScoreColor(niche.opportunity_score)}`}>
            <span className="font-mono font-bold">{niche.opportunity_score}</span>
            <span>Score</span>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className="text-xs text-text-secondary">
              {niche.trend_percentage > 0 ? '+' : ''}{niche.trend_percentage}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-tertiary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-1">
              <Users className="w-3 h-3" />
              Competition
            </div>
            <div className={`font-mono font-semibold ${getCompetitionColor(niche.competition_level)}`}>
              {niche.competition_count.toLocaleString()}
            </div>
            <div className="text-xs text-text-secondary capitalize">{niche.competition_level}</div>
          </div>

          <div className="bg-bg-tertiary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              Revenue/mo
            </div>
            <div className="font-mono font-semibold text-accent-green text-sm">
              {formatRevenue(niche.monthly_revenue_low, niche.monthly_revenue_high)}
            </div>
          </div>

          <div className="bg-bg-tertiary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-1">
              <BookOpen className="w-3 h-3" />
              Books
            </div>
            <div className="font-mono font-semibold text-text-primary">
              {niche.books_count.toLocaleString()}
            </div>
          </div>

          <div className="bg-bg-tertiary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-1">
              <Star className="w-3 h-3" />
              Avg Rating
            </div>
            <div className="font-mono font-semibold text-accent-amber">
              {niche.avg_rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-bg-tertiary/30 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">
            ~{niche.avg_reviews} avg reviews
          </span>
          <span className="text-accent-blue font-medium">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export function NicheCardSkeleton() {
  return (
    <div className="card">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="skeleton h-5 w-20 mb-2" />
            <div className="skeleton h-6 w-full mb-1" />
            <div className="skeleton h-6 w-3/4" />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-5 w-20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-bg-tertiary/50 rounded-lg p-2.5">
              <div className="skeleton h-3 w-16 mb-2" />
              <div className="skeleton h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
