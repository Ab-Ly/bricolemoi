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
  Check,
  Smartphone,
  Shield,
  Search,
  Compass,
  MessageSquare
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
  ShieldStar,
  CheckCircle,
  SignIn,
  UserGear
} from '@phosphor-icons/react';
import { SpecialtySelect } from './SpecialtySelect';
import { CustomDropdown } from './CustomDropdown';
import { formatInternationalPhone } from '../lib/infobipAuthService';
import { reverseGeocodeMorocco } from '../lib/geoService';
import { COUNTRY_DIAL_CODES, MOROCCAN_CITIES } from '../constants/geo';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    setProfileModalOpen,
    sendPhoneOTP, 
    verifyPhoneOTP, 
    loginWithPin, 
    resetPinWithOtp, 
    checkPhoneProfile, 
    loginWithGoogle,
    linkGooglePhone,
    currentRole
  } = useAuth();
  
  // Rôle Actif : CLIENT ou MAALEM
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' (Cyan) | 'MAALEM' (Or/Ambre)
  
  // Étape du flux Guidé :
  // 1: Saisie Unique du Numéro de Téléphone (ou 1-Clic Google)
  // 'EXISTING_USER': Utilisateur déjà inscrit -> Saisie Code PIN ou SMS
  // 'NEW_USER': Nouveau profil -> Nom, Ville & Spécialité
  // 'OTP_VERIFY': Code de confirmation SMS (6 chiffres)
  // 'SET_PIN': Définition du Code PIN Secret (4 chiffres)
  const [step, setStep] = useState(1);
  const [authMode, setAuthMode] = useState('SIGN_IN'); // 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PIN'
  const [existingUser, setExistingUser] = useState(null);

  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  // Pays / Indicatif
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_DIAL_CODES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
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

  // Synchroniser le rôle si l'utilisateur est déjà dans un certain rôle
  useEffect(() => {
    if (authModalOpen && currentRole) {
      setRole(currentRole === 'ADMIN' ? 'CLIENT' : currentRole);
    }
  }, [authModalOpen, currentRole]);

  // PIN & OTP Inputs
  const [loginPin, setLoginPin] = useState(['', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '']);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  const loginPinRefs = useRef([]);
  const newPinRefs = useRef([]);
  const otpInputRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsSuccessMsg, setGpsSuccessMsg] = useState('');
  const [gpsErrorMsg, setGpsErrorMsg] = useState('');

  // Ville & Quartier (Lecture dynamique de l'intention accueil ou GPS existant)
  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      const intent = JSON.parse(localStorage.getItem('bricolemoi_pending_intent') || '{}');
      const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
      return intent.city || gps.city || 'Casablanca';
    } catch (e) {
      return 'Casablanca';
    }
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    try {
      const intent = JSON.parse(localStorage.getItem('bricolemoi_pending_intent') || '{}');
      const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
      const val = intent.district || gps.district || 'Maârif';
      return typeof val === 'object' ? (val.name || 'Maârif') : String(val);
    } catch (e) {
      return 'Maârif';
    }
  });

  const [specialty, setSpecialty] = useState('PLUMBING');

  const cityOptions = MOROCCAN_CITIES.map((c) => ({ value: c.name, label: c.name }));
  const currentCityObj = MOROCCAN_CITIES.find((c) => c.name === selectedCity) || MOROCCAN_CITIES[0];
  const districtOptions = (currentCityObj.districts || []).map((d) => {
    const dName = typeof d === 'string' ? d : (d?.name || String(d));
    return { value: dName, label: dName };
  });

  // Auto-détection GPS intelligente et silencieuse au chargement
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
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
              localStorage.setItem('bricolemoi_client_gps', JSON.stringify({
                city: geoResult.city,
                district: geoResult.district || 'Centre',
                lat: latitude,
                lng: longitude,
                detected_at: Date.now()
              }));
            }
          } catch (e) {}
        },
        () => {},
        { timeout: 3500, maximumAge: 120000 }
      );
    }
  }, []);

  // Synchronisation dynamique quand la modal s'ouvre
  useEffect(() => {
    if (authModalOpen) {
      try {
        const intent = JSON.parse(localStorage.getItem('bricolemoi_pending_intent') || '{}');
        const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
        if (intent.city || gps.city) {
          const cName = intent.city || gps.city;
          setSelectedCity(cName);
          const cObj = MOROCCAN_CITIES.find(c => c.name === cName);
          if (cObj && cObj.districts && cObj.districts.length > 0) {
            const rawD = intent.district || gps.district || cObj.districts[0];
            const dName = typeof rawD === 'object' ? (rawD.name || 'Centre') : String(rawD);
            setSelectedDistrict(dName);
          }
        }
      } catch (e) {}
    }
  }, [authModalOpen]);

  // Handler de changement de ville
  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const matched = MOROCCAN_CITIES.find((c) => c.name === newCity);
    if (matched && matched.districts && matched.districts.length > 0) {
      const firstD = matched.districts[0];
      const dName = typeof firstD === 'object' ? (firstD.name || 'Centre') : String(firstD);
      setSelectedDistrict(dName);
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

  // WebOTP API : Lecture et validation automatique du code SMS à son arrivée (Android / Chrome)
  useEffect(() => {
    if (step !== 'OTP_VERIFY') return;
    if (typeof window === 'undefined' || !('OTPCredential' in window)) return;

    const ac = new AbortController();
    navigator.credentials
      .get({
        otp: { transport: ['sms'] },
        signal: ac.signal
      })
      .then((otp) => {
        if (otp && otp.code) {
          const digits = String(otp.code).replace(/\D/g, '').slice(0, 6).split('');
          if (digits.length === 6) {
            setOtpDigits(digits);
            handleOtpProceed(digits.join(''));
          }
        }
      })
      .catch(() => {
        // Fallback silencieux sur la saisie manuelle sans interruption
      });

    return () => {
      try {
        ac.abort();
      } catch (e) {}
    };
  }, [step]);

  // Construction du numéro international complet
  const getFullInternationalNumber = () => {
    const { formatted } = formatInternationalPhone(phone, selectedCountry.dial);
    return formatted;
  };

  // Validation intelligente et stricte du format mobile selon le pays sélectionné
  const getPhoneValidation = () => {
    const raw = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!raw) return { isValid: false, isLandline: false, message: '' };

    // Si Maroc (+212)
    if (selectedCountry.dial === '+212') {
      if (raw.startsWith('5')) {
        return { 
          isValid: false, 
          isLandline: true, 
          message: 'Les numéros fixes (05...) ne peuvent pas recevoir de SMS. Veuillez saisir un numéro mobile (06 ou 07).' 
        };
      }
      const isMobile = (raw.startsWith('6') || raw.startsWith('7')) && raw.length === 9;
      return { 
        isValid: isMobile, 
        isLandline: false,
        message: !isMobile && raw.length >= 2 && !raw.startsWith('6') && !raw.startsWith('7')
          ? 'Seuls les numéros mobiles marocains (06 ou 07) sont acceptés.'
          : ''
      };
    }

    // Si France (+33)
    if (selectedCountry.dial === '+33') {
      if (raw.length >= 2 && !raw.startsWith('6') && !raw.startsWith('7')) {
        return { 
          isValid: false, 
          isLandline: true, 
          message: 'Veuillez saisir un numéro mobile français (06 ou 07).' 
        };
      }
      return { isValid: raw.length === 9, isLandline: false, message: '' };
    }

    return { isValid: raw.length >= 8 && raw.length <= 13, isLandline: false, message: '' };
  };

  const phoneValidation = getPhoneValidation();
  const isPhoneValid = phoneValidation.isValid;

  // Formatage d'affichage du téléphone (retire intelligemment le 0 initial si indicatif présent)
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\d\s\-\.\+]/g, '');
    
    // Si l'utilisateur commence par taper un '0' alors que l'indicatif (+212, +33...) est déjà sélectionné
    if (val.startsWith('0') && !val.startsWith('+')) {
      val = val.slice(1);
    }
    
    setPhone(val);
    setErrorBanner('');
  };

  // Fermer la modal et réinitialiser
  const handleClose = () => {
    setAuthModalOpen(false);
    setStep(1);
    setAuthMode('SIGN_IN');
    setPhone('');
    setFullName('');
    setExistingUser(null);
    setLoginPin(['', '', '', '']);
    setNewPin(['', '', '', '']);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorBanner('');
    setInfoMsg('');
    setGpsSuccessMsg('');
    setGpsErrorMsg('');
    setIsCountryOpen(false);
  };

  // Bouton Retour intelligent
  const handleBack = () => {
    setErrorBanner('');
    setGpsErrorMsg('');
    if (step === 'EXISTING_USER' || step === 'NEW_USER') {
      setStep(1);
    } else if (step === 'OTP_VERIFY') {
      if (authMode === 'SIGN_IN' || authMode === 'FORGOT_PIN') {
        setStep('EXISTING_USER');
      } else {
        setStep('NEW_USER');
      }
    } else if (step === 'SET_PIN') {
      setStep('OTP_VERIFY');
    }
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
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsErrorMsg('GPS non supporté par votre appareil');
      setTimeout(() => setGpsErrorMsg(''), 3500);
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
          const firstD = closestCity.districts[0];
          const dName = typeof firstD === 'object' ? (firstD.name || 'Centre') : String(firstD);
          setSelectedDistrict(dName);
        }
        setDetectingGps(false);
        setGpsSuccessMsg(`📍 Ville détectée : ${closestCity.name}`);
        setTimeout(() => setGpsSuccessMsg(''), 4000);
      },
      () => {
        setDetectingGps(false);
        setGpsErrorMsg('Sélectionnez votre ville ci-dessus');
        setTimeout(() => setGpsErrorMsg(''), 4000);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // ====================================================================
  // ACTIONS D'AUTHENTIFICATION GUIDÉES (PHONE-FIRST 100% SMART)
  // ====================================================================

  // ACTION GOOGLE 1-CLIC (Amélioré avec Capture WhatsApp & Support Mobile)
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorBanner('');
    try {
      const authUser = await loginWithGoogle('CLIENT');
      if (authUser?.needsPhone || !authUser?.phone || authUser.phone.length < 8) {
        setFullName(authUser?.full_name || '');
        setStep('GOOGLE_PHONE_COMPLETION');
      } else {
        handleClose();
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        if (err.code === 'auth/unauthorized-domain' || String(err.message).includes('unauthorized-domain')) {
          setErrorBanner('Domaine non autorisé : veuillez ajouter ce domaine (bricolemoi.vercel.app) dans la console Firebase (Authentication > Paramètres > Domaines autorisés).');
        } else {
          setErrorBanner(err.message || 'Impossible de se connecter avec Google.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // FINALISATION NUMÉRO WHATSAPP POST-GOOGLE
  const handleCompleteGooglePhone = async (e) => {
    if (e) e.preventDefault();
    const clean = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!clean || clean.length < 6) {
      setErrorBanner('Veuillez saisir un numéro de mobile valide.');
      return;
    }
    setLoading(true);
    setErrorBanner('');
    try {
      const fullNumber = getFullInternationalNumber();
      const finalZone = selectedDistrict ? `${selectedCity} - ${selectedDistrict}` : selectedCity;
      await linkGooglePhone(fullNumber, finalZone);
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Erreur lors de l\'enregistrement du numéro.');
    } finally {
      setLoading(false);
    }
  };

  // ÉTAPE 1 : DÉTECTION INTELLIGENTE DU NUMÉRO EN UN CLIC
  const handlePhoneSubmit = async (e) => {
    if (e) e.preventDefault();
    const clean = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!clean || clean.length < 6) {
      setErrorBanner('Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');

    try {
      // Vérification automatique si le compte existe déjà dans Supabase
      const profileCheck = await checkPhoneProfile(fullNumber);

      if (profileCheck?.exists) {
        // CAS 1 : UTILISATEUR DÉJÀ INSCRIT -> Passer directement à l'écran PIN
        setExistingUser({
          fullName: profileCheck.fullName || '',
          hasPin: profileCheck.hasPin,
          role: profileCheck.role,
          cityZone: profileCheck.cityZone
        });
        if (profileCheck.role) {
          const detectedRole = String(profileCheck.role).toUpperCase();
          if (detectedRole === 'MAALEM' && role !== 'MAALEM') {
            setRole('MAALEM');
            setInfoMsg(`🛠️ Ravi de vous revoir ${profileCheck.fullName || 'Maâlem'} ! Compte Artisan détecté, accès direct à votre Espace Pro.`);
          } else if (detectedRole === 'CLIENT' && role !== 'CLIENT') {
            setRole('CLIENT');
            setInfoMsg(`👤 Ravi de vous revoir ${profileCheck.fullName || 'Client'} ! Compte Particulier détecté.`);
          }
        }
        if (profileCheck.fullName) {
          setFullName(profileCheck.fullName);
        }
        setAuthMode('SIGN_IN');
        setStep('EXISTING_USER');
        setLoginPin(['', '', '', '']);
        setTimeout(() => loginPinRefs.current[0]?.focus(), 150);
      } else {
        // CAS 2 : NOUVEL UTILISATEUR -> Demander son prénom & sa ville
        setAuthMode('SIGN_UP');
        setStep('NEW_USER');
      }
    } catch (err) {
      // En cas de doute ou hors-ligne, basculer en nouveau profil
      setAuthMode('SIGN_UP');
      setStep('NEW_USER');
    } finally {
      setLoading(false);
    }
  };

  // ACTION : CONNEXION PAR CODE PIN (UTILISATEUR EXISTANT)
  const handleDirectLogin = async (pinCode) => {
    const finalPin = pinCode || loginPin.join('');
    if (finalPin.length !== 4) {
      setErrorBanner('Veuillez saisir votre code PIN à 4 chiffres.');
      return;
    }

    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');

    try {
      await loginWithPin({ phone: fullNumber, pin: finalPin });
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code PIN incorrect. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION : CONNEXION DIRECTE PAR CODE SMS (SI PIN OUBLIÉ OU SANS PIN)
  const handleSendLoginOtp = async () => {
    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');
    setAuthMode('SIGN_IN');

    try {
      await sendPhoneOTP(fullNumber, 'sms', selectedCountry.dial);
      setStep('OTP_VERIFY');
      setResendCountdown(300); // 5 minutes de validité
      setInfoMsg(`Code SMS de vérification envoyé au ${fullNumber} (Expéditeur: BricoleMoi)`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code SMS.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION : DÉMARRER INSCRIPTION & ENVOI DU CODE SMS
  const handleProceedSignUp = async (e) => {
    if (e) e.preventDefault();
    if (!fullName.trim()) {
      setErrorBanner('Veuillez renseigner votre prénom ou votre nom.');
      return;
    }

    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');

    try {
      await sendPhoneOTP(fullNumber, 'sms', selectedCountry.dial);
      setStep('OTP_VERIFY');
      setResendCountdown(300); // 5 minutes de validité
      setInfoMsg(`Code SMS de vérification envoyé au ${fullNumber} (Expéditeur: BricoleMoi)`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code SMS.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION : VALIDATION DU CODE SMS REÇU
  const handleOtpProceed = async (code) => {
    const token = code || otpDigits.join('');
    if (token.length < 6) {
      setErrorBanner('Veuillez saisir les 6 chiffres du code SMS reçu.');
      return;
    }

    setErrorBanner('');

    // Validation du code OTP SMS pour TOUS les modes (SIGN_IN et SIGN_UP)
    setLoading(true);
    const fullNumber = getFullInternationalNumber();

    try {
      if (authMode === 'FORGOT_PIN') {
        // En cas de réinitialisation de PIN : passer à l'écran de nouveau PIN
        setStep('SET_PIN');
        setTimeout(() => newPinRefs.current[0]?.focus(), 150);
        return;
      }

      await verifyPhoneOTP({
        phone: fullNumber,
        token,
        role,
        fullName: fullName.trim() || (role === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
        cityZone: `${selectedCity} - ${selectedDistrict}`,
        specialty,
        mode: authMode
      });

      // Connexion immédiate réussie : Fermer la modal sans friction
      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code SMS invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

  // ACTION : FINALISATION DU CODE PIN SECRET
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
      setErrorBanner(err.message || 'Code expiré ou invalide.');
    } finally {
      setLoading(false);
    }
  };

  const isClient = role === 'CLIENT';

  // Filtrer pays pour la recherche
  const filteredCountries = COUNTRY_DIAL_CODES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.dial.includes(countrySearch) || 
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Sélecteur d'indicatif pays avec VRAIS DRAPEAUX visuels (images haute résolution)
  const renderCountryCodeSelector = () => {
    if (role === 'MAALEM') {
      return (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-slate-800 text-sm font-mono font-bold z-10 select-none pointer-events-none">
          <img 
            src="https://flagcdn.com/w40/ma.png" 
            alt="Maroc" 
            className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200" 
          />
          <span>+212</span>
        </div>
      );
    }

    return (
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={() => setIsCountryOpen(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 rounded-2xl text-slate-800 text-sm font-mono font-bold transition-all shadow-xs cursor-pointer group select-none active:scale-95"
          title="Changer de pays / indicatif téléphonique"
        >
          <img 
            src={selectedCountry.flagUrl || `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
            alt={selectedCountry.name} 
            className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
          />
          <span>{selectedCountry.dial}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
        </button>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm font-sans"
        >
          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0" 
            onClick={handleClose} 
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-[440px] max-h-[92dvh] overflow-y-auto modal-scroll rounded-3xl p-4 sm:p-6 text-slate-800 shadow-2xl bg-white transition-all duration-300 border ${
              isClient
                ? 'border-slate-200/90'
                : 'border-amber-200/90'
            }`}
          >
            {/* Soft Ambient Header Glow */}
            <div 
              className={`absolute -top-24 -left-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500 opacity-15 ${
                isClient ? 'bg-blue-500' : 'bg-amber-500'
              }`} 
            />

            {/* HEADER SIMPLIFIÉ AVEC RETOUR */}
            <div className="relative flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {step !== 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer active:scale-95 touch-target-44 shrink-0"
                    title="Retour"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    isClient 
                      ? 'bg-blue-600' 
                      : 'bg-amber-500'
                  } animate-pulse shrink-0`} />
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none">
                      {step === 1 && (isClient ? 'Bienvenue sur BricoleMoi 🛠️' : 'Espace Artisan Maâlem Pro 🛠️')}
                      {step === 'EXISTING_USER' && 'Connexion Rapide'}
                      {step === 'NEW_USER' && 'Créer votre compte'}
                      {step === 'OTP_VERIFY' && 'Code de sécurité SMS'}
                      {step === 'SET_PIN' && 'Code PIN Secret'}
                      {step === 'GOOGLE_PHONE_COMPLETION' && 'Numéro WhatsApp de contact 📱'}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-none">
                      {step === 1 && (isClient ? 'Dépannage & Artisans qualifiés en 15 min' : 'Rejoignez le 1er réseau de chantiers')}
                      {step === 'EXISTING_USER' && 'Ravi de vous revoir parmi nous !'}
                      {step === 'NEW_USER' && 'Quelques informations rapides pour démarrer'}
                      {step === 'OTP_VERIFY' && 'Entrez le code reçu sur votre mobile'}
                      {step === 'SET_PIN' && 'Ce code vous évitera d\'attendre un SMS la prochaine fois'}
                      {step === 'GOOGLE_PHONE_COMPLETION' && 'Pour recevoir le suivi de vos interventions en temps réel'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer active:scale-95 touch-target-44 shrink-0 ml-2"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SWITCHER DE PROFIL : Particulier vs Artisan Maâlem (Écran 1 uniquement) */}
            {step === 1 && (
              <div className="relative p-1 bg-slate-100 rounded-2xl border border-slate-200 grid grid-cols-2 gap-1 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setRole('CLIENT');
                    setErrorBanner('');
                  }}
                  className={`relative z-10 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
                    isClient ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCircle weight="duotone" className={`w-4 h-4 transition-colors ${isClient ? 'text-white' : 'text-slate-500'}`} />
                  <span>Particulier</span>
                  {isClient && (
                    <motion.div
                      layoutId="roleActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-sm -z-10"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('MAALEM');
                    setErrorBanner('');
                  }}
                  className={`relative z-10 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
                    !isClient ? 'text-white font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PhosphorWrench weight="duotone" className={`w-4 h-4 transition-colors ${!isClient ? 'text-white' : 'text-slate-500'}`} />
                  <span>Artisan Maâlem</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black tracking-wider transition-colors ${
                    !isClient ? 'bg-amber-700 text-white shadow-xs' : 'bg-amber-100 text-amber-800'
                  }`}>
                    +15 DH
                  </span>
                  {!isClient && (
                    <motion.div
                      layoutId="roleActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-amber-500 rounded-xl shadow-sm -z-10"
                    />
                  )}
                </button>
              </div>
            )}

            {/* BANNIÈRE D'ERREUR */}
            {errorBanner && (
              <motion.div 
                initial={{ opacity: 0, y: -6, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                className="mb-3.5 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center gap-2.5 shadow-xs"
              >
                <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-xs">⚠️</span>
                </div>
                <span className="font-semibold text-xs leading-tight">{errorBanner}</span>
              </motion.div>
            )}

            {/* BANNIÈRE D'INFORMATION */}
            {infoMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-3.5 p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-700 text-xs flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium text-xs">{infoMsg}</span>
              </motion.div>
            )}

            {/* NOTIFICATION GPS SUCCÈS */}
            {gpsSuccessMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{gpsSuccessMsg}</span>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 1 : UNE SEULE QUESTION (LE NUMÉRO DE TÉLÉPHONE)    */}
            {/* ======================================================== */}
            {step === 1 && (
              <div className="space-y-4">
                {/* 1-Clic Google (Client) */}
                {isClient && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-slate-100">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                        <span className="font-semibold text-slate-800">Continuer avec Google</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-emerald-600" />
                        1-Clic
                      </span>
                    </motion.button>

                    <div className="relative flex items-center justify-center my-1">
                      <div className="border-t border-slate-200 w-full" />
                      <span className="bg-white px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        ou avec votre numéro
                      </span>
                      <div className="border-t border-slate-200 w-full" />
                    </div>
                  </>
                )}

                {/* Bandeau Bonus Pro pour Maâlem */}
                {!isClient && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Coins weight="duotone" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-amber-900">
                        🎁 +15.00 DH offerts aux artisans
                      </p>
                      <p className="text-[10px] text-amber-800 mt-0.5">
                        Crédités dès validation pour débloquer vos premières demandes de clients.
                      </p>
                    </div>
                  </div>
                )}

                {/* Formulaire de Numéro Unique */}
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Entrez votre numéro de téléphone :
                    </label>

                    <div className="relative group">
                      {renderCountryCodeSelector()}

                      <input
                        id="auth-phone-input"
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="tel"
                        required
                        placeholder={selectedCountry.placeholder || '06 12 34 56 78'}
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-28 sm:pl-30 pr-10 py-3.5 bg-slate-50 border rounded-2xl text-slate-900 font-mono text-base font-bold focus:outline-none dir-ltr tracking-wider transition-all duration-200 ${
                          isClient
                            ? 'border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100'
                            : 'border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100'
                        }`}
                        autoFocus
                      />

                      {/* Indicateur de validation en temps réel */}
                      {isPhoneValid && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Alerte explicative immédiate si numéro fixe ou non mobile */}
                    {phoneValidation.message && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-semibold flex items-center gap-2 shadow-2xs"
                      >
                        <span className="text-amber-600 text-xs">⚠️</span>
                        <span>{phoneValidation.message}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Gros Bouton Continuer */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading || !isPhoneValid}
                    className={`w-full py-3.5 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isClient
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span>{loading ? 'Vérification...' : 'Continuer →'}</span>
                  </motion.button>
                </form>

                {/* Réassurance */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Connexion 100% sécurisée & gratuite</span>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 2.A : UTILISATEUR EXISTANT RECONNU (CODE PIN)      */}
            {/* ======================================================== */}
            {step === 'EXISTING_USER' && (
              <form onSubmit={(e) => { e.preventDefault(); handleDirectLogin(); }} className="space-y-4">
                {/* Carte profil utilisateur chaleureuse */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isClient 
                    ? 'bg-blue-50/80 border-blue-200' 
                    : 'bg-amber-50/80 border-amber-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-xs ${
                      isClient 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-amber-500 text-white'
                    }`}>
                      {existingUser?.fullName ? existingUser.fullName.charAt(0).toUpperCase() : '👤'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">
                        {existingUser?.fullName ? `Bonjour ${existingUser.fullName} 👋` : 'Bonjour ! 👋'}
                      </p>
                      <p className="text-xs text-slate-600 font-mono mt-0.5 flex items-center gap-1.5">
                        <span>{getFullInternationalNumber()}</span>
                        {existingUser?.cityZone && (
                          <span className="text-slate-600 font-sans text-[10px] font-bold">📍 {existingUser.cityZone}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorBanner('');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 underline font-bold cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>

                {/* Saisie Sécurisée Code PIN 4 chiffres */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Entrez votre Code PIN secret (4 chiffres) :</span>
                  </label>

                  <div className="grid grid-cols-4 gap-3 py-1">
                    {loginPin.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (loginPinRefs.current[idx] = el)}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleLoginPinChange(idx, e.target.value)}
                        onKeyDown={(e) => handleLoginPinKeyDown(idx, e)}
                        autoFocus={idx === 0}
                        className={`h-14 text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
                          digit
                            ? isClient
                              ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                              : 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                        } ${isClient ? 'focus:border-blue-600 focus:ring-2 focus:ring-blue-100' : 'focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bouton de Connexion */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || loginPin.some((d) => d === '')}
                  className={`w-full py-3.5 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isClient
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? 'Connexion en cours...' : 'Se Connecter'}</span>
                </motion.button>

                {/* Option de secours WhatsApp / SMS */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleSendLoginOtp}
                    disabled={loading}
                    className={`text-xs underline font-bold flex items-center justify-center gap-1.5 mx-auto cursor-pointer ${
                      selectedCountry.dial === '+212' ? 'text-emerald-700 hover:text-emerald-800' : 'text-amber-700 hover:text-amber-800'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {selectedCountry.dial === '+212' 
                        ? 'PIN oublié ? Se connecter par Code WhatsApp' 
                        : 'PIN oublié ? Se connecter par Code SMS'}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 2.B : NOUVEAU COMPTE (NOM & VILLE)                 */}
            {/* ======================================================== */}
            {step === 'NEW_USER' && (
              <form onSubmit={handleProceedSignUp} className="space-y-3.5">
                {/* Rappel du Numéro */}
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span className="font-mono font-bold text-slate-900">{getFullInternationalNumber()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorBanner('');
                    }}
                    className="text-[11px] text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>

                {/* Spécialité pour Maâlem */}
                {!isClient && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Votre Métier / Spécialité :</label>
                    <SpecialtySelect value={specialty} onChange={setSpecialty} />
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">
                    {isClient ? 'Votre Prénom et Nom :' : 'Nom de l\'artisan ou de l\'atelier :'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isClient ? 'Ex: Karim Benjelloun' : 'Ex: Plomberie Express'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-bold focus:outline-none transition-all ${
                      isClient ? 'focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100' : 'focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100'
                    }`}
                    autoFocus
                  />
                </div>

                {/* Ville & Quartier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Votre Ville & Zone :</label>
                  <div className="grid grid-cols-2 gap-2">
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

                {/* Bouton GPS Radar */}
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={detectingGps}
                  className={`w-full py-2.5 bg-slate-50 hover:bg-slate-100 border rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                    gpsErrorMsg ? 'border-amber-300 text-amber-800' : 'border-slate-200 text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <Compass className={`w-4 h-4 ${gpsErrorMsg ? 'text-amber-600' : 'text-blue-600'} ${detectingGps ? 'animate-spin' : ''}`} />
                  <span>
                    {detectingGps 
                      ? 'Localisation GPS en cours...' 
                      : gpsErrorMsg 
                      ? gpsErrorMsg 
                      : '📍 Détecter ma ville par GPS'}
                  </span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || !fullName.trim()}
                  className={`w-full py-3.5 font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 ${
                    isClient
                      ? (selectedCountry.dial === '+212'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white')
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChatCenteredText weight="duotone" className="w-4 h-4" />
                  <span>
                    {loading 
                      ? 'Envoi du code...' 
                      : selectedCountry.dial === '+212'
                      ? 'Recevoir mon code par WhatsApp →'
                      : 'Recevoir mon Code SMS d\'activation →'}
                  </span>
                </motion.button>

                {/* Lien de bascule vers connexion PIN si le compte existe déjà */}
                <div className="text-center pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Vous avez déjà un compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('SIGN_IN');
                        setStep('EXISTING_USER');
                        setErrorBanner('');
                      }}
                      className={`font-black underline transition-colors cursor-pointer ${
                        isClient ? 'text-blue-600 hover:text-blue-700' : 'text-amber-600 hover:text-amber-700'
                      }`}
                    >
                      Se connecter avec mon Code PIN
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 3 : VALIDATION DU CODE (6 CHIFFRES)                 */}
            {/* ======================================================== */}
            {step === 'OTP_VERIFY' && (
              <form onSubmit={(e) => { e.preventDefault(); handleOtpProceed(); }} className="space-y-4">
                <div className={`p-3 rounded-2xl border flex items-center justify-between shadow-xs ${
                  selectedCountry.dial === '+212'
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-blue-50/70 border-blue-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs ${
                      selectedCountry.dial === '+212' ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}>
                      <ChatCenteredText weight="duotone" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedCountry.dial === '+212' 
                          ? 'Code de sécurité envoyé sur WhatsApp 💬' 
                          : 'Code de sécurité envoyé par SMS 📱'}
                      </p>
                      <p className="text-[11px] text-slate-600 font-mono flex items-center gap-1.5 mt-0.5">
                        <span>{getFullInternationalNumber()}</span>
                        <span className={selectedCountry.dial === '+212' ? 'text-emerald-700 font-sans text-[10px] font-bold' : 'text-blue-600 font-sans text-[10px] font-bold'}>
                          {selectedCountry.dial === '+212' ? '(WhatsApp BricoleMoi)' : '(Expéditeur: BricoleMoi)'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Saisie 6 Chiffres OTP */}
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      autoComplete={idx === 0 ? "one-time-code" : "off"}
                      pattern="[0-9]*"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      autoFocus={idx === 0}
                      className={`h-12 w-full text-center font-mono text-xl font-black rounded-xl border transition-all duration-200 focus:outline-none ${
                        digit
                          ? (selectedCountry.dial === '+212'
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600'
                              : 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600')
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                  ))}
                </div>

                {/* Compte à rebours 5 minutes / Renvoi */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-slate-500 text-[11px]">
                    {resendCountdown > 0 ? 'Code valable 5 minutes' : 'Code expiré'}
                  </span>
                  {resendCountdown > 0 ? (
                    <div className="text-[11px] text-blue-700 font-mono font-bold flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                      <ClockCounterClockwise className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                      <span>
                        {String(Math.floor(resendCountdown / 60)).padStart(2, '0')}:
                        {String(resendCountdown % 60).padStart(2, '0')}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={authMode === 'SIGN_UP' ? handleProceedSignUp : handleSendLoginOtp}
                      className="text-[11px] text-blue-600 hover:text-blue-700 underline font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                      <span>{selectedCountry.dial === '+212' ? 'Renvoyer un code WhatsApp' : 'Renvoyer un nouveau code SMS'}</span>
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || otpDigits.some((d) => d === '')}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {loading 
                      ? 'Vérification...' 
                      : authMode === 'SIGN_IN' 
                      ? 'Valider & Se Connecter' 
                      : 'Valider le code & Continuer'}
                  </span>
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN 4 : DÉFINITION DU CODE PIN SECRET (4 CHIFFRES)     */}
            {/* ======================================================== */}
            {step === 'SET_PIN' && (
              <form onSubmit={handleFinalizePin} className="space-y-4">
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{authMode === 'FORGOT_PIN' ? 'Nouveau Code PIN Secret' : 'Créez votre Code PIN Secret'}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Ce code secret à 4 chiffres vous permettra d'accéder à votre compte en 1 seconde sur tous vos appareils.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3 py-1">
                  {newPin.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (newPinRefs.current[idx] = el)}
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleNewPinChange(idx, e.target.value)}
                      onKeyDown={(e) => handleNewPinKeyDown(idx, e)}
                      autoFocus={idx === 0}
                      className={`h-14 text-center font-mono text-2xl font-black rounded-2xl border transition-all duration-200 focus:outline-none ${
                        digit
                          ? isClient
                            ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                            : 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      } ${isClient ? 'focus:border-blue-600 focus:ring-2 focus:ring-blue-100' : 'focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || newPin.some((d) => d === '')}
                  className={`w-full py-3.5 font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isClient
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Finalisation...' : 'C\'est parti ! Accéder à BricoleMoi 🚀'}</span>
                </motion.button>
              </form>
            )}

            {/* ======================================================== */}
            {/* ÉCRAN GOOGLE : COMPLÉTION DU NUMÉRO WHATSAPP MAROC      */}
            {/* ======================================================== */}
            {step === 'GOOGLE_PHONE_COMPLETION' && (
              <form onSubmit={handleCompleteGooglePhone} className="space-y-4">
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="text-xs font-black text-blue-950 flex items-center gap-2">
                    <span>🇲🇦</span>
                    <span>Bienvenue {fullName || 'sur BricoleMoi'} !</span>
                  </p>
                  <p className="text-[11px] text-blue-800 mt-1 leading-relaxed">
                    Associez votre numéro WhatsApp pour recevoir en temps réel le suivi de vos interventions d'urgence SOS et les devis des Maâlems.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                    Votre numéro WhatsApp (Maroc) :
                  </label>
                  <div className="relative group">
                    {renderCountryCodeSelector()}
                    <input
                      id="auth-google-phone-input"
                      name="tel"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder={selectedCountry.placeholder || '06 12 34 56 78'}
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full pl-28 sm:pl-30 pr-10 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-2xl text-slate-900 font-mono text-base font-bold focus:outline-none dir-ltr tracking-wider transition-all duration-200"
                      autoFocus
                    />
                    {isPhoneValid && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {phoneValidation.message && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-semibold flex items-center gap-2"
                    >
                      <span className="text-amber-600 text-xs">⚠️</span>
                      <span>{phoneValidation.message}</span>
                    </motion.div>
                  )}
                </div>

                {/* Ville & Quartier de l'utilisateur (auto-détecté par GPS) */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1 block">
                      📍 Ville :
                    </label>
                    <CustomDropdown
                      options={cityOptions}
                      value={selectedCity}
                      onChange={handleCityChange}
                      icon={Buildings}
                      className="w-full text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1 block">
                      🏘️ Quartier :
                    </label>
                    <CustomDropdown
                      options={districtOptions}
                      value={selectedDistrict}
                      onChange={setSelectedDistrict}
                      icon={MapPinLine}
                      className="w-full text-xs font-bold"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading || !isPhoneValid}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{loading ? 'Enregistrement...' : 'Enregistrer & Continuer 🚀'}</span>
                </motion.button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
                  >
                    Passer pour le moment
                  </button>
                </div>
              </form>
            )}

            {/* ======================================================== */}
            {/* OVERLAY SÉLECTEUR DE PAYS DÉDIÉ AVEC VRAIS DRAPEAUX     */}
            {/* ======================================================== */}
            <AnimatePresence>
              {isCountryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-50 bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 leading-tight">Indicatif Téléphonique</h4>
                          <p className="text-[10px] text-slate-500 font-medium">Maroc & Résidents à l'étranger (MRE)</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCountryOpen(false);
                          setCountrySearch('');
                        }}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer active:scale-95"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Champ de Recherche */}
                    <div className="relative mb-3 shrink-0">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Rechercher pays ou indicatif (+33, +34...)"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                        autoFocus
                      />
                    </div>

                    {/* Liste des Pays avec Vrais Drapeaux */}
                    <div className="overflow-y-auto flex-1 space-y-1.5 pr-1 modal-scroll">
                      {filteredCountries.map((c) => {
                        const isSelected = selectedCountry.code === c.code;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryOpen(false);
                              setCountrySearch('');
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img 
                                src={c.flagUrl} 
                                alt={c.name} 
                                className="w-7 h-5 object-cover rounded-xs shadow-xs shrink-0 border border-slate-200" 
                              />
                              <div className="text-left truncate">
                                <p className="text-xs font-black text-slate-900 truncate">{c.name}</p>
                                <p className="text-[10px] text-slate-500 font-arabic leading-tight">{c.nameAr}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                {c.dial}
                              </span>
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                                  ✓
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
