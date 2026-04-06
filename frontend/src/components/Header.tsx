import { Search, TrendingUp, BarChart3, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary">KDP NicheFinder</h1>
              <p className="text-xs text-text-secondary">Find Profitable Niches</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <Search className="w-4 h-4" />
              Research
            </button>
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <TrendingUp className="w-4 h-4" />
              Trends
            </button>
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </nav>
          
          <button className="btn-secondary text-sm">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
