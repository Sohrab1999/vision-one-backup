"use client";

/**
 * کلاس مجازی (فاز ۹) — نمای «کلاس»:
 *  • لندینگ دو-نقشی (معلم / دانش‌آموز) با فرم‌های inline
 *  • داشبورد معلم (کد ۶رقمی، اعضا، تکلیف، اعلان، آزمون زنده)
 *  • نمای دانش‌آموز (تکالیف، اعلان‌ها، ورود به آزمون زنده)
 *
 * نشست کلاس بین بازدیدها در localStorage نگه داشته می‌شود
 * (visionone:class-session — cross-book، بدون ایمیل، امن برای نوجوان‌ها).
 */

import { useState } from "react";
import { ArrowRight, Backpack, GraduationCap, Loader2, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { readUserName } from "@/lib/name-store";
import { useBook } from "@/lib/book-context";
import {
  getClassKey,
  readApiError,
  setClassSession,
  toEnDigits,
  useClassSession,
} from "@/lib/class-store";
import { TeacherDashboard } from "./class/teacher-dashboard";
import { StudentView } from "./class/student-view";

type RoleChoice = "teacher" | "student" | null;

export function ClassView() {
  const session = useClassSession();

  if (session?.role === "teacher") return <TeacherDashboard />;
  if (session?.role === "student") return <StudentView />;
  return <ClassLanding />;
}

// ─────────────────────────── لندینگ ───────────────────────────

function ClassLanding() {
  const [choice, setChoice] = useState<RoleChoice>(null);

  return (
    <div className="space-y-5">
      <header className="text-center space-y-1.5">
        <h1 className="flex items-center justify-center gap-2 text-xl font-black">
          <School size={20} className="text-primary" aria-hidden />
          کلاس مجازی
        </h1>
        <p className="text-[12.5px] text-muted-foreground">
          معلم کلاس بسازد، دانش‌آموزها با کد ۶رقمی بیایند — بدون ایمیل، امن برای نوجوان‌ها
        </p>
      </header>

      {choice === null ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RoleCard
            title="معلم هستم"
            desc="کلاس بساز، تکلیف بده و آزمون زنده برگزار کن"
            icon={GraduationCap}
            emoji="🧑‍🏫"
            hoverClass="hover:border-primary/50 hover:shadow-primary/10"
            onClick={() => setChoice("teacher")}
            className="rise-in rise-in-1"
          />
          <RoleCard
            title="دانش‌آموز هستم"
            desc="با کد ۶رقمی معلم بیا داخل کلاس"
            icon={Backpack}
            emoji="🎒"
            hoverClass="hover:border-amber-500/50 hover:shadow-amber-500/10"
            onClick={() => setChoice("student")}
            className="rise-in rise-in-2"
          />
        </div>
      ) : (
        <Card className="rise-in mx-auto max-w-md">
          <CardContent className="p-5 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 min-h-9 -mx-2 text-muted-foreground"
              onClick={() => setChoice(null)}
            >
              <ArrowRight size={15} aria-hidden />
              بازگشت
            </Button>
            {choice === "teacher" ? <TeacherForm /> : <StudentForm />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RoleCard({
  title,
  desc,
  icon: Icon,
  emoji,
  hoverClass,
  className,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  emoji: string;
  hoverClass: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group rounded-2xl border bg-card p-6 text-right shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        hoverClass,
        className,
      )}
      aria-label={title}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <Icon size={26} aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="flex items-center gap-2 text-base font-black">
            <span aria-hidden>{emoji}</span>
            {title}
          </p>
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────── فرم معلم ───────────────────────────

function TeacherForm() {
  const { bookId } = useBook();
  const [name, setName] = useState("");
  const [teacherName, setTeacherName] = useState(readUserName());
  const [busy, setBusy] = useState(false);

  async function submit() {
    const n = name.trim();
    const t = teacherName.trim();
    if (n.length < 2 || n.length > 60) {
      toast.error("نام کلاس باید ۲ تا ۶۰ نویسه باشد");
      return;
    }
    if (!t) {
      toast.error("نام معلم را بنویس");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, teacherName: t, book: bookId ?? undefined }),
      });
      if (res.status === 201) {
        const j = (await res.json()) as { code: string; teacherKey: string; name: string };
        setClassSession({ code: j.code, role: "teacher", key: j.teacherKey, name: j.name });
        toast.success(`کلاس ساخته شد! کد: ${j.code}`);
      } else {
        toast.error(await readApiError(res, "ساخت کلاس ممکن نشد — دوباره تلاش کن"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div className="flex items-center gap-2">
        <GraduationCap size={18} className="text-primary" aria-hidden />
        <h2 className="text-base font-black">ساخت کلاس جدید</h2>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="class-name">نام کلاس</Label>
        <Input
          id="class-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً زبان دهم — کلاس ۲۰۱"
          maxLength={60}
          className="min-h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="class-teacher-name">نام معلم</Label>
        <Input
          id="class-teacher-name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="مثلاً خانم احمدی"
          maxLength={40}
          className="min-h-11"
        />
      </div>
      <Button type="submit" disabled={busy} className="w-full min-h-11 gap-2 font-bold">
        {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <School size={16} aria-hidden />}
        {busy ? "در حال ساخت…" : "ساخت کلاس"}
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">
        بعد از ساخت، یک کد ۶رقمی می‌گیری که به بچه‌ها می‌دهی
      </p>
    </form>
  );
}

// ─────────────────────────── فرم دانش‌آموز ───────────────────────────

function StudentForm() {
  const [code, setCode] = useState("");
  const [displayName, setDisplayName] = useState(readUserName());
  const [busy, setBusy] = useState(false);

  async function submit() {
    const c = toEnDigits(code).trim();
    const d = displayName.trim();
    if (c.length !== 6) {
      toast.error("کد کلاس باید ۶ رقم باشد");
      return;
    }
    if (!d) {
      toast.error("نام نمایشی‌ات را بنویس");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/class/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c, studentKey: getClassKey(), displayName: d }),
      });
      if (res.ok) {
        const state = (await res.json()) as { classroom: { code: string; name: string } };
        setClassSession({
          code: state.classroom.code,
          role: "student",
          key: getClassKey(),
          name: d, // نام نمایشی دانش‌آموز — پلیر آزمون زنده با همین نام ثبت می‌کند
        });
        toast.success(`به کلاس «${state.classroom.name}» خوش آمدی! 🎉`);
      } else {
        toast.error(await readApiError(res, "پیوستن به کلاس ممکن نشد — کد را چک کن"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div className="flex items-center gap-2">
        <Backpack size={18} className="text-primary" aria-hidden />
        <h2 className="text-base font-black">پیوستن به کلاس</h2>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="class-code" className="sr-only">
          کد کلاس
        </Label>
        <Input
          id="class-code"
          value={code}
          onChange={(e) => setCode(toEnDigits(e.target.value).replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="off"
          dir="ltr"
          className="font-en h-16 text-center text-3xl font-black tracking-[0.4em]"
          placeholder="000000"
          aria-describedby="class-code-hint"
        />
        <p id="class-code-hint" className="text-center text-[11px] text-muted-foreground">
          کد ۶رقمی را از معلمت بگیر
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="student-name">نام نمایشی</Label>
        <Input
          id="student-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="مثلاً آرش"
          maxLength={40}
          className="min-h-11"
        />
      </div>
      <Button type="submit" disabled={busy} className="w-full min-h-11 gap-2 font-bold">
        {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Backpack size={16} aria-hidden />}
        {busy ? "در حال ورود…" : "پیوستن به کلاس"}
      </Button>
    </form>
  );
}
