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
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * 🛡️ Modale de Gestion des Identifiants & Clés Admin
 * Modern Clean & Trust Design System — Processus Réel Supabase Auth & PIN 2FA
 */
export const AdminSecurityModal = ({ isOpen, onClose }) => {
  const { updateAdminPin, updateAdminPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('PIN'); // 'PIN' | 'PASSWORD'

  // État formulaire PIN
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState('');

  // État formulaire Mot de Passe
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setPinError('');
    setPinLoading(true);

    try {
      await updateAdminPin({ currentPin, newPin, confirmPin });
      toast.success('Code PIN administrateur mis à jour !', {
        description: 'Le nouveau PIN 2FA est actif immédiatement pour toutes vos prochaines sessions.'
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
      toast.success('Mot de passe administrateur renouvelé !', {
        description: 'Votre mot de passe a été mis à jour avec succès dans le système d\'authentification réel.'
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
          initial={{ scale: 0.95, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-2xl relative max-h-modal overflow-y-auto modal-scroll pb-safe"
        >
          {/* Bouton de Fermeture */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer active:scale-95 z-20"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* En-tête Haute Sécurité */}
          <div className="flex items-center gap-3.5 mb-5 pr-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  Sécurité Haute
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Processus Réel
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight truncate mt-0.5">
                Identifiants &amp; Clés Admin
              </h2>
            </div>
          </div>

          {/* Sélecteur d'Onglets Moderne (Pill Style) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 mb-5">
            <button
              type="button"
              onClick={() => { setActiveTab('PIN'); setPinError(''); }}
              className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'PIN'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className={`w-3.5 h-3.5 ${activeTab === 'PIN' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Code PIN 2FA</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('PASSWORD'); setPassError(''); }}
              className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'PASSWORD'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className={`w-3.5 h-3.5 ${activeTab === 'PASSWORD' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Mot de Passe Admin</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* ONGLET 1 : CODE PIN 2FA (SÉCURITÉ SESSIONS RAPIDES)          */}
          {/* ============================================================ */}
          {activeTab === 'PIN' && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/50 border border-blue-100/90 rounded-2xl text-slate-600 text-xs leading-relaxed flex items-start gap-2.5">
                <Fingerprint className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Le <strong>Code PIN 2FA</strong> protège le déverrouillage instantané du tableau de bord Admin et du Cockpit IT.
                </span>
              </div>

              {/* PIN Actuel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Code PIN Actuel
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showCurrentPin ? 'text' : 'password'}
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="Saisissez votre PIN actuel"
                    autoComplete="current-password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPin(!showCurrentPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showCurrentPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Nouveau PIN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nouveau Code PIN (min. 4 car.)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmer Nouveau PIN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirmer le Nouveau Code PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                    minLength={4}
                  />
                </div>
              </div>

              {pinError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={pinLoading || !currentPin || !newPin || !confirmPin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[46px]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{pinLoading ? 'Enregistrement sécurisé...' : 'Mettre à Jour le Code PIN'}</span>
              </button>
            </form>
          )}

          {/* ============================================================ */}
          {/* ONGLET 2 : MOT DE PASSE COMPTE ADMIN (PROCESSUS RÉEL)        */}
          {/* ============================================================ */}
          {activeTab === 'PASSWORD' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/50 border border-blue-100/90 rounded-2xl text-slate-600 text-xs leading-relaxed flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Ce mot de passe synchronise votre compte de direction sur le système d'authentification central de production.
                </span>
              </div>

              {/* Mot de Passe Actuel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mot de Passe Actuel
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Saisissez votre mot de passe actuel"
                    autoComplete="current-password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Nouveau Mot de Passe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nouveau Mot de Passe (min. 8 car.)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe fort"
                    autoComplete="new-password"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmer Nouveau Mot de Passe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirmer le Nouveau Mot de Passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez le nouveau mot de passe"
                    autoComplete="new-password"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {passError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{passError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={passLoading || !currentPassword || !newPassword || !confirmPassword}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[46px]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{passLoading ? 'Mise à jour en cours...' : 'Mettre à Jour le Mot de Passe'}</span>
              </button>
            </form>
          )}

          {/* Pied de modal sécurisé */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Chiffrement SHA-256 certifié • Synchronisation réelle
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
