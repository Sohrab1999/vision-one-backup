"use client";

import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  FileText,
  Library,
  Repeat,
  Bot,
  ListOrdered,
  Moon,
  Sun,
  Layers,
  BarChart3,
  ChevronsUpDown,
  Check,
  Clock,
  GitCompareArrows,
  Brain,
  Gamepad2,
  Trophy,
  Mic,
  School,
  NotebookText,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsDark, setDark } from "@/lib/theme-store";
import { useBook } from "@/lib/book-context";
import { GlobalSearchButton } from "./global-search";
import { ProfileButton } from "./profile-button";
import { useWhatsNewUnseen, OPEN_WHATS_NEW_EVENT } from "./whats-new";
import { OPEN_INSTALL_EVENT } from "./pwa-install-guide";

export type ViewId =
  | "shelf"
  | "home"
  | "contents"
  | "chapter"
  | "vocab"
  | "grammar"
  | "quiz"
  | "games"
  | "rewards"
  | "texts"
  | "dict"
  | "verbs"
  | "flashcards"
  | "review"
  | "stats"
  | "tutor"
  | "compare"
  | "speaking"
  | "class"
  | "notebook";

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

/** فهرست ناوبری سراسری — هدر (md..lg) و ریل دسکتاپ (xl+) هر دو از همین منبع می‌خوانند */
export const NAV: NavItem[] = [
  { id: "home", label: "جلد", icon: Home },
  { id: "contents", label: "فهرست", icon: ListOrdered },
  { id: "vocab", label: "واژگان", icon: BookOpen },
  { id: "flashcards", label: "تمرین", icon: Layers },
  { id: "review", label: "مرور امروز", icon: Brain },
  { id: "notebook", label: "دفتر خطاها", icon: NotebookText },
  { id: "grammar", label: "گرامر", icon: GraduationCap },
  { id: "quiz", label: "آزمون", icon: ClipboardList },
  { id: "games", label: "بازی‌ها", icon: Gamepad2 },
  { id: "rewards", label: "جایزه‌ها", icon: Trophy },
  { id: "stats", label: "آمار", icon: BarChart3 },
  { id: "compare", label: "مقایسه", icon: GitCompareArrows },
  { id: "texts", label: "متن‌ها", icon: FileText },
  { id: "speaking", label: "گفتار", icon: Mic },
  { id: "class", label: "کلاس", icon: School },
  { id: "dict", label: "دیکشنری", icon: Library },
  { id: "verbs", label: "افعال بی‌قاعده", icon: Repeat },
  { id: "tutor", label: "دستیار", icon: Bot },
];

export function AppHeader({
  view,
  onNavigate,
}: {
  view: ViewId;
  onNavigate: (v: ViewId) => void;
}) {
  const dark = useIsDark();
  const { meta, bookId, books, setBook } = useBook();
  const hasBook = bookId !== null && meta !== null;
  const hasUnseenNews = useWhatsNewUnseen();

  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/65">
      {/* دسکتاپ (xl+): هم‌تراز با main (max-w-7xl) — لبه‌های هدر و محتوا یکی می‌شوند */}
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4 xl:max-w-7xl">
        {/* لوگو */}
        <button
          type="button"
          onClick={() => onNavigate(hasBook ? "home" : "shelf")}
          className="flex items-center gap-2 shrink-0 group"
          aria-label={hasBook ? "صفحه جلد" : "قفسه کتاب"}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform group-hover:scale-105 group-hover:rotate-3">
            <BookOpen size={19} />
          </span>
          <span className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-[15px] font-black tracking-tight">
              {hasBook ? meta.title : "کتابخانه ویژن"}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {hasBook ? `زبان انگلیسی ${meta.gradeLabel.replace("پایه ", "")}` : "جزوه‌های زبان انگلیسی"}
            </span>
          </span>
        </button>

        {/* سوئیچر کتاب */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="تغییر جزوه"
              className="h-9 shrink-0 gap-1.5 rounded-full px-2.5 text-[12px] font-bold sm:px-3"
            >
              <span className="text-base leading-none" aria-hidden>
                {hasBook ? meta.emoji : "🗂️"}
              </span>
              <span className="hidden max-w-[110px] truncate md:inline">
                {hasBook ? meta.gradeLabel : "قفسه کتاب"}
              </span>
              <ChevronsUpDown size={13} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              انتخاب جزوه
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {books.map((b) => (
              <DropdownMenuItem
                key={b.id}
                disabled={!b.available}
                onClick={() => {
                  if (!b.available) return;
                  if (b.id !== bookId) setBook(b.id);
                  onNavigate("home");
                }}
                className="gap-2.5"
              >
                <span className="text-lg leading-none" aria-hidden>
                  {b.emoji}
                </span>
                <span className="flex-1">
                  <span className="block text-[13px] font-bold leading-tight">{b.title}</span>
                  <span className="block text-[10px] text-muted-foreground">
                    {b.available ? b.gradeLabel : "به‌زودی — در انتظار فایل"}
                  </span>
                </span>
                {b.id === bookId ? (
                  <Check size={15} className="shrink-0 text-primary" />
                ) : (
                  !b.available && <Clock size={13} className="shrink-0 text-muted-foreground" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate("shelf")} className="gap-2">
              <Library size={14} />
              مشاهده قفسه کامل
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ناوبری دسکتاپ — فقط md تا lg؛ از xl به بعد ریل کناری جانشین می‌شود
            (۱۸ قرص در هدر سرریز می‌کرد و ۸ مقصد عملاً نامرئی بود) */}
        {hasBook && (
          <nav className="hidden md:flex xl:hidden flex-1 min-w-0 items-center gap-1 overflow-x-auto px-2 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="ناوبری اصلی">
            {NAV.map((item) => {
              const active = view === item.id || (view === "chapter" && item.id === "contents");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex-1 md:hidden" />

        {/* اکشن‌های ثابت — هرگز از هدر بیرون نمی‌زنند */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          {/* جست‌وجوی سراسری */}
          <GlobalSearchButton />

          {/* پروفایل */}
          <ProfileButton />

          {/* تازه‌ها — What's New (فاز ۱۲): نقطهٔ amber تا وقتی ورود جدید دیده نشده */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_WHATS_NEW_EVENT))}
            aria-label="تازه‌ها — چه چیزهایی جدید است"
            className="relative h-11 w-11 shrink-0 rounded-full sm:h-9 sm:w-9"
          >
            <Sparkles size={17} />
            {hasUnseenNews && (
              <span
                className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-background"
                aria-hidden
              />
            )}
          </Button>

          {/* نصب روی گوشی — راهنمای PWA (فاز ۱۲)
              موبایل (Task 23): از هدر حذف شد (اقدام کم‌تکرار) → کشوی «بیشتر» ناوبری پایین
              دسکتاپ (بهینه‌سازی xl+): بی‌معنا روی مانیتور → مخفی؛ فقط md..xl دیده می‌شود */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_INSTALL_EVENT))}
            aria-label="نصب روی گوشی"
            className="hidden h-11 w-11 shrink-0 rounded-full sm:inline-flex sm:h-9 sm:w-9 xl:hidden"
          >
            <Smartphone size={17} />
          </Button>

          {/* تغییر پوسته — در لمس هدف ≥۴۴px */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={dark ? "پوسته روشن" : "پوسته تیره"}
          className="rounded-full h-11 w-11 shrink-0 sm:h-9 sm:w-9"
        >
            {!dark ? <Moon size={17} /> : <Sun size={17} />}
          </Button>
        </div>
      </div>

      {/* ناوبری موبایل — Task 23: نوار قرصی افقی ۱۸ آیتمی حذف شد؛
          جانشین: ناوبری پایین با ۵ زبانهٔ اصلی + کشوی «بیشتر» (mobile-nav.tsx)
          چرا: قرص‌ها ~۳۰px و ۱۲ مقصد بیرون از دید بود، هدر ~۱۰۰px رشد می‌کرد */}
    </header>
  );
}
