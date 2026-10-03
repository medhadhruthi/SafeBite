import React from 'react';
import { ShoppingBag, ShieldCheck, Search, Utensils } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUserProfile } from '../../context/UserProfileContext';

export default function Header({ activeTab, setActiveTab, onOpenFilter, onOpenProfile }) {
  const { cartItems, setIsCartOpen } = useCart();
  const { savedAllergens } = useUserProfile();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 group cursor-pointer focus:ring-4 focus:ring-blue-600 rounded-lg p-1"
          aria-label="SafeBite Home Page - Accessible Food Ordering"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Utensils className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="text-left">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white block leading-tight">
              SafeBite
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block -mt-1">
              Transparent & Accessible
            </span>
          </div>
        </button>

        {/* Center Actions / Quick Search & Filter */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <button
            onClick={onOpenFilter}
            className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-600 dark:text-slate-300 flex items-center justify-between text-base font-medium cursor-pointer transition-colors focus:ring-4 focus:ring-blue-600"
            aria-label="Open filter options by diet, allergens, price, and rating"
          >
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-400" aria-hidden="true" />
              <span>Search food, diets, or allergens...</span>
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
              Filters
            </span>
          </button>
        </div>

        {/* Right Action Icons: Profile & Cart */}
        <div className="flex items-center gap-3">
          {/* Allergen Profile Button */}
          <button
            onClick={onOpenProfile}
            className="h-12 px-3 sm:px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 flex items-center gap-2 font-bold text-sm cursor-pointer transition-colors focus:ring-4 focus:ring-blue-600"
            aria-label={`Dietary profile guard with ${savedAllergens.length} active allergen protections. Click to edit.`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="hidden sm:inline">Diet Profile ({savedAllergens.length})</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative h-12 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 font-bold flex items-center gap-2 cursor-pointer transition-colors focus:ring-4 focus:ring-yellow-400"
            aria-label={`View shopping cart. Contains ${totalCartCount} items.`}
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center shadow">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
