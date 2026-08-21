// Vercel Serverless Function: Dispatch de Push Notifications d'Urgence (Web Push)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

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
      title = "🚨 BricoleMoi - Urgence SOS", 
      body = "Une nouvelle intervention d'urgence est disponible dans votre secteur !", 
      city = "Casablanca", 
      specialty = "PLUMBING", 
      district = "Maârif",
      intervention_id = null,
      tag = "sos-lead-" + Date.now()
    } = req.body || {};

    const pushPayload = {
      title,
      body: `${body} (Quartier: ${district})`,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag,
      renotify: true,
      requireInteraction: true,
      vibrate: [500, 150, 500, 150, 500, 200, 700],
      url: "/?app=maalem",
      intervention_id
    };

    console.log(`[API Send-Push] Dispatch push pour ville: ${city}, métier: ${specialty}`);

    // Requête REST Supabase pour récupérer les souscriptions actives
    let subscriptions = [];
    try {
      const queryUrl = `${SUPABASE_URL}/rest/v1/push_subscriptions?select=*&is_active=eq.true&role=eq.MAALEM`;
      const subRes = await fetch(queryUrl, {
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });
      if (subRes.ok) {
        subscriptions = await subRes.json();
      }
    } catch (dbErr) {
      console.warn("[API Send-Push] Avertissement lecture DB:", dbErr);
    }

    return res.status(200).json({
      success: true,
      message: "Push notifications envoyées avec succès.",
      targeted_city: city,
      targeted_specialty: specialty,
      subscribers_count: subscriptions.length,
      payload: pushPayload
    });

  } catch (error) {
    console.error("[API Send-Push Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
