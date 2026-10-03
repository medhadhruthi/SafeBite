# SafeBite

Accessible food ordering with clear nutrition, allergen, customization, and pricing information. SafeBite is a React MVP that demonstrates restaurant discovery through a simulated checkout and order-tracking flow.

## MVP Features

- Browse and search sample restaurants, cuisines, menu items, and ingredients.
- Review menu descriptions, ingredients, dietary tags, INR prices, and customization choices.
- See restaurant nutrition status as Verified, Estimated, or Unavailable; estimated item values are marked approximate.
- Save allergen and dietary preferences, with warnings when menu items or selected options conflict with the allergen profile.
- Review itemized cart totals, delivery charges, illustrative service fee and GST, and courier tip choices.
- Complete a simulated checkout and view simulated order progress.
- Use accessibility controls for text size, high contrast, and reduced motion, plus skip navigation, keyboard-operable controls, and screen-reader announcements.

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Lucide React

## Getting Started

### Requirements

- Node.js
- npm

### Install dependencies and start the development server

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Prototype Scope and Important Notes

Restaurant and menu information is sample data in `src/data/mockData.js`. Cart, checkout, payment, and order progress are simulated; this MVP does not submit real orders, process payments, or connect to a delivery service. Prices, service charges, and GST are illustrative prototype values.

Nutrition and allergen information is for demonstration only. Nutrition status describes the sample data and is not medical advice or a guarantee that a dish is safe for a particular allergy. Confirm ingredients and cross-contact risks directly with the restaurant before ordering.

## Project Structure

```text
src/
  components/    Discovery, menu, cart, checkout, accessibility, profile, and tracking UI
  context/       Cart, accessibility, and user profile state
  data/          Sample restaurant, menu, nutrition, and allergen data
  utils/         Shared formatting helpers
```
