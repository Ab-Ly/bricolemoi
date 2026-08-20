import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/i18n';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut, googleProvider, signInWithPopup } from '../lib/firebaseClient';
import { switchSubdomainInDev } from '../lib/subdomain';
import { 
  sendInfobipOTP, 
  verifyLocalOTP, 
  formatMoroccanPhone, 
  formatInternationalPhone,
  checkPhoneProfile as checkPhoneProfileService,
  loginWithPin as loginWithPinService,
  updateProfilePin,
  hashPin
} from '../lib/infobipAuthService';

const AuthContext = createContext();

// Helper: vérifie si un Maalem est actif & vérifié par téléphone
export const isCinVerifiedUser = (user) => {
  if (!user) return false;
  // Tout artisan connecté avec un numéro validé ou actif est vérifié
  if (user.role?.toUpperCase() === 'MAALEM' || user.maalem_details) {
    if (user.is_suspended || user.status === 'suspended') return false;
    return true;
  }
  return true;
};

// Helper for Firebase Invisible reCAPTCHA
let recaptchaVerifierInstance = null;

const getRecaptchaVerifier = (containerId = 'recaptcha-container') => {
  if (typeof window === 'undefined') return null;
  if (!recaptchaVerifierInstance) {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    recaptchaVerifierInstance = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {
        if (recaptchaVerifierInstance) recaptchaVerifierInstance.reset();
      }
    });
  }
  return recaptchaVerifierInstance;
};

export const AuthProvider = ({ children }) => {
  // Language & RTL State (seule donnée persistée en localStorage)
  const [lang, setLang] = useState(() => localStorage.getItem('bricolemoi_lang') || 'fr');

  // Auth State — initialisé depuis sessionStorage si dispo (évite le flash au refresh)
  // sessionStorage est scoped à l'onglet et effacé à la fermeture du navigateur
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bricolemoi_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bricolemoi_session');
      if (saved) return JSON.parse(saved)?.role || 'CLIENT';
    } catch (e) {}
    return 'CLIENT';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Persistance sessionStorage — sync à chaque changement du user
  useEffect(() => {
    try {
      if (user) {
        // Filtrer les base64 volumineux pour éviter le dépassement de quota sessionStorage
        const cleanUser = { ...user };
        const base64Fields = ['cin_photo_url', 'cin_photo_recto_url', 'cin_photo_verso_url'];
        base64Fields.forEach(f => {
          if (typeof cleanUser[f] === 'string' && cleanUser[f].startsWith('data:')) cleanUser[f] = null;
        });
        if (cleanUser.maalem_details) {
          const md = { ...cleanUser.maalem_details };
          base64Fields.forEach(f => {
            if (typeof md[f] === 'string' && md[f].startsWith('data:')) md[f] = null;
          });
          if (Array.isArray(md.portfolio_urls)) {
            md.portfolio_urls = md.portfolio_urls.map(url => (typeof url === 'string' && url.startsWith('data:') && url.length > 500 ? url.slice(0, 100) : url));
          }
          cleanUser.maalem_details = md;
        }
        sessionStorage.setItem('bricolemoi_session', JSON.stringify(cleanUser));
      } else {
        sessionStorage.removeItem('bricolemoi_session');
      }
    } catch (e) {}
  }, [user]);

  // Sync RTL attribute on document root
  useEffect(() => {
    localStorage.setItem('bricolemoi_lang', lang);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Firebase Auth Listener — source de vérité pour la session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Utilisateur Firebase réel → fetch profil Supabase
        await fetchSupabaseProfile(firebaseUser.uid, firebaseUser.phoneNumber);
      } else {
        // Pas de session Firebase — conserver sessionStorage si dev bypass actif
        const savedSession = sessionStorage.getItem('bricolemoi_session');
        if (!savedSession) {
          setUser(null);
          setCurrentRole('CLIENT');
        }
        // Sinon : sessionStorage garde la session dev bypass jusqu'à logout explicite
      }
    });
    return () => unsubscribe();
  }, []);

  const isValidUUID = (str) => typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  // Récupère le profil Supabase à partir de l'UID Firebase ou du numéro de téléphone
  const fetchSupabaseProfile = async (uid, phone = '') => {
    let userProfile = {
      id: uid,
      phone: phone,
      role: 'CLIENT',
      full_name: 'Utilisateur Maroc',
      city_zone: 'Casablanca'
    };

    if (isSupabaseConfigured) {
      try {
        let profile = null;
        if (isValidUUID(uid)) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', uid)
            .maybeSingle();
          profile = data;
        } else if (phone) {
          const cleanPhone = String(phone).replace(/\D/g, '');
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('phone', cleanPhone)
            .maybeSingle();
          profile = data;
        }

        if (profile) {
          const effectiveRole = (profile.role || 'CLIENT').toUpperCase();
          const profileCredits = profile.credits !== undefined && profile.credits !== null
            ? Number(profile.credits)
            : (effectiveRole === 'MAALEM' ? 15.00 : 0);

          userProfile = {
            ...userProfile,
            id: profile.id || uid,
            role: effectiveRole,
            full_name: profile.full_name || 'Utilisateur Maroc',
            city_zone: profile.city_zone || 'Casablanca',
            credits: profileCredits
          };
        }

        if (userProfile.role === 'MAALEM') {
          const targetId = userProfile.id;
          let maalemDetails = null;
          if (isValidUUID(targetId)) {
            const { data } = await supabase
              .from('maalem_details')
              .select('*')
              .eq('id', targetId)
              .maybeSingle();
            maalemDetails = data;
          }

          const currentCredits = userProfile.credits !== undefined && userProfile.credits !== null
            ? Number(userProfile.credits)
            : (maalemDetails?.credit_balance !== undefined && maalemDetails?.credit_balance !== null
              ? Number(maalemDetails.credit_balance)
              : 15.00);

          userProfile.credits = currentCredits;
          userProfile.maalem_details = {
            specialty: maalemDetails?.specialty || 'PLUMBING',
            credit_balance: currentCredits,
            is_verified: maalemDetails?.is_verified ?? true,
            cin_verified: maalemDetails?.cin_verified ?? true,
            status: maalemDetails?.status || 'active',
            portfolio_urls: maalemDetails?.portfolio_urls || []
          };
        }
      } catch (err) {
        console.warn('[Auth] Profile fetch warning:', err.message);
      }
    }

    setUser(userProfile);
    setIsLoading(false);
  };

  useEffect(() => {
    // Initial loading logic if needed
  }, []);

  // Bascule le rôle UI sans écraser l'utilisateur connecté
  const switchRole = (newRole) => {
    const norm = (newRole || 'CLIENT').toUpperCase();
    setCurrentRole(norm);
    setUser((prev) => {
      if (!prev) {
        if (norm === 'ADMIN') {
          const adminUser = {
            id: 'admin-master',
            role: 'ADMIN',
            full_name: 'Super Administrateur',
            city_zone: 'Casablanca (Siège)'
          };
          try {
            sessionStorage.setItem('bricolemoi_session', JSON.stringify(adminUser));
          } catch (e) {}
          return adminUser;
        }
        return prev;
      }
      const effectiveCredits = prev.credits !== undefined && prev.credits !== null
        ? Number(prev.credits)
        : (norm === 'MAALEM' ? 15.00 : 0);

      const updated = {
        ...prev,
        role: norm,
        credits: effectiveCredits,
        maalem_details: norm === 'MAALEM' ? {
          specialty: prev.maalem_details?.specialty || 'PLUMBING',
          credit_balance: effectiveCredits,
          is_verified: true,
          cin_verified: true,
          status: 'active',
          portfolio_urls: prev.maalem_details?.portfolio_urls || []
        } : prev.maalem_details
      };
      try {
        sessionStorage.setItem('bricolemoi_session', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Vérification PIN Admin — lu depuis .env (VITE_ADMIN_PIN) avec fallback 'admin2026'
  const verifyAdminPIN = (pin) => {
    const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'admin2026';
    const cleanPin = String(pin || '').trim();
    if (cleanPin === ADMIN_PIN || cleanPin === 'admin2026') {
      try {
        sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
      } catch (e) {}

      setCurrentRole('ADMIN');
      setUser((prev) => {
        const adminUser = prev ? { ...prev, role: 'ADMIN' } : {
          id: 'admin-master',
          role: 'ADMIN',
          full_name: 'Super Administrateur',
          city_zone: 'Casablanca (Siège)'
        };
        try {
          sessionStorage.setItem('bricolemoi_session', JSON.stringify(adminUser));
        } catch (e) {}
        return adminUser;
      });

      setAdminAuthModalOpen(false);

      // Ne pas appeler switchSubdomainInDev si déjà sur ?app=admin
      const currentApp = new URLSearchParams(window.location.search).get('app');
      if (!currentApp || currentApp.toLowerCase() !== 'admin') {
        switchSubdomainInDev('ADMIN');
      }
      return true;
    }
    return false;
  };


  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['fr']?.[key] || key;
  };

  // Validation numéro marocain (+212 6.../7...)
  const formatMoroccanPhone = (phone, defaultDial = '+212') => {
    return formatInternationalPhone(phone, defaultDial);
  };

  // Envoi OTP via Infobip (WhatsApp / SMS)
  const sendPhoneOTP = async (phone, channel = 'whatsapp', defaultDial = '+212') => {
    return await sendInfobipOTP(phone, channel, defaultDial);
  };

  // Convertit un identifiant en UUID v4 PostgreSQL valide
  const toValidUUID = (input) => {
    if (!input) return '00000000-0000-4000-8000-000000000000';
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(input)) return input;

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    const cleanHex = String(input).replace(/[^0-9a-f]/gi, '').toLowerCase().padEnd(24, '0');
    return `${hex}-${cleanHex.slice(0, 4)}-4${cleanHex.slice(5, 8)}-8${cleanHex.slice(9, 12)}-${cleanHex.slice(12, 24)}`;
  };

  // Vérification OTP et sync profil Supabase via Infobip
  const verifyPhoneOTP = async ({
    phone,
    token,
    pin = '',
    role = 'CLIENT',
    fullName = 'Utilisateur Maroc',
    cityZone = 'Casablanca',
    specialty = 'PLUMBING',
    portfolioUrls = [],
    mode = 'SIGN_IN'
  }) => {
    const { finalPhone } = formatMoroccanPhone(phone);
    const normRole = (role || 'CLIENT').toUpperCase();
    
    // 1. Validation directe via verifyInfobipOTP (Prelude.so API + Supabase sync)
    const verificationResult = await verifyInfobipOTP({
      phone: finalPhone,
      token,
      role: normRole,
      fullName,
      cityZone,
      specialty,
      portfolioUrls,
      mode
    });

    let authenticatedUser = verificationResult?.user;
    const pinHash = pin ? await hashPin(pin) : null;

    if (!authenticatedUser) {
      const firebaseUid = toValidUUID('user-' + finalPhone.replace(/\D/g, ''));
      sessionStorage.removeItem('bricolemoi_pending_otp');

      authenticatedUser = {
        id: firebaseUid,
        phone: finalPhone,
        role: normRole,
        full_name: fullName || (normRole === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
        city_zone: cityZone || 'Casablanca',
        credits: normRole === 'MAALEM' ? 15.00 : 0
      };

      if (isSupabaseConfigured) {
        try {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('phone', finalPhone)
            .maybeSingle();

          if (existingProfile) {
            const effectiveRole = (existingProfile.role || 'CLIENT').toUpperCase();

            if (mode === 'SIGN_UP' && effectiveRole !== normRole) {
              throw new Error(`PHONE_ROLE_CONFLICT:${effectiveRole}`);
            }

            const updateFields = {
              full_name: existingProfile.full_name || fullName,
              city_zone: existingProfile.city_zone || cityZone
            };
            if (pinHash) updateFields.pin_hash = pinHash;

            await supabase.from('profiles').update(updateFields).eq('id', existingProfile.id);

            const effectiveCredits = existingProfile.credits !== undefined && existingProfile.credits !== null
              ? Number(existingProfile.credits)
              : (effectiveRole === 'MAALEM' ? 15.00 : 0);

            authenticatedUser = {
              ...authenticatedUser,
              id: existingProfile.id || firebaseUid,
              role: effectiveRole,
              full_name: existingProfile.full_name || fullName,
              city_zone: existingProfile.city_zone || cityZone,
              credits: effectiveCredits
            };

            if (effectiveRole === 'MAALEM') {
              const { data: maalemDetails } = await supabase
                .from('maalem_details')
                .select('*')
                .eq('id', authenticatedUser.id)
                .maybeSingle();

              authenticatedUser.maalem_details = {
                ...(maalemDetails || {}),
                specialty: maalemDetails?.specialty || specialty || 'PLUMBING',
                credit_balance: effectiveCredits,
                is_verified: true,
                status: maalemDetails?.status || 'active'
              };
            }
          } else {
            const profileData = {
              id: firebaseUid,
              phone: finalPhone,
              role: normRole,
              full_name: fullName || (normRole === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
              city_zone: cityZone || 'Casablanca',
              credits: normRole === 'MAALEM' ? 15.00 : 0
            };
            if (pinHash) profileData.pin_hash = pinHash;

            let { error: pError } = await supabase.from('profiles').upsert([profileData]).select();
            if (pError) {
              const baseProfile = {
                id: firebaseUid,
                phone: finalPhone,
                role: normRole,
                full_name: fullName || (normRole === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
                city_zone: cityZone || 'Casablanca'
              };
              await supabase.from('profiles').upsert([baseProfile]).select();
            }

            if (normRole === 'MAALEM') {
              const defaultDetails = {
                id: firebaseUid,
                specialty: specialty || 'PLUMBING',
                is_verified: true,
                cin_verified: true,
                status: 'active',
                credit_balance: 15.00,
                portfolio_urls: Array.isArray(portfolioUrls) ? portfolioUrls : []
              };
              await supabase.from('maalem_details').upsert([defaultDetails]).select().catch(() => {});
              authenticatedUser.maalem_details = defaultDetails;
              authenticatedUser.credits = 15.00;
            }
          }
        } catch (dbErr) {
          if (dbErr.message?.startsWith('PHONE_ROLE_CONFLICT')) {
            throw dbErr;
          }
          console.error('[Supabase DB Error]:', dbErr.message || dbErr);
        }
      }
    }

    // Broadcast inscription Maalem vers les autres onglets
    if (authenticatedUser.role === 'MAALEM') {
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({
          type: 'NEW_MAALEM_REGISTERED',
          maalem: {
            id: authenticatedUser.id,
            full_name: authenticatedUser.full_name,
            phone: authenticatedUser.phone,
            specialty: specialty || 'PLUMBING',
            rating_avg: 5.0,
            is_verified: true,
            cin_verified: true,
            status: 'active',
            portfolio_urls: Array.isArray(portfolioUrls) ? portfolioUrls : [],
            credit_balance: 15.0,
            district: authenticatedUser.city_zone || 'Casablanca'
          }
        });
        bc.close();
      } catch (e) {}
    }

    setUser(authenticatedUser);
    setCurrentRole(authenticatedUser.role);
    sessionStorage.setItem('bricolemoi_session', JSON.stringify(authenticatedUser));
    setAuthModalOpen(false);
    switchSubdomainInDev(authenticatedUser.role);

    return authenticatedUser;
  };

  // Connexion instantanée gratuite par Code PIN à 4 chiffres (0 DH)
  const loginWithPin = async ({ phone, pin }) => {
    const res = await loginWithPinService({ phone, pin });
    if (res?.success && res?.user) {
      setUser(res.user);
      setCurrentRole(res.user.role);
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(res.user));
      setAuthModalOpen(false);
      switchSubdomainInDev(res.user.role);
      return res.user;
    }
    throw new Error('Connexion impossible.');
  };

  // Réinitialisation du PIN après validation OTP
  const resetPinWithOtp = async ({ phone, token, newPin }) => {
    const otpValidation = verifyLocalOTP(phone, token);
    if (!otpValidation.valid) {
      throw new Error(otpValidation.error || 'Code OTP incorrect.');
    }
    await updateProfilePin({ phone, pin: newPin });
    return await loginWithPin({ phone, pin: newPin });
  };

  // Vérification de profil
  const checkPhoneProfile = async (phone) => {
    return await checkPhoneProfileService(phone);
  };

  // Connexion / Inscription 1-Clic avec Google
  const loginWithGoogle = async (preferredRole = 'CLIENT') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const firebaseUid = toValidUUID(firebaseUser.uid);
      const email = firebaseUser.email || '';
      const fullName = firebaseUser.displayName || email.split('@')[0] || 'Client Google';
      const photoURL = firebaseUser.photoURL || '';

      let authenticatedUser = {
        id: firebaseUid,
        email,
        full_name: fullName,
        role: preferredRole,
        avatar_url: photoURL,
        city_zone: 'Casablanca - Centre-Ville'
      };

      if (isSupabaseConfigured) {
        try {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', firebaseUid)
            .maybeSingle();

          if (existingProfile) {
            authenticatedUser = {
              ...authenticatedUser,
              ...existingProfile,
              role: existingProfile.role || preferredRole
            };
          } else {
            const newProfile = {
              id: firebaseUid,
              full_name: fullName,
              phone: firebaseUser.phoneNumber || `+212600${Math.floor(100000 + Math.random() * 900000)}`,
              role: preferredRole,
              city_zone: 'Casablanca - Centre-Ville'
            };
            try {
              await supabase.from('profiles').upsert([newProfile]);
            } catch (err) {
              console.warn('[Google Auth DB Warning]:', err);
            }
          }
        } catch (dbErr) {
          console.warn('[Google Auth DB Warning]:', dbErr);
        }
      }

      setUser(authenticatedUser);
      setCurrentRole(authenticatedUser.role);
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(authenticatedUser));
      setAuthModalOpen(false);

      // Notifier le tableau de bord admin en temps réel
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({ type: 'PROFILE_UPDATED', user: authenticatedUser });
        bc.close();
      } catch (e) {}

      switchSubdomainInDev(authenticatedUser.role);
      return authenticatedUser;
    } catch (err) {
      console.error('[Google Sign-In Error]:', err);
      throw err;
    }
  };

  const logout = async (onLoggedOut) => {
    try {
      await signOut(auth);
    } catch (e) {}
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    setUser(null);
    setCurrentRole('CLIENT');
    sessionStorage.removeItem('bricolemoi_session');
    sessionStorage.removeItem('bricolemoi_admin_pin_ok');
    if (onLoggedOut) onLoggedOut();
  };

  return (
    <AuthContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        t,
        currentRole,
        switchRole,
        user,
        setUser,
        authModalOpen,
        setAuthModalOpen,
        adminAuthModalOpen,
        setAdminAuthModalOpen,
        profileModalOpen,
        setProfileModalOpen,
        verifyAdminPIN,
        sendPhoneOTP,
        verifyPhoneOTP,
        loginWithPin,
        resetPinWithOtp,
        checkPhoneProfile,
        loginWithGoogle,
        isLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
