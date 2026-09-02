import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const ProfilePinTab = ({
  newPin,
  setNewPin,
  confirmPin,
  setConfirmPin,
  updatingPin,
  handleUpdatePin
}) => {
  return (
    <motion.form 
      initial={{ opacity: 0, y: 5 }} 
      animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleUpdatePin}
      className="space-y-4 font-sans"
    >
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
          <Lock className="w-4 h-4 text-amber-600" />
          <span>Code PIN Secret de Connexion (4 chiffres)</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Ce code personnel à 4 chiffres vous permet de vous connecter instantanément en 1 seconde sans attendre de SMS.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Nouveau Code PIN (4 chiffres)
          </label>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="••••"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-2xl font-mono tracking-widest py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none transition-all shadow-xs"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Confirmer le Nouveau Code PIN
          </label>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="••••"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-2xl font-mono tracking-widest py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none transition-all shadow-xs"
            required
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        type="submit"
        disabled={updatingPin || newPin.length !== 4 || confirmPin.length !== 4}
        className="w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 transition-all"
      >
        <Lock className="w-4 h-4 text-amber-400" />
        <span>{updatingPin ? 'Mise à jour...' : 'Valider mon Nouveau Code PIN'}</span>
      </motion.button>
    </motion.form>
  );
};
