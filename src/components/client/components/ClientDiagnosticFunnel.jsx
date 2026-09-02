import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkle } from '@phosphor-icons/react';
import { DIAGNOSTIC_TAXONOMY } from '../data/diagnosticTaxonomy';
import { FunnelStepCategory } from './funnel/FunnelStepCategory';
import { FunnelStepQuestions } from './funnel/FunnelStepQuestions';
import { FunnelStepLocationMedia } from './funnel/FunnelStepLocationMedia';
import { FunnelStepConfirmation } from './funnel/FunnelStepConfirmation';

export { DIAGNOSTIC_TAXONOMY };

export const ClientDiagnosticFunnel = ({
  serviceType,
  setServiceType,
  selectedSubcategory,
  setSelectedSubcategory,
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
  submitting,
  handleSOSSubmit,
  lang = 'fr',
  user
}) => {
  const isRtl = lang === 'ar';
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(() => {
    return DIAGNOSTIC_TAXONOMY.find((t) => t.serviceType === serviceType) || DIAGNOSTIC_TAXONOMY[0];
  });
  const [answers, setAnswers] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);

  // Synchronisation du type de service parent
  useEffect(() => {
    if (selectedIssue) {
      setServiceType(selectedIssue.serviceType);
    }
  }, [selectedIssue, setServiceType]);

  // Synchronisation du libellé de problème dans `selectedSubcategory`
  useEffect(() => {
    if (!selectedIssue) return;
    const ansList = Object.values(answers).filter(Boolean);
    const mainTitle = isRtl ? selectedIssue.titleAr : selectedIssue.titleFr;
    const summary = ansList.length > 0
      ? `${mainTitle} : ${ansList.join(' • ')}`
      : mainTitle;
    setSelectedSubcategory(summary);
  }, [selectedIssue, answers, isRtl, setSelectedSubcategory]);

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setAnswers({});
    setStep(2);
  };

  const handleAnswerSelect = (questionId, optionValue) => {
    const nextAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(nextAnswers);

    const allAnswered = selectedIssue.questions.every(
      (q) => nextAnswers[q.id] || q.id === questionId
    );
    if (allAnswered) {
      setTimeout(() => setStep(3), 280);
    }
  };

  const handleUseCurrentGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLat(pos.coords.latitude);
          setSelectedLng(pos.coords.longitude);
          updateCityAndDistrictFromGPS(pos.coords.latitude, pos.coords.longitude);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-8 shadow-lg relative overflow-hidden text-slate-900 transition-all font-sans"
    >
      {/* 🧭 En-tête avec Fil d'Ariane & Progression Mobile */}
      <div className="mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 mb-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              {isRtl ? (
                <>
                  <span>رجوع</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                  <span>Retour</span>
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-black uppercase tracking-wider">
              <Sparkle weight="fill" className="w-3 h-3 text-blue-600" />
              {isRtl ? 'ديباناج سريع 24/7' : 'SOS Dépannage Express'}
            </span>
          )}

          <div className="text-right">
            <span className="text-xs font-black text-slate-900">
              {isRtl ? `المرحلة ${step} من 4` : `Étape ${step} sur 4`}
            </span>
            <span className="text-[11px] text-slate-400 block">
              {step === 1 && (isRtl ? 'نوع العطب' : 'Votre Problème')}
              {step === 2 && (isRtl ? 'تشخيص دقيق' : 'Diagnostic')}
              {step === 3 && (isRtl ? 'الموقع و الحي' : 'Localisation GPS')}
              {step === 4 && (isRtl ? 'إطلاق الرادار' : 'Lancement SOS')}
            </span>
          </div>
        </div>

        {/* Barre de progression fluide */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <FunnelStepCategory
            isRtl={isRtl}
            selectedIssue={selectedIssue}
            onSelectIssue={handleSelectIssue}
          />
        )}

        {step === 2 && selectedIssue && (
          <FunnelStepQuestions
            isRtl={isRtl}
            selectedIssue={selectedIssue}
            answers={answers}
            handleAnswerSelect={handleAnswerSelect}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <FunnelStepLocationMedia
            isRtl={isRtl}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            cityOptions={cityOptions}
            districtOptions={districtOptions}
            handleCityChange={handleCityChange}
            handleDistrictChange={handleDistrictChange}
            selectedLat={selectedLat}
            selectedLng={selectedLng}
            setSelectedLat={setSelectedLat}
            setSelectedLng={setSelectedLng}
            updateCityAndDistrictFromGPS={updateCityAndDistrictFromGPS}
            handleUseCurrentGPS={handleUseCurrentGPS}
            showMapModal={showMapModal}
            setShowMapModal={setShowMapModal}
            accessDetails={accessDetails}
            setAccessDetails={setAccessDetails}
            serviceType={serviceType}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <FunnelStepConfirmation
            isRtl={isRtl}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            selectedSubcategory={selectedSubcategory}
            selectedIssue={selectedIssue}
            audioUrl={audioUrl}
            setAudioUrl={setAudioUrl}
            photos={photos}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            removePhoto={removePhoto}
            showUrlInput={showUrlInput}
            setShowUrlInput={setShowUrlInput}
            handleFileUpload={handleFileUpload}
            submitting={submitting}
            handleSOSSubmit={handleSOSSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
