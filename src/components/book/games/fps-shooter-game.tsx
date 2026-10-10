"use client";

/**
 * بازی «شوتر آموزشی اول‌شخص» (Educational FPS) — فاز ۵ نقشه راه جامع ۲۰۲۶.
 *
 * میدان low-poly رنگی با three.js/@react-three/fiber (چانک جدا و lazy — صفر تأثیر روی بقیهٔ اپ):
 * - «شکار واژه»: معنی فارسی روی HUD، هدف‌های متحرک واژهٔ انگلیسی دارند.
 * - «سد گرامری»: جملهٔ ناقص روی HUD، هدف‌ها همان ۴ گزینهٔ تستاند.
 * - شلیک به هدف درست = انفجار رنگین‌کمانی + امتیاز و کمبو + تلفظ؛ شلیک به هدف غلط یا پایان
 *   زمان = یک ❤ کم و واژه به صف «مرور هوشمند» برمی‌گردد. شلیک به خالی (خطا رفت) جریمه ندارد
 *   ولی بین شلیک‌ها فاصلهٔ کوتاه هست تا اسپم بی‌فایده نباشد.
 * - کنترل دسکتاپ: کلیک اول Pointer Lock، حرکت موس نشانه‌گیری و کلیک بعدی شلیک از رتیکل.
 * - کنترل لمسی: کشیدن = نگاه، تپ روی هدف = شلیک همان هدف.
 * - حالت دسترس‌پذیری «تپ ساده»: بدون قفل نشانگر و شلیک دقیق — تپ روی هدف کافی است؛
 *   روی کیبورد هم کلیدهای ۱ تا ۴ از چپ به راست هدف انتخاب می‌کنند.
 * - کارایی: هندسهٔ رویه‌ای بدون بافت سنگین، دو نور ساده، سقف draw-call، dpr محدود و
 *   تشخیص خودکار دستگاه ضعیف (کاهش ذرات انفجار، antialias و dpr).
 * - امتیاز با مدل Attempt (category = fps-shooter) ثبت و رکورد شخصی per-scope ذخیره می‌شود.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  CheckCircle2,
  Crosshair,
  Flame,
  Heart,
  MousePointerClick,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Swords,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";

// ─── ثابت‌ها ───

const GAME_KEY = "fps-shooter";
const ALL_LESSONS = -1;
const HEARTS = 3;
/** خط عمودی لِین‌ها (عرض صحنه) — در پرتره با laneK جمع می‌شود */
const LANE_X = [-5.4, -1.85, 1.85, 5.4];
const TARGET_R = 0.85;
const SHOOT_BASE = 10;
const COMBO_STEP = 2;
const COMBO_CAP = 6;
/** توقف بین سؤال‌ها برای دیدن انفجار */
const HIT_FREEZE_MS = 750;
/** فاصلهٔ حداقلی بین دو شلیک (جلوگیری از اسپم) */
const SHOOT_COOLDOWN = 550;
const Q_TIME_SHOOT = 12;
const Q_TIME_TAP = 15;
const MIN_POOL_WORD = 4;
const MIN_POOL_QUIZ = 3;
const BURST_FULL = 36;
const BURST_WEAK = 16;

type Phase = "setup" | "playing" | "done";
type Mode = "word-hunt" | "grammar-gate";

/** پیکربندی یک هدف متحرک */
interface TargetSpec {
  id: string;
  /** برچسب انگلیسی روی بیلبورد */
  text: string;
  correct: boolean;
  lane: number;
  baseY: number;
  baseZ: number;
  spin: number;
  bobSpeed: number;
  driftAmp: number;
  colorHex: number;
}

interface Question {
  seq: number;
  mode: Mode;
  /** دستور کوتاه فارسی */
  promptFa: string;
  /** محتوای اصلی سؤال — فارسی (معنی) یا انگلیسی (جمله) */
  promptMain: string;
  promptSub?: string;
  /** متن سؤال LTR است؟ */
  ltr: boolean;
  targets: TargetSpec[];
  speakText: string;
  /** کلید SRS (واژهٔ انگلیسی درست) */
  srsKey: string;
  lesson: number;
}

interface WrongItem {
  label: string;
  sub?: string;
}

interface FlashEntry {
  id: string;
  kind: "ok" | "bad";
  until: number;
}

interface SceneBridge {
  aim: { yaw: number; pitch: number };
  shoot: { x: number; y: number; seq: number };
  lastShotAt: number;
  laneK: number;
  flashes: FlashEntry[];
  onHit: (id: string | null) => void;
}

interface BurstApi {
  fire: (origin: THREE.Vector3) => void;
}

/** شکل رکورد شخصی — بهتر = امتیاز بیشتر */
interface BestRecord {
  score: number;
}

// ─── کمکی‌های خالص ───

function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

function qLabel(text: string): string {
  return text.replace(/_+/g, "......");
}

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

function scopeOf(mode: Mode, tap: boolean): string {
  return `${mode === "word-hunt" ? "word" : "grammar"}${tap ? "-tap" : ""}`;
}

function modeName(mode: Mode): string {
  return mode === "word-hunt" ? "شکار واژه" : "سد گرامری";
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** مسیر مستطیل گرد (سازگار با همهٔ مرورگرها) */
function rrPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** بافت بیلبورد گزینه — قرص سفید با متن انگلیسی تیره (رویه‌ای، بدون فونت خارجی) */
function makeLabelTexture(text: string): THREE.CanvasTexture {
  const W = 640;
  const Hc = 160;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = Hc;
  const c = cv.getContext("2d");
  if (c) {
    let fs = 64;
    c.font = `800 ${fs}px system-ui, sans-serif`;
    while (c.measureText(text).width > W - 96 && fs > 24) {
      fs -= 3;
      c.font = `800 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(text).width, W - 96);
    const pw = Math.min(tw + 56, W - 24);
    const ph = 102;
    const px = (W - pw) / 2;
    const py = (Hc - ph) / 2;
    c.fillStyle = "rgba(255,255,255,0.95)";
    rrPath(c, px, py, pw, ph, 34);
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "rgba(6,95,70,0.35)";
    rrPath(c, px + 3, py + 3, pw - 6, ph - 6, 30);
    c.stroke();
    c.fillStyle = "#065f46";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, Hc / 2 + 4, W - 90);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return tex;
}

/** چیدمان هدف‌ها روی ۴ لِین با ارتفاع/عمق/حرکت متفاوت */
function layoutTargets(
  opts: Array<{ text: string; correct: boolean }>,
): TargetSpec[] {
  const lanes = shuffle([0, 1, 2, 3]);
  const colors = [0x10b981, 0xf59e0b, 0x14b8a6, 0x34d399];
  return opts.map((o, i) => ({
    id: `t${i}`,
    text: o.text,
    correct: o.correct,
    lane: LANE_X[lanes[i]],
    baseY: 1.35 + (i % 2) * 0.85 + Math.random() * 0.35,
    baseZ: -(7.5 + Math.floor(i / 2) * 3.1) - Math.random() * 1.4,
    spin: 0.5 + Math.random() * 0.7,
    bobSpeed: 0.8 + Math.random() * 0.7,
    driftAmp: 0.5 + Math.random() * 0.8,
    colorHex: colors[i % colors.length],
  }));
}

function buildWordQuestion(seq: number, target: VocabEntry, distrPool: VocabEntry[], lesson: number): Question {
  const others = pickUnique(
    distrPool.filter((w) => w.word !== target.word),
    3,
    (w) => w.word,
  );
  const opts = shuffle([
    { text: target.word, correct: true },
    ...others.map((w) => ({ text: w.word, correct: false })),
  ]);
  return {
    seq,
    mode: "word-hunt",
    promptFa: "معنی را خواندی؟ واژهٔ درست را شکار کن!",
    promptMain: target.meaning,
    promptSub: target.pos ?? "واژهٔ درس",
    ltr: false,
    targets: layoutTargets(opts),
    speakText: target.word,
    srsKey: target.word,
    lesson,
  };
}

function buildGrammarQuestion(seq: number, s: QuizQuestionSeed, lesson: number): Question {
  const opts = s.options.map((text, i) => ({ text, correct: i === s.answer }));
  return {
    seq,
    mode: "grammar-gate",
    promptFa: "سد گرامری! گزینهٔ درست را شکار کن",
    promptMain: qLabel(s.text),
    promptSub: s.scope,
    ltr: true,
    targets: layoutTargets(opts),
    speakText: s.text.replace(/_+/, s.options[s.answer]),
    srsKey: s.options[s.answer],
    lesson,
  };
}

// ─── اجزای صحنهٔ سه‌بعدی ───

/** به‌روزرسانی دوربین اول‌شخص — تابع ماژول‌سطح (جهش THREE فقط از اینجا) */
function applyRig(cam: THREE.Camera, b: SceneBridge, aspect: number): void {
  b.laneK = Math.max(0.55, Math.min(1, aspect / 1.5));
  cam.position.z = 7 + (1 - b.laneK) * 4.2;
  cam.rotation.y = b.aim.yaw;
  cam.rotation.x = b.aim.pitch;
}

/** تنظیم اولیهٔ دوربین — تابع ماژول‌سطح */
function initRig(cam: THREE.Camera): void {
  cam.position.set(0, 1.7, 7);
  cam.rotation.order = "YXZ";
}

/** دوربین اول‌شخص — چرخش از bridge + تطبیق عرض صحنه در پرتره */
function Rig({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const { camera, size } = useThree();
  useEffect(() => {
    initRig(camera);
  }, [camera]);
  useFrame(() => {
    applyRig(camera, bridge.current, size.width / Math.max(1, size.height));
  });
  return null;
}

/** میدان low-poly: زمین، کوه‌های دوردست و اجسام شناور تزئینی */
function Arena({ weak }: { weak: boolean }) {
  const deco = useMemo(
    () =>
      shuffle(
        Array.from({ length: weak ? 8 : 14 }, (_, i) => ({
          key: `d${i}`,
          kind: (i % 3 === 0 ? "octa" : i % 3 === 1 ? "box" : "dodeca") as "octa" | "box" | "dodeca",
          pos: [
            (i % 2 === 0 ? 1 : -1) * (7.5 + Math.random() * 8),
            0.8 + Math.random() * 4.2,
            -4 - Math.random() * 18,
          ] as [number, number, number],
          hue: [0x0d9488, 0x059669, 0xd97706, 0x10b981][i % 4],
          spin: 0.2 + Math.random() * 0.4,
          bob: 0.4 + Math.random() * 0.5,
          scale: 0.5 + Math.random() * 1.1,
        })),
      ),
    [weak],
  );
  const mounts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        key: `m${i}`,
        pos: [-24 + i * 9.5 + Math.random() * 4, 0, -26 - Math.random() * 6] as [number, number, number],
        h: 5 + Math.random() * 5,
        r: 3 + Math.random() * 2.4,
      })),
    [],
  );
  return (
    <>
      <color attach="background" args={["#062e24"]} />
      <fog attach="fog" args={["#062e24", 10, 36]} />
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#a7f3d0", "#064e3b", 0.55]} />
      <directionalLight position={[5, 9, 3]} intensity={1.1} />
      {/* زمین دایره‌ای */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -7]}>
        <circleGeometry args={[30, 44]} />
        <meshStandardMaterial color="#0a4335" roughness={0.95} />
      </mesh>
      {/* حلقه‌های راهنمای زمین */}
      {[5.4, 9.2, 13.4].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.02, -7]}>
          <ringGeometry args={[r, r + 0.22, 52]} />
          <meshBasicMaterial color={i === 0 ? "#f59e0b" : "#10b981"} transparent opacity={0.3 - i * 0.07} />
        </mesh>
      ))}
      {/* کوه‌های low-poly دوردست */}
      {mounts.map((m) => (
        <mesh key={m.key} position={m.pos}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color="#065f46" flatShading roughness={1} />
        </mesh>
      ))}
      {/* اجسام شناور تزئینی */}
      {deco.map((d) => (
        <DecoShape key={d.key} spec={d} />
      ))}
    </>
  );
}

interface DecoSpec {
  key: string;
  kind: "octa" | "box" | "dodeca";
  pos: [number, number, number];
  hue: number;
  spin: number;
  bob: number;
  scale: number;
}

function DecoShape({ spec }: { spec: DecoSpec }) {
  const ref = useRef<THREE.Mesh>(null);
  const t0 = useMemo(() => Math.random() * 8, []);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = spec.pos[1] + Math.sin(t * spec.bob + t0) * 0.55;
    m.rotation.y = t * spec.spin;
    m.rotation.x = t * spec.spin * 0.55;
  });
  return (
    <mesh ref={ref} position={spec.pos} scale={spec.scale}>
      {spec.kind === "octa" ? (
        <octahedronGeometry args={[1, 0]} />
      ) : spec.kind === "box" ? (
        <boxGeometry args={[1.3, 1.3, 1.3]} />
      ) : (
        <dodecahedronGeometry args={[1, 0]} />
      )}
      <meshStandardMaterial color={spec.hue} flatShading roughness={0.6} metalness={0.12} />
    </mesh>
  );
}

/** یک هدف متحرک: اوکتاهدر درخشان + بیلبورد برچسب انگلیسی */
function Target({
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

  useFrame((state) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    const b = bridge.current;
    g.position.set(
      spec.lane * b.laneK + Math.sin(t * 0.5 + t0) * spec.driftAmp * b.laneK,
      spec.baseY + Math.sin(t * spec.bobSpeed + t0) * 0.4,
      spec.baseZ,
    );
    m.rotation.y += 0.008 * spec.spin * 60 * 0.016;
    m.rotation.x = Math.sin(t * 0.4 + t0) * 0.25;
    // فلاش سبز/قرمز پس از پاسخ + تنفس ملایم
    const mat = m.material as THREE.MeshStandardMaterial;
    const now = t * 1000;
    const f = b.flashes.find((fl) => fl.id === spec.id && now < fl.until);
    if (f) {
      mat.emissive.setHex(f.kind === "ok" ? 0x10b981 : 0xef4444);
      mat.emissiveIntensity = 1.15;
    } else {
      mat.emissive.setHex(spec.colorHex);
      mat.emissiveIntensity = 0.24 + Math.sin(now / 420 + t0) * 0.09;
    }
  });

  return (
    <group ref={groupRef} position={[spec.lane, spec.baseY, spec.baseZ]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[TARGET_R, 0]} />
        <meshStandardMaterial
          color={spec.colorHex}
          flatShading
          roughness={0.35}
          metalness={0.15}
          emissive={spec.colorHex}
          emissiveIntensity={0.25}
        />
      </mesh>
      <sprite position={[0, 1.55, 0]} scale={[2.9, 0.73, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

/** استخر انفجار رنگین‌کمانی — InstancedMesh با رنگ هر ذره */
function Burst({ apiRef, count }: { apiRef: React.RefObject<BurstApi | null>; count: number }) {
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
  const st = useRef({ active: false, t0: 0, origin: new THREE.Vector3() });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // رنگ هر ذره — پالت رنگین‌کمان
    const c = new THREE.Color();
    const rainbow = [0xf43f5e, 0xf97316, 0xfacc15, 0x22c55e, 0x14b8a6, 0x38bdf8, 0xa78bfa, 0xf472b6];
    for (let i = 0; i < count; i++) {
      c.setHex(rainbow[i % rainbow.length]);
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
      fire: (origin) => {
        st.current.active = true;
        st.current.t0 = performance.now();
        st.current.origin.copy(origin);
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
    for (let i = 0; i < count; i++) {
      const d = e * parts.speeds[i] * 2.1;
      dummy.position.set(
        st.current.origin.x + parts.dirs[i * 3] * d,
        st.current.origin.y + parts.dirs[i * 3 + 1] * d - t * t * 1.5,
        st.current.origin.z + parts.dirs[i * 3 + 2] * d,
      );
      const s = (1 - t) * 0.3;
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

/** پردازش درخواست شلیک: raycast از دوربین به نقطه — انفجار + گزارش برخورد */
function World({
  bridge,
  registry,
  burstApi,
}: {
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
}) {
  const { camera } = useThree();
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const v2 = useMemo(() => new THREE.Vector2(), []);
  const lastSeq = useRef(0);
  useFrame(() => {
    const b = bridge.current;
    const req = b.shoot;
    if (req.seq === lastSeq.current) return;
    lastSeq.current = req.seq;
    v2.set(req.x, req.y);
    ray.setFromCamera(v2, camera);
    const hits = ray.intersectObjects(registry.current ?? [], false);
    const first = hits.find((h) => h.object.visible);
    if (first) {
      burstApi.current?.fire(first.point);
      b.onHit((first.object.userData.id as string | undefined) ?? null);
    } else {
      b.onHit(null);
    }
  });
  return null;
}

// ─── بازی اصلی ───

export function FpsShooterGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("word-hunt");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [tapMode, setTapMode] = useState(false);
  const [locked, setLocked] = useState(false);

  // ── HUD حین بازی ──
  const [q, setQ] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  const [timeLeft, setTimeLeft] = useState(Q_TIME_SHOOT);

  // ── stateهای فاز done ──
  const [isRecord, setIsRecord] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);

  // ── استخر داده ──
  const vocabAll = data.vocab.all;
  const quizSeed = data.quiz.seed;
  const wordPool = useMemo(
    () => (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson)),
    [vocabAll, lesson],
  );
  const quizPool = useMemo(
    () => (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson)),
    [quizSeed, lesson],
  );
  const wordLessons = data.vocab.lessons;
  const quizLessons = useMemo(
    () => [...new Set(quizSeed.map((s) => s.lesson))].sort((a, b) => a - b),
    [quizSeed],
  );
  const poolOk = mode === "word-hunt" ? wordPool.length >= MIN_POOL_WORD : quizPool.length >= MIN_POOL_QUIZ;
  const poolCount = mode === "word-hunt" ? wordPool.length : quizPool.length;

  // تشخیص دستگاه ضعیف — کاهش ذرات/antialias/dpr
  const weak = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as Navigator & { deviceMemory?: number };
    return (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  }, []);
  const isCoarse = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // ── دنیای بازی — مالک: رویدادها و refs ──
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bridge = useRef<SceneBridge>({
    aim: { yaw: 0, pitch: 0 },
    shoot: { x: 0, y: 0, seq: 0 },
    lastShotAt: 0,
    laneK: 1,
    flashes: [],
    onHit: () => {},
  });
  const meshRegistry = useRef<THREE.Mesh[]>([]);
  const burstApi = useRef<BurstApi | null>(null);
  const deckRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const deckIdxRef = useRef(0);
  const poolRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const distrRef = useRef<VocabEntry[]>([]);
  const modeRef = useRef<Mode>(mode);
  const qTimeRef = useRef(Q_TIME_SHOOT);
  const deadlineRef = useRef(0);
  const lockedRef = useRef(false);
  const overRef = useRef(false);
  const startedAtRef = useRef(0);
  const seqRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const heartsRef = useRef(HEARTS);
  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const maxComboRef = useRef(0);
  const wrongRef = useRef<WrongItem[]>([]);
  const timersRef = useRef<number[]>([]);
  const finishRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<() => void>(() => {});
  const advanceRef = useRef<() => void>(() => {});
  const voiceSpeedRef = useRef(speed);
  const tapRef = useRef(tapMode);
  const qRef = useRef<Question | null>(null);

  // الگوی latest-ref — effect بدون dep
  useEffect(() => {
    voiceSpeedRef.current = speed;
    tapRef.current = tapMode;
    qRef.current = q;
  });

  useEffect(() => () => stopSpeaking(), []);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  // ── سؤال بعدی (reshuffle در اتمام استخر) ──
  const advanceImpl = useCallback(() => {
    if (overRef.current) return;
    const pool = poolRef.current;
    if (pool.length === 0) {
      finishRef.current();
      return;
    }
    if (deckIdxRef.current >= deckRef.current.length) {
      deckRef.current = shuffle(pool);
      deckIdxRef.current = 0;
    }
    const item = deckRef.current[deckIdxRef.current++] as VocabEntry | QuizQuestionSeed;
    const next =
      modeRef.current === "word-hunt"
        ? buildWordQuestion(++seqRef.current, item as VocabEntry, distrRef.current, lesson)
        : buildGrammarQuestion(++seqRef.current, item as QuizQuestionSeed, lesson);
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    lockedRef.current = false;
    deadlineRef.current = performance.now() + qTimeRef.current * 1000;
    setQ(next);
    setTimeLeft(qTimeRef.current);
  }, [lesson]);
  useEffect(() => {
    advanceRef.current = advanceImpl;
  });

  const advance = useCallback(() => advanceRef.current(), []);

  // ── پایان دور — الگوی طلایی فاز ۳/۴ ──
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    clearTimers();
    stopSpeaking();
    const total = totalRef.current;
    const final = scoreRef.current;
    const elapsed = Math.max(1, Math.round((performance.now() - startedAtRef.current) / 1000));
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: correctRef.current,
        duration: elapsed,
        detail: { score: final, maxCombo: maxComboRef.current, mode: modeRef.current, tap: tapRef.current },
      });
    }
    const scope = scopeOf(modeRef.current, tapRef.current);
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    if (final > 0 && final > (prev?.score ?? 0)) {
      saveBest(activeBookId, GAME_KEY, scope, { score: final });
      setIsRecord(prev !== null);
      if (prev !== null) toast.success(`رکورد جدید! ${faNum(final)} امتیاز 🏆`);
    } else {
      setIsRecord(false);
    }
    setFinalScore(final);
    setMaxCombo(maxComboRef.current);
    setCorrectCount(correctRef.current);
    setWrongCount(total - correctRef.current);
    setWrongList([...wrongRef.current]);
    setPhase("done");
  }, [activeBookId, lesson, clearTimers]);
  useEffect(() => {
    finishRef.current = finish;
  });

  const quit = useCallback(() => {
    overRef.current = true;
    clearTimers();
    stopSpeaking();
    if (document.pointerLockElement) document.exitPointerLock();
    setPhase("setup");
  }, [clearTimers]);

  // ── پاسخ به شلیک/تپ ──
  const handleHit = useCallback(
    (id: string | null) => {
      const cur = qRef.current;
      if (overRef.current || lockedRef.current || !cur || id === null) return;
      const target = cur.targets.find((t) => t.id === id);
      if (!target) return;
      const now = performance.now();
      if (target.correct) {
        comboRef.current += 1;
        const bonus = Math.min(comboRef.current - 1, COMBO_CAP) * COMBO_STEP;
        scoreRef.current += SHOOT_BASE + bonus;
        totalRef.current += 1;
        correctRef.current += 1;
        maxComboRef.current = Math.max(maxComboRef.current, comboRef.current);
        setScore(scoreRef.current);
        setCombo(comboRef.current);
        lockedRef.current = true;
        bridge.current.flashes = [{ id: target.id, kind: "ok", until: now + HIT_FREEZE_MS }];
        void speak(cur.speakText, { speed: voiceSpeedRef.current });
        later(() => advance(), HIT_FREEZE_MS);
      } else {
        comboRef.current = 0;
        totalRef.current += 1;
        wrongRef.current.push(
          cur.mode === "word-hunt"
            ? { label: cur.srsKey, sub: cur.promptMain }
            : { label: cur.srsKey, sub: cur.promptMain },
        );
        seedReviewFromQuiz(cur.srsKey);
        heartsRef.current -= 1;
        setHearts(heartsRef.current);
        setCombo(0);
        lockedRef.current = true;
        const good = cur.targets.find((t) => t.correct);
        bridge.current.flashes = [
          { id: target.id, kind: "bad", until: now + HIT_FREEZE_MS },
          ...(good ? [{ id: good.id, kind: "ok" as const, until: now + HIT_FREEZE_MS }] : []),
        ];
        if (heartsRef.current <= 0) {
          later(() => finishRef.current(), HIT_FREEZE_MS);
        } else {
          later(() => advance(), HIT_FREEZE_MS);
        }
      }
    },
    [advance, later],
  );
  useEffect(() => {
    bridge.current.onHit = handleHit;
  });

  // ── پایان زمان سؤال ──
  const handleTimeout = useCallback(() => {
    const cur = qRef.current;
    if (overRef.current || lockedRef.current || !cur) return;
    comboRef.current = 0;
    totalRef.current += 1;
    wrongRef.current.push({ label: cur.srsKey, sub: cur.promptMain });
    seedReviewFromQuiz(cur.srsKey);
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    setCombo(0);
    setTimeLeft(0);
    lockedRef.current = true;
    const good = cur.targets.find((t) => t.correct);
    bridge.current.flashes = good
      ? [{ id: good.id, kind: "ok", until: performance.now() + HIT_FREEZE_MS }]
      : [];
    if (heartsRef.current <= 0) {
      later(() => finishRef.current(), HIT_FREEZE_MS);
    } else {
      later(() => advance(), HIT_FREEZE_MS);
    }
  }, [advance, later]);
  useEffect(() => {
    timeoutRef.current = handleTimeout;
  });

  // ── تایمر سؤال — ۵ بار در ثانیه، فقط روی رویداد گسسته setState ──
  useEffect(() => {
    if (phase !== "playing") return;
    const iv = window.setInterval(() => {
      if (overRef.current) return;
      if (lockedRef.current) {
        deadlineRef.current += 200; // توقف زمان در فاصلهٔ بین سؤال‌ها
        return;
      }
      const left = Math.max(0, (deadlineRef.current - performance.now()) / 1000);
      setTimeLeft(Math.round(left * 10) / 10);
      if (left <= 0) timeoutRef.current();
    }, 200);
    return () => window.clearInterval(iv);
  }, [phase]);

  // ── ورودی: Pointer Lock دسکتاپ + درگ/تپ لمسی + کیبورد ۱..۴ ──
  useEffect(() => {
    if (phase !== "playing") return;
    const el = wrapRef.current;
    if (!el) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const ndcOf = (cx: number, cy: number): [number, number] => {
      const r = el.getBoundingClientRect();
      return [((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1];
    };
    const request = (x: number, y: number) => {
      const b = bridge.current;
      const now = performance.now();
      if (now - b.lastShotAt < SHOOT_COOLDOWN) return;
      b.lastShotAt = now;
      b.shoot = { x, y, seq: b.shoot.seq + 1 };
    };

    let gest: { x0: number; y0: number; t0: number; moved: boolean; lx: number; ly: number; active: boolean } | null =
      null;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (overRef.current || !t || !el.contains(t)) return;
      if (!coarse && !tapRef.current) {
        if (document.pointerLockElement !== el) {
          try {
            const r = el.requestPointerLock() as unknown as Promise<void> | undefined;
            if (r && typeof r.catch === "function") r.catch(() => {});
          } catch {
            /* noop */
          }
          return;
        }
        request(0, 0);
        return;
      }
      gest = { x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false, lx: e.clientX, ly: e.clientY, active: true };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (document.pointerLockElement === el) {
        const b = bridge.current;
        b.aim.yaw -= e.movementX * 0.0026;
        b.aim.pitch = clamp(b.aim.pitch - e.movementY * 0.0024, -0.6, 0.48);
        return;
      }
      if (!gest?.active) return;
      const dx = e.clientX - gest.lx;
      const dy = e.clientY - gest.ly;
      gest.lx = e.clientX;
      gest.ly = e.clientY;
      if (Math.hypot(e.clientX - gest.x0, e.clientY - gest.y0) > 12) gest.moved = true;
      if (gest.moved) {
        const b = bridge.current;
        b.aim.yaw -= dx * 0.005;
        b.aim.pitch = clamp(b.aim.pitch - dy * 0.0045, -0.6, 0.48);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!gest?.active) return;
      const dt = performance.now() - gest.t0;
      const moved = gest.moved;
      gest.active = false;
      if (!moved && dt < 600) {
        const [x, y] = ndcOf(e.clientX, e.clientY);
        request(x, y);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (!tapRef.current) return;
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, "۱": 0, "۲": 1, "۳": 2, "۴": 3 };
      const idx = map[e.key];
      if (idx === undefined) return;
      const cur = qRef.current;
      if (!cur || lockedRef.current || overRef.current) return;
      const ordered = [...cur.targets].sort((a, b) => a.lane - b.lane);
      const target = ordered[idx];
      if (target) bridge.current.onHit(target.id);
    };

    const onLockChange = () => setLocked(document.pointerLockElement === el);

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerlockchange", onLockChange);
      if (document.pointerLockElement === el) document.exitPointerLock();
    };
  }, [phase]);

  // ── شروع دور ──
  const start = useCallback(() => {
    const pool: Array<VocabEntry | QuizQuestionSeed> =
      mode === "word-hunt"
        ? (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson))
        : (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson));
    if (pool.length < (mode === "word-hunt" ? MIN_POOL_WORD : MIN_POOL_QUIZ)) return;
    modeRef.current = mode;
    qTimeRef.current = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
    poolRef.current = pool;
    distrRef.current = vocabAll;
    deckRef.current = shuffle(pool);
    deckIdxRef.current = 0;
    seqRef.current = 0;
    scoreRef.current = 0;
    comboRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    maxComboRef.current = 0;
    wrongRef.current = [];
    overRef.current = false;
    lockedRef.current = false;
    startedAtRef.current = performance.now();
    bridge.current.aim = { yaw: 0, pitch: 0 };
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    setScore(0);
    setCombo(0);
    setHearts(HEARTS);
    setQ(null);
    setLocked(false);
    setPhase("playing");
    // سؤال اول پس از سوار شدن صحنه
    later(() => advanceRef.current(), 60);
  }, [mode, lesson, tapMode, vocabAll, quizSeed, later]);

  // ── رکوردهای شخصی هر دو اسکوپ ──
  const bestWord = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("word-hunt", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestGrammar = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("grammar-gate", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestVal = useMemo(() => {
    const raw = mode === "word-hunt" ? bestWord : bestGrammar;
    return raw ? (JSON.parse(raw) as BestRecord).score : null;
  }, [mode, bestWord, bestGrammar]);

  const chipCls = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Crosshair size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">شوتر آموزشی</h2>
              <p className="text-xs text-muted-foreground">میدان سه‌بعدی low-poly — به گزینهٔ درست شلیک کن!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-emerald-500" />
            <p>
              سؤال بالای صفحه می‌آید و روی هر هدف متحرک یک گزینه نوشته شده — دقیقاً به <b>گزینهٔ درست</b> شلیک کن.
              شلیک درست = انفجار رنگین‌کمانی و امتیاز با کمبو؛ شلیک غلط یا پایان زمان = یک ❤ کم می‌شود. خطا رفتن
              (شلیک به خالی) جریمه ندارد!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">حالت بازی</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(
                [
                  {
                    key: "word-hunt" as const,
                    title: "شکار واژه",
                    desc: "معنی فارسی روی HUD؛ واژهٔ انگلیسی درست را بین اهداف شکار کن.",
                    icon: Star,
                  },
                  {
                    key: "grammar-gate" as const,
                    title: "سد گرامری",
                    desc: "جملهٔ ناقص سؤال‌ها؛ گزینهٔ درست را نشانه بگیر و شلیک کن.",
                    icon: Swords,
                  },
                ] satisfies Array<{ key: Mode; title: string; desc: string; icon: typeof Star }>
              ).map((m) => (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={mode === m.key}
                  onClick={() => {
                    setMode(m.key);
                    setLesson(ALL_LESSONS);
                  }}
                  className={cn(
                    "min-h-11 rounded-2xl border p-3 text-right transition-all",
                    mode === m.key
                      ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                      : "hover:border-primary/30 hover:bg-muted/50",
                  )}
                >
                  <span className="flex items-center gap-2 text-[13px] font-black">
                    <m.icon size={16} className={mode === m.key ? "text-primary" : "text-muted-foreground"} />
                    {m.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button type="button" aria-pressed={lesson === ALL_LESSONS} onClick={() => setLesson(ALL_LESSONS)} className={chipCls(lesson === ALL_LESSONS)}>
                کل کتاب ({faNum(poolCount)} {mode === "word-hunt" ? "واژه" : "سؤال"})
              </button>
              {mode === "word-hunt"
                ? wordLessons.map((l) => (
                    <button key={l.lesson} type="button" aria-pressed={lesson === l.lesson} onClick={() => setLesson(l.lesson)} className={chipCls(lesson === l.lesson)}>
                      {l.label} ({faNum(vocabAll.filter((w) => w.lesson === l.lesson).length)})
                    </button>
                  ))
                : quizLessons.map((l) => (
                    <button key={l} type="button" aria-pressed={lesson === l} onClick={() => setLesson(l)} className={chipCls(lesson === l)}>
                      {lessonLabel(l)} ({faNum(quizSeed.filter((s) => s.lesson === l).length)})
                    </button>
                  ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">سبک کنترل</p>
            <button type="button" aria-pressed={tapMode} onClick={() => setTapMode((v) => !v)} className={chipCls(tapMode)}>
              <span className="inline-flex items-center gap-1.5">
                <MousePointerClick size={14} />
                تپ ساده (بدون شلیک) {tapMode ? "— فعال" : ""}
              </span>
            </button>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              {tapMode ? (
                <>تپ روی هدف کافی است؛ روی دسکتاپ هم کلیک روی هدف می‌زند و کلیدهای ۱ تا ۴ هدف را انتخاب می‌کنند.</>
              ) : (
                <>دسکتاپ: کلیک قفلِ نشانگر، حرکت موس نشانه‌گیری، کلیک بعدی شلیک — موبایل: کشیدن نگاه، تپ روی هدف شلیک.</>
              )}
            </p>
          </div>

          {!poolOk && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-[11px] leading-5 text-destructive">
              {mode === "word-hunt"
                ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_WORD)} واژه لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
                : `برای این انتخاب دست‌کم ${faNum(MIN_POOL_QUIZ)} سؤال لازم است — محدودهٔ دیگری را انتخاب کن.`}
            </div>
          )}

          {bestVal !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین امتیاز ({modeName(mode)}{tapMode ? " · تپ ساده" : ""}): {faNum(bestVal)}
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" disabled={!poolOk} onClick={start}>
            <Play size={18} />
            شروع مأموریت
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    return (
      <Card className="mx-auto max-w-xl rise-in border-emerald-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Crosshair size={30} />
          </span>
          <h2 className="text-xl font-black">مأموریت تمام شد!</h2>
          <p className="-mt-3 text-[11px] text-muted-foreground">
            {modeName(mode)}{tapMode ? " · تپ ساده" : ""} · {lesson === ALL_LESSONS ? "کل کتاب" : lessonLabel(lesson)}
          </p>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          <div className="w-full rounded-2xl bg-gradient-to-bl from-primary/10 to-emerald-500/10 p-5">
            <p className="text-5xl font-black leading-none">{faNum(finalScore)}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">امتیاز این مأموریت</p>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Flame size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">×{faNum(maxCombo)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">بیشترین کمبو</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <CheckCircle2 size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(correctCount)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">شلیک درست</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <XCircle size={16} className="mx-auto text-destructive" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(wrongCount)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">خطا / پایان زمان</p>
            </div>
          </div>

          {wrongList.length > 0 ? (
            <div className="w-full space-y-2 rounded-xl border p-3 text-right">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold">واژه‌های غلط‌زده</p>
                <Badge
                  variant="outline"
                  className="shrink-0 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
                >
                  به مرور اضافه شد
                </Badge>
              </div>
              <div className="flex max-h-44 flex-wrap gap-1.5 overflow-y-auto">
                {wrongList.map((w, i) => (
                  <span
                    key={`${w.label}-${i}`}
                    dir={mode === "word-hunt" ? "ltr" : "rtl"}
                    className="rounded-lg bg-muted/70 px-2.5 py-1 text-[12px] font-bold"
                    title={w.sub}
                  >
                    {w.label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
              بدون خطا — تک‌تیرانداز واقعی! 🎯
            </Badge>
          )}

          <div className="flex gap-2">
            <Button onClick={start} className="h-11 gap-2">
              <RotateCcw size={16} />
              مأموریت جدید
            </Button>
            <Button variant="outline" className="h-11" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  const qTime = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
  const timePct = Math.max(0, Math.min(100, (timeLeft / qTime) * 100));
  return (
    <div role="group" aria-label="بازی شوتر آموزشی سه‌بعدی" className="mx-auto max-w-3xl space-y-3 rise-in">
      {/* نوار وضعیت */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
          <Star size={13} className="text-amber-500" />
          {faNum(score)}
        </Badge>
        {combo >= 2 ? (
          <Badge
            variant="outline"
            className="gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400"
          >
            <Flame size={13} />
            ×{faNum(combo)}
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
            <Zap size={12} />
            کمبو ×۱
          </Badge>
        )}
        <span role="img" aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`} className="flex items-center gap-1">
          {Array.from({ length: HEARTS }, (_, i) => (
            <Heart
              key={i}
              size={15}
              fill={i < hearts ? "currentColor" : "none"}
              className={i < hearts ? "text-destructive" : "text-muted-foreground/35"}
            />
          ))}
        </span>
        <span className="ms-auto text-[11px] font-bold text-muted-foreground">
          ⏱ {faNum(Math.ceil(timeLeft))} ثانیه
        </span>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-[12px]" onClick={quit}>
          پایان دور
        </Button>
      </div>

      {/* میدان سه‌بعدی */}
      <div
        ref={wrapRef}
        className="relative h-[60vh] max-h-[580px] min-h-[400px] touch-none overflow-hidden rounded-2xl border bg-[#062e24] shadow-lg"
      >
        <Canvas
          dpr={weak ? [1, 1] : [1, 1.75]}
          camera={{ fov: 72, near: 0.1, far: 60, position: [0, 1.7, 7] }}
          gl={{ antialias: !weak, powerPreference: "high-performance" }}
        >
          <Rig bridge={bridge} />
          <Arena weak={weak} />
          {q?.targets.map((t) => (
            <Target key={`q${q.seq}-${t.id}`} spec={t} registry={meshRegistry} bridge={bridge} />
          ))}
          <Burst apiRef={burstApi} count={weak ? BURST_WEAK : BURST_FULL} />
          <World bridge={bridge} registry={meshRegistry} burstApi={burstApi} />
        </Canvas>

        {/* سؤال — HUD بالای میدان */}
        {q && (
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10">
            <div className="mx-auto max-w-lg rounded-2xl border bg-background/85 p-3 text-center shadow-lg backdrop-blur">
              <p className="text-[10px] font-bold text-muted-foreground">{q.promptFa}</p>
              <p
                dir={q.ltr ? "ltr" : "rtl"}
                className={cn(
                  "mt-1 font-black leading-6",
                  q.ltr ? "font-en text-[15px]" : "text-[17px]",
                )}
              >
                {q.promptMain}
              </p>
              {q.promptSub && <p className="mt-0.5 text-[10px] text-muted-foreground">{q.promptSub}</p>}
              {/* نوار زمان */}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-200",
                    timePct > 50 ? "bg-emerald-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500",
                  )}
                  style={{ width: `${timePct}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* رتیکل — فقط در حالت شلیک دسکتاپ/لمس‌ندار */}
        {!tapMode && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute start-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-opacity",
              locked ? "opacity-100" : isCoarse ? "opacity-0" : "opacity-60",
            )}
          >
            <span className="relative block h-7 w-7">
              <span className="absolute inset-0 rounded-full border-2 border-white/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="absolute start-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
            </span>
          </div>
        )}

        {/* راهنمای کنترل */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center">
          <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] text-white/90 backdrop-blur">
            {tapMode
              ? isCoarse
                ? "تپ روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
                : "کلیک روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
              : isCoarse
                ? "بکش تا نگاه کنی · تپ روی هدف = شلیک"
                : locked
                  ? "حرکت موس = نشانه‌گیری · کلیک = شلیک"
                  : "برای شروع نشانه‌گیری کلیک کن (Pointer Lock)"}
          </span>
        </div>
      </div>

      <p className="text-center text-[11px] leading-5 text-muted-foreground">
        شلیک درست +{faNum(SHOOT_BASE)} امتیاز و هر حلقهٔ کمبو +{faNum(COMBO_STEP)}تا سقف ×{faNum(COMBO_CAP + 1)} —
        پاسخ‌های غلط به صف «مرور هوشمند» هم می‌روند.
      </p>
    </div>
  );
}
