import type {
  AuditCheckItem,
  AuditReportData,
  CompetitorData,
  CompetitorInsightsData,
  CompanyProfileData,
  GoogleProfileData,
  LeadsLostData,
  PriorityAction,
  SocialMediaProfile,
  TechnicalExtras,
  TimeLostBreakdown,
} from "./types";
import { scrapeCompetitors, analyzeCompetitors } from "./scrapers/google-maps";
import { scrapeCompanyProfile } from "./scrapers/companyweb";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScanOptions {
  dealerName: string;
  dealerUrl: string;
  dealerCity: string;
  competitors?: { name: string; url: string }[];
  /** Override vehicle count (otherwise estimated from site) */
  vehicleCount?: number;
  /** Owner/manager name if known */
  ownerName?: string;
  /** Google rating if known (manual from CSV) */
  googleRating?: number;
  /** Google review count if known (manual from CSV) */
  googleReviewCount?: number;
}

interface PageSpeedResult {
  score: number; // 0-100
  lcpMs: number;
  fcpMs: number;
  cls: number;
  isMobileFriendly: boolean;
}

interface CrawlResult {
  title: string;
  metaDescription: string;
  h1: string[];
  hasSchemaLocalBusiness: boolean;
  isHttps: boolean;
  imagesTotal: number;
  imagesWithAlt: number;
  cityMentions: number;
  serviceMentions: string[];
  foundKeywords: string[];
  // New enriched data
  socialLinks: SocialMediaProfile[];
  carBrands: string[];
  technicalExtras: TechnicalExtras;
  estimatedVehicleCount: number;
  rawHtml: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SERVICE_KEYWORDS = [
  "vente",
  "achat",
  "reprise",
  "occasion",
  "entretien",
  "reparation",
  "carrosserie",
  "revision",
  "financement",
  "garantie",
  "location",
  "leasing",
];

const CAR_BRANDS = [
  "Volkswagen", "VW", "Renault", "Peugeot", "Citroen", "Citroën",
  "Opel", "BMW", "Mercedes", "Mercedes-Benz", "Audi", "Toyota",
  "Ford", "Fiat", "Hyundai", "Kia", "Skoda", "Škoda", "Seat",
  "Volvo", "Mazda", "Nissan", "Honda", "Dacia", "Mini", "Suzuki",
  "Mitsubishi", "Jeep", "Land Rover", "Porsche", "Tesla", "Lexus",
  "Alfa Romeo", "Cupra", "DS Automobiles", "MG", "BYD", "Polestar",
  "Jaguar", "Range Rover", "Lamborghini", "Ferrari", "Maserati",
  "Bentley", "Aston Martin", "Rolls-Royce",
];

const COOKIE_BANNER_SIGNATURES = [
  "cookiebot", "cookie-consent", "cookieconsent", "cookie_consent",
  "gdpr", "rgpd", "cookie-banner", "cookie-notice", "cookie-popup",
  "cookie-bar", "tarteaucitron", "axeptio", "onetrust", "cookieyes",
  "complianz", "iubenda", "quantcast", "didomi",
  "accept-cookies", "accepter les cookies", "politique de cookies",
];

const ANALYTICS_SIGNATURES = [
  "google-analytics.com", "googletagmanager.com",
  "gtag(", "ga(", "analytics.js", "gtm.js",
  "G-", "UA-", "GTM-",
];

const USER_AGENT =
  "Mozilla/5.0 (compatible; PrismaFluxBot/1.0; +https://prismaflux.com)";

/** Average hourly cost for admin staff in Belgian car dealership */
const HOURLY_RATE_EUR = 35;

/** Average car sale profit margin for ROI calculation */
const AVG_SALE_VALUE_EUR = 1800;

// ---------------------------------------------------------------------------
// 1. fetchPageSpeed
// ---------------------------------------------------------------------------

export async function fetchPageSpeed(
  url: string,
): Promise<PageSpeedResult | null> {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Marcus] PageSpeed API returned ${res.status} for ${url}`);
      return null;
    }

    const data = await res.json();

    const lighthouseResult = data.lighthouseResult;
    if (!lighthouseResult) return null;

    const score = Math.round(
      (lighthouseResult.categories?.performance?.score ?? 0) * 100,
    );

    const audits = lighthouseResult.audits ?? {};

    const lcpMs = audits["largest-contentful-paint"]?.numericValue ?? 0;
    const fcpMs = audits["first-contentful-paint"]?.numericValue ?? 0;
    const cls = audits["cumulative-layout-shift"]?.numericValue ?? 0;

    const viewportAudit = audits["viewport"];
    const isMobileFriendly = viewportAudit?.score === 1;

    return { score, lcpMs, fcpMs, cls, isMobileFriendly };
  } catch (err) {
    console.warn(`[Marcus] PageSpeed fetch error for ${url}:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 2. crawlSite (enriched)
// ---------------------------------------------------------------------------

export async function crawlSite(
  url: string,
  city: string,
): Promise<CrawlResult | null> {
  try {
    // Try HTTPS first, then HTTP
    let res: Response;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      res = await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT },
        redirect: "follow",
      });
    } catch {
      // If HTTPS fails and URL is HTTPS, try HTTP
      if (url.startsWith("https://")) {
        const httpUrl = url.replace("https://", "http://");
        console.warn(`[Marcus] HTTPS failed, trying HTTP: ${httpUrl}`);
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 15_000);
        res = await fetch(httpUrl, {
          signal: controller2.signal,
          headers: { "User-Agent": USER_AGENT },
          redirect: "follow",
        });
        clearTimeout(timeout2);
      } else {
        throw new Error("Fetch failed");
      }
    }
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Marcus] Crawl returned ${res.status} for ${url}`);
      return null;
    }

    const html = await res.text();
    const htmlLower = html.toLowerCase();

    // title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";

    // meta description
    const metaMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["'][^>]*>/i,
    );
    const metaMatchAlt = html.match(
      /<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["'][^>]*>/i,
    );
    const metaDescription = (metaMatch?.[1] ?? metaMatchAlt?.[1] ?? "").trim();

    // h1 tags
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    const h1: string[] = [];
    let h1Match: RegExpExecArray | null;
    while ((h1Match = h1Regex.exec(html)) !== null) {
      const stripped = h1Match[1].replace(/<[^>]*>/g, "").trim();
      if (stripped) h1.push(stripped);
    }

    // schema LocalBusiness / AutoDealer
    const hasSchemaLocalBusiness =
      htmlLower.includes("localbusiness") ||
      htmlLower.includes("autodealer");

    // HTTPS check
    const isHttps = url.toLowerCase().startsWith("https://") || res.url.startsWith("https://");

    // Images
    const imgRegex = /<img\b[^>]*>/gi;
    const imgTags = html.match(imgRegex) ?? [];
    const imagesTotal = imgTags.length;
    const imagesWithAlt = imgTags.filter((tag) =>
      /alt=["'][^"']+["']/i.test(tag),
    ).length;

    // City mentions
    const cityLower = city.toLowerCase();
    let cityMentions = 0;
    let searchPos = 0;
    while (true) {
      const idx = htmlLower.indexOf(cityLower, searchPos);
      if (idx === -1) break;
      cityMentions++;
      searchPos = idx + cityLower.length;
    }

    // Service mentions
    const serviceMentions: string[] = [];
    for (const keyword of SERVICE_KEYWORDS) {
      if (htmlLower.includes(keyword)) {
        serviceMentions.push(keyword);
      }
    }

    // Found keywords: service + city combos
    const foundKeywords: string[] = [];
    for (const keyword of SERVICE_KEYWORDS) {
      const combo = `${keyword} ${cityLower}`;
      if (htmlLower.includes(combo)) {
        foundKeywords.push(combo);
      }
    }

    // --- NEW: Social media detection ---
    const socialLinks = detectSocialMedia(html);

    // --- NEW: Car brand detection ---
    const carBrands = detectCarBrands(html);

    // --- NEW: Technical extras ---
    const technicalExtras = detectTechnicalExtras(html, htmlLower);

    // --- NEW: Estimate vehicle count ---
    const estimatedVehicleCount = estimateVehicleCount(html, htmlLower);

    return {
      title,
      metaDescription,
      h1,
      hasSchemaLocalBusiness,
      isHttps,
      imagesTotal,
      imagesWithAlt,
      cityMentions,
      serviceMentions,
      foundKeywords,
      socialLinks,
      carBrands,
      technicalExtras,
      estimatedVehicleCount,
      rawHtml: html,
    };
  } catch (err) {
    console.warn(`[Marcus] Crawl error for ${url}:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// NEW: detectSocialMedia
// ---------------------------------------------------------------------------

function detectSocialMedia(html: string): SocialMediaProfile[] {
  const profiles: SocialMediaProfile[] = [];

  // Facebook
  const fbMatch = html.match(/href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"'\s>]+)["']/i);
  profiles.push({
    platform: "facebook",
    found: !!fbMatch,
    url: fbMatch ? fbMatch[1] : null,
  });

  // Instagram
  const igMatch = html.match(/href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"'\s>]+)["']/i);
  profiles.push({
    platform: "instagram",
    found: !!igMatch,
    url: igMatch ? igMatch[1] : null,
  });

  // LinkedIn
  const liMatch = html.match(/href=["'](https?:\/\/(?:www\.)?linkedin\.com\/[^"'\s>]+)["']/i);
  profiles.push({
    platform: "linkedin",
    found: !!liMatch,
    url: liMatch ? liMatch[1] : null,
  });

  return profiles;
}

// ---------------------------------------------------------------------------
// NEW: detectCarBrands
// ---------------------------------------------------------------------------

function detectCarBrands(html: string): string[] {
  const htmlLower = html.toLowerCase();
  const found: string[] = [];

  // Normalize brand names for matching
  const brandMap: Record<string, string> = {};
  for (const brand of CAR_BRANDS) {
    brandMap[brand.toLowerCase()] = brand;
  }

  // Deduplicate similar brands (VW -> Volkswagen, etc.)
  const seen = new Set<string>();

  for (const [lower, original] of Object.entries(brandMap)) {
    if (htmlLower.includes(lower)) {
      // Normalize duplicates
      const normalized =
        original === "VW" ? "Volkswagen" :
        original === "Mercedes-Benz" ? "Mercedes" :
        original === "Škoda" ? "Skoda" :
        original === "Citroën" ? "Citroen" :
        original;

      if (!seen.has(normalized)) {
        seen.add(normalized);
        found.push(normalized);
      }
    }
  }

  return found.sort();
}

// ---------------------------------------------------------------------------
// NEW: detectTechnicalExtras
// ---------------------------------------------------------------------------

function detectTechnicalExtras(html: string, htmlLower: string): TechnicalExtras {
  // Cookie banner detection
  const hasCookieBanner = COOKIE_BANNER_SIGNATURES.some((sig) =>
    htmlLower.includes(sig),
  );

  // Google Analytics / GTM detection
  let hasGoogleAnalytics = false;
  let hasGoogleTagManager = false;

  for (const sig of ANALYTICS_SIGNATURES) {
    if (htmlLower.includes(sig.toLowerCase())) {
      if (sig.includes("tagmanager") || sig.startsWith("GTM")) {
        hasGoogleTagManager = true;
      } else {
        hasGoogleAnalytics = true;
      }
    }
  }

  return {
    hasCookieBanner,
    hasSitemap: false, // will be checked separately
    hasRobotsTxt: false, // will be checked separately
    hasGoogleAnalytics,
    hasGoogleTagManager,
    sslValid: html.length > 0, // if we got the page, SSL is at least functional
  };
}

// ---------------------------------------------------------------------------
// NEW: estimateVehicleCount
// ---------------------------------------------------------------------------

function estimateVehicleCount(html: string, htmlLower: string): number {
  // Look for vehicle count indicators
  // Common patterns: "X vehicules", "X voitures", "stock de X"
  const patterns = [
    /(\d+)\s*v[eé]hicules?\b/i,
    /(\d+)\s*voitures?\b/i,
    /(\d+)\s*occasions?\b/i,
    /stock\s*(?:de\s*)?(\d+)/i,
    /(\d+)\s*annonces?\b/i,
  ];

  for (const pattern of patterns) {
    const match = htmlLower.match(pattern);
    if (match) {
      const count = parseInt(match[1], 10);
      if (count > 5 && count < 2000) {
        return count;
      }
    }
  }

  // Heuristic: count <article> or product-like elements
  const articleCount = (html.match(/<article\b/gi) ?? []).length;
  if (articleCount > 5) return articleCount;

  // Default estimate based on images count (rough)
  const imgCount = (html.match(/<img\b/gi) ?? []).length;
  if (imgCount > 30) return Math.round(imgCount / 5);

  // Fallback: typical small Belgian dealer
  return 40;
}

// ---------------------------------------------------------------------------
// NEW: checkSitemapAndRobots
// ---------------------------------------------------------------------------

export async function checkSitemapAndRobots(
  baseUrl: string,
): Promise<{ hasSitemap: boolean; hasRobotsTxt: boolean }> {
  const origin = new URL(baseUrl).origin;
  let hasSitemap = false;
  let hasRobotsTxt = false;

  try {
    const [sitemapRes, robotsRes] = await Promise.all([
      fetch(`${origin}/sitemap.xml`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(8_000),
      }).catch(() => null),
      fetch(`${origin}/robots.txt`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(8_000),
      }).catch(() => null),
    ]);

    if (sitemapRes?.ok) {
      const text = await sitemapRes.text();
      hasSitemap = text.includes("<urlset") || text.includes("<sitemapindex");
    }

    if (robotsRes?.ok) {
      const text = await robotsRes.text();
      hasRobotsTxt = text.toLowerCase().includes("user-agent");
    }
  } catch {
    // ignore
  }

  return { hasSitemap, hasRobotsTxt };
}

// ---------------------------------------------------------------------------
// 3. buildTechnicalChecks (enhanced)
// ---------------------------------------------------------------------------

export function buildTechnicalChecks(
  pageSpeed: PageSpeedResult | null,
  crawl: CrawlResult | null,
): AuditCheckItem[] {
  const checks: AuditCheckItem[] = [];

  // HTTPS
  if (crawl) {
    checks.push({
      label: "HTTPS",
      status: crawl.isHttps ? "ok" : "error",
      detail: crawl.isHttps
        ? "Le site est securise en HTTPS."
        : "Le site n'utilise pas HTTPS.",
      recommendation: crawl.isHttps
        ? undefined
        : "Migrer le site vers HTTPS avec un certificat SSL valide.",
    });
  }

  // PageSpeed score
  if (pageSpeed) {
    const psStatus: AuditCheckItem["status"] =
      pageSpeed.score >= 70 ? "ok" : pageSpeed.score >= 40 ? "warn" : "error";
    checks.push({
      label: "Score PageSpeed",
      status: psStatus,
      detail: `Score mobile : ${pageSpeed.score}/100.`,
      recommendation:
        psStatus !== "ok"
          ? "Optimiser les images, activer le cache navigateur et reduire le JavaScript inutile."
          : undefined,
    });
  }

  // LCP
  if (pageSpeed) {
    const lcpSec = (pageSpeed.lcpMs / 1000).toFixed(1);
    const lcpStatus: AuditCheckItem["status"] =
      pageSpeed.lcpMs <= 2500
        ? "ok"
        : pageSpeed.lcpMs <= 4000
          ? "warn"
          : "error";
    checks.push({
      label: "LCP (Largest Contentful Paint)",
      status: lcpStatus,
      detail: `LCP : ${lcpSec}s.`,
      recommendation:
        lcpStatus !== "ok"
          ? "Reduire la taille de l'image principale, utiliser le format WebP et precharger les ressources critiques."
          : undefined,
    });
  }

  // Mobile friendly
  if (pageSpeed) {
    checks.push({
      label: "Compatibilite mobile",
      status: pageSpeed.isMobileFriendly ? "ok" : "error",
      detail: pageSpeed.isMobileFriendly
        ? "Le site est compatible mobile (viewport configure)."
        : "Le site n'a pas de viewport meta tag configure.",
      recommendation: pageSpeed.isMobileFriendly
        ? undefined
        : "Ajouter une balise <meta name=\"viewport\"> et adopter un design responsive.",
    });
  }

  // Image alt tags
  if (crawl && crawl.imagesTotal > 0) {
    const pct = Math.round((crawl.imagesWithAlt / crawl.imagesTotal) * 100);
    const altStatus: AuditCheckItem["status"] =
      pct >= 80 ? "ok" : pct >= 50 ? "warn" : "error";
    checks.push({
      label: "Attributs alt des images",
      status: altStatus,
      detail: `${crawl.imagesWithAlt}/${crawl.imagesTotal} images ont un attribut alt (${pct}%).`,
      recommendation:
        altStatus !== "ok"
          ? "Ajouter un attribut alt descriptif a chaque image pour le SEO et l'accessibilite."
          : undefined,
    });
  }

  // --- NEW: Cookie banner / RGPD ---
  if (crawl) {
    checks.push({
      label: "Bandeau cookies / RGPD",
      status: crawl.technicalExtras.hasCookieBanner ? "ok" : "error",
      detail: crawl.technicalExtras.hasCookieBanner
        ? "Un bandeau de consentement cookies a ete detecte."
        : "Aucun bandeau de consentement cookies detecte.",
      recommendation: crawl.technicalExtras.hasCookieBanner
        ? undefined
        : "Installer un bandeau RGPD (Axeptio, Tarteaucitron ou CookieBot) pour la conformite legale. Risque d'amende jusqu'a 4% du CA.",
    });
  }

  // --- NEW: Sitemap ---
  if (crawl) {
    checks.push({
      label: "Sitemap XML",
      status: crawl.technicalExtras.hasSitemap ? "ok" : "warn",
      detail: crawl.technicalExtras.hasSitemap
        ? "Un fichier sitemap.xml est present."
        : "Aucun sitemap.xml detecte.",
      recommendation: crawl.technicalExtras.hasSitemap
        ? undefined
        : "Creer et soumettre un sitemap.xml dans la Google Search Console pour ameliorer l'indexation.",
    });
  }

  // --- NEW: Google Analytics / GTM ---
  if (crawl) {
    const hasTracking = crawl.technicalExtras.hasGoogleAnalytics || crawl.technicalExtras.hasGoogleTagManager;
    checks.push({
      label: "Tracking & Analytics",
      status: hasTracking ? "ok" : "error",
      detail: hasTracking
        ? `Tracking detecte : ${[
            crawl.technicalExtras.hasGoogleAnalytics && "Google Analytics",
            crawl.technicalExtras.hasGoogleTagManager && "Google Tag Manager",
          ].filter(Boolean).join(", ")}.`
        : "Aucun outil de tracking detecte (Google Analytics, GTM).",
      recommendation: hasTracking
        ? undefined
        : "Installer Google Analytics 4 et Google Tag Manager pour mesurer votre trafic et vos conversions. Sans tracking, vous naviguez a l'aveugle.",
    });
  }

  return checks;
}

// ---------------------------------------------------------------------------
// 4. buildSeoChecks
// ---------------------------------------------------------------------------

export function buildSeoChecks(crawl: CrawlResult | null): AuditCheckItem[] {
  const checks: AuditCheckItem[] = [];

  if (!crawl) return checks;

  // Title length
  const titleLen = crawl.title.length;
  const titleStatus: AuditCheckItem["status"] =
    titleLen >= 30 && titleLen <= 65
      ? "ok"
      : titleLen > 0
        ? "warn"
        : "error";
  checks.push({
    label: "Balise title",
    status: titleStatus,
    detail:
      titleLen === 0
        ? "Aucune balise title detectee."
        : `Title : ${titleLen} caracteres (ideal : 30-65).`,
    recommendation:
      titleStatus !== "ok"
        ? "Rediger un title entre 30 et 65 caracteres incluant votre activite et votre ville."
        : undefined,
  });

  // Meta description length
  const descLen = crawl.metaDescription.length;
  const descStatus: AuditCheckItem["status"] =
    descLen >= 120 && descLen <= 160
      ? "ok"
      : descLen > 0
        ? "warn"
        : "error";
  checks.push({
    label: "Meta description",
    status: descStatus,
    detail:
      descLen === 0
        ? "Aucune meta description detectee."
        : `Meta description : ${descLen} caracteres (ideal : 120-160).`,
    recommendation:
      descStatus !== "ok"
        ? "Rediger une meta description entre 120 et 160 caracteres avec vos mots-cles principaux."
        : undefined,
  });

  // H1 count
  const h1Count = crawl.h1.length;
  const h1Status: AuditCheckItem["status"] =
    h1Count === 1 ? "ok" : h1Count === 0 ? "error" : "warn";
  checks.push({
    label: "Balise H1",
    status: h1Status,
    detail:
      h1Count === 0
        ? "Aucune balise H1 detectee."
        : h1Count === 1
          ? `1 balise H1 detectee : "${crawl.h1[0]}".`
          : `${h1Count} balises H1 detectees (ideal : 1 seule).`,
    recommendation:
      h1Status !== "ok"
        ? "Utiliser exactement une balise H1 par page, decrivant clairement le contenu principal."
        : undefined,
  });

  // Schema LocalBusiness
  checks.push({
    label: "Schema LocalBusiness",
    status: crawl.hasSchemaLocalBusiness ? "ok" : "error",
    detail: crawl.hasSchemaLocalBusiness
      ? "Balisage Schema.org LocalBusiness/AutoDealer detecte."
      : "Aucun balisage Schema.org LocalBusiness detecte.",
    recommendation: crawl.hasSchemaLocalBusiness
      ? undefined
      : "Ajouter un balisage JSON-LD Schema.org de type AutoDealer avec adresse, horaires et avis.",
  });

  // --- NEW: robots.txt ---
  if (crawl.technicalExtras) {
    checks.push({
      label: "Robots.txt",
      status: crawl.technicalExtras.hasRobotsTxt ? "ok" : "warn",
      detail: crawl.technicalExtras.hasRobotsTxt
        ? "Un fichier robots.txt est present."
        : "Aucun robots.txt detecte.",
      recommendation: crawl.technicalExtras.hasRobotsTxt
        ? undefined
        : "Creer un robots.txt pour guider les moteurs de recherche dans l'exploration de votre site.",
    });
  }

  return checks;
}

// ---------------------------------------------------------------------------
// 5. buildMissingKeywords
// ---------------------------------------------------------------------------

export function buildMissingKeywords(
  city: string,
  crawl: CrawlResult | null,
): string[] {
  if (!crawl) {
    return SERVICE_KEYWORDS.map((kw) => `${kw} ${city.toLowerCase()}`);
  }

  const allCombos = SERVICE_KEYWORDS.map(
    (kw) => `${kw} ${city.toLowerCase()}`,
  );
  return allCombos.filter((combo) => !crawl.foundKeywords.includes(combo));
}

// ---------------------------------------------------------------------------
// 6. computeSubScores
// ---------------------------------------------------------------------------

function statusToScore(status: AuditCheckItem["status"]): number {
  switch (status) {
    case "ok":
      return 100;
    case "warn":
      return 55;
    case "error":
      return 15;
  }
}

function averageCheckScore(checks: AuditCheckItem[]): number {
  if (checks.length === 0) return 0;
  const sum = checks.reduce((acc, c) => acc + statusToScore(c.status), 0);
  return Math.round(sum / checks.length);
}

export function computeSubScores(
  technicalChecks: AuditCheckItem[],
  seoChecks: AuditCheckItem[],
  cityMentions: number,
  missingKeywords: string[],
): { technique: number; seo: number; local: number } {
  const technique = averageCheckScore(technicalChecks);
  const seo = averageCheckScore(seoChecks);

  const totalKeywords = SERVICE_KEYWORDS.length;
  const foundCount = totalKeywords - missingKeywords.length;
  const keywordCoverage = totalKeywords > 0 ? foundCount / totalKeywords : 0;

  let cityScore: number;
  if (cityMentions === 0) cityScore = 0;
  else if (cityMentions <= 3) cityScore = 30;
  else if (cityMentions <= 10) cityScore = 60;
  else cityScore = 100;

  const local = Math.round(cityScore * 0.4 + keywordCoverage * 100 * 0.6);

  return { technique, seo, local };
}

// ---------------------------------------------------------------------------
// 7. buildPriorityActions
// ---------------------------------------------------------------------------

export function buildPriorityActions(
  technicalChecks: AuditCheckItem[],
  seoChecks: AuditCheckItem[],
  missingKeywords: string[],
  cityMentions: number,
): PriorityAction[] {
  const actions: PriorityAction[] = [];

  const allChecks = [...technicalChecks, ...seoChecks];
  const errors = allChecks.filter((c) => c.status === "error");
  const warnings = allChecks.filter((c) => c.status === "warn");
  const issues = [...errors, ...warnings];

  for (const check of issues) {
    if (actions.length >= 3) break;
    if (check.recommendation) {
      actions.push({
        title: check.label,
        description: check.recommendation,
        impact: check.status === "error" ? "high" : "medium",
        difficulty:
          check.label === "HTTPS" || check.label === "Schema LocalBusiness"
            ? "medium"
            : "easy",
      });
    }
  }

  if (actions.length < 3 && missingKeywords.length > 3) {
    actions.push({
      title: "Optimisation SEO local",
      description: `Ajouter des contenus ciblant ${missingKeywords.length} combinaisons service+ville manquantes pour ameliorer le referencement local.`,
      impact: "high",
      difficulty: "medium",
    });
  }

  if (actions.length < 3 && cityMentions < 4) {
    actions.push({
      title: "Mentions geographiques",
      description:
        "Augmenter les mentions de la ville dans le contenu du site pour renforcer la pertinence locale.",
      impact: "medium",
      difficulty: "easy",
    });
  }

  return actions.slice(0, 3);
}

// ---------------------------------------------------------------------------
// NEW: buildTimeLost
// ---------------------------------------------------------------------------

export function buildTimeLost(vehicleCount: number): TimeLostBreakdown {
  const tasks = [
    {
      label: "Diffusion AutoScout24",
      description: `Remplir 50-60 champs par vehicule x ${vehicleCount} vehicules/mois`,
      minutesPerMonth: vehicleCount * 25,
      automatable: true,
    },
    {
      label: "Diffusion multi-plateforme",
      description: "Dupliquer les annonces sur GoCar, LeBonCoin, site web, Facebook Marketplace",
      minutesPerMonth: vehicleCount * 15,
      automatable: true,
    },
    {
      label: "Photos & retouches",
      description: "Shooting, retouche, redimensionnement, upload par vehicule",
      minutesPerMonth: vehicleCount * 12,
      automatable: true,
    },
    {
      label: "Reseaux sociaux",
      description: "Creation de posts, stories, reels (4x/semaine minimum)",
      minutesPerMonth: 16 * 30, // 16 posts/month x 30 min
      automatable: true,
    },
    {
      label: "Reponses aux avis Google",
      description: "Rediger des reponses personnalisees aux avis clients",
      minutesPerMonth: 10 * 15, // 10 avis/month x 15 min
      automatable: true,
    },
    {
      label: "Emails & demandes clients",
      description: "Repondre aux demandes d'information, devis, disponibilite",
      minutesPerMonth: 20 * 60, // ~1h/jour ouvrable
      automatable: true,
    },
    {
      label: "Appels telephoniques",
      description: "Gestion des appels entrants, rappels, prises de RDV",
      minutesPerMonth: 20 * 45, // ~45min/jour
      automatable: false,
    },
    {
      label: "Mise a jour du site web",
      description: "Ajout/retrait de vehicules, mise a jour des prix et statuts",
      minutesPerMonth: vehicleCount * 8,
      automatable: true,
    },
  ];

  const totalMinutes = tasks.reduce((sum, t) => sum + t.minutesPerMonth, 0);
  const totalHoursPerMonth = Math.round(totalMinutes / 60);
  const automatableMinutes = tasks
    .filter((t) => t.automatable)
    .reduce((sum, t) => sum + t.minutesPerMonth, 0);
  const totalCostPerMonth = Math.round((automatableMinutes / 60) * HOURLY_RATE_EUR);
  const totalCostPerYear = totalCostPerMonth * 12;

  return {
    vehicleCount,
    tasks,
    totalHoursPerMonth,
    totalCostPerMonth,
    totalCostPerYear,
  };
}

// ---------------------------------------------------------------------------
// NEW: buildLeadsLost
// ---------------------------------------------------------------------------

export function buildLeadsLost(
  pageSpeed: PageSpeedResult | null,
  vehicleCount: number,
): LeadsLostData {
  // Estimate traffic based on vehicle count and site type
  // Typical small dealer: 500-2000 visitors/month
  // Larger dealers: 2000-8000
  const baseVisitors = Math.round(vehicleCount * 25 + 200);
  const estimatedMonthlyVisitors = Math.min(baseVisitors, 10_000);

  // Google research: 53% of mobile users leave if page takes > 3s
  // Bounce rate correlation with load time:
  // <2s: 9%, 2-3s: 24%, 3-5s: 38%, 5-8s: 53%, >8s: 70%
  const loadTimeSeconds = pageSpeed ? pageSpeed.lcpMs / 1000 : 5;

  let estimatedBounceRate: number;
  if (loadTimeSeconds <= 2) estimatedBounceRate = 0.09;
  else if (loadTimeSeconds <= 3) estimatedBounceRate = 0.24;
  else if (loadTimeSeconds <= 5) estimatedBounceRate = 0.38;
  else if (loadTimeSeconds <= 8) estimatedBounceRate = 0.53;
  else estimatedBounceRate = 0.70;

  // Baseline bounce rate for a well-optimized site: ~20%
  const baselineBounce = 0.20;
  const excessBounce = Math.max(estimatedBounceRate - baselineBounce, 0);

  const visitorsLostPerMonth = Math.round(estimatedMonthlyVisitors * excessBounce);

  // Conversion rate: typically 2-3% for automotive
  const conversionRate = 0.025;
  const leadsLostPerMonth = Math.round(visitorsLostPerMonth * conversionRate);

  const revenueLostPerMonth = leadsLostPerMonth * AVG_SALE_VALUE_EUR;

  return {
    estimatedMonthlyVisitors,
    estimatedBounceRate: Math.round(estimatedBounceRate * 100),
    visitorsLostPerMonth,
    leadsLostPerMonth,
    revenueLostPerMonth,
    loadTimeSeconds: Math.round(loadTimeSeconds * 10) / 10,
  };
}

// ---------------------------------------------------------------------------
// 8. scanWebsite — main export
// ---------------------------------------------------------------------------

export async function scanWebsite(
  options: ScanOptions,
): Promise<AuditReportData> {
  const { dealerName, dealerUrl, dealerCity, competitors } = options;

  console.log(`[Marcus] Demarrage du scan pour ${dealerName} (${dealerUrl})`);

  // Run PageSpeed, crawl, and sitemap/robots in parallel
  console.log("[Marcus] Lancement PageSpeed + Crawl + Sitemap/Robots en parallele...");
  const [pageSpeed, crawl, sitemapRobots] = await Promise.all([
    fetchPageSpeed(dealerUrl),
    crawlSite(dealerUrl, dealerCity),
    checkSitemapAndRobots(dealerUrl),
  ]);

  console.log(
    `[Marcus] PageSpeed: ${pageSpeed ? `score ${pageSpeed.score}` : "echec"}`,
  );
  console.log(`[Marcus] Crawl: ${crawl ? "OK" : "echec"}`);
  console.log(`[Marcus] Sitemap: ${sitemapRobots.hasSitemap}, Robots: ${sitemapRobots.hasRobotsTxt}`);

  // Merge sitemap/robots results into crawl extras
  if (crawl) {
    crawl.technicalExtras.hasSitemap = sitemapRobots.hasSitemap;
    crawl.technicalExtras.hasRobotsTxt = sitemapRobots.hasRobotsTxt;
  }

  // Build checks
  const technicalChecks = buildTechnicalChecks(pageSpeed, crawl);
  const seoChecks = buildSeoChecks(crawl);
  const missingKeywords = buildMissingKeywords(dealerCity, crawl);

  console.log(
    `[Marcus] Checks: ${technicalChecks.length} technique, ${seoChecks.length} SEO`,
  );

  // Compute scores
  const subScores = computeSubScores(
    technicalChecks,
    seoChecks,
    crawl?.cityMentions ?? 0,
    missingKeywords,
  );

  const globalScore = Math.round(
    subScores.technique * 0.35 +
      subScores.seo * 0.35 +
      subScores.local * 0.3,
  );

  console.log(
    `[Marcus] Scores — Global: ${globalScore}, Technique: ${subScores.technique}, SEO: ${subScores.seo}, Local: ${subScores.local}`,
  );

  // Priority actions
  const priorityActions = buildPriorityActions(
    technicalChecks,
    seoChecks,
    missingKeywords,
    crawl?.cityMentions ?? 0,
  );

  // Vehicle count
  const vehicleCount = options.vehicleCount ?? crawl?.estimatedVehicleCount ?? 40;
  console.log(`[Marcus] Vehicules estimes: ${vehicleCount}`);

  // Social media
  const socialMedia = crawl?.socialLinks ?? [
    { platform: "facebook" as const, found: false, url: null },
    { platform: "instagram" as const, found: false, url: null },
    { platform: "linkedin" as const, found: false, url: null },
  ];

  // Car brands
  const carBrands = crawl?.carBrands ?? [];
  console.log(`[Marcus] Marques detectees: ${carBrands.length > 0 ? carBrands.join(", ") : "aucune"}`);

  // Google profile
  const googleProfile: GoogleProfileData = {
    rating: options.googleRating ?? null,
    reviewCount: options.googleReviewCount ?? null,
  };

  // Technical extras
  const technicalExtras = crawl?.technicalExtras ?? {
    hasCookieBanner: false,
    hasSitemap: sitemapRobots.hasSitemap,
    hasRobotsTxt: sitemapRobots.hasRobotsTxt,
    hasGoogleAnalytics: false,
    hasGoogleTagManager: false,
    sslValid: false,
  };

  // Time lost calculation
  const timeLost = buildTimeLost(vehicleCount);
  console.log(`[Marcus] Temps perdu estime: ${timeLost.totalHoursPerMonth}h/mois (${timeLost.totalCostPerYear} EUR/an)`);

  // Leads lost calculation
  const leadsLost = buildLeadsLost(pageSpeed, vehicleCount);
  console.log(`[Marcus] Leads perdus: ~${leadsLost.leadsLostPerMonth}/mois (${leadsLost.revenueLostPerMonth} EUR/mois)`);

  // --- Google Maps competitor scraping ---
  console.log(`\n[Marcus] === Scraping concurrents Google Maps ===`);
  const gmapsResults = await scrapeCompetitors(dealerName, dealerCity, carBrands, 15);

  // Convert to CompetitorData for backward compat
  const competitorData: CompetitorData[] = gmapsResults.map(r => ({
    name: r.name,
    googleRating: r.rating,
    googleReviewCount: r.reviewCount,
    pageSpeedScore: null,
    hasLocalBusiness: false,
  }));

  // Also scan manually provided competitors if any
  if (competitors && competitors.length > 0) {
    console.log(`[Marcus] Scan de ${competitors.length} concurrent(s) manuels...`);
    for (const comp of competitors) {
      const compPageSpeed = await fetchPageSpeed(comp.url);
      const compCrawl = await crawlSite(comp.url, dealerCity);
      competitorData.push({
        name: comp.name,
        googleRating: null,
        googleReviewCount: null,
        pageSpeedScore: compPageSpeed?.score ?? null,
        hasLocalBusiness: compCrawl?.hasSchemaLocalBusiness ?? false,
      });
    }
  }

  // Analyze competitor insights
  const insights = analyzeCompetitors(
    gmapsResults,
    googleProfile.rating,
    googleProfile.reviewCount,
    dealerName,
    dealerCity,
  );

  const competitorInsights: CompetitorInsightsData = {
    avgRating: insights.avgRating,
    avgReviews: insights.avgReviews,
    medianReviews: insights.medianReviews,
    bestRated: insights.bestRated ? { name: insights.bestRated.name, rating: insights.bestRated.rating! } : null,
    mostReviewed: insights.mostReviewed ? { name: insights.mostReviewed.name, reviewCount: insights.mostReviewed.reviewCount! } : null,
    prospectRatingRank: insights.prospectRatingRank,
    prospectReviewRank: insights.prospectReviewRank,
    totalAnalyzed: insights.totalAnalyzed,
    competitors: gmapsResults.map(r => ({ name: r.name, rating: r.rating, reviewCount: r.reviewCount })),
    competitorNarrative: insights.competitorNarrative,
  };

  // --- CompanyWeb scraping ---
  console.log(`\n[Marcus] === Scraping CompanyWeb ===`);
  let companyProfile: CompanyProfileData | null = null;
  const cwData = await scrapeCompanyProfile(dealerName, dealerCity);
  if (cwData) {
    companyProfile = {
      companyNumber: cwData.profile.companyNumber,
      legalForm: cwData.profile.legalForm,
      address: cwData.profile.address,
      creationDate: cwData.profile.creationDate,
      revenue: cwData.financials.revenue,
      grossMargin: cwData.financials.grossMargin,
      employees: cwData.financials.employees,
      currentAdmins: cwData.currentAdmins.map(a => ({
        name: a.name,
        role: a.role,
        startDate: a.startDate,
      })),
      historicalAdmins: cwData.historicalAdmins.map(a => ({ name: a.name })),
      companyNarrative: cwData.companyNarrative,
    };

    // Use owner name from CompanyWeb if not provided
    if (!options.ownerName && cwData.currentAdmins.length > 0) {
      options.ownerName = cwData.currentAdmins[0].name;
      console.log(`[Marcus] Gerant detecte via CompanyWeb: ${options.ownerName}`);
    }
  }

  const report: AuditReportData = {
    dealerName,
    dealerUrl,
    dealerCity,
    auditDate: new Date().toISOString().split("T")[0],
    ownerName: options.ownerName ?? null,
    globalScore,
    subScores,
    technicalChecks,
    seoChecks,
    localPresence: {
      cityMentions: crawl?.cityMentions ?? 0,
      serviceMentions: crawl?.serviceMentions ?? [],
      missingKeywords,
    },
    competitors: competitorData,
    priorityActions,
    googleProfile,
    socialMedia,
    carBrands,
    technicalExtras,
    timeLost,
    leadsLost,
    vehicleCount,
    companyProfile,
    competitorInsights,
  };

  console.log(`\n[Marcus] === Scan termine pour ${dealerName} ===`);
  return report;
}
