import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  X, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Database
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminSecurityModal = ({ isOpen, onClose }) => {
  const { updateAdminPin, updateAdminPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('PIN'); // 'PIN' | 'PASSWORD'

  // État formulaire PIN
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState('');

  // État formulaire Mot de Passe
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setPinError('');
    setPinLoading(true);

    try {
      await updateAdminPin({ currentPin, newPin, confirmPin });
      toast.success('Code PIN administrateur mis à jour avec succès !', {
        description: 'Le nouveau PIN est actif immédiatement pour toutes vos prochaines sessions.'
      });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      onClose();
    } catch (err) {
      setPinError(err.message || 'Erreur lors de la mise à jour du code PIN.');
    } finally {
      setPinLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassLoading(true);

    try {
      await updateAdminPassword({ currentPassword, newPassword, confirmPassword });
      toast.success('Mot de passe administrateur mis à jour avec succès !', {
        description: 'Le mot de passe de la console PocketBase et Supabase a été renouvelé.'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      setPassError(err.message || 'Erreur lors de la modification du mot de passe.');
    } finally {
      setPassLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-7 shadow-2xl relative max-h-modal overflow-y-auto modal-scroll pb-safe"
        >
          {/* Bouton de Fermeture */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer touch-target-44 active:scale-95 z-20"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* En-tête */}
          <div className="flex items-center gap-3.5 mb-5 pr-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                  Sécurité Haute
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight truncate">
                Identifiants &amp; Clés Admin
              </h2>
            </div>
          </div>

          {/* Sélecteur d'Onglets */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 mb-5">
            <button
              type="button"
              onClick={() => { setActiveTab('PIN'); setPinError(''); }}
              className={`flex-1 py-2.5 min-h-[44px] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-target-44 ${
                activeTab === 'PIN'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Code PIN 2FA</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('PASSWORD'); setPassError(''); }}
              className={`flex-1 py-2.5 min-h-[44px] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-target-44 ${
                activeTab === 'PASSWORD'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Mot de Passe Admin</span>
            </button>
          </div>

          {/* ONGLET 1 : CODE PIN */}
          {activeTab === 'PIN' && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-slate-600 text-[11px] leading-relaxed">
                Le code PIN de session 2FA protège l'accès rapide au Dashboard Administrateur et au Cockpit IT.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Code PIN Actuel
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="PIN actuel (ex: 2026 ou admin2026)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nouveau Code PIN (min. 4 car.)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-purple-50/40 border border-purple-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                    minLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirmer le Nouveau Code PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-purple-50/40 border border-purple-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                    minLength={4}
                  />
                </div>
              </div>

              {pinError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={pinLoading || !currentPin || !newPin || !confirmPin}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-purple-500/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{pinLoading ? 'Mise à jour en cours...' : 'Enregistrer le Nouveau Code PIN'}</span>
              </button>
            </form>
          )}

          {/* ONGLET 2 : MOT DE PASSE SUPERUSER */}
          {activeTab === 'PASSWORD' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
                <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Ce mot de passe synchronise la connexion Superuser sur le moteur PocketBase et la console d'administration.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mot de Passe Actuel
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Mot de passe actuel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nouveau Mot de Passe (min. 8 car.)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe fort"
                    className="w-full bg-purple-50/40 border border-purple-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirmer le Nouveau Mot de Passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez le nouveau mot de passe"
                    className="w-full bg-purple-50/40 border border-purple-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {passError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{passError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={passLoading || !currentPassword || !newPassword || !confirmPassword}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{passLoading ? 'Modification en cours...' : 'Mettre à Jour le Mot de Passe'}</span>
              </button>
            </form>
          )}

          {/* Pied de modal */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-purple-500" />
              Chiffrement instantané • Persistance VPS Debian sécurisée
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
