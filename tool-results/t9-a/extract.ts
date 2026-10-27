// گام ۹ — استخراج مکانیکی speed-quiz-game.tsx به games/speed-quiz/ (پلی‌بوک fps/).
// برش خطی دقیق از `git show HEAD:...` — بدون ویرایش دستی JSX. تنها دلتاهای مجاز:
// «use client» + هدر کامنت ماژول + پسوند export + importهای جدید + dedent یکنواخت JSX
// شاخه‌های setup/done (داخل if بودند؛ در کامپوننت مستقل ۲ فاصله کمتر تورفتگی دارند).
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";

const CWD = "/home/z/my-project";
const orig = execSync("git show HEAD:src/components/book/games/speed-quiz-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1495) throw new Error(`HEAD file: expected 1495 lines, got ${orig.length}`);

const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");
// dedent یکنواخت ۲ فاصله (فقط برای JSX منتقل‌شده به کامپوننت — رندر JSX یکسان)
const dedent2 = (s: string) =>
  s
    .split("\n")
    .map((l) => (l.startsWith("  ") ? l.slice(2) : l))
    .join("\n");
// پسوند export روی نام‌های مشخص (تنها دلتای مجاز روی برش‌ها)
const exp = (s: string, names: string[]) => {
  let out = s;
  for (const n of names) {
    const re = new RegExp(`^(const|type|interface|function|(async function)) ${n}\\b`, "m");
    if (!re.test(out)) throw new Error(`export target not found: ${n}`);
    out = out.replace(re, "export $&");
  }
  return out;
};

const DIR = `${CWD}/src/components/book/games/speed-quiz`;
mkdirSync(DIR, { recursive: true });
const write = (f: string, c: string) => {
  writeFileSync(`${DIR}/${f}`, c);
  console.log(`  wrote ${f}: ${c.split("\n").length - 1} lines`);
};

// ── ۱) types.ts — اصل ۱۲۰..۱۳۳ + ۲۷۲..۲۷۶ (دلتا: export) ──
write(
  "types.ts",
  `/**
 * types — ثابت‌ها و تایپ‌های مشترک بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — محتوا عیناً از فایل اصلی؛
 * تنها دلتا: پسوند export. قراردادهای مقدس: GAME_KEY/اسکوپ رکورد/کلیدهای localStorage.
 */

${exp(slice(120, 133), ["GAME_KEY", "ALL_LESSON", "MIN_POOL", "DURATIONS", "Phase", "CatKey", "RoundMode", "BestRecord"])}

${exp(slice(272, 276), ["WrongItem"])}
`,
);

// ── ۲) helpers.ts — اصل ۱۳۵..۲۳۴ (دلتا: export روی ۷ تابع؛ Rank خصوصی می‌ماند) ──
write(
  "helpers.ts",
  `/**
 * helpers — منطق خالص بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — بدون اثر جانبی؛
 * scopeOf/scopeFor/quizKeyOf/shapeOptions/smartOrderDeck/rankOf/lessonLabel عیناً از فایل اصلی
 * (تنها دلتا: پسوند export روی توابع؛ Rank خصوصی می‌ماند).
 */

import { Sprout, Trophy, Wind, Zap, type LucideIcon } from "lucide-react";
import type { QuizQuestionSeed } from "@/data/types";
import { optionsFor, scopeWithLevel, type DifficultyKey } from "../kit/difficulty";
import { smartPick } from "../kit/smart-pick";
import { faNum, shuffle } from "../shared";
import { ALL_LESSON, type CatKey, type RoundMode } from "./types";

${exp(slice(135, 234), ["scopeOf", "scopeFor", "quizKeyOf", "shapeOptions", "smartOrderDeck", "rankOf", "lessonLabel"])}
`,
);

// ── ۳) ai.ts — اصل ۲۷۸..۴۱۶ (بخش کامل G5-02 — دلتا: export روی ۵ عضو مصرفی بیرون) ──
write(
  "ai.ts",
  `/**
 * ai — فاز G5-02 «سؤال‌های هوشمند ✨» بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — تولید دینامیک از واژگان همین کتاب؛
 * کل بخش عیناً از فایل اصلی منتقل شده (تنها دلتا: export روی AI_MIN_POOL/AI_POOL_SAMPLE/
 * isAiSeed/fetchAiQuestions/aiQuestionsToSeeds — بقیه خصوصی می‌مانند).
 */

import type { QuizQuestionSeed } from "@/data/types";
import { type DifficultyKey } from "../kit/difficulty";
import { shuffle } from "../shared";
import { shapeOptions } from "./helpers";

${exp(slice(278, 416), ["AI_MIN_POOL", "AI_POOL_SAMPLE", "isAiSeed", "fetchAiQuestions", "aiQuestionsToSeeds"])}
`,
);

// ── ۴) setup-panel.tsx — TUTORIAL_STEPS (۲۳۶..۲۵۳) + chipCls (۱۰۵۵..۱۰۶۱) + بدنهٔ setup (۱۰۶۵..۱۲۶۲) ──
write(
  "setup-panel.tsx",
  `"use client";

/**
 * setup-panel — نمای setup + آموزش ۳گامی بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی JSX از speed-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * آموزش استاندارد (TUTORIAL_STEPS) + چیپ‌های محدوده/دسته/مدت + انتخاب سطح دشواری + سوییچ
 * سؤال‌های هوشمند + دو دکمهٔ شروع (تایم‌دار/بی‌پایان) + TutorialOverlay.
 * کامپوننت presentational — state در index.tsx می‌ماند؛ props هم‌نام‌اند.
 */

import {
  Flame,
  Infinity as InfinityIcon,
  Loader2,
  Play,
  Sparkles,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { optionsFor, type DifficultyKey } from "../kit/difficulty";
import { DifficultyPicker } from "../kit/difficulty-picker";
import { buzz } from "../kit/haptics";
import { playSound } from "../kit/sound-engine";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { faNum } from "../shared";
import { lessonLabel } from "./helpers";
import { ALL_LESSON, DURATIONS, GAME_KEY, type CatKey, type RoundMode } from "./types";

${slice(236, 253).replace("const TUTORIAL_STEPS", "export const TUTORIAL_STEPS")}

${slice(1055, 1061)}

interface SetupPanelProps {
  lesson: number;
  setLesson: (v: number) => void;
  cat: CatKey;
  setCat: (key: CatKey) => void;
  duration: number;
  setDuration: (d: number) => void;
  lessons: number[];
  countFor: (l: number) => number;
  level: DifficultyKey;
  changeLevel: (l: DifficultyKey) => void;
  totalSecs: number;
  weakCount: number;
  best: number | null;
  aiOn: boolean;
  setAiOn: Dispatch<SetStateAction<boolean>>;
  beginRound: (roundMode: RoundMode) => void;
  pendingMode: RoundMode | null;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function SetupPanel({
  lesson,
  setLesson,
  cat,
  setCat,
  duration,
  setDuration,
  lessons,
  countFor,
  level,
  changeLevel,
  totalSecs,
  weakCount,
  best,
  aiOn,
  setAiOn,
  beginRound,
  pendingMode,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
${dedent2(slice(1065, 1262))}
}
`,
);

// ── ۵) done-view.tsx — بدنهٔ done (۱۲۶۸..۱۲۸۹ — rank/acc/stars + ResultScreen) ──
write(
  "done-view.tsx",
  `"use client";

/**
 * done-view — نمای نتیجهٔ بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی JSX از speed-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * محاسبهٔ رتبه/دقت/ستاره + ResultScreen کیت (presentational — props هم‌نام از index).
 */

import { Flame, Star, Target } from "lucide-react";
import { levelScore, type DifficultyKey } from "../kit/difficulty";
import { ResultScreen } from "../kit/result-screen";
import { faNum } from "../shared";
import { rankOf } from "./helpers";
import type { Phase, RoundMode, WrongItem } from "./types";

interface DoneViewProps {
  score: number;
  mode: RoundMode;
  level: DifficultyKey;
  answered: number;
  correct: number;
  wrongList: WrongItem[];
  isRecord: boolean;
  maxCombo: number;
  beginRound: (roundMode: RoundMode) => void;
  setPhase: (p: Phase) => void;
}

export function DoneView({
  score,
  mode,
  level,
  answered,
  correct,
  wrongList,
  isRecord,
  maxCombo,
  beginRound,
  setPhase,
}: DoneViewProps) {
${dedent2(slice(1268, 1289))}
}
`,
);

// ── ۶) playing-view.tsx — COMBO_FIRE_CSS (۲۵۵..۲۷۰) + بدنهٔ playing (۱۲۹۴..۱۴۹۴ عیناً) ──
write(
  "playing-view.tsx",
  `"use client";

/**
 * playing-view — نمای حین بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی JSX از speed-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * هدر GameShell (زمان/امتیاز/کمبو/سؤال) + نوار زمان + کارت سؤال + اورلی توقف
 * + نگهبان خروج (بی‌پایان = پایان صریح دور) + آموزش حین بازی.
 * کامپوننت presentational — state/refs/تایمر در index.tsx می‌ماند؛ props هم‌نام‌اند.
 */

import {
  Clock,
  Flame,
  Infinity as InfinityIcon,
  Pause,
  Play,
  SkipForward,
  Star,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizQuestionSeed } from "@/data/types";
import { stopSpeaking } from "@/lib/speak";
import { COMBO_FIRE_CLASS } from "../kit/combo-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { toggleSoundMuted } from "../kit/sound-engine";
import type { GameSessionTracker } from "../kit/telemetry";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import { faNum, fmtTime } from "../shared";
import { isAiSeed } from "./ai";
import { lessonLabel } from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, type Phase, type RoundMode } from "./types";

${slice(255, 270)}

interface PlayingViewProps {
  q: QuizQuestionSeed;
  mode: RoundMode;
  timeLeft: number;
  totalSecs: number;
  elapsed: number;
  score: number;
  combo: number;
  multiplier: number;
  qNum: number;
  liveMsg: string;
  paused: boolean;
  resume: () => void;
  togglePause: () => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  exitAsk: boolean;
  setExitAsk: (o: boolean) => void;
  finishEndless: () => void;
  sessionRef: { current: GameSessionTracker | null };
  overRef: { current: boolean };
  setPhase: (p: Phase) => void;
  answer: (idx: number) => void;
  skip: () => void;
  flash: "bad" | null;
  handleHelp: () => void;
  handleExitClick: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function PlayingView({
  q,
  mode,
  timeLeft,
  totalSecs,
  elapsed,
  score,
  combo,
  multiplier,
  qNum,
  liveMsg,
  paused,
  resume,
  togglePause,
  muted,
  setMuted,
  exitAsk,
  setExitAsk,
  finishEndless,
  sessionRef,
  overRef,
  setPhase,
  answer,
  skip,
  flash,
  handleHelp,
  handleExitClick,
  tutorialOpen,
  handleTutorialOpenChange,
}: PlayingViewProps) {
${slice(1294, 1494)}
}
`,
);

// ── ۷) index.tsx — هدر مستندات (۳..۴۸) + موتور (۴۱۸..۱۰۵۳) + سیم‌کشی سه شاخه با props هم‌نام ──
write(
  "index.tsx",
  `"use client";

/**
 * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/)؛
 * JSX بایت‌به‌بایت منتقل شده است (صحه‌گذاری: tool-results/t9-a/verify.ts).
 * index.tsx = فقط موتور/ارکستراسیون — نمای‌ها: setup-panel/done-view/playing-view؛
 * منطق خالص: helpers.ts + ai.ts؛ ثابت‌ها و تایپ‌های مشترک: types.ts.
 */

${slice(3, 48)}

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
import { useCombo } from "../kit/combo-engine";
import {
  LEVEL_KNOBS,
  levelScore,
  loadLevelPref,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "../kit/difficulty";
import { buzz } from "../kit/haptics";
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { countWeak } from "../kit/smart-pick";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { useGamePause } from "../kit/use-pause";
import {
  AI_MIN_POOL,
  AI_POOL_SAMPLE,
  aiQuestionsToSeeds,
  fetchAiQuestions,
  isAiSeed,
} from "./ai";
import { scopeFor, scopeOf, quizKeyOf, shapeOptions, smartOrderDeck } from "./helpers";
import {
  ALL_LESSON,
  GAME_KEY,
  MIN_POOL,
  type BestRecord,
  type CatKey,
  type Phase,
  type RoundMode,
  type WrongItem,
} from "./types";
import { DoneView } from "./done-view";
import { PlayingView } from "./playing-view";
import { SetupPanel } from "./setup-panel";

${slice(418, 1053)}

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        lesson={lesson}
        setLesson={setLesson}
        cat={cat}
        setCat={setCat}
        duration={duration}
        setDuration={setDuration}
        lessons={lessons}
        countFor={countFor}
        level={level}
        changeLevel={changeLevel}
        totalSecs={totalSecs}
        weakCount={weakCount}
        best={best}
        aiOn={aiOn}
        setAiOn={setAiOn}
        beginRound={beginRound}
        pendingMode={pendingMode}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت (رتبهٔ شخصی در عنوان حفظ شد) ──
  // فاز G3-05 — نتیجهٔ بی‌پایان: عنوان و امتیاز ×۱ مخصوص خودش (بدون levelScore)
  if (phase === "done") {
    return (
      <DoneView
        score={score}
        mode={mode}
        level={level}
        answered={answered}
        correct={correct}
        wrongList={wrongList}
        isRecord={isRecord}
        maxCombo={maxCombo}
        beginRound={beginRound}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  if (!q) return null;
  return (
    <PlayingView
      q={q}
      mode={mode}
      timeLeft={timeLeft}
      totalSecs={totalSecs}
      elapsed={elapsed}
      score={score}
      combo={combo}
      multiplier={multiplier}
      qNum={qNum}
      liveMsg={liveMsg}
      paused={paused}
      resume={resume}
      togglePause={togglePause}
      muted={muted}
      setMuted={setMuted}
      exitAsk={exitAsk}
      setExitAsk={setExitAsk}
      finishEndless={finishEndless}
      sessionRef={sessionRef}
      overRef={overRef}
      setPhase={setPhase}
      answer={answer}
      skip={skip}
      flash={flash}
      handleHelp={handleHelp}
      handleExitClick={handleExitClick}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
    />
  );
}
`,
);

console.log("extract done.");
