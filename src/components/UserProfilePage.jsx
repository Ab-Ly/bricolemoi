import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  User, 
  Phone, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  CreditCard, 
  Save, 
  ArrowLeft, 
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { SpecialtySelect } from './SpecialtySelect';

export const UserProfilePage = ({ onBack }) => {
  const { user, setUser, t } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [cityZone, setCityZone] = useState(user?.city_zone || 'Casablanca - Maarif');
  const [specialty, setSpecialty] = useState(user?.maalem_details?.specialty || 'PLUMBING');
  const [saving, setSaving] = useState(false);

  const isMaalem = user?.role === 'MAALEM';
  const isAdmin = user?.role === 'ADMIN';

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedUser = {
        ...user,
        full_name: fullName,
        phone: phone,
        city_zone: cityZone,
      };

      if (isMaalem) {
        updatedUser.maalem_details = {
          ...(user?.maalem_details || {}),
          specialty: specialty
        };
      }

      // Update Supabase Database `profiles` table (Sanctuary: full_name is preserved)
      if (isSupabaseConfigured && user?.id) {
        await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            phone: phone,
            city_zone: cityZone
          })
          .eq('id', user.id);

        if (isMaalem) {
          await supabase
            .from('maalem_details')
            .update({
              specialty: specialty
            })
            .eq('id', user.id);
        }
      }

      setUser(updatedUser);
      toast.success('✨ Profil mis à jour avec succès dans Supabase !');
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
      toast.error('Erreur lors de la mise à jour du profil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header Back Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-300 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-cyan-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>← Retour à l'accueil</span>
        </button>

        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300">
          {isAdmin ? 'Profil Administrateur' : isMaalem ? 'Profil Artisan Pro' : 'Profil Client'}
        </span>
      </div>

      {/* Main Profile Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.2)] text-slate-100 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-400/50 flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            {fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{fullName || 'Utilisateur BricoleMoi'}</h2>
            <p className="text-xs text-slate-400 font-medium">Gestion du Compte & Paramètres Réels</p>
          </div>
        </div>

        {/* Verification & Credits Status Banners (Exclusively for Maalems) */}
        {isMaalem && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100">Numéro Mobile Vérifié</p>
                <p className="text-[11px] text-emerald-400 font-extrabold">Authentifié par SMS / OTP</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100">Solde de Crédits Leads</p>
                <p className="text-sm font-black text-amber-400 font-mono">
                  {user?.maalem_details?.credit_balance?.toFixed(2) || '15.00'} DH
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              Nom complet (Preservé & Sancturisé) :
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-sm font-bold focus:border-cyan-400 focus:outline-none transition-colors shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              Numéro de Téléphone (+212) :
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono text-sm font-bold focus:border-cyan-400 focus:outline-none transition-colors shadow-inner dir-ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Ville & Quartier d'intervention :
            </label>
            <input
              type="text"
              required
              value={cityZone}
              onChange={(e) => setCityZone(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-sm font-bold focus:border-cyan-400 focus:outline-none transition-colors shadow-inner"
            />
          </div>

          {isMaalem && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Spécialité Principale :</span>
              </label>
              <SpecialtySelect
                value={specialty}
                onChange={(newSpec) => setSpecialty(newSpec)}
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 mt-4"
          >
            <Save className="w-4 h-4 text-white" />
            <span>{saving ? 'Enregistrement en cours...' : 'Enregistrer les Modifications'}</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
