import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const SetPinStep = ({
  authMode,
  newPin,
  newPinRefs,
  handleNewPinChange,
  handleNewPinKeyDown,
  handleFinalizePin,
  loading,
  isClient
}) => {
  return (
    <form onSubmit={handleFinalizePin} className="space-y-4">
      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl">
        <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>
            {authMode === 'FORGOT_PIN'
              ? 'Nouveau Code PIN Secret'
              : 'Créez votre Code PIN Secret'}
          </span>
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Ce code secret à 4 chiffres vous permettra d'accéder à votre compte en 1 seconde sur tous
          vos appareils.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 py-1">
        {newPin.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (newPinRefs.current[idx] = el)}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleNewPinChange(idx, e.target.value)}
            onKeyDown={(e) => handleNewPinKeyDown(idx, e)}
            autoFocus={idx === 0}
            className={`h-14 text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
              digit
                ? isClient
                  ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                  : 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
            } ${
              isClient
                ? 'focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                : 'focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading || newPin.some((d) => d === '')}
        className={`w-full py-3.5 font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isClient
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? 'Finalisation...' : "C'est parti ! Accéder à BricoleMoi 🚀"}</span>
      </motion.button>
    </form>
  );
};
