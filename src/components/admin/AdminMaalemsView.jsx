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
  const itemsPerPage = 8;

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

  // Filtrage des artisans
  const filteredMaalems = useMemo(() => {
    return maalems.filter((m) => {
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
    const mPhone = String(selectedMaalem.phone || '').replace(/\D/g, '');

    const maalemMissions = interventions.filter((intv) => {
      const matchId = mId && String(intv.maalem_id || '').trim() === mId;
      const matchPhone = mPhone && mPhone.length > 7 && String(intv.maalem_phone || '').replace(/\D/g, '') === mPhone;
      return matchId || matchPhone;
    });

    const maalemTransactions = transactions.filter((tx) => {
      const matchId = mId && String(tx.maalem_id || '').trim() === mId;
      const matchPhone = mPhone && mPhone.length > 7 && String(tx.maalem_phone || '').replace(/\D/g, '') === mPhone;
      return matchId || matchPhone;
    });

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
  }, [selectedMaalem, interventions, transactions]);

  // Pagination
  const totalPages = Math.ceil(filteredMaalems.length / itemsPerPage) || 1;
  const paginatedMaalems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMaalems.slice(start, start + itemsPerPage);
  }, [filteredMaalems, currentPage]);

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

        {/* Filtres Villes & Statuts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
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
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                cityFilter === city
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {city === 'ALL' ? 'Toutes' : city}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

          {/* Filtre Statut */}
          <div className="flex items-center gap-1.5 ml-auto">
            {['ALL', 'ONLINE', 'LOW_CREDIT', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? st === 'ONLINE'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs'
                      : st === 'LOW_CREDIT'
                        ? 'bg-amber-50 border border-amber-200 text-amber-800 shadow-xs'
                        : 'bg-rose-50 border border-rose-200 text-rose-700 shadow-xs'
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
        {paginatedMaalems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            Aucun artisan correspondant aux critères de recherche.
          </div>
        ) : (
          paginatedMaalems.map((m) => {
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

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between text-xs text-slate-500 shadow-xs">
          <span>
            Page <strong className="text-slate-900">{currentPage}</strong> sur <strong className="text-slate-900">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              Précédent
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

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

                  {/* Avis & Commentaires Clients */}
                  <div>
                    {(() => {
                      const selRating = getMaalemRating(selectedMaalem);
                      return (
                        <>
                          <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Star className={`w-3.5 h-3.5 ${selRating.totalReviews > 0 ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} />
                              <span>Avis &amp; Commentaires Clients ({selRating.totalReviews})</span>
                            </span>
                            <span className="text-amber-800 font-mono font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                              Moyenne : {selRating.totalReviews > 0 ? `${selRating.averageRating.toFixed(1)} / 5.0` : 'Nouveau Profil'}
                            </span>
                          </h4>

                          {selRating.maalemReviews.length === 0 ? (
                            <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                              Aucun avis client enregistré pour cet artisan.
                            </p>
                          ) : (
                            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                              {selRating.maalemReviews.map((rev) => (
                                <div key={rev.id || rev.intervention_id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-1.5 shadow-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-900">{rev.client_name || 'Client BricoleMoi'}</span>
                                    <span className="flex items-center gap-0.5 text-amber-600 font-mono font-bold">
                                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                      <span>{Number(rev.rating || 5).toFixed(1)}★</span>
                                    </span>
                                  </div>
                                  {rev.comment && (
                                    <p className="text-slate-700 italic bg-white p-2 rounded-xl border border-slate-100">
                                      « {rev.comment} »
                                    </p>
                                  )}
                                  {Array.isArray(rev.badges) && rev.badges.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {rev.badges.map((b, i) => (
                                        <span key={i} className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 font-bold">
                                          🏷️ {b}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  <span className="text-[10px] text-slate-400 font-mono block">
                                    {formatDateTime(rev.created_at, 'long')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  {/* Portfolio Photos de Réalisations */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Images className="w-3.5 h-3.5 text-blue-600" />
                      <span>Portfolio de Réalisations ({(selectedMaalem.portfolio_urls || []).length} photos)</span>
                    </h4>

                    {(selectedMaalem.portfolio_urls || []).length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                        Aucune photo de chantier uploadée pour le moment.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {(selectedMaalem.portfolio_urls || []).map((url, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setPreviewPhoto(url)}
                            className="relative group rounded-xl overflow-hidden border border-slate-200 cursor-pointer h-24 shadow-xs"
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

                  {/* Historique des Interventions Réalisées */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Historique des Chantiers ({maalemDrawerData.maalemMissions.length})</span>
                    </h4>

                    {maalemDrawerData.maalemMissions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                        Aucune intervention assignée à cet artisan.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {maalemDrawerData.maalemMissions.map((m) => (
                          <div
                            key={m.id}
                            className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-1.5 shadow-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900">{m.subcategory || 'Dépannage'}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                                m.status === 'COMPLETED'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-blue-50 border-blue-200 text-blue-800'
                              }`}>
                                {m.status === 'COMPLETED' ? 'Clôturée 🟢' : 'En cours 🛠️'}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600">
                              Client : <strong className="text-slate-900">{m.client_name || 'Client BricoleMoi'}</strong> • {m.district}
                            </p>

                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200">
                              <span>Prix : <strong className="text-blue-700">{m.final_agreed_price ? `${m.final_agreed_price} DH` : 'Accord Direct'}</strong></span>
                              <span>{formatDateTime(m.created_at || Date.now(), 'long')}</span>
                            </div>
                          </div>
                        ))}
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
