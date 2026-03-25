"use client";

import { useOverlay } from "./OverlayContext";

export default function BlurOverlay() {
  const { overlay, close } = useOverlay();

  if (!overlay) return null;

  return (
    <div
      className="fixed inset-0 z-40"
      style={{
        background: "rgba(6, 6, 8, 0.75)",
        backdropFilter: "blur(var(--overlay-blur))",
        WebkitBackdropFilter: "blur(var(--overlay-blur))",
      }}
      onClick={close}
    />
  );
}
