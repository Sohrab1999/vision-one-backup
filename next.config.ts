import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // ── هدرهای امنیتی (فاز ۱۱) ──
  // camera/microphone=self چون اپ ASR (گفتار) و ضبط روایت دارد؛ geolocation/payment بسته است.
  // CSP عمداً تنظیم نمی‌شود: اسکریپت‌های inline جاسازی‌شدهٔ Next (هیدریشن/داده‌های RSC)
  // با CSP سخت‌گیرانه می‌شکنند و nonce در این محیط تک‌فایلی dev قابل نگهداری نیست —
  // در عوض X-Frame-Options/nosniff/Referrer-Policy سطح پایه را پوشش می‌دهند.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self), geolocation=(), payment=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
