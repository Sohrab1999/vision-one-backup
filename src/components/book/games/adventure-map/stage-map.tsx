"use client";

/**
 * stage-map — نمای نقشهٔ ۸گرهٔ مارپیچ (گام ۷ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی شاخهٔ map از adventure-map-game.tsx (بایت‌به‌بایت)؛ محاسبات محلی
 * order/openIdx/mapLive عیناً داخل کامپوننت مانده‌اند. کامپوننت presentational.
 */

import { CheckCircle2, Lock, Map, PartyPopper, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { stopSpeaking } from "@/lib/speak";
import { GameShell } from "../kit/game-shell";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import { playSound, toggleSoundMuted } from "../kit/sound-engine";
import { faNum } from "../shared";
import { TUTORIAL_STEPS } from "./setup-panel";
import { orderOf } from "./helpers";
import { GAME_KEY, STAGE_META, TOTAL_STAGES, type AdventureProgress, type Phase } from "./types";

export interface StageMapProps {
  progress: AdventureProgress;
  totalStars: number;
  doneCount: number;
  allDone: boolean;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  handleHelp: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
  startStage: (idx: number) => void;
  setPhase: (phase: Phase) => void;
}

export function StageMap({
  progress,
  totalStars,
  doneCount,
  allDone,
  muted,
  setMuted,
  handleHelp,
  tutorialOpen,
  handleTutorialOpenChange,
  startStage,
  setPhase,
}: StageMapProps) {
  const order = orderOf(progress);
  const openIdx = progress.done.findIndex((d) => !d);
  const mapLive = allDone
    ? "ماجراجویی کامل شد — همهٔ گره‌ها روشن است 🎉"
    : openIdx >= 0
      ? `مرحلهٔ ${faNum(openIdx + 1)} باز است — گرهٔ روشن نقشه را بزن`
      : "";
  return (
    <>
      {/* فاز G2-e — هدر یکنواخت کیت روی نمای نقشه هم (stats=ستارهٔ جمع/مرحلهٔ فعلی) */}
      <GameShell
        title="نقشهٔ ماجراجویی"
        icon={<Map size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              {faNum(totalStars)} ستاره
            </Badge>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {allDone ? "کامل شد 🎉" : `مرحلهٔ فعلی: ${faNum(openIdx + 1)}`}
            </Badge>
          </>
        }
        liveMsg={mapLive}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${(doneCount / TOTAL_STAGES) * 100}%` }}
            />
          </div>
        }
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={() => {
          stopSpeaking();
          setPhase("setup");
        }}
        exitLabel="تنظیمات"
      >
        <div
          role="group"
          aria-label="گره‌های ماجراجویی"
          className="relative rounded-2xl border bg-card/60 p-4"
        >
          <div
            aria-hidden
            className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-r-2 border-dashed border-primary/25"
          />
          <div className="relative space-y-6">
            {progress.done.map((isDone, i) => {
              const meta = STAGE_META[order[i]];
              const TypeIcon = meta.icon;
              const isOpen = i === openIdx;
              const stars = progress.stars[i] ?? 0;
              return (
                <div
                  key={`node-${i}`}
                  className={cn(
                    "flex w-1/2 flex-col items-center gap-1.5",
                    i % 2 === 1 && "ms-auto",
                  )}
                >
                  {isOpen ? (
                    <button
                      type="button"
                      onClick={() => startStage(i)}
                      aria-label={`مرحلهٔ ${faNum(i + 1)} — ${meta.label} — شروع`}
                      className="group flex flex-col items-center gap-1.5"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-105 group-active:scale-95">
                        <TypeIcon size={24} />
                      </span>
                    </button>
                  ) : (
                    <span
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full border-2",
                        isDone
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "border-border bg-muted text-muted-foreground/60",
                      )}
                    >
                      <TypeIcon size={22} />
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-[11px] font-black",
                      isDone
                        ? "text-amber-600 dark:text-amber-400"
                        : isOpen
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  >
                    مرحلهٔ {faNum(i + 1)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{meta.label}</span>
                  {isDone ? (
                    <span className="flex gap-0.5" aria-label={`${faNum(stars)} ستاره از ۳`}>
                      {[0, 1, 2].map((s) => (
                        <Star
                          key={`st-${i}-${s}`}
                          size={11}
                          className={s < stars ? "fill-amber-400 text-amber-500" : "text-muted-foreground/25"}
                        />
                      ))}
                    </span>
                  ) : isOpen ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <Sparkles size={11} />
                      شروع
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                      <Lock size={10} />
                      قفل
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {allDone ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
            <p className="text-[13px] font-black text-amber-600 dark:text-amber-400">
              همهٔ گره‌ها روشن شد — ماجراجویی کامل شد! 🎉
            </p>
            <Button
              size="sm"
              className="h-11 gap-2"
              onClick={() => {
                playSound("click");
                setPhase("done");
              }}
            >
              <PartyPopper size={15} />
              مراسم پایان
            </Button>
          </div>
        ) : (
          <p className="text-center text-[11px] text-muted-foreground">
            گرهٔ روشنِ نقشه را بزن تا مرحلهٔ بعدی شروع شود
          </p>
        )}
      </GameShell>
      {/* فاز G2-e — آموزش یک‌بارنمایش در نمای نقشه + راهنمای دکمهٔ شِل */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
