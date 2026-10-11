import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // ── هدرهای امنیتی (فاز ۱۱ + اصلاح پیش‌نمایش) ──
  // camera/microphone=self چون اپ ASR (گفتار) و ضبط روایت دارد؛ geolocation/payment بسته است.
  // CSP عمداً تنظیم نمی‌شود: اسکریپت‌های inline جاسازی‌شدهٔ Next (هیدریشن/داده‌های RSC)
  // با CSP سخت‌گیرانه می‌شکنند و nonce در این محیط تک‌فایلی dev قابل نگهداری نیست —
  // در عوض nosniff/Referrer-Policy سطح پایه را پوشش می‌دهند.
  // frame-ancestors * (به‌جای X-Frame-Options: DENY): پنل پیش‌نمایش، اپ را داخل
  // iframe از مبدأ preview-chat-<session>.space-z.ai بار می‌کند؛ DENY باعث
  // «refused to connect» می‌شد. frame-ancestors فقط والد فریم را کنترل می‌کند و
  // با اسکریپت‌های inline تداخلی ندارد.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
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
