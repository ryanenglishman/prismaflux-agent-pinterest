"use client";

import { useState } from "react";
import { MOCK_VEHICLES } from "@/lib/mock";
import VehicleCard from "@/components/robin/VehicleCard";

type Tab = "all" | "online" | "draft" | "sold";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "online", label: "En ligne" },
  { id: "draft", label: "Brouillons" },
  { id: "sold", label: "Vendus" },
];

export default function CatalogPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_VEHICLES.filter((v) => {
    const matchTab = tab === "all" || v.status === tab;
    const matchSearch =
      !search ||
      `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <h1 className="text-xl font-bold text-white mb-4">Catalogue 🚗</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un véhicule..."
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        />
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-5"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {TABS.map((t) => {
          const count =
            t.id === "all"
              ? MOCK_VEHICLES.length
              : MOCK_VEHICLES.filter((v) => v.status === t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: tab === t.id ? "rgba(255,23,68,0.15)" : "transparent",
                color: tab === t.id ? "var(--color-brand)" : "rgba(255,255,255,0.5)",
                border: tab === t.id ? "1px solid rgba(255,23,68,0.25)" : "1px solid transparent",
              }}
            >
              {t.label}
              <span
                className="ml-1 px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background: tab === t.id ? "rgba(255,23,68,0.2)" : "rgba(255,255,255,0.08)",
                  color: tab === t.id ? "var(--color-brand)" : "rgba(255,255,255,0.35)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12" style={{ color: "rgba(255,255,255,0.35)" }}>
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-sm">Aucun véhicule trouvé</div>
          </div>
        ) : (
          filtered.map((v) => <VehicleCard key={v.id} vehicle={v} />)
        )}
      </div>
    </div>
  );
}
