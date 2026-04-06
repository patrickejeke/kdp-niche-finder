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
    if (score >= 71) return 'bg-green-500/20 text-green-400 border border-green-500/30';
    if (score >= 41) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  const getCompetitionColor = (level: string) => {
    if (level === 'low') return 'text-green-500';
    if (level === 'medium') return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrendIcon = () => {
    if (niche.trend_direction === 'rising') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    if (niche.trend_direction === 'declining') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const formatRevenue = (low: number, high: number) => {
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
  };

  return (
    <div 
      className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 bg-gray-700 text-blue-400 text-xs rounded mb-2">
              {niche.category}
            </span>
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {niche.name}
            </h3>
          </div>
          {onSave && (
            <button 
              className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onSave(niche.id);
              }}
            >
              <Heart 
                className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${getScoreColor(niche.opportunity_score)}`}>
            <span className="font-mono font-bold">{niche.opportunity_score}</span>
            <span className="text-xs opacity-80">Score</span>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className="text-xs text-gray-400">
              {niche.trend_percentage > 0 ? '+' : ''}{niche.trend_percentage}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Users className="w-3 h-3" />
              Competition
            </div>
            <div className={`font-mono font-semibold ${getCompetitionColor(niche.competition_level)}`}>
              {niche.competition_count.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 capitalize">{niche.competition_level}</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              Revenue/mo
            </div>
            <div className="font-mono font-semibold text-green-500 text-sm">
              {formatRevenue(niche.monthly_revenue_low, niche.monthly_revenue_high)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <BookOpen className="w-3 h-3" />
              Books
            </div>
            <div className="font-mono font-semibold text-white">
              {niche.books_count.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Star className="w-3 h-3" />
              Avg Rating
            </div>
            <div className="font-mono font-semibold text-yellow-500">
              {niche.avg_rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">
            ~{niche.avg_reviews} avg reviews
          </span>
          <span className="text-blue-500 font-medium">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export function NicheCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-5 w-20 bg-gray-800 rounded mb-2 animate-pulse" />
            <div className="h-6 w-full bg-gray-800 rounded mb-1 animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-2.5">
              <div className="h-3 w-16 bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-5 w-20 bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
