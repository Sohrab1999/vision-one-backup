import { io, type Socket } from "socket.io-client";
const URL = "http://127.0.0.1:3003";
const pack = Array.from({ length: 3 }, (_, i) => ({
  id: `q${i + 1}`, text: `Q${i + 1}?`, options: ["a", "b", "c", "d"], answer: i % 4,
}));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
function once<T = any>(s: Socket, ev: string, timeout = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout waiting "${ev}"`)), timeout);
    s.once(ev, (d: T) => { clearTimeout(t); resolve(d); });
  });
}
const host = io(URL, { transports: ["websocket"] });
const guest = io(URL, { transports: ["websocket"] });
["created", "joined", "question", "score", "reveal", "error"].forEach((ev) =>
  host.onAny((e, d) => { if (e !== "question") console.log("[HOST*]", e); }),
);
// NOTE: onAny for all events INCLUDING question — but don't consume
await Promise.all([once(host, "connect"), once(guest, "connect")]);
host.emit("create", { name: "میزبان", pack });
const created = await once<{ code: string; playerId: string }>(host, "created");
const code = created.code;
await once(host, "joined");
guest.emit("join", { code, name: "حریف" });
const gJoined = await once<any>(guest, "joined");
const third = io(URL, { transports: ["websocket"] });
await once(third, "connect");
third.emit("join", { code, name: "سومین" });
const err2 = await once<{ message: string }>(third, "error");
console.log("third rejected:", err2.message);
third.disconnect();
guest.emit("start");
const err3 = await once<{ message: string }>(guest, "error");
console.log("guest start rejected:", err3.message);
console.log("── host emits start");
host.emit("start");
const q0h = await once<any>(host, "question", 5000).catch((e) => { console.log("HOST question FAILED:", e.message); return null; });
const q0g = await once<any>(guest, "question", 5000).catch((e) => { console.log("GUEST question FAILED:", e.message); return null; });
console.log("q0h:", JSON.stringify(q0h)?.slice(0, 120));
console.log("q0g:", JSON.stringify(q0g)?.slice(0, 120));
process.exit(0);
