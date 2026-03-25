export default function PierrePage() {
  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: "rgba(46,125,50,0.15)" }}
        >
          📊
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,200,100,0.8)" }}>
            Pierre
          </div>
          <h1 className="text-xl font-bold text-white">Reporting & Réputation</h1>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Véhicules vendus", value: "12", sub: "ce mois", color: "#00C853" },
          { label: "Chiffre d'affaires", value: "387K€", sub: "ce mois", color: "white" },
          { label: "Délai moyen vente", value: "18j", sub: "vs 24j le mois passé", color: "#FFD600" },
          { label: "Leads reçus", value: "47", sub: "dont 12 qualifiés", color: "#64B5F6" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl p-4"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color: k.color }}>
              {k.value}
            </div>
            <div className="text-xs font-semibold text-white">{k.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Top véhicules */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-white mb-3">Top véhicules ce mois</h2>
        <div className="flex flex-col gap-2">
          {[
            { rank: 1, name: "VW Golf 8 GTI", views: 284, leads: 8 },
            { rank: 2, name: "BMW 320d xDrive", views: 201, leads: 5 },
            { rank: 3, name: "Mercedes C220d", views: 178, leads: 4 },
          ].map((v) => (
            <div
              key={v.rank}
              className="flex items-center gap-4 rounded-xl px-4 py-3"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: v.rank === 1 ? "rgba(255,214,0,0.2)" : "rgba(255,255,255,0.08)",
                  color: v.rank === 1 ? "#FFD600" : "rgba(255,255,255,0.5)",
                }}
              >
                {v.rank}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{v.name}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {v.views} vues · {v.leads} leads
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Réputation */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <h2 className="text-sm font-semibold text-white mb-4">Réputation Google</h2>
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="text-4xl font-black text-white">4.6</div>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4].map((s) => (
                <span key={s} style={{ color: "#FFD600" }}>★</span>
              ))}
              <span style={{ color: "rgba(255,214,0,0.4)" }}>★</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              127 avis Google
            </div>
            <div className="flex flex-col gap-1">
              {[
                { stars: 5, pct: 68 },
                { stars: 4, pct: 20 },
                { stars: 3, pct: 8 },
                { stars: 2, pct: 3 },
                { stars: 1, pct: 1 },
              ].map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <span className="text-xs w-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {r.stars}
                  </span>
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.pct}%`, background: "#FFD600" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          🆕 3 nouveaux avis ce mois · 2 sans réponse
        </div>
      </div>

      {/* Rapport mensuel */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(46,125,50,0.15) 0%, rgba(46,125,50,0.05) 100%)",
          border: "1px solid rgba(46,125,50,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📄</span>
          <span className="text-sm font-bold text-white">Rapport mensuel — Février 2026</span>
        </div>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          Généré automatiquement par Pierre le 1er mars 2026
        </p>
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(46,125,50,0.4)", color: "#81C784" }}
        >
          📥 Télécharger le rapport
        </button>
      </div>
    </div>
  );
}
