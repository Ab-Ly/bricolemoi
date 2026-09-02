import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Star, 
  Coins, 
  Gift, 
  UserCheck, 
  Ban, 
  Eye 
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyMeta } from '../../EnhancedCategoryIcon';

export const AdminMaalemCard = ({
  maalem,
  isOnline,
  isSuspended,
  creditBalance,
  ratingInfo,
  onSelectMaalem,
  onQuickCredit,
  onToggleSuspension
}) => {
  const m = maalem;
  const pClean = (m.phone || '').replace(/\D/g, '');

  return (
    <motion.div
      layout
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
            onClick={() => onSelectMaalem(m)}
            className="font-black text-slate-900 text-sm truncate cursor-pointer hover:text-emerald-700 transition-colors"
          >
            {m.full_name || 'Artisan Maâlem'}
          </h3>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{m.district || m.city_zone || 'Casablanca'}</span>
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="flex items-center text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shadow-xs">
              <Star className={`w-3 h-3 mr-1 ${ratingInfo.totalReviews > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
              <span>{ratingInfo.totalReviews > 0 ? ratingInfo.averageRating.toFixed(1) : '-'}</span>
              {ratingInfo.totalReviews > 0 && (
                <span className="ml-1 text-[9px] text-amber-600">({ratingInfo.totalReviews})</span>
              )}
            </span>
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
            <p className={`font-mono font-black text-sm ${creditBalance >= 15 ? 'text-emerald-700' : 'text-rose-600 animate-pulse'}`}>
              {creditBalance.toFixed(2)} DH
            </p>
          </div>

          {/* Bouton Fiche Maâlem */}
          <button
            type="button"
            onClick={() => onSelectMaalem(m)}
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
          <button
            type="button"
            onClick={() => onQuickCredit && onQuickCredit(m.id, 15)}
            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
            title="Offrir 1 crédit de lead (15 DH)"
          >
            <Gift className="w-3 h-3" />
            <span>+15 DH</span>
          </button>

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
          {pClean.length >= 9 && (
            <a
              href={`https://wa.me/212${pClean.replace(/^0/, '')}?text=${encodeURIComponent(
                `Salam ${m.full_name || 'Si Maâlem'}, votre solde BricoleMoi est de ${creditBalance.toFixed(2)} DH. Rechargez votre compte pour continuer à recevoir les urgences SOS.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center justify-center shadow-xs"
              title="Relance WhatsApp"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" />
            </a>
          )}

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
};
