import React from 'react';
import { Home, Search, ShoppingBag, Clock, UserCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUserProfile } from '../../context/UserProfileContext';

export default function BottomTabBar({ activeTab, setActiveTab, onOpenFilter, onOpenProfile }) {
  const { cartItems, setIsCartOpen, activeOrder } = useCart();
  const { savedAllergens } = useUserProfile();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => setActiveTab('home'),
      ariaLabel: 'Navigate to Home Discovery'
    },
    {
      id: 'search',
      label: 'Filters',
      icon: Search,
      action: onOpenFilter,
      ariaLabel: 'Open Food & Dietary Filters'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      action: () => setIsCartOpen(true),
      badge: totalCartCount > 0 ? totalCartCount : null,
      ariaLabel: `Open Cart with ${totalCartCount} items`
    },
    {
      id: 'orders',
      label: 'Tracking',
      icon: Clock,
      action: () => setActiveTab('orders'),
      badge: activeOrder ? '1' : null,
      ariaLabel: activeOrder ? 'View Active Order Tracking' : 'View Order History'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserCheck,
      action: onOpenProfile,
      badge: savedAllergens.length > 0 ? savedAllergens.length : null,
      ariaLabel: `Manage Allergen Profile with ${savedAllergens.length} active guards`
    }
  ];

  return (
    <nav
      aria-label="Mobile Main Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t-2 border-slate-700 text-white shadow-2xl px-2 py-1"
    >
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={item.action}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full min-h-[52px] py-1.5 flex flex-col items-center justify-center font-bold text-xs rounded-lg transition-colors cursor-pointer focus:ring-4 focus:ring-yellow-400 relative ${
                  isActive
                    ? 'text-yellow-400 bg-slate-800 border border-yellow-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-0.5" aria-hidden="true" />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
