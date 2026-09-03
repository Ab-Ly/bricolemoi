import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Wallet, 
  Wrench, 
  Lock, 
  Edit3, 
  ChevronRight, 
  History as HistoryIcon
} from 'lucide-react';

export const ProfileInfoTab = ({ 
  user, 
  isMaalem, 
  balanceInfo, 
  ratingInfo, 
  missionsCount = 0,
  clientInterventionsCount = 0,
  onNavigate 
}) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 font-sans">
      
      {/* 1. CARTES KPI TACTILES (Style Uber Driver / Careem) */}
      {isMaalem ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {/* Solde Leads */}
          <button
            type="button"
            onClick={() => onNavigate?.('transactions')}
            className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200/90 text-left transition-all active:scale-95 cursor-pointer group shadow-2xs"
            title="Consulter mon solde et recharger"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800">Solde</span>
              <Wallet className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-emerald-950 truncate">
              {balanceInfo.liveAvailableBalance.toFixed(0)} <span className="text-[10px] font-sans font-bold">DH</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-emerald-700 font-medium block truncate mt-0.5">
              ≈ {Math.floor(balanceInfo.liveAvailableBalance / 15)} déblocages
            </span>
          </button>

          {/* Chantiers */}
          <button
            type="button"
            onClick={() => onNavigate?.('missions')}
            className="p-2.5 sm:p-3 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/90 text-left transition-all active:scale-95 cursor-pointer group shadow-2xs"
            title="Consulter mes chantiers"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800">Chantiers</span>
              <Wrench className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-amber-950 truncate">
              {missionsCount}
            </div>
            <span className="text-[9px] sm:text-[10px] text-amber-700 font-medium block truncate mt-0.5">
              {missionsCount <= 1 ? 'Chantier réalisé' : 'Chantiers réalisés'}
            </span>
          </button>

          {/* Note & Avis */}
          <button
            type="button"
            onClick={() => onNavigate?.('reviews')}
            className="p-2.5 sm:p-3 rounded-2xl bg-yellow-50/80 hover:bg-yellow-100/90 border border-yellow-200/90 text-left transition-all active:scale-95 cursor-pointer group shadow-2xs"
            title="Consulter mes avis clients"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-yellow-800">Avis</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-amber-950 truncate flex items-center gap-0.5">
              <span>{ratingInfo.totalReviews > 0 ? ratingInfo.averageRating.toFixed(1) : '—'}</span>
              <span className="text-[11px] text-amber-600 font-bold">★</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-yellow-800 font-medium block truncate mt-0.5">
              {ratingInfo.totalReviews > 0 ? `${ratingInfo.totalReviews} avis vérifié${ratingInfo.totalReviews > 1 ? 's' : ''}` : 'Nouveau profil'}
            </span>
          </button>
        </div>
      ) : (
        /* Pour le client particulier */
        <button
          type="button"
          onClick={() => onNavigate?.('requests')}
          className="w-full p-3.5 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-slate-900 block">Mes Dépannages SOS</span>
              <span className="text-[11px] text-slate-500 font-medium">Historique complet de vos demandes d'artisans</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-blue-700 bg-white border border-blue-200 px-2.5 py-1 rounded-full font-mono">
              {clientInterventionsCount} demande{clientInterventionsCount > 1 ? 's' : ''}
            </span>
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </div>
        </button>
      )}

      {/* 2. GRANDES LIGNES MENU TACTILE (STYLE GRANDES STARTUPS) */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono px-1 block">
          Menu &amp; Gestion du Compte
        </span>

        {isMaalem && (
          <>
            {/* Ligne 1 : Chantiers */}
            <button
              type="button"
              onClick={() => onNavigate?.('missions')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    Mes Chantiers Réalisés
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Historique, adresses et contacts des clients
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
                  {missionsCount} chantier{missionsCount > 1 ? 's' : ''}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>

            {/* Ligne 2 : Avis */}
            <button
              type="button"
              onClick={() => onNavigate?.('reviews')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    Avis &amp; Évaluations Clients
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Notes 1-5★ et commentaires reçus
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
                  {ratingInfo.totalReviews > 0 ? `${ratingInfo.averageRating.toFixed(1)} ★` : 'Nouveau'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>

            {/* Ligne 3 : Portefeuille */}
            <button
              type="button"
              onClick={() => onNavigate?.('transactions')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    Portefeuille &amp; Déblocages
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Recharger mon solde et voir l'historique
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                  {balanceInfo.liveAvailableBalance.toFixed(0)} DH
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>
          </>
        )}

        {/* Ligne 4 : Modifier coordonnées */}
        <button
          type="button"
          onClick={() => onNavigate?.('edit')}
          className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Edit3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                Mes Coordonnées &amp; Quartier
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {user.phone ? user.phone : 'Numéro de téléphone requis'} • {user.city_zone || 'Ville & Secteur'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Modifier
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </button>

        {/* Ligne 5 : Code PIN & Sécurité */}
        <button
          type="button"
          onClick={() => onNavigate?.('pin')}
          className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                Code PIN &amp; Sécurité
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Protéger mon compte avec un code à 4 chiffres
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </button>
      </div>
    </motion.div>
  );
};
