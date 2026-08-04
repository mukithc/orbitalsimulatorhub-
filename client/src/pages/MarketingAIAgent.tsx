import { useMemo, useState } from "react";
import { Link } from "wouter";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const PROMPTS = [
  "Create a launch campaign for a new AI space robotics product",
  "Write a 7-day social media plan for OrbitalSimulatorHub",
  "Give me 5 email subject lines for a space-AGI newsletter",
  "Build a SEO content cluster for autonomous spacecraft",
  "Help me position our brand as the future of space intelligence",
];

function buildReply(input: string) {
  const text = input.trim().toLowerCase();
  const isLaunch = text.includes("launch") || text.includes("campaign");
  const isSocial = text.includes("social") || text.includes("post") || text.includes("content");
  const isEmail = text.includes("email") || text.includes("subject");
  const isSeo = text.includes("seo") || text.includes("keyword") || text.includes("content cluster");
  const isBrand = text.includes("brand") || text.includes("position");

  if (isLaunch) {
    return [
      "Launch blueprint",
      "1. Core promise: frame the offer around one bold outcome: faster orbit insight, safer autonomy, or clearer space intelligence.",
      "2. Hero message: use a crisp line like 'Autonomy for the next era of space missions.'",
      "3. Channel plan: pair a cinematic landing page with 3 short-form social posts, one email blast, and one founder-style video.",
      "4. CTA: 'Explore the future of autonomous space intelligence' with a high-conversion offer such as a demo, waitlist, or free guide.",
    ].join("\n");
  }

  if (isSocial) {
    return [
      "Social motion plan",
      "- Hook 1: 'What if spacecraft could think before they act?'",
      "- Hook 2: 'The future of space missions is not just faster — it is more autonomous.'",
      "- Hook 3: 'Here is the mathematics behind autonomous control for deep-space travel.'",
      "- CTA: 'Follow for weekly research, simulations, and mission insights.'",
    ].join("\n");
  }

  if (isEmail) {
    return [
      "Email concepts",
      "Subject line ideas:",
      "• The next era of space intelligence has arrived",
      "• Why autonomous spacecraft matter now",
      "• A new view of AI in aerospace",
      "Body angle: teach, spark curiosity, then invite a click to the research experience or simulator.",
    ].join("\n");
  }

  if (isSeo) {
    return [
      "SEO content cluster",
      "Primary keyword: autonomous spacecraft",
      "Secondary keywords: AI in aerospace, space AGI, spacecraft control systems, autonomous navigation",
      "Suggested article stack: overview, tutorial, case study, math explainer, and future roadmap.",
      "Content structure: problem → mechanism → mission impact → proof → CTA.",
    ].join("\n");
  }

  if (isBrand) {
    return [
      "Brand positioning",
      "Position the brand as a research-first, future-facing intelligence platform for space systems.",
      "Core pillars: autonomy, intelligence, exploration, and scientific rigor.",
      "Messaging formula: 'We turn advanced space systems into understandable, visionary products for students, researchers, and mission builders.'",
    ].join("\n");
  }

  return [
    "Marketing AI brief",
    "Here is a strong starting point:",
    "1. Define the audience: researchers, builders, students, or mission teams.",
    "2. Clarify the promise: what problem is solved better than before?",
    "3. Build one narrative: intelligence for the space age.",
    "4. Match the message to a channel: product page, email, social, or SEO article.",
    "5. End with one CTA that feels urgent and credible.",
  ].join("\n");
}

export function MarketingAIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the Marketing AI Agent. I can help you shape campaigns, write launch copy, design email concepts, plan content, and sharpen brand positioning for your space-tech story.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const presets = useMemo(
    () => [
      { title: "Launch plan", description: "Create a launch campaign for a new AI space robotics product", tag: "Campaign" },
      { title: "Social series", description: "Write a 7-day social media plan for OrbitalSimulatorHub", tag: "Social" },
      { title: "Email funnel", description: "Give me 5 email subject lines for a space-AGI newsletter", tag: "Email" },
    ],
    []
  );

  const submit = () => {
    const value = input.trim();
    if (!value || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: buildReply(value) }]);
      setLoading(false);
    }, 450);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="glass-panel rounded-[28px] p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.16),transparent_40%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="orbit-chip">Marketing AI</span>
            <span className="orbit-chip">Launch • Growth • Brand</span>
            <span className="orbit-chip">Space-tech ready</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                A marketing agent for your space intelligence brand
              </h1>
              <p className="mt-4 text-base leading-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                Turn research, launches, and futuristic storytelling into sharp messaging. This agent helps you shape campaigns, craft social posts, build email sequences, and build content strategy for OrbitalSimulatorHub-style growth.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/research/agi-asi-framework">
                  <a className="px-4 py-2 rounded-xl font-semibold text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
                    Explore ASI / AGI concepts
                  </a>
                </Link>
                <Link href="/research/pmp-nmpc-autonomous-control">
                  <a className="px-4 py-2 rounded-xl font-semibold text-sm border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
                    See the autonomy research layer
                  </a>
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Launch copy", value: "Campaigns" },
                { title: "Growth ideas", value: "Content" },
                { title: "Audience targeting", value: "Brand" },
                { title: "Research hooks", value: "Story" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-4 border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(0,217,255,0.18)" }}>
                  <div className="text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--accent-cyan)" }}>{item.value}</div>
                  <div className="mt-2 font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="glass-panel rounded-[24px] p-5">
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Prompt starter pack</h2>
            <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              Pick a starter prompt to quickly generate your next campaign idea or growth plan.
            </p>
            <div className="mt-4 space-y-3">
              {presets.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => setInput(preset.description)}
                  className="w-full rounded-xl p-3 text-left border transition hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--accent-cyan)" }}>{preset.tag}</div>
                  <div className="mt-1 font-semibold" style={{ color: "var(--text-primary)" }}>{preset.title}</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[24px] p-5">
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>What this agent can do</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              <li>• Build launch campaigns for new products, research pages, or missions</li>
              <li>• Generate social content calendars with hooks, captions, and CTAs</li>
              <li>• Create email subject lines and newsletter angles</li>
              <li>• Shape SEO clusters around AI, space systems, robotics, and autonomy</li>
              <li>• Refine brand messaging for a futuristic, research-first identity</li>
            </ul>
          </div>
        </div>

        <div className="glass-panel rounded-[24px] p-4 md:p-5 flex flex-col min-h-[560px]">
          <div className="flex items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <div>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Marketing AI workspace</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Prompt it like a creative strategist and growth marketer.</p>
            </div>
            <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ background: "rgba(0,217,255,0.16)", color: "var(--accent-cyan)" }}>
              Live assistant
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-7 whitespace-pre-wrap ${message.role === "user" ? "rounded-br-none" : "rounded-bl-none"}`} style={{ background: message.role === "user" ? "var(--accent-primary)" : "rgba(255,255,255,0.06)", color: message.role === "user" ? "#03111f" : "var(--text-primary)" }}>
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                  Generating a marketing plan…
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              }}
              rows={4}
              placeholder="Ask for launch copy, email idea, audience strategy, or a full campaign plan..."
              className="w-full rounded-2xl border px-3 py-3 text-sm outline-none"
              style={{ background: "rgba(7,12,24,0.42)", borderColor: "rgba(255,255,255,0.12)", color: "var(--text-primary)" }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {PROMPTS.slice(0, 4).map((prompt) => (
                <button key={prompt} onClick={() => setInput(prompt)} className="rounded-full px-3 py-1.5 text-xs border" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
                  {prompt}
                </button>
              ))}
            </div>
            <button onClick={submit} disabled={loading || !input.trim()} className="mt-3 w-full rounded-2xl px-4 py-3 font-semibold disabled:opacity-60" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              Generate marketing strategy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
