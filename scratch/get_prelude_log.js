// Script pour interroger l'état précis des logs chez Prelude.so
const PRELUDE_API_KEY = "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const PRELUDE_BASE_URL = "https://api.prelude.dev/v2";

async function checkVerificationLog() {
  const verificationIds = [
    "vrf_01m0gbamwpffm9f2t1kv69xrbz", // France (+33771937768)
    "vrf_01m0gbakxneherpvbkfbcn7vfj"  // Maroc (+212619184098)
  ];

  console.log("🔍 Récupération des détails de logs chez Prelude.so...\n");

  for (const id of verificationIds) {
    try {
      const res = await fetch(`${PRELUDE_BASE_URL}/verification/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${PRELUDE_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json().catch(() => ({}));
      console.log(`================ ID: ${id} ================`);
      console.log(`Status HTTP: ${res.status}`);
      console.log(JSON.stringify(data, null, 2));
      console.log("\n");
    } catch (e) {
      console.error(`Erreur pour ${id}:`, e.message);
    }
  }
}

checkVerificationLog();
