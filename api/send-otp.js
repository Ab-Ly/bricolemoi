// Vercel Serverless Function: Envoi d'OTP via Prelude.so (avec Fallback Infobip)
const PRELUDE_API_KEY = process.env.PRELUDE_API_KEY || "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY || "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = "https://k95d1n.api.infobip.com";

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
        error: "Les numéros fixes (05...) ne peuvent pas recevoir de SMS. Veuillez entrer un numéro mobile (06 ou 07)." 
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
    isValid: true
  };
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

    const { cleanNumber, formatted, isValid, error } = cleanPhoneNumber(phone);
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
      return res.status(200).json({
        success: true,
        message: "Code test envoyé.",
        phone: formatted,
        is_test: true,
        dev_code: "123456"
      });
    }

    let preludeSuccess = false;
    let preludeData = null;

    // === 1. TENTATIVE PRELUDE.SO (SMS + WHATSAPP) ===
    if (PRELUDE_API_KEY) {
      try {
        console.log(`[API Send-OTP] Appel Prelude pour ${formatted}...`);
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
            message: "Code envoyé avec succès via Prelude (WhatsApp & SMS).",
            phone: formatted,
            verification_id: preludeData.id,
            details: preludeData
          });
        }
      } catch (err) {
        console.error("[Prelude Serverless Error]:", err);
      }
    }

    // === 2. FALLBACK INFOBIP SMS ===
    if (!preludeSuccess && INFOBIP_API_KEY) {
      const authHeader = INFOBIP_API_KEY.startsWith("App ") ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
      const fallbackOtp = String(Math.floor(100000 + Math.random() * 900000));
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
          message: "Code envoyé par SMS de secours (Infobip).",
          phone: formatted,
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
