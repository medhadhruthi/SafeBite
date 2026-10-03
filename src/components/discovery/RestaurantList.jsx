import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { LayoutGrid, Map, Filter, Search, X, ShieldAlert } from 'lucide-react';
import { useUserProfile } from '../../context/UserProfileContext';

export default function RestaurantList({ restaurants, onSelectRestaurant, onOpenFilter, activeFilters, setActiveFilters }) {
  const [viewMode, setViewMode] = useState('grid');
  const { savedAllergens } = useUserProfile();

  const clearSearch = () => {
    setActiveFilters((prev) => ({ ...prev, search: '' }));
  };

  return (
    <section aria-labelledby="discovery-heading" className="space-y-6 pb-6">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 p-5 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              Accessible food discovery
            </span>
            <div>
              <h1 id="discovery-heading" className="text-4xl font-black tracking-[-0.07em] text-slate-900 sm:text-5xl">
                Find food that works for you.
              </h1>
              <p className="mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
                Transparent allergen guidance, tailored dietary filters, and restaurant options designed for easy, confident ordering.
              </p>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <label htmlFor="discovery-search" className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Search the menu
            </label>
            <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-inner shadow-slate-200/60 transition-all duration-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.08)]">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <input
                id="discovery-search"
                type="text"
                value={activeFilters.search}
                onChange={(event) => setActiveFilters((prev) => ({ ...prev, search: event.target.value }))}
                placeholder="Try vegetarian, burger, gluten free..."
                aria-label="Search for food, cuisine, or dietary keywords"
                className="h-11 w-full border-0 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {activeFilters.search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={onOpenFilter}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
              {restaurants.length} results
            </span>
            <span>Ready for safe, satisfying ordering.</span>
          </div>

          <div
            role="radiogroup"
            aria-label="Discovery view mode"
            className="inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1"
          >
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              <span>List View</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'map'}
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="h-4 w-4" aria-hidden="true" />
              <span>Accessible Map</span>
            </button>
          </div>
        </div>
      </div>

      {savedAllergens.length > 0 && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-700" aria-hidden="true" />
            <div>
              <span className="font-bold">Safety Filter Active:</span>{' '}
              <span>Unsafe items containing {savedAllergens.join(', ')} will be highlighted or blocked before checkout.</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'grid' ? (
        restaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelect={onSelectRestaurant}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-12 text-center shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">🍽️</div>
            <p className="text-2xl font-black tracking-[-0.05em] text-slate-900">No matching dishes found</p>
            <p className="mx-auto mt-3 max-w-lg text-base text-slate-600">
              Try changing your filters or searching for a different cuisine, diet, or ingredient.
            </p>
            <button
              type="button"
              onClick={onOpenFilter}
              className="mt-6 inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              Clear filters
            </button>
          </div>
        )
      ) : (
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 text-white shadow-[0_42px_90px_-34px_rgba(15,23,42,0.7)]">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
              <Map className="h-5 w-5 text-amber-400" aria-hidden="true" />
              Accessible Map View
            </h2>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
              Screen reader friendly
            </span>
          </div>

          <div className="relative h-72 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.2),transparent_20%),linear-gradient(135deg,#0f172a_0%,#111827_100%)] p-6 sm:p-8">
            <div className="absolute inset-0 opacity-70" aria-hidden="true">
              <div className="absolute inset-x-10 top-8 h-24 rounded-full border border-slate-700/80" />
              <div className="absolute inset-x-20 bottom-6 h-24 rounded-full border border-slate-700/80" />
              <div className="absolute left-10 top-20 h-40 w-32 rounded-full border border-slate-700/80" />
              <div className="absolute right-16 top-16 h-40 w-52 rounded-full border border-slate-700/80" />
            </div>

            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-3xl">📍</div>
                <p className="text-lg font-bold text-white">Location-aware dining options</p>
                <p className="mt-2 text-sm text-slate-300">
                  Distances, step-free routes, and route-safe access details are listed below in logical order for screen readers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Nearby access points</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {restaurants.map((rest) => (
                <button
                  key={rest.id}
                  type="button"
                  onClick={() => onSelectRestaurant(rest)}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left transition-colors hover:border-emerald-400 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                  <p className="text-base font-bold text-white">{rest.name}</p>
                  <p className="mt-1 text-xs text-slate-300">📍 {rest.distance} away</p>
                  <p className="mt-2 text-xs text-emerald-300">♿ {rest.accessibilityNotes}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
