"use client";

/**
 * done-view — مراسم پایان دور کامل (گام ۷ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی شاخهٔ done از adventure-map-game.tsx (بایت‌به‌بایت)؛
 * محاسبهٔ محلی rank (چهار رتبهٔ کاشف) عیناً داخل کامپوننت مانده است.
 */

import {
  CheckCircle2,
  Compass,
  PartyPopper,
  RotateCcw,
  Sprout,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { stopSpeaking } from "@/lib/speak";
import { GameShell } from "../kit/game-shell";
import { playSound, toggleSoundMuted } from "../kit/sound-engine";
import { faNum } from "../shared";
import { MAX_STARS, TOTAL_STAGES, type AdventureProgress, type Phase } from "./types";

export interface DoneViewProps {
  progress: AdventureProgress;
  totalStars: number;
  isRecord: boolean;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  beginAdventure: (mode: "fresh" | "continue") => void;
  setPhase: (phase: Phase) => void;
}

export function DoneView({
  progress,
  totalStars,
  isRecord,
  muted,
  setMuted,
  beginAdventure,
  setPhase,
}: DoneViewProps) {
  const rank =
    totalStars >= 21
      ? {
          icon: Trophy as LucideIcon,
          label: "کاشف افسانه‌ای!",
          cls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        }
      : totalStars >= 15
        ? {
            icon: Compass as LucideIcon,
            label: "کاشف ماهر!",
            cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
          }
        : totalStars >= 9
          ? {
              icon: Compass as LucideIcon,
              label: "کاشف کوشا",
              cls: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
            }
          : {
              icon: Sprout as LucideIcon,
              label: "تازه‌کار — دوباره امتحان کن",
              cls: "bg-muted text-muted-foreground",
            };
  const RankIcon = rank.icon;
  return (
    <GameShell
      title="پایان ماجراجویی"
      icon={<PartyPopper size={18} />}
      stats={
        <>
          <Badge variant="secondary" className="gap-1.5 text-[11px]">
            <Star size={11} className="fill-amber-400 text-amber-500" />
            {faNum(totalStars)} از {faNum(MAX_STARS)} ستاره
          </Badge>
          <Badge variant="secondary" className="gap-1.5 text-[11px]">
            <CheckCircle2 size={11} className="text-primary" />
            {faNum(TOTAL_STAGES)} از {faNum(TOTAL_STAGES)} مرحله
          </Badge>
        </>
      }
      liveMsg="ماجراجویی کامل شد — همهٔ گره‌ها روشن شد 🎉"
      muted={muted}
      onMuteToggle={() => setMuted(toggleSoundMuted())}
      onExit={() => {
        stopSpeaking();
        setPhase("setup");
      }}
      exitLabel="تنظیمات"
    >
      <Card className="mx-auto max-w-xl border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">ماجراجویی کامل شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! بیشترین ستاره 🏆
            </Badge>
          )}
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-black",
              rank.cls,
            )}
          >
            <RankIcon size={15} />
            {rank.label}
          </div>
          <p className="text-4xl font-black">
            {faNum(totalStars)}
            <span className="mr-2 text-base font-bold text-muted-foreground">
              از {faNum(MAX_STARS)} ستاره
            </span>
          </p>
          <div className="grid w-full grid-cols-4 gap-2">
            {progress.stars.map((s, i) => (
              <div key={`fin-${i}`} className="rounded-xl bg-muted/60 p-2.5">
                <p className="text-[10px] font-bold text-muted-foreground">مرحلهٔ {faNum(i + 1)}</p>
                <div className="mt-1 flex justify-center gap-0.5">
                  {[0, 1, 2].map((k) => (
                    <Star
                      key={`fin-${i}-${k}`}
                      size={10}
                      className={k < s ? "fill-amber-400 text-amber-500" : "text-muted-foreground/25"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              className="h-12 gap-2"
              onClick={() => {
                playSound("click");
                beginAdventure("fresh");
              }}
            >
              <RotateCcw size={16} />
              ماجراجویی جدید
            </Button>
            <Button
              variant="outline"
              className="h-12"
              onClick={() => {
                playSound("click");
                setPhase("map");
              }}
            >
              نقشه
            </Button>
          </div>
        </CardContent>
      </Card>
    </GameShell>
  );
}
