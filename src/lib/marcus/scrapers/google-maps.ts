/**
 * Google Maps Scraper — extracts competitor data from Google Maps search results.
 * Uses direct HTTP requests to Google Maps search, no API key needed.
 *
 * Strategy:
 *  1. Build a search query adapted to the prospect (brands + city)
 *  2. Fetch Google Maps search results HTML
 *  3. Parse business names, ratings, review counts from the response
 *  4. Return up to 15 competitors sorted by relevance
 */

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export interface GoogleMapsResult {
  name: string;
  rating: number | null;
  reviewCount: number | null;
  address: string | null;
  category: string | null;
}

// ---------------------------------------------------------------------------
// 1. Build search queries based on prospect context
// ---------------------------------------------------------------------------

export function buildSearchQueries(
  dealerCity: string,
  carBrands: string[],
): string[] {
  const queries: string[] = [];

  // Primary: generic dealer search
  queries.push(`concessionnaire automobile ${dealerCity}`);
  queries.push(`garage voiture occasion ${dealerCity}`);

  // Brand-specific if brands detected
  if (carBrands.length > 0) {
    const topBrands = carBrands.slice(0, 3);
    for (const brand of topBrands) {
      queries.push(`concessionnaire ${brand} ${dealerCity}`);
    }
  }

  // Additional
  queries.push(`vente voiture ${dealerCity}`);

  return queries;
}

// ---------------------------------------------------------------------------
// 2. Scrape Google Maps via Google search
// ---------------------------------------------------------------------------

export async function scrapeGoogleMaps(
  query: string,
  maxResults: number = 15,
): Promise<GoogleMapsResult[]> {
  const results: GoogleMapsResult[] = [];

  try {
    // Use Google search with local intent to get Maps results
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=20&hl=fr&gl=be`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "fr-BE,fr;q=0.9",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[GoogleMaps] Search returned ${res.status} for: ${query}`);
      return results;
    }

    const html = await res.text();

    // Parse local business results from Google search
    // Google embeds local pack data in the HTML with rating/review patterns
    const parsed = parseGoogleSearchResults(html);
    results.push(...parsed);

  } catch (err) {
    console.warn(`[GoogleMaps] Scrape error for "${query}":`, err);
  }

  // Deduplicate by name
  const seen = new Set<string>();
  const unique: GoogleMapsResult[] = [];
  for (const r of results) {
    const key = r.name.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  }

  return unique.slice(0, maxResults);
}

// ---------------------------------------------------------------------------
// 3. Parse Google search results HTML
// ---------------------------------------------------------------------------

function parseGoogleSearchResults(html: string): GoogleMapsResult[] {
  const results: GoogleMapsResult[] = [];

  // Pattern 1: Local pack results
  // Google includes ratings as "X,X" or "X.X" followed by review counts
  // Business names appear in various heading tags

  // Look for rating patterns: "4,5" or "4.5" followed by review count patterns
  // Common format in Google local results: rating · (XXX) · category · address
  const ratingBlocks = html.match(
    /class="[^"]*"[^>]*>[^<]*?(\d[,\.]\d)\s*[^<]*?<[^>]*>[^<]*?\((\d[\d\s\.]*)\)/g
  ) ?? [];

  // Pattern 2: Extract from structured data / aria labels
  // Google often puts "Nom - Note X,X - XX avis" in aria-label attributes
  const ariaLabels = html.match(/aria-label="([^"]*\d[,\.]\d[^"]*)"/g) ?? [];

  for (const label of ariaLabels) {
    const match = label.match(/aria-label="([^"]+)"/);
    if (!match) continue;

    const text = match[1];

    // Try to extract: "Business Name" ... "X,X" ... "XXX avis"
    const ratingMatch = text.match(/(\d[,\.]\d)/);
    const reviewMatch = text.match(/(\d[\d\s]*)\s*avis/i) ?? text.match(/\((\d[\d\s\.]*)\)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(",", ".")) : null;
    const reviewCount = reviewMatch ? parseInt(reviewMatch[1].replace(/[\s\.]/g, ""), 10) : null;

    if (rating && rating >= 1 && rating <= 5) {
      // Extract name (usually the beginning of the text before the rating)
      const nameEnd = text.indexOf(String(ratingMatch![0]));
      let name = text.substring(0, nameEnd).replace(/[\-·,\s]+$/, "").trim();

      // Clean up
      if (name.length > 3 && name.length < 100) {
        results.push({ name, rating, reviewCount, address: null, category: null });
      }
    }
  }

  // Pattern 3: Look for business names with "data-attrid" or specific class patterns
  // Extract names near rating stars
  const nameRatingPattern = /class="[^"]*(?:dbg0pd|rllt__details|lI9IFe)[^"]*"[^>]*>\s*<[^>]*>([^<]{3,60})<\/[^>]*>[\s\S]{0,200}?(\d[,\.]\d)[\s\S]{0,100}?\((\d[\d\s\.]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = nameRatingPattern.exec(html)) !== null) {
    const name = match[1].replace(/<[^>]*>/g, "").trim();
    const rating = parseFloat(match[2].replace(",", "."));
    const reviewCount = parseInt(match[3].replace(/[\s\.]/g, ""), 10);

    if (name.length > 2 && rating >= 1 && rating <= 5) {
      results.push({ name, rating, reviewCount, address: null, category: null });
    }
  }

  // Pattern 4: Simple fallback - find all rating/review patterns and nearby text
  const simplePattern = /(?:>|\n)([^<>\n]{4,50}?)(?:<[^>]*>|\s)*?(?:Note\s*(?:de\s*)?)?(\d[,\.]\d)\s*(?:\/\s*5\s*)?(?:<[^>]*>|\s)*?\(?(\d[\d\s\.]*?)\s*(?:avis|reviews)/gi;
  while ((match = simplePattern.exec(html)) !== null) {
    const name = match[1].replace(/<[^>]*>/g, "").replace(/[\-·]\s*$/, "").trim();
    const rating = parseFloat(match[2].replace(",", "."));
    const reviewCount = parseInt(match[3].replace(/[\s\.]/g, ""), 10);

    if (name.length > 2 && name.length < 60 && rating >= 1 && rating <= 5 && !isNaN(reviewCount)) {
      results.push({ name, rating, reviewCount, address: null, category: null });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// 4. Aggregate: run multiple queries, merge, deduplicate
// ---------------------------------------------------------------------------

export async function scrapeCompetitors(
  dealerName: string,
  dealerCity: string,
  carBrands: string[],
  maxResults: number = 15,
): Promise<GoogleMapsResult[]> {
  const queries = buildSearchQueries(dealerCity, carBrands);

  console.log(`[GoogleMaps] Lancement de ${queries.length} recherches pour ${dealerCity}...`);

  const allResults: GoogleMapsResult[] = [];

  for (const query of queries) {
    console.log(`[GoogleMaps] Recherche: "${query}"`);
    const results = await scrapeGoogleMaps(query, 20);
    console.log(`[GoogleMaps]   -> ${results.length} resultats`);
    allResults.push(...results);

    // Polite delay between requests
    await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
  }

  // Deduplicate by normalized name
  const seen = new Map<string, GoogleMapsResult>();
  for (const r of allResults) {
    const key = r.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    // Keep the one with the most data
    const existing = seen.get(key);
    if (!existing || (r.reviewCount ?? 0) > (existing.reviewCount ?? 0)) {
      seen.set(key, r);
    }
  }

  // Remove the prospect itself from results
  const dealerKey = dealerName.toLowerCase().replace(/[^a-z0-9]/g, "");
  seen.delete(dealerKey);

  // Sort by review count (most reviewed = most relevant)
  const sorted = [...seen.values()].sort(
    (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  );

  console.log(`[GoogleMaps] ${sorted.length} concurrents uniques trouves (top ${maxResults} retenus)`);

  return sorted.slice(0, maxResults);
}

// ---------------------------------------------------------------------------
// 5. Generate competitor insights from scraped data
// ---------------------------------------------------------------------------

export interface CompetitorInsights {
  /** Average rating of top competitors */
  avgRating: number;
  /** Average review count */
  avgReviews: number;
  /** Median review count */
  medianReviews: number;
  /** Best rated competitor */
  bestRated: GoogleMapsResult | null;
  /** Most reviewed competitor */
  mostReviewed: GoogleMapsResult | null;
  /** How the prospect ranks vs competitors (1 = best) */
  prospectRatingRank: number | null;
  prospectReviewRank: number | null;
  /** Total competitors analyzed */
  totalAnalyzed: number;
  /** Summary text for the report */
  competitorNarrative: string;
}

export function analyzeCompetitors(
  competitors: GoogleMapsResult[],
  prospectRating: number | null,
  prospectReviews: number | null,
  dealerName: string,
  dealerCity: string,
): CompetitorInsights {
  const withRating = competitors.filter(c => c.rating !== null);
  const withReviews = competitors.filter(c => c.reviewCount !== null && c.reviewCount > 0);

  const avgRating = withRating.length > 0
    ? Math.round(withRating.reduce((s, c) => s + c.rating!, 0) / withRating.length * 10) / 10
    : 0;

  const reviewCounts = withReviews.map(c => c.reviewCount!).sort((a, b) => a - b);
  const avgReviews = reviewCounts.length > 0
    ? Math.round(reviewCounts.reduce((s, n) => s + n, 0) / reviewCounts.length)
    : 0;
  const medianReviews = reviewCounts.length > 0
    ? reviewCounts[Math.floor(reviewCounts.length / 2)]
    : 0;

  const bestRated = withRating.length > 0
    ? withRating.reduce((best, c) => (c.rating! > (best.rating ?? 0) ? c : best))
    : null;

  const mostReviewed = withReviews.length > 0
    ? withReviews.reduce((best, c) => (c.reviewCount! > (best.reviewCount ?? 0) ? c : best))
    : null;

  // Rank prospect
  let prospectRatingRank: number | null = null;
  let prospectReviewRank: number | null = null;

  if (prospectRating !== null) {
    const allRatings = [...withRating.map(c => c.rating!), prospectRating].sort((a, b) => b - a);
    prospectRatingRank = allRatings.indexOf(prospectRating) + 1;
  }

  if (prospectReviews !== null) {
    const allReviews = [...reviewCounts, prospectReviews].sort((a, b) => b - a);
    prospectReviewRank = allReviews.indexOf(prospectReviews) + 1;
  }

  // Generate narrative
  const narrative = generateCompetitorNarrative(
    competitors.length, avgRating, avgReviews, medianReviews,
    bestRated, mostReviewed,
    prospectRating, prospectReviews, prospectRatingRank, prospectReviewRank,
    dealerName, dealerCity,
  );

  return {
    avgRating, avgReviews, medianReviews,
    bestRated, mostReviewed,
    prospectRatingRank, prospectReviewRank,
    totalAnalyzed: competitors.length,
    competitorNarrative: narrative,
  };
}

function generateCompetitorNarrative(
  total: number, avgRating: number, avgReviews: number, medianReviews: number,
  bestRated: GoogleMapsResult | null, mostReviewed: GoogleMapsResult | null,
  prospectRating: number | null, prospectReviews: number | null,
  ratingRank: number | null, reviewRank: number | null,
  dealerName: string, city: string,
): string {
  const parts: string[] = [];

  parts.push(`L'analyse de ${total} concessionnaires et garages dans la zone de ${city} revele un marche local actif.`);

  if (avgRating > 0) {
    parts.push(`La note moyenne des concurrents s'etablit a ${avgRating}/5, avec ${avgReviews} avis en moyenne (mediane : ${medianReviews}).`);
  }

  if (bestRated && bestRated.rating) {
    parts.push(`Le mieux note est ${bestRated.name} (${bestRated.rating}/5).`);
  }

  if (mostReviewed && mostReviewed.reviewCount) {
    parts.push(`Le plus visible en termes de reputation est ${mostReviewed.name} avec ${mostReviewed.reviewCount} avis — c'est ce type de volume qui genere la confiance des acheteurs en ligne.`);
  }

  if (prospectRating !== null && ratingRank !== null) {
    if (ratingRank <= 3) {
      parts.push(`${dealerName} se positionne favorablement avec une note de ${prospectRating}/5 (${ratingRank}e sur ${total + 1}).`);
    } else {
      parts.push(`Avec une note de ${prospectRating}/5, ${dealerName} se classe ${ratingRank}e sur ${total + 1} dans la zone — un potentiel d'amelioration existe.`);
    }
  }

  if (prospectReviews !== null && reviewRank !== null) {
    if (prospectReviews < medianReviews) {
      parts.push(`Avec ${prospectReviews} avis contre une mediane de ${medianReviews}, la visibilite en termes de reputation est en retrait. Une strategie de sollicitation d'avis systematique permettrait de combler cet ecart en 3 a 6 mois.`);
    }
  } else {
    parts.push(`En l'absence de donnees sur la note Google de ${dealerName}, il est recommande de verifier et d'optimiser la fiche Google Business en priorite.`);
  }

  return parts.join(" ");
}
