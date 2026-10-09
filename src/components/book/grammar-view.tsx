"use client";

import { GraduationCap } from "lucide-react";
import { GrammarLibrary } from "./grammar-library";

export function GrammarView() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-black">
          <GraduationCap size={20} className="text-primary" />
          درسنامه‌های گرامر
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          خلاصه‌ی کامل درسنامه‌های گرامر جزوه، با جدول‌ها، نکات کنکوری و مثال‌های ترجمه‌شده.
        </p>
      </div>
      <GrammarLibrary />
    </div>
  );
}
