import { lazy } from 'react';

/**
 * Resilient Lazy Loading Helper
 * Intercepte les erreurs de chargement de chunks (déploiements Vercel / Vite) et recharge
 * automatiquement la page pour récupérer la version la plus récente du bundle.
 */
export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('bricolemoi_chunk_reload') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('bricolemoi_chunk_reload', 'false');
      return component;
    } catch (error) {
      console.warn('[lazyWithRetry] Nouveau déploiement détecté, rechargement automatique de la page :', error?.message);
      if (!pageHasBeenForceRefreshed) {
        window.sessionStorage.setItem('bricolemoi_chunk_reload', 'true');
        window.location.reload();
        return { default: () => null };
      }
      throw error;
    }
  });
