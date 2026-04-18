"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  scale?: boolean;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  scale = false,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        ...(scale ? { scale: scaleVal } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}
