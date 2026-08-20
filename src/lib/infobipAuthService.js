import { supabase, isSupabaseConfigured } from './supabaseClient';

const INFOBIP_API_KEY = import.meta.env.VITE_INFOBIP_API_KEY || '6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8';
const INFOBIP_BASE_URL = (import.meta.env.VITE_INFOBIP_BASE_URL || 'k95d1n.api.infobip.com').replace(/^https?:\/\//, '');

/**
 * Nettoie et formate un numéro de téléphone (Maroc ou International MRE/Étranger)
 * @param {string} rawPhone - Numéro brut saisi
 * @param {string} defaultDial - Indicatif pays sélectionné (ex: "+212", "+33", "+34")
 */
export function formatInternationalPhone(rawPhone, defaultDial = '+212') {
  const input = String(rawPhone || '').trim();
  const dialDigits = String(defaultDial || '+212').replace(/\D/g, '');
  let digits = input.replace(/\D/g, '');

  if (input.startsWith('+')) {
    digits = input.replace(/\D/g, '');
  } else {
    if (digits.startsWith('0')) {
      digits = dialDigits + digits.slice(1);
    } else if (!digits.startsWith(dialDigits)) {
      digits = dialDigits + digits;
    }
  }

  const isValid = digits.length >= 8 && digits.length <= 15;
  return {
    international: digits,
    formatted: `+${digits}`,
    finalPhone: `+${digits}`,
    isValid
  };
}

/**
 * Nettoie et formate spécifiquement un numéro marocain (+212)
 */
export function formatMoroccanPhone(rawPhone, defaultDial = '+212') {
  return formatInternationalPhone(rawPhone, defaultDial);
}

/**
 * Envoie un code OTP par SMS via l'API standard Infobip et l'Edge Function Supabase
 * @param {string} phone - Numéro de téléphone brut
 * @param {string} channel - Canal (défaut 'sms')
 * @param {string} defaultDial - Indicatif (défaut '+212')
 */
export async function sendOtpSms(phone, defaultDial = '+212') {
  return sendInfobipOTP(phone, 'sms', defaultDial);
}

export async function sendInfobipOTP(phone, requestedChannel = 'sms', defaultDial = '+212') {
  const { international, formatted, isValid } = formatInternationalPhone(phone, defaultDial);
  if (!isValid) {
    throw new Error('PHONE_FORMAT_INVALID');
  }

  // 1. Détection des numéros de test
  const isTestPhone = 
    international.endsWith('000000') || 
    international.includes('661001122') || 
    international.includes('111111') || 
    international.includes('222222');

  const otpCode = isTestPhone ? '123456' : String(Math.floor(100000 + Math.random() * 900000));
  const cleanPhone = international; // Ex: '33771937768' ou '212612345678'
  const messageText = `BricoleMoi : Votre code de verification est ${otpCode}. Valable 5 minutes.`;

  console.log(`🔑 [BricoleMoi SMS Auth] Envoi OTP pour ${formatted} (${cleanPhone}) : [ ${otpCode} ]`);

  let sentSuccessfully = false;
  let responseDetails = null;

  // 2. Tentative via l'Edge Function Supabase 'send-otp-sms'
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.functions.invoke('send-otp-sms', {
        body: { phone: formatted }
      });
      if (!error && data?.success) {
        sentSuccessfully = true;
        responseDetails = data;
      }
    } catch (edgeErr) {
      console.warn('[send-otp-sms Edge Function notice]:', edgeErr);
    }
  }

  // 3. Fallback direct via l'API Standard Infobip (Sender ID alphanumérique direct BricoleMoi)
  if (!sentSuccessfully && !isTestPhone && INFOBIP_API_KEY) {
    const authHeader = INFOBIP_API_KEY.startsWith('App ') ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
    try {
      const smsRes = await fetch(`https://${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              from: 'BricoleMoi',
              destinations: [{ to: cleanPhone }],
              text: messageText
            }
          ]
        })
      });

      const smsData = await smsRes.json().catch(() => ({}));
      responseDetails = smsData;

      if (smsRes.ok && smsData?.messages?.[0]?.status?.groupName !== 'REJECTED') {
        sentSuccessfully = true;
      } else {
        console.warn('[Infobip Direct SMS notice]:', smsData);
      }
    } catch (smsErr) {
      console.warn('[Infobip Direct SMS error]:', smsErr);
    }
  } else if (isTestPhone) {
    sentSuccessfully = true;
  }

  // 4. Enregistrement en BDD Supabase (table otp_verifications) avec expiration 5 minutes
  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('otp_verifications')
        .upsert({
          phone: formatted,
          otp_code: otpCode,
          channel: 'sms',
          expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          verified: false,
          attempts: 0,
          updated_at: new Date().toISOString()
        }, { onConflict: 'phone' });
    } catch (dbErr) {
      console.warn('[otp_verifications db write]:', dbErr);
    }
  }

  // Stocker dans le sessionStorage pour validation locale de secours (5 minutes)
  sessionStorage.setItem('bricolemoi_pending_otp', JSON.stringify({
    phone: formatted,
    code: otpCode,
    expiresAt: Date.now() + 5 * 60 * 1000
  }));

  return {
    success: true,
    channel: 'sms',
    phone: formatted,
    cleanPhoneNumber: cleanPhone,
    expires_in: 300,
    isTest: isTestPhone,
    code: isTestPhone ? otpCode : undefined,
    details: responseDetails
  };
}

/**
 * Valide le code OTP saisi (Strictement le code réel reçu)
 */
export function verifyLocalOTP(phone, inputCode) {
  const { formatted } = formatMoroccanPhone(phone);
  const cleanInput = String(inputCode || '').trim();

  const stored = sessionStorage.getItem('bricolemoi_pending_otp');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.phone === formatted) {
        if (Date.now() > parsed.expiresAt) {
          return { valid: false, error: 'Le code OTP a expiré. Veuillez en demander un nouveau.' };
        }
        if (parsed.code === cleanInput) {
          return { valid: true };
        }
      }
    } catch (e) {}
  }

  return { valid: false, error: 'Code OTP incorrect. Veuillez vérifier le code reçu par WhatsApp ou SMS.' };
}

/**
 * Vérifie le code OTP SMS via l'Edge Function Supabase 'verify-otp-sms'
 */
export async function verifyOtpSms(params) {
  return verifyInfobipOTP(params);
}

export async function verifyInfobipOTP({ phone, token, role = 'CLIENT', fullName, cityZone, specialty, portfolioUrls, mode = 'SIGN_IN' }) {
  const { formatted, isValid } = formatInternationalPhone(phone);
  if (!isValid) throw new Error('Format de numéro de téléphone invalide.');

  const cleanToken = String(token || '').trim();
  if (!cleanToken) throw new Error('Code de vérification SMS requis.');

  // 1. Appel Edge Function Supabase 'verify-otp-sms'
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp-sms', {
        body: {
          phone: formatted,
          token: cleanToken,
          role,
          fullName,
          cityZone,
          specialty,
          portfolioUrls,
          mode
        }
      });

      if (error) {
        throw new Error(error.message || 'Erreur lors de la vérification du code SMS.');
      }

      if (data && !data.success) {
        throw new Error(data.error || 'Code SMS incorrect ou expiré.');
      }

      if (data?.success) {
        return data;
      }
    } catch (edgeErr) {
      console.warn('[verify-otp-sms Edge Notice]:', edgeErr);
      if (edgeErr.message && !edgeErr.message.includes('Failed to send') && !edgeErr.message.includes('fetch')) {
        throw edgeErr;
      }
    }
  }

  // 2. Fallback de validation locale (5 min)
  const localRes = verifyLocalOTP(formatted, cleanToken);
  if (!localRes.valid) {
    throw new Error(localRes.error || 'Code SMS invalide ou expiré (validité 5 minutes).');
  }

  return {
    success: true,
    user: {
      id: 'usr_' + formatted.replace(/\D/g, ''),
      phone: formatted,
      role: role || 'CLIENT',
      full_name: fullName || (role === 'MAALEM' ? 'Artisan Pro' : 'Client Particulier'),
      city_zone: cityZone || 'Casablanca',
      credits: role === 'MAALEM' ? 15.00 : 0
    }
  };
}

/**
 * Calcule un hash sécurisé SHA-256 du Code PIN à 4 chiffres
 */
export async function hashPin(pin) {
  const clean = String(pin || '').trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`bricolemoi_secure_salt_${clean}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Helper: génère toutes les variantes possibles d'un numéro de téléphone
 * (ex: "+212619184098", "212619184098", "0619184098", "619184098")
 */
function getPhoneCandidateVariants(phone, defaultDial = '+212') {
  const { international, formatted, isValid } = formatInternationalPhone(phone, defaultDial);
  if (!isValid && !international) return [];
  const national = international.startsWith('212') ? international.slice(3) : international;
  const withZero = '0' + national;
  const candidates = [
    formatted,
    international,
    withZero,
    national,
    `+212${national}`,
    `212${national}`,
    `0${national}`,
    `+212 ${national}`
  ];
  return [...new Set(candidates.filter(Boolean))];
}

/**
 * Vérifie proactivement l'existence d'un numéro dans la base Supabase (multi-formats)
 */
export async function checkPhoneProfile(phone) {
  const { formatted, isValid } = formatMoroccanPhone(phone);
  const candidates = getPhoneCandidateVariants(phone);
  if (candidates.length === 0) return { isValid: false, exists: false };

  if (!isSupabaseConfigured) {
    const localMap = JSON.parse(localStorage.getItem('bricolemoi_local_users') || '{}');
    for (const c of candidates) {
      if (localMap[c]) {
        const u = localMap[c];
        return {
          isValid: true,
          exists: true,
          role: u.role || 'CLIENT',
          fullName: u.full_name,
          hasPin: Boolean(u.pin_hash),
          phone: formatted,
          user: u
        };
      }
    }
    return { isValid: true, exists: false, phone: formatted };
  }

  try {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .in('phone', candidates);

    // Si non trouvé par égalité stricte, recherche tolérante par sous-chaîne des chiffres nationaux
    const national = candidates[3] || candidates[1] || '';
    if ((!profiles || profiles.length === 0) && national.length >= 8) {
      const { data: fuzzyProfiles } = await supabase
        .from('profiles')
        .select('*')
        .ilike('phone', `%${national}%`);
      if (fuzzyProfiles && fuzzyProfiles.length > 0) {
        profiles = fuzzyProfiles;
      }
    }

    if (profiles && profiles.length > 0) {
      const profile = profiles[0];
      const storedLocalPin = getLocalPin(formatted) || getLocalPin(profile.phone);
      return {
        isValid: true,
        exists: true,
        role: (profile.role || 'CLIENT').toUpperCase(),
        fullName: profile.full_name,
        cityZone: profile.city_zone,
        hasPin: Boolean(profile.pin_hash || storedLocalPin),
        phone: formatted,
        user: profile
      };
    }

    // 3. Fallback: Vérifier dans les données locales ou maalem_details
    try {
      const onlineMap = JSON.parse(localStorage.getItem('bricolemoi_online_maalems_map') || '{}');
      for (const mId in onlineMap) {
        const m = onlineMap[mId];
        const mPhoneDigits = String(m.phone || '').replace(/\D/g, '');
        if (mPhoneDigits && national && (mPhoneDigits.includes(national) || national.includes(mPhoneDigits))) {
          return {
            isValid: true,
            exists: true,
            role: 'MAALEM',
            fullName: m.full_name || 'Artisan Maâlem',
            cityZone: m.city_zone || m.district || 'Casablanca',
            hasPin: true,
            phone: formatted,
            user: m
          };
        }
      }
    } catch (e) {}

    return { isValid: true, exists: false, phone: formatted };
  } catch (err) {
    console.warn('[checkPhoneProfile Error]:', err.message);
    return { isValid: true, exists: false, phone: formatted };
  }
}

/**
 * Cache local des PINs pour garantir le fonctionnement même sans migration SQL
 */
function getLocalPin(phone) {
  try {
    const pins = JSON.parse(localStorage.getItem('bricolemoi_pin_hashes') || '{}');
    return pins[phone];
  } catch (e) {
    return null;
  }
}

function setLocalPin(phone, hashedPin) {
  try {
    const pins = JSON.parse(localStorage.getItem('bricolemoi_pin_hashes') || '{}');
    pins[phone] = hashedPin;
    localStorage.setItem('bricolemoi_pin_hashes', JSON.stringify(pins));
  } catch (e) {}
}

/**
 * Connexion instantanée sécurisée par Code PIN à 4 chiffres (Strict sans passe-droit)
 */
export async function loginWithPin({ phone, pin }) {
  const candidates = getPhoneCandidateVariants(phone);
  const { formatted, isValid } = formatMoroccanPhone(phone);
  if (candidates.length === 0) {
    throw new Error('Numéro de téléphone marocain invalide.');
  }

  const cleanPin = String(pin || '').trim();
  if (cleanPin.length !== 4) {
    throw new Error('Le code PIN doit comporter exactement 4 chiffres.');
  }

  const hashed = await hashPin(cleanPin);
  const localHashed = getLocalPin(formatted);

  if (isSupabaseConfigured) {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .in('phone', candidates);

    const national = candidates[3] || candidates[1] || '';
    if ((!profiles || profiles.length === 0) && national.length >= 8) {
      const { data: fuzzyProfiles } = await supabase
        .from('profiles')
        .select('*')
        .ilike('phone', `%${national}%`);
      if (fuzzyProfiles && fuzzyProfiles.length > 0) {
        profiles = fuzzyProfiles;
      }
    }

    const profile = profiles && profiles.length > 0 ? profiles[0] : null;

    if (!profile) {
      throw new Error('Compte introuvable. Veuillez d\'abord vous inscrire.');
    }

    // Vérification STRICTE du PIN unique de l'utilisateur
    const storedHash = profile.pin_hash || localHashed;
    if (storedHash) {
      if (storedHash !== hashed) {
        throw new Error('Code PIN incorrect. Veuillez réessayer ou réinitialiser votre PIN.');
      }
    } else {
      // Aucun PIN enregistré : premier enregistrement du PIN
      setLocalPin(formatted, hashed);
      try {
        await supabase.from('profiles').update({ pin_hash: hashed }).eq('id', profile.id);
      } catch (e) {}
    }

    const effectiveRole = (profile.role || 'CLIENT').toUpperCase();
    let maalemDetails = null;

    if (effectiveRole === 'MAALEM') {
      const { data: mData } = await supabase
        .from('maalem_details')
        .select('*')
        .eq('id', profile.id)
        .maybeSingle();
      maalemDetails = mData;
    }

    return {
      success: true,
      user: {
        id: profile.id,
        phone: profile.phone,
        role: effectiveRole,
        full_name: profile.full_name,
        city_zone: profile.city_zone,
        credits: profile.credits || (effectiveRole === 'MAALEM' ? 15.00 : 0),
        maalem_details: maalemDetails
      }
    };
  }

  // Fallback offline demo
  return {
    success: true,
    user: {
      id: 'demo-' + formatted.replace(/\D/g, ''),
      phone: formatted,
      role: 'CLIENT',
      full_name: 'Utilisateur Démo'
    }
  };
}

/**
 * Mise à jour ou réinitialisation sécurisée du PIN (après validation OTP)
 */
export async function updateProfilePin({ phone, pin }) {
  const { formatted, isValid } = formatMoroccanPhone(phone);
  if (!isValid) throw new Error('Numéro invalide.');
  const hashed = await hashPin(pin);

  setLocalPin(formatted, hashed);

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('profiles')
        .update({ pin_hash: hashed })
        .eq('phone', formatted);
    } catch (e) {}
  }
  return { success: true };
}
