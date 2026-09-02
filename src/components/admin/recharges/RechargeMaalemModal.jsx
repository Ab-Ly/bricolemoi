import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { getSpecialtyLabel } from '../../EnhancedCategoryIcon';
import { calculateMaalemBalance } from '../../../utils/balanceUtils';

export const RechargeMaalemModal = ({
  selectedMaalemProfile,
  onClose,
  transactions,
  maalems
}) => {
  if (!selectedMaalemProfile) return null;

  const cleanPhone = (p) => (p || '').replace(/\D/g, '');
  const phoneDigits = cleanPhone(selectedMaalemProfile.phone);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 1 }}
          className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-lg flex items-center justify-center shadow-xs">
                {selectedMaalemProfile.full_name ? selectedMaalemProfile.full_name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedMaalemProfile.full_name}</h3>
                <p className="text-xs text-purple-700 font-mono font-bold">
                  Spécialité : {getSpecialtyLabel(selectedMaalemProfile.specialty)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Détails Portefeuille & Contact */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Solde Actuel :</span>
              <p className="text-lg font-black text-emerald-800 font-mono">
                {calculateMaalemBalance(selectedMaalemProfile, transactions, maalems).liveAvailableBalance.toFixed(2)} DH
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Note Moyenne :</span>
              <p className="text-lg font-black text-amber-800 font-mono flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>
                  {(selectedMaalemProfile.rating_avg !== undefined && selectedMaalemProfile.rating_avg !== null
                    ? Number(selectedMaalemProfile.rating_avg)
                    : 5.0
                  ).toFixed(1)}{' '}
                  / 5.0
                </span>
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Téléphone :</span>
              <p className="font-bold text-slate-900 font-mono">{selectedMaalemProfile.phone || 'Non renseigné'}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Ville / Quartier :</span>
              <p className="font-bold text-slate-900">{selectedMaalemProfile.district || selectedMaalemProfile.city_zone || 'Casablanca'}</p>
            </div>
          </div>

          {/* Actions Rapides */}
          <div className="pt-2 flex items-center gap-3">
            {phoneDigits.length >= 9 && (
              <a
                href={`https://wa.me/212${phoneDigits.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-600" />
                <span>Discuter sur WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
