import { stepPlayer } from "../src/components/book/games/fps/physics";
import { LAYOUTS } from "../src/components/book/games/fps/layouts";

type Bridge = Parameters<typeof stepPlayer>[0];
function makeBridge(map: keyof typeof LAYOUTS): Bridge {
  return {
    aim: { yaw: 0, pitch: 0 }, pos: { x: 0, z: 0 }, keys: new Set<string>(), moveMag: 0,
    stick: { x: 0, y: 0 }, vel: { x: 0, z: 0 }, vy: 0, jumpY: 0, floorY: 0, wantJump: false,
    crouchAmt: 0, sprint: false, speedKick: 0, layout: LAYOUTS[map], laneK: 1, scopeAmt: 0,
  } as unknown as Bridge;
}
const DT = 1 / 60;

// ── دیباگ صعود پلکان ──
const b = makeBridge("vault");
b.pos.x = 9.7; b.pos.z = 2.5; b.keys.add("w");
for (let i = 0; i < 330; i++) {
  stepPlayer(b, DT);
  if (i % 30 === 0) console.log(`f${i} worldZ=${(7 + b.pos.z).toFixed(2)} jumpY=${b.jumpY.toFixed(3)} floorY=${b.floorY.toFixed(3)} vy=${b.vy.toFixed(2)}`);
}
b.keys.delete("w");

// ── دیباگ فرود روی کیسهٔ شنی تونل ──
const c = makeBridge("vault");
c.pos.x = -7.2; c.pos.z = -13.2; c.jumpY = 1.5;
for (let i = 0; i < 50; i++) {
  stepPlayer(c, DT);
  if (i % 5 === 0) console.log(`S f${i} worldZ=${(7 + c.pos.z).toFixed(2)} x=${c.pos.x.toFixed(2)} jumpY=${c.jumpY.toFixed(3)} vy=${c.vy.toFixed(2)}`);
}
