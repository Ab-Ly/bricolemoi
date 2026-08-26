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
import { telemetry } from './telemetry';

// =========================================================================
// 1. Cache de déduplication anti-double notification (TTL 4.5s)
// =========================================================================
const recentNotifications = new Map();

const shouldSkipDuplicate = (key, cooldownMs = 4500) => {
  if (!key) return false;
  const now = Date.now();
  const lastTime = recentNotifications.get(key);
  if (lastTime && (now - lastTime) < cooldownMs) {
    return true;
  }
  recentNotifications.set(key, now);
  // Nettoyage automatique des anciennes entrées
  if (recentNotifications.size > 100) {
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
const STAGGER_DELAY_MS = 300;

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

const enqueueToast = (toastTriggerFn, meta = null) => {
  if (meta && typeof meta === 'object') {
    try {
      telemetry.recordNotification(meta.type || 'info', meta.title || 'Notification', meta.description || '');
    } catch (e) {}
  }
  notificationQueue.push(toastTriggerFn);
  if (!isProcessingQueue) {
    processQueue();
  }
};

// =========================================================================
// 3. Unified Modern Clean & Trust Cascading Notification System
// =========================================================================
export const notify = {
  /**
   * Success Notification (Clean Emerald Badge)
   */
  success: (title, description, options = {}) => {
    const dedupKey = `success:${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('unlock');
        triggerVibration(50);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
              {options.badge && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-800 shadow-xs">
                  {options.badge}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 5000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Info Notification (Clean Blue Badge)
   */
  info: (title, description, options = {}) => {
    const dedupKey = `info:${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('info');
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              <Info className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
              {options.badge && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-800 shadow-xs">
                  {options.badge}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 5000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Warning Notification (Warm Amber Badge)
   */
  warning: (title, description, options = {}) => {
    const dedupKey = `warning:${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('warning');
        triggerVibration(100);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-amber-900 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Error Notification (Rose Alert Badge)
   */
  error: (title, description, options = {}) => {
    const dedupKey = `error:${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('error');
        triggerVibration([100, 50, 100]);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-red-900 leading-tight truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Urgent SOS Emergency Notification (Pulsing Red Card with Audio & Vibration)
   */
  emergency: (lead, onAccept, options = {}) => {
    const dedupKey = `emergency:${lead?.id || 'live'}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 5000)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('sos');
        triggerVibration([300, 150, 300, 150, 400]);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white border-2 border-red-400 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-900 relative overflow-hidden animate-pulse-subtle font-sans">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-gradient-x" />

          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 border border-red-200 flex items-center justify-center flex-shrink-0 animate-bounce-subtle">
                <Zap className="w-6 h-6 fill-red-600" />
              </div>
              <div className="min-w-0">
                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-black uppercase tracking-wider inline-block">
                  🚨 URGENCE SOS CLIENT
                </span>
                <h4 className="text-sm font-black text-slate-900 truncate mt-0.5">
                  {lead?.specialty || 'Plomberie & Dépannage'}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
              title="Ignorer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Quartier :
              </span>
              <span className="font-bold text-slate-800">
                {lead?.district || lead?.city_zone || 'Casablanca'}
              </span>
            </div>
            {lead?.distance_km && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Distance estimée :</span>
                <span className="font-mono font-bold text-blue-600">
                  À ~{lead.distance_km} km de vous
                </span>
              </div>
            )}
            {lead?.description && (
              <p className="text-slate-600 italic text-[11px] line-clamp-2 bg-white p-2 rounded-xl border border-slate-200">
                "{lead.description}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Ignorer
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t);
                if (typeof onAccept === 'function') onAccept(lead);
              }}
              className="flex-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Accepter (-15 DH)</span>
            </button>
          </div>
        </div>
      ), {
        duration: options.duration || 10000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Universal SOS / Radar Alert / Reward Notification
   */
  sos: (param1, param2, options = {}) => {
    if (typeof param1 === 'object' && param1 !== null) {
      return notify.emergency(param1, param2, options);
    }

    const title = param1 || '🚨 Alerte SOS';
    const description = param2 || '';
    const dedupKey = `sos:${title}:${description || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4000)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('sos');
        triggerVibration([200, 100, 200]);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 animate-pulse">
              <Zap className="w-5 h-5 fill-white" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
              {options.badge && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono font-bold text-amber-800 shadow-xs">
                  {options.badge}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Wallet & Credit Notification (Golden Amber Badge)
   */
  credit: (amountDh, newBalance, reason = 'Recharge validée', options = {}) => {
    const normBal = newBalance !== null && newBalance !== undefined ? parseFloat(newBalance).toFixed(2) : '';
    const dedupKey = `credit:${amountDh}:${normBal}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = `toast-credit-${amountDh}-${normBal}`;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('coin');
        triggerVibration(50);
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              <Coins className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-black text-amber-900">
                  {amountDh > 0 ? `+${amountDh} DH Crédités 💳` : 'Solde Mis à Jour'}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                {reason}
              </p>
              {newBalance !== null && newBalance !== undefined && (
                <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 inline-flex shadow-xs">
                  <span>Nouveau solde :</span>
                  <span className="text-slate-900 font-black">{parseFloat(newBalance).toFixed(2)} DH</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ), {
        duration: options.duration || 6000,
        id: toastId,
        ...options
      });
    });

    return toastId;
  },

  /**
   * Intervention Progress Tracker (Clean Blue Badge)
   */
  progress: (step, title, description, options = {}) => {
    const dedupKey = `progress:${step}:${title || ''}`;
    if (shouldSkipDuplicate(dedupKey, options.cooldownMs || 4500)) {
      return null;
    }

    const toastId = options.id || dedupKey;

    enqueueToast(() => {
      if (!options.silent) {
        playNotificationSound('unlock');
      }

      toast.custom((t) => (
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-start justify-between gap-3 text-slate-900 relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] group font-sans">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform">
              {step === 'ON_THE_WAY' ? (
                <Car className="w-5 h-5 animate-pulse text-blue-600" />
              ) : step === 'ARRIVED' ? (
                <MapPin className="w-5 h-5 text-emerald-600" />
              ) : (
                <Wrench className="w-5 h-5 text-blue-600" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                {step === 'ON_THE_WAY' ? '🚗 Déplacement en cours' : step === 'ARRIVED' ? '📍 Arrivé sur Place' : '🛠️ Diagnostic'}
              </span>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight mt-0.5 truncate">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
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
