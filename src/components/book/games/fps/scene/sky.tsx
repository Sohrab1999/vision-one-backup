"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MapConfig } from "../maps";

export function StarField() {
  const geo = useMemo(() => {
    const N = 150;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // پخش روی گنبد آسمان — بالای افق
      const a = Math.random() * Math.PI * 2;
      const el = 0.08 + Math.random() * 1.25;
      const r = 38 + Math.random() * 14;
      pos[i * 3] = Math.cos(a) * Math.cos(el) * r;
      pos[i * 3 + 1] = Math.sin(el) * r;
      pos[i * 3 + 2] = Math.sin(a) * Math.cos(el) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <points geometry={geo} frustumCulled={false}>
      <pointsMaterial color="#e2e8f0" size={0.34} sizeAttenuation transparent opacity={0.85} fog={false} />
    </points>
  );
}

/** فاز F7 — خورشید/ماه درخشان با هالهٔ نرم (fog=false — دورتر از مه است) */
export function SkyOrb({ orb }: { orb: NonNullable<MapConfig["orb"]> }) {
  return (
    <group position={orb.pos}>
      <mesh>
        <sphereGeometry args={[orb.r, 20, 20]} />
        <meshBasicMaterial color={orb.color} toneMapped={false} fog={false} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[orb.r, 16, 16]} />
        <meshBasicMaterial color={orb.color} transparent opacity={0.2} toneMapped={false} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** فاز F7 — ابرهای low-poly چرخان دور میدان (دستگیرهٔ دور = حرکت مداری آرام) */
export function CloudDrift({ count, color }: { count: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  const specs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: `c${i}`,
        r: 17 + Math.random() * 9,
        y: 6.5 + Math.random() * 3.5,
        speed: 0.014 + Math.random() * 0.012,
        a0: (i / Math.max(1, count)) * Math.PI * 2,
        s: 1 + Math.random() * 0.8,
      })),
    [count],
  );
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < g.children.length; i++) {
      const sp = specs[i];
      if (!sp) break;
      const c = g.children[i];
      const a = sp.a0 + t * sp.speed;
      c.position.set(Math.cos(a) * sp.r, sp.y + Math.sin(t * 0.25 + i) * 0.3, Math.sin(a) * sp.r - 7);
      c.rotation.y = -a;
    }
  });
  const mat = <meshStandardMaterial color={color} flatShading roughness={1} transparent opacity={0.85} />;
  return (
    <group ref={ref}>
      {specs.map((sp) => (
        <group key={sp.key} scale={sp.s}>
          <mesh>{mat}</mesh>
          <mesh position={[1.5, -0.25, 0.3]} scale={0.72}>
            {mat}
          </mesh>
          <mesh position={[-1.5, -0.3, -0.2]} scale={0.6}>
            {mat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

