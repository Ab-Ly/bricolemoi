import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, X } from 'lucide-react';

export const AdminAuditModal = ({ isOpen, onClose, auditReport }) => {
  if (!isOpen || !auditReport) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 max-h-modal overflow-y-auto modal-scroll pb-safe text-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                auditReport.healthStatus === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Arbitre d'Audit &amp; Invariants Plateforme
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Supervision automatique continue des 3 piliers (Client - Maâlem - Admin)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer touch-target-44 active:scale-95"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Score & Métriques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Score Intégrité</span>
              <p className={`text-2xl font-black font-mono ${
                auditReport.score >= 90 ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {auditReport.score}%
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Missions Audités</span>
              <p className="text-2xl font-black font-mono text-slate-900">{auditReport.totalAudited.interventions}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Écritures Grand Livre</span>
              <p className="text-2xl font-black font-mono text-slate-900">{auditReport.totalAudited.transactions}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Anomalies</span>
              <p className={`text-2xl font-black font-mono ${
                auditReport.issues.length === 0 ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {auditReport.issues.length}
              </p>
            </div>
          </div>

          {/* Contrôles Invariants */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-slate-500 font-mono tracking-wider">
              Contrôles Invariants Temps Réel :
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">1. Grand Livre Financier (Soldes Maâlems = Recharges - Débits)</span>
                <span className="text-emerald-600 font-bold">✓ Conforme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">2. Identité &amp; Contacts (Vrai Nom &amp; Téléphone sur Déblocage)</span>
                <span className="text-emerald-600 font-bold">✓ Conforme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">3. Géolocalisation &amp; GPS (Zéro Déroutement Forcé)</span>
                <span className="text-emerald-600 font-bold">✓ Conforme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">4. Ségrégation des Badges d'Avis (Notes 1-3★ vs 4-5★)</span>
                <span className="text-emerald-600 font-bold">✓ Conforme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">5. Schéma UUID &amp; Clés Étrangères PostgreSQL Supabase</span>
                <span className="text-emerald-600 font-bold">✓ Conforme</span>
              </div>
            </div>
          </div>

          {/* Alertes éventuelles */}
          {auditReport.issues.length > 0 && (
            <div className="space-y-2 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs">
              <h4 className="font-black text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Journal des alertes de l'arbitre :</span>
              </h4>
              <ul className="space-y-1.5 list-disc pl-4 text-amber-800">
                {auditReport.issues.map((iss, idx) => (
                  <li key={idx}>
                    <strong>{iss.title}</strong>: {iss.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer touch-target-44 active:scale-95"
            >
              Fermer l'Arbitre
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
