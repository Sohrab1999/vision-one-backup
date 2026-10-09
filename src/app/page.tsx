"use client";

import { useEffect, useState } from "react";
import { AppHeader, type ViewId } from "@/components/book/app-header";
import { AppFooter } from "@/components/book/app-footer";
import { BookshelfView } from "@/components/book/bookshelf-view";
import { HomeView } from "@/components/book/home-view";
import { ContentsView } from "@/components/book/contents-view";
import { ChapterView } from "@/components/book/chapter-view";
import { VocabularyView } from "@/components/book/vocabulary-view";
import { GrammarView } from "@/components/book/grammar-view";
import { QuizView } from "@/components/book/quiz-view";
import { TextsView } from "@/components/book/texts-view";
import { DictionaryView } from "@/components/book/dictionary-view";
import { VerbsView } from "@/components/book/verbs-view";
import { FlashcardView } from "@/components/book/flashcard-view";
import { TutorView } from "@/components/book/tutor-view";
import { StatsView } from "@/components/book/stats-view";
import { registerNavHandler } from "@/lib/nav-store";
import { BookProvider, useBook } from "@/lib/book-context";

function App() {
  const { bookId } = useBook();
  // null = هنوز کاربر ناوبری نکرده — نمای اولیه از کتاب فعال مشتق می‌شود
  const [view, setView] = useState<ViewId | null>(null);
  const [chapterId, setChapterId] = useState(1);

  const effectiveView: ViewId = view ?? (bookId ? "home" : "shelf");

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
        <div key={effectiveView} className="view-in">
          {effectiveView === "shelf" && <BookshelfView onNavigate={navigate} />}
          {effectiveView === "home" && bookId && <HomeView onNavigate={navigate} />}
          {effectiveView === "contents" && bookId && <ContentsView onOpenChapter={openChapter} />}
          {effectiveView === "chapter" && bookId && <ChapterView chapterId={chapterId} onNavigate={navigate} />}
          {effectiveView === "vocab" && bookId && <VocabularyView onNavigate={navigate} />}
          {effectiveView === "grammar" && bookId && <GrammarView />}
          {effectiveView === "quiz" && bookId && <QuizView />}
          {effectiveView === "texts" && bookId && <TextsView />}
          {effectiveView === "dict" && bookId && <DictionaryView />}
          {effectiveView === "verbs" && bookId && <VerbsView />}
          {effectiveView === "flashcards" && bookId && <FlashcardView />}
          {effectiveView === "stats" && bookId && <StatsView onNavigate={navigate} />}
          {effectiveView === "tutor" && bookId && <TutorView />}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default function Page() {
  return (
    <BookProvider>
      <App />
    </BookProvider>
  );
}
