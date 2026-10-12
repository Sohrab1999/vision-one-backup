"use client";

// ── فاز F6 — نقشه‌های مأموریت (پالت کامل هر میدان) ──

export type MapId = "forest" | "desert" | "night" | "dust";

export interface MapConfig {
  id: MapId;
  name: string;
  desc: string;
  /** رنگ پس‌زمینه/مه صحنه و بدنهٔ قاب */
  bg: string;
  ground: string;
  ringMain: string;
  ringOther: string;
  mountain: string;
  decoColors: [number, number, number, number];
  /** شدت emissive اجسام تزئینی — نقشهٔ شب درخشان است تا خوانایی حفظ شود */
  decoGlow: number;
  hemiSky: string;
  hemiGround: string;
  sunColor: string;
  sunIntensity: number;
  ambIntensity: number;
  fogNear: number;
  fogFar: number;
  /** خورشید/ماه: موقعیت + شعاع + رنگ */
  orb: { pos: [number, number, number]; r: number; color: string } | null;
  stars: boolean;
  clouds: number;
  cloudColor: string;
  /** فاز F10 — پالت سازه‌های چیدمان: دیوار، درِ چوبی، رنگ تأکیدی و جعبه */
  wallColor: string;
  doorColor: string;
  accentColor: string;
  crateColor: string;
  /** نمونه‌رنگ گرادیانی کارت نقشه در setup */
  swatch: string;
}

export const MAPS: Record<MapId, MapConfig> = {
  forest: {
    id: "forest",
    name: "جنگل زمردی",
    desc: "میدان کلاسیک سبز با تنهٔ درختان، دیوارهای چوبی و کوه‌های دوردست.",
    bg: "#062e24",
    ground: "#0a4335",
    ringMain: "#f59e0b",
    ringOther: "#10b981",
    mountain: "#065f46",
    decoColors: [0x0d9488, 0x059669, 0xd97706, 0x10b981],
    decoGlow: 0.14,
    hemiSky: "#a7f3d0",
    hemiGround: "#064e3b",
    sunColor: "#ffffff",
    sunIntensity: 1.1,
    ambIntensity: 0.8,
    fogNear: 10,
    fogFar: 36,
    orb: null,
    stars: false,
    clouds: 3,
    cloudColor: "#e7fff4",
    wallColor: "#3d2c17",
    doorColor: "#6b4423",
    accentColor: "#34d399",
    crateColor: "#92400e",
    swatch: "bg-gradient-to-b from-emerald-300 via-emerald-600 to-emerald-950",
  },
  desert: {
    id: "desert",
    name: "کویر کهربا",
    desc: "غروب شنی با دیوارهای ماسه‌سنگی، طاق سنگی و خورشید بزرگ.",
    bg: "#431407",
    ground: "#92400e",
    ringMain: "#fbbf24",
    ringOther: "#f59e0b",
    mountain: "#7c2d12",
    decoColors: [0xd97706, 0xb45309, 0x78350f, 0xf59e0b],
    decoGlow: 0.12,
    hemiSky: "#fed7aa",
    hemiGround: "#7c2d12",
    sunColor: "#ffd9a0",
    sunIntensity: 1.25,
    ambIntensity: 0.85,
    fogNear: 9,
    fogFar: 34,
    orb: { pos: [7, 3.4, -30], r: 3.2, color: "#fbbf24" },
    stars: false,
    clouds: 2,
    cloudColor: "#ffd9a8",
    wallColor: "#c08a4e",
    doorColor: "#7a4a21",
    accentColor: "#fbbf24",
    crateColor: "#a16207",
    swatch: "bg-gradient-to-b from-amber-300 via-orange-600 to-orange-950",
  },
  night: {
    id: "night",
    name: "سکوت شب",
    desc: "آسمان پرستاره با ستون‌های کریستال درخشان — تمرکز دوچندان.",
    bg: "#020617",
    ground: "#0f172a",
    ringMain: "#22d3ee",
    ringOther: "#155e75",
    mountain: "#1e293b",
    decoColors: [0x22d3ee, 0x2dd4bf, 0x38bdf8, 0x818cf8],
    decoGlow: 0.95,
    hemiSky: "#334155",
    hemiGround: "#020617",
    sunColor: "#93c5fd",
    sunIntensity: 0.55,
    ambIntensity: 0.52,
    fogNear: 8,
    fogFar: 32,
    orb: { pos: [-8, 6.6, -26], r: 1.9, color: "#e2e8f0" },
    stars: true,
    clouds: 0,
    cloudColor: "#e2e8f0",
    wallColor: "#253550",
    doorColor: "#0f766e",
    accentColor: "#22d3ee",
    crateColor: "#334155",
    swatch: "bg-gradient-to-b from-slate-400 via-slate-700 to-slate-950",
  },
  dust: {
    id: "dust",
    name: "دروازهٔ دو در",
    desc: "الهام از دی‌داست۲: درِ دوتایی میانه، گذرگاه بلند، تونل B و درهای چوبی — نبرد کلاسیک کویری.",
    bg: "#d8c294",
    ground: "#c2a36b",
    ringMain: "#f59e0b",
    ringOther: "#a16207",
    mountain: "#a98a55",
    decoColors: [0xb45309, 0x92400e, 0xd97706, 0x78350f],
    decoGlow: 0.1,
    hemiSky: "#fdf3d9",
    hemiGround: "#8a6d42",
    sunColor: "#fff1cf",
    sunIntensity: 1.35,
    ambIntensity: 0.95,
    fogNear: 13,
    fogFar: 46,
    orb: { pos: [-6, 7, -34], r: 2.6, color: "#fff3d6" },
    stars: false,
    clouds: 2,
    cloudColor: "#fff7e6",
    wallColor: "#c9a76b",
    doorColor: "#7a4a21",
    accentColor: "#eab308",
    crateColor: "#8a6f3c",
    swatch: "bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-800",
  },
};

// ── فاز F10 — سیستم چیدمان نقشه: هر نقشه سازه‌ها و محدودهٔ حرکت واقعی خودش را دارد ──

