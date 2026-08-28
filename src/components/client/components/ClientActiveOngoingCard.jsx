import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Car, Star, PhoneCall, MessageSquare, Navigation, Clock } from 'lucide-react';
import { InteractiveMap } from '../../InteractiveMap';
import { VoiceAudioPlayer } from '../../VoiceAudioPlayer';
import { getServiceDisplay } from '../hooks/useClientViewState';
import { calculateMaalemRating } from '../../../utils/ratingUtils';
import { fetchRoadRoute } from '../../../lib/routingService';

export const ClientActiveOngoingCard = ({
  activeOngoingSOS,
  matchedMaalem,
  maalems = [],
  reviews = [],
  interventions = [],
  setPendingCompletionModalInt,
  cancelIntervention,
  selectedLat,
  selectedLng,
  serviceType,
  setShowNewSOSForm
}) => {
  if (!activeOngoingSOS) return null;

  const [routeInfo, setRouteInfo] = useState(null);

  const rawMaalemId = String(activeOngoingSOS.maalem_id || matchedMaalem?.id || '').trim();
  const rawMaalemPhone = String(activeOngoingSOS.maalem_phone || matchedMaalem?.phone || '').replace(/\D/g, '');

  const resolvedMaalem = (maalems || []).find((m) => {
    const mId = String(m.id || '').trim();
    const mPhone = String(m.phone || '').replace(/\D/g, '');
    return (rawMaalemId && mId === rawMaalemId) || (rawMaalemPhone && mPhone && mPhone === rawMaalemPhone);
  });

  const maalemDisplayName =
    (activeOngoingSOS.maalem_name && activeOngoingSOS.maalem_name !== 'Artisan Maâlem' && activeOngoingSOS.maalem_name !== 'Artisan Maalem' && activeOngoingSOS.maalem_name !== 'Maalem')
      ? activeOngoingSOS.maalem_name
      : (matchedMaalem?.full_name && matchedMaalem?.full_name !== 'Artisan Maâlem' && matchedMaalem?.full_name !== 'Maalem'
        ? matchedMaalem.full_name
        : (matchedMaalem?.name && matchedMaalem?.name !== 'Maalem'
          ? matchedMaalem.name
          : (resolvedMaalem?.full_name || resolvedMaalem?.name || 'Artisan Maâlem')));

  const maalemDisplayPhone =
    (activeOngoingSOS.maalem_phone && activeOngoingSOS.maalem_phone !== 'N/A' && String(activeOngoingSOS.maalem_phone).length >= 8)
      ? activeOngoingSOS.maalem_phone
      : (matchedMaalem?.phone || resolvedMaalem?.phone || '');

  const maalemCleanPhone = String(maalemDisplayPhone).replace(/\D/g, '');

  const maalemRatingObj = calculateMaalemRating(
    resolvedMaalem || { id: rawMaalemId, phone: rawMaalemPhone, maalem_details: { rating_avg: activeOngoingSOS.maalem_rating } },
    reviews,
    interventions
  );

  const displayRatingNumber = maalemRatingObj.totalReviews > 0
    ? maalemRatingObj.averageRating.toFixed(1)
    : (activeOngoingSOS.maalem_rating !== undefined && activeOngoingSOS.maalem_rating !== null
      ? Number(activeOngoingSOS.maalem_rating).toFixed(1)
      : (resolvedMaalem?.rating_avg ? Number(resolvedMaalem.rating_avg).toFixed(1) : '5.0'));

  const lastRouteSigRef = useRef('');

  // Coordonnées client ultra-stables (priorité absolue à l'intervention enregistrée)
  const clientLat = (activeOngoingSOS.lat && !isNaN(Number(activeOngoingSOS.lat)))
    ? Number(activeOngoingSOS.lat)
    : Number(selectedLat);
  const clientLng = (activeOngoingSOS.lng && !isNaN(Number(activeOngoingSOS.lng)))
    ? Number(activeOngoingSOS.lng)
    : Number(selectedLng);

  // Calcul du tracé routier réel entre le Maâlem et le Client (sans recalculs intempestifs)
  useEffect(() => {
    let isCancelled = false;
    const maalemLat = parseFloat(resolvedMaalem?.lat || activeOngoingSOS.maalem_lat || 33.5883);
    const maalemLng = parseFloat(resolvedMaalem?.lng || activeOngoingSOS.maalem_lng || -7.6328);

    if (!isNaN(clientLat) && !isNaN(clientLng) && !isNaN(maalemLat) && !isNaN(maalemLng)) {
      const sig = `${maalemLat.toFixed(4)},${maalemLng.toFixed(4)}_${clientLat.toFixed(4)},${clientLng.toFixed(4)}`;
      if (lastRouteSigRef.current === sig) return;
      lastRouteSigRef.current = sig;

      fetchRoadRoute([maalemLat, maalemLng], [clientLat, clientLng]).then((res) => {
        if (!isCancelled && res) {
          setRouteInfo(res);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [clientLat, clientLng, resolvedMaalem?.lat, resolvedMaalem?.lng, activeOngoingSOS.maalem_lat, activeOngoingSOS.maalem_lng]);

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
            <Car className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">
                {activeOngoingSOS.status === 'PENDING_COMPLETION'
                  ? 'Mission Réalisée • Confirmation Requise'
                  : activeOngoingSOS.progress_step === 'ARRIVED'
                  ? 'Maâlem Sur Place • Diagnostic en cours'
                  : 'Maâlem en Route • Déplacement Live'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              {activeOngoingSOS.status === 'PENDING_COMPLETION'
                ? 'Travaux Réalisés par votre Maâlem'
                : activeOngoingSOS.progress_step === 'ARRIVED'
                ? 'Votre Maâlem est arrivé sur place'
                : 'Votre Artisan Maâlem est en route'}
            </h2>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs self-start sm:self-auto shadow-2xs">
          {getServiceDisplay(activeOngoingSOS.service_type).label}
        </span>
      </div>

      {/* Étapes d'avancement dynamiques */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="p-3 rounded-2xl border bg-blue-50/80 border-blue-200 text-blue-900 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <span className="text-xs font-black">1. Prise en charge</span>
          <p className="text-[10px] text-blue-700 font-medium">Validée ✓</p>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
            ? 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-xs'
            : 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-xs ring-1 ring-amber-300/50'
        }`}>
          <Car className="w-5 h-5 mx-auto mb-1 text-amber-600" />
          <span className="text-xs font-black">2. Déplacement</span>
          <p className="text-[10px] font-medium">
            {activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
              ? 'Sur place ✓'
              : 'En route (~15 min)'}
          </p>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          activeOngoingSOS.status === 'PENDING_COMPLETION'
            ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs ring-2 ring-purple-400/60 animate-pulse'
            : 'bg-slate-50 border-slate-200 text-slate-400'
        }`}>
          <CheckCircle2 className={`w-5 h-5 mx-auto mb-1 ${
            activeOngoingSOS.status === 'PENDING_COMPLETION' ? 'text-purple-600' : 'text-slate-400'
          }`} />
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
            {(maalemDisplayName || 'M')[0].toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-base">
                {maalemDisplayName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                ✓ Vérifié
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>
                  {displayRatingNumber} / 5
                </span>
                {maalemRatingObj.totalReviews > 0 && (
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({maalemRatingObj.totalReviews} avis)
                  </span>
                )}
              </span>
              <span>•</span>
              <span>{activeOngoingSOS.subcategory || 'Dépannage'}</span>
            </div>
          </div>
        </div>

        {/* Boutons d'Appel / WhatsApp */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {maalemCleanPhone.length >= 8 && (
            <a
              href={`tel:${maalemDisplayPhone}`}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Appeler</span>
            </a>
          )}
          {maalemCleanPhone.length >= 8 && (
            <a
              href={`https://wa.me/212${maalemCleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(
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

      {/* Action Directe Client : Uniquement selon l'état réel d'avancement */}
      {activeOngoingSOS.status === 'PENDING_COMPLETION' ? (
        <div className="p-4 rounded-2xl border-2 border-purple-300 bg-purple-50/90 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-purple-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              <span>Le Maâlem a finalisé les travaux</span>
            </span>
            {activeOngoingSOS.final_agreed_price && (
              <span className="text-sm font-black font-mono text-purple-900 bg-white px-3 py-1 rounded-xl border border-purple-200 shadow-xs">
                {activeOngoingSOS.final_agreed_price} DH
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700">
            {activeOngoingSOS.final_agreed_price
              ? `Montant convenu : ${activeOngoingSOS.final_agreed_price} DH. Veuillez confirmer et laisser votre évaluation pour clôturer la mission.`
              : 'Veuillez valider la bonne réalisation de la prestation et noter votre Maâlem.'}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setPendingCompletionModalInt(activeOngoingSOS)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Valider la Fin des Travaux &amp; Laisser un Avis</span>
            </button>
          </div>
        </div>
      ) : activeOngoingSOS.progress_step === 'ARRIVED' ? (
        <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/70 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-blue-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Artisan arrivé à votre adresse • Réparation en cours</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            L'artisan effectue le diagnostic et les travaux de dépannage. Dès la fin des travaux, vous pourrez confirmer et noter sa prestation.
          </p>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/70 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Car className="w-5 h-5 text-amber-600 animate-pulse shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-950">Artisan en déplacement vers votre adresse</p>
              <p className="text-[11px] text-slate-600">
                {routeInfo
                  ? `Arrivée estimée dans ~${routeInfo.durationMin} min (${routeInfo.distanceKm} km par la route).`
                  : 'Arrivée estimée à votre domicile dans ~10 à 15 min.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment annuler cette intervention ?')) {
                cancelIntervention(activeOngoingSOS.id);
              }
            }}
            className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Note Vocale Enregistrée par le Client */}
      {activeOngoingSOS.audio_note_url && (
        <VoiceAudioPlayer audioUrl={activeOngoingSOS.audio_note_url} title="Votre Note Vocale Envoyée au Maâlem" />
      )}

      {/* Carte Interactive Live avec Tracé Routier */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Itinéraire &amp; Suivi en Temps Réel</span>
          </span>
          {routeInfo && (
            <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
              ~{routeInfo.durationMin} min • {routeInfo.distanceKm} km
            </span>
          )}
        </label>
        <InteractiveMap
          mode="CLIENT_PICKER"
          selectedLat={clientLat}
          selectedLng={clientLng}
          filterCategory={activeOngoingSOS.service_type || serviceType}
          activeRouteCoords={routeInfo?.coordinates}
          trackingMaalemPos={[maalemLat, maalemLng]}
          etaSummary={routeInfo?.summary}
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
