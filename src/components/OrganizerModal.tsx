import React, { useState } from 'react';
import { X, Code, Check, FileCode, Play, Copy, HelpCircle, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCategoryNumber?: number;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  targetCategoryNumber,
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!isOpen) return null;

  const targetCategory = targetCategoryNumber
    ? CATEGORIES.find((c) => c.number === targetCategoryNumber)
    : CATEGORIES[0];

  const codeExampleSnippet = `// Archivo: /src/data/categories.ts

{
  id: '${targetCategory?.id || 'categoria-1'}',
  number: ${targetCategory?.number || 1},
  title: '${targetCategory?.title || 'Mejor Película'}',
  
  // 🔴 CAMBIA AQUÍ EL ID DEL VIDEO DE YOUTUBE DEFINITIVO:
  youtubeId: 'TU_YOUTUBE_ID_AQUÍ', // Ej: 'dQw4w9WgXcQ'
  
  // 🔴 CAMBIA AQUÍ LOS NOMINADOS DEFINITIVOS:
  nominees: [
    { id: 'nom-1-1', name: 'Nombre del Primer Nominado', workOrProject: 'Nombre de la Obra o Película' },
    { id: 'nom-1-2', name: 'Nombre del Segundo Nominado', workOrProject: 'Nombre de la Obra o Película' },
  ],
}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeExampleSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-red-100">Guía para Organizadores: Configuración de Videos y Nominados</span>
              </h3>
              <p className="text-xs text-red-200/70">
                Instrucciones claras para reemplazar <code className="text-red-300">youtubeId</code> y datos de las 14 categorías
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-red-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-red-500 text-slate-950 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Ubicación del Archivo de Datos</span>
            </div>
            <p className="text-xs text-red-200/90 leading-relaxed">
              Toda la configuración de las 14 categorías, sus IDs de YouTube y sus nominados se encuentra centralizada en el archivo:
              <br />
              <code className="text-red-300 bg-slate-900 px-2 py-1 rounded mt-2 inline-block font-mono border border-slate-700">
                /src/data/categories.ts
              </code>
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-red-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-red-500 text-slate-950 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>¿Cómo obtener el `youtubeId` de un video de YouTube?</span>
            </div>
            <p className="text-xs text-red-200/90 leading-relaxed mb-3">
              El <code className="text-red-300 font-mono">youtubeId</code> es el código de 11 caracteres que aparece al final de la URL de cualquier video de YouTube:
            </p>
            <ul className="text-xs space-y-1.5 font-mono text-red-300/80 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <li>• URL: https://www.youtube.com/watch?v=<span className="text-red-300 font-bold underline">fmErhmOOLXU</span></li>
              <li>• youtubeId actual: <span className="text-red-300 font-bold">&apos;fmErhmOOLXU&apos;</span></li>
            </ul>
          </div>

          {/* Step 3 Example Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-red-400">
                Ejemplo de Estructura para {targetCategory?.title}:
              </span>
              <button
                onClick={handleCopySnippet}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-red-300 font-medium transition-colors border border-slate-700"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-red-200/90 overflow-x-auto">
              {codeExampleSnippet}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Entendido, cerrar ventana
          </button>
        </div>

      </div>
    </div>
  );
};
