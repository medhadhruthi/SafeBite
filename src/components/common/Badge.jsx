import React from 'react';

export default function Badge({ icon, label, variant = 'default', ariaPrefix = '' }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-900 border-red-400 dark:bg-red-950 dark:text-red-100 dark:border-red-600 font-bold';
      case 'warning':
        return 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-600 font-bold';
      case 'success':
        return 'bg-emerald-100 text-emerald-900 border-emerald-400 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-600 font-semibold';
      case 'info':
        return 'bg-blue-100 text-blue-900 border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-600 font-medium';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600';
    }
  };

  const fullLabel = ariaPrefix ? `${ariaPrefix}: ${label}` : label;

  return (
    <span
      role="status"
      aria-label={fullLabel}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs sm:text-sm tracking-wide ${getVariantStyles()}`}
    >
      {icon && <span aria-hidden="true" className="text-base leading-none">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
