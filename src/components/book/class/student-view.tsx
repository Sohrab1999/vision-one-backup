"use client";

/**
 * نمای دانش‌آموز (فاز ۹ — کلاس مجازی):
 *  • سرصفحه با نام کلاس + معلم + کد + «ترک کلاس» (خروج محلی)
 *  • Polling وضعیت هر ۴ثانیه
 *  • کارت اعلان‌ها (خوانده‌نشده با نقطهٔ کهربایی)
 *  • کارت تکالیف (انجام دادم ✅ → زنجیرهٔ گیمیفیکیشن)
 *  • کارت آزمون زنده (ورود چشمک‌زن → پلیر)
 */

import { useState } from "react";
import { Bell, CheckCircle2, ClipboardList, Loader2, LogOut, Radio, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { notifyActivity } from "@/lib/gamification";
import {
  faNum,
  fmtClock,
  fmtJalaliDate,
  readApiError,
  setClassSession,
  useClassSession,
  useClassStatePoll,
  type ClassState,
} from "@/lib/class-store";
import { LivePlayer } from "./live-player";

export function StudentView() {
  const session = useClassSession();
  const { state, lastSync, liveEnded, refresh } = useClassStatePoll();
  const [playerOpen, setPlayerOpen] = useState(false);

  if (!session) return null;

  if (playerOpen) {
    return <LivePlayer onExit={() => setPlayerOpen(false)} />;
  }

  const liveActive = state?.live != null && state.live.status !== "finished";
  const liveFinished = liveEnded || state?.live?.status === "finished";

  return (
    <div className="space-y-4" aria-label="نمای دانش‌آموز">
      {/* سرصفحه */}
      <div className="rise-in flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
        <div className="min-w-0 space-y-0.5">
          <h1 className="truncate text-lg font-black">{state?.classroom.name ?? "کلاس"}</h1>
          <p className="text-[11.5px] text-muted-foreground">
            معلم: {state?.classroom.teacherName ?? "—"}
            {lastSync !== null && (
              <>
                <span aria-hidden> · </span>
                <span>به‌روزرسانی: {fmtClock(lastSync)}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            dir="ltr"
            className="font-en border-primary/40 bg-primary/5 px-3 py-1 text-base font-black tracking-[0.25em] text-primary"
          >
            {session.code}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setClassSession(null);
              toast.success("از کلاس خارج شدی");
            }}
            className="min-h-11 gap-1.5 px-3 text-[12px] font-bold text-muted-foreground"
            aria-label="ترک کلاس"
          >
            <LogOut size={15} aria-hidden />
            ترک کلاس
          </Button>
        </div>
      </div>

      {/* اعلان‌ها */}
      <NotificationsCard state={state} session={session} refresh={refresh} />

      {/* تکالیف */}
      <StudentAssignmentsCard state={state} session={session} refresh={refresh} />

      {/* آزمون زنده */}
      <Card
        className={cn(
          "rise-in",
          liveActive && "border-primary/40 bg-gradient-to-bl from-primary/8 to-transparent",
        )}
      >
        <CardContent className="space-y-3 p-4">
          <h2 className="flex items-center gap-1.5 text-sm font-black">
            <Trophy size={16} className="text-amber-500" aria-hidden />
            آزمون زنده
          </h2>

          {liveActive ? (
            <div className="space-y-2.5">
              <p className="text-[13px] font-bold text-foreground/90">
                🔴 آزمون زنده شروع شده — سریع باش!
              </p>
              <Button
                onClick={() => setPlayerOpen(true)}
                className="daily-pulse min-h-12 w-full gap-2 text-[15px] font-black"
              >
                <Radio size={17} aria-hidden />
                ورود به آزمون زنده 🔴
              </Button>
            </div>
          ) : liveFinished ? (
            <p className="rounded-xl bg-muted/50 p-3 text-center text-[12.5px] text-muted-foreground">
              🏁 آزمون زنده تمام شد — نتیجه در جدول برنده‌های کلاس
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 p-3 text-center text-[12.5px] text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-muted-foreground/60" />
              </span>
              آزمون زنده‌ای در جریان نیست (منتظر معلم بمان…)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────── اعلان‌ها ───────────────────────────

function NotificationsCard({
  state,
  session,
  refresh,
}: {
  state: ClassState | null;
  session: NonNullable<ReturnType<typeof useClassSession>>;
  refresh: () => void;
}) {
  const [marking, setMarking] = useState(false);
  const notifications = state?.notifications ?? [];
  const unread = state?.unreadCount ?? 0;

  async function markAll() {
    setMarking(true);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/notifications`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: session.key }),
      });
      if (res.ok) {
        refresh();
      } else {
        toast.error(await readApiError(res, "علامت‌زدن ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setMarking(false);
    }
  }

  return (
    <Card className="rise-in rise-in-1">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="relative flex items-center gap-1.5 text-sm font-black">
            <Bell size={16} className="text-primary" aria-hidden />
            اعلان‌ها
            {unread > 0 && (
              <Badge className="h-5 min-w-5 rounded-full bg-amber-500 px-1.5 text-[10.5px] font-black text-white">
                {faNum(unread)}
              </Badge>
            )}
          </h2>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              disabled={marking}
              onClick={() => void markAll()}
              className="min-h-9 gap-1 px-2 text-[12px] font-bold text-primary"
            >
              {marking ? <Loader2 size={13} className="animate-spin" aria-hidden /> : <CheckCircle2 size={13} aria-hidden />}
              خواندم
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
            فعلاً اعلانی نیست 🕊️
          </p>
        ) : (
          <ul className="max-h-96 space-y-2 overflow-y-auto pe-1" aria-label="فهرست اعلان‌ها">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={cn(
                  "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[13px] leading-relaxed",
                  !n.read && "border-amber-500/25 bg-accent/25",
                  n.read && "bg-muted/20 text-foreground/75",
                )}
              >
                {!n.read && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden />
                )}
                <span className="min-w-0 flex-1">{n.text}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── تکالیف ───────────────────────────

function StudentAssignmentsCard({
  state,
  session,
  refresh,
}: {
  state: ClassState | null;
  session: NonNullable<ReturnType<typeof useClassSession>>;
  refresh: () => void;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const assignments = state?.assignments ?? [];

  async function done(a: { id: string; title: string }) {
    setBusyId(a.id);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(session.code)}/assignments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentKey: session.key, assignmentId: a.id }),
      });
      if (res.ok) {
        toast.success("+ ثبت شد ✅");
        notifyActivity();
        refresh();
      } else {
        toast.error(await readApiError(res, "ثبت تکلیف ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Card className="rise-in rise-in-2">
      <CardContent className="space-y-3 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-black">
          <ClipboardList size={16} className="text-primary" aria-hidden />
          تکالیف کلاس
        </h2>

        {assignments.length === 0 ? (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
            هنوز تکلیفی نداری — تا معلم تکلیف بدهد اینجا می‌بینیش 📋
          </p>
        ) : (
          <ul className="max-h-96 space-y-2 overflow-y-auto pe-1" aria-label="فهرست تکالیف">
            {assignments.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-xl border bg-card px-3 py-2.5"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="truncate text-[13px] font-bold">{a.title}</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    {a.kind === "quiz" ? `آزمون${a.questionCount ? ` — ${faNum(a.questionCount)} سؤال` : ""}` : `مرور واژگان${a.lesson != null ? ` — درس ${faNum(a.lesson)}` : ""}`}
                    {a.dueAt && (
                      <>
                        <span aria-hidden> · </span>
                        <span>مهلت: {fmtJalaliDate(a.dueAt)}</span>
                      </>
                    )}
                  </p>
                </div>
                {a.done ? (
                  <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" variant="secondary">
                    <CheckCircle2 size={12} className="me-1" aria-hidden />
                    انجام شد
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    disabled={busyId === a.id}
                    onClick={() => void done(a)}
                    className="min-h-9 gap-1 px-3 text-[12px] font-bold"
                  >
                    {busyId === a.id ? (
                      <Loader2 size={13} className="animate-spin" aria-hidden />
                    ) : (
                      <span aria-hidden>✅</span>
                    )}
                    انجام دادم
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
