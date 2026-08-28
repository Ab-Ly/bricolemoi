import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { formatInternationalPhone } from '../../../lib/infobipAuthService';
import { reverseGeocodeMorocco } from '../../../lib/geoService';
import { COUNTRY_DIAL_CODES, MOROCCAN_CITIES } from '../../../constants/geo';

export const useAuthModalLogic = () => {
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
  // 'GOOGLE_PHONE_COMPLETION': Complétion numéro WhatsApp
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

  // Compte mémorisé pour Reconnexion 1-Clic
  const [rememberedUser, setRememberedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_last_user') || 'null');
    } catch (e) {
      return null;
    }
  });

  // Synchronisation dynamique quand la modal s'ouvre
  useEffect(() => {
    if (authModalOpen) {
      try {
        const u = JSON.parse(localStorage.getItem('bricolemoi_last_user') || 'null');
        setRememberedUser(u);
      } catch (e) {}

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

  // WebOTP API : Lecture et validation automatique du code SMS à son arrivée
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
      .catch(() => {});

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

  // Validation intelligente du format mobile
  const getPhoneValidation = () => {
    const raw = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!raw) return { isValid: false, isLandline: false, message: '' };

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

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\d\s\-\.\+]/g, '');
    if (val.startsWith('0') && !val.startsWith('+')) {
      val = val.slice(1);
    }
    setPhone(val);
    setErrorBanner('');
  };

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

  const handleOtpDigitChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    
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
          setErrorBanner('Domaine non autorisé : veuillez ajouter ce domaine dans la console Firebase.');
        } else {
          setErrorBanner(err.message || 'Impossible de se connecter avec Google.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

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

  const handleQuickLoginWithRemembered = async (rUser) => {
    if (!rUser?.phone) return;
    const cleanPhone = rUser.phone.replace(/^\+212/, '').replace(/^\+/, '');
    setPhone(cleanPhone);
    if (rUser.role) setRole(rUser.role);
    if (rUser.fullName) setFullName(rUser.fullName);
    setLoading(true);
    setErrorBanner('');
    try {
      const profileCheck = await checkPhoneProfile(rUser.phone);
      if (profileCheck?.exists) {
        setExistingUser({
          fullName: profileCheck.fullName || rUser.fullName || '',
          hasPin: profileCheck.hasPin,
          role: profileCheck.role || rUser.role,
          cityZone: profileCheck.cityZone || rUser.cityZone
        });
        setAuthMode('SIGN_IN');
        setStep('EXISTING_USER');
        setLoginPin(['', '', '', '']);
        setTimeout(() => loginPinRefs.current[0]?.focus(), 150);
      } else {
        setStep(1);
      }
    } catch (err) {
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

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
      const profileCheck = await checkPhoneProfile(fullNumber);

      if (profileCheck?.exists) {
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
        setAuthMode('SIGN_UP');
        setStep('NEW_USER');
      }
    } catch (err) {
      setAuthMode('SIGN_UP');
      setStep('NEW_USER');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSendLoginOtp = async () => {
    const fullNumber = getFullInternationalNumber();
    setLoading(true);
    setErrorBanner('');
    setAuthMode('SIGN_IN');

    try {
      await sendPhoneOTP(fullNumber, 'sms', selectedCountry.dial);
      setStep('OTP_VERIFY');
      setResendCountdown(300);
      setInfoMsg(`Code de vérification envoyé au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code.');
    } finally {
      setLoading(false);
    }
  };

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
      setResendCountdown(300);
      setInfoMsg(`Code de vérification envoyé au ${fullNumber}`);
    } catch (err) {
      setErrorBanner(err.message || 'Impossible d\'envoyer le code.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpProceed = async (code) => {
    const token = code || otpDigits.join('');
    if (token.length < 6) {
      setErrorBanner('Veuillez saisir les 6 chiffres du code reçu.');
      return;
    }

    setErrorBanner('');
    setLoading(true);
    const fullNumber = getFullInternationalNumber();

    try {
      if (authMode === 'FORGOT_PIN' || authMode === 'SIGN_UP') {
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

      handleClose();
    } catch (err) {
      setErrorBanner(err.message || 'Code invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

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

  const filteredCountries = COUNTRY_DIAL_CODES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.dial.includes(countrySearch) || 
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return {
    authModalOpen,
    role,
    setRole,
    step,
    setStep,
    authMode,
    setAuthMode,
    existingUser,
    phone,
    fullName,
    setFullName,
    selectedCountry,
    setSelectedCountry,
    isCountryOpen,
    setIsCountryOpen,
    countrySearch,
    setCountrySearch,
    countryDropdownRef,
    filteredCountries,
    loginPin,
    newPin,
    otpDigits,
    loginPinRefs,
    newPinRefs,
    otpInputRefs,
    loading,
    errorBanner,
    setErrorBanner,
    infoMsg,
    resendCountdown,
    detectingGps,
    gpsSuccessMsg,
    gpsErrorMsg,
    selectedCity,
    selectedDistrict,
    setSelectedDistrict,
    specialty,
    setSpecialty,
    cityOptions,
    districtOptions,
    rememberedUser,
    phoneValidation,
    isPhoneValid,
    isClient,
    getFullInternationalNumber,
    handleCityChange,
    handlePhoneChange,
    handleClose,
    handleBack,
    handleLoginPinChange,
    handleLoginPinKeyDown,
    handleNewPinChange,
    handleNewPinKeyDown,
    handleOtpDigitChange,
    handleOtpKeyDown,
    handleDetectGPS,
    handleGoogleSignIn,
    handleCompleteGooglePhone,
    handleQuickLoginWithRemembered,
    handlePhoneSubmit,
    handleDirectLogin,
    handleSendLoginOtp,
    handleProceedSignUp,
    handleOtpProceed,
    handleFinalizePin
  };
};
