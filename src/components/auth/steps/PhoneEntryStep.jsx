import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Coins } from '@phosphor-icons/react';
import { CountryCodeSelector } from '../components/CountryCodeSelector';
import { RememberedAccountCard } from '../components/RememberedAccountCard';

export const PhoneEntryStep = ({
  isClient,
  role,
  rememberedUser,
  handleQuickLoginWithRemembered,
  loading,
  handleGoogleSignIn,
  handlePhoneSubmit,
  selectedCountry,
  setIsCountryOpen,
  phone,
  handlePhoneChange,
  isPhoneValid,
  phoneValidation
}) => {
  return (
    <div className="space-y-4">
      {/* Carte de Reconnexion Rapide 1-Clic si profil mémorisé */}
      <RememberedAccountCard
        rememberedUser={rememberedUser}
        handleQuickLoginWithRemembered={handleQuickLoginWithRemembered}
        loading={loading}
      />

      {/* 1-Clic Google (Client) */}
      {isClient && (
        <>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-slate-100">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-slate-800">Continuer avec Google</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-emerald-600" />
              1-Clic
            </span>
          </motion.button>

          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              ou avec votre numéro
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>
        </>
      )}

      {/* Bandeau Bonus Pro pour Maâlem */}
      {!isClient && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Coins weight="duotone" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black text-amber-900">
              🎁 +15.00 DH offerts aux artisans
            </p>
            <p className="text-[10px] text-amber-800 mt-0.5">
              Crédités dès validation pour débloquer vos premières demandes de clients.
            </p>
          </div>
        </div>
      )}

      {/* Formulaire de Numéro Unique */}
      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 block">
            Entrez votre numéro de téléphone :
          </label>

          <div className="relative group">
            <CountryCodeSelector
              role={role}
              selectedCountry={selectedCountry}
              setIsCountryOpen={setIsCountryOpen}
            />

            <input
              id="auth-phone-input"
              name="tel"
              type="tel"
              autoComplete="tel"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="tel"
              required
              placeholder={selectedCountry.placeholder || '06 12 34 56 78'}
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full pl-28 sm:pl-30 pr-10 py-3.5 bg-slate-50 border rounded-2xl text-slate-900 font-mono text-base font-bold focus:outline-none dir-ltr tracking-wider transition-all duration-200 ${
                isClient
                  ? 'border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100'
                  : 'border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100'
              }`}
              autoFocus
            />

            {/* Indicateur de validation en temps réel */}
            {isPhoneValid && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Alerte explicative immédiate si numéro fixe ou non mobile */}
          {phoneValidation.message && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-semibold flex items-center gap-2 shadow-2xs"
            >
              <span className="text-amber-600 text-xs">⚠️</span>
              <span>{phoneValidation.message}</span>
            </motion.div>
          )}
        </div>

        {/* Gros Bouton Continuer */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading || !isPhoneValid}
          className={`w-full py-3.5 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isClient
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span>{loading ? 'Vérification...' : 'Continuer →'}</span>
        </motion.button>
      </form>

      {/* Réassurance */}
      <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Connexion 100% sécurisée & gratuite</span>
      </div>
    </div>
  );
};
