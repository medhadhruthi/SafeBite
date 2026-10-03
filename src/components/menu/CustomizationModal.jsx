import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Stepper from '../common/Stepper';
import AllergenBadge from './AllergenBadge';
import { useCart } from '../../context/CartContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ShoppingBag, AlertCircle } from 'lucide-react';

export default function CustomizationModal({ isOpen, onClose, item, restaurant, onTriggerAllergenGuard }) {
  const { addToCart } = useCart();
  const { announce } = useAccessibility();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [specialNotes, setSpecialNotes] = useState('');

  useEffect(() => {
    if (item && item.customizationGroups) {
      // Pre-select defaults for required single-choice options
      const initial = {};
      item.customizationGroups.forEach((grp) => {
        if (grp.required && grp.options.length > 0) {
          initial[grp.id] = [grp.options[0]];
        } else {
          initial[grp.id] = [];
        }
      });
      setSelectedOptions(initial);
      setQuantity(1);
      setSpecialNotes('');
    }
  }, [item]);

  if (!item) return null;

  // Flatten selected options list
  const allSelectedOptions = Object.values(selectedOptions).flat();

  // Calculate live running price
  const basePrice = item.price;
  const optionsDelta = allSelectedOptions.reduce((acc, opt) => acc + (opt.priceDelta || 0), 0);
  const unitPrice = basePrice + optionsDelta;
  const totalPrice = unitPrice * quantity;

  // Option selection handler
  const handleOptionToggle = (group, option) => {
    setSelectedOptions((prev) => {
      const currentInGroup = prev[group.id] || [];

      if (group.max === 1) {
        // Single selection (Radio behavior)
        const updated = [option];
        announce(`Selected ${option.label}. Price delta: +$${option.priceDelta.toFixed(2)}.`);
        return { ...prev, [group.id]: updated };
      } else {
        // Multi selection (Checkbox behavior)
        const exists = currentInGroup.some((o) => o.id === option.id);
        const updated = exists
          ? currentInGroup.filter((o) => o.id !== option.id)
          : [...currentInGroup, option];
        announce(
          exists
            ? `Deselected ${option.label}`
            : `Selected ${option.label}. Price delta: +$${option.priceDelta.toFixed(2)}.`
        );
        return { ...prev, [group.id]: updated };
      }
    });
  };

  const handleAddToCart = () => {
    // Check required options validation
    if (item.customizationGroups) {
      for (const grp of item.customizationGroups) {
        if (grp.required && (!selectedOptions[grp.id] || selectedOptions[grp.id].length === 0)) {
          alert(`Please select a required option for: ${grp.label}`);
          return;
        }
      }
    }

    // Pass to parent allergen safety guard check
    onTriggerAllergenGuard(item, restaurant, allSelectedOptions, quantity, specialNotes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customize ${item.name}`} maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Live Total Price Live Region Announcement */}
        <div
          role="region"
          aria-live="polite"
          aria-atomic="true"
          className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 flex items-center justify-between gap-3"
        >
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-900 dark:text-blue-300 block">
              Live Total Price:
            </span>
            <span className="text-2xl font-black text-blue-950 dark:text-white">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
            (${unitPrice.toFixed(2)} each × {quantity})
          </span>
        </div>

        {/* Customization Option Groups */}
        {item.customizationGroups &&
          item.customizationGroups.map((grp) => {
            const isRadio = grp.max === 1;
            const currentSelected = selectedOptions[grp.id] || [];

            return (
              <fieldset
                key={grp.id}
                className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-3 bg-slate-50 dark:bg-slate-900/50"
              >
                <legend className="px-2 font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{grp.label}</span>
                  {grp.required ? (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-xs uppercase">
                      Required
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                      Optional
                    </span>
                  )}
                </legend>

                <div className="space-y-2 mt-2">
                  {grp.options.map((opt) => {
                    const isSelected = currentSelected.some((o) => o.id === opt.id);

                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type={isRadio ? 'radio' : 'checkbox'}
                            name={`grp-${grp.id}`}
                            checked={isSelected}
                            onChange={() => handleOptionToggle(grp, opt)}
                            className="w-6 h-6 border-slate-400 text-blue-600 focus:ring-4 focus:ring-blue-600"
                          />
                          <div>
                            <span className="text-base text-slate-900 dark:text-white">
                              {opt.label}
                            </span>
                            {opt.allergens && opt.allergens.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {opt.allergens.map((alg, i) => (
                                  <AllergenBadge
                                    key={i}
                                    status={alg.status}
                                    allergenName={alg.id.toUpperCase()}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {opt.priceDelta > 0 ? `+$${opt.priceDelta.toFixed(2)}` : 'Free'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

        {/* Special Instructions Input */}
        <div>
          <label htmlFor="special-notes" className="block text-base font-bold text-slate-900 dark:text-white mb-2">
            Special Preparation Notes for Kitchen (Optional)
          </label>
          <textarea
            id="special-notes"
            rows="2"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g. Please use clean prep board, extra crispy kale..."
            className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:ring-4 focus:ring-blue-600"
          />
        </div>

        {/* Quantity Stepper & Final Add to Cart Button */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-base text-slate-900 dark:text-white">Quantity:</span>
            <Stepper value={quantity} onChange={setQuantity} label="Dish Quantity" />
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-[52px] px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg flex items-center gap-2 cursor-pointer focus:ring-4 focus:ring-yellow-400 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <span>Add {quantity} to Cart (${totalPrice.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
