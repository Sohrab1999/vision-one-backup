"use client";

/**
 * Cage — قفس واژهٔ پرتابی پهپاد تعقیب‌گر (فاز U2-01 — نقشهٔ docs/fps-upgrade-roadmap.md §U2).
 *
 * لایهٔ رندر/رابط هستهٔ خالص cage.ts: همهٔ جهش‌های THREE داخل useFrame انجام می‌شود
 * (ADR-001) و فریز واقعی حین توقف/نگهبان خروج رایگان است — frameloop "never" کیت
 * کل حلقهٔ R3F را متوقف می‌کند و این کامپوننت هیچ تایمر جانبی ندارد (ADR-004).
 *
 * تمایز از هدف‌های واژه‌دار (ADR-005): قفس سیمی کهربایی با هستهٔ درخشان و **بدون
 * برچسب متنی** — شکارش امتیاز ندارد (اقتصاد امتیاز دست‌نخورده — قانون ۶ §U2)؛
 * فقط قفس را نجات می‌دهد. مش قفس در همان registry با id ویژهٔ «cage» ثبت می‌شود.
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneBridge, BurstApi } from "../types";
import { cageEta, createCageState, stepCage, type CageState, type CageVec3 } from "../cage";

/** api قفس برای index و پهپاد — الگوی BurstApi/EnemyApi */
export interface CageApi {
  /** پرتاب قفس (فراخوانی از scene/drone در پایان شارژ) — در اولین فریم مصرف می‌شود */
  launch: (from: CageVec3, to: CageVec3, speedMult: number) => void;
  /** منهدم با شلیک — true = واقعاً در پرواز بود (شمارندهٔ تله‌متری فقط یک‌بار) */
  destroy: () => boolean;
}

/** ارتفاع هدف قفس — سینه/سر بازیکن (دوربین ~۱٫۷ ایستاده — physics.ts) */
const CAGE_TARGET_Y = 1.55;

/** نوشته‌های bridge قفس — توابع ماژول‌سطح (الگوی writeEnemyPhase در drone.tsx — ADR-001) */
function writeCageEta(b: SceneBridge, eta: number): void {
  b.cageEta = eta;
}
function flagCageHit(b: SceneBridge): void {
  b.cageHit = true;
}
function flagCageWhiff(b: SceneBridge): void {
  b.cageWhiff = true;
}

/** غیرفعال‌سازی مشترک: خروج از registry + پنهان‌سازی گروه — تابع ماژول‌سطح (الگوی writeEnemyPhase — ADR-001) */
function deactivateCage(
  st: React.MutableRefObject<CageState | null>,
  body: THREE.Mesh | null,
  registry: React.RefObject<THREE.Mesh[]>,
  inRegistry: React.MutableRefObject<boolean>,
  group: THREE.Group | null,
): void {
  st.current = null;
  const list = registry.current;
  if (inRegistry.current && list && body) {
    const i = list.indexOf(body);
    if (i >= 0) list.splice(i, 1);
    inRegistry.current = false;
  }
  if (group) group.visible = false;
}

export function Cage({
  bridge,
  registry,
  burstApi,
  apiRef,
  onLaunch,
}: {
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
  apiRef: React.RefObject<CageApi | null>;
  /** رویداد پرتاب برای index (اعلام aria-live + شمارندهٔ تله‌متری) — stable useCallback */
  onLaunch: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const st = useRef<CageState | null>(null);
  /** پرتاب در صف — در اولین فریم مصرف می‌شود (api از فریم پهپاد فراخوانی می‌شود) */
  const pending = useRef<{ from: CageVec3; to: CageVec3; speedMult: number } | null>(null);
  /** ثبت‌شده در registry؟ — فقط روی گذار فعال/غیرفعال دست می‌زنیم */
  const inRegistry = useRef(false);
  const v3 = useMemo(() => new THREE.Vector3(), []);

  // ثبت شناسهٔ مش قفس برای رِی‌کست شلیک — id ویژهٔ «cage» (خارج از هدف‌های سؤال)
  useEffect(() => {
    const m = bodyRef.current;
    if (!m) return;
    m.userData.id = "cage";
    const list = registry.current;
    return () => {
      const i = list?.indexOf(m) ?? -1;
      if (i >= 0) list?.splice(i, 1);
      inRegistry.current = false;
    };
  }, [registry]);

  // api برای index و پهپاد — الگوی EnemyApi (onLaunch از index stable است)
  useEffect(() => {
    apiRef.current = {
      launch: (from, to, speedMult) => {
        pending.current = { from, to, speedMult };
      },
      destroy: () => {
        const s = st.current;
        if (!s || !s.active) return false;
        burstApi.current?.fire(v3.set(s.x, s.y, s.z), 0.7);
        deactivateCage(st, bodyRef.current, registry, inRegistry, groupRef.current);
        return true;
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, burstApi, v3, registry, onLaunch]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    const b = bridge.current;
    if (!g || !b) return;

    // مصرف پرتاب صف‌شده (فراخوانی api پهپاد در همین فریم یا قبلی)
    const p = pending.current;
    if (p) {
      pending.current = null;
      st.current = createCageState(p.from, p.to, p.speedMult);
      onLaunch();
    }

    const s = st.current;
    if (!s || !s.active) {
      if (b.cageEta !== 0) writeCageEta(b, 0);
      return;
    }

    // موقعیت فعلی بازیکن در فضای جهان — همان نگاشت پهپاد (scene/drone)
    const px = b.pos.x;
    const pz = 7 + (1 - b.laneK) * 4.2 + b.pos.z;
    const py = CAGE_TARGET_Y - b.crouchAmt * 0.5;

    const ev = stepCage(s, px, py, pz, Math.min(delta, 0.05));
    if (ev === "hit") {
      // برخورد به بازیکن — رویداد یک‌بارمصرف برای index (❤ −۱ در مسیر مستقل سؤال)
      flagCageHit(b);
      burstApi.current?.fire(v3.set(s.x, s.y, s.z), 0.6);
      deactivateCage(st, bodyRef.current, registry, inRegistry, g);
      return;
    }
    if (ev === "whiff") {
      // خطا رفت — بازیکن جابه‌جا شد؛ بدون جریمه (قانون ۳ §U2)
      flagCageWhiff(b);
      deactivateCage(st, bodyRef.current, registry, inRegistry, g);
      return;
    }

    // ثبت در registry فقط روی گذار فعال‌شدن
    const list = registry.current;
    const m = bodyRef.current;
    if (!inRegistry.current && list && m) {
      list.push(m);
      inRegistry.current = true;
    }

    // نوشته‌های bridge — countdown چیپ HUD (خواندهٔ index هر ۲۰۰ms)
    writeCageEta(b, Math.round(cageEta(s) * 100) / 100);

    // اعمال ترنسفورم — چرخش قفس + حلقه‌های مداری
    g.visible = true;
    g.position.set(s.x, s.y, s.z);
    g.rotation.y = s.spin;
    if (ringARef.current) ringARef.current.rotation.x = s.spin * 0.9;
    if (ringBRef.current) ringBRef.current.rotation.z = -s.spin * 1.2;
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* قفس سیمی هشت‌وجهی کهربایی — بدنهٔ شلیک‌پذیر (registry id: cage) */}
      <mesh ref={bodyRef}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.95} />
      </mesh>
      {/* دو حلقهٔ مداری قفل‌شونده — حس قفس فلزی چرخان */}
      <mesh ref={ringARef}>
        <torusGeometry args={[0.52, 0.018, 6, 24]} />
        <meshStandardMaterial color="#92400e" roughness={0.4} metalness={0.7} emissive="#f59e0b" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={ringBRef} rotation-y={Math.PI / 2}>
        <torusGeometry args={[0.52, 0.018, 6, 24]} />
        <meshStandardMaterial color="#92400e" roughness={0.4} metalness={0.7} emissive="#f59e0b" emissiveIntensity={0.35} />
      </mesh>
      {/* هستهٔ انرژی درون قفس — تنها امضای نوری (بدون برچسب واژه — ADR-005) */}
      <mesh>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshStandardMaterial color="#78350f" emissive="#fbbf24" emissiveIntensity={2.1} roughness={0.3} />
      </mesh>
    </group>
  );
}
