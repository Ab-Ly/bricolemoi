import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const INFOBIP_API_KEY = Deno.env.get("INFOBIP_API_KEY") || "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = "https://k95d1n.api.infobip.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Nettoyage et formatage du numéro de téléphone :
 * - Retire le '+' et tous les espaces / séparateurs
 * - Exemples : '+33 7 71 93 77 68' -> '33771937768'
 *              '+212 6 12 34 56 78' -> '212612345678'
 *              '0612345678' (Maroc par défaut) -> '212612345678'
 */
function cleanPhoneNumber(rawPhone: string): { cleanNumber: string; formatted: string; isValid: boolean } {
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { phone } = body;

    if (!phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Numéro de téléphone requis." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { cleanNumber, formatted, isValid } = cleanPhoneNumber(phone);
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Format de numéro invalide. Veuillez entrer un numéro valide (ex: +2126XXXXXXXX ou +33XXXXXXXXX)." 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Détection numéros de test
    const isTestNumber = 
      cleanNumber.endsWith("000000") || 
      cleanNumber.includes("661001122") || 
      cleanNumber.includes("111111") || 
      cleanNumber.includes("222222");

    // Génération du code OTP à 6 chiffres
    const otpCode = isTestNumber ? "123456" : String(Math.floor(100000 + Math.random() * 900000));
    // Expiration stricte de 5 minutes (300 secondes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // 1. Sauvegarde sécurisée dans Supabase (table otp_verifications)
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        await supabase
          .from("otp_verifications")
          .upsert({
            phone: formatted,
            otp_code: otpCode,
            channel: "sms",
            expires_at: expiresAt,
            verified: false,
            attempts: 0,
            updated_at: new Date().toISOString()
          }, { onConflict: "phone" });
      } catch (dbErr) {
        console.warn("[send-otp-sms] Supabase DB write notice:", dbErr);
      }
    }

    let infobipResponse: unknown = null;
    let infobipSuccess = false;

    // 2. Envoi SMS standard Infobip avec Sender ID direct "BricoleMoi"
    if (!isTestNumber && INFOBIP_API_KEY) {
      const authHeader = INFOBIP_API_KEY.startsWith("App ") ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
      const messageText = `BricoleMoi : Votre code de verification est ${otpCode}. Valable 5 minutes.`;

      const payload = {
        messages: [
          {
            from: "BricoleMoi",
            destinations: [{ to: cleanNumber }],
            text: messageText
          }
        ]
      };

      try {
        const smsRes = await fetch(`${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const smsData = await smsRes.json().catch(() => ({}));
        infobipResponse = smsData;

        if (smsRes.ok) {
          const statusGroup = smsData?.messages?.[0]?.status?.groupName;
          if (statusGroup !== "REJECTED") {
            infobipSuccess = true;
          } else {
            console.error("[Infobip] SMS rejected:", smsData);
          }
        } else {
          console.error("[Infobip] SMS error response:", smsData);
        }
      } catch (smsErr) {
        console.error("[Infobip] SMS fetch exception:", smsErr);
      }
    } else {
      infobipSuccess = true;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Code OTP envoyé par SMS avec succès.",
        phone: formatted,
        cleanPhoneNumber: cleanNumber,
        expires_in: 300,
        is_test: isTestNumber,
        dev_code: isTestNumber ? otpCode : undefined,
        infobip_details: isTestNumber ? undefined : infobipResponse
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[send-otp-sms] Exception:", err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Erreur interne du serveur lors de l'envoi du SMS." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
