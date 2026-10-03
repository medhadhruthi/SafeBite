import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccessibility } from './AccessibilityContext';

const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const { announce } = useAccessibility();
  
  // Default profile setup for demo (User has 'peanuts' & 'dairy' as default allergens for immediate testing)
  const [savedAllergens, setSavedAllergens] = useState(['peanuts', 'gluten']);
  const [savedDiets, setSavedDiets] = useState(['veg']);

  const toggleAllergen = (allergenId, allergenName) => {
    setSavedAllergens((prev) => {
      const exists = prev.includes(allergenId);
      const next = exists ? prev.filter((id) => id !== allergenId) : [...prev, allergenId];
      announce(
        exists
          ? `Removed ${allergenName} from your allergen profile safety filter`
          : `Added ${allergenName} to your allergen profile safety filter`
      );
      return next;
    });
  };

  const toggleDiet = (dietId, dietName) => {
    setSavedDiets((prev) => {
      const exists = prev.includes(dietId);
      const next = exists ? prev.filter((id) => id !== dietId) : [...prev, dietId];
      announce(
        exists
          ? `Removed ${dietName} from your dietary preferences`
          : `Added ${dietName} to your dietary preferences`
      );
      return next;
    });
  };

  const clearAllFilters = () => {
    setSavedAllergens([]);
    setSavedDiets([]);
    announce('Cleared all dietary and allergen profile safety filters');
  };

  return (
    <UserProfileContext.Provider
      value={{
        savedAllergens,
        savedDiets,
        toggleAllergen,
        toggleDiet,
        clearAllFilters,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
