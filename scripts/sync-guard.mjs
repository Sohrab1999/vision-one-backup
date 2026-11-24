#!/usr/bin/env bun
// ─────────────────────────────────────────────────────────────────────────────
// sync-guard.mjs — سدّ ضدحذف کتاب‌ها (ضد عقب‌ماندگی Sandbox از Remote)
//
// چرا وجود دارد (فرمان مالک ۲۰۲۶-۱۱-۱۵ — «این کتاب‌های VIU خیلی حذف شدن؛ یه جوری
// ثبت کن دیگه حذف نشن» — ثبت در docs/SNAPSHOT.md + worklog):
//   ده بار تکرار شد که Sandbox به یک کامیت کهنه برمی‌گردد و در نگاه مالک
//   «کتاب‌ها حذف شده‌اند» — درحالی‌که همهٔ داده‌ها بی‌کاستی روی Remote
//   (backup/main) محفوظ بوده‌اند. الگوی بازیابی اثبات‌شدهٔ رویدادهای ۶..۱۰
//   (docs/SNAPSHOT.md §۱۱) این بود:
//     ۱) fetch  ۲) مقایسهٔ divergence  ۳) اگر محلی فقط عقب است → ff-only merge
//   این اسکریپت همان الگو را خودکار می‌کند — با مرزهای ایمنی زیر:
//
//   ⛔ هرگز reset / rebase / force-push / force-checkout انجام نمی‌دهد.
//   ⛔ اگر درخت کاریِ فایل‌های tracked تغییرناگهانی داشته باشد، دست نمی‌زند
//      (فقط گزارش می‌دهد و exit 1).
//   ⛔ اگر فایل untracked با نسخهٔ Remote همسان نباشد، دست نمی‌زند
//      (ممکن است کار جدید محلی باشد که نباید از بین برود).
//   ✅ اگر محلی «فقط عقب» باشد (۰ جلو / N عقب) و مانعی نباشد → ff-only merge.
//   ✅ اگر محلی «فقط جلو» باشد (کامیت بدون push — یعنی هوک auto-push شکست
//      خورده) → push معمولی (بدون force) تلاش می‌کند.
//   ✅ اگر همه‌چیز هم‌گام است (۰/۰) → هیچ کاری نمی‌کند.
//
// کاربرد مستقیم:
//   bun scripts/sync-guard.mjs            ← بررسی + ترمیم + گزارش JSON-like
//   bun scripts/sync-guard.mjs --check    ← فقط بررسی، بدون هیچ تغییری
// ─────────────────────────────────────────────────────────────────────────────
import { execSync, execFileSync } from "node:child_process";
import path from "node:path";

const cwd = path.resolve(import.meta.dir, "..");
const CHECK_ONLY = process.argv.includes("--check");

function sh(cmd, opts = {}) {
  return execSync(cmd, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts,
  }).trim();
}

function log(...parts) {
  console.log(`[sync-guard ${new Date().toISOString()}]`, ...parts);
}

// ۱) شاخهٔ فعلی فقط main باشد (سایر شاخه‌ها دست نمی‌خورند)
let branch = "";
try {
  branch = sh("git rev-parse --abbrev-ref HEAD");
} catch {
  log("FAIL: not a git repository");
  process.exit(1);
}
if (branch !== "main") {
  log(`SKIP: branch=${branch} (guard only manages main)`);
  process.exit(0);
}

// ۲) fetch
try {
  sh("git fetch backup --prune", { timeout: 60000 });
} catch (e) {
  log(`WARN: fetch failed (${String(e).slice(0, 120)}) — بدون تغییر خارج می‌شوم`);
  process.exit(0); // شبکهٔ قطع نباید سرور dev را بلاتکلیف بگذارد
}

const head = sh("git rev-parse HEAD");
const remote = sh("git rev-parse backup/main");
const [ahead, behind] = sh(
  "git rev-list --left-right --count main...backup/main"
).split("\t");

log(`branch=main HEAD=${head.slice(0, 7)} remote=${remote.slice(0, 7)} divergence=${ahead}/${behind}`);

if (head === remote) {
  log("OK: in sync (۰/۰)");
  process.exit(0);
}

// ۳) فقط جلو → کامیتِ push‌نشده (شکست هوک auto-push) → push معمولی
if (Number(ahead) > 0 && Number(behind) === 0) {
  log(`AHEAD: ${ahead} commit بدون push — هوک auto-push احتمالاً شکست خورده`);
  if (CHECK_ONLY) process.exit(1);
  try {
    execFileSync("git", ["push", "backup", "main"], { cwd, stdio: "pipe", timeout: 120000 });
    log("OK: push معمولی (بدون force) موفق — حالا هم‌گام");
    process.exit(0);
  } catch (e) {
    log(`FAIL: push ناموفق (${String(e).slice(0, 160)}) — دستی رسیدگی شود`);
    process.exit(1);
  }
}

// ۴) فقط عقب → همان الگوی بازیابی رویدادهای ۶..۱۰
if (Number(ahead) === 0 && Number(behind) > 0) {
  // ۴-الف) فایل‌های tracked نباید تغییر محلی داشته باشند
  const dirty = sh("git status --porcelain").split("\n").filter(Boolean)
    .filter((l) => !l.startsWith("??"));
  if (dirty.length > 0) {
    log(`FAIL: ${dirty.length} فایل tracked تغییر محلی دارد — ff خودکار انجام نمی‌شود. ردیف‌ها:`);
    dirty.slice(0, 20).forEach((l) => log("   dirty:", l));
    process.exit(1);
  }

  // ۴-ب) untracked ها فقط وقتی مجاز به حذف‌اند که بایت‌به‌بیت عین نسخهٔ Remote باشند
  const untracked = sh("git status --porcelain").split("\n")
    .filter((l) => l.startsWith("??"))
    .map((l) => l.slice(3).trim().replace(/^"|"$/g, ""));
  const foreign = [];
  for (const f of untracked) {
    let remoteHash = "";
    try {
      remoteHash = sh(`git rev-parse "backup/main:${f}"`);
    } catch {
      remoteHash = ""; // در Remote نیست — فایل جدید محلی؛ حذف نمی‌شود
    }
    if (remoteHash) {
      const localHash = sh(`git hash-object "${f}"`);
      if (localHash !== remoteHash) foreign.push(f);
    }
    // اگر در Remote نیست → فایل کاملاً جدید محلی است → نگه داشته می‌شود؛
    // ff-only آن را لمس نمی‌کند (تا مسیرش در Remote نباشد).
  }
  // اما مسیر untracked که در Remote هست باید پیش از merge برداشته شود
  const identical = [];
  for (const f of untracked) {
    let remoteHash = "";
    try {
      remoteHash = sh(`git rev-parse "backup/main:${f}"`);
    } catch {
      continue;
    }
    const localHash = sh(`git hash-object "${f}"`);
    if (localHash === remoteHash) identical.push(f);
  }
  if (foreign.length > 0) {
    log(`FAIL: ${foreign.length} فایل untracked با Remote همسان نیست — دست نمی‌زنم. فایل‌ها:`);
    foreign.forEach((f) => log("   foreign:", f));
    process.exit(1);
  }

  if (CHECK_ONLY) {
    log(`CHECK-ONLY: می‌شد ff-only به ${remote.slice(0, 7)} (عقب‌ماندگی ${behind} کامیت)`);
    process.exit(1);
  }

  for (const f of identical) {
    try {
      sh(`rm -- "${f}"`);
      log(`removed identical untracked: ${f}`);
    } catch {
      log(`WARN: could not remove ${f}`);
    }
  }

  try {
    sh("git merge --ff-only backup/main");
    log(`OK: ff-only merge انجام شد → ${sh("git rev-parse HEAD").slice(0, 7)} = Remote`);
    process.exit(0);
  } catch (e) {
    log(`FAIL: ff-only merge ناموفق (${String(e).slice(0, 160)}) — دستی رسیدگی شود`);
    process.exit(1);
  }
}

// ۵) واگرایی دوطرفه → گزارش بلند، بدون هیچ تغییری
log(`FAIL: واگرایی دوطرفه (${ahead} جلو / ${behind} عقب) — طبق قاعدهٔ پروژه صفر reset/rebase/force؛ رسیدگی دستی لازم است`);
process.exit(1);
