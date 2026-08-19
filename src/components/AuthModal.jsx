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
  Lock,
  ArrowLeft,
  ChevronDown,
  Globe,
  Briefcase,
  Zap,
  Check
} from 'lucide-react';
import { 
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
      'Maârif', 'Gauthier', 'Anfa', 'Bourgogne', 'Sidi Belyout', 'Ain Diab',
      'Oasis', 'Polo', 'Californie', 'CIL', 'Belvédère', 'Roches Noires',
      'Ain Sebaâ', 'Sidi Bernoussi', 'Sidi Moumen', 'Moulay Rachid', 'Ben M\'sik',
      'Hay Hassani', 'Oulfa', 'Lissasfa', 'Errahma', 'Derb Sultan', 'Sbata',
      'Mers Sultan', '2 Mars', 'Val Fleuri', 'Racine', 'Palmier', 'Bouskoura',
      'Dar Bouazza', 'Mediouna', 'Tit Mellil', 'Zenata', 'Mohammedia', 'Nouaceur'
    ]
  },
  {
    name: 'Rabat',
    lat: 34.020882,
    lng: -6.84165,
    districts: [
      'Agdal', 'Hassan', 'Souissi', 'Hay Riad', 'Les Orangers', 'Océan',
      'Diour Jamaa', 'Yacoub El Mansour', 'Aviation', 'Mabella', 'Takaddoum',
      'Hay El Fath', 'Youssoufia', 'Akkari', 'Guich Loudaya'
    ]
  },
  {
    name: 'Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    districts: [
      'Guéliz', 'Hivernage', 'Médina', 'Palmeraie', 'Targa', 'Semlalia',
      'Massira', 'Daoudiate', 'Sidi Youssef Ben Ali', 'Mhamid', 'Amerchich',
      'Ain Itti', 'Bab Doukkala', 'Annakhil', 'Iziki', 'Sidi Ghanem', 'Socoma'
    ]
  },
  {
    name: 'Tanger',
    lat: 35.7595,
    lng: -5.834,
    districts: [
      'Centre-Ville / Boulevard', 'Malabata', 'Médina', 'Marchan', 'Iberia',
      'California', 'Boubana', 'Val Fleuri', 'Mesnana', 'Beni Makada',
      'Moghogha', 'Tanja Balia', 'Achakar', 'Gzenaya', 'Boukhalef'
    ]
  },
  {
    name: 'Agadir',
    lat: 30.4278,
    lng: -9.5981,
    districts: [
      'Centre-Ville', 'Founty / Baie des Palmiers', 'Talborjt', 'Dakhla',
      'Salam', 'Al Houda', 'Sonaba', 'Charaf', 'Tikiouine', 'Bensergao',
      'Anza', 'Aourir', 'Taghazout', 'Drarga'
    ]
  },
  {
    name: 'Fès',
    lat: 34.0181,
    lng: -5.0078,
    districts: [
      'Ville Nouvelle', 'Médina / Fès El Bali', 'Atlas', 'Narjiss', 'Route d\'Imouzzer',
      'Champ de Course', 'Mont Fleuri', 'Saada', 'Zouagha', 'Bensouda', 'Ain Chkef'
    ]
  },
  {
    name: 'Salé',
    lat: 34.0531,
    lng: -6.7985,
    districts: [
      'Tabriquet', 'Bettana', 'Bab Lamrissa', 'Sidi Moussa', 'Sala Al Jadida',
      'Hay Salam', 'Hay Rahma', 'Karia', 'Laayayda', 'Bouknadel'
    ]
  },
  {
    name: 'Témara',
    lat: 33.9267,
    lng: -6.9122,
    districts: [
      'Centre Témara', 'Massira 1 & 2', 'Wifaq', 'Fouarat', 'Harhoura',
      'Val d\'Or', 'Sables d\'Or', 'Sid El Abed', 'Ain Attig'
    ]
  },
  {
    name: 'Meknès',
    lat: 33.8731,
    lng: -5.5407,
    districts: [
      'Hamria', 'Médina', 'Plaisance', 'Bassatine', 'Marjane', 'Mansour',
      'Toulal', 'Sidi Saïd', 'Zitoune', 'Riad'
    ]
  },
  {
    name: 'Kénitra',
    lat: 34.261,
    lng: -6.5802,
    districts: [
      'Centre-Ville', 'Mimosas', 'Bir Rami', 'Mehdia', 'Val Fleuri',
      'Ouled Oujih', 'Saknia', 'Alliance Darna', 'Tayba'
    ]
  },
  {
    name: 'Oujda',
    lat: 34.6814,
    lng: -1.9086,
    districts: [
      'Centre-Ville', 'Al Qods', 'Lazaret', 'Mir Ali', 'Golf', 'Hay Andalous',
      'Sidi Yahya', 'Universités'
    ]
  },
  {
    name: 'Tétouan',
    lat: 35.5889,
    lng: -5.3626,
    districts: [
      'Centre-Ville / Ensanche', 'Médina', 'Wilaya', 'Saniat Rmel', 'Touilaa',
      'Martil', 'Cabo Negro', 'M\'diq'
    ]
  },
  {
    name: 'Safi',
    lat: 32.2994,
    lng: -9.2372,
    districts: [
      'Plateau', 'Biada', 'Médina', 'Kouass', 'Saada', 'Jrifat', 'Sidi Bouzid'
    ]
  },
  {
    name: 'El Jadida',
    lat: 33.2316,
    lng: -8.5007,
    districts: [
      'Plateau', 'Cité Portugaise', 'Plage / Corniche', 'Nassim', 'Salam',
      'Najd', 'Sidi Bouzid', 'Haouzia'
    ]
  },
  {
    name: 'Nador',
    lat: 35.1681,
    lng: -2.9335,
    districts: [
      'Centre-Ville', 'Corniche', 'Al Matar', 'Ouled Mimoun', 'Beni Ensar',
      'Selouane', 'Zeghanghane'
    ]
  },
  {
    name: 'Béni Mellal',
    lat: 32.3373,
    lng: -6.3498,
    districts: [
      'Centre-Ville', 'Ain Asserdoun', 'Atlas', 'Riad Salam', 'Massira', 'Oulad Hamdane'
    ]
  },
  {
    name: 'Mohammedia',
    lat: 33.6866,
    lng: -7.3828,
    districts: [
      'Parc', 'Kasbah', 'Plage des Sablettes', 'Plage Monica', 'Riad Salam',
      'El Alia', 'Rachidia', 'Nasr'
    ]
  },
  {
    name: 'Essaouira',
    lat: 31.5085,
    lng: -9.7595,
    districts: [
      'Médina', 'Borj', 'Ghazoua', 'Diabat', 'Tafektalt', 'Lagouira'
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
  
  // Rôle Actif : CLIENT ou MAALEM
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' (Cyan) | 'MAALEM' (Ambre/Or)
  
  // Étape du flux Smart Login :
  // 1: Entrée Rapide (Téléphone / Google)
  // 'ENTER_PIN': Connexion Rapide PIN (Utilisateur existant reconnu)
  // 'SIGNUP_DETAILS': Complément d'infos (Nom, Ville, Spécialité)
  // 2: Code SMS OTP (6 chiffres)
  // 3: Définition du Code PIN Secret (4 chiffres)
  const [step, setStep] = useState(1);
  const [authMode, setAuthMode] = useState('SIGN_IN'); // 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PIN'
  const [existingUserName, setExistingUserName] = useState('');

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

  // Handler de changement de ville
  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const matched = MOROCCAN_CITIES.find((c) => c.name === newCity);
    if (matched && matched.districts && matched.districts.length > 0) {
      setSelectedDistrict(matched.districts[0]);
    }
  };

  // Timer de renvoi OTP
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Construction du numéro international complet
  const getFullInternationalNumber = () => {
    let clean = phone.replace(/[\s\-\.\(\)]/g, '');
    if (clean.startsWith('0')) clean = clean.substring(1);
    const dial = selectedCountry.dial.replace('+', '');
    if (clean.startsWith(dial)) {
      return '+' + clean;
    }
    return `${selectedCountry.dial}${clean}`;
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\d\s\-\.]/g, '');
    setPhone(val);
    setErrorBanner('');
    setConflictMsg('');
  };

  // Fermer la modal et réinitialiser
  const handleClose = () => {
    setAuthModalOpen(false);
    setStep(1);
    setAuthMode('SIGN_IN');
    setPhone('');
    setFullName('');
    setLoginPin(['', '', '', '']);
    setNewPin(['', '', '', '']);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorBanner('');
    setConflictMsg('');
    setInfoMsg('');
    setGpsSuccessMsg('');
    setExistingUserName('');
  };

  // Saisie PIN Connexion
  const handleLoginPinChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const digit = val.slice(-1);
    const nextPin = [...loginPin];
    nextPin[idx] = digit;
    setLoginPin(nextPin);
    setErrorBanner('');

    if (digit && idx < 3) {
      loginPinRefs.current[idx + 1]?.focus();
    }
    if (idx === 3 && digit && nextPin.every((d) => d !== '')) {
      handleDirectLogin(nextPin.join(''));
    }
  };

  const handleLoginPinKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !loginPin[idx] && idx > 0) {
      loginPinRefs.current[idx - 1]?.focus();
    }
  };

  // Saisie PIN Nouveau Compte
  const handleNewPinChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const digit = val.slice(-1);
    const nextPin = [...newPin];
    nextPin[idx] = digit;
    setNewPin(nextPin);
    setErrorBanner('');

    if (digit && idx < 3) {
      newPinRefs.current[idx + 1]?.focus();
    }
  };

  const handleNewPinKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !newPin[idx] && idx > 0) {
      newPinRefs.current[idx - 1]?.focus();
    }
  };

  // Saisie Code OTP (6 chiffres)
  const handleOtpDigitChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    
    // Support du copier/coller d'un code entier
    if (val.length > 1) {
      const pasted = val.replace(/\D/g, '').slice(0, 6).split('');
      const updated = [...otpDigits];
      pasted.forEach((char, pIdx) => {
        if (pIdx < 6) updated[pIdx] = char;
      });
      setOtpDigits(updated);
      const nextIdx = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      if (updated.every((d) => d !== '')) {
        handleOtpProceed(updated.join(''));
      }
      return;
    }

    const digit = val.slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[idx] = digit;
    setOtpDigits(nextDigits);
    setErrorBanner('');

    if (digit && idx < 5) {
      otpInputRefs.current[idx + 1]?.focus();
    }
    if (idx === 5 && digit && nextDigits.every((d) => d !== '')) {
      handleOtpProceed(nextDigits.join(''));
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      otpInputRefs.current[idx - 1]?.focus();
    }
  };

  // Détection GPS automatique
  const [gpsErrorMsg, setGpsErrorMsg] = useState('');
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsErrorMsg('GPS non disponible');
      setTimeout(() => setGpsErrorMsg(''), 3000);
      return;
    }
    setDetectingGps(true);
    setGpsSuccessMsg('');
    setGpsErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let closestCity = MOROCCAN_CITIES[0];
        let minDistance = Infinity;

        MOROCCAN_CITIES.forEach((city) => {
          const dLat = city.lat - latitude;
          const dLng = city.lng - longitude;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);
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
        setGpsSuccessMsg(`📍 Position détectée : ${closestCity.name}`);
        setTimeout(() => setGpsSuccessMsg(''), 4000);
      },
      () => {
        setDetectingGps(false);
        setGpsErrorMsg('GPS refusé (sélectionnez votre ville ci-dessus)');
        setTimeout(() => setGpsErrorMsg(''), 3500);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // ====================================================================
  // ACTIONS SMART LOGIN
  // ====================================================================

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

  // ÉTAPE 1 : VÉRIFICATION INTELLIGENTE DU NUMÉRO (SMART UNIFIED FLOW)
  const handleSmartPhoneSubmit = async (e) => {
    if (e) e.preventDefault();
    const clean = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!clean || clean.length < 6) {
      setErrorBanner('Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');
    setConflictMsg('');

    try {
      const profileCheck = await checkPhoneProfile(fullNumber);

      if (profileCheck?.exists) {
        // SCÉNARIO A : UTILISATEUR EXISTANT -> Connexion directe par PIN
        setExistingUserName(profileCheck.fullName || '');
        if (profileCheck.role) {
          setRole(profileCheck.role);
        }
        setAuthMode('SIGN_IN');
        setStep('ENTER_PIN');
        setLoginPin(['', '', '', '']);
        setTimeout(() => loginPinRefs.current[0]?.focus(), 150);
      } else {
        // SCÉNARIO B : NOUVEL UTILISATEUR -> Complément d'inscription
        setAuthMode('SIGN_UP');
        setStep('SIGNUP_DETAILS');
      }
    } catch (err) {
      // En cas d'erreur de vérification, basculer en mode inscription classique
      setAuthMode('SIGN_UP');
      setStep('SIGNUP_DETAILS');
    } finally {
      setLoading(false);
    }
  };

  // ACTION CONNEXION PIN (UTILISATEUR EXISTANT)
  const handleDirectLogin = async (pinCode) => {
    const fullNumber = getFullInternationalNumber();
    const finalPin = pinCode || loginPin.join('');
    if (finalPin.length !== 4) {
      setErrorBanner('Veuillez saisir les 4 chiffres de votre Code PIN.');
      return;
    }

    setLoading(true);
    setErrorBanner('');

    try {
      await loginWithPin({ phone: fullNumber, pin: finalPin });
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code PIN incorrect.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION ENVOI SMS INSCRIPTION (DEPUIS SIGNUP_DETAILS)
  const handleProceedSignUpDetails = async (e) => {
    if (e) e.preventDefault();
    if (!fullName.trim()) {
      setErrorBanner('Veuillez renseigner votre nom.');
      return;
    }

    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');

    try {
      await sendPhoneOTP(fullNumber, 'sms', selectedCountry.dial);
      setStep(2);
      setResendCountdown(60);
      setInfoMsg(`Code SMS envoyé au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code SMS.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION DÉPART PIN OUBLIÉ
  const handleStartForgotPin = async () => {
    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');
    setAuthMode('FORGOT_PIN');

    try {
      await sendPhoneOTP(fullNumber, 'sms', selectedCountry.dial);
      setStep(2);
      setResendCountdown(60);
      setInfoMsg(`Code de réinitialisation envoyé par SMS au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code SMS.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION VALIDATION OTP
  const handleOtpProceed = (code) => {
    const token = code || otpDigits.join('');
    if (token.length < 6) {
      setErrorBanner('Veuillez saisir les 6 chiffres du code SMS.');
      return;
    }
    setErrorBanner('');
    setStep(3);
    setTimeout(() => newPinRefs.current[0]?.focus(), 150);
  };

  // ACTION FINALISATION DU PIN
  const handleFinalizePin = async (e) => {
    if (e) e.preventDefault();
    const pinStr = newPin.join('');
    if (pinStr.length !== 4) {
      setErrorBanner('Le Code PIN doit comporter exactement 4 chiffres.');
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
            className={`bg-slate-950/95 backdrop-blur-xl border rounded-2xl max-w-[420px] w-full p-4 sm:p-5 shadow-2xl relative text-slate-100 transition-colors duration-300 overflow-hidden ${
              isClient 
                ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                : 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
            }`}
          >
            {/* TOP BAR : Titre contextuel + Fermer */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isClient ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'} animate-pulse`} />
                <h3 className="text-sm font-black text-white tracking-tight">
                  {step === 1 && (isClient ? 'Espace Client BricoleMoi' : 'Espace Artisan Maâlem Pro')}
                  {step === 'ENTER_PIN' && 'Connexion Rapide par PIN'}
                  {step === 'SIGNUP_DETAILS' && (isClient ? 'Nouveau Compte Client' : 'Inscription Maâlem Pro')}
                  {step === 2 && 'Vérification SMS'}
                  {step === 3 && 'Sécuriser avec un Code PIN'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SWITCHER DISCRET DE RÔLE (Écran 1) */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole('CLIENT');
                    setErrorBanner('');
                  }}
                  className={`py-1.5 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isClient
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
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
                  }}
                  className={`py-1.5 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    !isClient
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
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

            {/* Bannières d'alertes */}
            {errorBanner && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-2.5 p-2 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-[11px] flex items-center gap-1.5"
              >
                <span className="text-red-400 font-bold">⚠️</span>
                <span>{errorBanner}</span>
              </motion.div>
            )}

            {infoMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-2.5 p-2 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-200 text-[11px] text-center"
              >
                {infoMsg}
              </motion.div>
            )}

            {gpsSuccessMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-2.5 p-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-[11px] font-bold text-center"
              >
                {gpsSuccessMsg}
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 1 : SMART ENTRÉE UNIQUE (GOOGLE OU TÉLÉPHONE)      */}
            {/* ======================================================== */}
            {step === 1 && (
              <div className="space-y-3">
                {/* 1-Clic Google (Client) */}
                {isClient && (
                  <>
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
                      <span className="bg-slate-950 px-2 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                        ou avec votre numéro
                      </span>
                      <div className="border-t border-slate-800 w-full" />
                    </div>
                  </>
                )}

                {/* Bandeau Bonus Pro pour Maâlem */}
                {!isClient && (
                  <div className="p-2.5 bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 rounded-xl flex items-center gap-2.5 shadow-sm">
                    <Coins weight="duotone" className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-[11px] font-bold text-amber-300">
                      🎁 <strong>+15.00 DH</strong> offerts immédiatement pour vos premiers chantiers !
                    </p>
                  </div>
                )}

                {/* Formulaire Numéro Unique */}
                <form onSubmit={handleSmartPhoneSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                      Entrez votre numéro de téléphone :
                    </label>
                    <div className="relative">
                      {renderCountryCodeSelector()}
                      <input
                        type="tel"
                        required
                        placeholder={selectedCountry.placeholder || '612345678'}
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-24 sm:pl-26 pr-3 py-2.5 bg-slate-900 border rounded-xl text-slate-100 font-mono text-sm font-bold focus:outline-none dir-ltr tracking-wider transition-all ${
                          isClient
                            ? 'border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                            : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30'
                        }`}
                        autoFocus
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
                      isClient
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    }`}
                  >
                    <span>{loading ? 'Vérification...' : 'Continuer →'}</span>
                  </motion.button>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN : CONNEXION RAPIDE PIN (UTILISATEUR RECONNU)       */}
            {/* ======================================================== */}
            {step === 'ENTER_PIN' && (
              <form onSubmit={(e) => { e.preventDefault(); handleDirectLogin(); }} className="space-y-3">
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isClient ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                    }`}>
                      {existingUserName ? existingUserName.charAt(0).toUpperCase() : '👤'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {existingUserName ? `Ravi de vous revoir, ${existingUserName} !` : 'Ravi de vous revoir !'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">{getFullInternationalNumber()}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorBanner('');
                    }}
                    className="text-[10px] text-slate-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-300">Code PIN Secret (4 chiffres) :</label>
                    <button
                      type="button"
                      onClick={handleStartForgotPin}
                      disabled={loading}
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
                        autoFocus={idx === 0}
                        className={`h-11 text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                          digit
                            ? isClient
                              ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-[1.02]'
                              : 'bg-amber-950/40 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-[1.02]'
                            : 'bg-slate-900/90 border-slate-700 text-cyan-300 hover:border-cyan-500/50'
                        } focus:ring-2 ${isClient ? 'focus:border-cyan-300 focus:ring-cyan-400/30' : 'focus:border-amber-300 focus:ring-amber-400/30'}`}
                      />
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1 ${
                    isClient
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{loading ? 'Connexion...' : 'Se Connecter'}</span>
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN : COMPLÉMENT D'INSCRIPTION (NOUVEAU COMPTE)        */}
            {/* ======================================================== */}
            {step === 'SIGNUP_DETAILS' && (
              <form onSubmit={handleProceedSignUpDetails} className="space-y-2.5">
                {/* Rappel du Numéro */}
                <div className="p-2 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <DeviceMobile weight="duotone" className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-bold text-white">{getFullInternationalNumber()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorBanner('');
                    }}
                    className="text-[10px] text-cyan-400 hover:underline font-bold"
                  >
                    Modifier
                  </button>
                </div>

                {/* Spécialité pour Maâlem */}
                {!isClient && (
                  <div>
                    <label className="text-[10px] font-bold text-amber-300 mb-1 block">Votre Spécialité :</label>
                    <SpecialtySelect value={specialty} onChange={setSpecialty} />
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label className="text-[10px] font-bold text-slate-300 mb-1 block">
                    {isClient ? 'Votre Nom Complet :' : 'Nom de l\'artisan ou atelier :'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isClient ? 'Ex: Karim Benjelloun' : 'Ex: Atelier Pro Plomberie'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 text-xs font-bold focus:outline-none ${
                      isClient ? 'focus:border-cyan-400' : 'focus:border-amber-400'
                    }`}
                    autoFocus
                  />
                </div>

                {/* Ville & Zone avec GPS */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 block">Ville & Quartier :</label>
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
                </div>

                {/* Bouton GPS */}
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={detectingGps}
                  className={`w-full py-1.5 bg-slate-900/60 hover:bg-slate-800 border rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                    gpsErrorMsg ? 'border-amber-500/50 text-amber-300' : 'border-slate-800 hover:border-cyan-500/40 text-cyan-300'
                  }`}
                >
                  <Navigation className={`w-3 h-3 ${gpsErrorMsg ? 'text-amber-400' : 'text-cyan-400'} ${detectingGps ? 'animate-spin' : ''}`} />
                  <span>
                    {detectingGps 
                      ? 'Localisation en cours...' 
                      : gpsErrorMsg 
                      ? gpsErrorMsg 
                      : '📍 Détecter ma position automatiquement'}
                  </span>
                </button>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer mt-1 ${
                    isClient
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  <ChatCenteredText weight="duotone" className="w-4 h-4" />
                  <span>{loading ? 'Envoi du code...' : 'Recevoir mon Code SMS d\'activation →'}</span>
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 2 : VALIDATION DU CODE SMS OTP (6 CHIFFRES)        */}
            {/* ======================================================== */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleOtpProceed(); }} className="space-y-3">
                <div className="p-2.5 rounded-xl border bg-slate-900/90 border-cyan-500/30 text-slate-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <ChatCenteredText weight="duotone" className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white">Code de sécurité envoyé par SMS</p>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                        <span>{getFullInternationalNumber()}</span>
                        <span className="text-cyan-400/90 font-sans text-[9px] font-bold">(Expéditeur: BricoleMoi)</span>
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

                <div className="flex items-center justify-end text-[10px] pt-0.5">
                  {resendCountdown > 0 ? (
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg">
                      <ClockCounterClockwise className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>Renvoyer ({resendCountdown}s)</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={authMode === 'SIGN_UP' ? handleProceedSignUpDetails : handleStartForgotPin}
                      className="text-[10px] text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>Renvoyer le code SMS</span>
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
            {/* ÉCRAN 3 : DÉFINITION DU CODE PIN SECRET (4 CHIFFRES)     */}
            {/* ======================================================== */}
            {step === 3 && (
              <form onSubmit={handleFinalizePin} className="space-y-3">
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Sécurisez votre compte avec un Code PIN</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Ce code secret à 4 chiffres vous permettra de vous reconnecter en 1 seconde sur tous vos appareils.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 py-1">
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
                      onKeyDown={(e) => handleNewPinKeyDown(idx, e)}
                      autoFocus={idx === 0}
                      className={`h-12 text-center font-mono text-2xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                        digit
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : 'bg-slate-900/90 border-slate-700 text-cyan-300 hover:border-cyan-500/50'
                      } focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30`}
                    />
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading || newPin.some((d) => d === '')}
                  className={`w-full py-2.5 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isClient
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'Finalisation...' : 'Finaliser & Accéder à BricoleMoi 🚀'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
