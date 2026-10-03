import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function ScreenReaderAnnouncer() {
  const { announcement } = useAccessibility();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      id="a11y-announcer"
    >
      {announcement}
    </div>
  );
}
