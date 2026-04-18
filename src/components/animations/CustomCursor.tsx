"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows mouse tightly
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(cursorX, { damping: 40, stiffness: 800, mass: 0.2 });

  // Ring follows with more lag for fluid feel
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.5 });

  // Separate Y springs
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 800, mass: 0.2 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    // Only show on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 1024) return;

    setVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [handleMove]);

  if (!visible) return null;

  return (
    <>
      {/* Dot — follows tightly */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotYSpring, willChange: "transform" }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "white" }}
          animate={{
            width: isHovering ? 48 : isClicking ? 4 : 8,
            height: isHovering ? 48 : isClicking ? 4 : 8,
            opacity: isHovering ? 0.12 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        />
      </motion.div>

      {/* Ring — follows with elegant lag */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none"
        style={{ x: ringX, y: ringY, willChange: "transform" }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2 border"
          style={{ borderColor: "var(--pf-brand)" }}
          animate={{
            width: isHovering ? 56 : 28,
            height: isHovering ? 56 : 28,
            opacity: isHovering ? 0.7 : 0.25,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
      </motion.div>

      {/* Hide default cursor on desktop only */}
      <style jsx global>{`
        @media (pointer: fine) and (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
