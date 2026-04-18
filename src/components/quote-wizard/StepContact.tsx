"use client";

import type { WizardData } from "./QuoteWizard";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

const inputClass =
  "w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors";

export function StepContact({
  data,
  onUpdate,
  onBack,
  onSubmit,
  status,
}: {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  status: string;
}) {
  const canSubmit = data.name && data.email;

  return (
    <div>
      <h3 className="text-xl font-bold text-text mb-2">Vos coordonnees</h3>
      <p className="text-sm text-text-secondary mb-6">
        Pour vous envoyer votre devis personnalise.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1.5">
              Nom complet *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Jean Dupont"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1.5">
              Email *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="jean@entreprise.be"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-text mb-1.5">
              Telephone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="+32 4XX XX XX XX"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-text mb-1.5">
              Entreprise
            </label>
            <input
              id="contact-company"
              type="text"
              value={data.company}
              onChange={(e) => onUpdate({ company: e.target.value })}
              placeholder="Nom de votre entreprise"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Une erreur est survenue. Veuillez reessayer.
        </p>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!canSubmit || status === "sending"}
        >
          {status === "sending" ? (
            "Envoi..."
          ) : (
            <>
              Envoyer ma demande
              <Send size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
