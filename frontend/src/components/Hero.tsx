import { Zap, Clock, Target, TrendingUp } from 'lucide-react';
import { SearchInput } from './SearchInput';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function Hero({ onSearch, isLoading }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">25+ niches analyzed</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Find Profitable
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              KDP Niches
            </span>
            in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Stop spending 20+ hours researching. Get instant access to emerging categories 
            with low competition, high demand, and real revenue potential.
          </p>
          
          <SearchInput onSearch={onSearch} isLoading={isLoading} />
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Time Saved</div>
                <div className="text-sm font-semibold text-white">20+ hours</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg">
              <Target className="w-5 h-5 text-green-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Data Points</div>
                <div className="text-sm font-semibold text-white">50,000+</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Rising Niches</div>
                <div className="text-sm font-semibold text-white">Updated Daily</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg">
              <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Confidence Score</div>
                <div className="text-sm font-semibold text-white">Data-Driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
