import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

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
