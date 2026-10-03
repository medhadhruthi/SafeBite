import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';
import { UserProfileProvider } from './context/UserProfileContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <UserProfileProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProfileProvider>
    </AccessibilityProvider>
  </React.StrictMode>
);
