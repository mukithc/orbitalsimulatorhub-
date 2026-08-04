import { Link } from "wouter";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathLevel = {
  level: string;
  title: string;
  why: string;
  formulas: string[];
};

const FOUNDATION_LEVELS: MathLevel[] = [
  {
    level: "Level 1",
    title: "Linear Algebra",
    why: "The language of vectors, matrices, and tensor computation in AI systems.",
    formulas: [String.raw`Ax=b`, String.raw`y=Wx+b`, String.raw`A=U\Sigma V^T`],
  },
  {
    level: "Level 2",
    title: "Calculus",
    why: "Optimization and learning rely on gradients and local curvature.",
    formulas: [String.raw`\nabla f(x)`, String.raw`x_{k+1}=x_k-\eta\nabla f(x_k)`, String.raw`H=\nabla^2 f(x)`],
  },
  {
    level: "Level 3",
    title: "Probability",
    why: "Space autonomy must reason under uncertainty and noise.",
    formulas: [String.raw`P(A|B)=\frac{P(B|A)P(A)}{P(B)}`, String.raw`\mathbb{E}[X]=\sum_x xP(x)`, String.raw`X\sim\mathcal{N}(\mu,\sigma^2)`],
  },
  {
    level: "Level 4",
    title: "Information Theory",
    why: "Compression, uncertainty, and representation quality govern intelligent systems.",
    formulas: [String.raw`H(X)=-\sum_x P(x)\log P(x)`, String.raw`D_{KL}(P\|Q)`, String.raw`I(X;Y)`],
  },
  {
    level: "Level 5",
    title: "Optimization",
    why: "Training and control both reduce objective functions with constraints.",
    formulas: [String.raw`\min_\theta J(\theta)`, String.raw`L(x,\lambda)=f(x)+\lambda g(x)`],
  },
  {
    level: "Level 6",
    title: "Optimal Control",
    why: "Physical autonomy demands optimal action through dynamic systems.",
    formulas: [String.raw`\dot{x}=f(x,u,t)`, String.raw`H=L+\lambda^T f`, String.raw`u^*=\arg\min H`],
  },
  {
    level: "Level 7",
    title: "Reinforcement Learning",
    why: "Agents improve policy quality by interacting with uncertain environments.",
    formulas: [String.raw`V(s)=\max_a\left[R+\gamma V(s')\right]`, String.raw`\nabla_\theta J(\theta)`],
  },
  {
    level: "Level 8",
    title: "Transformers",
    why: "Mission reasoning over logs, procedures, and science streams uses attention.",
    formulas: [String.raw`\mathrm{Attention}(Q,K,V)=\mathrm{Softmax}\left(\frac{QK^T}{\sqrt d}\right)V`],
  },
  {
    level: "Level 9",
    title: "Graph Mathematics",
    why: "Knowledge graphs and system dependencies are naturally graph-structured.",
    formulas: [String.raw`G=(V,E)`, String.raw`H^{(l+1)}=\sigma(AH^{(l)}W)`],
  },
  {
    level: "Level 10",
    title: "Differential Geometry",
    why: "High-dimensional planning and manifold learning need geometric structure.",
    formulas: [String.raw`g_{ij}`, String.raw`R_{ijkl}`],
  },
  {
    level: "Level 11",
    title: "Dynamical Systems",
    why: "Stability and long-horizon behavior matter in autonomous flight.",
    formulas: [String.raw`\dot{x}=Ax`, String.raw`\dot{V}(x)<0`],
  },
  {
    level: "Level 12",
    title: "Game Theory",
    why: "Multiple agents must coordinate, negotiate, and optimize strategic behavior.",
    formulas: [String.raw`u_i(s^*)\ge u_i(s_i,s^*_{-i})`],
  },
  {
    level: "Level 13",
    title: "Information Geometry",
    why: "Learning on probability manifolds enables efficient policy updates.",
    formulas: [String.raw`F(\theta)=\mathbb{E}\left[\nabla\log p(x)\nabla\log p(x)^T\right]`, String.raw`F^{-1}\nabla J`],
  },
  {
    level: "Level 14",
    title: "Category Theory",
    why: "Composable abstractions can organize complex AI-control pipelines.",
    formulas: [String.raw`F:C\to D`, String.raw`\eta:F\Rightarrow G`],
  },
  {
    level: "Level 15",
    title: "Multi-Agent ASI",
    why: "Distributed specialist agents can coordinate mission intelligence.",
    formulas: [
      String.raw`J=\sum_{i=1}^{N}J_i+\lambda\sum_{i\neq j} I(A_i;A_j)`,
      String.raw`x_i(k+1)=\sum_j w_{ij}x_j(k)`,
    ],
  },
];

const MARS_SYSTEM_EQUATIONS = [
  String.raw`\mathbf{x}(t)=\begin{bmatrix}\mathbf{r}&\mathbf{v}&\mathbf{q}&\boldsymbol{\omega}&m&E&T&H\end{bmatrix}^T`,
  String.raw`\dot{\mathbf{x}}=f(\mathbf{x},\mathbf{u},\mathbf{d},t)`,
  String.raw`\ddot{\mathbf r}=-\sum_{i=1}^{N}\mu_i\frac{\mathbf r-\mathbf r_i}{\|\mathbf r-\mathbf r_i\|^3}+\frac{\mathbf T}{m}+\mathbf a_{SRP}+\mathbf a_{drag}+\mathbf a_{J2}`,
  String.raw`\dot m=-\frac{\|\mathbf T\|}{I_{sp}g_0}`,
  String.raw`\dot q=\frac12\Omega(\omega)q,\quad I\dot\omega+\omega\times I\omega=\tau`,
  String.raw`J=\Phi(x_f)+\int_{t_0}^{t_f}L(x,u,t)\,dt,\quad \dot\lambda=-\frac{\partial H}{\partial x},\quad u^*=\arg\min H`,
  String.raw`-\frac{\partial V}{\partial t}=\min_u\left[L+\nabla V^T f\right]`,
  String.raw`b'(s')=\eta P(o|s')\sum_s P(s'|s,a)b(s)`,
  String.raw`P(x_t|z_{1:t})=\eta P(z_t|x_t)\int P(x_t|x_{t-1})P(x_{t-1}|z_{1:t-1})\,dx`,
  String.raw`K=PH^T(HPH^T+R)^{-1}`,
];

const ASI_OBJECTIVE = String.raw`\pi^*=\arg\max_{\pi}\mathbb{E}\left[\sum_{t=0}^{T}\gamma^t\left(R_s+\alpha I+\beta K+\delta C+\epsilon H-\lambda F-\mu P\right)\right]`;

function renderMath(formula: string) {
  return katex.renderToString(formula, {
    displayMode: true,
    throwOnError: false,
    strict: "ignore",
    output: "html",
  });
}

export function ASIAstronautMathematics() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent-cyan)" }}>
          Research Module
        </p>
        <h1 className="headline">ASI Mathematics for Autonomous Mars Missions</h1>
        <p className="subhead max-w-4xl mt-3">
          A dedicated framework that combines AI mathematics, optimal control, estimation, and multi-agent coordination for a conceptual
          AI astronaut architecture.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          This is a conceptual research synthesis, not an official single-equation standard from NASA or any agency.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/research/space-agi-math"><a className="orbit-chip">Space-AGI Mathematics</a></Link>
          <Link href="/research/agi-asi-framework"><a className="orbit-chip">AGI/ASI Framework</a></Link>
          <Link href="/research/pmp-nmpc-autonomous-control"><a className="orbit-chip">PMP + NMPC Control</a></Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FOUNDATION_LEVELS.map((level) => (
          <article key={level.level} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,217,255,0.2)", background: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--accent-cyan)" }}>{level.level}</p>
            <h2 className="text-lg font-bold mt-1" style={{ color: "var(--text-primary)" }}>{level.title}</h2>
            <p className="text-sm mt-2 leading-7" style={{ color: "var(--text-secondary)" }}>{level.why}</p>
            <div className="mt-3 space-y-2">
              {level.formulas.map((formula, idx) => (
                <div
                  key={`${level.level}-${idx}`}
                  className="overflow-x-auto rounded-xl p-2"
                  style={{ background: "rgba(7,12,24,0.5)" }}
                  dangerouslySetInnerHTML={{ __html: renderMath(formula) }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(0,217,255,0.25)", background: "rgba(255,255,255,0.03)" }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>AI Astronaut System Model (Mars-Grade)</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          For deep-space autonomy, the system must jointly model orbit dynamics, mass depletion, attitude, estimation, planning, and mission risk.
        </p>
        <div className="space-y-3">
          {MARS_SYSTEM_EQUATIONS.map((formula, idx) => (
            <div
              key={`mars-eq-${idx}`}
              className="overflow-x-auto rounded-xl p-3"
              style={{ background: "rgba(7,12,24,0.55)" }}
              dangerouslySetInnerHTML={{ __html: renderMath(formula) }}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(0,217,255,0.25)", background: "rgba(0,217,255,0.08)" }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Conceptual Unified ASI Astronaut Objective</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Mission success, information gain, knowledge creation, collaboration quality, system health, fuel, and risk can be traded in one conceptual objective.
        </p>
        <div className="overflow-x-auto rounded-xl p-3" style={{ background: "rgba(7,12,24,0.55)" }} dangerouslySetInnerHTML={{ __html: renderMath(ASI_OBJECTIVE) }} />
        <ul className="text-sm leading-7 mt-4" style={{ color: "var(--text-secondary)" }}>
          <li>• R_s: mission success reward</li>
          <li>• I: information gained</li>
          <li>• K: knowledge generated</li>
          <li>• C: crew collaboration quality</li>
          <li>• H: spacecraft health and safety margin</li>
          <li>• F: fuel consumption, P: mission risk</li>
        </ul>
      </section>
    </div>
  );
}
