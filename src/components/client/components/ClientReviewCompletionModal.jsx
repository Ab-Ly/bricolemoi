import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { SENTIMENT_FEEDBACK, POSITIVE_BADGES, NEGATIVE_BADGES } from '../hooks/useClientViewState';

export const ClientReviewCompletionModal = ({
  reviewModalInt,
  setReviewModalInt,
  pendingCompletionModalInt,
  setPendingCompletionModalInt,
  setDismissedCompletionIds,
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  selectedBadges,
  toggleBadge,
  tipAmount,
  setTipAmount,
  comment,
  setComment,
  handleReviewSubmit
}) => {
  return (
    <AnimatePresence>
      {/* 1. Modale Évaluation / Avis (5 étoiles) */}
      {reviewModalInt && (
        <motion.div
          key="review-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-2xl space-y-4 text-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 font-sans">
                ⭐ Évaluer la Prestation
              </h3>
              <button
                type="button"
                onClick={() => setReviewModalInt(null)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Étoiles Interactives */}
              <div className="text-center space-y-2">
                <div className="flex justify-center items-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeValue = hoverRating || rating;
                    const isFilled = star <= activeValue;

                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setRating(star);
                          if (star <= 3 && selectedBadges.some((b) => POSITIVE_BADGES.includes(b))) {
                            toggleBadge('⏱️ Retard important');
                          } else if (star >= 4 && selectedBadges.some((b) => NEGATIVE_BADGES.includes(b))) {
                            toggleBadge('⏱️ Très Ponctuel');
                          }
                        }}
                        className="p-1 transition-all duration-200 hover:scale-125 active:scale-95 cursor-pointer"
                      >
                        <Star
                          className={`w-9 h-9 transition-all duration-200 ${
                            isFilled
                              ? activeValue === 5
                                ? 'text-amber-500 fill-amber-500'
                                : activeValue >= 4
                                ? 'text-emerald-600 fill-emerald-600'
                                : activeValue === 3
                                ? 'text-blue-600 fill-blue-600'
                                : 'text-amber-600 fill-amber-600'
                              : 'text-slate-300 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Sentiment Badge Dynamique */}
                <motion.div
                  key={hoverRating || rating}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-block px-3.5 py-1 rounded-full text-xs font-black border ${
                    SENTIMENT_FEEDBACK[hoverRating || rating]?.bg
                  } ${SENTIMENT_FEEDBACK[hoverRating || rating]?.color} shadow-xs`}
                >
                  {SENTIMENT_FEEDBACK[hoverRating || rating]?.text}
                </motion.div>
              </div>

              {/* Badges / Tags Adaptatifs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {rating >= 4 ? '✨ Points forts :' : '⚠️ Points à améliorer :'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(rating >= 4 ? POSITIVE_BADGES : NEGATIVE_BADGES).map((badge) => {
                    const isSelected = selectedBadges.includes(badge);
                    return (
                      <button
                        key={badge}
                        type="button"
                        onClick={() => toggleBadge(badge)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? rating >= 4
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pourboire Optionnel */}
              {rating >= 4 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>🎁 Pourboire (Optionnel) :</span>
                    <span className="text-[10px] text-amber-800 font-mono font-bold">
                      100% reversé à l'artisan
                    </span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 10, 20, 50].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setTipAmount(amount)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          tipAmount === amount
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs scale-105'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {amount === 0 ? 'Aucun' : `+${amount} DH`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Commentaire Détaillé */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Commentaire :</label>
                <textarea
                  rows={3}
                  placeholder={
                    rating >= 4
                      ? 'Partagez votre expérience...'
                      : 'Décrivez le problème rencontré...'
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>Envoyer mon Avis &amp; Clôturer</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* 2. Modale Surgissante Automatique de Fin de Chantier */}
      {pendingCompletionModalInt && (
        <motion.div
          key="pending-completion-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            className="bg-white border border-emerald-200 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-2xl space-y-4 text-slate-900 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-extrabold text-sm uppercase tracking-wide">
                  Fin de Chantier — Confirmation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  const id = pendingCompletionModalInt.id;
                  setDismissedCompletionIds((prev) => {
                    const next = Array.from(new Set([...prev, id]));
                    try {
                      localStorage.setItem(
                        'bricolemoi_dismissed_completions',
                        JSON.stringify(next)
                      );
                    } catch (e) {}
                    return next;
                  });
                  setPendingCompletionModalInt(null);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-all cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed">
                L'artisan <strong>{pendingCompletionModalInt.maalem_name || 'Maâlem'}</strong> a
                signalé la fin de l'intervention pour votre demande de{' '}
                <strong>{pendingCompletionModalInt.subcategory || 'Dépannage'}</strong>.
              </p>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Montant Total Convenu :
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">
                    Règlement direct à l'artisan
                  </span>
                  <span className="text-lg font-black font-mono text-emerald-800">
                    {pendingCompletionModalInt.final_agreed_price ||
                      pendingCompletionModalInt.estimated_price_min ||
                      150}{' '}
                    DH
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic text-center">
                En confirmant, vous validez la bonne exécution des travaux et accédez à l'évaluation du
                Maâlem.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  const intToComplete = pendingCompletionModalInt;
                  if (!intToComplete) return;
                  const id = intToComplete.id;
                  setDismissedCompletionIds((prev) => {
                    const next = Array.from(new Set([...prev, id]));
                    try {
                      localStorage.setItem(
                        'bricolemoi_dismissed_completions',
                        JSON.stringify(next)
                      );
                    } catch (e) {}
                    return next;
                  });
                  setPendingCompletionModalInt(null);
                  setReviewModalInt(intToComplete);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmer &amp; Évaluer la Prestation</span>
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setDismissedCompletionIds((prev) => [...prev, pendingCompletionModalInt.id]);
                  setPendingCompletionModalInt(null);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Vérifier sur place / Plus tard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
