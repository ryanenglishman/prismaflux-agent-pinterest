import type { MockVehicle } from "@/lib/mock";

const STATUS_LABELS: Record<string, string> = {
  online: "En ligne",
  draft: "Brouillon",
  sold: "Vendu",
};

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  online: { color: "#00E676", bg: "rgba(0,230,118,0.14)" },
  draft:  { color: "#FFD740", bg: "rgba(255,215,64,0.14)" },
  sold:   { color: "rgba(255,255,255,0.55)", bg: "rgba(255,255,255,0.08)" },
};

export default function VehicleCard({ vehicle }: { vehicle: MockVehicle }) {
  const status = STATUS_STYLES[vehicle.status];

  const aiColor =
    vehicle.aiCompletion >= 90 ? "#00E676"
    : vehicle.aiCompletion >= 70 ? "#FFD740"
    : "#FF5252";

  const aiBg =
    vehicle.aiCompletion >= 90 ? "rgba(0,230,118,0.14)"
    : vehicle.aiCompletion >= 70 ? "rgba(255,215,64,0.14)"
    : "rgba(255,82,82,0.14)";

  return (
    <div
      className="rounded-2xl p-3.5 flex items-center gap-3"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Photo placeholder */}
      <div
        className="w-14 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        🚗
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold mb-1 truncate" style={{ color: "#ffffff" }}>
          {vehicle.make} {vehicle.model}
        </div>
        <div className="text-xs mb-2 font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
          {vehicle.year} · {vehicle.fuel} · {vehicle.mileage.toLocaleString("fr")} km
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: status.color, background: status.bg }}
          >
            {STATUS_LABELS[vehicle.status]}
          </span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: aiColor, background: aiBg }}
          >
            🦅 {vehicle.aiCompletion}%
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-black" style={{ color: "#ffffff" }}>
          {vehicle.price.toLocaleString("fr")} €
        </div>
        <div className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
          {vehicle.platforms.length > 0
            ? `${vehicle.platforms.length} plateforme${vehicle.platforms.length > 1 ? "s" : ""}`
            : "Non publié"}
        </div>
      </div>
    </div>
  );
}
