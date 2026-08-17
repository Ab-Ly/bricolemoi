import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Receipt, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Phone, 
  MapPin, 
  Star, 
  Coins, 
  Printer, 
  Eye, 
  X, 
  FileText, 
  Images, 
  CreditCard, 
  Landmark, 
  ShieldCheck, 
  ExternalLink,
  Gift
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from '../EnhancedCategoryIcon';

export const AdminRechargesView = ({ 
  transactions = [], 
  maalems = [], 
  onApprove, 
  onReject, 
  onGenerateReceiptPDF 
}) => {
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'VALIDATED' | 'REJECTED'
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxDetail, setSelectedTxDetail] = useState(null);
  const [selectedMaalemProfile, setSelectedMaalemProfile] = useState(null);
  const [rejectModalTx, setRejectModalTx] = useState(null);
  const [rejectReason, setRejectReason] = useState('Bordereau illisible ou référence introuvable');
  const [previewReceiptImage, setPreviewReceiptImage] = useState(null);

  // Map des Maâlems pour accès direct
  const maalemsMap = useMemo(() => {
    const map = new Map();
    maalems.forEach((m) => {
      if (m.id) map.set(String(m.id).trim(), m);
      if (m.phone) map.set(String(m.phone).replace(/\D/g, ''), m);
    });
    return map;
  }, [maalems]);

  // Filtrage des transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const q = searchTerm.toLowerCase();
      const refMatch = (tx.reference_ref || tx.id || '').toLowerCase().includes(q);
      const nameMatch = (tx.maalem_name || '').toLowerCase().includes(q);
      const phoneMatch = (tx.maalem_phone || '').replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''));
      const queryOk = !searchTerm || refMatch || nameMatch || phoneMatch;

      const statusOk = statusFilter === 'ALL' || tx.status === statusFilter;
      const methodOk = methodFilter === 'ALL' || String(tx.payment_method || '').toLowerCase().includes(methodFilter.toLowerCase());

      return queryOk && statusOk && methodOk;
    });
  }, [transactions, searchTerm, statusFilter, methodFilter]);

  // Statistiques de rapprochement
  const stats = useMemo(() => {
    return {
      total: transactions.length,
      pending: transactions.filter((t) => t.status === 'PENDING').length,
      validated: transactions.filter((t) => t.status === 'VALIDATED').length,
      rejected: transactions.filter((t) => t.status === 'REJECTED').length,
      totalVolumeDh: transactions
        .filter((t) => t.status === 'VALIDATED')
        .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0)
    };
  }, [transactions]);

  const cleanPhone = (p) => (p || '').replace(/\D/g, '');

  return (
    <div className="space-y-6">
      {/* 1. Baromètre Rapprochement Bancaire */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Reçus à Valider */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('PENDING')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'PENDING'
              ? 'bg-amber-950/70 border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.3)]'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-amber-400">À Valider</span>
            <div className="w-6 h-6 rounded-lg bg-amber-950 border border-amber-500/40 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-300 font-mono">{stats.pending}</p>
        </motion.button>

        {/* Validées */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('VALIDATED')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'VALIDATED'
              ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.3)]'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-emerald-400">Validées</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-300 font-mono">{stats.validated}</p>
        </motion.button>

        {/* Rejets */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('REJECTED')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'REJECTED'
              ? 'bg-rose-950/70 border-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.3)]'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-rose-400">Rejets / Refus</span>
            <div className="w-6 h-6 rounded-lg bg-rose-950 border border-rose-500/40 flex items-center justify-center">
              <XCircle className="w-3.5 h-3.5 text-rose-300" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-300 font-mono">{stats.rejected}</p>
        </motion.button>

        {/* Volume Total */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 text-left flex flex-col justify-between space-y-2 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-cyan-400">Volume Encaissé</span>
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5 text-cyan-300" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.totalVolumeDh.toFixed(2)} DH</p>
        </div>
      </div>

      {/* 2. Header & Filtres de Recherche */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-purple-400" />
              <span>Rapprochement des Recharges &amp; Bordereaux</span>
              <span className="text-xs font-mono font-bold bg-purple-950/80 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                {filteredTransactions.length} reçus
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Contrôle des tickets Cash Plus / Wafacash, examen des profils artisans et génération des reçus officiels.
            </p>
          </div>

          {/* Recherche */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher référence, artisan..."
              className="w-full bg-slate-950/90 border border-purple-500/30 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filtres Modes de Paiement */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <span>Mode de Règlement :</span>
          </div>

          {['ALL', 'Cash Plus', 'Wafacash', 'Virement', 'CB / Instant', 'Offert Admin'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setMethodFilter(method)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                methodFilter === method
                  ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {method === 'ALL' ? 'Tous Modes' : method}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Liste des Transactions & Fiches Maâlem */}
      <div className="space-y-3.5">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-500 text-sm">
            Aucun enregistrement ne correspond à vos filtres.
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const maalem = maalemsMap.get(String(tx.maalem_id || '').trim()) || 
                          maalemsMap.get(cleanPhone(tx.maalem_phone)) || 
                          { full_name: tx.maalem_name || 'Artisan Maâlem', phone: tx.maalem_phone, specialty: 'PLUMBING', credit_balance: 0 };
            
            const isPending = tx.status === 'PENDING';
            const isValidated = tx.status === 'VALIDATED';
            const isRejected = tx.status === 'REJECTED';
            const pClean = cleanPhone(maalem.phone || tx.maalem_phone);

            return (
              <motion.div
                layout
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-slate-900/80 backdrop-blur-xl border rounded-3xl p-5 shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isPending
                    ? 'border-amber-500/40 bg-amber-950/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Bloc 1 : Fiche & Identité Maâlem */}
                <div className="flex items-start gap-3.5 min-w-0 md:max-w-xs flex-1">
                  <div 
                    onClick={() => setSelectedMaalemProfile(maalem)}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-950 to-slate-900 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center text-sm shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    title="Cliquer pour voir la fiche complète"
                  >
                    {maalem.full_name ? maalem.full_name.charAt(0).toUpperCase() : 'M'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 
                        onClick={() => setSelectedMaalemProfile(maalem)}
                        className="font-black text-white text-sm truncate cursor-pointer hover:text-purple-300 transition-colors"
                      >
                        {maalem.full_name || 'Artisan Maâlem'}
                      </h4>
                      <span className="text-[10px] font-bold text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">
                        ★ {(maalem.rating_avg || 4.9).toFixed(1)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <span className="truncate">{maalem.district || maalem.city_zone || 'Casablanca'}</span>
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <a href={`tel:${maalem.phone}`} className="font-mono text-slate-300 hover:text-purple-300 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-purple-400" />
                        <span>{maalem.phone || 'Non renseigné'}</span>
                      </a>
                      {pClean.length >= 9 && (
                        <a
                          href={`https://wa.me/212${pClean.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 p-0.5"
                          title="WhatsApp Direct"
                        >
                          <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bloc 2 : Détail de la Transaction & Rapprochement */}
                <div className="flex-1 md:px-4 md:border-l md:border-r border-slate-800/80 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-lg border border-purple-500/30">
                      Réf : {tx.reference_ref || tx.id}
                    </span>

                    <span className="text-xs font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                      {tx.payment_method || 'Cash Plus / Wafacash'}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      isValidated
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : isRejected
                          ? 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-amber-950 border-amber-500 text-amber-300 animate-pulse'
                    }`}>
                      {isValidated ? '🟢 Crédité & Validé' : isRejected ? '🔴 Rejeté' : '⏳ En Attente Validation'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <span>Soumis le : {new Date(tx.created_at || Date.now()).toLocaleString('fr-FR')}</span>
                    {tx.reconciled_at && <span>• Traité le : {new Date(tx.reconciled_at).toLocaleTimeString('fr-FR')}</span>}
                  </p>

                  {tx.admin_notes && (
                    <p className="text-[11px] text-slate-400 italic">
                      Note : "{tx.admin_notes}"
                    </p>
                  )}
                </div>

                {/* Bloc 3 : Montant, Reçu Ticket & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  {/* Photo Reçu si disponible */}
                  {tx.receipt_photo_url && (
                    <div 
                      onClick={() => setPreviewReceiptImage(tx.receipt_photo_url)}
                      className="relative group cursor-pointer flex-shrink-0"
                      title="Cliquer pour agrandir la photo du bordereau"
                    >
                      <img
                        src={tx.receipt_photo_url}
                        alt="Reçu bordereau"
                        className="w-12 h-12 rounded-xl object-cover border border-purple-500/40 group-hover:border-purple-300 group-hover:scale-105 transition-all shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-purple-300">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Montant Crédité */}
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Montant :</span>
                    <span className="text-xl font-black text-cyan-300 font-mono">
                      +{parseFloat(tx.amount_dh || 0).toFixed(2)} DH
                    </span>
                  </div>

                  {/* Actions Rapides */}
                  <div className="flex items-center gap-1.5">
                    {/* Imprimer Reçu PDF */}
                    {onGenerateReceiptPDF && (
                      <button
                        type="button"
                        onClick={() => onGenerateReceiptPDF(tx)}
                        className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Imprimer / Télécharger Reçu Officiel PDF"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    )}

                    {/* Actions de validation si PENDING */}
                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove && onApprove(tx.id)}
                          className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
                          title="Valider la recharge et créditer le compte"
                        >
                          Valider (+{parseFloat(tx.amount_dh || 0)} DH)
                        </button>

                        <button
                          type="button"
                          onClick={() => setRejectModalTx(tx)}
                          className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 transition-colors cursor-pointer"
                          title="Rejeter la demande avec motif"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Fiche Maâlem Action */}
                    <button
                      type="button"
                      onClick={() => setSelectedMaalemProfile(maalem)}
                      className="px-3 py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Consulter la fiche artisan"
                    >
                      Fiche
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* Modal 1 : Fiche Complète Maâlem & Portefeuille                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedMaalemProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaalemProfile(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-950 border border-purple-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300 font-black text-lg flex items-center justify-center shadow-md">
                    {selectedMaalemProfile.full_name ? selectedMaalemProfile.full_name.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{selectedMaalemProfile.full_name}</h3>
                    <p className="text-xs text-purple-300 font-mono">
                      Spécialité : {getSpecialtyLabel(selectedMaalemProfile.specialty)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMaalemProfile(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Détails Portefeuille & Contact */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Solde Actuel :</span>
                  <p className="text-lg font-black text-emerald-400 font-mono">
                    {parseFloat(selectedMaalemProfile.credit_balance || 0).toFixed(2)} DH
                  </p>
                </div>

                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Note Moyenne :</span>
                  <p className="text-lg font-black text-amber-300 font-mono flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{(selectedMaalemProfile.rating_avg || 4.9).toFixed(1)} / 5.0</span>
                  </p>
                </div>

                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Téléphone :</span>
                  <p className="font-bold text-white font-mono">{selectedMaalemProfile.phone || 'Non renseigné'}</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Ville / Quartier :</span>
                  <p className="font-bold text-white">{selectedMaalemProfile.district || selectedMaalemProfile.city_zone || 'Casablanca'}</p>
                </div>
              </div>

              {/* Actions Rapides */}
              <div className="pt-2 flex items-center gap-3">
                {cleanPhone(selectedMaalemProfile.phone).length >= 9 && (
                  <a
                    href={`https://wa.me/212${cleanPhone(selectedMaalemProfile.phone).replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-400" />
                    <span>Discuter sur WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMaalemProfile(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* Modal 2 : Aperçu Zoom Photo Reçu Ticket                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {previewReceiptImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewReceiptImage(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-xl w-full bg-slate-950 border border-purple-500/40 rounded-3xl p-4 shadow-2xl text-slate-100 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-purple-300">Ticket de Reçu / Bordereau Encaissé</span>
                <button
                  type="button"
                  onClick={() => setPreviewReceiptImage(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={previewReceiptImage}
                  alt="Preuve de virement"
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* Modal 3 : Motif de Rejet de la Recharge                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {rejectModalTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRejectModalTx(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-950 border border-rose-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-rose-300 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>Rejeter la recharge #{String(rejectModalTx.reference_ref || rejectModalTx.id).slice(-6)}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setRejectModalTx(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Motif du rejet (notifié à l'artisan) :
                </label>
                <textarea
                  rows="3"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalTx(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onReject) {
                      onReject(rejectModalTx.id, rejectReason);
                    }
                    setRejectModalTx(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg"
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
