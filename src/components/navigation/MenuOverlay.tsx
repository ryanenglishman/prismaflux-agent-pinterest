"use client";

import Link from "next/link";
import { useOverlay } from "./OverlayContext";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/robin",   label: "Robin",     emoji: "🦅", sub: "Multidiffusion" },
  { href: "/lana",    label: "Lana",      emoji: "📸", sub: "Vehicle Studio" },
  { href: "/marcus",  label: "Marcus",    emoji: "🔍", sub: "Site web & SEO" },
  { href: "/pierre",  label: "Pierre",    emoji: "📊", sub: "Reporting" },
  { href: "/catalog", label: "Catalogue", emoji: "🚗", sub: "Véhicules" },
];

export default function MenuOverlay() {
  const { overlay, close } = useOverlay();
  const pathname = usePathname();

  if (overlay !== "menu") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50"
      style={{ paddingBottom: "calc(var(--pill-margin) + 68px)" }}
    >
      <div
        className="mx-4 rounded-3xl p-3"
        style={{
          background: "rgba(18, 18, 22, 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-2 mb-1">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Navigation
          </span>
          <button
            onClick={close}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.70)" }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-all active:scale-[0.98]"
                style={{
                  background: active ? "rgba(255,23,68,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? "rgba(255,23,68,0.28)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: active ? "rgba(255,23,68,0.18)" : "rgba(255,255,255,0.07)",
                  }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-bold"
                    style={{ color: active ? "#FF1744" : "#ffffff" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.sub}
                  </div>
                </div>
                {active && (
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#FF1744" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
