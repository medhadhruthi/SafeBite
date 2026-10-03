import React, { useState } from 'react';
import SkipLink from './components/accessibility/SkipLink';
import ScreenReaderAnnouncer from './components/accessibility/ScreenReaderAnnouncer';
import AccessibilityBar from './components/accessibility/AccessibilityBar';
import Header from './components/navigation/Header';
import BottomTabBar from './components/navigation/BottomTabBar';
import RestaurantList from './components/discovery/RestaurantList';
import FilterSheet from './components/discovery/FilterSheet';
import RestaurantMenuView from './components/menu/RestaurantMenuView';
import ItemDetailModal from './components/menu/ItemDetailModal';
import CustomizationModal from './components/menu/CustomizationModal';
import AllergenSafetyModal from './components/cart/AllergenSafetyModal';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutForm from './components/checkout/CheckoutForm';
import OrderTracker from './components/tracking/OrderTracker';
import AllergenProfileManager from './components/profile/AllergenProfileManager';

import { RESTAURANTS } from './data/mockData';
import { useCart } from './context/CartContext';
import { useUserProfile } from './context/UserProfileContext';

export default function App() {
  const { addToCart, isCartOpen, setIsCartOpen, checkItemAllergenConflicts } = useCart();
  const { savedDiets } = useUserProfile();

  // Navigation & View state
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'orders'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Modals state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [customizeItem, setCustomizeItem] = useState(null);

  // Allergen Safety Guard Interception State
  const [pendingGuardAction, setPendingGuardAction] = useState(null);

  // Search & Filter criteria state
  const [activeFilters, setActiveFilters] = useState({ search: '' });

  // Filter restaurants logic
  const filteredRestaurants = RESTAURANTS.filter((rest) => {
    // Text search filter
    if (activeFilters.search.trim()) {
      const q = activeFilters.search.toLowerCase();
      const nameMatch = rest.name.toLowerCase().includes(q);
      const cuisineMatch = rest.cuisine.some((c) => c.toLowerCase().includes(q));
      const hasMatchingItem = rest.categories.some((cat) =>
        cat.items.some(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.ingredients.some((ing) => ing.toLowerCase().includes(q))
        )
      );
      if (!nameMatch && !cuisineMatch && !hasMatchingItem) return false;
    }

    // Saved Diets filter
    if (savedDiets.length > 0) {
      const satisfiesDiet = savedDiets.every((dietId) => rest.dietBadges.includes(dietId));
      if (!satisfiesDiet) return false;
    }

    return true;
  });

  // Allergen Guard Intercept Handler
  const handleTriggerAllergenGuard = (item, restaurant, selectedOptions, quantity, specialNotes) => {
    const conflicts = checkItemAllergenConflicts(item, selectedOptions);

    if (conflicts.length > 0) {
      // Intercept with blocking safety modal
      setPendingGuardAction({
        item,
        restaurant,
        selectedOptions,
        quantity,
        specialNotes,
        conflicts
      });
    } else {
      // Safe to add directly
      addToCart(item, restaurant, selectedOptions, quantity, specialNotes);
      setCustomizeItem(null);
      setIsCartOpen(true);
    }
  };

  const handleConfirmAllergenOverride = () => {
    if (pendingGuardAction) {
      const { item, restaurant, selectedOptions, quantity, specialNotes } = pendingGuardAction;
      addToCart(item, restaurant, selectedOptions, quantity, specialNotes);
      setPendingGuardAction(null);
      setCustomizeItem(null);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#f4f7fb_100%)] text-slate-900">
      {/* WCAG Skip-to-content Link */}
      <SkipLink />

      {/* Screen Reader Announcements Live Region */}
      <ScreenReaderAnnouncer />

      {/* Top Accessibility Control Bar */}
      <AccessibilityBar onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') setSelectedRestaurant(null);
        }}
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Body */}
      <main id="main-content" tabIndex="-1" className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6 focus:outline-none sm:px-6">
        {activeTab === 'home' && !selectedRestaurant && (
          <RestaurantList
            restaurants={filteredRestaurants}
            onSelectRestaurant={setSelectedRestaurant}
            onOpenFilter={() => setIsFilterOpen(true)}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        )}

        {activeTab === 'home' && selectedRestaurant && (
          <RestaurantMenuView
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
            onOpenDetail={setDetailItem}
            onQuickAdd={(item) => setCustomizeItem(item)}
          />
        )}

        {activeTab === 'orders' && <OrderTracker />}
      </main>

      {/* Bottom Mobile Tab Bar */}
      <BottomTabBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') setSelectedRestaurant(null);
        }}
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Filter Modal */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        totalResultsCount={filteredRestaurants.length}
      />

      {/* Allergen Profile Manager Modal */}
      <AllergenProfileManager
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={Boolean(detailItem)}
        onClose={() => setDetailItem(null)}
        item={detailItem}
        onProceedToCustomize={(item) => setCustomizeItem(item)}
      />

      {/* Customization Options Modal */}
      <CustomizationModal
        isOpen={Boolean(customizeItem)}
        onClose={() => setCustomizeItem(null)}
        item={customizeItem}
        restaurant={selectedRestaurant || RESTAURANTS[0]}
        onTriggerAllergenGuard={handleTriggerAllergenGuard}
      />

      {/* Allergen Safety Guard Interception Modal */}
      <AllergenSafetyModal
        isOpen={Boolean(pendingGuardAction)}
        onClose={() => setPendingGuardAction(null)}
        conflicts={pendingGuardAction ? pendingGuardAction.conflicts : []}
        onConfirmOverride={handleConfirmAllergenOverride}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Form Modal */}
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlacedSuccess={() => {
          setIsCheckoutOpen(false);
          setActiveTab('orders');
        }}
      />
    </div>
  );
}
