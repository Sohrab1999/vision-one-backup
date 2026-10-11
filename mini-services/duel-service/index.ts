/**
 * دوئل آنلاین ۱ به ۱ — مینی‌سرویس Realtime (Task G4-02 فاز G4 نقشه راه بازی‌ها).
 *
 * قراردادها:
 * - پورت ۳۰۰۳ هاردکد؛ path: '/' دست‌نخورده (Caddy با XTransformPort فوروارد می‌کند)
 * - مدل اتاق در حافظه (in-memory): کد ۴رقمی یکتا، حداکثر ۲ بازیکن، بستهٔ سؤال از میزبان
 * - پاسخ سؤال‌ها هرگز به کلاینت فرستاده نمی‌شود تا زمان reveal/پایان (بدون لو رفتن کلید)
 * - تایمر ۱۵ ثانیه‌ای هر سؤال سمت سرور اعمال می‌شود؛ امتیاز: ۱۰ پایه + پاداش سرعت تا +۵
 * - قطعی حین بازی: ۶۰ ثانیه مهلت rejoin با playerId — امتیازها حفظ می‌شود
 * - همهٔ پیام‌های کاربر-مواجه فارسی است.
 */

import { createServer } from "http";
import { Server, type Socket } from "socket.io";

// ─── ثابت‌ها ───

const PORT = 3003; // هاردکد طبق نقشه راه — Caddy با XTransformPort=3003 فوروارد می‌کند
const QUESTION_MS = 15_000; // مدت هر سؤال
const REVEAL_MS = 2_000; // مکث نمایش پاسخ درست بین سؤال‌ها
const GRACE_MS = 60_000; // مهلت rejoin بعد از قطعی
const MAX_PLAYERS = 2;
const BASE_SCORE = 10; // امتیاز پایه پاسخ درست
const MAX_BONUS = 5; // حداکثر پاداش سرعت
const MAX_PACK = 30;
const MAX_ROOMS = 300;
const CODE_TTL_LOBBY_MS = 30 * 60_000; // اتاق بی‌فعال لابی
const CODE_TTL_ENDED_MS = 15 * 60_000; // اتاق تمام‌شده
const CLEANUP_INTERVAL_MS = 15_000;

// ── فاز G5-03 — ربات داخلی تطبیقی (قاعده‌محور، بدون AI و بدون socket واقعی) ──
/** پایهٔ مهارت ربات (همان ۶۵٪ رفتار پیش‌فرض) */
const BOT_SKILL_BASE = 0.65;
const BOT_SKILL_MIN = 0.35;
const BOT_SKILL_MAX = 0.9;
/** بازهٔ «فکر کردن» ربات (ms) — همیشه < مهلت ۱۵ث */
const BOT_THINK_MIN_MS = 2_000;
const BOT_THINK_MAX_MS = 8_000;
/** نام نمایشی ربات در لابی/تخته/finished */
const BOT_NAME = "ربات هوشمند";

// ─── تایپ‌ها ───

interface DuelQuestion {
  id: string;
  text: string;
  options: string[];
  answer: number;
}

interface Player {
  id: string;
  name: string;
  score: number;
  correct: number;
  lastDelta: number;
  lastCorrect: boolean;
  connected: boolean;
  socketId: string | null;
  disconnectedAt: number | null;
  /** فاز G5-03 — ربات داخلی (بدون socket؛ پاسخ‌ها سمت سرور ساخته می‌شود) */
  isBot?: boolean;
  /** فاز G5-03 — احتمال پاسخ درست ربات (فقط وقتی isBot) */
  botSkill?: number;
}

interface PlayerPublic {
  id: string;
  name: string;
  score: number;
  correct: number;
  lastDelta: number;
  lastCorrect: boolean;
  connected: boolean;
  /** فاز G5-03 — افزودنی؛ فقط برای ربات داخلی true است */
  isBot?: boolean;
}

type ScoresMap = Record<string, { name: string; score: number; lastDelta: number; lastCorrect: boolean }>;

interface Room {
  code: string;
  hostId: string;
  players: Map<string, Player>;
  pack: DuelQuestion[];
  state: "lobby" | "playing" | "ended";
  currentIndex: number;
  /** سؤال باز است یا در مکث نمایش پاسخ */
  phase: "question" | "reveal";
  /** پاسخ‌های سؤال جاری — key: playerId */
  answers: Map<string, { choice: number; correct: boolean; delta: number }>;
  current: { index: number; total: number; text: string; options: string[]; endsAt: number; serverNow: number } | null;
  revealAnswer: number | null;
  questionTimer: ReturnType<typeof setTimeout> | null;
  revealTimer: ReturnType<typeof setTimeout> | null;
  graceTimer: ReturnType<typeof setTimeout> | null;
  /** فاز G5-03 — تایمر «فکر کردن» ربات داخلی */
  botTimer: ReturnType<typeof setTimeout> | null;
  startedAt: number | null;
  createdAt: number;
  lastActivity: number;
}

const rooms = new Map<string, Room>();
/** socketId → نشست فعلی داخل اتاق */
const socketToRoom = new Map<string, { code: string; playerId: string }>();

// ─── کمکی‌ها ───

function now(): number {
  return Date.now();
}

function touch(room: Room): void {
  room.lastActivity = now();
}

function newPlayerId(): string {
  return `p${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function generateCode(): string {
  for (let i = 0; i < 500; i++) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    if (!rooms.has(code)) return code;
  }
  return String(Date.now() % 10000).padStart(4, "0");
}

function sanitizeName(raw: unknown): string {
  const s = typeof raw === "string" ? raw.trim().replace(/\s+/g, " ").slice(0, 24) : "";
  return s.length > 0 ? s : "مهمان";
}

/** پالایش بستهٔ سؤال میزبان — خروجی تمیز و سالم؛ null = نامعتبر */
function sanitizePack(raw: unknown): DuelQuestion[] | null {
  if (!Array.isArray(raw)) return null;
  const out: DuelQuestion[] = [];
  for (const item of raw.slice(0, MAX_PACK)) {
    if (!item || typeof item !== "object") continue;
    const q = item as Record<string, unknown>;
    const text = typeof q.text === "string" ? q.text.trim().slice(0, 400) : "";
    const options = Array.isArray(q.options)
      ? q.options.filter((o): o is string => typeof o === "string" && o.trim().length > 0).map((o) => o.slice(0, 120))
      : [];
    const answer = typeof q.answer === "number" && Number.isInteger(q.answer) ? q.answer : -1;
    if (!text || options.length < 2 || answer < 0 || answer >= options.length) continue;
    out.push({
      id: typeof q.id === "string" ? q.id.slice(0, 40) : `q${out.length + 1}`,
      text,
      options,
      answer,
    });
  }
  return out.length >= 1 ? out : null;
}

function playersPublic(room: Room): PlayerPublic[] {
  return [...room.players.values()].map((p) => ({
    id: p.id,
    name: p.name,
    score: p.score,
    correct: p.correct,
    lastDelta: p.lastDelta,
    lastCorrect: p.lastCorrect,
    connected: p.connected,
    ...(p.isBot ? { isBot: true } : {}),
  }));
}

/** فاز G5-03 — آیا همهٔ بازیکنانِ باقی‌ماندهٔ اتاق ربات داخلی‌اند؟ (میزبان رفته) */
function allBots(room: Room): boolean {
  return [...room.players.values()].every((p) => p.isBot === true);
}

function scoresOf(room: Room): ScoresMap {
  const out: ScoresMap = {};
  for (const p of room.players.values()) {
    out[p.id] = { name: p.name, score: p.score, lastDelta: p.lastDelta, lastCorrect: p.lastCorrect };
  }
  return out;
}

function emitToSocket(room: Room, playerId: string, event: string, payload: unknown): void {
  const p = room.players.get(playerId);
  // فاز G5-03 — ربات داخلی socket واقعی ندارد؛ ساکت رد شو (بدون لاگ نویز)
  if (!p || p.isBot) return;
  if (!p.socketId) {
    console.log(`[duel][DBG] emitToSocket ${event} → ${playerId} SKIP (no socketId)`);
    return;
  }
  const s = io.sockets.sockets.get(p.socketId);
  if (!s) {
    console.log(`[duel][DBG] emitToSocket ${event} → ${playerId} SKIP (socket ${p.socketId} not in io map)`);
    return;
  }
  console.log(`[duel][DBG] emitToSocket ${event} → ${playerId} via ${p.socketId} OK`);
  s.emit(event, payload);
}

function emitToAll(room: Room, event: string, payload: unknown): void {
  for (const p of room.players.values()) {
    emitToSocket(room, p.id, event, payload);
  }
}

/** وضعیت اتاق را به تک‌تک سوکت‌ها به‌صورت شخصی می‌فرستد (هر کدام `you` خودشان را می‌گیرند) */
function broadcastRoom(room: Room): void {
  for (const p of room.players.values()) {
    emitToSocket(room, p.id, "joined", {
      code: room.code,
      players: playersPublic(room),
      hostId: room.hostId,
      state: room.state,
      you: p.id,
    });
  }
}

function clearTimers(room: Room): void {
  if (room.questionTimer) clearTimeout(room.questionTimer);
  if (room.revealTimer) clearTimeout(room.revealTimer);
  if (room.botTimer) clearTimeout(room.botTimer);
  room.questionTimer = null;
  room.revealTimer = null;
  room.botTimer = null;
}

function deleteRoom(code: string): void {
  const room = rooms.get(code);
  if (!room) return;
  clearTimers(room);
  if (room.graceTimer) clearTimeout(room.graceTimer);
  rooms.delete(code);
  for (const [sid, ctx] of socketToRoom) {
    if (ctx.code === code) socketToRoom.delete(sid);
  }
  console.log(`[duel] room ${code} deleted`);
}

function emitError(socket: Socket, message: string): void {
  socket.emit("error", { message, fatal: true });
}

// ─── جریان سؤال ───

function startQuestion(room: Room): void {
  if (room.currentIndex >= room.pack.length) {
    finishGame(room);
    return;
  }
  clearTimers(room);
  room.state = "playing";
  room.phase = "question";
  room.revealAnswer = null;
  room.answers = new Map();
  const q = room.pack[room.currentIndex];
  const t = now();
  room.current = { index: room.currentIndex, total: room.pack.length, text: q.text, options: q.options, endsAt: t + QUESTION_MS, serverNow: t };
  touch(room);
  emitToAll(room, "question", {
    index: room.currentIndex,
    total: room.pack.length,
    text: q.text,
    options: q.options,
    endsAt: room.current.endsAt,
    serverNow: t,
  });
  // ۱۵۰ms گاری تأخیر شبکه — قضاوت نهایی با زمان انقضا
  room.questionTimer = setTimeout(() => closeQuestion(room), QUESTION_MS + 150);
  // فاز G5-03 — ربات داخلی هم مثل حریف واقعی «فکر می‌کند» و جواب می‌دهد
  scheduleBotAnswer(room);
}

/**
 * فاز G5-03 — زمان‌بندی پاسخ ربات داخلی: زمان فکر تصادفی ۲..۸ ثانیه
 * (همیشه کمتر از مهلت ۱۵ث) سپس همان مسیر registerAnswer پاسخ انسانی.
 */
function scheduleBotAnswer(room: Room): void {
  if (room.botTimer) {
    clearTimeout(room.botTimer);
    room.botTimer = null;
  }
  if (room.state !== "playing" || room.phase !== "question") return;
  const bot = [...room.players.values()].find((p) => p.isBot);
  if (!bot || bot.botSkill === undefined) return;
  const think = BOT_THINK_MIN_MS + Math.floor(Math.random() * (BOT_THINK_MAX_MS - BOT_THINK_MIN_MS + 1));
  room.botTimer = setTimeout(() => {
    room.botTimer = null;
    botAnswer(room, bot);
  }, think);
}

/** پاسخ ربات داخلی به سؤال جاری — با احتمال skill درست، وگرنه یک گزینهٔ غلط تصادفی */
function botAnswer(room: Room, bot: Player): void {
  if (room.state !== "playing" || room.phase !== "question" || !room.current) return;
  if (room.answers.has(bot.id)) return;
  const q = room.pack[room.currentIndex];
  const skill = bot.botSkill ?? BOT_SKILL_BASE;
  const correct = Math.random() < skill;
  const wrongs = q.options.map((_, i) => i).filter((i) => i !== q.answer);
  const choice = correct ? q.answer : (wrongs[Math.floor(Math.random() * wrongs.length)] ?? q.answer);
  registerAnswer(room, bot, choice);
}

/**
 * فاز G5-03 — ثبت پاسخ یک بازیکن (انسان یا ربات) — منطق امتیازدهی مشترک؛
 * بدنه از هندلر `answer` استخراج شد تا ربات دقیقاً همان مسیر را طی کند
 * (score → بستن زودهنگام اگر همه پاسخ دادند → reveal).
 */
function registerAnswer(room: Room, p: Player, choice: number): void {
  if (room.phase !== "question" || !room.current) return;
  const q = room.pack[room.currentIndex];
  const remaining = Math.max(0, room.current.endsAt - now());
  const bonus = Math.round((MAX_BONUS * remaining) / QUESTION_MS);
  const correct = choice === q.answer;
  const delta = correct ? BASE_SCORE + bonus : 0;
  p.score += delta;
  if (correct) p.correct += 1;
  p.lastDelta = delta;
  p.lastCorrect = correct;
  room.answers.set(p.id, { choice, correct, delta });
  touch(room);
  emitToAll(room, "score", { questionIndex: room.currentIndex, scores: scoresOf(room) });

  // همهٔ بازیکنان آنلاین پاسخ دادند؟ بستن زودهنگام سؤال
  const connected = [...room.players.values()].filter((pl) => pl.connected);
  if (connected.length > 0 && room.answers.size > 0 && room.answers.size >= connected.length) {
    closeQuestion(room);
  }
}

function closeQuestion(room: Room): void {
  if (room.phase !== "question") return;
  if (room.questionTimer) clearTimeout(room.questionTimer);
  room.questionTimer = null;
  room.phase = "reveal";
  const q = room.pack[room.currentIndex];
  room.revealAnswer = q.answer;
  touch(room);
  // طبق قرارداد: بعد از هر پاسخ یا انقضا رویداد score می‌رود
  emitToAll(room, "score", { questionIndex: room.currentIndex, scores: scoresOf(room) });
  emitToAll(room, "reveal", { index: room.currentIndex, answer: q.answer, scores: scoresOf(room) });
  room.revealTimer = setTimeout(() => {
    room.currentIndex += 1;
    startQuestion(room);
  }, REVEAL_MS);
}

function finishGame(room: Room): void {
  clearTimers(room);
  room.state = "ended";
  room.phase = "reveal";
  room.current = null;
  room.revealAnswer = null;
  touch(room);
  const duration = room.startedAt ? Math.max(1, Math.round((now() - room.startedAt) / 1000)) : 0;
  const finalScores = [...room.players.values()]
    .map((p) => ({ id: p.id, name: p.name, score: p.score, correct: p.correct }))
    .sort((a, b) => b.score - a.score || b.correct - a.correct);
  emitToAll(room, "finished", { finalScores, packSummary: room.pack, duration });
  console.log(`[duel] room ${room.code} finished (${duration}s)`);
}

// ─── مهلت قطعی (grace) ───

function armGrace(room: Room): void {
  if (room.graceTimer) return;
  const earliest = Math.min(
    ...[...room.players.values()].filter((p) => !p.connected && p.disconnectedAt).map((p) => p.disconnectedAt!),
  );
  if (!Number.isFinite(earliest)) return;
  const wait = Math.max(1_000, earliest + GRACE_MS - now());
  room.graceTimer = setTimeout(() => {
    room.graceTimer = null;
    const t = now();
    let removed = false;
    for (const p of [...room.players.values()]) {
      if (!p.connected && p.disconnectedAt && t - p.disconnectedAt >= GRACE_MS - 250) {
        room.players.delete(p.id);
        removed = true;
      }
    }
    if (room.players.size === 0 || allBots(room)) {
      deleteRoom(room.code);
      return;
    }
    if (removed) broadcastRoom(room);
    // اگر هنوز بازیکن قطعی دارد، تایمر بعدی
    if ([...room.players.values()].some((p) => !p.connected)) armGrace(room);
  }, wait);
}

function clearGraceIfAllConnected(room: Room): void {
  if (room.graceTimer && [...room.players.values()].every((p) => p.connected)) {
    clearTimeout(room.graceTimer);
    room.graceTimer = null;
  }
}

// ─── سرور ───

const httpServer = createServer();
const io = new Server(httpServer, {
  // DO NOT change the path — Caddy forwards via XTransformPort
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

io.on("connection", (socket: Socket) => {
  console.log(`[duel] connected: ${socket.id}`);

  // ── ساخت اتاق (میزبان؛ بستهٔ سؤال را خودش می‌فرستد) ──
  socket.on("create", (raw: unknown) => {
    const data = (raw ?? {}) as { name?: unknown; pack?: unknown };
    if (rooms.size >= MAX_ROOMS) {
      emitError(socket, "سرور شلوغ است — چند لحظه بعد تلاش کن");
      return;
    }
    const pack = sanitizePack(data.pack);
    if (!pack) {
      emitError(socket, "بستهٔ سؤال نامعتبر است");
      return;
    }
    const playerId = newPlayerId();
    const room: Room = {
      code: generateCode(),
      hostId: playerId,
      players: new Map(),
      pack,
      state: "lobby",
      currentIndex: 0,
      phase: "question",
      answers: new Map(),
      current: null,
      revealAnswer: null,
      questionTimer: null,
      revealTimer: null,
      graceTimer: null,
      botTimer: null,
      startedAt: null,
      createdAt: now(),
      lastActivity: now(),
    };
    room.players.set(playerId, {
      id: playerId,
      name: sanitizeName(data.name),
      score: 0,
      correct: 0,
      lastDelta: 0,
      lastCorrect: true,
      connected: true,
      socketId: socket.id,
      disconnectedAt: null,
    });
    rooms.set(room.code, room);
    socketToRoom.set(socket.id, { code: room.code, playerId });
    socket.emit("created", { code: room.code, playerId, total: pack.length });
    broadcastRoom(room);
    console.log(`[duel] room ${room.code} created by ${playerId} (${pack.length} questions)`);
  });

  // ── فاز G5-03 — تمرین با ربات تطبیقی (میزبان + ربات داخلی بدون socket واقعی) ──
  // ورودی: { name?, pack?, winRate? } — winRate ∈ [0,1] نرخ برد میزبان (پیش‌فرض ۰٫۵).
  // مهارت ربات: s = clamp(0.35, 0.9, 0.65 + (winRate − 0.5) × 0.6) — کشش برد/باخت به ~۵۰٪.
  // جریان بعدی همان اتاق کلاسیک است: start → question → answer/reveal → finished؛
  // ربات همهٔ رخدادهای حریف واقعی را از سمت سرور برای socketId میزبان emit می‌کند.
  socket.on("play_bot", (raw: unknown) => {
    const data = (raw ?? {}) as { name?: unknown; pack?: unknown; winRate?: unknown };
    if (rooms.size >= MAX_ROOMS) {
      emitError(socket, "سرور شلوغ است — چند لحظه بعد تلاش کن");
      return;
    }
    const pack = sanitizePack(data.pack);
    if (!pack) {
      emitError(socket, "بستهٔ سؤال نامعتبر است");
      return;
    }
    const winRate =
      typeof data.winRate === "number" && Number.isFinite(data.winRate)
        ? Math.min(1, Math.max(0, data.winRate))
        : 0.5;
    const skill = Math.min(BOT_SKILL_MAX, Math.max(BOT_SKILL_MIN, BOT_SKILL_BASE + (winRate - 0.5) * 0.6));
    const playerId = newPlayerId();
    const botId = newPlayerId();
    const room: Room = {
      code: generateCode(),
      hostId: playerId,
      players: new Map(),
      pack,
      state: "lobby",
      currentIndex: 0,
      phase: "question",
      answers: new Map(),
      current: null,
      revealAnswer: null,
      questionTimer: null,
      revealTimer: null,
      graceTimer: null,
      botTimer: null,
      startedAt: null,
      createdAt: now(),
      lastActivity: now(),
    };
    room.players.set(playerId, {
      id: playerId,
      name: sanitizeName(data.name),
      score: 0,
      correct: 0,
      lastDelta: 0,
      lastCorrect: true,
      connected: true,
      socketId: socket.id,
      disconnectedAt: null,
    });
    // بازیکن دوم = ربات داخلی — socket ندارد؛ امتیاز/پاسخ‌هایش با همان منطق registerAnswer ساخته می‌شود
    room.players.set(botId, {
      id: botId,
      name: BOT_NAME,
      score: 0,
      correct: 0,
      lastDelta: 0,
      lastCorrect: true,
      connected: true,
      socketId: null,
      disconnectedAt: null,
      isBot: true,
      botSkill: skill,
    });
    rooms.set(room.code, room);
    socketToRoom.set(socket.id, { code: room.code, playerId });
    socket.emit("created", { code: room.code, playerId, total: pack.length });
    broadcastRoom(room); // ربات socket ندارد — فقط میزبان joined می‌گیرد
    // لاگ فنی کوتاه (بدون PII) برای دیدن رفتار تطبیقی
    console.log(
      `[duel] bot room ${room.code} — skill=${skill.toFixed(2)} winRate=${winRate.toFixed(2)} (${pack.length}q)`,
    );
  });

  // ── پیوستن با کد ──
  socket.on("join", (raw: unknown) => {
    const data = (raw ?? {}) as { code?: unknown; name?: unknown };
    const code = typeof data.code === "string" ? data.code.replace(/\D/g, "").slice(0, 4) : "";
    const room = rooms.get(code);
    if (!room) {
      emitError(socket, "کد اتاق پیدا نشد");
      return;
    }
    if (room.players.size >= MAX_PLAYERS) {
      emitError(socket, "اتاق پر است");
      return;
    }
    if (room.state === "playing") {
      emitError(socket, "بازی همین حالا در جریان است — منتظر دور بعد بمان");
      return;
    }
    const playerId = newPlayerId();
    room.players.set(playerId, {
      id: playerId,
      name: sanitizeName(data.name),
      score: 0,
      correct: 0,
      lastDelta: 0,
      lastCorrect: true,
      connected: true,
      socketId: socket.id,
      disconnectedAt: null,
    });
    socketToRoom.set(socket.id, { code: room.code, playerId });
    touch(room);
    clearGraceIfAllConnected(room);
    broadcastRoom(room);
    console.log(`[duel] ${playerId} joined room ${room.code}`);
  });

  // ── اتصال دوباره بعد از قطعی (همان playerId) ──
  socket.on("rejoin", (raw: unknown) => {
    const data = (raw ?? {}) as { code?: unknown; playerId?: unknown };
    const code = typeof data.code === "string" ? data.code.replace(/\D/g, "").slice(0, 4) : "";
    const playerId = typeof data.playerId === "string" ? data.playerId : "";
    const room = rooms.get(code);
    if (!room) {
      emitError(socket, "اتاق دیگر وجود ندارد — دور تمام شده است");
      return;
    }
    const p = room.players.get(playerId);
    if (!p) {
      emitError(socket, "جایگاه شما در اتاق پیدا نشد");
      return;
    }
    p.connected = true;
    p.socketId = socket.id;
    p.disconnectedAt = null;
    socketToRoom.set(socket.id, { code: room.code, playerId });
    touch(room);
    clearGraceIfAllConnected(room);
    // همگام‌سازی کامل وضعیت برای خودِ وصل‌شونده
    socket.emit("joined", {
      code: room.code,
      players: playersPublic(room),
      hostId: room.hostId,
      state: room.state,
      you: playerId,
    });
    if (room.state === "playing") {
      if (room.phase === "question" && room.current) {
        socket.emit("question", room.current);
      } else if (room.phase === "reveal" && room.revealAnswer !== null) {
        socket.emit("reveal", { index: room.currentIndex, answer: room.revealAnswer, scores: scoresOf(room) });
      }
    } else if (room.state === "ended") {
      const duration = room.startedAt ? Math.max(1, Math.round((now() - room.startedAt) / 1000)) : 0;
      const finalScores = [...room.players.values()]
        .map((pl) => ({ id: pl.id, name: pl.name, score: pl.score, correct: pl.correct }))
        .sort((a, b) => b.score - a.score || b.correct - a.correct);
      socket.emit("finished", { finalScores, packSummary: room.pack, duration });
    }
    for (const other of room.players.values()) {
      if (other.id !== playerId) {
        emitToSocket(room, other.id, "opponent-back", {
          name: p.name,
          message: `${p.name} دوباره وصل شد — ادامه می‌دهیم!`,
        });
      }
    }
    console.log(`[duel] ${playerId} rejoined room ${room.code}`);
  });

  // ── شروع دوئل (فقط میزبان) ──
  socket.on("start", () => {
    const ctx = socketToRoom.get(socket.id);
    if (!ctx) return;
    const room = rooms.get(ctx.code);
    if (!room) return;
    if (room.hostId !== ctx.playerId) {
      emitError(socket, "فقط میزبان می‌تواند دوئل را شروع کند");
      return;
    }
    if (room.state !== "lobby") {
      emitError(socket, "بازی قبلاً شروع شده است");
      return;
    }
    if (room.players.size < 2 || [...room.players.values()].some((p) => !p.connected)) {
      emitError(socket, "حریف هنوز آنلاین نیست — منتظر بمان");
      return;
    }
    room.startedAt = now();
    touch(room);
    startQuestion(room);
    console.log(`[duel] room ${room.code} started`);
  });

  // ── پاسخ به سؤال ──
  socket.on("answer", (raw: unknown) => {
    const data = (raw ?? {}) as { index?: unknown; choice?: unknown };
    const ctx = socketToRoom.get(socket.id);
    if (!ctx) return;
    const room = rooms.get(ctx.code);
    if (!room || room.state !== "playing" || room.phase !== "question" || !room.current) return;
    if (typeof data.index !== "number" || data.index !== room.currentIndex) return;
    const q = room.pack[room.currentIndex];
    const choice = typeof data.choice === "number" && Number.isInteger(data.choice) ? data.choice : -1;
    if (choice < 0 || choice >= q.options.length) return;
    const p = room.players.get(ctx.playerId);
    if (!p || !p.connected) return;
    if (room.answers.has(p.id)) return; // هر بازیکن فقط یک بار در هر سؤال

    // فاز G5-03 — بدنهٔ امتیازدهی به registerAnswer منتقل شد (مشترک با ربات داخلی)
    registerAnswer(room, p, choice);
  });

  // ── شروع دوباره با همان بستهٔ سؤال (فقط میزبان) ──
  socket.on("rematch", () => {
    const ctx = socketToRoom.get(socket.id);
    if (!ctx) return;
    const room = rooms.get(ctx.code);
    if (!room || room.hostId !== ctx.playerId) return;
    if (room.state !== "ended") return;
    for (const p of room.players.values()) {
      p.score = 0;
      p.correct = 0;
      p.lastDelta = 0;
      p.lastCorrect = true;
    }
    room.currentIndex = 0;
    room.startedAt = now();
    touch(room);
    emitToAll(room, "rematch", { message: "دور دوباره با همان سؤال‌ها شروع شد!" });
    broadcastRoom(room);
    startQuestion(room);
    console.log(`[duel] room ${room.code} rematch`);
  });

  // ── قطع اتصال ──
  socket.on("disconnect", () => {
    console.log(`[duel] disconnected: ${socket.id}`);
    const ctx = socketToRoom.get(socket.id);
    if (!ctx) return;
    socketToRoom.delete(socket.id);
    const room = rooms.get(ctx.code);
    if (!room) return;
    const p = room.players.get(ctx.playerId);
    if (!p || p.socketId !== socket.id) return;

    p.connected = false;
    p.socketId = null;
    p.disconnectedAt = now();
    touch(room);

    if (room.state === "lobby") {
      // در لابی چیزی برای حفظ کردن نیست — جایگاه آزاد می‌شود (اتاق فقط‌ربات هم بسته می‌شود)
      room.players.delete(p.id);
      if (room.players.size === 0 || allBots(room)) {
        deleteRoom(room.code);
        return;
      }
      if (room.hostId === p.id) {
        room.hostId = [...room.players.keys()][0];
        emitToAll(room, "error", { message: "میزبان رفت — میزبانی به بازیکن دیگر رسید", fatal: false });
      }
      broadcastRoom(room);
      return;
    }

    // حین بازی یا بعد از پایان: ۶۰ ثانیه مهلت rejoin — امتیازها حفظ می‌شود
    for (const other of room.players.values()) {
      if (other.connected) {
        emitToSocket(room, other.id, "opponent-left", {
          name: p.name,
          message: `حریف ${p.name} قطع شد — امتیاز شما حفظ شد`,
        });
      }
    }
    armGrace(room);
  });

  socket.on("error", (err: unknown) => {
    console.error(`[duel] socket error (${socket.id}):`, err);
  });
});

// ─── پاک‌سازی دوره‌ای اتاق‌های بی‌صاحب/کهنه ───

setInterval(() => {
  const t = now();
  for (const room of [...rooms.values()]) {
    if (room.players.size === 0 || allBots(room)) {
      if (t - room.createdAt > GRACE_MS) deleteRoom(room.code);
      continue;
    }
    const allDisconnected = [...room.players.values()].every((p) => !p.connected);
    if (allDisconnected && t - Math.max(...[...room.players.values()].map((p) => p.disconnectedAt ?? t)) > GRACE_MS + 5_000) {
      deleteRoom(room.code);
      continue;
    }
    const ttl = room.state === "ended" ? CODE_TTL_ENDED_MS : CODE_TTL_LOBBY_MS;
    if (room.state !== "playing" && t - room.lastActivity > ttl) {
      emitToAll(room, "room-closed", { message: "اتاق به‌دلیل بی‌فعالیتی بسته شد" });
      deleteRoom(room.code);
    }
  }
}, CLEANUP_INTERVAL_MS);

httpServer.listen(PORT, () => {
  console.log(`[duel] دوئل آنلاین آماده است — پورت ${PORT}`);
});

process.on("SIGTERM", () => {
  httpServer.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  httpServer.close(() => process.exit(0));
});
