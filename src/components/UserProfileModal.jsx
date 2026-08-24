import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Lock,
  Globe,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { EnhancedCategoryIcon, getSpecialtyLabel } from './EnhancedCategoryIcon';
import { SpecialtySelect } from './SpecialtySelect';
import { COUNTRY_DIAL_CODES } from '../constants/geo';

const CITIES = [
  { name: 'Casablanca', districts: ['Maârif', 'Gauthier', 'Bourgogne', 'Ain Diab', 'Californie', 'Sidi Maârouf', 'Oasis', 'Centre Ville'] },
  { name: 'Rabat', districts: ['Agdal', 'Hay Riad', 'Hassan', 'Souissi', 'Les Orangers', 'Aviation'] },
  { name: 'Marrakech', districts: ['Guéliz', 'Hivernage', 'Palmeraie', 'Médina', 'Targa', 'Mhamid'] },
  { name: 'Fès', districts: ['Ville Nouvelle', 'Narjiss', 'Atlas', 'Route d\'Immouzzer', 'Médina'] },
  { name: 'Tanger', districts: ['Malabata', 'Centre Ville', 'Iberia', 'Boubana', 'Marchane', 'Achakar'] },
  { name: 'Agadir', districts: ['Sonaba', 'Haut Founty', 'Talborjt', 'Dakhla', 'Bensergao'] }
];

import { calculateMaalemBalance } from '../utils/balanceUtils';
import { calculateMaalemRating } from '../utils/ratingUtils';

export const UserProfileModal = ({ isOpen, onClose, onLoggedOut, onOpenEditProfile }) => {
  const { user, setUser, logout } = useAuth();
  const { interventions = [], transactions = [], maalems = [], reviews = [] } = useApp();

  const balanceInfo = calculateMaalemBalance(user, transactions, maalems);
  const ratingInfo = calculateMaalemRating(user, reviews, interventions);

  const isMissingPhone = !user?.phone || user.phone.length < 8;
  const [activeTab, setActiveTab] = useState(isMissingPhone ? 'edit' : 'info');
  
  // Edit Form State
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone ? user.phone.replace(/^\+\d{1,4}/, '') : '');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_DIAL_CODES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState(user?.city_zone?.split(' - ')[0] || 'Casablanca');
  const [selectedDistrict, setSelectedDistrict] = useState(user?.city_zone?.split(' - ')[1] || 'Maârif');
  const [specialty, setSpecialty] = useState(user?.maalem_details?.specialty || 'PLUMBING');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      if (user.phone) {
        // Détecter indicatif existant si présent
        const matchingCountry = COUNTRY_DIAL_CODES.find(c => user.phone.startsWith(c.dial));
        if (matchingCountry) {
          setSelectedCountry(matchingCountry);
          setPhone(user.phone.replace(matchingCountry.dial, ''));
        } else {
          setPhone(user.phone.replace(/^\+/, ''));
        }
      }
      if (isMissingPhone) {
        setActiveTab('edit');
      }
    }
  }, [user, isMissingPhone]);

  // Fermer dropdown pays lors d'un clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const cleanPhoneInput = (input, dial) => {
    let digits = String(input || '').replace(/\D/g, '');
    const dialDigits = String(dial || '+212').replace(/\D/g, '');
    if (digits.startsWith(dialDigits)) {
      digits = digits.substring(dialDigits.length);
    }
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    return digits;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const sanitized = cleanPhoneInput(raw, selectedCountry.dial);
    setPhone(sanitized);
  };

  const getFullPhone = () => {
    if (!phone) return '';
    const cleanDigits = phone.replace(/\D/g, '');
    const dialDigits = selectedCountry.dial.replace(/\D/g, '');
    if (cleanDigits.startsWith(dialDigits)) {
      return `+${cleanDigits}`;
    }
    return `${selectedCountry.dial}${cleanDigits}`;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formattedPhone = getFullPhone();
    if (!formattedPhone || formattedPhone.length < 8) {
      toast.error('Veuillez renseigner un numéro de téléphone valide.');
      return;
    }

    setSaving(true);
    const fullCityZone = `${selectedCity} - ${selectedDistrict}`;

    try {
      const updatedUser = {
        ...user,
        full_name: fullName.trim() || user.full_name,
        phone: formattedPhone,
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
        const { error: profileErr } = await supabase
          .from('profiles')
          .upsert([{
            id: user.id,
            full_name: updatedUser.full_name,
            phone: formattedPhone,
            role: user.role || 'CLIENT',
            city_zone: fullCityZone
          }])
          .select();

        if (profileErr) {
          console.warn('[Supabase Profile Upsert Error]:', profileErr);
        }

        if (isMaalem) {
          await supabase
            .from('maalem_details')
            .upsert([{
              id: user.id,
              specialty: specialty
            }])
            .select()
            .catch(() => {});
        }
      }

      setUser(updatedUser);
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));

      // Broadcast temps réel vers le dashboard admin et les autres onglets
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({ type: 'PROFILE_UPDATED', user: updatedUser });
        bc.close();
      } catch (e) {}

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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-4 sm:p-6 max-h-modal overflow-y-auto modal-scroll shadow-2xl relative text-slate-900 space-y-4 sm:space-y-5"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer touch-target-44 active:scale-95 z-20"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Avatar & Role Badge */}
          <div className="flex items-center gap-3.5 pt-1">
            <div className="relative flex-shrink-0">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.full_name} 
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
              ) : (
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-black text-2xl text-white shadow-xs ${
                  isMaalem 
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-600 border-amber-300' 
                    : isAdmin 
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-300'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-200'
                }`}>
                  {isMaalem ? (
                    <EnhancedCategoryIcon type={specialty} className="w-9 h-9 text-white" />
                  ) : (
                    (user.full_name?.charAt(0) || 'U').toUpperCase()
                  )}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"></span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black text-slate-900 truncate">{user.full_name || 'Utilisateur'}</h3>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${
                  isAdmin 
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : isMaalem 
                    ? 'bg-amber-50 text-amber-900 border-amber-200' 
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  {isAdmin ? '🛡️ Administrateur' : isMaalem ? `🛠️ ${getSpecialtyLabel(specialty)}` : '👤 Client Particulier'}
                </span>

                {user.phone && user.phone.length >= 8 ? (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Téléphone Enregistré
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 shadow-xs">
                    <AlertCircle className="w-2.5 h-2.5 text-amber-600" /> Numéro requis
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bandeau d'accueil Google & Complétion requise */}
          {isMissingPhone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-2xl space-y-1 shadow-xs"
            >
              <p className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>👋 Bienvenue {user.full_name || ''} !</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Votre compte Google est connecté. Veuillez renseigner votre <strong>numéro de téléphone</strong> et votre <strong>quartier</strong> pour que les artisans puissent vous joindre lors de vos demandes de dépannage !
              </p>
            </motion.div>
          )}

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'info'
                  ? isMaalem ? 'bg-amber-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Coordonnées
            </button>
            {isMaalem && (
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'reviews'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Avis ({ratingInfo.totalReviews})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>{isMissingPhone ? 'Compléter' : 'Modifier'}</span>
            </button>
            {!isMaalem && (
              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Activité SOS
              </button>
            )}
          </div>

          {/* Tab 1: Informations View */}
          {activeTab === 'info' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Nom &amp; Prénom</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{user.full_name || 'Non renseigné'}</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Téléphone Mobile</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900 dir-ltr">
                  {user.phone || <span className="text-amber-600 italic">Non renseigné</span>}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Ville &amp; Quartier</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{user.city_zone || 'Casablanca - Maarif'}</span>
              </div>

              {isMaalem && (
                <>
                  {/* Note & Avis Rating Card */}
                  <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                        <Star className="w-4 h-4 fill-white text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-950 block">Évaluation &amp; Avis Clients</span>
                        <span className="text-[10px] text-amber-800 font-medium">
                          {ratingInfo.totalReviews} avis vérifié{ratingInfo.totalReviews > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-amber-900 font-mono flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>{ratingInfo.averageRating.toFixed(1)} / 5.0</span>
                      </span>
                    </div>
                  </div>

                  {/* Portefeuille Solde */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">Solde de Crédits Leads</span>
                        {balanceInfo.totalReservedEscrow > 0 && (
                          <span className="text-[10px] text-emerald-800 font-medium">
                            {balanceInfo.totalReservedEscrow.toFixed(2)} DH en garantie (Total : {balanceInfo.liveTotalBalance.toFixed(2)} DH)
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-900 font-mono">
                      {balanceInfo.liveAvailableBalance.toFixed(2)} DH
                    </span>
                  </div>
                </>
              )}

              {!isMaalem && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-700">Historique d'Urgences</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                    {myClientInterventions.length} demande{myClientInterventions.length > 1 ? 's' : ''} SOS
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Tab: Reviews List (Maâlem) */}
          {activeTab === 'reviews' && isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {/* Synthèse globale des avis */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {ratingInfo.averageRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3.5 h-3.5 ${s <= Math.round(ratingInfo.averageRating) ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                      Basé sur {ratingInfo.totalReviews} avis client{ratingInfo.totalReviews > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {ratingInfo.badgesSummary.length > 0 && (
                  <div className="flex flex-wrap gap-1 max-w-[160px] justify-end">
                    {ratingInfo.badgesSummary.slice(0, 3).map((b) => (
                      <span key={b.name} className="text-[9px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                        {b.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Liste des avis clients */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {ratingInfo.maalemReviews.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 space-y-1">
                    <p className="text-xs font-bold">Aucun avis client pour le moment.</p>
                    <p className="text-[11px] text-slate-400">Vos évaluations apparaîtront ici après chaque intervention SOS confirmée.</p>
                  </div>
                ) : (
                  ratingInfo.maalemReviews.map((rev) => (
                    <div key={rev.id || rev.intervention_id} className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                            {rev.client_name?.charAt(0) || 'C'}
                          </div>
                          <span className="text-xs font-bold text-slate-900">{rev.client_name || 'Client BricoleMoi'}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 font-mono text-xs font-black">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{Number(rev.rating || 5).toFixed(1)}</span>
                        </div>
                      </div>

                      {rev.comment && (
                        <p className="text-xs text-slate-700 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                          « {rev.comment} »
                        </p>
                      )}

                      {Array.isArray(rev.badges) && rev.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {rev.badges.map((badge, idx) => (
                            <span key={idx} className="text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                              🏷️ {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-[9px] text-slate-400 font-mono">
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Récemment'}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Edit Form */}
          {activeTab === 'edit' && (
            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom Complet :</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Votre nom complet"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Téléphone Mobile avec Sélecteur d'Indicatif International */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Numéro de Téléphone :</label>
                <div className="relative">
                  {/* Sélecteur d'indicatif pays */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <img 
                        src={selectedCountry.flagUrl || `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
                        alt={selectedCountry.name} 
                        className="w-4 h-3 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
                      />
                      <span>{selectedCountry.dial}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>

                    {isCountryOpen && (
                      <div className="absolute left-0 top-full mt-1.5 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 modal-scroll">
                        <div className="px-2 py-1 text-[10px] font-mono text-slate-500 font-bold uppercase border-b border-slate-100 mb-1 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-blue-600" />
                          <span>Indicatif Pays / MRE</span>
                        </div>
                        {COUNTRY_DIAL_CODES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                              selectedCountry.code === c.code
                                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <img 
                                src={c.flagUrl} 
                                alt={c.name} 
                                className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
                              />
                              <span className="truncate text-left text-xs">{c.name}</span>
                            </div>
                            <span className="font-mono text-blue-600 text-xs font-bold shrink-0">{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    required
                    placeholder={selectedCountry.placeholder || '612345678'}
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-28 sm:pl-32 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm font-bold focus:border-blue-600 focus:bg-white focus:outline-none transition-colors shadow-xs dir-ltr tracking-wider"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ville :</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      const city = CITIES.find(c => c.name === e.target.value);
                      if (city && city.districts[0]) setSelectedDistrict(city.districts[0]);
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quartier :</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {currentCityObj.districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {isMaalem && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Spécialité :</label>
                  <SpecialtySelect value={specialty} onChange={setSpecialty} />
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={saving}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 mt-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer mon Profil BricoleMoi'}</span>
              </motion.button>
            </motion.form>
          )}

          {/* Tab 3: Stats View */}
          {activeTab === 'stats' && !isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-blue-600 font-mono">{myClientInterventions.length}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">SOS Totaux</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-emerald-600 font-mono">{completedCount}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Clôturés</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                  <div className="text-xl font-black text-amber-600 font-mono">{activeCount}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">En Cours</div>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Garantie Intervention BricoleMoi</p>
                  <p className="text-[11px] text-slate-600">Tous vos chantiers sont protégés par notre protocole d'arbitrage et de contrôle qualité.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Logout Action Button */}
          <div className="pt-2 border-t border-slate-100">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700 border border-slate-200 font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Se Déconnecter &amp; Revenir à l'Accueil</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
