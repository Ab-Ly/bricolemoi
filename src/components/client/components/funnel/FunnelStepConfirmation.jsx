import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Camera, 
  X, 
  Upload 
} from '@phosphor-icons/react';
import { VoiceRecorder } from '../../../VoiceRecorder';

export const FunnelStepConfirmation = ({
  isRtl,
  selectedCity,
  selectedDistrict,
  selectedSubcategory,
  selectedIssue,
  audioUrl,
  setAudioUrl,
  photos,
  photoUrl,
  setPhotoUrl,
  removePhoto,
  showUrlInput,
  setShowUrlInput,
  handleFileUpload,
  submitting,
  handleSOSSubmit
}) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 font-sans"
    >
      {/* 🎟️ Ticket SOS Récapitulatif */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isRtl ? 'طلب جاهز للإرسال' : 'Ticket d’intervention prêt'}
            </span>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            {selectedCity}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-[11px] text-slate-400 block">
              {isRtl ? 'العطب المؤهل :' : 'Problème qualifié :'}
            </span>
            <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-blue-400">⚡</span>
              <span>{selectedSubcategory || (isRtl ? selectedIssue?.titleAr : selectedIssue?.titleFr)}</span>
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">
                {isRtl ? 'الحي :' : 'Secteur :'}
              </span>
              <span className="font-bold text-slate-200">{selectedDistrict}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">
                {isRtl ? 'التوقيت :' : 'Délai :'}
              </span>
              <span className="font-bold text-amber-400">
                {isRtl ? '🚨 فوري (تحت 20-30 دقيقة)' : '🚨 Immédiat (20-30 min)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🛡️ Transparence Tarifaire Marocaine */}
      <div className="bg-blue-50/70 border border-blue-200 p-4 sm:p-5 rounded-2xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck weight="duotone" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {isRtl ? 'شفافية الأثمنة والاتفاق المسبق' : 'Transparence & Diagnostic sur Place'}
            </h4>
            <p className="text-[11px] text-slate-600">
              {isRtl
                ? 'الديبلاصمون والمُعاينة : 40 - 50 درهم • اتفاق مسبق على ثمن الخدمة قبل البدء'
                : 'Déplacement & Constat : 40 - 50 DH • Aucun prix imposé, Accord Direct avec le Maâlem'}
            </p>
          </div>
        </div>
      </div>

      {/* 🎙️ Note Vocale Optionnelle */}
      <div className="space-y-1.5">
        <VoiceRecorder
          onAudioRecorded={(url) => setAudioUrl(url)}
          audioUrl={audioUrl}
          onClearAudio={() => setAudioUrl(null)}
        />
        <p className="text-[11px] text-slate-500 text-center font-medium">
          {isRtl
            ? '💡 تقدر تسجل أوديو سريع بالدارجة تشرح فيه العطب للمعلم'
            : '💡 Vous pouvez enregistrer une note vocale rapide en Darija ou Français'}
        </p>
      </div>

      {/* 📷 Photos Optionnelles */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-2">
            <Camera weight="bold" className="w-4 h-4 text-blue-600" />
            <span>
              {isRtl
                ? `تصاور العطب (${photos.length}/3)`
                : `Photos du problème (${photos.length}/3)`}
            </span>
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            {showUrlInput
              ? (isRtl ? 'رفع ملف' : 'Importer fichier')
              : (isRtl ? 'رابط صورة' : 'Lien URL')}
          </button>
        </div>

        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {photos.map((picUrl, idx) => (
              <div key={idx} className="relative inline-block">
                <img
                  src={picUrl}
                  alt={`Photo ${idx + 1}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-blue-300 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute -top-1.5 -right-1.5 p-1 bg-red-600 text-white rounded-full shadow-md active:scale-90 cursor-pointer"
                >
                  <X weight="bold" className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {!showUrlInput ? (
          photos.length < 3 && (
            <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl cursor-pointer bg-white transition-colors">
              <Upload weight="bold" className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700">
                {isRtl ? 'إضافة صورة من الهاتف' : 'Prendre ou ajouter une photo'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )
        ) : (
          <div className="flex gap-2">
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
            />
            <button
              type="button"
              onClick={() => {
                if (photoUrl) {
                  setPhotoUrl('');
                }
              }}
              className="px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              OK
            </button>
          </div>
        )}
      </div>

      {/* 🚀 Bouton d'action principal */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSOSSubmit}
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base rounded-2xl py-4 px-6 shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{isRtl ? 'جاري إطلاق الرادار...' : 'Recherche des Maâlems en cours...'}</span>
            </span>
          ) : (
            <>
              <span className="text-xl">⚡</span>
              <span>
                {isRtl
                  ? 'إطلاق رادار المعلمين دابا (SOS ديباناج)'
                  : 'Lancer l’Alerte Radar SOS Immédiate'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* 🛡️ Bannière de Réassurance Client 100% Souveraine */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-1 shadow-2xs">
        <div className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-950">
          <ShieldCheck weight="fill" className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isRtl ? 'خدمة مجانية 100% للزبون • بدون أي عمولة إضافية' : 'Service 100% Gratuit pour le Client • Zéro Commission'}</span>
        </div>
        <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
          {isRtl 
            ? 'اتفاق مباشر مع المعلم • لا يوجد أي دفع عبر الإنترنت • الدفع محلياً بعد إتمام العمل ورضاك التام' 
            : 'Tarification Accord Direct • Aucun paiement en ligne • Paiement direct sur place après satisfaction'}
        </p>
      </div>
    </motion.div>
  );
};
