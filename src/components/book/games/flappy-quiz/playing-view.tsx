"use client";

/**
 * playing-view — نمای حین پرواز «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز playing از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * GameShell (امتیاز/کمبو/قلب‌ها/بی‌پایان + سؤال دیوار پیش‌رو + liveMsg) + بوم canvas + اورلی توقف
 * (با «پایان پرواز» دور بی‌پایان) + نگهبان خروج کیت + راهنمای شِل. کامپوننت presentational —
 * حلقهٔ rAF و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند (شامل refs ساختاری
 * endlessRef/overRef/sessionRef/canvasRef) تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Bird, Flag, Flame, Heart, Infinity as InfinityIcon, Pause, Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { QuizQuestionSeed } from "@/data/types";
import { stopSpeaking } from "@/lib/speak";
import { COMBO_FIRE_CLASS } from "../kit/combo-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import type { GameSessionTracker } from "../kit/telemetry";
import { toggleSoundMuted } from "../kit/sound-engine";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { faNum } from "../shared";
import { qLabel } from "./helpers";
import { GAME_KEY, HEARTS, type Phase } from "./types";

/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */
interface PlayingViewProps {
  score: number;
  combo: number;
  hearts: number;
  endless: boolean;
  endlessRef: { current: boolean };
  liveMsg: string;
  hudQ: QuizQuestionSeed | null;
  paused: boolean;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  exitAsk: boolean;
  setExitAskSafe: (v: boolean) => void;
  canvasRef: { current: HTMLCanvasElement | null };
  tutorialSteps: TutorialStep[];
  tutorialOpen: boolean;
  handleTutorialOpenChange: (o: boolean) => void;
  handleHelp: () => void;
  handleExitClick: () => void;
  togglePause: () => void;
  resume: () => void;
  finishEndless: (reason: "finish" | "exit") => void;
  sessionRef: { current: GameSessionTracker | null };
  overRef: { current: boolean };
  setPhase: Dispatch<SetStateAction<Phase>>;
}

export function PlayingView({
  score,
  combo,
  hearts,
  endless,
  endlessRef,
  liveMsg,
  hudQ,
  paused,
  muted,
  setMuted,
  exitAsk,
  setExitAskSafe,
  canvasRef,
  tutorialSteps,
  tutorialOpen,
  handleTutorialOpenChange,
  handleHelp,
  handleExitClick,
  togglePause,
  resume,
  finishEndless,
  sessionRef,
  overRef,
  setPhase,
}: PlayingViewProps) {
  return (
    <>
      {/* فاز G2-c — هدر یکنواخت از کیت (الگوی پایلوت memory/جای خالی) */}
      <GameShell
        title="فلپی گزینش"
        icon={<Bird size={18} />}
        stats={
          <>
            <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
              <Star size={13} className="text-amber-500" />
              {faNum(score)}
            </Badge>
            {combo >= 2 ? (
              <Badge
                key={combo}
                variant="outline"
                className={cn(
                  "gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400",
                  // فاز G2-c — افکت بصری واحد بج کمبو (کیت) + pulse ساده با گارد reduced-motion
                  COMBO_FIRE_CLASS,
                  "animate-pulse motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(combo)}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Flame size={12} />
                کمبو ×۱
              </Badge>
            )}
            {endless ? (
              // فاز G3-05 — در بی‌پایان قلب معنا ندارد (هیچ‌چیز دور را تمام نمی‌کند)
              <Badge
                variant="outline"
                className="gap-1.5 border-teal-500/50 bg-teal-500/10 px-2.5 py-1 text-[13px] font-black text-teal-600 dark:text-teal-400"
              >
                <InfinityIcon size={13} />
                بی‌پایان
              </Badge>
            ) : (
              <span
                role="img"
                aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`}
                className="flex items-center gap-1"
              >
                {Array.from({ length: HEARTS }, (_, i) => (
                  <Heart
                    key={i}
                    size={15}
                    fill={i < hearts ? "currentColor" : "none"}
                    className={i < hearts ? "text-destructive" : "text-muted-foreground/35"}
                  />
                ))}
              </span>
            )}
          </>
        }
        liveMsg={liveMsg}
        progress={
          hudQ ? (
            <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2.5">
              <Badge
                variant="outline"
                className="shrink-0 border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-400"
              >
                دیوار پیش‌رو
              </Badge>
              <p dir="ltr" className="font-en min-w-0 flex-1 truncate text-left text-[13px] font-bold sm:text-sm">
                {qLabel(hudQ.text)}
              </p>
            </div>
          ) : undefined
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div
            className={cn(
              "overflow-hidden rounded-2xl border bg-card shadow-sm",
              paused && "pointer-events-none blur-sm",
            )}
            aria-hidden={paused}
          >
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="بازی فلپی گزینش — برای بال زدن کلیک کن یا Space بزن"
              className="block h-[480px] w-full touch-none select-none bg-gradient-to-b from-teal-50 via-emerald-50/60 to-emerald-100 dark:from-teal-950 dark:via-emerald-950/70 dark:to-emerald-950"
            />
          </div>

          {/* فاز G2-c — اورلی توقف (الگوی پایلوت memory): بوم تار و غیرقابل‌کلیک */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">بازی متوقف شد</p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
              {endless && (
                // فاز G3-05 — پایان فقط با خروج صریح: دکمهٔ «پایان پرواز» در اورلی توقف
                <Button
                  variant="outline"
                  className="h-11 gap-2 border-teal-500/50 text-teal-700 hover:bg-teal-500/10 dark:text-teal-400"
                  onClick={() => finishEndless("finish")}
                >
                  <Flag size={16} />
                  پایان پرواز
                </Button>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          {endless
            ? "کلیک/لمس یا Space = بال زدن — هیچ‌چیز دور را تمام نمی‌کند؛ پایان پرواز: توقف ⏸ ← «پایان پرواز» یا خروج"
            : "کلیک/لمس روی بوم یا Space = بال زدن — از دهانهٔ گزینهٔ درست رد شو"}
        </p>

        {/* فاز G2-c — نگهبان خروج استاندارد کیت (حین پرواز با پیشرفت) */}
        <GameExitGuard
          open={exitAsk}
          // فاز G3-05 — در بی‌پایان تأیید خروج = پایان صریح دور (متن پیش‌فرض فقط برای دور عادی)
          title={endless ? "پرواز بی‌پایان همین‌جا تمام شود؟ 🏁" : undefined}
          description={
            endless
              ? "امتیاز و آمار همین لحظه ثبت می‌شود و صفحهٔ نتیجهٔ دور را می‌بینی."
              : undefined
          }
          confirmLabel={endless ? "آره، پایان پرواز" : undefined}
          onOpenChange={(o) => {
            setExitAskSafe(o);
            // انصراف از خروج (Esc/کلیک بیرون/«نه») → پرواز از همان‌جا ادامه یابد
            if (!o) resume();
          }}
          onConfirm={() => {
            // فاز G3-05 — در تمرین بی‌پایان خروج صریح است: Attempt + تله‌متری + نتیجه
            if (endlessRef.current) {
              finishEndless("exit");
              return;
            }
            // فاز G2-c — رهاکردن دور نیمه‌کاره + تله‌متری (مسیر عادی — عین قبل)
            sessionRef.current?.abandon("exit");
            stopSpeaking();
            overRef.current = true;
            setExitAskSafe(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-c — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={tutorialSteps}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
