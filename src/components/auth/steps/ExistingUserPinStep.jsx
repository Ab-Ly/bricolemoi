import React from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn, MessageSquare } from 'lucide-react';

export const ExistingUserPinStep = ({
  isClient,
  existingUser,
  getFullInternationalNumber,
  setStep,
  setErrorBanner,
  loginPin,
  loginPinRefs,
  handleLoginPinChange,
  handleLoginPinKeyDown,
  handleDirectLogin,
  handleSendLoginOtp,
  loading,
  selectedCountry
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDirectLogin();
      }}
      className="space-y-4"
    >
      {/* Carte profil utilisateur chaleureuse */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center justify-between ${
          isClient ? 'bg-blue-50/80 border-blue-200' : 'bg-amber-50/80 border-amber-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-xs ${
              isClient ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {existingUser?.fullName ? existingUser.fullName.charAt(0).toUpperCase() : '👤'}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-tight">
              {existingUser?.fullName ? `Bonjour ${existingUser.fullName} 👋` : 'Bonjour ! 👋'}
            </p>
            <p className="text-xs text-slate-600 font-mono mt-0.5 flex items-center gap-1.5">
              <span>{getFullInternationalNumber()}</span>
              {existingUser?.cityZone && (
                <span className="text-slate-600 font-sans text-[10px] font-bold">
                  📍 {existingUser.cityZone}
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            setErrorBanner('');
          }}
          className="text-xs text-blue-600 hover:text-blue-700 underline font-bold cursor-pointer"
        >
          Modifier
        </button>
      </div>

      {/* Saisie Sécurisée Code PIN 4 chiffres */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          <span>Entrez votre Code PIN secret (4 chiffres) :</span>
        </label>

        <div className="grid grid-cols-4 gap-3 py-1">
          {loginPin.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (loginPinRefs.current[idx] = el)}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleLoginPinChange(idx, e.target.value)}
              onKeyDown={(e) => handleLoginPinKeyDown(idx, e)}
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
      </div>

      {/* Bouton de Connexion */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading || loginPin.some((d) => d === '')}
        className={`w-full py-3.5 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isClient
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <LogIn className="w-4 h-4" />
        <span>{loading ? 'Connexion en cours...' : 'Se Connecter'}</span>
      </motion.button>

      {/* Option de secours WhatsApp / SMS */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={handleSendLoginOtp}
          disabled={loading}
          className={`text-xs underline font-bold flex items-center justify-center gap-1.5 mx-auto cursor-pointer ${
            selectedCountry.dial === '+212'
              ? 'text-emerald-700 hover:text-emerald-800'
              : 'text-amber-700 hover:text-amber-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>
            {selectedCountry.dial === '+212'
              ? 'PIN oublié ? Se connecter par Code WhatsApp'
              : 'PIN oublié ? Se connecter par Code SMS'}
          </span>
        </button>
      </div>
    </form>
  );
};
