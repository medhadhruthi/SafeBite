import React from 'react';
import { ALLERGEN_STATUS_TYPES } from '../../data/allergenData';
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export default function AllergenBadge({ status, allergenName, note }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'CONTAINS':
        return {
          ...ALLERGEN_STATUS_TYPES.CONTAINS,
          icon: ShieldAlert,
          label: `Contains ${allergenName}`
        };
      case 'MAY_CONTAIN':
        return {
          ...ALLERGEN_STATUS_TYPES.MAY_CONTAIN,
          icon: AlertTriangle,
          label: `May contain ${allergenName} (Cross-contact risk)`
        };
      case 'FREE_FROM':
        return {
          ...ALLERGEN_STATUS_TYPES.FREE_FROM,
          icon: CheckCircle,
          label: `Certified Free From ${allergenName}`
        };
      case 'NOT_CONFIRMED':
      default:
        return {
          ...ALLERGEN_STATUS_TYPES.NOT_CONFIRMED,
          icon: HelpCircle,
          label: `${allergenName} status not confirmed`
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-label={`${config.ariaPrefix}: ${config.label}. ${note || ''}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-bold shadow-sm ${config.badgeClass}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
      {note && <span className="font-normal opacity-90 hidden sm:inline">— {note}</span>}
    </div>
  );
}
