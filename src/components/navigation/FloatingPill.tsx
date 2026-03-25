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
          className="flex items-center gap-1 p-1"
          style={{
            background: "rgba(20,20,24,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "var(--pill-radius)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Robin side — add vehicle */}
          <button
            onClick={openVehicle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[16px] transition-all active:scale-95"
            style={{ background: "rgba(255,107,53,0.15)" }}
            title="Ajouter un véhicule"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              style={{ background: "rgba(255,107,53,0.25)" }}
            >
              🦅
            </div>
            <span className="text-sm font-semibold" style={{ color: "#FF6B35" }}>
              + Véhicule
            </span>
          </button>

          {/* Divider */}
          <div
            className="w-px h-6 mx-1"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />

          {/* PrismaFlux P — menu */}
          <button
            onClick={openMenu}
            className="flex items-center justify-center w-12 h-11 rounded-[16px] transition-all active:scale-95"
            style={{ background: "rgba(255,23,68,0.12)" }}
            title="Menu"
          >
            <span
              className="text-lg font-black"
              style={{ color: "var(--color-brand)" }}
            >
              P
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
