"use client";

/**
 * WordBoss — «رئیس واژه» پهپاد فرماندهٔ چندمرحله‌ای (فاز U4-01 — نقشهٔ docs/fps-upgrade-roadmap.md §U4).
 *
 * لایهٔ رندر/رابط هستهٔ خالص boss.ts: تمام جهش‌های THREE داخل useFrame انجام می‌شود
 * (ADR-001) و فریز واقعی حین توقف/نگهبان خروج رایگان است — frameloop "never" کیت
 * کل حلقهٔ R3F را متوقف می‌کند و این کامپوننت هیچ تایمر جانبی ندارد (ADR-004).
 *
 * تمایز از هدف‌های واژه‌دار و پهپاد تعقیب‌گر (ADR-005): بدنهٔ فرماندهی بزرگ با
 * سه حلقهٔ سپر توری و تاج آنتن و **بدون برچسب متنی** — گلوله به بدنه بی‌اثر است
 * (فقط جرقه؛ سپر فقط با پاسخ درست چالش واژه‌ای می‌شکند — قانون ① §U4) و شلیک
 * حین شارژ = لغو پرتاب قفس (قانون ④ §U4). مش بدنه در همان registry با id ویژهٔ
 * «boss» ثبت می‌شود. پرتاب قفس از همان cageApi پهپاد (سرنوشت با cage.ts).
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneBridge, BurstApi } from "../types";
import {
  BOSS_STAGES,
  BOSS_STRAFE_AMP,
  bossCageCd,
  bossChargeS,
  bossInterrupt,
  bossSpeedMult,
  createBossState,
  stepBoss,
  type BossState,
} from "../boss";
import { enemySpeedMult } from "../enemy";
import type { Difficulty } from "../constants";
import type { CageApi } from "./cage";

/** api رئیس برای index — الگوی EnemyApi */
export interface BossApi {
  /** شلیک بازیکن به بدنه: حین شارژ = لغو پرتاب (true)؛ بیرون شارژ = فقط جرقه (false) — هیچ آسیبی ندارد */
  interrupt: () => boolean;
}

/** گام حلقهٔ سپر — ماژول‌سطح (الگوی writeEnemyPhase — ADR-001: جهش مش بیرون بدنهٔ رندر) */
function stepShieldRing(r: THREE.Mesh | null, alive: boolean, dt: number, charging: boolean, idx: number): void {
  if (!r) return;
  r.visible = alive;
  if (!alive) return;
  const spd = (0.5 + idx * 0.22) * (charging ? 3.4 : 1);
  if (idx === 0) r.rotation.x += dt * spd;
  else if (idx === 1) {
    r.rotation.y += dt * spd;
    r.rotation.z += dt * spd * 0.6;
  } else {
    r.rotation.x -= dt * spd * 0.7;
    r.rotation.y += dt * spd * 0.4;
  }
}

export function WordBoss({
  bridge,
  registry,
  burstApi,
  apiRef,
  stage,
  difficulty,
  tap,
  cageApi,
}: {
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
  apiRef: React.RefObject<BossApi | null>;
  /** مرحلهٔ جاری ۱..۳ — حلقه‌های i+1 >= stage دیده می‌شوند (۳→۲→۱) */
  stage: number;
  difficulty: Difficulty;
  tap: boolean;
  cageApi: React.RefObject<CageApi | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const st = useRef<BossState | null>(null);
  /** حلقه‌ای که شکستنش اعلام شده (برای انفجار یک‌بارمصرف روی تغییر stage) */
  const brokenRef = useRef(0);
  /** فروپاشی نهایی اعلام شده؟ (انفجار بزرگ یک‌بارمصرف) */
  const downFired = useRef(false);
  const inRegistry = useRef(false);
  const v3 = useMemo(() => new THREE.Vector3(), []);

  // ثبت مش بدنه برای رِی‌کست شلیک — id ویژهٔ «boss» (خارج از هدف‌های سؤال)
  useEffect(() => {
    const m = bodyRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = "boss";
    list.push(m);
    inRegistry.current = true;
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
      inRegistry.current = false;
    };
  }, [registry]);

  // api برای index: شلیک به بدنه = لغو شارژ (حین شارژ) یا فقط جرقه (بیرون شارژ)
  useEffect(() => {
    apiRef.current = {
      interrupt: () => {
        const s = st.current;
        if (!s) return false;
        if (bossInterrupt(s)) {
          burstApi.current?.fire(v3.set(s.x, s.y, s.z), 0.45);
          return true;
        }
        burstApi.current?.fire(v3.set(s.x, s.y - 0.6, s.z), 0.3);
        return false;
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, burstApi, v3]);

  // قانون ③ §U4 — آسان = رئیس منفعل (بدون سرگردانی، بدون قفس)
  const speedMult = bossSpeedMult(difficulty, tap);
  const strafeAmp = difficulty === "easy" ? 0 : BOSS_STRAFE_AMP;
  const chargeS = difficulty === "easy" ? 0 : bossChargeS(difficulty);
  const cdS = difficulty === "easy" ? 0 : bossCageCd(difficulty);
  // سرعت پرواز قفس رئیس — همان قاعدهٔ U2 (تپ ساده = نصف)
  const cageMult = enemySpeedMult(difficulty, tap);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const b = bridge.current;
    if (!g || !b) return;
    const dt = Math.min(delta, 0.05);

    // فروپاشی نهایی (قانون ⑥ §U4) — انفجار بزرگ یک‌بارمصرف + پنهان‌سازی کامل
    if (b.bossPhase === "down") {
      if (!downFired.current) {
        downFired.current = true;
        const s = st.current;
        burstApi.current?.fire(v3.set(s?.x ?? 0, s?.y ?? 2.9, s?.z ?? -10.5), 2.1);
        burstApi.current?.fire(v3.set((s?.x ?? 0) + 0.9, (s?.y ?? 2.9) - 0.5, s?.z ?? -10.5), 1.5);
        if (inRegistry.current) {
          const m = bodyRef.current;
          const list = registry.current;
          if (m && list) {
            const i = list.indexOf(m);
            if (i >= 0) list.splice(i, 1);
          }
          inRegistry.current = false;
        }
      }
      g.visible = false;
      return;
    }

    if (!st.current) st.current = createBossState();
    const s = st.current;

    stepBoss(s, { dt, speedMult, strafeAmp, chargeS, cdS });

    // پایان شارژ: پرتاب قفس از موقعیت رئیس به سینه/سر بازیکن (قانون ۳ §U2 — خطی قابل پیش‌بینی)
    if (s.justThrew) {
      s.justThrew = false;
      cageApi.current?.launch(
        { x: s.x, y: s.y, z: s.z },
        { x: b.pos.x, y: 1.55, z: 7 + (1 - b.laneK) * 4.2 + b.pos.z },
        cageMult,
      );
    }

    // شکستن حلقهٔ سپر روی تغییر stage (پراپ از index) — انفجار یک‌بارمصرف هر حلقه
    if (stage > brokenRef.current) {
      for (let i = brokenRef.current; i < stage && i < BOSS_STAGES; i++) {
        burstApi.current?.fire(v3.set(s.x, s.y, s.z), 1.15 + i * 0.15);
      }
      brokenRef.current = stage;
    }

    // اعمال ترنسفورم — رو به بازیکن + لرزش ظریف حین شارژ تله‌گراف
    const pwz = 7 + (1 - b.laneK) * 4.2 + b.pos.z;
    g.visible = true;
    const shake = s.chargeT >= 0 ? Math.sin(state.clock.elapsedTime * 46) * 0.045 : 0;
    g.position.set(s.x + shake, s.y, s.z);
    g.rotation.y = Math.atan2(b.pos.x - s.x, pwz - s.z);

    // روتورهای جانبی همیشه چرخان
    if (rotorRef.current) rotorRef.current.rotation.y += dt * 17;

    // حلقه‌های سپر: دیده‌شدن (i+1 >= stage) + چرخش آرام + شتاب حین شارژ — توابع ماژول‌سطح (ADR-001)
    const charging = s.chargeT >= 0;
    stepShieldRing(ringARef.current, 1 >= stage, dt, charging, 0);
    stepShieldRing(ringBRef.current, 2 >= stage, dt, charging, 1);
    stepShieldRing(ringCRef.current, 3 >= stage, dt, charging, 2);

    // هستهٔ حس‌گر — تله‌گراف شارژ: تندچشمک قرمز (قانون ۴ §U4) / پالس آرام بیرون شارژ
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      const charging = s.chargeT >= 0;
      mat.emissiveIntensity = charging
        ? 2.4 + Math.sin(performance.now() / 70) * 1.1
        : 1.0 + Math.sin(performance.now() / 430) * 0.35;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* بدنهٔ فرماندهی بزرگ — تقریباً ۳ برابر پهپاد تعقیب‌گر (بدنهٔ شلیک‌پذیر — registry id: boss) */}
      <mesh ref={bodyRef} scale={[2.3, 1.75, 2.3]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#141920" flatShading roughness={0.34} metalness={0.78} emissive="#f59e0b" emissiveIntensity={0.08} />
      </mesh>
      {/* کمربند کهربایی بدنه — امضای فرماندهی */}
      <mesh position={[0, -0.35, 0]} scale={[1.9, 0.28, 1.9]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#3a2a10" roughness={0.4} metalness={0.7} emissive="#b45309" emissiveIntensity={0.55} />
      </mesh>
      {/* کپسول‌های روتور دوطرف — خانوادهٔ طراحی دشمنان */}
      <mesh position={[-2.5, 0.05, 0]} rotation-z={Math.PI / 2.5}>
        <capsuleGeometry args={[0.2, 1.15, 3, 8]} />
        <meshStandardMaterial color="#0b0e13" roughness={0.55} metalness={0.66} />
      </mesh>
      <mesh position={[2.5, 0.05, 0]} rotation-z={-Math.PI / 2.5}>
        <capsuleGeometry args={[0.2, 1.15, 3, 8]} />
        <meshStandardMaterial color="#0b0e13" roughness={0.55} metalness={0.66} />
      </mesh>
      <group ref={rotorRef}>
        <mesh position={[-2.85, 0.35, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.62, 0.62, 0.03, 12]} />
          <meshStandardMaterial color="#080b0f" roughness={0.75} metalness={0.35} transparent opacity={0.8} />
        </mesh>
        <mesh position={[2.85, 0.35, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.62, 0.62, 0.03, 12]} />
          <meshStandardMaterial color="#080b0f" roughness={0.75} metalness={0.35} transparent opacity={0.8} />
        </mesh>
      </group>
      {/* تاج آنتن سه‌شاخ — سیلوئت متمایز رئیس */}
      <mesh position={[0, 1.05, 0]}>
        <coneGeometry args={[0.1, 0.6, 6]} />
        <meshStandardMaterial color="#1c232d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[-0.32, 0.9, 0]} rotation-z={0.35}>
        <coneGeometry args={[0.07, 0.45, 6]} />
        <meshStandardMaterial color="#1c232d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.9, 0]} rotation-z={-0.35}>
        <coneGeometry args={[0.07, 0.45, 6]} />
        <meshStandardMaterial color="#1c232d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#78350f" emissive="#f59e0b" emissiveIntensity={1.6} roughness={0.3} />
      </mesh>
      {/* هستهٔ حس‌گر قرمز رو به بازیکن — تله‌گراف شارژ (بدون برچسب — ADR-005) */}
      <mesh ref={coreRef} position={[0, 0, 1.55]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshStandardMaterial color="#7f1d1d" emissive="#ff2d2d" emissiveIntensity={1.0} roughness={0.3} />
      </mesh>
      {/* سه حلقهٔ سپر توری — هر مرحله یکی می‌شکند (کهربایی → قرمز با نزدیک‌شدن به فروپاشی) */}
      <mesh ref={ringARef} rotation-x={Math.PI / 2.4}>
        <torusGeometry args={[1.85, 0.05, 6, 40]} />
        <meshStandardMaterial color="#92400e" emissive="#f59e0b" emissiveIntensity={0.75} roughness={0.35} metalness={0.7} transparent opacity={0.92} />
      </mesh>
      <mesh ref={ringBRef} rotation-y={Math.PI / 3}>
        <torusGeometry args={[2.2, 0.045, 6, 44]} />
        <meshStandardMaterial color="#9a3412" emissive="#fb923c" emissiveIntensity={0.65} roughness={0.35} metalness={0.7} transparent opacity={0.85} />
      </mesh>
      <mesh ref={ringCRef} rotation-x={-Math.PI / 3.2} rotation-z={Math.PI / 5}>
        <torusGeometry args={[2.55, 0.04, 6, 48]} />
        <meshStandardMaterial color="#991b1b" emissive="#ef4444" emissiveIntensity={0.6} roughness={0.35} metalness={0.7} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
