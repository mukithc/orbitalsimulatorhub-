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
      </div>
    </div>
  );
}
