"use client";

import { WIZARD_BUDGETS, WIZARD_TIMELINES, WIZARD_FEATURES } from "@/lib/constants/quote-wizard";
import type { WizardData } from "./QuoteWizard";
import { Button } from "@/components/ui/Button";

export function StepDetails({
  data,
  onUpdate,
  onBack,
  onNext,
}: {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const features = WIZARD_FEATURES[data.service] || [];

  const toggleFeature = (f: string) => {
    const current = data.features;
    onUpdate({
      features: current.includes(f) ? current.filter((x) => x !== f) : [...current, f],
    });
  };

  const pillClass = (active: boolean) =>
    `px-4 py-2 text-sm rounded-full border cursor-pointer transition-all ${
      active
        ? "border-brand bg-brand-dim text-brand"
        : "border-border bg-bg-card text-text-secondary hover:border-border-hover"
    }`;

  return (
    <div>
      <h3 className="text-xl font-bold text-text mb-6">Parlez-nous de votre projet</h3>

      {/* Budget */}
      <div className="mb-6">
        <p className="text-sm font-medium text-text mb-2">Budget estime</p>
        <div className="flex flex-wrap gap-2">
          {WIZARD_BUDGETS.map((b) => (
            <button
              key={b}
              onClick={() => onUpdate({ budget: b })}
              className={pillClass(data.budget === b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <p className="text-sm font-medium text-text mb-2">Delai souhaite</p>
        <div className="flex flex-wrap gap-2">
          {WIZARD_TIMELINES.map((t) => (
            <button
              key={t}
              onClick={() => onUpdate({ timeline: t })}
              className={pillClass(data.timeline === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-text mb-2">
            Fonctionnalites souhaitees
          </p>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={pillClass(data.features.includes(f))}
              >
                {data.features.includes(f) ? "✓ " : ""}
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      <div className="mb-6">
        <p className="text-sm font-medium text-text mb-2">
          Precisions supplementaires (optionnel)
        </p>
        <textarea
          rows={3}
          value={data.message}
          onChange={(e) => onUpdate({ message: e.target.value })}
          placeholder="Decrivez brievement votre projet..."
          aria-label="Description de votre projet"
          className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext}>Continuer</Button>
      </div>
    </div>
  );
}
