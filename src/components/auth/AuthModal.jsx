import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModalLogic } from './hooks/useAuthModalLogic';
import { AuthHeader } from './components/AuthHeader';
import { RoleSwitcher } from './components/RoleSwitcher';
import { ErrorInfoBanner } from './components/ErrorInfoBanner';
import { CountrySelectModal } from './components/CountrySelectModal';

import { PhoneEntryStep } from './steps/PhoneEntryStep';
import { ExistingUserPinStep } from './steps/ExistingUserPinStep';
import { NewUserRegistrationStep } from './steps/NewUserRegistrationStep';
import { OtpVerificationStep } from './steps/OtpVerificationStep';
import { SetPinStep } from './steps/SetPinStep';
import { GooglePhoneCompletionStep } from './steps/GooglePhoneCompletionStep';

export const AuthModal = () => {
  const auth = useAuthModalLogic();

  return (
    <AnimatePresence>
      {auth.authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm font-sans"
        >
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={auth.handleClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-[440px] max-h-[92dvh] overflow-y-auto modal-scroll rounded-3xl p-4 sm:p-6 text-slate-800 shadow-2xl bg-white transition-all duration-300 border ${
              auth.isClient ? 'border-slate-200/90' : 'border-amber-200/90'
            }`}
          >
            {/* Soft Ambient Header Glow */}
            <div
              className={`absolute -top-24 -left-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500 opacity-15 ${
                auth.isClient ? 'bg-blue-500' : 'bg-amber-500'
              }`}
            />

            {/* Header avec bouton retour et fermeture */}
            <AuthHeader
              step={auth.step}
              isClient={auth.isClient}
              handleBack={auth.handleBack}
              handleClose={auth.handleClose}
            />

            {/* Switcher Particulier vs Artisan Maâlem (Étape 1 uniquement) */}
            {auth.step === 1 && (
              <RoleSwitcher
                role={auth.role}
                setRole={auth.setRole}
                isClient={auth.isClient}
                setErrorBanner={auth.setErrorBanner}
              />
            )}

            {/* Alertes et notifications */}
            <ErrorInfoBanner
              errorBanner={auth.errorBanner}
              infoMsg={auth.infoMsg}
              gpsSuccessMsg={auth.gpsSuccessMsg}
            />

            {/* Étape 1 : Saisie Téléphone / Google 1-Clic */}
            {auth.step === 1 && <PhoneEntryStep {...auth} />}

            {/* Étape 2.A : Utilisateur existant (Code PIN 4 chiffres) */}
            {auth.step === 'EXISTING_USER' && <ExistingUserPinStep {...auth} />}

            {/* Étape 2.B : Nouvel utilisateur (Nom, Ville, Quartier, Spécialité) */}
            {auth.step === 'NEW_USER' && <NewUserRegistrationStep {...auth} />}

            {/* Étape 3 : Code SMS / WhatsApp (6 chiffres) */}
            {auth.step === 'OTP_VERIFY' && <OtpVerificationStep {...auth} />}

            {/* Étape 4 : Définition Code PIN Secret */}
            {auth.step === 'SET_PIN' && <SetPinStep {...auth} />}

            {/* Étape Complétion Google WhatsApp */}
            {auth.step === 'GOOGLE_PHONE_COMPLETION' && <GooglePhoneCompletionStep {...auth} />}

            {/* Overlay sélecteur de pays avec drapeaux */}
            <CountrySelectModal
              isCountryOpen={auth.isCountryOpen}
              setIsCountryOpen={auth.setIsCountryOpen}
              countrySearch={auth.countrySearch}
              setCountrySearch={auth.setCountrySearch}
              filteredCountries={auth.filteredCountries}
              selectedCountry={auth.selectedCountry}
              setSelectedCountry={auth.setSelectedCountry}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
