import { Zap, Clock, Target, TrendingUp } from 'lucide-react';
import { SearchInput } from './SearchInput';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function Hero({ onSearch, isLoading }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-6">
            <Zap className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-accent-blue font-medium">100+ niches analyzed</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight">
            Find Profitable
            <span className="block bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              KDP Niches
            </span>
            in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Stop spending 20+ hours researching. Get instant access to emerging categories 
            with low competition, high demand, and real revenue potential.
          </p>
          
          <SearchInput onSearch={onSearch} isLoading={isLoading} />
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary/50 border border-border rounded-lg">
              <Clock className="w-5 h-5 text-accent-blue shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">Time Saved</div>
                <div className="text-sm font-semibold text-text-primary">20+ hours</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary/50 border border-border rounded-lg">
              <Target className="w-5 h-5 text-accent-green shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">Data Points</div>
                <div className="text-sm font-semibold text-text-primary">50,000+</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary/50 border border-border rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent-amber shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">Rising Niches</div>
                <div className="text-sm font-semibold text-text-primary">Updated Daily</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary/50 border border-border rounded-lg">
              <Zap className="w-5 h-5 text-accent-purple shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">Confidence Score</div>
                <div className="text-sm font-semibold text-text-primary">Data-Driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
