import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ALL_PLANETS, getSolarSystemPlanets, type Planet } from "../data/planets";
import SolarSystemBackdrop from "../components/design/SolarSystemBackdrop";
import {
  ActionButton,
  Chip,
  Kicker,
  Panel,
  Prose,
  StatCard,
} from "../components/design/primitives";

type Scope = "planets" | "all";

function formatDistance(km: number) {
  if (km >= 1e9) return { value: (km / 1e9).toFixed(2), unit: "billion km" };
  return { value: (km / 1e6).toFixed(1), unit: "million km" };
}

function formatYear(days: number) {
  if (days < 365) return { value: days.toFixed(days < 100 ? 2 : 0), unit: "Earth days" };
  return { value: (days / 365.25).toFixed(days > 3650 ? 0 : 2), unit: "Earth years" };
}

function formatRotation(hours: number) {
  if (hours < 48) return { value: hours.toFixed(2), unit: "hours" };
  return { value: (hours / 24).toFixed(1), unit: "Earth days" };
}

const TYPE_LABEL: Record<Planet["type"], string> = {
  terrestrial: "Terrestrial",
  gas_giant: "Gas giant",
  ice_giant: "Ice giant",
  dwarf_planet: "Dwarf planet",
  moon: "Natural satellite",
};

export function PlanetHub() {
  const [scope, setScope] = useState<Scope>("planets");
  const [slug, setSlug] = useState("earth");

  const bodies = useMemo(
    () => (scope === "planets" ? getSolarSystemPlanets() : ALL_PLANETS),
    [scope],
  );

  const planet = useMemo(
    () => bodies.find((p) => p.slug === slug) ?? bodies[0],
    [bodies, slug],
  );

  const distance = formatDistance(planet.distanceFromSunKm);
  const year = formatYear(planet.orbitalPeriodDays);
  const rotation = formatRotation(planet.rotationPeriodHours);

  return (
    <div className="relative min-h-screen">
      <SolarSystemBackdrop focus={planet.slug} opacity={0.5} />

      <main className="mx-auto w-full max-w-[1240px] px-6 pb-28 pt-20 md:px-10">
        <Kicker>Planet study hub</Kicker>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* ── hero ─────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            <h1 className="text-[clamp(44px,7vw,86px)] font-extrabold leading-[0.94] tracking-[-0.035em]">
              {planet.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Chip dot={planet.color} active>
                {TYPE_LABEL[planet.type]}
              </Chip>
              <Chip>{planet.humanVisited ? "Human-visited" : "Robotic visits only"}</Chip>
              <Chip>{planet.hasRings ? "Ring system" : "No rings"}</Chip>
            </div>

            <Prose className="mt-6">{planet.researchNotes}</Prose>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/planets/${planet.slug}`}>
                <ActionButton>Explore {planet.name} →</ActionButton>
              </Link>
              <Link href={planet.simulatorLink}>
                <ActionButton variant="ghost">Open in simulator</ActionButton>
              </Link>
            </div>
          </div>

          {/* ── body rail ────────────────────────────────────────── */}
          <nav
            aria-label="Select a body"
            className="flex w-full shrink-0 flex-col gap-2 lg:w-[268px]"
          >
            <div className="mb-1 flex gap-2">
              <Chip active={scope === "planets"} onClick={() => setScope("planets")}>
                8 planets
              </Chip>
              <Chip active={scope === "all"} onClick={() => setScope("all")}>
                All bodies
              </Chip>
            </div>

            {bodies.map((body) => {
              const selected = body.slug === planet.slug;
              return (
                <div key={body.slug} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSlug(body.slug)}
                    aria-current={selected ? "true" : undefined}
                    className={`flex flex-1 items-center gap-3 rounded-osh-md border px-4 py-2.5 text-left font-mono text-[13px] transition-colors duration-150 ease-osh ${
                      selected
                        ? "border-osh-amber/45 bg-osh-amber-dim text-osh-text"
                        : "border-osh-line bg-white/[0.02] text-osh-muted hover:border-osh-line-strong hover:text-osh-text"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: body.color }}
                    />
                    {body.name}
                  </button>
                  <Link
                    href={`/planets/${body.slug}`}
                    aria-label={`Open the ${body.name} page`}
                    className="rounded-osh-sm border border-osh-line px-2.5 py-2 font-mono text-[13px] text-osh-faint transition-colors duration-150 ease-osh hover:border-osh-line-strong hover:text-osh-cyan"
                  >
                    →
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* ── readouts ───────────────────────────────────────────── */}
        <section aria-label="Physical parameters" className="mt-14 flex flex-wrap gap-3">
          <StatCard
            label="Distance from Sun"
            value={distance.value}
            unit={distance.unit}
            tone="amber"
          />
          <StatCard label="Gravity" value={planet.surfaceGravityG.toFixed(2)} unit="g (Earth = 1)" />
          <StatCard label="Avg temp" value={planet.avgTemperatureC} unit="°C" />
          <StatCard label="Orbital period" value={year.value} unit={year.unit} />
          <StatCard label="Rotation" value={rotation.value} unit={rotation.unit} />
          <StatCard label="Radius" value={planet.radiusKm.toLocaleString("en-US")} unit="km" />
          <StatCard label="Mass" value={planet.massKg} unit="kg" />
          <StatCard
            label="Moons"
            value={planet.moons}
            unit={planet.moons === 1 ? "natural satellite" : "natural satellites"}
          />
        </section>

        {/* ── detail ─────────────────────────────────────────────── */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Panel className="p-6">
            <Kicker tone="cyan">Atmosphere</Kicker>
            <Prose className="mt-3">{planet.atmosphere}</Prose>

            <Kicker tone="cyan" className="mt-7">
              Distance from Earth
            </Kicker>
            <p className="osh-num mt-2 text-[20px] text-osh-text">
              {planet.distanceFromEarthKm === 0
                ? "Reference body"
                : `${planet.distanceFromEarthKm.toLocaleString("en-US")} km`}
            </p>
          </Panel>

          <Panel className="p-6">
            <Kicker tone="cyan">Missions</Kicker>
            <ul className="mt-3 flex flex-wrap gap-2">
              {planet.missionsVisited.map((mission) => (
                <li
                  key={mission}
                  className="rounded-osh-pill border border-osh-line bg-white/[0.02] px-3 py-1.5 font-mono text-[12px] text-osh-muted"
                  style={{ borderRadius: 999 }}
                >
                  {mission}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6 lg:col-span-2">
            <Kicker tone="cyan">Notable</Kicker>
            <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
              {planet.funFacts.map((fact) => (
                <li key={fact} className="flex gap-3 text-[14px] leading-relaxed text-osh-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-osh-amber" />
                  <span className="[text-wrap:pretty]">{fact}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </main>
    </div>
  );
}
