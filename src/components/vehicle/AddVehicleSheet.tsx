"use client";

import { useState } from "react";
import { useOverlay } from "@/components/navigation/OverlayContext";

type FieldConf = "high" | "medium" | "low" | "manual";

type Field = {
  label: string;
  value: string;
  conf: FieldConf;
  aiScore?: number;
};

const MOCK_AI_FIELDS: Field[] = [
  { label: "Marque",       value: "Volkswagen",          conf: "high",   aiScore: 99 },
  { label: "Modèle",       value: "Golf 8 GTI",          conf: "high",   aiScore: 97 },
  { label: "Année",        value: "2022",                conf: "high",   aiScore: 98 },
  { label: "Carburant",    value: "Essence",             conf: "high",   aiScore: 96 },
  { label: "Transmission", value: "DSG 7",               conf: "high",   aiScore: 94 },
  { label: "Kilométrage",  value: "28 400 km",           conf: "medium", aiScore: 82 },
  { label: "Prix",         value: "34 900 €",            conf: "manual" },
  { label: "Couleur",      value: "Blanc Pur",           conf: "medium", aiScore: 78 },
  { label: "Puissance",    value: "245 ch",              conf: "high",   aiScore: 95 },
  { label: "VIN",          value: "WVWZZZAU8NW004321",  conf: "low",    aiScore: 61 },
];

const CONF_STYLE: Record<FieldConf, { color: string; bg: string; border: string }> = {
  high:   { color: "#00E676", bg: "rgba(0,230,118,0.10)",  border: "rgba(0,230,118,0.22)" },
  medium: { color: "#FFD740", bg: "rgba(255,215,64,0.10)", border: "rgba(255,215,64,0.22)" },
  low:    { color: "#FF5252", bg: "rgba(255,82,82,0.10)",  border: "rgba(255,82,82,0.22)" },
  manual: { color: "rgba(255,255,255,0.55)", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.10)" },
};

function confLabel(conf: FieldConf, score?: number) {
  if (conf === "manual") return "À compléter";
  if (score && score >= 90) return `Robin — ${score}% de certitude`;
  if (score) return `Robin — ${score}% de certitude`;
  return "Deviné par Robin";
}

const STEPS = ["upload", "filling", "review"] as const;
type Step = typeof STEPS[number];

export default function AddVehicleSheet() {
  const { overlay, close } = useOverlay();
  const [step, setStep] = useState<Step>("upload");
  const [uploaded, setUploaded] = useState(false);

  if (overlay !== "vehicle") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
      style={{ top: "6%", zIndex: 60 }}
    >
      <div
        className="flex-1 flex flex-col rounded-t-3xl overflow-hidden"
        style={{
          background: "#0A0A0E",
          border: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "none",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.20)" }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-4">
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: "#FF8C5A" }}
            >
              🦅 Robin
            </div>
            <h2 className="text-lg font-bold" style={{ color: "#ffffff" }}>
              Nouveau véhicule
            </h2>
          </div>
          <button
            onClick={close}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.70)" }}
          >
            ✕
          </button>
        </div>

        {/* Progress steps */}
        <div className="flex gap-1.5 px-5 pb-4">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  s === step
                    ? "#FF1744"
                    : i < STEPS.indexOf(step)
                    ? "rgba(255,23,68,0.40)"
                    : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {/* ── STEP 1 : Upload ── */}
          {step === "upload" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Ajoutez les photos et documents. Robin remplira automatiquement la fiche.
              </p>

              {/* Photos */}
              <div
                className="rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all active:scale-[0.99]"
                style={{
                  border: "2px dashed rgba(255,107,53,0.40)",
                  background: "rgba(255,107,53,0.07)",
                }}
                onClick={() => setUploaded(true)}
              >
                <div className="text-3xl">📷</div>
                <div className="text-sm font-bold" style={{ color: "#ffffff" }}>
                  Photos du véhicule
                </div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
                  Glisser-déposer · Caméra · Import fichier
                </div>
                {uploaded && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(0,230,118,0.18)", color: "#00E676", border: "1px solid rgba(0,230,118,0.30)" }}
                  >
                    ✓ 6 photos ajoutées
                  </div>
                )}
              </div>

              {/* Document */}
              <div
                className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
                style={{
                  border: "1px dashed rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <span className="text-2xl flex-shrink-0">📄</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: "#ffffff" }}>
                    Carte grise / Carnet d&apos;entretien
                  </div>
                  <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
                    Optionnel · Améliore la précision de Robin
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("filling")}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98]"
                style={{ background: "#FF1744", color: "#ffffff" }}
              >
                Analyser avec Robin →
              </button>
            </div>
          )}

          {/* ── STEP 2 : AI Fill ── */}
          {step === "filling" && (
            <div className="flex flex-col gap-3">
              <div
                className="rounded-2xl p-4 mb-1"
                style={{
                  background: "rgba(255,107,53,0.10)",
                  border: "1px solid rgba(255,107,53,0.25)",
                }}
              >
                <div className="text-sm font-bold mb-1" style={{ color: "#ffffff" }}>
                  🦅 Robin a analysé votre véhicule
                </div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
                  94% des champs remplis automatiquement. Vérifiez et corrigez si besoin.
                </div>
              </div>

              {MOCK_AI_FIELDS.map((field) => {
                const style = CONF_STYLE[field.conf];
                return (
                  <div
                    key={field.label}
                    className="rounded-xl p-3.5"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-xs font-bold"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                      >
                        {field.label}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                      >
                        {confLabel(field.conf, field.aiScore)}
                      </span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: "#ffffff" }}>
                      {field.value}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setStep("review")}
                className="w-full py-3.5 rounded-2xl font-bold text-sm mt-2 transition-all active:scale-[0.98]"
                style={{ background: "#FF1744", color: "#ffffff" }}
              >
                Valider et publier →
              </button>
            </div>
          )}

          {/* ── STEP 3 : Review ── */}
          {step === "review" && (
            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(0,230,118,0.10)",
                  border: "1px solid rgba(0,230,118,0.25)",
                }}
              >
                <div className="text-sm font-bold mb-1" style={{ color: "#00E676" }}>
                  ✅ Fiche prête à publier
                </div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Choisissez vos plateformes de diffusion
                </div>
              </div>

              {[
                { name: "AutoScout24", champs: "47/47 champs" },
                { name: "2ememain",    champs: "45/47 champs" },
                { name: "GoCar.be",   champs: "43/47 champs" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#ffffff" }}>
                      {p.name}
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                      {p.champs}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(0,230,118,0.16)",
                      color: "#00E676",
                      border: "1px solid rgba(0,230,118,0.25)",
                    }}
                  >
                    Prêt
                  </div>
                </div>
              ))}

              <button
                onClick={close}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98]"
                style={{ background: "#FF1744", color: "#ffffff" }}
              >
                Publier sur 3 plateformes 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
