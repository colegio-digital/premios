import React from 'react';
import { Category } from '../types';
import { Film, ChevronRight } from 'lucide-react';

interface CategoryNavMenuProps {
  categories: Category[];
  activeCategoryId?: string;
}

export const CategoryNavMenu: React.FC<CategoryNavMenuProps> = ({ categories, activeCategoryId }) => {
  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-b border-slate-800/80 py-3 px-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        
        {/* Label */}
        <div className="shrink-0 flex items-center gap-2 pr-3 border-r border-slate-800 text-xs font-semibold text-amber-400 tracking-wider uppercase">
          <Film className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Categorías:</span>
        </div>

        {/* Scrollable Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800'
                }`}
              >
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-amber-400'
                }`}>
                  {String(cat.number).padStart(2, '0')}
                </span>
                <span>{cat.title}</span>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
};
