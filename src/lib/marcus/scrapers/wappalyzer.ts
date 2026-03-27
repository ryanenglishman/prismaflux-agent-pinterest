/**
 * Technology detection via HTML analysis.
 * Detects CMS, analytics, frameworks, etc. from HTML source.
 * We don't use the Wappalyzer API but replicate its signature-based detection.
 */

export interface DetectedTechnology {
  name: string;
  category: string;
  /** confidence: "high" | "medium" — based on how specific the signature is */
  confidence: "high" | "medium";
}

export interface TechnologyProfile {
  technologies: DetectedTechnology[];
  cms: string | null;
  analytics: string[];
  frameworks: string[];
  ecommerce: string | null;
  hosting: string | null;
  /** Human-readable summary */
  summary: string;
}

// Signature database — each entry maps to a regex or string to find in HTML
const SIGNATURES: { name: string; category: string; patterns: (string | RegExp)[]; confidence: "high" | "medium" }[] = [
  // CMS
  { name: "WordPress", category: "CMS", patterns: ["wp-content", "wp-includes", "/wp-json/", "wordpress"], confidence: "high" },
  { name: "Joomla", category: "CMS", patterns: ["/media/jui/", "/components/com_", "joomla"], confidence: "high" },
  { name: "Drupal", category: "CMS", patterns: ["drupal.js", "/sites/default/files", "drupal"], confidence: "high" },
  { name: "Wix", category: "CMS", patterns: ["wix.com", "_wix_browser_sess", "wixstatic.com"], confidence: "high" },
  { name: "Squarespace", category: "CMS", patterns: ["squarespace.com", "static1.squarespace.com"], confidence: "high" },
  { name: "Webflow", category: "CMS", patterns: ["webflow.com", "assets.website-files.com"], confidence: "high" },
  { name: "Shopify", category: "CMS/E-commerce", patterns: ["cdn.shopify.com", "shopify.com", "myshopify"], confidence: "high" },
  { name: "PrestaShop", category: "CMS/E-commerce", patterns: ["prestashop", "/modules/ps_", "/themes/classic/"], confidence: "high" },
  { name: "WooCommerce", category: "E-commerce", patterns: ["woocommerce", "wc-ajax", "/wp-content/plugins/woocommerce"], confidence: "high" },
  { name: "TYPO3", category: "CMS", patterns: ["typo3", "/typo3conf/", "/typo3temp/"], confidence: "high" },
  { name: "Weebly", category: "CMS", patterns: ["weebly.com", "cdn2.editmysite.com"], confidence: "high" },
  { name: "Ghost", category: "CMS", patterns: ["ghost.org", "ghost-api"], confidence: "high" },
  { name: "Jimdo", category: "CMS", patterns: ["jimdo.com", "jimstatic.com"], confidence: "high" },
  { name: "Odoo", category: "CMS/ERP", patterns: ["odoo.com", "/web/static/", "odoo"], confidence: "high" },
  { name: "Hugo", category: "Static Gen", patterns: [/generator.*hugo/i, "gohugo.io"], confidence: "medium" },
  { name: "Next.js", category: "Framework", patterns: ["_next/static", "__NEXT_DATA__", "next/head"], confidence: "high" },
  { name: "Gatsby", category: "Framework", patterns: ["gatsby-", "__gatsby"], confidence: "high" },
  { name: "Nuxt.js", category: "Framework", patterns: ["_nuxt/", "__nuxt"], confidence: "high" },

  // Analytics
  { name: "Google Analytics 4", category: "Analytics", patterns: ["gtag(", "G-", "googletagmanager.com/gtag"], confidence: "high" },
  { name: "Google Analytics (UA)", category: "Analytics", patterns: ["UA-", "analytics.js", "google-analytics.com/analytics"], confidence: "high" },
  { name: "Google Tag Manager", category: "Tag Manager", patterns: ["googletagmanager.com/gtm", "GTM-"], confidence: "high" },
  { name: "Facebook Pixel", category: "Analytics", patterns: ["fbq(", "facebook.com/tr", "connect.facebook.net/en_US/fbevents"], confidence: "high" },
  { name: "Hotjar", category: "Analytics", patterns: ["hotjar.com", "hj(", "_hjSettings"], confidence: "high" },
  { name: "Matomo", category: "Analytics", patterns: ["matomo.js", "piwik.js", "_paq.push"], confidence: "high" },

  // Frameworks / Libraries
  { name: "jQuery", category: "JS Library", patterns: ["jquery.min.js", "jquery-", "jQuery"], confidence: "medium" },
  { name: "Bootstrap", category: "CSS Framework", patterns: ["bootstrap.min.css", "bootstrap.min.js", "bootstrap.bundle"], confidence: "high" },
  { name: "Tailwind CSS", category: "CSS Framework", patterns: ["tailwindcss", "tailwind.min.css"], confidence: "medium" },
  { name: "React", category: "Framework", patterns: ["react.production.min", "__REACT_DEVTOOLS", "react-dom"], confidence: "medium" },
  { name: "Vue.js", category: "Framework", patterns: ["vue.min.js", "vue.js", "__VUE__"], confidence: "medium" },
  { name: "Angular", category: "Framework", patterns: ["ng-version", "angular.min.js", "ng-app"], confidence: "high" },

  // Cookie/GDPR
  { name: "Axeptio", category: "Cookie Consent", patterns: ["axeptio", "axept.io"], confidence: "high" },
  { name: "Tarteaucitron", category: "Cookie Consent", patterns: ["tarteaucitron"], confidence: "high" },
  { name: "CookieBot", category: "Cookie Consent", patterns: ["cookiebot", "consent.cookiebot.com"], confidence: "high" },
  { name: "OneTrust", category: "Cookie Consent", patterns: ["onetrust", "optanon"], confidence: "high" },
  { name: "CookieYes", category: "Cookie Consent", patterns: ["cookieyes", "cky-consent"], confidence: "high" },
  { name: "Iubenda", category: "Cookie Consent", patterns: ["iubenda"], confidence: "high" },
  { name: "Didomi", category: "Cookie Consent", patterns: ["didomi"], confidence: "high" },

  // Hosting clues
  { name: "Cloudflare", category: "CDN/Hosting", patterns: ["cloudflare", "cf-ray", "cdnjs.cloudflare.com"], confidence: "medium" },
  { name: "OVH", category: "Hosting", patterns: ["ovh.net", "ovh.com"], confidence: "medium" },
  { name: "Netlify", category: "Hosting", patterns: ["netlify", ".netlify.app"], confidence: "high" },
  { name: "Vercel", category: "Hosting", patterns: ["vercel", ".vercel.app", "_vercel"], confidence: "high" },

  // Chat / CRM
  { name: "Intercom", category: "Chat", patterns: ["intercom.io", "intercomSettings"], confidence: "high" },
  { name: "Crisp", category: "Chat", patterns: ["crisp.chat", "CRISP_WEBSITE_ID"], confidence: "high" },
  { name: "Tawk.to", category: "Chat", patterns: ["tawk.to", "Tawk_API"], confidence: "high" },
  { name: "HubSpot", category: "CRM/Marketing", patterns: ["hubspot.com", "hs-scripts.com", "hbspt"], confidence: "high" },
  { name: "Mailchimp", category: "Marketing", patterns: ["mailchimp.com", "mc.js", "chimpstatic.com"], confidence: "high" },
];

/**
 * Detect technologies from raw HTML source code.
 */
export function detectTechnologies(html: string): TechnologyProfile {
  const htmlLower = html.toLowerCase();
  const found: DetectedTechnology[] = [];

  for (const sig of SIGNATURES) {
    const detected = sig.patterns.some(p => {
      if (typeof p === "string") return htmlLower.includes(p.toLowerCase());
      return p.test(html);
    });
    if (detected) {
      // Avoid duplicates
      if (!found.some(f => f.name === sig.name)) {
        found.push({ name: sig.name, category: sig.category, confidence: sig.confidence });
      }
    }
  }

  // Extract key categories
  const cms = found.find(t => t.category.includes("CMS"))?.name ?? null;
  const analytics = found.filter(t => t.category === "Analytics" || t.category === "Tag Manager").map(t => t.name);
  const frameworks = found.filter(t => t.category === "Framework" || t.category === "CSS Framework" || t.category === "JS Library" || t.category === "Static Gen").map(t => t.name);
  const ecommerce = found.find(t => t.category.includes("E-commerce"))?.name ?? null;
  const hosting = found.find(t => t.category.includes("Hosting") || t.category.includes("CDN"))?.name ?? null;

  // Generate summary
  const parts: string[] = [];
  if (cms) parts.push(`Le site est construit avec ${cms}`);
  else parts.push("Le CMS utilise n'a pas pu etre identifie (possiblement un site sur mesure)");

  if (analytics.length > 0) parts.push(`Les outils de tracking detectes sont : ${analytics.join(", ")}`);
  else parts.push("Aucun outil d'analyse de trafic n'a ete detecte");

  if (frameworks.length > 0) parts.push(`Technologies frontend : ${frameworks.join(", ")}`);

  if (ecommerce) parts.push(`Solution e-commerce : ${ecommerce}`);

  const cookieTools = found.filter(t => t.category === "Cookie Consent");
  if (cookieTools.length > 0) parts.push(`Bandeau cookies : ${cookieTools[0].name}`);

  const chatTools = found.filter(t => t.category === "Chat" || t.category === "CRM/Marketing");
  if (chatTools.length > 0) parts.push(`Outils de communication : ${chatTools.map(t => t.name).join(", ")}`);

  if (hosting) parts.push(`Hebergement/CDN : ${hosting}`);

  return {
    technologies: found,
    cms,
    analytics,
    frameworks,
    ecommerce,
    hosting,
    summary: parts.join(". ") + ".",
  };
}
