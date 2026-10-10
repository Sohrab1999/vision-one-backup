"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  type GamifyEvent,
  levelInfo,
  useXp,
  readXp,
} from "@/lib/xp-store";
import { faNum } from "@/components/book/games/shared";

/**
 * جشن گیمیفیکیشن (فاز ۶): کانفتی کانواسی + توست‌های سراسری.
 *
 * - `<ConfettiCanvas/>` یک‌بار در ریشه نصب می‌شود و به رویداد سراسری
 *   «visionone:confetti» گوش می‌دهد (سازنده از fireConfetti صدا زده می‌شود).
 * - `<GamificationToasts/>` به «visionone:gamify» گوش می‌دهد و برای
 *   XP/سطح‌جهش/نشان/ماموریت/رکورد توست نمایش می‌دهد؛ رویدادهای بزرگ کانفتی می‌بارند.
 */

// ─── سازندهٔ کانفتی (بدون وابستگی خارجی) ───

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  life: number;
  shape: "rect" | "circle";
}

const CONFETTI_COLORS = [
  "oklch(0.6 0.14 160)",
  "oklch(0.75 0.13 85)",
  "oklch(0.62 0.12 170)",
  "oklch(0.66 0.14 45)",
  "oklch(0.66 0.16 15)",
  "oklch(0.7 0.15 330)",
];

/** شلیک کانفتی از پایین صفحه — از هر جایی قابل صدا زدن است */
export function fireConfetti(): void {
  try {
    window.dispatchEvent(new CustomEvent("visionone:confetti"));
  } catch {
    /* noop */
  }
}

export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let running = false;
    let last = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const step = (ts: number) => {
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0 && p.y < canvas.height + 40);
      for (const p of particles) {
        p.life -= dt;
        p.vy += 900 * dt; // جاذبه
        p.vx *= 0.995;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (particles.length) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
        last = 0;
      }
    };

    const burst = () => {
      const n = window.innerWidth < 480 ? 70 : 120;
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.72;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 320 + Math.random() * 480;
        particles.push({
          x: cx + (Math.random() - 0.5) * 140,
          y: cy,
          vx: Math.cos(angle) * speed * 0.7,
          vy: -Math.abs(Math.sin(angle)) * speed - 260,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 12,
          w: 7 + Math.random() * 7,
          h: 10 + Math.random() * 8,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
          life: 2.2 + Math.random() * 1.4,
          shape: Math.random() > 0.4 ? "rect" : "circle",
        });
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    window.addEventListener("visionone:confetti", burst);

    return () => {
      window.removeEventListener("visionone:confetti", burst);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}

// ─── توست‌های سراسری ───

export function GamificationToasts() {
  const xp = useXp();
  const lastLevelRef = useRef(levelInfo(xp.total).level);

  useEffect(() => {
    const onGamify = (e: Event) => {
      const ev = (e as CustomEvent<GamifyEvent>).detail;
      if (!ev) return;
      switch (ev.type) {
        case "xp":
          if (ev.amount >= 15) {
            toast(`+${faNum(ev.amount)} XP — ${ev.reason}`, {
              description: ev.capped ? "سقف روزانه پر شده؛ نرخ کمانه‌ای فعال است" : undefined,
              duration: 2200,
            });
          }
          break;
        case "levelup": {
          toast.success(`🎉 سطح ${faNum(ev.level)} باز شد!`, {
            description: "ادامه بده، ستاره‌ای که می‌درخشد توئی",
            duration: 3500,
          });
          fireConfetti();
          break;
        }
        case "badge":
          toast.success(`${ev.badge.emoji} نشان جدید: ${ev.badge.title}`, {
            description: `+${faNum(ev.badge.coins)} سکه جایزه گرفت`,
            duration: 4000,
          });
          fireConfetti();
          break;
        case "mission-done":
          toast(`${ev.quest.emoji} ماموریت کامل شد: ${ev.quest.title}`, {
            description: "جایزه‌ات را از نمای «جایزه‌ها» بگیر",
            duration: 3500,
          });
          break;
        case "record":
          toast.success(`🏆 رکورد شخصی جدید — ${ev.label}`, {
            description: "چه پروازی!",
            duration: 3200,
          });
          fireConfetti();
          break;
        default:
          break;
      }
    };
    window.addEventListener("visionone:gamify", onGamify);
    return () => window.removeEventListener("visionone:gamify", onGamify);
  }, []);

  // همگام‌سازی سطح اولیه (بدون setState در بدنهٔ effect — فقط ref)
  useEffect(() => {
    lastLevelRef.current = levelInfo(readXp().total).level;
  }, [xp.total]);

  return null;
}
