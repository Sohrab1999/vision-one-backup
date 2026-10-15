"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AppHeader, type ViewId } from "@/components/book/app-header";
import { DesktopSidebar } from "@/components/book/desktop-sidebar";
import { MobileNav } from "@/components/book/mobile-nav";
import { AppFooter } from "@/components/book/app-footer";
import { BookshelfView } from "@/components/book/bookshelf-view";
import { GamificationToasts, ConfettiCanvas } from "@/components/book/confetti";
import { registerNavHandler } from "@/lib/nav-store";
import { BookProvider, useBook } from "@/lib/book-context";
import { AccountProvider } from "@/components/book/account-provider";
import { DeepLinkGate } from "@/components/book/deep-link-gate";
import { WhatsNewDialog } from "@/components/book/whats-new";
import { PwaInstallGuide } from "@/components/book/pwa-install-guide";

// ── Audit گام ۲ — تفکیک نماها به chunk مستقل (view-level code splitting) ──
// پیش از این refactor هر ۲۲ نما استاتیک import می‌شد و همه در باندل اولیه بودند
// (LCP گزارش‌شده تا ۲۵ ثانیه). اکنون فقط مسیر بوت (هدر/فوتر/قفسه/پروایدرها) eager است
// و هر نما هنگام ناوبری به آن بارگذاری می‌شود — الگوی همان dynamic import بازی‌ها.
const ViewChunkLoading = () => (
  <section
    className="flex min-h-[55vh] flex-col items-center justify-center gap-4 rounded-3xl border bg-card/60 p-12 text-center"
    role="status"
    aria-live="polite"
    aria-label="در حال بارگذاری بخش"
  >
    <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-muted border-t-primary" aria-hidden />
    <p className="text-sm font-medium text-muted-foreground">در حال باز کردن بخش…</p>
  </section>
);

const HomeView = dynamic(() => import("@/components/book/home-view").then((m) => m.HomeView), { ssr: false, loading: ViewChunkLoading });
const ContentsView = dynamic(() => import("@/components/book/contents-view").then((m) => m.ContentsView), { ssr: false, loading: ViewChunkLoading });
const ChapterView = dynamic(() => import("@/components/book/chapter-view").then((m) => m.ChapterView), { ssr: false, loading: ViewChunkLoading });
const VocabularyView = dynamic(() => import("@/components/book/vocabulary-view").then((m) => m.VocabularyView), { ssr: false, loading: ViewChunkLoading });
const GrammarView = dynamic(() => import("@/components/book/grammar-view").then((m) => m.GrammarView), { ssr: false, loading: ViewChunkLoading });
const QuizView = dynamic(() => import("@/components/book/quiz-view").then((m) => m.QuizView), { ssr: false, loading: ViewChunkLoading });
const GamesHub = dynamic(() => import("@/components/book/games/games-hub").then((m) => m.GamesHub), { ssr: false, loading: ViewChunkLoading });
const TextsView = dynamic(() => import("@/components/book/texts-view").then((m) => m.TextsView), { ssr: false, loading: ViewChunkLoading });
const DictionaryView = dynamic(() => import("@/components/book/dictionary-view").then((m) => m.DictionaryView), { ssr: false, loading: ViewChunkLoading });
const VerbsView = dynamic(() => import("@/components/book/verbs-view").then((m) => m.VerbsView), { ssr: false, loading: ViewChunkLoading });
const FlashcardView = dynamic(() => import("@/components/book/flashcard-view").then((m) => m.FlashcardView), { ssr: false, loading: ViewChunkLoading });
const ReviewView = dynamic(() => import("@/components/book/review-view").then((m) => m.ReviewView), { ssr: false, loading: ViewChunkLoading });
const TutorView = dynamic(() => import("@/components/book/tutor-view").then((m) => m.TutorView), { ssr: false, loading: ViewChunkLoading });
const StatsView = dynamic(() => import("@/components/book/stats-view").then((m) => m.StatsView), { ssr: false, loading: ViewChunkLoading });
const CompareView = dynamic(() => import("@/components/book/compare-view").then((m) => m.CompareView), { ssr: false, loading: ViewChunkLoading });
const RewardsView = dynamic(() => import("@/components/book/rewards-view").then((m) => m.RewardsView), { ssr: false, loading: ViewChunkLoading });
const SpeakingView = dynamic(() => import("@/components/book/speaking-view").then((m) => m.SpeakingView), { ssr: false, loading: ViewChunkLoading });
const ClassView = dynamic(() => import("@/components/book/class-view").then((m) => m.ClassView), { ssr: false, loading: ViewChunkLoading });
const NotebookView = dynamic(() => import("@/components/book/notebook-view").then((m) => m.NotebookView), { ssr: false, loading: ViewChunkLoading });

/** اسکلت بارگذاری تنبل جزوه — تا رسیدن chunk dynamic import کتاب فعال */
function BookDataLoading() {
  const { meta } = useBook();
  return (
    <section
      className="flex min-h-[55vh] flex-col items-center justify-center gap-4 rounded-3xl border bg-card/60 p-12 text-center"
      role="status"
      aria-live="polite"
      aria-label="در حال بارگذاری جزوه"
    >
      <span className="text-5xl animate-bounce" aria-hidden>
        {meta?.emoji ?? "📗"}
      </span>
      <div className="h-2.5 w-44 rounded-full bg-muted animate-pulse" aria-hidden />
      <div className="h-2 w-64 rounded-full bg-muted/70 animate-pulse [animation-delay:150ms]" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">
        در حال باز کردن {meta?.title ?? "جزوه"}…
      </p>
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-muted border-t-primary" aria-hidden />
    </section>
  );
}

// ترتیب ناوبری برای میان‌برهای Alt+1..9 (۹ مقصد اول سایدبار دسکتاپ)
const NAV_SHORTCUT: ViewId[] = [
  "home",
  "contents",
  "vocab",
  "flashcards",
  "review",
  "notebook",
  "grammar",
  "quiz",
  "games",
];

function App() {
  const { bookId, data } = useBook();
  // null = هنوز کاربر ناوبری نکرده — نمای اولیه از کتاب فعال مشتق می‌شود
  const [view, setView] = useState<ViewId | null>(null);
  const [chapterId, setChapterId] = useState(1);

  const effectiveView: ViewId = view ?? (bookId ? "home" : "shelf");
  // داده کتاب فعال آماده؟ (lazy-load فاز ۷ — تا رسیدن chunk اسکلت نشان داده می‌شود)
  const hasData = bookId !== null && data !== null;
  const showBookViews = effectiveView !== "shelf" && effectiveView !== "compare";

  // درخواست‌های ناوبری از عمق درخت (مثل پاپ‌اور واژه) — setView داخل callback رویدادی
  // اجرا می‌شود نه همزمان در effect، پس با react-hooks v6 سازگار است.
  useEffect(() => registerNavHandler((v) => setView(v)), []);

  // میان‌برهای کیبورد دسکتاپ: Alt+1..9 → پرش مستقیم به بخش‌های پرکاربرد
  // (فقط Alt خالص — ترکیب با Ctrl/Meta یا تایپ در فیلدها هرگز مداخله نمی‌کند)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const idx = Number(e.key) - 1;
      if (!Number.isInteger(idx) || idx < 0 || idx >= NAV_SHORTCUT.length) return;
      const target = document.activeElement;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      )
        return;
      e.preventDefault();
      setView(NAV_SHORTCUT[idx]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function navigate(v: ViewId) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openChapter(id: number) {
    setChapterId(id);
    navigate("chapter");
  }

  return (
    <div className="flex min-h-screen flex-col xl:pr-[72px]">
      {/* پرش‌لینک دسترس‌پذیری (WCAG 2.4.1) — اولین تمرکز Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground focus:shadow-lg"
      >
        پرش به محتوای اصلی
      </a>

      {/* ریل ناوبری دسکتاپ — فقط xl+؛ زیر آن هدر قرصی کار می‌کند */}
      {hasData && <DesktopSidebar view={effectiveView} onNavigate={navigate} />}

      <AppHeader view={effectiveView} onNavigate={navigate} />

      {/* ناوبری پایین موبایل (Task 23) — جانشین نوار قرصی هدر؛ فقط <md */}
      {hasData && <MobileNav view={effectiveView} onNavigate={navigate} />}

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-3 py-6 focus:outline-none sm:px-4 xl:max-w-7xl"
      >
        {/* انیمیشن نرم انتقال بین نماها و کتاب‌ها (فاز ۷ — Framer Motion):
            کلید شامل bookId است، پس سوییچ کتاب هم موجب حرکت جداگانه می‌شود */}
        <motion.div
          key={`${bookId ?? "shelf"}-${effectiveView}`}
          initial={{ opacity: 0, y: 16, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {effectiveView === "shelf" && <BookshelfView onNavigate={navigate} />}
          {effectiveView === "compare" && <CompareView />}
          {bookId && !data && showBookViews && <BookDataLoading />}
          {effectiveView === "home" && hasData && <HomeView onNavigate={navigate} />}
          {effectiveView === "contents" && hasData && <ContentsView onOpenChapter={openChapter} />}
          {effectiveView === "chapter" && hasData && <ChapterView chapterId={chapterId} onNavigate={navigate} />}
          {effectiveView === "vocab" && hasData && <VocabularyView onNavigate={navigate} />}
          {effectiveView === "grammar" && hasData && <GrammarView />}
          {effectiveView === "quiz" && hasData && <QuizView />}
          {effectiveView === "games" && hasData && <GamesHub />}
          {effectiveView === "texts" && hasData && <TextsView />}
          {effectiveView === "speaking" && hasData && <SpeakingView />}
          {effectiveView === "class" && hasData && <ClassView />}
          {effectiveView === "notebook" && hasData && <NotebookView />}
          {effectiveView === "dict" && hasData && <DictionaryView />}
          {effectiveView === "verbs" && hasData && <VerbsView />}
          {effectiveView === "flashcards" && hasData && <FlashcardView />}
          {effectiveView === "review" && hasData && <ReviewView onNavigate={(v) => navigate(v as ViewId)} />}
          {effectiveView === "stats" && hasData && <StatsView onNavigate={navigate} />}
          {effectiveView === "tutor" && hasData && <TutorView />}
          {effectiveView === "rewards" && <RewardsView />}
        </motion.div>
      </main>

      <AppFooter />

      {/* فاصله‌ی پایین برای ناوبری موبایل — فوتر زیر نوار پایین دفن نشود */}
      <div
        aria-hidden
        className="h-[calc(57px+env(safe-area-inset-bottom))] shrink-0 md:hidden"
      />

      {/* فاز ۶ — جشن گیمیفیکیشن: توست‌های XP/سطح/نشان + کانفتی (سراسری) */}
      <GamificationToasts />
      <ConfettiCanvas />

      {/* فاز ۱۲ — لینک عمیق + تازه‌ها + راهنمای نصب (همیشه‌مونت، بدون UI در جریان عادی) */}
      <DeepLinkGate />
      <WhatsNewDialog />
      <PwaInstallGuide />
    </div>
  );
}

export default function Page() {
  return (
    <AccountProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AccountProvider>
  );
}
