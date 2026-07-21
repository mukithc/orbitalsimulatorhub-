import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Compass,
  Cpu,
  GraduationCap,
  MessagesSquare,
  Rocket,
  Satellite,
  Users,
} from 'lucide-react';

const trustedGroups = [
  'Aerospace Engineers',
  'Space Researchers',
  'Students',
  'Educators',
  'Startups',
  'Astrophotographers',
];

const features = [
  {
    icon: Users,
    title: 'Professional Space Network',
    description: 'Profiles, verified expertise, and intelligent recommendations built around missions, research, and collaboration.',
  },
  {
    icon: Satellite,
    title: 'Mission-Based Communities',
    description: 'Create focused spaces for propulsion, lunar habitats, CubeSats, space policy, and agency briefings.',
  },
  {
    icon: MessagesSquare,
    title: 'Real-Time Collaboration',
    description: 'Channels, threads, and direct conversations with a mission-control rhythm instead of noisy chat chaos.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Space Jobs and Opportunities',
    description: 'Surface internships, research calls, startup hiring, and aerospace roles alongside the people doing the work.',
  },
  {
    icon: GraduationCap,
    title: 'Learning and Research',
    description: 'Build paths across orbital mechanics, robotics, astrophotography, and AI with shared resources and study groups.',
  },
  {
    icon: Bot,
    title: 'AI-Powered AstroBot',
    description: 'Summaries, concept explainers, and mission assistance through a provider-safe AI interface ready for expansion.',
  },
];

const communities = [
  { name: 'Mars Exploration Network', members: '2,380', status: 'High activity', description: 'Crewed mission architecture, habitation systems, ISRU, and human factors.' },
  { name: 'Rocket Propulsion Lab', members: '1,920', status: 'New papers today', description: 'Combustion stability, injector design, materials, and propulsion testing.' },
  { name: 'Orbital Mechanics', members: '3,210', status: 'Live problem set', description: 'Transfers, rendezvous, station-keeping, and trajectory design for all levels.' },
  { name: 'Lunar Research Group', members: '1,460', status: 'Mission review live', description: 'Regolith systems, power networks, polar ice studies, and Artemis strategy.' },
  { name: 'Astrophotography Collective', members: '4,180', status: 'Gallery update', description: 'Capture workflows, mounts, processing pipelines, and skywatching meetups.' },
  { name: 'Space Startup Founders', members: '860', status: 'Investor AMA', description: 'Fundraising, launch economics, regulatory strategy, and product-market fit.' },
  { name: 'NASA Mission Watch', members: '5,040', status: 'Launch countdown', description: 'Agency briefings, timelines, telemetry, and structured discussion threads.' },
  { name: 'Space AI and Robotics', members: '1,730', status: 'Build sprint', description: 'Autonomy stacks, rover perception, navigation, and robotic systems design.' },
];

const missionStats = [
  { label: 'Current phase', value: 'Payload integration' },
  { label: 'Launch countdown', value: 'T-12 days' },
  { label: 'Crew / org', value: 'Orbital Research Alliance' },
  { label: 'Status', value: 'Simulation data · demo only' },
];

const dashboardLinks = [
  { label: 'Home', hint: 'Your feed and mission updates' },
  { label: 'Discover', hint: 'People, communities, resources' },
  { label: 'Communities', hint: 'Structured topic spaces' },
  { label: 'Missions', hint: 'Collaborative workspaces' },
  { label: 'Messages', hint: 'Realtime direct conversation' },
  { label: 'AstroBot', hint: 'Space-focused AI assistance' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-app text-app">
      <PublicNav />

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
          <div className="hero-noise orbital-grid absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-24 h-56 w-56 rounded-full bg-[#4F8CFF]/20 blur-3xl" />
            <div className="absolute right-[12%] top-36 h-64 w-64 rounded-full bg-[#D946EF]/12 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38D9FF]/12 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted">
                <BadgeCheck className="h-4 w-4 text-cyan" />
                12,800+ explorers already connected
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
                Where Earth&apos;s <span className="gradient-text">Space Community</span> Connects
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                Join engineers, researchers, students, creators, and explorers building the future beyond Earth.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold button-primary">
                  Join the Community
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#communities" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold button-secondary">
                  Explore Communities
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted">
                {trustedGroups.map((group) => (
                  <span key={group} className="rounded-full border border-app bg-white/5 px-4 py-2">
                    {group}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="surface-glass relative overflow-hidden rounded-[28px] p-5 sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,140,255,0.18),_transparent_45%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-muted">Mission network preview</p>
                      <h2 className="mt-2 text-2xl font-semibold">Orbital operations center</h2>
                    </div>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Live demo
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-app bg-black/20 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                        <span>Community signal</span>
                        <Compass className="h-4 w-4 text-cyan" />
                      </div>
                      <div className="mt-6 space-y-4">
                        {dashboardLinks.slice(0, 4).map((item) => (
                          <div key={item.label} className="flex items-start justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="mt-1 text-xs text-muted">{item.hint}</p>
                            </div>
                            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl border border-app bg-black/20 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                        <span>Orbit telemetry</span>
                        <Cpu className="h-4 w-4 text-primary" />
                      </div>
                      <div className="mt-6 rounded-[24px] border border-white/10 bg-[#091224] p-4">
                        <div className="mx-auto h-48 w-48 rounded-full border border-cyan-300/20 p-5">
                          <div className="flex h-full items-center justify-center rounded-full border border-dashed border-primary/40">
                            <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle,_rgba(74,162,255,0.9),_rgba(15,23,42,0.2))] shadow-[0_0_40px_rgba(79,140,255,0.4)]" />
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted">
                          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                            <p className="uppercase tracking-[0.2em]">Orbit</p>
                            <p className="mt-2 text-sm text-app">Low Earth</p>
                          </div>
                          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                            <p className="uppercase tracking-[0.2em]">Status</p>
                            <p className="mt-2 text-sm text-app">Nominal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-app bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Connections</p>
                      <p className="mt-2 text-3xl font-semibold">4.8k</p>
                      <p className="mt-2 text-xs text-muted">Researchers, founders, and mission operators in your orbit.</p>
                    </div>
                    <div className="rounded-2xl border border-app bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Communities</p>
                      <p className="mt-2 text-3xl font-semibold">118</p>
                      <p className="mt-2 text-xs text-muted">Structured groups covering missions, careers, and scientific fields.</p>
                    </div>
                    <div className="rounded-2xl border border-app bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Active missions</p>
                      <p className="mt-2 text-3xl font-semibold">24</p>
                      <p className="mt-2 text-xs text-muted">Collaborative mission workspaces tracked in a shared dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan">Core capabilities</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A professional platform designed for serious space collaboration</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="surface-glass rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-muted">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="communities" className="border-y border-app bg-black/10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan">Community preview</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Explore original, space-focused communities</h2>
              </div>
              <Link href="/sign-up" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View full directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {communities.map((community, index) => (
                <article key={community.name} className="surface-glass rounded-[26px] overflow-hidden">
                  <div className="h-32 bg-[radial-gradient(circle_at_top_left,_rgba(79,140,255,0.45),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.2),_rgba(139,92,246,0.35))]" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{community.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{community.description}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                        {index + 1}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm text-muted">
                      <span>{community.members} members</span>
                      <span className="flex items-center gap-2 text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {community.status}
                      </span>
                    </div>
                    <button type="button" className="mt-5 w-full rounded-full px-4 py-2.5 text-sm font-semibold button-secondary">
                      Join community
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="missions" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan">Live mission section</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A mission-control style view for collaborative workspaces</h2>
              <p className="mt-5 max-w-xl leading-8 text-muted">
                Follow mission phases, crew and organization context, discussion links, and progress summaries from a shared operational dashboard. Mission and launch values shown below are demonstration data.
              </p>
            </div>
            <div className="surface-panel rounded-[30px] p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">Mission panel</p>
                  <h3 className="mt-3 text-2xl font-semibold">Artemis Supply Corridor</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">Supporting lunar logistics modeling, cargo manifests, and systems-readiness discussion across engineering and research teams.</p>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                  Demonstration data
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {missionStats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-app bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[28px] border border-app bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Related discussion</p>
                    <p className="mt-2 text-lg font-semibold">#mission-readiness</p>
                  </div>
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Teams are reviewing power margins, cargo routing, and contingency simulations ahead of the next design checkpoint.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="learning" className="border-y border-app bg-black/10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="surface-glass rounded-[28px] p-6 lg:col-span-2">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan">Application shell preview</p>
                <h2 className="mt-4 text-3xl font-semibold">A three-column workspace built for feed, community, and mission views</h2>
                <p className="mt-4 max-w-2xl leading-8 text-muted">
                  Phase 1 establishes the layout system, dark-default design tokens, public navigation, and authenticated workspace shell that later phases will reuse for feed, communities, events, and AstroBot.
                </p>
              </div>
              <div className="surface-glass rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan">Jobs</p>
                <h3 className="mt-4 text-2xl font-semibold">Space careers in context</h3>
                <p className="mt-4 text-sm leading-7 text-muted">Surface aerospace, robotics, AI, and research opportunities next to the communities where practitioners already gather.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan">Final call to action</p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Your Next Mission Starts With a Connection</h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Orbital Community brings together the people, knowledge, and tools behind modern space work in one premium collaboration environment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/sign-up" className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold button-primary">
                Create Your Free Account
              </Link>
              <Link href="/sign-in" className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold button-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
