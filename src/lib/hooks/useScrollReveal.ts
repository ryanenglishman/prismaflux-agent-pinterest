"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay to ensure new page content is in the DOM
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal:not(.visible)");
      elements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
}
