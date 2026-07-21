import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield({ reduceMotion }: { reduceMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (reduceMotion || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        sizeAttenuation
        color="#bcd4ff"
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function DriftingNebula({ reduceMotion }: { reduceMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reduceMotion || !meshRef.current) return;
    meshRef.current.rotation.z += delta * 0.02;
    meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 4;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <planeGeometry args={[70, 70]} />
      <meshBasicMaterial color="#3b1e6b" transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

function MovingPlanet({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !planetRef.current || !cloudsRef.current || !glowRef.current) return;

    const t = state.clock.elapsedTime;

    planetRef.current.rotation.y += delta * (reduceMotion ? 0.03 : 0.09);
    cloudsRef.current.rotation.y += delta * (reduceMotion ? 0.045 : 0.14);

    if (!reduceMotion) {
      groupRef.current.position.x = 8 + Math.sin(t * 0.14) * 0.9;
      groupRef.current.position.y = -1.6 + Math.cos(t * 0.2) * 0.45;
      glowRef.current.scale.setScalar(1.05 + Math.sin(t * 0.6) * 0.02);
    }
  });

  return (
    <group ref={groupRef} position={[8, -1.6, -18]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.25, 64, 64]} />
        <meshStandardMaterial
          color="#2f6ee5"
          roughness={0.88}
          metalness={0.08}
          emissive="#0b1f58"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.32, 48, 48]} />
        <meshStandardMaterial
          color="#dce8ff"
          transparent
          opacity={0.18}
          roughness={0.45}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[2.65, 48, 48]} />
        <meshBasicMaterial color="#6ebdff" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function CosmicBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [active, setActive] = useState(true);
  const [allowBackground, setAllowBackground] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const compactViewport = window.matchMedia("(max-width: 900px)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const evaluate = () => {
      setAllowBackground(!(compactViewport.matches || coarsePointer.matches));
    };

    evaluate();
    compactViewport.addEventListener("change", evaluate);
    coarsePointer.addEventListener("change", evaluate);

    return () => {
      compactViewport.removeEventListener("change", evaluate);
      coarsePointer.removeEventListener("change", evaluate);
    };
  }, []);

  if (reduceMotion || !allowBackground) return null;

  return (
    <div className="cosmic-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.35} color="#8ab5ff" />
        <directionalLight position={[6, 4, 8]} intensity={1.2} color="#c9e4ff" />
        <pointLight position={[10, -2, -10]} intensity={2.1} color="#5ab0ff" distance={42} />
        <DriftingNebula reduceMotion={reduceMotion} />
        <MovingPlanet reduceMotion={reduceMotion} />
        <Starfield reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
