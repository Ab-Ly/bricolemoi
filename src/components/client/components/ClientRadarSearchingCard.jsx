import React from 'react';
import { motion } from 'framer-motion';
import { Radio, X, MapPin } from 'lucide-react';
import { InteractiveMap } from '../../InteractiveMap';
import { getServiceDisplay } from '../hooks/useClientViewState';

export const ClientRadarSearchingCard = ({
  activePendingSOS,
  serviceType,
  selectedCity,
  selectedDistrict,
  onlineMaalemsCount,
  flowCancelSOS,
  cancelIntervention,
  selectedLat,
  selectedLng
}) => {
  if (!activePendingSOS) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-2 border-blue-500/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden text-slate-900"
    >
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-pulse" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Radio className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 animate-ping opacity-25 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                Diffusion Live en Cours
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recherche de votre Artisan Maâlem
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xs shadow-xs">
            {getServiceDisplay(activePendingSOS.service_type || serviceType).label}
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs">
            {activePendingSOS.district || `${selectedCity} - ${selectedDistrict}`}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            📡
          </div>
          <div>
            <p className="text-xs font-black text-slate-900">Alerte transmise aux artisans disponibles</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {onlineMaalemsCount > 0
                ? `${onlineMaalemsCount} artisan${onlineMaalemsCount > 1 ? 's' : ''} en ligne dans votre secteur`
                : 'Diffusion radar active sur tout votre secteur'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Voulez-vous vraiment annuler votre demande de dépannage ?')) {
              flowCancelSOS();
              if (activePendingSOS.id && activePendingSOS.id !== 'pending-sos') {
                cancelIntervention(activePendingSOS.id);
              }
            }
          }}
          className="px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 self-stretch sm:self-auto shrink-0"
        >
          <X className="w-3.5 h-3.5" />
          <span>Annuler la recherche</span>
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Position géolocalisée de votre demande</span>
          </span>
          <span className="text-[11px] text-blue-600 font-mono font-bold">Radar Live</span>
        </label>
        <InteractiveMap
          mode="CLIENT_PICKER"
          selectedLat={parseFloat(activePendingSOS.lat || selectedLat)}
          selectedLng={parseFloat(activePendingSOS.lng || selectedLng)}
          filterCategory={activePendingSOS.service_type || serviceType}
        />
      </div>
    </motion.div>
  );
};
