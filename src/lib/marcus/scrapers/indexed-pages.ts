/**
 * Estimates the number of pages indexed by Google for a domain.
 * Uses a simple fetch of Google search results for "site:domain.com"
 * and parses the result count from the HTML.
 */

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export interface IndexedPagesResult {
  /** Estimated number of indexed pages */
  count: number | null;
  /** Raw text from Google (e.g., "About 42 results") */
  rawText: string | null;
  /** Narrative description */
  narrative: string;
}

/**
 * Query Google for site:domain and extract the result count.
 */
export async function scrapeIndexedPages(url: string): Promise<IndexedPagesResult> {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    console.log(`[Marcus/IndexedPages] Recherche pages indexees pour ${domain}...`);

    const searchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(domain)}&hl=fr`;

    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "fr-FR,fr;q=0.9",
        "Accept": "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(`[Marcus/IndexedPages] Google returned ${res.status}`);
      return { count: null, rawText: null, narrative: generateNarrative(domain, null) };
    }

    const html = await res.text();

    // Try to extract result count from Google HTML
    // Patterns: "About 123 results", "Environ 123 résultats", "123 résultats"
    const patterns = [
      /(?:About|Environ)\s+([\d\s,.]+)\s+(?:results|r[eé]sultats)/i,
      /([\d\s,.]+)\s+(?:results|r[eé]sultats)/i,
      /id="result-stats"[^>]*>(?:About|Environ)?\s*([\d\s,.]+)/i,
    ];

    let count: number | null = null;
    let rawText: string | null = null;

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        rawText = match[0];
        const numStr = match[1].replace(/[\s,.]/g, "");
        count = parseInt(numStr, 10);
        if (!isNaN(count) && count > 0) break;
        count = null;
      }
    }

    // Fallback: check if "no results" or blocked
    if (count === null) {
      if (html.includes("did not match any documents") || html.includes("ne correspondent à aucun document")) {
        count = 0;
        rawText = "0 results";
      }
    }

    console.log(`[Marcus/IndexedPages] Pages indexees: ${count ?? "non determine"}`);

    return { count, rawText, narrative: generateNarrative(domain, count) };
  } catch (err) {
    console.warn(`[Marcus/IndexedPages] Erreur:`, err instanceof Error ? err.message : err);
    return { count: null, rawText: null, narrative: generateNarrative("le domaine", null) };
  }
}

function generateNarrative(domain: string, count: number | null): string {
  if (count === null) {
    return `Le nombre de pages indexees par Google pour ${domain} n'a pas pu etre determine automatiquement. Vous pouvez verifier manuellement en tapant "site:${domain}" dans Google.`;
  }
  if (count === 0) {
    return `Aucune page de ${domain} n'est indexee par Google. C'est un probleme critique : votre site est invisible dans les resultats de recherche. Les causes possibles sont un robots.txt bloquant, une balise noindex, ou un site trop recent.`;
  }
  if (count <= 5) {
    return `Seulement ${count} page(s) de ${domain} sont indexees par Google. C'est tres peu — les concessionnaires bien references ont generalement entre 50 et 200 pages indexees (fiches vehicules, pages de services, blog). Chaque page indexee est une porte d'entree potentielle pour un client.`;
  }
  if (count <= 20) {
    return `${count} pages de ${domain} sont indexees par Google. C'est un debut, mais il y a une marge de progression significative. Ajouter des pages de services, des fiches vehicules individuelles et du contenu local pourrait multiplier votre visibilite par 3 a 5.`;
  }
  if (count <= 100) {
    return `${count} pages indexees — une couverture correcte. Pour aller plus loin, verifiez que chaque vehicule en stock dispose d'une fiche individuelle indexable, et enrichissez le contenu avec des pages de services locaux.`;
  }
  return `${count} pages indexees par Google — c'est un volume solide qui temoigne d'un site riche en contenu. Assurez-vous que chaque page est bien optimisee avec des meta-donnees uniques et du contenu de qualite.`;
}
