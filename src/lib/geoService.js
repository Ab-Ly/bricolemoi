import { MOROCCAN_CITIES } from '../constants/geo';

// Cache mémoire local pour éviter les requêtes réseau redondantes (< 1ms)
const geocodeMemoryCache = new Map();

/**
 * Calcul mathématique instantané de la ville/quartier catalogue la plus proche (Haversine 0ms)
 * Utilisé en fallback immédiat ou lorsque l'appareil est hors-ligne.
 */
export const findNearestCatalogCity = (lat, lng) => {
  const numLat = parseFloat(lat);
  const numLng = parseFloat(lng);

  if (isNaN(numLat) || isNaN(numLng)) {
    return {
      city: MOROCCAN_CITIES[0].name,
      district: MOROCCAN_CITIES[0].districts[0].name,
      lat: MOROCCAN_CITIES[0].lat,
      lng: MOROCCAN_CITIES[0].lng,
      fullLabel: `${MOROCCAN_CITIES[0].name} - ${MOROCCAN_CITIES[0].districts[0].name}`
    };
  }

  let closestCity = MOROCCAN_CITIES[0];
  let minCityDist = Infinity;

  MOROCCAN_CITIES.forEach((city) => {
    const dLat = (city.lat - numLat) * 111;
    const dLng = (city.lng - numLng) * 111 * Math.cos(numLat * (Math.PI / 180));
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist < minCityDist) {
      minCityDist = dist;
      closestCity = city;
    }
  });

  let closestDistrict = closestCity.districts[0];
  let minDistDist = Infinity;
  (closestCity.districts || []).forEach((d) => {
    const dLat = (d.lat - numLat) * 111;
    const dLng = (d.lng - numLng) * 111 * Math.cos(numLat * (Math.PI / 180));
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist < minDistDist) {
      minDistDist = dist;
      closestDistrict = d;
    }
  });

  return {
    city: closestCity.name,
    district: closestDistrict.name,
    lat: closestDistrict.lat || closestCity.lat,
    lng: closestDistrict.lng || closestCity.lng,
    region: closestCity.region || 'Maroc',
    fullLabel: `${closestCity.name} - ${closestDistrict.name}`
  };
};

/**
 * Service de Reverse Geocoding intelligent pour le Maroc (OpenStreetMap / BigDataCloud + Fallback)
 * Résout le nom exact de la commune/quartier en temps réel (ex: "El Hajeb", "Bouskoura", "Harhoura")
 */
export const reverseGeocodeMorocco = async (lat, lng) => {
  const numLat = parseFloat(lat);
  const numLng = parseFloat(lng);

  if (isNaN(numLat) || isNaN(numLng)) {
    return findNearestCatalogCity(lat, lng);
  }

  // Clé de cache arrondie à 3 décimales (~100m de précision)
  const cacheKey = `${numLat.toFixed(3)},${numLng.toFixed(3)}`;

  // 1. Vérifier le cache mémoire
  if (geocodeMemoryCache.has(cacheKey)) {
    return geocodeMemoryCache.get(cacheKey);
  }

  // 2. Vérifier le cache localStorage
  try {
    const localCached = localStorage.getItem(`bricolemoi_geo_${cacheKey}`);
    if (localCached) {
      const parsed = JSON.parse(localCached);
      if (parsed && parsed.city && Date.now() - (parsed.cached_at || 0) < 86400000) {
        geocodeMemoryCache.set(cacheKey, parsed);
        return parsed;
      }
    }
  } catch (e) {}

  // 3. Fallback immédiat par défaut
  const catalogFallback = findNearestCatalogCity(numLat, numLng);

  // 4. Interroger l'API OpenStreetMap Nominatim avec un timeout strict de 1.8s
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${numLat}&lon=${numLng}&zoom=16&addressdetails=1&accept-language=fr,ar`;
    const response = await fetch(nominatimUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'BricoleMoi-Morocco/1.0'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const addr = data.address || {};

      // Détecter la ville / commune principale
      const rawCity = addr.city || addr.town || addr.municipality || addr.village || addr.hamlet || addr.county || catalogFallback.city;
      
      // Détecter le quartier / district
      const rawDistrict = addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || addr.road || catalogFallback.district;

      // Nettoyer et standardiser
      const cleanCity = String(rawCity || catalogFallback.city)
        .replace(/Province de /gi, '')
        .replace(/Préfecture de /gi, '')
        .replace(/Cercle de /gi, '')
        .replace(/Pachalik de /gi, '')
        .trim();

      const cleanDistrict = String(rawDistrict || catalogFallback.district)
        .replace(/Rue /gi, '')
        .replace(/Avenue /gi, '')
        .replace(/Boulevard /gi, '')
        .trim();

      // Normalisation sans accent pour matcher le catalogue officiel (ex: Fes -> Fès, Meknes -> Meknès)
      const norm = (s) => String(s || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
      
      const matchedCityObj = MOROCCAN_CITIES.find(c => 
        norm(c.name) === norm(cleanCity) || 
        norm(cleanCity).includes(norm(c.name)) || 
        norm(c.name).includes(norm(cleanCity))
      ) || catalogFallback;

      const matchedDistrictObj = (matchedCityObj.districts || []).find(d => 
        norm(d.name) === norm(cleanDistrict) || 
        norm(cleanDistrict).includes(norm(d.name)) || 
        norm(d.name).includes(norm(cleanDistrict))
      );

      const resolvedCityName = matchedCityObj.name || catalogFallback.city;
      const resolvedDistrictName = matchedDistrictObj?.name || cleanDistrict || catalogFallback.district;

      const result = {
        city: resolvedCityName,
        district: resolvedDistrictName,
        fullLabel: resolvedDistrictName && resolvedDistrictName !== resolvedCityName 
          ? `${resolvedCityName} - ${resolvedDistrictName}`
          : resolvedCityName,
        lat: numLat,
        lng: numLng,
        region: matchedCityObj.region || addr.state || catalogFallback.region || 'Maroc',
        cached_at: Date.now()
      };

      // Sauvegarder dans les caches
      geocodeMemoryCache.set(cacheKey, result);
      try {
        localStorage.setItem(`bricolemoi_geo_${cacheKey}`, JSON.stringify(result));
      } catch (e) {}

      return result;
    }
  } catch (err) {
    // Si timeout ou erreur réseau, utiliser le catalogue calculé (silencieux)
  }

  return catalogFallback;
};

/**
 * Résolution des coordonnées GPS exactes à partir du label du quartier ou de la ville
 * Ex: "Fès - Zouagha" -> { lat: 34.0400, lng: -5.0500 }
 */
export const getCoordinatesFromDistrict = (districtLabel, fallbackLat, fallbackLng) => {
  if (!districtLabel || typeof districtLabel !== 'string') {
    return {
      lat: fallbackLat || 34.0181,
      lng: fallbackLng || -5.0078
    };
  }

  const norm = (s) => String(s || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const cleanLabel = norm(districtLabel);
  const parts = cleanLabel.split(/[-–—/]/).map((p) => p.trim());
  const cityName = parts[0];
  const districtName = parts[1] || parts[0];

  // 1. Recherche par ville puis quartier
  for (const city of MOROCCAN_CITIES) {
    const cNorm = norm(city.name);
    if (cleanLabel.includes(cNorm) || cNorm.includes(cityName)) {
      if (city.districts && city.districts.length > 0) {
        const foundDistrict = city.districts.find(
          (d) => cleanLabel.includes(norm(d.name)) || norm(d.name).includes(districtName)
        );
        if (foundDistrict && foundDistrict.lat && foundDistrict.lng) {
          return { lat: foundDistrict.lat, lng: foundDistrict.lng };
        }
        return { lat: city.districts[0].lat || city.lat, lng: city.districts[0].lng || city.lng };
      }
      return { lat: city.lat, lng: city.lng };
    }
  }

  // 2. Recherche générale de quartier
  for (const city of MOROCCAN_CITIES) {
    for (const d of city.districts || []) {
      if (cleanLabel.includes(norm(d.name))) {
        return { lat: d.lat, lng: d.lng };
      }
    }
  }

  return {
    lat: fallbackLat || 34.0181,
    lng: fallbackLng || -5.0078
  };
};

