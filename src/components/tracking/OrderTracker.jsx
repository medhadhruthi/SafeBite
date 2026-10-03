import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';
import { Clock, CheckCircle2, MapPin, FastForward, PhoneCall, ShieldCheck, Utensils } from 'lucide-react';

export default function OrderTracker() {
  const { activeOrder, advanceOrderStatus } = useCart();

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto p-12 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-sm">
        <Clock className="w-16 h-16 text-slate-400 mx-auto" aria-hidden="true" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          No Active Order Currently Placed
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Place an order from any restaurant to experience real-time accessible status tracking.
        </p>
      </div>
    );
  }

  const currentStep = activeOrder.steps[activeOrder.currentStepIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider block">
              Active Live Order: {activeOrder.orderId}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {activeOrder.restaurant.name}
            </h1>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-extrabold text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Est. Arrival: {activeOrder.estimatedArrival}</span>
          </div>
        </div>

        {/* Live Region Text Status First (WCAG standard) */}
        <div
          role="region"
          aria-live="polite"
          aria-atomic="true"
          className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border-2 border-blue-600 text-blue-950 dark:text-blue-100 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-lg shadow">
              {activeOrder.currentStepIndex + 1}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 dark:text-blue-300 block">
                Current Status (Spoken First):
              </span>
              <span className="text-xl font-black text-blue-950 dark:text-white">
                {currentStep.title} — {currentStep.subtitle}
              </span>
            </div>
          </div>

          {/* Prototype Simulation Control */}
          <button
            onClick={advanceOrderStatus}
            disabled={activeOrder.currentStepIndex >= activeOrder.steps.length - 1}
            className="min-h-[48px] px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow focus:ring-4 focus:ring-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Simulate next status transition"
          >
            <FastForward className="w-4 h-4" aria-hidden="true" />
            <span>Next Kitchen Stage</span>
          </button>
        </div>
      </div>

      {/* Accessible Stepper Component */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
          Order Progress Timeline
        </h2>

        <ol className="relative border-l-4 border-slate-300 dark:border-slate-700 ml-4 space-y-8">
          {activeOrder.steps.map((step, idx) => {
            const isDone = step.completed;
            const isCurrent = step.active;

            return (
              <li key={idx} className="mb-6 ml-8">
                <span
                  className={`absolute -left-5 flex items-center justify-center w-9 h-9 rounded-full border-4 ${
                    isDone || isCurrent
                      ? 'bg-blue-600 border-white text-white font-bold'
                      : 'bg-slate-200 dark:bg-slate-800 border-slate-400 text-slate-500'
                  }`}
                  aria-hidden="true"
                >
                  {isDone ? '✓' : idx + 1}
                </span>

                <div
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 shadow'
                      : isDone
                      ? 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-800 opacity-90'
                      : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{step.title}</span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-xs font-black uppercase tracking-wider">
                          Active Stage
                        </span>
                      )}
                    </h3>
                    <span className="text-xs font-bold text-slate-500">{step.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {step.subtitle}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Item Summary & Delivery Instructions */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Delivery & Contact Details
        </h3>
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-2 text-sm text-slate-800 dark:text-slate-200">
          <p>📍 <strong>Address:</strong> {activeOrder.deliveryDetails.address}</p>
          <p>♿ <strong>Driver Note:</strong> {activeOrder.deliveryDetails.deliveryNotes}</p>
          <p>💳 <strong>Paid Total:</strong> {formatINR(activeOrder.grandTotal + activeOrder.deliveryDetails.tipAmount)}</p>
        </div>
      </div>
    </div>
  );
}
