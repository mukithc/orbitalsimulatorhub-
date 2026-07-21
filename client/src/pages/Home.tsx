import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";
import { getBlogImage } from "../data/blogImages";

const FEATURES = [
  { href: "/simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites. Watch orbits in real time.", color: "cyan" },
  { href: "/simulator/ai-astronaut-robot", icon: "🤖", title: "AI Robot Lab", desc: "Build and train AI space robots. Humanoid, rover, vision AI.", color: "purple" },
  { href: "/astrobot", icon: "🤖", title: "AstroBot", desc: "Your AI Space Professor. Orbital mechanics, satellites, missions.", color: "gold" },
  { href: "/learn/orbital-mechanics", icon: "🧠", title: "Orbital Mechanics", desc: "Master orbits, escape velocity, Hohmann transfer.", color: "cyan" },
  { href: "/ai-in-aerospace", icon: "🚀", title: "AI in Space", desc: "Autonomous spacecraft, Mars rover AI, Space AGI.", color: "pink" },
  { href: "/missions/platform", icon: "🧭", title: "Mission Platform", desc: "Phase 5/6 planning for autonomous missions, deep-space ops, and interstellar logistics.", color: "gold" },
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab", desc: "5 pillars, humanoid robotics, multi-gravity AGI, live swarm simulator.", color: "cyan" },
];

const QUICK_LINKS = [
  { href: "/astronauts", label: "Astronauts" },
  { href: "/planets", label: "Planets" },
  { href: "/missions", label: "Missions" },
  { href: "/missions/platform", label: "Mission Platform" },
  { href: "/calculators", label: "Calculators" },
  { href: "/satellites", label: "Satellite Data" },
  { href: "/blog", label: "Blog" },
  { href: "/space-news", label: "Space News" },
  { href: "/research", label: "Research" },
  { href: "/simulator/ai-astronaut-robot", label: "AI Robot Simulator" },
  { href: "/research/space-agi-lab", label: "Space-AGI Lab" },
  { href: "/research/space-agi-math", label: "Space-AGI Math" },
  { href: "/recommended-books", label: "Books" },
  { href: "/space-shop", label: "Space Shop" },
  { href: "/privacy-policy", label: "Privacy" },
];

// Sort by date descending so newest is first (content-agent appends to end of array)
const LATEST_POSTS = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

// Build dynamic updates: latest 3 blog posts first, then featured research, then static links
function getTodaysUpdates() {
  const latest = LATEST_POSTS.slice(0, 3).map((p) => ({
    href: `/blog/${p.slug}`,
    label: `🆕 ${p.title.length > 45 ? p.title.slice(0, 42) + "…" : p.title}`,
    desc: p.excerpt.slice(0, 80) + (p.excerpt.length > 80 ? "…" : ""),
    isNew: true,
  }));
  const featuredResearch = [
    { href: "/simulator/ai-astronaut-robot", label: "🤖 AI Astronaut Robot Lab", desc: "Build and train AI space robots. World-first Space-AGI simulator.", isNew: true },
    { href: "/blog/how-space-will-build-ai-based-astronaut-robots-for-future-missions", label: "📄 AI Astronaut Robots", desc: "How NASA & SpaceX will build AI robots for Moon, Mars, deep space.", isNew: true },
    { href: "/research/space-agi-math", label: "🧮 Space-AGI Mathematics", desc: "MPC, LQR, Pontryagin, optimal control — graduate-level", isNew: false },
  ];
  const staticLinks = [
    { href: "/space-news", label: "📰 Daily Space News", desc: "NASA, Artemis, SpaceX, James Webb — updated daily", isNew: false },
    { href: "/research/space-agi-lab", label: "🧠 Space-AGI Lab", desc: "5 pillars, autonomous spacecraft, decision intelligence", isNew: false },
    { href: "/learn/quantum-space", label: "⚛ Quantum & Space", desc: "Quantum physics, atomic clocks, GPS, quantum sensors", isNew: false },
    { href: "/blog", label: "📚 All Articles", desc: "Space engineering, AI, formulas — fresh content every day", isNew: false },
    { href: "/space-shop", label: "🛒 Space Shop", desc: "NASA t-shirts, toys, books — verified Amazon", isNew: false },
  ];
  return [...latest, ...featuredResearch, ...staticLinks];
}

const EXPLORE_BY_TOPIC = [
  { href: "/simulator/ai-astronaut-robot", icon: "🤖", title: "AI Astronaut Robots" },
  { href: "/blog/category/space-agi", icon: "🧠", title: "Space AGI" },
  { href: "/blog/category/space-engineering", icon: "⚙️", title: "Space Engineering" },
  { href: "/missions/platform", icon: "🧭", title: "Mission Platform" },
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab" },
  { href: "/research/space-agi-math", icon: "🧮", title: "Space-AGI Math" },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum & Space" },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace" },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "Orbital mechanics" },
  { href: "/formulas-library", icon: "🧮", title: "Formulas & calculators" },
  { href: "/calculators", icon: "📐", title: "Orbit calculator" },
  { href: "/research/future-civilization", icon: "🚀", title: "Future Civilization" },
  { href: "/space-news", icon: "📰", title: "Daily Space News" },
];

const HOME_FORMULA_SPOTLIGHTS = [
  {
    title: "Pontryagin Maximum Principle",
    equation: "u* = arg min_u H(x, λ, u)",
    desc: "The core rule for fuel-optimal spacecraft guidance, landers, and autonomous transfers.",
  },
  {
    title: "Two-Body Dynamics",
    equation: "r¨ = −(μ/r³)r",
    desc: "The fundamental law behind satellite and planetary motion.",
  },
  {
    title: "Rocket Equation",
    equation: "Δv = v_e ln(m₀/m_f)",
    desc: "The mass-to-velocity tradeoff at the heart of mission planning.",
  },
  {
    title: "Kalman Filter Update",
    equation: "x = x + K(z − Hx)",
    desc: "How spacecraft combine noisy measurements into a usable state estimate.",
  },
];

export function Home() {
  const [showExplore, setShowExplore] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const updates = getTodaysUpdates();
  const latestPost = LATEST_POSTS[0];

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const compactViewport = window.matchMedia("(max-width: 900px)").matches;
    if (reduceMotion || coarsePointer || compactViewport) return;

    let frame = 0;

    const applyParallax = (clientX: number, clientY: number) => {
      const rect = shell.getBoundingClientRect();
      const nx = (clientX - rect.left) / rect.width - 0.5;
      const ny = (clientY - rect.top) / rect.height - 0.5;
      shell.style.setProperty("--parallax-x", `${nx * -22}px`);
      shell.style.setProperty("--parallax-y", `${ny * -14}px`);
      shell.style.setProperty("--parallax-tilt-x", `${ny * 2.5}deg`);
      shell.style.setProperty("--parallax-tilt-y", `${nx * -3}deg`);
    };

    const onMove = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyParallax(event.clientX, event.clientY));
    };

    const onLeave = () => {
      shell.style.setProperty("--parallax-x", "0px");
      shell.style.setProperty("--parallax-y", "0px");
      shell.style.setProperty("--parallax-tilt-x", "0deg");
      shell.style.setProperty("--parallax-tilt-y", "0deg");
    };

    shell.addEventListener("mousemove", onMove);
    shell.addEventListener("mouseleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      shell.removeEventListener("mousemove", onMove);
      shell.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={shellRef} className="home-page-wrapper orbital-ambient-shell -mx-4 px-4 py-2 rounded-2xl">
      <div className="orbital-ambient-layer" aria-hidden>
        <span className="orbital-orb orbital-orb-a" />
        <span className="orbital-orb orbital-orb-b" />
        <span className="orbital-orb orbital-orb-c" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* ═══ NEWEST BLOG POST — Prominent at top ═══ */}
        {latestPost && (
          <section className="mb-6 animate-fade-in-up modern-section">
            <Link href={`/blog/${latestPost.slug}`}>
              <a className="block rounded-2xl border overflow-hidden transition hover:opacity-95 modern-hover-glow" style={{ background: "rgba(0,217,255,0.08)", borderColor: "rgba(0,217,255,0.35)" }}>
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 min-h-[160px] sm:min-h-[200px] relative">
                    <img src={getBlogImage(latestPost)} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Newest</span>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                    <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>{latestPost.category.replace(/-/g, " ")}</span>
                    <h2 className="text-lg sm:text-xl font-bold mt-1 mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>{latestPost.title}</h2>
                    <p className="text-sm line-clamp-2 mb-2" style={{ color: "var(--text-secondary)" }}>{latestPost.excerpt}</p>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(latestPost.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · Read more →</span>
                  </div>
                </div>
              </a>
            </Link>
          </section>
        )}

        {/* ═══ UPDATES BANNER — Latest Updates ═══ */}
        <section className="updates-banner rounded-2xl p-5 md:p-6 mb-8 animate-fade-in-up modern-section animate-delay-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider" style={{ color: "var(--accent-cyan)" }}>
              What&apos;s New — Latest Updates
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,217,255,0.3)", color: "var(--text-on-accent)" }}>
              HIGHLIGHTED
            </span>
          </div>
          {/* Other updates grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {updates.slice(0, 5).map((u) => {
              const linkClass = "block p-3 rounded-xl transition hover:opacity-95 relative border";
              const linkStyle = u.isNew
                ? { background: "rgba(0,217,255,0.12)", borderColor: "rgba(0,217,255,0.4)" }
                : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" };
              return (
                <Link key={u.href} href={u.href}>
                  <a className={linkClass} style={linkStyle}>
                    {u.isNew && <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>NEW</span>}
                    <span className="font-bold text-sm" style={{ color: "var(--accent-cyan)" }}>{u.label} →</span>
                    <span className="block text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{u.desc}</span>
                  </a>
                </Link>
              );
            })}
          </div>
        </section>

          {/* Hero — Intelligence for the Space Age */}
        <section className="rounded-2xl px-6 py-8 sm:py-10 text-center mb-8 hero-gradient modern-hero-panel animate-fade-in-up animate-delay-2" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Space Engineering • AI • Quantum • Daily News • Futuristic</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          OrbitalSimulatorHub — Intelligence for the Space Age
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-5">
          Space AGI, orbital mechanics, quantum computing in space, aerospace formulas. New posts daily. Everything futuristic and helpful.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Link href="/simulator">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-95" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              🛰 Open Orbital Simulator
            </a>
          </Link>
          <Link href="/astrobot">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              🤖 Ask AstroBot
            </a>
          </Link>
          <Link href="/research/space-agi-lab">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              🔬 Space-AGI Lab
            </a>
          </Link>
          <Link href="/ai-in-aerospace">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-pink)", color: "var(--text-on-accent)" }}>
              🚀 AI in Space
            </a>
          </Link>
        </div>
          <p className="text-xs text-slate-400">Trusted by students, engineers, researchers worldwide</p>
          <ShareBar path="/" showRedditSubs />
        </section>

        <section
          className="rounded-[28px] p-6 md:p-7 mb-8 modern-section animate-fade-in-up animate-delay-2"
          style={{
            background: "linear-gradient(145deg, rgba(15,23,42,0.92), rgba(14,30,64,0.86))",
            border: "1px solid rgba(56,217,255,0.22)",
            boxShadow: "0 20px 55px rgba(2,8,23,0.45)",
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] mb-3" style={{ color: "var(--accent-cyan)" }}>
                New Formula Focus
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Pontryagin now leads the homepage math story
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Your platform now highlights the same mathematics used for optimal spacecraft trajectories, fuel-aware landings, estimation, and autonomous orbital decision-making.
              </p>
            </div>
            <div className="rounded-2xl px-4 py-3 font-mono text-sm" style={{ background: "rgba(8,15,31,0.82)", border: "1px solid rgba(56,217,255,0.16)", color: "var(--accent-cyan)" }}>
              H(x, λ, u, t) = L(x, u, t) + λᵀf(x, u, t)
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
            {HOME_FORMULA_SPOTLIGHTS.map((item) => (
              <article key={item.title} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--accent-gold)" }}>{item.title}</p>
                <p className="font-mono text-sm mb-3" style={{ color: "var(--text-primary)" }}>{item.equation}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <Link href="/research/space-agi-math"><a className="px-3 py-1.5 rounded text-sm" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Full mathematics</a></Link>
            <Link href="/formulas-library"><a className="px-3 py-1.5 rounded text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-primary)" }}>Orbital formulas</a></Link>
            <Link href="/ai-in-aerospace"><a className="px-3 py-1.5 rounded text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-primary)" }}>AI in aerospace</a></Link>
          </div>
        </section>

        <section
          className="rounded-[28px] p-6 md:p-7 mb-8 relative overflow-hidden modern-section animate-fade-in-up animate-delay-2"
          style={{
            background: "linear-gradient(135deg, rgba(217,70,239,0.14), rgba(79,140,255,0.16) 55%, rgba(56,217,255,0.12))",
            border: "1px solid rgba(217,70,239,0.28)",
            boxShadow: "0 18px 50px rgba(5,8,22,0.35)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(56,217,255,0.14), transparent 32%), radial-gradient(circle at bottom left, rgba(139,92,246,0.16), transparent 38%)" }} />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: "rgba(248,250,252,0.08)", color: "var(--accent-cyan)" }}
              >
                Coming Soon
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Orbital Community is on the way
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Orbital Community is our upcoming professional network for space enthusiasts, engineers, researchers, students, founders, and creators. It is being built as a modern place to connect, collaborate, share mission ideas, and join real conversations around aerospace, astronomy, robotics, and the future beyond Earth.
              </p>
            </div>
            <div
              className="rounded-3xl p-5 lg:max-w-sm"
              style={{ background: "rgba(15,23,42,0.56)", border: "1px solid rgba(248,250,252,0.1)" }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent-pink)" }}>
                What to expect
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>• Space-focused communities and live discussions</li>
                <li>• Professional profiles, missions, and collaboration spaces</li>
                <li>• A premium social hub built for the global space industry</li>
              </ul>
              <a
                href="https://orbitalcommunity.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center mt-4 px-4 py-2.5 rounded-full font-semibold text-sm"
                style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}
              >
                Visit OrbitalCommunity.com
              </a>
            </div>
          </div>
        </section>

        {/* Mission Platform spotlight — extra extraordinary */}
        <section className="relative rounded-[32px] p-6 lg:p-8 mb-8 overflow-hidden modern-section animate-fade-in-up animate-delay-3"
          style={{
            background: "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.14) 50%, rgba(14,165,233,0.08))",
            border: "2px solid rgba(56,189,248,0.35)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)] pointer-events-none" />
          <div className="relative grid gap-6 lg:grid-cols-[1.8fr_1fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ background: "rgba(56,189,248,0.2)", color: "var(--accent-cyan)" }}
              >
                Mission Platform
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Phase 5/6 Autonomous Mission Platform
              </h2>
              <p className="mt-3 text-sm sm:text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                Lead the next era of space operations with a living mission command center. Plan autonomous probes, manage deep-space logistics, and design interstellar networks from one bold platform.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/missions/platform">
                  <a className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm"
                    style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}
                  >
                    Enter Mission Platform
                  </a>
                </Link>
                <Link href="/missions">
                  <a className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 font-semibold text-sm"
                    style={{ borderColor: "rgba(255,255,255,0.18)", color: "var(--text-on-surface)" }}
                  >
                    Browse missions
                  </a>
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-3xl p-4"
                style={{ background: "rgba(15,23,42,0.72)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>
                  Platform pillars
                </p>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Autonomous mission orchestration</li>
                  <li>• Deep-space network planning</li>
                  <li>• AI-driven decision intelligence</li>
                  <li>• Interstellar logistics & safety</li>
                </ul>
              </div>
              <div className="rounded-3xl p-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: "var(--accent-gold)" }}>
                  Why it matters
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Turn bold mission ideas into executable strategy for future explorers, AI crew, and self-driving spacecraft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 main features — Simulator, AstroBot, Orbital Mechanics, AI in Space, Space-AGI Lab */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href}>
              <a className="home-card block p-5 rounded-xl">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h2 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{f.title}</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </a>
          </Link>
        ))}
      </section>

        {/* Today's topic + quick links */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="home-card rounded-xl p-4">
            <DailyTopicIcon />
          </div>
          <div className="home-card rounded-xl p-4">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>📡 Quick links</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                <a className="px-3 py-1.5 rounded-lg text-sm font-medium transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                  {l.label}
                </a>
              </Link>
            ))}
            </div>
          </div>
        </section>

        {/* AI Astronaut Robot Lab — NEW featured block */}
        <section
          className="rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(167,139,250,0.12) 50%, rgba(0,217,255,0.1) 100%)",
            border: "2px solid rgba(0,217,255,0.4)",
            boxShadow: "0 0 40px rgba(0,217,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute top-2 right-2 flex gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>NEW</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.5)", color: "#fff" }}>World First</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            🤖 AI Astronaut Robot Lab
          </h2>
          <p className="text-sm mb-4 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Build and train your own AI space robot inside a simulator. Design humanoid space robots, train vision AI, simulate missions in zero gravity and Mars terrain.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator/ai-astronaut-robot">
              <a className="px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-95" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
                Launch Robot Simulator
              </a>
            </Link>
            <Link href="/blog/how-space-will-build-ai-based-astronaut-robots-for-future-missions">
              <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}>
                Learn Space Robotics
              </a>
            </Link>
            <Link href="/simulator/ai-astronaut-robot#training">
              <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "rgba(167,139,250,0.8)", color: "#a78bfa" }}>
                Train Vision AI
              </a>
            </Link>
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Trusted by engineers, researchers, future space pioneers.
          </p>
        </section>

        {/* Orbital Mechanics Master Hub + AI in Space + Future Space Intelligence */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/learn/orbital-mechanics">
            <a className="home-card block rounded-xl p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🧠 Master Orbital Mechanics</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>Best on the Internet</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>What is orbit • Why satellites don&apos;t fall • LEO MEO GEO • Escape velocity • Hohmann transfer</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Learn more →</span>
          </a>
        </Link>
          <Link href="/ai-in-aerospace">
            <a className="home-card block rounded-xl p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-pink)" }}>🚀 #1 AI + Space Platform</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>AI controls satellites • Autonomous spacecraft • Mars rover AI • Space AGI</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-pink)" }}>Explore AI in Space →</span>
          </a>
        </Link>
          <Link href="/research/space-agi-lab">
            <a className="home-card block rounded-xl p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🧠 Space-AGI Engineering Lab</h3>
            <p className="text-sm mb-2 font-semibold" style={{ color: "var(--text-primary)" }}>World-First Platform</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>5 pillars: autonomous spacecraft, decision intelligence, orbital math, future systems, live simulation lab.</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Enter Lab →</span>
          </a>
        </Link>
      </section>

        {/* Explore by topic — collapsible */}
        <section className="home-card rounded-xl p-4 mb-8">
        <button
          type="button"
          onClick={() => setShowExplore(!showExplore)}
          className="w-full flex items-center justify-between text-left font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          <span>Explore by topic</span>
          <span className="text-xl">{showExplore ? "−" : "+"}</span>
        </button>
        {showExplore && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {EXPLORE_BY_TOPIC.map((t) => (
              (t as { external?: boolean }).external ? (
                <a key={t.href} href={t.href} className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }} target="_blank" rel="noopener noreferrer">
                  <span>{t.icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                </a>
              ) : (
                <Link key={t.href} href={t.href}>
                  <a className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }}>
                    <span>{t.icon}</span>
                    <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                  </a>
                </Link>
              )
            ))}
          </div>
        )}
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Use the navigation bar for full site map</p>
      </section>

        {/* AstroBot highlight + Trending */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/astrobot">
            <a className="home-card block rounded-xl p-4" style={{ borderColor: "var(--accent-gold)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-gold)" }}>🤖 AstroBot — Your AI Space Professor</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Orbital mechanics • Satellites • Missions • AI in space • Future tech</p>
          </a>
        </Link>
          <div className="home-card rounded-xl p-4">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📡 Trending: Space Engineering • AI • Quantum • Futuristic</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/simulator/ai-astronaut-robot"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI Astronaut Robots</a></Link>
            <Link href="/blog/category/space-agi"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
            <Link href="/blog/category/space-engineering"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Robotics</a></Link>
            <Link href="/research/space-agi-lab"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AGI Robotics Lab</a></Link>
            <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
            <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum Computing</a></Link>
            <Link href="/space-news"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Daily News</a></Link>
            <Link href="/research/future-civilization"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Future Tech</a></Link>
          </div>
        </div>
      </section>

        {/* Blog & News section — Latest posts with images */}
        <section className="updates-banner rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--accent-cyan)" }}>New Posts • Daily News • Space Engineering • AI • Quantum</p>
            <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>📰 Latest Articles — Fresh Every Day</h2>
          </div>
          <Link href="/blog">
            <a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>View all →</a>
          </Link>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Space AGI, space engineering formulas, NASA news, quantum physics, AI in space. Everything futuristic and helpful.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LATEST_POSTS.slice(0, 6).map((post, i) => {
            const isNewest = i === 0;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a className="block rounded-xl border-2 overflow-hidden transition hover:shadow-lg hover:scale-[1.02] relative" style={{ background: isNewest ? "rgba(0,217,255,0.06)" : "var(--bg-surface)", borderColor: isNewest ? "var(--accent-cyan)" : "var(--border-color)" }}>
                  {isNewest && <span className="absolute top-2 left-2 z-10 text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>LATEST</span>}
                  <div className="aspect-video w-full bg-slate-200">
                    <img src={getBlogImage(post)} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>{post.category.replace("-", " ")}</span>
                    <h3 className="font-semibold text-sm mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/blog/category/space-agi"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
          <Link href="/blog/category/space-engineering"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Engineering</a></Link>
          <Link href="/blog/category/nasa-news"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>NASA News</a></Link>
          <Link href="/blog/category/quantum-physics"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum</a></Link>
          <Link href="/space-news"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Daily News</a></Link>
        </div>
      </section>

        {/* Popular searches — compact */}
        <section className="home-card rounded-xl p-4 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>🔍 Popular: Space Engineering • AI • Quantum • Futuristic</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/simulator/ai-astronaut-robot"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI Astronaut Robot</a></Link>
          <Link href="/blog/how-space-will-build-ai-based-astronaut-robots-for-future-missions"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space robotics</a></Link>
          <Link href="/blog/what-is-space-agi-why-it-matters"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>What is Space AGI?</a></Link>
          <Link href="/blog/ai-collision-avoidance-how-500-satellites-avoid-each-other-without-human-input-20260227"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI collision avoidance</a></Link>
          <Link href="/blog/vis-viva-equation-explained-master-formula-orbits"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Vis-viva equation</a></Link>
          <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
          <Link href="/calculators"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>How fast does ISS orbit?</a></Link>
          <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum in space</a></Link>
          <Link href="/simulator"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbit simulator</a></Link>
        </div>
      </section>

        {/* Advanced Research — Space Engineering • AI • Quantum */}
        <section className="home-card rounded-xl p-4 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📚 Space Engineering • AI • Quantum • Futuristic</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/simulator/ai-astronaut-robot"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI Astronaut Robots</a></Link>
          <Link href="/blog/category/space-engineering"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Engineering</a></Link>
          <Link href="/blog/category/space-agi"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
          <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
          <Link href="/formulas-library"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbital formulas</a></Link>
          <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum computing</a></Link>
          <Link href="/ai-in-aerospace"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI in space</a></Link>
          <Link href="/research/future-civilization"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Future tech</a></Link>
        </div>
      </section>

        {/* FAQ — compact, 2 questions */}
        <section className="home-card rounded-xl p-4 mb-8">
        <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>❓ FAQ</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>What is Orbital Simulator Hub?</p>
            <p style={{ color: "var(--text-secondary)" }}>Free 3D orbit simulator, astronaut database (500+), planet explorer, NASA missions. For students, researchers, PhD scientists. No signup.</p>
          </div>
          <div>
            <p className="font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>How fast does the ISS orbit?</p>
            <p style={{ color: "var(--text-secondary)" }}>~7.66 km/s (27,600 km/h) at 408 km. Orbital period ~92 minutes. <Link href="/calculators"><a style={{ color: "var(--accent-primary)" }}>Calculator →</a></Link></p>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <Link href="/astrobot"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Ask AstroBot →</a></Link>
          <Link href="/simulator"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Try Simulator →</a></Link>
        </div>
      </section>
      </div>
    </div>
  );
}
