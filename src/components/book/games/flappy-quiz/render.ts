/**
 * رندر بوم «فلپی گزینش» (گام ۹ — تفکیک مکانیکی از flappy-quiz-game.tsx — پلی‌بوک fps/):
 * آسمان/زمین/دیوار دروازهٔ گزینه‌ها/پرنده — توابع خالص رسم Canvas 2D که حلقهٔ rAF در index
 * هر فریم صدا می‌زند؛ هیچ state یا اثر جانبی اینجا نیست (auto-shrink متن دهانه‌ها در drawWall).
 */

import { BIRD_R, GROUND_H, H, WALL_W, type FlappyWall } from "./types";

function roundRectPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** ابرهای ملایم teal — عمق پس‌زمینه بدون رنگ ممنوع */
export function drawSky(c: CanvasRenderingContext2D, now: number, w: number) {
  c.fillStyle = "rgba(45, 212, 191, 0.16)";
  for (let i = 0; i < 3; i++) {
    const cx = ((i * 270 + now * (0.012 + i * 0.005)) % (w + 220)) - 110;
    const cy = 54 + i * 64;
    c.beginPath();
    c.arc(cx, cy, 22, 0, Math.PI * 2);
    c.arc(cx + 25, cy + 6, 15, 0, Math.PI * 2);
    c.arc(cx - 23, cy + 8, 13, 0, Math.PI * 2);
    c.fill();
  }
  c.fillStyle = "#059669";
  c.fillRect(0, 0, w, 4);
}

export function drawGround(c: CanvasRenderingContext2D, now: number, w: number, speed: number) {
  const gy = H - GROUND_H;
  c.fillStyle = "#059669";
  c.fillRect(0, gy, w, GROUND_H);
  c.fillStyle = "#10b981";
  c.fillRect(0, gy, w, 4);
  const off = (now * speed * 0.05) % 30;
  c.fillStyle = "#fbbf24";
  for (let x = 0; x < w + 30; x += 30) c.fillRect(x - off, gy + 13, 16, 3);
}

/** دیوار emerald با کلاهک + گزینه‌ها با auto-shrink تا در دهانه جا شوند */
export function drawWall(c: CanvasRenderingContext2D, wall: FlappyWall, now: number) {
  const segs: Array<[number, number]> = [];
  let y = 0;
  for (const g of wall.gaps) {
    segs.push([y, g.y0]);
    y = g.y1;
  }
  segs.push([y, H - GROUND_H]);
  c.fillStyle = "#059669";
  for (const [a, b] of segs) if (b > a) c.fillRect(wall.x, a, WALL_W, b - a);
  c.fillStyle = "#047857";
  for (const g of wall.gaps) {
    c.fillRect(wall.x - 4, g.y0 - 10, WALL_W + 8, 10);
    c.fillRect(wall.x - 4, g.y1, WALL_W + 8, 10);
  }
  c.textAlign = "center";
  c.textBaseline = "middle";
  for (const g of wall.gaps) {
    const cy = (g.y0 + g.y1) / 2;
    let fs = 15;
    c.font = `800 ${fs}px system-ui, sans-serif`;
    while (c.measureText(g.text).width > WALL_W - 16 && fs > 8) {
      fs -= 1;
      c.font = `800 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(g.text).width, WALL_W - 16);
    c.fillStyle = "rgba(255, 255, 255, 0.92)";
    roundRectPath(c, wall.x + WALL_W / 2 - tw / 2 - 8, cy - 11, tw + 16, 22, 8);
    c.fill();
    c.fillStyle = "#065f46";
    c.fillText(g.text, wall.x + WALL_W / 2, cy + 1);
  }
  if (wall.flashUntil > now) {
    if (wall.ok) {
      const g = wall.gaps.find((gp) => gp.correct);
      if (g) {
        c.fillStyle = "rgba(16, 185, 129, 0.30)";
        c.fillRect(wall.x - 4, g.y0, WALL_W + 8, g.y1 - g.y0);
      }
    } else {
      c.fillStyle = "rgba(239, 68, 68, 0.22)";
      c.fillRect(wall.x - 4, 0, WALL_W + 8, H - GROUND_H);
    }
  }
}

/** پرنده = دایره amber + بال/چشم/منقار ساده + چرخش بر اساس سرعت عمودی + چشمک مصونیت */
export function drawBird(
  c: CanvasRenderingContext2D,
  now: number,
  y: number,
  vy: number,
  bx: number,
  invulnUntil: number,
  lastFlapAt: number,
) {
  c.save();
  if (now < invulnUntil) c.globalAlpha = 0.45 + 0.3 * Math.abs(Math.sin(now / 60));
  c.translate(bx, y);
  c.rotate(Math.max(-0.38, Math.min(0.6, vy / 650)));
  c.beginPath();
  c.arc(0, 0, BIRD_R, 0, Math.PI * 2);
  c.fillStyle = "#f59e0b";
  c.fill();
  c.lineWidth = 2.5;
  c.strokeStyle = "#b45309";
  c.stroke();
  const flapT = Math.max(0, 1 - (now - lastFlapAt) / 350);
  const wy = 3 + Math.sin(now / (flapT > 0 ? 45 : 110)) * (2.5 + flapT * 3);
  c.beginPath();
  c.ellipse(-4, wy, 6.5, 4.2, -0.5, 0, Math.PI * 2);
  c.fillStyle = "#fcd34d";
  c.fill();
  c.stroke();
  c.beginPath();
  c.arc(5, -4.5, 3.4, 0, Math.PI * 2);
  c.fillStyle = "#ffffff";
  c.fill();
  c.beginPath();
  c.arc(6.3, -4.5, 1.6, 0, Math.PI * 2);
  c.fillStyle = "#1c1917";
  c.fill();
  c.beginPath();
  c.moveTo(11, -1);
  c.lineTo(18.5, 2);
  c.lineTo(11, 5.5);
  c.closePath();
  c.fillStyle = "#d97706";
  c.fill();
  c.restore();
}
