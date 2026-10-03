import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-700 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-xl focus:ring-4 focus:ring-yellow-400 text-lg"
    >
      Skip to main content
    </a>
  );
}
