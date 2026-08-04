import React, { useState, useEffect } from 'react';
import { CATEGORIES } from './data/categories';
import { Navbar } from './components/Navbar';
import { HeaderHero } from './components/HeaderHero';
import { CategoryNavMenu } from './components/CategoryNavMenu';
import { CategoryCard } from './components/CategoryCard';
import { OrganizerModal } from './components/OrganizerModal';
import { PredictionsDrawer } from './components/PredictionsDrawer';
import { AICallAssistantModal } from './components/AICallAssistantModal';
import { AICallFloatingWidget } from './components/AICallFloatingWidget';
import { Footer } from './components/Footer';
import { ArrowUp, Award, SearchX, Code2, Sparkles } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedCategoryForGuide, setSelectedCategoryForGuide] = useState<number | undefined>(undefined);
  const [isPredictionsOpen, setIsPredictionsOpen] = useState(false);
  const [isCallAssistantOpen, setIsCallAssistantOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('categoria-1');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Load votes from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gala_predictions_2026');
      if (saved) {
        setSelectedVotes(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading predictions:', e);
    }
  }, []);

  // Track scroll position for active category highlighting & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Determine active section based on scroll
      const categoryElements = CATEGORIES.map((cat) => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const el = categoryElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveCategoryId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle user vote for nominee
  const handleSelectNominee = (categoryId: string, nomineeId: string) => {
    setSelectedVotes((prev) => {
      const next = { ...prev };
      if (next[categoryId] === nomineeId) {
        delete next[categoryId]; // Deselect
      } else {
        next[categoryId] = nomineeId; // Select
      }
      localStorage.setItem('gala_predictions_2026', JSON.stringify(next));
      return next;
    });
  };

  const handleResetVotes = () => {
    setSelectedVotes({});
    localStorage.removeItem('gala_predictions_2026');
  };

  const handleOpenGuide = (catNum?: number) => {
    setSelectedCategoryForGuide(catNum);
    setIsGuideOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter categories by search query
  const filteredCategories = CATEGORIES.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchTitle = cat.title.toLowerCase().includes(query);
    const matchDesc = cat.description.toLowerCase().includes(query);
    const matchNominees = cat.nominees.some(
      (n) => n.name.toLowerCase().includes(query) || n.workOrProject.toLowerCase().includes(query)
    );
    return matchTitle || matchDesc || matchNominees;
  });

  const totalVotesCount = Object.keys(selectedVotes).length;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenOrganizerGuide={() => handleOpenGuide()}
        userVotesCount={totalVotesCount}
        onOpenPredictions={() => setIsPredictionsOpen(true)}
        onOpenCallAssistant={() => setIsCallAssistantOpen(true)}
      />

      {/* Hero Section */}
      <HeaderHero
        totalCategories={CATEGORIES.length}
        onOpenGuide={() => handleOpenGuide()}
        onOpenCallAssistant={() => setIsCallAssistantOpen(true)}
      />

      {/* Category Sticky Navigation Bar */}
      <CategoryNavMenu
        categories={CATEGORIES}
        activeCategoryId={activeCategoryId}
      />

      {/* Main Content Area: 14 Categories Showcase */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 sm:space-y-12">
        
        {/* Search Results Summary Header if searching */}
        {searchQuery && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-red-500/30 text-xs sm:text-sm">
            <span>
              Resultados para &ldquo;<strong className="text-red-300">{searchQuery}</strong>&rdquo;: {filteredCategories.length} categorías encontradas.
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-400 hover:underline font-bold"
            >
              Mostrar todas las 14 categorías
            </button>
          </div>
        )}

        {/* If no categories matched search */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <SearchX className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">No se encontraron coincidencias</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Intenta buscar por el nombre de la categoría (ej: &quot;Mejor Película&quot;), o por el nombre de algún actor o director.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Restablecer Búsqueda
            </button>
          </div>
        ) : (
          /* Render Categories */
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selectedNomineeId={selectedVotes[category.id]}
              onSelectNominee={handleSelectNominee}
              onOpenGuideForCategory={(num) => handleOpenGuide(num)}
            />
          ))
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call Widget Button */}
      <AICallFloatingWidget onOpenCall={() => setIsCallAssistantOpen(true)} />

      {/* AI Call Assistant Modal */}
      <AICallAssistantModal
        isOpen={isCallAssistantOpen}
        onClose={() => setIsCallAssistantOpen(false)}
      />

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-red-500 hover:bg-red-400 text-slate-950 font-bold shadow-xl shadow-red-500/30 transition-all transform hover:scale-110 active:scale-95"
          title="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 text-slate-950" />
        </button>
      )}

      {/* Organizer Guide Modal */}
      <OrganizerModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        targetCategoryNumber={selectedCategoryForGuide}
      />

      {/* User Predictions Drawer */}
      <PredictionsDrawer
        isOpen={isPredictionsOpen}
        onClose={() => setIsPredictionsOpen(false)}
        categories={CATEGORIES}
        selectedVotes={selectedVotes}
        onResetVotes={handleResetVotes}
      />

    </div>
  );
}
