import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { ChatCenteredText, ClockCounterClockwise } from '@phosphor-icons/react';

export const OtpVerificationStep = ({
  selectedCountry,
  getFullInternationalNumber,
  otpDigits,
  otpInputRefs,
  handleOtpDigitChange,
  handleOtpKeyDown,
  resendCountdown,
  authMode,
  handleProceedSignUp,
  handleSendLoginOtp,
  loading,
  handleOtpProceed
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOtpProceed();
      }}
      className="space-y-4"
    >
      <div
        className={`p-3 rounded-2xl border flex items-center justify-between shadow-xs ${
          selectedCountry.dial === '+212'
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-blue-50/70 border-blue-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs ${
              selectedCountry.dial === '+212' ? 'bg-emerald-600' : 'bg-blue-600'
            }`}
          >
            <ChatCenteredText weight="duotone" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              {selectedCountry.dial === '+212'
                ? 'Code de sécurité envoyé sur WhatsApp 💬'
                : 'Code de sécurité envoyé par SMS 📱'}
            </p>
            <p className="text-[11px] text-slate-600 font-mono flex items-center gap-1.5 mt-0.5">
              <span>{getFullInternationalNumber()}</span>
              <span
                className={
                  selectedCountry.dial === '+212'
                    ? 'text-emerald-700 font-sans text-[10px] font-bold'
                    : 'text-blue-600 font-sans text-[10px] font-bold'
                }
              >
                {selectedCountry.dial === '+212'
                  ? '(WhatsApp BricoleMoi)'
                  : '(Expéditeur: BricoleMoi)'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Saisie 6 Chiffres OTP */}
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {otpDigits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (otpInputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            autoComplete={idx === 0 ? 'one-time-code' : 'off'}
            pattern="[0-9]*"
            maxLength={6}
            value={digit}
            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
            autoFocus={idx === 0}
            className={`h-12 w-full text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
              digit
                ? selectedCountry.dial === '+212'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600'
                  : 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
            } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
          />
        ))}
      </div>

      {/* Compte à rebours 5 minutes / Renvoi */}
      <div className="flex items-center justify-between text-xs pt-0.5">
        <span className="text-slate-500 text-[11px]">
          {resendCountdown > 0 ? 'Code valable 5 minutes' : 'Code expiré'}
        </span>
        {resendCountdown > 0 ? (
          <div className="text-[11px] text-blue-700 font-mono font-bold flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
            <ClockCounterClockwise className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>
              {String(Math.floor(resendCountdown / 60)).padStart(2, '0')}:
              {String(resendCountdown % 60).padStart(2, '0')}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={authMode === 'SIGN_UP' ? handleProceedSignUp : handleSendLoginOtp}
            className="text-[11px] text-blue-600 hover:text-blue-700 underline font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {selectedCountry.dial === '+212'
                ? 'Renvoyer un code WhatsApp'
                : 'Renvoyer un nouveau code SMS'}
            </span>
          </button>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading || otpDigits.some((d) => d === '')}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>
          {loading
            ? 'Vérification...'
            : authMode === 'SIGN_IN'
            ? 'Valider & Se Connecter'
            : 'Valider le code & Continuer'}
        </span>
      </motion.button>
    </form>
  );
};
