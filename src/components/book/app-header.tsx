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
  | "compare";

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const NAV: NavItem[] = [
  { id: "home", label: "جلد", icon: Home },
  { id: "contents", label: "فهرست", icon: ListOrdered },
  { id: "vocab", label: "واژگان", icon: BookOpen },
  { id: "flashcards", label: "تمرین", icon: Layers },
  { id: "review", label: "مرور امروز", icon: Brain },
  { id: "grammar", label: "گرامر", icon: GraduationCap },
  { id: "quiz", label: "آزمون", icon: ClipboardList },
  { id: "games", label: "بازی‌ها", icon: Gamepad2 },
  { id: "rewards", label: "جایزه‌ها", icon: Trophy },
  { id: "stats", label: "آمار", icon: BarChart3 },
  { id: "compare", label: "مقایسه", icon: GitCompareArrows },
  { id: "texts", label: "متن‌ها", icon: FileText },
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

  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4">
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

        {/* ناوبری دسکتاپ */}
        {hasBook && (
          <nav className="hidden md:flex flex-1 min-w-0 items-center gap-1 overflow-x-auto px-2 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="ناوبری اصلی">
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

      {/* ناوبری موبایل */}
      {hasBook && (
        <nav
          className="md:hidden flex gap-1 overflow-x-auto px-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="ناوبری موبایل"
        >
          {NAV.map((item) => {
            const active = view === item.id || (view === "chapter" && item.id === "contents");
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <item.icon size={13} />
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
