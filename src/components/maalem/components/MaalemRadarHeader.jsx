import React from 'react';
import { motion } from 'framer-motion';
import { Power, Radio, Star, Wallet, PlusCircle, ShieldCheck, Award } from 'lucide-react';
import { Coins, Bank, ClockCounterClockwise } from '@phosphor-icons/react';
import { PushNotificationBanner } from '../PushNotificationBanner';

export const MaalemRadarHeader = ({
  isMaalemOnline,
  toggleMaalemOnlineStatus,
  user,
  currentLiveMaalem,
  ratingInfo,
  isCinVerified,
  onOpenCINVerification,
  liveAvailableBalance,
  totalReservedEscrow,
  totalBonusSum,
  setRechargeModalOpen,
  setHistoryModalOpen,
  pendingMyRechargesCount
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Bandeau Statut En Ligne & Radar SOS */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isMaalemOnline
            ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs shrink-0 ${
              isMaalemOnline ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
            }`}
          >
            {isMaalemOnline ? <Radio className="w-6 h-6 animate-pulse" /> : <Power className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isMaalemOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
                }`}
              />
              <span className="text-xs font-black uppercase tracking-wider font-mono">
                {isMaalemOnline ? 'Mode Radar Actif (En Ligne)' : 'Mode Pause (Hors Ligne)'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {isMaalemOnline
                ? 'Vous recevez les alertes SOS en temps réel'
                : 'Passez en ligne pour recevoir des chantiers'}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMaalemOnlineStatus}
          className={`py-2.5 px-5 rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
            isMaalemOnline
              ? 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isMaalemOnline ? 'Se mettre en Pause' : 'Passer En Ligne 🟢'}</span>
        </button>
      </div>

      {/* 2. Profil Rapide, Note & Badges de Confiance */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
              {(user?.full_name || currentLiveMaalem?.full_name || 'M')[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black text-slate-900">
                  {user?.full_name || currentLiveMaalem?.full_name || 'Artisan Maâlem'}
                </h3>
                {isCinVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Artisan Vérifié</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenCINVerification}
                    className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold hover:bg-amber-100 cursor-pointer"
                  >
                    ⚡ Vérifier ma CIN (+ Badge Pro)
                  </button>
                )}
              </div>

              {/* Note et avis réels */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="inline-flex items-center gap-1 text-amber-600 font-black whitespace-nowrap">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{ratingInfo.averageRating} / 5</span>
                </span>
                <span>•</span>
                <span className="whitespace-nowrap font-medium">
                  {(ratingInfo.totalReviews ?? ratingInfo.reviewsCount ?? 0)} avis {(ratingInfo.totalReviews ?? ratingInfo.reviewsCount ?? 0) <= 1 ? 'client' : 'clients'}
                </span>
                {ratingInfo.loyalty?.qualifyingCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 inline-flex items-center gap-1 whitespace-nowrap text-[11px]">
                      <Award className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{ratingInfo.loyalty.currentCycleProgress}/4 pour 1 Lead SOS Offert</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Portefeuille & Solde Disponible (Grid responsive mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
          <div className="sm:col-span-1 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Solde Disponible
            </span>
            <div className="flex items-baseline gap-2 flex-wrap mt-0.5">
              <span className="text-lg font-black font-mono text-slate-900 whitespace-nowrap">
                {liveAvailableBalance.toFixed(2)} DH
              </span>
            </div>
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRechargeModalOpen(true)}
              className="py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl shadow-sm font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Recharger</span>
            </button>

            <button
              type="button"
              onClick={() => setHistoryModalOpen(true)}
              className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl shadow-xs font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer relative"
            >
              <ClockCounterClockwise className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Historique</span>
              {pendingMyRechargesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {pendingMyRechargesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Push Notification Banner */}
      <PushNotificationBanner />
    </div>
  );
};
