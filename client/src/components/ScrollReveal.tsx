import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollReveal() {
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const targets = document.querySelectorAll<HTMLElement>(".home-card, .card-blueprint, .modern-section, .reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);

  return null;
}
