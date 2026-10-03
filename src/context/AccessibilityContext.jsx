import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState('standard'); // 'standard', 'large-150', 'xlarge-200'
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Sync settings with root HTML element attributes for global CSS styling
  useEffect(() => {
    const root = document.documentElement;
    
    // Font scaling
    root.setAttribute('data-font-size', fontSize);
    
    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [fontSize, highContrast, reducedMotion]);

  const announce = (message) => {
    setAnnouncement('');
    // Slight tick delay so screen readers re-announce repeat messages
    setTimeout(() => {
      setAnnouncement(message);
    }, 50);
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      announce(next ? 'High contrast mode enabled' : 'High contrast mode disabled');
      return next;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      announce(next ? 'Reduced motion enabled' : 'Reduced motion disabled');
      return next;
    });
  };

  const cycleFontSize = () => {
    setFontSize((prev) => {
      if (prev === 'standard') {
        announce('Text size scaled to 150 percent');
        return 'large-150';
      }
      if (prev === 'large-150') {
        announce('Text size scaled to 200 percent maximum zoom');
        return 'xlarge-200';
      }
      announce('Text size reset to standard 100 percent');
      return 'standard';
    });
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        reducedMotion,
        setReducedMotion,
        toggleReducedMotion,
        cycleFontSize,
        announce,
        announcement,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
