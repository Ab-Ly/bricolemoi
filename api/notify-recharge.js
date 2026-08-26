// Vercel Serverless Function: Notification WhatsApp Admin pour Recharge de Crédit Maâlem
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "http://51.255.46.206:8085";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "bricolemoi_secret_token_2026";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "bricolemoi-otp";
const ADMIN_WHATSAPP_PHONE = process.env.ADMIN_WHATSAPP_PHONE || "212619184098";
const N8N_WEBHOOK_URL = process.env.N8N_RECHARGE_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL || "http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io/webhook/bricolemoi-booking-radar";

function formatPhone(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) {
    digits = "212" + digits.slice(1);
  } else if (!digits.startsWith("212") && digits.length === 9) {
    digits = "212" + digits;
  }
  return digits;
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
    const {
      maalemId,
      maalemName = "Artisan Maâlem",
      maalemPhone = "",
      specialty = "Général",
      cityZone = "Casablanca",
      amountDh = 100,
      paymentMethod = "Virement / Transfert",
      referenceRef = "",
      receiptPhotoUrl = null,
      transactionId = ""
    } = req.body || {};

    const cleanMaalemPhone = formatPhone(maalemPhone);
    const adminPhone = formatPhone(ADMIN_WHATSAPP_PHONE);

    console.log(`💳 [Admin Recharge Alert] Demande de ${amountDh} DH par ${maalemName} (${cleanMaalemPhone}) - Réf: ${referenceRef}`);

    // Notification n8n en tâche de fond pour traçabilité / comptabilité
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "RECHARGE_SUBMITTED",
        maalemId,
        maalemName,
        maalemPhone: cleanMaalemPhone,
        specialty,
        cityZone,
        amountDh,
        paymentMethod,
        referenceRef,
        receiptPhotoUrl,
        transactionId,
        submittedAt: new Date().toISOString()
      })
    }).catch((err) => console.warn("[n8n Recharge Log Error]:", err.message));

    // Construction du texte de notification WhatsApp
    const messageCaption = `💳 *NOUVELLE DEMANDE DE RECHARGE MAÂLEM* 🇲🇦\n\n` +
      `Bonjour Admin,\nUn artisan vient de soumettre une demande de crédit pour son compte :\n\n` +
      `👤 *Artisan* : *${maalemName}*\n` +
      `📱 *Téléphone* : *+${cleanMaalemPhone || "Non renseigné"}*\n` +
      `🔧 *Métier / Ville* : ${specialty} (${cityZone})\n` +
      `💰 *Montant Demandé* : *${amountDh} DH*\n` +
      `🏦 *Moyen de Paiement* : ${paymentMethod}\n` +
      `🧾 *N° de Reçu / Réf* : *${referenceRef || "N/A"}*\n\n` +
      `⚡ *Valider la recharge dans le Backoffice :*\n` +
      `👉 https://bricolemoi.vercel.app?app=admin`;

    let sentSuccessfully = false;
    let responseData = null;

    // Si une pièce jointe (reçu / capture) est fournie, envoyer directement comme média avec légende
    if (receiptPhotoUrl && typeof receiptPhotoUrl === 'string' && receiptPhotoUrl.trim().length > 0) {
      try {
        console.log(`📸 [Admin Recharge Alert] Envoi avec pièce jointe vers ${adminPhone}...`);
        const mediaRes = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": EVOLUTION_API_KEY
          },
          body: JSON.stringify({
            number: adminPhone,
            mediatype: "image",
            mimetype: "image/jpeg",
            caption: messageCaption,
            media: receiptPhotoUrl,
            fileName: `recu-${referenceRef || Date.now()}.jpg`
          })
        });

        responseData = await mediaRes.json().catch(() => ({}));
        if (mediaRes.ok && responseData?.key) {
          sentSuccessfully = true;
        } else {
          console.warn("[Evolution API Media Warning - Fallback to Text]:", responseData);
        }
      } catch (mediaErr) {
        console.error("[Evolution API SendMedia Error]:", mediaErr);
      }
    }

    // Fallback : Envoi en format Texte enrichi si pas de média ou si l'envoi de média a échoué
    if (!sentSuccessfully) {
      console.log(`💬 [Admin Recharge Alert] Envoi format texte vers ${adminPhone}...`);
      const fallbackText = receiptPhotoUrl 
        ? `${messageCaption}\n\n📸 *Lien de la Pièce Jointe :*\n👉 ${receiptPhotoUrl}`
        : messageCaption;

      const textRes = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": EVOLUTION_API_KEY
        },
        body: JSON.stringify({
          number: adminPhone,
          text: fallbackText
        })
      });

      responseData = await textRes.json().catch(() => ({}));
      if (textRes.ok && responseData?.key) {
        sentSuccessfully = true;
      }
    }

    return res.status(200).json({
      success: sentSuccessfully,
      adminNotified: sentSuccessfully,
      hasAttachment: Boolean(receiptPhotoUrl),
      details: responseData
    });
  } catch (error) {
    console.error("[Notify Admin Recharge Fatal Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
