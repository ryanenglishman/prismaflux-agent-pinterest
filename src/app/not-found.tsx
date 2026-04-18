import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-4">
          Page introuvable
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a ete deplacee.
        </p>
        <Button href="/">Retour a l&apos;accueil</Button>
      </div>
    </div>
  );
}
