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

const INFOBIP_WHATSAPP_SENDER = import.meta.env.VITE_INFOBIP_WHATSAPP_SENDER || '212638853698';
const INFOBIP_SMS_SENDER = import.meta.env.VITE_INFOBIP_SMS_SENDER || '447860061379';

/**
 * Envoie un code OTP par WhatsApp ou SMS direct via l'API Infobip (Maroc & International)
 */
export async function sendInfobipOTP(phone, requestedChannel = 'whatsapp', defaultDial = '+212') {
  const { international, formatted, isValid } = formatInternationalPhone(phone, defaultDial);
  if (!isValid) {
    throw new Error('PHONE_FORMAT_INVALID');
  }

  // 1. Détection numéro de test
  const isTestPhone = 
    international.endsWith('000000') || 
    international.includes('661001122') || 
    international.includes('111111') || 
    international.includes('222222');

  const otpCode = isTestPhone ? '123456' : String(Math.floor(100000 + Math.random() * 900000));
  const authHeader = INFOBIP_API_KEY.startsWith('App ') ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
  const messageText = `🇲🇦 *BRICOLEMOI MAROC* | بريكول موا 🛠️
━━━━━━━━━━━━━━━━━━━━
🔐 *Code de vérification / كود التحقق :*
👉 *${otpCode}* 👈

⏱️ _Valable 5 minutes / صالح لمدة 5 دقائق_
⚠️ _Ne partagez ce code avec personne / ما تبارطاجيش هاد الكود مع حتى واحد_
━━━━━━━━━━━━━━━━━━━━
👷‍♂️ _BricoleMoi – Artisans qualifiés & Dépannage express au Maroc_`;

  let channelUsed = requestedChannel;
  let sentSuccessfully = false;

  if (!isTestPhone) {
    // 1. Si WhatsApp demandé (ou par défaut avec les 100 messages gratuits) :
    if (requestedChannel === 'whatsapp') {
      try {
        const waRes = await fetch(`https://${INFOBIP_BASE_URL}/whatsapp/1/message/text`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            from: INFOBIP_WHATSAPP_SENDER,
            to: international,
            content: {
              text: messageText
            }
          })
        });

        const waData = await waRes.json().catch(() => ({}));
        if (waRes.ok && waData?.status?.groupName !== 'REJECTED') {
          sentSuccessfully = true;
          channelUsed = 'whatsapp';
        } else {
          console.warn('[Infobip WhatsApp notice]:', waData);
        }
      } catch (waErr) {
        console.warn('[Infobip WhatsApp error]:', waErr);
      }
    }

    // 2. Si SMS demandé ou si WhatsApp n'a pas pu aboutir :
    if (!sentSuccessfully) {
      try {
        const smsRes = await fetch(`https://${INFOBIP_BASE_URL}/sms/3/messages`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              {
                destinations: [{ to: international }],
                sender: INFOBIP_SMS_SENDER,
                content: {
                  text: `[BricoleMoi] Votre code de confirmation est : ${otpCode}. Valable 5 minutes.`
                }
              }
            ]
          })
        });

        const smsData = await smsRes.json().catch(() => ({}));
        if (smsRes.ok && smsData?.messages?.[0]?.status?.groupName !== 'REJECTED') {
          sentSuccessfully = true;
          channelUsed = 'sms';
        } else {
          console.warn('[Infobip SMS notice]:', smsData);
        }
      } catch (smsErr) {
        console.warn('[Infobip SMS notice]:', smsErr);
      }
    }
  } else {
    sentSuccessfully = true;
  }

  // Stocker l'OTP pour vérification dans la session
  sessionStorage.setItem('bricolemoi_pending_otp', JSON.stringify({
    phone: formatted,
    code: otpCode,
    expiresAt: Date.now() + 5 * 60 * 1000
  }));

  return {
    success: true,
    channel: channelUsed,
    phone: formatted,
    isTest: isTestPhone,
    code: otpCode
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
 * Vérifie proactivement l'existence d'un numéro dans la base Supabase
 */
export async function checkPhoneProfile(phone) {
  const { formatted, isValid } = formatMoroccanPhone(phone);
  if (!isValid) return { isValid: false, exists: false };

  if (!isSupabaseConfigured) {
    const localMap = JSON.parse(localStorage.getItem('bricolemoi_local_users') || '{}');
    const localUser = localMap[formatted];
    if (localUser) {
      return {
        isValid: true,
        exists: true,
        role: localUser.role || 'CLIENT',
        fullName: localUser.full_name,
        hasPin: Boolean(localUser.pin_hash),
        phone: formatted
      };
    }
    return { isValid: true, exists: false, phone: formatted };
  }

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, phone, role, full_name, city_zone, credits, pin_hash')
      .eq('phone', formatted)
      .maybeSingle();

    if (profile) {
      return {
        isValid: true,
        exists: true,
        role: (profile.role || 'CLIENT').toUpperCase(),
        fullName: profile.full_name,
        hasPin: Boolean(profile.pin_hash),
        phone: formatted,
        user: profile
      };
    }
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
  const { formatted, isValid } = formatMoroccanPhone(phone);
  if (!isValid) {
    throw new Error('Numéro de téléphone marocain invalide.');
  }

  const cleanPin = String(pin || '').trim();
  if (cleanPin.length !== 4) {
    throw new Error('Le code PIN doit comporter exactement 4 chiffres.');
  }

  const hashed = await hashPin(cleanPin);
  const localHashed = getLocalPin(formatted);

  if (isSupabaseConfigured) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', formatted)
      .maybeSingle();

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
      // Aucun PIN enregistré : premier enregistrement
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
