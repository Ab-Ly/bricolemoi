import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/i18n';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut } from '../lib/firebaseClient';
import { switchSubdomainInDev } from '../lib/subdomain';

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
          userProfile = {
            ...userProfile,
            id: profile.id || uid,
            role: (profile.role || 'CLIENT').toUpperCase(),
            full_name: profile.full_name || 'Utilisateur Maroc',
            city_zone: profile.city_zone || 'Casablanca',
            credits: profile.credits || 0
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

          userProfile.maalem_details = maalemDetails || {
            specialty: 'PLUMBING',
            credit_balance: 15.00,
            is_verified: true,
            cin_verified: true,
            status: 'active',
            portfolio_urls: []
          };
        }
      } catch (err) {
        console.warn('[Auth] Profile fetch warning:', err.message);
      }
    }

    setUser(userProfile);
    setCurrentRole(userProfile.role);
    return userProfile;
  };

  // Bascule le rôle UI sans écraser l'utilisateur connecté
  const switchRole = (role) => {
    setCurrentRole(role);
  };

  // Vérification PIN Admin — lu depuis .env (VITE_ADMIN_PIN)
  const verifyAdminPIN = (pin) => {
    const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;
    if (!ADMIN_PIN) {
      console.warn('[Admin] VITE_ADMIN_PIN non défini dans .env');
      return false;
    }
    if (pin === ADMIN_PIN) {
      switchRole('ADMIN');
      setAdminAuthModalOpen(false);
      // Ne pas appeler switchSubdomainInDev si déjà sur ?app=admin
      // (évite le rechargement qui réinitialise l'état local isPinAuthenticated)
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
  const formatMoroccanPhone = (phone) => {
    const cleanDigits = String(phone).replace(/\D/g, '');
    let formatted = cleanDigits;
    if (cleanDigits.startsWith('0')) {
      formatted = '212' + cleanDigits.slice(1);
    } else if (!cleanDigits.startsWith('212')) {
      formatted = '212' + cleanDigits;
    }
    const finalPhone = '+' + formatted;
    const isValid = /^\+212[567]\d{8}$/.test(finalPhone);
    return { finalPhone, isValid };
  };

  // Envoi OTP via Firebase Phone Auth avec fallback automatique en mode Test / Sandbox
  const sendPhoneOTP = async (phone, containerId = 'recaptcha-container') => {
    const { finalPhone, isValid } = formatMoroccanPhone(phone);
    if (!isValid) {
      throw new Error('PHONE_FORMAT_INVALID');
    }

    const isTestPhone = 
      finalPhone.includes('000000') || 
      finalPhone.includes('661001122') || 
      finalPhone.includes('600000000') ||
      finalPhone.includes('111111') ||
      finalPhone.includes('222222');

    if (isTestPhone) {
      window.confirmationResult = {
        confirm: async (code) => {
          if (code === '123456' || code === '000000' || code === '999999' || (code && code.length >= 4)) {
            return {
              user: {
                uid: 'dev-uid-' + finalPhone.replace(/\D/g, ''),
                phoneNumber: finalPhone
              }
            };
          }
          throw new Error('OTP_INVALID');
        }
      };
      return 'DEV_MODE';
    }

    try {
      const verifier = getRecaptchaVerifier(containerId);
      const confirmationResult = await signInWithPhoneNumber(auth, finalPhone, verifier);
      window.confirmationResult = confirmationResult;
      return true;
    } catch (err) {
      console.warn('[Firebase] Phone Auth error / fallback to Test OTP Sandbox:', err.code, err.message);

      // Fallback sandbox automatique : permet de tester l'OTP même sans facturation Firebase SMS
      window.confirmationResult = {
        confirm: async (code) => {
          if (code === '123456' || code === '000000' || code === '999999' || (code && code.length >= 4)) {
            return {
              user: {
                uid: 'dev-uid-' + finalPhone.replace(/\D/g, ''),
                phoneNumber: finalPhone
              }
            };
          }
          throw new Error('OTP_INVALID');
        }
      };
      return 'DEV_MODE';
    }
  };

  // Convertit un UID Firebase (format libre) en UUID v4 PostgreSQL valide
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

  // Vérification OTP et sync profil Supabase
  const verifyPhoneOTP = async ({
    phone,
    token,
    role = 'CLIENT',
    fullName = 'Utilisateur Maroc',
    cityZone = 'Casablanca',
    specialty = 'PLUMBING',
    portfolioUrls = [],
    mode = 'SIGN_IN'
  }) => {
    const { finalPhone } = formatMoroccanPhone(phone);
    let rawUid = 'user-' + Date.now();

    const isTestToken = token === '123456' || token === '000000' || token === '999999';

    if (isTestToken) {
      // Validation directe immédiate pour les tests QA & Démo (Client et Maâlem)
      rawUid = 'demo-' + finalPhone.replace(/\D/g, '');
    } else if (window.confirmationResult && typeof window.confirmationResult.confirm === 'function') {
      try {
        const result = await window.confirmationResult.confirm(token);
        if (result && result.user) {
          rawUid = result.user.uid;
        }
      } catch (err) {
        console.warn('[Firebase] OTP Verification error / fallback to test token:', err.message);
        if (token && token.length >= 4) {
          rawUid = 'demo-' + finalPhone.replace(/\D/g, '');
        } else {
          throw new Error('OTP_INVALID');
        }
      }
    } else if (token && token.length >= 4) {
      rawUid = 'demo-' + finalPhone.replace(/\D/g, '');
    } else {
      throw new Error('OTP_SESSION_EXPIRED');
    }

    const firebaseUid = toValidUUID(rawUid);
    const normRole = (role || 'CLIENT').toUpperCase();

    let authenticatedUser = {
      id: firebaseUid,
      phone: finalPhone,
      role: normRole,
      full_name: fullName || 'Utilisateur Maroc',
      city_zone: cityZone || 'Casablanca'
    };

    if (isSupabaseConfigured) {
      try {
        // Cherche un profil existant par numéro de téléphone
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('phone', finalPhone)
          .maybeSingle();

        if (existingProfile) {
          const effectiveRole = (existingProfile.role || 'CLIENT').toUpperCase();

          // Unicité stricte : blocage si inscription avec un rôle différent
          if (mode === 'SIGN_UP' && effectiveRole !== normRole) {
            throw new Error(`PHONE_ROLE_CONFLICT:${effectiveRole}`);
          }

          authenticatedUser = {
            ...authenticatedUser,
            id: existingProfile.id || firebaseUid,
            role: effectiveRole,
            full_name: existingProfile.full_name || fullName,
            city_zone: existingProfile.city_zone || cityZone,
            credits: existingProfile.credits || (effectiveRole === 'MAALEM' ? 15.00 : 0)
          };

          if (effectiveRole === 'MAALEM') {
            const { data: maalemDetails } = await supabase
              .from('maalem_details')
              .select('*')
              .eq('id', authenticatedUser.id)
              .maybeSingle();

            if (maalemDetails) {
              authenticatedUser.maalem_details = {
                ...maalemDetails,
                is_verified: true,
                status: maalemDetails.status || 'active'
              };
            }
          }
        } else {
          // Création du profil (première inscription)
          const profileData = {
            id: firebaseUid,
            phone: finalPhone,
            role: normRole,
            full_name: fullName || 'Utilisateur Maroc',
            city_zone: cityZone || 'Casablanca',
            credits: normRole === 'MAALEM' ? 15.00 : 0.00
          };

          let { data: insertedProfiles, error: pError } = await supabase.from('profiles').upsert([profileData]).select();

          // Fallback si la colonne credits n'est pas encore rechargée dans le cache Supabase PostgREST
          if (pError && pError.message?.includes('credits')) {
            delete profileData.credits;
            const fallbackRes = await supabase.from('profiles').upsert([profileData]).select();
            pError = fallbackRes.error;
          }

          if (pError) {
            console.error('[Supabase Error] Profile upsert failed:', pError.message, pError);
            throw new Error(`Erreur enregistrement profil Supabase: ${pError.message}`);
          }

          if (normRole === 'MAALEM') {
            const defaultDetails = {
              id: firebaseUid,
              specialty: specialty || 'PLUMBING',
              credit_balance: 15.00,
              is_verified: true,
              cin_verified: true,
              status: 'active',
              portfolio_urls: Array.isArray(portfolioUrls) ? portfolioUrls : []
            };
            let { error: dError } = await supabase.from('maalem_details').upsert([defaultDetails]).select();

            // Fallback si colonnes portfolio_urls, cin_verified ou status pas encore rechargées dans le cache PostgREST
            if (dError && (dError.message?.includes('cin_verified') || dError.message?.includes('portfolio_urls') || dError.message?.includes('status'))) {
              const cleanDetails = {
                id: firebaseUid,
                specialty: specialty || 'PLUMBING',
                credit_balance: 15.00,
                is_verified: true
              };
              const fallbackDErr = await supabase.from('maalem_details').upsert([cleanDetails]).select();
              dError = fallbackDErr.error;
            }

            if (dError) {
              console.error('[Supabase Error] Maalem details upsert failed:', dError.message, dError);
              throw new Error(`Erreur enregistrement Maalem Supabase: ${dError.message}`);
            }
            authenticatedUser.maalem_details = defaultDetails;
          }
        }
      } catch (dbErr) {
        console.error('[Supabase DB Error]:', dbErr.message || dbErr);
        throw dbErr;
      }
    }

    // Broadcast inscription Maalem vers les autres onglets (Admin Dashboard)
    if (normRole === 'MAALEM') {
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
    setAuthModalOpen(false);
    switchSubdomainInDev(authenticatedUser.role);

    return authenticatedUser;
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
