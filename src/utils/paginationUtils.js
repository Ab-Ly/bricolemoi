/**
 * Utilitaires de Pagination (In-Memory & Cursor-based)
 * BricoleMoi - Modern Clean & Trust
 */

/**
 * Pagine un tableau en mémoire de manière robuste.
 * @param {Array} items - Tableau d'éléments
 * @param {number} page - Numéro de page (1-indexed)
 * @param {number} pageSize - Nombre d'éléments par page
 * @returns {{ items: Array, totalItems: number, totalPages: number, currentPage: number, startIndex: number, endIndex: number, hasNextPage: boolean, hasPrevPage: boolean }}
 */
export const paginateArray = (items = [], page = 1, pageSize = 10) => {
  const safeItems = Array.isArray(items) ? items : [];
  const safePageSize = Math.max(1, parseInt(pageSize, 10) || 10);
  const totalItems = safeItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, parseInt(page, 10) || 1), totalPages);

  const startIndex = (currentPage - 1) * safePageSize;
  const endIndex = Math.min(startIndex + safePageSize, totalItems);
  const paginatedItems = safeItems.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage,
    startIndex: totalItems === 0 ? 0 : startIndex + 1,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Prépare les paramètres de requête de type Cursor / Keyset pour Supabase/PostgreSQL.
 * Évite le problème de Deep Paging (OFFSET lent).
 * @param {string|number|null} cursorValue - Valeur du curseur (ex: created_at du dernier élément ou id)
 * @param {number} limit - Nombre d'éléments à récupérer
 * @param {'asc'|'desc'} direction - Ordre de tri
 * @returns {{ cursor: string|null, limit: number, direction: 'asc'|'desc' }}
 */
export const createCursorQueryConfig = (cursorValue = null, limit = 20, direction = 'desc') => {
  return {
    cursor: cursorValue || null,
    limit: Math.max(1, parseInt(limit, 10) || 20),
    direction: direction.toLowerCase() === 'asc' ? 'asc' : 'desc'
  };
};
