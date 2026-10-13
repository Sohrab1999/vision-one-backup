"use client";

/**
 * hud-question — کارت سؤال روی HUD میدان (گام ۵ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی از index.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * متن سؤال (promptFa/promptMain/promptSub) + دکمهٔ «پخش دوباره» حالت شنیداری
 * + نوار زمان + شمارندهٔ فرصت هدف ویژهٔ HVT. کامپوننت presentational با props
 * هم‌نام شناسه‌های قبلی؛ q=null هیچ رندر نمی‌کند (عین شرط قبلی {q && …}).
 * فاز F10-ب — حالت «جملهٔ زنجیره»: جای خالی‌های جمله به ترتیبِ شکار پر می‌شوند
 * (واژه‌های پرشده با استایل سبز متمایز) — بدون تغییر قرارداد pointer-events/rtl.
 */

import { Crosshair, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speak";
import { faNum } from "../shared";
import { GOLDEN_BONUS } from "./constants";
import type { Question } from "./types";

/** فاز F10-ب — جملهٔ زنجیره با جای خالی‌های پرشونده به ترتیب (کارت pointer-events-none می‌ماند) */
function ChainSentence({ q, progress }: { q: Question; progress: number }) {
  const words = q.sequence?.words ?? [];
  let blankIdx = 0;
  const tokens = q.promptMain.split(" ");
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok !== "___") {
          return (
            <span key={i}>
              {tok}
              {i < tokens.length - 1 ? " " : ""}
            </span>
          );
        }
        const k = blankIdx++;
        const filled = k < progress ? words[k] : null;
        return (
          <span key={i}>
            {filled ? (
              <span className="mx-0.5 rounded-md bg-emerald-500/15 px-1 font-black text-emerald-600 dark:text-emerald-400">
                {filled}
              </span>
            ) : (
              <span className="mx-0.5 tracking-widest text-muted-foreground/60">___</span>
            )}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

interface HudQuestionProps {
  q: Question | null;
  isFs: boolean;
  timePct: number;
  goldenActive: boolean;
  goldenLeft: number;
  /** آینهٔ سرعت گفتار (latest-ref در index) — دکمهٔ پخش دوباره از این می‌خواند */
  voiceSpeedRef: { current: number };
  /** فاز F10-ب — تعداد واژه‌های زنجیرهٔ شکارشده (۰..۳) — جای خالی‌ها به ترتیب پر می‌شوند */
  chainProgress: number;
}

export function HudQuestion({ q, isFs, timePct, goldenActive, goldenLeft, voiceSpeedRef, chainProgress }: HudQuestionProps) {
  if (!q) return null;
  return (
    <div className={cn("pointer-events-none absolute inset-x-3 z-10", isFs ? "top-16" : "top-3")}>
      <div className="mx-auto max-w-lg rounded-2xl border bg-background/85 p-3 text-center shadow-lg backdrop-blur">
        <p className="text-[10px] font-bold text-muted-foreground">{q.promptFa}</p>
        <p
          dir={q.ltr ? "ltr" : "rtl"}
          className={cn(
            "mt-1 font-black leading-6",
            q.ltr ? "font-en text-[15px]" : "text-[17px]",
          )}
        >
          {/* فاز F10-ب — زنجیره: جمله با جای خالی‌های پرشونده به ترتیب شکار */}
          {q.mode === "sentence-chain" && q.sequence ? <ChainSentence q={q} progress={chainProgress} /> : q.promptMain}
        </p>
        {q.promptSub && <p className="mt-0.5 text-[10px] text-muted-foreground">{q.promptSub}</p>}
        {/* فاز F10-a — پخش دوبارهٔ واژه در حالت شنیداری (کارت pointer-events-none است؛ دکمه auto) */}
        {q.mode === "listening-hunt" && (
          <button
            type="button"
            onClick={() => void speak(q.speakText, { speed: voiceSpeedRef.current })}
            className="pointer-events-auto mx-auto mt-2 flex min-h-9 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold text-primary transition-all hover:bg-primary/15 active:scale-95"
            aria-label="پخش دوبارهٔ واژه"
          >
            <Volume2 size={13} aria-hidden />
            پخش دوباره
          </button>
        )}
        {/* نوار زمان */}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-200",
              timePct > 50 ? "bg-emerald-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500",
            )}
            style={{ width: `${timePct}%` }}
          />
        </div>
        {/* فاز T1 — شمارندهٔ فرصت هدف ویژهٔ HVT (پالت قرمز تاکتیکی) */}
        {goldenActive && (
          <div className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-[11px] font-black text-red-600 dark:text-red-400">
            <Crosshair size={12} className="text-red-500" />
            هدف ویژهٔ HVT! +{faNum(GOLDEN_BONUS)} — {faNum(goldenLeft)} ثانیه
          </div>
        )}
      </div>
    </div>
  );
}
