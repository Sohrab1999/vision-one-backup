"use client";

import { useEffect, useRef } from "react";
import type { SceneBridge } from "../types";

// ─── فاز F4 — جوی‌استیک لمسی حرکت (فقط pointer:coarse) ───

/** شعاع کمان جوی‌استیک (px) */
export const STICK_R = 52;

/** فاز F4 — نوشتن بردار جوی‌استیک + جابه‌جایی دسته — تابع ماژول‌سطح (قاعدهٔ immutability کیت) */
export function setStick(b: SceneBridge, x: number, y: number, knob: HTMLElement | null): void {
  b.stick.x = x;
  b.stick.y = y;
  if (knob) {
    knob.style.transform = `translate(calc(-50% + ${(x * STICK_R).toFixed(1)}px), calc(-50% + ${(-y * STICK_R).toFixed(1)}px))`;
  }
}

/**
 * جوی‌استیک مجازی حرکت: بردار آنالوگ مستقیم داخل bridge.current.stick می‌نویسد
 * (صفر ری‌رندر در هر فریم — حرکت با pointer capture). بالا = جلو.
 */
export function TouchJoystick({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const pidRef = useRef<number | null>(null);

  const setVec = (x: number, y: number) => {
    setStick(bridge.current, x, y, knobRef.current);
  };

  /** اعمال موقعیت انگشت به بردار آنالوگ (clamp به شعاع) */
  const update = (e: React.PointerEvent) => {
    const base = baseRef.current;
    if (!base) return;
    const r = base.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > STICK_R) {
      dx = (dx / len) * STICK_R;
      dy = (dy / len) * STICK_R;
    }
    setVec(dx / STICK_R, -dy / STICK_R);
  };

  // پاک‌سازی در unmount — بازیکن گیر حرکت کاذب نماند (cleanup پایدار با bridge)
  useEffect(() => {
    const b = bridge;
    return () => setStick(b.current, 0, 0, null);
  }, [bridge]);

  return (
    <div
      data-fps-hud
      ref={baseRef}
      role="group"
      aria-label="جوی‌استیک حرکت — بکش تا قدم برداری"
      className="pointer-events-auto absolute bottom-5 left-4 z-20 h-32 w-32 touch-none select-none rounded-full border-2 border-white/25 bg-black/35 backdrop-blur"
      onPointerDown={(e) => {
        if (pidRef.current !== null) return;
        pidRef.current = e.pointerId;
        // گارد: برخی مرورگرها/پوینترهای غیرفعال capture را رد می‌کنند — ردیابی با move ادامه دارد
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
        update(e);
      }}
      onPointerMove={(e) => {
        if (e.pointerId !== pidRef.current) return;
        update(e);
      }}
      onPointerUp={(e) => {
        if (e.pointerId !== pidRef.current) return;
        pidRef.current = null;
        setVec(0, 0);
      }}
      onPointerCancel={() => {
        pidRef.current = null;
        setVec(0, 0);
      }}
    >
      {/* نشانگرهای جهت */}
      <span aria-hidden className="absolute inset-x-0 top-1.5 text-center text-[9px] font-black text-white/40">
        ▲
      </span>
      <span aria-hidden className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-black text-white/40">
        ▼
      </span>
      {/* دستهٔ متحرک */}
      <span
        aria-hidden
        ref={knobRef}
        className="absolute left-1/2 top-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/25 shadow-lg transition-transform duration-75 ease-out"
      />
    </div>
  );
}
