import React from 'react';
import Modal from '../common/Modal';
import AllergenBadge from './AllergenBadge';
import { Clock, ShieldAlert, CheckCircle2, FileText, Info } from 'lucide-react';
import { useUserProfile } from '../../context/UserProfileContext';

export default function ItemDetailModal({ isOpen, onClose, item, onProceedToCustomize }) {
  const { savedAllergens } = useUserProfile();

  if (!item) return null;

  const conflictingAllergens = item.allergens
    ? item.allergens.filter(
        (alg) => savedAllergens.includes(alg.id) && (alg.status === 'CONTAINS' || alg.status === 'MAY_CONTAIN')
      )
    : [];

  const hasConflict = conflictingAllergens.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Main Banner Image & Prep Time */}
        <div className="relative h-60 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
          <img src={item.image} alt={item.altText} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/90 text-white font-extrabold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" aria-hidden="true" />
            <span>Prep Time: {item.prepTimeMin} minutes</span>
          </div>
        </div>

        {/* Description & Price */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
              {item.description}
            </p>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* 100% Complete Ingredients List */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Complete Ingredient List ({item.ingredients.length} items)</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-800 dark:text-slate-200">
            {item.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mandatory Allergen Safety Block (PLACED BEFORE ADD BUTTON) */}
        <div
          className={`p-5 rounded-2xl border-2 space-y-3 ${
            hasConflict
              ? 'bg-red-50 dark:bg-red-950/80 border-red-500 text-red-950 dark:text-red-100'
              : 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <ShieldAlert className={`w-6 h-6 ${hasConflict ? 'text-red-600' : 'text-emerald-600'}`} aria-hidden="true" />
              <span>Allergen Transparency & Safety Block</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-white">
              WCAG Safety Guard
            </span>
          </div>

          {hasConflict && (
            <div className="p-3 rounded-lg bg-red-200 dark:bg-red-900 text-red-950 dark:text-white font-bold text-sm">
              🚨 WARNING: This dish contains {conflictingAllergens.map((a) => a.id.toUpperCase()).join(', ')} which is listed in your allergen profile!
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {item.allergens &&
              item.allergens.map((alg) => (
                <AllergenBadge
                  key={alg.id}
                  status={alg.status}
                  allergenName={alg.id.toUpperCase()}
                  note={alg.note}
                />
              ))}
          </div>
        </div>

        {/* Nutrition Information Grid */}
        {item.nutrition && (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Nutritional Content per Serving</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-2 rounded bg-white dark:bg-slate-900">
                <span className="block text-slate-500">Calories</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.nutrition.calories} kcal</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900">
                <span className="block text-slate-500">Protein</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.nutrition.protein}</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900">
                <span className="block text-slate-500">Carbs</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.nutrition.carbs}</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900">
                <span className="block text-slate-500">Fat</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.nutrition.fat}</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900">
                <span className="block text-slate-500">Sodium</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.nutrition.sodium}</span>
              </div>
            </div>
          </div>
        )}

        {/* Proceed to Customization Action */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="min-h-[48px] px-5 rounded-xl border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-4 focus:ring-blue-600 cursor-pointer"
          >
            Back to Menu
          </button>
          <button
            onClick={() => {
              onClose();
              onProceedToCustomize(item);
            }}
            className="min-h-[48px] px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base focus:ring-4 focus:ring-yellow-400 cursor-pointer"
          >
            Customize & Order (${item.price.toFixed(2)})
          </button>
        </div>
      </div>
    </Modal>
  );
}
