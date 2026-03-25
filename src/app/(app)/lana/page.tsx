export default function LanaPage() {
  return (
    <div className="px-4 pt-6 pb-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(233,30,140,0.18)", border: "1px solid rgba(233,30,140,0.30)" }}
        >
          📸
        </div>
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "#F06292" }}
          >
            Lana Basic
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>
            Vehicle Studio
          </h1>
        </div>
      </div>

      {/* Upload zone */}
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-4 mb-6 cursor-pointer transition-all active:scale-[0.99]"
        style={{
          border: "2px dashed rgba(233,30,140,0.40)",
          background: "rgba(233,30,140,0.07)",
        }}
      >
        <div className="text-4xl">🖼️</div>
        <div className="text-center">
          <div className="text-sm font-bold mb-1" style={{ color: "#ffffff" }}>
            Importer des photos
          </div>
          <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
            Glisser-déposer · Caméra · Import fichier
          </div>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-sm font-bold"
          style={{ background: "rgba(233,30,140,0.22)", color: "#F06292", border: "1px solid rgba(233,30,140,0.35)" }}
        >
          Sélectionner des photos
        </div>
      </div>

      {/* Basic features */}
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3" style={{ color: "#ffffff" }}>
          Inclus dans votre plan
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { icon: "🎨", label: "Suppression de fond automatique" },
            { icon: "☀️", label: "Correction de luminosité & contraste" },
            { icon: "🔲", label: "Recadrage intelligent" },
            { icon: "✨", label: "Optimisation pour plateformes auto" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <span className="text-lg flex-shrink-0">{f.icon}</span>
              <span className="text-sm font-medium flex-1" style={{ color: "#ffffff" }}>
                {f.label}
              </span>
              <span style={{ color: "#00E676", fontSize: "16px" }}>✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell Lana Performance */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(233,30,140,0.10)",
          border: "1px solid rgba(233,30,140,0.30)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🎬</span>
          <span className="text-sm font-bold" style={{ color: "#ffffff" }}>
            Lana Performance
          </span>
          <span
            className="ml-auto text-xs font-black px-2.5 py-1 rounded-full"
            style={{ background: "rgba(233,30,140,0.25)", color: "#F06292", border: "1px solid rgba(233,30,140,0.35)" }}
          >
            449 €/mois
          </span>
        </div>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Posts réseaux sociaux automatiques, stories Instagram, vidéos courtes de mise en scène.
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            "Posts Instagram & Facebook automatiques",
            "Stories animées pour chaque véhicule",
            "Vidéos courtes type Reels",
            "Calendrier de publication IA",
          ].map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              <span style={{ color: "#F06292" }}>✦</span>
              {feat}
            </div>
          ))}
        </div>
        <button
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{ background: "#E91E8C", color: "#ffffff" }}
        >
          Activer Lana Performance →
        </button>
      </div>
    </div>
  );
}
