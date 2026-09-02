import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { MOROCCAN_CITIES, COUNTRY_DIAL_CODES } from '../constants/geo';
import { reverseGeocodeMorocco } from '../lib/geoService';
import { supabase, isSupabaseConfigured } from '../lib/dbClient';
import { calculateMaalemBalance } from '../utils/balanceUtils';
import { calculateMaalemRating } from '../utils/ratingUtils';
import { updateProfilePin } from '../lib/infobipAuthService';
import { switchSubdomainInDev } from '../lib/subdomain';

// Sous-composants modulaires du profil
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileTabsNav } from './profile/ProfileTabsNav';
import { ProfileInfoTab } from './profile/tabs/ProfileInfoTab';
import { ProfileEditTab } from './profile/tabs/ProfileEditTab';
import { ProfilePinTab } from './profile/tabs/ProfilePinTab';
import { ProfileInterventionsTab } from './profile/tabs/ProfileInterventionsTab';
import { ProfileTransactionsTab } from './profile/tabs/ProfileTransactionsTab';
import { ProfileReviewsTab } from './profile/tabs/ProfileReviewsTab';
import { LogoutWarningModal } from './profile/LogoutWarningModal';

export const UserProfileModal = ({ isOpen, onClose, onLoggedOut }) => {
  const { user, setUser, logout } = useAuth();
  const { interventions = [], transactions = [], maalems = [], clients = [], setMaalems, reviews = [], refreshData } = useApp();

  const balanceInfo = calculateMaalemBalance(user, transactions, maalems);
  const ratingInfo = calculateMaalemRating(user, reviews, interventions);

  const isMissingPhone = !user?.phone || user.phone.length < 8;
  const [activeTab, setActiveTab] = useState(isMissingPhone ? 'edit' : 'info');
  
  // États formulaire édition
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone ? user.phone.replace(/^\+\d{1,4}/, '') : '');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_DIAL_CODES[0]);

  // États code PIN 4 chiffres
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [updatingPin, setUpdatingPin] = useState(false);

  // Villes et Quartiers
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

  if (!isOpen || !user) return null;

  const isMaalem = user?.role?.toUpperCase() === 'MAALEM' || Boolean(user?.is_maalem) || Boolean(user?.maalem_details);
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  const clientPhoneMap = new Map((clients || []).map(c => [String(c.id).trim(), String(c.phone || '').replace(/\D/g, '').slice(-9)]));
  const maalemPhoneMap = new Map((maalems || []).map(m => [String(m.id).trim(), String(m.phone || '').replace(/\D/g, '').slice(-9)]));

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';
  const uId = String(user?.id || '').trim();
  const uPhone9 = String(user?.phone || '').replace(/\D/g, '').slice(-9);

  // Filtrage des demandes clients
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
    return uPhone9.length >= 8 && ip9.length >= 8 && uPhone9 === ip9;
  }).sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  // Filtrage des chantiers maâlem
  const myMaalemInterventions = (interventions || []).filter((i) => {
    if (!user) return false;
    const iMaalemId = String(i.maalem_id || '').trim();
    if (uId && iMaalemId && iMaalemId === uId) return true;

    const mp9 = String(i.maalem_phone || '').replace(/\D/g, '').slice(-9) || maalemPhoneMap.get(iMaalemId) || '';
    if (uPhone9.length >= 8 && mp9.length >= 8 && uPhone9 === mp9) return true;

    let myUnlocked = [];
    try {
      myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
    } catch (e) {}
    return myUnlocked.includes(String(i.id).trim());
  }).sort((a, b) => new Date(b.completed_at || b.updated_at || b.created_at || 0) - new Date(a.completed_at || a.updated_at || a.created_at || 0));

  const myMaalemTransactions = balanceInfo.myTransactions || [];

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

      if (isSupabaseConfigured && user?.id) {
        await supabase
          .from('profiles')
          .update({
            full_name: updatedUser.full_name,
            phone: formattedPhone,
            city_zone: fullCityZone
          })
          .eq('id', user.id);

        if (isMaalem) {
          await supabase
            .from('maalem_details')
            .update({ specialty: specialty })
            .eq('id', user.id);
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

      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({ type: 'PROFILE_UPDATED', user: updatedUser });
        bc.close();
      } catch (e) {}

      if (refreshData) refreshData();
      toast.success('✨ Vos coordonnées et spécialité ont été enregistrées avec succès !');
      setActiveTab('info');
    } catch (err) {
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
      toast.error(err.message || 'Erreur lors de la mise à jour du code PIN.');
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          className="bg-white border border-slate-200/90 rounded-3xl max-w-lg sm:max-w-xl md:max-w-2xl w-full p-4 sm:p-6 max-h-[92vh] overflow-y-auto modal-scroll shadow-2xl relative text-slate-900 space-y-4 sm:space-y-5"
        >
          {/* Bouton de Fermeture */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer active:scale-95 z-20"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* En-tête Avatar & Rôle */}
          <ProfileHeader
            user={user}
            isMaalem={isMaalem}
            isAdmin={isAdmin}
            specialty={specialty}
            isMissingPhone={isMissingPhone}
          />

          {/* Navigation par Onglets Pilules */}
          <ProfileTabsNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMaalem={isMaalem}
            isMissingPhone={isMissingPhone}
            maalemMissionsCount={myMaalemInterventions.length}
            reviewsCount={ratingInfo.totalReviews}
            transactionsCount={myMaalemTransactions.length}
            clientRequestsCount={myClientInterventions.length}
          />

          {/* Contenu des Onglets */}
          {activeTab === 'info' && (
            <ProfileInfoTab
              user={user}
              isMaalem={isMaalem}
              balanceInfo={balanceInfo}
              ratingInfo={ratingInfo}
              clientInterventionsCount={myClientInterventions.length}
            />
          )}

          {activeTab === 'edit' && (
            <ProfileEditTab
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              specialty={specialty}
              setSpecialty={setSpecialty}
              isMaalem={isMaalem}
              saving={saving}
              detectingGps={detectingGps}
              handleDetectGps={handleDetectGps}
              handleSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'pin' && (
            <ProfilePinTab
              newPin={newPin}
              setNewPin={setNewPin}
              confirmPin={confirmPin}
              setConfirmPin={setConfirmPin}
              updatingPin={updatingPin}
              handleUpdatePin={handleUpdatePin}
            />
          )}

          {activeTab === 'missions' && isMaalem && (
            <ProfileInterventionsTab
              interventions={myMaalemInterventions}
              isMaalem={true}
              clientPhoneMap={clientPhoneMap}
            />
          )}

          {activeTab === 'requests' && !isMaalem && (
            <ProfileInterventionsTab
              interventions={myClientInterventions}
              isMaalem={false}
              clientPhoneMap={clientPhoneMap}
            />
          )}

          {activeTab === 'reviews' && isMaalem && (
            <ProfileReviewsTab ratingInfo={ratingInfo} />
          )}

          {activeTab === 'transactions' && isMaalem && (
            <ProfileTransactionsTab
              transactions={myMaalemTransactions}
              liveAvailableBalance={balanceInfo.liveAvailableBalance}
            />
          )}

          {/* Sélecteur Rapide de Portail pour Artisans */}
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

          {/* Déconnexion */}
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

          {/* Alerte Intervention Active lors de la Déconnexion */}
          <LogoutWarningModal
            show={showLogoutWarning}
            isMaalem={isMaalem}
            onCancel={() => setShowLogoutWarning(false)}
            onConfirm={() => handleLogout(true)}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
