"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

/**
 * کلاس مجازی (فاز ۹) — ذخیره‌گاه سمت کلاینت:
 *
 * ۱) شناسهٔ دستگاه (کلید دانش‌آموزی) — visionone:class-key
 * ۲) نشست کلاس فعال (بین بازدیدها) — visionone:class-session
 *
 * ⚠️ این استور cross-book است — عمداً از readScoped/writeScoped
 * (که per-book هستند) استفاده نشده؛ localStorage خام با try/catch.
 */

// ─────────────────────────── انواع قرارداد API ───────────────────────────

export type ClassRole = "teacher" | "student";

export interface ClassroomInfo {
  code: string;
  name: string;
  teacherName: string;
  book?: string | null;
  createdAt: string;
}

export interface ClassMember {
  studentKey: string;
  displayName: string;
  joinedAt: string;
  lastActiveAt: string;
  attempts7d: number;
  avgScore7d: number;
  assignmentsDone: number;
}

export interface ClassAssignment {
  id: string;
  title: string;
  kind: "review" | "quiz";
  lesson?: number | null;
  questionCount?: number | null;
  dueAt?: string | null;
  createdAt: string;
  doneCount: number;
  done: boolean;
}

export interface ClassNotification {
  id: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface ClassProblem {
  liveWrong: { content: string; count: number }[];
  weekSummary: { attempts: number; avgPercent: number; activeMembers: number };
}

export interface LiveInfo {
  id: string;
  status: string;
  currentIndex: number;
  questionCount: number;
}

/** Shape مشترک GET /api/class/[code] و POST /api/class/join */
export interface ClassState {
  classroom: ClassroomInfo;
  role: ClassRole;
  members?: ClassMember[];
  assignments: ClassAssignment[];
  notifications: ClassNotification[];
  unreadCount: number;
  problem?: ClassProblem;
  live?: LiveInfo | null;
}

export interface LiveQuestion {
  text: string;
  options: string[];
}

export interface LiveAnswered {
  index: number;
  choice: number;
  correct: boolean;
}

/** پاسخ GET /api/class/[code]/live برای دانش‌آموز */
export interface StudentLivePayload {
  live: LiveInfo | null;
  question?: LiveQuestion | null;
  answered?: LiveAnswered | null;
  /** نام نمایشی واقعی عضو (از سرور) — برای ثبت پاسخ و نمایش سربرگ */
  me?: { displayName: string } | null;
}

export interface LiveLeaderRow {
  displayName: string;
  correct: number;
  answered: number;
  totalMs: number;
}

/** پاسخ GET /api/class/[code]/live برای معلم */
export interface TeacherLivePayload {
  live: LiveInfo | null;
  question?: (LiveQuestion & { answer: number }) | null;
  answeredCount: number;
  leaderboard: LiveLeaderRow[];
}

// ─────────────────────────── قالب‌بندی اعداد/زمان ───────────────────────────

/** عدد فارسی — faNum سراسری برای نمای کلاس (null/NaN → «۰») */
export function faNum(v: number | string): string {
  if (typeof v === "number") return Number.isFinite(v) ? v.toLocaleString("fa-IR") : "۰";
  return v;
}

/** ساعت جاری با ارقام فارسی (برای «آخرین به‌روزرسانی») */
export function fmtClock(ts: number): string {
  return new Date(ts).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/** تاریخ شمسی ساده برای مهلت تکلیف */
export function fmtJalaliDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fa-IR");
  } catch {
    return "";
  }
}

/** استخراج پیام خطای فارسی سرور (defensive) */
export async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string; message?: string };
    return j.error || j.message || fallback;
  } catch {
    return fallback;
  }
}

// ─────────────────────────── شناسهٔ دستگاه ───────────────────────────

const DEVICE_KEY = "visionone:class-key";

/** کلید دستگاه برای پیوستن به کلاس (فقط client — سینک) */
export function getClassKey(): string {
  try {
    let k = localStorage.getItem(DEVICE_KEY);
    if (!k) {
      k =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DEVICE_KEY, k);
    }
    return k;
  } catch {
    return `tmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

// ─────────────────────────── نشست کلاس (external store) ───────────────────────────

export interface ClassSession {
  code: string;
  role: ClassRole;
  key: string;
  name?: string;
}

const SESSION_KEY = "visionone:class-session";
const listeners = new Set<() => void>();
let sessionCache: ClassSession | null | undefined; // undefined = هنوز خوانده نشده

function readSession(): ClassSession | null {
  if (sessionCache !== undefined) return sessionCache;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      sessionCache = null;
      return sessionCache;
    }
    const parsed = JSON.parse(raw) as ClassSession;
    sessionCache =
      parsed &&
      typeof parsed.code === "string" &&
      typeof parsed.key === "string" &&
      (parsed.role === "teacher" || parsed.role === "student")
        ? parsed
        : null;
  } catch {
    sessionCache = null;
  }
  return sessionCache;
}

function subscribeSession(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function setClassSession(session: ClassSession | null) {
  sessionCache = session;
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

export function useClassSession(): ClassSession | null {
  return useSyncExternalStore(subscribeSession, () => readSession(), () => null);
}

/** تبدیل ارقام فارسی/عربی به انگلیسی — برای ورودی کد ۶رقمی */
export function toEnDigits(v: string): string {
  return v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

// ─────────────────────────── هوک polling وضعیت کلاس ───────────────────────────

/**
 * Polling وضعیت کلاس هر ۴ ثانیه (GET /api/class/[code]) — بدون هیچ setState
 * در بدنهٔ effect (همهٔ به‌روزرسانی‌ها داخل callback تایمر/async رخ می‌دهند —
 * سازگار با react-hooks v6). خطای شبکه ساکت است؛ فقط پس از ۳ شکست متوالی
 * یک toast نشان داده می‌شود.
 */
export function useClassStatePoll(intervalMs = 4000) {
  const session = useClassSession();
  const [state, setState] = useState<ClassState | null>(null);
  const [lastSync, setLastSync] = useState<number | null>(null);
  /** آزمون زنده همین حالا تمام شده (live از فعال به null رفته) */
  const [liveEnded, setLiveEnded] = useState(false);
  const sessionRef = useRef<ClassSession | null>(session);
  const failsRef = useRef(0);
  const aliveRef = useRef(true);
  const sawLiveRef = useRef(false);

  const fetchOnce = useCallback(async () => {
    const s = sessionRef.current;
    if (!s || !aliveRef.current) return;
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(s.code)}?key=${encodeURIComponent(s.key)}&role=${s.role}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as ClassState;
      if (!aliveRef.current) return;
      failsRef.current = 0;
      // ردیابی پایان آزمون زنده — سرور پس از finish، live را null می‌کند
      if (data.live) {
        sawLiveRef.current = true;
        setLiveEnded(false);
      } else if (sawLiveRef.current) {
        setLiveEnded(true);
      }
      setState(data);
      setLastSync(Date.now());
    } catch {
      if (!aliveRef.current) return;
      failsRef.current += 1;
      if (failsRef.current === 3) {
        toast.error("ارتباط با کلاس برقرار نشد — در تلاش برای وصل شدن دوباره…");
      }
    }
  }, []);

  // آینهٔ تازه از fetchOnce برای تایمر (الگوی latest-ref)
  const fetchRef = useRef(fetchOnce);
  useEffect(() => {
    fetchRef.current = fetchOnce;
  }, [fetchOnce]);

  // پایان عمر: درخواست‌های در راه بعد از unmount دیگر state را عوض نکنند
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    sessionRef.current = session;
    if (!session) return;
    const t0 = window.setTimeout(() => void fetchRef.current(), 0);
    const t = window.setInterval(() => void fetchRef.current(), intervalMs);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, [session, intervalMs]);

  return { state, lastSync, liveEnded, refresh: fetchOnce };
}
