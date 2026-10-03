import React, { useState } from 'react';
import Modal from '../common/Modal';
import { ALLERGENS, DIETARY_TAGS } from '../../data/allergenData';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Filter, Mic, Check, RotateCcw } from 'lucide-react';

export default function FilterSheet({ isOpen, onClose, activeFilters, setActiveFilters, totalResultsCount }) {
  const { savedAllergens, savedDiets, toggleAllergen, toggleDiet } = useUserProfile();
  const { announce } = useAccessibility();

  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    announce('Voice search activated. Listening for dietary requirements...');
    setTimeout(() => {
      setIsListening(false);
      setActiveFilters((prev) => ({ ...prev, search: 'gluten free bowl' }));
      announce('Voice input received: set search term to gluten free bowl');
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Restaurants & Menus" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Search Bar & Voice Search */}
        <div>
          <label htmlFor="search-input" className="block text-base font-bold text-slate-900 dark:text-white mb-2">
            Search Food or Keywords
          </label>
          <div className="flex gap-2">
            <input
              id="search-input"
              type="text"
              value={activeFilters.search}
              onChange={(e) => setActiveFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="e.g. Avocado bowl, GF Panini, Halal..."
              className="flex-1 min-h-[48px] px-4 rounded-xl border-2 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:ring-4 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`min-h-[48px] px-4 rounded-xl border-2 font-bold flex items-center gap-2 cursor-pointer transition-colors focus:ring-4 focus:ring-yellow-400 ${
                isListening
                  ? 'bg-red-600 text-white border-red-700 animate-pulse'
                  : 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
              }`}
              aria-label="Simulate voice search"
            >
              <Mic className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice Search'}</span>
            </button>
          </div>
        </div>

        {/* Saved Profile Safety Quick Sync Notice */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-400 flex items-start gap-3">
          <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <p className="font-bold text-blue-950 dark:text-blue-100">
              Synced with your Dietary Guard Profile
            </p>
            <p className="text-blue-900 dark:text-blue-200 mt-0.5">
              Changes made here automatically update your profile allergen filters.
            </p>
          </div>
        </div>

        {/* Dietary Preferences Section */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white">
            Dietary Preferences
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {DIETARY_TAGS.map((tag) => {
              const isChecked = savedDiets.includes(tag.id);
              return (
                <label
                  key={tag.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDiet(tag.id, tag.name)}
                    className="w-6 h-6 rounded border-slate-400 text-emerald-600 focus:ring-4 focus:ring-blue-600 mt-0.5"
                  />
                  <div>
                    <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{tag.icon}</span>
                      <span>{tag.name}</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">
                      {tag.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Allergen Exclusion Section */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white">
            Strict Allergen Exclusions (Hide / Flag Unsafe Dishes)
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
            {ALLERGENS.map((alg) => {
              const isChecked = savedAllergens.includes(alg.id);
              return (
                <label
                  key={alg.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-red-50 dark:bg-red-950 border-red-500 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAllergen(alg.id, alg.name)}
                    className="w-6 h-6 rounded border-slate-400 text-red-600 focus:ring-4 focus:ring-blue-600"
                  />
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{alg.icon}</span>
                    <span>Exclude {alg.name}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Results Live Count & Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
          <div className="text-base font-bold text-slate-900 dark:text-white" aria-live="polite">
            Showing <span className="text-blue-600 dark:text-blue-400 text-lg font-black">{totalResultsCount}</span> restaurants matching your criteria
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveFilters({ search: '' });
                announce('Filters reset');
              }}
              className="min-h-[48px] px-4 rounded-xl border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-600"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => {
                announce(`Filters applied. Showing ${totalResultsCount} restaurants.`);
                onClose();
              }}
              className="min-h-[48px] px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base flex items-center gap-2 cursor-pointer focus:ring-4 focus:ring-yellow-400"
            >
              <Check className="w-5 h-5" aria-hidden="true" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
