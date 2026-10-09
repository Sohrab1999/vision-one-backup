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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsDark, setDark } from "@/lib/theme-store";
import { ProfileButton } from "./profile-button";

export type ViewId =
  | "home"
  | "contents"
  | "chapter"
  | "vocab"
  | "grammar"
  | "quiz"
  | "texts"
  | "dict"
  | "verbs"
  | "flashcards"
  | "stats"
  | "tutor";

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
  { id: "grammar", label: "گرامر", icon: GraduationCap },
  { id: "quiz", label: "آزمون", icon: ClipboardList },
  { id: "stats", label: "آمار", icon: BarChart3 },
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

  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3 sm:px-4">
        {/* لوگو */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 shrink-0 group"
          aria-label="صفحه جلد"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform group-hover:scale-105 group-hover:rotate-3">
            <BookOpen size={19} />
          </span>
          <span className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-[15px] font-black tracking-tight">ویژن وان</span>
            <span className="text-[10px] text-muted-foreground">زبان انگلیسی دهم</span>
          </span>
        </button>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1" aria-label="ناوبری اصلی">
          {NAV.map((item) => {
            const active = view === item.id || (view === "chapter" && item.id === "contents");
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all",
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

        <div className="flex-1 md:hidden" />

        {/* پروفایل */}
        <ProfileButton />

        {/* تغییر پوسته */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={dark ? "پوسته روشن" : "پوسته تیره"}
          className="rounded-full h-9 w-9 shrink-0"
        >
          {!dark ? <Moon size={17} /> : <Sun size={17} />}
        </Button>
      </div>

      {/* ناوبری موبایل */}
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
    </header>
  );
}
