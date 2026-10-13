"use client";

/**
 * challenge-view — نمای مرحلهٔ فعال (گام ۷ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی شاخهٔ challenge از adventure-map-game.tsx (بایت‌به‌بایت):
 * نتیجهٔ per-مرحله روی ResultScreen کیت + چهار مینی‌چالش (آزمون واژه/حروف جابه‌جا/
 * جفت‌سازی/شنیداری) + اورلی توقف + GameExitGuard + TutorialOverlay.
 */

import { CheckCircle2, Map, Pause, Play, Star, Timer, Volume2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speak";
import type { VoiceSpeed } from "@/lib/voice-store";
import { GameShell } from "../kit/game-shell";
import { ResultScreen } from "../kit/result-screen";
import { GameExitGuard } from "../kit/exit-guard";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import { playSound, toggleSoundMuted } from "../kit/sound-engine";
import { faNum, fmtTime } from "../shared";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, STAGE_META, TOTAL_STAGES, type ChallengeState, type MatchCard, type Phase } from "./types";

export interface ChallengeViewProps {
  challenge: ChallengeState;
  isRecord: boolean;
  totalStars: number;
  paused: boolean;
  togglePause: () => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  liveMsg: string;
  speed: VoiceSpeed;
  exitAsk: boolean;
  setExitAsk: (open: boolean) => void;
  tutorialOpen: boolean;
  handleHelp: () => void;
  handleTutorialOpenChange: (open: boolean) => void;
  answerQuiz: (choice: number) => void;
  answerListen: (choice: number) => void;
  placeTile: (tileId: number) => void;
  pullTile: (slotIdx: number) => void;
  tapCard: (card: MatchCard) => void;
  setChallenge: (value: ChallengeState | null) => void;
  startStage: (idx: number) => void;
  backToMap: () => void;
  confirmExitToMap: () => void;
  resume: () => void;
  setPhase: (phase: Phase) => void;
}

export function ChallengeView({
  challenge,
  isRecord,
  totalStars,
  paused,
  togglePause,
  muted,
  setMuted,
  liveMsg,
  speed,
  exitAsk,
  setExitAsk,
  tutorialOpen,
  handleHelp,
  handleTutorialOpenChange,
  answerQuiz,
  answerListen,
  placeTile,
  pullTile,
  tapCard,
  setChallenge,
  startStage,
  backToMap,
  confirmExitToMap,
  resume,
  setPhase,
}: ChallengeViewProps) {
  const meta = STAGE_META[challenge.type];
  const TypeIcon = meta.icon;

  // ── فاز G2-e — نتیجهٔ استاندارد per-مرحله روی ResultScreen کیت ──
  // برد/باخت هر دو نتیجه می‌گیرند (title مناسب)؛ ستاره از starsOf موجود؛
  // رکورد/کانفتی از مسیر موجود saveBest می‌آید (اینجا celebrate شلیک نمی‌شود)
  if (challenge.resultStars !== null) {
    const stars = challenge.resultStars;
    const isLastStage = challenge.idx >= TOTAL_STAGES - 1;
    const title =
      stars === 3
        ? "بی‌نقص! بدون حتی یک خطا"
        : stars === 2
          ? "خیلی خوب — فقط یک خطا"
          : "مرحله تمام شد — گرهٔ بعدی باز شد!";
    return (
      <>
        <ResultScreen
          title={title}
          stars={stars}
          isRecord={isRecord}
          errorCount={challenge.errors}
          reviewItems={challenge.missed}
          stats={[
            {
              label: "مرحله",
              value: `${faNum(challenge.idx + 1)} از ${faNum(TOTAL_STAGES)}`,
              icon: <Map size={16} className="text-primary" />,
            },
            {
              label: "خطا",
              value: faNum(challenge.errors),
              icon: <XCircle size={16} className="text-destructive" />,
            },
            {
              label: "زمان مرحله",
              value: fmtTime(challenge.timeSecs),
              icon: <Timer size={16} className="text-teal-500" />,
            },
          ]}
          onReplay={
            isLastStage
              ? () => {
                  playSound("click");
                  setChallenge(null);
                  setPhase("done");
                }
              : () => startStage(challenge.idx + 1)
          }
          onExit={backToMap}
          exitLabel="نقشه"
        />
        <p role="status" aria-live="polite" className="sr-only">
          {liveMsg}
        </p>
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // نوار پیشرفت و بج پیشرفتِ مرحله — درصد بر اساس نوع چالش
  const stageTotal =
    challenge.type === 0
      ? challenge.questions.length
      : challenge.type === 1
        ? challenge.word.length
        : challenge.type === 2
          ? challenge.cards.length
          : 1;
  const stageDone =
    challenge.type === 0
      ? challenge.qIdx + (challenge.picked !== null ? 1 : 0)
      : challenge.type === 1
        ? challenge.slots.filter((s) => s !== null).length
        : challenge.type === 2
          ? challenge.matchedIds.length
          : challenge.picked !== null
            ? 1
            : 0;
  const stagePct = Math.min(100, Math.round((stageDone / Math.max(stageTotal, 1)) * 100));
  const stageStep =
    challenge.type === 0
      ? `سؤال ${faNum(challenge.qIdx + 1)} از ${faNum(challenge.questions.length)}`
      : challenge.type === 1
        ? `حرف ${faNum(challenge.slots.filter((s) => s !== null).length)} از ${faNum(challenge.word.length)}`
        : challenge.type === 2
          ? `جفت ${faNum(challenge.matchedIds.length / 2)} از ${faNum(challenge.cards.length / 2)}`
          : `۱ سؤال`;

  return (
    <>
      {/* فاز G2-e — هدر یکنواخت کیت: title=«مرحلهٔ N — نوع» + بج‌های خطا/ستاره/پیشرفت */}
      <GameShell
        title={`مرحلهٔ ${faNum(challenge.idx + 1)} — ${meta.label}`}
        icon={<TypeIcon size={18} />}
        stats={
          <>
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 text-[11px]",
                challenge.errors > 0 && "border-destructive/40 text-destructive",
              )}
            >
              <XCircle size={11} />
              {faNum(challenge.errors)} خطا
            </Badge>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              {faNum(totalStars)} ستاره
            </Badge>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {stageStep}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${stagePct}%` }}
            />
          </div>
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={() => setExitAsk(true)}
        exitLabel="نقشه"
      >
        <div className="relative">
          <div
            className={cn("space-y-5", paused && "pointer-events-none blur-sm")}
            aria-hidden={paused}
          >
            {challenge.type === 0 && challenge.questions[challenge.qIdx]
              ? (() => {
                  const q = challenge.questions[challenge.qIdx];
                  const locked = challenge.picked !== null;
                  return (
                    <div className="space-y-4">
                      <div className="rounded-xl border bg-muted/40 p-6 text-center">
                        <p className="text-[11px] text-muted-foreground">
                          سؤال {faNum(challenge.qIdx + 1)} از {faNum(challenge.questions.length)} —
                          معنی این واژه چیست؟
                        </p>
                        <p dir="ltr" className="font-en mt-2 text-2xl font-black">
                          {q.word}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        {q.options.map((opt, oi) => {
                          const isCorrect = oi === q.answer;
                          const isPicked = challenge.picked === oi;
                          return (
                            <button
                              key={`opt-${oi}`}
                              type="button"
                              disabled={locked}
                              onClick={() => answerQuiz(oi)}
                              aria-pressed={isPicked}
                              className={cn(
                                "flex min-h-11 items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-right text-[13px] font-bold transition-all",
                                !locked && "border-border bg-card hover:border-primary/50 hover:bg-muted/60",
                                locked && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                                locked && isPicked && !isCorrect && "border-destructive bg-destructive/10",
                                locked && !isCorrect && !isPicked && "opacity-50",
                              )}
                            >
                              <span>{opt}</span>
                              {locked && isCorrect && (
                                <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                              )}
                              {locked && isPicked && !isCorrect && (
                                <XCircle size={16} className="shrink-0 text-destructive" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              : null}

            {challenge.type === 1 && (
              <div className="space-y-4">
                <div className="rounded-xl border bg-muted/40 p-5 text-center">
                  <p className="text-[11px] text-muted-foreground">این واژه را با حروف پایین بساز:</p>
                  <p className="mt-1.5 text-lg font-black leading-7">{challenge.meaning}</p>
                </div>
                <div dir="ltr" className="flex flex-wrap justify-center gap-1.5">
                  {challenge.slots.map((tid, si) => {
                    const letter =
                      tid !== null
                        ? challenge.tiles.find((t) => t.id === tid)?.letter ?? null
                        : null;
                    return (
                      <button
                        key={`slot-${si}`}
                        type="button"
                        disabled={tid === null || challenge.shake}
                        onClick={() => pullTile(si)}
                        aria-label={`خانهٔ ${faNum(si + 1)}${letter ? ` — حرف ${letter}` : " — خالی"}`}
                        className={cn(
                          "flex h-11 w-10 items-center justify-center rounded-lg border-2 border-dashed font-en text-lg font-black transition-all",
                          letter
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : "border-muted-foreground/25 text-muted-foreground/30",
                          challenge.shake && "match-shake border-destructive/60 bg-destructive/10",
                        )}
                      >
                        {letter ?? "·"}
                      </button>
                    );
                  })}
                </div>
                <div dir="ltr" className="flex flex-wrap justify-center gap-1.5">
                  {challenge.tiles.map((t) => {
                    const placed = challenge.slots.includes(t.id);
                    return (
                      <button
                        key={`tile-${t.id}`}
                        type="button"
                        disabled={placed || challenge.shake}
                        onClick={() => placeTile(t.id)}
                        aria-label={`حرف ${t.letter}`}
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg border-2 font-en text-lg font-black transition-all",
                          placed
                            ? "border-transparent bg-muted/50 text-muted-foreground/25"
                            : "border-primary/40 bg-card text-foreground shadow-sm hover:border-primary hover:bg-primary/10 active:scale-95",
                        )}
                      >
                        {t.letter}
                      </button>
                    );
                  })}
                </div>
                <p className="text-center text-[10px] text-muted-foreground">
                  حرف‌ها را به ترتیب بزن؛ برای پس گرفتن یک حرف، روی خانه‌اش بزن
                </p>
              </div>
            )}

            {challenge.type === 2 && (
              <div className="space-y-4">
                <p className="text-center text-[11px] text-muted-foreground">
                  دو کارت را بزن — واژه و معنی‌اش باید جور شوند
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {challenge.cards.map((card) => {
                    const isMatched = challenge.matchedIds.includes(card.id);
                    const isSelected = challenge.sel === card.id;
                    const isWrong = challenge.wrongIds.includes(card.id);
                    return (
                      <button
                        key={`card-${card.id}`}
                        type="button"
                        disabled={isMatched || challenge.wrongIds.length > 0}
                        onClick={() => tapCard(card)}
                        aria-pressed={isSelected}
                        aria-label={
                          card.side === "en"
                            ? `کارت واژه ${card.word}`
                            : `کارت معنی ${card.meaning}`
                        }
                        className={cn(
                          "flex min-h-20 items-center justify-center rounded-xl border-2 p-3 text-center transition-all",
                          isMatched && "match-pop border-emerald-500/60 bg-emerald-500/10 opacity-70",
                          !isMatched && isSelected && "border-primary bg-primary/10 ring-2 ring-primary/25",
                          isWrong && "match-shake border-destructive bg-destructive/10",
                          !isMatched && !isSelected && !isWrong && "border-border bg-card hover:border-primary/40",
                        )}
                      >
                        {card.side === "en" ? (
                          <span dir="ltr" className="font-en text-sm font-black">
                            {card.word}
                          </span>
                        ) : (
                          <span className="text-[13px] font-bold leading-6">{card.meaning}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {challenge.type === 3 && challenge.questions[0]
              ? (() => {
                  const q = challenge.questions[0];
                  const win = challenge.picked !== null;
                  return (
                    <div className="space-y-4">
                      <div className="rounded-xl border bg-muted/40 p-6 text-center">
                        <p className="text-[11px] text-muted-foreground">
                          گوش کن و معنی درست را پیدا کن
                        </p>
                        <button
                          type="button"
                          onClick={() => speak(challenge.word, { speed })}
                          aria-label="پخش دوبارهٔ تلفظ"
                          className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                        >
                          <Volume2 size={26} />
                        </button>
                      </div>
                      <div className="grid gap-2">
                        {q.options.map((opt, oi) => {
                          const isCorrect = oi === q.answer;
                          const said = challenge.saidIds.includes(oi);
                          return (
                            <button
                              key={`lopt-${oi}`}
                              type="button"
                              disabled={said || win}
                              onClick={() => answerListen(oi)}
                              className={cn(
                                "min-h-11 rounded-xl border-2 px-4 py-2.5 text-right text-[13px] font-bold transition-all",
                                !said && !win && "border-border bg-card hover:border-primary/50 hover:bg-muted/60",
                                win && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                                said && !isCorrect && "border-destructive/50 bg-destructive/5 text-destructive/70 line-through",
                                win && !isCorrect && !said && "opacity-50",
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              : null}
          </div>

          {/* فاز G2-e — اورلی توقف: بدنه تار و غیرقابل‌کلیک؛ اعلام در liveMsg سراسری */}
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
      </GameShell>
      {/* فاز G2-e — نگهبان خروج (G0-06) روی کیت: همان متن و همان رفتار؛
          Esc/کلیک بیرون = ادامهٔ مرحله */}
      <GameExitGuard
        open={exitAsk}
        onOpenChange={setExitAsk}
        onConfirm={confirmExitToMap}
        title="مرحله را رها کنم؟ 🗺️"
        description="مرحلهٔ فعال هنوز تمام نشده — با برگشتن به نقشه، پیشرفت این دور از دست می‌رود و مرحله از اول شروع می‌شود."
        confirmLabel="آره، برو به نقشه"
        cancelLabel="نه، ادامه می‌دهم"
      />
      {/* فاز G2-e — راهنمای دکمهٔ شِل حین مرحله (با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
