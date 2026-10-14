"use client";

/**
 * los — هستهٔ خالص «خط دید» (فاز U3-00 — نقشهٔ docs/fps-upgrade-roadmap.md §U3).
 *
 * مانند enemy.ts و cage.ts: صفر وابستگی به React/THREE — فقط ریاضیات. تست
 * «آیا بین دو نقطه سازه‌ای سد می‌شود؟» با slab method پاره‌خط↔AABB روی جعبه‌های
 * چیدمان نقشه (LayoutBox) انجام می‌شود — نه THREE.Raycaster (قابل تست، تخصیص صفر،
 * سازگار با فریز — ADR-004). جعبه‌های دکور (solid:false) و جعبهٔ حاوی مبدأ
 * (ضدگرفتار پهپادِ داخل دیوار) رد می‌شوند؛ رندر و مصرف در scene/drone.tsx.
 *
 * قوانین سخت §U3 اینجا: ② LOS = ریاضی خالص · جعبه‌ها بر اساس ارتفاع واقعی
 * (y پایه + h) سد می‌کنند — خم‌شدن پشت کیسهٔ شنی و جعبه کوتاه هم کار می‌کند.
 */

import type { LayoutBox } from "./layouts";

/** مبدأ پاره‌خط داخل footprint سه‌بعدی این جعبه است؟ (چشم پهپاد داخل دیوار = رد) */
function originInside(b: LayoutBox, x: number, y: number, z: number): boolean {
  const y0 = b.y ?? 0;
  return (
    x > b.x - b.w / 2 &&
    x < b.x + b.w / 2 &&
    z > b.z - b.d / 2 &&
    z < b.z + b.d / 2 &&
    y > y0 &&
    y < y0 + b.h
  );
}

/**
 * آیا از (ax,ay,az) به (bx,by,bz) دیدِ بدون مانع هست؟
 * برای هر جعبهٔ جامد، پاره‌خط در سه محور با جعبه (AABB واقعی: x±w/2 · y0..y0+h · z±d/2)
 * تست slab می‌شود؛ نخستین مسدودگر = نابینا. ورود پاره‌خط باید داخل (0,1) باشد
 * (برخورد مماسیِ پشت مبدأ/پس از مقصد سد نیست). تخصیص صفر — فراخوانی هر فریم.
 */
export function hasLineOfSight(
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  boxes: LayoutBox[],
): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const dz = bz - az;
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (b.solid === false) continue; // دکور (طاق/لینتل/لنگهٔ باز) سد نیست
    if (originInside(b, ax, ay, az)) continue; // مبدأ داخل جعبه — آن جعبه سد نیست
    const y0 = b.y ?? 0;
    // slab سه‌محوره — t0 ورود / t1 خروج پاره‌خط در جعبه
    let t0 = 0;
    let t1 = 1;
    let hit = true;
    // محور x
    if (Math.abs(dx) < 1e-9) {
      if (ax < b.x - b.w / 2 || ax > b.x + b.w / 2) hit = false;
    } else {
      let ta = (b.x - b.w / 2 - ax) / dx;
      let tb = (b.x + b.w / 2 - ax) / dx;
      if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
      if (ta > t0) t0 = ta;
      if (tb < t1) t1 = tb;
      if (t0 > t1) hit = false;
    }
    // محور y
    if (hit) {
      if (Math.abs(dy) < 1e-9) {
        if (ay < y0 || ay > y0 + b.h) hit = false;
      } else {
        let ta = (y0 - ay) / dy;
        let tb = (y0 + b.h - ay) / dy;
        if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
        if (ta > t0) t0 = ta;
        if (tb < t1) t1 = tb;
        if (t0 > t1) hit = false;
      }
    }
    // محور z
    if (hit) {
      if (Math.abs(dz) < 1e-9) {
        if (az < b.z - b.d / 2 || az > b.z + b.d / 2) hit = false;
      } else {
        let ta = (b.z - b.d / 2 - az) / dz;
        let tb = (b.z + b.d / 2 - az) / dz;
        if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
        if (ta > t0) t0 = ta;
        if (tb < t1) t1 = tb;
        if (t0 > t1) hit = false;
      }
    }
    if (hit && t0 > 0 && t0 < 1) return false; // مسدودگر داخل پاره‌خط
  }
  return true;
}
