"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCombinedRounds } from "@/lib/round-counters";
import { getClassKey, readApiError } from "@/lib/class-store";

/**
 * گیت نظرسنجی رضایت (فاز ۱۲ — نظرسنجی).
 *
 * - بدون UI تا فعال شود: اگر کاربر بدون flag نظرسنجی باشد و مجموع جلساتِ
 *   مرور ترکیبی (useCombinedRounds) به ۱۰ رسیده باشد، ۳ ثانیه بعد از mount
 *   دیالوگ نظرسنجی باز می‌شود.
 * - گارد ماژولی: در هر بارگذاری صفحه فقط یک‌بار ارزیابی می‌شود (reset در
 *   cleanup تا با unmount/remount واقعی هم درست باشد).
 * - «بعداً» یا بستن دیالوگ → کلید postpone با cooldown ۳ روز.
 * - ارسال موفق → flag «done» = "1" (آخرین id نظرسنجی نسخهٔ اول).
 * - خطا (404/429/شبکه) → toast فارسی و بستن بدون flag تا بعداً دوباره بپرسد.
 */

const DONE_KEY = "visionone:survey-done";
const POSTPONE_KEY = "visionone:survey-postpone";
const MIN_ROUNDS = 10;
const OPEN_DELAY_MS = 3000;
const POSTPONE_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000; // ۳ روز
const TEXT_MAX = 200;

/** گارد ماژولی — ارزیابی «باز شدن» در هر بارگذاری صفحه فقط یک‌بار */
let gateEvaluated = false;

const SCORE_FACES = ["😞", "😐", "🙂", "😄", "🤩"] as const;

const faNum = (n: number) => n.toLocaleString("fa-IR");

export function SurveyGate() {
  const rounds = useCombinedRounds();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const eligible = rounds >= MIN_ROUNDS;

  useEffect(() => {
    if (gateEvaluated || !eligible) return;
    gateEvaluated = true;
    try {
      if (localStorage.getItem(DONE_KEY)) return;
      const postponedAt = Number(localStorage.getItem(POSTPONE_KEY) || "0");
      if (postponedAt && Date.now() - postponedAt < POSTPONE_COOLDOWN_MS) return;
    } catch {
      /* localStorage در دسترس نیست — مثل عدم flag رفتار کن */
    }
    const t = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => {
      clearTimeout(t);
      gateEvaluated = false; // unmount واقعی → اجازهٔ ارزیابی در mount بعدی
    };
  }, [eligible]);

  /** بستن با cooldown ۳ روز (بدون flag done) */
  function handlePostpone() {
    if (busy) return;
    try {
      localStorage.setItem(POSTPONE_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
    setOpen(false);
  }

  async function handleSubmit() {
    if (!score || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          text: text.trim() ? text.trim() : undefined,
          userKey: getClassKey(),
        }),
      });
      if (res.ok) {
        try {
          localStorage.setItem(DONE_KEY, "1"); // آخرین id نظرسنجی (نسخهٔ ۱)
        } catch {
          /* noop */
        }
        setOpen(false);
        toast.success("ممنون از نظرت! 🌟");
      } else {
        const msg = await readApiError(res, "الان ثبت نشد — کمی بعد دوباره امتحان کن 🙂");
        setOpen(false); // بستن بدون flag تا بعداً دوباره پرسیده شود
        toast.error(msg);
      }
    } catch {
      setOpen(false); // خطای شبکه — بدون flag
      toast.error("اینترنت در دسترس نیست — نظرت محفوظ نماند؛ بعداً دوباره امتحان کن 📴");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handlePostpone(); // Esc/کلیک بیرون هم مثل «بعداً»
      }}
    >
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-right">
            {faNum(MIN_ROUNDS)} جلسه با ویژن‌وان! 🎉
          </DialogTitle>
          <DialogDescription className="text-right text-[12px] leading-6">
            تجربت چطور بود؟ نظرت مسیر ساخت ویژن‌وان را عوض می‌کند — کمتر از یک دقیقه وقت می‌گیرد.
          </DialogDescription>
        </DialogHeader>

        {/* ۵ دکمهٔ ایموجی */}
        <div
          role="radiogroup"
          aria-label="امتیاز تجربه از ۱ تا ۵"
          className="flex items-center justify-between gap-1.5 py-1"
        >
          {SCORE_FACES.map((face, i) => {
            const value = i + 1;
            const selected = score === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`امتیاز ${faNum(value)}`}
                onClick={() => setScore(value)}
                className={
                  "flex h-14 min-w-11 flex-1 items-center justify-center rounded-2xl border text-3xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (selected
                    ? "scale-110 border-amber-500 bg-amber-400 text-amber-950 shadow-md shadow-amber-500/30"
                    : "border-border bg-muted/40 hover:scale-105 hover:border-amber-400 hover:bg-amber-500/10")
                }
              >
                <span aria-hidden>{face}</span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-[10px] text-muted-foreground" aria-hidden>
          ناراحت 😞 → عالی 🤩
        </p>

        {/* متن اختیاری */}
        <div className="space-y-1">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX}
            rows={3}
            placeholder="دوست داری چه چیزی اضافه شود؟ (اختیاری)"
            aria-label="پیشنهاد برای بهبود ویژن‌وان (اختیاری)"
            className="resize-none text-sm"
          />
          <p className="text-left text-[10px] tabular-nums text-muted-foreground" aria-live="polite">
            {faNum(text.length)} / {faNum(TEXT_MAX)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!score || busy}
            className="min-h-11 gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {busy ? "در حال ارسال…" : "ارسال نظر 🌟"}
          </Button>
          <Button variant="outline" onClick={handlePostpone} disabled={busy} className="min-h-11">
            بعداً
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
