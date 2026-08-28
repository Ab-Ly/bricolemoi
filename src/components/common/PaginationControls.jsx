import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Composant de contrôle de pagination unifié
 * Design : Modern Clean & Trust
 */
export const PaginationControls = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  startIndex = 0,
  endIndex = 0,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  className = '',
  itemLabel = 'éléments'
}) => {
  if (totalItems === 0 || totalPages <= 1) {
    if (totalItems > 0 && totalPages <= 1 && pageSizeOptions && onPageSizeChange) {
      return (
        <div className={`flex items-center justify-between py-3 text-xs text-slate-500 font-medium ${className}`}>
          <span>
            Affichage de <strong>{startIndex}</strong> à <strong>{endIndex}</strong> sur <strong>{totalItems}</strong> {itemLabel}
          </span>
        </div>
      );
    }
    return null;
  }

  // Calcul des numéros de pages à afficher (ex: [1, 2, 3, 4, 5])
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none border-t border-slate-100 ${className}`}>
      {/* Information sur les éléments affichés */}
      <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
        <span>
          Affichage de <strong className="text-slate-800">{startIndex}</strong> à <strong className="text-slate-800">{endIndex}</strong> sur <strong className="text-slate-800">{totalItems}</strong> {itemLabel}
        </span>

        {pageSizeOptions && onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200">
            <span className="text-[11px] text-slate-400">Par page :</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                if (onPageChange) onPageChange(1);
              }}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Boutons de pagination */}
      <div className="flex items-center gap-1">
        {/* Première page */}
        {currentPage > 2 && totalPages > 4 && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="Première page"
            className="p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        )}

        {/* Page précédente */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Page précédente"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Précédent</span>
        </button>

        {/* Numéros de page */}
        <div className="flex items-center gap-1 px-1">
          {pages[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => onPageChange(1)}
                className="w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95"
              >
                1
              </button>
              {pages[0] > 2 && <span className="text-slate-400 px-0.5 text-xs font-bold">...</span>}
            </>
          )}

          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30'
                    : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                }`}
              >
                {p}
              </button>
            );
          })}

          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <span className="text-slate-400 px-0.5 text-xs font-bold">...</span>
              )}
              <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Page suivante */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Page suivante"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dernière page */}
        {currentPage < totalPages - 1 && totalPages > 4 && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Dernière page"
            className="p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
