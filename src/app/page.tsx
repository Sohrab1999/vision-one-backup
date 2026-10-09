"use client";

import { useState } from "react";
import { AppHeader, type ViewId } from "@/components/book/app-header";
import { AppFooter } from "@/components/book/app-footer";
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

export default function Page() {
  const [view, setView] = useState<ViewId>("home");
  const [chapterId, setChapterId] = useState(1);

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
      <AppHeader view={view} onNavigate={navigate} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-6 sm:px-4">
        <div key={view} className="view-in">
          {view === "home" && <HomeView onNavigate={navigate} />}
          {view === "contents" && <ContentsView onOpenChapter={openChapter} />}
          {view === "chapter" && <ChapterView chapterId={chapterId} onNavigate={navigate} />}
          {view === "vocab" && <VocabularyView />}
          {view === "grammar" && <GrammarView />}
          {view === "quiz" && <QuizView />}
          {view === "texts" && <TextsView />}
          {view === "dict" && <DictionaryView />}
          {view === "verbs" && <VerbsView />}
          {view === "flashcards" && <FlashcardView />}
          {view === "stats" && <StatsView onNavigate={navigate} />}
          {view === "tutor" && <TutorView />}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
