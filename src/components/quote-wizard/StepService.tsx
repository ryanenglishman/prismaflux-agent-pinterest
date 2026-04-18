"use client";

import { WIZARD_SERVICES } from "@/lib/constants/quote-wizard";

export function StepService({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-text mb-2">
        Quel service vous interesse ?
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Selectionnez le service qui correspond le mieux a votre besoin.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {WIZARD_SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selected === s.id
                  ? "border-brand bg-brand-dim"
                  : "border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover"
              }`}
            >
              <Icon size={20} className="text-brand mb-2" />
              <p className="text-sm font-semibold text-text">{s.title}</p>
              <p className="text-xs text-text-muted mt-1">{s.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
