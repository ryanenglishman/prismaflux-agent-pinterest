"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type OverlayType = "vehicle" | "menu" | null;

type OverlayContextType = {
  overlay: OverlayType;
  openVehicle: () => void;
  openMenu: () => void;
  close: () => void;
};

const OverlayContext = createContext<OverlayContextType>({
  overlay: null,
  openVehicle: () => {},
  openMenu: () => {},
  close: () => {},
});

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayType>(null);

  return (
    <OverlayContext.Provider
      value={{
        overlay,
        openVehicle: () => setOverlay("vehicle"),
        openMenu: () => setOverlay("menu"),
        close: () => setOverlay(null),
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  return useContext(OverlayContext);
}
