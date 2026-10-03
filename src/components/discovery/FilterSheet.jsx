import React, { useState } from 'react';
import Modal from '../common/Modal';
import { ALLERGENS, NUTRITION_TAGS, DIETARY_TAGS } from '../../data/allergenData';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Filter, Mic, Check, RotateCcw, Sparkles } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Filter restaurants & menus" maxWidth="max-w-4xl">
      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-white p-2 text-emerald-600 shadow-sm">
              <Filter className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="text-sm text-emerald-900">
              <p className="font-bold">Synced with your Dietary Guard Profile</p>
              <p className="mt-1 text-emerald-800/80">Changes made here automatically update your profile allergen filters.</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="search-input" className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
            Search food or keywords
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="search-input"
              type="text"
              value={activeFilters.search}
              onChange={(e) => setActiveFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="e.g. Avocado bowl, GF Panini, high protein..."
              className="h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'border border-slate-200 bg-slate-900 text-white hover:bg-slate-800'
              }`}
              aria-label="Simulate voice search"
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
              <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
            </button>
          </div>
        </div>

        <fieldset className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
          <legend className="px-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Nutrition-first filters</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {NUTRITION_TAGS.map((tag) => {
              const isChecked = savedDiets.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggleDiet(tag.id, tag.name)}
                  className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition-all ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">{tag.icon}</span>
                  <span className="flex-1">
                    <span className="block text-base font-bold text-slate-900">{tag.name}</span>
                    <span className="mt-1 block text-xs text-slate-600">{tag.description}</span>
                  </span>
                  {isChecked && <Check className="mt-1 h-4 w-4 text-emerald-600" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
          <legend className="px-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Traditional dietary labels</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {DIETARY_TAGS.filter((tag) => !NUTRITION_TAGS.some((nutritionTag) => nutritionTag.id === tag.id)).map((tag) => {
              const isChecked = savedDiets.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggleDiet(tag.id, tag.name)}
                  className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition-all ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">{tag.icon}</span>
                  <span className="flex-1">
                    <span className="block text-base font-bold text-slate-900">{tag.name}</span>
                    <span className="mt-1 block text-xs text-slate-600">{tag.description}</span>
                  </span>
                  {isChecked && <Check className="mt-1 h-4 w-4 text-emerald-600" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
          <legend className="px-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Allergen exclusions</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ALLERGENS.map((alg) => {
              const isChecked = savedAllergens.includes(alg.id);
              return (
                <button
                  key={alg.id}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggleAllergen(alg.id, alg.name)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    isChecked
                      ? 'border-rose-300 bg-rose-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-base">{alg.icon}</span>
                  <span className="text-sm font-semibold text-slate-900">{alg.name}</span>
                  {isChecked && <Check className="ml-auto h-4 w-4 text-rose-600" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-base font-semibold text-slate-700" aria-live="polite">
            Showing <span className="text-lg font-black text-slate-900">{totalResultsCount}</span> restaurants matching your criteria
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveFilters({ search: '' });
                announce('Filters reset');
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                announce(`Filters applied. Showing ${totalResultsCount} restaurants.`);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
