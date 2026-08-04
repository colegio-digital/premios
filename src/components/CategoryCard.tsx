import React, { useState } from 'react';
import { Category, Nominee } from '../types';
import { Play, Award, CheckCircle2, Star, Share2, Copy, Check, Info, Code2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  selectedNomineeId?: string;
  onSelectNominee: (categoryId: string, nomineeId: string) => void;
  onOpenGuideForCategory: (categoryNumber: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  selectedNomineeId,
  onSelectNominee,
  onOpenGuideForCategory,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Construct YouTube Embed URL
  const embedUrl = `https://www.youtube-nocookie.com/embed/${category.youtubeId}?rel=0&modestbranding=1`;

  const handleCopyCategoryLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${category.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article
      id={category.id}
      className="scroll-mt-36 group relative bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 sm:p-7 gold-card-hover overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-500/5 blur-3xl pointer-events-none rounded-full group-hover:bg-red-500/10 transition-colors" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Categoría {String(category.number).padStart(2, '0')} / 14
            </span>
            <span className="text-xs text-red-300/60 font-mono">
              ID: {category.youtubeId}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-red-100">{category.title}</span>
          </h2>
          <p className="text-sm text-red-200/90 mt-1 max-w-3xl">
            {category.description}
          </p>
        </div>

        {/* Quick Helper Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenGuideForCategory(category.number)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-red-200 hover:text-red-100 text-xs font-medium border border-slate-700 transition-colors"
            title={`Ver cómo modificar el video o nominados de ${category.title}`}
          >
            <Code2 className="w-3.5 h-3.5 text-red-400" />
            <span>Editar Categoría</span>
          </button>

          <button
            onClick={handleCopyCategoryLink}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-red-200 hover:text-red-100 border border-slate-700 transition-colors"
            title="Copiar enlace directo a esta categoría"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Grid: Left Column YouTube Video Embed, Right Column Nominees */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Responsive YouTube Embed Container (Aspect Ratio 16:9) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl aspect-video group/video">
            
            {/* YouTube Standard Responsive Embed Iframe */}
            <iframe
              src={embedUrl}
              title={`Muestra audiovisual - ${category.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsIframeLoaded(true)}
              className="w-full h-full border-0 relative z-10"
            />

            {!isIframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-red-300 text-xs">
                <Play className="w-8 h-8 text-red-400 animate-pulse mb-2" />
                <span>Cargando muestra de YouTube ({category.youtubeId})...</span>
              </div>
            )}
          </div>

          {/* YouTube Video Info Bar & Edit Hint */}
          <div className="flex items-center justify-between text-xs text-red-300/80 px-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
            <div className="flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-red-400" />
              <span>Video ID activo: <code className="font-mono text-red-300 font-semibold">{category.youtubeId}</code></span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${category.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-300 transition-colors underline"
            >
              Abrir en YouTube ↗
            </a>
          </div>
        </div>

        {/* Nominees List Container */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Nominados Oficiales ({category.nominees.length})</span>
            </h3>
            <span className="text-[11px] text-red-300/70">Haz clic para elegir tu favorito</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {category.nominees.map((nominee, idx) => {
              const isSelected = selectedNomineeId === nominee.id;

              return (
                <div
                  key={nominee.id}
                  onClick={() => onSelectNominee(category.id, nominee.id)}
                  className={`group/nominee cursor-pointer p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-red-500/10 border-red-500/60 shadow-md shadow-red-500/10'
                      : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-red-500 text-slate-950' : 'bg-slate-800 text-red-300 group-hover/nominee:bg-slate-700 group-hover/nominee:text-red-200'
                    }`}>
                      {idx + 1}
                    </span>

                    <div>
                      <h4 className={`text-sm font-semibold transition-colors ${
                        isSelected ? 'text-red-300 font-bold' : 'text-slate-100 group-hover/nominee:text-red-200'
                      }`}>
                        {nominee.name}
                      </h4>
                      <p className="text-xs text-red-400 font-medium">
                        {nominee.workOrProject}
                      </p>
                      {nominee.description && (
                        <p className="text-[11px] text-red-200/70 mt-0.5">
                          {nominee.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Vote / Favorito Check Indicator */}
                  <button
                    type="button"
                    className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-red-500 text-slate-950'
                        : 'text-slate-500 hover:text-red-400'
                    }`}
                    title={isSelected ? 'Seleccionado como tu favorito' : 'Marcar como mi favorito'}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </article>
  );
};
