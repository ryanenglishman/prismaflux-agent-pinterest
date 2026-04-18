import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { WizardData } from "./QuoteWizard";

export function StepConfirmation({ data }: { data: WizardData }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-brand-dim flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={32} className="text-brand" />
      </div>
      <h3 className="text-2xl font-bold text-text mb-2">
        Demande envoyee !
      </h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        Merci {data.name}. Nous avons bien recu votre demande de devis et
        vous recontacterons sous 24h a l&apos;adresse {data.email}.
      </p>
      <div className="flex justify-center gap-4">
        <Button href="/" variant="secondary">
          Retour a l&apos;accueil
        </Button>
        <Button href="/services">
          Voir nos services
        </Button>
      </div>
    </div>
  );
}
