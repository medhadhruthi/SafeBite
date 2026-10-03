import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { LayoutGrid, Map, Filter, Check, ShieldAlert } from 'lucide-react';
import { useUserProfile } from '../../context/UserProfileContext';

export default function RestaurantList({ restaurants, onSelectRestaurant, onOpenFilter, activeFilters }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const { savedAllergens } = useUserProfile();

  return (
    <section aria-labelledby="discovery-heading" className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 id="discovery-heading" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Accessible Restaurant Discovery
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Full allergen transparency, guaranteed prep times, and accessible entry notes.
          </p>
        </div>

        {/* View Mode Toggle & Filter Launcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFilter}
            className="min-h-[48px] px-4 rounded-xl bg-blue-50 dark:bg-blue-950 border-2 border-blue-600 text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-yellow-400 cursor-pointer"
            aria-label="Filter restaurants by diet and allergens"
          >
            <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Filter & Search</span>
          </button>

          {/* List vs Map toggle */}
          <div
            role="radiogroup"
            aria-label="Discovery view mode"
            className="inline-flex border-2 border-slate-300 dark:border-slate-700 rounded-xl p-1 bg-slate-100 dark:bg-slate-800"
          >
            <button
              role="radio"
              aria-checked={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              className={`min-h-[40px] px-3 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              <span>List View</span>
            </button>

            <button
              role="radio"
              aria-checked={viewMode === 'map'}
              onClick={() => setViewMode('map')}
              className={`min-h-[40px] px-3 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" aria-hidden="true" />
              <span>Accessible Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Allergen Guard Alert Bar */}
      {savedAllergens.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm">
              <span className="font-bold text-amber-950 dark:text-amber-100">
                Safety Filter Active:
              </span>{' '}
              <span className="text-amber-900 dark:text-amber-200">
                Unsafe items containing {savedAllergens.join(', ')} will show explicit warnings or trigger safety confirmation modals.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content Rendering: Grid vs Accessible Map */}
      {viewMode === 'grid' ? (
        restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelect={onSelectRestaurant}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border-2 border-dashed border-slate-400 rounded-2xl space-y-4">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              No restaurants match your current filters.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Try clearing some allergen or dietary restriction filters to view more options.
            </p>
            <button
              onClick={onOpenFilter}
              className="min-h-[48px] px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-yellow-400 cursor-pointer"
            >
              Adjust Discovery Filters
            </button>
          </div>
        )
      ) : (
        /* Accessible Map View Placeholder with Text Equivalent */
        <div className="p-8 bg-slate-900 text-white rounded-2xl border-2 border-slate-700 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Map className="w-6 h-6 text-yellow-400" aria-hidden="true" />
              <span>Accessible Map View (Text Equivalent Provided)</span>
            </h2>
            <span className="px-3 py-1 rounded bg-slate-800 text-xs font-semibold text-emerald-400">
              Screen-Reader Accessible
            </span>
          </div>

          <div className="h-64 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-950/80 pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <span className="text-4xl">🗺️</span>
              <p className="font-bold text-lg">Interactive Map View Simulation</p>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                All map pin locations, step-free access routes, and distances are fully mapped below in logical document order.
              </p>
            </div>
          </div>

          {/* Accessible List of Pins */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-yellow-400 uppercase tracking-wider">
              Map Pins & Accessibility Access Routes:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurants.map((rest) => (
                <div
                  key={rest.id}
                  onClick={() => onSelectRestaurant(rest)}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-yellow-400 cursor-pointer transition-colors"
                >
                  <p className="font-bold text-white text-base">{rest.name}</p>
                  <p className="text-xs text-slate-300 mt-1">📍 {rest.distance} away</p>
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">♿ {rest.accessibilityNotes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
