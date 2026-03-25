import { MOCK_VEHICLES, MOCK_ACTIVITY, MOCK_STATS } from "@/lib/mock";
import VehicleCard from "@/components/robin/VehicleCard";

export default function RobinPage() {
  const activeVehicles = MOCK_VEHICLES.filter((v) => v.status !== "sold");

  return (
    <div className="px-4 pt-6 pb-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(255,107,53,0.18)", border: "1px solid rgba(255,107,53,0.3)" }}
          >
            🦅
          </div>
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: "#FF8C5A" }}
            >
              Robin
            </div>
            <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>
              Bonjour ! 👋
            </h1>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Vous avez{" "}
          <strong style={{ color: "#ffffff" }}>{MOCK_STATS.vehiclesOnline} véhicules en ligne</strong> et{" "}
          <strong style={{ color: "#ffffff" }}>{MOCK_STATS.vehiclesDraft} brouillon</strong> en attente.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div
          className="rounded-2xl p-3 text-center"
          style={{
            background: "rgba(0,230,118,0.10)",
            border: "1px solid rgba(0,230,118,0.22)",
          }}
        >
          <div className="text-2xl font-black" style={{ color: "#00E676" }}>
            {MOCK_STATS.vehiclesOnline}
          </div>
          <div className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
            En ligne
          </div>
        </div>
        <div
          className="rounded-2xl p-3 text-center"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="text-2xl font-black" style={{ color: "#ffffff" }}>
            {MOCK_STATS.publishedThisMonth}
          </div>
          <div className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
            Ce mois
          </div>
        </div>
        <div
          className="rounded-2xl p-3 text-center"
          style={{
            background: "rgba(255,215,64,0.10)",
            border: "1px solid rgba(255,215,64,0.22)",
          }}
        >
          <div className="text-2xl font-black" style={{ color: "#FFD740" }}>
            {MOCK_STATS.avgAiCompletion}%
          </div>
          <div className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
            IA moy.
          </div>
        </div>
      </div>

      {/* Vehicles */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold" style={{ color: "#ffffff" }}>
            Véhicules actifs
          </h2>
          <a
            href="/catalog"
            className="text-xs font-semibold"
            style={{ color: "#FF1744" }}
          >
            Voir tout →
          </a>
        </div>
        <div className="flex flex-col gap-2">
          {activeVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div>
        <h2 className="text-sm font-bold mb-3" style={{ color: "#ffffff" }}>
          Activité des copilotes
        </h2>
        <div className="flex flex-col gap-2">
          {MOCK_ACTIVITY.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div className="text-base mt-0.5 flex-shrink-0">
                {item.type === "publish" && "🚀"}
                {item.type === "photo" && "📸"}
                {item.type === "alert" && "⚠️"}
                {item.type === "report" && "📊"}
                {item.type === "autofill" && "🦅"}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold" style={{ color: "#ffffff" }}>
                  {item.copilot}
                </span>{" "}
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {item.action}
                </span>
              </div>
              <div
                className="text-xs flex-shrink-0 mt-0.5 font-medium"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
