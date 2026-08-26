import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { calculateMaalemRating } from '../../utils/ratingUtils';
import { 
  Gift, 
  Sparkles, 
  Award, 
  Coins, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  ExternalLink,
  Wrench,
  Flame,
  ChevronRight
} from 'lucide-react';

export const AdminLoyaltyRewardsView = () => {
  const {
    maalems = [],
    reviews = [],
    interventions = [],
    loyaltyRewardsHistory = [],
    awardManualFreeLead,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [selectedMaalemForReward, setSelectedMaalemForReward] = useState('');
  const [manualReason, setManualReason] = useState('Geste commercial & Fidélité Admin');
  const [selectedAuditRecord, setSelectedAuditRecord] = useState(null);

  // 1. Calcul des métriques globales de Gratuité & Fidélité
  const totalFreeLeadsCount = loyaltyRewardsHistory.length;
  const totalBudgetDistributedDH = totalFreeLeadsCount * 15.00;
  
  const rewardedMaalemsSet = new Set(loyaltyRewardsHistory.map((r) => String(r.maalem_id || '').trim()));
  const uniqueRewardedMaalemsCount = rewardedMaalemsSet.size;

  const totalReviewsCount = reviews.length;
  const positiveReviewsCount = reviews.filter((r) => Number(r.rating) >= 4).length;
  const excellenceRate = totalReviewsCount > 0 
    ? Math.round((positiveReviewsCount / totalReviewsCount) * 100) 
    : 100;

  // 2. Calcul du statut de jauge en direct pour chaque Maâlem
  const maalemsWithLoyalty = maalems.map((m) => {
    const ratingData = calculateMaalemRating(m, reviews, interventions);
    return {
      ...m,
      rating_avg: ratingData.averageRating,
      total_reviews: ratingData.totalReviews,
      loyalty: ratingData.loyalty
    };
  });

  // Filtrage des Maâlems pour la liste de progression
  const filteredMaalems = maalemsWithLoyalty.filter((m) => {
    const matchesSearch = 
      (m.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.phone || '').includes(searchQuery) ||
      (m.district || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpecialty === 'ALL' || m.specialty === selectedSpecialty;
    return matchesSearch && matchesSpec;
  });

  const handleGrantManualReward = async (e) => {
    e.preventDefault();
    if (!selectedMaalemForReward) {
      showToast('Veuillez sélectionner un artisan Maâlem', 'error');
      return;
    }
    await awardManualFreeLead(selectedMaalemForReward, manualReason);
    setIsManualModalOpen(false);
    setSelectedMaalemForReward('');
    setManualReason('Geste commercial & Fidélité Admin');
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      {/* 1. Header & KPIs Haute Densité */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Total Leads Gratuits */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Leads 100% Offerts
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 font-mono">{totalFreeLeadsCount}</p>
            <p className="text-[11px] text-purple-700 font-bold mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Attribués via Jauge 4/4 &amp; Bonus</span>
            </p>
          </div>
        </div>

        {/* KPI 2 : Budget Gratuités en DH */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Budget Primes Distribué
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 font-mono">
              {totalBudgetDistributedDH.toFixed(2)} <span className="text-sm font-sans font-bold text-slate-500">DH</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
              15.00 DH de valeur par Lead SOS
            </p>
          </div>
        </div>

        {/* KPI 3 : Artisans Récompensés */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Maâlems Récompensés
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 font-mono">
              {uniqueRewardedMaalemsCount} <span className="text-sm font-sans font-bold text-slate-400">/ {maalems.length}</span>
            </p>
            <p className="text-[11px] text-amber-700 font-bold mt-0.5">
              Artisans ayant complété la jauge
            </p>
          </div>
        </div>

        {/* KPI 4 : Taux d'Excellence */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Taux Avis Qualifiants
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 font-mono">{excellenceRate}%</p>
            <p className="text-[11px] text-blue-700 font-bold mt-0.5">
              Notes 4★ et 5★ sur les chantiers
            </p>
          </div>
        </div>
      </div>

      {/* 2. Barre d'Actions & Bouton Octroi Manuel */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
            🎯
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Règle de Fidélité : 4 Avis 4★/5★ = 1 Lead SOS Offert</h3>
            <p className="text-xs text-slate-500">Calcul automatique en temps réel à chaque clôture de chantier réussie.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsManualModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Accorder un Lead Gratuit Manuel</span>
        </button>
      </div>

      {/* 3. Section 1 : Suivi des Jauges de Progression en Direct (Côté Artisans) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Jauges de Progression en Direct par Artisan</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                {filteredMaalems.length} artisans
              </span>
            </h3>
            <p className="text-xs text-slate-500">Visualisez en temps réel l'avancement des Maâlems vers leur prochain Lead Gratuit.</p>
          </div>

          {/* Filtres & Recherche */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher artisan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>

        {/* Grille des Artisans et leur Jauge 4/4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredMaalems.map((m) => {
            const loyalty = m.loyalty || { currentCycleProgress: 0, targetPerReward: 4, remainingCount: 4, qualifyingCount: 0, totalFreeLeadsEarned: 0 };
            const progress = loyalty.currentCycleProgress || 0;
            const progressPercent = Math.min(100, (progress / 4) * 100);

            return (
              <div 
                key={m.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-black text-sm shrink-0">
                      {m.full_name ? m.full_name.charAt(0).toUpperCase() : 'M'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-slate-900 truncate">{m.full_name || 'Artisan Maâlem'}</h4>
                      <p className="text-[10px] text-slate-500 font-mono truncate">{m.district || 'Casablanca'} • {m.specialty || 'Plomberie'}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{m.rating_avg || 5.0}</span>
                  </span>
                </div>

                {/* Jauge Visuelle 4 Échelons */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span>Progression Cycle :</span>
                      <strong className="text-purple-700 font-mono font-black">{progress} / 4</strong>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {loyalty.remainingCount === 0 || progress === 4 
                        ? '🎁 Lead Débloqué !' 
                        : `Plus que ${loyalty.remainingCount} avis 4★+`}
                    </span>
                  </div>

                  {/* 4 Paliers Graphiques */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((step) => {
                      const isFilled = progress >= step;
                      const isGiftStep = step === 4;
                      return (
                        <div
                          key={step}
                          className={`h-2.5 rounded-full transition-all ${
                            isFilled
                              ? isGiftStep
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xs'
                                : 'bg-amber-400'
                              : 'bg-slate-200'
                          }`}
                          title={`Étape ${step}/4 ${isGiftStep ? '(Lead Offert)' : ''}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Footer Carte : Gratuités Totales Gagnées */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                  <span>Total Leads Gagnés :</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    🎁 {loyalty.totalFreeLeadsEarned || 0} offerts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Section 2 : Registre d'Audit des Gratuités Accordées */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Registre d'Audit &amp; Historique des Leads Gratuits Accordés</span>
            </h3>
            <p className="text-xs text-slate-500">Traçabilité complète des primes de 15.00 DH distribuées par le système et l'administration.</p>
          </div>
        </div>

        {loyaltyRewardsHistory.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <Gift className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Aucune prime de gratuité enregistrée pour le moment</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Dès qu'un artisan cumule 4 avis ≥ 4★ ou qu'un administrateur accorde un lead bonus, l'événement apparaîtra ici avec son audit complet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Date &amp; Heure</th>
                  <th className="py-3 px-3">Artisan Maâlem</th>
                  <th className="py-3 px-3">Type de Prime</th>
                  <th className="py-3 px-3">Valeur Offerte</th>
                  <th className="py-3 px-3">Missions Qualifiantes</th>
                  <th className="py-3 px-3">Statut</th>
                  <th className="py-3 px-3 text-right">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loyaltyRewardsHistory.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {new Date(rec.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>{rec.maalem_name || 'Artisan Maâlem'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{rec.maalem_phone}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                        {rec.reward_type === 'MANUAL_FREE_LEAD' ? '👑 Geste Admin' : '⭐ Cycle 4/4 Avis'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-black text-emerald-700">
                      +{Number(rec.reward_value_dh || 15).toFixed(2)} DH
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {rec.qualifying_missions && rec.qualifying_missions.length > 0 ? (
                        <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {rec.qualifying_missions.length} chantiers validés
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Attribué manuellement</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Crédité au solde</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedAuditRecord(rec)}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-purple-600" />
                        <span>Audit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Modale d'Attribution Manuelle de Lead Gratuit */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-slate-900"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    🎁
                  </div>
                  <h3 className="text-base font-black text-slate-900">Accorder un Lead Gratuit</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleGrantManualReward} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sélectionner l'Artisan Maâlem Bénéficiaire :
                  </label>
                  <select
                    value={selectedMaalemForReward}
                    onChange={(e) => setSelectedMaalemForReward(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="">-- Choisir un artisan --</option>
                    {maalems.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.full_name || 'Maâlem'} ({m.specialty || 'Plombier'} - {m.district || 'Casablanca'}) - Solde: {m.credit_balance || 0} DH
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Motif de l'Attribution (Visible dans l'audit) :
                  </label>
                  <input
                    type="text"
                    value={manualReason}
                    onChange={(e) => setManualReason(e.target.value)}
                    required
                    placeholder="Ex: Artisan du mois, Geste commercial SAV..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Impact Immédiat :</span>
                  </p>
                  <p className="text-[11px] text-purple-700">
                    L'artisan sera crédité de <strong>+15.00 DH</strong> (valeur exacte d'un déblocage SOS), recevra une notification sonore festive sur son téléphone et l'action sera tracée dans le registre d'audit.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 cursor-pointer"
                  >
                    Valider &amp; Créditer (+15 DH)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Modale de Consultation Détaillée d'Audit */}
      <AnimatePresence>
        {selectedAuditRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 text-slate-900"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    🔍
                  </div>
                  <h3 className="text-base font-black text-slate-900">Détail d'Audit de la Gratuité</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAuditRecord(null)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono block">Bénéficiaire :</span>
                    <strong className="text-slate-900">{selectedAuditRecord.maalem_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono block">Téléphone :</span>
                    <strong className="text-slate-900 font-mono">{selectedAuditRecord.maalem_phone || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono block">Montant Accordé :</span>
                    <strong className="text-emerald-700 font-mono font-black">+{selectedAuditRecord.reward_value_dh} DH</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono block">Type :</span>
                    <strong className="text-purple-700">{selectedAuditRecord.reward_type}</strong>
                  </div>
                </div>

                {selectedAuditRecord.admin_notes && (
                  <p className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                    <strong>Motif Admin :</strong> {selectedAuditRecord.admin_notes}
                  </p>
                )}

                {selectedAuditRecord.qualifying_missions && selectedAuditRecord.qualifying_missions.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Les 4 Chantiers Qualifiants ayant Déclenché la Prime :</span>
                    </h5>
                    <div className="space-y-1.5">
                      {selectedAuditRecord.qualifying_missions.map((m, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="font-bold text-slate-900">{m.client_name || 'Client'}</span>
                            <span className="text-slate-400 font-mono ml-2">({m.district || 'Casablanca'})</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold font-mono">
                            ⭐ {m.rating} / 5
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedAuditRecord(null)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
