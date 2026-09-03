import React, { useState } from 'react';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getServiceDisplay } from '../hooks/useClientViewState';
import { formatDateTime } from '../../../utils/dateUtils';
import { PaginationControls } from '../../common/PaginationControls';

// Parser intelligent des avis et badges clients pour éviter le texte brut "[Badges: ...]"
const parseCommentAndBadges = (rawComment, rawBadges) => {
  let badges = Array.isArray(rawBadges) ? [...rawBadges] : [];
  let commentText = typeof rawComment === 'string' ? rawComment.trim() : '';

  // Extraire les badges inclus dans "[Badges: ...]"
  const match = commentText.match(/\[Badges:\s*([^\]]+)\]/i);
  if (match) {
    const extracted = match[1]
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    badges = [...new Set([...badges, ...extracted])];
    commentText = commentText.replace(/\[Badges:[^\]]+\]/gi, '').trim();
    // Nettoyer les guillemets résiduels
    commentText = commentText.replace(/^["']|["']$/g, '').trim();
  }

  return { commentText, badges };
};

export const ClientHistoryList = ({
  completedClientInterventions = [],
  paginatedCompletedInterventions = [],
  totalClientHistoryPages = 1,
  clientHistoryPage = 1,
  setClientHistoryPage,
  setReviewModalInt,
  onOpenFullHistory
}) => {
  if (completedClientInterventions.length === 0) return null;

  // Pattern Startup (Uber / Airbnb) : Limiter l'accueil aux 2 demandes les plus récentes
  const recentDemands = completedClientInterventions.slice(0, 2);
  const hasMore = completedClientInterventions.length > 2;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200/90 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>Historique de vos Demandes ({completedClientInterventions.length})</span>
        </h3>
        {hasMore && (
          <span className="text-xs text-slate-500 font-medium">
            2 plus récentes affichées
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {recentDemands.map((item) => {
          const serviceInfo = getServiceDisplay(item.service_type);
          const { commentText, badges } = parseCommentAndBadges(item.comment, item.badges);

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 shadow-2xs">
                    <span className="text-sm">{serviceInfo.icon}</span>
                    <span>{serviceInfo.label}</span>
                  </span>

                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-black shadow-2xs flex items-center gap-1.5 ${
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
                    {item.final_agreed_price ? (
                      <span className="font-mono font-black text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {item.final_agreed_price} DH
                      </span>
                    ) : (
                      <span className="font-mono font-bold text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                        🤝 Accord Direct
                      </span>
                    )}
                  </div>

                  <p className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.district}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{formatDateTime(item.completed_at || item.created_at, 'long')}</span>
                  </p>

                  {item.maalem_name && (
                    <p className="text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                      🛠️ Réalisé par : <strong>{item.maalem_name}</strong>
                    </p>
                  )}

                  {/* Badges d'évaluation & Commentaire rendu propre sans crochets */}
                  {(badges.length > 0 || commentText) && (
                    <div className="pt-1.5 space-y-1.5">
                      {badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {badges.map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-bold shadow-2xs"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      {commentText && (
                        <p className="text-[11px] text-slate-700 italic bg-amber-50/40 p-2.5 rounded-xl border border-amber-100 font-medium">
                          ⭐ Votre avis : "{commentText}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {item.rating ? (
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1 shadow-2xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>Note : {item.rating} / 5</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setReviewModalInt(item)}
                      className="text-[11px] text-slate-500 hover:text-blue-600 underline font-medium cursor-pointer"
                    >
                      Modifier
                    </button>
                  </div>
                ) : item.status === 'COMPLETED' ? (
                  <button
                    type="button"
                    onClick={() => setReviewModalInt(item)}
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Donner mon Avis</span>
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

      {/* Bouton tactile plein écran pour consulter tout l'historique sans surcharger l'accueil */}
      {hasMore && (
        <button
          type="button"
          onClick={onOpenFullHistory}
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer touch-target-44"
        >
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Consulter tout mon historique ({completedClientInterventions.length} demandes terminées)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  );
};
