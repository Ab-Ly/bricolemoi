import { MOROCCAN_REPAIR_PROBLEMS, MOROCCAN_MAIN_CATEGORIES } from '../constants/moroccanRepairDictionary';
import { MOROCCAN_CITIES } from '../constants/geo';

/**
 * Moteur de Recherche Sémantique Ultra-Rapide et Typo-Tolérant (Maroc)
 * Spécialisé pour BricoleMoi (Français, Darija, Arabe, Arabizi)
 */

// 1. Normalisation poussée du texte (minuscules, sans accents, sans ponctuations parasites)
export const normalizeSearchText = (str) => {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents (é, è, ê, à, ç...)
    .replace(/['’\-_/\\.,:;!?()]/g, ' ') // Remplace la ponctuation par des espaces
    .replace(/\s+/g, ' ')
    .trim();
};

// 2. Calcul rapide de distance de Levenshtein (Tolérance aux fautes de frappe)
export const calculateLevenshteinDistance = (a, b) => {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Optimisation mémoire : tableau 1D
  const row = [];
  for (let i = 0; i <= b.length; i++) {
    row[i] = i;
  }

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      let val;
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
};

// 3. Extraction d'intention géo (Ville / Quartier dans la requête de recherche)
export const extractLocationFromQuery = (rawQuery) => {
  const normQuery = normalizeSearchText(rawQuery);
  if (!normQuery) return { cleanQuery: '', detectedCity: null, detectedDistrict: null };

  let detectedCity = null;
  let detectedDistrict = null;
  let cleanQuery = normQuery;

  for (const city of MOROCCAN_CITIES) {
    const normCity = normalizeSearchText(city.name);
    if (cleanQuery.includes(normCity)) {
      detectedCity = city.name;
      cleanQuery = cleanQuery.replace(normCity, '').trim();

      // Vérifier les quartiers de cette ville
      if (city.districts && Array.isArray(city.districts)) {
        for (const dist of city.districts) {
          const dName = typeof dist === 'string' ? dist : dist.name;
          const normDist = normalizeSearchText(dName);
          if (cleanQuery.includes(normDist)) {
            detectedDistrict = dName;
            cleanQuery = cleanQuery.replace(normDist, '').trim();
            break;
          }
        }
      }
      break;
    }
  }

  return { cleanQuery, detectedCity, detectedDistrict };
};

// 4. Recherche Sémantique Instantanée sur le catalogue des pannes marocaines
export const searchRepairProblems = (query, maxResults = 6) => {
  if (!query || !query.trim()) {
    // Par défaut, retourner les pannes d'urgence les plus fréquentes
    return MOROCCAN_REPAIR_PROBLEMS.slice(0, maxResults);
  }

  const { cleanQuery, detectedCity, detectedDistrict } = extractLocationFromQuery(query);
  const searchTokens = (cleanQuery || normalizeSearchText(query)).split(' ').filter(Boolean);

  const scoredResults = MOROCCAN_REPAIR_PROBLEMS.map((problem) => {
    let score = 0;
    const normTitle = normalizeSearchText(problem.title);
    const normTitleAr = normalizeSearchText(problem.titleAr);
    const allKeywords = (problem.keywords || []).map(normalizeSearchText);
    const fullSearchCorpus = `${normTitle} ${normTitleAr} ${allKeywords.join(' ')}`;

    // Score 1 : Correspondance exacte dans le titre (+100)
    if (normTitle.includes(cleanQuery)) score += 100;
    if (normTitleAr.includes(cleanQuery)) score += 90;

    // Score 2 : Correspondance mot par mot
    for (const token of searchTokens) {
      if (token.length < 2) continue;

      if (normTitle.includes(token)) score += 30;
      if (normTitleAr.includes(token)) score += 25;

      for (const kw of allKeywords) {
        if (kw === token) {
          score += 40; // Match exact de mot-clé
        } else if (kw.includes(token)) {
          score += 20; // Match partiel
        } else if (token.length >= 4 && kw.length >= 4) {
          // Typo tolerance (Distance Levenshtein <= 1 ou 2)
          const dist = calculateLevenshteinDistance(token, kw);
          if (dist === 1) score += 15;
          else if (dist === 2 && token.length >= 6) score += 8;
        }
      }
    }

    // Bonus pour urgence critique
    if (problem.urgencyLevel === 'CRITICAL') score += 5;

    return {
      ...problem,
      score,
      detectedCity,
      detectedDistrict,
      matchedCategory: MOROCCAN_MAIN_CATEGORIES.find((c) => c.id === problem.category) || null
    };
  });

  // Filtrer les résultats pertinents et trier par score décroissant
  return scoredResults
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
};

// 5. Structure d'indexation pour export MeiliSearch sur le VPS
export const exportMeiliSearchDocuments = () => {
  return MOROCCAN_REPAIR_PROBLEMS.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    title_ar: p.titleAr,
    keywords: p.keywords,
    min_price: p.minPrice,
    max_price: p.maxPrice,
    time_estimate: p.timeEstimate,
    urgency_level: p.urgencyLevel
  }));
};
