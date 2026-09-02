import React from 'react';
import { EnhancedCategoryIcon, getSpecialtyLabel } from '../EnhancedCategoryIcon';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ProfileHeader = ({ user, isMaalem, isAdmin, specialty, isMissingPhone }) => {
  return (
    <div className="space-y-3">
      {/* Header Avatar & Role Badge */}
      <div className="flex items-center gap-3.5 pt-1 pr-8">
        <div className="relative flex-shrink-0">
          {user.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.full_name} 
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
            />
          ) : (
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-black text-2xl text-white shadow-xs ${
              isMaalem 
                ? 'bg-gradient-to-tr from-amber-500 to-amber-600 border-amber-300' 
                : isAdmin 
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-300'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-200'
            }`}>
              {isMaalem ? (
                <EnhancedCategoryIcon type={specialty} className="w-9 h-9 text-white" />
              ) : (
                (user.full_name?.charAt(0) || 'U').toUpperCase()
              )}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"></span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-slate-900 truncate">{user.full_name || 'Utilisateur'}</h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${
              isAdmin 
                ? 'bg-purple-50 text-purple-800 border-purple-200'
                : isMaalem 
                ? 'bg-amber-50 text-amber-900 border-amber-200' 
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
              {isAdmin ? '🛡️ Administrateur' : isMaalem ? `🛠️ ${getSpecialtyLabel(specialty)}` : '👤 Client Particulier'}
            </span>

            {user.phone && user.phone.length >= 8 ? (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Téléphone Enregistré
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 shadow-xs">
                <AlertCircle className="w-2.5 h-2.5 text-amber-600" /> Numéro requis
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bandeau d'accueil Google & Complétion requise */}
      {isMissingPhone && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl space-y-1 shadow-xs">
          <p className="text-xs font-black text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>👋 Bienvenue {user.full_name || ''} !</span>
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Votre compte est connecté. Veuillez renseigner votre <strong>numéro de téléphone</strong> et votre <strong>quartier</strong> pour faciliter les interventions !
          </p>
        </div>
      )}
    </div>
  );
};
