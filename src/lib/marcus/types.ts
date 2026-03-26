export interface AuditCheckItem {
  label: string;
  status: "ok" | "warn" | "error";
  detail: string;
  recommendation?: string;
}

export interface CompetitorData {
  name: string;
  googleRating: number | null;
  googleReviewCount: number | null;
  pageSpeedScore: number | null;
  hasLocalBusiness: boolean;
}

export interface PriorityAction {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
}

// ---------------------------------------------------------------------------
// New: Social media presence
// ---------------------------------------------------------------------------

export interface SocialMediaProfile {
  platform: "facebook" | "instagram" | "linkedin";
  found: boolean;
  url: string | null;
}

// ---------------------------------------------------------------------------
// New: Google Business Profile
// ---------------------------------------------------------------------------

export interface GoogleProfileData {
  rating: number | null;
  reviewCount: number | null;
}

// ---------------------------------------------------------------------------
// New: Time cost calculation
// ---------------------------------------------------------------------------

export interface TimeLostBreakdown {
  /** Estimated vehicles in stock */
  vehicleCount: number;
  /** Time per task in minutes/month */
  tasks: {
    label: string;
    description: string;
    minutesPerMonth: number;
    automatable: boolean;
  }[];
  /** Total hours lost per month */
  totalHoursPerMonth: number;
  /** Cost at average hourly rate */
  totalCostPerMonth: number;
  /** Annual projection */
  totalCostPerYear: number;
}

// ---------------------------------------------------------------------------
// New: Leads lost estimation
// ---------------------------------------------------------------------------

export interface LeadsLostData {
  /** Estimated monthly visitors */
  estimatedMonthlyVisitors: number;
  /** Bounce rate based on load time */
  estimatedBounceRate: number;
  /** Visitors lost per month due to slow site */
  visitorsLostPerMonth: number;
  /** Estimated leads lost (conversion rate applied) */
  leadsLostPerMonth: number;
  /** Revenue impact per month */
  revenueLostPerMonth: number;
  /** Load time in seconds */
  loadTimeSeconds: number;
}

// ---------------------------------------------------------------------------
// New: Technical extras
// ---------------------------------------------------------------------------

export interface TechnicalExtras {
  hasCookieBanner: boolean;
  hasSitemap: boolean;
  hasRobotsTxt: boolean;
  hasGoogleAnalytics: boolean;
  hasGoogleTagManager: boolean;
  sslValid: boolean;
}

// ---------------------------------------------------------------------------
// Main report data
// ---------------------------------------------------------------------------

export interface AuditReportData {
  dealerName: string;
  dealerUrl: string;
  dealerCity: string;
  auditDate: string;
  /** Owner/manager name if found */
  ownerName: string | null;
  globalScore: number;
  subScores: {
    technique: number;
    seo: number;
    local: number;
  };
  technicalChecks: AuditCheckItem[];
  seoChecks: AuditCheckItem[];
  localPresence: {
    cityMentions: number;
    serviceMentions: string[];
    missingKeywords: string[];
  };
  competitors: CompetitorData[];
  priorityActions: PriorityAction[];

  // --- New enriched data ---
  googleProfile: GoogleProfileData;
  socialMedia: SocialMediaProfile[];
  carBrands: string[];
  technicalExtras: TechnicalExtras;
  timeLost: TimeLostBreakdown;
  leadsLost: LeadsLostData;
  /** Estimated vehicle count (from site or manual) */
  vehicleCount: number;

  // --- Company profile (CompanyWeb) ---
  companyProfile: CompanyProfileData | null;

  // --- Competitor insights (Google Maps scraping) ---
  competitorInsights: CompetitorInsightsData | null;
}

// ---------------------------------------------------------------------------
// Company profile from CompanyWeb
// ---------------------------------------------------------------------------

export interface CompanyProfileData {
  companyNumber: string;
  legalForm: string | null;
  address: string | null;
  creationDate: string | null;
  revenue: number | null;
  grossMargin: number | null;
  employees: number | null;
  currentAdmins: { name: string; role: string | null; startDate: string | null }[];
  historicalAdmins: { name: string }[];
  /** Full narrative text about the company */
  companyNarrative: string;
}

// ---------------------------------------------------------------------------
// Competitor insights from Google Maps
// ---------------------------------------------------------------------------

export interface CompetitorInsightsData {
  avgRating: number;
  avgReviews: number;
  medianReviews: number;
  bestRated: { name: string; rating: number } | null;
  mostReviewed: { name: string; reviewCount: number } | null;
  prospectRatingRank: number | null;
  prospectReviewRank: number | null;
  totalAnalyzed: number;
  competitors: { name: string; rating: number | null; reviewCount: number | null }[];
  /** Narrative text about competitive positioning */
  competitorNarrative: string;
}
