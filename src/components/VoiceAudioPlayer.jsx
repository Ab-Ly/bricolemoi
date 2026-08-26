import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SpeakerHigh, Microphone } from '@phosphor-icons/react';

/**
 * Lecteur Audio Compact & Élégant Style WhatsApp
 * Permet au Maâlem et au Client d'écouter les notes vocales d'urgence en 1 clic.
 */
export const VoiceAudioPlayer = ({ audioUrl, title = 'Note Vocale Client (Darija)', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  if (!audioUrl) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('[Audio Play Error]:', err);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (seconds) => {
    const s = Math.floor(seconds || 0);
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl flex items-center justify-between gap-3 shadow-xs ${className}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
        className="hidden"
      />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Play/Pause Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex items-center justify-center shadow-sm flex-shrink-0 cursor-pointer transition-transform"
          title={isPlaying ? 'Pause' : 'Écouter'}
        >
          {isPlaying ? (
            <Pause weight="fill" className="w-4 h-4" />
          ) : (
            <Play weight="fill" className="w-4 h-4 ml-0.5" />
          )}
        </motion.button>

        {/* Audio Waveform / Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950 mb-1">
            <span className="flex items-center gap-1 truncate">
              <Microphone weight="fill" className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">{title}</span>
            </span>
            <span className="font-mono text-emerald-700 font-bold shrink-0">
              {formatTime(currentTime)} / {formatTime(duration || 10)}
            </span>
          </div>

          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-emerald-100/80 rounded-full overflow-hidden border border-emerald-200 cursor-pointer"
            onClick={(e) => {
              if (!audioRef.current || !duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newTime = (clickX / rect.width) * duration;
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
