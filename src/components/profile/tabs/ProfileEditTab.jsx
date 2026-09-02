import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe, MapPin, Save } from 'lucide-react';
import { MOROCCAN_CITIES, COUNTRY_DIAL_CODES } from '../../../constants/geo';
import { SpecialtySelect } from '../../SpecialtySelect';

export const ProfileEditTab = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  specialty,
  setSpecialty,
  isMaalem,
  saving,
  detectingGps,
  handleDetectGps,
  handleSaveProfile
}) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCityObj = MOROCCAN_CITIES.find(c => c.name === selectedCity) || MOROCCAN_CITIES[0];

  const handlePhoneChange = (e) => {
    let digits = String(e.target.value || '').replace(/\D/g, '');
    const dialDigits = String(selectedCountry.dial || '+212').replace(/\D/g, '');
    if (digits.startsWith(dialDigits)) {
      digits = digits.substring(dialDigits.length);
    }
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    setPhone(digits);
  };

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSaveProfile} className="space-y-3.5 font-sans">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Nom Complet :</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Votre nom complet"
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none"
          required
        />
      </div>

      {/* Téléphone Mobile avec Sélecteur d'Indicatif International */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Numéro de Téléphone :</label>
        <div className="relative">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20" ref={countryDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <img 
                src={selectedCountry.flagUrl || `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
                alt={selectedCountry.name} 
                className="w-4 h-3 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
              />
              <span>{selectedCountry.dial}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCountryOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 modal-scroll">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-500 font-bold uppercase border-b border-slate-100 mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-600" />
                  <span>Indicatif Pays / MRE</span>
                </div>
                {COUNTRY_DIAL_CODES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsCountryOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      selectedCountry.code === c.code
                        ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={c.flagUrl} 
                        alt={c.name} 
                        className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
                      />
                      <span className="truncate text-left text-xs">{c.name}</span>
                    </div>
                    <span className="font-mono text-blue-600 text-xs font-bold shrink-0">{c.dial}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="tel"
            required
            placeholder={selectedCountry.placeholder || '612345678'}
            value={phone}
            onChange={handlePhoneChange}
            className="w-full pl-28 sm:pl-32 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm font-bold focus:border-blue-600 focus:bg-white focus:outline-none transition-colors shadow-xs dir-ltr tracking-wider"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700">Ville &amp; Quartier :</label>
          <button
            type="button"
            onClick={handleDetectGps}
            disabled={detectingGps}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <MapPin className={`w-3.5 h-3.5 ${detectingGps ? 'animate-bounce text-blue-600' : 'text-blue-500'}`} />
            <span>{detectingGps ? 'Détection GPS...' : '📍 Détecter ma position'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                const city = MOROCCAN_CITIES.find(c => c.name === e.target.value);
                if (city && city.districts && city.districts[0]) {
                  const firstD = typeof city.districts[0] === 'object' ? (city.districts[0].name || 'Centre') : String(city.districts[0]);
                  setSelectedDistrict(firstD);
                }
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              {MOROCCAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              {(() => {
                const rawDistricts = (currentCityObj.districts || []).map(d => typeof d === 'object' ? (d.name || String(d)) : String(d));
                const allOptions = (selectedDistrict && !rawDistricts.includes(selectedDistrict))
                  ? [selectedDistrict, ...rawDistricts]
                  : rawDistricts;
                return allOptions.map(dName => <option key={dName} value={dName}>{dName}</option>);
              })()}
            </select>
          </div>
        </div>
      </div>

      {isMaalem && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Spécialité :</label>
          <SpecialtySelect value={specialty} onChange={setSpecialty} />
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={saving}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 mt-2"
      >
        <Save className="w-4 h-4" />
        <span>{saving ? 'Enregistrement...' : 'Enregistrer mon Profil BricoleMoi'}</span>
      </motion.button>
    </motion.form>
  );
};
