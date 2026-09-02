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

      {/* Bouton GPS Instantané Mobile */}
      <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <MapPin weight="fill" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">
              {isRtl ? 'الموقع الجغرافي الدقيق' : 'Position GPS en temps réel'}
            </h4>
            <p className="text-[11px] text-slate-600 font-medium">
              {selectedCity} • {selectedDistrict}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleUseCurrentGPS}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MapPin weight="bold" />
            <span>{isRtl ? 'حدد موقعي تلقائياً' : 'Détecter ma position'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowMapModal(!showMapModal)}
            className="px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            {showMapModal ? (isRtl ? 'إخفاء الخريطة' : 'Masquer carte') : (isRtl ? 'تعديل بالخريطة' : 'Ajuster sur carte')}
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
