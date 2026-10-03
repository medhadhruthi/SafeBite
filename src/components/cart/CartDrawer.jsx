import React, { useState } from 'react';
import Modal from '../common/Modal';
import Stepper from '../common/Stepper';
import PriceBreakdown from './PriceBreakdown';
import { useCart } from '../../context/CartContext';
import { Trash2, ShieldAlert, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, onProceedToCheckout }) {
  const {
    cartItems,
    selectedRestaurant,
    updateQuantity,
    removeFromCart,
    undoRemoveFromCart,
    lastRemovedItem,
    subtotal,
    deliveryFee,
    serviceFee,
    estimatedTax,
    grandTotal,
    clearCart
  } = useCart();

  const [tipAmount, setTipAmount] = useState(3.00);

  if (!isOpen) return null;

  // Check if any cart item has allergen conflicts
  const totalCartConflicts = cartItems.reduce((acc, item) => acc + (item.conflicts ? item.conflicts.length : 0), 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Order Cart" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Undo Banner Toast for Removed Items */}
        {lastRemovedItem && (
          <div
            role="status"
            aria-live="polite"
            className="p-3 rounded-xl bg-slate-900 text-white border-2 border-yellow-400 flex items-center justify-between gap-3 shadow-lg"
          >
            <span className="text-sm font-bold">
              Removed {lastRemovedItem.item.name} from cart.
            </span>
            <button
              onClick={undoRemoveFromCart}
              className="px-3 py-1.5 rounded-lg bg-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1.5 hover:bg-yellow-300 transition-colors focus:ring-4 focus:ring-blue-600 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Undo Removal</span>
            </button>
          </div>
        )}

        {/* Restaurant Header */}
        {selectedRestaurant && (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider block">Ordering From:</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{selectedRestaurant.name}</span>
            </div>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-red-600 hover:text-red-700 underline focus:ring-2 focus:ring-red-500 rounded p-1 cursor-pointer"
            >
              Empty Cart
            </button>
          </div>
        )}

        {/* Allergen Warning Banner if Conflicts Exist in Cart */}
        {totalCartConflicts > 0 && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-950 border-2 border-red-500 text-red-950 dark:text-red-100 space-y-1">
            <div className="flex items-center gap-2 font-black text-base">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
              <span>Persistent Cart Allergen Warning ({totalCartConflicts} Flagged)</span>
            </div>
            <p className="text-xs font-semibold">
              Some items in your cart conflict with your saved allergen safety profile. Review carefully before ordering.
            </p>
          </div>
        )}

        {/* Cart Item List */}
        {cartItems.length > 0 ? (
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className={`p-4 rounded-xl border-2 bg-white dark:bg-slate-900 space-y-3 ${
                  cartItem.conflicts && cartItem.conflicts.length > 0
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {cartItem.item.name}
                    </h4>
                    {cartItem.selectedOptions && cartItem.selectedOptions.length > 0 && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Options: {cartItem.selectedOptions.map((o) => o.label).join(', ')}
                      </p>
                    )}
                    {cartItem.specialInstructions && (
                      <p className="text-xs italic text-blue-600 dark:text-blue-400 mt-0.5">
                        Note: "{cartItem.specialInstructions}"
                      </p>
                    )}
                  </div>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
                    ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Individual Item Conflict Warning */}
                {cartItem.conflicts && cartItem.conflicts.length > 0 && (
                  <div className="p-2 rounded bg-red-100 text-red-900 text-xs font-bold">
                    ⚠️ Item contains {cartItem.conflicts.map((c) => c.allergenId.toUpperCase()).join(', ')}
                  </div>
                )}

                {/* Controls: Stepper & Remove */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Stepper
                    value={cartItem.quantity}
                    onChange={(qty) => updateQuantity(cartItem.cartItemId, qty)}
                    label={cartItem.item.name}
                  />

                  <button
                    onClick={() => removeFromCart(cartItem.cartItemId)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-950 font-bold text-xs flex items-center gap-1 focus:ring-4 focus:ring-red-500 cursor-pointer transition-colors"
                    aria-label={`Remove ${cartItem.item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Your cart is currently empty.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore menus and add delicious, allergen-transparent dishes!
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        {cartItems.length > 0 && (
          <PriceBreakdown
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            serviceFee={serviceFee}
            estimatedTax={estimatedTax}
            tipAmount={tipAmount}
            onTipChange={setTipAmount}
            grandTotal={grandTotal}
          />
        )}

        {/* Action Footer */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="min-h-[48px] px-5 rounded-xl border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-4 focus:ring-blue-600 cursor-pointer"
            >
              Continue Browsing
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="min-h-[48px] px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg flex items-center gap-2 focus:ring-4 focus:ring-yellow-400 cursor-pointer shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
