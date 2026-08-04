import React from 'react';
import { Award, HelpCircle, Trophy, Search, Sparkles, PhoneCall } from 'lucide-react';
import { EVENT_INFO } from '../data/categories';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenOrganizerGuide: () => void;
  userVotesCount: number;
  onOpenPredictions: () => void;
  onOpenCallAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenOrganizerGuide,
  userVotesCount,
  onOpenPredictions,
  onOpenCallAssistant,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo and Event Branding */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors">
                GALA DE PREMIOS
              </span>
              <span className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {EVENT_INFO.year}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">14 Categorías Oficiales</p>
          </div>
        </a>

        {/* Search Input */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar categoría o nominado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-amber-500/50 text-slate-200 text-xs sm:text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-amber-400"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* AI Call Assistant Button */}
          <button
            onClick={onOpenCallAssistant}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-105 transition-transform"
            title="Llamar a la Asistente Virtual con Inteligencia Artificial"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">Llamada IA</span>
          </button>

          {/* User Predictions Button */}
          <button
            onClick={onOpenPredictions}
            className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium transition-all hover:border-amber-400"
            title="Ver mis predicciones de ganadores"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Mis Favoritos</span>
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-xs">
              {userVotesCount}/14
            </span>
          </button>

          {/* Organizer Guide Helper Modal */}
          <button
            onClick={onOpenOrganizerGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-colors"
            title="Ver cómo cambiar los videos e información"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden lg:inline">Editar Videos</span>
          </button>

        </div>
      </div>
    </header>
  );
};
