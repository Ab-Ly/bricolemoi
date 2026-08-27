import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, CheckCircle2, Award, Sparkles, ArrowRight } from 'lucide-react';

export const MaalemLoyaltyGaugeCard = ({ ratingInfo }) => {
  const loyalty = ratingInfo?.loyalty || {
    qualifyingCount: 0,
    currentCycleProgress: 0,
    targetPerReward: 4,
    totalFreeLeadsEarned: 0,
    remainingCount: 4,
    progressPercentage: 0
  };

  const currentStep = loyalty.currentCycleProgress; // 0, 1, 2, 3
  const isCycleCompleted = loyalty.progressPercentage === 100;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-blue-500/10 border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      {/* En-tête avec titre et badge cadeau */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-sans tracking-tight">
                Programme Fidélité Artisan : 5ème Lead OFFERT 🎁
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Obtenez <strong>4 avis clients (≥ 4★)</strong> et recevez automatiquement <strong>1 Lead SOS Gratuit (+15 DH)</strong>.
            </p>
          </div>
        </div>

        {/* Badge récapitulatif des primes gagnées */}
        {loyalty.totalFreeLeadsEarned > 0 && (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-black border border-emerald-300 shadow-2xs shrink-0 self-start sm:self-auto flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>{loyalty.totalFreeLeadsEarned} Lead{loyalty.totalFreeLeadsEarned > 1 ? 's' : ''} Gagné{loyalty.totalFreeLeadsEarned > 1 ? 's' : ''} (+{loyalty.totalFreeLeadsEarned * 15} DH)</span>
          </span>
        )}
      </div>

      {/* Jauge Visuelle des 4 Étapes */}
      <div className="bg-white/90 backdrop-blur-xs border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Cycle en cours : <strong>{currentStep} / 4 avis validés</strong></span>
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-mono">
            {loyalty.remainingCount > 0
              ? `Encore ${loyalty.remainingCount} avis pour le cadeau !`
              : '🎉 Objectif atteint ! +15 DH crédités'}
          </span>
        </div>

        {/* Barre de progression fluide */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loyalty.progressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-500 rounded-full shadow-xs"
          />
        </div>

        {/* 4 Paliers Visuels (1, 2, 3, 4 -> 🎁 CADEAU) */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[1, 2, 3, 4].map((stepNum) => {
            const isDone = currentStep >= stepNum;
            const isCurrent = currentStep + 1 === stepNum;

            return (
              <div
                key={stepNum}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : isCurrent
                    ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/30 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Star
                      className={`w-4 h-4 ${
                        isCurrent
                          ? 'fill-amber-400 text-amber-500 animate-pulse'
                          : 'text-slate-300'
                      }`}
                    />
                  )}
                </div>
                <div className="text-[11px] font-black font-mono">
                  {stepNum === 4 ? '4/4' : `${stepNum}/4`}
                </div>
                <div className="text-[9px] font-bold mt-0.5 truncate">
                  {stepNum === 4 ? '🎁 Lead Gratuit' : `Avis ${stepNum} (≥4★)`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conseil pratique pour inciter le Maâlem */}
      <div className="flex items-start gap-2.5 text-xs text-amber-950 bg-amber-100/60 p-3 rounded-2xl border border-amber-200/80 leading-relaxed">
        <span className="text-base shrink-0">💡</span>
        <p>
          <strong>Conseil Pro :</strong> N'attendez pas ! Demandez chaleureusement au client de valider et noter votre intervention sur son téléphone (≥ 4★) <strong>directement sur place avant de clôturer</strong>.
        </p>
      </div>
    </div>
  );
};
