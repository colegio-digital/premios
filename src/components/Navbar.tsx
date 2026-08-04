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
    <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-blue-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo and Event Branding */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors">
                GALA DE PREMIOS
              </span>
              <span className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {EVENT_INFO.year}
              </span>
            </div>
            <p className="text-xs text-blue-300/80 hidden sm:block">14 Categorías Oficiales</p>
          </div>
        </a>

        {/* Search Input */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/70" />
            <input
              type="text"
              placeholder="Buscar categoría o nominado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500/50 text-blue-100 text-xs sm:text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-blue-300/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:text-blue-200"
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
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:scale-105 transition-transform"
            title="Llamar a la Asistente Virtual con Inteligencia Artificial"
          >
            <PhoneCall className="w-4 h-4 animate-pulse text-slate-950" />
            <span className="hidden sm:inline">Llamada IA</span>
          </button>

          {/* User Predictions Button */}
          <button
            onClick={onOpenPredictions}
            className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium transition-all hover:border-blue-400"
            title="Ver mis predicciones de ganadores"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Mis Favoritos</span>
            <span className="bg-blue-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-xs">
              {userVotesCount}/14
            </span>
          </button>

          {/* Organizer Guide Helper Modal */}
          <button
            onClick={onOpenOrganizerGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-colors"
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
