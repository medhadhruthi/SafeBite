import React from 'react';
import { ShoppingBag, ShieldCheck, Search, Utensils } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUserProfile } from '../../context/UserProfileContext';

export default function Header({ _activeTab, setActiveTab, onOpenFilter, onOpenProfile }) {
  const { cartItems, setIsCartOpen } = useCart();
  const { savedAllergens } = useUserProfile();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 rounded-2xl p-1.5 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          aria-label="SafeBite Home Page - Accessible Food Ordering"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-600/20">
            <Utensils className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-xl font-black tracking-[-0.06em] text-slate-900 sm:text-2xl">SafeBite</span>
            <span className="block -mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Transparent & Accessible
            </span>
          </div>
        </button>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <button
            onClick={onOpenFilter}
            className="flex w-full max-w-xl items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            aria-label="Open filter options by diet, allergens, price, and rating"
          >
            <span className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <span>Search food, diets, or allergens...</span>
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
              Filters
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-900 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:px-4"
            aria-label={`Dietary profile guard with ${savedAllergens.length} active allergen protections. Click to edit.`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span className="hidden sm:inline">Diet Profile</span>
            <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{savedAllergens.length}</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:px-4"
            aria-label={`View shopping cart. Contains ${totalCartCount} items.`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-slate-950">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
