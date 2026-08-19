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
  Trash2,
  Plus,
  Lock,
  ArrowLeft,
  ChevronDown,
  Globe,
  Briefcase,
  Zap,
  Check
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
  Password,
  DeviceMobile,
  Handshake,
  ShieldStar
} from '@phosphor-icons/react';
import { SpecialtySelect } from './SpecialtySelect';
import { CustomDropdown } from './CustomDropdown';

export const COUNTRY_DIAL_CODES = [
  { code: 'MA', dial: '+212', flag: '🇲🇦', name: 'Maroc', placeholder: '661001122' },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France (MRE)', placeholder: '612345678' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Espagne (MRE)', placeholder: '612345678' },
  { code: 'BE', dial: '+32', flag: '🇧🇪', name: 'Belgique (MRE)', placeholder: '470123456' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italie (MRE)', placeholder: '3123456789' },
  { code: 'NL', dial: '+31', flag: '🇳🇱', name: 'Pays-Bas (MRE)', placeholder: '612345678' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Allemagne (MRE)', placeholder: '15123456789' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'Royaume-Uni', placeholder: '7123456789' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada (MRE)', placeholder: '5141234567' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'États-Unis', placeholder: '2025550123' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'Émirats (Dubaï)', placeholder: '501234567' },
  { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Arabie Saoudite', placeholder: '501234567' },
  { code: 'QA', dial: '+974', flag: '🇶🇦', name: 'Qatar', placeholder: '33123456' },
  { code: 'CH', dial: '+41', flag: '🇨🇭', name: 'Suisse (MRE)', placeholder: '781234567' },
  { code: 'SE', dial: '+46', flag: '🇸🇪', name: 'Suède (MRE)', placeholder: '701234567' }
];

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
    profileModalOpen,
    setProfileModalOpen,
    sendPhoneOTP, 
    verifyPhoneOTP, 
    loginWithPin, 
    resetPinWithOtp, 
    checkPhoneProfile, 
    loginWithGoogle,
    currentRole, 
    t 
  } = useAuth();
  
  // Séparation Fondamentale : Rôle Actif
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' (Cyan) | 'MAALEM' (Ambre/Or)
  // Mode : Inscription vs Connexion
  const [authMode, setAuthMode] = useState('SIGN_UP'); // 'SIGN_UP' | 'SIGN_IN' | 'FORGOT_PIN'

  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  // Pays / Indicatif
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_DIAL_CODES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef(null);

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

  // Si l'utilisateur est sur l'Espace MAALEM, forcer Maroc (+212)
  useEffect(() => {
    if (role === 'MAALEM') {
      setSelectedCountry(COUNTRY_DIAL_CODES[0]);
    }
  }, [role]);

  // 1: Formulaire / Sign In, 2: OTP (SMS / WhatsApp), 3: Choix du PIN
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState('sms'); // 'sms' (100% Garanti & Direct) | 'whatsapp'

  // PIN & OTP Inputs
  const [loginPin, setLoginPin] = useState(['', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '']);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

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
    setIsCountryOpen(false);
  };

  // Normalisation du numéro selon l'indicatif
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

  const getFullInternationalNumber = () => {
    const rawDigits = phone.replace(/\D/g, '');
    const dialDigits = selectedCountry.dial.replace(/\D/g, '');
    if (rawDigits.startsWith(dialDigits)) {
      return `+${rawDigits}`;
    }
    const clean = rawDigits.startsWith('0') ? rawDigits.substring(1) : rawDigits;
    return `${selectedCountry.dial}${clean}`;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const sanitized = cleanPhoneInput(raw, selectedCountry.dial);
    setPhone(sanitized);
  };

  // Calculateur Haversine GPS
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
      setErrorBanner('La géolocalisation n\'est pas disponible.');
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
        setGpsSuccessMsg(`📍 ${closestCity.name} détectée !`);
        setTimeout(() => setGpsSuccessMsg(''), 3000);
      },
      () => {
        setDetectingGps(false);
        setErrorBanner('Impossible de détecter la position.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // --- GESTION DU PIN (4 CHIFFRES) ---
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

  // --- GESTION OTP (6 CHIFFRES) ---
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

  // ACTION GOOGLE 1-CLIC
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');
    try {
      const authUser = await loginWithGoogle('CLIENT');
      handleClose();
      if (!authUser?.phone || authUser.phone.length < 8) {
        setProfileModalOpen(true);
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setErrorBanner(err.message || 'Impossible de se connecter avec Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ACTION CONNEXION INSTANTANÉE DIRECTE
  const handleDirectLogin = async (pinCode) => {
    const fullNumber = getFullInternationalNumber();
    if (!phone || phone.length < 6) {
      setErrorBanner('Veuillez saisir votre numéro de téléphone.');
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
      await loginWithPin({ phone: fullNumber, pin: finalPin });
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code PIN incorrect ou compte introuvable.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION DÉPART INSCRIPTION
  const handleStartSignUp = async (e) => {
    if (e) e.preventDefault();
    const fullNumber = getFullInternationalNumber();
    if (!phone || phone.length < 6) {
      setErrorBanner('Veuillez saisir un numéro valide.');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      const profileCheck = await checkPhoneProfile(fullNumber);
      if (profileCheck?.exists) {
        const roleName = profileCheck.role === 'MAALEM' ? 'Artisan Maâlem' : 'Client Particulier';
        setConflictMsg(`👋 Ce numéro est déjà inscrit (${roleName}). Connectez-vous avec votre PIN.`);
        setRole(profileCheck.role);
        setAuthMode('SIGN_IN');
        setStep(1);
        setLoading(false);
        return;
      }

      await sendPhoneOTP(fullNumber, channel, selectedCountry.dial);
      setStep(2);
      setResendCountdown(60);
      setInfoMsg(channel === 'whatsapp' ? `Code envoyé sur WhatsApp au ${fullNumber}` : `Code envoyé par SMS au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code OTP.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION DÉPART PIN OUBLIÉ
  const handleStartForgotPin = async (e) => {
    if (e) e.preventDefault();
    const fullNumber = getFullInternationalNumber();
    if (!phone || phone.length < 6) {
      setErrorBanner('Veuillez saisir votre numéro.');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      const profileCheck = await checkPhoneProfile(fullNumber);
      if (!profileCheck?.exists) {
        setErrorBanner('Ce numéro n\'est associé à aucun compte.');
        setLoading(false);
        return;
      }

      await sendPhoneOTP(fullNumber, channel, selectedCountry.dial);
      setStep(2);
      setResendCountdown(60);
      setInfoMsg(channel === 'whatsapp' ? `Code envoyé sur WhatsApp au ${fullNumber}` : `Code envoyé par SMS au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code OTP.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION VALIDATION OTP
  const handleOtpProceed = (code) => {
    const token = code || otpDigits.join('');
    if (token.length < 6) {
      setErrorBanner('Veuillez saisir les 6 chiffres du code.');
      return;
    }
    setErrorBanner('');
    setStep(3);
  };

  // ACTION FINALISATION DU PIN
  const handleFinalizePin = async (e) => {
    if (e) e.preventDefault();
    const pinStr = newPin.join('');
    if (pinStr.length !== 4) {
      setErrorBanner('Le Code PIN doit comporter 4 chiffres.');
      return;
    }

    setLoading(true);
    setErrorBanner('');
    const fullNumber = getFullInternationalNumber();
    const otpToken = otpDigits.join('');

    try {
      if (authMode === 'SIGN_UP') {
        const combinedCityZone = `${selectedCity} - ${selectedDistrict}`;
        await verifyPhoneOTP({
          phone: fullNumber,
          token: otpToken,
          pin: pinStr,
          role,
          fullName: fullName.trim() || (role === 'MAALEM' ? 'Artisan Maâlem' : 'Client Particulier'),
          cityZone: combinedCityZone,
          specialty,
          portfolioUrls: [],
          mode: 'SIGN_UP'
        });
      } else if (authMode === 'FORGOT_PIN') {
        await resetPinWithOtp({
          phone: fullNumber,
          token: otpToken,
          newPin: pinStr
        });
      }
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Erreur lors de la validation.');
    } finally {
      setLoading(false);
    }
  };

  // Render Sélecteur d'Indicatif Pays Compact
  const renderCountryCodeSelector = () => {
    if (role === 'MAALEM') {
      return (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-slate-950/90 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-mono font-bold shadow-inner z-10">
          <span>🇲🇦</span>
          <span>+212</span>
        </div>
      );
    }

    return (
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20" ref={countryDropdownRef}>
        <button
          type="button"
          onClick={() => setIsCountryOpen(!isCountryOpen)}
          className="flex items-center gap-1 px-2 py-1 bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 rounded-lg text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <span>{selectedCountry.flag}</span>
          <span>{selectedCountry.dial}</span>
          <ChevronDown className="w-2.5 h-2.5 text-cyan-400 opacity-70" />
        </button>

        {isCountryOpen && (
          <div className="absolute left-0 top-full mt-1 w-56 max-h-48 overflow-y-auto bg-slate-950/95 border border-cyan-500/50 rounded-xl shadow-2xl p-1 z-50 modal-scroll backdrop-blur-xl">
            {COUNTRY_DIAL_CODES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(c);
                  setIsCountryOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                  selectedCountry.code === c.code
                    ? 'bg-cyan-950 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </div>
                <span className="font-mono text-cyan-400 text-[10px] font-bold">{c.dial}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Sélecteur de Canal OTP (SMS / WhatsApp)
  const renderChannelSelector = (accent = 'cyan') => (
    <div className="space-y-1 my-1">
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/90 border border-slate-800 rounded-xl shadow-inner">
        <button
          type="button"
          onClick={() => setChannel('sms')}
          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            channel === 'sms'
              ? accent === 'amber'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)] border border-amber-400/50'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ChatCenteredText weight="duotone" className={`w-3.5 h-3.5 ${channel === 'sms' ? (accent === 'amber' ? 'text-slate-950' : 'text-white') : (accent === 'amber' ? 'text-amber-400' : 'text-cyan-400')}`} />
          <span>SMS Direct 💬</span>
        </button>

        <button
          type="button"
          onClick={() => setChannel('whatsapp')}
          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            channel === 'whatsapp'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] border border-emerald-400/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <WhatsappLogo weight="fill" className={`w-3.5 h-3.5 ${channel === 'whatsapp' ? 'text-white' : 'text-emerald-400'}`} />
          <span>WhatsApp 📲</span>
        </button>
      </div>
    </div>
  );

  const isClient = role === 'CLIENT';

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`bg-slate-950 border rounded-2xl max-w-[420px] w-full p-4 sm:p-5 shadow-2xl relative text-slate-100 transition-colors duration-300 overflow-hidden ${
              isClient 
                ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                : 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
            }`}
          >
            {/* TOP BAR COMPACTE : Titre + Fermer */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isClient ? 'bg-cyan-400' : 'bg-amber-400'} animate-pulse`} />
                <h3 className="text-sm font-black text-white tracking-tight">
                  {step === 2 
                    ? 'Code de Sécurité SMS'
                    : step === 3 
                    ? 'Définir mon Code PIN'
                    : authMode === 'SIGN_IN'
                    ? (isClient ? 'Connexion Espace Client' : 'Connexion Maâlem Pro')
                    : authMode === 'FORGOT_PIN'
                    ? 'Réinitialiser mon PIN'
                    : (isClient ? 'Créer mon Compte Client' : 'Inscription Maâlem Pro')}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SWITCHER UNIVERSEL CLIENT / MAALEM (Compact) */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 mb-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setRole('CLIENT');
                    setErrorBanner('');
                    setConflictMsg('');
                  }}
                  className={`py-1.5 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isClient
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <UserCircle weight="duotone" className="w-3.5 h-3.5" />
                  <span>Client Particulier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('MAALEM');
                    setErrorBanner('');
                    setConflictMsg('');
                  }}
                  className={`py-1.5 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    !isClient
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <PhosphorWrench weight="duotone" className="w-3.5 h-3.5" />
                  <span>Artisan Maâlem</span>
                  <span className="px-1 py-0.2 bg-amber-400 text-slate-950 text-[8px] font-black rounded-full uppercase ml-1">
                    +15 DH
                  </span>
                </button>
              </div>
            )}

            {/* SOUS-ONGLETS INSCRIPTION VS CONNEXION (Compact) */}
            {step === 1 && authMode !== 'FORGOT_PIN' && (
              <div className="flex bg-slate-900/60 border border-slate-800 p-0.5 rounded-lg mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('SIGN_UP');
                    setErrorBanner('');
                    setConflictMsg('');
                  }}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    authMode === 'SIGN_UP'
                      ? (isClient ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-black' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black')
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Nouveau Compte</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('SIGN_IN');
                    setErrorBanner('');
                    setConflictMsg('');
                  }}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    authMode === 'SIGN_IN'
                      ? (isClient ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-black' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black')
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LogIn className="w-3 h-3" />
                  <span>Se Connecter</span>
                </button>
              </div>
            )}

            {/* Messages compacts */}
            {conflictMsg && (
              <div className="mb-2 p-2 bg-amber-950/80 border border-amber-500/50 rounded-xl text-amber-200 text-[11px]">
                {conflictMsg}
              </div>
            )}

            {errorBanner && (
              <div className="mb-2 p-2 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-[11px]">
                {errorBanner}
              </div>
            )}

            {infoMsg && (
              <div className="mb-2 p-2 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-200 text-[11px] text-center">
                {infoMsg}
              </div>
            )}

            {gpsSuccessMsg && (
              <div className="mb-2 p-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-[11px] font-bold text-center">
                {gpsSuccessMsg}
              </div>
            )}

            {/* ======================================================== */}
            {/* VUE 1 : FORMULAIRES SANS SCROLL                         */}
            {/* ======================================================== */}
            {step === 1 && (
              <>
                {/* A. CLIENT : INSCRIPTION */}
                {isClient && authMode === 'SIGN_UP' && (
                  <div className="space-y-2.5">
                    {/* Bouton Google 1-Clic Compact */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-cyan-500/40 hover:border-cyan-400 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm active:scale-95 group"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Continuer avec Google (1-Clic)</span>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30 ml-auto">
                        Rapide
                      </span>
                    </motion.button>

                    <div className="relative flex items-center justify-center my-1.5">
                      <div className="border-t border-slate-800 w-full" />
                      <span className="bg-slate-950 px-2 text-[9px] text-slate-500 font-mono uppercase tracking-wider">ou par téléphone</span>
                      <div className="border-t border-slate-800 w-full" />
                    </div>

                    <form onSubmit={handleStartSignUp} className="space-y-2">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom complet"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 text-xs font-bold focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      {/* Ville & Quartier avec bouton GPS compact intégré */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="relative">
                          <CustomDropdown
                            options={cityOptions}
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Ville..."
                            icon={Buildings}
                          />
                        </div>
                        <div>
                          <CustomDropdown
                            options={districtOptions}
                            value={selectedDistrict}
                            onChange={(newDistrict) => setSelectedDistrict(newDistrict)}
                            placeholder="Quartier..."
                            icon={MapPinLine}
                          />
                        </div>
                      </div>

                      {/* Téléphone & Bouton GPS */}
                      <div className="flex gap-1.5">
                        <div className="relative flex-1">
                          {renderCountryCodeSelector()}
                          <input
                            type="tel"
                            required
                            placeholder={selectedCountry.placeholder || '612345678'}
                            value={phone}
                            onChange={handlePhoneChange}
                            className="w-full pl-24 sm:pl-26 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 font-mono text-xs font-bold focus:border-cyan-400 focus:outline-none dir-ltr tracking-wider"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleDetectGPS}
                          disabled={detectingGps}
                          title="Détecter ma position par GPS"
                          className="px-2.5 py-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 flex-shrink-0"
                        >
                          <Navigation className={`w-3.5 h-3.5 text-cyan-400 ${detectingGps ? 'animate-spin' : ''}`} />
                          <span className="hidden sm:inline">GPS</span>
                        </button>
                      </div>

                      {/* Sélecteur Canal WhatsApp / SMS */}
                      {renderChannelSelector('cyan')}

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1 ${
                          channel === 'whatsapp'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        }`}
                      >
                        {channel === 'whatsapp' ? (
                          <WhatsappLogo weight="fill" className="w-4 h-4 text-white" />
                        ) : (
                          <ChatCenteredText weight="duotone" className="w-4 h-4 text-white" />
                        )}
                        <span>{loading ? 'Vérification...' : (channel === 'whatsapp' ? 'Recevoir mon Code WhatsApp →' : 'Recevoir mon Code SMS →')}</span>
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* B. CLIENT : SE CONNECTER */}
                {isClient && authMode === 'SIGN_IN' && (
                  <div className="space-y-2.5">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl text-slate-100 text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm active:scale-95 group"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Connexion Rapide avec Google</span>
                    </motion.button>

                    <div className="relative flex items-center justify-center my-1.5">
                      <div className="border-t border-slate-800 w-full" />
                      <span className="bg-slate-950 px-2 text-[9px] text-slate-500 font-mono uppercase tracking-wider">ou par Code PIN</span>
                      <div className="border-t border-slate-800 w-full" />
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleDirectLogin(); }} className="space-y-2.5">
                      <div className="relative">
                        {renderCountryCodeSelector()}
                        <input
                          type="tel"
                          required
                          placeholder={selectedCountry.placeholder || '612345678'}
                          value={phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-24 sm:pl-26 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 font-mono text-xs font-bold focus:border-cyan-400 focus:outline-none dir-ltr tracking-wider"
                          autoFocus
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-300">Code PIN Secret (4 chiffres) :</label>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('FORGOT_PIN');
                              setStep(1);
                              setErrorBanner('');
                            }}
                            className="text-[10px] text-amber-400/90 hover:text-amber-300 underline font-medium cursor-pointer"
                          >
                            PIN oublié ?
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2 py-0.5">
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
                              className={`h-11 text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                                digit
                                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-[1.02]'
                                  : 'bg-slate-900/90 border-slate-700 text-cyan-300 hover:border-cyan-500/50'
                              } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30`}
                            />
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1"
                      >
                        {loading ? 'Connexion...' : 'Se Connecter'}
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* C. MAALEM : NOUVEAU COMPTE */}
                {!isClient && authMode === 'SIGN_UP' && (
                  <form onSubmit={handleStartSignUp} className="space-y-2.5">
                    {/* Bandeau Bonus Pro */}
                    <div className="p-2 bg-gradient-to-r from-amber-950/70 to-slate-900 border border-amber-500/40 rounded-xl flex items-center gap-2 shadow-sm">
                      <Coins weight="duotone" className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <p className="text-[10px] font-bold text-amber-300">
                        🎁 Bonus de Bienvenue : <strong>+15.00 DH</strong> crédités immédiatement pour vos premiers chantiers !
                      </p>
                    </div>

                    <div>
                      <SpecialtySelect value={specialty} onChange={setSpecialty} />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Nom de l'artisan ou atelier"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 text-xs font-bold focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <CustomDropdown
                        options={cityOptions}
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder="Ville..."
                        icon={Buildings}
                      />
                      <CustomDropdown
                        options={districtOptions}
                        value={selectedDistrict}
                        onChange={(newDistrict) => setSelectedDistrict(newDistrict)}
                        placeholder="Zone..."
                        icon={MapPinLine}
                      />
                    </div>

                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-amber-500/40 rounded-lg text-amber-300 text-xs font-mono font-bold">
                          <span>🇲🇦</span>
                          <span>+212</span>
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="661001122"
                          value={phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-24 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 font-mono text-xs font-bold focus:border-amber-400 focus:outline-none dir-ltr tracking-wider"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleDetectGPS}
                        disabled={detectingGps}
                        title="Détecter ma zone par GPS"
                        className="px-2.5 py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 flex-shrink-0"
                      >
                        <Navigation className={`w-3.5 h-3.5 text-amber-400 ${detectingGps ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">GPS</span>
                      </button>
                    </div>

                    {/* Sélecteur Canal WhatsApp / SMS */}
                    {renderChannelSelector('amber')}

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1"
                    >
                      {channel === 'whatsapp' ? (
                        <WhatsappLogo weight="fill" className="w-4 h-4 text-slate-950" />
                      ) : (
                        <Handshake weight="duotone" className="w-4 h-4 text-slate-950" />
                      )}
                      <span>{loading ? 'Validation...' : (channel === 'whatsapp' ? 'Rejoindre via Code WhatsApp →' : 'Rejoindre le Réseau Pro →')}</span>
                    </motion.button>
                  </form>
                )}

                {/* D. MAALEM : SE CONNECTER */}
                {!isClient && authMode === 'SIGN_IN' && (
                  <form onSubmit={(e) => { e.preventDefault(); handleDirectLogin(); }} className="space-y-3">
                    <div className="relative">
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-amber-500/40 rounded-lg text-amber-300 text-xs font-mono font-bold">
                        <span>🇲🇦</span>
                        <span>+212</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="661001122"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-24 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 font-mono text-xs font-bold focus:border-amber-400 focus:outline-none dir-ltr tracking-wider"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-300">Code PIN Secret Pro (4 chiffres) :</label>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('FORGOT_PIN');
                            setStep(1);
                            setErrorBanner('');
                          }}
                          className="text-[10px] text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                        >
                          PIN oublié ?
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2 py-0.5">
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
                            className={`h-11 text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                              digit
                                ? 'bg-amber-950/40 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-[1.02]'
                                : 'bg-slate-900/90 border-slate-700 text-amber-300 hover:border-amber-500/50'
                            } focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30`}
                          />
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1"
                    >
                      {loading ? 'Connexion...' : 'Accéder à mon Espace Pro'}
                    </motion.button>
                  </form>
                )}

                {/* E. PIN OUBLIÉ */}
                {authMode === 'FORGOT_PIN' && (
                  <form onSubmit={handleStartForgotPin} className="space-y-3">
                    <div className="relative">
                      {renderCountryCodeSelector()}
                      <input
                        type="tel"
                        required
                        placeholder={selectedCountry.placeholder || '612345678'}
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-24 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-mono text-xs font-bold focus:border-cyan-400 focus:outline-none dir-ltr tracking-wider"
                        autoFocus
                      />
                    </div>

                    {/* Sélecteur Canal WhatsApp / SMS */}
                    {renderChannelSelector('cyan')}

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={loading}
                      className={`w-full py-2.5 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
                        channel === 'whatsapp'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400'
                      }`}
                    >
                      {channel === 'whatsapp' ? (
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                      ) : (
                        <ChatCenteredText weight="duotone" className="w-4 h-4" />
                      )}
                      <span>{loading ? 'Envoi...' : (channel === 'whatsapp' ? 'Recevoir le Code WhatsApp →' : 'Recevoir le Code SMS →')}</span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('SIGN_IN');
                        setStep(1);
                        setErrorBanner('');
                      }}
                      className="w-full text-center text-[11px] text-slate-400 hover:text-cyan-300 font-bold cursor-pointer pt-1"
                    >
                      ← Revenir à la connexion
                    </button>
                  </form>
                )}
              </>
            )}

            {/* ======================================================== */}
            {/* ETAPE 2 : CODE OTP (WHATSAPP / SMS)                      */}
            {/* ======================================================== */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleOtpProceed(); }} className="space-y-3">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between shadow-sm ${
                  channel === 'whatsapp' 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100' 
                    : 'bg-slate-900/90 border-cyan-500/30 text-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {channel === 'whatsapp' ? (
                      <WhatsappLogo weight="fill" className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <ChatCenteredText weight="duotone" className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-[11px] font-bold text-white">
                        {channel === 'whatsapp' ? 'Code envoyé sur WhatsApp' : 'Code envoyé par SMS'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 flex-wrap">
                        <span>{getFullInternationalNumber()}</span>
                        {channel === 'whatsapp' && (
                          <span className="text-emerald-400/90 font-sans text-[9px] font-bold">
                            (Expéditeur: +212 638 853 698)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
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
                      className={`h-11 w-full text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                        digit
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : 'bg-slate-900/90 border-slate-700 text-cyan-300 hover:border-cyan-500/50'
                      } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] pt-0.5">
                  <button
                    type="button"
                    onClick={async () => {
                      const nextChannel = channel === 'whatsapp' ? 'sms' : 'whatsapp';
                      setChannel(nextChannel);
                      setLoading(true);
                      try {
                        const fullNumber = getFullInternationalNumber();
                        await sendPhoneOTP(fullNumber, nextChannel, selectedCountry.dial);
                        setResendCountdown(60);
                        setInfoMsg(nextChannel === 'whatsapp' ? `Code envoyé sur WhatsApp au ${fullNumber}` : `Code envoyé par SMS au ${fullNumber}`);
                      } catch (err) {
                        setErrorBanner(err.message || 'Erreur lors du renvoi.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer flex items-center gap-1"
                  >
                    {channel === 'whatsapp' ? '💬 Essayer par SMS' : '📲 Essayer par WhatsApp'}
                  </button>

                  {resendCountdown > 0 ? (
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg">
                      <ClockCounterClockwise className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>Renvoyer ({resendCountdown}s)</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={authMode === 'SIGN_UP' ? handleStartSignUp : handleStartForgotPin}
                      className="text-[10px] text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>Renvoyer</span>
                    </button>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valider le code & Continuer</span>
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* ETAPE 3 : DÉFINITION DU CODE PIN                         */}
            {/* ======================================================== */}
            {step === 3 && (
              <form onSubmit={handleFinalizePin} className="space-y-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-center space-y-0.5">
                  <p className="text-[11px] font-black text-cyan-300 flex items-center justify-center gap-1">
                    <Password className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{authMode === 'SIGN_UP' ? 'Créez votre Code PIN Secret' : 'Nouveau Code PIN'}</span>
                  </p>
                  <p className="text-[10px] text-slate-300">
                    Ce code à 4 chiffres vous servira pour toutes vos connexions futures.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 py-0.5">
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
                      className={`h-11 text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                        digit
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : 'bg-slate-900/90 border-slate-700 text-cyan-300 hover:border-cyan-500/50'
                      } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30`}
                    />
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1"
                >
                  {loading ? 'Finalisation...' : 'Finaliser & Accéder à BricoleMoi'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
