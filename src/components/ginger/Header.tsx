"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos Soins" },
  { href: "/formations", label: "Formations" },
  { href: "/a-propos", label: "Notre Histoire" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-700",
        scrolled
          ? "glass border-b border-gold/15 shadow-[0_4px_40px_-12px_rgba(196,169,125,0.12)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 md:h-[88px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-cream to-champagne flex items-center justify-center border border-gold/40 group-hover:border-gold/70 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(196,169,125,0.2)]">
              <span className="font-serif text-olive font-bold text-lg leading-none">
                G
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-olive font-bold text-lg tracking-[0.12em] leading-tight">
                GINGER
              </span>
              <span className="text-[8px] text-gold-dark tracking-[0.25em] uppercase leading-tight font-medium">
                Institut de Beauté
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2.5 text-[12.5px] font-medium tracking-[0.04em] transition-all duration-400 rounded-pill uppercase",
                  pathname === link.href
                    ? "text-olive"
                    : "text-brun-light hover:text-olive"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[1.5px] bg-gradient-to-r from-gold to-rose rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+32499295849"
              className="flex items-center gap-2 text-brun text-[13px] hover:text-olive transition-colors duration-300"
            >
              <Phone size={13} className="text-gold" />
              <span className="font-medium tracking-wide">+32 499 29 58 49</span>
            </a>
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative inline-flex items-center gap-2 bg-gradient-to-r from-anthracite to-brun-dark text-cream-light text-[12.5px] font-medium tracking-[0.04em] uppercase py-2.5 px-6 rounded-pill overflow-hidden transition-all duration-500 hover:shadow-[0_8px_24px_-8px_rgba(44,44,40,0.3)]"
            >
              <span className="relative z-10">Réserver</span>
              <ArrowRight size={13} className="relative z-10 group-hover/cta:translate-x-0.5 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-olive-warm to-brun opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-olive rounded-full hover:bg-cream/60 transition-colors duration-300"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="glass border-t border-gold/10 px-6 pb-6 pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center py-3.5 text-[14px] font-medium tracking-[0.03em] border-b border-border-light/40 transition-colors duration-300",
                pathname === link.href
                  ? "text-olive"
                  : "text-brun-light"
              )}
            >
              {pathname === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gold to-rose mr-3" />
              )}
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-5">
            <a
              href="tel:+32499295849"
              className="flex items-center justify-center gap-2 text-brun text-sm py-3 rounded-pill border border-gold/25"
            >
              <Phone size={14} className="text-gold" />
              +32 499 29 58 49
            </a>
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm justify-center !py-3"
            >
              Réserver un soin
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
