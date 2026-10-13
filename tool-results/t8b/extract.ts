// گام ۸-B — استخراج مکانیکی snakes-ladders-game.tsx → games/snakes-ladders/
// برش‌های خطی بایت‌به‌بایت از فایل اصلی (الگوی پلی‌بوک t7/t8a). تنها دلتاهای مجاز:
// هدر کامنت + import + "use client" + کلیدواژهٔ export + اینترفیس props + dedent بدنهٔ شاخه‌ها.
import { writeFileSync, readFileSync, mkdirSync } from "fs";

const SRC = "/home/z/my-project/src/components/book/games/snakes-ladders-game.tsx";
const DIR = "/home/z/my-project/src/components/book/games/snakes-ladders";
mkdirSync(DIR, { recursive: true });

const orig = readFileSync(SRC, "utf8").split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1637) throw new Error(`expected 1637 lines, got ${orig.length}`);

/** برش فرا-شامل: a..b با اندیس ۱-پایه */
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");
/** حذف دقیقاً ۲ فاصلهٔ ابتدای خط‌های تورفته (dedent بدنهٔ شاخه‌های داخل if — خط خالی دست‌نخورده) */
const dedent2 = (s: string) =>
  s
    .split("\n")
    .map((l) => (l.startsWith("  ") ? l.slice(2) : l))
    .join("\n");
/** دلتای مجاز پلی‌بوک: افزودن کلیدواژهٔ export به اعلان‌های سطح ماژول (فقط اعلان — نه ارجاع‌ها) */
const exp = (s: string, names: string[]): string =>
  s
    .split("\n")
    .map((l) => {
      const m = l.match(/^(const|let|function|type|interface) (\w+)/);
      return m && names.includes(m[2]!) ? `export ${l}` : l;
    })
    .join("\n");

// ═══ ۱) types.ts — ثابت‌ها + تایپ‌ها (اصل ۱۲۸..۱۴۸ + ۱۹۵..۲۳۴) ═══
const typesTs = `/**
 * تایپ‌ها و ثابت‌های «مار و پله واژگانی» — تفکیک مکانیکی از snakes-ladders-game.tsx
 * (گام ۸ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, type LucideIcon } from "lucide-react";

${exp(slice(128, 148), [
  "GAME_KEY",
  "ALL_LESSON",
  "MIN_POOL",
  "STEP_MS",
  "JUMP_MS",
  "BOT_DELAY",
  "BOT_SKILL",
  "BOT_SKILL_MIN",
  "BOT_SKILL_MAX",
  "ADAPTIVE_MIN_ROUNDS",
])}

${exp(slice(195, 234), [
  "DICE_FLIPS",
  "SNAKES",
  "LADDERS",
  "Phase",
  "Mode",
  "CatKey",
  "Player",
  "PStats",
  "Journey",
  "BestRecord",
  "TOKEN_BG",
  "DICE_ICONS",
])}
`;

// ═══ ۲) helpers.ts — توابع/داده‌های خالص ماژول-اسکوپ (اصل ۱۵۰..۱۹۴ + ۲۳۶..۳۴۲ + ۳۴۴..۳۵۲) ═══
const helpersTs = `/**
 * توابع خالص و داده‌های محاسبه‌شدهٔ ماژول «مار و پله» — تفکیک مکانیکی از snakes-ladders-game.tsx
 * (گام ۸ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * - ربات تطبیقی G5-03 (شمارندهٔ نشست + مهارت) · هندسهٔ SVG تخته SL1-01 · مکعب تاس SL1-04
 *   · confetti SL1-03 · برچسب درس · گزینهٔ غلط ربات — همهٔ خروجی‌ها خالص/ماژول-اسکوپ‌اند.
 */

import type { QuizQuestionSeed } from "@/data/types";
import { readGameWins } from "@/lib/badge-store";
import { faNum, getPlays } from "../shared";
import {
  ADAPTIVE_MIN_ROUNDS,
  BOT_SKILL,
  BOT_SKILL_MAX,
  BOT_SKILL_MIN,
  GAME_KEY,
  LADDERS,
  SNAKES,
} from "./types";

${exp(slice(150, 194), ["recordVsBotSessionResult", "computeAdaptiveBotSkill"])}

${exp(slice(236, 342), ["CELL_POS", "SNAKE_PATHS", "LADDER_GEOMS", "CUBE_FACES", "cubeTransform", "CONFETTI"])}

${exp(slice(344, 352), ["lessonLabel", "wrongIndexOf"])}
`;

// ═══ ۳) setup-panel.tsx — TUTORIAL_STEPS (اصل ۳۵۴..۳۷۱) + بدنهٔ شاخهٔ setup (اصل ۱۰۱۷..۱۱۹۷) ═══
const setupPanel = `"use client";

/**
 * setup-panel — نمای راه‌اندازی «مار و پله واژگانی» (گام ۸ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از snakes-ladders-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، حالت بازی (hotseat/ربات)، نام بازیکن‌ها، محدودهٔ سؤال‌ها، دسته، بج رکورد،
 * دکمهٔ شروع + آموزش ۳گامی (TUTORIAL_STEPS — صادرشده برای بقیهٔ نماها).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند
 * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Bot, Dices, Pause, Play, Sparkles, TrendingUp, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { QuizQuestionSeed } from "@/data/types";
import { faNum, fmtTime } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { lessonLabel } from "./helpers";
import { ALL_LESSON, GAME_KEY, TOKEN_BG, type CatKey, type Mode } from "./types";

interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  names: string[];
  setNames: Dispatch<SetStateAction<string[]>>;
  lesson: number;
  setLesson: Dispatch<SetStateAction<number>>;
  cat: CatKey;
  setCat: Dispatch<SetStateAction<CatKey>>;
  /** فهرست درس‌های موجود در استخر (برای چیپ‌های محدوده) */
  lessons: number[];
  /** تعداد واقعی سؤال هر چیپ محدوده (با اعمال دستهٔ فعال) */
  countFor: (l: number) => number;
  /** استخر سؤال‌های فیلترشدهٔ دور — فقط طولش در دکمهٔ شروع نمایش داده می‌شود */
  pool: QuizQuestionSeed[];
  best: number | null;
  start: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

${exp(slice(354, 371), ["TUTORIAL_STEPS"])}

export function SetupPanel({
  mode,
  setMode,
  count,
  setCount,
  names,
  setNames,
  lesson,
  setLesson,
  cat,
  setCat,
  lessons,
  countFor,
  pool,
  best,
  start,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
${dedent2(slice(1017, 1197))}
}
`;

// ═══ ۴) done-view.tsx — بدنهٔ شاخهٔ done (اصل ۱۲۰۲..۱۲۸۱) ═══
const doneView = `"use client";

/**
 * done-view — نمای پایان «مار و پله واژگانی» (گام ۸ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز done از snakes-ladders-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * confetti برد انسانی + ResultScreen کیت (ستاره‌بندی «سفر برنده») + کارنامهٔ بازیکن‌ها.
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند.
 */

import { Crown, Dices, Timer, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { faNum, fmtTime } from "../shared";
import { ResultScreen } from "../kit/result-screen";
import { CONFETTI } from "./helpers";
import { TOKEN_BG, type Journey, type Phase, type PStats, type Player } from "./types";

interface DoneViewProps {
  winner: number | null;
  players: Player[];
  stats: PStats[];
  /** سفر برنده (پله ‎+۱ / مار ‎−۱) — مبنای ستاره‌بندی */
  journey: Journey;
  isRecord: boolean;
  qNum: number;
  rolls: number;
  secs: number;
  start: () => void;
  setPhase: (p: Phase) => void;
}

export function DoneView({
  winner,
  players,
  stats,
  journey,
  isRecord,
  qNum,
  rolls,
  secs,
  start,
  setPhase,
}: DoneViewProps) {
${dedent2(slice(1202, 1281))}
}
`;

// ═══ ۵) playing-view.tsx — بدنهٔ شاخهٔ playing (اصل ۱۲۸۶..۱۶۳۶ — عیناً بدون dedent) ═══
const playingView = `"use client";

/**
 * playing-view — نمای حین بازی «مار و پله واژگانی» (گام ۸ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز playing از snakes-ladders-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * هدر GameShell (زمان/سؤال/نوبت/تاس/حالت + چیپ موقعیت‌ها)، کارت سؤال، تاس سه‌بعدی SL1-04،
 * تختهٔ ۱۰×۱۰ با SVG مار/پله SL1-01 و لایهٔ مهرهٔ متحرک، اورلی توقف، نگهبان خروج، کارت مدرس.
 * کامپوننت presentational — state/refs/زنجیرهٔ تایمر در index.tsx می‌ماند؛ props هم‌نام‌اند.
 */

import { Bot, Dices, Keyboard, Pause, Play, Timer, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuizQuestionSeed } from "@/data/types";
import { faNum, fmtTime } from "../shared";
import { toggleSoundMuted } from "../kit/sound-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import type { HintCoach } from "../kit/hint-coach";
import {
  CELL_POS,
  CUBE_FACES,
  LADDER_GEOMS,
  SNAKE_PATHS,
  cubeTransform,
  lessonLabel,
} from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { DICE_ICONS, GAME_KEY, LADDERS, SNAKES, TOKEN_BG, type Mode, type Player } from "./types";

interface PlayingViewProps {
  q: QuizQuestionSeed;
  players: Player[];
  positions: number[];
  cur: number;
  reveal: { picked: number; ok: boolean; byBot: boolean } | null;
  diceFace: number | null;
  /** key انیمیشن match-pop تاس */
  dicePop: number;
  /** مدت transition مهره‌ها (ms) — پله‌ای STEP_MS یا سُرش مار/پله JUMP_MS */
  slideMs: number;
  pulse: { cells: number[]; kind: "snake" | "ladder" } | null;
  mode: Mode;
  liveMsg: string;
  qNum: number;
  secs: number;
  paused: boolean;
  resume: () => void;
  togglePause: () => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  exitAsk: boolean;
  setExitAsk: (o: boolean) => void;
  confirmExit: () => void;
  handleHelp: () => void;
  handleExitClick: () => void;
  answerHuman: (idx: number, viaKey?: number) => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
  /** کارت مدرس بازی (element داخل GameShell رندر می‌شود) */
  hint: HintCoach;
}

export function PlayingView({
  q,
  players,
  positions,
  cur,
  reveal,
  diceFace,
  dicePop,
  slideMs,
  pulse,
  mode,
  liveMsg,
  qNum,
  secs,
  paused,
  resume,
  togglePause,
  muted,
  setMuted,
  exitAsk,
  setExitAsk,
  confirmExit,
  handleHelp,
  handleExitClick,
  answerHuman,
  tutorialOpen,
  handleTutorialOpenChange,
  hint,
}: PlayingViewProps) {
${slice(1286, 1636)}
}
`;

// ═══ ۶) index.tsx — هدر مستندات (اصل ۳..۶۰) + موتور (اصل ۳۷۳..۱۰۱۳) + سیم‌کشی سه شاخه ═══
const indexTsx = `"use client";
${slice(3, 60)}

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
// فاز SL0-01 نقشه راه مار و پله — حلقهٔ یادگیری: خطا → کارت مرور، درست → ارتقای کارت (الگوی cloze)
import { recordSRS, seedReviewFromQuiz } from "@/lib/srs-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
// فاز G2-e-1 — کیت GameKit v2 (قرارداد API سند — همان الگوی پایلوت memory و دوئل G2-d-3)
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
// فاز SL0-02 نقشه راه مار و پله — مدرس بازی (همان الگوی ۸ بازی واژگانی G5-01)
import { useHintCoach } from "../kit/hint-coach";
import { computeAdaptiveBotSkill, recordVsBotSessionResult, wrongIndexOf } from "./helpers";
import {
  ALL_LESSON,
  BOT_DELAY,
  BOT_SKILL,
  DICE_FLIPS,
  GAME_KEY,
  JUMP_MS,
  LADDERS,
  MIN_POOL,
  SNAKES,
  STEP_MS,
  type BestRecord,
  type CatKey,
  type Journey,
  type Mode,
  type Phase,
  type Player,
  type PStats,
} from "./types";
import { SetupPanel } from "./setup-panel";
import { DoneView } from "./done-view";
import { PlayingView } from "./playing-view";

${slice(373, 1013)}

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        mode={mode}
        setMode={setMode}
        count={count}
        setCount={setCount}
        names={names}
        setNames={setNames}
        lesson={lesson}
        setLesson={setLesson}
        cat={cat}
        setCat={setCat}
        lessons={lessons}
        countFor={countFor}
        pool={pool}
        best={best}
        start={start}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done — فاز G2-e-1: صفحهٔ نتیجهٔ استاندارد کیت جایگزین نمای دستی قبلی ──
  if (phase === "done") {
    return (
      <DoneView
        winner={winner}
        players={players}
        stats={stats}
        journey={journey}
        isRecord={isRecord}
        qNum={qNum}
        rolls={rolls}
        secs={secs}
        start={start}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  if (!q || players.length === 0) return null;
  return (
    <PlayingView
      q={q}
      players={players}
      positions={positions}
      cur={cur}
      reveal={reveal}
      diceFace={diceFace}
      dicePop={dicePop}
      slideMs={slideMs}
      pulse={pulse}
      mode={mode}
      liveMsg={liveMsg}
      qNum={qNum}
      secs={secs}
      paused={paused}
      resume={resume}
      togglePause={togglePause}
      muted={muted}
      setMuted={setMuted}
      exitAsk={exitAsk}
      setExitAsk={setExitAsk}
      confirmExit={confirmExit}
      handleHelp={handleHelp}
      handleExitClick={handleExitClick}
      answerHuman={answerHuman}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
      hint={hint}
    />
  );
}
`;

writeFileSync(`${DIR}/types.ts`, typesTs);
writeFileSync(`${DIR}/helpers.ts`, helpersTs);
writeFileSync(`${DIR}/setup-panel.tsx`, setupPanel);
writeFileSync(`${DIR}/done-view.tsx`, doneView);
writeFileSync(`${DIR}/playing-view.tsx`, playingView);
writeFileSync(`${DIR}/index.tsx`, indexTsx);
console.log("extracted ✓");
