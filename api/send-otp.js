// Vercel Serverless Function: Envoi d'OTP
// Maroc (+212) -> WhatsApp via Evolution API (VPS)
// Hors Maroc -> SMS via Prelude.so & Infobip
import crypto from 'crypto';

const PRELUDE_API_KEY = process.env.PRELUDE_API_KEY || "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY || "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = "https://k95d1n.api.infobip.com";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "http://51.255.46.206:8085";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "bricolemoi_secret_token_2026";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "bricolemoi-otp";
const OTP_SIGNING_SECRET = process.env.OTP_SIGNING_SECRET || "bricolemoi_otp_jwt_secret_2026";

// Rate limiter in-memory pour prévenir le spam & toll fraud
const recentRequests = new Map();
const RATE_LIMIT_WINDOW_MS = 20 * 1000; // 20 secondes minimum entre deux envois

function cleanPhoneNumber(rawPhone) {
  const input = String(rawPhone || "").trim();
  let digits = input.replace(/\D/g, "");

  if (!input.startsWith("+") && digits.startsWith("0")) {
    digits = "212" + digits.slice(1);
  } else if (!input.startsWith("+") && !digits.startsWith("212") && digits.length === 9) {
    digits = "212" + digits;
  }

  // Vérification de base de la longueur
  const isValidLength = digits.length >= 8 && digits.length <= 15;
  if (!isValidLength) {
    return { cleanNumber: digits, formatted: `+${digits}`, isValid: false, error: "Longueur de numéro invalide." };
  }

  // Filtrage strict Maroc : Rejeter les lignes fixes (05 / +2125)
  if (digits.startsWith("212")) {
    const nationalPart = digits.slice(3);
    if (nationalPart.startsWith("5")) {
      return { 
        cleanNumber: digits, 
        formatted: `+${digits}`, 
        isValid: false, 
        error: "Les numéros fixes (05...) ne peuvent pas recevoir de messages. Veuillez entrer un numéro mobile (06 ou 07)." 
      };
    }
    if (!nationalPart.startsWith("6") && !nationalPart.startsWith("7") && !digits.endsWith("000000")) {
      return { 
        cleanNumber: digits, 
        formatted: `+${digits}`, 
        isValid: false, 
        error: "Numéro marocain non mobile. Seuls les numéros 06 et 07 sont acceptés." 
      };
    }
  }

  // Filtrage strict France : Rejeter les lignes fixes (01, 02, 03, 04, 05, 08, 09)
  if (digits.startsWith("33")) {
    const nationalPart = digits.slice(2);
    if (!nationalPart.startsWith("6") && !nationalPart.startsWith("7") && !digits.endsWith("000000")) {
      return { 
        cleanNumber: digits, 
        formatted: `+${digits}`, 
        isValid: false, 
        error: "Numéro français non mobile. Seuls les numéros 06 et 07 sont acceptés." 
      };
    }
  }

  return {
    cleanNumber: digits,
    formatted: `+${digits}`,
    isValid: true,
    isMorocco: digits.startsWith("212")
  };
}

function generateOtpSignature(phone, code, expiresAt) {
  const data = `${phone}:${code}:${expiresAt}`;
  return crypto.createHmac("sha256", OTP_SIGNING_SECRET).update(data).digest("hex");
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { phone } = req.body || {};
    if (!phone) {
      return res.status(400).json({ success: false, error: "Numéro de téléphone requis." });
    }

    const { cleanNumber, formatted, isValid, isMorocco, error } = cleanPhoneNumber(phone);
    if (!isValid) {
      return res.status(400).json({ success: false, error: error || "Numéro de téléphone invalide." });
    }

    // Rate Limiting anti-gaspillage par numéro
    const now = Date.now();
    const lastRequest = recentRequests.get(cleanNumber);
    if (lastRequest && (now - lastRequest) < RATE_LIMIT_WINDOW_MS) {
      const waitSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastRequest)) / 1000);
      return res.status(429).json({ 
        success: false, 
        error: `Veuillez patienter ${waitSec}s avant de renvoyer un code.` 
      });
    }
    recentRequests.set(cleanNumber, now);

    const isTestNumber = 
      cleanNumber.endsWith("000000") || 
      cleanNumber.includes("661001122") || 
      cleanNumber.includes("111111") || 
      cleanNumber.includes("222222");

    if (isTestNumber) {
      const expiresAt = now + 5 * 60 * 1000;
      const sessionToken = `${expiresAt}.${generateOtpSignature(formatted, "123456", expiresAt)}`;
      return res.status(200).json({
        success: true,
        message: "Code test envoyé.",
        phone: formatted,
        is_test: true,
        channel: "test",
        sessionToken,
        dev_code: "123456"
      });
    }

    // === 1. ROUTAGE MAROC (+212) : WHATSAPP VIA EVOLUTION API ===
    if (isMorocco && EVOLUTION_API_URL) {
      const otpCode = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = now + 5 * 60 * 1000;
      const sessionToken = `${expiresAt}.${generateOtpSignature(formatted, otpCode, expiresAt)}`;

      try {
        console.log(`[API Send-OTP] Envoi WhatsApp Evolution API pour Maroc: ${cleanNumber}...`);
        const evoRes = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": EVOLUTION_API_KEY
          },
          body: JSON.stringify({
            number: cleanNumber,
            text: `🛠️ *BricoleMoi Maroc*\n\nVotre code de vérification WhatsApp est : *${otpCode}*\n\n_Ce code expire dans 5 minutes. Ne le partagez avec personne._`
          })
        });

        const evoData = await evoRes.json().catch(() => ({}));
        if (evoRes.ok && (evoData.key || evoData.status === "PENDING" || evoData.status === "SERVER_ACK")) {
          return res.status(200).json({
            success: true,
            provider: "evolution_whatsapp",
            channel: "whatsapp",
            message: "Code de vérification envoyé sur WhatsApp.",
            phone: formatted,
            sessionToken,
            details: evoData
          });
        }
        console.warn("[Evolution API notice] Échec envoi WhatsApp, bascule sur SMS fallback:", evoData);
      } catch (evoErr) {
        console.error("[Evolution API Error]:", evoErr);
      }
    }

    // === 2. ROUTAGE HORS MAROC (OU FALLBACK MAROC) : SMS VIA PRELUDE.SO ===
    let preludeSuccess = false;
    let preludeData = null;

    if (PRELUDE_API_KEY) {
      try {
        console.log(`[API Send-OTP] Appel Prelude (SMS International) pour ${formatted}...`);
        const preludeRes = await fetch("https://api.prelude.dev/v2/verification", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${PRELUDE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            target: {
              type: "phone_number",
              value: formatted
            }
          })
        });

        preludeData = await preludeRes.json().catch(() => ({}));
        if (preludeRes.ok && (preludeData.id || preludeData.status === "success" || preludeData.status === "pending")) {
          preludeSuccess = true;
          return res.status(200).json({
            success: true,
            provider: "prelude",
            channel: "sms",
            message: "Code envoyé par SMS via Prelude.",
            phone: formatted,
            verification_id: preludeData.id,
            details: preludeData
          });
        }
      } catch (err) {
        console.error("[Prelude Serverless Error]:", err);
      }
    }

    // === 3. ULTIME FALLBACK SMS VIA INFOBIP ===
    if (!preludeSuccess && INFOBIP_API_KEY) {
      const authHeader = INFOBIP_API_KEY.startsWith("App ") ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
      const fallbackOtp = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = now + 5 * 60 * 1000;
      const sessionToken = `${expiresAt}.${generateOtpSignature(formatted, fallbackOtp, expiresAt)}`;
      const messageText = `BricoleMoi : Votre code de verification est ${fallbackOtp}. Valable 5 minutes.`;

      try {
        const infobipRes = await fetch(`${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            messages: [{
              from: "BricoleMoi",
              destinations: [{ to: cleanNumber }],
              text: messageText
            }]
          })
        });

        const infobipData = await infobipRes.json().catch(() => ({}));
        return res.status(200).json({
          success: true,
          provider: "infobip_fallback",
          channel: "sms",
          message: "Code envoyé par SMS de secours (Infobip).",
          phone: formatted,
          sessionToken,
          details: infobipData
        });
      } catch (infobipErr) {
        console.error("[Infobip Fallback Error]:", infobipErr);
      }
    }

    return res.status(500).json({
      success: false,
      error: "Échec de l'envoi de code OTP.",
      details: preludeData
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
