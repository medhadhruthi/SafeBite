import React from 'react';
import AllergenBadge from './AllergenBadge';
import Badge from '../common/Badge';
import { Clock, Plus, ShieldAlert, Sparkles } from 'lucide-react';
import { useUserProfile } from '../../context/UserProfileContext';

export default function MenuItemRow({ item, onOpenDetail, onQuickAdd }) {
  const { savedAllergens } = useUserProfile();

  // Check if this item contains any of the user's saved allergens
  const conflictingAllergens = item.allergens
    ? item.allergens.filter(
        (alg) => savedAllergens.includes(alg.id) && (alg.status === 'CONTAINS' || alg.status === 'MAY_CONTAIN')
      )
    : [];

  const hasConflict = conflictingAllergens.length > 0;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-5 items-start justify-between shadow-sm hover:shadow-md ${
        hasConflict
          ? 'border-red-500 bg-red-50/30 dark:bg-red-950/20'
          : 'border-slate-300 dark:border-slate-800'
      }`}
    >
      {/* Item Image */}
      <div className="relative w-full sm:w-40 h-36 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0">
        <img src={item.image} alt={item.altText} className="w-full h-full object-cover" />
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-white font-extrabold text-xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-yellow-400" aria-hidden="true" />
          <span>{item.prepTimeMin}m prep</span>
        </span>
      </div>

      {/* Content & Ingredients Preview */}
      <div className="flex-1 space-y-3">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {item.name}
            </h3>
            <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Profile Allergen Warning Banner if conflicting */}
        {hasConflict && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950 border-2 border-red-500 text-red-950 dark:text-red-100 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
            <span>
              ALLERGEN WARNING: Contains {conflictingAllergens.map((a) => a.id.toUpperCase()).join(', ')} from your profile!
            </span>
          </div>
        )}

        {/* Allergen Badges */}
        <div className="flex flex-wrap gap-2">
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

      {/* Action Buttons */}
      <div className="w-full sm:w-auto flex sm:flex-col items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onOpenDetail(item)}
          className="flex-1 sm:w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-4 focus:ring-blue-600 transition-colors cursor-pointer text-sm"
          aria-label={`View full ingredients, nutrition, and customize ${item.name}`}
        >
          View Ingredients & Options
        </button>

        <button
          onClick={() => onQuickAdd(item)}
          className={`flex-1 sm:w-full min-h-[48px] px-4 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:ring-4 focus:ring-yellow-400 ${
            hasConflict
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
          aria-label={`Add ${item.name} to cart for $${item.price.toFixed(2)}`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Add (${item.price.toFixed(2)})</span>
        </button>
      </div>
    </div>
  );
}
