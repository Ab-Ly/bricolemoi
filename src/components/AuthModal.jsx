import React, { useState, useEffect, useRef } from 'react';
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
  Plus,
  Lock,
  ArrowLeft
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
  MapPinLine,
  Password
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
      'Hay Riad',
      'Souissi',
      'Hassan',
      'Océan',
      'Yacoub El Mansour',
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
      'Targa',
      'Palmeraie',
      'Daoudiate',
      'Mhamid',
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
      'Marshan',
      'Boukhalef',
      'Val Fleuri',
      'Mesnana',
      'Toute la ville'
    ]
  },
  {
    name: 'Fès',
    lat: 34.0331,
    lng: -5.0003,
    districts: [
      'Ville Nouvelle',
      'Narjiss',
      'Route d\'Imouzzer',
      'Champs de Course',
      'Médina',
      'Toute la ville'
    ]
  },
  {
    name: 'Agadir',
    lat: 30.4278,
    lng: -9.5981,
    districts: [
      'Secteur Touristique',
      'Talborjt',
      'Dakhla',
      'Salam',
      'Haut Founty',
      'Tikiouine',
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
      'Hay Karima',
      'Sala Al Jadida',
      'Sidi Moussa',
      'Toute la ville'
    ]
  },
  {
    name: 'Meknès',
    lat: 33.8938,
    lng: -5.5516,
    districts: [
      'Hamria',
      'Marjane',
      'Bassatine',
      'Mansour',
      'Médina',
      'Toute la ville'
    ]
  },
  {
    name: 'Kénitra',
    lat: 34.2610,
    lng: -6.5802,
    districts: [
      'Centre-Ville',
      'Bir Rami',
      'Mehdia',
      'Mimosa',
      'Val Fleuri',
      'Toute la ville'
    ]
  },
  {
    name: 'Oujda',
    lat: 34.6814,
    lng: -1.9086,
    districts: [
      'Centre-Ville',
      'Al Qods',
      'Lazaret',
      'Mir Ali',
      'Toute la ville'
    ]
  },
  {
    name: 'Tétouan',
    lat: 35.5889,
    lng: -5.3626,
    districts: [
      'Centre-Ville',
      'Wilaya',
      'Martil',
      'Cabo Negro',
      'Toute la ville'
    ]
  },
  {
    name: 'Mohammédia',
    lat: 33.6866,
    lng: -7.3829,
    districts: [
      'Parc',
      'Rachidia',
      'El Alia',
      'Monica',
      'Toute la ville'
    ]
  },
  {
    name: 'El Jadida',
    lat: 33.2316,
    lng: -8.5007,
    districts: [
      'Centre-Ville',
      'Sidi Bouzid',
      'Plateau',
      'Al Qods',
      'Toute la ville'
    ]
  },
  {
    name: 'Nador',
    lat: 35.1688,
    lng: -2.9335,
    districts: [
      'Centre-Ville',
      'Al Matar',
      'Ouled Mimoun',
      'Toute la ville'
    ]
  },
  {
    name: 'Béni Mellal',
    lat: 32.3373,
    lng: -6.3498,
    districts: [
      'Centre-Ville',
      'Al Amal',
      'Riad Salam',
      'Toute la ville'
    ]
  },
  {
    name: 'Autre Ville',
    lat: 31.7917,
    lng: -7.0926,
    districts: [
      'Centre-Ville',
      'Zone Périurbaine',
      'Toute la zone'
    ]
  }
];

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    sendPhoneOTP, 
    verifyPhoneOTP, 
    loginWithPin, 
    resetPinWithOtp, 
    checkPhoneProfile, 
    currentRole, 
    t 
  } = useAuth();
  
  const [authMode, setAuthMode] = useState('SIGN_IN'); // 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PIN'
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' | 'MAALEM'
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  // 1: Phone & Details / Sign In, 2: OTP Verification, 3: Set PIN Code
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'sms'

  // PIN & OTP Inputs
  const [loginPin, setLoginPin] = useState(['', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '']);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const loginPinRefs = useRef([]);
  const newPinRefs = useRef([]);
  const otpInputRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [conflictMsg, setConflictMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsSuccessMsg, setGpsSuccessMsg] = useState('');

  useEffect(() => {
    if (authModalOpen && currentRole) {
      setRole(currentRole === 'ADMIN' ? 'CLIENT' : currentRole);
    }
  }, [authModalOpen, currentRole]);

  // Ville & Quartier
  const [selectedCity, setSelectedCity] = useState('Casablanca');
  const [selectedDistrict, setSelectedDistrict] = useState('Maârif');
  const [specialty, setSpecialty] = useState('PLUMBING');

  const cityOptions = MOROCCAN_CITIES.map((c) => ({ value: c.name, label: c.name }));
  const currentCityObj = MOROCCAN_CITIES.find((c) => c.name === selectedCity) || MOROCCAN_CITIES[0];
  const districtOptions = (currentCityObj.districts || []).map((d) => ({ value: d, label: d }));

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const targetCity = MOROCCAN_CITIES.find((c) => c.name === newCity);
    if (targetCity && targetCity.districts && targetCity.districts.length > 0) {
      setSelectedDistrict(targetCity.districts[0]);
    }
  };

  const [portfolioPhotos, setPortfolioPhotos] = useState([]);

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

  // Timer de renvoi
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
    setLoginPin(['', '', '', '']);
    setNewPin(['', '', '', '']);
    setOtpDigits(['', '', '', '', '', '']);
    setPortfolioPhotos([]);
  };

  const cleanMoroccanPhone = (input) => {
    let cleaned = String(input || '').replace(/\D/g, '');
    if (cleaned.startsWith('212')) cleaned = cleaned.substring(3);
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const sanitized = cleanMoroccanPhone(raw);
    setPhone(sanitized);
  };

  // Calculateur Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
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

  // --- GESTION DES CASES DU PIN DE CONNEXION (4 CHIFFRES) ---
  const handleLoginPinChange = (index, value) => {
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const next = [...loginPin];
      next[index] = '';
      setLoginPin(next);
      return;
    }

    if (clean.length > 1) {
      const pasted = clean.slice(0, 4).split('');
      const next = ['', '', '', ''];
      pasted.forEach((d, i) => { if (i < 4) next[i] = d; });
      setLoginPin(next);
      const target = Math.min(pasted.length, 3);
      loginPinRefs.current[target]?.focus();
      if (next.every(Boolean)) {
        handleDirectLogin(next.join(''));
      }
      return;
    }

    const next = [...loginPin];
    next[index] = clean[0];
    setLoginPin(next);

    if (index < 3) {
      loginPinRefs.current[index + 1]?.focus();
    } else if (next.every(Boolean)) {
      handleDirectLogin(next.join(''));
    }
  };

  const handleLoginPinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !loginPin[index] && index > 0) {
      loginPinRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      loginPinRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      loginPinRefs.current[index + 1]?.focus();
    }
  };

  // --- GESTION DES CASES DU NOUVEAU PIN (4 CHIFFRES) ---
  const handleNewPinChange = (index, value) => {
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const next = [...newPin];
      next[index] = '';
      setNewPin(next);
      return;
    }
    const next = [...newPin];
    next[index] = clean[0];
    setNewPin(next);
    if (index < 3) {
      newPinRefs.current[index + 1]?.focus();
    }
  };

  // --- GESTION DES CASES OTP (6 CHIFFRES) ---
  const handleOtpDigitChange = (index, value) => {
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const next = [...otpDigits];
      next[index] = '';
      setOtpDigits(next);
      return;
    }

    if (clean.length > 1) {
      const pasted = clean.slice(0, 6).split('');
      const next = ['', '', '', '', '', ''];
      pasted.forEach((d, i) => { if (i < 6) next[i] = d; });
      setOtpDigits(next);
      const target = Math.min(pasted.length, 5);
      otpInputRefs.current[target]?.focus();
      if (next.every(Boolean)) {
        handleOtpProceed(next.join(''));
      }
      return;
    }

    const next = [...otpDigits];
    next[index] = clean[0];
    setOtpDigits(next);

    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    } else if (next.every(Boolean)) {
      handleOtpProceed(next.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // 1. ACTION CONNEXION INSTANTANÉE (0 DH)
  const handleDirectLogin = async (pinCode) => {
    const sanitized = cleanMoroccanPhone(phone);
    if (!sanitized || sanitized.length < 9) {
      setErrorBanner('Veuillez saisir votre numéro marocain (ex: 661001122).');
      return;
    }
    const finalPin = pinCode || loginPin.join('');
    if (finalPin.length !== 4) {
      setErrorBanner('Veuillez saisir les 4 chiffres de votre Code PIN.');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      await loginWithPin({ phone: sanitized, pin: finalPin });
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code PIN incorrect ou compte introuvable.');
    } finally {
      setLoading(false);
    }
  };

  // 2. ACTION DÉPART INSCRIPTION AVEC DÉTECTION PROACTIVE
  const handleStartSignUp = async (e) => {
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
      // Détection Proactive : le numéro existe-t-il déjà ?
      const profileCheck = await checkPhoneProfile(sanitized);
      if (profileCheck?.exists) {
        const roleName = profileCheck.role === 'MAALEM' ? 'Artisan Maâlem Pro' : 'Client Particulier';
        setConflictMsg(`👋 Bon retour parmi nous ! Ce numéro est déjà enregistré en tant que ${roleName}. Veuillez vous connecter avec votre Code PIN.`);
        setRole(profileCheck.role);
        setAuthMode('SIGN_IN');
        setStep(1);
        setLoading(false);
        return;
      }

      // Nouveau compte : envoi OTP WhatsApp ou SMS
      const res = await sendPhoneOTP(sanitized, channel);
      setStep(2);
      setResendCountdown(60);
      if (res?.code) {
        setGeneratedOtp(res.code);
      }
      const channelLabel = (res?.channel || channel) === 'whatsapp' ? 'WhatsApp' : 'SMS Direct';
      setInfoMsg(`Code OTP à 6 chiffres envoyé via ${channelLabel} au +212 ${sanitized}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code OTP.');
    } finally {
      setLoading(false);
    }
  };

  // 3. ACTION DÉPART PIN OUBLIÉ
  const handleStartForgotPin = async (e) => {
    if (e) e.preventDefault();
    const sanitized = cleanMoroccanPhone(phone);
    if (!sanitized || sanitized.length < 9) {
      setErrorBanner('Veuillez saisir votre numéro de téléphone.');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      const profileCheck = await checkPhoneProfile(sanitized);
      if (!profileCheck?.exists) {
        setErrorBanner('Ce numéro n\'est associé à aucun compte. Veuillez d\'abord vous inscrire.');
        setLoading(false);
        return;
      }

      const res = await sendPhoneOTP(sanitized, channel);
      setStep(2);
      setResendCountdown(60);
      if (res?.code) {
        setGeneratedOtp(res.code);
      }
      setInfoMsg(`Code de sécurité envoyé via ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} au +212 ${sanitized}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code OTP.');
    } finally {
      setLoading(false);
    }
  };

  // 4. ACTION PASSAGE À L'ÉTAPE 3 (CHOIX DU PIN) APRÈS OTP
  const handleOtpProceed = (code) => {
    const token = code || otpDigits.join('');
    if (token.length < 6) {
      setErrorBanner('Veuillez saisir les 6 chiffres du code reçu.');
      return;
    }
    setErrorBanner('');
    setStep(3); // Passe à la création / réinitialisation du PIN
  };

  // 5. ACTION CRÉATION OU RÉINITIALISATION FINALE DU PIN
  const handleFinalizePin = async (e) => {
    if (e) e.preventDefault();
    const pinStr = newPin.join('');
    if (pinStr.length !== 4) {
      setErrorBanner('Le Code PIN secret doit comporter exactement 4 chiffres.');
      return;
    }

    setLoading(true);
    setErrorBanner('');

    const sanitized = cleanMoroccanPhone(phone);
    const otpToken = otpDigits.join('');

    try {
      if (authMode === 'SIGN_UP') {
        const combinedCityZone = `${selectedCity} - ${selectedDistrict}`;
        await verifyPhoneOTP({
          phone: sanitized,
          token: otpToken,
          pin: pinStr,
          role,
          fullName: fullName || (role === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
          cityZone: combinedCityZone,
          specialty,
          portfolioUrls: portfolioPhotos.map(p => p.preview),
          mode: 'SIGN_UP'
        });
      } else if (authMode === 'FORGOT_PIN') {
        await resetPinWithOtp({
          phone: sanitized,
          token: otpToken,
          newPin: pinStr
        });
      }
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Une erreur est survenue lors de la validation.');
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
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                {authMode === 'SIGN_IN' ? (
                  <Lock className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                ) : authMode === 'FORGOT_PIN' ? (
                  <KeyRound className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                )}
              </div>

              <h3 className="text-xl font-black text-white font-sans tracking-tight">
                {authMode === 'SIGN_IN'
                  ? 'Connexion Sécurisée'
                  : authMode === 'FORGOT_PIN'
                  ? (step === 1 ? 'Réinitialisation Code PIN' : step === 2 ? 'Code de Sécurité' : 'Nouveau Code PIN')
                  : (step === 1 ? 'Créer un Compte BricoleMoi' : step === 2 ? 'Vérification du Numéro' : 'Définir mon Code PIN')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'SIGN_IN'
                  ? 'Accédez à votre espace avec votre Code PIN secret'
                  : authMode === 'FORGOT_PIN'
                  ? 'Récupération sécurisée par WhatsApp ou SMS'
                  : (step === 1 ? 'Plateforme marocaine de dépannage express & artisans' : step === 2 ? `Entrez le code reçu au +212 ${phone}` : 'Définissez 4 chiffres pour vos prochaines connexions')}
              </p>

              {/* Mode Toggle Bar (SIGN_IN vs SIGN_UP) */}
              {step === 1 && authMode !== 'FORGOT_PIN' && (
                <div className="flex bg-slate-900 border border-cyan-500/20 p-1 rounded-xl mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('SIGN_IN');
                      setErrorBanner('');
                      setConflictMsg('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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

            {/* ======================================================== */}
            {/* VUE 1 : CONNEXION INSTANTANÉE (SIGN_IN)                  */}
            {/* ======================================================== */}
            {authMode === 'SIGN_IN' && (
              <form onSubmit={(e) => { e.preventDefault(); handleDirectLogin(); }} className="space-y-4">
                {/* Numéro de téléphone */}
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
                      autoFocus
                    />
                  </div>
                </div>

                {/* Saisie du PIN à 4 chiffres */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Code PIN Secret (4 chiffres) :</label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('FORGOT_PIN');
                        setStep(1);
                        setErrorBanner('');
                      }}
                      className="text-[11px] text-amber-400/90 hover:text-amber-300 underline font-medium cursor-pointer"
                    >
                      PIN oublié ?
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3 py-1">
                    {loginPin.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (loginPinRefs.current[idx] = el)}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={digit}
                        onChange={(e) => handleLoginPinChange(idx, e.target.value)}
                        onKeyDown={(e) => handleLoginPinKeyDown(idx, e)}
                        className={`h-14 text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
                          digit
                            ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                            : 'bg-slate-900/90 border-cyan-500/25 text-cyan-300 hover:border-cyan-500/50'
                        } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] focus:scale-105`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bouton de Connexion */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Se Connecter</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* VUE 2 : INSCRIPTION (SIGN_UP) & PIN OUBLIÉ (FORGOT_PIN)   */}
            {/* ======================================================== */}
            {(authMode === 'SIGN_UP' || authMode === 'FORGOT_PIN') && (
              <>
                {/* ETAPE 1 : Renseignements & Téléphone */}
                {step === 1 && (
                  <form onSubmit={authMode === 'SIGN_UP' ? handleStartSignUp : handleStartForgotPin} className="space-y-3.5">
                    
                    {authMode === 'SIGN_UP' && (
                      <>
                        {/* Role Selector */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Choisissez votre profil :</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setRole('CLIENT')}
                              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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

                        {/* Bonus Maalem */}
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

                        {/* Ville & Quartier */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
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

                        {/* Spécialité si Maâlem */}
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

                            {/* Portfolio */}
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

                              <div className="grid grid-cols-3 gap-2 pt-1">
                                {portfolioPhotos.map((photo, idx) => (
                                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 aspect-square flex items-center justify-center shadow-md">
                                    <img src={photo.preview} alt={`Chantier ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => handleRemovePortfolioPhoto(idx)}
                                      className="absolute top-1 right-1 p-1 bg-red-950/90 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-900 hover:text-white transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}

                                {portfolioPhotos.length < 3 && (
                                  <label className="border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-900/90 rounded-xl aspect-square flex flex-col items-center justify-center gap-1 cursor-pointer transition-all p-1 text-center group">
                                    <input type="file" accept="image/*" multiple onChange={handlePortfolioSelect} className="hidden" />
                                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                      <Plus className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[9px] font-bold text-cyan-300 leading-none">+ Photo</span>
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Numéro de Téléphone */}
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

                    {/* Canal de Réception */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-bold text-slate-300">Canal de réception du code :</label>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Instantané
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setChannel('whatsapp')}
                          className={`relative py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            channel === 'whatsapp'
                              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-400/70 shadow-[0_0_16px_rgba(16,185,129,0.35)] scale-[1.02]'
                              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300'
                          }`}
                        >
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-[9px] font-black text-slate-950 rounded-full shadow-sm tracking-wider uppercase">
                            Recommandé
                          </span>
                          <div className="flex items-center gap-1.5">
                            <WhatsappLogo weight="duotone" className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                            <span className="font-extrabold text-white">WhatsApp</span>
                          </div>
                          <span className="text-[9px] text-emerald-400/80 font-mono">Gratuit & Sans délai</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setChannel('sms')}
                          className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            channel === 'sms'
                              ? 'bg-cyan-950/90 text-cyan-200 border-cyan-400/70 shadow-[0_0_16px_rgba(6,182,212,0.35)] scale-[1.02]'
                              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <ChatCenteredText weight="duotone" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                            <span className="font-extrabold text-white">SMS Direct</span>
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono">Réseau GSM classique</span>
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all mt-2 cursor-pointer"
                    >
                      <span>{loading ? 'Vérification...' : authMode === 'SIGN_UP' ? 'Recevoir Mon Code OTP' : 'Recevoir le Code de Réinitialisation'}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.button>

                    {authMode === 'FORGOT_PIN' && (
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('SIGN_IN');
                          setStep(1);
                          setErrorBanner('');
                        }}
                        className="w-full text-center text-xs text-slate-400 hover:text-cyan-300 pt-1 font-bold cursor-pointer"
                      >
                        ← Retour à la connexion
                      </button>
                    )}
                  </form>
                )}

                {/* ETAPE 2 : Saisie du Code OTP (6 Chiffres) */}
                {step === 2 && (
                  <form onSubmit={(e) => { e.preventDefault(); handleOtpProceed(); }} className="space-y-4">
                    {/* Badge Canal */}
                    <div className="p-3.5 rounded-2xl border bg-slate-900/90 border-cyan-500/30 text-slate-200 flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                          {channel === 'whatsapp' ? <WhatsappLogo weight="duotone" className="w-5 h-5 text-emerald-400" /> : <ChatCenteredText weight="duotone" className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Code envoyé par {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}</p>
                          <p className="text-[11px] text-slate-400 font-mono">+212 {phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Grille 6 Chiffres */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Code à 6 chiffres :</label>
                      <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => (otpInputRefs.current[idx] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            autoFocus={idx === 0}
                            className={`h-13 sm:h-14 w-full text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
                              digit
                                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                                : 'bg-slate-900/90 border-cyan-500/25 text-cyan-300 hover:border-cyan-500/50'
                            } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] focus:scale-105`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Minuteur et Renvoi officiel */}
                    <div className="flex items-center justify-end pt-1">
                      {resendCountdown > 0 ? (
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                          <ClockCounterClockwise className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                          <span>Renvoyer le code ({resendCountdown}s)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={authMode === 'SIGN_UP' ? handleStartSignUp : handleStartForgotPin}
                          className="text-[11px] text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1.5 bg-amber-950/80 border border-amber-500/40 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Renvoyer un nouveau code</span>
                        </button>
                      )}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Valider le code & Continuer</span>
                    </motion.button>
                  </form>
                )}

                {/* ETAPE 3 : Choix du Code PIN Secret à 4 Chiffres */}
                {step === 3 && (
                  <form onSubmit={handleFinalizePin} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center space-y-1">
                      <p className="text-xs font-black text-cyan-300 flex items-center justify-center gap-1.5">
                        <Password className="w-4 h-4 text-cyan-400" />
                        <span>{authMode === 'SIGN_UP' ? 'Créez votre Code PIN Secret' : 'Définissez votre Nouveau Code PIN'}</span>
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Ce code à 4 chiffres vous servira pour vos futures connexions rapides et sans frais !
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300 text-center">Votre Code PIN à 4 chiffres :</label>
                      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 py-1">
                        {newPin.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => (newPinRefs.current[idx] = el)}
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={digit}
                            onChange={(e) => handleNewPinChange(idx, e.target.value)}
                            autoFocus={idx === 0}
                            className={`h-14 text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
                              digit
                                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                                : 'bg-slate-900/90 border-cyan-500/25 text-cyan-300 hover:border-cyan-500/50'
                            } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] focus:scale-105`}
                          />
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer mt-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Enregistrement en cours...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Finaliser & Accéder à BricoleMoi</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
