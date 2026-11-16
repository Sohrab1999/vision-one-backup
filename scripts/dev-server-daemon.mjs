#!/usr/bin/env bun
// ─────────────────────────────────────────────────────────────────────────────
// dev-server-daemon.mjs — ابزار عملیاتی بازیابی (بدون تأثیر محصولی — هیچ ماژولی آن را import نمی‌کند)
//
// چرا وجود دارد (ثبت‌شده در docs/SNAPSHOT.md — سربرگ ۵۴مین — ۲۰۲۶-۱۱-۱۰):
//   فرایندهای پس‌زمینهٔ spawn‌شده از نشست ابزار Bash در محیط Sandbox، پس از پایان
//   فرمانِ spawn‌کننده (~۳۰ ثانیه) جمع می‌شوند — حتی با setsid/nohup/disown
//   (آزمون کنترلی: `sleep 300` مُرد؛ دیمن الگوی agent-browser زنده ماند).
//   این اسکریپت با الگوی detach واقعی (spawn + detached + unref + خروج فوری والد)
//   سرور dev را طوری بالا می‌آورد که از جمع‌شدن جان سالم به‌در بَرَد.
//
// کاربرد (پس از Reset سندباکس یا هر بار که سرور dev با دادهٔ قدیمی بالا مانده):
//   bun scripts/dev-server-daemon.mjs bun run dev
//   # یا هر فرمان دیگری:
//   bun scripts/dev-server-daemon.mjs <cmd> [args...]
//
// سدّ ضدحذف (فرمان مالک ۲۰۲۶-۱۱-۱۵ — «دیگه حذف نشن»): پیش از هر راه‌اندازی،
//   scripts/sync-guard.mjs اجرا می‌شود تا اگر Sandbox عقب از Remote بود، با همان
//   الگوی ff-only اثبات‌شدهٔ رویدادهای بازیابی ۶..۱۰ خودکار ترمیم شود (بدون
//   reset/rebase/force — جزئیات و مرزهای ایمنی در سربرگ آن اسکریپت).
//
// نشانهٔ مشکل معروف: `GET /api/questions?meta=1&book=viu-elem` = {total:0}
//   در حالی که db (hash `d34dc416…`) ۲۳۶ سؤال دارد ⇒ سرور dev قدیمی است ⇒ restart.
// ─────────────────────────────────────────────────────────────────────────────
import { spawn, spawnSync } from "node:child_process";
import { openSync } from "node:fs";
import path from "node:path";

const cmd = process.argv[2];
if (!cmd) {
  console.error("usage: bun scripts/dev-server-daemon.mjs <cmd> [args...]");
  process.exit(2);
}
const args = process.argv.slice(3);
const cwd = path.resolve(import.meta.dir, "..");
const out = openSync(path.join(cwd, "dev.log"), "a");

// سدّ ضدحذف — پیش از هر راه‌اندازی سرور، همگامی با Remote راستی‌آزمایی و ترمیم می‌شود
const guard = spawnSync("bun", [path.join(import.meta.dir, "sync-guard.mjs")], {
  cwd,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
  timeout: 180000,
});
const guardOut = (guard.stdout || "") + (guard.stderr || "");
if (guardOut.trim()) console.log(guardOut.trim());
if (guard.status !== 0 && guard.status !== null) {
  console.error(
    `[dev-server-daemon] sync-guard exit=${guard.status} — راه‌اندازی ادامه می‌یابد ولی همگامی راستی‌آزمایی نشد؛ خروجی کامل در dev.log`
  );
  out.write(`[dev-server-daemon] sync-guard exit=${guard.status}\n${guardOut}\n`);
}

const child = spawn(cmd, args, {
  cwd,
  detached: true,
  stdio: ["ignore", out, out],
});
child.unref();
console.log(`daemon pid: ${child.pid} (cwd=${cwd}) — log: dev.log`);
