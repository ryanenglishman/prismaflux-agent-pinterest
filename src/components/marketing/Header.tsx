"use client";

import Link from "next/link";
import { useState } from "react";

export default function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 px-5 py-4 flex items-center justify-between"
      style={{
        background: "rgba(6,6,8,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Link href="/home" className="text-xl font-black" style={{ color: "white", letterSpacing: "-0.5px" }}>
        Prisma<span style={{ color: "var(--color-brand)" }}>Flux</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/home#copilotes" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
          Copilotes
        </Link>
        <Link href="/tarifs" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
          Tarifs
        </Link>
        <Link href="/contact" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/essai-gratuit"
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "var(--color-brand)", color: "white" }}
        >
          Essai gratuit
        </Link>
        <button className="md:hidden text-white text-xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 p-4 flex flex-col gap-3"
          style={{ background: "rgba(6,6,8,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link href="/home#copilotes" onClick={() => setOpen(false)} className="text-sm py-2 text-white">Copilotes</Link>
          <Link href="/tarifs" onClick={() => setOpen(false)} className="text-sm py-2 text-white">Tarifs</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="text-sm py-2 text-white">Contact</Link>
        </div>
      )}
    </header>
  );
}
