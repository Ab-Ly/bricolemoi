// Vercel Serverless Function: Dispatching d'Urgence SOS (WhatsApp Evolution API + Supabase + n8n)
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || process.env.VITE_EVOLUTION_API_URL || "http://51.255.46.206:8085";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || process.env.VITE_EVOLUTION_API_KEY || "bricolemoi_secret_token_2026";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || process.env.VITE_EVOLUTION_INSTANCE || "bricolemoi-otp";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.VITE_N8N_WEBHOOK_URL || "http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io/webhook/bricolemoi-booking-radar";
const POCKETBASE_URL = (process.env.POCKETBASE_URL || process.env.VITE_POCKETBASE_URL || "https://pocketbase.51.255.46.206.sslip.io").replace(/\/$/, "");

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

// Normalisation des numéros vers le format international pur (chiffres uniquement)
function formatEvolutionNumber(rawPhone) {
  let digits = String(rawPhone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) {
    digits = "212" + digits.slice(1);
  } else if (!digits.startsWith("212") && digits.length === 9) {
    digits = "212" + digits;
  }
  return digits;
}

// Cache anti-doublon en mémoire (15 secondes)
const recentDispatches = new Map();

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
      clientName = "Client BricoleMoi",
      clientPhone = "",
      category = "Dépannage",
      district = "",
      city = "",
      description = "Intervention d'urgence SOS",
      clientLat = 33.5883,
      clientLng = -7.6328,
      candidateMaalems = []
    } = req.body || {};

    // Déterminer la ville et le quartier de manière propre sans forcer ni dupliquer Casablanca
    let cleanDistrict = String(district || "").trim();
    let cleanCity = String(city || "").trim();

    if (cleanDistrict.includes(" - ")) {
      const parts = cleanDistrict.split(" - ").map((s) => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        if (!cleanCity || cleanCity.toLowerCase() === "casablanca") {
          cleanCity = parts[0];
        }
        cleanDistrict = parts.slice(1).join(" - ");
      }
    }

    let locationLabel = "";
    if (cleanDistrict && cleanCity) {
      if (cleanDistrict.toLowerCase().includes(cleanCity.toLowerCase())) {
        locationLabel = cleanDistrict;
      } else {
        locationLabel = `${cleanDistrict}, ${cleanCity}`;
      }
    } else {
      locationLabel = cleanDistrict || cleanCity || "Localisation transmise par GPS";
    }

    const formattedClientPhone = formatEvolutionNumber(clientPhone);
    console.log(`🚨 [SOS Dispatch API] Nouvelle urgence de ${clientName} (${formattedClientPhone || 'Sans tél'}) à ${locationLabel}`);

    // Anti-doublon : Éviter d'envoyer 2 alertes WhatsApp en rafale pour la même demande (< 15 secondes)
    const dedupKey = `${formattedClientPhone || clientName}_${category}_${cleanDistrict}_${cleanCity}`;
    const now = Date.now();
    if (recentDispatches.has(dedupKey) && now - recentDispatches.get(dedupKey) < 15000) {
      console.log(`⏱️ [SOS Dispatch API] Requête en doublon ignorée (< 15s) pour ${dedupKey}`);
      return res.status(200).json({
        success: true,
        message: "Alerte déjà transmise récemment (anti-doublon actif).",
        deduplicated: true
      });
    }
    recentDispatches.set(dedupKey, now);

    // Nettoyage périodique du cache anti-doublon
    if (recentDispatches.size > 200) {
      for (const [k, ts] of recentDispatches.entries()) {
        if (now - ts > 60000) recentDispatches.delete(k);
      }
    }

    // 2. Résolution des Maâlems candidats : utiliser la liste reçue OU interroger PocketBase VPS directement
    let rawMaalems = candidateMaalems;

    if (!rawMaalems || rawMaalems.length === 0) {
      try {
        console.log("🔍 [SOS Dispatch] Recherche directe des Maâlems dans PocketBase VPS...");
        const [profilesRes, detailsRes] = await Promise.all([
          fetch(`${POCKETBASE_URL}/api/collections/profiles/records?filter=(role='MAALEM')&fields=id,full_name,phone&perPage=50`),
          fetch(`${POCKETBASE_URL}/api/collections/maalem_details/records?fields=id,specialty,lat,lng,is_available,is_online&perPage=50`)
        ]);

        const profilesData = await profilesRes.json().catch(() => ({ items: [] }));
        const detailsData = await detailsRes.json().catch(() => ({ items: [] }));

        const profiles = Array.isArray(profilesData?.items) ? profilesData.items : [];
        const details = Array.isArray(detailsData?.items) ? detailsData.items : [];

        if (profiles.length > 0) {
          const detailsMap = new Map(details.map((d) => [String(d.id).trim(), d]));
          rawMaalems = profiles.map((p) => {
            const pId = String(p.id).trim();
            const d = detailsMap.get(pId) || {};
            return {
              name: p.full_name || "Artisan Maâlem",
              phone: p.phone || "",
              specialty: d.specialty || "PLUMBING",
              lat: Number(d.lat || 33.5883),
              lng: Number(d.lng || -7.6328),
              isAvailable: d.is_available !== false
            };
          }).filter((m) => Boolean(m.phone));
        }
      } catch (pbErr) {
        console.warn("[SOS Dispatch] Erreur fetch PocketBase maalems:", pbErr.message);
      }
    }

    // Si toujours aucun maâlem trouvé, intégrer par défaut l'artisan référent de la plateforme
    if (!rawMaalems || rawMaalems.length === 0) {
      rawMaalems = [
        {
          name: "Ali Maâlem Référent",
          phone: "0619184098",
          specialty: "PLUMBING",
          lat: 33.5883,
          lng: -7.6328,
          isAvailable: true
        }
      ];
    }

    const targetCategory = String(category).toUpperCase();

    // 3. Calcul de distance et filtrage
    let qualifiedMaalems = rawMaalems
      .map((m) => {
        const evoPhone = formatEvolutionNumber(m.phone);
        const dist = getDistanceKm(clientLat, clientLng, Number(m.lat || 33.5883), Number(m.lng || -7.6328));
        return {
          ...m,
          cleanPhone: evoPhone,
          distanceKm: dist
        };
      })
      .filter((m) => Boolean(m.cleanPhone));

    // Filtrer par distance <= 15 km si des artisans sont dans ce rayon, sinon garder les artisans disponibles les plus proches
    const closeMaalems = qualifiedMaalems.filter((m) => m.distanceKm <= 15.0);
    const finalMaalemsToAlert = closeMaalems.length > 0
      ? closeMaalems.sort((a, b) => a.distanceKm - b.distanceKm)
      : qualifiedMaalems.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

    console.log(`📍 [SOS Dispatch] ${finalMaalemsToAlert.length} Maâlem(s) retenu(s) pour notification WhatsApp`);

    let sentCount = 0;

    // 4. Envoi direct WhatsApp à chaque Maâlem qualifié via Evolution API
    for (const maalem of finalMaalemsToAlert) {
      try {
        const distanceText = maalem.distanceKm > 50
          ? `${locationLabel}`
          : `${maalem.distanceKm} km de votre position`;

        const messageText = `🚨 *URGENCE SOS DISPONIBLE (${distanceText})* 🚨\n\nBonjour *${maalem.name || "Maâlem"}*,\nUne mission urgente correspond à votre métier :\n\n🔧 *Métier* : ${targetCategory}\n📍 *Secteur* : ${locationLabel}\n🤝 *Tarification* : *Accord Direct* (Négociation libre sans intermédiaire)\n📝 *Détails Panne* : ${description}\n👤 *Client* : ${clientName} ${formattedClientPhone ? `(${formattedClientPhone})` : ""}\n\n⚡ *Ouvrir le Radar & Débloquer la mission (15 DH) :*\n👉 https://bricolemoi.vercel.app?app=maalem`;

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

        if (evoRes.ok) {
          sentCount++;
          console.log(`✓ [Evolution API] WhatsApp envoyé avec succès au Maâlem ${maalem.cleanPhone}`);
        } else {
          const errBody = await evoRes.text();
          console.warn(`⚠ [Evolution API] Réponse non-OK pour ${maalem.cleanPhone}:`, errBody);
        }
      } catch (err) {
        console.error(`[Evolution API Error for ${maalem.cleanPhone}]:`, err);
      }
    }

    // 5. Envoi de la confirmation WhatsApp au client (sans restriction de pays)
    let clientNotified = false;
    if (formattedClientPhone && formattedClientPhone.length >= 8) {
      try {
        console.log(`[SOS Dispatch] Envoi confirmation WhatsApp au client ${formattedClientPhone}...`);
        const clientMsg = `✅ *BricoleMoi - Demande SOS Transmise !*\n\nBonjour *${clientName}*,\nVotre demande urgente de *${targetCategory}* à *${locationLabel}* a bien été diffusée en direct aux artisans Maâlems disponibles.\n\n📝 *Votre problème* : ${description}\n💰 *Déplacement & Diagnostic* : 40 - 50 DH (Accord Direct)\n\nVous recevrez un contact immédiat dès qu'un artisan valide la mission. 🇲🇦🛠️`;

        const clientRes = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": EVOLUTION_API_KEY
          },
          body: JSON.stringify({
            number: formattedClientPhone,
            text: clientMsg
          })
        });

        if (clientRes.ok) {
          clientNotified = true;
          console.log(`✓ [Evolution API] Confirmation client envoyée à ${formattedClientPhone}`);
        }
      } catch (clientErr) {
        console.warn("[Evolution API Client confirmation notice]:", clientErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Alerte SOS diffusée avec succès.",
      maalemsNotified: sentCount,
      totalQualified: finalMaalemsToAlert.length,
      clientNotified
    });
  } catch (error) {
    console.error("[Dispatch SOS Fatal Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
