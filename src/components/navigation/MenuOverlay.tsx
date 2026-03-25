"use client";

import Link from "next/link";
import { useOverlay } from "./OverlayContext";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/robin", label: "Robin", emoji: "🦅", sub: "Multidiffusion" },
  { href: "/lana", label: "Lana", emoji: "📸", sub: "Vehicle Studio" },
  { href: "/marcus", label: "Marcus", emoji: "🔍", sub: "Site web & SEO" },
  { href: "/pierre", label: "Pierre", emoji: "📊", sub: "Reporting" },
  { href: "/catalog", label: "Catalogue", emoji: "🚗", sub: "Véhicules" },
];

export default function MenuOverlay() {
  const { overlay, close } = useOverlay();
  const pathname = usePathname();

  if (overlay !== "menu") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
      style={{ paddingBottom: "calc(var(--pill-margin) + 72px)" }}
    >
      <div
        className="mx-auto w-full max-w-sm rounded-t-3xl p-4"
        style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
      >
        <div className="mb-4 flex items-center justify-between px-2">
          <span className="text-sm font-semibold text-white/60 uppercase tracking-widest">
            Navigation
          </span>
          <button
            onClick={close}
            className="text-white/40 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-all"
                style={{
                  background: active
                    ? "rgba(255,23,68,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "1px solid rgba(255,23,68,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: active ? "var(--color-brand)" : "white" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {item.sub}
                  </div>
                </div>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
