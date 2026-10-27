/**
 * موتور «قدم بعدی» (N1-1) — هستهٔ خالص تصمیم.
 * نقشه راه اجرایی: «نقشه راه ها/نقشه-راه-قدم-بعدی-N1-1.md» (تسک N1-1.a)
 *
 * قراردادهای خالصی:
 *  - هیچ I/O ندارند: نه شبکه، نه storage، نه React، نه Date.now()/Math.random.
 *  - زمان فقط از ورودی `now` (epoch ms) می‌آید تا نتیجه تکرارپذیر بماند.
 *  - ورودی‌های نامعتبر (NaN، منفی، آرایهٔ null، رشتهٔ تاریخ خراب) به‌شکل ایمن به
 *    «نبودِ سیگنال» تبدیل می‌شوند؛ دادهٔ معتبر هرگز دست‌کاری نمی‌شود.
 *
 * ترتیب اولویت (اولین شرط معتبر = اقدام واحد خروجی؛ هرگز بیش از یک اقدام):
 *  ۰. خوش‌آمد (کاربر تازه: learned=0 ∧ مجموع کارت‌های SRS=0 [پرچم freshUser] ∧
 *     خطا=0 [mistakeCount] ∧ بدون «نشست کلاسی فعال» دانش‌آموزی — نقش student
 *     به‌تنهایی مانع نیست؛ فقط آزمون زنده یا تکلیف باز خوش‌آمد را سرکوب می‌کند)
 *     → quiz
 *  ۱. قلمرو کلاس — فقط نقش student: آزمون زندهٔ در جریان → تکلیف باز → class
 *  ۲. کارت‌های سررسید SRS (dueCount>0) → review
 *  ۳. ماندهٔ هدف روزانه (goalRemaining>0) → flashcards
 *  ۴. دفتر خطاها (mistakeCount>0) → notebook
 *  ۵. مأموریت: اول claimable (done ∧ ¬claimed) سپس اولین ناتمام به‌ترتیب آرایه → rewards
 *  ۶. چالش روزانهٔ امروز، وگرنه چالش هفتگی → quiz
 *  ۷. بن‌بست: ادامهٔ مطالعه → contents
 *
 * تعدیل‌های مستندشدهٔ نقشه راه (A1-A8) که اینجا اعمال شده‌اند:
 *  - A3/A8: CTA خوش‌آمد = چالش روزانه (تعیین‌سطح هنوز ساخته نشده — N1-4).
 *  - A4: نقش teacher هرگز سیگنال کلاسی دانش‌آموز را فعال نمی‌کند.
 *  - A5: تکلیف با مهلت گذشته همچنان پیشنهاد می‌شود؛ `overdue` فقط داده برای
 *    برچسب UI است (برچسب‌گذاری در گام N1-1.c/d).
 *  - A6: شمارش سررسید باید با فرمول نمای مرور (`reps > 0 && dueAt <= now`,
 *    review-view.tsx:294-302) هم‌خوان بماند — `countDueSrsCards` همان فرمول را
 *    به‌شکل خالص پیاده می‌کند تا فراخوانندهٔ گام N1-1.b/c عدد `dueCount` را با آن
 *    بسازد و عدد کارت با داشبورد «مرور امروز» هرگز نخواند.
 *
 * تقدم درونی (tie-break دترمینیستیک):
 *  - تکالیف: نزدیک‌ترین `dueAt` (null آخر) → در تساوی `createdAt` جدیدتر → در
 *    تساوی/نامعلوم، ترتیب ورودی حفظ می‌شود (Array.sort پایدار است).
 *  - مأموریت‌ها: «ترتیب موجود آرایهٔ ورودی» محفوظ است؛ مرتب‌سازی بر پایهٔ
 *    QUEST_POOL (اگر لازم شد) مسئولیت فراخواننده است.
 *
 * ⚠️ این ماژول در گام N1-1.a به هیچ نمایی متصل نیست — اتصال به home در N1-1.c.
 */

import type { ViewId } from "@/components/book/app-header";
import type { ClassRole } from "./class-store";

// ─────────────────────────── انواع خروجی ───────────────────────────

/**
 * مقصدهای مجاز اقدام — زیرمجموعهٔ ViewId (تک‌منبع حقیقت: app-header.tsx).
 * عمداً از `requestView()` استفاده نمی‌شود چون NavView فاقد "rewards" است؛
 * فراخواننده (N1-1.c) باید `onNavigate(action.target)` را صدا بزند.
 */
export type NextActionTarget = Extract<
  ViewId,
  "class" | "review" | "flashcards" | "notebook" | "rewards" | "quiz" | "contents"
>;

/** گارد تایپ‌زمان: اگر ViewId روزی یکی از این مقصدها را از دست بدهد، tsc می‌شکند. */
export const NEXT_ACTION_TARGETS: readonly NextActionTarget[] = [
  "class",
  "review",
  "flashcards",
  "notebook",
  "rewards",
  "quiz",
  "contents",
];

/** شناسهٔ اقدام — مبنای switch رابط کاربری در N1-1.c */
export type NextActionId =
  | "welcome"
  | "live-quiz"
  | "assignment"
  | "srs-due"
  | "daily-goal"
  | "mistakes"
  | "mission"
  | "daily-challenge"
  | "weekly-challenge"
  | "continue";

/**
 * اقدام واحد انتخاب‌شده. هر عضو `target` ثابت و معتبر دارد (عضو
 * NEXT_ACTION_TARGETS) و payload فقط دادهٔ لازم برای برچسب UI را حمل می‌کند.
 */
export type NextAction =
  | { id: "welcome"; target: "quiz" }
  | { id: "live-quiz"; target: "class" }
  | { id: "assignment"; target: "class"; title: string; dueAt: string | null; overdue: boolean }
  | { id: "srs-due"; target: "review"; count: number }
  | { id: "daily-goal"; target: "flashcards"; remaining: number }
  | { id: "mistakes"; target: "notebook"; count: number }
  | { id: "mission"; target: "rewards"; title: string; claimable: boolean }
  | { id: "daily-challenge"; target: "quiz" }
  | { id: "weekly-challenge"; target: "quiz" }
  | { id: "continue"; target: "contents" };

// ─────────────────────────── انواع ورودی ───────────────────────────

/** تصویر حداقلی از تکلیف باز کلاس (ClassAssignment بدون فیلدهای بی‌نیاز) */
export interface OpenAssignmentInput {
  /** عنوان تکلیف — عیناً برای نمایش (ممکن است فارسی یا انگلیسی باشد) */
  title: string;
  /** ISO timestamp یا null/undefined — همان ClassAssignment.dueAt */
  dueAt?: string | null;
  /** ISO timestamp اختیاری — فقط برای tie-break (جدیدتر مقدم) */
  createdAt?: string | null;
}

/** تصویر حداقلی از مأموریت روزانه (Mission + QuestDef.title) — ترتیب آرایه محفوظ */
export interface MissionInput {
  title: string;
  done?: boolean;
  claimed?: boolean;
}

/**
 * ورودی‌های تصمیم. قراردادهای مهم:
 *  - `freshUser` را فراخواننده محاسبه می‌کند: learned===0 ∧ مجموع کارت‌های SRS===0.
 *    شمارش خطا و «نشست کلاسی فعال» (آزمون زنده یا تکلیف باز) داخل تابع مستقلاً هم
 *    چک می‌شود (تعدیل A8) — نقش student به‌تنهایی خوش‌آمد را سرکوب نمی‌کند.
 *  - `dueCount` را فراخواننده با `countDueSrsCards(items, now)` (فرمول A6) می‌سازد.
 *  - `now`: epoch ms — تنها منبع زمان؛ تابع هرگز Date.now نمی‌زند.
 *  - `classRole`: null = بدون نشست کلاس؛ "teacher" هرگز سیگنال کلاسی فعال نمی‌کند.
 */
export interface ActionInputs {
  freshUser: boolean;
  classRole: ClassRole | null;
  liveActive: boolean;
  openAssignments: OpenAssignmentInput[];
  dueCount: number;
  goalRemaining: number;
  mistakeCount: number;
  missions: MissionInput[];
  dailyDoneToday: boolean;
  weeklyDoneThisWeek: boolean;
  now: number;
}

// ─────────────────────────── پالایش ورودی (sanitize) ───────────────────────────

/** عدد شمارندهٔ امن: نامتناهی/NaN/منفی → 0 (نبود سیگنال)؛ مقدار معتبر دست‌نخورده. */
function toCount(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** بولین سخت‌گیرانه: فقط true واقعی. هر چیز دیگر (شامل undefined/null) = false —
 *  جهت امن، یعنی سیگنال کلاسی هرگز با دادهٔ مشکوک روشن نمی‌شود. */
function toBool(v: unknown): boolean {
  return v === true;
}

/** آرایهٔ امن: ورودی غیرآرایه‌ای (null/undefined/…) → []. */
function toList<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/** ISO string → epoch ms؛ رشتهٔ غایب/خالی/خراب → null (تاریخ نامشخص). */
function isoTimeOf(v: unknown): number | null {
  if (typeof v !== "string" || v.length === 0) return null;
  const t = Date.parse(v);
  return Number.isFinite(t) ? t : null;
}

// ─────────────────────────── فرمول سررسید SRS (تعدیل A6) ───────────────────────────

/** ساختار حداقلی سازگار با SrsItem (srs-store) — برای خالص ماندن این ماژول */
export type SrsStateLike = Readonly<{ reps?: unknown; dueAt?: unknown }>;

/**
 * شمارش کارت‌های سررسید — عین فرمول KPI نمای «مرور امروز»
 * (review-view.tsx:294-302): reps > 0 && dueAt <= now.
 * فراخوانندهٔ N1-1.b/c باید `dueCount` را فقط با همین تابع بسازد.
 */
export function countDueSrsCards(
  items: Readonly<Record<string, SrsStateLike>> | null | undefined,
  now: number,
): number {
  if (!items) return 0;
  let due = 0;
  for (const st of Object.values(items)) {
    if (!st || typeof st !== "object") continue;
    const reps = Number(st.reps);
    const dueAt = Number(st.dueAt);
    if (Number.isFinite(reps) && reps > 0 && Number.isFinite(dueAt) && dueAt <= now) due++;
  }
  return due;
}

// ─────────────────────────── انتخاب تکلیف (tie-break) ───────────────────────────

/**
 * انتخاب تکلیف از فهرست باز: نزدیک‌ترین dueAt (null آخر) → createdAt جدیدتر →
 * ترتیب پایدار ورودی. آیتم‌های غیرشیئی رد می‌شوند.
 */
function pickAssignment(list: unknown): OpenAssignmentInput | null {
  const items = toList<OpenAssignmentInput>(list).filter(
    (it): it is OpenAssignmentInput => !!it && typeof it === "object",
  );
  if (items.length === 0) return null;

  const decorated = items.map((it) => ({
    it,
    due: isoTimeOf(it.dueAt),
    created: isoTimeOf(it.createdAt),
  }));

  decorated.sort((a, b) => {
    if (a.due !== b.due) {
      if (a.due === null) return 1; // مهلت نامشخص → آخر
      if (b.due === null) return -1;
      return a.due - b.due; // نزدیک‌ترین مهلت اول
    }
    // due برابر (یا هر دو نامشخص) → تکلیف جدیدتر مقدم (فقط وقتی هر دو تاریخ معتبرند)
    if (a.created !== null && b.created !== null && a.created !== b.created) {
      return b.created - a.created;
    }
    return 0; // sort پایدار → ترتیب ورودی
  });

  return decorated[0]?.it ?? null;
}

// ─────────────────────────── هستهٔ تصمیم ───────────────────────────

/**
 * دقیقاً یک اقدام برمی‌گرداند — اولین شرط معتبر در ترتیب اولویت سند بالا.
 * خالص: بدون I/O و بدون ساعت سیستم؛ همان ورودی → همان خروجی.
 */
export function pickNextAction(inputs: ActionInputs): NextAction {
  const fresh = toBool(inputs.freshUser);
  const role: ClassRole | null =
    inputs.classRole === "student" ? "student" : inputs.classRole === "teacher" ? "teacher" : null;
  const live = toBool(inputs.liveActive);
  const dueCount = toCount(inputs.dueCount);
  const goalRemaining = toCount(inputs.goalRemaining);
  const mistakeCount = toCount(inputs.mistakeCount);
  const dailyDone = toBool(inputs.dailyDoneToday);
  const weeklyDone = toBool(inputs.weeklyDoneThisWeek);
  const now = Number.isFinite(Number(inputs.now)) ? Number(inputs.now) : 0;

  // قلمرو کلاس دانش‌آموز — «نشست فعال» یعنی آزمون زندهٔ در جریان یا تکلیف باز.
  // نقش student به‌تنهایی نشست فعال نیست؛ سرکوب خوش‌آمد فقط با فعالیت واقعی کلاس.
  // (برای نقش‌های دیگر عمداً محاسبه نمی‌شود — A4: معلم هرگز سیگنال کلاسی ندارد.)
  const openAssignment = role === "student" ? pickAssignment(inputs.openAssignments) : null;
  const activeStudentSession = role === "student" && (live || openAssignment !== null);

  // ۰) خوش‌آمد — کاربر واقعاً تازه: صفر خطا و بدون نشست کلاسی فعال دانش‌آموز (A3/A8)
  if (fresh && mistakeCount === 0 && !activeStudentSession) {
    return { id: "welcome", target: "quiz" };
  }

  // ۱) قلمرو کلاس — فقط نقش دانش‌آموز (A4): زنده مقدم بر تکلیف (A1)
  if (role === "student") {
    if (live) {
      return { id: "live-quiz", target: "class" };
    }
    if (openAssignment) {
      const due = isoTimeOf(openAssignment.dueAt);
      return {
        id: "assignment",
        target: "class",
        title: String(openAssignment.title ?? ""),
        dueAt: typeof openAssignment.dueAt === "string" ? openAssignment.dueAt : null,
        overdue: due !== null && due < now, // A5 — فقط داده؛ برچسب با UI
      };
    }
  }

  // ۲) کارت‌های سررسید SRS
  if (dueCount > 0) {
    return { id: "srs-due", target: "review", count: dueCount };
  }

  // ۳) ماندهٔ هدف روزانه
  if (goalRemaining > 0) {
    return { id: "daily-goal", target: "flashcards", remaining: goalRemaining };
  }

  // ۴) دفتر خطاها
  if (mistakeCount > 0) {
    return { id: "mistakes", target: "notebook", count: mistakeCount };
  }

  // ۵) مأموریت — claimable مقدم؛ سپس اولین ناتمام به‌ترتیب آرایهٔ ورودی
  const missions = toList<MissionInput>(inputs.missions).filter(
    (m): m is MissionInput => !!m && typeof m === "object",
  );
  const claimable = missions.find((m) => m.done === true && m.claimed !== true);
  if (claimable) {
    return { id: "mission", target: "rewards", title: String(claimable.title ?? ""), claimable: true };
  }
  const incomplete = missions.find((m) => m.done !== true);
  if (incomplete) {
    return { id: "mission", target: "rewards", title: String(incomplete.title ?? ""), claimable: false };
  }

  // ۶) چالش‌ها — روزانه مقدم بر هفتگی
  if (!dailyDone) {
    return { id: "daily-challenge", target: "quiz" };
  }
  if (!weeklyDone) {
    return { id: "weekly-challenge", target: "quiz" };
  }

  // ۷) بن‌بست — ادامهٔ مطالعه (رفتار CTA فعلی بنر قهرمان home)
  return { id: "continue", target: "contents" };
}
