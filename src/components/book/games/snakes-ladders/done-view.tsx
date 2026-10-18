"use client";

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
  const wp = winner !== null ? players[winner] : undefined;
  // ستاره‌بندی per-game (سربرگ فایل): «سفر برنده» — هر پله ‎+۱ و هر مار ‎−۱؛
  // امتیاز سفر ≥۳ → ۳ ستاره · ≥۱ → ۲ ستاره · بقیه → ۱ ستاره
  const journeyScore = journey.up - journey.down;
  const stars = journeyScore >= 3 ? 3 : journeyScore >= 1 ? 2 : 1;
  return (
    <div className="relative mx-auto max-w-xl space-y-3">
      {/* فاز SL1-03 — confetti برد انسانی (۳۶ ذرهٔ تمام-CSS؛ فقط برد انسان — برد ربات بدون جشن؛
          reduced-motion → display:none؛ pointer-events-none — کلاً تزئینی) */}
      {wp && !wp.isBot && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-visible">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className={cn("sl-confetti-piece rounded-[2px]", c.cls)}
              style={{
                left: `${c.left}%`,
                width: c.w,
                height: c.h,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              }}
            />
          ))}
        </div>
      )}
      <ResultScreen
        title={wp ? `${wp.name} برد! 🏆` : "بازی تمام شد!"}
        stars={stars}
        isRecord={isRecord}
        stats={[
          {
            label: "نوبت‌ها",
            value: faNum(qNum),
            icon: <Users size={16} className="text-emerald-600 dark:text-emerald-400" />,
          },
          {
            label: "تاس‌ها",
            value: faNum(rolls),
            icon: <Dices size={16} className="text-amber-500" />,
          },
          {
            label: "مدت",
            value: fmtTime(secs),
            icon: <Timer size={16} className="text-teal-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />

      {/* کارنامهٔ بازیکن‌ها — مکمل نتیجهٔ استاندارد: نتیجهٔ تک‌تک بازیکن‌های چندنفره */}
      <Card>
        <CardContent className="space-y-1.5 p-4">
          <p className="mb-2 text-[12px] font-black text-muted-foreground">کارنامهٔ بازیکن‌ها</p>
          {players.map((pl, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-[12px]">
              <span className={cn("h-3 w-3 shrink-0 rounded-full", TOKEN_BG[pl.ci])} aria-hidden />
              <span className="font-bold">{pl.name}</span>
              {pl.isBot && <Badge variant="outline" className="px-1 py-0 text-[10px]">ربات</Badge>}
              {winner === i && (
                <Badge className="gap-1 bg-amber-500 px-1.5 py-0 text-[10px] text-amber-950">
                  <Crown size={10} />
                  برنده
                </Badge>
              )}
              <span className="mr-auto flex items-center gap-2.5 text-[11px] text-muted-foreground">
                <span>سؤال: {faNum(stats[i]?.asked ?? 0)}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  درست: {faNum(stats[i]?.correct ?? 0)}
                </span>
                <span className="font-bold text-destructive">غلط: {faNum(stats[i]?.wrong ?? 0)}</span>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
