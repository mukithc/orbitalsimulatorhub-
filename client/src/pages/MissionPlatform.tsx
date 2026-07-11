import { useMemo, useState } from "react";
import { Link } from "wouter";

const PHASES = [
  {
    id: "phase5",
    title: "Phase 5: Interstellar Mission Platform",
    summary:
      "Design an AI-first mission planning hub that unifies trajectory optimization, autonomous decision support, and long-range mission phase sequencing for the next century of space exploration.",
    bullets: [
      "Autonomous mission planning for interstellar probes and deep-space science platforms.",
      "Trajectory and delta-v optimization with mission constraints and time-delay models.",
      "Integrated mission state for crewed, robotic, and AI-led mission scenarios.",
    ],
  },
  {
    id: "phase6",
    title: "Phase 6: Autonomous Exploration Network",
    summary:
      "Extend the platform into a resilient exploration network: distributed autonomous agents, solar system logistics, self-healing operations, and mission intelligence that adapts over decades.",
    bullets: [
      "Distributed planning across mission nodes, habitats, rovers, probes, and orbital infrastructure.",
      "Resilient operations under delay, degraded comms, and evolving science priorities.",
      "AI-enabled mission health monitoring, refueling, and in-situ production planning.",
    ],
  },
];

const PLATFORM_FEATURES = [
  {
    title: "Mission Planning Dashboard",
    description:
      "Capture mission objectives, constraints, and success criteria in a single workspace. Build plans that connect orbital maneuvers, landing operations, and science sequencing.",
  },
  {
    title: "Trajectory & Resource Optimization",
    description:
      "Model burn profiles, launch windows, fuel budgets, and communication latencies. Optimize for safety, efficiency, and science value.",
  },
  {
    title: "Integrated Simulation Links",
    description:
      "Switch from mission design to live simulation: orbit simulator, swarm safety, and quantum AGI planning all connected from the same platform.",
  },
  {
    title: "Future Mission Phases",
    description:
      "Use the platform to bridge today’s Apollo/Shuttle mission context with Mars, solar system, and interstellar mission families.",
  },
];

export function MissionPlatform() {
  const [selectedPhase, setSelectedPhase] = useState(PHASES[0].id);
  const currentPhase = useMemo(
    () => PHASES.find((phase) => phase.id === selectedPhase) ?? PHASES[0],
    [selectedPhase]
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <p className="text-sm text-[var(--accent-cyan)] font-medium uppercase tracking-wider mb-2">
          Mission Platform
        </p>
        <h1 className="headline">Phase 5/6 Mission Planning Platform</h1>
        <p className="subhead max-w-3xl">
          A mission design workspace for advanced space exploration: from interstellar probes and autonomous deep-space logistics to adaptive AI mission control and planning.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Select a Phase
          </h2>
          <div className="space-y-3">
            {PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhase(phase.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedPhase === phase.id ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10" : "border-[var(--border-color)] bg-[var(--bg-surface)]"
                }`}
                style={{ color: "var(--text-primary)" }}
              >
                <div className="font-semibold mb-1">{phase.title}</div>
                <div className="text-sm text-[var(--text-secondary)]">{phase.summary}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 shadow-sm">
          <div className="sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                {currentPhase.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                {currentPhase.summary}
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--accent-primary)]/10 px-4 py-3 text-sm font-semibold text-[var(--accent-primary)]">
              Future-ready mission architecture
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {currentPhase.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                <p className="text-sm text-[var(--text-primary)]">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 p-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Why this platform matters
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Building a Phase 5/6 mission platform means connecting mission planning, simulation, and autonomous operations into one coherent user flow. This page is the first step toward a full mission control and planning hub for Orbital Simulator Hub.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {PLATFORM_FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              {feature.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Mission Platform Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/missions/timeline">
            <a className="rounded-2xl border border-[var(--border-color)] bg-white p-5 text-sm font-medium transition hover:border-[var(--accent-primary)]">
              View Mission Timeline
            </a>
          </Link>
          <Link href="/simulator">
            <a className="rounded-2xl border border-[var(--border-color)] bg-white p-5 text-sm font-medium transition hover:border-[var(--accent-primary)]">
              Open Orbit Simulator
            </a>
          </Link>
          <Link href="/quantum-space-agi">
            <a className="rounded-2xl border border-[var(--border-color)] bg-white p-5 text-sm font-medium transition hover:border-[var(--accent-primary)]">
              Explore Quantum Space AGI
            </a>
          </Link>
          <Link href="/ai-in-aerospace">
            <a className="rounded-2xl border border-[var(--border-color)] bg-white p-5 text-sm font-medium transition hover:border-[var(--accent-primary)]">
              Read AI Mission Planning</a>
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Mission Planning State
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 border border-[var(--border-color)]">
            <p className="text-xs uppercase font-semibold tracking-wide text-[var(--text-muted)]">Mission type</p>
            <p className="mt-2 font-semibold text-[var(--text-primary)]">Interstellar probe</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-[var(--border-color)]">
            <p className="text-xs uppercase font-semibold tracking-wide text-[var(--text-muted)]">Planning focus</p>
            <p className="mt-2 font-semibold text-[var(--text-primary)]">Autonomy & resilience</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-[var(--border-color)]">
            <p className="text-xs uppercase font-semibold tracking-wide text-[var(--text-muted)]">Core objective</p>
            <p className="mt-2 font-semibold text-[var(--text-primary)]">Safe mission execution</p>
          </div>
        </div>
      </section>
    </div>
  );
}
