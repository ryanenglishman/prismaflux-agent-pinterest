"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthStatus {
  connected: boolean;
  username?: string | null;
  daysUntilExpiry?: number;
  needsReauth?: boolean;
  refreshExpired?: boolean;
}

interface PinterestBoard {
  id: string;
  name: string;
  description: string;
  pinCount: number;
}

interface ScheduledPost {
  id: string;
  name: string;
  boardId: string;
  boardName: string;
  boardIds?: string[];
  boardNames?: string[];
  cronExpression: string;
  timezone: string;
  enabled: boolean;
  theme: string | null;
  customInstructions: string | null;
  link: string;
  lastRunAt: string | null;
  lastRunStatus: "success" | "error" | null;
  lastRunError: string | null;
  lastPinId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PipelineResult {
  success: boolean;
  prompt?: { imagePrompt: string; theme: string; style: string };
  content?: { title: string; description: string; altText: string };
  linkedin?: { post: string };
  pin?: { pinId: string; createdAt: string };
  pins?: { pinId: string; createdAt: string }[];
  imageBase64?: string;
  error?: string;
  durationMs: number;
  postName?: string;
}

interface PreviewData {
  id: string;
  postId: string;
  prompt: { imagePrompt: string; theme: string; style: string };
  content: { title: string; description: string; altText: string };
  linkedin?: { post: string };
  imageBase64: string;
  imageContentType: string;
  status: "pending" | "approved" | "rejected" | "published";
  scheduledFor: string;
  scheduledHour: number;
  scheduledMinute: number;
  createdAt: string;
  variantIndex?: number;
  variantTotal?: number;
}

interface SavedPrompt {
  id: string;
  imagePrompt: string;
  theme: string;
  style: string;
  title: string;
  description: string;
  performance: "unknown" | "low" | "medium" | "high";
  usedCount: number;
  pinId?: string;
  impressions?: number;
  saves?: number;
  clicks?: number;
  createdAt: string;
  updatedAt: string;
}

interface PinAnalytics {
  pinId: string;
  impressions: number;
  saves: number;
  clicks: number;
  comments: number;
  date: string;
}

interface TimeSuggestion {
  hour: number;
  minute: number;
  score: number;
  reason: string;
  source: string;
}

interface SocialExport {
  linkedin: string;
  instagram: string;
  facebook: string;
}

interface PostForm {
  name: string;
  boardIds: string[];
  boardNames: string[];
  cronExpression: string;
  theme: string;
  customInstructions: string;
  link: string;
  promptStyle: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const THEMES = [
  "Concession automobile futuriste avec technologie IA",
  "Tableau de bord digital de performance et rotation des stocks",
  "Intelligence artificielle au service des concessionnaires",
  "Vente automobile acceleree par la data et l'automatisation",
  "Transformation digitale du marche automobile",
  "Croissance et scaling d'une concession grace a l'IA",
  "Optimisation du temps pour les professionnels de l'automobile",
  "PrismaFlux - lumiere, prismes et innovation automobile",
  "Multidiffusion automatique d'annonces sur toutes les plateformes auto",
  "Retouche photo IA et studio visuel pour vehicules d'occasion",
  "Analyse de performance web et SEO local pour concessions automobiles",
  "Audit gratuit de site web pour professionnels de l'automobile",
  "Reporting dirigeant et reputation en ligne pour concessionnaires",
  "Gestion intelligente du stock et acceleration de la rotation vehicules",
];

const PROMPT_STYLES = [
  "PrismaFlux",
  "Storytelling",
  "Expert",
  "Humour",
  "Urgence/FOMO",
  "Inspirant",
  "Educatif",
  "Provoquant/Challenger",
];

const SCHEDULE_OPTIONS = [
  { label: "Tous les jours a 10h", value: "0 8 * * *" },
  { label: "Tous les jours a 12h", value: "0 10 * * *" },
  { label: "Tous les jours a 14h", value: "0 12 * * *" },
  { label: "Tous les jours a 16h", value: "0 14 * * *" },
  { label: "Tous les jours a 18h", value: "0 16 * * *" },
  { label: "Tous les jours a 20h", value: "0 18 * * *" },
  { label: "Lundi au vendredi a 10h", value: "0 8 * * 1-5" },
  { label: "Lundi au vendredi a 18h", value: "0 16 * * 1-5" },
  { label: "Lundi, mercredi, vendredi a 14h", value: "0 12 * * 1,3,5" },
  { label: "Toutes les 6 heures", value: "0 */6 * * *" },
  { label: "Toutes les 12 heures", value: "0 */12 * * *" },
];

const TAB_LIST = [
  { key: "publications", label: "Publications" },
  { key: "calendrier", label: "Calendrier" },
  { key: "prompts", label: "Prompts" },
  { key: "perdus", label: "Perdus" },
  { key: "test", label: "Test" },
] as const;

type TabKey = (typeof TAB_LIST)[number]["key"];

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAYS_FR_FULL = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

const EMPTY_FORM: PostForm = {
  name: "",
  boardIds: [],
  boardNames: [],
  cronExpression: "0 16 * * *",
  theme: "",
  customInstructions: "",
  link: "https://auto-prismaflux.com",
  promptStyle: "PrismaFlux",
};

// ---------------------------------------------------------------------------
// Theme Colors
// ---------------------------------------------------------------------------

interface ThemeColors {
  bg: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
}

const DARK_COLORS: ThemeColors = {
  bg: "#0a0a0f",
  card: "#18181b",
  border: "#27272a",
  text: "#e4e4e7",
  muted: "#71717a",
  accent: "#e63232",
};

const LIGHT_COLORS: ThemeColors = {
  bg: "#f4f4f5",
  card: "#ffffff",
  border: "#e4e4e7",
  text: "#18181b",
  muted: "#a1a1aa",
  accent: "#e63232",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cronToHuman(cron: string): string {
  const match = SCHEDULE_OPTIONS.find((o) => o.value === cron);
  if (match) return match.label;
  return cron;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "a l'instant";
  if (minutes < 60) return `il y a ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

function getWeekDays(weeksAhead: number): Date[] {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset + weeksAhead * 7);
  monday.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateShort(d: Date): string {
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function padTime(n: number): string {
  return n.toString().padStart(2, "0");
}

function timeUntil(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "imminent";
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}j`;
}

const statusColors: Record<string, string> = {
  pending: "#e63232",
  approved: "#22c55e",
  rejected: "#ef4444",
  published: "#3b82f6",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  approved: "Approuve",
  rejected: "Rejete",
  published: "Publie",
};

const perfColors: Record<string, string> = {
  unknown: "#71717a",
  low: "#ef4444",
  medium: "#e63232",
  high: "#22c55e",
};

const perfLabels: Record<string, string> = {
  unknown: "Inconnu",
  low: "Faible",
  medium: "Moyen",
  high: "Eleve",
};

// ---------------------------------------------------------------------------
// Hook: useIsMobile
// ---------------------------------------------------------------------------

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function Dashboard() {
  const isMobile = useIsMobile();

  // Theme
  const [dark, setDark] = useState(true);
  const colors = dark ? DARK_COLORS : LIGHT_COLORS;

  // Tab
  const [activeTab, setActiveTab] = useState<TabKey>("publications");

  // Auth
  const [auth, setAuth] = useState<AuthStatus | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Posts
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Boards
  const [boards, setBoards] = useState<PinterestBoard[]>([]);
  const [boardsLoaded, setBoardsLoaded] = useState(false);

  // Form
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>({ ...EMPTY_FORM });
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Running / deleting
  const [runningId, setRunningId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Run result (inline per post)
  const [runResult, setRunResult] = useState<{
    postId: string;
    result: PipelineResult;
  } | null>(null);

  // Test
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<PipelineResult | null>(null);

  // Confirm delete
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Previews
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [previewsLoading, setPreviewsLoading] = useState(false);

  // Preview modal
  const [previewModalData, setPreviewModalData] = useState<PreviewData | null>(
    null,
  );
  const [previewModalVariants, setPreviewModalVariants] = useState<
    PreviewData[]
  >([]);
  const [previewVariantTab, setPreviewVariantTab] = useState(0);
  const [previewActionLoading, setPreviewActionLoading] = useState(false);

  // Batch
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchBoardId, setBatchBoardId] = useState("");
  const [batchResult, setBatchResult] = useState<string | null>(null);

  // Prompts
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [promptsLoading, setPromptsLoading] = useState(false);
  const [promptsOpen, setPromptsOpen] = useState(true);
  const [deletingPromptId, setDeletingPromptId] = useState<string | null>(null);

  // Analytics cache per pinId
  const [analyticsCache, setAnalyticsCache] = useState<
    Record<string, PinAnalytics>
  >({});

  // Calendar week offset (0 = this week, 1 = next week)
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);

  // KPI expanded
  const [kpiExpanded, setKpiExpanded] = useState(false);

  // Suggestion banner
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Export modal
  const [exportData, setExportData] = useState<SocialExport | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportCopied, setExportCopied] = useState<string | null>(null);

  // Rapid approval mode (calendrier)
  const [rapidMode, setRapidMode] = useState(false);
  const [rapidIndex, setRapidIndex] = useState(0);

  // -------------------------------------------------------------------------
  // Fetch Auth
  // -------------------------------------------------------------------------

  const fetchAuth = useCallback(async () => {
    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/pinterest/status");
      const data = await res.json();
      setAuth(data);
    } catch {
      setAuth({ connected: false });
    }
    setAuthLoading(false);
  }, []);

  // -------------------------------------------------------------------------
  // Fetch Posts
  // -------------------------------------------------------------------------

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    }
    setPostsLoading(false);
  }, []);

  // -------------------------------------------------------------------------
  // Fetch Boards
  // -------------------------------------------------------------------------

  const fetchBoards = useCallback(async () => {
    if (boardsLoaded && boards.length > 0) return;
    setBoardsLoaded(false);
    try {
      const res = await fetch("/api/marketing/pinterest/boards");
      if (res.ok) {
        const data = await res.json();
        setBoards(data.boards || []);
      } else {
        const data = await res.json().catch(() => ({}));
        console.warn("Board fetch error:", data.error || res.status);
      }
    } catch (err) {
      console.warn("Board fetch failed:", err);
    }
    setBoardsLoaded(true);
  }, [boardsLoaded, boards.length]);

  // -------------------------------------------------------------------------
  // Fetch Previews
  // -------------------------------------------------------------------------

  const fetchPreviews = useCallback(async () => {
    setPreviewsLoading(true);
    try {
      const res = await fetch("/api/previews");
      if (res.ok) {
        const data = await res.json();
        setPreviews(data.previews || []);
      }
    } catch {
      /* silent */
    }
    setPreviewsLoading(false);
  }, []);

  // -------------------------------------------------------------------------
  // Fetch Prompts
  // -------------------------------------------------------------------------

  const fetchPrompts = useCallback(async () => {
    setPromptsLoading(true);
    try {
      const res = await fetch("/api/prompts");
      if (res.ok) {
        const data = await res.json();
        setPrompts(data.prompts || []);
      }
    } catch {
      /* silent */
    }
    setPromptsLoading(false);
  }, []);

  // -------------------------------------------------------------------------
  // Fetch Analytics for a pinId
  // -------------------------------------------------------------------------

  const fetchAnalytics = useCallback(
    async (pinId: string) => {
      if (analyticsCache[pinId]) return;
      try {
        const res = await fetch(
          `/api/analytics?pinId=${encodeURIComponent(pinId)}`,
        );
        if (res.ok) {
          const data = await res.json();
          setAnalyticsCache((prev) => ({ ...prev, [pinId]: data }));
        }
      } catch {
        /* silent */
      }
    },
    [analyticsCache],
  );

  // -------------------------------------------------------------------------
  // Fetch Suggestion
  // -------------------------------------------------------------------------

  const fetchSuggestion = useCallback(async () => {
    try {
      const day = new Date().getDay();
      const res = await fetch(`/api/suggestions?day=${day}`);
      if (res.ok) {
        const data = await res.json();
        if (data.recommendation) {
          const dayName = DAYS_FR_FULL[new Date().getDay()];
          const rec = data.recommendation;
          const best = data.suggestions?.[0] as TimeSuggestion | undefined;
          if (best) {
            setSuggestion(
              `Creneau recommande pour ${dayName} : ${padTime(best.hour)}h${padTime(best.minute)} (score ${best.score}/100). ${rec}`,
            );
          } else {
            setSuggestion(rec);
          }
        }
      }
    } catch {
      /* silent */
    }
  }, []);

  // -------------------------------------------------------------------------
  // Mount
  // -------------------------------------------------------------------------

  useEffect(() => {
    fetchAuth();
    fetchPosts();
    fetchPreviews();
    fetchSuggestion();
  }, [fetchAuth, fetchPosts, fetchPreviews, fetchSuggestion]);

  // Fetch boards when form opens and connected
  useEffect(() => {
    if (formOpen && auth?.connected && !boardsLoaded) {
      fetchBoards();
    }
  }, [formOpen, auth, boardsLoaded, fetchBoards]);

  // Fetch previews and prompts based on tab
  useEffect(() => {
    if (activeTab === "calendrier") {
      fetchPreviews();
    }
    if (activeTab === "prompts") {
      fetchPrompts();
    }
    if (activeTab === "perdus") {
      fetchPreviews();
    }
  }, [activeTab, fetchPreviews, fetchPrompts]);

  // Fetch boards for batch mode on calendrier tab
  useEffect(() => {
    if (activeTab === "calendrier" && auth?.connected && !boardsLoaded) {
      fetchBoards();
    }
  }, [activeTab, auth, boardsLoaded, fetchBoards]);

  // Fetch analytics for posts with lastPinId
  useEffect(() => {
    posts.forEach((p) => {
      if (p.lastPinId && !analyticsCache[p.lastPinId]) {
        fetchAnalytics(p.lastPinId);
      }
    });
  }, [posts, analyticsCache, fetchAnalytics]);

  // -------------------------------------------------------------------------
  // KPI Computed
  // -------------------------------------------------------------------------

  const kpiData = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const postsThisWeek = posts.filter((p) => {
      if (!p.lastRunAt) return false;
      return new Date(p.lastRunAt) >= startOfWeek;
    }).length;

    const totalWithRun = posts.filter((p) => p.lastRunStatus !== null).length;
    const successCount = posts.filter(
      (p) => p.lastRunStatus === "success",
    ).length;
    const successRate =
      totalWithRun > 0 ? Math.round((successCount / totalWithRun) * 100) : 0;

    // Next scheduled post: find earliest approved preview in the future
    const futurePreviews = previews
      .filter(
        (p) =>
          (p.status === "approved" || p.status === "pending") &&
          new Date(p.scheduledFor).getTime() > Date.now(),
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledFor).getTime() -
          new Date(b.scheduledFor).getTime(),
      );
    const nextPost = futurePreviews[0] || null;

    const pendingCount = previews.filter(
      (p) => p.status === "pending",
    ).length;

    return { postsThisWeek, successRate, nextPost, pendingCount };
  }, [posts, previews]);

  // -------------------------------------------------------------------------
  // "Post du jour" — today's pending preview
  // -------------------------------------------------------------------------

  const todayPreview = useMemo(() => {
    const today = new Date();
    return (
      previews.find(
        (p) =>
          p.status === "pending" &&
          isSameDay(new Date(p.scheduledFor), today),
      ) || null
    );
  }, [previews]);

  // -------------------------------------------------------------------------
  // Rejected previews (Perdus tab)
  // -------------------------------------------------------------------------

  const rejectedPreviews = useMemo(
    () => previews.filter((p) => p.status === "rejected"),
    [previews],
  );

  // -------------------------------------------------------------------------
  // Rapid mode previews (pending/approved in calendar range)
  // -------------------------------------------------------------------------

  const rapidPreviews = useMemo(
    () => previews.filter((p) => p.status === "pending"),
    [previews],
  );

  // -------------------------------------------------------------------------
  // Handlers -- Posts
  // -------------------------------------------------------------------------

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError(null);
    setFormOpen(true);
  }

  function openEditForm(post: ScheduledPost) {
    setEditingId(post.id);
    setForm({
      name: post.name,
      boardIds: post.boardIds || [post.boardId],
      boardNames: post.boardNames || [post.boardName],
      cronExpression: post.cronExpression,
      theme: post.theme || "",
      customInstructions: post.customInstructions || "",
      link: post.link,
      promptStyle: "PrismaFlux",
    });
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setFormError(null);
  }

  function toggleBoardInForm(board: PinterestBoard) {
    const idx = form.boardIds.indexOf(board.id);
    if (idx >= 0) {
      setForm({
        ...form,
        boardIds: form.boardIds.filter((_, i) => i !== idx),
        boardNames: form.boardNames.filter((_, i) => i !== idx),
      });
    } else {
      setForm({
        ...form,
        boardIds: [...form.boardIds, board.id],
        boardNames: [...form.boardNames, board.name],
      });
    }
  }

  async function saveForm() {
    if (!form.name.trim()) {
      setFormError("Le nom est requis");
      return;
    }
    if (form.boardIds.length === 0) {
      setFormError("Selectionnez au moins un tableau");
      return;
    }

    setFormSaving(true);
    setFormError(null);

    try {
      const body = {
        name: form.name.trim(),
        boardId: form.boardIds[0],
        boardName: form.boardNames[0],
        boardIds: form.boardIds,
        boardNames: form.boardNames,
        cronExpression: form.cronExpression,
        theme: form.theme || null,
        customInstructions: form.customInstructions.trim() || null,
        link: form.link.trim() || "https://auto-prismaflux.com",
        promptStyle: form.promptStyle,
      };

      let res: Response;
      if (editingId) {
        res = await fetch(`/api/posts/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de la sauvegarde");
      }

      await fetchPosts();
      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    }
    setFormSaving(false);
  }

  async function togglePost(post: ScheduledPost) {
    setTogglingId(post.id);
    try {
      await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !post.enabled }),
      });
      await fetchPosts();
    } catch {
      /* silent */
    }
    setTogglingId(null);
  }

  async function deletePost(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      await fetchPosts();
      if (confirmDeleteId === id) setConfirmDeleteId(null);
    } catch {
      /* silent */
    }
    setDeletingId(null);
  }

  async function runPost(id: string) {
    setRunningId(id);
    setRunResult(null);
    try {
      const res = await fetch(`/api/posts/${id}/run`, { method: "POST" });
      const data = await res.json();
      setRunResult({ postId: id, result: data });
      await fetchPosts();
      if (data.success && data.imageBase64) {
        const syntheticPreview: PreviewData = {
          id: "run-result-" + id,
          postId: id,
          prompt: data.prompt || {
            imagePrompt: "",
            theme: "",
            style: "",
          },
          content: data.content || {
            title: "",
            description: "",
            altText: "",
          },
          linkedin: data.linkedin,
          imageBase64: data.imageBase64,
          imageContentType: "image/jpeg",
          status: "published",
          scheduledFor: new Date().toISOString(),
          scheduledHour: new Date().getHours(),
          scheduledMinute: new Date().getMinutes(),
          createdAt: new Date().toISOString(),
        };
        setPreviewModalData(syntheticPreview);
        setPreviewModalVariants([syntheticPreview]);
        setPreviewVariantTab(0);
      }
    } catch (err) {
      setRunResult({
        postId: id,
        result: {
          success: false,
          error: err instanceof Error ? err.message : String(err),
          durationMs: 0,
        },
      });
    }
    setRunningId(null);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/pinterest/logout", { method: "POST" });
      setAuth({ connected: false });
      setBoards([]);
      setBoardsLoaded(false);
    } catch {
      /* silent */
    }
  }

  async function runTest() {
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/marketing/pinterest/test", {
        method: "POST",
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({
        success: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: 0,
      });
    }
    setTestLoading(false);
  }

  // -------------------------------------------------------------------------
  // Handlers -- Previews
  // -------------------------------------------------------------------------

  function openPreviewModal(preview: PreviewData) {
    setPreviewModalData(preview);
    const variants = previews.filter(
      (p) =>
        p.postId === preview.postId &&
        p.scheduledFor === preview.scheduledFor &&
        p.scheduledHour === preview.scheduledHour,
    );
    if (variants.length > 1) {
      setPreviewModalVariants(variants);
      const idx = variants.findIndex((v) => v.id === preview.id);
      setPreviewVariantTab(idx >= 0 ? idx : 0);
    } else {
      setPreviewModalVariants([preview]);
      setPreviewVariantTab(0);
    }
    setExportData(null);
  }

  function closePreviewModal() {
    setPreviewModalData(null);
    setPreviewModalVariants([]);
    setPreviewVariantTab(0);
    setExportData(null);
  }

  async function approvePreview(id: string) {
    setPreviewActionLoading(true);
    try {
      await fetch(`/api/previews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      await fetchPreviews();
      setPreviewModalData((prev) =>
        prev && prev.id === id ? { ...prev, status: "approved" } : prev,
      );
    } catch {
      /* silent */
    }
    setPreviewActionLoading(false);
  }

  async function rejectPreview(id: string) {
    setPreviewActionLoading(true);
    try {
      await fetch(`/api/previews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      await fetchPreviews();
      setPreviewModalData((prev) =>
        prev && prev.id === id ? { ...prev, status: "rejected" } : prev,
      );
    } catch {
      /* silent */
    }
    setPreviewActionLoading(false);
  }

  async function publishPreview(id: string) {
    setPreviewActionLoading(true);
    try {
      await fetch(`/api/previews/${id}/publish`, { method: "POST" });
      await fetchPreviews();
      setPreviewModalData((prev) =>
        prev && prev.id === id ? { ...prev, status: "published" } : prev,
      );
    } catch {
      /* silent */
    }
    setPreviewActionLoading(false);
  }

  async function reusePreview(id: string) {
    try {
      await fetch(`/api/previews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      });
      await fetchPreviews();
    } catch {
      /* silent */
    }
  }

  // -------------------------------------------------------------------------
  // Handlers -- Export
  // -------------------------------------------------------------------------

  async function handleExport(preview: PreviewData) {
    setExportLoading(true);
    setExportData(null);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePrompt: preview.prompt.imagePrompt,
          theme: preview.prompt.theme,
          title: preview.content.title,
          description: preview.content.description,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setExportData(data);
      }
    } catch {
      /* silent */
    }
    setExportLoading(false);
  }

  function copyToClipboard(text: string, platform: string) {
    navigator.clipboard.writeText(text).then(() => {
      setExportCopied(platform);
      setTimeout(() => setExportCopied(null), 2000);
    });
  }

  // -------------------------------------------------------------------------
  // Handlers -- Batch
  // -------------------------------------------------------------------------

  async function generateBatch() {
    if (!batchBoardId) return;
    setBatchLoading(true);
    setBatchResult(null);
    try {
      const res = await fetch("/api/batch/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          daysAhead: 7,
          postsPerDay: 2,
          boardId: batchBoardId,
          theme: null,
          link: "https://auto-prismaflux.com",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setBatchResult(
          `${data.generated || data.count || "?"} previews generes avec succes.`,
        );
        await fetchPreviews();
      } else {
        const err = await res.json().catch(() => ({}));
        setBatchResult(`Erreur: ${err.error || res.status}`);
      }
    } catch (err) {
      setBatchResult(
        `Erreur: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    setBatchLoading(false);
  }

  // -------------------------------------------------------------------------
  // Handlers -- Prompts
  // -------------------------------------------------------------------------

  async function deletePrompt(id: string) {
    setDeletingPromptId(id);
    try {
      await fetch(`/api/prompts/${id}`, { method: "DELETE" });
      await fetchPrompts();
    } catch {
      /* silent */
    }
    setDeletingPromptId(null);
  }

  // -------------------------------------------------------------------------
  // Calendar computed data
  // -------------------------------------------------------------------------

  const calendarDaysCount = isMobile ? 7 : 14;

  const calendarDays = useMemo(() => {
    const week0 = getWeekDays(calendarWeekOffset);
    if (calendarDaysCount <= 7) return week0;
    const week1 = getWeekDays(calendarWeekOffset + 1);
    return [...week0, ...week1];
  }, [calendarWeekOffset, calendarDaysCount]);

  const previewsByDay = useMemo(() => {
    const map: Record<string, PreviewData[]> = {};
    calendarDays.forEach((d) => {
      const key = d.toISOString().slice(0, 10);
      map[key] = [];
    });
    previews.forEach((p) => {
      const pDate = new Date(p.scheduledFor);
      const key = pDate.toISOString().slice(0, 10);
      if (map[key]) {
        map[key].push(p);
      }
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => {
        if (a.scheduledHour !== b.scheduledHour)
          return a.scheduledHour - b.scheduledHour;
        return a.scheduledMinute - b.scheduledMinute;
      }),
    );
    return map;
  }, [previews, calendarDays]);

  // -------------------------------------------------------------------------
  // Dynamic Styles
  // -------------------------------------------------------------------------

  const padding = isMobile ? 16 : 32;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: colors.bg,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: `1px solid ${colors.border}`,
          padding: isMobile ? "14px 16px" : "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #e63232, #ff4444)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#0a0a0f",
            flexShrink: 0,
          }}
        >
          P
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: isMobile ? 16 : 18,
              fontWeight: 600,
              margin: 0,
              color: colors.text,
            }}
          >
            PrismaFlux — Agent Pinterest
          </h1>
          <p style={{ fontSize: 13, color: colors.muted, margin: 0 }}>
            Publication automatique multi-plateformes
          </p>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 14,
            cursor: "pointer",
            color: colors.text,
            fontFamily: "inherit",
            flexShrink: 0,
          }}
          title={dark ? "Mode clair" : "Mode sombre"}
        >
          {dark ? "\u2600" : "\u263D"}
        </button>
      </header>

      {/* Tab Navigation */}
      <nav
        style={{
          borderBottom: `1px solid ${colors.border}`,
          padding: isMobile ? "0 8px" : "0 32px",
          display: "flex",
          gap: 0,
          overflowX: isMobile ? "auto" : "visible",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {TAB_LIST.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? `2px solid ${colors.accent}`
                  : "2px solid transparent",
              color: activeTab === tab.key ? colors.accent : colors.muted,
              padding: isMobile ? "12px 14px" : "14px 24px",
              fontSize: isMobile ? 13 : 14,
              fontWeight: activeTab === tab.key ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: `${padding}px ${isMobile ? 12 : 24}px`,
        }}
      >
        {/* Auth Section -- always visible */}
        <section style={{ marginBottom: isMobile ? 16 : 28 }}>
          <SectionTitle colors={colors}>Connexion Pinterest</SectionTitle>
          <div
            style={{
              background: colors.card,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              padding: isMobile ? "12px 14px" : "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 10 : 16,
              flexWrap: "wrap",
            }}
          >
            {authLoading ? (
              <span style={{ color: colors.muted, fontSize: 14 }}>
                Chargement...
              </span>
            ) : auth?.connected ? (
              <>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: auth.needsReauth ? "#ff4444" : "#22c55e",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    {auth.username || "Connecte"}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: auth.needsReauth ? "#ff4444" : colors.muted,
                      marginLeft: 12,
                    }}
                  >
                    {auth.needsReauth
                      ? "Re-authentification requise"
                      : `Expire dans ${auth.daysUntilExpiry}j`}
                  </span>
                </div>
                {auth.needsReauth && (
                  <a
                    href="/api/auth/pinterest"
                    style={{
                      background:
                        "linear-gradient(135deg, #e63232, #ff4444)",
                      color: "#0a0a0f",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Re-connecter
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    color: colors.muted,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Deconnecter
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#ef4444",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: colors.muted, flex: 1 }}>
                  Non connecte a Pinterest
                </span>
                <a
                  href="/api/auth/pinterest"
                  style={{
                    background:
                      "linear-gradient(135deg, #e63232, #ff4444)",
                    color: "#0a0a0f",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Connecter Pinterest
                </a>
              </>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* KPI Dashboard (always visible above tabs)                         */}
        {/* ================================================================= */}
        <section style={{ marginBottom: isMobile ? 16 : 24 }}>
          <div
            onClick={() => setKpiExpanded(!kpiExpanded)}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : "repeat(4, 1fr)",
              gap: isMobile ? 8 : 16,
              cursor: "pointer",
            }}
          >
            <KpiCard
              label="Posts cette semaine"
              value={String(kpiData.postsThisWeek)}
              color="#3b82f6"
              colors={colors}
            />
            <KpiCard
              label="Taux de succes"
              value={`${kpiData.successRate}%`}
              color="#22c55e"
              colors={colors}
            />
            <KpiCard
              label="Prochain post"
              value={
                kpiData.nextPost
                  ? timeUntil(kpiData.nextPost.scheduledFor)
                  : "—"
              }
              color={colors.accent}
              colors={colors}
            />
            <KpiCard
              label="Posts en attente"
              value={String(kpiData.pendingCount)}
              color="#ff4444"
              colors={colors}
            />
          </div>
          {kpiExpanded && (
            <div
              style={{
                background: colors.card,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                padding: isMobile ? "12px 14px" : "16px 20px",
                marginTop: 8,
                fontSize: 13,
                color: colors.muted,
              }}
            >
              <p style={{ margin: "0 0 4px" }}>
                <strong style={{ color: colors.text }}>
                  {posts.length}
                </strong>{" "}
                publications configurees — {posts.filter((p) => p.enabled).length}{" "}
                actives
              </p>
              <p style={{ margin: "0 0 4px" }}>
                <strong style={{ color: colors.text }}>
                  {previews.length}
                </strong>{" "}
                previews totaux —{" "}
                {previews.filter((p) => p.status === "approved").length}{" "}
                approuves,{" "}
                {previews.filter((p) => p.status === "published").length}{" "}
                publies
              </p>
              <p style={{ margin: 0 }}>
                Cliquez pour replier
              </p>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* IA Suggestion Banner                                               */}
        {/* ================================================================= */}
        {suggestion && (
          <section style={{ marginBottom: isMobile ? 16 : 24 }}>
            <div
              style={{
                background: dark ? "#1a1800" : "#fffde6",
                borderRadius: 12,
                border: `1px solid ${colors.accent}66`,
                padding: isMobile ? "12px 14px" : "14px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {"\u2728"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.accent,
                    margin: 0,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Recommandation IA
                </p>
                <p
                  style={{
                    fontSize: 14,
                    margin: 0,
                    color: colors.text,
                    lineHeight: 1.5,
                  }}
                >
                  {suggestion}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* TAB: Publications                                                  */}
        {/* ================================================================= */}
        {activeTab === "publications" && (
          <section style={{ marginBottom: padding }}>
            {/* Post du jour */}
            <div
              style={{
                background: dark ? "#111113" : "#fefce8",
                borderRadius: 12,
                border: `1px solid ${colors.accent}44`,
                padding: isMobile ? "14px" : "16px 20px",
                marginBottom: isMobile ? 16 : 20,
              }}
            >
              <SectionTitle colors={colors} style={{ marginBottom: 10 }}>
                Post du jour
              </SectionTitle>
              {todayPreview ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: 14,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  {/* Thumbnail */}
                  {todayPreview.imageBase64 ? (
                    <img
                      src={`data:${todayPreview.imageContentType || "image/jpeg"};base64,${todayPreview.imageBase64}`}
                      alt="Preview"
                      style={{
                        width: isMobile ? "100%" : 80,
                        height: isMobile ? 140 : 120,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: isMobile ? "100%" : 80,
                        height: isMobile ? 140 : 120,
                        borderRadius: 8,
                        background:
                          "linear-gradient(135deg, #e6323233, #3b82f633)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        margin: "0 0 6px",
                        color: colors.text,
                      }}
                    >
                      {todayPreview.content.title || "Sans titre"}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: colors.muted,
                        margin: "0 0 10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {padTime(todayPreview.scheduledHour)}:
                      {padTime(todayPreview.scheduledMinute)} —{" "}
                      {todayPreview.content.description?.slice(0, 80) || ""}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={() => approvePreview(todayPreview.id)}
                        style={{
                          background: "#14532d",
                          color: "#86efac",
                          border: "1px solid #166534",
                          borderRadius: 8,
                          padding: "8px 18px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => rejectPreview(todayPreview.id)}
                        style={{
                          background: "#7f1d1d",
                          color: "#fca5a5",
                          border: "1px solid #991b1b",
                          borderRadius: 8,
                          padding: "8px 18px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Rejeter
                      </button>
                      <button
                        onClick={() => rejectPreview(todayPreview.id)}
                        style={{
                          background: "transparent",
                          color: colors.muted,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 8,
                          padding: "8px 18px",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Decliner
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 0",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: colors.muted,
                      margin: "0 0 10px",
                    }}
                  >
                    Aucun post programme aujourd{"'"}hui
                  </p>
                  <button
                    onClick={openCreateForm}
                    style={{
                      background:
                        "linear-gradient(135deg, #e63232, #ff4444)",
                      color: "#0a0a0f",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Generer un post
                  </button>
                </div>
              )}
            </div>

            {/* Header + new post button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <SectionTitle colors={colors} style={{ marginBottom: 0 }}>
                Publications planifiees
              </SectionTitle>
              <button
                onClick={openCreateForm}
                style={{
                  background:
                    "linear-gradient(135deg, #e63232, #ff4444)",
                  color: "#0a0a0f",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                + Nouvelle publication
              </button>
            </div>

            {/* Form (create / edit) */}
            {formOpen && (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.accent}33`,
                  padding: isMobile ? 14 : 20,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{ fontSize: 15, fontWeight: 600, margin: 0 }}
                  >
                    {editingId
                      ? "Modifier la publication"
                      : "Nouvelle publication"}
                  </h3>
                  <button
                    onClick={closeForm}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: colors.muted,
                      fontSize: 18,
                      cursor: "pointer",
                      padding: "4px 8px",
                      lineHeight: 1,
                    }}
                  >
                    {"\u2715"}
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  {/* Name */}
                  <div>
                    <FormLabel colors={colors}>Nom</FormLabel>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Ex: Post quotidien PrismaFlux"
                      style={inputStyle}
                    />
                  </div>

                  {/* Schedule */}
                  <div>
                    <FormLabel colors={colors}>Frequence</FormLabel>
                    <select
                      value={form.cronExpression}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          cronExpression: e.target.value,
                        })
                      }
                      style={inputStyle}
                    >
                      {SCHEDULE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theme */}
                  <div>
                    <FormLabel colors={colors}>Theme visuel</FormLabel>
                    <select
                      value={form.theme}
                      onChange={(e) =>
                        setForm({ ...form, theme: e.target.value })
                      }
                      style={inputStyle}
                    >
                      <option value="">Aleatoire (rotation)</option>
                      {THEMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Prompt Style */}
                  <div>
                    <FormLabel colors={colors}>Style de ton</FormLabel>
                    <select
                      value={form.promptStyle}
                      onChange={(e) =>
                        setForm({ ...form, promptStyle: e.target.value })
                      }
                      style={inputStyle}
                    >
                      {PROMPT_STYLES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Link */}
                  <div style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
                    <FormLabel colors={colors}>Lien de destination</FormLabel>
                    <input
                      type="url"
                      value={form.link}
                      onChange={(e) =>
                        setForm({ ...form, link: e.target.value })
                      }
                      placeholder="https://auto-prismaflux.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Multi-board selection */}
                <div style={{ marginBottom: 12 }}>
                  <FormLabel colors={colors}>
                    Tableaux Pinterest (multi-selection)
                  </FormLabel>
                  {boards.length === 0 ? (
                    <p
                      style={{
                        fontSize: 13,
                        color: colors.muted,
                        margin: 0,
                      }}
                    >
                      Chargement des tableaux...
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        padding: 12,
                        background: colors.bg,
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        maxHeight: 160,
                        overflowY: "auto",
                      }}
                    >
                      {boards.map((b) => {
                        const checked = form.boardIds.includes(b.id);
                        return (
                          <label
                            key={b.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "6px 12px",
                              borderRadius: 6,
                              background: checked
                                ? `${colors.accent}22`
                                : colors.card,
                              border: `1px solid ${checked ? `${colors.accent}66` : colors.border}`,
                              cursor: "pointer",
                              fontSize: 13,
                              color: checked ? colors.accent : colors.muted,
                              transition: "all 0.15s",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleBoardInForm(b)}
                              style={{
                                accentColor: colors.accent,
                                width: 14,
                                height: 14,
                              }}
                            />
                            {b.name}{" "}
                            <span
                              style={{
                                color: colors.muted,
                                fontSize: 11,
                              }}
                            >
                              ({b.pinCount})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Custom Instructions */}
                <div style={{ marginBottom: 16 }}>
                  <FormLabel colors={colors}>
                    Instructions personnalisees (optionnel)
                  </FormLabel>
                  <textarea
                    value={form.customInstructions}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customInstructions: e.target.value,
                      })
                    }
                    placeholder="Ex: Mettre l'accent sur la vitesse de rotation du stock..."
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "vertical" as const,
                      minHeight: 70,
                    }}
                  />
                </div>

                {/* Error */}
                {formError && (
                  <div
                    style={{
                      background: "#1c1012",
                      border: "1px solid #ef444433",
                      borderRadius: 8,
                      padding: "8px 12px",
                      color: "#fca5a5",
                      fontSize: 13,
                      marginBottom: 12,
                    }}
                  >
                    {formError}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={saveForm}
                    disabled={formSaving}
                    style={{
                      background: formSaving
                        ? colors.border
                        : "linear-gradient(135deg, #e63232, #ff4444)",
                      color: formSaving ? colors.muted : "#0a0a0f",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: formSaving ? "not-allowed" : "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {formSaving
                      ? "Sauvegarde..."
                      : editingId
                        ? "Mettre a jour"
                        : "Creer"}
                  </button>
                  <button
                    onClick={closeForm}
                    style={{
                      background: "transparent",
                      color: colors.muted,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "10px 20px",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Posts List */}
            {postsLoading ? (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  padding: "32px 20px",
                  textAlign: "center",
                  color: colors.muted,
                  fontSize: 14,
                }}
              >
                Chargement des publications...
              </div>
            ) : posts.length === 0 ? (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  padding: "32px 20px",
                  textAlign: "center",
                  color: colors.muted,
                  fontSize: 14,
                }}
              >
                Aucune publication planifiee. Cliquez sur &quot;+ Nouvelle
                publication&quot; pour commencer.
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    running={runningId === post.id}
                    deleting={deletingId === post.id}
                    toggling={togglingId === post.id}
                    confirmDelete={confirmDeleteId === post.id}
                    runResult={
                      runResult?.postId === post.id
                        ? runResult.result
                        : null
                    }
                    analytics={
                      post.lastPinId
                        ? analyticsCache[post.lastPinId] || null
                        : null
                    }
                    previews={previews}
                    colors={colors}
                    isMobile={isMobile}
                    onEdit={() => openEditForm(post)}
                    onRun={() => runPost(post.id)}
                    onToggle={() => togglePost(post)}
                    onDelete={() => {
                      if (confirmDeleteId === post.id) {
                        deletePost(post.id);
                      } else {
                        setConfirmDeleteId(post.id);
                      }
                    }}
                    onCancelDelete={() => setConfirmDeleteId(null)}
                    onDismissResult={() => setRunResult(null)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================================================================= */}
        {/* TAB: Calendrier                                                    */}
        {/* ================================================================= */}
        {activeTab === "calendrier" && (
          <section style={{ marginBottom: padding }}>
            {/* Batch Mode */}
            <div
              style={{
                background: colors.card,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                padding: isMobile ? "12px 14px" : "16px 20px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <SectionTitle colors={colors} style={{ marginBottom: 0, flex: 1 }}>
                  Generation par lot
                </SectionTitle>
                <select
                  value={batchBoardId}
                  onChange={(e) => setBatchBoardId(e.target.value)}
                  style={{
                    ...inputStyle,
                    width: "auto",
                    minWidth: isMobile ? 140 : 200,
                  }}
                >
                  <option value="">Choisir un tableau</option>
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={generateBatch}
                  disabled={batchLoading || !batchBoardId}
                  style={{
                    background:
                      batchLoading || !batchBoardId
                        ? colors.border
                        : "linear-gradient(135deg, #e63232, #ff4444)",
                    color:
                      batchLoading || !batchBoardId
                        ? colors.muted
                        : "#0a0a0f",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor:
                      batchLoading || !batchBoardId
                        ? "not-allowed"
                        : "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {batchLoading
                    ? "Generation en cours..."
                    : "Generer la semaine"}
                </button>
              </div>
              {batchLoading && (
                <p
                  style={{
                    fontSize: 12,
                    color: colors.accent,
                    margin: "8px 0 0",
                  }}
                >
                  Generation de 14 previews (7 jours x 2/jour). Cela peut
                  prendre plusieurs minutes...
                </p>
              )}
              {batchResult && (
                <p
                  style={{
                    fontSize: 13,
                    color: batchResult.startsWith("Erreur")
                      ? "#fca5a5"
                      : "#86efac",
                    margin: "8px 0 0",
                  }}
                >
                  {batchResult}
                </p>
              )}
            </div>

            {/* Rapid mode toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <SectionTitle colors={colors} style={{ marginBottom: 0 }}>
                Calendrier
              </SectionTitle>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => setRapidMode(!rapidMode)}
                  style={{
                    background: rapidMode ? `${colors.accent}22` : "transparent",
                    color: rapidMode ? colors.accent : colors.muted,
                    border: `1px solid ${rapidMode ? colors.accent : colors.border}`,
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Mode rapide
                </button>
                <SmallButton
                  onClick={() =>
                    setCalendarWeekOffset(Math.max(calendarWeekOffset - 1, -4))
                  }
                  disabled={calendarWeekOffset <= -4}
                  colors={colors}
                >
                  {"\u2190"} Sem.
                </SmallButton>
                <SmallButton
                  onClick={() => setCalendarWeekOffset(0)}
                  variant={calendarWeekOffset === 0 ? "success" : "default"}
                  colors={colors}
                >
                  Aujourd{"'"}hui
                </SmallButton>
                <SmallButton
                  onClick={() =>
                    setCalendarWeekOffset(
                      Math.min(calendarWeekOffset + 1, 4),
                    )
                  }
                  disabled={calendarWeekOffset >= 4}
                  colors={colors}
                >
                  Sem. {"\u2192"}
                </SmallButton>
              </div>
            </div>

            {/* Rapid mode carousel */}
            {rapidMode && rapidPreviews.length > 0 && (
              <div
                style={{
                  marginBottom: 20,
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.accent}44`,
                  padding: isMobile ? 14 : 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: 13, color: colors.muted }}>
                    Apercu {rapidIndex + 1} / {rapidPreviews.length}
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <SmallButton
                      onClick={() =>
                        setRapidIndex(Math.max(0, rapidIndex - 1))
                      }
                      disabled={rapidIndex <= 0}
                      colors={colors}
                    >
                      {"\u2190"} Prec.
                    </SmallButton>
                    <SmallButton
                      onClick={() =>
                        setRapidIndex(
                          Math.min(rapidPreviews.length - 1, rapidIndex + 1),
                        )
                      }
                      disabled={rapidIndex >= rapidPreviews.length - 1}
                      colors={colors}
                    >
                      Suiv. {"\u2192"}
                    </SmallButton>
                  </div>
                </div>
                {(() => {
                  const rp = rapidPreviews[rapidIndex];
                  if (!rp) return null;
                  return (
                    <div>
                      {rp.imageBase64 && (
                        <div
                          style={{
                            textAlign: "center",
                            marginBottom: 12,
                          }}
                        >
                          <img
                            src={`data:${rp.imageContentType || "image/jpeg"};base64,${rp.imageBase64}`}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: isMobile ? 300 : 400,
                              borderRadius: 10,
                              border: `1px solid ${colors.border}`,
                            }}
                          />
                        </div>
                      )}
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          margin: "0 0 6px",
                        }}
                      >
                        {rp.content.title || "Sans titre"}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: colors.muted,
                          margin: "0 0 12px",
                          lineHeight: 1.5,
                        }}
                      >
                        {rp.content.description || "—"}
                      </p>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        <button
                          onClick={() => {
                            approvePreview(rp.id);
                            if (rapidIndex < rapidPreviews.length - 1) {
                              setRapidIndex(rapidIndex + 1);
                            }
                          }}
                          style={{
                            background: "#14532d",
                            color: "#86efac",
                            border: "1px solid #166534",
                            borderRadius: 8,
                            padding: "10px 24px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => {
                            rejectPreview(rp.id);
                            if (rapidIndex < rapidPreviews.length - 1) {
                              setRapidIndex(rapidIndex + 1);
                            }
                          }}
                          style={{
                            background: "#7f1d1d",
                            color: "#fca5a5",
                            border: "1px solid #991b1b",
                            borderRadius: 8,
                            padding: "10px 24px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Calendar grid */}
            {previewsLoading ? (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  padding: "32px 20px",
                  textAlign: "center",
                  color: colors.muted,
                  fontSize: 14,
                }}
              >
                Chargement du calendrier...
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(7, 1fr)",
                  gap: 8,
                }}
              >
                {calendarDays.map((day, idx) => {
                  const dayKey = day.toISOString().slice(0, 10);
                  const dayPreviews = previewsByDay[dayKey] || [];
                  const isToday = isSameDay(day, new Date());
                  const dayIdx = idx % 7;

                  return (
                    <div
                      key={dayKey}
                      style={{
                        background: isToday
                          ? dark
                            ? "#1a1a22"
                            : "#fffde6"
                          : colors.card,
                        borderRadius: 10,
                        border: `1px solid ${isToday ? `${colors.accent}44` : colors.border}`,
                        minHeight: isMobile ? 80 : 180,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Day header */}
                      <div
                        style={{
                          padding: isMobile
                            ? "8px 10px 6px"
                            : "10px 10px 8px",
                          borderBottom: `1px solid ${colors.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: isToday ? colors.accent : colors.muted,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          {DAYS_FR[dayIdx]}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: isToday ? 700 : 500,
                            color: isToday ? colors.accent : colors.text,
                          }}
                        >
                          {formatDateShort(day)}
                        </span>
                      </div>

                      {/* Posts in this day */}
                      <div
                        style={{
                          flex: 1,
                          padding: 6,
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          overflowY: "auto",
                        }}
                      >
                        {dayPreviews.length === 0 ? (
                          <span
                            style={{
                              fontSize: 11,
                              color: colors.border,
                              textAlign: "center",
                              marginTop: isMobile ? 8 : 20,
                            }}
                          >
                            —
                          </span>
                        ) : (
                          dayPreviews.map((prev) => (
                            <button
                              key={prev.id}
                              onClick={() => openPreviewModal(prev)}
                              style={{
                                background: colors.bg,
                                borderRadius: 6,
                                border: `1px solid ${statusColors[prev.status] || colors.border}33`,
                                padding: "6px 8px",
                                cursor: "pointer",
                                textAlign: "left",
                                display: "block",
                                width: "100%",
                                fontFamily: "inherit",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                  marginBottom: 2,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 10,
                                    color: colors.muted,
                                    fontWeight: 600,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {padTime(prev.scheduledHour)}:
                                  {padTime(prev.scheduledMinute)}
                                </span>
                                <span
                                  style={{
                                    fontSize: 9,
                                    color:
                                      statusColors[prev.status] ||
                                      colors.muted,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.3,
                                  }}
                                >
                                  {statusLabels[prev.status] ||
                                    prev.status}
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: 11,
                                  color: colors.text,
                                  margin: 0,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  lineHeight: 1.3,
                                }}
                              >
                                {prev.content.title || "Sans titre"}
                              </p>
                              {prev.variantTotal &&
                                prev.variantTotal > 1 && (
                                  <span
                                    style={{
                                      fontSize: 9,
                                      color: colors.muted,
                                    }}
                                  >
                                    Variante{" "}
                                    {(prev.variantIndex || 0) + 1}/
                                    {prev.variantTotal}
                                  </span>
                                )}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ================================================================= */}
        {/* TAB: Prompts                                                       */}
        {/* ================================================================= */}
        {activeTab === "prompts" && (
          <section style={{ marginBottom: padding }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <SectionTitle colors={colors} style={{ marginBottom: 0 }}>
                Bibliotheque de prompts
              </SectionTitle>
              <SmallButton
                onClick={() => setPromptsOpen(!promptsOpen)}
                colors={colors}
              >
                {promptsOpen ? "Replier" : "Deplier"}
              </SmallButton>
            </div>

            {promptsOpen && (
              <>
                {promptsLoading ? (
                  <div
                    style={{
                      background: colors.card,
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      padding: "32px 20px",
                      textAlign: "center",
                      color: colors.muted,
                      fontSize: 14,
                    }}
                  >
                    Chargement des prompts...
                  </div>
                ) : prompts.length === 0 ? (
                  <div
                    style={{
                      background: colors.card,
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      padding: "32px 20px",
                      textAlign: "center",
                      color: colors.muted,
                      fontSize: 14,
                    }}
                  >
                    Aucun prompt sauvegarde. Les prompts sont crees
                    automatiquement lors des publications.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {prompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        deleting={deletingPromptId === prompt.id}
                        onDelete={() => deletePrompt(prompt.id)}
                        colors={colors}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ================================================================= */}
        {/* TAB: Perdus                                                        */}
        {/* ================================================================= */}
        {activeTab === "perdus" && (
          <section style={{ marginBottom: padding }}>
            <SectionTitle colors={colors}>Posts perdus</SectionTitle>
            {previewsLoading ? (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  padding: "32px 20px",
                  textAlign: "center",
                  color: colors.muted,
                  fontSize: 14,
                }}
              >
                Chargement...
              </div>
            ) : rejectedPreviews.length === 0 ? (
              <div
                style={{
                  background: colors.card,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  padding: "32px 20px",
                  textAlign: "center",
                  color: colors.muted,
                  fontSize: 14,
                }}
              >
                Aucun post rejete. Les posts declines apparaitront ici.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 12,
                }}
              >
                {rejectedPreviews.map((prev) => (
                  <div
                    key={prev.id}
                    style={{
                      background: colors.card,
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      overflow: "hidden",
                    }}
                  >
                    {prev.imageBase64 ? (
                      <img
                        src={`data:${prev.imageContentType || "image/jpeg"};base64,${prev.imageBase64}`}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: 160,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: 160,
                          background:
                            "linear-gradient(135deg, #ef444433, #e6323233)",
                        }}
                      />
                    )}
                    <div style={{ padding: "12px 14px" }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          margin: "0 0 4px",
                          color: colors.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {prev.content.title || "Sans titre"}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: colors.muted,
                          margin: "0 0 10px",
                        }}
                      >
                        {new Date(prev.scheduledFor).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </p>
                      <button
                        onClick={() => reusePreview(prev.id)}
                        style={{
                          background: `${colors.accent}22`,
                          color: colors.accent,
                          border: `1px solid ${colors.accent}66`,
                          borderRadius: 8,
                          padding: "6px 16px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          width: "100%",
                        }}
                      >
                        Reutiliser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================================================================= */}
        {/* TAB: Test                                                          */}
        {/* ================================================================= */}
        {activeTab === "test" && (
          <>
            <section style={{ marginBottom: padding }}>
              <SectionTitle colors={colors}>Test du pipeline</SectionTitle>
              <button
                onClick={runTest}
                disabled={testLoading}
                style={{
                  background: testLoading
                    ? colors.border
                    : "linear-gradient(135deg, #e63232, #ff4444)",
                  color: testLoading ? colors.muted : "#0a0a0f",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: testLoading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {testLoading
                  ? "Generation en cours..."
                  : "Lancer un test (dry-run)"}
              </button>
              <p
                style={{
                  fontSize: 13,
                  color: colors.muted,
                  marginTop: 8,
                }}
              >
                Genere image + contenu Pinterest + post LinkedIn sans
                publier. Necessite OPENAI_API_KEY.
              </p>
            </section>

            {testResult && (
              <section style={{ marginBottom: padding }}>
                <SectionTitle colors={colors}>Resultat du test</SectionTitle>
                <PipelineResultCard
                  result={testResult}
                  onDismiss={() => setTestResult(null)}
                  colors={colors}
                />
              </section>
            )}
          </>
        )}
      </main>

      {/* ================================================================= */}
      {/* Preview Modal (overlay)                                            */}
      {/* ================================================================= */}
      {previewModalData && (
        <PreviewModal
          preview={
            previewModalVariants[previewVariantTab] || previewModalData
          }
          variants={previewModalVariants}
          activeVariant={previewVariantTab}
          onVariantChange={setPreviewVariantTab}
          onClose={closePreviewModal}
          onApprove={approvePreview}
          onReject={rejectPreview}
          onPublish={publishPreview}
          actionLoading={previewActionLoading}
          colors={colors}
          dark={dark}
          isMobile={isMobile}
          onExport={handleExport}
          exportLoading={exportLoading}
          exportData={exportData}
          exportCopied={exportCopied}
          onCopyExport={copyToClipboard}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-Components
// ---------------------------------------------------------------------------

function SectionTitle({
  children,
  style,
  colors,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  colors: ThemeColors;
}) {
  return (
    <h2
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: colors.muted,
        textTransform: "uppercase",
        letterSpacing: 1,
        margin: 0,
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function KpiCard({
  label,
  value,
  color,
  colors,
}: {
  label: string;
  value: string;
  color: string;
  colors: ThemeColors;
}) {
  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: colors.muted,
          margin: 0,
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color }}>
        {value}
      </p>
    </div>
  );
}

function FormLabel({
  children,
  colors,
}: {
  children: React.ReactNode;
  colors: ThemeColors;
}) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 12,
        color: colors.muted,
        fontWeight: 600,
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function SmallButton({
  children,
  onClick,
  disabled,
  variant = "default",
  title,
  colors,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger" | "success" | "ghost";
  title?: string;
  colors: ThemeColors;
}) {
  const bgMap = {
    default: colors.border,
    danger: "#7f1d1d",
    success: "#14532d",
    ghost: "transparent",
  };
  const colorMap = {
    default: colors.text,
    danger: "#fca5a5",
    success: "#86efac",
    ghost: colors.muted,
  };
  const borderMap = {
    default: `1px solid ${colors.border}`,
    danger: "1px solid #991b1b",
    success: "1px solid #166534",
    ghost: `1px solid ${colors.border}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: disabled ? colors.bg : bgMap[variant],
        color: disabled ? colors.muted : colorMap[variant],
        border: borderMap[variant],
        borderRadius: 6,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Post Card (with analytics + feed visuel)
// ---------------------------------------------------------------------------

function PostCard({
  post,
  running,
  deleting,
  toggling,
  confirmDelete,
  runResult,
  analytics,
  previews,
  colors,
  isMobile,
  onEdit,
  onRun,
  onToggle,
  onDelete,
  onCancelDelete,
  onDismissResult,
}: {
  post: ScheduledPost;
  running: boolean;
  deleting: boolean;
  toggling: boolean;
  confirmDelete: boolean;
  runResult: PipelineResult | null;
  analytics: PinAnalytics | null;
  previews: PreviewData[];
  colors: ThemeColors;
  isMobile: boolean;
  onEdit: () => void;
  onRun: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onCancelDelete: () => void;
  onDismissResult: () => void;
}) {
  // Find latest preview image for this post
  const latestPreview = previews
    .filter((p) => p.postId === post.id && p.imageBase64)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 12,
        border: `1px solid ${post.enabled ? colors.border : colors.bg}`,
        padding: isMobile ? "12px 14px" : "16px 20px",
        opacity: post.enabled ? 1 : 0.7,
        transition: "opacity 0.2s",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "flex-start",
          gap: 12,
          marginBottom: 10,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Image thumbnail */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            flex: 1,
            minWidth: 0,
            width: isMobile ? "100%" : undefined,
          }}
        >
          {latestPreview ? (
            <img
              src={`data:${latestPreview.imageContentType || "image/jpeg"};base64,${latestPreview.imageBase64}`}
              alt=""
              style={{
                width: 64,
                height: 96,
                objectFit: "cover",
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 96,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${colors.accent}33, #3b82f633)`,
                flexShrink: 0,
              }}
            />
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toggle + Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              {/* Toggle */}
              <button
                onClick={onToggle}
                disabled={toggling}
                title={post.enabled ? "Desactiver" : "Activer"}
                style={{
                  width: 38,
                  height: 22,
                  borderRadius: 11,
                  border: "none",
                  background: post.enabled ? colors.accent : colors.border,
                  cursor: toggling ? "not-allowed" : "pointer",
                  position: "relative",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: post.enabled ? 19 : 3,
                    transition: "left 0.2s",
                  }}
                />
              </button>

              <span style={{ fontSize: 15, fontWeight: 600 }}>
                {post.name}
              </span>
              {post.lastRunStatus && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      post.lastRunStatus === "success"
                        ? "#22c55e"
                        : "#ef4444",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                  title={
                    post.lastRunStatus === "success"
                      ? "Dernier run reussi"
                      : `Erreur: ${post.lastRunError || "inconnue"}`
                  }
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 8 : 16,
                flexWrap: "wrap",
                fontSize: 13,
                color: colors.muted,
              }}
            >
              <span title="Tableau(x)">
                <span style={{ color: "#ec4899" }}>
                  {"\u25CF"}
                </span>{" "}
                {post.boardNames && post.boardNames.length > 1
                  ? `${post.boardNames[0]} +${post.boardNames.length - 1}`
                  : post.boardName}
              </span>
              <span title="Frequence">
                <span style={{ color: colors.accent }}>
                  {"\u25CF"}
                </span>{" "}
                {cronToHuman(post.cronExpression)}
              </span>
              {post.theme && !isMobile && (
                <span
                  title="Theme"
                  style={{
                    maxWidth: 220,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "#3b82f6" }}>
                    {"\u25CF"}
                  </span>{" "}
                  {post.theme}
                </span>
              )}
              {post.lastRunAt && (
                <span
                  title={`Dernier run: ${new Date(post.lastRunAt).toLocaleString()}`}
                >
                  Dernier run: {timeAgo(post.lastRunAt)}
                </span>
              )}
            </div>

            {/* Inline analytics */}
            {analytics && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 6,
                  fontSize: 11,
                }}
              >
                <span style={{ color: "#3b82f6" }}>
                  {analytics.impressions} impressions
                </span>
                <span style={{ color: "#22c55e" }}>
                  {analytics.saves} saves
                </span>
                <span style={{ color: colors.accent }}>
                  {analytics.clicks} clics
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <SmallButton onClick={onEdit} title="Modifier" colors={colors}>
            Modifier
          </SmallButton>
          <SmallButton
            onClick={onRun}
            disabled={running || !post.enabled}
            variant="success"
            title="Publier maintenant"
            colors={colors}
          >
            {running ? "Publication..." : "Publier"}
          </SmallButton>
          {confirmDelete ? (
            <div style={{ display: "flex", gap: 4 }}>
              <SmallButton
                onClick={onDelete}
                disabled={deleting}
                variant="danger"
                colors={colors}
              >
                {deleting ? "..." : "Confirmer"}
              </SmallButton>
              <SmallButton
                onClick={onCancelDelete}
                variant="ghost"
                colors={colors}
              >
                Non
              </SmallButton>
            </div>
          ) : (
            <SmallButton
              onClick={onDelete}
              variant="danger"
              title="Supprimer"
              colors={colors}
            >
              Supprimer
            </SmallButton>
          )}
        </div>
      </div>

      {/* Last run error inline */}
      {post.lastRunStatus === "error" && post.lastRunError && (
        <div
          style={{
            background: "#1c1012",
            border: "1px solid #ef444433",
            borderRadius: 8,
            padding: "8px 12px",
            color: "#fca5a5",
            fontSize: 12,
            fontFamily: "monospace",
            marginTop: 8,
          }}
        >
          {post.lastRunError}
        </div>
      )}

      {/* Run result inline */}
      {runResult && (
        <div style={{ marginTop: 12 }}>
          <PipelineResultCard
            result={runResult}
            onDismiss={onDismissResult}
            colors={colors}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pipeline Result Card
// ---------------------------------------------------------------------------

function PipelineResultCard({
  result,
  onDismiss,
  colors,
}: {
  result: PipelineResult;
  onDismiss: () => void;
  colors: ThemeColors;
}) {
  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 12,
        border: `1px solid ${result.success ? "#22c55e33" : "#ef444433"}`,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: result.success ? "#22c55e" : "#ef4444",
            display: "inline-block",
          }}
        />
        <span style={{ fontWeight: 600, fontSize: 14 }}>
          {result.success ? "Succes" : "Echec"}
        </span>
        <span style={{ color: colors.muted, fontSize: 13 }}>
          — {(result.durationMs / 1000).toFixed(1)}s
        </span>
        {result.postName && (
          <span
            style={{
              color: colors.muted,
              fontSize: 13,
              marginLeft: 4,
            }}
          >
            ({result.postName})
          </span>
        )}
        <button
          onClick={onDismiss}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: colors.muted,
            fontSize: 16,
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          {"\u2715"}
        </button>
      </div>

      {result.error && (
        <div
          style={{
            background: "#1c1012",
            border: "1px solid #ef444433",
            borderRadius: 8,
            padding: 12,
            color: "#fca5a5",
            fontSize: 14,
            fontFamily: "monospace",
            marginBottom: 12,
          }}
        >
          {result.error}
        </div>
      )}

      {result.imageBase64 && (
        <div style={{ marginBottom: 16, textAlign: "center" }}>
          <img
            src={`data:image/jpeg;base64,${result.imageBase64}`}
            alt="Image generee"
            style={{
              maxWidth: "100%",
              maxHeight: 400,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>
      )}

      {result.prompt && (
        <ResultBlock
          title="Theme"
          value={result.prompt.theme}
          colors={colors}
        />
      )}
      {result.content && (
        <>
          <ResultBlock
            title="Titre Pinterest"
            value={result.content.title}
            colors={colors}
          />
          <ResultBlock
            title="Description Pinterest"
            value={result.content.description}
            colors={colors}
          />
        </>
      )}
      {result.linkedin && (
        <ResultBlock
          title="Post LinkedIn"
          value={result.linkedin.post}
          colors={colors}
        />
      )}
      {result.pin && (
        <ResultBlock
          title="Pin publie"
          value={`ID: ${result.pin.pinId} — ${new Date(result.pin.createdAt).toLocaleString()}`}
          colors={colors}
        />
      )}
      {result.pins && result.pins.length > 0 && (
        <ResultBlock
          title="Pins publies"
          value={result.pins
            .map(
              (p) =>
                `ID: ${p.pinId} — ${new Date(p.createdAt).toLocaleString()}`,
            )
            .join("\n")}
          colors={colors}
        />
      )}
    </div>
  );
}

function ResultBlock({
  title,
  value,
  colors,
}: {
  title: string;
  value: string;
  colors: ThemeColors;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <p
        style={{
          fontSize: 12,
          color: colors.muted,
          margin: 0,
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 14,
          margin: 0,
          color: colors.text,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview Modal
// ---------------------------------------------------------------------------

function PreviewModal({
  preview,
  variants,
  activeVariant,
  onVariantChange,
  onClose,
  onApprove,
  onReject,
  onPublish,
  actionLoading,
  colors,
  dark,
  isMobile,
  onExport,
  exportLoading,
  exportData,
  exportCopied,
  onCopyExport,
}: {
  preview: PreviewData;
  variants: PreviewData[];
  activeVariant: number;
  onVariantChange: (idx: number) => void;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPublish: (id: string) => void;
  actionLoading: boolean;
  colors: ThemeColors;
  dark: boolean;
  isMobile: boolean;
  onExport: (preview: PreviewData) => void;
  exportLoading: boolean;
  exportData: SocialExport | null;
  exportCopied: string | null;
  onCopyExport: (text: string, platform: string) => void;
}) {
  const current = variants[activeVariant] || preview;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: dark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: isMobile ? 8 : 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: colors.card,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          maxWidth: 800,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 0,
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: isMobile ? "12px 14px" : "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: colors.card,
            zIndex: 1,
            borderRadius: "16px 16px 0 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              Apercu
            </h3>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: statusColors[current.status] || colors.muted,
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: `${statusColors[current.status] || colors.muted}22`,
              }}
            >
              {statusLabels[current.status] || current.status}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: colors.muted,
              fontSize: 20,
              cursor: "pointer",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            {"\u2715"}
          </button>
        </div>

        {/* Variant tabs (A/B) */}
        {variants.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: `1px solid ${colors.border}`,
              padding: isMobile ? "0 14px" : "0 20px",
              overflowX: isMobile ? "auto" : "visible",
            }}
          >
            {variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => onVariantChange(idx)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    idx === activeVariant
                      ? `2px solid ${colors.accent}`
                      : "2px solid transparent",
                  color:
                    idx === activeVariant ? colors.accent : colors.muted,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: idx === activeVariant ? 600 : 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                Variante {String.fromCharCode(65 + idx)}
                {v.variantIndex !== undefined &&
                  ` (#${v.variantIndex + 1})`}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: isMobile ? 14 : 20 }}>
          {/* Image */}
          {current.imageBase64 && (
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <img
                src={`data:${current.imageContentType || "image/jpeg"};base64,${current.imageBase64}`}
                alt={current.content.altText || "Preview"}
                style={{
                  maxWidth: "100%",
                  maxHeight: isMobile ? 350 : 500,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
          )}

          {/* Title & Description */}
          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: 0,
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Titre Pinterest
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                margin: 0,
                color: colors.text,
              }}
            >
              {current.content.title || "—"}
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: 0,
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Description Pinterest
            </p>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                color: colors.text,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {current.content.description || "—"}
            </p>
          </div>

          {/* LinkedIn */}
          {current.linkedin?.post && (
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 12,
                  color: colors.muted,
                  margin: 0,
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                Post LinkedIn
              </p>
              <div
                style={{
                  background: colors.bg,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                  padding: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    margin: 0,
                    color: colors.text,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {current.linkedin.post}
                </p>
              </div>
            </div>
          )}

          {/* Prompt info */}
          {current.prompt && (
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 12,
                  color: colors.muted,
                  margin: 0,
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                Theme / Style
              </p>
              <p
                style={{
                  fontSize: 13,
                  margin: 0,
                  color: colors.muted,
                }}
              >
                {current.prompt.theme}
                {current.prompt.style &&
                  ` — ${current.prompt.style}`}
              </p>
            </div>
          )}

          {/* Schedule info */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: 0,
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Planifie pour
            </p>
            <p
              style={{
                fontSize: 13,
                margin: 0,
                color: colors.muted,
              }}
            >
              {new Date(current.scheduledFor).toLocaleDateString(
                "fr-FR",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                },
              )}{" "}
              a {padTime(current.scheduledHour)}:
              {padTime(current.scheduledMinute)}
            </p>
          </div>

          {/* =========== Export multi-plateforme =========== */}
          <div
            style={{
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 16,
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: 0,
                marginBottom: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Exporter multi-plateforme
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: exportData ? 12 : 0,
              }}
            >
              <button
                onClick={() => onExport(current)}
                disabled={exportLoading}
                style={{
                  background: "#0077b5",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: exportLoading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  opacity: exportLoading ? 0.6 : 1,
                }}
              >
                {exportLoading ? "..." : "LinkedIn"}
              </button>
              <button
                onClick={() => onExport(current)}
                disabled={exportLoading}
                style={{
                  background:
                    "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: exportLoading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  opacity: exportLoading ? 0.6 : 1,
                }}
              >
                {exportLoading ? "..." : "Instagram"}
              </button>
              <button
                onClick={() => onExport(current)}
                disabled={exportLoading}
                style={{
                  background: "#1877f2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: exportLoading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  opacity: exportLoading ? 0.6 : 1,
                }}
              >
                {exportLoading ? "..." : "Facebook"}
              </button>
            </div>

            {/* Export results */}
            {exportData && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {(
                  [
                    ["linkedin", "LinkedIn", exportData.linkedin],
                    ["instagram", "Instagram", exportData.instagram],
                    ["facebook", "Facebook", exportData.facebook],
                  ] as [string, string, string][]
                ).map(([key, label, text]) =>
                  text ? (
                    <div key={key}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: colors.muted,
                          }}
                        >
                          {label}
                        </span>
                        <button
                          onClick={() => onCopyExport(text, key)}
                          style={{
                            background: "transparent",
                            border: `1px solid ${colors.border}`,
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: 11,
                            cursor: "pointer",
                            color:
                              exportCopied === key
                                ? "#22c55e"
                                : colors.muted,
                            fontFamily: "inherit",
                          }}
                        >
                          {exportCopied === key ? "Copie !" : "Copier"}
                        </button>
                      </div>
                      <textarea
                        readOnly
                        value={text}
                        rows={4}
                        style={{
                          width: "100%",
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 8,
                          padding: "8px 10px",
                          fontSize: 12,
                          fontFamily: "inherit",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 16,
              flexWrap: "wrap",
            }}
          >
            {current.status === "pending" && (
              <>
                <button
                  onClick={() => onApprove(current.id)}
                  disabled={actionLoading}
                  style={{
                    background: actionLoading
                      ? colors.border
                      : "#14532d",
                    color: actionLoading ? colors.muted : "#86efac",
                    border: "1px solid #166534",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: actionLoading
                      ? "not-allowed"
                      : "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {actionLoading ? "..." : "Approuver"}
                </button>
                <button
                  onClick={() => onReject(current.id)}
                  disabled={actionLoading}
                  style={{
                    background: actionLoading
                      ? colors.border
                      : "#7f1d1d",
                    color: actionLoading ? colors.muted : "#fca5a5",
                    border: "1px solid #991b1b",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: actionLoading
                      ? "not-allowed"
                      : "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {actionLoading ? "..." : "Rejeter"}
                </button>
              </>
            )}
            {current.status === "approved" && (
              <button
                onClick={() => onPublish(current.id)}
                disabled={actionLoading}
                style={{
                  background: actionLoading
                    ? colors.border
                    : "linear-gradient(135deg, #e63232, #ff4444)",
                  color: actionLoading ? colors.muted : "#0a0a0f",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: actionLoading
                    ? "not-allowed"
                    : "pointer",
                  fontFamily: "inherit",
                }}
              >
                {actionLoading ? "Publication..." : "Publier maintenant"}
              </button>
            )}
            {current.status === "rejected" && (
              <button
                onClick={() => onApprove(current.id)}
                disabled={actionLoading}
                style={{
                  background: actionLoading
                    ? colors.border
                    : "#14532d",
                  color: actionLoading ? colors.muted : "#86efac",
                  border: "1px solid #166534",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: actionLoading
                    ? "not-allowed"
                    : "pointer",
                  fontFamily: "inherit",
                }}
              >
                {actionLoading ? "..." : "Re-approuver"}
              </button>
            )}
            {current.status === "published" && (
              <span
                style={{
                  fontSize: 13,
                  color: "#3b82f6",
                  fontWeight: 600,
                }}
              >
                Deja publie
              </span>
            )}
            <button
              onClick={onClose}
              style={{
                marginLeft: "auto",
                background: "transparent",
                color: colors.muted,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prompt Card
// ---------------------------------------------------------------------------

function PromptCard({
  prompt,
  deleting,
  onDelete,
  colors,
  isMobile,
}: {
  prompt: SavedPrompt;
  deleting: boolean;
  onDelete: () => void;
  colors: ThemeColors;
  isMobile: boolean;
}) {
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        padding: isMobile ? "12px 14px" : "14px 18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "flex-start",
          gap: 12,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0, width: isMobile ? "100%" : undefined }}>
          {/* Performance badge */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: perfColors[prompt.performance] || colors.muted,
              marginTop: 6,
              flexShrink: 0,
            }}
            title={`Performance: ${perfLabels[prompt.performance] || prompt.performance}`}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {prompt.title || prompt.theme}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: perfColors[prompt.performance] || colors.muted,
                  textTransform: "uppercase",
                  padding: "1px 6px",
                  borderRadius: 4,
                  background: `${perfColors[prompt.performance] || colors.muted}22`,
                }}
              >
                {perfLabels[prompt.performance] || prompt.performance}
              </span>
            </div>

            {/* Theme */}
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: "0 0 4px",
              }}
            >
              Theme: {prompt.theme}
              {prompt.style && ` — ${prompt.style}`}
            </p>

            {/* Image prompt (truncated) */}
            <p
              style={{
                fontSize: 12,
                color: colors.muted,
                margin: "0 0 6px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: isMobile ? "100%" : 600,
                opacity: 0.6,
              }}
              title={prompt.imagePrompt}
            >
              {prompt.imagePrompt}
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 11,
                color: colors.muted,
                flexWrap: "wrap",
              }}
            >
              <span>Utilise {prompt.usedCount}x</span>
              {prompt.impressions !== undefined && (
                <span style={{ color: "#3b82f6" }}>
                  {prompt.impressions} impressions
                </span>
              )}
              {prompt.saves !== undefined && (
                <span style={{ color: "#22c55e" }}>
                  {prompt.saves} saves
                </span>
              )}
              {prompt.clicks !== undefined && (
                <span style={{ color: colors.accent }}>
                  {prompt.clicks} clics
                </span>
              )}
              <span>
                Cree le{" "}
                {new Date(prompt.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
        </div>

        {/* Delete */}
        <div
          style={{
            display: "flex",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {confirmDel ? (
            <>
              <SmallButton
                onClick={() => {
                  onDelete();
                  setConfirmDel(false);
                }}
                disabled={deleting}
                variant="danger"
                colors={colors}
              >
                {deleting ? "..." : "Confirmer"}
              </SmallButton>
              <SmallButton
                onClick={() => setConfirmDel(false)}
                variant="ghost"
                colors={colors}
              >
                Non
              </SmallButton>
            </>
          ) : (
            <SmallButton
              onClick={() => setConfirmDel(true)}
              variant="danger"
              title="Supprimer"
              colors={colors}
            >
              Supprimer
            </SmallButton>
          )}
        </div>
      </div>
    </div>
  );
}
