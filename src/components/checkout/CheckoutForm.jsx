import React, { useState } from 'react';
import Modal from '../common/Modal';
import PriceBreakdown from '../cart/PriceBreakdown';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';
import { ShieldCheck, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutForm({ isOpen, onClose, onOrderPlacedSuccess }) {
  const { cartItems, selectedRestaurant, subtotal, deliveryFee, serviceFee, estimatedTax, grandTotal, placeOrder } = useCart();

  const [address, setAddress] = useState('123 Accessibility Way, Apt 4B, Seattle, WA');
  const [deliveryNotes, setDeliveryNotes] = useState('Ramp available at front doorway. Please ring bell twice and leave package on porch table.');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [tipAmount, setTipAmount] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder({
      address,
      deliveryNotes,
      paymentMethod,
      tipAmount
    });
    onOrderPlacedSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checkout & Review Order" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transparent Guarantee Reminder */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
          <div className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
            <strong>Transparent Checkout:</strong> What you see below is exactly what you pay. Zero surprises at final payment.
          </div>
        </div>

        {/* Delivery Address & Accessibility Notes */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-4">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span>Delivery Address & Accessibility Instructions</span>
          </legend>

          <div>
            <label htmlFor="checkout-address" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">
              Street Address & Apartment / Unit
            </label>
            <input
              id="checkout-address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:ring-4 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="delivery-notes" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">
              Driver Accessibility & Drop-off Instructions (e.g., Ramp, Elevator, Bell)
            </label>
            <textarea
              id="delivery-notes"
              rows="2"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:ring-4 focus:ring-blue-600"
            />
          </div>
        </fieldset>

        {/* Payment Method Selector */}
        <fieldset className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-4">
          <legend className="px-2 font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span>Payment Method</span>
          </legend>

          <div role="radiogroup" aria-label="Select Payment Method" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {[
              { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
              { id: 'pay', label: 'Apple Pay / Google Pay', icon: '📲' },
              { id: 'cash', label: 'Pay on Delivery', icon: '💵' }
            ].map((method) => {
              const isSelected = paymentMethod === method.id;
              return (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={isSelected}
                    onChange={() => setPaymentMethod(method.id)}
                    className="w-5 h-5 text-blue-600 focus:ring-4 focus:ring-blue-600"
                  />
                  <span className="text-xl" aria-hidden="true">{method.icon}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{method.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Full Price Breakdown */}
        <PriceBreakdown
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          serviceFee={serviceFee}
          estimatedTax={estimatedTax}
          tipAmount={tipAmount}
          onTipChange={setTipAmount}
          grandTotal={grandTotal}
        />

        {/* Action Buttons */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] px-5 rounded-xl border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-4 focus:ring-blue-600 cursor-pointer"
          >
            Back to Cart
          </button>

          <button
            type="submit"
            className="min-h-[52px] px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg flex items-center gap-2 focus:ring-4 focus:ring-yellow-400 cursor-pointer shadow-lg"
          >
            <CheckCircle className="w-6 h-6" aria-hidden="true" />
            <span>Confirm & Place Order ({formatINR(grandTotal + tipAmount)})</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
