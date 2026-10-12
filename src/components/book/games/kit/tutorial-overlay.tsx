"use client";

/**
 * اورلی آموزش ۳-گامی بازی‌ها — فاز G1-08 نقشه راه بازی‌ها.
 *
 * قراردادها:
 * - کلید per-game در localStorage: `visionone:game-tutorial:{game}` (۱ = دیده‌شده)
 * - نمایش خودکار فقط یک‌بار؛ «دیده‌شده» حتی با رد‌کردن همیشه ذخیره می‌شود
 *   (skip همیشگی طبق سند) — دکمهٔ «راهنما» در GameShell هر وقت بخواهد دوباره باز می‌کند
 * - بدون mismatch SSR: تصمیم نمایش خودکار فقط در effect بعد از mount گرفته
 *   می‌شود و state اولیه همیشه بسته است
 * - اورلی روی Dialog شادکنا است (تلهٔ فوکوس، Esc، aria خودکار)
 * - بازی‌هایی که حین آموزش تایمر دارند باید در onOpenChange(false) خودشان
 *   resume کنند (کیت state توقف بازی را نمی‌شناسد) — الگوی پایلوت memory
 */

import { useCallback, useState, useSyncExternalStore, type ReactNode } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { faNum } from "../shared";

function tutorialKeyOf(game: string): string {
  return `visionone:game-tutorial:${game}`;
}

const TUTORIAL_EVENT = "visionone:tutorial-change";

/** اشتراک تغییر «دیده‌شدن آموزش» — الگوی استورهای پروژه (useSyncExternalStore) */
function subscribeTutorial(cb: () => void): () => void {
  window.addEventListener(TUTORIAL_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(TUTORIAL_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function hasTutorialSeen(game: string): boolean {
  try {
    return window.localStorage.getItem(tutorialKeyOf(game)) === "1";
  } catch {
    return true; // بدون localStorage دیگر اذیت نمی‌کنیم
  }
}

export function markTutorialSeen(game: string): void {
  try {
    window.localStorage.setItem(tutorialKeyOf(game), "1");
  } catch {
    /* noop */
  }
  try {
    window.dispatchEvent(new CustomEvent(TUTORIAL_EVENT));
  } catch {
    /* noop */
  }
}

export interface TutorialStep {
  icon?: ReactNode;
  title: string;
  text: string;
}

export interface TutorialOverlayProps {
  /** کلید بازی — همان GAME_KEY */
  game: string;
  steps: TutorialStep[];
  open: boolean;
  /** بسته‌شدن (Esc/X/دکمه‌ها/کلیک بیرون) — همیشه markTutorialSeen هم می‌شود */
  onOpenChange: (open: boolean) => void;
}

export function TutorialOverlay({ game, steps, open, onOpenChange }: TutorialOverlayProps) {
  const [stepIdx, setStepIdx] = useState(0);

  // ریست به قدم اول هنگام بسته‌شدن — close تنها مسیر بستن است (X/Esc/کلیک بیرون هم
  // از onOpenChange به همین‌جا می‌رسند) پس بازشدن بعدی همیشه از قدم اول شروع می‌شود
  const close = useCallback(() => {
    setStepIdx(0);
    markTutorialSeen(game);
    onOpenChange(false);
  }, [game, onOpenChange]);

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) close(); }}>
      <DialogContent className="max-w-sm">
        {step && (
          <div className="space-y-5 text-right">
            <DialogTitle className="text-base font-black">
              راهنمای بازی — قدم {faNum(stepIdx + 1)} از {faNum(steps.length)}
            </DialogTitle>

            <div className="flex flex-col items-center gap-3 py-2 text-center">
              {step.icon && (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {step.icon}
                </span>
              )}
              <p className="text-[15px] font-black">{step.title}</p>
              <p className="text-[13px] leading-6 text-muted-foreground">{step.text}</p>
            </div>

            {/* نقطه‌چین پیشرفت قدم‌ها */}
            <div className="flex items-center justify-center gap-1.5" aria-hidden>
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === stepIdx ? "w-6 bg-primary" : "w-2 bg-muted-foreground/25",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => (isLast ? close() : setStepIdx((i) => i + 1))}
                className="h-11 flex-1 gap-2"
              >
                {isLast ? (
                  <>
                    <Play size={16} />
                    شروع می‌کنم!
                  </>
                ) : (
                  "بعدی"
                )}
              </Button>
              {stepIdx > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                  className="h-11"
                >
                  قبلی
                </Button>
              )}
            </div>

            {!isLast && (
              <button
                type="button"
                onClick={close}
                className="mx-auto block text-[12px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                رد کردن — دیگر نشانم نده
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * هوک نمایش خودکار یک‌بار — وقتی `enabled` شد (مثلاً رسیدن به phase دلخواه)
 * و بازی هنوز آموزشش دیده نشده باشد، اورلی باز می‌شود.
 * خروجی: open / openHelp (دکمهٔ راهنما) / close (بستن + ثبت دیده‌شده)
 *
 * بدون setState-in-effect و بدون mismatch SSR: «دیده‌نشده» با
 * useSyncExternalStore از localStorage خوانده می‌شود (snapshot سرور = بسته؛
 * الگوی استورهای پروژه) و باز/بستهٔ دستی با state جدا مدیریت می‌شود.
 */
export function useAutoTutorial(
  game: string,
  enabled: boolean,
): { open: boolean; openHelp: () => void; close: () => void } {
  // auto = هنوز دیده نشده و شرایط نمایش هم فراهم است — بدون نگه‌داری در state
  const autoOpen = useSyncExternalStore(
    subscribeTutorial,
    () => enabled && !hasTutorialSeen(game),
    () => false,
  );
  /** باز/بستهٔ دستی (راهنما/بستن) — null یعنی تصمیم با auto */
  const [manual, setManual] = useState<boolean | null>(null);

  const open = manual ?? autoOpen;

  const openHelp = useCallback(() => setManual(true), []);
  const close = useCallback(() => {
    markTutorialSeen(game);
    setManual(false);
  }, [game]);

  return { open, openHelp, close };
}
