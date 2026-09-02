import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Star, ShieldCheck } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { formatDateTime } from '../../../utils/dateUtils';

export const ProfileInterventionsTab = ({
  interventions = [],
  isMaalem = false,
  clientPhoneMap = new Map()
}) => {
  const completedCount = interventions.filter(i => i.status === 'COMPLETED').length;
  const activeCount = interventions.filter(i => ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status)).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 font-sans">
      {/* Statistiques Rapides */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
          <div className="text-lg font-black text-blue-600 font-mono">{interventions.length}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">
            {isMaalem ? 'Chantiers' : 'SOS Totaux'}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
          <div className="text-lg font-black text-emerald-600 font-mono">{completedCount}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Clôturés</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
          <div className="text-lg font-black text-amber-600 font-mono">{activeCount}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">En Cours</div>
        </div>
      </div>

      {/* Liste des Chantiers / Demandes */}
      <div className="space-y-2 max-h-72 overflow-y-auto modal-scroll pr-1">
        {interventions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 space-y-1">
            <p className="text-xs font-bold">
              {isMaalem ? 'Aucun chantier débloqué pour le moment.' : 'Aucune demande SOS trouvée.'}
            </p>
            <p className="text-[11px] text-slate-400">
              {isMaalem 
                ? 'Vos interventions acceptées apparaîtront ici avec les coordonnées clients.' 
                : 'Vos demandes de dépannage apparaîtront ici.'}
            </p>
          </div>
        ) : (
          interventions.map((item) => {
            const counterpartPhone = isMaalem 
              ? (item.client_phone || clientPhoneMap.get(String(item.client_id || '').trim()) || '')
              : item.maalem_phone;
            const counterpartPhoneClean = (counterpartPhone || '').replace(/\D/g, '');

            return (
              <div key={item.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {item.subcategory || item.service_type || 'Dépannage d\'urgence'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                    item.status === 'COMPLETED'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : item.status === 'CANCELLED'
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
                  }`}>
                    {item.status === 'COMPLETED' ? '✅ Clôturé' : item.status === 'CANCELLED' ? '❌ Annulé' : '🛠️ En cours'}
                  </span>
                </div>

                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 truncate">
                    <span className="font-bold text-slate-900">
                      {isMaalem ? `👤 ${item.client_name || 'Client'}` : `🛠️ ${item.maalem_name || 'Artisan Maâlem'}`}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">📍 {item.district || 'Casablanca'}</span>
                  </div>

                  {counterpartPhone && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={`tel:${counterpartPhone}`} className="font-mono text-blue-700 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{counterpartPhone}</span>
                      </a>
                      {counterpartPhoneClean.length >= 9 && (
                        <a
                          href={`https://wa.me/212${counterpartPhoneClean.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 p-0.5"
                        >
                          <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>Tarif : <strong className="text-slate-900">{item.final_agreed_price ? `${item.final_agreed_price} DH` : '🤝 Accord Direct'}</strong></span>
                  <span>{formatDateTime(item.created_at || Date.now(), 'long')}</span>
                </div>

                {item.rating && (
                  <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-amber-800 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{isMaalem ? 'Évaluation reçue :' : 'Votre note :'}</span>
                    </span>
                    <span className="font-mono font-black text-amber-900">{Number(item.rating).toFixed(1)} / 5 ★</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {!isMaalem && (
        <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-2xl flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Garantie BricoleMoi</p>
            <p className="text-[11px] text-slate-600">Vos demandes et chantiers sont protégés et archivés en toute sécurité.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
