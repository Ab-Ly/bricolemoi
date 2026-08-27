import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

export const AuthHeader = ({ step, isClient, handleBack, handleClose }) => {
  return (
    <div className="relative flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
      <div className="flex items-center gap-2.5">
        {step !== 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer active:scale-95 touch-target-44 shrink-0"
            title="Retour"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isClient ? 'bg-blue-600' : 'bg-amber-500'
            } animate-pulse shrink-0`}
          />

          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none">
              {step === 1 && (isClient ? 'Bienvenue sur BricoleMoi 🛠️' : 'Espace Artisan Maâlem Pro 🛠️')}
              {step === 'EXISTING_USER' && 'Connexion Rapide'}
              {step === 'NEW_USER' && 'Créer votre compte'}
              {step === 'OTP_VERIFY' && 'Code de sécurité SMS'}
              {step === 'SET_PIN' && 'Code PIN Secret'}
              {step === 'GOOGLE_PHONE_COMPLETION' && 'Numéro WhatsApp de contact 📱'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-none">
              {step === 1 &&
                (isClient
                  ? 'Dépannage & Artisans qualifiés en 15 min'
                  : 'Rejoignez le 1er réseau de chantiers')}
              {step === 'EXISTING_USER' && 'Ravi de vous revoir parmi nous !'}
              {step === 'NEW_USER' && 'Quelques informations rapides pour démarrer'}
              {step === 'OTP_VERIFY' && 'Entrez le code reçu sur votre mobile'}
              {step === 'SET_PIN' && "Ce code vous évitera d'attendre un SMS la prochaine fois"}
              {step === 'GOOGLE_PHONE_COMPLETION' &&
                'Pour recevoir le suivi de vos interventions en temps réel'}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer active:scale-95 touch-target-44 shrink-0 ml-2"
        title="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
