/**
 * generate-icons.mjs — one-off PWA icon rasterizer for «کتابخانه ویژن»
 *
 * Run from project root:  bun scripts/generate-icons.mjs
 * Outputs PNGs into public/icons/ (safe to delete this script afterwards).
 *
 * Design: rounded-square emerald→teal gradient, white geometric open-book
 * glyph (pure vector paths — no fonts/emoji), amber accent underline.
 * The glyph stays inside the maskable safe-zone (center 80% circle).
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

/** Shared artwork; RX = corner radius (0 for full-bleed maskable). */
const artwork = (rx) => `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#10b981"/>
      <stop offset="0.52" stop-color="#059669"/>
      <stop offset="1" stop-color="#0d9488"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${rx}" fill="url(#bg)"/>
  <circle cx="150" cy="118" r="270" fill="#ffffff" opacity="0.07"/>

  <!-- open book: two white pages -->
  <path d="M256 174 C 224 150 170 143 127 153 L 127 313 C 170 303 224 309 256 333 Z" fill="#ffffff"/>
  <path d="M256 174 C 288 150 342 143 385 153 L 385 313 C 342 303 288 309 256 333 Z" fill="#ffffff"/>

  <!-- page text hints -->
  <g fill="none" stroke="#a7f3d0" stroke-width="13" stroke-linecap="round" opacity="0.9">
    <path d="M152 202 C 186 194 221 198 234 207"/>
    <path d="M152 244 C 186 236 221 240 234 249"/>
    <path d="M360 202 C 326 194 291 198 278 207"/>
    <path d="M360 244 C 326 236 291 240 278 249"/>
  </g>

  <!-- spine -->
  <path d="M256 172 L 256 335" fill="none" stroke="#047857" stroke-width="16" stroke-linecap="round"/>

  <!-- amber accent line -->
  <path d="M182 386 L 330 386" fill="none" stroke="#f59e0b" stroke-width="26" stroke-linecap="round"/>
</svg>`;

async function render(svg, size, out) {
  // density 288 → rasterize 512-viewBox at 2048px, then Lanczos downscale
  await sharp(Buffer.from(svg), { density: 288 })
    .resize(size, size, { kernel: "lanczos3", fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log("wrote", out);
}

await mkdir("public/icons", { recursive: true });
const rounded = artwork(115); // ≈22.5% corner radius
const fullBleed = artwork(0); // maskable: OS applies its own mask

await render(rounded, 512, "public/icons/icon-512.png");
await render(rounded, 192, "public/icons/icon-192.png");
await render(rounded, 180, "public/icons/apple-touch-icon.png");
await render(rounded, 32, "public/icons/icon-32.png");
await render(rounded, 16, "public/icons/icon-16.png");
await render(fullBleed, 512, "public/icons/maskable-512.png");
