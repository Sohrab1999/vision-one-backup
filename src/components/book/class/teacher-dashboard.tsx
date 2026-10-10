"use client";

/**
 * داشبورد معلم (فاز ۹ — کلاس مجازی):
 *  • نوار بالایی با کد ۶رقمی بزرگ + کپی + خروج دوکلیکی
 *  • Polling وضعیت کلاس هر ۴ثانیه (useClassStatePoll)
 *  • کارت اعضا / واژه‌های مشکل‌دار و گزارش هفته / تکلیف / اعلان / آزمون زنده
 *
 * هیچ setState در بدنهٔ effect نیست — همهٔ به‌روزرسانی‌ها داخل callback
 * تایمر یا ادامهٔ async آن‌ها رخ می‌دهند (سازگار با react-hooks v6).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  Copy,
  Lightbulb,
  Loader2,
  LogOut,
  Megaphone,
  Plus,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  faNum,
  fmtClock,
  fmtJalaliDate,
  readApiError,
  setClassSession,
  useClassSession,
  useClassStatePoll,
  type ClassAssignment,
  type ClassState,
  type TeacherLivePayload,
} from "@/lib/class-store";

export function TeacherDashboard() {
  const session = useClassSession();
  const { state, lastSync, refresh } = useClassStatePoll();

  if (!session) return null;
  return (
    <div className="space-y-4" aria-label="داشبورد معلم">
      <TeacherTopBar state={state} session={session} lastSync={lastSync} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MembersCard state={state} />
        <ProblemCard state={state} />
      </div>
      <AssignmentsCard state={state} session={session} refresh={refresh} />
      <TeacherLiveCard session={session} state={state} refresh={refresh} />
      <TeacherNotificationsCard session={session} refresh={refresh} />
    </div>
  );
}

// ─────────────────────────── نوار بالایی ───────────────────────────

function TeacherTopBar({
  state,
  session,
  lastSync,
}: {
  state: ClassState | null;
  session: NonNullable<ReturnType<typeof useClassSession>>;
  lastSync: number | null;
}) {
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leaving, setLeaving] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(session.code);
      toast.success("کد کپی شد");
    } catch {
      toast.error("کپی نشد — کد را دستی بردار");
    }
  }

  async function leave() {
    if (!confirmLeave) {
      setConfirmLeave(true);
      window.setTimeout(() => setConfirmLeave(false), 3500);
      return;
    }
    setLeaving(true);
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(session.code)}?key=${encodeURIComponent(session.key)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error();
      setClassSession(null);
      toast.success("کلاس حذف شد");
    } catch {
      toast.error("حذف کلاس ممکن نشد — دوباره تلاش کن");
      setLeaving(false);
      setConfirmLeave(false);
    }
  }

  return (
    <div className="rise-in flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
      <div className="min-w-0 space-y-0.5">
        <h1 className="truncate text-lg font-black">{state?.classroom.name ?? session.name ?? "کلاس من"}</h1>
        <p className="text-[11.5px] text-muted-foreground">
          داشبورد معلم
          {lastSync !== null && (
            <>
              <span aria-hidden> · </span>
              <span>به‌روزرسانی: {fmtClock(lastSync)}</span>
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* کد ۶رقمی بزرگ */}
        <div className="flex items-center gap-1.5 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 px-3 py-1.5">
          <span
            dir="ltr"
            className="font-en text-2xl font-black tracking-[0.3em] text-primary sm:text-3xl"
            aria-label={`کد کلاس ${session.code}`}
          >
            {session.code}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void copyCode()}
            className="min-h-9 gap-1 px-2 text-[12px] font-bold text-primary"
            aria-label="کپی کد کلاس"
          >
            <Copy size={14} aria-hidden />
            کپی کد
          </Button>
        </div>

        {/* خروج دوکلیکی */}
        <Button
          variant="ghost"
          size="sm"
          disabled={leaving}
          onClick={() => void leave()}
          className={cn(
            "min-h-11 gap-1.5 px-3 text-[12px] font-bold",
            confirmLeave
              ? "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-400"
              : "text-muted-foreground hover:bg-muted",
          )}
          aria-label={confirmLeave ? "تأیید حذف کلاس" : "خروج از کلاس"}
        >
          {leaving ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <LogOut size={15} aria-hidden />}
          {confirmLeave ? "مطمئنی؟ (کلیک دوم)" : "خروج از کلاس"}
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────── کارت اعضا ───────────────────────────

function MembersCard({ state }: { state: ClassState | null }) {
  const members = state?.members ?? [];

  return (
    <Card className="rise-in rise-in-1 h-full">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-1.5 text-sm font-black">
            <Users size={16} className="text-primary" aria-hidden />
            اعضای کلاس
          </h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {faNum(members.length)} نفر
          </Badge>
        </div>

        {members.length === 0 ? (
          <p className="rounded-xl bg-muted/50 p-4 text-center text-[12.5px] text-muted-foreground">
            هنوز کسی نیامده — کد را بده به بچه‌ها! 🎒
          </p>
        ) : (
          <ul className="max-h-96 space-y-2 overflow-y-auto pe-1" aria-label="فهرست اعضا">
            {members.map((m) => (
              <li
                key={m.studentKey}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border bg-muted/20 px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{m.displayName}</span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-[10.5px] text-emerald-700 dark:text-emerald-400"
                >
                  آزمون: {faNum(m.attempts7d)}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-teal-500/30 bg-teal-500/10 text-[10.5px] text-teal-700 dark:text-teal-400"
                >
                  میانگین: ٪{faNum(Math.round(m.avgScore7d))}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-amber-500/30 bg-amber-500/10 text-[10.5px] text-amber-700 dark:text-amber-400"
                >
                  تکالیف: {faNum(m.assignmentsDone)}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── واژه‌های مشکل‌دار و گزارش هفته ───────────────────────────

function ProblemCard({ state }: { state: ClassState | null }) {
  const problem = state?.problem;
  const ws = problem?.weekSummary;

  return (
    <Card className="rise-in rise-in-2 h-full">
      <CardContent className="space-y-3 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-black">
          <Lightbulb size={16} className="text-amber-500" aria-hidden />
          واژه‌های مشکل‌دار و گزارش هفته
        </h2>

        {problem && problem.liveWrong.length > 0 ? (
          <div className="flex flex-wrap gap-1.5" aria-label="واژه‌های مشکل‌دار">
            {problem.liveWrong.map((w) => (
              <Badge
                key={w.content}
                variant="outline"
                className="max-w-full border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[12px] text-amber-700 dark:text-amber-400"
              >
                <span dir="ltr" className="font-en max-w-[190px] truncate font-bold sm:max-w-[260px]">
                  {w.content}
                </span>
                <span aria-hidden> · </span>
                <span className="shrink-0">{faNum(w.count)} بار</span>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
            هنوز خطای مشخصی ثبت نشده ✨
          </p>
        )}

        {ws && (
          <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 px-3 py-2.5 text-[12.5px] leading-relaxed text-foreground/90">
            آزمون‌های ۷روز اخیر: <b>{faNum(ws.attempts)}</b>
            <span aria-hidden> · </span>
            میانگین کلاس: <b>٪{faNum(Math.round(ws.avgPercent))}</b>
            <span aria-hidden> · </span>
            اعضای فعال: <b>{faNum(ws.activeMembers)}</b>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── کارت تکلیف ───────────────────────────

type AssignKind = "review" | "quiz";

function AssignmentsCard({
  state,
  session,
  refresh,
}: {
  state: ClassState | null;
  session: NonNullable<ReturnType<typeof useClassSession>>;
  refresh: () => void;
}) {
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<AssignKind>("review");
  const [lesson, setLesson] = useState(1);
  const [questionCount, setQuestionCount] = useState(10);
  const [busy, setBusy] = useState(false);

  const assignments = state?.assignments ?? [];
  const memberCount = state?.members?.length ?? 0;

  async function submit() {
    const t = title.trim();
    if (t.length < 2) {
      toast.error("عنوان تکلیف را بنویس");
      return;
    }
    const qc = Math.min(50, Math.max(5, Math.round(questionCount) || 10));
    const les = Math.min(12, Math.max(0, Math.round(lesson) || 0));
    setBusy(true);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherKey: session.key,
          title: t,
          kind,
          lesson: kind === "review" ? les : undefined,
          questionCount: kind === "quiz" ? qc : undefined,
        }),
      });
      if (res.status === 201) {
        toast.success("تکلیف اعلام شد 📣");
        setTitle("");
        refresh();
      } else {
        toast.error(await readApiError(res, "اعلام تکلیف ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusy(false);
    }
  }

  async function remind(a: ClassAssignment) {
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherKey: session.key, text: `⏰ تکلیف «${a.title}» را فراموش نکن!` }),
      });
      if (res.status === 201) toast.success("یادآوری ارسال شد ⏰");
      else toast.error(await readApiError(res, "ارسال یادآوری ممکن نشد"));
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    }
  }

  return (
    <Card className="rise-in">
      <CardContent className="space-y-4 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-black">
          <ClipboardList size={16} className="text-primary" aria-hidden />
          تکالیف
        </h2>

        {/* فرم فشرده اعلام تکلیف */}
        <div className="space-y-2.5 rounded-xl border bg-muted/20 p-3">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_auto]">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان تکلیف — مثلاً واژگان درس ۳ را مرور کن"
              maxLength={80}
              className="min-h-11"
              aria-label="عنوان تکلیف"
            />
            <div className="flex gap-1 self-start rounded-xl border bg-card p-1" role="group" aria-label="نوع تکلیف">
              <Button
                type="button"
                variant={kind === "review" ? "secondary" : "ghost"}
                size="sm"
                className="min-h-9"
                onClick={() => setKind("review")}
                aria-pressed={kind === "review"}
              >
                مرور واژگان
              </Button>
              <Button
                type="button"
                variant={kind === "quiz" ? "secondary" : "ghost"}
                size="sm"
                className="min-h-9"
                onClick={() => setKind("quiz")}
                aria-pressed={kind === "quiz"}
              >
                آزمون
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-2.5 sm:grid-cols-[1fr_auto]">
            {kind === "review" ? (
              <div className="space-y-1">
                <Label htmlFor="assign-lesson" className="text-[11.5px] text-muted-foreground">
                  شماره درس (۰ تا ۱۲)
                </Label>
                <Input
                  id="assign-lesson"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={12}
                  value={lesson}
                  onChange={(e) => setLesson(Number(e.target.value))}
                  className="min-h-11"
                  aria-label="شماره درس مرور"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <Label htmlFor="assign-qc" className="text-[11.5px] text-muted-foreground">
                  تعداد سؤال (۵ تا ۵۰)
                </Label>
                <Input
                  id="assign-qc"
                  type="number"
                  inputMode="numeric"
                  min={5}
                  max={50}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="min-h-11"
                  aria-label="تعداد سؤال آزمون"
                />
              </div>
            )}
            <Button type="button" disabled={busy} onClick={() => void submit()} className="min-h-11 gap-1.5 font-bold">
              {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Plus size={15} aria-hidden />}
              اعلام تکلیف
            </Button>
          </div>
        </div>

        {/* فهرست تکالیف */}
        {assignments.length === 0 ? (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
            هنوز تکلیفی ندادی — اولین تکلیف را اعلام کن! 📋
          </p>
        ) : (
          <ul className="max-h-96 space-y-2 overflow-y-auto pe-1" aria-label="فهرست تکالیف">
            {assignments.map((a) => {
              const pct = memberCount > 0 ? Math.round((a.doneCount / memberCount) * 100) : 0;
              return (
                <li key={a.id} className="space-y-2 rounded-xl border bg-card px-3 py-2.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{a.title}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10.5px]",
                        a.kind === "quiz"
                          ? "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-400"
                          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                      )}
                    >
                      {a.kind === "quiz"
                        ? `آزمون ${faNum(a.questionCount ?? 0)} سؤالی`
                        : `مرور${a.lesson != null ? ` — درس ${faNum(a.lesson)}` : ""}`}
                    </Badge>
                    {a.dueAt && (
                      <span className="text-[10.5px] text-muted-foreground" aria-label="مهلت تکلیف">
                        مهلت: {fmtJalaliDate(a.dueAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={pct} className="h-2 flex-1" aria-label={`پیشرفت تکلیف ${a.title}`} />
                    <span className="w-16 shrink-0 text-[11px] tabular-nums text-muted-foreground">
                      {faNum(a.doneCount)}/{faNum(memberCount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="min-h-9 gap-1 px-2 text-[11.5px] font-bold text-amber-700 dark:text-amber-400"
                      onClick={() => void remind(a)}
                      aria-label={`یادآوری تکلیف ${a.title}`}
                    >
                      <Bell size={13} aria-hidden />
                      یادآوری
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── کارت اعلان (معلم) ───────────────────────────

function TeacherNotificationsCard({
  session,
  refresh,
}: {
  session: NonNullable<ReturnType<typeof useClassSession>>;
  refresh: () => void;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    const t = text.trim();
    if (!t) {
      toast.error("متن اعلان را بنویس");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherKey: session.key, text: t }),
      });
      if (res.status === 201) {
        toast.success("اعلان برای همه ارسال شد 📣");
        setText("");
        refresh();
      } else {
        toast.error(await readApiError(res, "ارسال اعلان ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="rise-in">
      <CardContent className="space-y-2.5 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-black">
          <Megaphone size={16} className="text-primary" aria-hidden />
          اعلان به کلاس
        </h2>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="مثلاً فردا آزمون درس ۳ داریم — آماده باشید! 📚"
          rows={2}
          maxLength={300}
          className="min-h-11 resize-none"
          aria-label="متن اعلان"
        />
        <div className="flex justify-end">
          <Button size="sm" disabled={busy} onClick={() => void send()} className="min-h-11 gap-1.5 px-4 font-bold">
            {busy ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <Send size={14} aria-hidden />}
            ارسال به همه
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── کارت آزمون زنده (معلم) ───────────────────────────

const MEDALS = ["🥇", "🥈", "🥉"];

function TeacherLiveCard({
  session,
  state,
  refresh,
}: {
  session: NonNullable<ReturnType<typeof useClassSession>>;
  state: ClassState | null;
  refresh: () => void;
}) {
  const [liveData, setLiveData] = useState<TeacherLivePayload | null>(null);
  const [count, setCount] = useState(5);
  const [starting, setStarting] = useState(false);
  const [patching, setPatching] = useState(false);

  // ── polling دادهٔ زنده هر ۳ ثانیه (بدون setState در بدنهٔ effect) ──
  // نکته: سرور پس از «پایان آزمون»، live را null می‌کند؛ گزارش پایانی فقط در
  // پاسخ PATCH finish است — پس گزارش تمام‌شده را تا «بستن گزارش» نگه می‌داریم.
  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(session.code)}/live?key=${encodeURIComponent(session.key)}&role=teacher`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error();
      const d = (await res.json()) as TeacherLivePayload;
      setLiveData((prev) => (prev?.live?.status === "finished" && !d.live ? prev : d));
    } catch {
      /* ساکت — دور بعد تلاش می‌شود */
    }
  }, [session.code, session.key]);

  const fetchLiveRef = useRef(fetchLive);
  useEffect(() => {
    fetchLiveRef.current = fetchLive;
  }, [fetchLive]);

  useEffect(() => {
    const t0 = window.setTimeout(() => void fetchLiveRef.current(), 0);
    const t = window.setInterval(() => void fetchLiveRef.current(), 3000);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, []);

  const live = liveData?.live ?? null;
  const isActive = live !== null && live.status !== "finished";
  const isFinished = live !== null && live.status === "finished";

  async function start() {
    setStarting(true);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/live`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherKey: session.key, count }),
      });
      if (res.status === 201) {
        toast.success("آزمون زنده شروع شد — بچه‌ها هم‌زمان می‌بینند! 🔴");
        await fetchLiveRef.current();
        refresh();
      } else {
        toast.error(await readApiError(res, "شروع آزمون ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setStarting(false);
    }
  }

  async function patch(action: "next" | "finish") {
    setPatching(true);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/live`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherKey: session.key, action }),
      });
      if (!res.ok) {
        toast.error(await readApiError(res, "انجام نشد — دوباره تلاش کن"));
      } else {
        // پاسخ PATCH همان shape GET معلم است — برای «پایان» همین را گزارش نهایی کن
        const j = (await res.json().catch(() => null)) as TeacherLivePayload | null;
        if (j?.live) setLiveData(j);
        else await fetchLiveRef.current();
      }
      if (action === "finish" && res.ok) {
        refresh();
        toast.success("آزمون زنده تمام شد 🏁");
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setPatching(false);
    }
  }

  const q = liveData?.question ?? null;
  const leaderboard = liveData?.leaderboard ?? [];

  return (
    <Card className="rise-in border-primary/25 bg-gradient-to-bl from-primary/5 to-transparent">
      <CardContent className="space-y-3.5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-1.5 text-sm font-black">
            <Trophy size={16} className="text-amber-500" aria-hidden />
            آزمون زنده
          </h2>
          {isActive && live && (
            <Badge className="bg-primary text-primary-foreground">
              در جریان — سؤال {faNum(live.currentIndex + 1)} از {faNum(live.questionCount)}
            </Badge>
          )}
        </div>

        {/* ── آزمون در جریان ── */}
        {isActive && (
          <div className="space-y-3">
            {q ? (
              <div className="space-y-2 rounded-xl border bg-card p-3.5" aria-label="سؤال جاری آزمون زنده">
                <p dir="ltr" className="font-en text-[15px] font-bold leading-relaxed">
                  {q.text}
                </p>
                <div className="grid gap-1.5">
                  {q.options.map((o, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px]",
                        i === q.answer
                          ? "border-emerald-500/50 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-400"
                          : "bg-muted/30 text-foreground/80",
                      )}
                    >
                      <span dir="ltr" className="font-en text-[11px] text-muted-foreground">
                        {String.fromCharCode(65 + i)})
                      </span>
                      <span dir="ltr" className="font-en">
                        {o}
                      </span>
                      {i === q.answer && <CheckCircle2 size={15} className="ms-auto shrink-0" aria-hidden />}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border bg-card p-3.5 text-[12.5px] text-muted-foreground">
                <Loader2 size={14} className="animate-spin" aria-hidden />
                در حال آماده‌سازی سؤال اول…
              </div>
            )}

            <p className="text-[12px] text-muted-foreground">
              پاسخ‌دهندگان تا این لحظه: <b>{faNum(liveData?.answeredCount ?? 0)}</b> نفر
            </p>

            <LeaderboardRows rows={leaderboard} />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button disabled={patching} onClick={() => void patch("next")} className="min-h-11 gap-1.5 font-bold">
                {patching ? <Loader2 size={15} className="animate-spin" aria-hidden /> : null}
                سؤال بعدی
              </Button>
              <Button
                variant="outline"
                disabled={patching}
                onClick={() => void patch("finish")}
                className="min-h-11 gap-1.5 border-amber-500/40 font-bold text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
              >
                پایان آزمون
              </Button>
            </div>
          </div>
        )}

        {/* ── آزمون تمام‌شده (گزارش نهایی) ── */}
        {isFinished && (
          <div className="space-y-3">
            <p className="text-[13px] font-bold">🏁 آزمون تمام شد — جدول برنده‌های نهایی:</p>
            <LeaderboardRows rows={leaderboard} />
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="min-h-9 text-[12px]"
                onClick={() => setLiveData(null)}
              >
                بستن گزارش
              </Button>
            </div>
          </div>
        )}

        {/* ── شروع آزمون ── */}
        {!live && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="تعداد سؤال آزمون زنده">
              <span className="text-[12px] text-muted-foreground">تعداد سؤال:</span>
              {[3, 5, 10].map((c) => (
                <Button
                  key={c}
                  variant={count === c ? "secondary" : "outline"}
                  size="sm"
                  className="min-h-9 min-w-11 font-black"
                  onClick={() => setCount(c)}
                  aria-pressed={count === c}
                >
                  {faNum(c)}
                </Button>
              ))}
            </div>
            <Button
              disabled={starting || (state?.members?.length ?? 0) === 0}
              onClick={() => void start()}
              className="min-h-12 w-full gap-2 text-[15px] font-black"
            >
              {starting ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <span aria-hidden>🔴</span>}
              شروع آزمون زنده
            </Button>
            <p className="text-center text-[11.5px] text-muted-foreground">
              همه هم‌زمان می‌بینند؛ جدول برنده‌ها لحظه‌ای پر می‌شود
              {(state?.members?.length ?? 0) === 0 && " — اول صبر کن بچه‌ها بیایند 🎒"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/** جدول برنده‌ها — ردیف‌های 🥇🥈🥉 + نام + تعداد درست + زمان */
function LeaderboardRows({ rows }: { rows: TeacherLivePayload["leaderboard"] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
        هنوز کسی پاسخ نداده…
      </p>
    );
  }
  return (
    <ol className="max-h-72 space-y-1.5 overflow-y-auto pe-1" aria-label="جدول برنده‌ها">
      {rows.map((r, i) => (
        <li
          key={`${r.displayName}-${i}`}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3 py-2",
            i === 0 && "border-amber-500/40 bg-amber-500/10",
            i === 1 && "bg-muted/40",
            i === 2 && "border-amber-500/20 bg-amber-500/5",
            i > 2 && "bg-card",
          )}
        >
          <span className="w-7 shrink-0 text-center text-base" aria-hidden>
            {i < 3 ? MEDALS[i] : faNum(i + 1)}
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{r.displayName}</span>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-[10.5px] text-emerald-700 dark:text-emerald-400"
          >
            {faNum(r.correct)} درست
          </Badge>
          <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
            {faNum(Number((r.totalMs / 1000).toFixed(1)))} ثانیه
          </span>
        </li>
      ))}
    </ol>
  );
}
