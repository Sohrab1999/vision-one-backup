"use client";

/**
 * HunterDrone — پهپاد تعقیب‌گر متخاصم (فاز U1-02 — نقشهٔ docs/fps-upgrade-roadmap.md §U1).
 *
 * لایهٔ رندر/رابط FSM خالص enemy.ts: تمام جهش‌های THREE داخل useFrame انجام می‌شود
 * (ADR-001) و فریز واقعی حین توقف/نگهبان خروج رایگان است — frameloop "never" کیت
 * کل حلقهٔ R3F را متوقف می‌کند و این کامپوننت هیچ تایمر جانبی ندارد (ADR-004).
 *
 * تمایز از هدف‌های واژه‌دار (ADR-005): بدنهٔ تیرهٔ باریک‌تر، چراغ کهربایی چرخان
 * بالای بدنه و **بدون برچسب متنی** — شکارش جریمه/جایزهٔ سؤال ندارد؛ فقط او را
 * می‌گریزاند. مش بدنه در همان registry رِی‌کست شلیک با id ویژهٔ «drone» ثبت می‌شود.
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneBridge, BurstApi } from "../types";
import {
  createEnemyState,
  enemyFlee,
  enemySpeedMult,
  enemyStalkDelay,
  stepEnemy,
  type EnemyState,
} from "../enemy";
import type { Difficulty } from "../constants";

/** api پهپاد برای index — الگوی BurstApi */
export interface EnemyApi {
  /** برخورد گلوله: انفجار در محل + گریز فوری FSM */
  hit: () => void;
}

/** جهش فیلد FSM پهپاد در bridge — تابع ماژول‌سطح (الگوی setStick در input.tsx — ADR-001) */
function writeEnemyPhase(b: SceneBridge, phase: SceneBridge["enemyPhase"]): void {
  b.enemyPhase = phase;
}

export function HunterDrone({
  difficulty,
  tap,
  bridge,
  registry,
  burstApi,
  apiRef,
}: {
  difficulty: Difficulty;
  tap: boolean;
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
  apiRef: React.RefObject<EnemyApi | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const st = useRef<EnemyState | null>(null);
  const { camera } = useThree();
  const v3 = useMemo(() => new THREE.Vector3(), []);

  // ثبت مش بدنه برای رِی‌کست شلیک — id ویژهٔ «drone» (خارج از هدف‌های سؤال)
  useEffect(() => {
    const m = bodyRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = "drone";
    list.push(m);
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
    };
  }, [registry]);

  // api برای index: برخورد گلوله = انفجار در محل فعلی + گریز FSM
  useEffect(() => {
    apiRef.current = {
      hit: () => {
        const s = st.current;
        if (!s) return;
        burstApi.current?.fire(v3.set(s.x, s.y, s.z), 0.85);
        enemyFlee(s);
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, burstApi, v3]);

  const enabled = difficulty !== "easy";
  const speedMult = enemySpeedMult(difficulty, tap);
  const stalkDelay = enemyStalkDelay(difficulty);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const b = bridge.current;
    if (!enabled) {
      g.visible = false;
      if (b.enemyPhase !== "idle") writeEnemyPhase(b, "idle");
      return;
    }
    if (!st.current) {
      // تولد از پشت بازیکن — موقعیت جهان فعلی او
      const baseZ = 7 + (1 - b.laneK) * 4.2;
      st.current = createEnemyState(b.pos.x, baseZ + b.pos.z + 3.2);
    }
    const dt = Math.min(delta, 0.05);
    const layout = b.layout;
    const prevPhase = st.current.phase;
    stepEnemy(st.current, {
      px: b.pos.x,
      pz: 7 + (1 - b.laneK) * 4.2 + b.pos.z,
      playerSpeed: Math.hypot(b.vel.x, b.vel.z),
      speedMult,
      stalkDelay,
      dt,
      bounds: { minX: layout.minX - 1.2, maxX: layout.maxX + 1.2, minZ: layout.minZ - 1.2, maxZ: layout.maxZ + 1.2 },
    });
    if (st.current.phase !== prevPhase || b.enemyPhase !== st.current.phase) {
      writeEnemyPhase(b, st.current.phase);
    }
    // اعمال ترنسفورم — رو به بازیکن + کج‌شدن پرواز بر سرعت جانبی گریز
    g.visible = true;
    g.position.set(st.current.x, st.current.y, st.current.z);
    g.rotation.y = st.current.face;
    g.rotation.z = st.current.phase === "flee" ? Math.sin(st.current.t * 9) * 0.18 : Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
    // روتورها همیشه چرخان
    if (rotorRef.current) rotorRef.current.rotation.y += dt * 22;
    // چراغ کهربایی: پالس آرام در گشت، تند در تعقیب، چشمک در گریز
    if (beaconRef.current) {
      const mat = beaconRef.current.material as THREE.MeshStandardMaterial;
      const hz = st.current.phase === "stalk" ? 190 : st.current.phase === "flee" ? 70 : 460;
      mat.emissiveIntensity = 1.35 + Math.sin(performance.now() / hz) * 0.75;
    }
    // پنهان‌سازی وقتی پشت دوربین نیست؟ — نه؛ مه نقشه عمق را می‌پوشاند و رادار میدان زنده است
    void camera;
  });

  // آسان: بدون پهپاد — رندر هم کال هزینه‌ای ندارد (visible false + هیچ فریمی)
  if (difficulty === "easy") return null;

  return (
    <group ref={groupRef}>
      {/* بدنهٔ کشیدهٔ متخاصم — باریک‌تر و تیره‌تر از هدف‌های واژه‌دار */}
      <mesh ref={bodyRef} scale={[0.78, 0.62, 1.18]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#151a21" flatShading roughness={0.38} metalness={0.72} emissive="#f59e0b" emissiveIntensity={0.06} />
      </mesh>
      {/* کپسول‌های روتور دوطرف (خانوادهٔ طراحی اهداف — اما تیره) */}
      <mesh position={[-0.92, 0.02, 0]} rotation-z={Math.PI / 2.6}>
        <capsuleGeometry args={[0.11, 0.5, 3, 8]} />
        <meshStandardMaterial color="#0c0f14" roughness={0.55} metalness={0.62} />
      </mesh>
      <mesh position={[0.92, 0.02, 0]} rotation-z={-Math.PI / 2.6}>
        <capsuleGeometry args={[0.11, 0.5, 3, 8]} />
        <meshStandardMaterial color="#0c0f14" roughness={0.55} metalness={0.62} />
      </mesh>
      {/* دیسک‌های روتور — گروه چرخان مشترک */}
      <group ref={rotorRef}>
        <mesh position={[-1.08, 0.2, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.36, 0.36, 0.025, 10]} />
          <meshStandardMaterial color="#0a0d11" roughness={0.75} metalness={0.35} transparent opacity={0.8} />
        </mesh>
        <mesh position={[1.08, 0.2, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.36, 0.36, 0.025, 10]} />
          <meshStandardMaterial color="#0a0d11" roughness={0.75} metalness={0.35} transparent opacity={0.8} />
        </mesh>
      </group>
      {/* چراغ شناسایی کهربایی روی دُم — تنها امضای نوری پهپاد (بدون برچسب واژه) */}
      <mesh ref={beaconRef} position={[0, 0.5, -0.42]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#78350f" emissive="#f59e0b" emissiveIntensity={1.4} roughness={0.3} />
      </mesh>
      {/* حس‌گر پیش‌رو قرمز کم‌نور */}
      <mesh position={[0, 0, 0.62]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#7f1d1d" emissive="#ff2d2d" emissiveIntensity={1.1} roughness={0.3} />
      </mesh>
    </group>
  );
}
