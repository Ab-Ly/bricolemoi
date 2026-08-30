// Web Audio API Sound Synthesizer & Vibration API for Realtime Notifications

let sharedAudioCtx = null;
let activeSirenInterval = null;

const getSharedAudioCtx = () => {
  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
  } catch (e) {}
  return sharedAudioCtx;
};

/**
 * Joue un son de notification ponctuel
 * @param {'emergency' | 'unlock' | 'success' | 'alert'} type
 */
export const playNotificationSound = (type = 'emergency') => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;

    if (type === 'emergency' || type === 'alert') {
      // Alarme d'urgence : deux impulsions aiguës montantes (880 Hz -> 1046 Hz)
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6
      osc.frequency.setValueAtTime(880, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'unlock' || type === 'success') {
      // Carillon de succès harmonieux (523 Hz -> 659 Hz -> 784 Hz)
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(784.00, now + 0.2); // G5

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (err) {
    console.warn('[Audio] Warning:', err);
  }
};

/**
 * Déclenche une vibration sur le téléphone (Vibration API)
 * @param {number | number[]} pattern
 */
export const triggerVibration = (pattern = [300, 200, 300, 200, 500]) => {
  try {
    if (
      typeof window !== 'undefined' &&
      'navigator' in window &&
      typeof navigator.vibrate === 'function' &&
      (!navigator.userActivation || navigator.userActivation.hasBeenActive)
    ) {
      navigator.vibrate(pattern);
    }
  } catch (e) {}
};

/**
 * Démarre une sonnerie / sirène d'urgence continue en boucle
 * jusqu'à ce que le Maâlem accepte ou ignore l'alerte.
 */
export const startEmergencySiren = () => {
  stopEmergencySiren();
  triggerVibration([400, 200, 400, 200, 600]);
  playNotificationSound('emergency');

  activeSirenInterval = setInterval(() => {
    playNotificationSound('emergency');
    triggerVibration([400, 200, 400, 200, 600]);
  }, 1800);
};

/**
 * Arrête immédiatement la sirène d'urgence et les vibrations
 */
export const stopEmergencySiren = () => {
  if (activeSirenInterval) {
    clearInterval(activeSirenInterval);
    activeSirenInterval = null;
  }
  if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(0);
    } catch (e) {}
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'running') {
    try {
      sharedAudioCtx.suspend().catch(() => {});
    } catch (e) {}
  }
};

