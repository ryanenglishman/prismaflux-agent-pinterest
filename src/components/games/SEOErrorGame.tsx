"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Clock, Trophy, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SEOError {
  id: number;
  zone: { top: string; left: string; width: string; height: string };
  title: string;
  explanation: string;
  correction: string;
  severity: "critical" | "high" | "medium";
}

const SEO_ERRORS: SEOError[] = [
  {
    id: 1,
    zone: { top: "4%", left: "28%", width: "56%", height: "6%" },
    title: "Connexion non securisee (HTTP au lieu de HTTPS)",
    explanation: "Le site utilise HTTP au lieu de HTTPS. Google penalise les sites non securises et Chrome affiche 'Non securise' — ce qui fait fuir 85% des visiteurs avant meme de voir le contenu.",
    correction: "Installer un certificat SSL (gratuit avec Let's Encrypt) et configurer la redirection permanente HTTP → HTTPS.",
    severity: "critical",
  },
  {
    id: 2,
    zone: { top: "12%", left: "3%", width: "30%", height: "7%" },
    title: "Balise H1 absente — logo au lieu du titre",
    explanation: "Aucune balise H1 sur la page. Le logo est utilise a la place du titre principal. Google utilise le H1 pour comprendre le sujet de la page — sans lui, le referencement est fortement impacte.",
    correction: "Ajouter un titre H1 unique et descriptif contenant le mot-cle principal. Le logo doit etre dans une balise distincte.",
    severity: "critical",
  },
  {
    id: 3,
    zone: { top: "22%", left: "3%", width: "60%", height: "5%" },
    title: "Meta description trop longue (160+ caracteres)",
    explanation: "La meta description depasse 160 caracteres — Google la tronque dans les resultats. Une description coupee perd en impact et peut reduire votre taux de clic de 30%.",
    correction: "Rediger une meta description de 150-160 caracteres avec mot-cle principal + appel a l'action incitatif.",
    severity: "high",
  },
  {
    id: 4,
    zone: { top: "32%", left: "55%", width: "42%", height: "22%" },
    title: "Image sans attribut alt — invisible pour Google",
    explanation: "L'image principale n'a pas d'attribut alt. Google ne peut pas 'voir' les images — il depend du texte alt pour comprendre et indexer le contenu visuel. C'est aussi un probleme d'accessibilite.",
    correction: "Ajouter un attribut alt descriptif et naturel a chaque image. Inclure le mot-cle si pertinent, sans sur-optimiser.",
    severity: "high",
  },
  {
    id: 5,
    zone: { top: "58%", left: "3%", width: "28%", height: "5%" },
    title: "Lien brise — erreur 404 detectee",
    explanation: "Un lien interne pointe vers une page qui n'existe plus (erreur 404). Les liens brises degradent l'experience utilisateur ET le budget de crawl de Google — deux penalites en une.",
    correction: "Scanner les liens brises regulierement (Screaming Frog, Ahrefs). Corriger ou rediriger (301) les URLs cassees.",
    severity: "high",
  },
  {
    id: 6,
    zone: { top: "66%", left: "3%", width: "94%", height: "6%" },
    title: "Vitesse de chargement critique (8+ secondes)",
    explanation: "Le temps de chargement depasse 8 secondes. Google recommande moins de 2,5 secondes pour le LCP (Largest Contentful Paint). 53% des visiteurs mobiles abandonnent apres 3 secondes.",
    correction: "Optimiser les images (WebP), minifier CSS/JS, activer la compression GZIP, utiliser un CDN et mettre en cache les ressources statiques.",
    severity: "critical",
  },
  {
    id: 7,
    zone: { top: "76%", left: "25%", width: "50%", height: "8%" },
    title: "Aucun appel a l'action (CTA) visible",
    explanation: "Pas de bouton d'action au-dessus de la ligne de flottaison. Sans CTA, le visiteur ne sait pas quoi faire et quitte le site. Chaque page doit guider vers une action concrete.",
    correction: "Placer un CTA visible et clair dans les 600 premiers pixels : 'Demander un devis', 'Nous contacter', 'Prendre rendez-vous'.",
    severity: "medium",
  },
];

const SEVERITY_COLORS = {
  critical: { bg: "bg-red-500/10", text: "text-red-400", label: "Critique" },
  high: { bg: "bg-orange-500/10", text: "text-orange-400", label: "Important" },
  medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Modere" },
};

export function SEOErrorGame() {
  const [found, setFound] = useState<number[]>([]);
  const [activeError, setActiveError] = useState<SEOError | null>(null);
  const [wrongClick, setWrongClick] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Show hint after 60 seconds if less than 3 found
  useEffect(() => {
    if (timer === 60 && found.length < 3) setShowHint(true);
  }, [timer, found.length]);

  const handleZoneClick = (error: SEOError) => {
    if (found.includes(error.id)) return;
    setFound((f) => [...f, error.id]);
    setActiveError(error);
    setShowHint(false);
    if (found.length + 1 === 7) setGameOver(true);
  };

  const handleMissClick = () => {
    if (activeError) return;
    setWrongClick(true);
    setWrongCount((c) => c + 1);
    setTimeout(() => setWrongClick(false), 400);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const getScore = () => {
    const timeBonus = Math.max(0, 100 - timer);
    const accuracyBonus = Math.max(0, 50 - wrongCount * 5);
    return Math.min(100, 50 + Math.round((timeBonus + accuracyBonus) / 3));
  };

  // ─── VICTORY SCREEN ───
  if (gameOver && !activeError) {
    const score = getScore();
    return (
      <motion.div
        className="glass-card p-8 md:p-10 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Trophy size={56} className="text-brand mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-bold text-text mb-2">
          7/7 erreurs trouvees !
        </h3>
        <div className="flex justify-center gap-6 my-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand">{formatTime(timer)}</p>
            <p className="text-xs text-text-muted">Temps</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand">{score}/100</p>
            <p className="text-xs text-text-muted">Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-secondary">{wrongCount}</p>
            <p className="text-xs text-text-muted">Faux clics</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
          Vous avez l&apos;oeil pour les erreurs SEO ! Ces 7 erreurs sont parmi
          les plus courantes sur les sites web en province de Liege. Imaginez ce
          qu&apos;un audit complet pourrait reveler sur votre propre site...
        </p>
        <Button href="/contact" size="lg" className="pulse-glow">
          Audit SEO gratuit de mon site
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </motion.div>
    );
  }

  // ─── GAME SCREEN ───
  return (
    <div>
      {/* Header stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-brand">{found.length}/7</span>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i < found.length ? "bg-brand" : "bg-bg-card border border-border"
                }`}
                animate={i === found.length - 1 && found.length > 0 ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {wrongCount > 0 && (
            <span className="text-xs text-text-muted">{wrongCount} faux clic{wrongCount > 1 ? "s" : ""}</span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-text-muted font-mono">
            <Clock size={14} />
            {formatTime(timer)}
          </span>
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="mb-4 p-3 rounded-xl bg-brand-dim/50 border border-brand/10 flex items-start gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Lightbulb size={14} className="text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary">
              Indice : regardez attentivement la barre d&apos;adresse, les images, les titres et les temps de chargement. Chaque zone cliquable correspond a une erreur SEO courante.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fake website */}
      <div
        className={`relative rounded-2xl border-2 overflow-hidden transition-colors cursor-crosshair ${
          wrongClick ? "border-red-500/50" : "border-border"
        }`}
        onClick={handleMissClick}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-bg-surface border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <div className="ml-3 flex-1 h-6 rounded-lg bg-bg-card flex items-center px-3 text-[11px] text-text-muted border border-border/50">
            <span className="text-red-400 mr-1.5 text-xs">⚠ Non securise</span>
            <span className="text-text-muted/60">|</span>
            <span className="ml-1.5">http://www.boulangerie-martin-liege.be/accueil</span>
          </div>
        </div>

        {/* Page content — realistic fake site */}
        <div className="relative bg-[#fafafa] dark:bg-bg-card p-4 md:p-6" style={{ minHeight: "450px" }}>
          {/* Nav bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600/20" />
              <span className="text-sm font-bold text-text/70">Boulangerie Martin</span>
            </div>
            <div className="flex gap-4">
              <span className="text-[10px] text-text-muted/60">Accueil</span>
              <span className="text-[10px] text-text-muted/60">Nos pains</span>
              <span className="text-[10px] text-text-muted/60">Horaires</span>
              <span className="text-[10px] text-text-muted/60">Contact</span>
            </div>
          </div>

          {/* Meta description bar (visible for the game) */}
          <div className="mb-5 p-2 rounded-lg bg-bg-surface/50 border border-border/30">
            <div className="text-[9px] text-text-muted/50 mb-0.5">Meta description :</div>
            <div className="text-[10px] text-text-secondary/60 leading-relaxed">
              Bienvenue a la Boulangerie Martin, votre artisan boulanger au coeur de Liege depuis 1987. Decouvrez nos pains artisanaux, viennoiseries, patisseries et sandwiches faits maison chaque jour avec des ingredients de qualite. Ouvert du lundi au samedi de 6h a 19h. Livraison disponible a Liege, Seraing et Herstal. Commandez en ligne sur notre site. La meilleure boulangerie de...
            </div>
          </div>

          {/* Content area */}
          <div className="flex gap-5 mb-5">
            <div className="flex-1 space-y-3">
              <div className="h-5 rounded bg-bg-surface/60 w-2/3" />
              <div className="h-2.5 rounded-full bg-bg-surface/40 w-full" />
              <div className="h-2.5 rounded-full bg-bg-surface/40 w-5/6" />
              <div className="h-2.5 rounded-full bg-bg-surface/40 w-full" />
              <div className="h-2.5 rounded-full bg-bg-surface/40 w-4/5" />
              <div className="h-2.5 rounded-full bg-bg-surface/40 w-3/4" />
            </div>
            <div className="w-2/5 shrink-0">
              <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-amber-100/30 to-amber-50/20 border border-dashed border-border/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">🍞</div>
                  <div className="text-[8px] text-text-muted/40">photo-pain.jpg</div>
                  <div className="text-[7px] text-red-400/60 mt-0.5">alt=""</div>
                </div>
              </div>
            </div>
          </div>

          {/* Broken link area */}
          <div className="mb-5">
            <span className="text-[10px] text-red-400/80 underline">→ Voir nos promotions (erreur 404 — page introuvable)</span>
          </div>

          {/* Loading bar */}
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-bg-surface/60 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-orange-400/40"
                  animate={{ width: ["20%", "35%", "25%", "30%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <span className="text-[9px] text-orange-400/70 font-mono">8.4s</span>
            </div>
            <p className="text-[8px] text-text-muted/40 mt-1">Chargement en cours... Page non optimisee</p>
          </div>

          {/* Missing CTA */}
          <div className="flex justify-center mt-6">
            <div className="w-40 h-10 rounded-full border-2 border-dashed border-border/20 flex items-center justify-center">
              <span className="text-[9px] text-text-muted/25">[ Bouton absent ]</span>
            </div>
          </div>

          {/* Clickable error zones */}
          {SEO_ERRORS.map((error) => (
            <div
              key={error.id}
              onClick={(e) => {
                e.stopPropagation();
                handleZoneClick(error);
              }}
              className={`absolute rounded-lg transition-all ${
                found.includes(error.id)
                  ? "border-2 border-green-400/50 bg-green-400/5"
                  : "hover:bg-brand/5 hover:border hover:border-brand/20"
              }`}
              style={error.zone}
            >
              {found.includes(error.id) && (
                <motion.div
                  className="absolute -top-1.5 -right-1.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle2 size={16} className="text-green-400" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error explanation popup */}
      <AnimatePresence>
        {activeError && (
          <motion.div
            className="mt-4 glass-card p-5 md:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SEVERITY_COLORS[activeError.severity].bg} ${SEVERITY_COLORS[activeError.severity].text}`}>
                  {SEVERITY_COLORS[activeError.severity].label}
                </span>
                <h4 className="text-sm font-bold text-text">
                  Erreur #{activeError.id}
                </h4>
              </div>
              <button
                onClick={() => setActiveError(null)}
                className="text-text-muted hover:text-text cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            </div>
            <h5 className="text-base font-semibold text-brand mb-2">{activeError.title}</h5>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {activeError.explanation}
            </p>
            <div className="p-3 rounded-lg bg-brand-dim/30 border border-brand/10">
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-brand">Comment corriger :</strong> {activeError.correction}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
