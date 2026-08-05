import katex from "katex";
import "katex/dist/katex.min.css";

function renderKatex(formula: string) {
  return katex.renderToString(formula, {
    displayMode: false,
    throwOnError: false,
    strict: "ignore",
    output: "html",
  });
}

export function SpaceIntelligence() {
  return (
    <div style={{ background: "var(--bg-body)", color: "var(--text-primary)" }} className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">
            🤖 The Future of Autonomous Space Exploration
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Beyond the Framework: Building a Complete Mathematical Brain for an Autonomous ASI Astronaut
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            The ten foundational levels describe the mathematical disciplines required for autonomous intelligence, but a truly 
            independent AI astronaut requires these disciplines to operate as one continuously interacting computational system. 
            Every second of a mission, the AI must transform uncertain observations into predictions, predictions into decisions, 
            and decisions into safe physical actions.
          </p>
        </div>

        {/* Perception-Prediction-Planning-Execution Loop */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            The Continuous Reasoning Loop
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            This continuous reasoning process can be represented conceptually as a perception–prediction–planning–execution loop:
          </p>
          <div className="bg-black/30 rounded-lg p-6 font-mono text-center text-sm overflow-x-auto">
            <p className="text-[var(--accent-gold)]">
              Sensors → State Estimation → World Model → Prediction → Optimization → Decision → Control → Learning → Mission Feedback
            </p>
          </div>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            Rather than isolated algorithms running independently, every component exchanges information with the others in real time. 
            This creates an adaptive mathematical architecture capable of operating without immediate human intervention.
          </p>
        </section>

        {/* Dynamic System Modeling */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Dynamic System Modeling
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Every autonomous spacecraft begins with a mathematical model describing how its state evolves over time.
          </p>
          <p className="font-semibold mb-2">The continuous nonlinear system is commonly represented as:</p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`\dot{x}(t)=f(x(t),u(t),w(t),t)`) }} />
          </div>
          <div className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <p><strong style={{ color: "var(--text-primary)" }}>where:</strong></p>
            <ul className="space-y-1">
              <li>• <strong style={{ color: "var(--text-primary)" }}>x(t)</strong> represents the spacecraft state</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>u(t)</strong> represents control inputs</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>w(t)</strong> represents disturbances such as solar radiation pressure or atmospheric drag</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>f(·)</strong> describes the spacecraft dynamics</li>
            </ul>
          </div>
          <p className="font-semibold mb-2">Sensor measurements are modeled as:</p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`y(t)=h(x(t))+v(t)`) }} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Together these equations define the mathematical "digital twin" of the spacecraft, enabling continuous prediction 
            and correction of orbital motion and system state.
          </p>
        </section>

        {/* Orbital Mechanics Integration */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Orbital Mechanics Integration
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Autonomous spacecraft must continuously predict future orbital motion. The governing equation follows Newton's law of gravitation:
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`\ddot{r}=-\mu\frac{r}{||r||^{3}}`) }} />
          </div>
          <div className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <p><strong style={{ color: "var(--text-primary)" }}>where:</strong></p>
            <ul className="space-y-1">
              <li>• <strong style={{ color: "var(--text-primary)" }}>r</strong> is the position vector</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>μ</strong> is the gravitational parameter</li>
            </ul>
          </div>
          <p className="mb-3 font-semibold">Future missions extend this model by incorporating:</p>
          <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>• J2 perturbations</li>
            <li>• Atmospheric drag</li>
            <li>• Solar radiation pressure</li>
            <li>• Third-body perturbations</li>
            <li>• Relativistic corrections for precision navigation</li>
          </ul>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            An AI astronaut continuously propagates these equations while simultaneously correcting them using onboard observations.
          </p>
        </section>

        {/* Bayesian Decision Making */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Bayesian Decision Making
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Space missions are inherently uncertain. Instead of making deterministic decisions, an autonomous astronaut continuously 
            updates its beliefs using Bayesian inference.
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`P(x|z)=\frac{P(z|x)P(x)}{P(z)}`) }} />
          </div>
          <div className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <p><strong style={{ color: "var(--text-primary)" }}>where:</strong></p>
            <ul className="space-y-1">
              <li>• <strong style={{ color: "var(--text-primary)" }}>x</strong> is the hidden state</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>z</strong> represents observations</li>
            </ul>
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Every new sensor reading modifies the spacecraft's confidence about its position, surrounding environment, and mission status. 
            This allows intelligent reasoning even when sensors partially fail.
          </p>
        </section>

        {/* Sequential Decision Theory */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Sequential Decision Theory
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Autonomous exploration is fundamentally a sequential decision problem. At every time step, the spacecraft selects an action 
            that maximizes long-term mission success rather than immediate reward.
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`\pi^*=\arg\max_{\pi}E\left[\sum_{t=0}^{T}\gamma^tR_t\right]`) }} />
          </div>
          <div className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <p><strong style={{ color: "var(--text-primary)" }}>where:</strong></p>
            <ul className="space-y-1">
              <li>• <strong style={{ color: "var(--text-primary)" }}>π</strong> is the control policy</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>R_t</strong> is the mission reward</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>γ</strong> is the discount factor</li>
            </ul>
          </div>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            Unlike classical controllers, this framework enables long-term planning across thousands of future decisions.
          </p>
        </section>

        {/* Hybrid Planning Architecture */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Hybrid Planning Architecture
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Future AI astronauts will not rely solely on neural networks. Instead, they combine multiple planning systems to enable 
            both logical reasoning and adaptive learning.
          </p>
          <ul className="space-y-2 mb-6" style={{ color: "var(--text-secondary)" }}>
            <li>• Symbolic reasoning</li>
            <li>• Optimization</li>
            <li>• Probabilistic planning</li>
            <li>• Neural inference</li>
            <li>• Rule-based safety verification</li>
          </ul>
          <p className="font-semibold mb-4">The planning pipeline:</p>
          <div className="bg-black/30 rounded-lg p-6 font-mono text-center space-y-2">
            <p style={{ color: "var(--accent-gold)" }}>Mission Goal</p>
            <p style={{ color: "var(--text-secondary)" }}>↓</p>
            <p style={{ color: "var(--accent-gold)" }}>Task Planning</p>
            <p style={{ color: "var(--text-secondary)" }}>↓</p>
            <p style={{ color: "var(--accent-gold)" }}>Trajectory Optimization</p>
            <p style={{ color: "var(--text-secondary)" }}>↓</p>
            <p style={{ color: "var(--accent-gold)" }}>Constraint Verification</p>
            <p style={{ color: "var(--text-secondary)" }}>↓</p>
            <p style={{ color: "var(--accent-gold)" }}>Execution</p>
            <p style={{ color: "var(--text-secondary)" }}>↓</p>
            <p style={{ color: "var(--accent-gold)" }}>Continuous Replanning</p>
          </div>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            This creates a resilient decision pipeline capable of adapting to unexpected mission events.
          </p>
        </section>

        {/* Mission Constraints */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Mission Constraint Mathematics
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Every mission operates under strict physical limits. Safe autonomy requires every optimization algorithm to satisfy 
            these constraints before any command is executed.
          </p>
          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="font-semibold mb-2">Power constraint:</p>
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`P(t)\le P_{\max}`) }} />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="font-semibold mb-2">Fuel constraint:</p>
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`m(t)\ge m_{dry}`) }} />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="font-semibold mb-2">Thermal constraint:</p>
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`T_{min}\le T(t)\le T_{max}`) }} />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="font-semibold mb-2">Communication window:</p>
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`C(t)=\begin{cases}1,& \text{visible}\\0,& \text{blocked}\end{cases}`) }} />
            </div>
          </div>
        </section>

        {/* Fault Detection */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Fault Detection and Autonomous Recovery
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Deep-space missions cannot depend on immediate ground intervention. The AI continuously evaluates system health using residual generation:
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`r(t)=y(t)-\hat{y}(t)`) }} />
          </div>
          <div className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <p><strong style={{ color: "var(--text-primary)" }}>where:</strong></p>
            <ul className="space-y-1">
              <li>• <strong style={{ color: "var(--text-primary)" }}>y(t)</strong> is the measured output</li>
              <li>• <strong style={{ color: "var(--text-primary)" }}>ŷ(t)</strong> is the predicted output</li>
            </ul>
          </div>
          <p className="font-semibold mb-3">Potential recovery actions include:</p>
          <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>• Switching to backup sensors</li>
            <li>• Reconfiguring control systems</li>
            <li>• Power redistribution</li>
            <li>• Safe-mode transition</li>
            <li>• Mission replanning</li>
          </ul>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            This capability significantly increases mission reliability and enables missions far from Earth.
          </p>
        </section>

        {/* Cooperative Swarm Intelligence */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Cooperative Swarm Intelligence
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Future exploration will involve distributed robotic teams rather than isolated spacecraft. Each robot becomes an intelligent 
            node in a larger network where consensus algorithms enable all robots to converge toward a shared estimate.
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`x_i^{k+1}=x_i^k+\alpha\sum_{j\in N_i}(x_j^k-x_i^k)`) }} />
          </div>
          <p className="font-semibold mb-3">Applications include:</p>
          <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>• Satellite formations</li>
            <li>• Lunar construction robots</li>
            <li>• Mars drone fleets</li>
            <li>• Orbital servicing systems</li>
            <li>• Distributed telescopes</li>
          </ul>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            The collective system becomes more capable than any individual robot.
          </p>
        </section>

        {/* Knowledge Representation */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Knowledge Representation
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            An AI astronaut must understand more than physics. It must represent and reason over scientific knowledge.
          </p>
          <p className="mb-3 font-semibold">Knowledge representation includes:</p>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• Geological maps</li>
            <li>• Chemical composition</li>
            <li>• Mission procedures</li>
            <li>• Engineering documentation</li>
            <li>• Astronaut operational manuals</li>
          </ul>
          <p style={{ color: "var(--text-secondary)" }}>
            Knowledge graphs connect these concepts into structured reasoning networks, enabling the system to answer critical questions 
            such as: Which instrument should analyze this rock? Which experiment has the highest scientific value? Which repair procedure 
            minimizes mission risk? Large language models can assist with reasoning, but mathematical verification remains essential 
            before execution.
          </p>
        </section>

        {/* Safety and Verification */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Mathematical Safety and Verification
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            High autonomy requires mathematical guarantees. Verification ensures that control policies remain within acceptable operational 
            limits through methods including:
          </p>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• Lyapunov stability analysis</li>
            <li>• Reachability analysis</li>
            <li>• Barrier certificates</li>
            <li>• Formal methods</li>
            <li>• Runtime verification</li>
          </ul>
          <p style={{ color: "var(--text-secondary)" }}>
            Instead of assuming an AI action is correct, the system mathematically proves that it satisfies mission safety constraints 
            before execution. This verification layer is especially important for crewed missions where human safety is paramount.
          </p>
        </section>

        {/* Energy-Aware Intelligence */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Energy-Aware Intelligence
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Energy becomes one of the most valuable resources during deep-space exploration. Every decision must account for power availability.
          </p>
          <div className="overflow-x-auto mb-4 bg-black/20 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: renderKatex(String.raw`J=w_1J_{science}+w_2J_{fuel}+w_3J_{power}+w_4J_{risk}`) }} />
          </div>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Where each weighting coefficient reflects mission priorities. For example, during a Martian dust storm the system may 
            temporarily prioritize power conservation over scientific observations. This adaptive objective function enables graceful 
            degradation rather than catastrophic failure.
          </p>
        </section>

        {/* Continual Learning */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(100,200,255,0.4)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            Continual Learning in Space
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Unlike terrestrial AI systems that are retrained in data centers, an AI astronaut must improve while operating millions 
            of kilometers from Earth. Continual learning enables the spacecraft to:
          </p>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• Adapt to new terrain</li>
            <li>• Improve navigation accuracy</li>
            <li>• Learn unexpected environmental conditions</li>
            <li>• Refine scientific hypotheses</li>
            <li>• Optimize future trajectories</li>
          </ul>
          <p style={{ color: "var(--text-secondary)" }}>
            Learning must occur while preserving previously acquired knowledge and avoiding catastrophic forgetting. This capability 
            transforms autonomous spacecraft from static software into continually improving scientific explorers.
          </p>
        </section>

        {/* Toward ASI */}
        <section className="mb-12 rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(205,68,0,0.5)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-gold)" }}>
            Toward Artificial Superintelligence for Space Exploration
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Artificial Superintelligence represents more than larger neural networks. A true ASI astronaut would integrate:
          </p>
          <ul className="space-y-2 mb-6" style={{ color: "var(--text-secondary)" }}>
            <li>• Physics-based simulation</li>
            <li>• Optimal control</li>
            <li>• Reinforcement learning</li>
            <li>• Probabilistic reasoning</li>
            <li>• Symbolic planning</li>
            <li>• Scientific discovery</li>
            <li>• Distributed robotics</li>
            <li>• Formal verification</li>
            <li>• Continual learning</li>
            <li>• Human collaboration</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            These components form a hierarchical cognitive architecture capable of perceiving, reasoning, planning, learning, explaining, 
            and acting autonomously in environments where communication with Earth is delayed or unavailable.
          </p>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Rather than replacing human exploration, ASI extends humanity's reach into regions where direct human control is impossible. 
            It serves as an intelligent partner that can conduct scientific investigations, maintain spacecraft, coordinate robotic teams, 
            and respond to unforeseen challenges with speed and mathematical rigor.
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            As missions expand from Earth orbit to the Moon, Mars, asteroids, and eventually the outer Solar System, the future of 
            exploration will depend on systems that can think, adapt, and verify their own decisions. The mathematical foundations 
            presented in the ASI Astronaut Mathematics framework offer one conceptual pathway toward that future, bringing together 
            control theory, artificial intelligence, estimation, optimization, robotics, and physics into a unified architecture for 
            autonomous space exploration.
          </p>
        </section>
      </div>
    </div>
  );
}
