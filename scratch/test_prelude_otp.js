// Test direct de l'API Prelude.so pour Maroc et France
const PRELUDE_API_KEY = "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const PRELUDE_BASE_URL = "https://api.prelude.dev/v2";

const testNumbers = [
  { country: "Maroc 🇲🇦", phone: "+212619184098" },
  { country: "France 🇫🇷", phone: "+33771937768" }
];

async function testPreludeOtp() {
  console.log("==================================================");
  console.log("🚀 TEST D'ENVOI OTP VIA PRELUDE.SO (SMS & WhatsApp)");
  console.log("==================================================\n");

  for (const item of testNumbers) {
    console.log(`📡 [1/2] Envoi OTP vers ${item.country} (${item.phone})...`);
    try {
      const response = await fetch(`${PRELUDE_BASE_URL}/verification`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${PRELUDE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          target: {
            type: "phone_number",
            value: item.phone
          }
        })
      });

      const data = await response.json().catch(() => ({}));
      console.log(`Status HTTP: ${response.status}`);
      console.log("Réponse Prelude:", JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log(`✅ SUCCÈS : Code OTP déclenché pour ${item.phone} ! (ID: ${data.id || data.status})\n`);
      } else {
        console.log(`⚠️ ERREUR / AVERTISSEMENT pour ${item.phone}:`, data, "\n");
      }
    } catch (err) {
      console.error(`❌ Exception pour ${item.phone}:`, err.message, "\n");
    }
  }
}

testPreludeOtp();
