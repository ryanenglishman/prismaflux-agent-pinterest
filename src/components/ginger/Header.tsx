"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";

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
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-gold/20 shadow-[0_4px_30px_-10px_rgba(196,169,125,0.15)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 md:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cream to-sand flex items-center justify-center border border-gold/50 group-hover:border-gold transition-colors duration-300">
              <span className="font-serif text-olive font-bold text-xl leading-none">
                G
              </span>
              <div className="absolute inset-0 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-olive font-bold text-xl tracking-[0.08em] leading-tight">
                GINGER
              </span>
              <span className="text-[9px] text-brun-light tracking-[0.22em] uppercase leading-tight font-medium">
                Institut de Beauté
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-pill",
                  pathname === link.href
                    ? "text-olive"
                    : "text-brun-light hover:text-olive"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+32499295849"
              className="flex items-center gap-2 text-brun text-sm hover:text-olive transition-colors"
            >
              <Phone size={14} className="text-gold" />
              <span className="font-medium">+32 499 29 58 49</span>
            </a>
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm !py-2.5 !px-6"
            >
              Réserver un soin
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-olive rounded-full hover:bg-cream/60 transition-colors"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-400 ease-in-out",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="glass border-t border-gold/15 px-6 pb-6 pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center py-3.5 text-[15px] font-medium border-b border-border-light/50 transition-colors",
                pathname === link.href
                  ? "text-olive"
                  : "text-brun-light"
              )}
            >
              {pathname === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
              )}
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-5">
            <a
              href="tel:+32499295849"
              className="flex items-center justify-center gap-2 text-brun text-sm py-3 rounded-pill border border-gold/30"
            >
              <Phone size={14} className="text-gold" />
              +32 499 29 58 49
            </a>
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm justify-center"
            >
              Réserver un soin
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
