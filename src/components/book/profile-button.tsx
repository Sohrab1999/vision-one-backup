"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import {
  User,
  Check,
  Upload,
  HardDriveDownload,
  FileDown,
  FileSpreadsheet,
  Star,
  BookOpen,
  Layers,
  LogIn,
  UserPlus,
  LogOut,
  RefreshCw,
  CloudCheck,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserName, setName } from "@/lib/name-store";
import { useLearnedWords } from "@/lib/learned-store";
import { useStarredWords } from "@/lib/star-store";
import { useQuestionStars } from "@/lib/question-star-store";
import { useCombinedRounds } from "@/lib/round-counters";
import { useStreak } from "@/lib/streak-store";
import { useXp, levelInfo } from "@/lib/xp-store";
import {
  collectBackup,
  downloadBackupJson,
  parseBackup,
  restoreBackup,
  toAttemptsCsv,
  toProgressCsv,
  type ServerBackupSection,
} from "@/lib/progress-backup";
import { pushSnapshot, getLastSyncAt, subscribeSync } from "@/lib/account-sync";
import { toast } from "sonner";

const AVATARS = ["🦁", "🐼", "🦊", "🐧", "🐢", "🦉", "🐬", "🌟", "⚡", "🎯", "📚", "🚀"];
const GRADES = ["هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم"];

type Mode = "login" | "register";

export function ProfileButton() {
  const { data: session, status, update } = useSession();
  const user = session?.user;

  const name = useUserName();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(name);
  const fileRef = useRef<HTMLInputElement>(null);
  const { count: learnedCount } = useLearnedWords();
  const { count: starredWordCount } = useStarredWords();
  const { count: starredQCount } = useQuestionStars();
  const combinedRounds = useCombinedRounds();
  const streak = useStreak();
  const xp = useXp();
  const lvl = levelInfo(xp.total);

  // ── فرم حساب ──
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [grade, setGrade] = useState<string>("دهم");
  const [avatar, setAvatar] = useState<string>("🦁");
  const [busy, setBusy] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState<number | null>(null);
  const [syncAt, setSyncAt] = useState<number | null>(getLastSyncAt());

  useEffect(() => subscribeSync(() => setSyncAt(getLastSyncAt())), []);

  // درخواست بازشدن دیالوگ حساب از عمق درخت (مثل کارت ورودِ یادداشت واژه — فاز ۱۰)
  useEffect(() => {
    function onOpenProfile() {
      setOpen(true);
    }
    window.addEventListener("visionone:open-profile", onOpenProfile);
    return () => window.removeEventListener("visionone:open-profile", onOpenProfile);
  }, []);

  // آمار حساب پس از ورود
  useEffect(() => {
    if (status !== "authenticated") {
      setAttemptsCount(null);
      return;
    }
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setAttemptsCount(j?.attempts ?? 0))
      .catch(() => setAttemptsCount(null));
  }, [status, open]);

  function save() {
    setName(value);
    setOpen(false);
  }

  // فاز ۱۰ — خروجی کامل: دادهٔ دستگاه + (با ورود) بخش سرور از /api/export
  async function exportProgress() {
    try {
      const backup = collectBackup();
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/export", { cache: "no-store" });
          if (res.ok) {
            const j = (await res.json()) as { server?: ServerBackupSection };
            if (j?.server) backup.server = j.server;
            downloadBackupJson(backup, "vision-one-backup.json");
            toast.success("خروجی کامل (پیشرفت دستگاه + حسابت) دانلود شد 📤");
            return;
          }
          if (res.status === 401) {
            toast.info("برای خروجی کامل وارد شو — این فایل فقط پیشرفت همین دستگاه است");
          } else {
            toast.error("دریافت بخش حساب ممکن نشد — فایل محلی دانلود شد");
          }
        } catch {
          toast.error("اتصال ممکن نشد — فایل محلی دانلود شد");
        }
      } else {
        toast.info("برای خروجی کامل وارد شو — این فایل فقط پیشرفت همین دستگاه است");
      }
      downloadBackupJson(backup, "vision-one-backup.json");
    } catch {
      toast.error("ساخت فایل پشتیبان ممکن نشد");
    }
  }

  // فاز ۱۰ — CSV آزمون‌ها (از سرور؛ مهمان → توست راهنما)
  async function exportAttemptsCsv() {
    if (status !== "authenticated") {
      toast.info("آزمون‌ها روی حسابت ذخیره می‌شوند — برای گرفتن CSV اول وارد شو");
      return;
    }
    try {
      const res = await fetch("/api/export", { cache: "no-store" });
      if (!res.ok) {
        toast.error(res.status === 401 ? "برای گرفتن CSV اول وارد شو" : "دریافت آزمون‌ها ممکن نشد");
        return;
      }
      const j = (await res.json()) as { server?: { attempts?: unknown[] } };
      const attempts = Array.isArray(j?.server?.attempts) ? j.server.attempts : [];
      if (attempts.length === 0) {
        toast.info("هنوز آزمونی روی حسابت ثبت نشده");
        return;
      }
      downloadText("vision-one-attempts.csv", toAttemptsCsv(attempts), "text/csv;charset=utf-8");
      toast.success(`CSV ${attempts.length.toLocaleString("fa-IR")} آزمون دانلود شد`);
    } catch {
      toast.error("اتصال ممکن نشد");
    }
  }

  // فاز ۱۰ — CSV پیشرفت محلی (کلید/مقدار) — بدون نیاز به ورود
  function exportProgressCsv() {
    const backup = collectBackup();
    const rows = Object.keys(backup.data).length;
    if (rows === 0) {
      toast.info("هنوز دادهٔ پیشرفتی روی این دستگاه نیست");
      return;
    }
    downloadText("vision-one-progress.csv", toProgressCsv(backup.data), "text/csv;charset=utf-8");
    toast.success(`CSV ${rows.toLocaleString("fa-IR")} ردیف پیشرفت دانلود شد`);
  }

  function downloadText(filename: string, text: string, mime: string) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // فاز ۱۰ — ایمپورت v2: بخش محلی همیشه بازگردانی می‌شود؛ بخش سرور (با ورود) به /api/import می‌رود
  async function importProgress(file: File) {
    try {
      const text = await file.text();
      const res = parseBackup(text);
      if (!res.ok) {
        toast.error(res.error ?? "فایل پشتیبان معتبر نیست");
        return;
      }
      const count = restoreBackup(res.entries);

      if (res.server) {
        if (status === "authenticated") {
          const tid = toast.loading("در حال بازگردانی بخش حسابت روی سرور…");
          try {
            const r = await fetch("/api/import", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ server: res.server }),
              signal: AbortSignal.timeout?.(20000),
            });
            const j = (await r.json().catch(() => null)) as
              | { ok?: boolean; error?: string; imported?: { progress?: number; attempts?: number; reviewStates?: number } }
              | null;
            toast.dismiss(tid);
            if (r.ok && j?.ok) {
              const imp = j.imported ?? {};
              toast.success(
                `${(imp.progress ?? 0).toLocaleString("fa-IR")} ردیف پیشرفت، ${(imp.attempts ?? 0).toLocaleString("fa-IR")} آزمون، ${(imp.reviewStates ?? 0).toLocaleString("fa-IR")} کارت مرور از رَش وارد شد`,
              );
            } else {
              toast.error(
                r.status === 400 ? "فایل پشتیبان معتبر نیست" : (j?.error ?? "بازگردانی حسابت ممکن نشد"),
              );
            }
          } catch {
            toast.dismiss(tid);
            toast.error("اتصال ممکن نشد — بخش حساب وارد نشد ولی پیشرفت دستگاه بازیابی شد");
          }
        } else {
          toast.warning("بخش حسابت داخل فایل است؛ برای بازگردانی آن وارد شو");
        }
      }

      toast.success(`${count.toLocaleString("fa-IR")} بخش پیشرفت بازیابی شد — صفحه رفرش می‌شود…`);
      setTimeout(() => window.location.reload(), 900);
    } catch {
      toast.error("خواندن فایل ممکن نشد");
    }
  }

  // ── احراز هویت ──
  async function submitAuth() {
    const u = username.trim();
    if (u.length < 3 || u.length > 20) {
      toast.error("نام کاربری باید ۳ تا ۲۰ نویسه باشد");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      toast.error("کد باید دقیقاً ۴ رقم باشد");
      return;
    }
    setBusy(true);
    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, pin, grade, avatar }),
        });
        const j = (await res.json()) as { error?: string };
        if (!res.ok) {
          toast.error(j.error ?? "ساخت حساب ممکن نشد");
          return;
        }
        toast.success("حسابت ساخته شد! در حال ورود…");
      }
      const res = await signIn("credentials", { username: u, pin, redirect: false });
      if (res?.error) {
        toast.error("نام کاربری یا کد اشتباه است");
        return;
      }
      setUsername("");
      setPin("");
      setOpen(false); // کنترلر سشن، همگام‌سازی و رفرش را انجام می‌دهد
    } catch {
      toast.error("اتصال ممکن نشد — اینترنت را چک کن");
    } finally {
      setBusy(false);
    }
  }

  async function syncNow() {
    setBusy(true);
    const ok = await pushSnapshot();
    setBusy(false);
    if (ok) toast.success("پیشرفت با سرور همگام شد ☁️");
    else toast.error("همگام‌سازی ممکن نشد");
  }

  async function saveProfile(avatar?: string, grade?: string) {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar, grade }),
    });
    if (res.ok) {
      const j = (await res.json()) as { user: { avatar: string | null; grade: string | null } };
      await update({ avatar: j.user.avatar, grade: j.user.grade });
      toast.success("پروفایل به‌روز شد");
    } else {
      toast.error("ذخیره پروفایل ممکن نشد");
    }
  }

  function logout() {
    void signOut({ redirect: false }).then(() => {
      toast.success("از حساب خارج شدی — پیشرفتت روی همین دستگاه می‌ماند");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setValue(name); }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={user ? `حساب ${user.username}` : "نام من"}
          className="hidden sm:flex h-9 gap-1.5 rounded-full px-3 text-[12px] font-bold text-muted-foreground hover:text-foreground"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary text-[13px]">
            {user?.avatar ?? <User size={13} />}
          </span>
          {user?.username ?? (name || "نام من")}
        </Button>
      </DialogTrigger>
      <Button
        variant="ghost"
        size="icon"
        aria-label={user ? `حساب ${user.username}` : "نام من"}
        onClick={() => setOpen(true)}
        className="sm:hidden h-9 w-9 rounded-full text-[14px]"
      >
        {user?.avatar ?? <User size={16} />}
      </Button>
      <DialogContent className="sm:max-w-sm max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            {user ? `سلام ${user.avatar ?? ""} ${user.username}!` : "نام تو چیست؟"}
          </DialogTitle>
          <DialogDescription className="text-right text-[12px] leading-6">
            {user
              ? `حسابت فعاله — پیشرفتت خودکار با سرور همگام می‌شود${user.grade ? ` · پایه ${user.grade}` : ""}`
              : "نامت فقط برای نمایش در کارنامه‌ها و پیشرفت استفاده می‌شود و روی همین دستگاه ذخیره می‌ماند."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-1">
          <Label htmlFor="profile-name" className="text-[12px]">
            نام نمایشی
          </Label>
          <Input
            id="profile-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="مثلاً: آرش"
            maxLength={40}
          />
        </div>

        <Separator />

        {/* ── خلاصهٔ پیشرفت ── */}
        {/* فاز ۶ — XP/سطح/سکه در پروفایل */}
        <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
          <span className="flex items-center gap-2 text-[13px] font-black">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              ⭐
            </span>
            سطح {lvl.level.toLocaleString("fa-IR")}
          </span>
          <span className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground">
            <span>🪙 {xp.coins.toLocaleString("fa-IR")}</span>
            <span>✨ {xp.total.toLocaleString("fa-IR")} XP</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <BookOpen size={13} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-black leading-4">{learnedCount.toLocaleString("fa-IR")}</span>
              <span className="block text-[10px] text-muted-foreground">واژهٔ یادگرفته</span>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400">
              <Flame size={13} className="fill-current" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-black leading-4">{streak.count.toLocaleString("fa-IR")} روز</span>
              <span className="block text-[10px] text-muted-foreground">زنجیرهٔ فعلی</span>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
              <Star size={13} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-black leading-4">{starredWordCount.toLocaleString("fa-IR")}</span>
              <span className="block text-[10px] text-muted-foreground">واژهٔ ستاره‌دار</span>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Layers size={13} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-black leading-4">{combinedRounds.toLocaleString("fa-IR")}</span>
              <span className="block text-[10px] text-muted-foreground">مرور ترکیبی</span>
            </span>
          </div>
        </div>

        {/* ── حساب کاربری ── */}
        {status === "unauthenticated" && (
          <>
            <Separator />
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CloudCheck size={15} />
                </span>
                <div>
                  <p className="text-[13px] font-black">حساب کاربری — پیشرفت همه‌جا</p>
                  <p className="text-[11px] leading-5 text-muted-foreground">
                    با نام کاربری و کد ۴ رقمی وارد شو تا واژه‌ها، ستاره‌ها و آمارت روی هر دستگاهی باشه.
                  </p>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
                <Button
                  size="sm"
                  variant={mode === "login" ? "default" : "ghost"}
                  onClick={() => setMode("login")}
                  className="gap-1.5 h-8 text-[12px]"
                >
                  <LogIn size={13} /> ورود
                </Button>
                <Button
                  size="sm"
                  variant={mode === "register" ? "default" : "ghost"}
                  onClick={() => setMode("register")}
                  className="gap-1.5 h-8 text-[12px]"
                >
                  <UserPlus size={13} /> ساخت حساب
                </Button>
              </div>

              <div className="space-y-2.5">
                <div className="space-y-1">
                  <Label htmlFor="auth-username" className="text-[11px]">نام کاربری</Label>
                  <Input
                    id="auth-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثلاً: arash_2000 یا آرش"
                    autoComplete="username"
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="auth-pin" className="text-[11px]">کد ۴ رقمی (مثل رمز)</Label>
                  <Input
                    id="auth-pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    onKeyDown={(e) => e.key === "Enter" && void submitAuth()}
                    placeholder="••••"
                    type="password"
                    inputMode="numeric"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    dir="ltr"
                    className="text-left tracking-[0.4em]"
                  />
                </div>

                {mode === "register" && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-[11px]">پایه‌ات</Label>
                      <div className="flex flex-wrap gap-1">
                        {GRADES.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGrade(g)}
                            className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                              grade === g
                                ? "border-primary bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px]">آواتارت</Label>
                      <div className="flex flex-wrap gap-1">
                        {AVATARS.map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setAvatar(a)}
                            aria-label={`آواتار ${a}`}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[16px] transition ${
                              avatar === a ? "border-primary bg-primary/10" : "hover:bg-muted"
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button onClick={() => void submitAuth()} disabled={busy} className="w-full gap-1.5">
                  {busy ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : mode === "login" ? (
                    <LogIn size={14} />
                  ) : (
                    <UserPlus size={14} />
                  )}
                  {mode === "login" ? "ورود" : "ساخت حساب و ورود"}
                </Button>
              </div>
            </div>
          </>
        )}

        {status === "authenticated" && user && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border bg-muted/40 px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-[18px]">
                    {user.avatar ?? "🙂"}
                  </span>
                  <div>
                    <p className="text-[13px] font-black" dir="auto">{user.username}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {syncAt
                        ? `آخرین همگام‌سازی: ${new Date(syncAt).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}`
                        : "همگام‌سازی خودکار فعاله"}
                      {attemptsCount !== null ? ` · ${attemptsCount.toLocaleString("fa-IR")} آزمون` : ""}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => void syncNow()} disabled={busy} className="gap-1 h-8">
                  <RefreshCw size={12} className={busy ? "animate-spin" : ""} />
                  همگام کن
                </Button>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px]">آواتار</Label>
                <div className="flex flex-wrap gap-1">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => void saveProfile(a, undefined)}
                      aria-label={`تغییر آواتار به ${a}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[16px] transition ${
                        user.avatar === a ? "border-primary bg-primary/10" : "hover:bg-muted"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px]">پایه</Label>
                <div className="flex flex-wrap gap-1">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => void saveProfile(undefined, g)}
                      className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                        user.grade === g
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="outline" onClick={logout} className="w-full gap-1.5">
                <LogOut size={14} />
                خروج از حساب
              </Button>
            </div>
          </>
        )}

        <Separator />

        {/* ── پشتیبان‌گیری پیشرفت ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HardDriveDownload size={15} />
            </span>
            <div>
              <p className="text-[13px] font-black">پشتیبان پیشرفت</p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                واژه‌ها، ستاره‌ها، SRS، زنجیره و چالش‌ها — و با ورود، آزمون‌ها و حسابت هم در یک فایل JSON.
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => void exportProgress()} className="w-full gap-1.5">
            <FileDown size={14} />
            دریافت خروجی کامل 📤
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => void exportAttemptsCsv()} className="gap-1.5">
              <FileSpreadsheet size={14} />
              آزمون‌ها CSV
            </Button>
            <Button variant="outline" size="sm" onClick={exportProgressCsv} className="gap-1.5">
              <FileSpreadsheet size={14} />
              پیشرفت CSV
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="w-full gap-1.5">
            <Upload size={14} />
            بازیابی از فایل پشتیبان
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importProgress(f);
              e.target.value = "";
            }}
            aria-label="انتخاب فایل پشتیبان"
          />
        </div>

        <DialogFooter className="gap-2 sm:justify-start">
          <Button onClick={save} className="gap-1.5">
            <Check size={15} />
            ذخیره
          </Button>
          {name && (
            <Button
              variant="outline"
              onClick={() => {
                setName("");
                setValue("");
              }}
            >
              پاک کردن
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
