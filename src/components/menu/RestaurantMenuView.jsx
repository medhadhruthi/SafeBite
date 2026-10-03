import React, { useState } from 'react';
import MenuItemRow from './MenuItemRow';
import { ArrowLeft, Clock, Truck, ShieldCheck, Accessibility, Star, Info } from 'lucide-react';
import Badge from '../common/Badge';

export default function RestaurantMenuView({ restaurant, onBack, onOpenDetail, onQuickAdd }) {
  const [activeCategory, setActiveCategory] = useState(
    restaurant.categories && restaurant.categories.length > 0 ? restaurant.categories[0].id : ''
  );

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="min-h-[48px] px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center gap-2 cursor-pointer transition-colors focus:ring-4 focus:ring-blue-600"
        aria-label="Back to Restaurant Discovery list"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        <span>Back to Restaurants</span>
      </button>

      {/* Restaurant Detail Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {restaurant.name}
              </h1>
              <span className="px-3 py-1 rounded-lg bg-yellow-400 text-slate-950 font-black text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-slate-950" aria-hidden="true" />
                <span>{restaurant.rating} ({restaurant.reviewCount})</span>
              </span>
            </div>

            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              {restaurant.cuisine.join(' • ')} • {restaurant.distance} away
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-slate-700">
              <Clock className="w-4 h-4 text-yellow-500" aria-hidden="true" />
              <span>Prep: {restaurant.prepTimeMin}</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-slate-700">
              <Truck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>Fee: ${restaurant.deliveryFee.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Accessibility & Safety Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2">
            <Accessibility className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-bold text-slate-900 dark:text-white block">Venue Accessibility:</strong>
              <span>{restaurant.accessibilityNotes}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-bold block">Allergen Data Verification:</strong>
              <span>{restaurant.allergenDataSource}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Sticky Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Menu Categories"
        className="sticky top-[68px] z-30 flex gap-2 p-2 bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-x-auto shadow-md"
      >
        {restaurant.categories &&
          restaurant.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-5 py-2 rounded-xl font-black text-sm whitespace-nowrap transition-colors cursor-pointer focus:ring-4 focus:ring-yellow-400 ${
                  isActive
                    ? 'bg-yellow-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
      </div>

      {/* Category Menu Items Panel */}
      {restaurant.categories &&
        restaurant.categories.map((cat) => {
          if (cat.id !== activeCategory) return null;

          return (
            <section
              key={cat.id}
              id={`panel-${cat.id}`}
              role="tabpanel"
              aria-label={cat.name}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{cat.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{cat.description}</p>
              </div>

              <div className="space-y-4">
                {cat.items.map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    onOpenDetail={onOpenDetail}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}
