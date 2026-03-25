"use client";

import { useOverlay } from "./OverlayContext";
import BlurOverlay from "./BlurOverlay";
import MenuOverlay from "./MenuOverlay";
import AddVehicleSheet from "@/components/vehicle/AddVehicleSheet";

export default function FloatingPill() {
  const { openVehicle, openMenu } = useOverlay();

  return (
    <>
      <BlurOverlay />
      <MenuOverlay />
      <AddVehicleSheet />

      {/* Floating pill */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
        style={{ padding: `0 var(--pill-margin) var(--pill-margin)` }}
      >
        <div
          className="flex items-center gap-1 p-1.5"
          style={{
            background: "rgba(16, 16, 20, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "var(--pill-radius)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Robin — ajouter véhicule */}
          <button
            onClick={openVehicle}
            className="flex items-center gap-2.5 px-4 py-2.5 transition-all active:scale-95"
            style={{
              background: "rgba(255,107,53,0.18)",
              border: "1px solid rgba(255,107,53,0.28)",
              borderRadius: "14px",
            }}
            title="Ajouter un véhicule"
          >
            <span className="text-lg leading-none">🦅</span>
            <span
              className="text-sm font-bold leading-none"
              style={{ color: "#FF8C5A" }}
            >
              + Véhicule
            </span>
          </button>

          {/* Séparateur */}
          <div
            className="w-px h-5 mx-0.5"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* Menu PrismaFlux P */}
          <button
            onClick={openMenu}
            className="flex items-center justify-center transition-all active:scale-95"
            style={{
              width: "48px",
              height: "44px",
              background: "rgba(255,23,68,0.15)",
              border: "1px solid rgba(255,23,68,0.28)",
              borderRadius: "14px",
            }}
            title="Menu"
          >
            <span
              className="text-base font-black leading-none"
              style={{ color: "#FF1744" }}
            >
              P
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
