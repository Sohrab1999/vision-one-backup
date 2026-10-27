"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useClassSession,
  type ClassAssignment,
  type ClassRole,
  type ClassState,
  type LiveInfo,
} from "./class-store";
import type { OpenAssignmentInput } from "./next-action";

/**
 * اسنپ‌شات تک‌ضربی کلاس (N1-1.b) — سیگنال‌های کلاسی دانش‌آموز برای موتور «قدم بعدی».
 *
 * نقشه راه اجرایی: «نقشه راه ها/نقشه-راه-قدم-بعدی-N1-1.md» (تسک N1-1.b) + تعدیل A7:
 *
 *  - GET تک‌ضربی عین قرارداد `class-store.ts:259-262` — یک‌بار در mount/ظهور نشست
 *    و refresh فقط روی `visibilitychange` (→ visible) و `focus` پنجره.
 *  - ⛔ هیچ polling/interval/subscription جدیدی وجود ندارد — برخلاف
 *    `useClassStatePoll` (۴ ثانیه‌ای) که برای نمای کلاس است؛ home نباید poll بزند.
 *  - گارد `role === "student"`: نشست معلم/مهمان هرگز fetch نمی‌زند و سیگنال
 *    دانش‌آموزی نمی‌دهد (تعدیل A4) — بدون هیچ محدودیتی برای عضویت مهمان
 *    (سازوکار join فعلی `setClassSession` → rerندر خودکار این هوک).
 *  - شکست شبکه ساکت است: نه toast، نه throw، نه state نابودشده — «خطا» با
 *    «نبود فعالیت کلاسی» یکی تلقی نمی‌شود (`status: "error"` + حفظ آخرین داده).
 *  - رخدادهای هم‌زمان (focus + visibilitychange) درخواست تکراری نمی‌زنند و
 *    پاسخ کهنه هرگز روی پاسخ جدید نمی‌نشیند (in-flight dedup + seq + هویت نشست).
 *  - استخراج داده فقط از قرارداد واقعی API؛ هیچ فیلد/وضعیتی حدس زده نمی‌شود:
 *    «آزمون در جریان» = `live != null && live.status !== "finished"`
 *    (عین `student-view.tsx:44`)؛ «تکلیف باز» = `done !== true`
 *    (سرور per-student محاسبه می‌کند — `_lib/state.ts:233`).
 *
 * خروجی عمداً کوچک و هم‌تراز `ActionInputs` در next-action.ts است — منطق
 * اولویت‌بندی و tie-break در موتور خالص می‌ماند و اینجا تکرار نمی‌شود.
 * ⚠️ این هوک در گام N1-1.b به هیچ نمایی متصل نیست (اتصال در N1-1.c).
 */

// ─────────────────────────── توابع خالص مشتق‌سازی (تست‌پذیر) ───────────────────────────

/**
 * آزمون زندهٔ در جریان — عین قرارداد نمای دانش‌آموز (`student-view.tsx:44`).
 * سرور آخرین آزمون کلاس را با هر وضعیتی برمی‌گرداند (`_lib/state.ts:44-46`)؛
 * فقط `finished` پایان را معنا می‌دهد. وضعیت نامشخص = در جریان (سوییچ خوش‌بین،
 * هم‌سو با نمای کلاس) — هیچ وضعیت جدیدی حدس زده نمی‌شود.
 */
export function isLiveInProgress(live: LiveInfo | null | undefined): boolean {
  return live != null && live.status !== "finished";
}

/**
 * گارد دفاعی تکلیف باز: `done !== true` (سرور `done` را per-student می‌سازد،
 * `_lib/state.ts:233`). ردیف بی‌عنوانِ متنی یا غیرشیئی رد می‌شود — دادهٔ معتبر
 * هرگز دست‌کاری نمی‌شود.
 */
export function isOpenAssignment(a: unknown): a is ClassAssignment {
  return (
    !!a &&
    typeof a === "object" &&
    (a as ClassAssignment).done !== true &&
    typeof (a as ClassAssignment).title === "string"
  );
}

/**
 * تکالیف باز → ورودی موتور (`OpenAssignmentInput[]`). فقط سه فیلد لازم موتور
 * حمل می‌شود (title/dueAt/createdAt)؛ `dueAt` نامشخص → null. مرتب‌سازی و
 * انتخاب تکلیف عمداً اینجا نیست — `pickAssignment` موتور مسئول آن است.
 */
export function toOpenAssignmentInputs(assignments: unknown): OpenAssignmentInput[] {
  if (!Array.isArray(assignments)) return [];
  return assignments.filter(isOpenAssignment).map((a) => ({
    title: a.title,
    dueAt: a.dueAt ?? null,
    createdAt: a.createdAt ?? null,
  }));
}

const NO_ASSIGNMENTS: OpenAssignmentInput[] = [];

/** مشتق‌سازی سیگنال‌ها از state — تنها مسیر تولید سیگنال دانش‌آموزی در این ماژول.
 *  نقش غیر student (معلم/مهمان) حتی با state موجود، سیگنال خالی می‌دهد (A4). */
export function deriveSnapshot(
  isStudent: boolean,
  state: ClassState | null,
): { liveActive: boolean; openAssignments: OpenAssignmentInput[] } {
  return {
    liveActive: isStudent ? isLiveInProgress(state?.live) : false,
    openAssignments: isStudent ? toOpenAssignmentInputs(state?.assignments) : NO_ASSIGNMENTS,
  };
}

/** وضعیت آخرین تلاش دریافت — «خطا» از «نبود فعالیت» تفکیک‌پذیر می‌ماند. */
export type ClassSnapshotStatus = "idle" | "loading" | "ok" | "error";

/**
 * اسنپ‌شات کلاس — هم‌تراز `ActionInputs` موتور:
 *  - `classRole`: نقش واقعی نشست (از `useClassSession`) — null = بدون نشست.
 *  - `liveActive`/`openAssignments`: فقط از GET موفق؛ پس از خطا آخرین دادهٔ
 *    سالم حفظ می‌شود (ممکن است کهنه باشد — مصرف‌کننده با `status` داوری می‌کند).
 *  - `status`: idle = بدون نشست دانش‌آموزی (تلاشی نبوده) · loading = در راه ·
 *    ok = آخرین GET موفق · error = آخرین GET شکست.
 */
export interface ClassSnapshot {
  classRole: ClassRole | null;
  liveActive: boolean;
  openAssignments: OpenAssignmentInput[];
  status: ClassSnapshotStatus;
}

export interface ClassSnapshotResult extends ClassSnapshot {
  /** trigger دستی همان GET تک‌ضربی (dedup-شده) — برای مصرف‌کنندهٔ N1-1.c */
  refresh: () => void;
}

// ─────────────────────────── هوک ───────────────────────────

export function useClassSnapshot(): ClassSnapshotResult {
  const session = useClassSession();
  const [state, setState] = useState<ClassState | null>(null);
  const [status, setStatus] = useState<ClassSnapshotStatus>("idle");

  /** آینهٔ آخرین نشست برای callbackهای پایدار (الگوی latest-ref عین class-store) */
  const sessionRef = useRef(session);
  /** پنجرهٔ عمر کامپوننت — پاسخ در راه بعد از unmount هیچ state‌ای را عوض نمی‌کند */
  const aliveRef = useRef(true);
  /** dedup درخواست هم‌زمان + trailing rerun (آخرین trigger برنده است) */
  const inFlightRef = useRef(false);
  const rerunRef = useRef(false);
  /** شمارندهٔ نوبت درخواست — پاسخ نوبت کهنه هرگز اعمال نمی‌شود */
  const seqRef = useRef(0);

  const fetchOnce = useCallback(async () => {
    const s = sessionRef.current;
    if (!s || s.role !== "student" || !aliveRef.current) return;
    if (inFlightRef.current) {
      rerunRef.current = true; // به‌جای درخواست موازی، پس از پایان یکی تازه می‌گیریم
      return;
    }
    inFlightRef.current = true;
    const seq = ++seqRef.current;
    try {
      // عین قرارداد useClassStatePoll (class-store.ts:259-262) — بدون تغییر API
      const res = await fetch(
        `/api/class/${encodeURIComponent(s.code)}?key=${encodeURIComponent(s.key)}&role=${s.role}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as ClassState;
      // پاسخ کهنه: unmount، یا نوبت جدیدتر، یا نشست عوض‌شده → هرگز اعمال نشود
      if (!aliveRef.current || seq !== seqRef.current || sessionRef.current !== s) return;
      setState(data);
      setStatus("ok");
    } catch {
      // همان گاردهای مسیر موفقیت — خطای نوبت قدیم/نشست عوض‌شده هرگز وضعیت رژیم
      // جدید را لکه‌دار نمی‌کند (تعویض نشست الزاماً seq جدید نمی‌سازد؛ گارد seq
      // به‌تنهایی کافی نیست — trailing rerun یا شاخهٔ بی-fetch).
      if (!aliveRef.current || seq !== seqRef.current || sessionRef.current !== s) return;
      // شکست ساکت — دادهٔ قبلی حفظ می‌شود؛ خطا ≠ نبود فعالیت کلاسی
      setStatus("error");
    } finally {
      inFlightRef.current = false;
      if (rerunRef.current && aliveRef.current) {
        rerunRef.current = false;
        void fetchOnce();
      }
    }
  }, []);

  const refresh = useCallback(() => {
    void fetchOnce();
  }, [fetchOnce]);

  useEffect(() => {
    aliveRef.current = true; // StrictMode double-mount: پنجرهٔ عمر دوباره باز می‌شود
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    sessionRef.current = session;
    if (!session || session.role !== "student") {
      // معلم/مهمان: بدون fetch و بدون سیگنال دانش‌آموزی (A4) — عضویت مهمان
      // دست‌نخورده می‌ماند؛ join آینده → نشست جدید → این effect خودش fetch می‌زند.
      setState(null);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    void fetchOnce();

    // refresh بازگشت به صفحه — عین سازوکار مجاز نقشه راه (A7)، بدون poll
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchOnce();
    };
    const onFocus = () => void fetchOnce();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
    };
  }, [session, fetchOnce]);

  const isStudent = session?.role === "student";
  const derived = useMemo(() => deriveSnapshot(isStudent, state), [isStudent, state]);

  return {
    classRole: session?.role ?? null,
    liveActive: derived.liveActive,
    openAssignments: derived.openAssignments,
    status,
    refresh,
  };
}
