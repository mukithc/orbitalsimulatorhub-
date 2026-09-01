import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ALL_PLANETS, getSolarSystemPlanets } from "@/data/planets";

/**
 * Live solar-system backdrop. Renders behind page content at low opacity;
 * every screen in the redesign sits on one of these.
 *
 * Distances are compressed logarithmically — real ratios would put Neptune
 * 30x further out than Earth and off screen.
 */

const SUN_COLOR = "#efa24a";

function orbitRadius(distanceFromSunKm: number) {
  return 1.6 + Math.log10(distanceFromSunKm / 5.79e7 + 1) * 3.1;
}

function Planet({
  radius,
  color,
  size,
  speed,
  phase,
  paused,
}: {
  radius: number;
  color: string;
  size: number;
  speed: number;
  phase: number;
  paused: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || paused) return;
    const t = clock.getElapsedTime() * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });

  return (
    <mesh ref={ref} position={[radius, 0, 0]}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.65}
      />
    </mesh>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2);
    const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#4ac8e0" transparent opacity={0.14} />
    </line>
  );
}

function Starfield({ count = 260 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 26 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.09} color="#dfe8ff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene({ focus, paused }: { focus?: string; paused: boolean }) {
  const bodies = useMemo(() => {
    const list = focus
      ? ALL_PLANETS.filter((p) => p.type !== "moon")
      : getSolarSystemPlanets();
    return list.map((p, i) => ({
      slug: p.slug,
      color: p.color,
      radius: orbitRadius(p.distanceFromSunKm),
      // period ratios preserved, compressed so the outer planets still move
      speed: 0.34 / Math.pow(p.orbitalPeriodDays / 365.25, 0.42),
      size: 0.1 + Math.log10(p.radiusKm / 1000 + 1) * 0.16,
      phase: (i * Math.PI * 2) / list.length,
    }));
  }, [focus]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={2.4} color={SUN_COLOR} distance={60} />
      <mesh>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshBasicMaterial color={SUN_COLOR} />
      </mesh>
      <Starfield />
      {bodies.map((b) => (
        <group key={b.slug}>
          <OrbitRing radius={b.radius} />
          <Planet {...b} paused={paused} />
        </group>
      ))}
    </>
  );
}

export default function SolarSystemBackdrop({
  focus,
  opacity = 0.55,
  className = "",
}: {
  focus?: string;
  opacity?: number;
  className?: string;
}) {
  // scene still renders for reduced-motion users; only the animation stops
  const paused =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 9.5, 15], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene focus={focus} paused={paused} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 0%, var(--osh-bg) 78%)",
        }}
      />
    </div>
  );
}
