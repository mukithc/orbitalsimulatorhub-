import { Link } from "wouter";

const architectureLayers = [
  {
    title: "1) PMP-based reference trajectory",
    detail:
      "PMP generates the nominal fuel- or time-optimal profile: thrust arcs, coast phases, switching times, and terminal constraints.",
  },
  {
    title: "2) State and parameter estimation",
    detail:
      "EKF/UKF/MHE continuously updates navigation state and uncertain parameters such as mass, thrust bias, sensor drift, and environment effects.",
    equation: "x̂ₖ|ₖ = x̂ₖ|ₖ₋₁ + Kₖ (yₖ − h(x̂ₖ|ₖ₋₁))",
  },
  {
    title: "3) NMPC trajectory tracking",
    detail:
      "At each guidance cycle, NMPC optimizes around the PMP reference while enforcing thrust, thermal, power, and collision-avoidance constraints.",
  },
  {
    title: "4) Reachability + safety filtering",
    detail:
      "Reachable sets bound uncertainty propagation, while a real-time safety filter (e.g., CBF) minimally modifies commands before actuation.",
    equation: "ḣ(x,u) + α h(x) ≥ 0",
  },
  {
    title: "5) Fault-tolerant replanning",
    detail:
      "When burns are missed, thrusters degrade, or conjunction risk changes, the stack re-estimates, updates constraints, and regenerates a feasible optimal plan.",
  },
];

export function PMPNMPCControlFramework() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Advanced Autonomous Guidance</p>
        <h1 className="headline">Hybrid PMP–NMPC Autonomous Control Framework</h1>
        <p className="subhead max-w-3xl">
          A resilient architecture where PMP supplies global mission efficiency, NMPC supplies local adaptation, and safety layers enforce real-time guarantees under uncertainty.
        </p>
      </header>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Core spacecraft model</h2>
        <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
          <p>ẋ = f(x, u, p) + w</p>
        </div>
        <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>x</strong>: state, <strong style={{ color: "var(--text-primary)" }}>u</strong>: control, <strong style={{ color: "var(--text-primary)" }}>p</strong>: uncertain parameters (mass, thrust efficiency, atmospheric terms), <strong style={{ color: "var(--text-primary)" }}>w</strong>: disturbances.
        </p>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Nominal PMP formulation</h2>
        <div className="space-y-3 rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
          <p>J = Φ(x(t_f)) + ∫[t₀→t_f] L(x,u,t) dt</p>
          <p>H = L(x,u,t) + λᵀ f(x,u,p)</p>
          <p>ẋ = ∂H/∂λ, λ̇ = −∂H/∂x, u* = arg min H</p>
        </div>
        <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          Open-loop PMP is structurally optimal, but real missions require closed-loop autonomy to handle mismatch, delay, and faults.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Layered resilient architecture</h2>
        {architectureLayers.map((layer) => (
          <article
            key={layer.title}
            className="rounded-xl border p-4"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>{layer.title}</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{layer.detail}</p>
            {layer.equation ? (
              <div className="mt-3 rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                {layer.equation}
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Closed-loop mission stack</h2>
        <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
          PMP Mission Optimizer → State Estimator → NMPC Tracker → Safety Filter → Spacecraft
        </div>
        <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          Continuous feedback from navigation sensors and health monitoring closes the loop for resilient autonomous mission execution.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Lab</a>
        </Link>
        <Link href="/research/space-agi-math">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Mathematics</a>
        </Link>
        <Link href="/research">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Research Hub</a>
        </Link>
      </div>
    </div>
  );
}
