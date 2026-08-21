import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, CheckCircle2, Volume2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { 
  isPushSupported, 
  getNotificationPermissionState, 
  subscribeUserToPush, 
  testPushNotification 
} from '../../lib/pushNotificationService';
import { notify } from '../../lib/notify';

export const PushNotificationBanner = ({ user }) => {
  const [supported, setSupported] = useState(false);
  const [permissionState, setPermissionState] = useState('default');
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isSupp = isPushSupported();
    setSupported(isSupp);
    if (isSupp) {
      setPermissionState(getNotificationPermissionState());
    }
  }, []);

  if (!supported || dismissed) return null;

  const isGranted = permissionState === 'granted';

  const handleActivatePush = async () => {
    setLoading(true);
    try {
      const result = await subscribeUserToPush(user);
      if (result.success) {
        setPermissionState('granted');
        notify.success('Alertes Activées 🔔', 'Vous recevrez les urgences même écran verrouillé.');
        testPushNotification();
      } else if (result.permission === 'denied') {
        setPermissionState('denied');
        notify.error('Notifications Bloquées', 'Veuillez autoriser les notifications dans les paramètres de votre navigateur.');
      }
    } catch (err) {
      notify.error('Erreur', err.message || 'Impossible d\'activer les alertes.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async () => {
    await testPushNotification();
    notify.info('Test envoyé 🔊', 'Sonnerie et vibration d\'alerte déclenchées.');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-4"
      >
        <div className={`p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
          isGranted
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : permissionState === 'denied'
            ? 'bg-slate-100 border-slate-200 text-slate-700'
            : 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-200 text-slate-800'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                isGranted
                  ? 'bg-emerald-600 text-white'
                  : permissionState === 'denied'
                  ? 'bg-slate-300 text-slate-700'
                  : 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-amber-500/30'
              }`}>
                {isGranted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <BellRing className="w-5 h-5 animate-bounce" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-slate-900 tracking-tight">
                    {isGranted
                      ? 'Alertes d\'urgence actives ⚡'
                      : permissionState === 'denied'
                      ? 'Notifications désactivées'
                      : 'Ne manquez aucune urgence client ! 🚨'}
                  </h4>
                  {isGranted && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Son & Vibration Prêts
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed max-w-xl">
                  {isGranted
                    ? 'Votre téléphone sonnera et vibrera dès qu\'un client demande un dépannage dans votre zone.'
                    : permissionState === 'denied'
                    ? 'Vous avez bloqué les notifications. Pour être alerté des missions, réactivez-les dans les paramètres de votre navigateur.'
                    : 'Activez les notifications sonores pour être réveillé instantanément quand une mission SOS est disponible à proximité, même écran verrouillé.'}
                </p>

                {/* Actions Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 mt-3">
                  {!isGranted && permissionState !== 'denied' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleActivatePush}
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{loading ? 'Activation...' : 'Activer les alertes sonores'}</span>
                    </motion.button>
                  )}

                  {isGranted && (
                    <button
                      type="button"
                      onClick={handleTestNotification}
                      className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tester le son d'alerte</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
