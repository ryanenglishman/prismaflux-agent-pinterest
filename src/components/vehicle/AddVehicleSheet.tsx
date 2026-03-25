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
  { label: "Marque", value: "Volkswagen", conf: "high", aiScore: 99 },
  { label: "Modèle", value: "Golf 8 GTI", conf: "high", aiScore: 97 },
  { label: "Année", value: "2022", conf: "high", aiScore: 98 },
  { label: "Carburant", value: "Essence", conf: "high", aiScore: 96 },
  { label: "Transmission", value: "DSG 7", conf: "high", aiScore: 94 },
  { label: "Kilométrage", value: "28 400 km", conf: "medium", aiScore: 82 },
  { label: "Prix", value: "34 900 €", conf: "manual" },
  { label: "Couleur", value: "Blanc Pur", conf: "medium", aiScore: 78 },
  { label: "Puissance", value: "245 ch", conf: "high", aiScore: 95 },
  { label: "VIN", value: "WVWZZZAU8NW004321", conf: "low", aiScore: 61 },
];

function confColor(conf: FieldConf) {
  if (conf === "high") return "var(--color-ai-green)";
  if (conf === "medium") return "var(--color-ai-yellow)";
  if (conf === "low") return "var(--color-ai-red)";
  return "rgba(255,255,255,0.3)";
}

function confBg(conf: FieldConf) {
  if (conf === "high") return "var(--color-ai-green-bg)";
  if (conf === "medium") return "var(--color-ai-yellow-bg)";
  if (conf === "low") return "var(--color-ai-red-bg)";
  return "rgba(255,255,255,0.05)";
}

function confLabel(conf: FieldConf, score?: number) {
  if (conf === "manual") return "À compléter";
  if (score && score >= 90) return `Deviné à ${score}% par Robin`;
  if (score) return `Deviné à ${score}% par Robin`;
  return "Deviné par Robin";
}

export default function AddVehicleSheet() {
  const { overlay, close } = useOverlay();
  const [step, setStep] = useState<"upload" | "filling" | "review">("upload");
  const [uploaded, setUploaded] = useState(false);

  if (overlay !== "vehicle") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50" style={{ top: "5%" }}>
      <div
        className="h-full rounded-t-3xl flex flex-col overflow-hidden"
        style={{ background: "var(--color-bg)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#FF6B35" }}>
              🦅 Robin
            </div>
            <h2 className="text-lg font-bold text-white">Nouveau véhicule</h2>
          </div>
          <button
            onClick={close}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <span className="text-white/60 text-lg">✕</span>
          </button>
        </div>

        {/* Steps */}
        <div className="flex gap-1 px-5 pb-4">
          {(["upload", "filling", "review"] as const).map((s, i) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all"
              style={{
                background:
                  step === s
                    ? "var(--color-brand)"
                    : i < ["upload", "filling", "review"].indexOf(step)
                    ? "rgba(255,23,68,0.4)"
                    : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-32">
          {step === "upload" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                Ajoutez les photos et documents. Robin remplira automatiquement la fiche.
              </p>

              {/* Photo upload zone */}
              <div
                className="rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer"
                style={{
                  border: "2px dashed rgba(255,107,53,0.4)",
                  background: "rgba(255,107,53,0.05)",
                }}
                onClick={() => setUploaded(true)}
              >
                <div className="text-3xl">📷</div>
                <div className="text-sm font-medium text-white">Photos du véhicule</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Glisser-déposer · Caméra · Import fichier
                </div>
                {uploaded && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(0,200,83,0.2)", color: "#00C853" }}
                  >
                    ✓ 6 photos ajoutées
                  </div>
                )}
              </div>

              {/* Document upload zone */}
              <div
                className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer"
                style={{
                  border: "1px dashed rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="text-2xl">📄</div>
                <div>
                  <div className="text-sm font-medium text-white">Carte grise / Carnet d&apos;entretien</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Optionnel · Améliore la précision de Robin
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("filling")}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "var(--color-brand)", color: "white" }}
              >
                Analyser avec Robin →
              </button>
            </div>
          )}

          {step === "filling" && (
            <div className="flex flex-col gap-3">
              <div
                className="rounded-2xl p-4 mb-2"
                style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)" }}
              >
                <div className="text-sm font-semibold text-white mb-1">
                  🦅 Robin a analysé votre véhicule
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  94% des champs remplis automatiquement. Vérifiez et corrigez si besoin.
                </div>
              </div>

              {MOCK_AI_FIELDS.map((field) => (
                <div
                  key={field.label}
                  className="rounded-xl p-3.5"
                  style={{
                    background: confBg(field.conf),
                    border: `1px solid ${confColor(field.conf)}30`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {field.label}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        color: confColor(field.conf),
                        background: confBg(field.conf),
                      }}
                    >
                      {confLabel(field.conf, field.aiScore)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">{field.value}</div>
                </div>
              ))}

              <button
                onClick={() => setStep("review")}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm mt-2 transition-all active:scale-95"
                style={{ background: "var(--color-brand)", color: "white" }}
              >
                Valider et publier →
              </button>
            </div>
          )}

          {step === "review" && (
            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)" }}
              >
                <div className="text-sm font-bold text-white mb-1">✅ Fiche prête à publier</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Choisissez vos plateformes de diffusion
                </div>
              </div>

              {[
                { name: "AutoScout24", ready: "47/47 champs", status: "Prêt" },
                { name: "2ememain", ready: "45/47 champs", status: "Prêt" },
                { name: "GoCar.be", ready: "43/47 champs", status: "Prêt" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{p.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{p.ready}</div>
                  </div>
                  <div
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,200,83,0.15)", color: "#00C853" }}
                  >
                    {p.status}
                  </div>
                </div>
              ))}

              <button
                onClick={close}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "var(--color-brand)", color: "white" }}
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
