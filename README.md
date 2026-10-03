# SafeBite
##Accessible & Transparent Food Ordering

An accessible and transparent food-ordering MVP designed to make restaurant discovery, food information, nutrition, allergens, customization, pricing, and order tracking easier to understand.

Unlike a conventional food-ordering interface that primarily focuses on browsing and ordering, this platform focuses on transparency throughout the entire ordering journey — helping users understand what they are ordering, what it contains, what it may cost after customization, and what information is available before they place an order.

«Know what you're ordering before you order it.»

---

##The Problem

When ordering food online, users may not always have clear information about:

- What ingredients a dish contains
- Which allergens may be present
- Whether nutrition information is verified or estimated
- Whether a food matches their dietary preferences
- How customizations affect the final price
- What is happening after an order is placed

Accessibility barriers can make this information even harder to understand and use.

---

##Our Solution

Accessible & Transparent Food Ordering brings important food and ordering information into a clear, accessible interface.

The platform helps users:

- Discover restaurants and dishes easily.
- Understand ingredients and allergen information before ordering.
- Distinguish between verified, estimated, and unavailable nutrition information.
- Find food using nutrition-focused preferences.
- Receive allergen warnings based on their saved profile.
- Understand how customization affects their order.
- See an itemized and transparent final price.
- Follow the order through a clear tracking experience.

---

##Key Features

🍽️ Transparent Restaurant Discovery

Users can browse and search restaurants using:

- Restaurant name
- Cuisine
- Dish
- Ingredient

Restaurant cards provide important information at a glance, including the availability of nutrition information.

Each restaurant can display one of three nutrition statuses:

✓ Nutrition: Verified

Nutrition information has been provided by the restaurant.

~ Nutrition: Estimated

Nutrition values are approximate estimates based on available ingredient and portion information.

— Nutrition: Unavailable

Reliable nutrition information is not available.

This prevents unavailable information from being presented as if it were verified.

---

##🥗 Transparent Nutrition

Food items can display nutritional information such as:

- Protein
- Calories
- Carbohydrates
- Fat

Estimated values are clearly marked as approximate instead of being presented as exact numbers.

This allows users to understand the level of certainty behind the information they see.

---

##⚠️ Transparent Allergen Information

Users can create an allergen profile and receive warnings when a food item or selected customization may conflict with their saved allergens.

The system can identify potential conflicts in:

- Food ingredients
- Customizations
- Add-ons

Warnings are shown before the user completes the order.

---

🎯 Nutrition-Focused Food Preferences

Users can set preferences based on what matters to them.

Available preferences include:

- 💪 High Protein
- 🔥 Calorie Conscious
- 🍚 Lower Carb
- 🥗 Vegetarian
- 🌱 Vegan
- 🥛 Dairy-Free
- 🌾 Gluten-Free
- 🌶️ Less Spicy

These preferences help users discover food that matches their individual choices.

The platform presents nutrition information factually and does not make medical or weight-loss claims.

---

##🍔 Transparent Food Customization

Users can customize menu items by:

- Adding ingredients
- Removing ingredients
- Selecting available options
- Adding extras
- Adjusting quantities

The interface clearly shows how customization affects the order.

Where applicable, changes can be reflected in:

- Price
- Ingredients
- Nutrition information
- Allergen warnings

---

##💰 Transparent Pricing

Users can see an itemized breakdown of their order.

The cart displays:

- Food item price
- Customizations
- Add-ons
- Quantity
- Subtotal
- Additional charges
- Final total

This helps users understand why they are paying the final amount instead of seeing only a single total at checkout.

---

##🛒 Transparent Checkout

The checkout experience provides a final review before placing the order.

Users can review:

- Ordered items
- Selected customizations
- Quantity
- Nutrition information where available
- Allergen warnings
- Delivery details
- Price breakdown
- Final amount

The prototype currently uses a simulated checkout flow.

---

##📦 Transparent Order Tracking

Transparency continues even after the order is placed.

The order-tracking experience provides visibility into:

Order Confirmed → Preparing → Ready → Picked Up → On the Way → Delivered

The tracking interface can display:

- Current order status
- Preparation progress
- Delivery progress
- Estimated arrival time
- Order timeline
- Delivery information

The current prototype uses simulated tracking data.

Future versions can connect this experience to real-time delivery location and traffic data.

---

##♿ Accessible & Inclusive Design

Accessibility is integrated throughout the platform rather than being treated as a separate feature.

The prototype includes:

- Adjustable text size
- High-contrast mode
- Reduced-motion mode
- Skip navigation
- Screen-reader announcements
- Clear labels
- Keyboard-friendly navigation
- Large and understandable interaction areas
- Text + icons instead of relying only on color

The goal is to make important food and ordering information easier to perceive and understand for users with different accessibility needs.

---

##🔍 Transparency Throughout the Journey

The platform is built around four questions:

What am I ordering?

Ingredients + nutrition + allergen information

Does it work for me?

Food preferences + allergen profile

What will I pay?

Customization + itemized pricing

What happens after I order?

Preparation + delivery status + order tracking

This makes transparency a part of the complete experience rather than a single feature.

---

##🛠️ Tech Stack

- React — Frontend UI
- Vite — Development and build tooling
- Tailwind CSS — Styling and responsive design
- Lucide React — Interface icons

---

##📊 Current Prototype Scope

This project is currently an MVP/prototype using sample restaurant and menu data.

The following experiences are simulated:

- Restaurant and menu data
- Cart processing
- Checkout
- Order status updates
- Order tracking

The prototype focuses on demonstrating the user experience, accessibility, transparency, and overall product concept.

It is not intended to represent a production-ready food-delivery backend.

---

##🚀 Future Enhancements

Future versions can extend the prototype with:

- Real restaurant and menu data
- Restaurant-side nutrition verification
- User authentication
- Backend database
- Customer and delivery-partner accounts
- Real-time order status updates
- Delivery-partner dashboard
- Live delivery location tracking
- Google Maps integration
- Route visualization
- Traffic-aware dynamic ETA
- Real-time preparation updates
- Production payment integration

---

##💻 Getting Started

Requirements

- Node.js
- npm

Installation

Clone the repository and install dependencies:

npm install

Run Locally

npm run dev

Open the local development URL displayed in the terminal.

---

##🎯 Project Goal

Accessible & Transparent Food Ordering aims to make food ordering clearer, more accessible, and more transparent by giving users the information they need before, during, and after placing an order.

«From food discovery to delivery, nothing important should be hidden from the user.»
