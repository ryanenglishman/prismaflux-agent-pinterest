import Link from "next/link";
import { COPILOTS, BASE_PLAN } from "@/lib/copilots";

export default function MarketingHomePage() {
  return (
    <div className="max-w-2xl mx-auto px-5">
      {/* Hero */}
      <section className="pt-16 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
          style={{ background: "rgba(255,23,68,0.12)", color: "var(--color-brand)", border: "1px solid rgba(255,23,68,0.25)" }}
        >
          ✦ Essai gratuit 7 jours — sans engagement
        </div>

        <h1
          className="text-4xl md:text-5xl font-black mb-4 leading-tight"
          style={{ color: "white", letterSpacing: "-1px" }}
        >
          Vendez plus vite.<br />
          <span style={{ color: "var(--color-brand)" }}>Sans effort.</span>
        </h1>

        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          PrismaFlux connecte vos copilotes IA à vos plateformes auto. Robin publie en un clic,
          Lana retouche vos photos, Marcus analyse votre site. Vous, vous vendez.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/essai-gratuit"
            className="px-6 py-3.5 rounded-2xl text-sm font-bold transition-all"
            style={{ background: "var(--color-brand)", color: "white" }}
          >
            Démarrer gratuitement →
          </Link>
          <Link
            href="/tarifs"
            className="px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Voir les tarifs
          </Link>
        </div>

        <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Aucune carte bancaire requise · Annulable à tout moment
        </p>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div
          className="grid grid-cols-3 gap-4 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "94%", label: "Taux auto-remplissage Robin" },
            { value: "3×", label: "Plateformes en un clic" },
            { value: "7j", label: "Essai gratuit sans CB" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Copilotes */}
      <section id="copilotes" className="mb-16">
        <h2 className="text-2xl font-black text-white mb-2">Vos copilotes IA</h2>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          5 copilotes spécialisés, pensés pour les concessions belges.
        </p>

        <div className="flex flex-col gap-4">
          {COPILOTS.map((c) => (
            <Link
              key={c.id}
              href={`/copilotes/${c.id}`}
              className="flex items-center gap-4 rounded-2xl p-4 transition-all hover:scale-[1.01]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${c.color}20` }}
              >
                {c.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-white text-sm">{c.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: c.included ? "rgba(0,200,83,0.15)" : "rgba(255,23,68,0.12)",
                      color: c.included ? "#00C853" : "var(--color-brand)",
                    }}
                  >
                    {c.price}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{c.role}</div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mb-16 text-center">
        <div
          className="rounded-3xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,23,68,0.1) 0%, rgba(255,23,68,0.04) 100%)",
            border: "1px solid rgba(255,23,68,0.2)",
          }}
        >
          <h2 className="text-2xl font-black text-white mb-2">
            {BASE_PLAN.price} €<span className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>/mois</span>
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Robin + Lana Basic + Pierre + AutoScout24 + 2ememain inclus.<br />
            {BASE_PLAN.annualDiscount}% de remise en engagement annuel.
          </p>
          <Link
            href="/essai-gratuit"
            className="inline-block px-6 py-3.5 rounded-2xl text-sm font-bold"
            style={{ background: "var(--color-brand)", color: "white" }}
          >
            Commencer — 7 jours gratuits →
          </Link>
        </div>
      </section>
    </div>
  );
}
