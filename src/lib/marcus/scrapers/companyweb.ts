/**
 * CompanyWeb.be Scraper — extracts company profile, financials,
 * and administrator history for the prospecting report.
 *
 * Data extracted:
 *  - Company name, legal form, BCE number, registered address
 *  - Financial data (revenue, gross margin, net profit, employees)
 *  - Current administrators (name, role, age, address if available)
 *  - Historical administrators from Moniteur Belge publications
 */

import * as cheerio from "cheerio";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "fr-BE,fr;q=0.9,nl;q=0.8",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CompanyProfile {
  companyNumber: string; // BCE formatted: 0XXX.XXX.XXX
  name: string;
  legalForm: string | null;
  address: string | null;
  city: string | null;
  creationDate: string | null;
  activityCode: string | null;
  activityDescription: string | null;
}

export interface CompanyFinancials {
  revenue: number | null;
  grossMargin: number | null;
  netProfit: number | null;
  employees: number | null;
}

export interface Administrator {
  name: string;
  role: string | null; // "Gerant", "Administrateur", "Administrateur delegue"
  startDate: string | null;
  endDate: string | null; // null = still active
  address: string | null;
}

export interface CompanyWebData {
  profile: CompanyProfile;
  financials: CompanyFinancials;
  currentAdmins: Administrator[];
  historicalAdmins: Administrator[];
  /** Generated narrative about the company and its administrators */
  companyNarrative: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFinValue(text: string): number | null {
  if (!text) return null;
  let cleaned = text.replace(/[€\s]/g, "").trim();
  if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }
  cleaned = cleaned.replace(/[^0-9.\-]/g, "");
  const value = parseFloat(cleaned);
  return isNaN(value) ? null : value;
}

function extractBCE(text: string): string | null {
  const match = text.match(/(\d{4})[.\s]?(\d{3})[.\s]?(\d{3})/);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : null;
}

// ---------------------------------------------------------------------------
// 1. Search company on CompanyWeb
// ---------------------------------------------------------------------------

export async function searchCompany(
  name: string,
  city?: string,
): Promise<{ companyNumber: string; name: string } | null> {
  try {
    const searchTerm = city ? `${name} ${city}` : name;
    const url = `https://www.companyweb.be/fr/chercher?s=${encodeURIComponent(searchTerm)}`;

    console.log(`[CompanyWeb] Recherche: "${searchTerm}"`);

    const res = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(`[CompanyWeb] Search returned ${res.status}`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Find first company link
    let bestMatch: { companyNumber: string; name: string } | null = null;

    $('a[href*="/fr/entreprise/"]').each((_, el) => {
      if (bestMatch) return;
      const href = $(el).attr("href") ?? "";
      const linkText = $(el).text().trim();
      const bce = extractBCE(href) || extractBCE(linkText);
      if (bce) {
        const companyName = linkText.replace(/\d{4}\.?\d{3}\.?\d{3}/, "").trim() || linkText;
        bestMatch = { companyNumber: bce, name: companyName };
      }
    });

    if (bestMatch) {
      console.log(`[CompanyWeb] Trouve: ${bestMatch.name} (${bestMatch.companyNumber})`);
    } else {
      console.log(`[CompanyWeb] Aucun resultat pour "${searchTerm}"`);
    }

    return bestMatch;
  } catch (err) {
    console.warn(`[CompanyWeb] Search error:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 2. Get company detail page
// ---------------------------------------------------------------------------

export async function getCompanyData(
  companyNumber: string,
): Promise<CompanyWebData | null> {
  try {
    const cleanNumber = companyNumber.replace(/[\s.]/g, "");
    const url = `https://www.companyweb.be/fr/entreprise/${cleanNumber}`;

    console.log(`[CompanyWeb] Chargement fiche: ${url}`);

    const res = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(`[CompanyWeb] Page returned ${res.status}`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const bodyText = $("body").text();

    // --- Profile ---
    const profile = extractProfile($, bodyText, companyNumber);
    console.log(`[CompanyWeb] Profil: ${profile.name} (${profile.legalForm ?? "?"})`);

    // --- Financials ---
    const financials = extractFinancials($, bodyText);
    console.log(`[CompanyWeb] Financials: CA=${financials.revenue}, Marge=${financials.grossMargin}`);

    // --- Administrators ---
    const { current, historical } = extractAdministrators($, bodyText);
    console.log(`[CompanyWeb] Admins: ${current.length} actuels, ${historical.length} historiques`);

    // --- Generate narrative ---
    const companyNarrative = generateCompanyNarrative(profile, financials, current, historical);

    return {
      profile,
      financials,
      currentAdmins: current,
      historicalAdmins: historical,
      companyNarrative,
    };
  } catch (err) {
    console.warn(`[CompanyWeb] Error:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 3. Extract profile data
// ---------------------------------------------------------------------------

function extractProfile(
  $: cheerio.CheerioAPI,
  bodyText: string,
  companyNumber: string,
): CompanyProfile {
  const profile: CompanyProfile = {
    companyNumber,
    name: "",
    legalForm: null,
    address: null,
    city: null,
    creationDate: null,
    activityCode: null,
    activityDescription: null,
  };

  // Name: usually the main heading
  const h1 = $("h1").first().text().trim();
  if (h1) {
    profile.name = h1.replace(/\d{4}\.?\d{3}\.?\d{3}/, "").trim();
  }

  // Legal form
  const legalMatch = bodyText.match(
    /(?:forme\s*(?:juridique|legale)\s*[:]\s*)([A-Z]{2,5})/i,
  ) ?? bodyText.match(/(SRL|SA|SPRL|SCRL|SC|ASBL|BV|NV|BVBA)/);
  if (legalMatch) profile.legalForm = legalMatch[1].toUpperCase();

  // Address
  const addressMatch = bodyText.match(
    /(?:siege\s*(?:social)?\s*[:]\s*)([\w\s,'-]+\d{4}\s+[\w\s-]+)/i,
  );
  if (addressMatch) {
    profile.address = addressMatch[1].trim();
    // Extract city from postal code
    const cityMatch = profile.address.match(/\d{4}\s+([\w\s-]+)/);
    if (cityMatch) profile.city = cityMatch[1].trim();
  }

  // Creation date
  const dateMatch = bodyText.match(
    /(?:date\s*(?:de\s*)?(?:creation|constitution)\s*[:]\s*)(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i,
  );
  if (dateMatch) profile.creationDate = dateMatch[1];

  // Activity
  const actMatch = bodyText.match(
    /(?:activite\s*(?:principale)?\s*[:]\s*)([^\n]{10,80})/i,
  );
  if (actMatch) profile.activityDescription = actMatch[1].trim();

  return profile;
}

// ---------------------------------------------------------------------------
// 4. Extract financials
// ---------------------------------------------------------------------------

function extractFinancials(
  $: cheerio.CheerioAPI,
  bodyText: string,
): CompanyFinancials {
  const financials: CompanyFinancials = {
    revenue: null,
    grossMargin: null,
    netProfit: null,
    employees: null,
  };

  const keywordMap: Record<string, keyof CompanyFinancials> = {
    "marge brute": "grossMargin",
    "brutomarge": "grossMargin",
    "chiffre d'affaires": "revenue",
    "omzet": "revenue",
    "résultat net": "netProfit",
    "nettoresultaat": "netProfit",
    "personnel": "employees",
    "werknemers": "employees",
  };

  // Strategy 1: Parse tables
  $("table tr, table tbody tr").each((_, row) => {
    const cells = $(row).find("td, th");
    if (cells.length < 2) return;
    const label = $(cells[0]).text().trim().toLowerCase();
    const valueText = $(cells[1]).text().trim();
    for (const [keyword, field] of Object.entries(keywordMap)) {
      if (label.includes(keyword) && financials[field] === null) {
        const parsed = parseFinValue(valueText);
        if (parsed !== null) {
          (financials as Record<string, number | null>)[field] =
            field === "employees" ? Math.round(parsed) : parsed;
        }
      }
    }
  });

  // Strategy 2: dl/dt/dd
  $("dl dt").each((_, dt) => {
    const label = $(dt).text().trim().toLowerCase();
    const dd = $(dt).next("dd");
    if (!dd.length) return;
    const valueText = dd.text().trim();
    for (const [keyword, field] of Object.entries(keywordMap)) {
      if (label.includes(keyword) && financials[field] === null) {
        const parsed = parseFinValue(valueText);
        if (parsed !== null) {
          (financials as Record<string, number | null>)[field] =
            field === "employees" ? Math.round(parsed) : parsed;
        }
      }
    }
  });

  // Strategy 3: text-based fallback
  const lines = bodyText.split("\n").map(l => l.trim());
  for (const line of lines) {
    const lower = line.toLowerCase();
    for (const [keyword, field] of Object.entries(keywordMap)) {
      if (lower.includes(keyword) && financials[field] === null) {
        const valMatch = line.match(/[\d][.\d\s]*[,\d]+/);
        if (valMatch) {
          const parsed = parseFinValue(valMatch[0]);
          if (parsed !== null) {
            (financials as Record<string, number | null>)[field] =
              field === "employees" ? Math.round(parsed) : parsed;
          }
        }
      }
    }
  }

  return financials;
}

// ---------------------------------------------------------------------------
// 5. Extract administrators
// ---------------------------------------------------------------------------

function extractAdministrators(
  $: cheerio.CheerioAPI,
  bodyText: string,
): { current: Administrator[]; historical: Administrator[] } {
  const current: Administrator[] = [];
  const historical: Administrator[] = [];

  // Look for administrator sections
  // CompanyWeb typically lists admins in tables or definition lists

  // Pattern 1: Look for admin-related tables
  $("table").each((_, table) => {
    const tableText = $(table).text().toLowerCase();
    if (!tableText.includes("gerant") && !tableText.includes("administrateur") && !tableText.includes("bestuurder")) return;

    $(table).find("tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length < 2) return;
      const name = $(cells[0]).text().trim();
      const role = $(cells[1]).text().trim();

      if (name.length > 3 && name.length < 60 && !name.toLowerCase().includes("nom")) {
        const admin: Administrator = {
          name,
          role: role || null,
          startDate: null,
          endDate: null,
          address: null,
        };

        // Check for dates
        const dateMatch = $(row).text().match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/g);
        if (dateMatch) {
          admin.startDate = dateMatch[0] ?? null;
          admin.endDate = dateMatch[1] ?? null;
        }

        if (admin.endDate) {
          historical.push(admin);
        } else {
          current.push(admin);
        }
      }
    });
  });

  // Pattern 2: Text-based extraction from body
  const adminPattern = /(?:gerant|administrateur|bestuurder|directeur)\s*[:]\s*([A-Z][a-zA-Zéèêëàâäùûüôöïîç\s\-']+)/gi;
  let match: RegExpExecArray | null;
  while ((match = adminPattern.exec(bodyText)) !== null) {
    const name = match[1].trim();
    if (name.length > 3 && name.length < 50) {
      // Check if already found
      if (!current.find(a => a.name.toLowerCase() === name.toLowerCase())) {
        current.push({
          name,
          role: match[0].split(":")[0].trim(),
          startDate: null,
          endDate: null,
          address: null,
        });
      }
    }
  }

  // Pattern 3: Look for Moniteur Belge publications
  const pubPattern = /(?:publication|moniteur)\s*(?:belge)?\s*[:]\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/gi;
  while ((match = pubPattern.exec(bodyText)) !== null) {
    // Found a publication date — look for admin names nearby
    const nearbyText = bodyText.substring(
      Math.max(0, match.index - 200),
      Math.min(bodyText.length, match.index + 500),
    );

    const namePattern = /(?:nomination|demission|mandat)\s*(?:de\s*)?([A-Z][a-zA-Zéèêëàâäùûüôöïîç\s\-']+)/gi;
    let nameMatch: RegExpExecArray | null;
    while ((nameMatch = namePattern.exec(nearbyText)) !== null) {
      const adminName = nameMatch[1].trim();
      if (adminName.length > 3 && adminName.length < 50) {
        const isResignation = nearbyText.toLowerCase().includes("demission");
        const admin: Administrator = {
          name: adminName,
          role: isResignation ? "Ancien administrateur" : "Administrateur",
          startDate: match[1],
          endDate: isResignation ? match[1] : null,
          address: null,
        };
        if (isResignation) {
          historical.push(admin);
        } else if (!current.find(a => a.name.toLowerCase() === adminName.toLowerCase())) {
          current.push(admin);
        }
      }
    }
  }

  return { current, historical };
}

// ---------------------------------------------------------------------------
// 6. Google search for admin info
// ---------------------------------------------------------------------------

export async function searchAdminInfo(
  adminName: string,
  companyName: string,
): Promise<string> {
  try {
    const query = `"${adminName}" "${companyName}" automobile belgique`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=5&hl=fr&gl=be`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": HEADERS["User-Agent"],
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return "";

    const html = await res.text();

    // Extract snippet text from search results
    const snippets: string[] = [];
    const snippetPattern = /<span[^>]*class="[^"]*(?:st|VwiC3b)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi;
    let match: RegExpExecArray | null;
    while ((match = snippetPattern.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, "").trim();
      if (text.length > 20) snippets.push(text);
    }

    // Also try meta description patterns
    const descPattern = /<div[^>]*class="[^"]*(?:IsZvec|VwiC3b)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    while ((match = descPattern.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, "").trim();
      if (text.length > 20 && !snippets.includes(text)) snippets.push(text);
    }

    return snippets.slice(0, 3).join(" ").substring(0, 500);
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// 7. Generate company narrative
// ---------------------------------------------------------------------------

function generateCompanyNarrative(
  profile: CompanyProfile,
  financials: CompanyFinancials,
  currentAdmins: Administrator[],
  historicalAdmins: Administrator[],
): string {
  const parts: string[] = [];

  // Company identity
  const formStr = profile.legalForm ? ` (${profile.legalForm})` : "";
  parts.push(`${profile.name}${formStr} est une entreprise belge enregistree sous le numero BCE ${profile.companyNumber}.`);

  if (profile.address) {
    parts.push(`Son siege social est etabli au ${profile.address}.`);
  }

  if (profile.creationDate) {
    parts.push(`La societe a ete constituee le ${profile.creationDate}.`);
  }

  if (profile.activityDescription) {
    parts.push(`Son activite principale : ${profile.activityDescription}.`);
  }

  // Financial context
  if (financials.revenue !== null) {
    const revenueStr = Math.abs(financials.revenue) >= 1_000_000
      ? `${(financials.revenue / 1_000_000).toFixed(1)}M EUR`
      : `${Math.round(financials.revenue).toLocaleString("fr-BE")} EUR`;
    parts.push(`Le dernier chiffre d'affaires publie s'eleve a ${revenueStr}.`);
  }

  if (financials.grossMargin !== null) {
    const marginStr = Math.abs(financials.grossMargin) >= 1_000_000
      ? `${(financials.grossMargin / 1_000_000).toFixed(1)}M EUR`
      : `${Math.round(financials.grossMargin).toLocaleString("fr-BE")} EUR`;
    parts.push(`La marge brute declaree est de ${marginStr}.`);
  }

  if (financials.employees !== null) {
    parts.push(`L'entreprise emploie ${financials.employees} personne(s).`);
  }

  // Current administrators
  if (currentAdmins.length > 0) {
    parts.push(`La direction actuelle est assuree par :`);
    for (const admin of currentAdmins) {
      let line = `— ${admin.name}`;
      if (admin.role) line += `, ${admin.role}`;
      if (admin.startDate) line += ` (depuis le ${admin.startDate})`;
      if (admin.address) line += `, domicilie(e) a ${admin.address}`;
      line += ".";
      parts.push(line);
    }
  }

  // Historical context
  if (historicalAdmins.length > 0) {
    const uniqueHistorical = historicalAdmins.filter(
      h => !currentAdmins.find(c => c.name.toLowerCase() === h.name.toLowerCase()),
    );
    if (uniqueHistorical.length > 0) {
      parts.push(`Par le passe, la societe a egalement compte parmi ses dirigeants : ${uniqueHistorical.map(a => a.name).join(", ")}.`);
    }
  }

  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// 8. Full pipeline: search + get data + enrich admins
// ---------------------------------------------------------------------------

export async function scrapeCompanyProfile(
  dealerName: string,
  dealerCity: string,
): Promise<CompanyWebData | null> {
  // Step 1: Search
  const searchResult = await searchCompany(dealerName, dealerCity);
  if (!searchResult) return null;

  // Step 2: Get company page
  const data = await getCompanyData(searchResult.companyNumber);
  if (!data) return null;

  // Step 3: Enrich admins with Google search
  if (data.currentAdmins.length > 0) {
    console.log(`[CompanyWeb] Recherche Google pour ${data.currentAdmins.length} administrateur(s)...`);
    const enrichedAdmins: Administrator[] = [];

    for (const admin of data.currentAdmins) {
      const googleInfo = await searchAdminInfo(admin.name, dealerName);
      enrichedAdmins.push({
        ...admin,
        address: admin.address ?? (googleInfo ? extractAddressFromText(googleInfo) : null),
      });

      // Polite delay
      await new Promise(r => setTimeout(r, 1500));
    }

    data.currentAdmins = enrichedAdmins;

    // Regenerate narrative with enriched data
    data.companyNarrative = generateCompanyNarrative(
      data.profile, data.financials, data.currentAdmins, data.historicalAdmins,
    );
  }

  return data;
}

function extractAddressFromText(text: string): string | null {
  // Try to find Belgian address pattern: street + number + postal code + city
  const match = text.match(/\d{4}\s+[A-Z][a-zéèêë]+/);
  return match ? match[0] : null;
}
