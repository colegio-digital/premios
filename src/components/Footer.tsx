import React from 'react';
import { Trophy, Instagram, Twitter, Youtube, Facebook, Linkedin, Heart } from 'lucide-react';
import { EVENT_INFO } from '../data/categories';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
        
        {/* Event Brand Info */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base tracking-wide">
              {EVENT_INFO.name}
            </h3>
            <p className="text-xs text-slate-400">
              {EVENT_INFO.edition} • {EVENT_INFO.location}
            </p>
          </div>
        </div>

        {/* Decorative Social Media Icons */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 mr-2 hidden sm:inline">Síguenos:</span>
          
          <a
            href="#footer"
            onClick={(e) => e.preventDefault()}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200"
            title="Instagram (Decorativo)"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href="#footer"
            onClick={(e) => e.preventDefault()}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200"
            title="X / Twitter (Decorativo)"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <a
            href="#footer"
            onClick={(e) => e.preventDefault()}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200"
            title="YouTube (Decorativo)"
          >
            <Youtube className="w-4 h-4" />
          </a>

          <a
            href="#footer"
            onClick={(e) => e.preventDefault()}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200"
            title="Facebook (Decorativo)"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <a
            href="#footer"
            onClick={(e) => e.preventDefault()}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200"
            title="LinkedIn (Decorativo)"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
        <p>
          © {currentYear} {EVENT_INFO.name}. Todos los derechos reservados.
        </p>

        <p className="flex items-center gap-1">
          <span>Transmisión en vivo y muestra audiovisual HD</span>
        </p>
      </div>
    </footer>
  );
};
