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
import { calculateMaalemBalance, isRealRechargeTx, isLeadTx, isBonusTx, isRefundTx } from '../../utils/balanceUtils';
import { paginateArray } from '../../utils/paginationUtils';
import { PaginationControls } from '../common/PaginationControls';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  // Pagination calculée
  const pagination = useMemo(() => {
    return paginateArray(filteredTransactions, currentPage, pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  // Statistiques de rapprochement et trésorerie détaillée
  const stats = useMemo(() => {
    const validatedTxs = transactions.filter((t) => t.status === 'VALIDATED');
    const totalVolumeDh = validatedTxs.reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);
    const unspentBalanceTotal = (maalems || []).reduce((sum, m) => sum + (parseFloat(m.credit_balance) || 0), 0);
    
    const leadTxs = transactions.filter((t) => isLeadTx(t));
    const leadsSpentDh = leadTxs.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount_dh) || 0), 0);

    const bonusTxs = transactions.filter((t) => isBonusTx(t));
    const bonusGrantedDh = bonusTxs.reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);

    return {
      total: transactions.length,
      pending: transactions.filter((t) => t.status === 'PENDING').length,
      validated: validatedTxs.length,
      rejected: transactions.filter((t) => t.status === 'REJECTED').length,
      totalVolumeDh,
      unspentBalanceTotal,
      leadsSpentDh,
      bonusGrantedDh
    };
  }, [transactions, maalems]);

  const cleanPhone = (p) => (p || '').replace(/\D/g, '');

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Baromètre Rapprochement Bancaire */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Reçus à Valider */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('PENDING')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'PENDING'
              ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-amber-800">À Valider</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-800 font-mono">{stats.pending}</p>
        </motion.button>

        {/* Validées */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('VALIDATED')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'VALIDATED'
              ? 'bg-emerald-50/80 border-emerald-400 ring-1 ring-emerald-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-emerald-800">Validées</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-800 font-mono">{stats.validated}</p>
        </motion.button>

        {/* Rejets */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('REJECTED')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'REJECTED'
              ? 'bg-rose-50/80 border-rose-400 ring-1 ring-rose-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-rose-700">Rejets / Refus</span>
            <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-700 font-mono">{stats.rejected}</p>
        </motion.button>

        {/* Tous les flux */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'ALL'
              ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-blue-700">Toutes les Pièces</span>
            <div className="w-6 h-6 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center">
              <Receipt className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{stats.total}</p>
        </motion.button>
      </div>

      {/* 💼 Grand Livre & Trésorerie Déposée (Chiffre d'Affaires Brut, Net & Séquestre) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-900">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shadow-xs">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Grand Livre des Soldes &amp; Trésorerie BricoleMoi
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Réconciliation directe : Encaissé brut = Commissions nettes acquises + Crédits non consommés en séquestre
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            Solde Séquestre : {stats.unspentBalanceTotal.toLocaleString('fr-FR')} DH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1 : CA Brut Total */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">1. CA Brut Encaissé</span>
            <p className="text-2xl font-black font-mono text-slate-900">{stats.totalVolumeDh.toFixed(2)} <span className="text-xs font-normal text-slate-500">DH</span></p>
            <p className="text-[10px] text-slate-500 font-medium">Total des virements &amp; dépôts bancaires validés</p>
          </div>

          {/* Card 2 : Crédits Non Consommés */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold block">2. Solde Non Consommé (Séquestre)</span>
            <p className="text-2xl font-black font-mono text-amber-800">{stats.unspentBalanceTotal.toFixed(2)} <span className="text-xs font-normal text-amber-700">DH</span></p>
            <p className="text-[10px] text-amber-700 font-medium">Avances détenues sur les comptes Maâlems actifs</p>
          </div>

          {/* Card 3 : Commissions Acquises */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block">3. CA Net Consommé (15 DH/Lead)</span>
            <p className="text-2xl font-black font-mono text-emerald-800">{stats.leadsSpentDh.toFixed(2)} <span className="text-xs font-normal text-emerald-700">DH</span></p>
            <p className="text-[10px] text-emerald-700 font-medium">Commissions définitivement acquises par la plateforme</p>
          </div>
        </div>
      </div>

      {/* 2. Header & Filtres de Recherche */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-purple-600" />
              <span>Rapprochement des Recharges &amp; Bordereaux</span>
              <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-xs">
                {filteredTransactions.length} reçus
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Contrôle des tickets Cash Plus / Wafacash, examen des profils artisans et génération des reçus officiels.
            </p>
          </div>

          {/* Recherche */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher référence, artisan..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filtres Modes de Paiement */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5 text-purple-600" />
            <span>Mode de Règlement :</span>
          </div>

          {['ALL', 'Cash Plus', 'Wafacash', 'Virement', 'CB / Instant', 'Offert Admin'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setMethodFilter(method)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                methodFilter === method
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {method === 'ALL' ? 'Tous Modes' : method}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Liste des Transactions & Fiches Maâlem */}
      <div className="space-y-3.5">
        {pagination.items.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            Aucun enregistrement ne correspond à vos filtres.
          </div>
        ) : (
          pagination.items.map((tx) => {
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
                className={`bg-white border rounded-3xl p-5 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isPending
                    ? 'border-amber-300 ring-1 ring-amber-200 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Bloc 1 : Fiche & Identité Maâlem */}
                <div className="flex items-start gap-3.5 min-w-0 md:max-w-xs flex-1">
                  <div 
                    onClick={() => setSelectedMaalemProfile(maalem)}
                    className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    title="Cliquer pour voir la fiche complète"
                  >
                    {maalem.full_name ? maalem.full_name.charAt(0).toUpperCase() : 'M'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 
                        onClick={() => setSelectedMaalemProfile(maalem)}
                        className="font-black text-slate-900 text-sm truncate cursor-pointer hover:text-purple-600 transition-colors"
                      >
                        {maalem.full_name || 'Artisan Maâlem'}
                      </h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono">
                        ★ {(maalem.rating_avg !== undefined && maalem.rating_avg !== null ? Number(maalem.rating_avg) : 5.0).toFixed(1)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
                      <span className="truncate">{maalem.district || maalem.city_zone || 'Casablanca'}</span>
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <a href={`tel:${maalem.phone}`} className="font-mono text-slate-700 hover:text-purple-600 flex items-center gap-1 font-bold">
                        <Phone className="w-3 h-3 text-purple-600" />
                        <span>{maalem.phone || 'Non renseigné'}</span>
                      </a>
                      {pClean.length >= 9 && (
                        <a
                          href={`https://wa.me/212${pClean.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 p-0.5"
                          title="WhatsApp Direct"
                        >
                          <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bloc 2 : Détail de la Transaction & Rapprochement */}
                <div className="flex-1 md:px-4 md:border-l md:border-r border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                      Réf : {tx.reference_ref || tx.id}
                    </span>

                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                      {tx.payment_method || 'Cash Plus / Wafacash'}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      isValidated
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : isRejected
                          ? 'bg-rose-50 border-rose-200 text-rose-700'
                          : 'bg-amber-50 border-amber-200 text-amber-800 animate-pulse'
                    }`}>
                      {isValidated ? '🟢 Crédité & Validé' : isRejected ? '🔴 Rejeté' : '⏳ En Attente Validation'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                    <span>Soumis le : {formatDateTime(tx.created_at || Date.now(), 'long')}</span>
                    {tx.reconciled_at && <span>• Traité le : {formatDateTime(tx.reconciled_at, 'long')}</span>}
                  </p>

                  {tx.admin_notes && (
                    <p className="text-[11px] text-slate-500 italic">
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
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:border-purple-300 group-hover:scale-105 transition-all shadow-xs"
                      />
                      <div className="absolute inset-0 bg-slate-900/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Montant Crédité */}
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Montant :</span>
                    <span className="text-xl font-black text-slate-900 font-mono">
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
                        className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
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
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                          title="Valider la recharge et créditer le compte"
                        >
                          Valider (+{parseFloat(tx.amount_dh || 0)} DH)
                        </button>

                        <button
                          type="button"
                          onClick={() => setRejectModalTx(tx)}
                          className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 shadow-xs transition-colors cursor-pointer"
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
                      className="px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
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

      {/* Contrôles de pagination */}
      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        onPageChange={(page) => setCurrentPage(page)}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        itemLabel="transactions"
      />

      {/* ========================================================================= */}
      {/* Modal 1 : Fiche Complète Maâlem & Portefeuille                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedMaalemProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaalemProfile(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-lg flex items-center justify-center shadow-xs">
                    {selectedMaalemProfile.full_name ? selectedMaalemProfile.full_name.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{selectedMaalemProfile.full_name}</h3>
                    <p className="text-xs text-purple-700 font-mono font-bold">
                      Spécialité : {getSpecialtyLabel(selectedMaalemProfile.specialty)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMaalemProfile(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Détails Portefeuille & Contact */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Solde Actuel :</span>
                  <p className="text-lg font-black text-emerald-800 font-mono">
                    {calculateMaalemBalance(selectedMaalemProfile, transactions, maalems).liveAvailableBalance.toFixed(2)} DH
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Note Moyenne :</span>
                  <p className="text-lg font-black text-amber-800 font-mono flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>
                      {(selectedMaalemProfile.rating_avg !== undefined && selectedMaalemProfile.rating_avg !== null
                        ? Number(selectedMaalemProfile.rating_avg)
                        : 5.0
                      ).toFixed(1)}{' '}
                      / 5.0
                    </span>
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Téléphone :</span>
                  <p className="font-bold text-slate-900 font-mono">{selectedMaalemProfile.phone || 'Non renseigné'}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Ville / Quartier :</span>
                  <p className="font-bold text-slate-900">{selectedMaalemProfile.district || selectedMaalemProfile.city_zone || 'Casablanca'}</p>
                </div>
              </div>

              {/* Actions Rapides */}
              <div className="pt-2 flex items-center gap-3">
                {cleanPhone(selectedMaalemProfile.phone).length >= 9 && (
                  <a
                    href={`https://wa.me/212${cleanPhone(selectedMaalemProfile.phone).replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-600" />
                    <span>Discuter sur WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMaalemProfile(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewReceiptImage(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-4 shadow-2xl text-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-mono font-bold text-purple-700">Ticket de Reçu / Bordereau Encaissé</span>
                <button
                  type="button"
                  onClick={() => setPreviewReceiptImage(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[70vh] flex items-center justify-center bg-slate-50">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRejectModalTx(null)}
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
                  <span>Rejeter la recharge #{String(rejectModalTx.reference_ref || rejectModalTx.id).slice(-6)}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setRejectModalTx(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Motif du rejet (notifié à l'artisan) :
                </label>
                <textarea
                  rows="3"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-rose-600 shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalTx(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
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
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
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
