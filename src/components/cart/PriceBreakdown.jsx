import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function PriceBreakdown({
  subtotal,
  deliveryFee,
  serviceFee,
  estimatedTax,
  tipAmount = 30,
  onTipChange,
  grandTotal
}) {
  const tips = [20, 30, 50, 70];

  return (
    <div
      role="region"
      aria-label="Transparent Price Breakdown"
      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>Transparent Price Guarantee</span>
        </h3>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          No Hidden Fees
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex justify-between">
          <span>Items Subtotal</span>
          <span className="font-bold text-slate-900 dark:text-white">{formatINR(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <span>Delivery Fee</span>
            <Info className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{formatINR(deliveryFee)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <span>Platform Service Fee</span>
            <Info className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{formatINR(serviceFee)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated GST (5%)</span>
          <span className="font-bold text-slate-900 dark:text-white">{formatINR(estimatedTax)}</span>
        </div>

        {/* Courier Tip Selection */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Courier Tip:
          </label>
          <div role="radiogroup" aria-label="Select courier tip" className="grid grid-cols-4 gap-2">
            {tips.map((tip) => {
              const isSelected = tipAmount === tip;
              return (
                <button
                  key={tip}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onTipChange && onTipChange(tip)}
                  className={`min-h-[44px] py-1.5 rounded-lg border-2 font-bold text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 font-extrabold shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {formatINR(tip)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grand Total */}
      <div className="pt-3 border-t-2 border-slate-200 dark:border-slate-800 flex justify-between items-center text-lg font-black text-slate-900 dark:text-white">
        <span>Final Total Price</span>
        <span className="text-2xl text-emerald-700 dark:text-emerald-400">
          {formatINR(grandTotal + tipAmount)}
        </span>
      </div>
    </div>
  );
}
