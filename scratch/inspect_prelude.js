// Inspection des endpoints API Prelude pour récupérer les logs
const PRELUDE_API_KEY = "sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ";
const PRELUDE_BASE_URL = "https://api.prelude.dev/v2";

const endpoints = [
  "/verification",
  "/verifications",
  "/events",
  "/watch/events",
  "/routes",
  "/templates"
];

async function inspectEndpoints() {
  console.log("🔍 Exploration des endpoints de logs Prelude.so...\n");

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${PRELUDE_BASE_URL}${ep}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${PRELUDE_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json().catch(() => ({}));
      console.log(`Endpoint: ${ep} -> Status HTTP: ${res.status}`);
      if (res.ok) {
        console.log("Données:", JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.error(`Exception pour ${ep}:`, e.message);
    }
  }
}

inspectEndpoints();
