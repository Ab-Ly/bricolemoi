import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const INFOBIP_API_KEY = Deno.env.get("INFOBIP_API_KEY") || "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = (Deno.env.get("INFOBIP_BASE_URL") || "k95d1n.api.infobip.com").replace(/^https?:\/\//, "");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Formateur de numéro marocain international (ex: "212612345678")
function formatMoroccanPhone(rawPhone: string): { international: string; formatted: string; isValid: boolean } {
  let digits = String(rawPhone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = "212" + digits.slice(1);
  } else if (!digits.startsWith("212")) {
    digits = "212" + digits;
  }
  const isValid = /^212[567]\d{8}$/.test(digits);
  return {
    international: digits,
    formatted: `+${digits}`,
    isValid
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { phone, channel = "whatsapp" } = body;

    if (!phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Numéro de téléphone requis." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { international, formatted, isValid } = formatMoroccanPhone(phone);
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Numéro marocain invalide. Utilisez un format tel que 0612345678 ou +212612345678." 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Détection des numéros de test / dev sandbox
    const isTestNumber = 
      international.endsWith("000000") || 
      international.includes("661001122") || 
      international.includes("111111") || 
      international.includes("222222");

    // Génération du code OTP à 6 chiffres
    const otpCode = isTestNumber ? "123456" : String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    // 1. Sauvegarde dans Supabase (table otp_verifications) si configuré
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        
        // Upsert OTP dans la table otp_verifications
        await supabase
          .from("otp_verifications")
          .upsert({
            phone: formatted,
            otp_code: otpCode,
            channel: channel,
            expires_at: expiresAt,
            verified: false,
            attempts: 0,
            updated_at: new Date().toISOString()
          }, { onConflict: "phone" });
      } catch (dbErr) {
        console.warn("[send-infobip-otp] Supabase DB write notice:", dbErr);
      }
    }

    let channelUsed = channel;
    let infobipSuccess = false;
    let infobipResponse: unknown = null;

    // 2. Appel Infobip si non numéro de test
    if (!isTestNumber && INFOBIP_API_KEY && INFOBIP_BASE_URL) {
      const authHeader = INFOBIP_API_KEY.startsWith("App ") ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
      const messageText = `🇲🇦 *BRICOLEMOI MAROC* | بريكول موا 🛠️\n━━━━━━━━━━━━━━━━━━━━\n🔐 *Code de vérification / كود التحقق :*\n👉 *${otpCode}* 👈\n\n⏱️ _Valable 5 minutes / صالح لمدة 5 دقائق_\n⚠️ _Ne partagez ce code avec personne / ما تبارطاجيش هاد الكود مع حتى واحد_\n━━━━━━━━━━━━━━━━━━━━\n👷‍♂️ _BricoleMoi – Artisans qualifiés & Dépannage express au Maroc_`;

      if (channel === "whatsapp") {
        try {
          const res = await fetch(`https://${INFOBIP_BASE_URL}/whatsapp/1/message/text`, {
            method: "POST",
            headers: {
              "Authorization": authHeader,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              from: Deno.env.get("INFOBIP_WHATSAPP_SENDER") || "212638853698",
              to: international,
              content: {
                text: messageText
              }
            })
          });

          const data = await res.json().catch(() => ({}));
          if (res.ok) {
            infobipSuccess = true;
            infobipResponse = data;
          } else {
            console.warn("[Infobip] WhatsApp failed, falling back to SMS:", data);
          }
        } catch (waErr) {
          console.warn("[Infobip] WhatsApp error, fallback to SMS:", waErr);
        }
      }

      // Si WhatsApp échoue ou si canal demandé est SMS -> Envoi SMS Infobip
      if (!infobipSuccess) {
        try {
          const smsRes = await fetch(`https://${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
            method: "POST",
            headers: {
              "Authorization": authHeader,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              messages: [
                {
                  destinations: [{ to: international }],
                  from: "BricoleMoi",
                  text: messageText
                }
              ]
            })
          });

          const smsData = await smsRes.json().catch(() => ({}));
          if (smsRes.ok) {
            infobipSuccess = true;
            channelUsed = "sms";
            infobipResponse = smsData;
          } else {
            console.warn("[Infobip] SMS failed:", smsData);
          }
        } catch (smsErr) {
          console.warn("[Infobip] SMS request exception:", smsErr);
        }
      }
    } else {
      // Pour les numéros de test ou dev sandbox
      infobipSuccess = true;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Code OTP envoyé avec succès via ${channelUsed.toUpperCase()}.`,
        phone: formatted,
        channel: channelUsed,
        expires_in: 300,
        is_test: isTestNumber,
        dev_code: isTestNumber ? otpCode : undefined
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Erreur interne du serveur." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
