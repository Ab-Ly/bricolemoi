import React from 'react';
import { motion } from 'framer-motion';
import {
  Siren,
  MapPin,
  CheckCircle2,
  Camera,
  X,
  Upload,
  Zap,
  ChevronRight
} from 'lucide-react';
import {
  Lightning,
  CalendarCheck,
  Buildings,
  MapPinLine,
  ShieldCheck
} from '@phosphor-icons/react';
import { CategorySelector } from '../../CategorySelector';
import { CustomDropdown } from '../../CustomDropdown';
import { InteractiveMap } from '../../InteractiveMap';
import { VoiceRecorder } from '../../VoiceRecorder';

export const ClientSosForm = ({
  activeOngoingSOS,
  showNewSOSForm,
  setShowNewSOSForm,
  serviceType,
  setServiceType,
  selectedSubcategory,
  setSelectedSubcategory,
  urgencyLevel,
  setUrgencyLevel,
  selectedLat,
  selectedLng,
  setSelectedLat,
  setSelectedLng,
  updateCityAndDistrictFromGPS,
  selectedCity,
  selectedDistrict,
  cityOptions,
  districtOptions,
  handleCityChange,
  handleDistrictChange,
  audioUrl,
  setAudioUrl,
  photos,
  photoUrl,
  setPhotoUrl,
  removePhoto,
  showUrlInput,
  setShowUrlInput,
  handleFileUpload,
  accessDetails,
  setAccessDetails,
  onlineMaalemsCount,
  submitting,
  handleSOSSubmit,
  user,
  t
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden text-slate-900"
    >
      {activeOngoingSOS && showNewSOSForm && (
        <div className="mb-6 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-blue-900 font-medium">
          <span>
            🚗 Une intervention est en cours avec votre Maâlem (
            {activeOngoingSOS.subcategory || 'Dépannage'}).
          </span>
          <button
            type="button"
            onClick={() => setShowNewSOSForm(false)}
            className="font-bold underline text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Retourner au suivi en direct →
          </button>
        </div>
      )}

      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Lightning weight="fill" className="w-3.5 h-3.5 text-blue-600" />
          <span>Dépannage d'Urgence Express 24h/7j • Maroc</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
          Sélectionnez votre Service
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
          Artisans Maâlems qualifiés et vérifiés à proximité immédiate
        </p>
      </div>

      {/* Category & Subcategory Selector */}
      <div className="mb-8">
        <CategorySelector
          selectedCategory={serviceType}
          selectedSubcategory={selectedSubcategory}
          onSelectCategory={(catSlug) => setServiceType(catSlug)}
          onSelectSubcategory={(subName) => setSelectedSubcategory(subName)}
        />
      </div>

      {/* Formulaire Express */}
      <form onSubmit={handleSOSSubmit} className="space-y-6 pt-4 border-t border-slate-200">
        {/* Sélecteur de Niveau d'Urgence */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Siren className="w-4 h-4 text-blue-600" />
              <span>Délai d'intervention souhaité :</span>
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setUrgencyLevel('IMMEDIATE')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs cursor-pointer ${
                urgencyLevel === 'IMMEDIATE'
                  ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Lightning weight="fill" className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-slate-900">🚨 Urgence Immédiate</span>
                  <span className="text-[10px] text-slate-500">Arrivée estimée sous 20 à 30 min</span>
                </div>
              </div>
              {urgencyLevel === 'IMMEDIATE' && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setUrgencyLevel('SCHEDULED')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs cursor-pointer ${
                urgencyLevel === 'SCHEDULED'
                  ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck weight="duotone" className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-slate-900">📅 Rendez-vous Planifié</span>
                  <span className="text-[10px] text-slate-500">Aujourd'hui ou dans la semaine</span>
                </div>
              </div>
              {urgencyLevel === 'SCHEDULED' && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Interactive Leaflet Location Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Position géolocalisée de l'urgence</span>
            </span>
            <span className="text-[11px] text-blue-600 font-normal">Maalems en temps réel</span>
          </label>

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

        {/* Sélecteur Ville & Quartier 2 Colonnes Synchronisé */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Colonne 1 : Ville */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ville d'intervention :
              </label>
              <CustomDropdown
                value={selectedCity}
                onChange={handleCityChange}
                options={cityOptions}
                placeholder="Choisir une ville..."
                icon={Buildings}
              />
            </div>

            {/* Colonne 2 : Quartier / Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Quartier / Secteur :
              </label>
              <CustomDropdown
                value={selectedDistrict}
                onChange={handleDistrictChange}
                options={districtOptions}
                placeholder="Choisir un quartier..."
                icon={MapPinLine}
              />
            </div>
          </div>
        </div>

        {/* Transparence Tarifaire Marocaine */}
        <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-3xl shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                <ShieldCheck weight="duotone" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Transparence Tarifaire &amp; Diagnostic sur Place
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Conforme aux usages du marché marocain • 0 Mauvaise surprise
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-800 font-mono font-bold text-xs shadow-xs">
                Déplacement &amp; Constat : 40 - 50 DH
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-xs">
            <p className="flex items-center gap-1.5 font-medium">
              <span className="text-blue-600 font-bold">✔ Accord Préalable :</span>
              <span>
                Le Maâlem évalue la panne chez vous et valide le prix des travaux avec vous{' '}
                <strong>avant tout début d'intervention</strong>.
              </span>
            </p>
            <p dir="rtl" className="text-[11px] text-amber-800 font-bold font-sans pt-0.5">
              🤝 اتفاق مسبق على الثمن مع المعلّم قبل بدء العمل • الأداء بعد المعاينة والرضى التام
            </p>
          </div>
        </div>

        {/* Native Audio Recorder Component */}
        <div className="space-y-1.5">
          <VoiceRecorder
            onAudioRecorded={(url) => setAudioUrl(url)}
            audioUrl={audioUrl}
            onClearAudio={() => setAudioUrl(null)}
          />
          <p className="text-[10px] text-slate-500 text-center font-medium">
            💡 Vous pouvez enregistrer une note vocale rapide en Darija ou Français pour expliquer
            votre problème.
          </p>
        </div>

        {/* Multi-Photo Attachment */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Photos de la panne / problème ({photos.length}/3 photos)</span>
            </label>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
            >
              {showUrlInput ? 'Importer un fichier' : 'Utiliser un lien URL'}
            </button>
          </div>

          {!showUrlInput ? (
            <div className="space-y-3">
              {/* Galerie des photos téléchargées */}
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {photos.map((picUrl, idx) => (
                    <div key={idx} className="relative inline-block group">
                      <img
                        src={picUrl}
                        alt={`Panne photo ${idx + 1}`}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-blue-400 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-md transition-transform active:scale-90 cursor-pointer"
                        title="Supprimer cette photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="absolute bottom-1 right-1 bg-black/75 text-[10px] font-mono px-1.5 rounded text-white">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Zone de téléchargement / Caméra (si moins de 3 photos) */}
              {photos.length < 3 && (
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl cursor-pointer bg-white hover:bg-blue-50/50 transition-all text-center group">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-black text-slate-800">
                    {photos.length === 0
                      ? 'Prendre une photo ou Choisir une image'
                      : 'Ajouter une photo supplémentaire'}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Jusqu'à 3 photos (Vue d'ensemble / Détail de la pièce)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ) : (
            <input
              type="url"
              placeholder="Collez le lien URL de la photo de la panne..."
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
                if (e.target.value && !photos.includes(e.target.value)) {
                  setPhotos([e.target.value]);
                }
              }}
              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:outline-none transition-colors shadow-xs"
            />
          )}
        </div>

        {/* Précision d'Accès / Adresse (Optionnel) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-2">
            <span>✍️ Précision d'accès / Instructions (Optionnel)</span>
          </label>
          <input
            type="text"
            placeholder="ex: Étage 3, porte droite, en face de la pharmacie, sonnette n°4..."
            value={accessDetails}
            onChange={(e) => setAccessDetails(e.target.value)}
            className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:outline-none transition-colors shadow-xs"
          />
        </div>

        {/* Indicateur d'artisans en ligne + Bouton SOS */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs px-1">
            {onlineMaalemsCount > 0 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping flex-shrink-0" />
                <span>
                  {onlineMaalemsCount}{' '}
                  {onlineMaalemsCount === 1 ? 'Artisan Maâlem' : 'Artisans Maâlems'} En Ligne à{' '}
                  {selectedCity}
                </span>
              </span>
            ) : (
              <span className="text-amber-800 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping flex-shrink-0" />
                <span>Aucun artisan connecté à {selectedCity} actuellement</span>
              </span>
            )}
            <span className="text-slate-500 text-[11px]">
              {onlineMaalemsCount > 0 ? 'Prêt à intervenir' : 'Alerte transmise dès connexion'}
            </span>
          </div>

          {/* Primary SOS Action Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={submitting}
            className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-3 font-sans active:scale-95 cursor-pointer"
          >
            <Zap className="w-6 h-6 text-white fill-current" />
            <span>
              {submitting ? t('loading') : "Lancer l'Alerte SOS Express (Dépannage Immédiat)"}
            </span>
            <ChevronRight className="w-5 h-5 text-blue-100" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
