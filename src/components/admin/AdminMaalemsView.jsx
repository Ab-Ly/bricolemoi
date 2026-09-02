import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Star, 
  Coins, 
  Gift, 
  UserCheck, 
  UserX, 
  Ban, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Images, 
  Clock, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Receipt,
  Activity,
  FileText
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from '../EnhancedCategoryIcon';
import { formatDateTime } from '../../utils/dateUtils';
import { calculateMaalemBalance } from '../../utils/balanceUtils';
import { calculateMaalemRating } from '../../utils/ratingUtils';
import { paginateArray } from '../../utils/paginationUtils';
import { PaginationControls } from '../common/PaginationControls';
import { deduplicateMaalems } from '../../services/dataReconciliationService';

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

  // Calcul infaillible du solde pour chaque Maâlem basé sur le grand livre des transactions
  const getMaalemCreditBalance = (m) => {
    if (!m) return 0;
    return calculateMaalemBalance(m, transactions, maalems).liveAvailableBalance;
  };

  // Calcul dynamique de la note et des avis pour chaque Maâlem
  const getMaalemRating = (m) => {
    if (!m) return { averageRating: 5.0, totalReviews: 0, maalemReviews: [] };
    return calculateMaalemRating(m, reviews, interventions);
  };

  // Filtrage des artisans sans AUCUN doublon
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

  // Données de l'artisan sélectionné dans le Slide-Over Drawer
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
      
      const rawComment = matchReview?.comment || intv.comment || '';
      const rawBadges = Array.isArray(matchReview?.badges) && matchReview.badges.length > 0
        ? matchReview.badges
        : (Array.isArray(intv.badges) ? intv.badges : []);

      let badges = [...rawBadges];
      let cleanComment = rawComment;
      if (cleanComment.includes('[Badges:')) {
        const badgeMatch = cleanComment.match(/\[Badges:\s*([^\]]+)\]/);
        if (badgeMatch && badgeMatch[1]) {
          const parsed = badgeMatch[1].split(',').map((b) => b.trim()).filter(Boolean);
          badges = Array.from(new Set([...badges, ...parsed]));
          cleanComment = cleanComment.replace(/\[Badges:[^\]]+\]/g, '').trim();
        }
      }
      if (cleanComment.includes('[Pourboire:')) {
        cleanComment = cleanComment.replace(/\[Pourboire:[^\]]+\]/g, '').trim();
      }
      cleanComment = cleanComment.replace(/^["']|["']$/g, '').trim();

      return {
        ...intv,
        rating,
        comment: cleanComment,
        badges,
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

  // Pagination
  const pagination = useMemo(() => {
    return paginateArray(filteredMaalems, currentPage, pageSize);
  }, [filteredMaalems, currentPage, pageSize]);

  const cleanPhone = (phone) => (phone || '').replace(/\D/g, '');  return (
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
              Supervision de la disponibilité Ably, recharges de crédits (15 DH), consultation des fiches et des portfolios.
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

        {/* Filtres Villes & Statuts (Scrollable sans rupture) */}
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

      {/* Grille des Cartes Maâlems avec Accès Direct à la Fiche */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pagination.items.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            Aucun artisan correspondant aux critères de recherche.
          </div>
        ) : (
          pagination.items.map((m) => {
            const isOnline = Boolean(m.is_online);
            const isSuspended = Boolean(m.is_suspended);
            const creditBal = getMaalemCreditBalance(m);
            const pClean = cleanPhone(m.phone);
            const photos = m.portfolio_urls || [];

            return (
              <motion.div
                layout
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white border rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                  isSuspended
                    ? 'border-rose-200 bg-rose-50/20'
                    : isOnline
                      ? 'border-emerald-300 ring-1 ring-emerald-200 hover:shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Header : Spécialité + Statut En Ligne */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 ${getSpecialtyMeta(m.specialty).bgClass}`}>
                      <EnhancedCategoryIcon type={m.specialty} className="w-3.5 h-3.5" />
                      <span>{getSpecialtyMeta(m.specialty).label}</span>
                    </span>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                      isOnline
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                      <span>{isOnline ? 'En Ligne' : 'Hors Ligne'}</span>
                    </span>
                  </div>

                  {/* Nom, Étoiles & Ville */}
                  <div className="space-y-1">
                    <h3 
                      onClick={() => setSelectedMaalem(m)}
                      className="font-black text-slate-900 text-sm truncate cursor-pointer hover:text-emerald-700 transition-colors"
                    >
                      {m.full_name || 'Artisan Maâlem'}
                    </h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{m.district || m.city_zone || 'Casablanca'}</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      {(() => {
                        const rInfo = getMaalemRating(m);
                        return (
                          <span className="flex items-center text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shadow-xs">
                            <Star className={`w-3 h-3 mr-1 ${rInfo.totalReviews > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                            <span>{rInfo.totalReviews > 0 ? rInfo.averageRating.toFixed(1) : '-'}</span>
                            {rInfo.totalReviews > 0 && (
                              <span className="ml-1 text-[9px] text-amber-600">({rInfo.totalReviews})</span>
                            )}
                          </span>
                        );
                      })()}
                      <a href={`tel:${m.phone}`} className="text-slate-700 font-mono text-[11px] hover:text-blue-600 flex items-center gap-1 font-bold">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{m.phone || 'Non renseigné'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Solde Crédits & Statut Compte */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Solde Leads :</span>
                      <p className={`font-mono font-black text-sm ${creditBal >= 15 ? 'text-emerald-700' : 'text-rose-600 animate-pulse'}`}>
                        {creditBal.toFixed(2)} DH
                      </p>
                    </div>

                    {/* Bouton Fiche Maâlem */}
                    <button
                      type="button"
                      onClick={() => setSelectedMaalem(m)}
                      className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Fiche</span>
                    </button>
                  </div>
                </div>

                {/* Actions Administrateur : Crédit +15 DH / +50 DH & WhatsApp */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {/* Bouton +15 DH */}
                    <button
                      type="button"
                      onClick={() => onQuickCredit && onQuickCredit(m.id, 15)}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Offrir 1 crédit de lead (15 DH)"
                    >
                      <Gift className="w-3 h-3" />
                      <span>+15 DH</span>
                    </button>

                    {/* Bouton +50 DH */}
                    <button
                      type="button"
                      onClick={() => onQuickCredit && onQuickCredit(m.id, 50)}
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Offrir 50 DH de crédits"
                    >
                      <Coins className="w-3 h-3" />
                      <span>+50 DH</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* WhatsApp Relance Solde */}
                    {pClean.length >= 9 && (
                      <a
                        href={`https://wa.me/212${pClean.replace(/^0/, '')}?text=${encodeURIComponent(
                          `Salam ${m.full_name || 'Si Maâlem'}, votre solde BricoleMoi est de ${creditBal.toFixed(2)} DH. Rechargez votre compte pour continuer à recevoir les urgences SOS.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center justify-center shadow-xs"
                        title="Relance WhatsApp"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                      </a>
                    )}

                    {/* Suspension / Réactivation */}
                    <button
                      type="button"
                      onClick={() => onToggleSuspension && onToggleSuspension(m.id)}
                      className={`flex-1 py-1.5 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs ${
                        isSuspended
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                          : 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      {isSuspended ? (
                        <>
                          <UserCheck className="w-3 h-3 text-emerald-600" />
                          <span>Réactiver</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3 h-3 text-rose-600" />
                          <span>Suspendre</span>
                        </>
                      )}
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
        pageSizeOptions={[8, 16, 24, 48]}
        itemLabel="artisans"
      />

      {/* ========================================================================= */}
      {/* Slide-over Drawer : FICHE MAÂLEM COMPLÈTE & HISTORIQUE                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedMaalem && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaalem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-lg bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Header Drawer */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xl flex items-center justify-center shadow-xs shrink-0">
                        {selectedMaalem.full_name ? selectedMaalem.full_name.charAt(0).toUpperCase() : 'M'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                            {selectedMaalem.full_name || 'Artisan Maâlem'}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                            selectedMaalem.is_online
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-100 border-slate-200 text-slate-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedMaalem.is_online ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            <span>{selectedMaalem.is_online ? 'En Ligne' : 'Hors Ligne'}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${getSpecialtyMeta(selectedMaalem.specialty).bgClass}`}>
                            {getSpecialtyMeta(selectedMaalem.specialty).label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ID: {String(selectedMaalem.id).slice(0, 10)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMaalem(null)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 4 Compteurs KPI de l'artisan */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-center shadow-xs">
                      <span className="text-[9px] font-mono text-emerald-800 uppercase block font-bold">Solde Leads</span>
                      <p className="text-base font-black text-emerald-800 font-mono mt-0.5">
                        {getMaalemCreditBalance(selectedMaalem).toFixed(2)} DH
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center shadow-xs">
                      <span className="text-[9px] font-mono text-amber-800 uppercase block font-bold">Note ★</span>
                      <p className="text-base font-black text-amber-800 font-mono mt-0.5">
                        {getMaalemRating(selectedMaalem).totalReviews > 0
                          ? `${getMaalemRating(selectedMaalem).averageRating.toFixed(1)} / 5`
                          : '- / 5'}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-2.5 text-center shadow-xs">
                      <span className="text-[9px] font-mono text-blue-700 uppercase block font-bold">Missions</span>
                      <p className="text-base font-black text-blue-700 font-mono mt-0.5">
                        {maalemDrawerData.stats.totalJobs}
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-2.5 text-center shadow-xs">
                      <span className="text-[9px] font-mono text-purple-700 uppercase block font-bold">Réalisées</span>
                      <p className="text-base font-black text-purple-700 font-mono mt-0.5">
                        {maalemDrawerData.stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Drawer : Coordonnées, Portfolio & Historiques */}
                <div className="p-6 space-y-6 flex-1">
                  {/* Coordonnées & Actions de Recharge Immédiates */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coordonnées &amp; Secteur d'Intervention</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono">Téléphone :</span>
                        <p className="font-bold text-slate-900 font-mono">{selectedMaalem.phone || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono">Ville &amp; Secteur :</span>
                        <p className="font-bold text-slate-900">{selectedMaalem.district || selectedMaalem.city_zone || 'Casablanca'}</p>
                      </div>
                    </div>

                    {/* Crédit Direct */}
                    <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                      <span className="text-[10px] text-slate-600 font-mono font-bold uppercase">Créditer Solde :</span>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 15)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      >
                        +15 DH
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 50)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      >
                        +50 DH
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 100)}
                        className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      >
                        +100 DH
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Photos de Réalisations */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-blue-600" />
                        <span>Portfolio de Réalisations ({(selectedMaalem.portfolio_urls || []).length})</span>
                      </h4>
                    </div>

                    {(selectedMaalem.portfolio_urls || []).length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-2">
                        Aucune photo de chantier uploadée pour le moment.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {(selectedMaalem.portfolio_urls || []).map((url, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setPreviewPhoto(url)}
                            className="relative group rounded-xl overflow-hidden border border-slate-200 cursor-pointer h-20 shadow-xs"
                          >
                            <img
                              src={url}
                              alt={`Réalisation ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* FUSION : Registre Unifié des Chantiers & Évaluations Clients */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Historique des Chantiers & Avis ({maalemDrawerData.maalemMissions.length})</span>
                      </h4>
                      {getMaalemRating(selectedMaalem).totalReviews > 0 && (
                        <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          Moyenne : {getMaalemRating(selectedMaalem).averageRating.toFixed(1)} / 5 ★ ({getMaalemRating(selectedMaalem).totalReviews} avis)
                        </span>
                      )}
                    </div>

                    {maalemDrawerData.maalemMissions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                        Aucun chantier enregistré pour cet artisan.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {maalemDrawerData.maalemMissions.map((m) => {
                          const clientPhoneClean = cleanPhone(m.client_phone);
                          const hasReview = m.rating !== null && m.rating !== undefined;

                          return (
                            <div
                              key={m.id}
                              className="bg-white border border-slate-200/90 rounded-2xl p-4 text-xs space-y-2.5 shadow-xs hover:border-slate-300 transition-all"
                            >
                              {/* Header Chantier : Métier + Statut */}
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-black text-slate-900 text-sm">
                                  {m.subcategory || 'Dépannage d\'urgence'}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                                  m.status === 'COMPLETED'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                    : m.status === 'CANCELLED'
                                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                                    : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
                                }`}>
                                  {m.status === 'COMPLETED' ? '✅ Clôturé' : m.status === 'CANCELLED' ? '❌ Annulé' : '🛠️ En cours'}
                                </span>
                              </div>

                              {/* Ligne Client & Secteur */}
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between gap-2 flex-wrap text-[11px]">
                                <div className="flex items-center gap-1.5 text-slate-700">
                                  <span className="font-bold text-slate-900">👤 {m.client_name || 'Client BricoleMoi'}</span>
                                  <span>•</span>
                                  <span className="text-slate-500">📍 {m.district || 'Casablanca'}</span>
                                </div>

                                {m.client_phone && (
                                  <div className="flex items-center gap-2">
                                    <a href={`tel:${m.client_phone}`} className="font-mono text-blue-700 font-bold hover:underline flex items-center gap-1">
                                      <Phone className="w-3 h-3 text-blue-600" />
                                      <span>{m.client_phone}</span>
                                    </a>
                                    {clientPhoneClean.length >= 9 && (
                                      <a
                                        href={`https://wa.me/212${clientPhoneClean.replace(/^0/, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-700 hover:text-emerald-800 p-0.5"
                                      >
                                        <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Tarification & Date */}
                              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                                <span>Tarif : <strong className="text-slate-900">{m.final_agreed_price ? `${m.final_agreed_price} DH` : '🤝 Accord Direct'}</strong></span>
                                <span>Lancé le : {formatDateTime(m.created_at || Date.now(), 'long')}</span>
                              </div>

                              {/* Bloc Évaluation & Avis Client intégré */}
                              {hasReview ? (
                                <div className="mt-2 pt-2 border-t border-slate-100 bg-amber-50/40 rounded-xl p-3 border border-amber-200/60 space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-amber-900 uppercase flex items-center gap-1">
                                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                      <span>Avis Client Déposé</span>
                                    </span>
                                    <span className="text-xs font-mono font-black text-amber-800">
                                      {Number(m.rating).toFixed(1)} / 5 ★
                                    </span>
                                  </div>

                                  {m.comment && (
                                    <p className="text-slate-800 text-[11px] italic bg-white p-2 rounded-lg border border-amber-100">
                                      « {m.comment} »
                                    </p>
                                  )}

                                  {Array.isArray(m.badges) && m.badges.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      {m.badges.map((b, bIdx) => (
                                        <span
                                          key={bIdx}
                                          className={`text-[9px] px-2 py-0.5 rounded-md font-bold border ${
                                            b.includes('⚠️') || b.includes('💰') || b.includes('⏱️ Retard') || b.includes('🛠️ Travail incomplet') || b.includes('🧹 Saleté')
                                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                          }`}
                                        >
                                          🏷️ {b}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                m.status === 'COMPLETED' && (
                                  <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100">
                                    ℹ️ Chantier clôturé sans commentaire client.
                                  </p>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Journal des Transactions Financières du Portefeuille */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Journal du Portefeuille ({maalemDrawerData.maalemTransactions.length})</span>
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        Solde : {getMaalemCreditBalance(selectedMaalem).toFixed(2)} DH
                      </span>
                    </div>

                    {maalemDrawerData.maalemTransactions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                        Aucune transaction enregistrée pour cet artisan.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-56 overflow-y-auto modal-scroll pr-1">
                        {maalemDrawerData.maalemTransactions.map((tx) => {
                          const isPositive = Number(tx.amount_dh) > 0;
                          return (
                            <div
                              key={tx.id}
                              className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between gap-2 shadow-2xs"
                            >
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 truncate">
                                  {tx.payment_method || tx.type}
                                </p>
                                <p className="text-[10px] text-slate-500 font-mono">
                                  {formatDateTime(tx.created_at || Date.now(), 'long')}
                                </p>
                              </div>
                              <span className={`font-mono font-bold px-2 py-0.5 rounded-lg text-xs ${
                                isPositive
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                              }`}>
                                {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : Number(tx.amount_dh).toFixed(2)} DH
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Drawer : WhatsApp & Suspension */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    {cleanPhone(selectedMaalem.phone).length >= 9 && (
                      <a
                        href={`https://wa.me/212${cleanPhone(selectedMaalem.phone).replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                        <span>Message WhatsApp</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleSuspension) {
                          onToggleSuspension(selectedMaalem.id);
                        }
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                        selectedMaalem.is_suspended
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700'
                      }`}
                    >
                      {selectedMaalem.is_suspended ? (
                        <>
                          <UserCheck className="w-3 h-3 text-emerald-600" />
                          <span>Réactiver Compte</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3 h-3 text-rose-600" />
                          <span>Suspendre Compte</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Zoom Photo Portfolio */}
      <AnimatePresence>
        {previewPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPhoto(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-4 shadow-2xl text-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-mono font-bold text-slate-800">Photo de Chantier Réalisé</span>
                <button
                  type="button"
                  onClick={() => setPreviewPhoto(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[70vh] flex items-center justify-center bg-slate-50">
                <img
                  src={previewPhoto}
                  alt="Aperçu portfolio"
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
