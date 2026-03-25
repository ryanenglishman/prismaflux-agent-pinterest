import type { MockVehicle } from "@/lib/mock";

const STATUS_LABELS: Record<string, string> = {
  online: "En ligne",
  draft: "Brouillon",
  sold: "Vendu",
};

const STATUS_COLORS: Record<string, string> = {
  online: "#00C853",
  draft: "#FFD600",
  sold: "rgba(255,255,255,0.3)",
};

export default function VehicleCard({ vehicle }: { vehicle: MockVehicle }) {
  const statusColor = STATUS_COLORS[vehicle.status];
  const statusLabel = STATUS_LABELS[vehicle.status];

  const aiColor =
    vehicle.aiCompletion >= 90
      ? "var(--color-ai-green)"
      : vehicle.aiCompletion >= 70
      ? "var(--color-ai-yellow)"
      : "var(--color-ai-red)";

  const aiBg =
    vehicle.aiCompletion >= 90
      ? "var(--color-ai-green-bg)"
      : vehicle.aiCompletion >= 70
      ? "var(--color-ai-yellow-bg)"
      : "var(--color-ai-red-bg)";

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Photo placeholder */}
      <div
        className="w-16 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        🚗
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-white truncate">
            {vehicle.make} {vehicle.model}
          </span>
        </div>
        <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>
          {vehicle.year} · {vehicle.fuel} · {vehicle.mileage.toLocaleString("fr")} km
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status badge */}
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: statusColor,
              background: `${statusColor}20`,
            }}
          >
            {statusLabel}
          </span>
          {/* AI completion */}
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ color: aiColor, background: aiBg }}
          >
            Robin {vehicle.aiCompletion}%
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-bold text-white">
          {vehicle.price.toLocaleString("fr")} €
        </div>
        <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          {vehicle.platforms.length > 0
            ? `${vehicle.platforms.length} plateforme${vehicle.platforms.length > 1 ? "s" : ""}`
            : "Non publié"}
        </div>
      </div>
    </div>
  );
}
