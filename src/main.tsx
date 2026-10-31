import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { SITE, isConfigured } from './config/site';

if (import.meta.env.DEV && !isConfigured(SITE.squareBookingUrl)) {
  console.warn(
    '[BIGGS] Square booking URL is still the placeholder. Set `squareBookingUrl` in src/config/site.ts — every BOOK button uses it.',
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
