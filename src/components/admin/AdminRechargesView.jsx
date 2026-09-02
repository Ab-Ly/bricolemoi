import React, { useState, useMemo } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  X 
} from 'lucide-react';
import { isRealRechargeTx, isLeadTx, isBonusTx } from '../../utils/balanceUtils';
import { paginateArray } from '../../utils/paginationUtils';
import { PaginationControls } from '../common/PaginationControls';
import { RechargeStatsCards } from './recharges/RechargeStatsCards';
import { RechargeRowCard } from './recharges/RechargeRowCard';
import { RechargeSlipModal } from './recharges/RechargeSlipModal';
import { RechargeRejectModal } from './recharges/RechargeRejectModal';
import { RechargeMaalemModal } from './recharges/RechargeMaalemModal';

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
  const [selectedMaalemProfile, setSelectedMaalemProfile] = useState(null);
  const [rejectModalTx, setRejectModalTx] = useState(null);
  const [rejectReason, setRejectReason] = useState('Bordereau illisible ou référence introuvable');
  const [previewReceiptImage, setPreviewReceiptImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Map des Maâlems pour accès direct O(1)
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

  // Statistiques de rapprochement et trésorerie
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
      <RechargeStatsCards
        stats={stats}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

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

      {/* 3. Liste des Transactions */}
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

            return (
              <RechargeRowCard
                key={tx.id}
                tx={tx}
                maalem={maalem}
                onApprove={onApprove}
                onOpenRejectModal={(item) => setRejectModalTx(item)}
                onSelectMaalemProfile={(m) => setSelectedMaalemProfile(m)}
                onPreviewReceiptImage={(url) => setPreviewReceiptImage(url)}
                onGenerateReceiptPDF={onGenerateReceiptPDF}
              />
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

      {/* Modale 1 : Fiche Complète Maâlem */}
      <RechargeMaalemModal
        selectedMaalemProfile={selectedMaalemProfile}
        onClose={() => setSelectedMaalemProfile(null)}
        transactions={transactions}
        maalems={maalems}
      />

      {/* Modale 2 : Zoom Bordereau Bancaire */}
      <RechargeSlipModal
        previewReceiptImage={previewReceiptImage}
        onClose={() => setPreviewReceiptImage(null)}
      />

      {/* Modale 3 : Motif de Rejet */}
      <RechargeRejectModal
        rejectModalTx={rejectModalTx}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        onClose={() => setRejectModalTx(null)}
        onConfirmReject={(id, reason) => {
          if (onReject) onReject(id, reason);
          setRejectModalTx(null);
        }}
      />
    </div>
  );
};
