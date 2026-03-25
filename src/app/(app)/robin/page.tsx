import { MOCK_VEHICLES, MOCK_ACTIVITY, MOCK_STATS } from "@/lib/mock";
import VehicleCard from "@/components/robin/VehicleCard";

export default function RobinPage() {
  const activeVehicles = MOCK_VEHICLES.filter((v) => v.status !== "sold");

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header / Greeting */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(255,107,53,0.15)" }}
          >
            🦅
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,107,53,0.8)" }}>
              Robin
            </div>
            <h1 className="text-xl font-bold text-white">Bonjour ! 👋</h1>
          </div>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
          Vous avez <strong className="text-white">{MOCK_STATS.vehiclesOnline} véhicules en ligne</strong> et{" "}
          <strong className="text-white">{MOCK_STATS.vehiclesDraft} brouillon</strong> en attente.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#00C853" }}>
            {MOCK_STATS.vehiclesOnline}
          </div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            En ligne
          </div>
        </div>
        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="text-2xl font-bold text-white">{MOCK_STATS.publishedThisMonth}</div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            Ce mois
          </div>
        </div>
        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--color-ai-yellow)" }}>
            {MOCK_STATS.avgAiCompletion}%
          </div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            IA moy.
          </div>
        </div>
      </div>

      {/* Vehicles */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white">Véhicules actifs</h2>
          <a href="/catalog" className="text-xs" style={{ color: "var(--color-brand)" }}>
            Voir tout →
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {activeVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">Activité des copilotes</h2>
        <div className="flex flex-col gap-2">
          {MOCK_ACTIVITY.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl px-4 py-3"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="text-lg mt-0.5">
                {item.type === "publish" && "🚀"}
                {item.type === "photo" && "📸"}
                {item.type === "alert" && "⚠️"}
                {item.type === "report" && "📊"}
                {item.type === "autofill" && "🦅"}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white">{item.copilot}</span>{" "}
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {item.action}
                </span>
              </div>
              <div className="text-xs flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
