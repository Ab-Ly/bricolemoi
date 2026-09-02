import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Wallet, 
  User, 
  Compass, 
  MapPin, 
  Star, 
  Radio, 
  Power, 
  PlusCircle, 
  ShieldCheck, 
  Award, 
  Clock, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Receipt,
  FileCheck,
  CheckCircle2,
  PhoneCall,
  Gift
} from 'lucide-react';
import { useMaalemViewState } from './hooks/useMaalemViewState';
import { MaalemActiveMissionCard } from './components/MaalemActiveMissionCard';
import { MaalemLeadsFeed } from './components/MaalemLeadsFeed';
import { MaalemLoyaltyGaugeCard } from './components/MaalemLoyaltyGaugeCard';
import { MaalemWalletModal } from './components/MaalemWalletModal';
import { MaalemTransactionsModal } from './components/MaalemTransactionsModal';
import { MaalemUnfeasibleModal } from './components/MaalemUnfeasibleModal';
import { MaalemPhotoPreviewModal } from './components/MaalemPhotoPreviewModal';
import { InteractiveMap } from '../InteractiveMap';

export const MaalemView = ({ onOpenCINVerification }) => {
  const maalem = useMaalemViewState({ onOpenCINVerification });
  const [activeTab, setActiveTab] = useState('RADAR'); // 'RADAR' | 'FINANCES' | 'PROFILE'
  const [showMap, setShowMap] = useState(false);

  const hasActiveMissions = maalem.activeUnlockedLeads.length > 0;
  const availableCount = maalem.availableLeads.length;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl w-full mx-auto pb-44 md:pb-24 font-sans px-2.5 sm:px-4">
      {/* 1. HEADER COMPACT HAUTE PERFORMANCE — Modern Clean & Trust */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Ligne 1 : Profil Artisan & Interrupteur Radar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
              {(maalem.user?.full_name || maalem.currentLiveMaalem?.full_name || 'M')[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                  {maalem.user?.full_name || maalem.currentLiveMaalem?.full_name || 'Artisan Maâlem'}
                </h2>
                {maalem.isCinVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CIN Vérifiée</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenCINVerification}
                    className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold hover:bg-amber-100 cursor-pointer shrink-0"
                  >
                    ⚡ Vérifier CIN
                  </button>
                )}
              </div>

              {/* Note Réelle & Avis */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                {(maalem.ratingInfo.totalReviews ?? 0) > 0 ? (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{maalem.ratingInfo.averageRating} / 5</span>
                    <span className="text-slate-400 font-normal">({maalem.ratingInfo.totalReviews} avis)</span>
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium">✨ Nouveau Maâlem (0 avis)</span>
                )}

                {maalem.ratingInfo.loyalty?.qualifyingCount > 0 && (
                  <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 text-[10px] inline-flex items-center gap-1">
                    <Gift className="w-3 h-3 text-blue-600" />
                    <span>{maalem.ratingInfo.loyalty.currentCycleProgress}/4 pour 1 Lead Offert</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Toggle Interrupteur EN LIGNE / EN PAUSE */}
          <button
            type="button"
            onClick={maalem.toggleMaalemOnlineStatus}
            className={`py-2.5 px-4 rounded-2xl font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 self-stretch sm:self-auto shrink-0 ${
              maalem.isMaalemOnline
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 ring-1 ring-emerald-400/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${maalem.isMaalemOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
            <span>{maalem.isMaalemOnline ? 'En Ligne (Radar Actif 🟢)' : 'En Pause (Hors Ligne)'}</span>
          </button>
        </div>

        {/* Ligne 2 : Portefeuille & Actions Rapides */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/20 to-amber-50/30 border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
          {/* Solde Leads */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs shrink-0">
              <Wallet className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                Solde de Leads
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                  {maalem.liveAvailableBalance.toFixed(2)} DH
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  (≈ {Math.floor(maalem.liveAvailableBalance / 15)} déblocages à 15 DH)
                </span>
              </div>
            </div>
          </div>

          {/* Boutons d'Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => maalem.setRechargeModalOpen(true)}
              className="flex-1 sm:flex-initial py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[42px]"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Recharger (+ Crédits)</span>
            </button>

            <button
              type="button"
              onClick={() => maalem.setHistoryModalOpen(true)}
              className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer min-h-[42px]"
              title="Voir l'historique complet des déblocages et transactions"
            >
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Historique</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. BARRE DES 3 ONGLETS PRIORITAIRES (MOBILE-FIRST) */}
      <div className="bg-slate-100/90 border border-slate-200 p-1.5 rounded-2xl shadow-xs">
        <div className="grid grid-cols-3 gap-1">
          {/* Onglet 1 : RADAR & CHANTIERS */}
          <button
            type="button"
            onClick={() => setActiveTab('RADAR')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'RADAR'
                ? 'bg-white text-amber-800 shadow-xs border border-slate-200/90 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className={`w-4 h-4 shrink-0 ${activeTab === 'RADAR' ? 'text-amber-600' : 'text-slate-400'}`} />
            <span>Radar & Chantiers</span>
            {availableCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                activeTab === 'RADAR' ? 'bg-amber-100 text-amber-900 animate-pulse' : 'bg-slate-200 text-slate-600'
              }`}>
                {availableCount}
              </span>
            )}
          </button>

          {/* Onglet 2 : SOLDE & FINANCES */}
          <button
            type="button"
            onClick={() => setActiveTab('FINANCES')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'FINANCES'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/90 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className={`w-4 h-4 shrink-0 ${activeTab === 'FINANCES' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Mon Solde</span>
          </button>

          {/* Onglet 3 : PROFIL & AVIS */}
          <button
            type="button"
            onClick={() => setActiveTab('PROFILE')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'PROFILE'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/90 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className={`w-4 h-4 shrink-0 ${activeTab === 'PROFILE' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Profil & Avis</span>
          </button>
        </div>
      </div>

      {/* 3. CONTENU CONDITIONNEL SELON L'ONGLET SÉLECTIONNÉ */}
      <AnimatePresence mode="wait">
        {/* ============================================================ */}
        {/* VUE 1 : RADAR & CHANTIERS (PRIORITÉ ABSOLUE SUR LE TERRAIN) */}
        {/* ============================================================ */}
        {activeTab === 'RADAR' && (
          <motion.div
            key="radar-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Priorité Absolue : Missions Actives Débloquées en cours */}
            {hasActiveMissions && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 font-mono">
                    Chantier en cours d'exécution
                  </h3>
                </div>
                <MaalemActiveMissionCard {...maalem} />
              </div>
            )}

            {/* Bouton Toggle Carte Radar GPS (Optionnel, n'encombre plus l'écran) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Localisation GPS : <strong>{maalem.maalemPos[0].toFixed(3)}, {maalem.maalemPos[1].toFixed(3)}</strong></span>
              </div>

              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                {showMap ? 'Masquer la Carte ▲' : '🗺️ Afficher la Carte ▼'}
              </button>
            </div>

            {/* Carte Dépliable à la demande */}
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden bg-white"
              >
                <InteractiveMap
                  mode="MAALEM_RADAR"
                  selectedLat={maalem.focusedMapCoords ? maalem.focusedMapCoords[0] : maalem.maalemPos[0]}
                  selectedLng={maalem.focusedMapCoords ? maalem.focusedMapCoords[1] : maalem.maalemPos[1]}
                />
              </motion.div>
            )}

            {/* Flux des Demandes SOS Disponibles */}
            <MaalemLeadsFeed {...maalem} />
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* VUE 2 : MON SOLDE & FINANCES (TRANSACTIONS, PACKS 15 DH)     */}
        {/* ============================================================ */}
        {activeTab === 'FINANCES' && (
          <motion.div
            key="finances-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Carte Synthèse Trésorerie */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Portefeuille &amp; Crédits de Chantiers
                    </h3>
                    <p className="text-xs text-slate-500">Déblocage garanti à 15.00 DH par mission (Accord Direct)</p>
                  </div>
                </div>

                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 bg-slate-50 px-4 py-1.5 rounded-2xl border border-slate-200">
                  {maalem.liveAvailableBalance.toFixed(2)} DH
                </span>
              </div>

              {/* 3 Métriques Comptables */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Rechargé</span>
                  <span className="text-sm sm:text-base font-black font-mono text-slate-900 mt-0.5 block">
                    {maalem.totalRechargedSum.toFixed(2)} DH
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Leads Débloqués</span>
                  <span className="text-sm sm:text-base font-black font-mono text-slate-900 mt-0.5 block">
                    {maalem.totalLeadsSpent.toFixed(2)} DH
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">Bonus Offerts</span>
                  <span className="text-sm sm:text-base font-black font-mono text-emerald-800 mt-0.5 block">
                    +{maalem.totalBonusSum.toFixed(2)} DH
                  </span>
                </div>
              </div>

              {/* Bouton d'Action de Recharge */}
              <button
                type="button"
                onClick={() => maalem.setRechargeModalOpen(true)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl shadow-sm font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Acheter un Pack de Leads (100 DH / 200 DH)</span>
              </button>
            </div>

            {/* Grand-Livre des Transactions */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 font-mono">
                  <Receipt className="w-4 h-4 text-slate-500" />
                  <span>HISTORIQUE DES DÉBLOCAGES &amp; TRANSACTIONS</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{maalem.myTransactions.length} opération(s)</span>
              </div>

              {maalem.myTransactions.length === 0 ? (
                <div className="py-8 text-center text-slate-400 space-y-1">
                  <Receipt className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">Aucune transaction enregistrée</p>
                  <p className="text-[11px] text-slate-400">Vos déblocages de chantiers à 15 DH apparaîtront ici.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {maalem.myTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{tx.description || tx.type}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{tx.created_at || 'Récent'}</span>
                      </div>
                      <span className={`font-mono font-black text-xs px-2.5 py-1 rounded-xl ${
                        tx.amount_dh > 0
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {tx.amount_dh > 0 ? `+${tx.amount_dh} DH` : `${tx.amount_dh} DH`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* VUE 3 : PROFIL, AVIS CLIENTS & PROGRAMME FIDÉLITÉ           */}
        {/* ============================================================ */}
        {activeTab === 'PROFILE' && (
          <motion.div
            key="profile-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Programme Fidélité 4/4 (Logé proprement ici sans encombrer l'accueil) */}
            <MaalemLoyaltyGaugeCard {...maalem} />

            {/* Fiche Artisan & Vérification */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Fiche Artisan &amp; Spécialité
                  </h3>
                  <p className="text-xs text-slate-500">Profil public visible par les clients du secteur</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                  {maalem.maalemDetails.specialty || 'Plomberie'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 font-medium">Numéro de Téléphone :</span>
                  <strong className="font-mono text-slate-900">{maalem.user?.phone || 'Non renseigné'}</strong>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 font-medium">Zone d'intervention :</span>
                  <strong className="text-slate-900">{maalem.user?.city_zone || 'Fès - Oulad Tayeb'}</strong>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 font-medium">Carte Nationale (CIN) :</span>
                  {maalem.isCinVerified ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Vérifiée &amp; Conforme
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenCINVerification}
                      className="text-amber-700 font-bold hover:underline cursor-pointer"
                    >
                      ⚡ Téléverser ma CIN
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Avis et Évaluations Clients Réels */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Avis Clients Vérifiés ({maalem.ratingInfo.totalReviews || 0})</span>
                </h3>
                <span className="text-xs font-bold text-amber-600">{maalem.ratingInfo.averageRating} / 5.0</span>
              </div>

              {(maalem.ratingInfo.totalReviews ?? 0) === 0 ? (
                <div className="py-8 text-center text-slate-400 space-y-1">
                  <Star className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">Aucun avis pour le moment</p>
                  <p className="text-[11px] text-slate-400">
                    Vos futures évaluations clients 1-5★ avec badges de confiance apparaîtront ici.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Liste des avis clients */}
                  <p className="text-xs text-slate-600">Historique complet des avis reçus.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MODALES DE SOUTIEN (RECHARGE, HISTORIQUE, ZOOM HD) */}
      <MaalemWalletModal {...maalem} />
      <MaalemTransactionsModal {...maalem} />
      <MaalemUnfeasibleModal {...maalem} />
      <MaalemPhotoPreviewModal {...maalem} />
    </div>
  );
};
