import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Compass } from 'lucide-react';
import { ChatCenteredText, Buildings, MapPinLine } from '@phosphor-icons/react';
import { SpecialtySelect } from '../../SpecialtySelect';
import { CustomDropdown } from '../../CustomDropdown';

export const NewUserRegistrationStep = ({
  isClient,
  getFullInternationalNumber,
  setStep,
  setErrorBanner,
  specialty,
  setSpecialty,
  fullName,
  setFullName,
  cityOptions,
  districtOptions,
  selectedCity,
  selectedDistrict,
  handleCityChange,
  setSelectedDistrict,
  handleDetectGPS,
  detectingGps,
  gpsErrorMsg,
  handleProceedSignUp,
  loading,
  selectedCountry,
  setAuthMode
}) => {
  return (
    <form onSubmit={handleProceedSignUp} className="space-y-3.5">
      {/* Rappel du Numéro */}
      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span className="font-mono font-bold text-slate-900">{getFullInternationalNumber()}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setErrorBanner('');
          }}
          className="text-[11px] text-blue-600 hover:underline font-bold cursor-pointer"
        >
          Modifier
        </button>
      </div>

      {/* Spécialité pour Maâlem */}
      {!isClient && (
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1 block">
            Votre Métier / Spécialité :
          </label>
          <SpecialtySelect value={specialty} onChange={setSpecialty} />
        </div>
      )}

      {/* Nom */}
      <div>
        <label className="text-xs font-bold text-slate-700 mb-1 block">
          {isClient ? 'Votre Prénom et Nom :' : "Nom de l'artisan ou de l'atelier :"}
        </label>
        <input
          type="text"
          required
          placeholder={isClient ? 'Ex: Karim Benjelloun' : 'Ex: Plomberie Express'}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-bold focus:outline-none transition-all ${
            isClient
              ? 'focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100'
              : 'focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100'
          }`}
          autoFocus
        />
      </div>

      {/* Ville & Quartier */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 block">Votre Ville & Zone :</label>
        <div className="grid grid-cols-2 gap-2">
          <CustomDropdown
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Ville..."
            icon={Buildings}
          />
          <CustomDropdown
            options={districtOptions}
            value={selectedDistrict}
            onChange={(newDistrict) => setSelectedDistrict(newDistrict)}
            placeholder="Zone..."
            icon={MapPinLine}
          />
        </div>
      </div>

      {/* Bouton GPS Radar */}
      <button
        type="button"
        onClick={handleDetectGPS}
        disabled={detectingGps}
        className={`w-full py-2.5 bg-slate-50 hover:bg-slate-100 border rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
          gpsErrorMsg
            ? 'border-amber-300 text-amber-800'
            : 'border-slate-200 text-slate-700 hover:text-blue-600'
        }`}
      >
        <Compass
          className={`w-4 h-4 ${gpsErrorMsg ? 'text-amber-600' : 'text-blue-600'} ${
            detectingGps ? 'animate-spin' : ''
          }`}
        />
        <span>
          {detectingGps
            ? 'Localisation GPS en cours...'
            : gpsErrorMsg
            ? gpsErrorMsg
            : '📍 Détecter ma ville par GPS'}
        </span>
      </button>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading || !fullName.trim()}
        className={`w-full py-3.5 font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 ${
          isClient
            ? selectedCountry.dial === '+212'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChatCenteredText weight="duotone" className="w-4 h-4" />
        <span>
          {loading
            ? 'Envoi du code...'
            : selectedCountry.dial === '+212'
            ? 'Recevoir mon code par WhatsApp →'
            : "Recevoir mon Code SMS d'activation →"}
        </span>
      </motion.button>

      {/* Lien de bascule vers connexion PIN si le compte existe déjà */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Vous avez déjà un compte ?{' '}
          <button
            type="button"
            onClick={() => {
              setAuthMode('SIGN_IN');
              setStep('EXISTING_USER');
              setErrorBanner('');
            }}
            className={`font-black underline transition-colors cursor-pointer ${
              isClient ? 'text-blue-600 hover:text-blue-700' : 'text-amber-600 hover:text-amber-700'
            }`}
          >
            Se connecter avec mon Code PIN
          </button>
        </p>
      </div>
    </form>
  );
};
