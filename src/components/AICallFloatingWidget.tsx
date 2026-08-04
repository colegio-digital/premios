import React from 'react';
import { PhoneCall, Sparkles, Bot, Radio } from 'lucide-react';

interface AICallFloatingWidgetProps {
  onOpenCall: () => void;
}

export const AICallFloatingWidget: React.FC<AICallFloatingWidgetProps> = ({ onOpenCall }) => {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={onOpenCall}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-red-500/50 shadow-2xl hover:border-red-400 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Glowing Pulsating Outer Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 opacity-30 blur-md group-hover:opacity-60 transition-opacity animate-pulse" />

        <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-400 via-red-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-red-500/30 shrink-0">
          <PhoneCall className="w-5 h-5 animate-pulse text-slate-950" />
        </div>

        <div className="relative text-left pr-1 hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
              Llamar con IA
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-[10px] text-red-300 font-medium">
            Asistente de la Gala en Vivo
          </p>
        </div>
      </button>
    </div>
  );
};
