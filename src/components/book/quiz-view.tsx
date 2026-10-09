"use client";

import { ClipboardList } from "lucide-react";
import { useBookData } from "@/lib/book-context";
import { QuizGame } from "./quiz-game";

export function QuizView() {
  const data = useBookData();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-black">
          <ClipboardList size={20} className="text-primary" />
          آزمون تعاملی
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {data.stats.questions.toLocaleString("fa-IR")} تست واقعی جزوه (گرامر و واژگان) با کلید تأییدشده — چالش روزانه و هفتگی برای همه یکسان است و بعد از هر پاسخ می‌توانی «توضیح هوشمند» بگیری.
        </p>
      </div>
      <QuizGame />
    </div>
  );
}
