import React from 'react';
import { Trophy, Film, Star, Play, Sparkles, PhoneCall, Bot } from 'lucide-react';
import { EVENT_INFO } from '../data/categories';

interface HeaderHeroProps {
  totalCategories: number;
  onOpenGuide: () => void;
  onOpenCallAssistant: () => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({ totalCategories, onOpenGuide, onOpenCallAssistant }) => {
  return (
    <section id="hero" className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0E1017] to-[#0B0C10]">
      
      {/* Background Decorative Gold Radial Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-20 right-10 w-72 h-72 bg-amber-600/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Edition Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{EVENT_INFO.edition} • {EVENT_INFO.year}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          <span className="block">{EVENT_INFO.name}</span>
          <span className="gold-gradient-text mt-2 block font-serif">
            Nominados y Galardones {EVENT_INFO.year}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8">
          {EVENT_INFO.subtitle}. Descubre las {totalCategories} categorías oficiales, sus obras nominadas y interactúa en vivo con nuestra asistente de llamada con IA.
        </p>

        {/* Call Assistant Banner CTA */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenCallAssistant}
            className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-slate-950 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider opacity-80">Asistente Virtual de Voz</span>
              <span className="block font-black">Hablar con la IA en Vivo</span>
            </div>
          </button>
        </div>

        {/* Feature Pill Stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>14 Categorías Oficiales</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Llamadas en Vivo con Voz HD</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Play className="w-4 h-4 text-amber-400" />
            <span>Embed Responsive 16:9</span>
          </div>
        </div>

        {/* Call to action for code setup */}
        <div className="inline-flex items-center gap-3 p-1 pl-4 pr-2 rounded-full bg-slate-900/80 border border-amber-500/20 text-xs sm:text-sm text-slate-400">
          <span className="text-amber-400 font-mono font-medium">youtubeId: &apos;fmErhmOOLXU&apos;</span>
          <span className="hidden sm:inline">cargado en todas las categorías</span>
          <button
            onClick={onOpenGuide}
            className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Ver Instrucciones de Edición
          </button>
        </div>

      </div>
    </section>
  );
};
