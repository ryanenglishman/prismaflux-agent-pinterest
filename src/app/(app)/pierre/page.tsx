export default function PierrePage() {
  return (
    <div className="px-4 pt-6 pb-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(46,125,50,0.18)", border: "1px solid rgba(46,125,50,0.30)" }}
        >
          📊
        </div>
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "#81C784" }}
          >
            Pierre
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>
            Reporting & Réputation
          </h1>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {[
          { label: "Véhicules vendus", value: "12",    sub: "ce mois",           color: "#00E676" },
          { label: "Chiffre d'affaires", value: "387K€", sub: "ce mois",         color: "#ffffff" },
          { label: "Délai moyen vente", value: "18j",  sub: "vs 24j le mois passé", color: "#FFD740" },
          { label: "Leads reçus",       value: "47",   sub: "dont 12 qualifiés", color: "#82B1FF" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div className="text-2xl font-black mb-1" style={{ color: k.color }}>
              {k.value}
            </div>
            <div className="text-xs font-bold" style={{ color: "#ffffff" }}>
              {k.label}
            </div>
            <div
              className="text-xs font-medium mt-0.5"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Top véhicules */}
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3" style={{ color: "#ffffff" }}>
          Top véhicules ce mois
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { rank: 1, name: "VW Golf 8 GTI",    views: 284, leads: 8 },
            { rank: 2, name: "BMW 320d xDrive",   views: 201, leads: 5 },
            { rank: 3, name: "Mercedes C220d",    views: 178, leads: 4 },
          ].map((v) => (
            <div
              key={v.rank}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{
                  background: v.rank === 1 ? "rgba(255,215,64,0.20)" : "rgba(255,255,255,0.08)",
                  color: v.rank === 1 ? "#FFD740" : "rgba(255,255,255,0.60)",
                }}
              >
                {v.rank}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: "#ffffff" }}>
                  {v.name}
                </div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {v.views} vues · {v.leads} leads
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Réputation Google */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <h2 className="text-sm font-bold mb-4" style={{ color: "#ffffff" }}>
          Réputation Google
        </h2>
        <div className="flex items-center gap-5 mb-4">
          <div className="flex-shrink-0">
            <div className="text-4xl font-black" style={{ color: "#ffffff" }}>
              4.6
            </div>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4].map((s) => (
                <span key={s} className="text-base" style={{ color: "#FFD740" }}>★</span>
              ))}
              <span className="text-base" style={{ color: "rgba(255,215,64,0.35)" }}>★</span>
            </div>
            <div className="text-xs font-medium mt-1" style={{ color: "rgba(255,255,255,0.60)" }}>
              127 avis
            </div>
          </div>
          <div className="flex-1">
            {[
              { stars: 5, pct: 68 },
              { stars: 4, pct: 20 },
              { stars: 3, pct: 8 },
              { stars: 2, pct: 3 },
              { stars: 1, pct: 1 },
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold w-3 text-right flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {r.stars}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.pct}%`, background: "#FFD740" }}
                  />
                </div>
                <span
                  className="text-xs font-medium w-7 text-right flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {r.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="text-xs font-medium px-3 py-2 rounded-xl"
          style={{
            background: "rgba(255,215,64,0.10)",
            color: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(255,215,64,0.18)",
          }}
        >
          🆕 3 nouveaux avis ce mois · 2 sans réponse
        </div>
      </div>

      {/* Rapport mensuel */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(46,125,50,0.12)",
          border: "1px solid rgba(46,125,50,0.30)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📄</span>
          <span className="text-sm font-bold" style={{ color: "#ffffff" }}>
            Rapport mensuel — Février 2026
          </span>
        </div>
        <p className="text-xs font-medium mb-4" style={{ color: "rgba(255,255,255,0.60)" }}>
          Généré automatiquement par Pierre le 1er mars 2026
        </p>
        <button
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{ background: "rgba(46,125,50,0.35)", color: "#81C784", border: "1px solid rgba(46,125,50,0.45)" }}
        >
          📥 Télécharger le rapport
        </button>
      </div>
    </div>
  );
}
