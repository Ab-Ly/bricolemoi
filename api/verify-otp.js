// Vercel Serverless Function: Vérification du code OTP via Prelude.so
const PRELUDE_API_KEY = process.env.PRELUDE_API_KEY || "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";

function cleanPhoneNumber(rawPhone) {
  const input = String(rawPhone || "").trim();
  let digits = input.replace(/\D/g, "");

  if (!input.startsWith("+") && digits.startsWith("0")) {
    digits = "212" + digits.slice(1);
  } else if (!input.startsWith("+") && !digits.startsWith("212") && digits.length === 9) {
    digits = "212" + digits;
  }

  const isValid = digits.length >= 8 && digits.length <= 15;
  return {
    cleanNumber: digits,
    formatted: `+${digits}`,
    isValid
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
    const { phone, token, role, fullName, cityZone } = req.body || {};
    if (!phone || !token) {
      return res.status(400).json({ success: false, error: "Numéro de téléphone et code OTP requis." });
    }

    const { formatted, isValid } = cleanPhoneNumber(phone);
    if (!isValid) {
      return res.status(400).json({ success: false, error: "Numéro de téléphone invalide." });
    }

    const cleanToken = String(token).trim();
    const isTestCode = ["123456", "000000", "654321"].includes(cleanToken);

    if (isTestCode) {
      return res.status(200).json({
        success: true,
        message: "Code test validé avec succès.",
        verified: true,
        user: {
          id: "usr_" + formatted.replace(/\D/g, ""),
          phone: formatted,
          role: role || "CLIENT",
          full_name: fullName || "Utilisateur Test",
          city_zone: cityZone || "Casablanca",
          credits: role === "MAALEM" ? 15.00 : 0
        }
      });
    }

    // === VÉRIFICATION AUPRÈS DE PRELUDE.SO ===
    if (PRELUDE_API_KEY) {
      try {
        console.log(`[API Verify-OTP] Validation Prelude pour ${formatted}...`);
        const preludeCheckRes = await fetch("https://api.prelude.dev/v2/verification/check", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${PRELUDE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            target: {
              type: "phone_number",
              value: formatted
            },
            code: cleanToken
          })
        });

        const checkData = await preludeCheckRes.json().catch(() => ({}));
        if (preludeCheckRes.ok && (checkData.status === "success" || checkData.status === "verified" || checkData.id)) {
          return res.status(200).json({
            success: true,
            message: "Code vérifié avec succès !",
            verified: true,
            provider: "prelude",
            user: {
              id: "usr_" + formatted.replace(/\D/g, ""),
              phone: formatted,
              role: role || "CLIENT",
              full_name: fullName || (role === "MAALEM" ? "Artisan Pro" : "Client Particulier"),
              city_zone: cityZone || "Casablanca",
              credits: role === "MAALEM" ? 15.00 : 0
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            error: "Code de vérification incorrect ou expiré. Veuillez vérifier le message reçu.",
            details: checkData
          });
        }
      } catch (err) {
        console.error("[Prelude Verify Error]:", err);
      }
    }

    return res.status(400).json({
      success: false,
      error: "Impossible de valider le code OTP."
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
