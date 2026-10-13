"use client";

/**
 * کمکی‌های نمایشی آزمون (کانفتی + قالب‌بندی زمان) — تفکیک مکانیکی از quiz-game.tsx
 */

import { useMemo } from "react";
import { CONFETTI_COLORS } from "./constants";

/** Lightweight CSS confetti — shown when the quiz score is ۸۰٪ or higher. */
export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.4 + Math.random() * 1.6,
        size: 6 + Math.random() * 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        drift: Math.round((Math.random() - 0.5) * 120),
        round: Math.random() > 0.5,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-[-14px] block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.45),
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--confetti-drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toLocaleString("fa-IR")}:${sec.toString().padStart(2, "0")}`;
}
