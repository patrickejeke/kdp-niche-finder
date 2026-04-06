import { useState, useEffect } from 'react';
import { 
  X, TrendingUp, TrendingDown, Minus, Star, BookOpen, DollarSign, 
  Users, Target, Copy, Check, Heart
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import type { Niche, Keyword, Trend, Competition } from '../types';
import { getNicheKeywords, getNicheTrends, getNicheCompetition } from '../services/api';

interface NicheModalProps {
  niche: Niche | null;
  onClose: () => void;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

type TabType = 'overview' | 'keywords' | 'trends' | 'competition';

export function NicheModal({ niche, onClose, onSave, isSaved }: NicheModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [competition, setCompetition] = useState<Competition[]>([]);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (niche) {
      Promise.all([
        getNicheKeywords(niche.id),
        getNicheTrends(niche.id),
        getNicheCompetition(niche.id)
      ]).then(([kw, tr, comp]) => {
        setKeywords(kw);
        setTrends(tr);
        setCompetition(comp);
      });
    }
  }, [niche]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!niche) return null;

  const copyKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-green-500';
    if (score >= 41) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1000) return `${(vol / 1000).toFixed(1)}k`;
    return vol.toString();
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'trends', label: 'Trends' },
    { id: 'competition', label: 'Competition' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-gray-700 text-blue-400 text-xs rounded">
              {niche.category}
            </span>
            <h2 className="font-semibold text-white">{niche.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            {onSave && (
              <button 
                onClick={() => onSave(niche.id)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Heart 
                  className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                {niche.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Target className="w-4 h-4" />
                    Opportunity Score
                  </div>
                  <div className={`text-2xl font-bold font-mono ${getScoreColor(niche.opportunity_score)}`}>
                    {niche.opportunity_score}
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <DollarSign className="w-4 h-4" />
                    Revenue/mo
                  </div>
                  <div className="text-xl font-bold font-mono text-green-500">
                    ${niche.monthly_revenue_low.toLocaleString()}-${niche.monthly_revenue_high.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Users className="w-4 h-4" />
                    Competition
                  </div>
                  <div className="text-xl font-bold font-mono capitalize">
                    {niche.competition_count.toLocaleString()} <span className="text-sm text-gray-400">{niche.competition_level}</span>
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <BookOpen className="w-4 h-4" />
                    Total Books
                  </div>
                  <div className="text-xl font-bold font-mono text-white">
                    {niche.books_count.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-2">Avg Price</div>
                  <div className="text-lg font-bold font-mono text-white">${niche.avg_price.toFixed(2)}</div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-2">Avg Rating</div>
                  <div className="text-lg font-bold font-mono text-yellow-500">
                    {niche.avg_rating.toFixed(1)} <Star className="inline w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-2">Trend</div>
                  <div className="flex items-center gap-1 text-lg font-bold">
                    {niche.trend_direction === 'rising' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : niche.trend_direction === 'declining' ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={niche.trend_direction === 'rising' ? 'text-green-500' : niche.trend_direction === 'declining' ? 'text-red-500' : 'text-gray-400'}>
                      {niche.trend_percentage > 0 ? '+' : ''}{niche.trend_percentage}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-2">Avg Reviews</div>
                  <div className="text-lg font-bold font-mono text-white">
                    {niche.avg_reviews.toLocaleString()}
                  </div>
                </div>
              </div>

              {keywords.slice(0, 5).length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3">Top Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.slice(0, 5).map((kw) => (
                      <span 
                        key={kw.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                      >
                        <span className="text-white">{kw.keyword}</span>
                        <span className="text-xs text-gray-400">{formatVolume(kw.search_volume)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {['primary', 'longtail', 'related'].map((cat) => {
                  const kws = keywords.filter(k => k.category === cat);
                  return (
                    <div key={cat}>
                      <h3 className="font-semibold text-white mb-3 capitalize">
                        {cat} Keywords ({kws.length})
                      </h3>
                      <div className="space-y-2">
                        {kws.map((kw) => (
                          <div 
                            key={kw.id}
                            className="flex items-center justify-between p-2 bg-gray-800 border border-gray-700 rounded-lg group"
                          >
                            <div>
                              <div className="text-sm text-white">{kw.keyword}</div>
                              <div className="text-xs text-gray-400">
                                {formatVolume(kw.search_volume)} searches/mo
                              </div>
                            </div>
                            <button
                              onClick={() => copyKeyword(kw.keyword)}
                              className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-700 transition-all"
                            >
                              {copiedKeyword === kw.keyword ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {keywords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3">Search Volume Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={keywords.slice(0, 12).map(k => ({ 
                          keyword: k.keyword.length > 15 ? k.keyword.slice(0, 15) + '...' : k.keyword,
                          volume: k.search_volume 
                        }))}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                        <XAxis type="number" stroke="#8b949e" fontSize={12} />
                        <YAxis dataKey="keyword" type="category" stroke="#8b949e" fontSize={11} width={120} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#161b22', 
                            border: '1px solid #30363d',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="volume" fill="#58a6ff" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'trends' && trends.length > 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Search Interest (12 Months)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#8b949e" 
                        fontSize={12}
                        tickFormatter={(v) => {
                          const [year, month] = v.split('-');
                          return `${month}/${year.slice(2)}`;
                        }}
                      />
                      <YAxis stroke="#8b949e" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#161b22', 
                          border: '1px solid #30363d',
                          borderRadius: '8px'
                        }}
                        labelFormatter={(v) => {
                          const [year, month] = v.split('-');
                          const date = new Date(parseInt(year), parseInt(month) - 1);
                          return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="search_interest" 
                        stroke="#58a6ff" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-3">Books Published per Month</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#8b949e" 
                          fontSize={12}
                          tickFormatter={(v) => v.split('-')[1]}
                        />
                        <YAxis stroke="#8b949e" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#161b22', 
                            border: '1px solid #30363d',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="books_published" fill="#3fb950" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">Category Health Score</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[
                        { metric: 'Opportunity', value: niche.opportunity_score },
                        { metric: 'Trend', value: Math.max(0, Math.min(100, 50 + niche.trend_percentage)) },
                        { metric: 'Competition', value: niche.competition_level === 'low' ? 85 : niche.competition_level === 'medium' ? 60 : 35 },
                        { metric: 'Rating', value: niche.avg_rating * 20 },
                        { metric: 'Revenue', value: (niche.monthly_revenue_high / 10000) * 100 },
                      ]}>
                        <PolarGrid stroke="#30363d" />
                        <PolarAngleAxis dataKey="metric" stroke="#8b949e" fontSize={12} />
                        <PolarRadiusAxis stroke="#8b949e" fontSize={10} domain={[0, 100]} />
                        <Radar 
                          name="Niche Score" 
                          dataKey="value" 
                          stroke="#58a6ff" 
                          fill="#58a6ff" 
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competition' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">
                  Top Competing Books ({competition.length})
                </h3>
                <div className="space-y-3">
                  {competition.map((comp, index) => (
                    <div 
                      key={comp.id}
                      className="flex items-center gap-4 p-3 bg-gray-800 border border-gray-700 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs font-mono text-gray-400">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white truncate">
                          {comp.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          by {comp.author} • {comp.categories}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-sm font-mono">{comp.rating}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {comp.reviews.toLocaleString()} reviews
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-mono text-green-500">
                          ${parseFloat(String(comp.price)).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {comp.published_date?.split('-')[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {competition.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3">Price Distribution</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={competition.map(c => ({ 
                          price: parseFloat(String(c.price)).toFixed(2),
                          count: 1
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                        <XAxis 
                          dataKey="price" 
                          stroke="#8b949e" 
                          fontSize={12}
                          tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis stroke="#8b949e" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#161b22', 
                            border: '1px solid #30363d',
                            borderRadius: '8px'
                          }}
                          formatter={(value, name) => [name === 'count' ? 'Book' : value, name]}
                        />
                        <Bar dataKey="count" fill="#a371f7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
