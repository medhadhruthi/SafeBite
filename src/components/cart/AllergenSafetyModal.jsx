import React from 'react';
import Modal from '../common/Modal';
import { ShieldAlert, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

export default function AllergenSafetyModal({ isOpen, onClose, conflicts, onConfirmOverride }) {
  if (!isOpen || !conflicts || conflicts.length === 0) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚠️ Allergen Profile Conflict Warning" maxWidth="max-w-xl">
      <div className="space-y-5">
        {/* High Severity Alert Header */}
        <div className="p-4 rounded-xl bg-red-100 dark:bg-red-950 border-2 border-red-600 text-red-950 dark:text-red-100 flex items-start gap-3">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="text-lg font-black uppercase tracking-wide">
              Safety Guard Interception
            </h3>
            <p className="text-sm font-semibold">
              This item or its selected options conflict with your saved allergen safety profile!
            </p>
          </div>
        </div>

        {/* List of Detected Allergen Conflicts */}
        <div className="space-y-2">
          <h4 className="font-bold text-base text-slate-900 dark:text-white">
            Detected Allergen Warnings:
          </h4>
          <ul className="space-y-2">
            {conflicts.map((conf, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-red-50 dark:bg-red-900/40 border border-red-400 text-sm font-bold text-red-950 dark:text-red-200 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
                  <span>Allergen: <strong className="uppercase underline">{conf.allergenId}</strong></span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-900 dark:text-white">
                  {conf.source} ({conf.status})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Would you like to cancel and pick a certified safe dish, or proceed to add this dish with full awareness?
        </p>

        {/* Action Buttons */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 min-h-[50px] px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-600"
          >
            <XCircle className="w-5 h-5" aria-hidden="true" />
            <span>Cancel & Choose Safe Dish</span>
          </button>

          <button
            onClick={onConfirmOverride}
            className="w-full sm:flex-1 min-h-[50px] px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-yellow-400 shadow-md"
          >
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            <span>I Understand, Add Anyway</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
