import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Phone, MapPin, Star, CreditCard, History as HistoryIcon } from 'lucide-react';

export const ProfileInfoTab = ({ user, isMaalem, balanceInfo, ratingInfo, clientInterventionsCount = 0 }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 font-sans">
      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserIcon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">Nom &amp; Prénom</span>
        </div>
        <span className="text-xs font-bold text-slate-900">{user.full_name || 'Non renseigné'}</span>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">Téléphone Mobile</span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-900 dir-ltr">
          {user.phone || <span className="text-amber-600 italic">Non renseigné</span>}
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">Ville &amp; Quartier</span>
        </div>
        <span className="text-xs font-bold text-slate-900">{user.city_zone || 'Maroc'}</span>
      </div>

      {isMaalem && (
        <>
          {/* Note & Avis Rating Card */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 block">Évaluation &amp; Avis Clients</span>
                <span className="text-[10px] text-amber-800 font-medium">
                  {ratingInfo.totalReviews > 0
                    ? `${ratingInfo.totalReviews} avis vérifié${ratingInfo.totalReviews > 1 ? 's' : ''}`
                    : 'Nouveau profil'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-amber-900 font-mono flex items-center gap-1 justify-end">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>
                  {ratingInfo.totalReviews > 0
                    ? `${ratingInfo.averageRating.toFixed(1)} / 5.0`
                    : 'Nouveau'}
                </span>
              </span>
            </div>
          </div>

          {/* Portefeuille Solde */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Solde de Crédits Leads</span>
                <span className="text-[10px] text-emerald-800 font-medium">Disponible pour débloquer des chantiers</span>
              </div>
            </div>
            <span className="text-sm font-black text-emerald-900 font-mono">
              {balanceInfo.liveAvailableBalance.toFixed(2)} DH
            </span>
          </div>
        </>
      )}

      {!isMaalem && (
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Historique Demandes</span>
              <span className="text-[10px] text-slate-500">Total de vos dépannages réalisés</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
            {clientInterventionsCount} demande{clientInterventionsCount > 1 ? 's' : ''} SOS
          </span>
        </div>
      )}
    </motion.div>
  );
};
