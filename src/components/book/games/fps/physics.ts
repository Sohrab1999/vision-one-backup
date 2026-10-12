"use client";

import * as THREE from "three";
import { MOVE_SPEED, SPRINT_MULT, CROUCH_MULT, CROUCH_EYE, ACCEL, STOP_ACCEL, JUMP_V, GRAVITY, SPRINT_FOV_KICK, SPRINT_SPEED_RATIO, SCOPE_FOV_RATIO, SCOPE_FOV_MIN, SCOPE_FOV_MAX } from "./constants";
import { clamp } from "./helpers";
import type { MapLayout } from "./layouts";
import type { SceneBridge } from "./types";

// ── فاز F7/F10 — برخورد بازیکن با سازه‌های چیدمان نقشه ──

/** شعاع برخورد بازیکن (متر) */
export const PLAYER_R = 0.34;

/**
 * فاز F10 — برخورد دایرهٔ بازیکن با AABB سازه‌ها (دو گذر برای گوشه‌ها) — جهش درجا روی pos.
 * سازهٔ کوتاه (h ≤ 1.1) حین اوج پرش قابل عبور است (پرش روی جعبه/کیسهٔ شنی)؛
 * دیوارهای بلند همیشه جامدند. فضای جهان ↔ آفست دوربین با baseZ جبران می‌شود.
 */
export function resolveWorld(pos: { x: number; z: number }, baseZ: number, layout: MapLayout, jumpY: number): void {
  const wz = baseZ + pos.z; // z بازیکن در فضای جهان
  for (let pass = 0; pass < 2; pass++) {
    for (const bx of layout.boxes) {
      if (bx.solid === false) continue;
      if (bx.h <= 1.1 && jumpY > bx.h - 0.3) continue; // پرش روی مانع کوتاه
      const hx = bx.w / 2 + PLAYER_R;
      const hz = bx.d / 2 + PLAYER_R;
      const dx = pos.x - bx.x;
      const dz = wz - bx.z;
      if (Math.abs(dx) < hx && Math.abs(dz) < hz) {
        const px = hx - Math.abs(dx);
        const pz = hz - Math.abs(dz);
        if (px < pz) pos.x = bx.x + Math.sign(dx || 1) * hx;
        else pos.z = bx.z + Math.sign(dz || 1) * hz - baseZ;
      }
    }
  }
}

/**
 * فاز F3 → فاز F10 — موتور حرکت نرم FPS:
 * ① شتاب/ترمز نمایی مستقل از فریم‌ریت (ضدلرزش — پایان حرکت پرشی نیست)
 * ② دویدن (Shift)، خم‌شدن (C)، پرش با گرانش (Space)
 * ③ برخورد با سازه‌های نقشه در دو ساب‌استپ (بدون رد شدن از دیوار در فریم‌های سنگین)
 * خروجی: سرعت افقی واقعی (متر بر ثانیه) — برای باب سر هماهنگ با گام.
 */
export function stepPlayer(b: SceneBridge, dt: number): number {
  let mx = 0;
  let mz = 0;
  if (b.keys.has("w")) mz += 1;
  if (b.keys.has("s")) mz -= 1;
  if (b.keys.has("d")) mx += 1;
  if (b.keys.has("a")) mx -= 1;
  // فاز F4 — ورودی آنالوگ جوی‌استیک لمسی (سرعت متناسب با کمان کشیدن)
  mx += b.stick.x;
  mz += b.stick.y;
  let mag = Math.hypot(mx, mz);
  const moving = mag > 0.12; // deadzone — لرزش انگشت حرکت کاذب نمی‌سازد
  if (moving) {
    if (mag > 1) {
      mx /= mag;
      mz /= mag;
      mag = 1;
    }
  }
  const crouching = b.keys.has("c");
  const speed =
    MOVE_SPEED * (b.sprint && !crouching ? SPRINT_MULT : 1) * (crouching ? CROUCH_MULT : 1);
  // سرعت هدف — جلو = −z محلی؛ راست = +x محلی — بدون pitch (گام زمینی)
  const yaw = b.aim.yaw;
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);
  const vx = -sin * mz + cos * mx;
  const vz = -cos * mz - sin * mx;
  const len = Math.hypot(vx, vz) || 1;
  const tvx = moving ? (vx / len) * speed * mag : 0;
  const tvz = moving ? (vz / len) * speed * mag : 0;
  // ① شتاب/ترمز نمایی — حرکت از جا نپرد و نایستد
  const kA = 1 - Math.exp(-dt * (moving ? ACCEL : STOP_ACCEL));
  b.vel.x += (tvx - b.vel.x) * kA;
  b.vel.z += (tvz - b.vel.z) * kA;
  // ② پرش با گرانش
  if (b.wantJump) {
    b.wantJump = false;
    if (b.jumpY <= 0.001 && b.vy <= 0) b.vy = JUMP_V;
  }
  if (b.vy !== 0 || b.jumpY > 0) {
    b.vy -= GRAVITY * dt;
    b.jumpY += b.vy * dt;
    if (b.jumpY <= 0) {
      b.jumpY = 0;
      b.vy = 0;
    }
  }
  // خم‌شدن هموار
  const cTarget = crouching ? 1 : 0;
  b.crouchAmt += (cTarget - b.crouchAmt) * Math.min(1, dt * 9);
  // ③ انتگرال + برخورد + محدوده (ساب‌استپ برای برخورد پایدار)
  const layout = b.layout;
  const baseZ = 7 + (1 - b.laneK) * 4.2;
  const steps = dt > 0.028 ? 2 : 1;
  const sdt = dt / steps;
  for (let s = 0; s < steps; s++) {
    b.pos.x = clamp(b.pos.x + b.vel.x * sdt, layout.minX, layout.maxX);
    b.pos.z = clamp(b.pos.z + b.vel.z * sdt, layout.minZ - baseZ, layout.maxZ - baseZ);
    resolveWorld(b.pos, baseZ, layout, b.jumpY);
  }
  const spd = Math.hypot(b.vel.x, b.vel.z);
  b.moveMag = clamp(spd / MOVE_SPEED, 0, 1.5);
  // فاز F10 — کیک FOV دویدن: فقط وقتی واقعاً تندتر از گام عادی حرکت می‌کنی (هموارشده)
  const kickT = spd > MOVE_SPEED * SPRINT_SPEED_RATIO ? SPRINT_FOV_KICK : 0;
  b.speedKick += (kickT - b.speedKick) * Math.min(1, dt * 7);
  return spd;
}

/** به‌روزرسانی ترنسفورم دوربین اول‌شخص — تابع ماژول‌سطح (جهش THREE فقط از اینجا) */
export function applyRig(cam: THREE.Camera, b: SceneBridge, aspect: number, bobY: number): void {
  b.laneK = Math.max(0.55, Math.min(1, aspect / 1.5));
  const baseZ = 7 + (1 - b.laneK) * 4.2;
  cam.position.x = b.pos.x;
  cam.position.z = baseZ + b.pos.z;
  // فاز F10 — ارتفاع چشم = پایه − خم‌شدن + پرش + باب گام
  cam.position.y = 1.7 - b.crouchAmt * CROUCH_EYE + b.jumpY + bobY;
  cam.rotation.y = b.aim.yaw;
  cam.rotation.x = b.aim.pitch;
}

/** تنظیم اولیهٔ دوربین — تابع ماژول‌سطح */
export function initRig(cam: THREE.Camera): void {
  cam.position.set(0, 1.7, 7);
  cam.rotation.order = "YXZ";
}

/** فاز F5 — اعمال زاویهٔ دید روی دوربین — تابع ماژول‌سطح (قاعدهٔ immutability کیت) */
export function applyFov(cam: THREE.Camera, fov: number): void {
  const c = cam as THREE.PerspectiveCamera;
  if (c.fov !== fov) {
    c.fov = fov;
    c.updateProjectionMatrix();
  }
}

/** فاز F5 — زاویهٔ دید زنده + فاز F9 — اسکوپ + فاز F10 — کیک FOV دویدن: لِرپ نرم FOV */
export function applyScope(cam: THREE.Camera, b: SceneBridge, fov: number, scoped: boolean, dt: number, amt: { v: number }): void {
  const target = scoped ? 1 : 0;
  amt.v += (target - amt.v) * Math.min(1, dt * 11);
  const a = amt.v < 0.001 ? 0 : amt.v;
  b.scopeAmt = a;
  const base = fov + b.speedKick;
  const zoomed = clamp(base * SCOPE_FOV_RATIO, SCOPE_FOV_MIN, SCOPE_FOV_MAX);
  applyFov(cam, base + (zoomed - base) * a);
}

