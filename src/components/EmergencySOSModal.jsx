import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Siren, 
  MapPin, 
  Clock, 
  Zap, 
  X, 
  CheckCircle2, 
  Volume2, 
  Play, 
  Pause, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { stopEmergencySiren } from '../lib/audioNotifier';

/**
 * Modale Bloquante Plein Écran pour les Alertes SOS d'Urgence (Maâlem)
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
    alert.service_type === 'PLUMBING' ? 'Plomberie' :
    alert.service_type === 'ELECTRICIAN' ? 'Électricité' :
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
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm font-sans"
      >
        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-white border-2 border-red-500 rounded-3xl p-4 sm:p-6 sm:p-8 shadow-2xl text-slate-900 overflow-y-auto max-h-modal modal-scroll space-y-4 sm:space-y-6"
        >
          {/* Top Progress Bar for auto-dismiss timer */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 60, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500"
            />
          </div>

          {/* Header with Siren & Live Beacon */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Siren Container */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 border-2 border-red-400 text-red-600 shadow-xs shrink-0">
                <Siren className="w-6 h-6 animate-bounce text-red-600" />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200 shadow-2xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <span className="tracking-wide uppercase">Urgence SOS • {countdown}s</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                  {serviceLabel}
                </h3>
              </div>
            </div>

            <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xs shadow-xs whitespace-nowrap shrink-0 self-start">
              15 DH
            </span>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3 shadow-xs">
            {/* Subcategory & District */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Panne déclarée</span>
                <span className="text-sm font-black text-slate-900 break-words">{alert.subcategory || 'Dépannage d\'urgence'}</span>
              </div>
              <div className="text-right shrink-0 max-w-[150px]">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Quartier</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1 justify-end truncate">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{alert.district || 'Casablanca'}</span>
                </span>
              </div>
            </div>

            {/* Tarification & Délai */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 block font-bold">Tarification :</span>
                <span className="font-bold text-blue-700 text-xs flex items-center gap-1">
                  🤝 Accord Direct
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 block font-bold">Délai souhaité :</span>
                <span className="font-bold text-amber-800 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Immédiat (&lt; 30 min)</span>
                </span>
              </div>
            </div>

            {/* Access Precision Note */}
            {alert.access_details && (
              <p className="text-[11px] text-amber-900 italic bg-amber-50 p-2 rounded-lg border border-amber-200">
                ✍️ "{alert.access_details}"
              </p>
            )}

            {/* Client Audio Note (Darija / FR) */}
            {alert.audio_note_url && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={toggleAudio}
                    className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0 cursor-pointer touch-target-44"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </motion.button>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Note Vocale du Client</p>
                    <p className="text-[10px] text-slate-500">Écoutez les explications de la panne</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {isPlayingAudio ? 'Lecture 🔊' : 'Darija / FR 🎙️'}
                </span>
              </div>
            )}

            {/* Photo Preview ONLY if real uploaded photo */}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handleDismissClick}
              className="w-full sm:w-1/3 py-3.5 min-h-[48px] bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 touch-target-44"
            >
              <X className="w-4 h-4" />
              <span>Ignorer</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              disabled={accepting}
              onClick={handleAcceptClick}
              className="w-full sm:w-2/3 py-4 min-h-[52px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-target-44"
            >
              <Zap className="w-5 h-5 fill-current text-white" />
              <span>{accepting ? 'Déblocage en cours...' : 'ACCEPTER L\'INTERVENTION (-15 DH)'}</span>
              <ChevronRight className="w-4 h-4 text-emerald-100" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
