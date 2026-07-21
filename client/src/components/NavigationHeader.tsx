import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ThemeSelector } from "./ThemeSelector";

const MISSION_SUBNAV = [
  { path: "/missions", label: "Missions", title: "Space missions — Apollo, Gemini, Shuttle" },
  { path: "/missions/platform", label: "Mission Platform", title: "Phase 5/6 mission planning platform" },
  { path: "/astronauts", label: "Astronauts", title: "Astronaut Explorer — all astronauts, moonwalkers" },
  { path: "/artifacts", label: "Brought Back", title: "What humans brought back from space" },
];

const SIMULATOR_SUBNAV = [
  { path: "/simulator", label: "Orbit Simulator", title: "3D satellite orbit simulator — LEO, MEO, GEO" },
  { path: "/simulator/swarm", label: "Swarm Simulator", title: "AI swarm collision avoidance — J2, Pc, OSQP" },
  { path: "/simulator/ai-astronaut-robot", label: "AI Robot Lab", title: "Build and train AI space robots — humanoid, rover, vision AI" },
  { path: "/quantum-space-agi", label: "Quantum Space AGI Lab", title: "Quantum Space AGI Lab — curvature-aware navigation" },
  { path: "/simulator/quantum-space-agi", label: "Quantum Simulator", title: "Quantum-assisted black hole flyby — Schwarzschild, Kerr, wormhole" },
];

const SPACE_AGI_SUBNAV = [
  { path: "/research/space-agi-lab", label: "Engineering Lab", title: "5 pillars: autonomous spacecraft, decision intelligence, orbital math" },
  { path: "/research/space-agi-roadmap", label: "Roadmap", title: "2025–2060+ timeline: AI satellites to interstellar" },
  { path: "/research/space-agi-explanation", label: "Explanation", title: "Plain-language guides — Math Explained tab for teens & college" },
  { path: "/research/space-agi-math", label: "Mathematics", title: "Optimal control, MPC, LQR, Space-AGI framework (graduate level)" },
];

const BLOG_SUBNAV = [
  { path: "/blog", label: "Blog", title: "Daily space news, space facts, satellite tutorials" },
  { path: "/recommended-books", label: "Books", title: "Recommended space & aerospace books" },
  { path: "/space-shop", label: "Space Shop", title: "NASA t-shirts, toys, books — verified Amazon" },
  { path: "/learn/aerospace", label: "Aerospace", title: "Aerospace reference for students and researchers" },
  { path: "/ai-in-aerospace", label: "AI in Space", title: "How AI is transforming aerospace and space exploration" },
  { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
];

const NAV = [
  { path: "/", label: "Home", title: "OrbitalSimulatorHub — Orbital Mechanics • AI in Space • Future Space Intelligence" },
  { path: "/planets", label: "Planets", title: "Planet Study Hub — explore every planet in our solar system" },
  { path: "/simulator", label: "Simulator", title: "Orbit & Swarm simulators — LEO, MEO, GEO, AI collision avoidance", subnav: SIMULATOR_SUBNAV },
  { path: "/research/space-agi-lab", label: "🧠 Space-AGI Lab", title: "Space-AGI Engineering Lab — autonomous spacecraft, decision intelligence, orbital math", subnav: SPACE_AGI_SUBNAV },
  { path: "/blog", label: "Blog", title: "Daily space news, aerospace, AI in space, research", subnav: BLOG_SUBNAV },
  { path: "/astrobot", label: "AstroBot", title: "Ask AstroBot anything about space, orbits, and satellites" },
  { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
];

function isMissionsActive(location: string) {
  return location === "/missions" || location.startsWith("/missions/") || location === "/astronauts" || location.startsWith("/astronauts/") || location === "/artifacts";
}

function isSimulatorActive(location: string) {
  return location === "/simulator" || location === "/simulator/swarm" || location === "/simulator/ai-astronaut-robot" || location === "/simulator/quantum-space-agi"
    || location === "/quantum-space-agi" || location.startsWith("/quantum-space-agi/");
}

function isSpaceAgiActive(location: string) {
  return location === "/research/space-agi-lab" || location === "/research/space-agi-roadmap" || location === "/research/space-agi-math" || location === "/research/space-agi-explanation";
}

function isBlogActive(location: string) {
  return location === "/blog" || location.startsWith("/blog/") || location === "/recommended-books" || location === "/space-shop"
    || location === "/learn/aerospace" || location.startsWith("/learn/aerospace")
    || location === "/ai-in-aerospace" || location === "/ai-in-space" || location === "/research" || location.startsWith("/research/");
}

export function NavigationHeader() {
  const [location] = useLocation();
  const [missionsOpen, setMissionsOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [spaceAgiOpen, setSpaceAgiOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const missionsRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const spaceAgiRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (missionsRef.current && !missionsRef.current.contains(e.target as Node)) {
        setMissionsOpen(false);
      }
      if (simulatorRef.current && !simulatorRef.current.contains(e.target as Node)) {
        setSimulatorOpen(false);
      }
      if (spaceAgiRef.current && !spaceAgiRef.current.contains(e.target as Node)) {
        setSpaceAgiOpen(false);
      }
      if (blogRef.current && !blogRef.current.contains(e.target as Node)) {
        setBlogOpen(false);
      }
    }
    if (missionsOpen || simulatorOpen || spaceAgiOpen || blogOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [missionsOpen, simulatorOpen, spaceAgiOpen, blogOpen]);

  return (
    <header
      className="border-b-2 backdrop-blur-xl sticky top-0 z-50 shadow-sm nav-shell"
      style={{
        borderColor: "var(--border-accent)",
        background: "var(--bg-header)",
      }}
    >
      <div className="container mx-auto px-4 py-3 max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <ThemeSelector />
          </div>
          <Link href="/" className="flex items-center gap-2 transition opacity-90 hover:opacity-100">
            <img
              src="/logo.svg"
              alt="OrbitalSimulatorHub"
              className="h-9 sm:h-10 w-auto max-w-[180px] sm:max-w-none"
            />
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden nav-pill-btn px-3 py-2 rounded-lg text-sm font-semibold"
          style={{ color: "var(--text-primary)", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>

        <nav className="hidden lg:flex flex-wrap gap-1 items-center">
          {NAV.slice(0, 3).map(({ path, label, title, subnav }) => (
            subnav ? null : <NavLink key={path} path={path} label={label} title={title} location={location} />
          ))}
          <div ref={simulatorRef} className="relative">
            <button
              onClick={() => setSimulatorOpen((v) => !v)}
              onMouseEnter={() => setSimulatorOpen(true)}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1 nav-pill-btn ${isSimulatorActive(location) ? "nav-pill-active" : ""}`}
              style={
                isSimulatorActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              Simulator
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: simulatorOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {simulatorOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[180px] nav-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setSimulatorOpen(false)}
              >
                {SIMULATOR_SUBNAV.map(({ path, label, title }, idx) => (
                  <Link key={path} href={path} onClick={() => setSimulatorOpen(false)}>
                    <a
                      className="block px-4 py-2 text-sm font-medium transition nav-dropdown-link nav-dropdown-item"
                      style={{
                        animationDelay: `${idx * 28}ms`,
                        color: location === path || (path === "/simulator" && location === "/simulator") ? "var(--accent-cyan)" : "var(--text-primary)",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div ref={missionsRef} className="relative">
            <button
              onClick={() => setMissionsOpen((v) => !v)}
              onMouseEnter={() => setMissionsOpen(true)}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1 nav-pill-btn ${isMissionsActive(location) ? "nav-pill-active" : ""}`}
              style={
                isMissionsActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              Missions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: missionsOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {missionsOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[160px] nav-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setMissionsOpen(false)}
              >
                {MISSION_SUBNAV.map(({ path, label, title }, idx) => (
                  <Link key={path} href={path} onClick={() => setMissionsOpen(false)}>
                    <a
                      className="block px-4 py-2 text-sm font-medium transition nav-dropdown-link nav-dropdown-item"
                      style={{
                        animationDelay: `${idx * 28}ms`,
                        color: location === path || (path === "/missions" && location.startsWith("/missions")) ? "var(--accent-cyan)" : "var(--text-primary)",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div ref={spaceAgiRef} className="relative">
            <button
              onClick={() => setSpaceAgiOpen((v) => !v)}
              onMouseEnter={() => setSpaceAgiOpen(true)}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1 nav-pill-btn ${isSpaceAgiActive(location) ? "nav-pill-active" : ""}`}
              style={
                isSpaceAgiActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              🧠 Space-AGI Lab
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: spaceAgiOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {spaceAgiOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[180px] nav-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setSpaceAgiOpen(false)}
              >
                {SPACE_AGI_SUBNAV.map(({ path, label, title }, idx) => (
                  <Link key={path} href={path} onClick={() => setSpaceAgiOpen(false)}>
                    <a
                      className="block px-4 py-2 text-sm font-medium transition nav-dropdown-link nav-dropdown-item"
                      style={{
                        animationDelay: `${idx * 28}ms`,
                        color: location === path ? "var(--accent-cyan)" : "var(--text-primary)",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div ref={blogRef} className="relative">
            <button
              onClick={() => setBlogOpen((v) => !v)}
              onMouseEnter={() => setBlogOpen(true)}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1 nav-pill-btn ${isBlogActive(location) ? "nav-pill-active" : ""}`}
              style={
                isBlogActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              Blog
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: blogOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {blogOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[160px] nav-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setBlogOpen(false)}
              >
                {BLOG_SUBNAV.map(({ path, label, title }, idx) => {
                  const isActive =
                    (path === "/blog" && (location === "/blog" || location.startsWith("/blog/")))
                    || (path === "/learn/aerospace" && location.startsWith("/learn/aerospace"))
                    || (path === "/ai-in-aerospace" && (location === "/ai-in-aerospace" || location === "/ai-in-space"))
                    || (path === "/research" && (location === "/research" || location.startsWith("/research/")));
                  return (
                    <Link key={path} href={path} onClick={() => setBlogOpen(false)}>
                      <a
                        className="block px-4 py-2 text-sm font-medium transition nav-dropdown-link nav-dropdown-item"
                        style={{
                          animationDelay: `${idx * 28}ms`,
                          color: isActive ? "var(--accent-cyan)" : "var(--text-primary)",
                        }}
                      >
                        {label}
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {NAV.slice(2).filter((n) => n.path !== "/research/space-agi-lab" && n.path !== "/simulator" && n.path !== "/blog" && n.path !== "/ai-in-aerospace" && n.path !== "/research").map(({ path, label, title }) => (
            <NavLink key={path} path={path} label={label} title={title} location={location} />
          ))}
        </nav>
      </div>

      {mobileOpen && <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)} aria-hidden />}

      <div className={`lg:hidden mobile-nav-panel ${mobileOpen ? "mobile-nav-panel-open" : ""}`}>
        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Navigate</p>
        </div>

        <div className="p-3 grid gap-2 max-h-[65vh] overflow-y-auto">
          <MobileNavLink href="/" label="Home" />
          <MobileNavLink href="/planets" label="Planets" />
          <MobileNavLink href="/astrobot" label="AstroBot" />
          <MobileNavLink href="/research" label="Research" />

          <p className="mt-2 mb-1 text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Simulator</p>
          {SIMULATOR_SUBNAV.map(({ path, label }) => (
            <MobileNavLink key={path} href={path} label={label} nested />
          ))}

          <p className="mt-2 mb-1 text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Missions</p>
          {MISSION_SUBNAV.map(({ path, label }) => (
            <MobileNavLink key={path} href={path} label={label} nested />
          ))}

          <p className="mt-2 mb-1 text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Space-AGI Lab</p>
          {SPACE_AGI_SUBNAV.map(({ path, label }) => (
            <MobileNavLink key={path} href={path} label={label} nested />
          ))}

          <p className="mt-2 mb-1 text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Blog & Learning</p>
          {BLOG_SUBNAV.map(({ path, label }) => (
            <MobileNavLink key={path} href={path} label={label} nested />
          ))}
        </div>
      </div>
    </header>
  );
}

function MobileNavLink({ href, label, nested = false }: { href: string; label: string; nested?: boolean }) {
  return (
    <Link href={href}>
      <a
        className={`mobile-nav-link ${nested ? "mobile-nav-link-nested" : ""}`}
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </a>
    </Link>
  );
}

function NavLink({ path, label, title, location }: { path: string; label: string; title: string; location: string }) {
  const active = location === path || (path !== "/" && location.startsWith(path)) || (path === "/research/space-agi-lab" && location === "/research/space-agi-roadmap");
  return (
    <Link href={path} title={title}>
      <a
        className={`px-3 py-2 rounded-lg font-medium transition text-sm nav-pill-btn ${active ? "nav-pill-active" : ""}`}
        style={
          active
            ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
            : { color: "var(--text-secondary)" }
        }
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = "var(--nav-hover-bg)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }
        }}
      >
        {label}
      </a>
    </Link>
  );
}
