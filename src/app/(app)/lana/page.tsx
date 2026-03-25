export default function LanaPage() {
  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: "rgba(233,30,140,0.15)" }}
        >
          📸
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(233,30,140,0.8)" }}>
            Lana Basic
          </div>
          <h1 className="text-xl font-bold text-white">Vehicle Studio</h1>
        </div>
      </div>

      {/* Upload zone */}
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-4 mb-6 cursor-pointer"
        style={{
          border: "2px dashed rgba(233,30,140,0.4)",
          background: "rgba(233,30,140,0.05)",
        }}
      >
        <div className="text-4xl">🖼️</div>
        <div className="text-center">
          <div className="text-sm font-semibold text-white mb-1">Importer des photos</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Glisser-déposer · Caméra · Import
          </div>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(233,30,140,0.2)", color: "#E91E8C" }}
        >
          Sélectionner des photos
        </div>
      </div>

      {/* Basic features */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-white mb-3">Inclus dans votre plan</h2>
        <div className="flex flex-col gap-2">
          {[
            { icon: "🎨", label: "Suppression de fond automatique", done: true },
            { icon: "☀️", label: "Correction de luminosité & contraste", done: true },
            { icon: "🔲", label: "Recadrage intelligent", done: true },
            { icon: "✨", label: "Optimisation pour plateformes", done: true },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="text-lg">{f.icon}</span>
              <span className="text-sm text-white flex-1">{f.label}</span>
              <span style={{ color: "#00C853" }}>✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell Lana Performance */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(233,30,140,0.05) 100%)",
          border: "1px solid rgba(233,30,140,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎬</span>
          <span className="text-sm font-bold text-white">Lana Performance</span>
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(233,30,140,0.2)", color: "#E91E8C" }}
          >
            449 €/mois
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
          Posts réseaux sociaux automatiques, stories Instagram, vidéos courtes de mise en scène de vos véhicules.
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            "Posts Instagram & Facebook automatiques",
            "Stories animées pour chaque véhicule",
            "Vidéos courtes type Reels",
            "Calendrier de publication IA",
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span style={{ color: "#E91E8C" }}>✦</span> {feat}
            </div>
          ))}
        </div>
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: "#E91E8C", color: "white" }}
        >
          Activer Lana Performance →
        </button>
      </div>
    </div>
  );
}
