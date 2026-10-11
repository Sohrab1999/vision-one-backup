"use client";

/**
 * کارت اشتراک نتیجهٔ بازی (فاز G4-04 نقشه راه بازی‌ها — docs/games-roadmap.md).
 *
 * همان الگوی معمول پروژه در progress-card-generator.tsx:
 *  - بوم 1080×1350 (نمایش تا 540×675 → دقیقاً ۲× برای وضوح رتینا) با ترسیم دستی
 *    Canvas 2D — بدون هیچ کتابخانهٔ اسکرین‌شات خارجی.
 *  - زمینهٔ روشن emerald/teal با لکه‌های تزئینی amber، قاب دوخطه، کارت سفید گرد،
 *    نام بزرگ بازی، ردیف ۳ ستارهٔ amber و شبکهٔ چیپ آمار (مقدار + برچسب).
 *  - متن فارسی RTL با ctx.direction="rtl" و textAlign صریح؛ فونت Vazirmatn با
 *    document.fonts.load تضمین می‌شود (نبود فونت → فالبک sans-serif).
 *  - خروجی Blob (image/png) با toBlob؛ اشتراک با Web Share API (فایل) و فالبک
 *    دانلود. «بدون ذخیرهٔ خودکار» — این توابع فقط از کنش صریح کاربر (onClick)
 *    صدا زده می‌شوند و لغو دیالوگ اشتراک هرگز خطا پرتاب نمی‌کند.
 *
 * توجه: values آمار از قبل فارسی‌فرمت‌شده از ResultScreen می‌آیند — دست‌نخورده
 * روی کارت می‌نشینند (بدون تبدیل عدد اضافه).
 */

const W = 1080;
const H = 1350;

/** نام فایل خروجی PNG */
export const RESULT_CARD_FILENAME = "vision-one-result.png";

export interface ResultCardStat {
  label: string;
  value: string;
}

export interface ResultCardOptions {
  /** نام بازی — مثل «وردل» یا «تطبیق حافظه» */
  gameName: string;
  /** عنوان پایان دور — مثل «همه جفت‌ها پیدا شد!» */
  title: string;
  /** ستاره‌های کسب‌شده ۰..۳ (بیرون از بازه کلمپ می‌شود) */
  stars: number;
  /** چیپ‌های آمار (حداکثر ۶ = دو ردیف ۳تایی روی کارت) */
  stats: ResultCardStat[];
  /** بج کهربایی «رکورد جدید! 🏆» بالای ستاره‌ها */
  isRecord?: boolean;
}

/** نتیجهٔ جریان اشتراک — «cancelled» یعنی لغو کاربر (بی‌صدا) */
export type ResultShareOutcome = "shared" | "saved" | "cancelled" | "failed";

// ─── ابزارهای ترسیم (الگوی progress-card-generator) ───

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
  while (ctx.measureText(text).width > maxW && s > 22) {
    s -= 2;
    setFont(ctx, s, weight);
  }
}

/** ستارهٔ ۵پر — پُر = amber، خالی = خاکستری کم‌رنگ (هماهنگ با ستارهٔ ResultScreen) */
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number, filled: boolean) {
  const innerR = outerR * 0.42;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  if (filled) {
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#d97706";
    ctx.stroke();
  } else {
    ctx.fillStyle = "rgba(148, 163, 184, 0.16)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
    ctx.stroke();
  }
}

function drawResultCard(canvas: HTMLCanvasElement, opts: ResultCardOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");
  ctx.clearRect(0, 0, W, H);

  // زمینهٔ گرد با گرادیان روشن emerald → teal
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

  // ─── سربرگ: کیکر + نام بزرگ بازی ───
  ctx.textAlign = "center";
  setFont(ctx, 40, "600");
  ctx.fillStyle = "#0d9488";
  ctx.fillText("نتیجهٔ بازی", W / 2, 152);

  ctx.fillStyle = "#065f46";
  fitFont(ctx, opts.gameName, 88, 820);
  ctx.fillText(opts.gameName, W / 2, 262);

  // ─── کارت سفید گرد (محتوای اصلی) ───
  const cardX = 90;
  const cardW = W - 180; // 900
  const cardTop = 348;

  const stats = opts.stats.slice(0, 6);
  const rows = stats.length > 0 ? Math.ceil(stats.length / 3) : 0;
  const chipH = 170;
  const chipGap = 18;

  const titleY = cardTop + 108;
  let cursor = titleY + 46;

  // بج رکورد (کهربایی — هماهنگ با Badge نتیجه)
  let recordTop = 0;
  if (opts.isRecord) {
    recordTop = cursor + 12;
    cursor = recordTop + 76 + 24;
  }

  // ردیف ستاره‌ها (۰..۳ پر)
  const starsSafe = Math.max(0, Math.min(3, Math.round(opts.stars)));
  const starsCy = cursor + 72;
  cursor = starsCy + (rows > 0 ? 108 : 72);

  const chipsTop = cursor;
  const cardH = (rows > 0 ? chipsTop + rows * chipH + (rows - 1) * chipGap : starsCy + 96) - cardTop + 52;

  roundedRect(ctx, cardX, cardTop, cardW, cardH, 48);
  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(16, 185, 129, 0.28)";
  ctx.stroke();

  // عنوان پایان دور
  ctx.textAlign = "center";
  ctx.fillStyle = "#047857";
  fitFont(ctx, opts.title, 46, cardW - 110);
  ctx.fillText(opts.title, W / 2, titleY);

  // بج «رکورد جدید»
  if (opts.isRecord) {
    const pillW = 396;
    const pillX = W / 2 - pillW / 2;
    roundedRect(ctx, pillX, recordTop, pillW, 76, 38);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
    setFont(ctx, 36, "bold");
    ctx.fillStyle = "#451a03";
    ctx.fillText("رکورد جدید! 🏆", W / 2, recordTop + 51);
  }

  // ستاره‌ها — پرشده کمی بزرگ‌تر (الگوی scale-110 نتیجه)
  const starR = 50;
  const starGap = 128;
  for (let i = 0; i < 3; i++) {
    const cx = W / 2 + (i - 1) * starGap;
    drawStar(ctx, cx, starsCy, i < starsSafe ? starR + 7 : starR, i < starsSafe);
  }

  // ─── شبکهٔ چیپ‌های آمار (۳ ستون؛ حداکثر دو ردیف) ───
  if (rows > 0) {
    const innerX = cardX + 40;
    const innerW = cardW - 80; // 820
    const chipW = (innerW - 2 * chipGap) / 3; // ≈ 261
    for (let i = 0; i < stats.length; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      // RTL: چیپ اول سمت راست
      const x = innerX + innerW - chipW - col * (chipW + chipGap);
      const y = chipsTop + row * (chipH + chipGap);
      roundedRect(ctx, x, y, chipW, chipH, 28);
      ctx.fillStyle = "rgba(16, 185, 129, 0.09)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(16, 185, 129, 0.22)";
      ctx.stroke();
      // مقدار (همان رشتهٔ فارسی‌فرمت‌شدهٔ ResultScreen — بدون تبدیل)
      ctx.textAlign = "center";
      ctx.fillStyle = "#134e4a";
      fitFont(ctx, stats[i].value, 58, chipW - 36);
      ctx.fillText(stats[i].value, x + chipW / 2, y + 95);
      // برچسب
      ctx.fillStyle = "#64748b";
      fitFont(ctx, stats[i].label, 30, chipW - 36, "600");
      ctx.fillText(stats[i].label, x + chipW / 2, y + 143);
    }
  }

  // ─── امضای پایین کارت ───
  ctx.textAlign = "center";
  setFont(ctx, 36, "600");
  ctx.fillStyle = "#0d9488";
  ctx.fillText("کتابخانه ویژن — بازی‌های زبان انگلیسی", W / 2, H - 122);
  setFont(ctx, 30, "600");
  ctx.fillStyle = "rgba(5, 150, 105, 0.92)";
  ctx.fillText("ویژن‌وان 🦉", W / 2, H - 64);
}

/**
 * ساخت بلاک PNG کارت نتیجه (1080×1350).
 * فقط در مرورگر و از مسیر کنش کاربر صدا زده می‌شود؛ خطا را پرتاب می‌کند تا
 * caller تصمیم بگیرد (توست خطا و…).
 */
export async function buildResultCard(opts: ResultCardOptions): Promise<Blob> {
  if (typeof document === "undefined") {
    throw new Error("buildResultCard only runs in the browser");
  }

  // تضمین فونت Vazirmatn پیش از ترسیم (نبود → فالبک sans-serif)
  try {
    await document.fonts.load("bold 88px Vazirmatn");
    await document.fonts.load("bold 46px Vazirmatn");
    await document.fonts.load("600 36px Vazirmatn");
  } catch {
    /* فونت نبود — با fallback می‌کشیم */
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  drawResultCard(canvas, opts);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("canvas.toBlob returned null"));
    }, "image/png");
  });
}

/**
 * اشتراک‌گذاری کارت نتیجه — Web Share API با فایل، فالبک دانلود.
 *
 * - هرگز بدون کنش کاربر چیزی ذخیره نمی‌کند (فقط از onClick صدا زده شود).
 * - لغو دیالوگ اشتراک توسط کاربر = «cancelled» و هیچ خطایی پرتاب نمی‌شود.
 * - مرورگر بدون پشتیبانی اشتراک فایل → دانلود با a.download («saved»).
 */
export async function shareOrDownloadResultCard(opts: ResultCardOptions): Promise<ResultShareOutcome> {
  let blob: Blob;
  try {
    blob = await buildResultCard(opts);
  } catch {
    return "failed";
  }

  const file = new File([blob], RESULT_CARD_FILENAME, { type: "image/png" });
  const files = [file];
  if (typeof navigator !== "undefined" && navigator.canShare?.({ files })) {
    try {
      await navigator.share({
        files,
        title: `نتیجهٔ ${opts.gameName} — ویژن‌وان`,
        text: `نتیجهٔ من توی «${opts.gameName}» — ویژن‌وان 🎮⭐`,
      });
      return "shared";
    } catch {
      return "cancelled"; // لغو کاربر باید بی‌صدا رد شود
    }
  }

  // فالبک: دانلود مستقیم (کنش کاربر همین کلیک است)
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = RESULT_CARD_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return "saved";
}
