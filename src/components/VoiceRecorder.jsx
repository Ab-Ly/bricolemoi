import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Square, AlertCircle } from 'lucide-react';
import { Microphone, Play as PhosphorPlay, Pause as PhosphorPause, Trash, SpeakerHigh } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import { uploadMediaToR2, blobToDataUrl } from '../lib/r2StorageService';
import { notify } from '../lib/notify';

// Helper de détection multi-plateforme robuste (iOS Safari, Android Chrome, Desktop)
const getSupportedMimeType = () => {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') return '';
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/aac',
    'audio/ogg;codecs=opus',
    'audio/wav'
  ];
  for (const candidate of candidates) {
    try {
      if (MediaRecorder.isTypeSupported(candidate)) {
        return candidate;
      }
    } catch (e) {}
  }
  return '';
};

export const VoiceRecorder = ({ onAudioRecorded, audioUrl, onClearAudio }) => {
  const { lang } = useAuth();
  const isAr = lang === 'ar';

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState([25, 40, 20, 50, 30, 60, 35, 45, 20, 30]);
  const [micError, setMicError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Analyse en temps réel du volume du micro pour animer les barres
  const startVolumeAnalyser = (stream) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 32;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevels = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const sampledBars = [
          dataArray[1] || 20,
          dataArray[2] || 40,
          dataArray[3] || 25,
          dataArray[4] || 60,
          dataArray[5] || 35,
          dataArray[6] || 80,
          dataArray[7] || 45,
          dataArray[8] || 30,
          dataArray[9] || 50,
          dataArray[10] || 20
        ].map(val => Math.max(15, Math.min(100, Math.round((val / 255) * 100))));

        setAudioLevels(sampledBars);
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();
    } catch (e) {
      console.warn('[AudioContext] Visualizer notice:', e);
    }
  };

  // Démarrer l'enregistrement par micro
  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    setRecordingTime(0);

    // Vibration haptique
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("L'enregistrement audio n'est pas supporté sur ce navigateur.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      const selectedMime = getSupportedMimeType();
      let recorder;
      try {
        recorder = selectedMime ? new MediaRecorder(stream, { mimeType: selectedMime }) : new MediaRecorder(stream);
      } catch (mimeErr) {
        recorder = new MediaRecorder(stream);
      }
      mediaRecorderRef.current = recorder;

      startVolumeAnalyser(stream);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const finalMime = recorder.mimeType || selectedMime || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: finalMime });

        if (audioBlob.size > 0) {
          // 1. Conversion DataURL immédiate garantie
          try {
            const dataUrl = await blobToDataUrl(audioBlob);
            if (dataUrl) {
              onAudioRecorded(dataUrl);
            }
          } catch (convErr) {
            const blobUrl = URL.createObjectURL(audioBlob);
            onAudioRecorded(blobUrl);
          }

          // 2. Upload R2 asynchrone en arrière-plan
          uploadMediaToR2(audioBlob, 'audio_notes')
            .then((r2Url) => {
              if (r2Url && r2Url.startsWith('http')) {
                onAudioRecorded(r2Url);
              }
            })
            .catch(() => {});
        }

        // Arrêter proprement toutes les pistes audio du micro
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }
      };

      recorder.start(150);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.warn('[VoiceRecorder] Micro info:', err.name);
      const isPermissionDenied = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      const isNotFound = err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError';
      const errorMsg = isPermissionDenied
        ? (isAr ? 'يرجى السماح بالوصول إلى الميكروفون في متصفحك' : 'Veuillez autoriser l\'accès au microphone dans les réglages de votre navigateur')
        : isNotFound
        ? (isAr ? 'لم يتم العثور على ميكروفون في هذا الجهاز' : 'Aucun microphone détecté sur cet appareil (branchez un micro ou utilisez un smartphone)')
        : (isAr ? 'تعذر تشغيل الميكروفون' : 'Impossible de démarrer l\'enregistrement vocal');
      
      setMicError(errorMsg);
      notify.error(errorMsg);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    // Vibration haptique
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(60);
    }

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }

    if (timerRef.current) clearInterval(timerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    setIsRecording(false);
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('[Audio Playback] Error:', err);
      });
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlaybackTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor((totalSeconds || 0) / 60);
    const secs = Math.floor((totalSeconds || 0) % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs text-slate-900 space-y-3 font-sans">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
          <Microphone weight="fill" className="w-4 h-4 text-blue-600" />
          <span>{isAr ? 'تسجيل صوتي (أوديو بالدارجة)' : 'Message Vocal (Darija / FR)'}</span>
        </label>
        
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-red-600 font-mono font-black animate-pulse bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            REC {formatTime(recordingTime)} / 01:00
          </span>
        )}
      </div>

      {/* Erreur de Permission Micro */}
      {micError && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span className="font-medium">{micError}</span>
        </div>
      )}

      {/* État 1 : Bouton Micro Style WhatsApp */}
      {!audioUrl && !isRecording && (
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <motion.button
            whileTap={{ scale: 0.90 }}
            whileHover={{ scale: 1.03 }}
            type="button"
            onClick={startRecording}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 active:scale-90 transition-all cursor-pointer shrink-0"
            title="Appuyer pour enregistrer votre message vocal"
          >
            <Microphone weight="fill" className="w-6 h-6" />
          </motion.button>

          <div className="min-w-0">
            <p className="text-xs font-black text-slate-900 leading-snug">
              {isAr ? 'اضغط لتسجيل المشكل ديالك بصوتك' : 'Touchez le micro pour expliquer la panne'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5" dir={isAr ? 'rtl' : 'ltr'}>
              {isAr ? 'شرح بالدارجة كيسهل على المعلم يفهم بسرعة' : 'Expliquez en Darija ou Français pour aider le Maâlem'}
            </p>
          </div>
        </div>
      )}

      {/* État 2 : Enregistrement En Cours avec Visualiseur Audio en Direct */}
      {isRecording && (
        <div className="flex items-center justify-between gap-3 p-3.5 bg-red-50 border border-red-200 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 animate-pulse">
              <Microphone weight="fill" className="w-5 h-5" />
            </div>
            
            {/* Spectre Audio Réactif au volume du micro */}
            <div className="flex items-center gap-1 h-7">
              {audioLevels.map((lvl, i) => (
                <motion.span
                  key={i}
                  animate={{ height: `${lvl}%` }}
                  transition={{ duration: 0.08 }}
                  className="w-1.5 bg-red-500 rounded-full"
                  style={{ minHeight: '6px' }}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={stopRecording}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>{isAr ? 'إيقاف' : 'Terminer'}</span>
          </motion.button>
        </div>
      )}

      {/* État 3 : Lecteur Audio avec Réécoute & Barre de Progression */}
      {audioUrl && !isRecording && (
        <div className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => {
              if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
                setDuration(audioRef.current.duration);
              }
            }}
            preload="metadata"
            className="hidden"
          />

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={togglePlayAudio}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Écouter'}
            >
              {isPlaying ? (
                <PhosphorPause weight="fill" className="w-4 h-4" />
              ) : (
                <PhosphorPlay weight="fill" className="w-4 h-4 ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-blue-700 mb-1">
                <span>{isPlaying ? (isAr ? 'جاري الاستماع...' : 'Lecture...') : (isAr ? 'جاهز للإرسال' : 'Note Vocale Prête')}</span>
                <span>{formatTime(playbackTime || recordingTime || duration)} / {formatTime(duration || recordingTime || 6)}</span>
              </div>
              
              {/* Barre de progression */}
              <div 
                className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 cursor-pointer"
                onClick={(e) => {
                  if (!audioRef.current || !duration) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  audioRef.current.currentTime = newTime;
                  setPlaybackTime(newTime);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-100"
                  style={{ width: `${duration > 0 ? (playbackTime / duration) * 100 : 100}%` }}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.90 }}
            type="button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
              setIsPlaying(false);
              setPlaybackTime(0);
              onClearAudio();
            }}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer flex-shrink-0"
            title="Supprimer la note vocale"
          >
            <Trash className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
};
