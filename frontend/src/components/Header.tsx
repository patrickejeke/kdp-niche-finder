import { Search, TrendingUp, BarChart3, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">KDP NicheFinder</h1>
              <p className="text-xs text-gray-400">Find Profitable Niches</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
              Research
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <TrendingUp className="w-4 h-4" />
              Trends
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </nav>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg border border-gray-600 transition-all">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
