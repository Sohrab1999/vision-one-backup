/**
 * TEST-ONLY throwaway smoke script for duel-service (G4-02). Deleted after use.
 * Run: cd /home/z/my-project && bun /tmp/duel-smoke.ts
 */
import { io, type Socket } from "socket.io-client";

const URL = "http://127.0.0.1:3003";
const pack = Array.from({ length: 3 }, (_, i) => ({
  id: `q${i + 1}`,
  text: `Q${i + 1}: ________ is a test?`,
  options: ["alpha", "beta", "gamma", "delta"],
  answer: i % 4,
}));

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
function once<T = any>(s: Socket, ev: string, timeout = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout waiting "${ev}"`)), timeout);
    s.once(ev, (d: T) => { clearTimeout(t); resolve(d); });
  });
}

let failures = 0;
function check(name: string, cond: boolean, extra = "") {
  console.log(`${cond ? "✅" : "❌"} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failures++;
}

const host = io(URL, { transports: ["websocket"] });
const guest = io(URL, { transports: ["websocket"] });

async function main() {
  await Promise.all([once(host, "connect"), once(guest, "connect")]);
  console.log("── both sockets connected");

  // 1) invalid join
  guest.emit("join", { code: "9999", name: "گست" });
  const err1 = await once<{ message: string }>(guest, "error");
  check("join invalid code → «کد اتاق پیدا نشد»", err1.message === "کد اتاق پیدا نشد", err1.message);

  // 2) create
  host.emit("create", { name: "میزبان", pack });
  const created = await once<{ code: string; playerId: string; total: number }>(host, "created");
  check("created with 4-digit code", /^\d{4}$/.test(created.code), created.code);
  check("created total=3", created.total === 3);
  const code = created.code;

  // created → then joined broadcast
  const hostJoined = await once(host, "joined");
  check("host joined broadcast (1 player)", hostJoined.players.length === 1 && hostJoined.you === created.playerId);

  // 3) join + full room guard
  guest.emit("join", { code, name: "حریف" });
  const gJoined = await once<any>(guest, "joined");
  check("guest joined (2 players)", gJoined.players.length === 2);
  const third = io(URL, { transports: ["websocket"] });
  await once(third, "connect");
  third.emit("join", { code, name: "سومین" });
  const err2 = await once<{ message: string }>(third, "error");
  check("3rd join → «اتاق پر است»", err2.message === "اتاق پر است", err2.message);
  third.disconnect();

  // 4) guest cannot start
  guest.emit("start");
  const err3 = await once<{ message: string }>(guest, "error");
  check("non-host start rejected", typeof err3.message === "string" && err3.message.length > 0, err3.message);

  // 5) host starts → question 0 without answer leak
  host.emit("start");
  const q0h = await once<any>(host, "question");
  const q0g = await once<any>(guest, "question");
  check("question 0 both", q0h.index === 0 && q0g.index === 0);
  check("no answer leak", !("answer" in q0h) && !("answer" in q0g));
  check("endsAt/serverNow present", typeof q0h.endsAt === "number" && typeof q0h.serverNow === "number");

  // 6) answers: host correct fast, guest wrong → score events
  const scoreH = once<any>(host, "score");
  const scoreG = once<any>(guest, "score");
  host.emit("answer", { index: 0, choice: pack[0].answer });
  guest.emit("answer", { index: 0, choice: (pack[0].answer + 1) % 4 });
  const s1 = await scoreH;
  const s2 = await scoreG;
  const hostScore = s1.scores[created.playerId];
  const guestScore = s1.scores[gJoined.you];
  check("host +10..15 (correct)", hostScore.lastCorrect === true && hostScore.lastDelta >= 10 && hostScore.lastDelta <= 15, `+${hostScore.lastDelta}`);
  check("guest 0 (wrong)", guestScore.lastCorrect === false && guestScore.lastDelta === 0);
  check("score broadcast to both (same payload)", JSON.stringify(s1.scores) === JSON.stringify(s2.scores));

  // reveal arrives with correct answer
  const rv0h = await once<any>(host, "reveal");
  check("reveal has answer", rv0h.index === 0 && rv0h.answer === pack[0].answer);

  // 7) double-answer guard on next question
  const q1h = await once<any>(host, "question");
  const q1g = await once<any>(guest, "question");
  check("question 1 both", q1h.index === 1 && q1g.index === 1);
  host.emit("answer", { index: 1, choice: pack[1].answer });
  host.emit("answer", { index: 1, choice: (pack[1].answer + 1) % 4 }); // دوبار — باید نادیده گرفته شود
  guest.emit("answer", { index: 1, choice: pack[1].answer });
  const rv1 = await once<any>(guest, "reveal");
  check("reveal q1 (double-answer ignored)", rv1.index === 1 && rv1.answer === pack[1].answer);
  void q1h; void q1g;

  // 8) disconnect mid-game → opponent-left + rejoin resync
  const oppLeft = once<any>(host, "opponent-left");
  guest.disconnect();
  const ol = await oppLeft;
  check("opponent-left message", ol.message.includes("حریف") && ol.message.includes("امتیاز شما حفظ شد"), ol.message);

  await wait(200);
  const guest2 = io(URL, { transports: ["websocket"] });
  await once(guest2, "connect");
  guest2.emit("rejoin", { code, playerId: gJoined.you });
  const rj = await once<any>(guest2, "joined");
  check("rejoined same slot", rj.you === gJoined.you && rj.state === "playing" && rj.players.length === 2);
  const rjQ = await once<any>(guest2, "question");
  check("rejoin resync question", rjQ.index === 1 || rjQ.index === 2, `index=${rjQ.index}`);

  // 9) finish: both answer the resynced current question
  const finP = once<any>(host, "finished");
  const curIndex = rjQ.index;
  await wait(150);
  guest2.emit("answer", { index: curIndex, choice: pack[curIndex].answer });
  host.emit("answer", { index: curIndex, choice: pack[curIndex].answer });
  const fin = await finP;
  check("finished event", Array.isArray(fin.finalScores) && fin.finalScores.length === 2);
  check("packSummary has answers", fin.packSummary.length === 3 && fin.packSummary[0].answer === pack[0].answer);
  const me = fin.finalScores.find((f: any) => f.id === created.playerId);
  check("host total score >= 30", me && me.score >= 30, `score=${me?.score}`);

  // 10) rematch by host → new question 0
  const remQ = once<any>(host, "question");
  host.emit("rematch");
  const rq = await remQ;
  check("rematch restarts at q0", rq.index === 0);

  // 11) timeout path: nobody answers (wait ~15.6s)
  await once<any>(host, "question");
  const t0 = Date.now();
  await once<any>(host, "reveal", 20000);
  const dt = Date.now() - t0;
  check("timeout closes question ~15s", dt >= 14000 && dt <= 18000, `${Math.round(dt / 1000)}s`);

  host.disconnect();
  guest2.disconnect();
  console.log(failures === 0 ? "\n🎉 ALL CHECKS PASSED" : `\n💥 ${failures} FAILURES`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("💥 test crashed:", e);
  process.exit(1);
});
