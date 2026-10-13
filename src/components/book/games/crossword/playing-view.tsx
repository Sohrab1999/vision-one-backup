"use client";

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Delete,
  Lightbulb,
  Pause,
  Play,
  Puzzle,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faNum, fmtTime } from "../shared";
import { toggleSoundMuted } from "../kit/sound-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import type { HintCoach } from "../kit/hint-coach";
import {
  cellKey,
  cellsOf,
  type CrosswordDir,
  type CrosswordPlacement,
  type CrosswordPuzzle,
} from "./generator";
import { GAME_KEY } from "./types";
import { TUTORIAL_STEPS } from "./setup-panel";

interface PlayingViewProps {
  puzzle: CrosswordPuzzle;
  letters: Record<string, string>;
  locked: Set<string>;
  popKeys: string[];
  shakeKeys: string[];
  active: { r: number; c: number } | null;
  dir: CrosswordDir;
  solved: Set<number>;
  hints: number;
  secs: number;
  liveMsg: string;
  paused: boolean;
  resume: () => void;
  togglePause: () => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  handleHelp: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
  exitAsk: boolean;
  setExitAskGuard: (open: boolean) => void;
  confirmExit: () => void;
  hintCoach: HintCoach;
  activeWord: CrosswordPlacement | null;
  onCellTap: (r: number, c: number) => void;
  typeLetter: (ch: string) => void;
  backspace: () => void;
  check: () => void;
  hint: () => void;
  focusWord: (p: CrosswordPlacement) => void;
  handleExitClick: () => void;
}

export function PlayingView({
  puzzle,
  letters,
  locked,
  popKeys,
  shakeKeys,
  active,
  solved,
  hints,
  secs,
  liveMsg,
  paused,
  resume,
  togglePause,
  muted,
  setMuted,
  handleHelp,
  tutorialOpen,
  handleTutorialOpenChange,
  exitAsk,
  setExitAskGuard,
  confirmExit,
  hintCoach,
  activeWord,
  onCellTap,
  typeLetter,
  backspace,
  check,
  hint,
  focusWord,
  handleExitClick,
}: PlayingViewProps) {
  // ── Playing ──
  const activeKey = active ? cellKey(active.r, active.c) : null;
  const activeCells = activeWord ? cellsOf(activeWord) : [];
  const pct = Math.round((solved.size / Math.max(puzzle.placements.length, 1)) * 100);
  const acrossList = puzzle.placements.filter((p) => p.dir === "across").sort((a, b) => a.num - b.num);
  const downList = puzzle.placements.filter((p) => p.dir === "down").sort((a, b) => a.num - b.num);

  const clueButton = (p: CrosswordPlacement) => {
    const isSolved = solved.has(p.id);
    const isActiveWord = activeWord?.id === p.id;
    return (
      <button
        key={p.id}
        type="button"
        onClick={() => focusWord(p)}
        aria-pressed={isActiveWord}
        aria-label={`سرنخ ${faNum(p.num)} ${p.dir === "across" ? "افقی" : "عمودی"}: ${p.meaning}${isSolved ? " — حل شد" : ""}`}
        className={cn(
          "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-right text-[12px] leading-5 transition-all",
          isSolved
            ? "border-emerald-500/30 bg-emerald-500/8 text-muted-foreground"
            : isActiveWord
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-border/60 bg-card hover:bg-muted",
        )}
      >
        <span className="shrink-0 font-black text-primary">{faNum(p.num)}.</span>
        <span className={cn("flex-1 font-bold", isSolved && "line-through decoration-primary/60")}>
          {p.meaning}
        </span>
        <Badge
          variant="outline"
          className="shrink-0 border-teal-500/40 px-1.5 text-[9px] text-teal-600 dark:text-teal-400"
        >
          {p.lessonLabel}
        </Badge>
        {isSolved ? (
          <Badge className="shrink-0 gap-1 bg-emerald-500 px-1.5 text-[9px] text-emerald-950">
            <CheckCircle2 size={10} />
            {faNum(p.word.length)} حرف
          </Badge>
        ) : (
          <span className="shrink-0 text-[10px] text-muted-foreground">
            ({faNum(p.word.length)} حرف)
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* فاز G2-d — هدر یکنواخت از کیت (الگوی پایلوت memory / word-search) */}
      <GameShell
        title="جدول متقاطع"
        icon={<Puzzle size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(solved.size)} / {faNum(puzzle.placements.length)} واژه
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Lightbulb size={11} className="text-amber-500" />
              {faNum(hints)} راهنما
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
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
        <div className="relative">
          <div
            className={cn("space-y-4", paused && "pointer-events-none blur-sm")}
            aria-hidden={paused}
          >
            {/* سرنخ جاری — بزرگ و خوانا بالای جدول */}
            {activeWord && (
              <div
                aria-live="polite"
                className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-3 py-2 text-[12px]"
              >
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {faNum(activeWord.num)}
                </Badge>
                <span className="flex-1 font-bold leading-5">{activeWord.meaning}</span>
                <Badge
                  variant="outline"
                  className="shrink-0 border-teal-500/40 text-[9px] text-teal-600 dark:text-teal-400"
                >
                  {activeWord.lessonLabel}
                </Badge>
                <span dir="ltr" className="shrink-0 font-en text-[10px] text-muted-foreground">
                  {activeWord.dir === "across" ? "ACROSS" : "DOWN"}
                </span>
              </div>
            )}

            {/* جدول — خانه‌های مربع؛ اسپیس‌رها بی‌مزه و غیرقابل کلیک */}
            <div className="mx-auto w-full max-w-md sm:max-w-lg">
              <div
                dir="ltr"
                className="grid gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))` }}
                role="grid"
                aria-label={`جدول متقاطع ${faNum(puzzle.rows)} در ${faNum(puzzle.cols)}`}
              >
                {puzzle.grid.map((row, r) =>
                  row.map((cell, c) => {
                    if (cell.acrossId === null && cell.downId === null) {
                      return <div key={`s-${r}-${c}`} aria-hidden className="aspect-square rounded-[5px] bg-transparent" />;
                    }
                    const key = cellKey(r, c);
                    const ch = letters[key] ?? "";
                    const isLocked = locked.has(key);
                    const isActive = activeKey === key;
                    const inWord = activeCells.includes(key);
                    const isPop = popKeys.includes(key);
                    const isShake = shakeKeys.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => onCellTap(r, c)}
                        aria-label={
                          (ch ? `حرف ${ch}` : `خانهٔ خالی${cell.num !== null ? ` — سرنخ ${faNum(cell.num)}` : ""}`) +
                          (isLocked ? " — تاییدشده" : "")
                        }
                        aria-pressed={isActive}
                        className={cn(
                          "relative flex aspect-square items-center justify-center rounded-[5px] border font-en text-sm font-black uppercase transition-all sm:text-base",
                          isLocked
                            ? "border-primary bg-primary/85 text-primary-foreground"
                            : isActive
                              ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/40 ring-offset-1 ring-offset-background"
                              : inWord
                                ? "border-primary/40 bg-primary/10 text-foreground"
                                : "border-border/70 bg-muted/30 text-foreground",
                          isPop && "match-pop",
                          isShake && "match-shake border-destructive/60 bg-destructive/10",
                        )}
                      >
                        {cell.num !== null && (
                          <span className="absolute left-0.5 top-0.5 text-[8px] font-bold leading-none text-muted-foreground">
                            {faNum(cell.num)}
                          </span>
                        )}
                        <span dir="ltr">{ch}</span>
                      </button>
                    );
                  }),
                )}
              </div>
            </div>

            {/* سرنخ‌ها — زیر جدول؛ دسکتاپ دو ستونه */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-[13px] font-black">
                  <ArrowRight size={14} className="text-primary" />
                  افقی ({faNum(acrossList.length)})
                </p>
                {acrossList.map(clueButton)}
              </div>
              <div className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-[13px] font-black">
                  <ArrowDown size={14} className="text-primary" />
                  عمودی ({faNum(downList.length)})
                </p>
                {downList.map(clueButton)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="h-11 flex-1 gap-1.5 text-[12px]" onClick={check}>
                <CheckCircle2 size={15} className="text-primary" />
                بررسی
              </Button>
              <Button
                variant="outline"
                className="h-11 flex-1 gap-1.5 border-amber-500/40 text-[12px] text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
                onClick={hint}
              >
                <Lightbulb size={15} />
                راهنما{hints > 0 ? ` (${faNum(hints)})` : ""}
              </Button>
            </div>

            {/* کیبورد روی صفحه — LTR (تایپ = بدون صدا طبق تسک G2-d) */}
            <div dir="ltr" className="grid grid-cols-7 gap-1.5" role="group" aria-label="کیبورد حروف انگلیسی">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => typeLetter(ch)}
                  aria-label={`حرف ${ch}`}
                  className="font-en min-h-11 rounded-lg border border-border/70 bg-card text-[13px] font-black text-foreground transition-all hover:bg-muted active:scale-95"
                >
                  {ch}
                </button>
              ))}
              <button
                type="button"
                onClick={backspace}
                aria-label="پاک کردن حرف"
                className="col-span-2 flex min-h-11 items-center justify-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 text-[11px] font-black text-amber-700 transition-all hover:bg-amber-500/20 dark:text-amber-400"
              >
                <Delete size={14} />
                Backspace
              </button>
            </div>
          </div>

          {/* فاز G2-d — اورلی توقف (الگوی پایلوت memory): محتوا تار و غیرقابل‌تعامل */}
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

        {/* فاز G2-d — نگهبان خروج کیت + کار اختصاصی: تأیید = ذخیرهٔ draft نیمه‌کاره */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAskGuard}
          onConfirm={confirmExit}
          description="جدول هنوز نیمه‌کاره‌ست — با خروج، خانه‌های پرشده به‌عنوان پیش‌نویس ذخیره می‌شود تا دفعهٔ بعد از همان‌جا ادامه بدهی."
        />
        {/* G5-01 — کارت مدرس بازی */}
        {hintCoach.element}
      </GameShell>
      {/* فاز G2-d — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
