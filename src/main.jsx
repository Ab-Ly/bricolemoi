import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// BricoleMoi Version 3.2.0 - Cache Invalidation & Direct Chunk Resolution
export const APP_VERSION = '3.2.0';
// Rechargement automatique en cas de nouveau déploiement (invalidation des chunks Vite)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    window.location.reload();
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
