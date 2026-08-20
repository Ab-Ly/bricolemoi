import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Fournisseur 1 (Primaire) : Prelude.so Smart Verification (SMS + WhatsApp)
const PRELUDE_API_KEY = Deno.env.get("PRELUDE_API_KEY") || "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const PRELUDE_BASE_URL = "https://api.prelude.dev/v2";

// Fournisseur 2 (Secours / Fallback) : Infobip SMS
const INFOBIP_API_KEY = Deno.env.get("INFOBIP_API_KEY") || "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = "https://k95d1n.api.infobip.com";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Nettoyage et formatage du numéro de téléphone international
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

    // Détection des numéros de test
    const isTestNumber = 
      cleanNumber.endsWith("000000") || 
      cleanNumber.includes("661001122") || 
      cleanNumber.includes("111111") || 
      cleanNumber.includes("222222");

    let providerUsed = "prelude";
    let verificationId: string | null = null;
    let fallbackOtpCode: string | null = null;
    let providerResponse: any = null;

    // === TENTATIVE 1 : PRELUDE.SO (PRIMAIRE) ===
    if (!isTestNumber && PRELUDE_API_KEY) {
      try {
        console.log(`[send-otp-sms] Envoi Prelude.so vers ${formatted}...`);
        const preludeRes = await fetch(`${PRELUDE_BASE_URL}/verification`, {
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

        const preludeData = await preludeRes.json().catch(() => ({}));
        providerResponse = preludeData;

        if (preludeRes.ok && (preludeData.id || preludeData.status === "pending" || preludeData.status === "success")) {
          verificationId = preludeData.id || `veri_${Date.now()}`;
          providerUsed = "prelude";
          console.log(`[Prelude.so] Succès envoi OTP (ID: ${verificationId}) pour ${formatted}`);
        } else {
          console.warn("[Prelude.so] Échec, basculement sur Infobip...", preludeData);
          providerUsed = "infobip_fallback";
        }
      } catch (preludeErr) {
        console.warn("[Prelude.so] Exception réseau, basculement sur Infobip:", preludeErr);
        providerUsed = "infobip_fallback";
      }
    } else {
      providerUsed = isTestNumber ? "test_mode" : "infobip";
    }

    // === TENTATIVE 2 : INFOBIP (SECOURS / FALLBACK OU TEST) ===
    if (providerUsed === "infobip_fallback" || providerUsed === "infobip" || isTestNumber) {
      fallbackOtpCode = isTestNumber ? "123456" : String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

      // Sauvegarde du code de secours dans Supabase
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
          await supabase
            .from("otp_verifications")
            .upsert({
              phone: formatted,
              otp_code: fallbackOtpCode,
              channel: "sms",
              expires_at: expiresAt,
              verified: false,
              attempts: 0,
              updated_at: new Date().toISOString()
            }, { onConflict: "phone" });
        } catch (dbErr) {
          console.warn("[send-otp-sms] Supabase DB fallback write notice:", dbErr);
        }
      }

      if (!isTestNumber && INFOBIP_API_KEY) {
        const authHeader = INFOBIP_API_KEY.startsWith("App ") ? INFOBIP_API_KEY : `App ${INFOBIP_API_KEY}`;
        const messageText = `BricoleMoi : Votre code de verification est ${fallbackOtpCode}. Valable 5 minutes.`;

        try {
          const smsRes = await fetch(`${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
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
          providerResponse = await smsRes.json().catch(() => ({}));
          console.log(`[Infobip] SMS envoyé avec succès vers ${cleanNumber}`);
        } catch (smsErr) {
          console.error("[Infobip] Erreur fallback:", smsErr);
        }
      }
    }

    // Sauvegarde de l'état Prelude si utilisé
    if (providerUsed === "prelude" && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        await supabase
          .from("otp_verifications")
          .upsert({
            phone: formatted,
            otp_code: "PRELUDE_MANAGED",
            channel: "prelude_sms",
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            verified: false,
            attempts: 0,
            updated_at: new Date().toISOString()
          }, { onConflict: "phone" });
      } catch (e) {}
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Code de vérification envoyé avec succès.",
        provider: providerUsed,
        phone: formatted,
        cleanPhoneNumber: cleanNumber,
        expires_in: 300,
        is_test: isTestNumber,
        dev_code: isTestNumber ? "123456" : undefined,
        verification_id: verificationId,
        details: isTestNumber ? undefined : providerResponse
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[send-otp-sms] Exception:", err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Erreur interne lors de l'envoi du code OTP." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
