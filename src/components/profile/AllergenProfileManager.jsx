import React from 'react';
import Modal from '../common/Modal';
import { ALLERGENS, DIETARY_TAGS } from '../../data/allergenData';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ShieldCheck, Eye, Type, Zap, RotateCcw, Save } from 'lucide-react';

export default function AllergenProfileManager({ isOpen, onClose }) {
  const { savedAllergens, savedDiets, toggleAllergen, toggleDiet, clearAllFilters } = useUserProfile();
  const { fontSize, cycleFontSize, highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion } = useAccessibility();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dietary & Accessibility Profile Guard" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Guard Explanation Header */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <h3 className="font-black text-emerald-950 dark:text-emerald-100">
              Active Safety Guard Center
            </h3>
            <p className="text-emerald-900 dark:text-emerald-200 mt-0.5">
              Selections saved here persist across all restaurant menus. Unsafe dishes will present explicit warnings or trigger safety confirmation dialogs before ordering.
            </p>
          </div>
        </div>

        {/* Allergen Exclusions */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-3">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white">
            Saved Allergen Exclusions ({savedAllergens.length} Selected)
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-3">
            {ALLERGENS.map((alg) => {
              const isChecked = savedAllergens.includes(alg.id);
              return (
                <label
                  key={alg.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-red-50 dark:bg-red-950 border-red-500 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
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
                    <span>{alg.name}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Dietary Preferences */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-3">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white">
            Dietary Preferences ({savedDiets.length} Selected)
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DIETARY_TAGS.map((tag) => {
              const isChecked = savedDiets.includes(tag.id);
              return (
                <label
                  key={tag.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDiet(tag.id, tag.name)}
                    className="w-6 h-6 rounded border-slate-400 text-emerald-600 focus:ring-4 focus:ring-blue-600 mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
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

        {/* In-App Accessibility Preferences */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-3">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white">
            App Accessibility Controls
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={cycleFontSize}
              className="min-h-[50px] p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-600"
            >
              <Type className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <span>Scale Text ({fontSize})</span>
            </button>

            <button
              type="button"
              onClick={toggleHighContrast}
              className={`min-h-[50px] p-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-600 ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300 font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700'
              }`}
            >
              <Eye className="w-5 h-5" aria-hidden="true" />
              <span>{highContrast ? 'High Contrast ON' : 'High Contrast'}</span>
            </button>

            <button
              type="button"
              onClick={toggleReducedMotion}
              className={`min-h-[50px] p-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-600 ${
                reducedMotion
                  ? 'bg-emerald-500 text-black border-emerald-400 font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700'
              }`}
            >
              <span>⚡</span>
              <span>{reducedMotion ? 'Reduced Motion ON' : 'Reduced Motion'}</span>
            </button>
          </div>
        </fieldset>

        {/* Footer Actions */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <button
            type="button"
            onClick={clearAllFilters}
            className="min-h-[48px] px-4 rounded-xl border-2 border-slate-400 text-red-600 font-bold hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-1.5 focus:ring-4 focus:ring-red-500 cursor-pointer text-sm"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset All Settings</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base flex items-center gap-2 focus:ring-4 focus:ring-yellow-400 cursor-pointer shadow-md"
          >
            <Save className="w-5 h-5" aria-hidden="true" />
            <span>Save & Apply Settings</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
