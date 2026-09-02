import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Siren, 
  MapPin, 
  Clock, 
  Zap, 
  X, 
  Volume2, 
  Play, 
  Pause, 
  ChevronRight,
  Handshake,
  Navigation
} from 'lucide-react';
import { stopEmergencySiren } from '../lib/audioNotifier';

/**
 * Modale Plein Écran Responsive pour les Alertes SOS d'Urgence (Maâlem)
 * Conforme au design system Modern Clean & Trust
 *
 * @param {object} props
 * @param {object} props.alert - Données du lead SOS
 * @param {Function} props.onAccept - Callback pour accepter l'intervention (-15 DH)
 * @param {Function} props.onDismiss - Callback pour ignorer l'alerte
 */
export const EmergencySOSModal = ({ alert, onAccept, onDismiss }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioInstance, setAudioInstance] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [accepting, setAccepting] = useState(false);

  // Compte à rebours automatique (60 secondes)
  useEffect(() => {
    if (!alert) return;

    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopEmergencySiren();
          if (onDismiss) onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (audioInstance) {
        audioInstance.pause();
      }
    };
  }, [alert, onDismiss]);

  if (!alert) return null;

  const toggleAudio = () => {
    if (!alert.audio_note_url) return;

    if (isPlayingAudio && audioInstance) {
      audioInstance.pause();
      setIsPlayingAudio(false);
    } else {
      const audio = new Audio(alert.audio_note_url);
      audio.onended = () => setIsPlayingAudio(false);
      audio.play().catch((e) => console.warn('[Audio] Lecture impossible:', e));
      setAudioInstance(audio);
      setIsPlayingAudio(true);
    }
  };

  const handleAcceptClick = async () => {
    setAccepting(true);
    stopEmergencySiren();
    if (audioInstance) audioInstance.pause();
    try {
      if (onAccept) await onAccept(alert.id);
    } finally {
      setAccepting(false);
    }
  };

  const handleDismissClick = () => {
    stopEmergencySiren();
    if (audioInstance) audioInstance.pause();
    if (onDismiss) onDismiss();
  };

  const serviceLabel =
    String(alert.service_type || '').toUpperCase().includes('CLIM') ? 'Climatisation & Froid' :
    alert.service_type === 'PLUMBING' ? 'Plomberie & Sanitaire' :
    alert.service_type === 'ELECTRICIAN' ? 'Électricité Générale' :
    alert.service_type === 'AUTO_MECHANIC' ? 'Mécanique Auto' :
    alert.service_type === 'PEINTURE' ? 'Peinture' :
    alert.service_type === 'MACONNERIE' ? 'Maçonnerie' :
    alert.service_type === 'SERRURERIE' ? 'Serrurerie' : 'Dépannage Urgent';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md font-sans"
      >
        {/* Modal Card — Modern Clean & Trust */}
        <motion.div
          initial={{ scale: 0.92, y: 25, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative max-w-lg w-full bg-white border border-slate-200/90 rounded-3xl p-4.5 sm:p-6 shadow-2xl text-slate-900 overflow-y-auto max-h-[92vh] modal-scroll space-y-4 ring-1 ring-amber-500/20"
        >
          {/* Top Progress Bar for auto-dismiss timer */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden rounded-t-3xl">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 60, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600"
            />
          </div>

          {/* Header with Radar Beacon & Service Title */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 min-w-0">
              {/* Pulsing Siren Container */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-600 shadow-xs shrink-0">
                <Siren className="w-5 h-5 text-amber-600 animate-bounce" />
              </div>

              <div className="min-w-0 space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
                  </span>
                  <span className="tracking-wide uppercase">Urgence SOS • {countdown}s</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
                  {serviceLabel}
                </h3>
              </div>
            </div>

            {/* Price Badge */}
            <div className="flex flex-col items-end shrink-0">
              <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-mono font-black text-xs shadow-xs">
                15.00 DH
              </span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">par déblocage</span>
            </div>
          </div>

          {/* Details Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-2xs">
            {/* Panne Déclarée & Quartier Exact */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-slate-200/70 pb-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">
                  Panne déclarée
                </span>
                <span className="text-sm font-black text-slate-900 break-words leading-snug">
                  {alert.subcategory || alert.service_description || 'Dépannage d\'urgence'}
                </span>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">
                  Quartier
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{alert.district || 'Casablanca'}</span>
                </span>
              </div>
            </div>

            {/* Tarification & Délai Souhaité */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-bold font-mono">Tarification :</span>
                <span className="font-bold text-blue-700 text-xs flex items-center gap-1.5 mt-0.5">
                  <Handshake className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">Accord Direct</span>
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-bold font-mono">Délai souhaité :</span>
                <span className="font-bold text-amber-800 text-xs flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Immédiat (&lt; 30 min)</span>
                </span>
              </div>
            </div>

            {/* Précisions d'accès client */}
            {alert.access_details && (
              <p className="text-[11px] text-amber-900 italic bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70">
                ✍️ "{alert.access_details}"
              </p>
            )}

            {/* Client Audio Note (Darija / FR) */}
            {alert.audio_note_url && (
              <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    type="button"
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0 cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </motion.button>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Note Vocale du Client</p>
                    <p className="text-[10px] text-slate-500">Écoutez les explications audio</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 shrink-0">
                  {isPlayingAudio ? 'Lecture 🔊' : 'Darija / FR 🎙️'}
                </span>
              </div>
            )}

            {/* Real photo if uploaded */}
            {alert.description_photo && !alert.description_photo.includes('unsplash.com') && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-36">
                <img
                  src={alert.description_photo}
                  alt="Panne"
                  className="w-full h-36 object-cover"
                />
                <span className="absolute bottom-1 right-2 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  📷 Photo de la panne
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons — Mobile First */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleDismissClick}
              className="w-full sm:w-1/3 py-3 min-h-[46px] bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Ignorer</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              disabled={accepting}
              onClick={handleAcceptClick}
              className="w-full sm:w-2/3 py-3.5 min-h-[50px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75"
            >
              <Zap className="w-4 h-4 fill-current text-white" />
              <span>{accepting ? 'Déblocage en cours...' : 'ACCEPTER L\'INTERVENTION (-15 DH)'}</span>
              <ChevronRight className="w-4 h-4 text-emerald-100" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
