export const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Green Earth Bowl & Kitchen',
    cuisine: ['Organic', 'Salads', 'Vegan Friendly'],
    rating: 4.9,
    reviewCount: 342,
    prepTimeMin: '15 - 25 min',
    deliveryFee: 25,
    minOrder: 99,
    distance: '1.3 km',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    altText: 'A vibrant bowl filled with fresh quinoa, avocado slices, roasted chickpeas, kale, and cherry tomatoes.',
    accessibilityNotes: 'Step-free entrance, spacious seating layout, digital QR accessibility menu, low ambient music.',
    dietBadges: ['vegan', 'veg', 'vegetarian', 'gf', 'gluten-free', 'df', 'dairy-free', 'high-protein', 'calorie-conscious', 'lower-carb', 'less-spicy'],
    nutritionStatus: 'verified',
    allergenDataSource: 'Direct Kitchen Verification (Updated 2 days ago by Head Chef)',
    categories: [
      {
        id: 'cat-1',
        name: 'Signature Grain Bowls',
        description: 'Nutrient-rich bowls with full ingredient breakdown and zero hidden additives.',
        items: [
          {
            id: 'item-101',
            name: 'Avocado & Ancient Grain Harvest Bowl',
            description: 'Organic warm quinoa, roasted sweet potatoes, fresh avocado, massaged kale, wild mushrooms, and toasted pumpkin seeds with maple tahini dressing.',
            price: 279,
            prepTimeMin: 15,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
            altText: 'Bowl of warm quinoa topped with fan-sliced avocado, orange sweet potato cubes, seeds, and dark leafy greens.',
            ingredients: [
              'Organic Quinoa',
              'Roasted Sweet Potato (Olive Oil, Salt)',
              'Fresh Hass Avocado',
              'Organic Kale',
              'Roasted Wild Mushrooms',
              'Toasted Pumpkin Seeds (Pepitas)',
              'Maple Tahini Dressing (Tahini, Pure Maple Syrup, Lemon Juice, Garlic, Water, Salt)'
            ],
            allergens: [
              { id: 'sesame', status: 'CONTAINS', note: 'Tahini dressing contains ground sesame seeds.' },
              { id: 'peanuts', status: 'FREE_FROM', note: 'Dedicated nut-free dressing preparation area.' },
              { id: 'treenuts', status: 'FREE_FROM', note: 'No tree nuts processed in bowl assembly station.' },
              { id: 'gluten', status: 'FREE_FROM', note: '100% Gluten-free grains used.' },
              { id: 'dairy', status: 'FREE_FROM', note: '100% Dairy-free facility.' }
            ],
            dietTags: ['vegan', 'veg', 'gf', 'df'],
            nutrition: { calories: 520, protein: '14g', carbs: '62g', fat: '24g', sodium: '410mg' },
            customizationGroups: [
              {
                id: 'grp-protein',
                label: 'Choose Extra Protein',
                required: false,
                min: 0,
                max: 1,
                options: [
                  { id: 'opt-tofu', label: 'Organic Baked Tofu', priceDelta: 39, allergens: [{ id: 'soy', status: 'CONTAINS' }] },
                  { id: 'opt-falafel', label: 'Crispy Baked Chickpea Falafel (3pcs)', priceDelta: 59, allergens: [{ id: 'sesame', status: 'MAY_CONTAIN' }] }
                ]
              },
              {
                id: 'grp-dressing',
                label: 'Dressing Preference',
                required: true,
                min: 1,
                max: 1,
                options: [
                  { id: 'opt-tahini', label: 'Maple Tahini Dressing (Standard)', priceDelta: 0, allergens: [{ id: 'sesame', status: 'CONTAINS' }] },
                  { id: 'opt-lemon-vinaigrette', label: 'Zesty Lemon Herb Vinaigrette', priceDelta: 0, allergens: [] }
                ]
              }
            ],
            availability: true
          },
          {
            id: 'item-102',
            name: 'Thai Peanut Power Bowl',
            description: 'Purple rice, shredded purple cabbage, edamame, cucumber ribbons, crushed roasted peanuts, and spicy house peanut sauce.',
            price: 329,
            prepTimeMin: 15,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            altText: 'Colorful bowl with purple cabbage, green edamame beans, cucumber slices, and golden peanut dressing.',
            ingredients: [
              'Forbidden Purple Rice',
              'Shredded Purple Cabbage',
              'Shelled Edamame (Soybeans)',
              'Cucumber Ribbons',
              'Crushed Dry-Roasted Peanuts',
              'Peanut Dressing (Peanut Butter, Tamari Soy Sauce, Lime, Chili Flakes, Rice Vinegar, Sesame Oil)'
            ],
            allergens: [
              { id: 'peanuts', status: 'CONTAINS', note: 'Contains crushed peanuts and house peanut butter sauce.' },
              { id: 'soy', status: 'CONTAINS', note: 'Contains edamame and Tamari soy sauce.' },
              { id: 'sesame', status: 'CONTAINS', note: 'Contains toasted sesame oil in dressing.' },
              { id: 'gluten', status: 'FREE_FROM', note: 'Made with Wheat-Free Tamari.' }
            ],
            dietTags: ['vegan', 'veg', 'gf', 'df'],
            nutrition: { calories: 580, protein: '18g', carbs: '68g', fat: '26g', sodium: '540mg' },
            customizationGroups: [
              {
                id: 'grp-spice',
                label: 'Spice Level',
                required: true,
                min: 1,
                max: 1,
                options: [
                  { id: 'opt-mild', label: 'Mild (No chili)', priceDelta: 0, allergens: [] },
                  { id: 'opt-medium', label: 'Medium (Standard)', priceDelta: 0, allergens: [] },
                  { id: 'opt-spicy', label: 'Extra Spicy Chili Oil', priceDelta: 20, allergens: [] }
                ]
              }
            ],
            availability: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'SafeBite Artisanal Bakery & Cafe',
    cuisine: ['Gluten-Free', 'Bakery', 'Breakfast', 'Coffee'],
    rating: 4.8,
    reviewCount: 512,
    prepTimeMin: '10 - 20 min',
    deliveryFee: 29,
    minOrder: 99,
    distance: '1.9 km',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    altText: 'Display of freshly baked golden loaves of bread, muffins, and pastries on wooden wooden counter.',
    accessibilityNotes: 'Dedicated allergen-free kitchen lines, Braille menus, large print menus, staff trained in allergen isolation.',
    dietBadges: ['gf', 'gluten-free', 'veg', 'vegetarian', 'df', 'dairy-free', 'high-protein', 'calorie-conscious', 'lower-carb'],
    nutritionStatus: 'estimated',
    allergenDataSource: 'Independent Lab Certified 100% Gluten-Free Facility',
    categories: [
      {
        id: 'cat-2',
        name: 'Dedicated Gluten-Free Breads & Paninis',
        description: 'Baked in a 100% gluten-free facility. Zero risk of wheat cross-contamination.',
        items: [
          {
            id: 'item-201',
            name: 'Pesto Avocado Pressed Panini',
            description: 'Artisanal gluten-free sourdough loaf filled with nut-free basil pesto, fresh heirloom tomatoes, ripe avocado, and melted dairy-free mozzarella.',
            price: 229,
            prepTimeMin: 12,
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
            altText: 'Crispy toasted golden sandwich pressed on grill with green pesto and melted vegan cheese oozing out.',
            ingredients: [
              'GF Sourdough Bread (Tapioca starch, Rice flour, Potato starch, Psyllium husk, Yeast, Olive oil, Water, Salt)',
              'Nut-Free Basil Pesto (Fresh Basil, Olive Oil, Garlic, Sunflower Seeds, Nutritional Yeast, Salt)',
              'Heirloom Tomato Slices',
              'Fresh Avocado',
              'Dairy-Free Mozzarella (Filtered Water, Coconut Oil, Potato Starch, Sea Salt, Natural Flavors)'
            ],
            allergens: [
              { id: 'gluten', status: 'FREE_FROM', note: 'Certified 100% Gluten Free facility (<5ppm).' },
              { id: 'dairy', status: 'FREE_FROM', note: '100% Plant-based dairy-free cheese used.' },
              { id: 'treenuts', status: 'FREE_FROM', note: 'Pesto made with sunflower seeds, strictly nut-free.' },
              { id: 'peanuts', status: 'FREE_FROM', note: 'No peanuts handled in bakery premises.' }
            ],
            dietTags: ['vegan', 'veg', 'gf', 'df'],
            nutrition: { calories: 440, protein: '9g', carbs: '52g', fat: '22g', sodium: '480mg' },
            customizationGroups: [
              {
                id: 'grp-side',
                label: 'Choice of Side',
                required: true,
                min: 1,
                max: 1,
                options: [
                  { id: 'opt-chips', label: 'Baked Kettle Sea Salt Chips', priceDelta: 0, allergens: [] },
                  { id: 'opt-fruit', label: 'Fresh Organic Apple Slices', priceDelta: 0, allergens: [] }
                ]
              }
            ],
            availability: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Saffron & Spice Authentic Kitchen',
    cuisine: ['Indian', 'Curries', 'Vegan & Veg'],
    rating: 4.7,
    reviewCount: 289,
    prepTimeMin: '20 - 35 min',
    deliveryFee: 35,
    minOrder: 129,
    distance: '3.4 km',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    altText: 'Traditional copper bowls containing rich aromatic red and yellow curries served with basmati rice.',
    accessibilityNotes: 'Clear verbal order confirmation, physical menus with high contrast large print, ramp access.',
    dietBadges: ['veg', 'vegetarian', 'vegan', 'gf', 'gluten-free', 'df', 'dairy-free', 'high-protein', 'calorie-conscious', 'lower-carb', 'less-spicy'],
    nutritionStatus: 'unavailable',
    allergenDataSource: 'Kitchen Allergen Protocol Verified Sep 2026',
    categories: [
      {
        id: 'cat-3',
        name: 'Authentic Curries & Dal',
        description: 'Slow-cooked traditional dishes with transparent spice and dairy disclosures.',
        items: [
          {
            id: 'item-301',
            name: 'Creamy Butter Chicken',
            description: 'Tender free-range chicken simmered in a velvet tomato, butter, and cashew cream sauce infused with roasted fenugreek.',
            price: 279,
            prepTimeMin: 25,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
            altText: 'Rich orange-red curry dish garnished with swirl of cream and fresh cilantro leaves.',
            ingredients: [
              'Free-Range Chicken Breast',
              'Ripe Tomatoes & Tomato Paste',
              'Grass-Fed Butter (Dairy)',
              'Heavy Cream (Dairy)',
              'Cashew Paste (Tree Nuts)',
              'Garlic, Ginger, Garam Masala Spices',
              'Kasoori Methi (Dried Fenugreek)'
            ],
            allergens: [
              { id: 'dairy', status: 'CONTAINS', note: 'Contains butter and heavy dairy cream.' },
              { id: 'treenuts', status: 'CONTAINS', note: 'Sauce thickened with cashew nut paste.' },
              { id: 'gluten', status: 'MAY_CONTAIN', note: 'Curry is GF; served in kitchen that bakes Naan bread (wheat).' }
            ],
            dietTags: [],
            nutrition: null,
            customizationGroups: [
              {
                id: 'grp-rice',
                label: 'Accompaniment',
                required: true,
                min: 1,
                max: 1,
                options: [
                  { id: 'opt-basmati', label: 'Steamed Cumin Basmati Rice (GF)', priceDelta: 0, allergens: [] },
                  { id: 'opt-naan', label: 'Garlic Butter Naan Bread', priceDelta: 39, allergens: [{ id: 'gluten', status: 'CONTAINS' }, { id: 'dairy', status: 'CONTAINS' }] }
                ]
              }
            ],
            availability: true
          },
          {
            id: 'item-302',
            name: 'Yellow Tadka Dal',
            description: 'Yellow split lentils tempered with cumin seeds, turmeric, fresh tomatoes, and green chilies. Vegan & Gluten-free.',
            price: 179,
            prepTimeMin: 20,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
            altText: 'Golden yellow lentil dal in a stainless steel bowl topped with fried cumin seeds and fresh coriander.',
            ingredients: [
              'Yellow Toor Dal & Moong Dal (Split Lentils)',
              'Fresh Tomatoes',
              'Cumin Seeds, Mustard Seeds, Turmeric, Asafoetida (Hing)',
              'Vegetable Oil',
              'Fresh Cilantro'
            ],
            allergens: [
              { id: 'gluten', status: 'FREE_FROM', note: 'Certified gluten-free lentils and spices used.' },
              { id: 'dairy', status: 'FREE_FROM', note: 'Tempered in vegetable oil, zero butter/ghee.' },
              { id: 'peanuts', status: 'FREE_FROM', note: 'No peanuts processed in dal cookware.' },
              { id: 'treenuts', status: 'FREE_FROM', note: 'No tree nuts in dal preparation.' }
            ],
            dietTags: ['vegan', 'veg', 'gf', 'df'],
            nutrition: null,
            customizationGroups: [],
            availability: true
          }
        ]
      }
    ]
  }
];
