import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  User, 
  Phone, 
  ShieldCheck, 
  CreditCard, 
  LogOut, 
  X, 
  CheckCircle2, 
  MapPin, 
  Activity, 
  Wrench, 
  Edit3, 
  Save, 
  Award, 
  Sparkles,
  Star,
  Clock,
  ChevronRight,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { EnhancedCategoryIcon, getSpecialtyLabel } from './EnhancedCategoryIcon';
import { SpecialtySelect } from './SpecialtySelect';

const CITIES = [
  { name: 'Casablanca', districts: ['Maârif', 'Gauthier', 'Bourgogne', 'Ain Diab', 'Californie', 'Sidi Maârouf', 'Oasis', 'Centre Ville'] },
  { name: 'Rabat', districts: ['Agdal', 'Hay Riad', 'Hassan', 'Souissi', 'Les Orangers', 'Aviation'] },
  { name: 'Marrakech', districts: ['Guéliz', 'Hivernage', 'Palmeraie', 'Médina', 'Targa', 'Mhamid'] },
  { name: 'Fès', districts: ['Ville Nouvelle', 'Narjiss', 'Atlas', 'Route d\'Immouzzer', 'Médina'] },
  { name: 'Tanger', districts: ['Malabata', 'Centre Ville', 'Iberia', 'Boubana', 'Marchane', 'Achakar'] },
  { name: 'Agadir', districts: ['Sonaba', 'Haut Founty', 'Talborjt', 'Dakhla', 'Bensergao'] }
];

export const UserProfileModal = ({ isOpen, onClose, onLoggedOut, onOpenEditProfile }) => {
  const { user, setUser, logout } = useAuth();
  const { interventions = [] } = useApp();

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'edit' | 'stats'
  
  // Edit Form State
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [selectedCity, setSelectedCity] = useState(user?.city_zone?.split(' - ')[0] || 'Casablanca');
  const [selectedDistrict, setSelectedDistrict] = useState(user?.city_zone?.split(' - ')[1] || 'Maârif');
  const [specialty, setSpecialty] = useState(user?.maalem_details?.specialty || 'PLUMBING');
  const [saving, setSaving] = useState(false);

  if (!isOpen || !user) return null;

  const handleLogout = async () => {
    await logout(() => {
      onClose();
      if (onLoggedOut) onLoggedOut();
    });
  };

  const isMaalem = user?.role?.toUpperCase() === 'MAALEM';
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';
  const myClientInterventions = interventions.filter((i) => {
    let myCreated = [];
    try {
      myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
    } catch (e) {}
    if (myCreated.includes(String(i.id).trim())) return true;
    if (!user) return false;
    const isOwnerById = user.id && user.id !== DUMMY_CLIENT_ID && i.client_id && i.client_id !== DUMMY_CLIENT_ID && String(i.client_id).trim() === String(user.id).trim();
    const cp = String(user.phone || '').replace(/\D/g, '');
    const ip = String(i.client_phone || '').replace(/\D/g, '');
    const isOwnerByPhone = cp.length >= 8 && ip.length >= 8 && cp === ip && cp !== '0661234567';
    return isOwnerById || isOwnerByPhone;
  });

  const completedCount = myClientInterventions.filter(i => i.status === 'COMPLETED').length;
  const activeCount = myClientInterventions.filter(i => i.status === 'PENDING' || i.status === 'ACCEPTED' || i.status === 'IN_PROGRESS' || i.status === 'PENDING_COMPLETION').length;

  const currentCityObj = CITIES.find(c => c.name === selectedCity) || CITIES[0];

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fullCityZone = `${selectedCity} - ${selectedDistrict}`;

    try {
      const updatedUser = {
        ...user,
        full_name: fullName.trim() || user.full_name,
        phone: phone.trim() || user.phone,
        city_zone: fullCityZone,
      };

      if (isMaalem) {
        updatedUser.maalem_details = {
          ...(user?.maalem_details || {}),
          specialty: specialty
        };
      }

      // Sync Supabase `profiles` & `maalem_details`
      if (isSupabaseConfigured && user?.id) {
        await supabase
          .from('profiles')
          .update({
            full_name: updatedUser.full_name,
            phone: updatedUser.phone,
            city_zone: fullCityZone
          })
          .eq('id', user.id);

        if (isMaalem) {
          await supabase
            .from('maalem_details')
            .update({ specialty })
            .eq('id', user.id);
        }
      }

      setUser(updatedUser);
      toast.success('✨ Vos coordonnées ont été enregistrées avec succès !');
      setActiveTab('info');
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          className="bg-slate-950 border border-cyan-500/40 rounded-3xl max-w-md w-full p-4 sm:p-6 max-h-modal overflow-y-auto modal-scroll shadow-[0_0_40px_rgba(6,182,212,0.25)] relative text-slate-100 space-y-4 sm:space-y-5"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Avatar & Role Badge */}
          <div className="flex items-center gap-4 pt-1">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-400/50 flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                {isMaalem ? (
                  <EnhancedCategoryIcon type={specialty} className="w-9 h-9" />
                ) : (
                  (user.full_name?.charAt(0) || 'U').toUpperCase()
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-md"></span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black text-white truncate">{user.full_name || 'Utilisateur'}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${
                  isAdmin 
                    ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                    : isMaalem 
                    ? 'bg-amber-950 text-amber-300 border-amber-500/40' 
                    : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                }`}>
                  {isAdmin ? '🛡️ Administrateur' : isMaalem ? `🛠️ ${getSpecialtyLabel(specialty)}` : '👤 Client Particulier'}
                </span>

                {isMaalem ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Numéro Vérifié (SMS)
                  </span>
                ) : (
                  (user.phone && user.phone.length >= 8) ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Mobile Vérifié (OTP)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-700">
                      Standard
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl border border-cyan-500/20">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coordonnées
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'edit'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Modifier</span>
            </button>
            {!isMaalem && (
              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Activité SOS
              </button>
            )}
          </div>

          {/* Tab 1: Informations View */}
          {activeTab === 'info' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
              <div className="bg-slate-900/90 border border-cyan-500/20 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-300">Téléphone Mobile</span>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 dir-ltr">{user.phone || '+212600000000'}</span>
              </div>

              <div className="bg-slate-900/90 border border-cyan-500/20 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-300">Ville & Quartier</span>
                </div>
                <span className="text-xs font-bold text-slate-100">{user.city_zone || 'Casablanca - Maarif'}</span>
              </div>

              {!isMaalem && (
                <div className="bg-slate-900/90 border border-cyan-500/20 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-300">Historique d'Urgences</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                    {myClientInterventions.length} demande{myClientInterventions.length > 1 ? 's' : ''} SOS
                  </span>
                </div>
              )}

              {isMaalem && (
                <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-300">Solde de Crédits Leads</span>
                  </div>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {user.maalem_details?.credit_balance?.toFixed(2) || '15.00'} DH
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 2: Edit Form */}
          {activeTab === 'edit' && (
            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nom Complet :</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Votre nom complet"
                  className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              {/* Téléphone Mobile Verrouillé & Protégé */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">Téléphone Mobile :</label>
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                    <Lock className="w-3 h-3" /> Clé de Sécurité OTP
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={user?.phone || '+212600000000'}
                    readOnly
                    disabled
                    className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-slate-400 text-xs font-mono cursor-not-allowed select-none"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1 italic">
                  🛡️ Numéro certifié par SMS OTP. Impossible à modifier directement pour garantir la traçabilité des interventions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ville :</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      const city = CITIES.find(c => c.name === e.target.value);
                      if (city && city.districts[0]) setSelectedDistrict(city.districts[0]);
                    }}
                    className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Quartier :</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    {currentCityObj.districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {isMaalem && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Spécialité :</label>
                  <SpecialtySelect value={specialty} onChange={setSpecialty} />
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer les Modifications'}</span>
              </motion.button>
            </motion.form>
          )}

          {/* Tab 3: Stats View */}
          {activeTab === 'stats' && !isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900/90 border border-cyan-500/20 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-cyan-300 font-mono">{myClientInterventions.length}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">SOS Totaux</div>
                </div>
                <div className="bg-slate-900/90 border border-emerald-500/20 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-emerald-300 font-mono">{completedCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Clôturés</div>
                </div>
                <div className="bg-slate-900/90 border border-amber-500/20 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-amber-300 font-mono">{activeCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">En Cours</div>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-cyan-500/20 p-3 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Garantie Intervention BricoleMoi</p>
                  <p className="text-[11px] text-slate-400">Tous vos chantiers sont protégés par notre protocole d'arbitrage et de contrôle qualité.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Logout Action Button */}
          <div className="pt-2 border-t border-slate-900">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>Se Déconnecter & Revenir à l'Accueil</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
