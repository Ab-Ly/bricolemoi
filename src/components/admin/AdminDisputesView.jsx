import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Gift, 
  Phone, 
  MapPin, 
  User, 
  Wrench, 
  Coins, 
  Check, 
  X,
  FileText,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from '../EnhancedCategoryIcon';
import { formatDateTime } from '../../utils/dateUtils';

export const AdminDisputesView = ({ adminAlerts = [], interventions = [], onResolveDispute }) => {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'RESOLVED'
  const [rejectReasonModalAlert, setRejectReasonModalAlert] = useState(null);
  const [rejectReasonText, setRejectReasonText] = useState('Délai anti-abus dépassé (> 30 min)');

  const filteredAlerts = adminAlerts.filter((a) => {
    if (filter === 'PENDING') return a.status !== 'REFUNDED_RESOLVED' && a.status !== 'REJECTED';
    if (filter === 'RESOLVED') return a.status === 'REFUNDED_RESOLVED' || a.status === 'REJECTED';
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Explications des Règles Métier */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5 font-sans">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              <span>Gestion des Litiges &amp; Remplacement de Leads</span>
              <span className="text-xs font-mono font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 shadow-xs">
                {filteredAlerts.length} dossiers
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Arbitrage des réclamations artisans (Client injoignable dans les 30 min, faux numéro, désaccord devis).
            </p>
          </div>

          {/* Filtre Statut */}
          <div className="flex items-center gap-2">
            {['ALL', 'PENDING', 'RESOLVED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === st
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st === 'ALL' ? 'Tous les Dossiers' : st === 'PENDING' ? '⏳ À Traiter' : '✅ Clôturés'}
              </button>
            ))}
          </div>
        </div>

        {/* Charte Anti-Abus BricoleMoi */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900">Règles d'Arbitrage BricoleMoi Maroc :</p>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              1. <strong>Crédit de remplacement</strong> : L'artisan reçoit 1 crédit lead (+15.00 DH) sur son solde sans sortie de cash.
              <br />
              2. <strong>Délai anti-abus</strong> : Tout signalement doit être effectué dans les <strong>30 minutes</strong> suivant l'acceptation du lead.
            </p>
          </div>
        </div>
      </div>

      {/* Liste des Dossiers de Litiges */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
            <p className="font-bold text-slate-700">Aucun litige en attente de traitement.</p>
            <p className="text-xs text-slate-500 mt-1">Toutes les réclamations ont été résolues avec succès.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isResolved = alert.status === 'REFUNDED_RESOLVED' || alert.status === 'REJECTED';
            const isRefunded = alert.status === 'REFUNDED_RESOLVED';

            return (
              <motion.div
                layout
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border rounded-3xl p-5 shadow-xs transition-all space-y-4 ${
                  isResolved
                    ? 'border-slate-200 opacity-80'
                    : 'border-amber-300 ring-1 ring-amber-200 shadow-sm'
                }`}
              >
                {/* Header Litige */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono font-bold text-xs shadow-xs">
                      #{String(alert.id).slice(-6)}
                    </span>
                    <span className="font-black text-slate-900 text-sm">
                      {alert.reason_label || alert.reason_code || 'Client Injoignable'}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border self-start sm:self-auto ${
                    isRefunded
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isResolved
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-amber-50 border-amber-200 text-amber-800 animate-pulse'
                  }`}>
                    {isRefunded ? '✅ Crédit Accordé (+15 DH)' : isResolved ? '❌ Réclamation Rejetée' : '⏳ En Attente d\'Arbitrage'}
                  </span>
                </div>

                {/* Détail Parties Prenantes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Maâlem Réclamant */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase block">🛠️ Artisan Maâlem :</span>
                    <p className="font-bold text-slate-900 text-sm">{alert.maalem_name || 'Artisan Maâlem'}</p>
                    <p className="text-slate-700 font-mono flex items-center gap-1 font-bold">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{alert.maalem_phone || 'N/A'}</span>
                    </p>
                  </div>

                  {/* Client Concerné */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-blue-700 font-bold uppercase block">👤 Client Signalé :</span>
                    <p className="font-bold text-slate-900 text-sm">{alert.client_name || 'Client BricoleMoi'}</p>
                    <p className="text-slate-700 font-mono flex items-center gap-1 font-bold">
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>{alert.client_phone || 'N/A'}</span>
                    </p>
                    <p className="text-slate-500 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{alert.district || 'Casablanca'}</span>
                    </p>
                  </div>
                </div>

                {/* Commentaire de signalement */}
                {alert.comment && (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 italic">
                    "{alert.comment}"
                  </div>
                )}

                {/* Date et heure précises du signalement */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Signalé le : {formatDateTime(alert.created_at || Date.now(), 'long')}</span>
                  </span>
                  {alert.resolved_at && (
                    <span className="text-emerald-700 font-bold">
                      Résolu le : {formatDateTime(alert.resolved_at, 'long')}
                    </span>
                  )}
                </div>

                {/* Actions d'Arbitrage (Si non clôturé) */}
                {!isResolved && (
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    {/* Bouton Rejeter */}
                    <button
                      type="button"
                      onClick={() => setRejectReasonModalAlert(alert)}
                      className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Rejeter la Réclamation</span>
                    </button>

                    {/* Bouton Accorder 1 Crédit de remplacement */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onResolveDispute) {
                          onResolveDispute({
                            alertId: alert.id,
                            maalemId: alert.maalem_id,
                            amount: 15,
                            shouldRefund: true
                          });
                        }
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Accorder 1 Crédit de Remplacement (+15 DH)</span>
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal Motif de Rejet */}
      <AnimatePresence>
        {rejectReasonModalAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRejectReasonModalAlert(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-rose-700 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Rejeter la réclamation #{String(rejectReasonModalAlert.id).slice(-6)}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setRejectReasonModalAlert(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Motif du rejet (transmis à l'artisan) :
                </label>
                <textarea
                  rows={3}
                  value={rejectReasonText}
                  onChange={(e) => setRejectReasonText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-rose-400"
                  placeholder="Expliquez la raison du rejet..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectReasonModalAlert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onResolveDispute) {
                      onResolveDispute({
                        alertId: rejectReasonModalAlert.id,
                        maalemId: rejectReasonModalAlert.maalem_id,
                        amount: 0,
                        shouldRefund: false,
                        adminNotes: rejectReasonText
                      });
                    }
                    setRejectReasonModalAlert(null);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95"
                >
                  Confirmer le Rejet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
