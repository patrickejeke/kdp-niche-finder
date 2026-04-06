import { 
  PawPrint, Wallet, HeartPulse, Briefcase, Brain, 
  Utensils, GraduationCap, Palette, Baby, Scissors
} from 'lucide-react';
import type { Category } from '../types';

interface CategoryFiltersProps {
  categories: Category[];
  selected: string[];
  onSelect: (category: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  'paw-print': PawPrint,
  'wallet': Wallet,
  'heart-pulse': HeartPulse,
  'briefcase': Briefcase,
  'brain': Brain,
  'utensils': Utensils,
  'graduation-cap': GraduationCap,
  'palette': Palette,
  'baby': Baby,
  'scissors': Scissors,
};

export function CategoryFilters({ categories, selected, onSelect }: CategoryFiltersProps) {
  return (
    <section className="border-y border-gray-800 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm text-gray-400 shrink-0">Quick filters:</span>
          <div className="flex gap-2">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Palette;
              const isSelected = selected.includes(cat.name);
              
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelect(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 border border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
