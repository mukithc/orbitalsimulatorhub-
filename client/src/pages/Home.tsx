import { lazy, Suspense, useState } from "react";
import { Link } from "wouter";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";
import { getBlogImage } from "../data/blogImages";

const HomeSpaceScene = lazy(() => import("../components/HomeSpaceScene").then((module) => ({ default: module.HomeSpaceScene })));

const FEATURES = [
  { href: "/simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites. Watch orbits in real time.", color: "cyan" },
  { href: "/simulator/ai-astronaut-robot", icon: "🤖", title: "AI Robot Lab", desc: "Build and train AI space robots. Humanoid, rover, vision AI.", color: "purple" },
  { href: "/astrobot", icon: "🤖", title: "AstroBot", desc: "Your AI Space Professor. Orbital mechanics, satellites, missions.", color: "gold" },
  { href: "/learn/orbital-mechanics", icon: "🧠", title: "Orbital Mechanics", desc: "Master orbits, escape velocity, Hohmann transfer.", color: "cyan" },
  { href: "/ai-in-aerospace", icon: "🚀", title: "AI in Space", desc: "Autonomous spacecraft, Mars rover AI, Space AGI.", color: "pink" },
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab", desc: "5 pillars, humanoid robotics, multi-gravity AGI, live swarm simulator.", color: "cyan" },
  { href: "/marketing-ai-agent", icon: "📣", title: "Marketing AI Agent", desc: "Launch campaigns, content strategy, brand messaging, and growth ideas.", color: "pink" },
];

const QUICK_LINKS = [
  { href: "/astronauts", label: "Astronauts" },
  { href: "/planets", label: "Planets" },
  { href: "/missions", label: "Missions" },
  { href: "/calculators", label: "Calculators" },
  { href: "/satellites", label: "Satellite Data" },
  { href: "/blog", label: "Blog" },
  { href: "/space-news", label: "Space News" },
  { href: "/research", label: "Research" },
  { href: "/simulator/ai-astronaut-robot", label: "AI Robot Simulator" },
  { href: "/research/space-agi-lab", label: "Space-AGI Lab" },
  { href: "/research/space-agi-math", label: "Space-AGI Math" },
  { href: "/research/asi-astronaut-mathematics", label: "ASI Astronaut Math" },
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
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab" },
  { href: "/research/space-agi-math", icon: "🧮", title: "Space-AGI Math" },
  { href: "/research/asi-astronaut-mathematics", icon: "🛰", title: "ASI Astronaut Math" },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum & Space" },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace" },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "Orbital mechanics" },
  { href: "/formulas-library", icon: "🧮", title: "Formulas & calculators" },
  { href: "/calculators", icon: "📐", title: "Orbit calculator" },
  { href: "/research/future-civilization", icon: "🚀", title: "Future Civilization" },
  { href: "/space-news", icon: "📰", title: "Daily Space News" },
];

export function Home() {
  const [showExplore, setShowExplore] = useState(false);
  const updates = getTodaysUpdates();
  const latestPost = LATEST_POSTS[0];
  const latestResearch = LATEST_POSTS.slice(0, 3);

  return (
    <div className="home-page-wrapper -mx-4 px-4 py-2 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        {/* ═══ NEWEST BLOG POST — Prominent at top ═══ */}
        {latestPost && (
          <section className="mb-6 animate-fade-in-up">
            <Link href={`/blog/${latestPost.slug}`}>
              <a className="block rounded-2xl border overflow-hidden transition hover:opacity-95" style={{ background: "rgba(0,217,255,0.08)", borderColor: "rgba(0,217,255,0.35)" }}>
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
        <section className="updates-banner rounded-2xl p-5 md:p-6 mb-8 animate-fade-in-up">
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
                <Link key={`${u.href}-${u.label}`} href={u.href}>
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

        <section className="rounded-2xl p-5 md:p-6 mb-8 border" style={{ background: "rgba(0,217,255,0.08)", borderColor: "rgba(0,217,255,0.22)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🧮</span>
            <h2 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>New: Space-AGI Mathematics</h2>
          </div>
          <p className="text-sm leading-7 max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            Explore Pontryagin Maximum Principle, LQR, MPC, Kalman filtering, and orbital mechanics in one place. The math page now explains how spacecraft control is optimized in real missions.
          </p>
          <div className="grid gap-3 md:grid-cols-2 mt-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(15,23,42,0.35)", border: "1px solid rgba(0,217,255,0.16)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>Pontryagin Maximum Principle</p>
              <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                PMP answers a simple spacecraft question: what engine command should I choose now so the whole mission cost stays as low as possible?
              </p>
              <p className="mt-3 font-mono text-xs leading-6" style={{ color: "var(--text-primary)" }}>
                x˙ = f(x, u, t)<br />
                H = L + λ^T f<br />
                u* = argmin H
              </p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(15,23,42,0.35)", border: "1px solid rgba(0,217,255,0.16)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>Why it matters</p>
              <ul className="space-y-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                <li>• saves fuel on orbit transfers and landings</li>
                <li>• improves docking, descent, and formation flying</li>
                <li>• helps autonomous spacecraft choose optimal actions</li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <Link href="/research/space-agi-math">
              <a className="inline-flex px-4 py-2 rounded-xl font-semibold text-sm" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
                Open full Mathematics →
              </a>
            </Link>
          </div>
        </section>

        <section className="rounded-2xl p-5 md:p-6 mb-8 border" style={{ background: "rgba(168,85,247,0.10)", borderColor: "rgba(168,85,247,0.28)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🛰</span>
            <h2 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>New: ASI Astronaut Mathematics</h2>
          </div>
          <p className="text-sm leading-7 max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            Explore the full 15-level AI math foundation plus Mars-grade autonomous astronaut equations, from PMP and HJB to Bayesian estimation and multi-agent coordination.
          </p>
          <div className="mt-3">
            <Link href="/research/asi-astronaut-mathematics">
              <a className="inline-flex px-4 py-2 rounded-xl font-semibold text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
                Open ASI Astronaut Mathematics →
              </a>
            </Link>
          </div>
        </section>

        <section className="rounded-2xl p-5 md:p-6 mb-8 border" style={{ background: "rgba(15,23,42,0.28)", borderColor: "rgba(0,217,255,0.16)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📰</span>
            <h2 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>Latest Research You Added</h2>
          </div>
          <p className="text-sm mb-4 max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            These newest posts are now surfaced on the home page so visitors can preview the content here and open the full article for details.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {latestResearch.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a className="block rounded-xl p-4 transition hover:opacity-95" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                  <p className="text-sm line-clamp-3 mb-3" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                  <span className="text-sm font-medium" style={{ color: "var(--accent-cyan)" }}>Read full article →</span>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* Hero — Intelligence for the Space Age */}
        <section className="home-space-hero rounded-3xl px-6 py-12 sm:py-16 text-center mb-8 overflow-hidden relative" style={{ boxShadow: "0 18px 56px rgba(0,0,0,0.32)" }}>
          <Suspense fallback={<div className="absolute inset-0 hero-gradient" aria-hidden="true" />}>
            <HomeSpaceScene />
          </Suspense>
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100 mb-3">Space Engineering • AI • Quantum • Daily News • Futuristic</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight">
              OrbitalSimulatorHub — Intelligence for the Space Age
            </h1>
            <p className="text-base sm:text-lg text-slate-100 max-w-xl mx-auto mb-6">
              Space AGI, orbital mechanics, quantum computing in space, aerospace formulas, and interactive mission learning.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <Link href="/simulator">
                <a className="px-5 py-2.5 rounded-xl font-semibold text-sm transition home-hero-primary">
                  🛰 Open Orbital Simulator
                </a>
              </Link>
              <Link href="/astrobot">
                <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border transition home-hero-secondary">
                  🤖 Ask AstroBot
                </a>
              </Link>
              <Link href="/research/space-agi-lab">
                <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border transition home-hero-secondary">
                  🔬 Space-AGI Lab
                </a>
              </Link>
              <Link href="/ai-in-aerospace">
                <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border transition home-hero-secondary">
                  🚀 AI in Space
                </a>
              </Link>
            </div>
            <p className="text-xs text-slate-300">Trusted by students, engineers, and researchers worldwide</p>
            <ShareBar path="/" showRedditSubs />
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent-cyan)" }}>Future-ready research stack</p>
              <h2 className="text-lg md:text-xl font-bold" style={{ color: "var(--text-primary)" }}>ASI, AGI, and autonomous control in one immersive experience</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="orbit-chip">ASI / AGI</span>
              <span className="orbit-chip">PMP + NMPC</span>
              <span className="orbit-chip">Space robotics</span>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Link href="/research/agi-asi-framework">
              <a className="block rounded-xl p-4 border transition hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(0,217,255,0.2)" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent-cyan)" }}>ASI / AGI</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>A conceptual framework for advanced space intelligence</h3>
                <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>Explore how AGI-like reasoning and ASI-style coordination could evolve for space missions, autonomy, and discovery.</p>
              </a>
            </Link>
            <Link href="/research/pmp-nmpc-autonomous-control">
              <a className="block rounded-xl p-4 border transition hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(0,217,255,0.2)" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent-cyan)" }}>Autonomy</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>PMP + NMPC for resilient autonomous spacecraft</h3>
                <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>See how optimal control, estimation, and real-time correction can work together for deep-space missions.</p>
              </a>
            </Link>
            <Link href="/research/space-agi-lab">
              <a className="block rounded-xl p-4 border transition hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(0,217,255,0.2)" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent-cyan)" }}>Research Hub</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>A full research experience for the next era of space systems</h3>
                <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>Jump into the broader platform for orbital mechanics, robotics, AI, and future space intelligence.</p>
              </a>
            </Link>
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
              <Link key={`${l.href}-${l.label}`} href={l.href}>
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
                <a key={`${t.href}-${t.title}`} href={t.href} className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }} target="_blank" rel="noopener noreferrer">
                  <span>{t.icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                </a>
              ) : (
                <Link key={`${t.href}-${t.title}`} href={t.href}>
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
