import { searchRepairProblems } from './semanticSearchService';

/**
 * Connecteur MeiliSearch Haute Performance & Haute Disponibilité
 * Déployé sur votre VPS Coolify avec Fallback Sémantique Local Instantané
 */

const MEILISEARCH_HOST = import.meta.env.VITE_MEILISEARCH_URL || 'http://meilisearch.51.255.46.206.sslip.io';
const MEILISEARCH_API_KEY = import.meta.env.VITE_MEILISEARCH_KEY || 'atA1q2uOuHW5DaKYROy5j4RfcXIDoy40';

/**
 * Recherche instantanée hybride :
 * Tente d'interroger MeiliSearch sur le VPS, et bascule en 0ms sur le dictionnaire sémantique local si indisponible.
 */
export const searchInstantMeili = async (query, options = {}) => {
  if (!query || !query.trim()) {
    return searchRepairProblems('', options.limit || 6);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s max timeout

    const response = await fetch(`${MEILISEARCH_HOST}/indexes/repair_problems/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MEILISEARCH_API_KEY}`
      },
      body: JSON.stringify({
        q: query,
        limit: options.limit || 6,
        attributesToHighlight: ['title', 'title_ar', 'keywords'],
        filter: options.category ? `category = "${options.category}"` : undefined
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return data.hits.map((hit) => ({
          ...hit,
          titleAr: hit.title_ar || hit.titleAr,
          minPrice: hit.min_price || hit.minPrice,
          maxPrice: hit.max_price || hit.maxPrice,
          timeEstimate: hit.time_estimate || hit.timeEstimate
        }));
      }
    }
  } catch (error) {
    // Fallback silencieux vers le moteur sémantique local
  }

  // Fallback local haute précision (Levenshtein + Darija)
  return searchRepairProblems(query, options.limit || 6);
};

/**
 * Synchronisation des documents dans MeiliSearch VPS
 */
export const syncProblemsToMeilisearch = async (problems) => {
  try {
    const response = await fetch(`${MEILISEARCH_HOST}/indexes/repair_problems/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MEILISEARCH_API_KEY}`
      },
      body: JSON.stringify(problems)
    });

    return await response.json();
  } catch (err) {
    console.error('[MeiliSearch] Sync error:', err);
    return { error: err.message };
  }
};
