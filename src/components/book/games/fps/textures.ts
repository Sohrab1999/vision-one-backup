"use client";

import * as THREE from "three";

/** مسیر مستطیل گرد (سازگار با همهٔ مرورگرها) */
export function rrPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** بافت بیلبورد گزینه — قرص تاکتیکی سفید با متن تیره و حاشیهٔ قرمز نظامی (فاز T1) */
export function makeLabelTexture(text: string): THREE.CanvasTexture {
  const W = 640;
  const Hc = 160;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = Hc;
  const c = cv.getContext("2d");
  if (c) {
    let fs = 64;
    c.font = `800 ${fs}px system-ui, sans-serif`;
    while (c.measureText(text).width > W - 96 && fs > 24) {
      fs -= 3;
      c.font = `800 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(text).width, W - 96);
    const pw = Math.min(tw + 56, W - 24);
    const ph = 102;
    const px = (W - pw) / 2;
    const py = (Hc - ph) / 2;
    c.fillStyle = "rgba(248,250,252,0.96)";
    rrPath(c, px, py, pw, ph, 26);
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "rgba(220,38,38,0.6)";
    rrPath(c, px + 3, py + 3, pw - 6, ph - 6, 22);
    c.stroke();
    c.fillStyle = "#1f2937";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, Hc / 2 + 4, W - 90);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return tex;
}

export function makeGoldLabelTexture(text: string): THREE.CanvasTexture {
  const W = 512;
  const Hc = 150;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = Hc;
  const c = cv.getContext("2d");
  if (c) {
    let fs = 66;
    c.font = `900 ${fs}px system-ui, sans-serif`;
    while (c.measureText(text).width > W - 110 && fs > 26) {
      fs -= 3;
      c.font = `900 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(text).width, W - 110);
    const pw = Math.min(tw + 64, W - 24);
    const ph = 96;
    const px = (W - pw) / 2;
    const py = (Hc - ph) / 2;
    c.fillStyle = "rgba(24,24,28,0.94)";
    rrPath(c, px, py, pw, ph, 26);
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "#ef4444";
    rrPath(c, px + 3, py + 3, pw - 6, ph - 6, 22);
    c.stroke();
    c.fillStyle = "#ffffff";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, Hc / 2 + 4, W - 100);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return tex;
}
