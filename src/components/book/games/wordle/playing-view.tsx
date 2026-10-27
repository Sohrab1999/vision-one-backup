"use client";

/**
 * playing-view — نمای حین بازی «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز playing از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * GameShell کیت (بج حالت/حدس/زنجیره + نوار پیشرفت + توقف/صدا/راهنما/خروج) + گرید ۶×N فلیپ
 * دو-گذره + کیبورد QWERTY رنگی + اورلی توقف + نگهبان خروج (متن مخصوص استریک روزانه) +
 * کارت مدرس بازی G5-01 + آموزش ۳گامی.
 * کامپوننت presentational — state/تایمرهای فلیپ در index.tsx می‌مانند؛ props هم‌نام‌اند.
 */

import { Keyboard, Sun, Infinity as InfinityIcon, Target, Trophy, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faNum } from "../shared";
import { toggleSoundMuted } from "../kit/sound-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import type { HintCoach } from "../kit/hint-coach";
import { KEY_ROWS, VERDICT_FACE, VERDICT_FA, judgeVerdicts } from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, MAX_ROWS } from "./constants";
import type { MetaSnapshot, Verdict, WordLevel } from "./types";

interface PlayingViewProps {
  /** نمای بازی روزانه فعال — مبنای isDaily و متن نگهبان خروج */
  dailyPlayingView: boolean;
  /** طول واژهٔ دور جاری — روزانه همیشه ۵، بی‌نهایت = طول انتخابی */
  activeLen: WordLevel;
  /** حدس‌های ثبت‌شدهٔ دور جاری (روزانه: از استور) */
  activeCommitted: string[];
  activeAnswer: string;
  /** ورودی جاری ردیف فعال */
  input: string;
  /** بهترین وضعیت هر حرف روی کیبورد — از همهٔ حدس‌ها */
  keyStatus: Map<string, Verdict>;
  /** کلید لرزش ردیف جاری — با تغییر key انیمیشن دوباره اجرا می‌شود */
  shakeKey: number;
  /** ردیف در حال فلیپ (-1 = هیچ) */
  revealRow: number;
  /** چند ستونِ ردیف در حال فلیپ برگشته‌اند */
  flipCols: number;
  meta: MetaSnapshot;
  liveMsg: string;
  paused: boolean;
  togglePause: () => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  handleHelp: () => void;
  handleExitClick: () => void;
  submitGuess: () => void;
  eraseLetter: () => void;
  typeLetter: (letter: string) => void;
  resume: () => void;
  exitAsk: boolean;
  setExitAsk: (o: boolean) => void;
  confirmExit: () => void;
  /** کارت مدرس بازی (element داخل GameShell رندر می‌شود) */
  hint: HintCoach;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function PlayingView({
  dailyPlayingView,
  activeLen,
  activeCommitted,
  activeAnswer,
  input,
  keyStatus,
  shakeKey,
  revealRow,
  flipCols,
  meta,
  liveMsg,
  paused,
  togglePause,
  muted,
  setMuted,
  handleHelp,
  handleExitClick,
  submitGuess,
  eraseLetter,
  typeLetter,
  resume,
  exitAsk,
  setExitAsk,
  confirmExit,
  hint,
  tutorialOpen,
  handleTutorialOpenChange,
}: PlayingViewProps) {
  // ── Playing: گرید ۶×N + کیبورد (مشترک بین دو حالت) — فاز G2-d: GameShell ──
  const isDaily = dailyPlayingView;
  const gridColsClass = activeLen === 4 ? "grid-cols-4" : activeLen === 5 ? "grid-cols-5" : "grid-cols-6";
  return (
    <>
      <GameShell
        title="وردل ویژن"
        icon={<Keyboard size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              {isDaily ? (
                <Sun size={11} className="text-amber-500" />
              ) : (
                <InfinityIcon size={11} className="text-teal-500" />
              )}
              {isDaily ? "واژهٔ امروز" : `بی‌نهایت · ${faNum(activeLen)}حرفی`}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Target size={11} className="text-primary" />
              حدس {faNum(Math.min(activeCommitted.length + 1, MAX_ROWS))} از {faNum(MAX_ROWS)}
            </Badge>
            {meta.streak && meta.streak.streak > 0 && (
              <Badge variant="secondary" className="gap-1 text-[11px]">
                <Trophy size={11} className="text-amber-500" />
                زنجیره {faNum(meta.streak.streak)}
              </Badge>
            )}
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.round((activeCommitted.length / MAX_ROWS) * 100)}%` }}
            />
          </div>
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className={cn("space-y-3", paused && "pointer-events-none select-none blur-sm")}
            aria-hidden={paused}
          >
            {/* گرید ۶×N */}
            <div dir="ltr" className="space-y-1.5" aria-label="جدول حدس‌ها">
              {Array.from({ length: MAX_ROWS }, (_, r) => {
                const isJudged = r < activeCommitted.length;
                const isActiveRow = r === activeCommitted.length;
                const verdicts = isJudged ? judgeVerdicts(activeCommitted[r], activeAnswer, activeLen) : null;
                return (
                  <div
                    key={isActiveRow ? `active-${r}-${shakeKey}` : r}
                    className={cn("grid gap-1.5", gridColsClass, isActiveRow && shakeKey > 0 && "match-shake")}
                  >
                    {Array.from({ length: activeLen }, (_, c) => {
                      const letter = isJudged
                        ? activeCommitted[r][c]
                        : isActiveRow
                          ? (input[c] ?? "")
                          : "";
                      const v = verdicts ? verdicts[c] : null;
                      const flipped = isJudged && (r !== revealRow || c < flipCols);
                      const label = isJudged && v
                        ? `ردیف ${faNum(r + 1)} حرف ${faNum(c + 1)}: ${letter.toUpperCase()} — ${VERDICT_FA[v]}`
                        : `ردیف ${faNum(r + 1)} حرف ${faNum(c + 1)}${letter ? `: ${letter.toUpperCase()}` : " — خالی"}`;
                      return (
                        <div key={c} aria-label={label} className="flip-scene aspect-square">
                          <div className={cn("flip-inner", flipped && "flipped")}>
                            {/* روی سلول — حرف روی زمینهٔ خالی */}
                            <div
                              className={cn(
                                "flip-face flex h-full w-full items-center justify-center rounded-lg border-2",
                                letter ? "border-foreground/40 bg-card" : "border-muted-foreground/25 bg-card",
                              )}
                            >
                              {letter && (
                                <span className="font-en text-xl font-black uppercase sm:text-2xl">
                                  {letter.toUpperCase()}
                                </span>
                              )}
                            </div>
                            {/* پشت سلول — رنگ حکم */}
                            <div
                              className={cn(
                                "flip-face flip-back flex h-full w-full items-center justify-center rounded-lg border-2",
                                v ? VERDICT_FACE[v] : "border-muted bg-card",
                              )}
                            >
                              {letter && (
                                <span className="font-en text-xl font-black uppercase sm:text-2xl">
                                  {letter.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* کیبورد QWERTY */}
            <div dir="ltr" role="group" aria-label="کیبورد حدس" className="space-y-1.5">
              {KEY_ROWS.map((row, ri) => (
                <div key={ri} className="flex justify-center gap-1 sm:gap-1.5">
                  {row.map((k) => {
                    if (k === "enter" || k === "back") {
                      const isEnter = k === "enter";
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={isEnter ? submitGuess : eraseLetter}
                          aria-label={isEnter ? "ارسال حدس" : "حذف حرف آخر"}
                          className="flex min-h-11 flex-[1.6] items-center justify-center rounded-lg border border-border bg-muted/60 px-1 font-en text-[11px] font-black text-foreground transition-all hover:bg-muted active:scale-95"
                        >
                          {isEnter ? "ENTER" : "⌫"}
                        </button>
                      );
                    }
                    const st = keyStatus.get(k) ?? null;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => typeLetter(k)}
                        aria-label={`حرف ${k.toUpperCase()}`}
                        className={cn(
                          "flex min-h-11 flex-1 items-center justify-center rounded-lg border font-en text-[13px] font-black uppercase transition-all active:scale-95",
                          !st && "border-border bg-muted/50 text-foreground hover:bg-muted",
                          st === "correct" && VERDICT_FACE.correct,
                          st === "present" && VERDICT_FACE.present,
                          st === "absent" && VERDICT_FACE.absent,
                        )}
                      >
                        {k.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] leading-5 text-muted-foreground">
              کیبورد فیزیکی هم کار می‌کند — تایپ کن، Enter بفرست، Backspace پاک کن. حدس باید واژه‌ای از واژگان{" "}
              {faNum(activeLen)}حرفی کتاب باشد.
            </p>
          </div>

          {/* فاز G2-d — اورلی توقف: گرید و کیبورد تار و غیرقابل‌کلیک؛ اعلام در liveMsg شِل */}
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
            </div>
          )}
        </div>

        {/* G5-01 — کارت مدرس بازی */}
        {hint.element}
      </GameShell>

      {/* فاز G2-d — نگهبان خروج استاندارد کیت؛ روزانه: متن مخصوص استریک نیمه‌کاره */}
      <GameExitGuard
        open={exitAsk}
        onOpenChange={setExitAsk}
        onConfirm={confirmExit}
        description={
          isDaily
            ? "استریک امروز ثبت نمی‌شود مگر برد یا باخت را ببینی — پیشرفت روزانهٔ تو ذخیره می‌ماند و بعداً می‌توانی ادامه دهی."
            : undefined
        }
      />
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
