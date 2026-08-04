import React, { useState } from 'react';
import { X, Sparkles, Trophy, Check, Share2, Trash2, Award } from 'lucide-react';
import { Category } from '../types';

interface PredictionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedVotes: Record<string, string>; // categoryId -> nomineeId
  onResetVotes: () => void;
}

export const PredictionsDrawer: React.FC<PredictionsDrawerProps> = ({
  isOpen,
  onClose,
  categories,
  selectedVotes,
  onResetVotes,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen) return null;

  const votedCount = Object.keys(selectedVotes).length;

  const handleSharePredictions = () => {
    let summaryText = `🏆 MIS FAVORITOS - GALA DE PREMIOS 🏆\n\n`;
    
    categories.forEach((cat) => {
      const nomineeId = selectedVotes[cat.id];
      const nominee = cat.nominees.find((n) => n.id === nomineeId);
      if (nominee) {
        summaryText += `• ${cat.title}: ${nominee.name} (${nominee.workOrProject})\n`;
      }
    });

    summaryText += `\nVer lista oficial y muestras en video: ${window.location.href}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Mis Predicciones & Favoritos</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {votedCount} de {categories.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Tus elecciones personales guardadas para la gala
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {votedCount === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Award className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-medium">Aún no has seleccionado ningún favorito.</p>
              <p className="text-xs text-slate-500 mt-1">
                Haz clic sobre los nominados en cada una de las 14 categorías para registrarlos aquí.
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const nomineeId = selectedVotes[cat.id];
              const nominee = cat.nominees.find((n) => n.id === nomineeId);

              if (!nominee) return null;

              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      Categoría {String(cat.number).padStart(2, '0')} • {cat.title}
                    </span>
                    <span className="text-sm font-bold text-slate-100">
                      {nominee.name}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {nominee.workOrProject}
                    </span>
                  </div>

                  <span className="shrink-0 p-1.5 rounded-full bg-amber-500/10 text-amber-400">
                    <Check className="w-4 h-4" />
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
          {votedCount > 0 && (
            <button
              onClick={onResetVotes}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 text-xs transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Borrar elecciones</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {votedCount > 0 && (
              <button
                onClick={handleSharePredictions}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/20"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Lista Copiada!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copiar mis Favoritos</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
