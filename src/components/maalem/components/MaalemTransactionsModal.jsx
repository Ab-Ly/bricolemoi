import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins, Zap, Gift, Clock, Printer } from 'lucide-react';
import { Receipt } from '@phosphor-icons/react';
import { isRealRechargeTx, isLeadTx, isBonusTx } from '../../../utils/balanceUtils';
import { formatDateTime } from '../../../utils/dateUtils';

export const MaalemTransactionsModal = ({
  historyModalOpen,
  setHistoryModalOpen,
  liveCreditBalance,
  totalRechargedSum,
  totalLeadsSpent,
  totalBonusSum,
  historyFilter,
  setHistoryFilter,
  myTransactions,
  filteredHistoryTransactions,
  pendingMyRechargesCount,
  setPreviewPhotoUrl,
  generateReceiptPDF
}) => {
  return (
    <AnimatePresence>
      {historyModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl w-full max-w-2xl shadow-2xl space-y-4 max-h-[92dvh] overflow-y-auto modal-scroll flex flex-col text-slate-900 pb-safe"
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                  <Receipt weight="duotone" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-sans">Historique &amp; Portefeuille</h3>
                  <p className="text-xs text-slate-500">Recharges, déblocages de leads clients et bonus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-black text-slate-800">
                  <span>Solde :</span>
                  <span className="text-amber-700">{liveCreditBalance.toFixed(2)} DH</span>
                </div>
                <button
                  onClick={() => setHistoryModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer touch-target-44 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3 Summary KPIs */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Rechargé</span>
                <span className="text-sm font-black text-emerald-700 font-mono">+{totalRechargedSum.toFixed(2)} DH</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-center">
                <span className="text-[10px] text-blue-800 font-bold block uppercase tracking-wider">Leads Débloqués</span>
                <span className="text-sm font-black text-blue-700 font-mono">-{totalLeadsSpent.toFixed(2)} DH</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wider">Bonus Reçus</span>
                <span className="text-sm font-black text-amber-700 font-mono">+{totalBonusSum.toFixed(2)} DH</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setHistoryFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  historyFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tous ({myTransactions.length})
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('RECHARGE')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                  historyFilter === 'RECHARGE'
                    ? 'bg-emerald-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Recharges ({myTransactions.filter(isRealRechargeTx).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('LEAD')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                  historyFilter === 'LEAD'
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Leads SOS ({myTransactions.filter(isLeadTx).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('BONUS')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                  historyFilter === 'BONUS'
                    ? 'bg-amber-500 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Bonus ({myTransactions.filter(isBonusTx).length})</span>
              </button>
              {pendingMyRechargesCount > 0 && (
                <button
                  type="button"
                  onClick={() => setHistoryFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                    historyFilter === 'PENDING'
                      ? 'bg-amber-500 text-white shadow-xs font-black'
                      : 'text-amber-700 hover:text-amber-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>En attente ({pendingMyRechargesCount})</span>
                </button>
              )}
            </div>

            {/* Transactions Scrollable List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[48vh]">
              {filteredHistoryTransactions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 text-xs space-y-2">
                  <p className="text-sm font-bold text-slate-800">Aucune transaction trouvée pour ce filtre.</p>
                  <p className="text-[11px] text-slate-400">Toutes vos opérations apparaîtront ici automatiquement.</p>
                </div>
              ) : (
                filteredHistoryTransactions.map((tx) => {
                  const statusUpper = String(tx.status || 'PENDING').trim().toUpperCase();
                  const isRecharge = isRealRechargeTx(tx);
                  const isLead = isLeadTx(tx);
                  const isBonus = isBonusTx(tx);
                  const isPositive = Number(tx.amount_dh) > 0;
                  const isValidated = statusUpper === 'VALIDATED';
                  const isRejected = statusUpper === 'REJECTED';
                  const isPending = statusUpper === 'PENDING';

                  const cleanTitle = isBonus
                    ? Number(tx.amount_dh) >= 100
                      ? 'Bonus Récompense Plateforme'
                      : 'Bonus de Bienvenue Artisan'
                    : isLead
                    ? 'Déblocage Lead Client SOS'
                    : `Recharge Solde (${tx.payment_method || 'Virement'})`;

                  const displayRef = (() => {
                    if (!tx.reference_ref) return '';
                    const raw = String(tx.reference_ref);
                    if (raw.startsWith('INTERVENTION_'))
                      return `Lead SOS #${raw.replace('INTERVENTION_', '').slice(0, 8)}`;
                    if (raw.startsWith('QUICK-BONUS-'))
                      return `Bonus #${raw.replace('QUICK-BONUS-', '').slice(0, 10)}`;
                    return raw;
                  })();

                  return (
                    <div
                      key={tx.id}
                      className={`p-3.5 bg-white border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        isPending
                          ? 'border-amber-300 bg-amber-50/20'
                          : isRejected
                          ? 'border-red-300 bg-red-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isBonus
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : isLead
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}
                        >
                          {isBonus ? (
                            <Gift className="w-4 h-4" />
                          ) : isLead ? (
                            <Zap className="w-4 h-4" />
                          ) : (
                            <Coins className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">{cleanTitle}</span>
                            {isPending && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                ⏳ En attente validation
                              </span>
                            )}
                            {isValidated && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold">
                                ✔ Validé
                              </span>
                            )}
                            {isRejected && (
                              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200 text-[9px] font-bold">
                                ✖ Refusé
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <span className="font-mono flex items-center gap-1 text-slate-600">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{formatDateTime(tx.created_at || Date.now(), 'long')}</span>
                            </span>
                            {displayRef && (
                              <span>
                                • Réf : <strong className="text-slate-700 font-mono">{displayRef}</strong>
                              </span>
                            )}
                            {tx.receipt_photo_url && (
                              <button
                                type="button"
                                onClick={() => setPreviewPhotoUrl(tx.receipt_photo_url)}
                                className="text-blue-600 hover:text-blue-800 font-bold underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>• 📷 Voir Mon Ticket</span>
                              </button>
                            )}
                          </div>

                          {/* Rejection Motif Banner */}
                          {isRejected && tx.admin_notes && (
                            <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900">
                              <p className="font-bold flex items-center gap-1 text-red-700">
                                <span>❌ Motif du rejet par l'Admin :</span>
                              </p>
                              <p className="mt-0.5 text-slate-800 font-medium italic">
                                "{tx.admin_notes}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
                        <span
                          className={`text-base font-black font-mono whitespace-nowrap ${
                            isPositive ? 'text-emerald-600' : 'text-slate-800'
                          }`}
                        >
                          {isPositive
                            ? `+${Number(tx.amount_dh).toFixed(2)}`
                            : `${Number(tx.amount_dh).toFixed(2)}`}{' '}
                          DH
                        </span>

                        {isValidated && isRecharge && (
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => generateReceiptPDF(tx)}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-xs active:scale-90 transition-all cursor-pointer whitespace-nowrap"
                            title="Télécharger le reçu officiel PDF"
                          >
                            <Printer className="w-3.5 h-3.5 text-slate-600" />
                            <span className="hidden xs:inline">Reçu</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Affichage de {filteredHistoryTransactions.length} transaction(s)
              </span>
              <button
                type="button"
                onClick={() => setHistoryModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
