import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle2,
  MapPin,
  Eye,
  Play,
  Pause,
  PhoneCall,
  Clock,
  Star,
  ShieldCheck
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { getCoordinatesFromDistrict } from '../../../lib/geoService';

export const MaalemActiveMissionCard = ({
  activeUnlockedLeads,
  agreedPrices,
  setPreviewPhotoUrl,
  togglePlayMaalemAudio,
  playingAudioId,
  cyclePlaybackSpeed,
  playbackSpeed,
  updateInterventionProgress,
  flowSetProgressStep,
  requestOnSiteReview,
  flowFinishMission,
  setUnreachableModalLead
}) => {
  if (activeUnlockedLeads.length === 0) return null;

  return (
    <div id="active-unlocked-missions-section" className="space-y-4 scroll-mt-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-500/80 shadow-sm space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 animate-pulse">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-sans flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Missions Actives ({activeUnlockedLeads.length})</span>
            </h3>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black tracking-wide uppercase border border-emerald-300 shrink-0 shadow-xs">
            ⚡ Action Immédiate
          </span>
        </div>

        <p className="text-xs text-slate-600 font-medium pl-0 sm:pl-11.5">
          Prenez contact avec le client sans attendre (WhatsApp ou Appel) et démarrez l'itinéraire GPS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeUnlockedLeads.map((lead) => {
          const rawPhone = lead.client_phone || lead.phone || '';
          const hasPhone = Boolean(rawPhone && String(rawPhone).replace(/\D/g, '').length >= 8);
          const cleanDigits = String(rawPhone).replace(/\D/g, '');
          const formattedWaDigits = cleanDigits.startsWith('212')
            ? cleanDigits
            : cleanDigits.startsWith('0')
            ? '212' + cleanDigits.substring(1)
            : '212' + cleanDigits;

          const waLink = hasPhone
            ? `https://wa.me/${formattedWaDigits}?text=${encodeURIComponent(
                `السلام عليكم ${lead.client_name || ''}، أنا المعلم الخاص بك من منصة BricoleMoi بخصوص طلبك (${
                  lead.subcategory || 'Dépannage'
                }). أنا في الطريق إليك.`
              )}`
            : '#';
          const rawLat = parseFloat(lead.lat);
          const rawLng = parseFloat(lead.lng);
          const hasExplicitGps =
            !isNaN(rawLat) &&
            !isNaN(rawLng) &&
            rawLat !== 0 &&
            (rawLat !== 33.5883 || (lead.district && lead.district.toLowerCase().includes('casablanca')));

          const destCoords = hasExplicitGps
            ? { lat: rawLat, lng: rawLng }
            : getCoordinatesFromDistrict(lead.district, lead.lat, lead.lng);

          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destCoords.lat},${destCoords.lng}`;

          return (
            <div
              key={lead.id}
              id={`active-lead-${lead.id}`}
              className="bg-white border-2 border-emerald-500/90 rounded-3xl p-5 shadow-md space-y-4 text-slate-900 transition-all hover:shadow-lg"
            >
              {/* Header: Badge & Métier */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs flex items-center gap-1.5 ${
                    lead.status === 'COMPLETED'
                      ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      : lead.status === 'PENDING_COMPLETION'
                      ? 'text-purple-800 bg-purple-50 border-purple-200 animate-pulse'
                      : 'text-blue-800 bg-blue-50 border-blue-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lead.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500 animate-ping'
                    }`}
                  />
                  <span>
                    {lead.status === 'COMPLETED'
                      ? '🏆 CHANTIER CLÔTURÉ'
                      : lead.status === 'PENDING_COMPLETION'
                      ? '⏳ EN ATTENTE VALIDATION CLIENT'
                      : '🟢 LEAD ACTIF DÉBLOQUÉ'}
                  </span>
                </span>
                <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 font-sans">
                  {lead.subcategory || 'Dépannage'}
                </span>
              </div>

              {/* Coordonnées & Précision d'Accès */}
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">{lead.client_name || 'Client BricoleMoi'}</h4>
                <p className="text-xs text-slate-600 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>{lead.district || 'Casablanca'}</span>
                </p>
                {lead.access_details && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 mt-1 font-medium">
                    📍 <strong>Accès :</strong> {lead.access_details}
                  </p>
                )}
              </div>

              {/* Galerie Photos HD du Lead Débloqué */}
              {(lead.photos_list || lead.description_photo) && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-500">Photos de la Panne (Cliquer pour agrandir HD) :</p>
                  <div className="flex flex-wrap gap-2">
                    {(lead.photos_list || [lead.description_photo]).map((pic, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setPreviewPhotoUrl(pic)}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={pic}
                          alt={`Panne ${pIdx + 1}`}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 group-hover:border-amber-400 transition-all shadow-xs"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lecteur Audio Intégré pour le Maâlem */}
              {lead.audio_note_url && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => togglePlayMaalemAudio(lead.id, lead.audio_note_url)}
                      className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 cursor-pointer"
                      title="Écouter l'explication du client"
                    >
                      {playingAudioId === lead.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </motion.button>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800">
                        {playingAudioId === lead.id ? 'Écoute en cours...' : 'Note Vocale du Client'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">Explication détaillée de la panne</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => cyclePlaybackSpeed(lead.id)}
                    className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 hover:bg-slate-50"
                    title="Vitesse de lecture"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              )}

              {/* Barre d'Action Mobile Tactile : 3 Boutons Équilibrés (Appel, WhatsApp, GPS) */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-bold">Client Joignable :</span>
                  <span className="text-xs font-mono font-black text-slate-900 dir-ltr">
                    {hasPhone ? `+${formattedWaDigits}` : <span className="text-amber-700 italic">En attente</span>}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {hasPhone ? (
                    <a
                      href={`tel:+${formattedWaDigits}`}
                      className="py-2.5 px-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-1 text-xs font-bold shadow-xs active:scale-95"
                      title="Appeler le client directement par téléphone GSM"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">Appel</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="py-2.5 px-1.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center gap-1 text-xs font-bold opacity-60 cursor-not-allowed"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Appel</span>
                    </button>
                  )}

                  {hasPhone ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1 transition-all active:scale-95"
                      title="Ouvrir la discussion WhatsApp avec message pré-rempli"
                    >
                      <WhatsappLogo weight="fill" className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="py-2.5 px-1.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center gap-1 text-xs font-bold opacity-60 cursor-not-allowed"
                    >
                      <WhatsappLogo weight="fill" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">WhatsApp</span>
                    </button>
                  )}

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${destCoords.lat},${destCoords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm shadow-blue-600/20 flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="Lancer l'itinéraire GPS sur Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Maps</span>
                  </a>

                  <a
                    href={`https://waze.com/ul?ll=${destCoords.lat},${destCoords.lng}&navigate=yes`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-sm shadow-sky-500/20 flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="Lancer la navigation guidée sur Waze"
                  >
                    <span className="text-xs font-bold shrink-0">🚙</span>
                    <span className="truncate">Waze</span>
                  </a>
                </div>
              </div>

              {/* Stepper d'avancement d'intervention */}
              {lead.status !== 'COMPLETED' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="text-[11px] font-bold text-slate-500">Statut du déplacement :</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateInterventionProgress(lead.id, 'ON_THE_WAY');
                        flowSetProgressStep('ON_THE_WAY');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                        lead.progress_step === 'ON_THE_WAY'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <span>🚗 En route</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateInterventionProgress(lead.id, 'ARRIVED');
                        flowSetProgressStep('ARRIVED');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                        lead.progress_step === 'ARRIVED'
                          ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-black'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <span>📍 Sur place</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action d'Accomplissement des Travaux & Saisie du Montant Réel */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                {lead.status === 'PENDING_COMPLETION' ? (
                  <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl text-xs font-bold text-purple-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600 animate-spin flex-shrink-0" />
                      <span>Demande de notation transmise • En attente de la note du client sur son écran</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => requestOnSiteReview(lead.id)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-black cursor-pointer self-end sm:self-auto"
                    >
                      Renvoyer l'Alerte 📱
                    </button>
                  </div>
                ) : lead.status === 'COMPLETED' ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 shadow-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Intervention Clôturée &amp; Validée</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full font-black font-mono flex items-center gap-1 text-xs text-amber-800 bg-amber-50 border border-amber-200 shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{lead.rating ? `${lead.rating} / 5` : '5 / 5'}</span>
                      </span>
                    </div>
                    {lead.comment && (
                      <p className="text-slate-700 font-semibold italic text-[11px] bg-white p-2 rounded-lg border border-emerald-100">
                        Avis Client : "{lead.comment}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        ⭐
                      </div>
                      <div className="min-w-0 text-xs">
                        <p className="font-black text-slate-900">Travaux terminés sur place ?</p>
                        <p className="text-[11px] text-purple-800 font-medium">
                          Demandez la note 5★ au client sur place pour débloquer votre Lead SOS Gratuit !
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => {
                        requestOnSiteReview(lead.id);
                        flowFinishMission(lead.final_agreed_price || null);
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                      <span>📱 Faire Valider &amp; Noter par le Client sur Place</span>
                    </motion.button>
                  </div>
                )}

                {/* Bouton Abandon / Mission Non Réalisable — Escrow libéré à 0 DH */}
                {lead.status !== 'COMPLETED' && (
                  <div className="pt-2 border-t border-slate-200 mt-2">
                    <button
                      type="button"
                      onClick={() => setUnreachableModalLead(lead)}
                      className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>❌ Mission Non Réalisable / Abandonner (Restitution 15 DH)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
