import { Link } from "wouter";
import { ShareBar } from "./ShareBar";
import { SupportSection } from "./SupportSection";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/space-news", label: "Space news" },
  { href: "/learn/nasa-for-kids", label: "Space for kids" },
  { href: "/ai-in-space", label: "AI in space" },
  { href: "/learn/satellite-tutorial", label: "Satellite tutorial" },
  { href: "/space-quiz", label: "Space quiz" },
  { href: "/simulator", label: "Simulator" },
  { href: "/blog", label: "Blog" },
  { href: "/formulas-library", label: "Formulas" },
  { href: "/satellites", label: "Satellites" },
  { href: "/astrobot", label: "AstroBot" },
  { href: "/learn/orbital-mechanics", label: "Orbital mechanics" },
  { href: "/research", label: "Research" },
  { href: "/research/agi-asi-framework", label: "AGI/ASI" },
  { href: "/research/asi-astronaut-mathematics", label: "ASI Astronaut Math" },
  { href: "/research/pmp-nmpc-autonomous-control", label: "PMP-NMPC control" },
  { href: "/marketing-ai-agent", label: "Marketing AI" },
  { href: "/guide", label: "Guide" },
  { href: "/privacy-policy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer
      className="border-t-2 mt-auto py-8"
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-footer)",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="glass-panel rounded-2xl px-4 py-4 mb-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: "var(--accent-cyan)" }}>
            Built for the future of autonomous space intelligence
          </p>
        </div>
        <SupportSection />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-medium transition"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </Link>
          ))}
          <a
            href={import.meta.env.VITE_COMMUNITY_URL || "http://localhost:3001"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition"
            style={{ color: "var(--text-secondary)" }}
          >
            Community
          </a>
        </div>
        <p className="mt-2 text-center text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          PhD researchers:{" "}
          <Link href="/learn/aerospace#phd" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Advanced resources</Link>.{" "}
          <Link href="/research" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Research &amp; topics</Link> ·{" "}
          <Link href="/learn/aerospace" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Aerospace reference</Link>.
          New here?{" "}
          <Link href="/guide" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Guide</Link> ·{" "}
          <Link href="/simulator" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Simulator</Link>.
        </p>
        <div className="mt-4 flex justify-center footer-social">
          <ShareBar path="/" compact />
        </div>
        <p className="mt-4 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          Orbital Simulator Hub — orbitalsimulatorhub.com — aerospace study for students, scientists &amp; PhD researchers
        </p>
        <p className="mt-1 text-center text-xs" style={{ color: "var(--text-muted)", opacity: 0.8 }}>
          Made with Cursor
        </p>
      </div>
    </footer>
  );
}
