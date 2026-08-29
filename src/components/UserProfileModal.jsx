import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { switchSubdomainInDev } from '../lib/subdomain';
import { 
  User as UserIcon, 
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
  History as HistoryIcon,
  ChevronRight, 
  ChevronDown, 
  Lock, 
  Globe, 
  AlertCircle,
  Receipt
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { formatDateTime } from '../utils/dateUtils';
import { EnhancedCategoryIcon, getSpecialtyLabel } from './EnhancedCategoryIcon';
import { SpecialtySelect } from './SpecialtySelect';
import { COUNTRY_DIAL_CODES, MOROCCAN_CITIES } from '../constants/geo';
import { reverseGeocodeMorocco } from '../lib/geoService';

import { calculateMaalemBalance } from '../utils/balanceUtils';
import { calculateMaalemRating } from '../utils/ratingUtils';
import { updateProfilePin } from '../lib/infobipAuthService';

export const UserProfileModal = ({ isOpen, onClose, onLoggedOut, onOpenEditProfile }) => {
  const { user, setUser, logout } = useAuth();
  const { interventions = [], transactions = [], maalems = [], clients = [], setMaalems, reviews = [], refreshData } = useApp();

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

  // États pour la modification du Code PIN à 4 chiffres
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [updatingPin, setUpdatingPin] = useState(false);

  const [selectedCity, setSelectedCity] = useState(() => {
    if (user?.city_zone) return user.city_zone.split(' - ')[0];
    try {
      const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
      return gps.city || MOROCCAN_CITIES[0].name;
    } catch (e) {
      return MOROCCAN_CITIES[0].name;
    }
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    if (user?.city_zone && user.city_zone.includes(' - ')) return user.city_zone.split(' - ')[1];
    try {
      const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
      return gps.district || 'Centre';
    } catch (e) {
      return 'Centre';
    }
  });

  const [specialty, setSpecialty] = useState(user?.maalem_details?.specialty || user?.specialty || 'PLUMBING');
  const [saving, setSaving] = useState(false);
  const [detectingGps, setDetectingGps] = useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setPhone(user.phone ? user.phone.replace(/^\+\d{1,4}/, '') : '');
      if (user.city_zone) {
        const parts = user.city_zone.split(' - ');
        setSelectedCity(parts[0] || MOROCCAN_CITIES[0].name);
        setSelectedDistrict(parts[1] || 'Centre');
      }
      setSpecialty(user.maalem_details?.specialty || user.specialty || 'PLUMBING');
    }
  }, [user]);

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

  const isMaalem = user?.role?.toUpperCase() === 'MAALEM' || Boolean(user?.is_maalem) || Boolean(user?.maalem_details);
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  const clientPhoneMap = new Map((clients || []).map(c => [String(c.id).trim(), String(c.phone || '').replace(/\D/g, '').slice(-9)]));
  const maalemPhoneMap = new Map((maalems || []).map(m => [String(m.id).trim(), String(m.phone || '').replace(/\D/g, '').slice(-9)]));

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';
  const uId = String(user?.id || '').trim();
  const uPhone9 = String(user?.phone || '').replace(/\D/g, '').slice(-9);

  const myClientInterventions = (interventions || []).filter((i) => {
    let myCreated = [];
    try {
      myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
    } catch (e) {}
    if (myCreated.includes(String(i.id).trim())) return true;
    if (!user) return false;

    const iClientId = String(i.client_id || '').trim();
    if (uId && uId !== DUMMY_CLIENT_ID && iClientId && iClientId !== DUMMY_CLIENT_ID && iClientId === uId) {
      return true;
    }

    const ip9 = String(i.client_phone || '').replace(/\D/g, '').slice(-9) || clientPhoneMap.get(iClientId) || '';
    if (uPhone9.length >= 8 && ip9.length >= 8 && uPhone9 === ip9) {
      return true;
    }

    return false;
  }).sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  const myMaalemInterventions = (interventions || []).filter((i) => {
    if (!user) return false;
    const iMaalemId = String(i.maalem_id || '').trim();
    if (uId && iMaalemId && iMaalemId === uId) {
      return true;
    }

    const mp9 = String(i.maalem_phone || '').replace(/\D/g, '').slice(-9) || maalemPhoneMap.get(iMaalemId) || '';
    if (uPhone9.length >= 8 && mp9.length >= 8 && uPhone9 === mp9) {
      return true;
    }

    let myUnlocked = [];
    try {
      myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
    } catch (e) {}
    if (myUnlocked.includes(String(i.id).trim())) return true;

    return false;
  }).sort((a, b) => new Date(b.completed_at || b.updated_at || b.created_at || 0) - new Date(a.completed_at || a.updated_at || a.created_at || 0));

  const myMaalemTransactions = balanceInfo.myTransactions || [];

  const completedCount = myClientInterventions.filter(i => i.status === 'COMPLETED').length;
  const activeCount = myClientInterventions.filter(i => i.status === 'PENDING' || i.status === 'ACCEPTED' || i.status === 'IN_PROGRESS' || i.status === 'PENDING_COMPLETION').length;

  const currentCityObj = MOROCCAN_CITIES.find(c => c.name === selectedCity) || MOROCCAN_CITIES[0];

  const activeJob = (interventions || []).find((i) => {
    const isOngoing = ['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status);
    if (!isOngoing) return false;
    if (isMaalem) {
      return String(i.maalem_id || '').trim() === uId || (uPhone9.length >= 8 && String(i.maalem_phone || '').replace(/\D/g, '').slice(-9) === uPhone9);
    }
    return (String(i.client_id || '').trim() === uId && uId !== DUMMY_CLIENT_ID) || (uPhone9.length >= 8 && String(i.client_phone || '').replace(/\D/g, '').slice(-9) === uPhone9);
  });

  const handleLogout = async (force = false) => {
    if (!force && activeJob) {
      setShowLogoutWarning(true);
      return;
    }
    setShowLogoutWarning(false);
    await logout(() => {
      onClose();
      if (onLoggedOut) onLoggedOut();
    });
  };

  const handleDetectGps = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      toast.error('Géolocalisation non supportée par votre appareil.');
      return;
    }
    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const geoResult = await reverseGeocodeMorocco(latitude, longitude);
          if (geoResult?.city) {
            setSelectedCity(geoResult.city);
            if (geoResult.district) {
              setSelectedDistrict(geoResult.district);
            }
            toast.success(`📍 Position détectée : ${geoResult.city} (${geoResult.district || 'Centre'})`);
          }
        } catch (e) {
          toast.error('Impossible de déterminer la position GPS.');
        } finally {
          setDetectingGps(false);
        }
      },
      () => {
        setDetectingGps(false);
        toast.error('Accès GPS refusé ou temporairement indisponible.');
      },
      { timeout: 5000, maximumAge: 60000 }
    );
  };

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
        specialty: isMaalem ? specialty : user.specialty,
        maalem_details: isMaalem ? {
          ...(user?.maalem_details || {}),
          specialty: specialty
        } : user.maalem_details
      };

      // Sync Supabase `profiles` & `maalem_details`
      if (isSupabaseConfigured && user?.id) {
        const { error: profileErr } = await supabase
          .from('profiles')
          .update({
            full_name: updatedUser.full_name,
            phone: formattedPhone,
            city_zone: fullCityZone
          })
          .eq('id', user.id);

        if (profileErr) {
          console.warn('[Supabase Profile Update Error]:', profileErr);
        }

        if (isMaalem) {
          const { error: maalemErr } = await supabase
            .from('maalem_details')
            .update({
              specialty: specialty
            })
            .eq('id', user.id);

          if (maalemErr) {
            console.warn('[Supabase maalem_details Update Error]:', maalemErr);
          }
        }
      }

      setUser(updatedUser);
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
      try {
        localStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
      } catch (e) {}

      if (isMaalem) {
        setMaalems((prev) =>
          prev.map((m) =>
            String(m.id).trim() === String(user.id).trim()
              ? {
                  ...m,
                  specialty: specialty,
                  full_name: updatedUser.full_name,
                  phone: formattedPhone,
                  city_zone: fullCityZone,
                  district: fullCityZone
                }
              : m
          )
        );
      }

      // Broadcast temps réel vers le dashboard admin et les autres onglets
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({ type: 'PROFILE_UPDATED', user: updatedUser });
        bc.close();
      } catch (e) {}

      if (refreshData) {
        refreshData();
      }

      toast.success('✨ Vos coordonnées et spécialité ont été enregistrées avec succès !');
      setActiveTab('info');
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    const cleanNew = String(newPin || '').trim();
    const cleanConf = String(confirmPin || '').trim();

    if (cleanNew.length !== 4 || !/^\d{4}$/.test(cleanNew)) {
      toast.error('Le code PIN doit comporter exactement 4 chiffres numériques.');
      return;
    }

    if (cleanNew !== cleanConf) {
      toast.error('Les deux codes PIN saisis ne correspondent pas.');
      return;
    }

    const targetPhone = user?.phone || getFullPhone();
    if (!targetPhone) {
      toast.error('Veuillez d\'abord enregistrer votre numéro de téléphone.');
      return;
    }

    setUpdatingPin(true);
    try {
      await updateProfilePin({ phone: targetPhone, pin: cleanNew });
      toast.success('🔐 Votre code PIN à 4 chiffres a été mis à jour avec succès !');
      setNewPin('');
      setConfirmPin('');
      setActiveTab('info');
    } catch (err) {
      toast.error(err.message || 'Impossible de mettre à jour le code PIN.');
    } finally {
      setUpdatingPin(false);
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
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 gap-1 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`flex-1 min-w-[85px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center whitespace-nowrap ${
                activeTab === 'info'
                  ? isMaalem ? 'bg-amber-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Coordonnées
            </button>

            {isMaalem && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('missions')}
                  className={`flex-1 min-w-[85px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                    activeTab === 'missions'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Chantiers ({myMaalemInterventions.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 min-w-[85px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Avis ({ratingInfo.totalReviews})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('transactions')}
                  className={`flex-1 min-w-[85px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                    activeTab === 'transactions'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Portefeuille ({myMaalemTransactions.length})</span>
                </button>
              </>
            )}

            {!isMaalem && (
              <button
                type="button"
                onClick={() => setActiveTab('requests')}
                className={`flex-1 min-w-[85px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeTab === 'requests'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HistoryIcon className="w-3.5 h-3.5" />
                <span>Mes Demandes ({myClientInterventions.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex-1 min-w-[80px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === 'edit'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>{isMissingPhone ? 'Compléter' : 'Modifier'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pin')}
              className={`flex-1 min-w-[80px] py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === 'pin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>PIN</span>
            </button>
          </div>

          {/* Tab 1: Informations View */}
          {activeTab === 'info' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-blue-600" />
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
                <span className="text-xs font-bold text-slate-900">{user.city_zone || 'Maroc'}</span>
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
                          {ratingInfo.totalReviews > 0
                            ? `${ratingInfo.totalReviews} avis vérifié${ratingInfo.totalReviews > 1 ? 's' : ''}`
                            : 'Nouveau profil'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-amber-900 font-mono flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>
                          {ratingInfo.totalReviews > 0
                            ? `${ratingInfo.averageRating.toFixed(1)} / 5.0`
                            : 'Nouveau'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Portefeuille Solde */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">Solde de Crédits Leads</span>
                        <span className="text-[10px] text-emerald-800 font-medium">Disponible pour débloquer des chantiers</span>
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
                    <HistoryIcon className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Historique Demandes</span>
                      <span className="text-[10px] text-slate-500">Total de vos dépannages réalisés</span>
                    </div>
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
                    {ratingInfo.totalReviews > 0 ? ratingInfo.averageRating.toFixed(1) : '-'}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3.5 h-3.5 ${
                            ratingInfo.totalReviews > 0 && s <= Math.round(ratingInfo.averageRating)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                      {ratingInfo.totalReviews > 0
                        ? `Basé sur ${ratingInfo.totalReviews} avis client${ratingInfo.totalReviews > 1 ? 's' : ''}`
                        : 'Aucun avis client pour le moment'}
                    </p>
                  </div>
                </div>

                {ratingInfo.totalReviews === 0 ? (
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                    🌱 Nouveau Profil
                  </span>
                ) : ratingInfo.badgesSummary.length > 0 && (
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
                          <span>{Number(rev.rating !== undefined && rev.rating !== null ? rev.rating : 0).toFixed(1)}</span>
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

                      <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatDateTime(rev.created_at, 'long')}</span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Tab: Missions / Chantiers (Maâlem) */}
          {activeTab === 'missions' && isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Registre des Chantiers</span>
                  <span className="text-[10px] text-slate-500">Missions acceptées et réalisées</span>
                </div>
                <span className="text-xs font-mono font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  {myMaalemInterventions.length} mission{myMaalemInterventions.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto modal-scroll pr-1">
                {myMaalemInterventions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 space-y-1">
                    <p className="text-xs font-bold">Aucun chantier dans votre historique.</p>
                    <p className="text-[11px] text-slate-400">Vos missions acceptées et terminées apparaîtront ici.</p>
                  </div>
                ) : (
                  myMaalemInterventions.map((item) => {
                    const clientPhoneClean = String(item.client_phone || '').replace(/\D/g, '');
                    return (
                      <div key={item.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {item.subcategory || item.service_type || 'Dépannage d\'urgence'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : item.status === 'CANCELLED'
                              ? 'bg-rose-50 border-rose-200 text-rose-700'
                              : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
                          }`}>
                            {item.status === 'COMPLETED' ? '✅ Clôturé' : item.status === 'CANCELLED' ? '❌ Annulé' : '🛠️ En cours'}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-700 truncate">
                            <span className="font-bold text-slate-900">👤 {item.client_name || 'Client BricoleMoi'}</span>
                            <span>•</span>
                            <span className="text-slate-500">📍 {item.district || 'Casablanca'}</span>
                          </div>

                          {item.client_phone && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <a href={`tel:${item.client_phone}`} className="font-mono text-blue-700 font-bold hover:underline flex items-center gap-1">
                                <Phone className="w-3 h-3 text-blue-600" />
                                <span>{item.client_phone}</span>
                              </a>
                              {clientPhoneClean.length >= 9 && (
                                <a
                                  href={`https://wa.me/212${clientPhoneClean.replace(/^0/, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-700 hover:text-emerald-800 p-0.5"
                                >
                                  <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                          <span>Tarif : <strong className="text-slate-900">{item.final_agreed_price ? `${item.final_agreed_price} DH` : '🤝 Accord Direct'}</strong></span>
                          <span>{formatDateTime(item.created_at || Date.now(), 'long')}</span>
                        </div>

                        {item.rating && (
                          <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-amber-800 font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>Évaluation reçue :</span>
                            </span>
                            <span className="font-mono font-black text-amber-900">{Number(item.rating).toFixed(1)} / 5 ★</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {/* Tab: Transactions / Portefeuille (Maâlem) */}
          {activeTab === 'transactions' && isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Solde Disponible</span>
                  <span className="text-[10px] text-emerald-800">Crédits valides pour débloquer des chantiers</span>
                </div>
                <span className="text-base font-mono font-black text-emerald-900">
                  {balanceInfo.liveAvailableBalance.toFixed(2)} DH
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto modal-scroll pr-1">
                {myMaalemTransactions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 space-y-1">
                    <p className="text-xs font-bold">Aucune transaction enregistrée.</p>
                    <p className="text-[11px] text-slate-400">Vos déblocages de leads (-15 DH) et recharges apparaîtront ici.</p>
                  </div>
                ) : (
                  myMaalemTransactions.map((tx) => {
                    const isPositive = Number(tx.amount_dh) > 0;
                    return (
                      <div key={tx.id} className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-2 shadow-xs text-xs">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {tx.payment_method || tx.type}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {formatDateTime(tx.created_at || Date.now(), 'long')}
                          </p>
                          {tx.admin_notes && (
                            <p className="text-[10px] text-slate-600 italic truncate mt-0.5">
                              {tx.admin_notes}
                            </p>
                          )}
                        </div>
                        <span className={`font-mono font-bold px-2.5 py-1 rounded-xl text-xs shrink-0 ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : Number(tx.amount_dh).toFixed(2)} DH
                        </span>
                      </div>
                    );
                  })
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

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Ville &amp; Quartier :</label>
                  <button
                    type="button"
                    onClick={handleDetectGps}
                    disabled={detectingGps}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <MapPin className={`w-3.5 h-3.5 ${detectingGps ? 'animate-bounce text-blue-600' : 'text-blue-500'}`} />
                    <span>{detectingGps ? 'Détection GPS...' : '📍 Détecter ma position'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        const city = MOROCCAN_CITIES.find(c => c.name === e.target.value);
                        if (city && city.districts && city.districts[0]) {
                          const firstD = typeof city.districts[0] === 'object' ? (city.districts[0].name || 'Centre') : String(city.districts[0]);
                          setSelectedDistrict(firstD);
                        }
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                    >
                      {MOROCCAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                    >
                      {(() => {
                        const rawDistricts = (currentCityObj.districts || []).map(d => typeof d === 'object' ? (d.name || String(d)) : String(d));
                        const allOptions = (selectedDistrict && !rawDistricts.includes(selectedDistrict))
                          ? [selectedDistrict, ...rawDistricts]
                          : rawDistricts;
                        return allOptions.map(dName => <option key={dName} value={dName}>{dName}</option>);
                      })()}
                    </select>
                  </div>
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

          {/* Tab: Demandes SOS (Client) */}
          {activeTab === 'requests' && !isMaalem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
                  <div className="text-lg font-black text-blue-600 font-mono">{myClientInterventions.length}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">SOS Totaux</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
                  <div className="text-lg font-black text-emerald-600 font-mono">{completedCount}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Clôturés</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
                  <div className="text-lg font-black text-amber-600 font-mono">{activeCount}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">En Cours</div>
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto modal-scroll pr-1">
                {myClientInterventions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 space-y-1">
                    <p className="text-xs font-bold">Aucune demande SOS trouvée.</p>
                    <p className="text-[11px] text-slate-400">Vos demandes de dépannage apparaîtront ici.</p>
                  </div>
                ) : (
                  myClientInterventions.map((item) => {
                    return (
                      <div key={item.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {item.subcategory || item.service_type || 'Dépannage d\'urgence'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : item.status === 'CANCELLED'
                              ? 'bg-rose-50 border-rose-200 text-rose-700'
                              : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
                          }`}>
                            {item.status === 'COMPLETED' ? '✅ Clôturé' : item.status === 'CANCELLED' ? '❌ Annulé' : '🛠️ En cours'}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-700 truncate">
                            <span className="font-bold text-slate-900">🛠️ {item.maalem_name || 'Artisan BricoleMoi'}</span>
                            <span>•</span>
                            <span className="text-slate-500">📍 {item.district || 'Casablanca'}</span>
                          </div>
                          {item.maalem_phone && (
                            <a href={`tel:${item.maalem_phone}`} className="font-mono text-blue-700 font-bold hover:underline flex items-center gap-1 shrink-0">
                              <Phone className="w-3 h-3 text-blue-600" />
                              <span>{item.maalem_phone}</span>
                            </a>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                          <span>Tarif : <strong className="text-slate-900">{item.final_agreed_price ? `${item.final_agreed_price} DH` : '🤝 Accord Direct'}</strong></span>
                          <span>{formatDateTime(item.created_at || Date.now(), 'long')}</span>
                        </div>

                        {item.rating && (
                          <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-amber-800 font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>Votre note :</span>
                            </span>
                            <span className="font-mono font-black text-amber-900">{Number(item.rating).toFixed(1)} / 5 ★</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Garantie BricoleMoi</p>
                  <p className="text-[11px] text-slate-600">Vos demandes et chantiers sont protégés et archivés en toute sécurité.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Modification Sécurisée du Code PIN */}
          {activeTab === 'pin' && (
            <motion.form 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              onSubmit={handleUpdatePin}
              className="space-y-4"
            >
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Code PIN Secret de Connexion (4 chiffres)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ce code personnel à 4 chiffres vous permet de vous connecter instantanément en 1 seconde sans attendre de SMS.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nouveau Code PIN (4 chiffres)
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    placeholder="••••"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-2xl font-mono tracking-widest py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirmer le Nouveau Code PIN
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    placeholder="••••"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-2xl font-mono tracking-widest py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={updatingPin || newPin.length !== 4 || confirmPin.length !== 4}
                className="w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 transition-all"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{updatingPin ? 'Mise à jour...' : 'Valider mon Nouveau Code PIN'}</span>
              </motion.button>
            </motion.form>
          )}

          {/* Quick Subdomain Switcher for Artisans */}
          {user?.role === 'MAALEM' && (
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const currentApp = new URLSearchParams(window.location.search).get('app') || 'CLIENT';
                  if (currentApp.toUpperCase() === 'MAALEM') {
                    switchSubdomainInDev('CLIENT');
                  } else {
                    switchSubdomainInDev('MAALEM');
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-300 text-amber-900 font-black text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>
                  {(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('app') || '').toUpperCase() === 'MAALEM'
                    ? '👤 Visiter le Portail Client'
                    : '🛠️ Accéder à mon Radar Chantiers Pro'}
                </span>
              </button>
            </div>
          )}

          {/* Logout Action Button */}
          <div className="pt-2 border-t border-slate-100">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLogout(false)}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700 border border-slate-200 font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Se Déconnecter &amp; Revenir à l'Accueil</span>
            </motion.button>
          </div>

          {/* ======================================================== */}
          {/* DIALOGUE D'ALERTE : INTERVENTION ACTIVE EN COURS        */}
          {/* ======================================================== */}
          <AnimatePresence>
            {showLogoutWarning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 rounded-3xl p-5 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 10 }}
                  className="bg-white border border-amber-200 rounded-2xl p-5 shadow-2xl max-w-sm text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold shadow-inner">
                    ⚠️
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-1">
                    Intervention en cours détectée !
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {isMaalem 
                      ? 'Vous avez une mission active en cours. Si vous vous déconnectez, le client ne pourra plus voir votre statut d\'arrivée sur la carte.'
                      : 'Un Maâlem est actuellement en mission ou en route vers votre adresse. Si vous vous déconnectez, vous ne recevrez plus le suivi en direct.'}
                  </p>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowLogoutWarning(false)}
                      className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all"
                    >
                      🛡️ Rester Connecté (Recommandé)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLogout(true)}
                      className="w-full py-2 bg-slate-100 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all"
                    >
                      Forcer la Déconnexion
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
