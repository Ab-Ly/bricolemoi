import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const ProfileReviewsTab = ({ ratingInfo }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 font-sans">
      {/* Synthèse globale des avis */}
      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black text-slate-900 font-mono">
            {ratingInfo.totalReviews > 0 ? ratingInfo.averageRating.toFixed(1) : '-'}
          </div>
          <div>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  className={`w-3.5 h-3.5 ${
                    ratingInfo.totalReviews > 0 && s <= Math.round(ratingInfo.averageRating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-slate-300'
                  }`} 
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-bold mt-0.5">
              {ratingInfo.totalReviews > 0
                ? `Basé sur ${ratingInfo.totalReviews} avis client${ratingInfo.totalReviews > 1 ? 's' : ''}`
                : 'Aucun avis client pour le moment'}
            </p>
          </div>
        </div>

        {ratingInfo.totalReviews === 0 ? (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
            🌱 Nouveau Profil
          </span>
        ) : ratingInfo.badgesSummary?.length > 0 && (
          <div className="flex flex-wrap gap-1 max-w-[160px] justify-end">
            {ratingInfo.badgesSummary.slice(0, 3).map((b) => (
              <span key={b.name} className="text-[9px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                {b.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Liste des avis clients */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {ratingInfo.maalemReviews?.length === 0 ? (
          <div className="text-center py-8 text-slate-500 space-y-1">
            <p className="text-xs font-bold">Aucun avis client pour le moment.</p>
            <p className="text-[11px] text-slate-400">Vos évaluations apparaîtront ici après chaque intervention SOS confirmée.</p>
          </div>
        ) : (
          (ratingInfo.maalemReviews || []).map((rev) => (
            <div key={rev.id || rev.intervention_id} className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                    {rev.client_name?.charAt(0) || 'C'}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{rev.client_name || 'Client BricoleMoi'}</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-mono text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{Number(rev.rating !== undefined && rev.rating !== null ? rev.rating : 0).toFixed(1)}</span>
                </div>
              </div>

              {rev.comment && (
                <p className="text-[11px] text-slate-700 italic bg-slate-50 p-2 rounded-xl border border-slate-100 font-medium">
                  "{rev.comment}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
