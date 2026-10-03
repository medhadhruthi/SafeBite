import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { useUserProfile } from './UserProfileContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { announce } = useAccessibility();
  const { savedAllergens } = useUserProfile();

  const [cartItems, setCartItems] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [lastRemovedItem, setLastRemovedItem] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper to check if an item or its selected options conflict with user allergens
  const checkItemAllergenConflicts = (item, selectedOptions = []) => {
    if (!savedAllergens || savedAllergens.length === 0) return [];
    
    const conflicts = [];
    
    // Check main item allergens
    if (item.allergens) {
      item.allergens.forEach((alg) => {
        if (savedAllergens.includes(alg.id) && (alg.status === 'CONTAINS' || alg.status === 'MAY_CONTAIN')) {
          conflicts.push({
            allergenId: alg.id,
            status: alg.status,
            source: item.name,
            note: alg.note
          });
        }
      });
    }

    // Check selected customization option allergens
    selectedOptions.forEach((opt) => {
      if (opt.allergens) {
        opt.allergens.forEach((alg) => {
          if (savedAllergens.includes(alg.id) && (alg.status === 'CONTAINS' || alg.status === 'MAY_CONTAIN')) {
            conflicts.push({
              allergenId: alg.id,
              status: alg.status,
              source: `Option: ${opt.label}`,
              note: 'Selected customization option'
            });
          }
        });
      }
    });

    return conflicts;
  };

  const addToCart = (item, restaurant, selectedOptions = [], quantity = 1, specialInstructions = '') => {
    // If adding from a new restaurant, prompt/clear previous restaurant cart
    if (selectedRestaurant && selectedRestaurant.id !== restaurant.id) {
      if (cartItems.length > 0) {
        const replace = window.confirm(
          `Your cart contains items from ${selectedRestaurant.name}. Replace cart with items from ${restaurant.name}?`
        );
        if (!replace) return false;
      }
      setCartItems([]);
    }

    setSelectedRestaurant(restaurant);

    const conflicts = checkItemAllergenConflicts(item, selectedOptions);
    const cartItemId = `${item.id}-${Date.now()}`;
    const newItem = {
      cartItemId,
      item,
      restaurant,
      selectedOptions,
      quantity,
      specialInstructions,
      unitPrice: item.price + selectedOptions.reduce((acc, opt) => acc + (opt.priceDelta || 0), 0),
      conflicts
    };

    setCartItems((prev) => [...prev, newItem]);

    announce(
      `Added ${quantity} ${item.name} to cart. Total cart item count: ${cartItems.reduce((a, b) => a + b.quantity, 0) + quantity}`
    );
    return true;
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const updated = { ...ci, quantity: newQty };
          announce(`Updated ${ci.item.name} quantity to ${newQty}`);
          return updated;
        }
        return ci;
      })
    );
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cartItems.find((ci) => ci.cartItemId === cartItemId);
    if (!itemToRemove) return;

    setLastRemovedItem(itemToRemove);
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
    announce(`Removed ${itemToRemove.item.name} from cart. Press Undo button to restore.`);
  };

  const undoRemoveFromCart = () => {
    if (!lastRemovedItem) return;
    setCartItems((prev) => [...prev, lastRemovedItem]);
    announce(`Restored ${lastRemovedItem.item.name} back to cart.`);
    setLastRemovedItem(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedRestaurant(null);
    announce('Cart emptied');
  };

  // Calculate pricing breakdown with 100% transparency
  const subtotal = cartItems.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);
  const deliveryFee = selectedRestaurant ? selectedRestaurant.deliveryFee : 0;
  const serviceFee = subtotal > 0 ? 5 : 0;
  const estimatedTax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + serviceFee + estimatedTax;

  // Place order & start real-time simulated order tracker
  const placeOrder = (deliveryDetails) => {
    const orderId = `ORD-#${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      restaurant: selectedRestaurant,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      serviceFee,
      estimatedTax,
      grandTotal,
      deliveryDetails,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '25 - 35 mins',
      currentStepIndex: 0,
      steps: [
        { title: 'Order Placed', subtitle: 'Sent to restaurant kitchen', time: 'Just now', completed: true, active: true },
        { title: 'Order Accepted', subtitle: 'Kitchen confirmed preparation', time: 'Est. 2 mins', completed: false, active: false },
        { title: 'Preparing Food', subtitle: 'Dishes being freshly cooked', time: 'Est. 15 mins', completed: false, active: false },
        { title: 'Out for Delivery', subtitle: 'Driver on the way to your door', time: 'Est. 8 mins', completed: false, active: false },
        { title: 'Delivered', subtitle: 'Enjoy your meal!', time: 'Est. Arrival', completed: false, active: false }
      ]
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setIsCartOpen(false);
    announce(`Order placed successfully! Your order number is ${orderId}. Track your order status below.`);
  };

  // Simulate order progress over time for testing
  const advanceOrderStatus = () => {
    if (!activeOrder || activeOrder.currentStepIndex >= activeOrder.steps.length - 1) return;

    setActiveOrder((prev) => {
      const nextIndex = prev.currentStepIndex + 1;
      const updatedSteps = prev.steps.map((step, idx) => ({
        ...step,
        completed: idx < nextIndex,
        active: idx === nextIndex
      }));

      const activeStepTitle = updatedSteps[nextIndex].title;
      announce(`Order Status Update: ${activeStepTitle}. ${updatedSteps[nextIndex].subtitle}`);

      return {
        ...prev,
        currentStepIndex: nextIndex,
        steps: updatedSteps
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedRestaurant,
        addToCart,
        updateQuantity,
        removeFromCart,
        undoRemoveFromCart,
        lastRemovedItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        deliveryFee,
        serviceFee,
        estimatedTax,
        grandTotal,
        activeOrder,
        placeOrder,
        advanceOrderStatus,
        checkItemAllergenConflicts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
