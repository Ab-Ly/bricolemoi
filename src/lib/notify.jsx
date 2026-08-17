import React from 'react';
import { toast } from 'sonner';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Zap, 
  Coins, 
  ShieldCheck, 
  Car, 
  MapPin, 
  Star, 
  Wrench,
  Sparkles,
  Bell,
  X
} from 'lucide-react';
import { playNotificationSound, triggerVibration } from './audioNotifier';

// =========================================================================
// 1. Cache de déduplication anti-double notification (TTL 3.5s)
// =========================================================================
const recentNotifications = new Map();

const shouldSkipDuplicate = (key, cooldownMs = 3500) => {
  if (!key) return false;
  const now = Date.now();
  const lastTime = recentNotifications.get(key);
  if (lastTime && (now - lastTime) < cooldownMs) {
    return true;
  }
  recentNotifications.set(key, now);
  // Nettoyage automatique des anciennes entrées
  if (recentNotifications.size > 80) {
    for (const [k, time] of recentNotifications.entries()) {
      if (now - time > 15000) recentNotifications.delete(k);
    }
  }
  return false;
};

// =========================================================================
// 2. Queue d'échelonnement séquentiel ("Un après un" avec cascade fluide)
// =========================================================================
const notificationQueue = [];
let isProcessingQueue = false;
const STAGGER_DELAY_MS = 380; // Délai d'échelonnement entre deux popups consécutives

const processQueue = () => {
  if (notificationQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }
  isProcessingQueue = true;
  const nextNotification = notificationQueue.shift();
  if (typeof nextNotification === 'function') {
    try {
      nextNotification();
    } catch (e) {
      console.warn('[Notify] Erreur execution toast:', e);
    }
  }
  setTimeout(() => {
    processQueue();
  }, STAGGER_DELAY_MS);
};

const enqueueToast = (toastTriggerFn) => {
  notificationQueue.push(toastTriggerFn);
  if (!isProcessingQueue) {
    processQueue();
  }
};

// =========================================================================
// 3. Unified Dark Sci-Fi Glassmorphism Cascading Notification System
// =========================================================================
export const notify = {
  /**
   * Success Notification (Neon Emerald Glow)
   */
  success: (title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('unlock');
        triggerVibration(50);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(52,211,153,0.25)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(52,211,153,1)]" />
          {/* Ambient light bubble */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(52,211,153,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
              {options.badge && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-300 shadow-inner">
                  {options.badge}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 5000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * Info Notification (Neon Cyan Glow)
   */
  info: (title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('info');
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.25)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,1)]" />
          {/* Ambient light bubble */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              <Info className="w-5 h-5 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
              {options.badge && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 shadow-inner">
                  {options.badge}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 5000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * Warning Notification (Neon Amber Glow)
   */
  warning: (title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('warning');
        triggerVibration(100);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-amber-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(251,191,36,0.25)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_rgba(251,191,36,1)]" />
          {/* Ambient light bubble */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-950/90 border border-amber-500/50 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-amber-300 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * Error Notification (Neon Rose Glow)
   */
  error: (title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('error');
        triggerVibration([100, 50, 100]);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-rose-500/50 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(244,63,94,0.3)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_rgba(244,63,94,1)]" />
          {/* Ambient light bubble */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-rose-950/90 border border-rose-500/50 text-rose-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(244,63,94,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5 drop-shadow-[0_0_6px_rgba(244,63,94,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-rose-300 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 7000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * SOS Emergency Notification (Neon Crimson Siren Glow with Fast Action)
   */
  sos: (title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `sos:${title}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('emergency');
        triggerVibration([200, 100, 200, 100]);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border-2 border-red-500/60 rounded-2xl p-4 shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(239,68,68,0.35)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden animate-pulse duration-1000 group">
          {/* Top siren glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-amber-400 to-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]" />
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-red-500/25 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-500/70 text-red-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.5)] mt-0.5">
              <Zap className="w-5 h-5 text-red-400 animate-bounce drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono font-black text-red-400 uppercase tracking-wider">Alerte SOS Immédiate</span>
              </div>
              <h4 className="text-sm font-black text-white leading-tight mt-0.5 truncate">
                {title}
              </h4>
              {description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
              {options.onAction && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      options.onAction();
                      toast.dismiss(t);
                    }}
                    className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95 transition-all cursor-pointer"
                  >
                    {options.actionLabel || 'Ouvrir la mission'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 10000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * Wallet & Credit Notification (Golden Amber Glow)
   */
  credit: (amountDh, newBalance, reason = 'Recharge validée', options = {}) => {
    const dedupKey = options.id || options.dedupKey || `credit:${amountDh}:${newBalance}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('coin');
        triggerVibration(50);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-amber-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(251,191,36,0.3)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_rgba(251,191,36,1)]" />
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-950/90 border border-amber-500/60 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              <Coins className="w-5 h-5 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-black text-amber-300">
                  {amountDh > 0 ? `+${amountDh} DH Crédités 💳` : 'Solde Mis à Jour'}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                {reason}
              </p>
              {newBalance !== null && newBalance !== undefined && (
                <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-500/30 inline-flex shadow-inner">
                  <span>Nouveau solde :</span>
                  <span className="text-white font-black">{parseFloat(newBalance).toFixed(2)} DH</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  },

  /**
   * Intervention Progress Tracker (Neon Cyan/Blue Glow)
   */
  progress: (step, title, description, options = {}) => {
    const dedupKey = options.id || options.dedupKey || `progress:${step}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 3500)) {
      return null;
    }

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('unlock');
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/50 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.3)] flex items-start justify-between gap-3 text-slate-100 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group">
          {/* Top accent glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,1)]" />
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)] mt-0.5 group-hover:scale-105 transition-transform">
              {step === 'ON_THE_WAY' ? (
                <Car className="w-5 h-5 animate-pulse text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
              ) : step === 'ARRIVED' ? (
                <MapPin className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
              ) : (
                <Wrench className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                {step === 'ON_THE_WAY' ? '🚗 Déplacement en cours' : step === 'ARRIVED' ? '📍 Arrivé sur Place' : '🛠️ Diagnostic'}
              </span>
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5 truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: dedupKey,
        ...options
      });
    });

    return dedupKey;
  }
};
