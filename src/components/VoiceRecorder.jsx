import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause, Trash2, Volume2, RotateCcw } from 'lucide-react';
import { Microphone, Play as PhosphorPlay, Pause as PhosphorPause, Trash, SpeakerHigh } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

export const VoiceRecorder = ({ onAudioRecorded, audioUrl, onClearAudio }) => {
  const { t } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Démarrer l'enregistrement réel par micro
  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecordingTime(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm';
        
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(audioBlob);
          onAudioRecorded(url);
        };

        mediaRecorderRef.current.start(200);
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
      } else {
        simulateRecording();
      }
    } catch (err) {
      console.warn('Microphone permission denied or not supported, using simulation mode.', err);
      simulateRecording();
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    let seconds = 0;
    timerRef.current = setInterval(() => {
      seconds += 1;
      setRecordingTime(seconds);
      if (seconds >= 6) {
        stopRecording();
      }
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    } else {
      onAudioRecorded('sample-simulated-audio-note');
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
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
      setDuration(audioRef.current.duration || recordingTime || 6);
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor((totalSeconds || 0) / 60);
    const secs = Math.floor((totalSeconds || 0) % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs text-slate-900 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Microphone weight="duotone" className="w-4 h-4 text-blue-600" />
          <span>Message Vocal / تسجيل صوتي (Darija / FR)</span>
        </label>
        
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-red-600 font-mono font-bold animate-pulse bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            REC {formatTime(recordingTime)} / 01:00
          </span>
        )}
      </div>

      {/* État 1 : Bouton Micro Tactile Style WhatsApp */}
      {!audioUrl && !isRecording && (
        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={startRecording}
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-sm active:scale-90 transition-all cursor-pointer flex-shrink-0"
            title="Appuyer pour enregistrer votre explication en Darija ou Français"
          >
            <Microphone weight="fill" className="w-7 h-7 animate-pulse" />
          </motion.button>

          <div className="text-center sm:text-left">
            <p className="text-xs font-extrabold text-slate-900">Appuyez sur le micro pour enregistrer</p>
            <p className="text-[11px] text-slate-500 mt-0.5" dir="rtl">
              سجل رسالة صوتية بالدارجة كتشرح فيها المشكل ديالك بكل وضوح
            </p>
          </div>
        </div>
      )}

      {/* État 2 : Enregistrement En Cours avec Ondes Sonores */}
      {isRecording && (
        <div className="flex items-center justify-between gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs animate-pulse">
              <Microphone weight="fill" className="w-5 h-5" />
            </div>
            
            {/* Animated Sound Waveform Simulation */}
            <div className="flex items-center gap-1 h-6">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: ['20%', `${h}%`, '30%'] }}
                  transition={{ repeat: Infinity, duration: 0.5 + (i % 3) * 0.2, ease: 'easeInOut' }}
                  className="w-1 bg-red-500 rounded-full"
                />
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            <Square className="w-4 h-4 fill-current" />
            <span>Terminer</span>
          </motion.button>
        </div>
      )}

      {/* État 3 : Lecteur Audio Réel avec Réécoute & Supprimer */}
      {audioUrl && !isRecording && (
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-xs">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            onTimeUpdate={handleTimeUpdate}
            className="hidden"
          />

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={togglePlayAudio}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Écouter'}
            >
              {isPlaying ? (
                <PhosphorPause weight="fill" className="w-5 h-5" />
              ) : (
                <PhosphorPlay weight="fill" className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-700 mb-1">
                <span>{isPlaying ? 'Lecture en cours...' : 'Note Vocale Prête'}</span>
                <span>{formatTime(playbackTime || recordingTime || duration)} / {formatTime(duration || recordingTime || 6)}</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-100"
                  style={{ width: `${duration > 0 ? (playbackTime / duration) * 100 : 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
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
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
              title="Supprimer la note vocale"
            >
              <Trash className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};
