"use client";

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

/**
 * فاز G2-c — CSS افکت بصری واحد بج کمبو (کلاس مشترک کیت «combo-fire» — رشتهٔ آن از
 * combo-engine می‌آید) روی بج ضریب. کلیدفریمز محلیِ این فایل است تا وقتی کیت CSS مرکزی
 * ندارد (الگوی hangman) — نام یکتا تا با بازی‌های دیگر تداخل نکند.
 * reduced-motion: هم media query محلی و هم motion-reduce:animate-none روی خود بج.
 */
const COMBO_FIRE_CSS = `
@keyframes speedquiz-combo-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}
.combo-fire { animation: speedquiz-combo-pulse 0.9s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .combo-fire { animation: none; }
}
`;

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
  // فاز G3-05 — در بی‌پایان: بج زمان صعودی است، فوریت قرمز و نوار پیشرفت معنی ندارد
  const isEndless = mode === "endless";
  const pct = Math.max(0, Math.min(100, Math.round((timeLeft / totalSecs) * 100)));
  const urgent = !isEndless && timeLeft <= 5;
  return (
    <>
      {/* فاز G2-c — CSS افکت combo-fire (کلاس مشترک کیت؛ کلیدفریمز محلی + reduced-motion) */}
      <style>{COMBO_FIRE_CSS}</style>
      {/* فاز G2-c — هدر یکنواخت از کیت: نام + بج‌ها + راهنما/توقف/صدا/انصراف */}
      <GameShell
        title={isEndless ? "تست برقی — تمرین بی‌پایان" : "تست برقی"}
        icon={isEndless ? <InfinityIcon size={18} /> : <Zap size={18} />}
        stats={
          <>
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-2.5 py-1 text-[13px] font-black",
                urgent && "border-destructive/60 bg-destructive/10 text-destructive",
              )}
            >
              <Clock size={13} />
              {isEndless ? fmtTime(elapsed) : fmtTime(timeLeft)}
            </Badge>
            <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
              <Star size={13} className="text-amber-500" />
              {faNum(score)}
            </Badge>
            {combo >= 2 ? (
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400",
                  // فاز G2-c — افکت بصری واحد کیت وقتی ضریب > ۱ (با احترام به reduced-motion)
                  multiplier > 1 && COMBO_FIRE_CLASS,
                  "motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(multiplier)}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Flame size={12} />
                کمبو ×۱
              </Badge>
            )}
            <Badge variant="secondary" className="px-2.5 py-1 text-[12px] font-bold">
              سؤال {faNum(qNum)}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          isEndless ? undefined : (
          /* نوار زمان — همان پیشرفت قبلی (فوریت رنگ در ۵ ثانیهٔ آخر حفظ شد) */
          <div
            className="h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="زمان باقی‌مانده"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-linear",
                urgent ? "bg-destructive" : "bg-primary",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
          )
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div className={cn("space-y-4", paused && "pointer-events-none blur-sm")} aria-hidden={paused}>
            {/* کارت سؤال */}
            <div
              className={cn(
                "rounded-2xl border bg-card p-5 space-y-4 sm:p-6",
                flash === "bad" && "match-shake border-destructive/60",
              )}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary" className="text-[10px]">
                  {lessonLabel(q.lesson)}
                </Badge>
                <Badge variant="outline" className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
                  {q.level}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {q.category === "vocabulary" ? "واژگان" : "گرامر"}
                </Badge>
                {/* فاز G5-02 — بج سؤال هوشمند */}
                {isAiSeed(q) && (
                  <Badge variant="outline" className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
                    ✨ هوشمند
                  </Badge>
                )}
              </div>

              <p dir="ltr" className="font-en text-[15px] font-bold leading-8 sm:text-base">
                {q.text}
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, i) => (
                  <button
                    key={`${qNum}-${i}`}
                    type="button"
                    onClick={() => answer(i)}
                    className={cn(
                      "flex min-h-12 items-center gap-2 rounded-xl border bg-card px-4 py-2 text-right transition-all",
                      "hover:border-primary/50 hover:bg-muted/40",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    )}
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-black">
                      {faNum(i + 1)}
                    </span>
                    <span dir="ltr" className="flex-1 font-en text-[14px] font-bold leading-6">
                      {opt}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skip}
                  className="gap-1.5 text-[11px] text-muted-foreground"
                >
                  <SkipForward size={13} />
                  رد کردن
                </Button>
              </div>
            </div>
          </div>

          {/* فاز G2-c — اورلی توقف (الگوی کیت): در تست برقی «برق» موقتاً قطع می‌شود */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">برق قطع شد! ⏸</p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-c — نگهبان خروج استاندارد کیت · فاز G3-05 — در بی‌پایان تأیید = پایان صریح دور */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          title={isEndless ? "تمرین بی‌پایان را تمام کنم؟ ⏹" : undefined}
          description={
            isEndless
              ? "آمار همین لحظهٔ دور ثبت می‌شود و صفحهٔ نتیجه باز می‌شود."
              : undefined
          }
          confirmLabel={isEndless ? "آره، تمام کن" : undefined}
          onConfirm={() => {
            if (isEndless) {
              // فاز G3-05 — خروج صریح = Attempt با پیشرفت فعلی + ResultScreen
              setExitAsk(false);
              resume();
              finishEndless();
              return;
            }
            // رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            overRef.current = true;
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-c — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
