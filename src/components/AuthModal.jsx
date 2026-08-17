import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  X, 
  Sparkles, 
  User, 
  Wrench, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  UserPlus,
  LogIn,
  Gift,
  RotateCcw,
  Navigation,
  Camera,
  Image as ImageIcon,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  WhatsappLogo, 
  ChatCenteredText, 
  UserCircle, 
  Wrench as PhosphorWrench, 
  ClockCounterClockwise,
  Sparkle,
  Coins,
  Buildings,
  MapPinLine
} from '@phosphor-icons/react';
import { SpecialtySelect } from './SpecialtySelect';
import { CustomDropdown } from './CustomDropdown';

export const MOROCCAN_CITIES = [
  {
    name: 'Casablanca',
    lat: 33.5731,
    lng: -7.5898,
    districts: [
      'Maârif',
      'Bourgogne',
      'Gauthier',
      'Anfa / Aïn Diab',
      'Hay Hassani',
      'Sidi Maarouf',
      'Aïn Sebaâ',
      'Bernoussi',
      'Oasis / Polo',
      'Belvédère',
      'Centre-Ville',
      'Toute la ville'
    ]
  },
  {
    name: 'Rabat',
    lat: 34.0209,
    lng: -6.8416,
    districts: [
      'Agdal',
      'Hassan / Centre',
      'Souissi',
      'Hay Riad',
      'Océan',
      'Yacoub El Mansour',
      'Aviation / Mabella',
      'Toute la ville'
    ]
  },
  {
    name: 'Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    districts: [
      'Guéliz',
      'Hivernage',
      'Médina',
      'Semlalia',
      'Targa',
      'Mhamid',
      'Palmeraie',
      'Toute la ville'
    ]
  },
  {
    name: 'Tanger',
    lat: 35.7595,
    lng: -5.8340,
    districts: [
      'Malabata',
      'Centre-Ville',
      'Boukhalef',
      'Iberia',
      'Marshane',
      'Val Fleuri',
      'Toute la ville'
    ]
  },
  {
    name: 'Salé',
    lat: 34.0531,
    lng: -6.7985,
    districts: [
      'Tabriquet',
      'Bettana',
      'Sala Al Jadida',
      'Hay Salam',
      'Sidi Moussa',
      'Toute la ville'
    ]
  },
  {
    name: 'Fès',
    lat: 34.0181,
    lng: -5.0078,
    districts: [
      'Ville Nouvelle',
      'Narjiss',
      'Médina',
      'Route Imouzzer',
      'Atlas',
      'Toute la ville'
    ]
  },
  {
    name: 'Agadir',
    lat: 30.4278,
    lng: -9.5981,
    districts: [
      'Centre & Baie',
      'Talborjt',
      'Dakhla',
      'Salam',
      'Tikiouine',
      'Bensergao',
      'Toute la ville'
    ]
  },
  {
    name: 'Mohammedia',
    lat: 33.6866,
    lng: -7.3828,
    districts: [
      'Kasbah',
      'Plage & Marina',
      'Monica',
      'Riad Salam',
      'El Alia',
      'Toute la ville'
    ]
  },
  {
    name: 'Kénitra',
    lat: 34.2610,
    lng: -6.5802,
    districts: [
      'Centre-Ville',
      'Mehdia',
      'Mimosa',
      'Maamora',
      'Val Fleury',
      'Toute la ville'
    ]
  },
  {
    name: 'Meknès',
    lat: 33.8938,
    lng: -5.5547,
    districts: [
      'Hamria',
      'Ville Nouvelle',
      'Mansour',
      'Bassatine',
      'Toute la ville'
    ]
  },
  {
    name: 'Tétouan',
    lat: 35.5889,
    lng: -5.3626,
    districts: [
      'Centre-Ville',
      'Martil / Cabo',
      'Wilaya',
      'Mhannech',
      'Toute la ville'
    ]
  },
  {
    name: 'El Jadida',
    lat: 33.2316,
    lng: -8.5007,
    districts: [
      'Centre-Ville',
      'Plage / Deauville',
      'Sidi Bouzid',
      'Najd',
      'Toute la ville'
    ]
  },
  {
    name: 'Oujda',
    lat: 34.6867,
    lng: -1.9114,
    districts: [
      'Centre-Ville',
      'Al Qods',
      'Lazaret',
      'Golf',
      'Toute la ville'
    ]
  }
];

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, sendPhoneOTP, verifyPhoneOTP, currentRole, t } = useAuth();
  
  const [authMode, setAuthMode] = useState('SIGN_IN'); // 'SIGN_IN' | 'SIGN_UP'
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' | 'MAALEM'
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (authModalOpen && currentRole) {
      setRole(currentRole === 'ADMIN' ? 'CLIENT' : currentRole);
    }
  }, [authModalOpen, currentRole]);
  
  // Ville & Quartier séparés et synchronisés
  const [selectedCity, setSelectedCity] = useState('Casablanca');
  const [selectedDistrict, setSelectedDistrict] = useState('Maârif');
  const [specialty, setSpecialty] = useState('PLUMBING');
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'sms'

  const [step, setStep] = useState(1); // 1: Input phone, 2: Input OTP
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [conflictMsg, setConflictMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsSuccessMsg, setGpsSuccessMsg] = useState('');

  // Options pour le sélecteur de villes
  const cityOptions = MOROCCAN_CITIES.map((c) => ({
    value: c.name,
    label: c.name
  }));

  // Options pour le sélecteur de quartiers selon la ville
  const currentCityObj = MOROCCAN_CITIES.find((c) => c.name === selectedCity) || MOROCCAN_CITIES[0];
  const districtOptions = (currentCityObj.districts || []).map((d) => ({
    value: d,
    label: d
  }));

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const targetCity = MOROCCAN_CITIES.find((c) => c.name === newCity);
    if (targetCity && targetCity.districts && targetCity.districts.length > 0) {
      setSelectedDistrict(targetCity.districts[0]);
    }
  };

  const [portfolioPhotos, setPortfolioPhotos] = useState([]); // [{ file, preview, name }]

  const handlePortfolioSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 3 - portfolioPhotos.length;
    if (remainingSlots <= 0) {
      setErrorBanner('Vous pouvez téléverser au maximum 3 photos de chantiers.');
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    filesToProcess.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setErrorBanner('Chaque photo ne doit pas dépasser 5 Mo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioPhotos((prev) => {
          if (prev.length >= 3) return prev;
          return [...prev, { file, preview: reader.result, name: file.name }];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePortfolioPhoto = (indexToRemove) => {
    setPortfolioPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Timer pour le renvoi de l'OTP
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleClose = () => {
    setAuthModalOpen(false);
    setStep(1);
    setErrorBanner('');
    setConflictMsg('');
    setInfoMsg('');
    setGpsSuccessMsg('');
    setOtp('');
    setPortfolioPhotos([]);
  };

  // Normalisation automatique du numéro de téléphone marocain
  const cleanMoroccanPhone = (input) => {
    let cleaned = input.replace(/\D/g, '');
    if (cleaned.startsWith('212')) {
      cleaned = cleaned.substring(3);
    }
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const sanitized = cleanMoroccanPhone(raw);
    setPhone(sanitized);
  };

  // Calculateur Haversine pour trouver la ville marocaine la plus proche
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Détection GPS précise de la ville marocaine la plus proche
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setErrorBanner('La géolocalisation n\'est pas disponible sur cet appareil.');
      return;
    }
    setDetectingGps(true);
    setGpsSuccessMsg('');
    setErrorBanner('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let closestCity = MOROCCAN_CITIES[0];
        let minDistance = Infinity;

        MOROCCAN_CITIES.forEach((city) => {
          const dist = calculateDistance(latitude, longitude, city.lat, city.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = city;
          }
        });

        setSelectedCity(closestCity.name);
        if (closestCity.districts && closestCity.districts.length > 0) {
          setSelectedDistrict(closestCity.districts[0]);
        }
        setDetectingGps(false);
        setGpsSuccessMsg(`📍 Position détectée : ${closestCity.name} (${Math.round(minDistance)} km)`);
        setTimeout(() => setGpsSuccessMsg(''), 4000);
      },
      () => {
        setDetectingGps(false);
        setErrorBanner('Impossible d\'obtenir votre position GPS.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    const sanitized = cleanMoroccanPhone(phone);
    if (!sanitized || sanitized.length < 9) {
      setErrorBanner('Veuillez saisir un numéro de téléphone marocain valide (ex: 661001122)');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      await sendPhoneOTP(sanitized, 'recaptcha-container');
      setStep(2);
      setResendCountdown(30);
      setInfoMsg(
        channel === 'whatsapp'
          ? `Code OTP à 6 chiffres envoyé via WhatsApp au +212 ${sanitized}`
          : `Code OTP à 6 chiffres envoyé par SMS Direct au +212 ${sanitized}`
      );
    } catch (err) {
      if (err.message === 'BILLING_NOT_ENABLED') {
        setErrorBanner('⚠️ Envoi de SMS réel désactivé : Le projet Firebase nécessite le plan Blaze (Pay-as-you-go) ou utilisez un numéro de test Firebase gratuit (+212 600000000).');
      } else if (err.message === 'SMS_REGION_DISABLED') {
        setErrorBanner('⚠️ La région Maroc (+212) doit être autorisée dans Firebase Console (Authentication > SMS Region Policy) ou utilisez un numéro de test Firebase.');
      } else if (err.message === 'SMS_QUOTA_EXCEEDED') {
        setErrorBanner('⚠️ Quota SMS Firebase dépassé. Veuillez réessayer plus tard ou utiliser un numéro de test.');
      } else if (err.message === 'PHONE_FORMAT_INVALID') {
        setErrorBanner('⚠️ Numéro de téléphone marocain invalide (ex: 06 12 34 56 78).');
      } else {
        setErrorBanner(err.message || 'Impossible d\'envoyer le code OTP. Veuillez vérifier le numéro saisi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setErrorBanner('Veuillez entrer le code de vérification reçu.');
      return;
    }

    setLoading(true);
    setErrorBanner('');

    try {
      const sanitized = cleanMoroccanPhone(phone);
      const combinedCityZone = `${selectedCity} - ${selectedDistrict}`;

      await verifyPhoneOTP({
        phone: sanitized,
        token: otp,
        role,
        fullName: fullName || (role === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
        cityZone: combinedCityZone,
        specialty,
        portfolioUrls: portfolioPhotos.map(p => p.preview),
        mode: authMode
      });
      setStep(1);
      setInfoMsg('');
      setPortfolioPhotos([]);
    } catch (err) {
      if (err.message?.startsWith('PHONE_ROLE_CONFLICT')) {
        const existingRole = err.message.split(':')[1];
        const roleLabel = existingRole === 'MAALEM' ? 'Artisan Maâlem Pro' : 'Client Particulier';
        setConflictMsg(`⚠️ Unicité Stricte : Ce numéro est déjà enregistré en tant que ${roleLabel}. Veuillez vous connecter avec votre profil principal.`);
        setAuthMode('SIGN_IN');
        setRole(existingRole);
        setStep(1);
      } else {
        setErrorBanner(err.message ? `⚠️ ${err.message}` : '⚠️ Code OTP incorrect ou expiré.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-sans"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-slate-950 border border-cyan-500/40 rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-[0_0_35px_rgba(6,182,212,0.3)] relative overflow-hidden text-slate-100 max-h-modal overflow-y-auto modal-scroll"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Futuristic Neon Cyan Dropdown & Mode Switch */}
            <div className="text-center mb-5 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <ShieldCheck className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>

              <h3 className="text-xl font-black text-white font-sans tracking-tight">
                {step === 1 
                  ? (authMode === 'SIGN_UP' ? 'Créer un Compte BricoleMoi' : 'Connexion Sécurisée') 
                  : 'Vérification du Code OTP'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {step === 1 
                  ? 'Authentification rapide par SMS ou WhatsApp' 
                  : `Entrez le code reçu au +212 ${phone}`}
              </p>

              {/* Toggle Switch between SIGN_IN and SIGN_UP */}
              {step === 1 && (
                <div className="flex bg-slate-900 border border-cyan-500/20 p-1 rounded-xl mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('SIGN_IN');
                      setErrorBanner('');
                      setConflictMsg('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      authMode === 'SIGN_IN'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Se Connecter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('SIGN_UP');
                      setErrorBanner('');
                      setConflictMsg('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      authMode === 'SIGN_UP'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Nouveau Compte</span>
                  </button>
                </div>
              )}
            </div>

            {/* Invisible Firebase reCAPTCHA Container */}
            <div id="recaptcha-container"></div>

            {/* Error & Warning Messages */}
            {conflictMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-amber-950/80 border border-amber-500/50 rounded-xl text-amber-200 text-xs font-medium space-y-1 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
              >
                <p>{conflictMsg}</p>
              </motion.div>
            )}

            {errorBanner && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs font-medium space-y-1 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
              >
                <p>{errorBanner}</p>
              </motion.div>
            )}

            {gpsSuccessMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold text-center shadow-[0_0_10px_rgba(52,211,153,0.2)]"
              >
                {gpsSuccessMsg}
              </motion.div>
            )}

            {/* Step 1: Input Phone & Details */}
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-3.5">
                
                {/* En mode SIGN_UP uniquement : Choix du Rôle et Champs de Profil */}
                {authMode === 'SIGN_UP' && (
                  <>
                    {/* Role Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Choisissez votre profil :</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRole('CLIENT')}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            role === 'CLIENT'
                              ? 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <UserCircle className="w-4 h-4 text-cyan-400" weight="duotone" />
                          <span>Client Particulier</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRole('MAALEM')}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            role === 'MAALEM'
                              ? 'bg-slate-900 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <PhosphorWrench className="w-4 h-4 text-amber-400" weight="duotone" />
                          <span>Artisan Maâlem</span>
                        </button>
                      </div>
                    </div>

                    {/* Bonus de Bienvenue Maalem */}
                    {role === 'MAALEM' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-gradient-to-r from-amber-950/70 to-slate-900 border border-amber-500/40 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                          <Coins weight="duotone" className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-amber-300 flex items-center gap-1">
                            <span>🎁 Bonus Inscription : +15.00 DH Offert</span>
                          </p>
                          <p className="text-[10px] text-slate-300">Crédité automatiquement pour tester vos premières réceptions de leads SOS !</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Nom Complet */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Nom complet :</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Hassan El Bahi"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors shadow-sm"
                      />
                    </div>

                    {/* Ville & Quartier Séparés et Propres */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Ville */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Ville :</label>
                          <CustomDropdown
                            options={cityOptions}
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Choisir une ville..."
                            icon={Buildings}
                          />
                        </div>

                        {/* Quartier */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Quartier / Zone :</label>
                          <CustomDropdown
                            options={districtOptions}
                            value={selectedDistrict}
                            onChange={(newDistrict) => setSelectedDistrict(newDistrict)}
                            placeholder="Choisir un quartier..."
                            icon={MapPinLine}
                          />
                        </div>
                      </div>

                      {/* Bouton Tactile GPS */}
                      <button
                        type="button"
                        onClick={handleDetectGPS}
                        disabled={detectingGps}
                        className="w-full py-2 px-3 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
                      >
                        <Navigation className={`w-3.5 h-3.5 text-cyan-400 ${detectingGps ? 'animate-spin' : ''}`} />
                        <span>{detectingGps ? 'Localisation en cours...' : '📍 Détecter ma Ville & Quartier par GPS'}</span>
                      </button>
                    </div>

                    {/* Spécialité Principale si Maâlem */}
                    {role === 'MAALEM' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                            <PhosphorWrench weight="duotone" className="w-3.5 h-3.5 text-amber-400" />
                            <span>Spécialité Principale :</span>
                          </label>
                          <SpecialtySelect
                            value={specialty}
                            onChange={(newVal) => setSpecialty(newVal)}
                          />
                        </div>

                        {/* Section Portfolio de Réalisations (1 à 3 Photos Facultatives) */}
                        <div className="bg-slate-900/80 border border-amber-500/30 p-3 rounded-2xl space-y-2 shadow-inner">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5 text-amber-400" />
                              <span>Portfolio Chantiers (Optionnel) :</span>
                            </label>
                            <span className="text-[10px] font-mono text-amber-400/80 font-bold bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                              {portfolioPhotos.length}/3 photos
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            Téléversez 1 à 3 photos de vos chantiers passés pour valoriser votre profil auprès des clients.
                          </p>

                          {/* Photos Grid & Upload Trigger */}
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            {portfolioPhotos.map((photo, idx) => (
                              <div key={idx} className="relative group rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 aspect-square flex items-center justify-center shadow-md">
                                <img
                                  src={photo.preview}
                                  alt={`Chantier ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePortfolioPhoto(idx)}
                                  className="absolute top-1 right-1 p-1 bg-red-950/90 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-900 hover:text-white transition-all shadow-sm cursor-pointer"
                                  title="Supprimer cette photo"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                                <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-slate-950/80 text-[9px] font-mono font-bold text-amber-300 border border-amber-500/30">
                                  #{idx + 1}
                                </span>
                              </div>
                            ))}

                            {/* Slot Bouton d'Ajout si moins de 3 photos */}
                            {portfolioPhotos.length < 3 && (
                              <label className="border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-900/90 rounded-xl aspect-square flex flex-col items-center justify-center gap-1 cursor-pointer transition-all p-1 text-center group">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handlePortfolioSelect}
                                  className="hidden"
                                />
                                <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Plus className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[9px] font-bold text-cyan-300 leading-none">
                                  + Photo
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Phone Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Numéro de Téléphone Maroc (+212) :</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 text-xs font-bold font-mono dir-ltr flex items-center gap-1">
                      <span>🇲🇦</span>
                      <span>+212</span>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="661001122"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full pl-20 pr-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono text-sm font-bold focus:border-cyan-400 focus:outline-none transition-colors shadow-sm dir-ltr tracking-wider"
                    />
                  </div>
                </div>

                {/* Verification Channel Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Envoi du code via :</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setChannel('whatsapp')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        channel === 'whatsapp'
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <WhatsappLogo weight="duotone" className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setChannel('sms')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        channel === 'sms'
                          ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <ChatCenteredText weight="duotone" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                      <span>SMS Direct</span>
                    </button>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all mt-2 cursor-pointer"
                >
                  <span>{loading ? 'Envoi du code OTP...' : authMode === 'SIGN_UP' ? 'Créer Mon Compte (Sign Up)' : 'Recevoir le Code OTP (Sign In)'}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
              </form>
            ) : (
              /* Step 2: OTP Verification */
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="p-3.5 bg-slate-900/90 border border-cyan-500/30 rounded-2xl text-xs text-slate-300 text-center space-y-1">
                  <p className="font-bold text-white">{infoMsg || 'Saisissez le code de vérification reçu.'}</p>
                  <p className="text-[11px] text-slate-400">Numéro destinataire : <strong className="text-cyan-300 font-mono">+212 {phone}</strong></p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 text-center">Code de Vérification</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3.5 bg-slate-900 border border-cyan-500/40 rounded-xl text-cyan-300 font-mono text-center text-2xl font-black tracking-widest focus:border-cyan-400 focus:outline-none transition-colors shadow-inner"
                    autoFocus
                  />
                </div>

                {/* Bouton raccourci Démo & Minuteur de renvoi */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setOtp('123456')}
                    className="text-[11px] text-cyan-400/80 hover:text-cyan-300 font-mono flex items-center gap-1 underline"
                  >
                    <Sparkle weight="fill" className="w-3 h-3 text-cyan-400" />
                    <span>Remplir code démo (123456)</span>
                  </button>

                  {resendCountdown > 0 ? (
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <ClockCounterClockwise className="w-3 h-3" />
                      <span>Renvoyer ({resendCountdown}s)</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Renvoyer le code</span>
                    </button>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{loading ? 'Validation en cours...' : 'Valider & Entrer'}</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-slate-400 hover:text-cyan-300 pt-1 font-bold cursor-pointer"
                >
                  ← Modifier le numéro de téléphone
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
