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
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl font-sans"
      >
        {/* Animated Background Ambience */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[90px]" />
        </div>

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-slate-950/95 border-2 border-red-500/60 rounded-3xl p-4 sm:p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.5)] text-slate-100 overflow-y-auto max-h-modal modal-scroll space-y-4 sm:space-y-6"
        >
          {/* Top Progress Bar for auto-dismiss timer */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900 overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 60, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_10px_rgba(239,68,68,1)]"
            />
          </div>

          {/* Header with Siren & Live Beacon */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-center gap-3.5">
              {/* Concentric Siren Pulsing Rings */}
              <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-red-500/30 animate-ping" />
                <div className="w-14 h-14 rounded-2xl bg-red-950 border-2 border-red-500 text-red-400 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                  <Siren className="w-8 h-8 animate-bounce text-red-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-red-400 font-mono">
                    Urgence SOS en Direct • {countdown}s
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {serviceLabel}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-black text-xs shadow-inner">
              15 DH
            </span>
          </div>

          {/* Details Card */}
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4.5 space-y-3 shadow-inner">
            {/* Subcategory & District */}
            <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Panne déclarée</span>
                <span className="text-sm font-black text-cyan-300">{alert.subcategory || 'Dépannage d\'urgence'}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Quartier</span>
                <span className="text-sm font-black text-white flex items-center gap-1 justify-end">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{alert.district || 'Casablanca'}</span>
                </span>
              </div>
            </div>

            {/* Estimated Budget & Access Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">Fourchette Devis :</span>
                <span className="font-mono font-black text-emerald-400 text-sm">
                  {alert.estimated_price_min || 120} - {alert.estimated_price_max || 180} DH
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">Délai souhaité :</span>
                <span className="font-bold text-amber-300 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Immédiat (&lt; 30 min)</span>
                </span>
              </div>
            </div>

            {/* Access Precision Note */}
            {alert.access_details && (
              <p className="text-[11px] text-amber-300/90 italic bg-amber-950/30 p-2 rounded-lg border border-amber-500/30">
                ✍️ "{alert.access_details}"
              </p>
            )}

            {/* Client Audio Note (Darija / FR) */}
            {alert.audio_note_url && (
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/40 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={toggleAudio}
                    className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)] flex-shrink-0 cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </motion.button>
                  <div>
                    <p className="text-xs font-bold text-white">Note Vocale du Client</p>
                    <p className="text-[10px] text-cyan-300">Écoutez les explications de la panne</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
                  {isPlayingAudio ? 'Lecture 🔊' : 'Darija / FR 🎙️'}
                </span>
              </div>
            )}

            {/* Photo Preview if available */}
            {alert.description_photo && (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 max-h-36">
                <img
                  src={alert.description_photo}
                  alt="Panne"
                  className="w-full h-36 object-cover"
                />
                <span className="absolute bottom-1 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-cyan-300">
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
              className="w-full sm:w-1/3 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-cyan-500/30 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Ignorer</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              disabled={accepting}
              onClick={handleAcceptClick}
              className="w-full sm:w-2/3 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-black text-sm rounded-2xl shadow-[0_0_30px_rgba(52,211,153,0.5)] border border-emerald-300/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>{accepting ? 'Déblocage en cours...' : 'ACCEPTER L\'INTERVENTION (-15 DH)'}</span>
              <ChevronRight className="w-4 h-4 text-emerald-200" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
