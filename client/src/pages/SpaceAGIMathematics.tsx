import { Link } from "wouter";

type FormulaCard = {
  id: string;
  title: string;
  summary: string;
  equations: string[];
  bullets?: string[];
};

const FOUNDATIONS: FormulaCard[] = [
  {
    id: "pmp",
    title: "1. Pontryagin Maximum Principle (PMP)",
    summary: "The foundation of optimal spacecraft trajectory optimization, fuel-optimal landing, Mars missions, Apollo guidance, and autonomous spacecraft.",
    equations: [
      "State dynamics: ẋ = f(x, u, t)",
      "Cost functional: J = ϕ(x(t_f)) + ∫[t₀→t_f] L(x, u, t) dt",
      "Hamiltonian: H(x, λ, u, t) = L(x, u, t) + λᵀf(x, u, t)",
      "Costate equation: λ̇ = −∂H/∂x",
      "Optimal control: u* = arg min_u H(x, λ, u)",
      "Boundary condition: λ(t_f) = ∂ϕ/∂x",
    ],
    bullets: [
      "x = state vector, u = control input, λ = costate (adjoint) variables",
      "Goal: minimize fuel, time, energy, or control effort",
    ],
  },
  {
    id: "euler-lagrange",
    title: "2. Euler-Lagrange Equation",
    summary: "The basis of optimal control, mechanics, robotics, and physics.",
    equations: ["d/dt(∂L/∂q̇) − ∂L/∂q = 0"],
  },
  {
    id: "hamilton",
    title: "3. Hamilton's Equations",
    summary: "Canonical equations for energy-based dynamics and control derivations.",
    equations: ["q̇ = ∂H/∂p", "ṗ = −∂H/∂q"],
  },
  {
    id: "state-space",
    title: "4. State Space Model",
    summary: "Used everywhere in aerospace guidance, navigation, and control.",
    equations: ["ẋ = Ax + Bu", "y = Cx + Du"],
  },
  {
    id: "lqr",
    title: "5. Linear Quadratic Regulator (LQR)",
    summary: "Optimal feedback for linearized spacecraft and satellite control.",
    equations: ["J = ∫[0→∞] (xᵀQx + uᵀRu) dt", "u = −Kx"],
  },
  {
    id: "riccati",
    title: "6. Riccati Equation",
    summary: "One of the most important equations in optimal control.",
    equations: ["AᵀP + PA − PBR⁻¹BᵀP + Q = 0"],
  },
  {
    id: "mpc",
    title: "7. Model Predictive Control (MPC)",
    summary: "Optimization-based control for constrained, autonomous spacecraft maneuvers.",
    equations: [
      "min Σ[k=0→N] (x_kᵀQx_k + u_kᵀRu_k)",
      "subject to x_(k+1) = Ax_k + Bu_k",
    ],
  },
  {
    id: "kalman",
    title: "8. Kalman Filter",
    summary: "Core state estimation pipeline for guidance, navigation, and control.",
    equations: [
      "Prediction: x_(k|k−1) = Ax_(k−1) + Bu",
      "Covariance: P = APAᵀ + Q",
      "Gain: K = PHᵀ(HPHᵀ + R)⁻¹",
      "Update: x = x + K(z − Hx)",
    ],
  },
];

const ORBITAL_AND_ATTITUDE: FormulaCard[] = [
  {
    id: "two-body",
    title: "9. Orbital Dynamics (Two-Body Problem)",
    summary: "The fundamental equation governing satellite and planetary motion.",
    equations: ["r¨ = −(μ/r³)r", "μ = GM"],
  },
  {
    id: "vis-viva",
    title: "10. Vis-Viva Equation",
    summary: "Determines spacecraft velocity at any point in an orbit.",
    equations: ["v = √(μ(2/r − 1/a))"],
  },
  {
    id: "rocket",
    title: "11. Tsiolkovsky Rocket Equation",
    summary: "The cornerstone of rocket propulsion and mission planning.",
    equations: ["Δv = v_e ln(m₀/m_f)"],
  },
  {
    id: "cw",
    title: "12. Clohessy-Wiltshire (Hill's) Equations",
    summary: "Used for satellite rendezvous and formation flying.",
    equations: [
      "x¨ − 2nẏ − 3n²x = u_x",
      "y¨ + 2nẋ = u_y",
      "z¨ + n²z = u_z",
    ],
  },
  {
    id: "quaternion",
    title: "13. Quaternion Attitude Dynamics",
    summary: "Used for spacecraft orientation and attitude control.",
    equations: ["q̇ = 1/2 Ω(ω)q"],
  },
  {
    id: "ekf",
    title: "14. Extended Kalman Filter (EKF)",
    summary: "Nonlinear state estimation for spacecraft with nonlinear dynamics or measurements.",
    equations: ["Prediction: x_(k+1) = f(x_k, u_k)", "Measurement: z = h(x) + v", "Linearization: F = ∂f/∂x"],
  },
];

const DECISION_AND_STABILITY: FormulaCard[] = [
  {
    id: "bellman",
    title: "15. Bellman Equation (Dynamic Programming)",
    summary: "The foundation of reinforcement learning and optimal decision-making.",
    equations: ["V(x) = min_u [L(x, u) + V(f(x, u))]"],
  },
  {
    id: "hjb",
    title: "16. Hamilton-Jacobi-Bellman (HJB) Equation",
    summary: "The continuous-time optimal control equation, generalizing Bellman's principle.",
    equations: ["−∂V/∂t = min_u [L + ∇Vᵀf]"],
  },
  {
    id: "lyapunov",
    title: "17. Lyapunov Stability",
    summary: "A key criterion for proving stability of control systems.",
    equations: ["V(x) > 0", "V̇(x) < 0"],
  },
  {
    id: "eigenvalue",
    title: "18. Eigenvalue Problem",
    summary: "Used extensively in vibration analysis, control system stability, orbital dynamics, and structural mechanics.",
    equations: ["Av = λv", "Example eigendirections: λ₁ = 3, λ₂ = 1"],
  },
];

function FormulaGrid({ cards }: { cards: FormulaCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.id} className="rounded-xl border p-5" style={{ background: "var(--bg-surface)", borderColor: "rgba(255,255,255,0.1)" }}>
          <h3 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>{card.title}</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{card.summary}</p>
          <div className="rounded-lg p-4 font-mono text-sm space-y-2" style={{ background: "rgba(15,23,42,0.62)", color: "var(--text-primary)" }}>
            {card.equations.map((equation) => (
              <p key={equation}>{equation}</p>
            ))}
          </div>
          {card.bullets && (
            <ul className="mt-3 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {card.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export function SpaceAGIMathematics() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Graduate-Level Credible</p>
        <h1 className="headline">Space-AGI Mathematics</h1>
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          New to this? <Link href="/research/space-agi-explanation"><a className="text-[var(--accent-gold)] hover:underline">Read the easy version</a></Link> — same concepts, plain English, examples.
        </p>
        <p className="subhead max-w-2xl">
          The first open platform teaching Orbital Mechanics + Advanced Control Theory + Space-AGI Engineering. Elite aerospace control math.
        </p>
      </div>

      {/* PART 1 — Optimal Control Theory */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🚀 Part 1 — Optimal Control Theory</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          These are the core equations behind guidance, navigation, control, fuel-optimal transfers, autonomous landing, and future self-directed spacecraft.
        </p>
        <FormulaGrid cards={FOUNDATIONS} />
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🛰 Part 2 — Orbital Dynamics, Estimation, and Attitude</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          The equations below connect control theory to the actual flight physics of satellites, rendezvous, propulsion, and spacecraft attitude.
        </p>
        <FormulaGrid cards={ORBITAL_AND_ATTITUDE} />
      </section>

      {/* PART 3 — Space-AGI Mathematical Framework */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🧠 Part 3 — Space-AGI Mathematical Framework</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          This is where you differentiate from NASA. No one explains this publicly.
        </p>

        {/* 1️⃣ Knowledge–Energy Optimization */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>1️⃣ Knowledge–Energy Optimization Law</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Define mission intelligence:</p>
            <p className="mb-2">D = (dK/dt) / P<sub>use</sub></p>
            <p className="font-bold mb-1">Maximize:</p>
            <p>max ∫<sub>0</sub><sup>T</sup> (dK/dt) / P<sub>use</sub> dt</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Interpretation: Future spacecraft maximize knowledge per energy unit.
          </p>
        </div>

        {/* 2️⃣ Autonomous Intelligence Growth */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>2️⃣ Autonomous Intelligence Growth Model</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p>dI/dt = αI + βK + γE</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
              Where: I = onboard intelligence, K = knowledge, E = energy access. Shows recursive improvement.
            </p>
          </div>
        </div>

        {/* 3️⃣ Reaction–Diffusion */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>3️⃣ Reaction–Diffusion Interplanetary AI Network</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p>∂I/∂t = D∇²I + αI</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Models: Intelligence spreading across lunar + Mars nodes. This is very futuristic but mathematically clean.
          </p>
        </div>

        {/* 4️⃣ Safety-Constrained */}
        <div>
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>4️⃣ Safety-Constrained Cosmic Optimization</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Define safety functional:</p>
            <p>J<sub>safe</sub> = ∫<sub>0</sub><sup>T</sup> (U(x, u) − κ/Φ(x, u)) dt</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>Barrier prevents unsafe state. Brings alignment math into space engineering.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(56,217,255,0.24)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>📘 Part 4 — Decision, Stability, and System Modes</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          These equations govern optimal decision-making, proof of stability, and the modal structure of aerospace systems.
        </p>
        <FormulaGrid cards={DECISION_AND_STABILITY} />
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-explanation">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Easy Version →</a>
        </Link>
        <Link href="/calculators">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Interactive Calculators</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
