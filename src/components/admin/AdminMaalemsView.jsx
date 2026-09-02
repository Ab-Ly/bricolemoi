import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  Filter, 
  X
} from 'lucide-react';
import { calculateMaalemBalance } from '../../utils/balanceUtils';
import { calculateMaalemRating } from '../../utils/ratingUtils';
import { paginateArray } from '../../utils/paginationUtils';
import { PaginationControls } from '../common/PaginationControls';
import { deduplicateMaalems } from '../../services/dataReconciliationService';

// Sous-composants modulaires
import { AdminMaalemCard } from './maalems/AdminMaalemCard';
import { AdminMaalemDrawer } from './maalems/AdminMaalemDrawer';
import { AdminPhotoModal } from './maalems/AdminPhotoModal';

export const AdminMaalemsView = ({ 
  maalems = [], 
  interventions = [],
  transactions = [],
  reviews = [],
  onQuickCredit, 
  onToggleSuspension 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ONLINE' | 'LOW_CREDIT' | 'SUSPENDED'
  const [selectedMaalem, setSelectedMaalem] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Calcul du solde disponible
  const getMaalemCreditBalance = (m) => {
    if (!m) return 0;
    return calculateMaalemBalance(m, transactions, maalems).liveAvailableBalance;
  };

  // Calcul dynamique des avis et notes
  const getMaalemRating = (m) => {
    if (!m) return { averageRating: 5.0, totalReviews: 0, maalemReviews: [] };
    return calculateMaalemRating(m, reviews, interventions);
  };

  // Filtrage sans doublon
  const filteredMaalems = useMemo(() => {
    const uniqueMaalems = deduplicateMaalems(maalems);
    return uniqueMaalems.filter((m) => {
      const q = searchTerm.toLowerCase();
      const nameMatch = (m.full_name || '').toLowerCase().includes(q);
      const phoneMatch = (m.phone || '').replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''));
      const cityMatch = (m.city_zone || m.district || '').toLowerCase().includes(q);
      const queryOk = !searchTerm || nameMatch || phoneMatch || cityMatch;

      const cityOk = cityFilter === 'ALL' || (m.city_zone || m.district || '').toLowerCase().includes(cityFilter.toLowerCase());
      const specOk = specialtyFilter === 'ALL' || String(m.specialty || '').toUpperCase() === specialtyFilter.toUpperCase();

      let statusOk = true;
      if (statusFilter === 'ONLINE') statusOk = Boolean(m.is_online);
      else if (statusFilter === 'LOW_CREDIT') statusOk = getMaalemCreditBalance(m) < 15;
      else if (statusFilter === 'SUSPENDED') statusOk = Boolean(m.is_suspended);

      return queryOk && cityOk && specOk && statusOk;
    });
  }, [maalems, transactions, searchTerm, cityFilter, specialtyFilter, statusFilter]);

  // Données de l'artisan pour le tiroir
  const maalemDrawerData = useMemo(() => {
    if (!selectedMaalem) return { maalemMissions: [], maalemTransactions: [], stats: { totalJobs: 0, completedJobs: 0, totalRevenueDh: 0 } };

    const mId = String(selectedMaalem.id || '').trim();
    const mPhoneDigits = String(selectedMaalem.phone || '').replace(/\D/g, '');
    const mPhone9 = mPhoneDigits.slice(-9);

    const rawMissions = interventions.filter((intv) => {
      const matchId = mId && String(intv.maalem_id || '').trim() === mId;
      const intvPhone9 = String(intv.maalem_phone || '').replace(/\D/g, '').slice(-9);
      const matchPhone = mPhone9.length >= 8 && intvPhone9.length >= 8 && mPhone9 === intvPhone9;
      return matchId || matchPhone;
    });

    const maalemMissions = rawMissions.map((intv) => {
      const matchReview = (reviews || []).find(
        (r) => String(r.intervention_id || '').trim() === String(intv.id).trim()
      );
      const rating = matchReview?.rating !== undefined && matchReview?.rating !== null
        ? Number(matchReview.rating)
        : (intv.rating !== undefined && intv.rating !== null ? Number(intv.rating) : null);
      
      return {
        ...intv,
        rating,
        comment: matchReview?.comment || intv.comment || '',
        reviewed_at: matchReview?.created_at || intv.completed_at || intv.updated_at || intv.created_at
      };
    }).sort(
      (a, b) => new Date(b.completed_at || b.updated_at || b.created_at || 0) - new Date(a.completed_at || a.updated_at || a.created_at || 0)
    );

    const maalemTransactions = transactions.filter((tx) => {
      const matchId = mId && String(tx.maalem_id || '').trim() === mId;
      const txPhone9 = String(tx.maalem_phone || '').replace(/\D/g, '').slice(-9);
      const matchPhone = mPhone9.length >= 8 && txPhone9.length >= 8 && mPhone9 === txPhone9;
      return matchId || matchPhone;
    }).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const completed = maalemMissions.filter((m) => m.status === 'COMPLETED');
    const totalRevenueDh = completed.reduce((sum, m) => sum + (parseFloat(m.final_agreed_price) || 0), 0);

    return {
      maalemMissions,
      maalemTransactions,
      stats: {
        totalJobs: maalemMissions.length,
        completedJobs: completed.length,
        totalRevenueDh
      }
    };
  }, [selectedMaalem, interventions, transactions, reviews]);

  const pagination = useMemo(() => {
    return paginateArray(filteredMaalems, currentPage, pageSize);
  }, [filteredMaalems, currentPage, pageSize]);

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Filtres Rapides */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5 font-sans">
              <Wrench className="w-6 h-6 text-emerald-600" />
              <span>Réseau &amp; Fiches des Maâlems</span>
              <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                {filteredMaalems.length} artisans
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Supervision de la disponibilité temps réel, recharges de crédits (15 DH), fiches et portfolios.
            </p>
          </div>

          {/* Recherche */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher par nom, téléphone ou ville..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-xs"
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

        {/* Filtres Villes & Statuts */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 shrink-0">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ville :</span>
            </div>

            {['ALL', 'Casablanca', 'Rabat', 'Fès', 'Meknès', 'El Hajeb', 'Marrakech', 'Tanger', 'Agadir', 'Kénitra', 'Mohammedia'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setCityFilter(city);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  cityFilter === city
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {city === 'ALL' ? 'Toutes' : city}
              </button>
            ))}
          </div>

          {/* Filtre Statut */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-bold text-slate-400 shrink-0 hidden sm:inline">Statut :</span>
            {['ALL', 'ONLINE', 'LOW_CREDIT', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  statusFilter === st
                    ? st === 'ONLINE'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs font-black'
                      : st === 'LOW_CREDIT'
                        ? 'bg-amber-50 border border-amber-200 text-amber-800 shadow-xs font-black'
                        : 'bg-rose-50 border border-rose-200 text-rose-700 shadow-xs font-black'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st === 'ALL' ? 'Tous' : st === 'ONLINE' ? '🟢 En Ligne' : st === 'LOW_CREDIT' ? '⚠️ Solde < 15 DH' : '🔴 Suspendus'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille des Cartes Maâlems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pagination.items.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            Aucun artisan correspondant aux critères de recherche.
          </div>
        ) : (
          pagination.items.map((m) => (
            <AdminMaalemCard
              key={m.id}
              maalem={m}
              isOnline={Boolean(m.is_online)}
              isSuspended={Boolean(m.is_suspended)}
              creditBalance={getMaalemCreditBalance(m)}
              ratingInfo={getMaalemRating(m)}
              onSelectMaalem={setSelectedMaalem}
              onQuickCredit={onQuickCredit}
              onToggleSuspension={onToggleSuspension}
            />
          ))
        )}
      </div>

      {/* Pagination */}
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
        itemLabel="artisans"
      />

      {/* Tiroir Fiche Complète Maâlem */}
      <AdminMaalemDrawer
        selectedMaalem={selectedMaalem}
        onClose={() => setSelectedMaalem(null)}
        maalemDrawerData={maalemDrawerData}
        creditBalance={selectedMaalem ? getMaalemCreditBalance(selectedMaalem) : 0}
        ratingInfo={selectedMaalem ? getMaalemRating(selectedMaalem) : { averageRating: 5.0, totalReviews: 0 }}
        onQuickCredit={onQuickCredit}
        onToggleSuspension={onToggleSuspension}
        onPreviewPhoto={setPreviewPhoto}
      />

      {/* Modal Zoom Photo Portfolio */}
      <AdminPhotoModal
        photoUrl={previewPhoto}
        onClose={() => setPreviewPhoto(null)}
      />
    </div>
  );
};
