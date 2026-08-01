import { Link } from "wouter";
import { useState, useEffect } from "react";
import { getLatestResearchContent, type ResearchContent } from "../data/researchContent";

const CATEGORIES = [
  {
    title: "Space missions & reference",
    desc: "Missions, astronauts, ISS, rovers, Moon, solar system. Real mission data and calculations for researchers.",
    links: [
      { href: "/learn/aerospace#nasa", label: "Space agency reference", summary: "Apollo, ISS, Mars rovers, James Webb, GPS, GEO — structured facts." },
      { href: "/learn/aerospace#rovers", label: "Rovers & real mission data", summary: "ISS, Curiosity, Perseverance, Apollo: real numbers, masses, orbits, EDL." },
      { href: "/play#nasa", label: "Learn Space (Play & Learn)", summary: "Solar system, missions, astronauts, rovers, Moon, stars." },
    ],
  },
  {
    title: "Newton's laws & physics",
    desc: "The three laws of motion and the law of gravity — the same physics used by space agencies for rockets and orbits.",
    links: [
      { href: "/learn/newton", label: "Newton's laws", summary: "1st (inertia), 2nd (F=ma), 3rd (action-reaction) with orbital examples." },
      { href: "/learn/formulas", label: "Formulas playground", summary: "F=ma, gravity F=GMm/r², orbital speed v=√(μ/r), calculators and quiz." },
      { href: "/learn/aerospace#newton", label: "Newton in aerospace", summary: "Full law statements and how space agencies use them in spaceflight." },
    ],
  },
  {
    title: "Orbital mechanics & aerospace",
    desc: "Why satellites orbit, LEO/MEO/GEO, Kepler's laws, algorithms, height, period, speed, perigee, apogee.",
    links: [
      { href: "/learn/orbital-mechanics", label: "What is orbital mechanics?", summary: "Kids, beginner, and engineer versions. How satellites orbit Earth." },
      { href: "/learn/space-questions", label: "Why don't satellites fall? & more", summary: "Why moon doesn't crash, why astronauts float, what if satellite stops." },
      { href: "/satellites", label: "Real satellite orbits", summary: "ISS, Starlink, GPS, weather satellites — altitude, speed, orbit time." },
      { href: "/simulator", label: "3D Simulator", summary: "Add LEO/MEO/GEO, see height, period, speed, perigee, apogee; compare orbits." },
      { href: "/learn/aerospace#algorithms", label: "Algorithms used on this site", summary: "Two-body, Keplerian↔Cartesian, propagation; same types as space agency mission design." },
      { href: "/learn/aerospace#calculations", label: "Real-life calculations", summary: "Worked examples: ISS period & speed, GPS, GEO altitude, rover weight on Mars." },
      { href: "/guide", label: "Simulator guide", summary: "What an orbit is, what the numbers mean, how to use the simulator." },
      { href: "/learn/aerospace#orbits", label: "Orbital mechanics reference", summary: "LEO, MEO, GEO definitions; Kepler; key equations." },
    ],
  },
  {
    title: "Formulas & math",
    desc: "Gravity, force, orbital period, orbital speed, escape velocity, Kepler, rocket equation — with explanations and calculators.",
    links: [
      { href: "/formulas-library", label: "Space formula library", summary: "All formulas: Newton gravity, orbital v, escape v, period, Kepler, rocket equation + calculators." },
      { href: "/calculators", label: "Orbit & gravity calculators", summary: "Satellite orbit calculator, gravity calculator, escape velocity calculator." },
      { href: "/learn/aerospace#formulas", label: "Key formulas (reference)", summary: "F=ma, F=GMm/r², T=2π√(a³/μ), v=√(μ/r) with constants." },
      { href: "/learn/formulas", label: "Formulas playground & quiz", summary: "Big formulas, F=ma calculator, quick reference, quiz, fun facts." },
      { href: "/play#math", label: "Space math", summary: "Orbital and gravity problems with step-by-step explanations." },
    ],
  },
  {
    title: "Future & authority",
    desc: "Future of space civilization, next 100 years, neuro-space, Space-AGI Lab, interstellar.",
    links: [
      { href: "/simulator/ai-astronaut-robot", label: "🤖 AI Astronaut Robot Lab", summary: "Build and train AI space robots. Humanoid, rover, vision AI. ISS, Moon, Mars environments." },
      { href: "/research/space-agi-lab", label: "🧠 Space-AGI Engineering Lab", summary: "5 pillars: autonomous spacecraft, decision intelligence, orbital math, future systems, live simulation lab." },
      { href: "/research/space-agi-roadmap", label: "Space-AGI Roadmap 2025–2060+", summary: "AI satellites to interstellar probes. Real engineering future." },
      { href: "/research/space-agi-explanation", label: "Space-AGI Explanation", summary: "Plain-language guides. Math Explained tab — ISS, Starlink, Mars rover examples for teens & college." },
      { href: "/research/space-agi-math", label: "Space-AGI Mathematics (Full)", summary: "Optimal control, Pontryagin, MPC, LQR. Knowledge-energy optimization. Graduate-level credible." },
      { href: "/research/agi-asi-framework", label: "AGI/ASI Framework", summary: "Separate conceptual module for AGI and ASI in future space systems." },
      { href: "/research/pmp-nmpc-autonomous-control", label: "PMP–NMPC Autonomous Control Framework", summary: "Hybrid architecture: PMP references, state estimation, NMPC tracking, reachability, and CBF safety." },
      { href: "/research/space-agi-doctrine", label: "Space-AGI Doctrine (Latest)", summary: "Orbital mechanics + autonomous decision models. Delayed MDP, Bayesian belief, energy-aware planning." },
      { href: "/research/future-civilization", label: "Future of Space Civilization", summary: "From Earth orbit to interstellar — humanity's next chapter." },
      { href: "/research/next-100-years", label: "Next 100 Years of Humanity", summary: "Strategic roadmap 2025–2125 for space exploration." },
      { href: "/research/neuro-space", label: "Neuro-Space & Light-Speed", summary: "Autonomous spacecraft, relativistic limits, future doctrine." },
      { href: "/ai-in-aerospace", label: "AI in Aerospace", summary: "Autonomous spacecraft, Mars AI, mission planning." },
    ],
  },
  {
    title: "Ask & explore",
    desc: "Get answers and explore further.",
    links: [
      { href: "/astrobot", label: "Ask AstroBot", summary: "Ask questions about orbits, ISS, satellites; get explained answers." },
      { href: "/play", label: "Play & Learn", summary: "Simulator, math, science, physics, chemistry in one page." },
    ],
  },
];

export function ResearchHub() {
  const [researchContent, setResearchContent] = useState<ResearchContent[]>([]);

  useEffect(() => {
    // Load latest research content
    const latest = getLatestResearchContent(10);
    setResearchContent(latest);
  }, []);

  return (
    <div className="research-page max-w-4xl mx-auto space-y-10">
      <div className="text-center mb-8">
        <h1 className="headline">Research & topics</h1>
        <p className="subhead max-w-2xl mx-auto">
          Find everything on this site: space missions, Newton&apos;s laws, orbital mechanics, algorithms, rovers, and real calculations. For students, scientists, PhD researchers, and aerospace study.
        </p>
        <p className="text-sm text-slate-600 mt-2">
          Researching <strong>space missions</strong> or <strong>Newton&apos;s laws</strong>? Doing <strong>PhD or graduate-level</strong> work? Need <strong>algorithms</strong>, <strong>real mission data</strong>, or <strong>curated references</strong>? Use the links below.
        </p>
      </div>

      {/* Latest Research Content Section */}
      {researchContent.length > 0 && (
        <section className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            📚 Latest Research Content
            <span className="text-sm font-normal text-slate-600">(Updated Daily)</span>
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Fresh research content for PhD students and researchers. Updated every 24 hours with new papers, discoveries, methodologies, and data sources.
          </p>
          <div className="space-y-4">
            {researchContent.slice(0, 5).map((content) => (
              <div
                key={content.id}
                className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{content.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {content.type.replace("-", " ")}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                        {content.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {content.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{content.summary}</p>
                    {content.references && content.references.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-2">References:</p>
                        <div className="flex flex-wrap gap-2">
                          {content.references.slice(0, 3).map((ref, idx) => (
                            <a
                              key={idx}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {ref.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4">
            💡 <strong>Tip:</strong> All research content includes references, formulas, data points, and related topics to help with your research papers.
          </p>
        </section>
      )}

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-gradient-to-br from-slate-50 to-cyan-50 p-6 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">🌌 Featured Research: Neuro-Space Framework</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>Light-Speed Constraints, Neuro-Space Cognition, and Aerospace Dynamics</strong> — A unified framework for future space navigation and intelligence systems. Covers relativistic aerospace, autonomous AI, warp metrics, quantum navigation, and the proposed Neuro-Space Research Institute.
        </p>
        <Link href="/research/neuro-space">
          <a className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            Read Neuro-Space Research →
          </a>
        </Link>
      </section>

      <section className="rounded-xl bg-white border-2 border-slate-200 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">🛰 Learning hub &amp; tools</h2>
        <p className="text-sm text-slate-600 mb-3">Orbital mechanics lessons, real satellite data, space formulas, and calculators.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/orbital-mechanics"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">What is orbital mechanics?</a></Link>
          <Link href="/learn/space-questions"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Why don&apos;t satellites fall?</a></Link>
          <Link href="/learn/experiments"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Space Experiments</a></Link>
          <Link href="/formulas-library"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Formula library</a></Link>
          <Link href="/satellites"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Real satellite orbits</a></Link>
          <Link href="/calculators"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Calculators</a></Link>
          <Link href="/compare/orbits"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Compare Orbits</a></Link>
          <Link href="/quiz/orbital-mechanics"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Quiz</a></Link>
        </div>
      </section>

      <section className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 How It Works Pages</h2>
        <p className="text-sm text-slate-700 mb-4">
          Detailed explanations of how space technology works. Perfect for understanding real-world applications of orbital mechanics!
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/learn/how-gps-works">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">📍 How GPS Works</span>
              <p className="text-xs text-slate-600 mt-1">Trilateration, atomic clocks, GPS constellation</p>
            </a>
          </Link>
          <Link href="/learn/how-nasa-launches-satellite">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">🚀 How Satellites Launch</span>
              <p className="text-xs text-slate-600 mt-1">Rocket stages, launch sequence, orbital insertion</p>
            </a>
          </Link>
          <Link href="/learn/how-spacex-lands-rockets">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">🛬 How SpaceX Lands</span>
              <p className="text-xs text-slate-600 mt-1">Reusable rockets, grid fins, landing sequence</p>
            </a>
          </Link>
          <Link href="/learn/how-mars-rovers-work">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">🤖 How Mars Rovers Work</span>
              <p className="text-xs text-slate-600 mt-1">Landing, navigation, science instruments</p>
            </a>
          </Link>
          <Link href="/learn/how-starlink-works">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">🌐 How Starlink Works</span>
              <p className="text-xs text-slate-600 mt-1">Satellite constellation, LEO internet, global coverage</p>
            </a>
          </Link>
          <Link href="/learn/how-iss-works">
            <a className="block p-3 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow transition">
              <span className="font-medium text-slate-800">🏠 How ISS Works</span>
              <p className="text-xs text-slate-600 mt-1">Orbit, life support, power, science on ISS</p>
            </a>
          </Link>
        </div>
      </section>

      <section className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">📅 Mission Timeline</h2>
        <p className="text-sm text-slate-700 mb-4">
          Explore the history of space exploration from Sputnik to James Webb. See key missions, achievements, and milestones.
        </p>
        <Link href="/missions/timeline">
          <a className="inline-block px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            View Mission Timeline →
          </a>
        </Link>
      </section>

      <section className="rounded-xl bg-[var(--accent-cyan)]/10 border-2 border-[var(--accent-cyan)]/40 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">📚 Full reference (all sections)</h2>
        <p className="text-sm text-slate-700 mb-3">
          The same page also covers Newton&apos;s laws, orbital mechanics (LEO/MEO/GEO, Kepler), and further reading with Vallado and standard references.
        </p>
        <Link href="/learn/aerospace">
          <a className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            Open Aerospace reference →
          </a>
        </Link>
      </section>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-1">{cat.title}</h2>
            <p className="text-sm text-slate-600 mb-4">{cat.desc}</p>
            <ul className="space-y-3">
              {cat.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="block p-3 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/5 transition">
                      <span className="font-medium text-slate-900">{link.label}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{link.summary}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-center text-slate-500 text-sm">
        New here? Start with the <Link href="/guide" className="text-[var(--accent-cyan)] hover:underline">Guide</Link> or the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Simulator</Link>.
      </p>
    </div>
  );
}
