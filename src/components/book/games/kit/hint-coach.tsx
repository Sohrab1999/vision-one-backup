"use client";

/**
 * مدرس بازی (Hint Coach) — فاز G5-01 نقشه راه بازی‌ها (docs/games-roadmap.md).
 *
 * بعد از ۳ خطا در یک بازی، خودکار از `/api/game-hint` یک توضیح کوتاه فارسی
 * (واژه/نکتهٔ گرامری) می‌گیرد و به‌شکل کارت شناور داخل GameShell نشان می‌دهد.
 *
 * قراردادها:
 * - شمارش خطاها در ref — خطای ۱و۲ فقط شمارش می‌شود؛ خطای ۳ fetch خودکار + نمایش کارت
 * - cooldown: بعد از هر نمایش (هر محتوایی) شمارنده صفر می‌شود — یعنی هر ۳ خطا یک راهنما
 * - خطا/قطعی شبکه/429/503 → پیام ثابت «راهنما آفلاین در دسترس نیست» + دکمهٔ «دوباره»
 * - بستن کارت (X) فقط مخفی می‌کند؛ راهنمای بعدی بعد از cooldown دوباره ظاهر می‌شود
 * - setState فقط اگر کامپوننت زنده باشد (الگوی latest-ref کیت) + abort با
 *   AbortController در unmount
 * - پالت زمردی/کهربایی (هیچ آبی/بنفش) · بدون کلید localStorage جدید · sound/haptics دست‌نخورده
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Lightbulb, Loader2, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface HintMistake {
  prompt?: string;
  answer?: string;
  chosen?: string;
}

export interface HintCoach {
  /** در هر پاسخ غلط صدا زده شود؛ خطای سوم راهنما را خودکار می‌گیرد */
  recordMistake: (m: HintMistake) => void;
  /** پاک‌کردن شمارنده (شروع دور جدید) */
  reset: () => void;
  /** کارت شناور مدرس — داخل GameShell children رندر شود */
  element: ReactNode;
}

/** پیام ثابت آفلاین — هم‌متن پاسخ ۵۰۳ سرور (پذیرش سند) */
const OFFLINE_MSG = "راهنما آفلاین در دسترس نیست";
/** هر چند خطا یک راهنما */
const HINT_EVERY = 3;
/** حداکثر خطاهای ارسالی به سرور (آخرین خطاها) */
const MAX_SENT = 3;

export function useHintCoach(game: string): HintCoach {
  // ── state کارت ──
  /** کارت رندر شود؟ (از خطای سوم تا بستن با X) */
  const [visible, setVisible] = useState(false);
  /** کارت با X بسته شده (فقط مخفی — راهنمای بعدی دوباره ظاهرش می‌کند) */
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);
  /** راهنمای دریافتی سرور (null = محتوایی نیست) */
  const [hint, setHint] = useState<string | null>(null);
  /** شکست fetch/سرور → پیام آفلاین + دکمهٔ «دوباره» */
  const [failed, setFailed] = useState(false);

  // ── refs (بدون رندر اضافه؛ الگوی latest-ref کیت) ──
  const countRef = useRef(0);
  const mistakesRef = useRef<HintMistake[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const aliveRef = useRef(true);
  const gameRef = useRef(game);
  // نوشتن ref فقط در effect (قاعدهٔ react-hooks/refs — نه هنگام رندر)
  useEffect(() => {
    gameRef.current = game;
  });
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  /** فراخوانی `/api/game-hint` با آخرین خطاها + نمایش کارت (loading → hint/آفلاین) */
  const requestHint = useCallback(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    if (aliveRef.current) {
      setDismissed(false); // راهنمای تازه همیشه از نو ظاهر می‌شود
      setHint(null);
      setFailed(false);
      setLoading(true);
      setVisible(true);
    }
    void (async () => {
      try {
        const res = await fetch("/api/game-hint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            game: gameRef.current,
            mistakes: mistakesRef.current.slice(-MAX_SENT),
          }),
          signal: ac.signal,
        });
        if (!aliveRef.current || ac.signal.aborted) return;
        if (res.ok) {
          const data: unknown = await res.json().catch(() => null);
          const text = (data as { hint?: unknown } | null)?.hint;
          if (typeof text === "string" && text.trim()) {
            setHint(text.trim());
            setFailed(false);
          } else {
            setFailed(true);
          }
        } else {
          // 429/503/… — همه به پیام آفلاین با دکمهٔ «دوباره» می‌رسند
          setFailed(true);
        }
      } catch {
        if (aliveRef.current && !ac.signal.aborted) setFailed(true);
      } finally {
        if (aliveRef.current && !ac.signal.aborted) setLoading(false);
      }
    })();
  }, []);

  const recordMistake = useCallback(
    (m: HintMistake) => {
      // کوتاه‌سازی دفاعی فیلدها (هم‌سقف اعتبارسنجی سرور) — فقط آخرین خطاها نگه داشته می‌شود
      mistakesRef.current = [
        ...mistakesRef.current,
        {
          prompt: m.prompt?.slice(0, 160),
          answer: m.answer?.slice(0, 160),
          chosen: m.chosen?.slice(0, 160),
        },
      ].slice(-MAX_SENT);
      countRef.current += 1;
      if (countRef.current >= HINT_EVERY) {
        countRef.current = 0; // بعد از هر نمایش شمارنده صفر — هر ۳ خطا یک راهنما
        requestHint();
      }
    },
    [requestHint],
  );

  const reset = useCallback(() => {
    countRef.current = 0; // شروع دور جدید — فقط شمارنده (کارت باز دست‌نخورده می‌ماند)
  }, []);

  const close = useCallback(() => setDismissed(true), []);

  const element: ReactNode =
    visible && !dismissed ? (
      <Card
        role="status"
        aria-live="polite"
        className="rise-in mt-3 w-full gap-0 rounded-2xl border-amber-500/30 py-3 shadow-sm"
      >
        <div className="flex w-full items-center gap-2 px-4">
          <span
            aria-hidden
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400"
          >
            <Lightbulb size={15} />
          </span>
          <span className="text-[11px] font-black text-amber-600 dark:text-amber-400">مدرس بازی</span>
          <button
            type="button"
            onClick={close}
            aria-label="بستن راهنما"
            className="mr-auto flex min-h-9 min-w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={15} />
          </button>
        </div>
        {loading ? (
          <p className="flex w-full items-center gap-2 px-4 pt-1.5 text-sm leading-6 text-muted-foreground">
            <Loader2 size={14} aria-hidden className="shrink-0 animate-spin text-amber-500" />
            مدرس در حال نوشتن…
          </p>
        ) : failed ? (
          <div className="w-full space-y-2 px-4 pt-1.5">
            <p className="text-sm leading-6 text-muted-foreground">{OFFLINE_MSG}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={requestHint}
              className="min-h-11 gap-1.5 border-amber-500/40 text-[12px] text-amber-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-amber-400"
            >
              <RotateCcw size={13} />
              دوباره
            </Button>
          </div>
        ) : (
          <p dir="rtl" className="w-full px-4 pt-1.5 text-sm leading-6">
            {hint}
          </p>
        )}
      </Card>
    ) : null;

  return { recordMistake, reset, element };
}
