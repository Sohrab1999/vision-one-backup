/**
 * زیرساخت KPI داشبورد بازی‌ها (docs/games-kpi.md) — سمت سرور.
 *
 * فاز پیگیری G6-03: لاگ چرخشی روزانه (پیش‌نیاز K1/K2) + تجمیع K1/K2/K3 از
 * رویدادهای `POST /api/client-log` که به‌صورت یک خط JSON در dev.log (و
 * آرشیوهای dev.log.*.gz) می‌نشینند.
 *
 * قالب هر خط: {"t":"ISO","route":"client-log","event":"log","message":"game_session_start",
 *              "url":"","extra":{"game":"memory","level":"1:6","duration":"84","reason":"finish","wrong":"3"}}
 *
 * قواعد: هیچ PII پردازش/ذخیره نمی‌شود؛ فقط شمارش‌ها و مدت‌های رُند.
 */

import { copyFileSync, closeSync, openSync, readFileSync, readSync, readdirSync, statSync, truncateSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";

const LOG_PATH = join(process.cwd(), "dev.log");
/** سقف خواندن دُم فایل زنده — جلوگیری از OOM روی لاگ خیلی بزرگ */
const MAX_TAIL_BYTES = 48 * 1024 * 1024;
/** نگه‌داری آخرین N آرشیو چرخش */
const KEEP_ARCHIVES = 7;

export interface ClientLogEvent {
  t?: string;
  route?: string;
  event?: string;
  message?: string;
  extra?: {
    game?: string;
    level?: string;
    duration?: string;
    reason?: string;
    wrong?: string;
  };
}

function parseLine(raw: string, sinceMs: number, out: ClientLogEvent[]): void {
  const line = raw.trim();
  if (line.length === 0 || line[0] !== "{") return; // خطوط لاگ Next/_prisma نادیده گرفته می‌شوند
  try {
    const e = JSON.parse(line) as ClientLogEvent;
    if (e.route !== "client-log") return;
    if (!e.t || !e.message) return;
    const ts = Date.parse(e.t);
    if (!Number.isFinite(ts) || ts < sinceMs) return;
    out.push(e);
  } catch {
    /* خط ناقص — ساکت رد می‌شود */
  }
}

/** خواندن رویدادهای client-log از آرشیوهای فشرده + دم فایل زنده */
export function readClientLogEvents(sinceMs: number): ClientLogEvent[] {
  const out: ClientLogEvent[] = [];

  // ۱) آرشیوهای gz (ترتیب نام = ترتیب زمانی به‌خاطر stamp)
  try {
    const archives = readdirSync(process.cwd())
      .filter((f) => /^dev\.log\..+\.log\.gz$/.test(f))
      .sort();
    for (const f of archives) {
      try {
        const text = gunzipSync(readFileSync(join(process.cwd(), f))).toString("utf8");
        for (const line of text.split("\n")) parseLine(line, sinceMs, out);
      } catch {
        /* آرشیو خراب — نادیده گرفته می‌شود */
      }
    }
  } catch {
    /* بدون آرشیو */
  }

  // ۲) فایل زنده — اگر خیلی بزرگ شد فقط دُم خوانده می‌شود
  try {
    const st = statSync(LOG_PATH);
    if (st.size > MAX_TAIL_BYTES) {
      const fd = openSync(LOG_PATH, "r");
      try {
        const buf = Buffer.alloc(MAX_TAIL_BYTES);
        readSync(fd, buf, 0, MAX_TAIL_BYTES, st.size - MAX_TAIL_BYTES);
        let text = buf.toString("utf8");
        const firstNl = text.indexOf("\n");
        if (firstNl >= 0) text = text.slice(firstNl + 1); // خط ناقص ابتدا حذف
        for (const line of text.split("\n")) parseLine(line, sinceMs, out);
      } finally {
        closeSync(fd);
      }
    } else {
      const text = readFileSync(LOG_PATH, "utf8");
      for (const line of text.split("\n")) parseLine(line, sinceMs, out);
    }
  } catch {
    /* لاگ موجود نیست */
  }

  return out;
}

export interface DayCount {
  date: string;
  starts: number;
}

export interface GameRow {
  game: string;
  starts: number;
  ends: number;
  abandons: number;
  srsWrong: number;
}

/** K3 به تفکیک سطح/اسکوپ — فقط رویدادهای دارای extra.level */
export interface KpiLevelRow {
  level: string;
  seeds: number;
  wrongSum: number;
}

export interface KpiAggregate {
  generatedAt: string;
  windowDays: number;
  since: string;
  /** K1 — بازگشت روزانه */
  k1: { sessionsByDay: DayCount[]; totalStarts: number };
  /** K2 — تکمیل جلسه */
  k2: {
    starts: number;
    ends: number;
    abandons: number;
    abandonRatio: number | null;
    medianDurationSec: number | null;
  };
  /** K3 — حلقهٔ یادگیری (رویداد game_srs_seed) */
  k3: { seedEvents: number; wrongSum: number; byLevel: KpiLevelRow[] };
  perGame: GameRow[];
}

function dayKeyOf(iso: string): string {
  return iso.slice(0, 10);
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

/** تجمیع K1/K2/K3 برای پنجرهٔ N روز اخیر */
export function aggregateKpi(windowDays: number): KpiAggregate {
  const days = Math.min(90, Math.max(1, Math.floor(windowDays) || 7));
  const sinceMs = Date.now() - days * 86_400_000;
  const events = readClientLogEvents(sinceMs);

  const byDay = new Map<string, number>();
  const perGame = new Map<string, GameRow>();
  const k3ByLevel = new Map<string, KpiLevelRow>();
  let starts = 0;
  let ends = 0;
  let abandons = 0;
  let seedEvents = 0;
  let wrongSum = 0;
  const durations: number[] = [];

  const rowOf = (game: string): GameRow => {
    let r = perGame.get(game);
    if (!r) {
      r = { game, starts: 0, ends: 0, abandons: 0, srsWrong: 0 };
      perGame.set(game, r);
    }
    return r;
  };

  for (const e of events) {
    const day = dayKeyOf(e.t ?? "");
    const game = e.extra?.game ?? "";
    const row = game ? rowOf(game) : null;
    switch (e.message) {
      case "game_session_start": {
        starts += 1;
        byDay.set(day, (byDay.get(day) ?? 0) + 1);
        if (row) row.starts += 1;
        break;
      }
      case "game_session_end": {
        ends += 1;
        if (row) row.ends += 1;
        const d = Number(e.extra?.duration);
        if (Number.isFinite(d) && d > 0) durations.push(d);
        break;
      }
      case "game_session_abandon": {
        abandons += 1;
        if (row) row.abandons += 1;
        const d = Number(e.extra?.duration);
        if (Number.isFinite(d) && d > 0) durations.push(d);
        break;
      }
      case "game_srs_seed": {
        seedEvents += 1;
        const w = Number(e.extra?.wrong);
        const wrong = Number.isFinite(w) && w > 0 ? Math.floor(w) : 0;
        wrongSum += wrong;
        if (row) row.srsWrong += wrong;
        // K3 به تفکیک سطح/اسکوپ (پوشش از Task 12 — بازی‌های دارای برچسب level)
        const lvl = (e.extra?.level ?? "").trim();
        if (lvl) {
          let lr = k3ByLevel.get(lvl);
          if (!lr) {
            lr = { level: lvl, seeds: 0, wrongSum: 0 };
            k3ByLevel.set(lvl, lr);
          }
          lr.seeds += 1;
          lr.wrongSum += wrong;
        }
        break;
      }
      default:
        break;
    }
  }

  const sessionsByDay: DayCount[] = [...byDay.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, starts: count }));

  return {
    generatedAt: new Date().toISOString(),
    windowDays: days,
    since: new Date(sinceMs).toISOString(),
    k1: { sessionsByDay, totalStarts: starts },
    k2: {
      starts,
      ends,
      abandons,
      abandonRatio: starts > 0 ? Math.round((abandons / starts) * 1000) / 1000 : null,
      medianDurationSec: median(durations),
    },
    k3: {
      seedEvents,
      wrongSum,
      byLevel: [...k3ByLevel.values()].sort((a, b) => b.wrongSum - a.wrongSum).slice(0, 50),
    },
    perGame: [...perGame.values()].sort((a, b) => b.starts - a.starts),
  };
}

/**
 * چرخش in-process با الگوی copytruncate — `tee` با O_APPEND می‌نویسد پس
 * truncate کردن فایل زنده امن است. فقط وقتی حجم از آستانه گذشت.
 * خروجی: نام آرشیو ساخته‌شده یا null (چرخشی انجام نشد).
 */
export function rotateLogIfNeeded(maxBytes = 8 * 1024 * 1024): string | null {
  try {
    const st = statSync(LOG_PATH);
    if (st.size <= maxBytes) return null;
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const plain = join(process.cwd(), `dev.log.${stamp}.log`);
    const gz = `${plain}.gz`;
    copyFileSync(LOG_PATH, plain);
    writeFileSync(gz, gzipSync(readFileSync(plain)));
    unlinkSync(plain);
    truncateSync(LOG_PATH, 0);
    // هرس آرشیوهای قدیمی — KEEP_ARCHIVES آخر می‌ماند
    const archives = readdirSync(process.cwd())
      .filter((f) => /^dev\.log\..+\.log\.gz$/.test(f))
      .sort()
      .reverse();
    for (const f of archives.slice(KEEP_ARCHIVES)) {
      try {
        unlinkSync(join(process.cwd(), f));
      } catch {
        /* هرس هرگز جریان را نمی‌شکند */
      }
    }
    return gz.split("/").pop() ?? gz;
  } catch {
    return null;
  }
}
