import { Link } from "wouter";
import katex from "katex";
import "katex/dist/katex.min.css";

const sections = [
  {
    title: "1. Pontryagin Maximum Principle (PMP)",
    subtitle:
      "The foundation of optimal spacecraft trajectory optimization, fuel-optimal landing, Mars missions, Apollo guidance, and autonomous spacecraft.",
    formulaTitle: "Key equations",
    formulas: [
      String.raw`\dot{x}(t)=f(x(t),u(t),t)`,
      String.raw`J=\phi(x(t_f))+\int_{t_0}^{t_f} L(x(t),u(t),t)\,dt`,
      String.raw`H(x,\lambda,u,t)=L(x,u,t)+\lambda^T f(x,u,t)`,
      String.raw`\dot{\lambda}=-\frac{\partial H}{\partial x}`,
      String.raw`u^*(t)=\arg\min_u H(x,\lambda,u,t)`,
      String.raw`\lambda(t_f)=\frac{\partial \phi}{\partial x}`,
    ],
    notes: ["State vector x", "Control input u", "Hamiltonian H", "Costate λ"],
  },
  {
    title: "2. Euler–Lagrange Equation",
    subtitle: "The basis of optimal control, mechanics, robotics, and physics.",
    formulaTitle: "Equation",
    formulas: [String.raw`\frac{d}{dt}\left(\frac{\partial L}{\partial \dot q}\right)-\frac{\partial L}{\partial q}=0`],
  },
  {
    title: "3. Hamilton's Equations",
    subtitle: "Core equations in analytical mechanics and trajectory analysis.",
    formulaTitle: "Equations",
    formulas: [String.raw`\dot q=\frac{\partial H}{\partial p}`, String.raw`\dot p=-\frac{\partial H}{\partial q}`],
  },
  {
    title: "4. State Space Model",
    subtitle: "Used everywhere in aerospace.",
    formulaTitle: "Equations",
    formulas: [String.raw`\dot x=Ax+Bu`, String.raw`y=Cx+Du`],
  },
  {
    title: "5. Linear Quadratic Regulator (LQR)",
    subtitle: "A standard optimal controller for linear systems.",
    formulaTitle: "Performance index and control law",
    formulas: [String.raw`J=\int_0^{\infty}(x^TQx+u^TRu)\,dt`, String.raw`u=-Kx`],
  },
  {
    title: "6. Riccati Equation",
    subtitle: "One of the most important equations in optimal control.",
    formulaTitle: "Equation",
    formulas: [String.raw`A^TP+PA-PBR^{-1}B^TP+Q=0`],
  },
  {
    title: "7. Model Predictive Control (MPC)",
    subtitle: "Optimization-based control for constrained systems.",
    formulaTitle: "Optimization problem",
    formulas: [String.raw`\min \sum_{k=0}^{N}\left(x_k^TQx_k+u_k^TRu_k\right)`, String.raw`x_{k+1}=Ax_k+Bu_k`],
  },
  {
    title: "8. Kalman Filter",
    subtitle: "Recursive estimation for navigation, sensing, and guidance.",
    formulaTitle: "Prediction, covariance, and update",
    formulas: [
      String.raw`x_{k|k-1}=Ax_{k-1}+Bu`,
      String.raw`P=APA^T+Q`,
      String.raw`K=PH^T\left(HPH^T+R\right)^{-1}`,
      String.raw`x=x+K\left(z-Hx\right)`,
    ],
  },
  {
    title: "9. Orbital Dynamics (Two-Body Problem)",
    subtitle: "The fundamental equation governing satellite and planetary motion.",
    formulaTitle: "Equation",
    formulas: [String.raw`\ddot r=-\frac{\mu}{r^3}r`, String.raw`\mu=GM`],
  },
  {
    title: "10. Vis-Viva Equation",
    subtitle: "Determines spacecraft velocity at any point in an orbit.",
    formulaTitle: "Equation",
    formulas: [String.raw`v=\sqrt{\mu\left(\frac{2}{r}-\frac{1}{a}\right)}`],
  },
  {
    title: "11. Tsiolkovsky Rocket Equation",
    subtitle: "The cornerstone of rocket propulsion and mission planning.",
    formulaTitle: "Equation",
    formulas: [String.raw`\Delta v=v_e\ln\left(\frac{m_0}{m_f}\right)`],
  },
  {
    title: "12. Clohessy–Wiltshire (Hill's) Equations",
    subtitle: "Used for satellite rendezvous and formation flying.",
    formulaTitle: "Equations",
    formulas: [
      String.raw`\ddot x-2n\dot y-3n^2x=u_x`,
      String.raw`\ddot y+2n\dot x=u_y`,
      String.raw`\ddot z+n^2z=u_z`,
    ],
  },
  {
    title: "13. Quaternion Attitude Dynamics",
    subtitle: "Used for spacecraft orientation and attitude control.",
    formulaTitle: "Kinematics",
    formulas: [String.raw`\dot q=\frac{1}{2}\Omega(\omega)q`],
  },
  {
    title: "14. Extended Kalman Filter (EKF)",
    subtitle: "A nonlinear extension of the Kalman filter.",
    formulaTitle: "Prediction, measurement, and linearization",
    formulas: [String.raw`x_{k+1}=f(x_k,u_k)`, String.raw`z=h(x)+v`, String.raw`F=\frac{\partial f}{\partial x}`],
  },
  {
    title: "15. Bellman Equation (Dynamic Programming)",
    subtitle: "The foundation of reinforcement learning and optimal decision-making.",
    formulaTitle: "Equation",
    formulas: [String.raw`V(x)=\min_u\left[L(x,u)+V\left(f(x,u)\right)\right]`],
  },
  {
    title: "16. Hamilton–Jacobi–Bellman (HJB) Equation",
    subtitle: "The continuous-time optimal control equation.",
    formulaTitle: "Equation",
    formulas: [String.raw`-\frac{\partial V}{\partial t}=\min_u\left[L+\nabla V^Tf\right]`],
  },
  {
    title: "17. Lyapunov Stability",
    subtitle: "A key criterion for proving stability of control systems.",
    formulaTitle: "Conditions",
    formulas: [String.raw`V(x)>0`, String.raw`\dot V(x)<0`],
  },
  {
    title: "18. Eigenvalue Problem",
    subtitle: "Used extensively in vibration analysis, control system stability, orbital dynamics, and structural mechanics.",
    formulaTitle: "Equation",
    formulas: [String.raw`A\mathbf{v}=\lambda\mathbf{v}`, String.raw`\lambda_1=3,\quad \lambda_2=1`],
  },
];

function renderKatex(formula: string) {
  return katex.renderToString(formula, {
    displayMode: false,
    throwOnError: false,
    strict: "ignore",
    output: "html",
  });
}

export function SpaceAGIMathematics() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Graduate-Level Credible</p>
        <h1 className="headline">Space-AGI Mathematics</h1>
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          New to this? <Link href="/research/space-agi-explanation"><a className="text-[var(--accent-gold)] hover:underline">Read the easy version</a></Link> — same concepts, plain English, examples.
        </p>
        <p className="subhead max-w-3xl">
          A compact reference for control theory, orbital mechanics, estimation, and Space-AGI optimization.
        </p>
      </div>

      {/* Live Orbital Mechanics Around Mars — full-frame */}
      <section className="relative w-full overflow-hidden rounded-xl" style={{ height: "52vh", minHeight: "420px", background: "#0a0010", border: "2px solid rgba(205,68,0,0.7)" }}>
        {/* starfield */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='600' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='600' height='400' fill='%230a0010'/%3E%3Ccircle cx='50' cy='80' r='1' fill='white' opacity='.6'/%3E%3Ccircle cx='150' cy='30' r='1' fill='white' opacity='.8'/%3E%3Ccircle cx='300' cy='60' r='1.5' fill='white' opacity='.5'/%3E%3Ccircle cx='450' cy='120' r='1' fill='white' opacity='.7'/%3E%3Ccircle cx='530' cy='40' r='1' fill='white' opacity='.6'/%3E%3Ccircle cx='80' cy='200' r='1' fill='white' opacity='.4'/%3E%3Ccircle cx='200' cy='350' r='1.5' fill='white' opacity='.7'/%3E%3Ccircle cx='400' cy='300' r='1' fill='white' opacity='.5'/%3E%3Ccircle cx='560' cy='250' r='1' fill='white' opacity='.8'/%3E%3C/svg%3E\")", backgroundSize: "cover" }} />
        {/* label */}
        <div className="absolute top-4 left-0 right-0 text-center z-10">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,120,50,0.9)" }}>Live Simulation</p>
          <h2 className="text-xl font-bold" style={{ color: "#fff" }}>Orbital Mechanics Around Mars</h2>
        </div>
        {/* Mars sphere */}
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90px", height: "90px", borderRadius: "50%", background: "radial-gradient(circle at 38% 38%, #e8753a 0%, #cd4400 45%, #8b2000 80%, #3a0800 100%)", boxShadow: "0 0 40px rgba(205,68,0,0.6), 0 0 80px rgba(205,68,0,0.25), inset -12px -8px 20px rgba(0,0,0,0.5)" }} />
        {/* orbit ring 1 */}
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(75deg)", width: "220px", height: "220px", borderRadius: "50%", border: "1.5px solid rgba(255,200,100,0.5)", boxShadow: "0 0 8px rgba(255,200,100,0.25)" }} />
        {/* orbit ring 2 */}
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(40deg)", width: "340px", height: "300px", borderRadius: "50%", border: "1px solid rgba(100,200,255,0.35)", boxShadow: "0 0 6px rgba(100,200,255,0.2)" }} />
        {/* orbit ring 3 */}
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(70deg) rotateZ(-20deg)", width: "480px", height: "420px", borderRadius: "50%", border: "1px solid rgba(200,100,255,0.25)" }} />
        {/* satellite dot 1 */}
        <div className="absolute" style={{ top: "calc(50% - 110px)", left: "50%", transform: "translateX(-50%)", width: "6px", height: "6px", borderRadius: "50%", background: "#ffe066", boxShadow: "0 0 8px #ffe066" }} />
        {/* satellite dot 2 */}
        <div className="absolute" style={{ top: "calc(50% + 80px)", left: "calc(50% + 130px)", width: "5px", height: "5px", borderRadius: "50%", background: "#64c8ff", boxShadow: "0 0 6px #64c8ff" }} />
        {/* info strip */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-4 py-3 z-10" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}>
          <div className="text-center"><p className="text-xs" style={{ color: "rgba(255,120,50,0.8)" }}>Mars Radius</p><p className="text-sm font-bold text-white">3,389 km</p></div>
          <div className="text-center"><p className="text-xs" style={{ color: "rgba(255,120,50,0.8)" }}>Low Mars Orbit</p><p className="text-sm font-bold text-white">~300 km</p></div>
          <div className="text-center"><p className="text-xs" style={{ color: "rgba(255,120,50,0.8)" }}>Δv to orbit</p><p className="text-sm font-bold text-white">~3.55 km/s</p></div>
          <a href="/simulator" className="hidden sm:inline-block text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(205,68,0,0.85)", color: "#fff" }}>Open Simulator →</a>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(0,217,255,0.5)" }}>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">PMP in Spaceflight</p>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Pontryagin Maximum Principle (PMP)</h2>
        <p className="text-sm mb-4 max-w-4xl" style={{ color: "var(--text-secondary)" }}>
          PMP is one of the core tools of optimal control. In spacecraft problems, it turns the question “what should the engines do next?” into a precise math problem that minimizes fuel, time, energy, or trajectory error while still obeying the vehicle&apos;s dynamics.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Core formulation</h3>
            <div className="space-y-2 font-mono text-sm leading-7" style={{ color: "var(--text-primary)" }}>
              <p>x˙(t) = f(x(t), u(t), t)</p>
              <p>J = ϕ(x(t_f)) + ∫[t_0→t_f] L(x(t), u(t), t) dt</p>
              <p>H(x, λ, u, t) = L(x, u, t) + λ^T f(x, u, t)</p>
              <p>λ˙ = −∂H/∂x</p>
              <p>u*(t) = argmin_u H(x, λ, u, t)</p>
              <p>λ(t_f) = ∂ϕ/∂x</p>
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>What the symbols mean</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "var(--text-primary)" }}>x(t)</strong> is the spacecraft state: position, velocity, attitude, fuel, and more.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>u(t)</strong> is the control input: thrust, steering, reaction wheels, or guidance commands.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>H</strong> is the Hamiltonian, which combines immediate cost with future mission impact.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>λ</strong> is the costate, which measures how valuable each state variable is to the mission.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>How engineers use it</h3>
            <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              Engineers use PMP to choose the best burn schedule, thrust direction, coast periods, and final braking strategy. Instead of guessing, the spacecraft predicts the future consequences of each action and selects the one with the lowest total mission cost.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Real aerospace applications</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• Launch vehicle pitch programs and gravity turns</li>
              <li>• LEO-to-GEO orbit transfers and interplanetary injection</li>
              <li>• Mars landing and lunar powered descent</li>
              <li>• Satellite formation flying and autonomous docking</li>
              <li>• Deep-space low-thrust optimization and gravity assists</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg p-4 mt-4" style={{ background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.25)" }}>
          <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            Why it matters: without optimal control, spacecraft waste propellant, miss targets, and need more launch mass. PMP makes the engine commands mathematically optimal instead of approximate.
          </p>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(0,217,255,0.5)" }}>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Euler-Lagrange in Spaceflight</p>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>The Equation That Helps the Universe Choose Its Path</h2>
        <p className="text-sm mb-4 max-w-4xl" style={{ color: "var(--text-secondary)" }}>
          A ball, a pendulum, a robotic arm, or a spacecraft can move in many possible ways. The Euler–Lagrange equation gives the rule for which path is physically consistent with energy and constraints.
        </p>
        <div className="overflow-x-auto rounded-lg p-4 mb-4" style={{ background: "var(--bg-surface)" }} dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`\frac{d}{dt}\left(\frac{\partial L}{\partial \dot q}\right)-\frac{\partial L}{\partial q}=0`) }} />
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Core idea: nature follows a path that makes the action stationary, balancing motion and stored energy.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Meet the Lagrangian</h3>
            <div className="overflow-x-auto mb-3" dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`L=T-V`) }} />
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• <strong style={{ color: "var(--text-primary)" }}>T</strong>: kinetic energy (motion)</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>V</strong>: potential energy (stored energy)</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>q</strong>: configuration (position, angle, orbit radius, etc.)</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>q˙</strong>: velocity</li>
            </ul>
          </div>

          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>How to read the symbols</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• <strong style={{ color: "var(--text-primary)" }}>q</strong>: where am I?</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>q˙</strong>: how fast am I moving?</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>L</strong>: what is the energy balance?</li>
              <li>• The equation checks how <strong style={{ color: "var(--text-primary)" }}>L</strong> changes with both position and velocity.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg p-4 mt-4" style={{ background: "var(--bg-surface)" }}>
          <h3 className="font-semibold mb-3" style={{ color: "var(--accent-cyan)" }}>Simple example: a falling ball</h3>
          <div className="space-y-3 overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`T=\frac{1}{2}m\dot q^2`) }} />
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`V=mgq`) }} />
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`L=\frac{1}{2}m\dot q^2-mgq`) }} />
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`\frac{\partial L}{\partial \dot q}=m\dot q,\quad \frac{d}{dt}(m\dot q)=m\ddot q,\quad \frac{\partial L}{\partial q}=-mg`) }} />
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`m\ddot q+mg=0\Rightarrow \ddot q=-g`) }} />
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
            Same physics as Newton, but derived from energy instead of force-by-force bookkeeping.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Why engineers love it</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• cleaner modeling for multi-joint robots and coupled systems</li>
              <li>• scalable equations for translation + rotation + constraints</li>
              <li>• strong basis for simulation and controller design</li>
            </ul>
          </div>
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Space applications</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• rocket ascent, atmospheric entry, powered descent</li>
              <li>• orbital trajectory modeling and perturbation studies</li>
              <li>• space robotics dynamics and torque computation</li>
              <li>• spacecraft attitude dynamics before control synthesis</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg p-4 mt-4" style={{ background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.25)" }}>
          <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            In a modern stack, Euler–Lagrange models the natural system motion, then optimal control (PMP/LQR/MPC) chooses best actions, and filtering (e.g. Kalman) estimates current state. That combination is the backbone of autonomous spacecraft.
          </p>
        </div>
      </section>

      <div className="grid gap-6">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{section.title}</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{section.subtitle}</p>
            <div className="rounded-lg p-4 font-mono text-sm space-y-2" style={{ background: "var(--bg-surface)" }}>
              <p className="font-semibold text-[var(--accent-cyan)]">{section.formulaTitle}</p>
              {section.formulas.map((formula) => (
                <div key={formula} className="overflow-x-auto py-1 leading-7" dangerouslySetInnerHTML={{ __html: renderKatex(formula) }} />
              ))}
              {section.notes ? (
                <div className="pt-2 text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
                  {section.notes.map((note) => (
                    <p key={note}>• {note}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

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
