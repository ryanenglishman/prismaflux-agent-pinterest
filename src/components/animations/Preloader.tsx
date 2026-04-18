"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--pf-bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo P animation */}
          <div className="relative">
            {/* Glow ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full"
              style={{ border: "2px solid var(--pf-brand)" }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity }}
            />

            {/* Logo */}
            <motion.svg
              width={64}
              height={64}
              viewBox="0 0 48 48"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <defs>
                <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF1744" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#pl-grad)" />
              <path
                d="M16 12h10c4.418 0 8 3.582 8 8s-3.582 8-8 8H22v8h-6V12z M22 17v6h4c1.657 0 3-1.343 3-3s-1.343-3-3-3h-4z"
                fill="white"
                fillRule="evenodd"
              />
            </motion.svg>

            {/* Loading bar */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
              style={{ background: "var(--pf-brand)" }}
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
