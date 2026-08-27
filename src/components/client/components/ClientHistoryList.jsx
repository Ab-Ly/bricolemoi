import React from 'react';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getServiceDisplay } from '../hooks/useClientViewState';
import { formatDateTime } from '../../../utils/dateUtils';

export const ClientHistoryList = ({
  completedClientInterventions,
  paginatedCompletedInterventions,
  totalClientHistoryPages,
  clientHistoryPage,
  setClientHistoryPage,
  setReviewModalInt
}) => {
  if (completedClientInterventions.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          Historique de vos Demandes ({completedClientInterventions.length})
        </h3>
        {totalClientHistoryPages > 1 && (
          <p className="text-xs text-slate-500 font-medium">
            Page {clientHistoryPage} sur {totalClientHistoryPages}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedCompletedInterventions.map((item) => {
          const serviceInfo = getServiceDisplay(item.service_type);

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 shadow-xs">
                    <span className="text-sm">{serviceInfo.icon}</span>
                    <span>{serviceInfo.label}</span>
                  </span>

                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                    <span>{item.status === 'COMPLETED' ? 'Terminé & Validé' : 'Annulé'}</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-sm">{item.subcategory || 'Dépannage'}</p>
                    {item.final_agreed_price && (
                      <span className="font-mono font-black text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {item.final_agreed_price} DH
                      </span>
                    )}
                  </div>
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.district}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{formatDateTime(item.completed_at || item.created_at, 'long')}</span>
                  </p>

                  {item.maalem_name && (
                    <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200 font-medium">
                      🛠️ Réalisé par : <strong>{item.maalem_name}</strong>
                    </p>
                  )}

                  {item.comment && (
                    <p className="text-[11px] text-slate-600 italic bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                      ⭐ Votre avis : "{item.comment}"
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {item.rating ? (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>Note : {item.rating} / 5</span>
                  </span>
                ) : item.status === 'COMPLETED' ? (
                  <button
                    onClick={() => setReviewModalInt(item)}
                    className="px-3.5 py-2 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs rounded-xl hover:bg-amber-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Laisser un Avis</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">Demande clôturée</span>
                )}

                <span className="text-[10px] font-mono text-slate-400">
                  ID: #{String(item.id).slice(0, 8)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls Client */}
      {totalClientHistoryPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setClientHistoryPage((p) => Math.max(1, p - 1))}
            disabled={clientHistoryPage === 1}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
              clientHistoryPage === 1
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalClientHistoryPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setClientHistoryPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                  clientHistoryPage === pageNum
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setClientHistoryPage((p) => Math.min(totalClientHistoryPages, p + 1))}
            disabled={clientHistoryPage === totalClientHistoryPages}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
              clientHistoryPage === totalClientHistoryPages
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
            }`}
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
