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
      else if (statusFilter === 'LOW_CREDIT') statusOk = (parseFloat(m.credit_balance) || 0) < 15;
      else if (statusFilter === 'SUSPENDED') statusOk = Boolean(m.is_suspended);

      return queryOk && cityOk && specOk && statusOk;
    });
  }, [maalems, searchTerm, cityFilter, specialtyFilter, statusFilter]);

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
    const totalRevenueDh = completed.reduce((sum, m) => sum + (parseFloat(m.final_agreed_price) || 200), 0);

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

  const cleanPhone = (phone) => (phone || '').replace(/\D/g, '');

  return (
    <div className="space-y-6">
      {/* Header & Filtres Rapides */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2.5 font-sans">
              <Wrench className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span>Réseau &amp; Fiches des Maâlems</span>
              <span className="text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                {filteredMaalems.length} artisans
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supervision de la disponibilité Ably, recharges de crédits (15 DH), consultation des fiches et des portfolios.
            </p>
          </div>

          {/* Recherche */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher par nom, téléphone ou ville..."
              className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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

        {/* Filtres Villes & Statuts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ville :</span>
          </div>

          {['ALL', 'Casablanca', 'Fès', 'Rabat', 'Marrakech', 'Tanger', 'Agadir'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setCityFilter(city);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                cityFilter === city
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {city === 'ALL' ? 'Toutes' : city}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-slate-800 mx-2 hidden sm:block" />

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
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                      : st === 'LOW_CREDIT'
                        ? 'bg-amber-950 border border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                        : 'bg-rose-950 border border-rose-500 text-rose-300'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
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
          <div className="col-span-full text-center py-12 bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-500 text-sm">
            Aucun artisan correspondant aux critères de recherche.
          </div>
        ) : (
          paginatedMaalems.map((m) => {
            const isOnline = Boolean(m.is_online);
            const isSuspended = Boolean(m.is_suspended);
            const creditBal = parseFloat(m.credit_balance) || 0;
            const pClean = cleanPhone(m.phone);
            const photos = m.portfolio_urls || [];

            return (
              <motion.div
                layout
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-slate-900/80 backdrop-blur-xl border rounded-3xl p-5 shadow-xl transition-all flex flex-col justify-between space-y-4 ${
                  isSuspended
                    ? 'border-rose-500/30 bg-rose-950/10'
                    : isOnline
                      ? 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Header : Spécialité + Statut En Ligne */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 ${getSpecialtyMeta(m.specialty).bgClass}`}>
                      <EnhancedCategoryIcon type={m.specialty} className="w-3.5 h-3.5" />
                      <span>{getSpecialtyMeta(m.specialty).label}</span>
                    </span>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                      isOnline
                        ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                      <span>{isOnline ? 'En Ligne' : 'Hors Ligne'}</span>
                    </span>
                  </div>

                  {/* Nom, Étoiles & Ville */}
                  <div className="space-y-1">
                    <h3 
                      onClick={() => setSelectedMaalem(m)}
                      className="font-black text-white text-sm truncate cursor-pointer hover:text-cyan-300 transition-colors"
                    >
                      {m.full_name || 'Artisan Maâlem'}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{m.district || m.city_zone || 'Casablanca'}</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="flex items-center text-amber-300 font-mono font-black bg-slate-950 px-2 py-0.5 rounded-lg border border-amber-500/30">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                        <span>{(m.rating_avg || 4.9).toFixed(1)}</span>
                      </span>
                      <a href={`tel:${m.phone}`} className="text-slate-300 font-mono text-[11px] hover:text-cyan-300 flex items-center gap-1 font-bold">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>{m.phone || 'Non renseigné'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Solde Crédits & Statut Compte */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Solde Leads :</span>
                      <p className={`font-mono font-black text-sm ${creditBal >= 15 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                        {creditBal.toFixed(2)} DH
                      </p>
                    </div>

                    {/* Bouton Fiche Maâlem */}
                    <button
                      type="button"
                      onClick={() => setSelectedMaalem(m)}
                      className="px-2.5 py-1 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Fiche Maâlem</span>
                    </button>
                  </div>
                </div>

                {/* Actions Administrateur : Crédit +15 DH / +50 DH & WhatsApp */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    {/* Bouton +15 DH */}
                    <button
                      type="button"
                      onClick={() => onQuickCredit && onQuickCredit(m.id, 15)}
                      className="flex-1 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-black rounded-xl shadow-md flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Offrir 1 crédit de lead (15 DH)"
                    >
                      <Gift className="w-3 h-3" />
                      <span>+15 DH</span>
                    </button>

                    {/* Bouton +50 DH */}
                    <button
                      type="button"
                      onClick={() => onQuickCredit && onQuickCredit(m.id, 50)}
                      className="flex-1 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[11px] font-black rounded-xl shadow-md flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
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
                        className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 hover:bg-emerald-950/80 transition-colors flex items-center justify-center"
                        title="Relance WhatsApp"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                      </a>
                    )}

                    {/* Suspension / Réactivation */}
                    <button
                      type="button"
                      onClick={() => onToggleSuspension && onToggleSuspension(m.id)}
                      className={`flex-1 py-1.5 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSuspended
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 hover:bg-emerald-900'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50'
                      }`}
                    >
                      {isSuspended ? (
                        <>
                          <UserCheck className="w-3 h-3" />
                          <span>Réactiver</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3 h-3" />
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
        <div className="p-4 bg-slate-900/80 border border-cyan-500/20 rounded-2xl flex items-center justify-between text-xs text-slate-400">
          <span>
            Page <strong className="text-white">{currentPage}</strong> sur <strong className="text-white">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Précédent
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaalem(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-lg bg-slate-950/95 border-l border-cyan-500/30 text-slate-100 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Header Drawer */}
                <div className="p-6 border-b border-slate-800/80 bg-slate-900/70 sticky top-0 z-10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-900 to-slate-900 border border-cyan-500/50 text-cyan-300 font-black text-xl flex items-center justify-center shadow-lg">
                        {selectedMaalem.full_name ? selectedMaalem.full_name.charAt(0).toUpperCase() : 'M'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                            {selectedMaalem.full_name || 'Artisan Maâlem'}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                            selectedMaalem.is_online
                              ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
                              : 'bg-slate-950 border-slate-700 text-slate-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedMaalem.is_online ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                            <span>{selectedMaalem.is_online ? 'En Ligne' : 'Hors Ligne'}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${getSpecialtyMeta(selectedMaalem.specialty).bgClass}`}>
                            {getSpecialtyMeta(selectedMaalem.specialty).label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {String(selectedMaalem.id).slice(0, 10)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMaalem(null)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 4 Compteurs KPI de l'artisan */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-2.5 text-center">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase block font-bold">Solde Leads</span>
                      <p className="text-base font-black text-emerald-300 font-mono mt-0.5">
                        {parseFloat(selectedMaalem.credit_balance || 0).toFixed(2)} DH
                      </p>
                    </div>

                    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-2.5 text-center">
                      <span className="text-[9px] font-mono text-amber-400 uppercase block font-bold">Note ★</span>
                      <p className="text-base font-black text-amber-300 font-mono mt-0.5">
                        {(selectedMaalem.rating_avg || 4.9).toFixed(1)} / 5
                      </p>
                    </div>

                    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-2.5 text-center">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold">Missions</span>
                      <p className="text-base font-black text-cyan-300 font-mono mt-0.5">
                        {maalemDrawerData.stats.totalJobs}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-2.5 text-center">
                      <span className="text-[9px] font-mono text-purple-400 uppercase block font-bold">Réalisées</span>
                      <p className="text-base font-black text-purple-300 font-mono mt-0.5">
                        {maalemDrawerData.stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Drawer : Coordonnées, Portfolio & Historiques */}
                <div className="p-6 space-y-6 flex-1">
                  {/* Coordonnées & Actions de Recharge Immédiates */}
                  <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Coordonnées &amp; Secteur d'Intervention</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono">Téléphone :</span>
                        <p className="font-bold text-white font-mono">{selectedMaalem.phone || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono">Ville &amp; Secteur :</span>
                        <p className="font-bold text-white">{selectedMaalem.district || selectedMaalem.city_zone || 'Casablanca'}</p>
                      </div>
                    </div>

                    {/* Crédit Direct */}
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Créditer Solde :</span>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 15)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black shadow-sm cursor-pointer"
                      >
                        +15 DH
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 50)}
                        className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-black shadow-sm cursor-pointer"
                      >
                        +50 DH
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickCredit && onQuickCredit(selectedMaalem.id, 100)}
                        className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-black shadow-sm cursor-pointer"
                      >
                        +100 DH
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Photos de Réalisations */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Images className="w-3.5 h-3.5" />
                      <span>Portfolio de Réalisations ({(selectedMaalem.portfolio_urls || []).length} photos)</span>
                    </h4>

                    {(selectedMaalem.portfolio_urls || []).length === 0 ? (
                      <p className="text-xs text-slate-500 italic bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                        Aucune photo de chantier uploadée pour le moment.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {(selectedMaalem.portfolio_urls || []).map((url, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setPreviewPhoto(url)}
                            className="relative group rounded-xl overflow-hidden border border-cyan-500/30 cursor-pointer h-24"
                          >
                            <img
                              src={url}
                              alt={`Réalisation ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                              <Eye className="w-4 h-4 text-cyan-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Historique des Interventions Réalisées */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Historique des Chantiers ({maalemDrawerData.maalemMissions.length})</span>
                    </h4>

                    {maalemDrawerData.maalemMissions.length === 0 ? (
                      <p className="text-xs text-slate-500 italic bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                        Aucune intervention assignée à cet artisan.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {maalemDrawerData.maalemMissions.map((m) => (
                          <div
                            key={m.id}
                            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-white">{m.subcategory || 'Dépannage'}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                                m.status === 'COMPLETED'
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                  : 'bg-cyan-950 border-cyan-500 text-cyan-300'
                              }`}>
                                {m.status === 'COMPLETED' ? 'Clôturée 🟢' : 'En cours 🛠️'}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400">
                              Client : <strong className="text-slate-200">{m.client_name || 'Client BricoleMoi'}</strong> • {m.district}
                            </p>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800">
                              <span>Prix : <strong className="text-cyan-300">{m.final_agreed_price ? `${m.final_agreed_price} DH` : '150-250 DH'}</strong></span>
                              <span>{new Date(m.created_at || Date.now()).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Drawer : WhatsApp & Suspension */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/80 sticky bottom-0 z-10 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    {cleanPhone(selectedMaalem.phone).length >= 9 && (
                      <a
                        href={`https://wa.me/212${cleanPhone(selectedMaalem.phone).replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-400" />
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
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        selectedMaalem.is_suspended
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                          : 'bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300'
                      }`}
                    >
                      {selectedMaalem.is_suspended ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Réactiver Compte</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 text-rose-400" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPhoto(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative max-w-xl w-full bg-slate-950 border border-cyan-500/40 rounded-3xl p-4 shadow-2xl text-slate-100 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-300">Photo de Chantier Réalisé</span>
                <button
                  type="button"
                  onClick={() => setPreviewPhoto(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-[70vh] flex items-center justify-center bg-black">
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
