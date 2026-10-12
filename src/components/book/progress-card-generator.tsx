"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Download, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faNum } from "@/components/book/games/shared";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { readStreak } from "@/lib/streak-store";
import { readXp, levelInfo } from "@/lib/xp-store";
import { getActiveBookSnapshot } from "@/lib/book-storage";
import { getBookMeta } from "@/data/books/registry";
import type { BookId } from "@/data/books/types";

/**
 * کارت پیشرفت اشتراکی (فاز ۱۰ — خروجی‌ها).
 *
 * - بوم 1080×1350 (نمایش تا 540×675 → دقیقاً ۲× برای وضوح رتینا) با پس‌زمینهٔ
 *   روشن سبز/teal، قاب emerald و لکه‌های تزئینی amber — بدون آبی/بنفش.
 * - آمار همگام از استورها: جمع واژه‌های آموختهٔ ۶ جزوه (مستقیم از localStorage)،
 *   زنجیرهٔ روزانه، سطح XP و درصد پیشرفت جزوهٔ فعال.
 * - رندر اولیه فقط یک‌بار بعد از mount (با گارد ref)؛ بدون setState در effect.
 * - دانلود با toBlob و اشتراک با Web Share API (فایل) + فالبک دانلود.
 */

const ALL_BOOKS: BookId[] = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12"];
const W = 1080;
const H = 1350;

interface CardStats {
  totalLearned: number;
  streak: number;
  level: number;
  activeName: string | null;
  activePct: number | null;
}

/** شمارش واژه‌های آموختهٔ یک جزوه مستقیم از localStorage (کلید scoped؛ با فالبک کلید قدیمی ویژن وان) */
function readBookLearned(bookId: string): number {
  try {
    let raw = localStorage.getItem(`visionone:book:${bookId}:learned`);
    if (raw === null && bookId === "vision-one") raw = localStorage.getItem("visionone:learned");
    if (!raw) return 0;
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

/** اسنپ‌شات آمار کارت — خواندن همگام localStorage (در effect/event مجاز است) */
function collectStats(activeVocabTotal: number | null): CardStats {
  const totalLearned = ALL_BOOKS.reduce((s, b) => s + readBookLearned(b), 0);
  const streak = readStreak().count;
  const level = levelInfo(readXp().total).level;
  const activeId = getActiveBookSnapshot();
  const meta = activeId ? getBookMeta(activeId) : undefined;
  const activeLearned = activeId ? readBookLearned(activeId) : 0;
  const activePct =
    meta && activeVocabTotal !== null && activeVocabTotal > 0
      ? Math.min(100, Math.round((activeLearned / activeVocabTotal) * 100))
      : null;
  return { totalLearned, streak, level, activeName: meta?.title ?? null, activePct };
}

// ─── ابزارهای ترسیم ───

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function setFont(ctx: CanvasRenderingContext2D, size: number, weight = "bold") {
  ctx.font = `${weight} ${size}px Vazirmatn, sans-serif`;
}

/** فونت را تا جا شدن متن در maxW کوچک می‌کند */
function fitFont(ctx: CanvasRenderingContext2D, text: string, size: number, maxW: number, weight = "bold") {
  let s = size;
  setFont(ctx, s, weight);
  while (ctx.measureText(text).width > maxW && s > 24) {
    s -= 2;
    setFont(ctx, s, weight);
  }
}

function drawCard(
  canvas: HTMLCanvasElement,
  s: CardStats,
  displayName: string | null,
  avatar: string | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  // زمینهٔ گرد با گرادیان روشن سبز → teal
  roundedRect(ctx, 0, 0, W, H, 64);
  ctx.save();
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#f2fdf7");
  g.addColorStop(1, "#effdfb");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // لکه‌های تزئینی amber/teal
  ctx.fillStyle = "rgba(245, 158, 11, 0.16)";
  circle(ctx, W - 30, 140, 175);
  ctx.fill();
  ctx.fillStyle = "rgba(245, 158, 11, 0.10)";
  circle(ctx, 20, 430, 115);
  ctx.fill();
  ctx.fillStyle = "rgba(20, 184, 166, 0.10)";
  circle(ctx, W - 80, H - 210, 195);
  ctx.fill();
  ctx.fillStyle = "rgba(16, 185, 129, 0.10)";
  circle(ctx, 55, H - 70, 150);
  ctx.fill();
  ctx.restore();

  // قاب دوخطه emerald + teal
  roundedRect(ctx, 6, 6, W - 12, H - 12, 60);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
  ctx.stroke();
  roundedRect(ctx, 26, 26, W - 52, H - 52, 46);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(45, 212, 191, 0.55)";
  ctx.stroke();

  ctx.direction = "rtl";
  ctx.textBaseline = "alphabetic";

  // عنوان
  ctx.textAlign = "center";
  ctx.fillStyle = "#065f46";
  setFont(ctx, 92);
  ctx.fillText("ویژن‌وان 🦉", W / 2, 195);

  // نام و آواتار کاربر لاگین‌شده (اگر بود)
  let topY = 285;
  if (displayName) {
    const label = `${avatar ?? "🙂"} ${displayName}`;
    fitFont(ctx, label, 46, 620);
    ctx.fillStyle = "#047857";
    ctx.fillText(label, W / 2, topY);
    topY += 46;
  }

  // ردیف‌های آمار با دایرهٔ آیکونی
  const bookLine = s.activeName
    ? s.activePct !== null
      ? `جزوهٔ فعال: ${s.activeName} — ${faNum(s.activePct)}٪ پیشرفت`
      : `جزوهٔ فعال: ${s.activeName}`
    : "جزوهٔ فعال: —";

  const rows: { emoji: string; bg: string; text: string }[] = [
    { emoji: "📚", bg: "rgba(16, 185, 129, 0.17)", text: `${faNum(s.totalLearned)} واژه آموخته` },
    { emoji: "🔥", bg: "rgba(245, 158, 11, 0.18)", text: `${faNum(s.streak)} روز پیاپی` },
    { emoji: "⭐", bg: "rgba(245, 158, 11, 0.16)", text: `سطح ${faNum(s.level)}` },
    { emoji: "📖", bg: "rgba(20, 184, 166, 0.17)", text: bookLine },
  ];

  const rowY0 = topY + 165;
  const step = 168;
  const cx = W - 170; // مرکز دایرهٔ آیکون (سمت راست — RTL)
  for (let i = 0; i < rows.length; i++) {
    const cy = rowY0 + i * step;
    ctx.fillStyle = rows[i].bg;
    circle(ctx, cx, cy, 56);
    ctx.fill();
    ctx.textAlign = "center";
    setFont(ctx, 50);
    ctx.fillStyle = "#1f2937";
    ctx.fillText(rows[i].emoji, cx, cy + 17);
    fitFont(ctx, rows[i].text, 46, 600);
    ctx.textAlign = "right";
    ctx.fillStyle = "#134e4a";
    ctx.fillText(rows[i].text, cx - 56 - 34, cy + 16);
  }

  // امضای پایین کارت
  ctx.textAlign = "center";
  setFont(ctx, 34, "600");
  ctx.fillStyle = "#0d9488";
  ctx.fillText("ویژن‌وان — یادگیری انگلیسی با بازی", W / 2, H - 105);
}

// ─── کامپوننت ───

export function ProgressCardGenerator({ activeVocabTotal }: { activeVocabTotal: number | null }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onceRef = useRef(false);
  const pctRef = useRef(false);
  const drawnUserRef = useRef<string | null | undefined>(undefined);

  /** تلاش برای فونت Vazirmatn و کشیدن کارت با دادهٔ همگامِ همین لحظه */
  const drawNow = useCallback(async () => {
    try {
      await document.fonts.load("bold 92px Vazirmatn");
      await document.fonts.load("bold 46px Vazirmatn");
    } catch {
      /* فونت نبود — drawCard با fallback sans-serif می‌کشد */
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCard(canvas, collectStats(activeVocabTotal), user?.username ?? null, user?.avatar ?? null);
  }, [user, activeVocabTotal]);

  // رندر اولیه: یک‌بار بعد از mount (و یک‌بار دیگر فقط اگر نام کاربر یا درصد جزوه بعداً آماده شود)
  useEffect(() => {
    if (status === "loading") return;
    const uname = user?.username ?? null;
    const userChanged = drawnUserRef.current !== undefined && drawnUserRef.current !== uname;
    if (!onceRef.current || userChanged) {
      onceRef.current = true;
      drawnUserRef.current = uname;
      if (activeVocabTotal !== null) pctRef.current = true;
      void drawNow();
      return;
    }
    if (activeVocabTotal !== null && !pctRef.current) {
      pctRef.current = true;
      void drawNow();
    }
  }, [status, activeVocabTotal, drawNow, user]);

  function toPngBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }
      canvas.toBlob((b) => resolve(b), "image/png");
    });
  }

  function saveBlob(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vision-one-progress-card.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function handleDownload() {
    await drawNow(); // تضمین فونت/دادهٔ تازه پیش از خروجی
    const blob = await toPngBlob();
    if (!blob) {
      toast.error("ساخت تصویر ممکن نشد");
      return;
    }
    saveBlob(blob);
    toast.success("کارت پیشرفت دانلود شد 🖼️");
  }

  async function handleShare() {
    await drawNow();
    const blob = await toPngBlob();
    if (!blob) {
      toast.error("ساخت تصویر ممکن نشد");
      return;
    }
    const file = new File([blob], "vision-one-progress-card.png", { type: "image/png" });
    const files = [file];
    if (typeof navigator !== "undefined" && navigator.canShare?.({ files })) {
      try {
        await navigator.share({
          files,
          title: "کارت پیشرفت من — ویژن‌وان",
          text: "پیشرفت یادگیری انگلیسی من در ویژن‌وان 🦉",
        });
        return; // لغو کاربر هم بی‌صدا رد می‌شود
      } catch {
        return;
      }
    }
    saveBlob(blob);
    toast.info("مرورگر اشتراک‌گذاری فایل را پشتیبانی نمی‌کند — تصویر دانلود شد");
  }

  return (
    <Card className="rise-in overflow-hidden border-primary/25">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Sparkles size={19} />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-black">کارت پیشرفت من ✨</h2>
            <p className="text-[11px] leading-5 text-muted-foreground">
              آمارت یک‌جا روی یک کارت قشنگ — دانلودش کن یا مستقیم برای دوستانت بفرست.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            aria-label="پیش‌نمایش کارت پیشرفت من"
            className="h-auto w-full max-w-[540px] rounded-2xl border shadow-md"
          />
        </div>

        <div className="mx-auto mt-4 grid w-full max-w-[540px] grid-cols-2 gap-2">
          <Button className="gap-1.5" onClick={() => void handleDownload()}>
            <Download size={15} />
            دانلود تصویر
          </Button>
          <Button variant="outline" className="gap-1.5" onClick={() => void handleShare()}>
            <Share2 size={15} />
            اشتراک‌گذاری
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
