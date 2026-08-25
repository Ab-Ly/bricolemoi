// Vercel Serverless Function: Dispatching d'Urgence SOS (WhatsApp Evolution API + n8n)
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "http://51.255.46.206:8085";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "bricolemoi_secret_token_2026";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "bricolemoi-otp";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io/webhook/bricolemoi-booking-radar";

// Calcul de distance Haversine en kilomètres
function getDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
  const R = 6371; // Rayon Terre km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
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
      clientName,
      clientPhone,
      category = "PLUMBING",
      district = "Maârif",
      city = "Casablanca",
      budget = "250",
      description = "Intervention Urgente SOS",
      clientLat = 33.5898,
      clientLng = -7.6038,
      candidateMaalems = []
    } = req.body || {};

    const cleanClientPhone = String(clientPhone || "").replace(/\D/g, "");
    console.log(`🚨 [SOS Dispatch API] Nouvelle urgence de ${clientName} (${cleanClientPhone}) à ${district}, ${city}`);

    // 1. Appel n8n en tâche de fond
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    }).catch((err) => console.warn("[n8n Hook Error]:", err.message));

    // 2. Filtrer les Maâlems dans un rayon de <= 8 km
    const targetCategory = category.toUpperCase();
    const qualifiedMaalems = candidateMaalems
      .map((m) => ({
        ...m,
        cleanPhone: String(m.phone || "").replace(/\D/g, ""),
        distanceKm: getDistanceKm(clientLat, clientLng, Number(m.lat || m.latitude), Number(m.lng || m.longitude))
      }))
      .filter((m) => m.cleanPhone && m.distanceKm <= 8.0)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    console.log(`📍 [SOS Dispatch] ${qualifiedMaalems.length} Maâlem(s) qualifié(s) dans le rayon de 8 km`);

    let sentCount = 0;

    // 3. Envoi direct WhatsApp à chaque Maâlem qualifié via Evolution API
    for (const maalem of qualifiedMaalems) {
      try {
        const messageText = `🚨 *URGENCE SOS DISPONIBLE (${maalem.distanceKm} km de vous)* 🚨\n\nBonjour *${maalem.name || "Maâlem"}*,\nUne mission urgente correspond à votre métier :\n\n🔧 *Métier* : ${targetCategory}\n📍 *Secteur* : ${district}, ${city}\n📏 *Distance* : *${maalem.distanceKm} km*\n💰 *Budget proposé* : *${budget} DH*\n📝 *Détails* : ${description}\n👤 *Client* : ${clientName}\n\n⚡ *Accepter la mission :*\n👉 https://bricolemoi.vercel.app`;

        const evoRes = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": EVOLUTION_API_KEY
          },
          body: JSON.stringify({
            number: maalem.cleanPhone,
            text: messageText
          })
        });

        if (evoRes.ok) sentCount++;
      } catch (err) {
        console.error(`[Evolution API Error for ${maalem.cleanPhone}]:`, err);
      }
    }

    // 4. Envoi de la confirmation WhatsApp au client
    if (cleanClientPhone && cleanClientPhone.startsWith("212")) {
      try {
        await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": EVOLUTION_API_KEY
          },
          body: JSON.stringify({
            number: cleanClientPhone,
            text: `✅ *BricoleMoi - Demande SOS Transmise !*\n\nBonjour *${clientName}*,\nVotre demande de *${targetCategory}* à *${city}* a bien été transmise aux artisans qualifiés dans un rayon de 8 km.\n\nVous recevrez un contact immédiat dès qu'un Maâlem valide son intervention. 🇲🇦🛠️`
          })
        });
      } catch (clientErr) {
        console.warn("[Evolution API Client confirmation notice]:", clientErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Alerte SOS diffusée avec succès.",
      maalemsNotified: sentCount,
      totalQualified: qualifiedMaalems.length
    });
  } catch (error) {
    console.error("[Dispatch SOS Fatal Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
