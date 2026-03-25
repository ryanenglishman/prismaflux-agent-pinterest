import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer
      className="px-5 py-10 mt-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div>
            <div className="text-lg font-black mb-2" style={{ color: "white" }}>
              Prisma<span style={{ color: "var(--color-brand)" }}>Flux</span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Le copilote IA des concessions automobiles belges.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                Produit
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/home#copilotes" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>Copilotes</Link>
                <Link href="/tarifs" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>Tarifs</Link>
                <Link href="/essai-gratuit" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>Essai gratuit</Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                Entreprise
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/contact" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>Contact</Link>
                <a href="mailto:hello@prismaflux.be" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>hello@prismaflux.be</a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2026 PrismaFlux SRL · Belgique · Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
