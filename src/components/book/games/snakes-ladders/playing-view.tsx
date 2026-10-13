"use client";

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
  const cp = players[cur] ?? players[0];
  const locked = reveal !== null || diceFace !== null || cp.isBot || paused;
  return (
    <>
      {/* فاز G2-e-1 — هدر یکنواخت از کیت: زمان/سؤال/نوبت/تاس/حالت + کنترل‌های استاندارد */}
      <GameShell
        title="مار و پله"
        icon={<Dices size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Dices size={11} className="text-amber-500" />
              سؤال {faNum(qNum)}
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-primary/40 text-[11px] font-black">
              <span className={cn("h-2.5 w-2.5 rounded-full", TOKEN_BG[cp.ci])} aria-hidden />
              نوبت: {cp.name}
            </Badge>
            {diceFace !== null && (
              <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] font-black text-amber-600 dark:text-amber-400">
                تاس: {faNum(diceFace)}
              </Badge>
            )}
            <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] text-amber-600 dark:text-amber-400">
              {mode === "bot" ? <Bot size={11} /> : <Users size={11} />}
              {mode === "bot" ? "مقابل ربات" : "روی یک دستگاه"}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          /* چیپ موقعیت بازیکن‌ها («موقعیت» در قاب شِل — زیر هدر) */
          <div className="flex flex-wrap items-center gap-1.5" aria-label="موقعیت مهره‌ها">
            {players.map((pl, i) => (
              <span
                key={i}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                  i === cur ? "border-primary/50 bg-muted/50 text-foreground" : "border-border text-muted-foreground",
                )}
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", TOKEN_BG[pl.ci])} aria-hidden />
                {pl.name}
                <span className="text-[10px] font-normal text-muted-foreground">
                  {positions[i] === 0 ? "شروع" : `خانهٔ ${faNum(positions[i] ?? 0)}`}
                </span>
              </span>
            ))}
          </div>
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          {/* فاز G2-e-1 — بدنهٔ بازی حین توقف تار/بی‌اثر/aria-hidden + اورلی «بازی متوقف شد» */}
          <div
            aria-hidden={paused}
            className={cn("space-y-3", paused && "pointer-events-none blur-sm select-none")}
          >
            {/* کارت سؤال — گذرگاه انداختن تاس */}
            <div
              className={cn(
                "space-y-3 rounded-2xl border bg-card p-4 sm:p-5",
                reveal && !reveal.ok && "match-shake border-destructive/60",
              )}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {cp.isBot && (
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <Bot size={11} />
                    {reveal ? "انتخاب ربات" : "دارم فکر می‌کنم…"}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-[10px]">
                  {lessonLabel(q.lesson)}
                </Badge>
                <Badge variant="outline" className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
                  {q.level}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {q.category === "vocabulary" ? "واژگان" : "گرامر"}
                </Badge>
              </div>

              <p dir="ltr" className="font-en text-[14px] font-bold leading-7 sm:text-[15px] sm:leading-8">
                {q.text}
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, i) => {
                  const isPicked = reveal?.picked === i;
                  const showCorrect = reveal !== null && i === q.answer;
                  return (
                    <button
                      key={`${qNum}-${i}`}
                      type="button"
                      onClick={() => answerHuman(i)}
                      disabled={locked}
                      aria-label={`گزینهٔ ${faNum(i + 1)}`}
                      className={cn(
                        "flex min-h-11 items-center gap-2 rounded-xl border bg-card px-3 py-2 text-right transition-all",
                        !locked &&
                          "hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        showCorrect && "border-emerald-500/70 bg-emerald-500/10",
                        isPicked && !reveal?.ok && "border-destructive/60 bg-destructive/10",
                        reveal !== null && !showCorrect && !isPicked && "opacity-50",
                      )}
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-black">
                        {faNum(i + 1)}
                      </span>
                      <span dir="ltr" className="flex-1 font-en text-[13px] font-bold leading-6 sm:text-[14px]">
                        {opt}
                      </span>
                      {reveal?.byBot === true && isPicked && (
                        <Badge className="shrink-0 bg-amber-500 px-1.5 py-0 text-[9px] text-amber-950">ربات</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* فاز SL1-04 — تاس سه‌بعدی CSS — فقط بعد از پاسخ درست دیده می‌شود (ارتفاع رزرو شده تا تخته نلرزد).
                مکعب با ۶ وجهِ آیکون؛ هر فلیپ ۹۰ms همان زنجیرهٔ قبلی است — زمان‌بندی دست نخورده؛
                dicePop = شمار چرخش‌های کامل tumble؛ عدد نهایی دقیقاً همان d منطقی؛
                reduced-motion → transition حذف (سوییچ بی‌انیمیشن) + بج هدر همیشه هست */}
            <div className="flex h-12 items-center justify-center gap-2">
              {diceFace !== null && (
                <span className="match-pop block" style={{ perspective: "180px" }}>
                  <span className="sl-cube" style={{ transform: cubeTransform(diceFace, dicePop) }}>
                    {CUBE_FACES.map(({ n, t }) => {
                      const F = DICE_ICONS[n] ?? Dices;
                      return (
                        <span
                          key={n}
                          style={{ transform: t }}
                          className="sl-cube-face border-2 border-primary/30 bg-primary/10 text-primary shadow-md shadow-primary/15"
                        >
                          <F size={22} />
                        </span>
                      );
                    })}
                  </span>
                </span>
              )}
            </div>

            {/* تختهٔ ۱۰×۱۰ مارپیچی */}
            <Card className="mx-auto w-full max-w-lg">
              <CardContent className="p-2 sm:p-3">
                {/* فاز G2-e-1 — سبک transition مهره‌ها + گارد prefers-reduced-motion */}
                <style>{`
                  .sl-token { transition-property: transform; transition-timing-function: ease; will-change: transform; }
                  /* فاز SL1-02 — پالس خانهٔ مبدأ/مقصد (صرفاً بصری — reduced-motion خاموش) */
                  @keyframes slPulseBad { 50% { box-shadow: inset 0 0 0 4px rgb(239 68 68 / 0.75); } }
                  @keyframes slPulseGood { 50% { box-shadow: inset 0 0 0 4px rgb(16 185 129 / 0.8); } }
                  .sl-pulse-bad { animation: slPulseBad 480ms ease-in-out 2; }
                  .sl-pulse-good { animation: slPulseGood 480ms ease-in-out 2; }
                  /* فاز SL1-04 — مکعب تاس سه‌بعدی (زمان‌بندی transition = فلیپ ۹۰ms زنجیره) */
                  .sl-cube { position: relative; width: 44px; height: 44px; transform-style: preserve-3d; transition: transform 90ms ease; will-change: transform; }
                  .sl-cube-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; border-radius: 10px; backface-visibility: hidden; }
                  /* فاز SL1-03 — confetti برد (تمام-CSS؛ reduced-motion نمایش نمی‌دهد) */
                  @keyframes slConfettiFall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(75vh) rotate(560deg); opacity: 0; } }
                  .sl-confetti-piece { position: absolute; top: 0; animation-name: slConfettiFall; animation-timing-function: linear; animation-fill-mode: forwards; }
                  @media (prefers-reduced-motion: reduce) {
                    .sl-token { transition: none !important; }
                    .sl-pulse-bad, .sl-pulse-good { animation: none !important; }
                    .sl-confetti-piece { display: none !important; }
                    .sl-cube { transition: none !important; }
                  }
                `}</style>
                <div className="relative">
                  <div dir="rtl" role="group" aria-label="تختهٔ مار و پله — ۱۰۰ خانه" className="grid grid-cols-10 gap-[3px]">
                    {CELL_POS.map((cpos, i) => {
                      const n = i + 1;
                      const snakeTo = SNAKES[n];
                      const ladderTo = LADDERS[n];
                      const riders = players.map((pl, pi) => ({ pl, pi })).filter((r) => positions[r.pi] === n);
                      const label = [`خانهٔ ${faNum(n)}`];
                      if (snakeTo !== undefined) label.push(`مار — برگشت به خانهٔ ${faNum(snakeTo)}`);
                      if (ladderTo !== undefined) label.push(`پله — رفتن به خانهٔ ${faNum(ladderTo)}`);
                      if (riders.length > 0) label.push(`مهره: ${riders.map((r) => r.pl.name).join("، ")}`);
                      return (
                        <div
                          key={n}
                          style={{ gridColumnStart: cpos.col, gridRowStart: cpos.row }}
                          aria-label={label.join(" — ")}
                          className={cn(
                            "relative aspect-square rounded-[4px] border border-border/70",
                            n === 1
                              ? "bg-amber-500/15"
                              : n === 100
                                ? "bg-primary/15"
                                : (cpos.row + cpos.col) % 2 === 0
                                  ? "bg-muted/40"
                                  : "bg-card",
                            pulse?.cells.includes(n) && (pulse.kind === "snake" ? "sl-pulse-bad" : "sl-pulse-good"),
                          )}
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-foreground/75 sm:text-[11px]">
                            {faNum(n)}
                          </span>
                          {snakeTo !== undefined && (
                            <span
                              aria-hidden
                              className="absolute left-0 top-0 flex items-center gap-px rounded-br-[4px] bg-destructive/10 px-0.5 text-[7px] font-black leading-[11px] text-destructive sm:text-[8px]"
                            >
                              <TrendingDown size={8} />
                              {faNum(snakeTo)}
                            </span>
                          )}
                          {ladderTo !== undefined && (
                            <span
                              aria-hidden
                              className="absolute left-0 top-0 flex items-center gap-px rounded-br-[4px] bg-primary/10 px-0.5 text-[7px] font-black leading-[11px] text-primary sm:text-[8px]"
                            >
                              <TrendingUp size={8} />
                              {faNum(ladderTo)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* فاز SL1-01 — مسیرهای مار و پله (aria-hidden — فقط تزئینی؛ نام‌ها در aria-label خانه‌ها هست).
                      داده‌ها سطح ماژول محاسبه شده‌اند — صفر هزینهٔ JS در رندر؛ زیر لایهٔ مهره (z-10) */}
                  <svg aria-hidden viewBox="0 0 1000 1000" className="pointer-events-none absolute inset-0 z-[5]">
                    <g className="text-destructive" fill="none" stroke="currentColor">
                      {SNAKE_PATHS.map(({ head, d, hc }) => (
                        <g key={`snake-${head}`} strokeOpacity={0.5}>
                          <path d={d} strokeWidth={11} strokeLinecap="round" />
                          <circle cx={hc.x} cy={hc.y} r={11} fill="currentColor" stroke="none" fillOpacity={0.65} />
                        </g>
                      ))}
                    </g>
                    <g className="text-primary" fill="none" stroke="currentColor">
                      {LADDER_GEOMS.map(({ base, railA, railB, rungs }) => (
                        <g key={`ladder-${base}`} strokeOpacity={0.55} strokeWidth={7} strokeLinecap="round">
                          <path d={railA} />
                          <path d={railB} />
                          {rungs.map((r, i) => (
                            <path key={i} d={r} strokeWidth={6} strokeOpacity={0.85} />
                          ))}
                        </g>
                      ))}
                    </g>
                  </svg>

                  {/* فاز G2-e-1 — لایهٔ مهره‌های متحرک (aria-hidden — خانه‌ها نام مهره‌ها را
                      در aria-label دارند). موقعیت با translate درصدی + transition: transform */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
                    {players.map((pl, pi) => {
                      const pos = positions[pi] ?? 0;
                      if (pos === 0) return null; // مهرهٔ منتظر — پیش از اولین حرکت روی تخته نیست
                      const cpos = CELL_POS[pos - 1];
                      // پخش افقی مهره‌های هم‌خانه (±۲۲٪ به‌ازای هر هم‌خانه)
                      const mates = players.map((_, pj) => pj).filter((pj) => (positions[pj] ?? 0) === pos);
                      const k = mates.indexOf(pi);
                      const dx = (k - (mates.length - 1) / 2) * 22;
                      const x = (10 - cpos.col) * 100 + dx;
                      const y = (cpos.row - 1) * 100;
                      return (
                        <span
                          key={pi}
                          className="sl-token absolute left-0 top-0 flex h-[10%] w-[10%] items-center justify-center"
                          style={{ transform: `translate(${x}%, ${y}%)`, transitionDuration: `${slideMs}ms` }}
                        >
                          <span
                            className={cn(
                              "block rounded-full ring-1 ring-background sm:ring-[1.5px]",
                              TOKEN_BG[pl.ci],
                              pi === cur
                                ? "h-3 w-3 shadow-md shadow-foreground/20 sm:h-3.5 sm:w-3.5"
                                : "h-2.5 w-2.5 sm:h-3 sm:w-3",
                            )}
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingDown size={11} className="text-destructive" />
                    مار: برگشت
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={11} className="text-primary" />
                    پله: پیشروی
                  </span>
                  <span className="flex items-center gap-1">
                    <Dices size={11} />
                    تاس ۶ = نوبت اضافه
                  </span>
                  <span className="flex items-center gap-1">
                    <Keyboard size={11} />
                    کلید ۱ تا ۴ = پاسخ سریع
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* فاز G2-e-1 — اورلی توقف: ساعت دور ایستاده و زنجیرهٔ تاس/حرکت فریز است */}
          {paused && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">مار و پله متوقف شد</p>
              <p className="max-w-64 text-center text-[11px] leading-5 text-muted-foreground">
                ساعت دور ایستاده و هیچ حرکتی جلو نمی‌رود — با ادامه دقیقاً از همین‌جا
              </p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-e-1 — نگهبان خروج استاندارد کیت (رفتار G0-06: فقط حین playing) */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={confirmExit}
          description="دور مار و پله هنوز تمام نشده — با خروج، پیشرفت این دور از دست می‌رود."
        />
        {/* فاز SL0-02 — کارت مدرس بازی (کاملاً مثل ۸ بازی G5-01) */}
        {hint.element}
      </GameShell>
      {/* فاز G2-e-1 — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
