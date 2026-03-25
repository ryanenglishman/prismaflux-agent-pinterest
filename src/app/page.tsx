"use client";

import { useState, useEffect, useCallback } from "react";

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
  error?: string;
  durationMs: number;
  postName?: string;
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

const EMPTY_FORM: PostForm = {
  name: "",
  boardId: "",
  boardName: "",
  cronExpression: "0 16 * * *",
  theme: "",
  customInstructions: "",
  link: "https://auto-prismaflux.com",
};

interface PostForm {
  name: string;
  boardId: string;
  boardName: string;
  cronExpression: string;
  theme: string;
  customInstructions: string;
  link: string;
}

// ---------------------------------------------------------------------------
// Helper: human-readable cron
// ---------------------------------------------------------------------------

function cronToHuman(cron: string): string {
  const match = SCHEDULE_OPTIONS.find((o) => o.value === cron);
  if (match) return match.label;
  return cron;
}

// ---------------------------------------------------------------------------
// Helper: relative time
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function Dashboard() {
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
    if (boardsLoaded) return;
    try {
      const res = await fetch("/api/marketing/pinterest/boards");
      if (res.ok) {
        const data = await res.json();
        setBoards(data.boards || []);
      }
    } catch {
      /* silent */
    }
    setBoardsLoaded(true);
  }, [boardsLoaded]);

  // -------------------------------------------------------------------------
  // Mount
  // -------------------------------------------------------------------------

  useEffect(() => {
    fetchAuth();
    fetchPosts();
  }, [fetchAuth, fetchPosts]);

  // Fetch boards when form opens and connected
  useEffect(() => {
    if (formOpen && auth?.connected && !boardsLoaded) {
      fetchBoards();
    }
  }, [formOpen, auth, boardsLoaded, fetchBoards]);

  // -------------------------------------------------------------------------
  // Handlers
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
      boardId: post.boardId,
      boardName: post.boardName,
      cronExpression: post.cronExpression,
      theme: post.theme || "",
      customInstructions: post.customInstructions || "",
      link: post.link,
    });
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setFormError(null);
  }

  async function saveForm() {
    if (!form.name.trim()) {
      setFormError("Le nom est requis");
      return;
    }
    if (!form.boardId) {
      setFormError("Selectionnez un tableau");
      return;
    }

    setFormSaving(true);
    setFormError(null);

    try {
      const body = {
        name: form.name.trim(),
        boardId: form.boardId,
        boardName: form.boardName,
        cronExpression: form.cronExpression,
        theme: form.theme || null,
        customInstructions: form.customInstructions.trim() || null,
        link: form.link.trim() || "https://auto-prismaflux.com",
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
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e4e4e7",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #27272a",
          padding: "20px 32px",
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
            background: "linear-gradient(135deg, #eab308, #f59e0b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#0a0a0f",
          }}
        >
          P
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            PrismaFlux — Agent Pinterest
          </h1>
          <p style={{ fontSize: 13, color: "#71717a", margin: 0 }}>
            Publication automatique multi-plateformes
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "32px 24px" }}>
        {/* ----------------------------------------------------------------- */}
        {/* Auth Section                                                      */}
        {/* ----------------------------------------------------------------- */}
        <section style={{ marginBottom: 28 }}>
          <SectionTitle>Connexion Pinterest</SectionTitle>
          <div
            style={{
              background: "#18181b",
              borderRadius: 12,
              border: "1px solid #27272a",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {authLoading ? (
              <span style={{ color: "#71717a", fontSize: 14 }}>
                Chargement...
              </span>
            ) : auth?.connected ? (
              <>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: auth.needsReauth ? "#f59e0b" : "#22c55e",
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
                      color: auth.needsReauth ? "#f59e0b" : "#71717a",
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
                      background: "linear-gradient(135deg, #eab308, #f59e0b)",
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
                    color: "#71717a",
                    border: "1px solid #27272a",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
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
                <span style={{ fontSize: 14, color: "#a1a1aa", flex: 1 }}>
                  Non connecte a Pinterest
                </span>
                <a
                  href="/api/auth/pinterest"
                  style={{
                    background: "linear-gradient(135deg, #eab308, #f59e0b)",
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

        {/* ----------------------------------------------------------------- */}
        {/* Status Cards                                                      */}
        {/* ----------------------------------------------------------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <StatusCard
            label="Pipeline"
            value="GPT-4o + gpt-image-1"
            color="#22c55e"
          />
          <StatusCard label="Format" value="JPEG 1024x1536" color="#3b82f6" />
          <StatusCard label="Cron" value="Configurable" color="#eab308" />
          <StatusCard
            label="Plateformes"
            value="Pinterest + LinkedIn"
            color="#ec4899"
          />
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Scheduled Posts                                                    */}
        {/* ----------------------------------------------------------------- */}
        <section style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <SectionTitle style={{ marginBottom: 0 }}>
              Publications planifiees
            </SectionTitle>
            <button
              onClick={openCreateForm}
              style={{
                background: "linear-gradient(135deg, #eab308, #f59e0b)",
                color: "#0a0a0f",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Nouvelle publication
            </button>
          </div>

          {/* Form (create / edit) */}
          {formOpen && (
            <div
              style={{
                background: "#18181b",
                borderRadius: 12,
                border: "1px solid #eab30833",
                padding: 20,
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
                    color: "#71717a",
                    fontSize: 18,
                    cursor: "pointer",
                    padding: "4px 8px",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                {/* Name */}
                <div>
                  <FormLabel>Nom</FormLabel>
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

                {/* Board */}
                <div>
                  <FormLabel>Tableau Pinterest</FormLabel>
                  <select
                    value={form.boardId}
                    onChange={(e) => {
                      const board = boards.find(
                        (b) => b.id === e.target.value,
                      );
                      setForm({
                        ...form,
                        boardId: e.target.value,
                        boardName: board?.name || "",
                      });
                    }}
                    style={inputStyle}
                  >
                    <option value="">
                      {boards.length === 0
                        ? "Chargement des tableaux..."
                        : "Choisir un tableau"}
                    </option>
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.pinCount} pins)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Schedule */}
                <div>
                  <FormLabel>Frequence</FormLabel>
                  <select
                    value={form.cronExpression}
                    onChange={(e) =>
                      setForm({ ...form, cronExpression: e.target.value })
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
                  <FormLabel>Theme visuel</FormLabel>
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
              </div>

              {/* Link */}
              <div style={{ marginBottom: 12 }}>
                <FormLabel>Lien de destination</FormLabel>
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

              {/* Custom Instructions */}
              <div style={{ marginBottom: 16 }}>
                <FormLabel>Instructions personnalisees (optionnel)</FormLabel>
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
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={saveForm}
                  disabled={formSaving}
                  style={{
                    background: formSaving
                      ? "#27272a"
                      : "linear-gradient(135deg, #eab308, #f59e0b)",
                    color: formSaving ? "#71717a" : "#0a0a0f",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: formSaving ? "not-allowed" : "pointer",
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
                    color: "#a1a1aa",
                    border: "1px solid #27272a",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
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
                background: "#18181b",
                borderRadius: 12,
                border: "1px solid #27272a",
                padding: "32px 20px",
                textAlign: "center",
                color: "#71717a",
                fontSize: 14,
              }}
            >
              Chargement des publications...
            </div>
          ) : posts.length === 0 ? (
            <div
              style={{
                background: "#18181b",
                borderRadius: 12,
                border: "1px solid #27272a",
                padding: "32px 20px",
                textAlign: "center",
                color: "#71717a",
                fontSize: 14,
              }}
            >
              Aucune publication planifiee.
              Cliquez sur &quot;+ Nouvelle publication&quot; pour commencer.
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

        {/* ----------------------------------------------------------------- */}
        {/* Test Section                                                      */}
        {/* ----------------------------------------------------------------- */}
        <section style={{ marginBottom: 32 }}>
          <SectionTitle>Test du pipeline</SectionTitle>
          <button
            onClick={runTest}
            disabled={testLoading}
            style={{
              background: testLoading
                ? "#27272a"
                : "linear-gradient(135deg, #eab308, #f59e0b)",
              color: testLoading ? "#71717a" : "#0a0a0f",
              border: "none",
              borderRadius: 10,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: testLoading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {testLoading
              ? "Generation en cours..."
              : "Lancer un test (dry-run)"}
          </button>
          <p style={{ fontSize: 13, color: "#71717a", marginTop: 8 }}>
            Genere image + contenu Pinterest + post LinkedIn sans publier.
            Necessite OPENAI_API_KEY.
          </p>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* Test Result                                                       */}
        {/* ----------------------------------------------------------------- */}
        {testResult && (
          <section style={{ marginBottom: 32 }}>
            <SectionTitle>Resultat du test</SectionTitle>
            <PipelineResultCard
              result={testResult}
              onDismiss={() => setTestResult(null)}
            />
          </section>
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared Styles
// ---------------------------------------------------------------------------

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0a0a0f",
  color: "#e4e4e7",
  border: "1px solid #27272a",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

// ---------------------------------------------------------------------------
// Sub-Components
// ---------------------------------------------------------------------------

function SectionTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#a1a1aa",
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

function StatusCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 12,
        border: "1px solid #27272a",
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: "#71717a",
          margin: 0,
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 15, fontWeight: 600, margin: 0, color }}>
        {value}
      </p>
    </div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 12,
        color: "#a1a1aa",
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
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger" | "success" | "ghost";
  title?: string;
}) {
  const bgMap = {
    default: "#27272a",
    danger: "#7f1d1d",
    success: "#14532d",
    ghost: "transparent",
  };
  const colorMap = {
    default: "#e4e4e7",
    danger: "#fca5a5",
    success: "#86efac",
    ghost: "#71717a",
  };
  const borderMap = {
    default: "1px solid #3f3f46",
    danger: "1px solid #991b1b",
    success: "1px solid #166534",
    ghost: "1px solid #27272a",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: disabled ? "#1c1c1e" : bgMap[variant],
        color: disabled ? "#52525b" : colorMap[variant],
        border: borderMap[variant],
        borderRadius: 6,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Post Card
// ---------------------------------------------------------------------------

function PostCard({
  post,
  running,
  deleting,
  toggling,
  confirmDelete,
  runResult,
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
  onEdit: () => void;
  onRun: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onCancelDelete: () => void;
  onDismissResult: () => void;
}) {
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 12,
        border: `1px solid ${post.enabled ? "#27272a" : "#1c1c1e"}`,
        padding: "16px 20px",
        opacity: post.enabled ? 1 : 0.7,
        transition: "opacity 0.2s",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 10,
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
            background: post.enabled ? "#eab308" : "#3f3f46",
            cursor: toggling ? "not-allowed" : "pointer",
            position: "relative",
            flexShrink: 0,
            marginTop: 2,
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

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
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
              gap: 16,
              flexWrap: "wrap",
              fontSize: 13,
              color: "#71717a",
            }}
          >
            <span title="Tableau">
              <span style={{ color: "#ec4899" }}>●</span>{" "}
              {post.boardName}
            </span>
            <span title="Frequence">
              <span style={{ color: "#eab308" }}>●</span>{" "}
              {cronToHuman(post.cronExpression)}
            </span>
            {post.theme && (
              <span
                title="Theme"
                style={{
                  maxWidth: 220,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#3b82f6" }}>●</span>{" "}
                {post.theme}
              </span>
            )}
            {post.lastRunAt && (
              <span title={`Dernier run: ${new Date(post.lastRunAt).toLocaleString()}`}>
                Dernier run: {timeAgo(post.lastRunAt)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}
        >
          <SmallButton onClick={onEdit} title="Modifier">
            Modifier
          </SmallButton>
          <SmallButton
            onClick={onRun}
            disabled={running || !post.enabled}
            variant="success"
            title="Publier maintenant"
          >
            {running ? "Publication..." : "Publier"}
          </SmallButton>
          {confirmDelete ? (
            <div style={{ display: "flex", gap: 4 }}>
              <SmallButton
                onClick={onDelete}
                disabled={deleting}
                variant="danger"
              >
                {deleting ? "..." : "Confirmer"}
              </SmallButton>
              <SmallButton onClick={onCancelDelete} variant="ghost">
                Non
              </SmallButton>
            </div>
          ) : (
            <SmallButton onClick={onDelete} variant="danger" title="Supprimer">
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
          <PipelineResultCard result={runResult} onDismiss={onDismissResult} />
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
}: {
  result: PipelineResult;
  onDismiss: () => void;
}) {
  return (
    <div
      style={{
        background: "#18181b",
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
        <span style={{ color: "#71717a", fontSize: 13 }}>
          — {(result.durationMs / 1000).toFixed(1)}s
        </span>
        {result.postName && (
          <span style={{ color: "#a1a1aa", fontSize: 13, marginLeft: 4 }}>
            ({result.postName})
          </span>
        )}
        <button
          onClick={onDismiss}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: "#71717a",
            fontSize: 16,
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          ✕
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

      {result.prompt && (
        <ResultBlock title="Theme" value={result.prompt.theme} />
      )}
      {result.content && (
        <>
          <ResultBlock title="Titre Pinterest" value={result.content.title} />
          <ResultBlock
            title="Description Pinterest"
            value={result.content.description}
          />
        </>
      )}
      {result.linkedin && (
        <ResultBlock title="Post LinkedIn" value={result.linkedin.post} />
      )}
      {result.pin && (
        <ResultBlock
          title="Pin publie"
          value={`ID: ${result.pin.pinId} — ${new Date(result.pin.createdAt).toLocaleString()}`}
        />
      )}
    </div>
  );
}

function ResultBlock({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ marginTop: 12 }}>
      <p
        style={{
          fontSize: 12,
          color: "#71717a",
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
          color: "#d4d4d8",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {value}
      </p>
    </div>
  );
}
