export const ALLERGENS = [
  { id: 'gluten', name: 'Gluten', icon: '🌾', category: 'Grain', severityNote: 'May cause severe celiac reaction or intestinal distress.' },
  { id: 'peanuts', name: 'Peanuts', icon: '🥜', category: 'Nuts', severityNote: 'High risk of severe anaphylaxis.' },
  { id: 'treenuts', name: 'Tree Nuts', icon: '🌰', category: 'Nuts', severityNote: 'High risk of severe allergic reaction (almonds, walnuts, cashews).' },
  { id: 'dairy', name: 'Dairy / Milk', icon: '🥛', category: 'Dairy', severityNote: 'Contains lactose and milk proteins (casein/whey).' },
  { id: 'eggs', name: 'Eggs', icon: '🥚', category: 'Poultry', severityNote: 'Contains egg white or yolk proteins.' },
  { id: 'soy', name: 'Soybeans / Soy', icon: '🫘', category: 'Legume', severityNote: 'Found in lecithin, soy sauce, and oil derivative blends.' },
  { id: 'shellfish', name: 'Shellfish', icon: '🦐', category: 'Seafood', severityNote: 'Crustaceans and mollusks (shrimp, crab, lobster, oysters).' },
  { id: 'fish', name: 'Fish', icon: '🐟', category: 'Seafood', severityNote: 'Finned fish (salmon, tuna, cod).' },
  { id: 'sesame', name: 'Sesame', icon: '🫐', category: 'Seed', severityNote: 'Sesame seeds, tahini, or sesame oil.' },
];

export const NUTRITION_TAGS = [
  { id: 'high-protein', name: 'High Protein', icon: '💪', description: '20g+ protein per serving for strength and satiety' },
  { id: 'calorie-conscious', name: 'Calorie Conscious', icon: '🔥', description: 'Lightweight options designed to support mindful intake' },
  { id: 'lower-carb', name: 'Lower Carb', icon: '🍚', description: 'Balanced meals with a lower carbohydrate profile' },
  { id: 'vegetarian', name: 'Vegetarian', icon: '🥗', description: 'No meat, poultry, or seafood' },
  { id: 'vegan', name: 'Vegan', icon: '🌱', description: '100% plant-based, no animal byproducts' },
  { id: 'dairy-free', name: 'Dairy-Free', icon: '🥛', description: 'Contains no milk products or derivatives' },
  { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾', description: 'Made without wheat, barley, rye, or oats' },
  { id: 'less-spicy', name: 'Less Spicy', icon: '🌶️', description: 'Milder flavor profile with lower heat' },
];

export const DIETARY_TAGS = [
  { id: 'veg', name: 'Vegetarian', icon: '🥬', description: 'No meat, poultry, or seafood' },
  { id: 'vegan', name: 'Vegan', icon: '🌱', description: '100% plant-based, no animal byproducts' },
  { id: 'gf', name: 'Gluten-Free', icon: '🌾❌', description: 'Made without wheat, barley, rye, or oats' },
  { id: 'df', name: 'Dairy-Free', icon: '🥛❌', description: 'Contains no milk products or derivatives' },
  { id: 'keto', name: 'Low Carb / Keto', icon: '🥑', description: 'High healthy fat, low sugar and carbohydrates' },
  { id: 'high-protein', name: 'High Protein', icon: '💪', description: 'Protein-forward meal for strength and satiety' },
  { id: 'calorie-conscious', name: 'Calorie Conscious', icon: '🔥', description: 'Lower calorie option for balanced choices' },
  { id: 'lower-carb', name: 'Lower Carb', icon: '🍚', description: 'Reduced carb profile with lighter energy load' },
  { id: 'less-spicy', name: 'Less Spicy', icon: '🌶️', description: 'Milder flavor profile with lower heat' },
];

export const ALLERGEN_STATUS_TYPES = {
  CONTAINS: { label: 'Contains', badgeClass: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-200 dark:border-red-800', ariaPrefix: 'Contains allergen' },
  MAY_CONTAIN: { label: 'May Contain (Cross-contact)', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800', ariaPrefix: 'May contain allergen due to shared equipment' },
  FREE_FROM: { label: 'Free From', badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800', ariaPrefix: 'Certified free from allergen' },
  NOT_CONFIRMED: { label: 'Not Confirmed', badgeClass: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700', ariaPrefix: 'Allergen safety not confirmed by kitchen' },
};
