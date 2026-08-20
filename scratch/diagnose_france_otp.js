// Diagnostic complet pour l'envoi OTP vers la France (+33771937768)
const PRELUDE_API_KEY = "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const INFOBIP_API_KEY = "6609e87c2786b4aa487b954b47f223ee-25c768b1-ab2b-4ca1-a75b-7fe84af955d8";
const INFOBIP_BASE_URL = "https://k95d1n.api.infobip.com";

const targetPhone = "+33771937768";
const cleanPhone = "33771937768";

async function runDiagnosis() {
  console.log("==================================================");
  console.log(`🔍 DIAGNOSTIC ENVOI FRANCE VERS : ${targetPhone}`);
  console.log("==================================================\n");

  // 1. TEST PRELUDE.SO
  console.log("📡 [1] Test via Prelude.so...");
  try {
    const resPrelude = await fetch("https://api.prelude.dev/v2/verification", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PRELUDE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: {
          type: "phone_number",
          value: targetPhone
        }
      })
    });
    const dataPrelude = await resPrelude.json().catch(() => ({}));
    console.log("Réponse Prelude:", JSON.stringify(dataPrelude, null, 2));
  } catch (err) {
    console.error("Erreur Prelude:", err.message);
  }

  console.log("\n--------------------------------------------------\n");

  // 2. TEST INFOBIP SMS (Route directe)
  console.log("📡 [2] Test via Infobip SMS (Sender ID BricoleMoi)...");
  try {
    const resInfobip = await fetch(`${INFOBIP_BASE_URL}/sms/2/text/advanced`, {
      method: "POST",
      headers: {
        "Authorization": `App ${INFOBIP_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        messages: [{
          from: "BricoleMoi",
          destinations: [{ to: cleanPhone }],
          text: "BricoleMoi : Votre code de test France est 852963. Valable 5 minutes."
        }]
      })
    });
    const dataInfobip = await resInfobip.json().catch(() => ({}));
    console.log("Réponse Infobip:", JSON.stringify(dataInfobip, null, 2));
  } catch (err) {
    console.error("Erreur Infobip:", err.message);
  }
}

runDiagnosis();
