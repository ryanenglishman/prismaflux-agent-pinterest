"use client";

import Link from "next/link";
import { useState } from "react";

export default function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 px-5 py-4 flex items-center justify-between"
      style={{
        background: "rgba(6,6,8,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Link href="/home" className="text-xl font-black" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>
        Prisma<span style={{ color: "#FF1744" }}>Flux</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {[
          { href: "/home#copilotes", label: "Copilotes" },
          { href: "/tarifs",         label: "Tarifs" },
          { href: "/contact",        label: "Contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/essai-gratuit"
          className="px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{ background: "#FF1744", color: "#ffffff" }}
        >
          Essai gratuit
        </Link>
        <button
          className="md:hidden text-lg font-medium"
          style={{ color: "rgba(255,255,255,0.80)" }}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 p-4 flex flex-col gap-1"
          style={{
            background: "rgba(6,6,8,0.98)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { href: "/home#copilotes", label: "Copilotes" },
            { href: "/tarifs",         label: "Tarifs" },
            { href: "/contact",        label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 px-2 text-sm font-medium rounded-lg"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
