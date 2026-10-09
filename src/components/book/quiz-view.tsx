"use client";

import { ClipboardList } from "lucide-react";
import { QuizGame } from "./quiz-game";

export function QuizView() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-black">
          <ClipboardList size={20} className="text-primary" />
          آزمون تعاملی
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          ۵۳۰ تست واقعی جزوه (گرامر و واژگان) با کلید تأییدشده — بعد از هر پاسخ می‌توانی «توضیح هوشمند» بگیری.
        </p>
      </div>
      <QuizGame />
    </div>
  );
}
