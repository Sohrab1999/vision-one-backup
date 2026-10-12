"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  DODGE_TRIGGER,
  DODGE_BASE,
  DODGE_WAVE_STEP,
  DODGE_MAX,
  GOLDEN_BONUS,
  GOLDEN_WINDOW_MS,
  TARGET_R,
} from "../constants";
import { clamp, easeOutCubic } from "../helpers";
import { faNum } from "../../shared";
import { makeLabelTexture, makeGoldLabelTexture } from "../textures";
import { TargetSpec, SceneBridge, BurstApi } from "../types";

export function Target({
  spec,
  registry,
  bridge,
}: {
  spec: TargetSpec;
  registry: React.RefObject<THREE.Mesh[]>;
  bridge: React.RefObject<SceneBridge>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeLabelTexture(spec.text), [spec.text]);
  const t0 = useMemo(() => Math.random() * 6, []);
  // فاز F8 — وضعیت فرار هدف غلط از نشانه (آفست جانبی + جهت + سرعت لحظه‌ای)
  const dodgeX = useRef(0);
  const dodgeDir = useRef(1);
  const dodgeVel = useRef(0);
  const projV = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => () => tex.dispose(), [tex]);

  // ثبت/حذف مش برای raycast شلیک
  useEffect(() => {
    const m = meshRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = spec.id;
    list.push(m);
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
    };
  }, [registry, spec.id]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    const b = bridge.current;
    const dt = Math.min(delta, 0.05);
    // فاز F8 — فرار هدف غلط: وقتی نزدیک مرکز نشانه است به کناره‌ها می‌گریزد
    // (خاموش در «تپ ساده» و حین فریز برخورد؛ سرعت با شمارهٔ موج بالا می‌رود)
    if (!spec.correct && b.dodge && b.flashes.length === 0) {
      projV.copy(g.position).project(state.camera);
      const centered = projV.z < 1 && Math.abs(projV.x) < DODGE_TRIGGER && projV.y > -0.35;
      if (centered) {
        if (dodgeVel.current <= 0.01) {
          // جهت گریز: به بیرون صفحه — اگر تقریباً وسط است، سمت فضای خالی‌تر لِین
          dodgeDir.current = projV.x > 0.04 ? 1 : projV.x < -0.04 ? -1 : spec.lane >= 0 ? 1 : -1;
        }
        const targetVel = DODGE_BASE + (b.wave - 1) * DODGE_WAVE_STEP;
        dodgeVel.current = Math.min(targetVel, dodgeVel.current + dt * 4.2);
      } else {
        // دور شدن نگاه = آرام‌شدن گریز (فرصت نزدیک‌شدن از زاویهٔ دیگر)
        dodgeVel.current = Math.max(0, dodgeVel.current - dt * 2.1);
      }
      dodgeX.current = clamp(dodgeX.current + dodgeDir.current * dodgeVel.current * dt, -DODGE_MAX, DODGE_MAX);
    }
    g.position.set(
      spec.lane * b.laneK + Math.sin(t * 0.5 + t0) * spec.driftAmp * b.laneK + dodgeX.current * b.laneK,
      spec.baseY + Math.sin(t * spec.bobSpeed + t0) * 0.4,
      spec.baseZ,
    );
    m.rotation.y += 0.008 * spec.spin * 60 * 0.016;
    m.rotation.x = Math.sin(t * 0.4 + t0) * 0.25;
    // فلاش سبز/قرمز پس از پاسخ + پالس حس‌گر متخاصم (قرمز کم‌نور — فاز T1)
    const mat = m.material as THREE.MeshStandardMaterial;
    const now = t * 1000;
    const f = b.flashes.find((fl) => fl.id === spec.id && now < fl.until);
    if (f) {
      mat.emissive.setHex(f.kind === "ok" ? 0x10b981 : 0xef4444);
      mat.emissiveIntensity = 1.15;
    } else {
      mat.emissive.setHex(0xff3b30);
      mat.emissiveIntensity = 0.09 + Math.sin(now / 480 + t0) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[spec.lane, spec.baseY, spec.baseZ]}>
      {/* بدنهٔ اصلی — همان مش ثبت‌شده برای رِی‌کست شلیک */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[TARGET_R, 0]} />
        <meshStandardMaterial
          color={spec.colorHex}
          flatShading
          roughness={0.42}
          metalness={0.58}
          emissive={0xff3b30}
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* کپسول‌های روتور دوطرف — حس پهپاد رزمی */}
      <mesh position={[-TARGET_R * 1.18, 0.06, 0]} rotation-z={Math.PI / 2.6}>
        <capsuleGeometry args={[0.13, 0.52, 3, 8]} />
        <meshStandardMaterial color="#23282f" roughness={0.55} metalness={0.6} />
      </mesh>
      <mesh position={[TARGET_R * 1.18, 0.06, 0]} rotation-z={-Math.PI / 2.6}>
        <capsuleGeometry args={[0.13, 0.52, 3, 8]} />
        <meshStandardMaterial color="#23282f" roughness={0.55} metalness={0.6} />
      </mesh>
      {/* دیسک روتور روی هر کپسول */}
      <mesh position={[-TARGET_R * 1.32, 0.22, 0]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 12]} />
        <meshStandardMaterial color="#14181d" roughness={0.7} metalness={0.4} transparent opacity={0.85} />
      </mesh>
      <mesh position={[TARGET_R * 1.32, 0.22, 0]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 12]} />
        <meshStandardMaterial color="#14181d" roughness={0.7} metalness={0.4} transparent opacity={0.85} />
      </mesh>
      {/* بالهٔ رادار بالا */}
      <mesh position={[0, TARGET_R * 0.92, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.3]} />
        <meshStandardMaterial color="#1d2229" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* حس‌گر قرمز رو به بازیکن — چشم دشمن */}
      <mesh position={[0, 0.02, TARGET_R * 0.78]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#7f1d1d" emissive={0xff2d2d} emissiveIntensity={1.7} roughness={0.3} />
      </mesh>
      <sprite position={[0, 1.55, 0]} scale={[2.9, 0.73, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}


export interface GoldenSpec {
  lane: number;
  y: number;
  z: number;
}

/** فاز F8/T1 — هدف ویژهٔ HVT: پاپ‌آپ ۳ثانیه‌ای بونوس — پهپاد فرمانده با حلقهٔ هشدار قرمز چرخان */
export function GoldenTarget({
  spec,
  untilRef,
  registry,
  bridge,
}: {
  spec: GoldenSpec;
  untilRef: React.RefObject<number>;
  registry: React.RefObject<THREE.Mesh[]>;
  bridge: React.RefObject<SceneBridge>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeGoldLabelTexture(`+${faNum(GOLDEN_BONUS)}`), []);
  useEffect(() => () => tex.dispose(), [tex]);

  // ثبت مش برای رِی‌کست شلیک — id ویژهٔ «golden»
  useEffect(() => {
    const m = meshRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = "golden";
    list.push(m);
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
    };
  }, [registry]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const dt = Math.min(delta, 0.05);
    const b = bridge.current;
    const now = performance.now();
    if (untilRef.current <= 0) {
      g.visible = false;
      return;
    }
    g.visible = true;
    const t = state.clock.elapsedTime;
    // ورود/خروج نرم بر اساس پنجرهٔ باقی‌مانده — جبران توقف داخل untilRef است
    const p = 1 - clamp((untilRef.current - now) / GOLDEN_WINDOW_MS, 0, 1);
    const scale = p < 0.12 ? p / 0.12 : p > 0.86 ? Math.max(0.05, (1 - p) / 0.14) : 1;
    g.scale.setScalar(Math.max(0.001, scale));
    g.position.set(spec.lane * b.laneK, spec.y + Math.sin(t * 2.7) * 0.28, spec.z);
    m.rotation.y += dt * 3.4;
    m.rotation.x = Math.sin(t * 1.8) * 0.2;
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.85 + Math.sin(now / 130) * 0.3;
    // حلقهٔ هشدار HVT — چرخش برق‌آسا حول محور عمودی
    if (ringRef.current) ringRef.current.rotation.z += dt * 2.6;
  });

  return (
    <group ref={groupRef} position={[spec.lane, spec.y, spec.z]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[TARGET_R * 1.1, 0]} />
        <meshStandardMaterial
          color="#3a3f47"
          flatShading
          roughness={0.4}
          metalness={0.62}
          emissive="#ff2d2d"
          emissiveIntensity={0.9}
        />
      </mesh>
      {/* هالهٔ قرمز هشدار */}
      <mesh scale={1.5}>
        <octahedronGeometry args={[TARGET_R * 1.1, 0]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.16} toneMapped={false} depthWrite={false} />
      </mesh>
      {/* حلقهٔ هشدار HVT — خط قرمز چرخان دور پهپاد فرمانده */}
      <mesh ref={ringRef} rotation-x={Math.PI / 2.15}>
        <torusGeometry args={[TARGET_R * 1.55, 0.045, 8, 26]} />
        <meshBasicMaterial color="#ef4444" toneMapped={false} transparent opacity={0.85} />
      </mesh>
      {/* حس‌گر قرمز رو به بازیکن */}
      <mesh position={[0, 0.02, TARGET_R * 0.82]}>
        <sphereGeometry args={[0.11, 10, 10]} />
        <meshStandardMaterial color="#7f1d1d" emissive={0xff2d2d} emissiveIntensity={2} roughness={0.3} />
      </mesh>
      <sprite position={[0, 1.5, 0]} scale={[2.1, 0.62, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

/** استخر انفجار تاکتیکی آتش/دود (فاز T1) — InstancedMesh با رنگ هر ذره */
export function Burst({ apiRef, count }: { apiRef: React.RefObject<BurstApi | null>; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const parts = useMemo(() => {
    const dirs = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.acos(2 * Math.random() - 1);
      dirs[i * 3] = Math.sin(v) * Math.cos(u);
      dirs[i * 3 + 1] = Math.cos(v);
      dirs[i * 3 + 2] = Math.sin(v) * Math.sin(u);
      speeds[i] = 1.7 + Math.random() * 2.8;
    }
    return { dirs, speeds };
  }, [count]);
  const st = useRef({ active: false, t0: 0, origin: new THREE.Vector3(), scale: 1 });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // فاز T1 — پالت آتش/دود: جرقهٔ سفیدِ داغ → نارنجی/قرمز → دود خاکستری سرد
    const c = new THREE.Color();
    const fire = [0xffe9b0, 0xffc94d, 0xff8a1e, 0xf4511e, 0xc2410c, 0x6b4423, 0x3f3f46, 0x27272a];
    const n = count;
    for (let i = 0; i < n; i++) {
      const pick = i < n * 0.28 ? fire[i % 3] : i < n * 0.62 ? fire[2 + (i % 3)] : fire[5 + (i % 3)];
      c.setHex(pick);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    // پنهان‌سازی اولیه
    const m0 = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < count; i++) mesh.setMatrixAt(i, m0);
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  useEffect(() => {
    apiRef.current = {
      fire: (origin, scale) => {
        st.current.active = true;
        st.current.t0 = performance.now();
        st.current.origin.copy(origin);
        // فاز F9 — مقیاس انفجار per-سلاح (سنگین بزرگ‌تر)
        st.current.scale = scale ?? 1;
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || !st.current.active) return;
    const t = (performance.now() - st.current.t0) / 950;
    if (t >= 1) {
      st.current.active = false;
      const m0 = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = 0; i < count; i++) mesh.setMatrixAt(i, m0);
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }
    const e = easeOutCubic(t);
    const sc = st.current.scale;
    for (let i = 0; i < count; i++) {
      const d = e * parts.speeds[i] * 2.1 * sc;
      dummy.position.set(
        st.current.origin.x + parts.dirs[i * 3] * d,
        st.current.origin.y + parts.dirs[i * 3 + 1] * d - t * t * 1.5,
        st.current.origin.z + parts.dirs[i * 3 + 2] * d,
      );
      const s = (1 - t) * 0.3 * sc;
      dummy.scale.setScalar(Math.max(0.001, s));
      dummy.rotation.set(t * 5 + i, t * 4, i * 0.7);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

