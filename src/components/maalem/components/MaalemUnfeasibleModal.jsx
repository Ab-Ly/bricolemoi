import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export const MaalemUnfeasibleModal = ({
  unreachableModalLead,
  setUnreachableModalLead,
  unreachableReason,
  setUnreachableReason,
  declareMissionUnfeasible,
  abandonActiveMission
}) => {
  return (
    <AnimatePresence>
      {unreachableModalLead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 text-slate-900 max-h-modal overflow-y-auto modal-scroll pb-safe"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Clôture Sans Frais &amp; Remboursement
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUnreachableModalLead(null)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p>
                Vous ne pouvez pas réaliser la mission pour{' '}
                <strong className="text-slate-900">
                  {unreachableModalLead.client_name || 'le Client'}
                </strong>{' '}
                ?
              </p>
              <div className="text-[11px] text-emerald-900 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                <p className="font-bold flex items-center gap-1 text-emerald-800">
                  <span>🛡️ Remboursement Intégral Garanti :</span>
                </p>
                <p>
                  • Les <strong>15.00 DH</strong> du lead vous sont{' '}
                  <strong>restitués immédiatement</strong> sur votre solde.
                </p>
                <p>• Aucun frais n'est prélevé. Vous pouvez accepter une autre mission immédiatement.</p>
                <p>• Le client sera notifié pour pouvoir relancer sa recherche sans délai.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700">Motif de non-réalisation :</label>
              <select
                value={unreachableReason}
                onChange={(e) => setUnreachableReason(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="CLIENT_UNREACHABLE">
                  📵 Client Injoignable (Ne décroche pas / Téléphone éteint)
                </option>
                <option value="PARTS_UNAVAILABLE">
                  🔧 Pièce de Rechange Indisponible / Travaux non réalisables
                </option>
                <option value="CLIENT_CANCELLED">❌ Client a Déjà Trouvé / Annulé son besoin</option>
                <option value="PRICE_DISAGREEMENT">
                  💸 Désaccord sur le Devis / Périmètre hors portée
                </option>
                <option value="WRONG_LOCATION">📍 Adresse Erronée / Hors Secteur</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setUnreachableModalLead(null)}
                className="w-full sm:w-1/3 py-3 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer touch-target-44 active:scale-95"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (unreachableModalLead?.id) {
                    if (abandonActiveMission) {
                      await abandonActiveMission(unreachableReason);
                    }
                    await declareMissionUnfeasible(unreachableModalLead.id, unreachableReason);
                  }
                  setUnreachableModalLead(null);
                }}
                className="w-full sm:w-2/3 py-3 min-h-[44px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer touch-target-44 active:scale-95"
              >
                🛡️ Confirmer &amp; Restituer 15 DH
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
