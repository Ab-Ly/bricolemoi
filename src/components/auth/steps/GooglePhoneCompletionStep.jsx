import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Buildings, MapPinLine } from '@phosphor-icons/react';
import { CountryCodeSelector } from '../components/CountryCodeSelector';
import { CustomDropdown } from '../../CustomDropdown';

export const GooglePhoneCompletionStep = ({
  fullName,
  handleCompleteGooglePhone,
  role,
  selectedCountry,
  setIsCountryOpen,
  phone,
  handlePhoneChange,
  isPhoneValid,
  phoneValidation,
  cityOptions,
  selectedCity,
  handleCityChange,
  districtOptions,
  selectedDistrict,
  setSelectedDistrict,
  loading,
  handleClose
}) => {
  return (
    <form onSubmit={handleCompleteGooglePhone} className="space-y-4">
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
        <p className="text-xs font-black text-blue-950 flex items-center gap-2">
          <span>🇲🇦</span>
          <span>Bienvenue {fullName || 'sur BricoleMoi'} !</span>
        </p>
        <p className="text-[11px] text-blue-800 mt-1 leading-relaxed">
          Associez votre numéro WhatsApp pour recevoir en temps réel le suivi de vos interventions
          d'urgence SOS et les devis des Maâlems.
        </p>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-700 mb-1.5 block">
          Votre numéro WhatsApp (Maroc) :
        </label>
        <div className="relative group">
          <CountryCodeSelector
            role={role}
            selectedCountry={selectedCountry}
            setIsCountryOpen={setIsCountryOpen}
          />
          <input
            id="auth-google-phone-input"
            name="tel"
            type="tel"
            autoComplete="tel"
            required
            placeholder={selectedCountry.placeholder || '06 12 34 56 78'}
            value={phone}
            onChange={handlePhoneChange}
            className="w-full pl-28 sm:pl-30 pr-10 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-2xl text-slate-900 font-mono text-base font-bold focus:outline-none dir-ltr tracking-wider transition-all duration-200"
            autoFocus
          />
          {isPhoneValid && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>

        {phoneValidation.message && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-semibold flex items-center gap-2"
          >
            <span className="text-amber-600 text-xs">⚠️</span>
            <span>{phoneValidation.message}</span>
          </motion.div>
        )}
      </div>

      {/* Ville & Quartier de l'utilisateur (auto-détecté par GPS) */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div>
          <label className="text-[11px] font-bold text-slate-700 mb-1 block">📍 Ville :</label>
          <CustomDropdown
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            icon={Buildings}
            className="w-full text-xs font-bold"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 mb-1 block">🏘️ Quartier :</label>
          <CustomDropdown
            options={districtOptions}
            value={selectedDistrict}
            onChange={setSelectedDistrict}
            icon={MapPinLine}
            className="w-full text-xs font-bold"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading || !isPhoneValid}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>{loading ? 'Enregistrement...' : 'Enregistrer & Continuer 🚀'}</span>
      </motion.button>

      <div className="text-center pt-1">
        <button
          type="button"
          onClick={handleClose}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
        >
          Passer pour le moment
        </button>
      </div>
    </form>
  );
};
