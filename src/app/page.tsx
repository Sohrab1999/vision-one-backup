"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader, type ViewId } from "@/components/book/app-header";
import { AppFooter } from "@/components/book/app-footer";
import { BookshelfView } from "@/components/book/bookshelf-view";
import { HomeView } from "@/components/book/home-view";
import { ContentsView } from "@/components/book/contents-view";
import { ChapterView } from "@/components/book/chapter-view";
import { VocabularyView } from "@/components/book/vocabulary-view";
import { GrammarView } from "@/components/book/grammar-view";
import { QuizView } from "@/components/book/quiz-view";
import { GamesHub } from "@/components/book/games/games-hub";
import { TextsView } from "@/components/book/texts-view";
import { DictionaryView } from "@/components/book/dictionary-view";
import { VerbsView } from "@/components/book/verbs-view";
import { FlashcardView } from "@/components/book/flashcard-view";
import { ReviewView } from "@/components/book/review-view";
import { TutorView } from "@/components/book/tutor-view";
import { StatsView } from "@/components/book/stats-view";
import { CompareView } from "@/components/book/compare-view";
import { RewardsView } from "@/components/book/rewards-view";
import { GamificationToasts, ConfettiCanvas } from "@/components/book/confetti";
import { registerNavHandler } from "@/lib/nav-store";
import { BookProvider, useBook } from "@/lib/book-context";
import { AccountProvider } from "@/components/book/account-provider";

/** اسکلت بارگذاری تنبل جزوه — تا رسیدن chunk dynamic import کتاب فعال */
function BookDataLoading() {
  const { meta } = useBook();
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 rounded-3xl border bg-card/60 p-12 text-center"
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

  function navigate(v: ViewId) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openChapter(id: number) {
    setChapterId(id);
    navigate("chapter");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader view={effectiveView} onNavigate={navigate} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-6 sm:px-4">
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

      {/* فاز ۶ — جشن گیمیفیکیشن: توست‌های XP/سطح/نشان + کانفتی (سراسری) */}
      <GamificationToasts />
      <ConfettiCanvas />
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
