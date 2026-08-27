import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Car, Star, PhoneCall, MessageSquare } from 'lucide-react';
import { InteractiveMap } from '../../InteractiveMap';
import { VoiceAudioPlayer } from '../../VoiceAudioPlayer';
import { getServiceDisplay } from '../hooks/useClientViewState';

export const ClientActiveOngoingCard = ({
  activeOngoingSOS,
  matchedMaalem,
  setPendingCompletionModalInt,
  cancelIntervention,
  selectedLat,
  selectedLng,
  serviceType,
  setShowNewSOSForm
}) => {
  if (!activeOngoingSOS) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white border-2 border-blue-500/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 text-slate-900"
    >
      {/* Header Intervention en Cours */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            {activeOngoingSOS.status === 'PENDING_COMPLETION' ? (
              <CheckCircle2 className="w-7 h-7 text-white" />
            ) : activeOngoingSOS.progress_step === 'ARRIVED' ? (
              <MapPin className="w-7 h-7 text-white" />
            ) : (
              <Car className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  activeOngoingSOS.status === 'PENDING_COMPLETION'
                    ? 'bg-purple-500 animate-pulse'
                    : 'bg-emerald-500 animate-ping'
                }`}
              />
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                {activeOngoingSOS.status === 'PENDING_COMPLETION'
                  ? 'Clôture de Chantier • Validation Requise'
                  : activeOngoingSOS.progress_step === 'ARRIVED'
                  ? 'Maâlem sur place • Diagnostic & Réparation'
                  : 'Maâlem en route • Déplacement Live'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {activeOngoingSOS.status === 'PENDING_COMPLETION'
                ? "Travaux Finalisés par l'Artisan"
                : activeOngoingSOS.progress_step === 'ARRIVED'
                ? "L'Artisan est arrivé à votre domicile"
                : 'Votre Artisan Maâlem est en route'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xs shadow-xs">
            {getServiceDisplay(activeOngoingSOS.service_type).label}
          </span>
        </div>
      </div>

      {/* Stepper Dynamique d'Avancement */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
          <span className="text-xs font-black text-blue-800">1. Prise en charge</span>
          <p className="text-[10px] text-blue-600 font-medium">Validée ✓</p>
        </div>
        <div
          className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
            activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
          }`}
        >
          <span className="text-xs font-black">2. Déplacement</span>
          <p className="text-[10px] font-medium">
            {activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
              ? 'Arrivé sur place ✓'
              : 'En route (~15 min)'}
          </p>
        </div>
        <div
          className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
            activeOngoingSOS.status === 'PENDING_COMPLETION'
              ? 'bg-purple-50 border-purple-300 text-purple-900 animate-pulse'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <span className="text-xs font-black">3. Clôture</span>
          <p className="text-[10px] font-medium">
            {activeOngoingSOS.status === 'PENDING_COMPLETION' ? 'Validation Prix' : 'À venir'}
          </p>
        </div>
      </div>

      {/* Fiche Maâlem & Actions Directes */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-xs flex-shrink-0">
            {(activeOngoingSOS.maalem_name || matchedMaalem?.full_name || 'M')[0].toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-base">
                {activeOngoingSOS.maalem_name || matchedMaalem?.full_name || 'Artisan Maâlem'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                ✓ Vérifié
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>
                  {activeOngoingSOS.maalem_rating || matchedMaalem?.rating_avg
                    ? `${(activeOngoingSOS.maalem_rating || matchedMaalem?.rating_avg).toFixed(1)} / 5`
                    : '5.0 / 5'}
                </span>
              </span>
              <span>•</span>
              <span>{activeOngoingSOS.subcategory || 'Dépannage'}</span>
            </div>
          </div>
        </div>

        {/* Boutons d'Appel / WhatsApp */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {activeOngoingSOS.maalem_phone && (
            <a
              href={`tel:${activeOngoingSOS.maalem_phone}`}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Appeler</span>
            </a>
          )}
          {activeOngoingSOS.maalem_phone && (
            <a
              href={`https://wa.me/212${String(activeOngoingSOS.maalem_phone)
                .replace(/\D/g, '')
                .replace(/^0/, '')}?text=${encodeURIComponent(
                `Bonjour, je suis le client pour l'intervention BricoleMoi (${activeOngoingSOS.subcategory || 'Dépannage'}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Action Directe Client : Validation & Clôture */}
      <div
        className={`p-4 rounded-2xl border-2 space-y-3 shadow-xs ${
          activeOngoingSOS.status === 'PENDING_COMPLETION'
            ? 'bg-purple-50/90 border-purple-300'
            : 'bg-emerald-50/70 border-emerald-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>
              {activeOngoingSOS.status === 'PENDING_COMPLETION'
                ? "Le Maâlem a terminé l'intervention"
                : 'Artisan sur place • Intervention en cours'}
            </span>
          </span>
          {activeOngoingSOS.final_agreed_price && (
            <span className="text-sm font-black font-mono text-emerald-900 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-xs">
              {activeOngoingSOS.final_agreed_price} DH
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600">
          {activeOngoingSOS.status === 'PENDING_COMPLETION'
            ? `Montant convenu : ${activeOngoingSOS.final_agreed_price || 150} DH. Veuillez confirmer et laisser votre note pour clôturer la mission.`
            : 'Les travaux sont finis ou en cours de finalisation ? Touchez ci-dessous pour valider la prestation et noter votre Maâlem.'}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setPendingCompletionModalInt(activeOngoingSOS)}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Valider la Fin des Travaux &amp; Laisser un Avis (5★)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment annuler ou clôturer cette intervention ?')) {
                cancelIntervention(activeOngoingSOS.id);
              }
            }}
            className="px-3.5 py-3 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 text-center shrink-0"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Note Vocale Enregistrée par le Client */}
      {activeOngoingSOS.audio_note_url && (
        <VoiceAudioPlayer audioUrl={activeOngoingSOS.audio_note_url} title="Votre Note Vocale Envoyée au Maâlem" />
      )}

      {/* Carte Interactive Live */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Position géolocalisée du chantier</span>
          </span>
          <span className="text-[11px] text-blue-600 font-mono font-bold">Suivi Live</span>
        </label>
        <InteractiveMap
          mode="CLIENT_PICKER"
          selectedLat={parseFloat(activeOngoingSOS.lat || selectedLat)}
          selectedLng={parseFloat(activeOngoingSOS.lng || selectedLng)}
          filterCategory={activeOngoingSOS.service_type || serviceType}
        />
      </div>

      {/* Option discrète pour lancer une autre demande */}
      <div className="pt-2 border-t border-slate-200 flex justify-end">
        <button
          type="button"
          onClick={() => setShowNewSOSForm(true)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>+ Besoin d'un autre dépannage en parallèle ?</span>
        </button>
      </div>
    </motion.div>
  );
};
