import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useUserProfile } from '../../context/UserProfileContext';
import { Type, Eye, ShieldAlert, Zap } from 'lucide-react';

export default function AccessibilityBar({ onOpenProfile }) {
  const { fontSize, cycleFontSize, highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion } = useAccessibility();
  const { savedAllergens } = useUserProfile();

  const getFontLabel = () => {
    if (fontSize === 'large-150') return 'Text: 150%';
    if (fontSize === 'xlarge-200') return 'Text: 200%';
    return 'Text: 100%';
  };

  return (
    <nav
      aria-label="Accessibility & Safety Controls"
      className="bg-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-sm border-b border-slate-700 shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs uppercase tracking-wider text-yellow-400 flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          A11y & Safety Controls
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Allergen Guard Status */}
        <button
          onClick={onOpenProfile}
          className="min-h-[44px] px-3 py-1.5 rounded-lg bg-red-950 text-red-200 border border-red-700 hover:bg-red-900 focus:ring-2 focus:ring-yellow-400 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          aria-label={`Allergen Profile Guard active with ${savedAllergens.length} restrictions saved. Click to modify.`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" aria-hidden="true" />
          <span>Guard Active ({savedAllergens.length} Allergens)</span>
        </button>

        {/* Text Scaling Button */}
        <button
          onClick={cycleFontSize}
          className="min-h-[44px] px-3 py-1.5 rounded-lg bg-slate-800 text-slate-100 border border-slate-600 hover:bg-slate-700 focus:ring-2 focus:ring-yellow-400 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          aria-label={`Current text size ${getFontLabel()}. Click to increase up to 200 percent.`}
        >
          <Type className="w-4 h-4 text-blue-400" aria-hidden="true" />
          <span>{getFontLabel()}</span>
        </button>

        {/* High Contrast Toggle */}
        <button
          onClick={toggleHighContrast}
          className={`min-h-[44px] px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            highContrast
              ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
              : 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
          }`}
          aria-pressed={highContrast}
          aria-label={`High contrast mode is ${highContrast ? 'enabled' : 'disabled'}. Click to toggle.`}
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          <span>{highContrast ? 'High Contrast ON' : 'High Contrast'}</span>
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={toggleReducedMotion}
          className={`min-h-[44px] px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            reducedMotion
              ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
              : 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
          }`}
          aria-pressed={reducedMotion}
          aria-label={`Reduced motion is ${reducedMotion ? 'enabled' : 'disabled'}. Click to toggle.`}
        >
          <span className="w-4 h-4 flex items-center justify-center font-bold text-xs" aria-hidden="true">⚡</span>
          <span>{reducedMotion ? 'No Motion ON' : 'Reduced Motion'}</span>
        </button>
      </div>
    </nav>
  );
}
