// گام ۵ — فاز ۲: استخراج setup-panel از fps/index.tsx (جابه‌جایی مکانیکی سطری + لنگرهای متنی)
import { readFileSync, writeFileSync } from "fs";

const P = "/home/z/my-project/src/components/book/games/fps/index.tsx";
const PANEL_P = "/home/z/my-project/src/components/book/games/fps/setup-panel.tsx";
const src = readFileSync(P, "utf8");
const lines = src.split("\n");

const findLine = (needle: string, from = 0): number => {
  const idx = lines.findIndex((l, i) => i >= from && l.includes(needle));
  if (idx === -1) {
    console.error(`ANCHOR NOT FOUND: ${JSON.stringify(needle)}`);
    process.exit(1);
  }
  return idx; // صفر-مبنا
};

// ── ۱) TUTORIAL_STEPS: از کامنت سکشن تا `];` پیش از «بازی اصلی ───» ──
const tutStart = findLine("─── فاز G2-e — آموزش ۳-گامی استاندارد");
const tutEnd = findLine("// ─── بازی اصلی ───"); // خطوط بین: …]; سپس خط خالی
if (!lines[tutEnd - 2]!.includes("];")) {
  console.error(`ASSERT FAIL: '];' must precede 'بازی اصلی' — got ${JSON.stringify(lines[tutEnd - 2])}`);
  process.exit(1);
}
const tutBlock = lines.slice(tutStart, tutEnd - 1); // کامنت + const تا ]; (شامل ]; — بدون خط خالی)

// ── ۲) chipCls (۷ خط) ──
const chipStart = findLine("const chipCls = (active: boolean) =>");
if (!lines[chipStart + 6]!.trim().startsWith(");")) {
  console.error(`ASSERT FAIL: chipCls closing — got ${JSON.stringify(lines[chipStart + 6])}`);
  process.exit(1);
}
const chipBlock = lines.slice(chipStart, chipStart + 7);

// ── ۳) بلوک Setup: از کامنت تا `}` پیش از کامنت Done ──
const setupStart = findLine("// ── Setup ──");
let doneComment = findLine("// ── Done —");
if (!lines[doneComment - 2]!.includes("}")) {
  console.error(`ASSERT FAIL: line before blank+Done must be '}' — got ${JSON.stringify(lines[doneComment - 2])}`);
  process.exit(1);
}
const setupEnd = doneComment - 2; // انحصاری — `  }` پایانی if
// داخل if: return ( … ); — فرگمنت بین آن دو
const retOpen = lines.findIndex((l, i) => i >= setupStart && l.trim() === "return (");
const retClose = lines.findIndex((l, i) => i >= setupStart && l.trim() === ");");
const fragment = lines.slice(retOpen + 1, retClose); // <>…</>
if (!fragment[0]!.includes("<>") || !fragment[fragment.length - 1]!.includes("</>")) {
  console.error("ASSERT FAIL: fragment bounds");
  process.exit(1);
}
// تورفتگی: دو فاصله کم شود (JSX رندر یکسان)
const dedented = fragment.map((l) => (l.startsWith("  ") ? l.slice(2) : l));

// ── ۴) import های حذفی از index (باید عیناً موجود باشند) ──
const dropExact = (needle: string) => {
  const i = lines.findIndex((l) => l === needle);
  if (i === -1) {
    console.error(`ASSERT FAIL: import line not found: ${JSON.stringify(needle)}`);
    process.exit(1);
  }
  lines[i] = null as unknown as string;
};
dropExact("  Bomb,");
dropExact("  DoorOpen,");
dropExact("  Headphones,");
dropExact("  MapPinned,");
dropExact("  MonitorSmartphone,");
dropExact("  MoonStar,");
dropExact("  MousePointerClick,");
dropExact("  Sparkles,");
dropExact("  Sun,");
dropExact("  Swords,");
dropExact("  Trees,");
dropExact("  Trophy,");
dropExact("  type WeaponConfig,");
dropExact("  lessonLabel,");
dropExact("  modeName,");
// tutorial-overlay import — دو خطی: "import {" + "  TutorialOverlay, … } from …" → تک‌خطی بدون TutorialStep
const tImp = lines.findIndex((l) => l !== null && l.includes("TutorialOverlay, useAutoTutorial, type TutorialStep"));
if (tImp === -1 || lines[tImp - 1] !== "import {") {
  console.error("ASSERT FAIL: tutorial-overlay import shape");
  process.exit(1);
}
lines[tImp] = 'import { TutorialOverlay, useAutoTutorial } from "../kit/tutorial-overlay";';
lines[tImp - 1] = null;
// maps single-line import
const mapLine = lines.findIndex((l) => l === 'import { MAPS, type MapConfig, type MapId } from "./maps";');
if (mapLine === -1) {
  console.error("ASSERT FAIL: maps import");
  process.exit(1);
}
lines[mapLine] = 'import { MAPS, type MapId } from "./maps";';

// ── ۵) بازسازی index: جایگزینی chipCls + بلوک Setup با فراخوانی پنل ──
const callSite = [
  "",
  "  // ── Setup ── (JSX به setup-panel.tsx منتقل شد — گام ۵ refactor-2؛ props هم‌نام)",
  "  if (phase === \"setup\") {",
  "    return (",
  "      <SetupPanel",
  "        mode={mode}",
  "        setMode={setMode}",
  "        lesson={lesson}",
  "        setLesson={setLesson}",
  "        tapMode={tapMode}",
  "        setTapMode={setTapMode}",
  "        quality={quality}",
  "        setQualityPref={setQualityPref}",
  "        sens={sens}",
  "        setSensPref={setSensPref}",
  "        fov={fov}",
  "        setFovPref={setFovPref}",
  "        invertY={invertY}",
  "        setInvertPref={setInvertPref}",
  "        weaponId={weaponId}",
  "        setWeaponPref={setWeaponPref}",
  "        mapId={mapId}",
  "        setMapPref={setMapPref}",
  "        chipFeedback={chipFeedback}",
  "        poolOk={poolOk}",
  "        poolCount={poolCount}",
  "        quizLessons={quizLessons}",
  "        wordLessons={wordLessons}",
  "        vocabAll={vocabAll}",
  "        quizSeed={quizSeed}",
  "        bestVal={bestVal}",
  "        start={start}",
  "        tutorialOpen={tutorialOpen}",
  "        handleTutorialOpenChange={handleTutorialOpenChange}",
  "      />",
  "    );",
  // «  }» پایانی if عیناً از فایل اصلی حفظ می‌شود (setupEnd انحصاری شامل خودش است)
];

// برش: از ابتدای chipCls (با خط خالی پیش از آن؟ نه — خط خالی ۱۵۴۳ می‌ماند) تا setupEnd
const kept: string[] = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i]!;
  if (i === chipStart) {
    kept.push(...callSite);
    i = setupEnd - 1; // جهش (setupEnd انحصاری)
    continue;
  }
  if (i === tutStart) {
    i = tutEnd - 1; // حذف بلوک TUTORIAL_STEPS + خط خالی پس از آن (بعدی: کامنت «بازی اصلی»)
    continue;
  }
  if (l !== null) kept.push(l);
}

let res = kept.join("\n");
// import پنل — بعد از import هوک
const hookAnchor = 'import { useFpsPrefs } from "./use-fps-prefs";';
if (!res.includes(hookAnchor)) {
  console.error("ASSERT FAIL: hook import anchor");
  process.exit(1);
}
res = res.replace(hookAnchor, `${hookAnchor}\nimport { SetupPanel } from "./setup-panel";`);

// ── ۶) ساخت setup-panel.tsx ──
const panelFile = `"use client";

/**
 * setup-panel — پنل تنظیمات مأموریت شوتر (گام ۵ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از index.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، انتخاب حالت/سلاح/نقشه/درس/سبک کنترل/کیفیت/گزینه‌های نگاه، هشدار استخر،
 * پیام هدف‌های هوشمند، بج رکورد، دکمهٔ «شروع مأموریت» + آموزش ۵گامی (TUTORIAL_STEPS).
 * کامپوننت presentational — state و موتور مأموریت در index.tsx می‌ماند؛ props هم‌نام
 * شناسه‌های قبلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import type { Dispatch, SetStateAction } from "react";
import {
  Bomb,
  Crosshair,
  DoorOpen,
  Headphones,
  MapPinned,
  MonitorSmartphone,
  MoonStar,
  MousePointerClick,
  Play,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target as TargetIcon,
  Trees,
  Trophy,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import { faNum } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import {
  ALL_LESSONS,
  FOV_DEF,
  FOV_MAX,
  FOV_MIN,
  GAME_KEY,
  MIN_POOL_QUIZ,
  MIN_POOL_WORD,
  SENS_DEF,
  SENS_MAX,
  SENS_MIN,
  type Quality,
} from "./constants";
import { lessonLabel, modeName } from "./helpers";
import { MAPS, type MapConfig, type MapId } from "./maps";
import { WEAPONS, type WeaponConfig, type WeaponId } from "./weapons";
import type { Mode } from "./types";

${tutBlock.join("\n")}

export interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  lesson: number;
  setLesson: Dispatch<SetStateAction<number>>;
  tapMode: boolean;
  setTapMode: Dispatch<SetStateAction<boolean>>;
  quality: Quality;
  setQualityPref: (q: Quality) => void;
  sens: number;
  setSensPref: (v: number) => void;
  fov: number;
  setFovPref: (v: number) => void;
  invertY: boolean;
  setInvertPref: (v: boolean) => void;
  weaponId: WeaponId;
  setWeaponPref: (id: WeaponId) => void;
  mapId: MapId;
  setMapPref: (id: MapId) => void;
  chipFeedback: () => void;
  poolOk: boolean;
  poolCount: number;
  quizLessons: number[];
  wordLessons: { lesson: number; label: string }[];
  vocabAll: VocabEntry[];
  quizSeed: QuizQuestionSeed[];
  bestVal: number | null;
  start: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (o: boolean) => void;
}

export function SetupPanel({
  mode,
  setMode,
  lesson,
  setLesson,
  tapMode,
  setTapMode,
  quality,
  setQualityPref,
  sens,
  setSensPref,
  fov,
  setFovPref,
  invertY,
  setInvertPref,
  weaponId,
  setWeaponPref,
  mapId,
  setMapPref,
  chipFeedback,
  poolOk,
  poolCount,
  quizLessons,
  wordLessons,
  vocabAll,
  quizSeed,
  bestVal,
  start,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
${chipBlock.join("\n")}

  return (
${dedented.join("\n")}
  );
}
`;

writeFileSync(PANEL_P, panelFile);
writeFileSync(P, res);
console.log(
  "phase2 done. index lines:",
  res.split("\n").length,
  "panel lines:",
  panelFile.split("\n").length,
);
