import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Wallet, 
  Compass, 
  Star, 
  Power, 
  PlusCircle, 
  Clock, 
  Gift,
  Receipt,
  User,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMaalemViewState } from './hooks/useMaalemViewState';
import { MaalemActiveMissionCard } from './components/MaalemActiveMissionCard';
import { MaalemLeadsFeed } from './components/MaalemLeadsFeed';
import { MaalemLoyaltyGaugeCard } from './components/MaalemLoyaltyGaugeCard';
import { MaalemWalletModal } from './components/MaalemWalletModal';
import { MaalemTransactionsModal } from './components/MaalemTransactionsModal';
import { MaalemUnfeasibleModal } from './components/MaalemUnfeasibleModal';
import { MaalemPhotoPreviewModal } from './components/MaalemPhotoPreviewModal';
import { InteractiveMap } from '../InteractiveMap';

/**
 * 🛠️ Espace Artisan Maâlem — Modern Clean & Trust (Mobile-First)
 * 
 * Philosophie de Conception pour l'Artisan Marocain :
 * - ZÉRO onglet masqué : le radar des chantiers est le cœur permanent de l'écran.
 * - ZÉRO information répétée : solde, identité et actions regroupés en tête de page.
 * - Flux d'action direct : Statut -> Chantier en cours -> Demandes SOS -> Historique.
 * - Ergonomie tactile à une main : boutons larges (>= 48px), contrastes nets au soleil.
 */
export const MaalemView = ({ onOpenCINVerification }) => {
  const maalem = useMaalemViewState({ onOpenCINVerification });
  const { setProfileModalOpen, openProfileTab } = useAuth();

  const hasActiveMissions = maalem.activeUnlockedLeads.length > 0;
  const availableCount = maalem.availableLeads.length;

  return (
    <div className="space-y-4 sm:space-y-5 max-w-2xl w-full mx-auto pb-36 md:pb-24 font-sans px-2.5 sm:px-4">
      
      {/* ========================================================================= */}
      {/* 1. HEADER COCKPIT ARTISAN — STATUT, IDENTITÉ & PORTEFEUILLE RAPIDE       */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
        
        {/* Ligne 1 : Profil & Interrupteur En Ligne / En Pause */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Clic sur le profil ouvre la fiche complète UserProfileModal */}
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2.5 min-w-0 text-left group cursor-pointer active:scale-98 transition-all"
            title="Consulter ma fiche artisan complète"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0 group-hover:ring-2 group-hover:ring-amber-400 transition-all">
              {(maalem.user?.full_name || maalem.currentLiveMaalem?.full_name || 'M')[0].toUpperCase()}
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate group-hover:text-amber-600 transition-colors">
                  {maalem.user?.full_name || maalem.currentLiveMaalem?.full_name || 'Artisan Maâlem'}
                </h2>
              </div>

              {/* Note Réelle ou Statut */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                {(maalem.ratingInfo.totalReviews ?? 0) > 0 ? (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{maalem.ratingInfo.averageRating} / 5</span>
                    <span className="text-slate-400 font-normal">({maalem.ratingInfo.totalReviews})</span>
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium text-[11px]">✨ Nouveau Maâlem</span>
                )}
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 font-medium text-[11px] underline">Voir fiche</span>
              </div>
            </div>
          </button>

          {/* Switch Tactile ON / OFF : En ligne / Hors ligne */}
          <button
            type="button"
            role="switch"
            aria-checked={maalem.isMaalemOnline}
            onClick={maalem.toggleMaalemOnlineStatus}
            className={`py-2 px-3 sm:px-3.5 rounded-2xl text-xs shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center gap-2.5 shrink-0 border select-none min-h-[44px] ${
              maalem.isMaalemOnline
                ? 'bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 border-emerald-300/80 ring-1 ring-emerald-400/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title={maalem.isMaalemOnline ? 'Passer Hors ligne' : 'Passer En ligne'}
          >
            <span className="font-black text-xs">
              {maalem.isMaalemOnline ? 'En ligne' : 'Hors ligne'}
            </span>
            
            {/* Track Switch */}
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 flex items-center ${
                maalem.isMaalemOnline ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              {/* Thumb Switch */}
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                  maalem.isMaalemOnline ? 'translate-x-5' : 'translate-x-0'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    maalem.isMaalemOnline ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Ligne 2 : Portefeuille de Leads & Déblocages */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 via-amber-50/20 to-blue-50/20 border border-slate-200/90 flex items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs shrink-0">
              <Wallet className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                Solde Chantiers
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black font-mono text-slate-900 truncate">
                  {maalem.liveAvailableBalance.toFixed(2)} DH
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                  (≈ {Math.floor(maalem.liveAvailableBalance / 15)} déblocages)
                </span>
              </div>
            </div>
          </div>

          {/* Boutons d'Action Rapides */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => maalem.setRechargeModalOpen(true)}
              className="py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[40px]"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>+ Recharger</span>
            </button>

            <button
              type="button"
              onClick={() => maalem.setHistoryModalOpen(true)}
              className="py-2 px-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer min-h-[40px]"
              title="Voir le relevé de mes transactions"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden sm:inline">Relevé</span>
            </button>
          </div>
        </div>

        {/* Alerte Solde Faible (< 15 DH) — Recharge Express */}
        {maalem.liveAvailableBalance < 15 && (
          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                ⚠️
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-amber-950 truncate">
                  Solde insuffisant pour la prochaine alerte
                </p>
                <p className="text-[11px] text-amber-800 font-medium truncate">
                  Il vous reste {maalem.liveAvailableBalance.toFixed(2)} DH (minimum 15 DH requis par déblocage)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => maalem.setRechargeModalOpen(true)}
              className="py-1.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              Recharger
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. CHANTIER EN COURS (PRIORITÉ ABSOLUE SI INTERVENTION DÉBLOQUÉE ACTIVE)  */}
      {/* ========================================================================= */}
      {hasActiveMissions && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 font-mono">
              Chantier en cours d'intervention
            </h3>
          </div>
          <MaalemActiveMissionCard {...maalem} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. RADAR & CARTE GPS TEMPS RÉEL (TOUJOURS VISIBLE ET ACTIVE)            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="p-3 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 min-w-0">
            <Compass className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">
              Radar GPS : <strong>{maalem.user?.city_zone || maalem.user?.district || 'Casablanca'}</strong>
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Radar Actif</span>
          </span>
        </div>
        <InteractiveMap
          mode="MAALEM_RADAR"
          selectedLat={maalem.focusedMapCoords ? maalem.focusedMapCoords[0] : maalem.maalemPos[0]}
          selectedLng={maalem.focusedMapCoords ? maalem.focusedMapCoords[1] : maalem.maalemPos[1]}
        />
      </div>

      {/* ========================================================================= */}
      {/* 4. DEMANDES D'URGENCE SOS EN DIRECT (TOUJOURS VISIBLES SANS ONGLET)      */}
      {/* ========================================================================= */}
      <MaalemLeadsFeed {...maalem} onOpenHistory={(tab) => openProfileTab(tab || 'missions')} />

      {/* ========================================================================= */}
      {/* 5. FIDÉLITÉ & RÉPUTATION (DÉROULEMENT NATUREL EN BAS DE PAGE)            */}
      {/* ========================================================================= */}
      <div className="pt-2 space-y-4">
        {/* Programme Fidélité 4/4 (1 Lead Offert) */}
        <MaalemLoyaltyGaugeCard {...maalem} />
      </div>

      {/* ========================================================================= */}
      {/* 6. MODALES D'APPUI (RECHARGE, HISTORIQUE, INFORTUNE, PHOTOS)              */}
      {/* ========================================================================= */}
      <MaalemWalletModal {...maalem} />
      <MaalemTransactionsModal {...maalem} />
      <MaalemUnfeasibleModal {...maalem} />
      <MaalemPhotoPreviewModal {...maalem} />
    </div>
  );
};
