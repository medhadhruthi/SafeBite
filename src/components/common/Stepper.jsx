import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function Stepper({ value, onChange, min = 1, max = 99, label = 'Quantity' }) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div
      role="group"
      aria-label={`${label} stepper controller`}
      className="inline-flex items-center gap-2 border border-slate-400 rounded-lg p-1 bg-slate-50 dark:bg-slate-900"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label={`Decrease ${label}. Current value is ${value}`}
        className="w-12 h-12 flex items-center justify-center rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-600 cursor-pointer text-xl font-bold transition-colors"
      >
        <Minus className="w-5 h-5" aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="w-10 text-center font-extrabold text-lg text-slate-900 dark:text-white select-none"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label={`Increase ${label}. Current value is ${value}`}
        className="w-12 h-12 flex items-center justify-center rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-600 cursor-pointer text-xl font-bold transition-colors"
      >
        <Plus className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
