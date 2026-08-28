/**
 * Service de calcul d'itinéraire routier (OSRM + GeoJSON)
 * Fournit les tracés réels des rues et routes marocaines, distances et durées estimées (ETA).
 */

const routeCache = new Map();

/**
 * Calcule l'itinéraire routier précis entre deux points GPS.
 * @param {Array<number>} origin [lat, lng]
 * @param {Array<number>} destination [lat, lng]
 * @returns {Promise<{coordinates: Array<[number, number]>, distanceKm: number, durationMin: number, summary: string}>}
 */
export async function fetchRoadRoute(origin, destination) {
  if (!origin || !destination || origin.length < 2 || destination.length < 2) {
    return null;
  }

  const [startLat, startLng] = origin;
  const [endLat, endLng] = destination;

  // Validation des coordonnées
  if (isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng)) {
    return null;
  }

  const cacheKey = `${startLat.toFixed(4)},${startLng.toFixed(4)}_${endLat.toFixed(4)},${endLng.toFixed(4)}`;
  const now = Date.now();

  if (routeCache.has(cacheKey)) {
    const cached = routeCache.get(cacheKey);
    if (now - cached.timestamp < 30000) {
      return cached.data;
    }
  }

  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(osrmUrl, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (json.code === 'Ok' && json.routes && json.routes.length > 0) {
        const primaryRoute = json.routes[0];
        const distanceKm = Number((primaryRoute.distance / 1000).toFixed(1));
        const durationMin = Math.max(1, Math.round(primaryRoute.duration / 60));
        const coordinates = primaryRoute.geometry?.coordinates || [];

        const result = {
          coordinates, // Format MapLibre: [lng, lat]
          distanceKm,
          durationMin,
          summary: `Trajet estimé : ${distanceKm} km • ~${durationMin} min`
        };

        routeCache.set(cacheKey, { timestamp: now, data: result });
        return result;
      }
    }
  } catch (err) {
    // Fallback silencieux en cas de coupure réseau
    console.warn('[RoutingService] OSRM network fallback:', err.message);
  }

  // Fallback Géodésique (Ligne droite interpolée)
  const dLat = endLat - startLat;
  const dLng = endLng - startLng;
  const straightDistanceKm = Number((Math.sqrt(dLat * dLat + dLng * dLng) * 111).toFixed(1));
  const straightDurationMin = Math.max(2, Math.round(straightDistanceKm * 2.5)); // ~25 km/h en ville

  const interpolatedCoords = [
    [startLng, startLat],
    [startLng + dLng * 0.33, startLat + dLat * 0.33],
    [startLng + dLng * 0.66, startLat + dLat * 0.66],
    [endLng, endLat]
  ];

  const fallbackResult = {
    coordinates: interpolatedCoords,
    distanceKm: straightDistanceKm,
    durationMin: straightDurationMin,
    summary: `Distance directe : ${straightDistanceKm} km • ~${straightDurationMin} min`
  };

  return fallbackResult;
}

/**
 * Génère le lien direct pour le guidage GPS externe 1-Clic
 */
export function getExternalNavigationLinks(lat, lng, label = 'Client') {
  if (!lat || !lng) return {};

  return {
    googleMaps: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
    waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    appleMaps: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
  };
}
