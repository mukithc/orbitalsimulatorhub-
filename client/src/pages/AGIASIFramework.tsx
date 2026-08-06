import { Link } from "wouter";

const layers = [
  {
    title: "AGI in space",
    description:
      "Artificial General Intelligence for space means a system that can reason across multiple missions, tools, and environments—handling navigation, planning, anomaly response, and decision-making with broad competence.",
    traits: ["Cross-domain reasoning", "Adaptation to new tasks", "General mission planning", "Learning from experience"],
  },
  {
    title: "ASI in space",
    description:
      "Artificial Superintelligence, in this context, is a future concept for highly coordinated intelligence that can manage fleets, infrastructure, planetary operations, and strategic decisions at a scale beyond any single human or narrow AI system.",
    traits: ["Multi-system coordination", "Strategic foresight", "Mission-network optimization", "Distributed autonomy"],
  },
];

const comparison = [
  { item: "Scope", agi: "General task competence", asi: "System-of-systems strategic control" },
  { item: "Primary role", agi: "Autonomous reasoning for spacecraft and missions", asi: "High-level orchestration of many missions and infrastructures" },
  { item: "Typical focus", agi: "Navigation, diagnosis, planning, adaptation", asi: "Fleet coordination, policy, long-horizon optimization" },
  { item: "Research value", agi: "Near-term and credible", asi: "Future-facing conceptual framework" },
];

const intelligenceStack = [
  {
    title: "Perception and state estimation",
    description: "Fuse sensor streams into calibrated beliefs about vehicle state, terrain, orbital environment, instruments, and system health.",
    methods: "Bayesian filtering, sensor validation, uncertainty estimation, fault detection",
    href: "/research/asi-astronaut-mathematics",
  },
  {
    title: "World models and knowledge",
    description: "Maintain predictive models that connect observations to dynamics, mission context, scientific hypotheses, and evidence provenance.",
    methods: "Digital twins, physics-informed models, knowledge graphs, model calibration",
    href: "/research/space-agi-lab",
  },
  {
    title: "Planning and control",
    description: "Translate mission goals into constrained trajectories, observation schedules, experiment portfolios, and contingency plans.",
    methods: "Optimal control, MPC, scheduling, reachability analysis, constraint solving",
    href: "/research/pmp-nmpc-autonomous-control",
  },
  {
    title: "Scientific reasoning",
    description: "Prioritize measurements that reduce uncertainty, test hypotheses, distinguish correlations from causes, and communicate confidence.",
    methods: "Information gain, causal inference, experiment design, uncertainty-aware reporting",
    href: "/research/asi-astronaut-mathematics",
  },
  {
    title: "Coordination and oversight",
    description: "Coordinate specialists, vehicles, and human operators while preserving authority boundaries, traceability, and safe escalation paths.",
    methods: "Role-based agents, consensus protocols, audit logs, approval gates, runtime monitoring",
    href: "/research/space-agi-roadmap",
  },
];

const researchPrograms = [
  ["Autonomous scientific explorer", "A conceptual closed loop from sensing to hypothesis selection, experiment planning, evidence evaluation, and model revision."],
  ["Mission digital twin", "A continuously validated simulation for evaluating trajectories, power budgets, thermal margins, equipment wear, and contingencies before execution."],
  ["Safety-bounded learning", "Learning and adaptation only within tested envelopes, with uncertainty thresholds, verification checks, rollback, and human escalation."],
  ["Collective space intelligence", "Distributed coordination among orbiters, landers, rovers, instruments, ground teams, and mission operations without assuming unrestricted autonomy."],
] as const;

const validationGates = [
  "Define operational requirements, authority boundaries, and non-negotiable safety constraints.",
  "Test against representative simulations, uncertainty shifts, sensor faults, and communications delays.",
  "Measure calibration, constraint violations, resource use, failure modes, and explanation quality—not only task scores.",
  "Use independent review, traceable evidence, runtime monitoring, and safe fallback modes before operational decisions.",
] as const;

export function AGIASIFramework() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Future AI Concepts</p>
        <h1 className="headline">AGI and ASI in Space</h1>
        <p className="subhead max-w-3xl">
          A separate module to explain how Artificial General Intelligence and Artificial Superintelligence could shape future autonomous space systems.
        </p>
      </header>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Why this module matters</h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          AGI and ASI are useful concepts when presented as future research directions rather than as claims that current systems already possess them. In space, these ideas help frame the progression from task-specific autonomy to broader mission intelligence.
        </p>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "rgba(0,217,255,0.07)", borderColor: "rgba(0,217,255,0.45)" }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Research boundary</p>
        <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
          This page presents conceptual research directions. Neither AGI nor ASI is established as a deployed capability for autonomous
          space missions. Any future operational system would require mission-specific requirements, verification, security review,
          calibrated uncertainty, human authority, and extensive simulation and hardware testing.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {layers.map((layer) => (
          <section key={layer.title} className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{layer.title}</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{layer.description}</p>
            <ul className="space-y-2 text-sm list-disc pl-5" style={{ color: "var(--text-secondary)" }}>
              {layer.traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>AGI vs ASI at a glance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-primary)" }}>Dimension</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-primary)" }}>AGI</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-primary)" }}>ASI</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.item} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td className="px-3 py-2 font-medium" style={{ color: "var(--accent-cyan)" }}>{row.item}</td>
                  <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{row.agi}</td>
                  <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{row.asi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Conceptual capability stack</p>
        <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>From autonomous operations to scientific mission intelligence</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {intelligenceStack.map((layer, index) => (
            <Link key={layer.title} href={layer.href}>
              <a
                className="block rounded-lg border p-4 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
                style={{ borderColor: "var(--border-color)", background: "rgba(255,255,255,0.025)" }}
              >
                <p className="text-xs font-bold" style={{ color: "var(--accent-gold)" }}>LAYER {index + 1}</p>
                <h3 className="font-bold mt-1" style={{ color: "var(--text-primary)" }}>{layer.title}</h3>
                <p className="text-sm leading-6 mt-2" style={{ color: "var(--text-secondary)" }}>{layer.description}</p>
                <p className="text-xs leading-5 mt-3" style={{ color: "var(--accent-cyan)" }}>{layer.methods}</p>
                <span className="inline-block text-xs font-semibold mt-4" style={{ color: "var(--text-primary)" }}>Explore this layer →</span>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--accent-gold)" }}>Conceptual research programs</p>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>ASI-oriented frameworks for study</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {researchPrograms.map(([title, description]) => (
            <article key={title} className="rounded-lg border p-4" style={{ borderColor: "var(--border-color)" }}>
              <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
              <p className="text-sm leading-6 mt-2" style={{ color: "var(--text-secondary)" }}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Validation and governance gates</h2>
        <ol className="space-y-3 list-decimal pl-5 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {validationGates.map((gate) => <li key={gate}>{gate}</li>)}
        </ol>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>How this fits the project</h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          This page can support your Space-AGI narrative by separating future-facing ideas into a clear conceptual framework: AGI for general autonomous space reasoning, and ASI as a long-term vision for coordinated intelligence across planetary and interplanetary systems.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Lab</a>
        </Link>
        <Link href="/research/pmp-nmpc-autonomous-control">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>PMP–NMPC Control</a>
        </Link>
        <Link href="/research/asi-astronaut-mathematics">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-gold)", color: "var(--text-primary)" }}>ASI Mathematics</a>
        </Link>
      </div>
    </div>
  );
}
