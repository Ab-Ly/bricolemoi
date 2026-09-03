import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Buildings, 
  MapPinLine 
} from '@phosphor-icons/react';
import { CustomDropdown } from '../../../CustomDropdown';
import { InteractiveMap } from '../../../InteractiveMap';

export const FunnelStepLocationMedia = ({
  isRtl,
  selectedCity,
  selectedDistrict,
  cityOptions,
  districtOptions,
  handleCityChange,
  handleDistrictChange,
  selectedLat,
  selectedLng,
  setSelectedLat,
  setSelectedLng,
  updateCityAndDistrictFromGPS,
  handleUseCurrentGPS,
  showMapModal,
  setShowMapModal,
  accessDetails,
  setAccessDetails,
  serviceType,
  onNext
}) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 font-sans"
    >
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900">
          {isRtl ? 'فين كاين هاد العطب بالضبط ؟' : 'Où se situe l’intervention ?'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {isRtl
            ? 'السيستيم كايحدد المعلمين اللي قراب ليك فالحومة ديالك'
            : 'Nous alertons uniquement les Maâlems disponibles dans votre secteur'}
        </p>
      </div>

      {/* Hero Bouton GPS Instantané Mobile (Zéro Saisie) */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200/90 p-4 sm:p-5 rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <MapPin weight="fill" className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
              {isRtl ? 'الموقع الجغرافي الدقيق' : 'Détection GPS automatique'}
            </h4>
            <p className="text-xs text-blue-700 font-bold truncate mt-0.5">
              📍 {selectedCity} • {selectedDistrict}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleUseCurrentGPS}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer touch-target-44"
          >
            <MapPin weight="bold" className="w-4 h-4 shrink-0" />
            <span>{isRtl ? 'حدد موقعي الحالي في الحين' : '📍 Détecter ma position GPS exacte'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowMapModal(!showMapModal)}
            className="w-full py-3 px-4 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-target-44"
          >
            <span>🗺️ {showMapModal ? (isRtl ? 'إخفاء الخريطة' : 'Masquer la carte') : (isRtl ? 'تعديل بالخريطة التفاعلية' : 'Ajuster sur carte interactive')}</span>
          </button>
        </div>
      </div>

      {/* Carte rétractable si souhaité */}
      {showMapModal && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <InteractiveMap
            mode="CLIENT_PICKER"
            selectedLat={selectedLat}
            selectedLng={selectedLng}
            onLocationSelect={(lat, lng) => {
              setSelectedLat(lat);
              setSelectedLng(lng);
              updateCityAndDistrictFromGPS(lat, lng);
            }}
            filterCategory={serviceType}
          />
        </div>
      )}

      {/* Sélecteur Ville & Quartier synchronisé */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isRtl ? 'المدينة :' : 'Ville :'}
            </label>
            <CustomDropdown
              value={selectedCity}
              onChange={handleCityChange}
              options={cityOptions}
              placeholder={isRtl ? 'اختر المدينة...' : 'Choisir une ville...'}
              icon={Buildings}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isRtl ? 'الحي / المنطقة :' : 'Quartier / Secteur :'}
            </label>
            <CustomDropdown
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={districtOptions}
              placeholder={isRtl ? 'اختر الحي...' : 'Choisir un quartier...'}
              icon={MapPinLine}
            />
          </div>
        </div>

        {/* Champ complément d'adresse */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isRtl ? 'تفاصيل إضافية للعنوان (اختياري) :' : "Complément d'adresse (Optionnel) :"}
          </label>
          <input
            type="text"
            value={accessDetails}
            onChange={(e) => setAccessDetails(e.target.value)}
            placeholder={
              isRtl
                ? 'مثال : إقامة الضحى، عمارة 4، الطبقة 3، الباب على اليمين...'
                : 'Ex: Résidence Al Andalous, Imm 4, 3ème étage, porte droite...'
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{isRtl ? 'متابعة لتأكيد الطلب' : 'Continuer vers le récapitulatif'}</span>
          {isRtl ? <ArrowLeft weight="bold" /> : <ArrowRight weight="bold" />}
        </button>
      </div>
    </motion.div>
  );
};
