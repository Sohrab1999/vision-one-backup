/**
 * حریم خصوصی نوجوان (تعهد «حداقل داده» — فاز ۱۱):
 * بدون ردیاب تبلیغاتی، بدون کوکی شخص ثالث؛ دادهٔ جمع‌شده فقط پیشرفت یادگیری است
 * (واژگان آموخته، نتایج آزمون، آمار بازی‌ها) و حذف کامل حساب از پنل حساب ممکن است.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PwaRegister } from "@/components/book/pwa-register";
import { PerfReporter } from "@/components/book/perf-reporter";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vision-one.example.com"),
  title: "کتابخانه ویژن | جزوه‌های تعاملی زبان انگلیسی پایه ۷ تا ۱۲",
  description:
    "ویژن‌وان — جزوه‌های تعاملی انگلیسی پایه هفتم تا دوازدهم: واژگان، گرامر، بازی، آزمون و دستیار هوشمند؛ رایگان و بدون تبلیغ",
  keywords: [
    "زبان انگلیسی",
    "جزوه زبان",
    "پایه دهم",
    "Vision One",
    "ویژن وان",
    "کتاب تعاملی",
    "آزمون زبان",
    "واژگان انگلیسی",
    "هفتم",
    "هشتم",
    "نهم",
    "یازدهم",
    "دوازدهم",
    "یادگیری انگلیسی با بازی",
    "گرامر انگلیسی",
    "فلش‌کارت",
    "رایگان",
  ],
  authors: [{ name: "جمال احمدی و همکاران" }],
  openGraph: {
    title: "ویژن‌وان — یادگیری انگلیسی با بازی",
    description:
      "جزوه‌های تعاملی انگلیسی پایه هفتم تا دوازدهم: واژگان، گرامر، بازی، آزمون و دستیار هوشمند؛ رایگان و بدون تبلیغ",
    url: "/",
    siteName: "ویژن‌وان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "ویژن‌وان — یادگیری انگلیسی با بازی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ویژن‌وان — یادگیری انگلیسی با بازی",
    description:
      "جزوه‌های تعاملی انگلیسی پایه هفتم تا دوازدهم: واژگان، گرامر، بازی، آزمون و دستیار هوشمند؛ رایگان و بدون تبلیغ",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ویژن",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4faf6" },
    { media: "(prefers-color-scheme: dark)", color: "#14231d" },
  ],
};

/**
 * ضد-فلش پوسته (فاز ۷) — قبل از رندر اولیه، انتخاب ذخیره‌شده یا ترجیح سیستم
 * اعمال می‌شود تا کاربر پوسته روشن، فلش تیره نبیند.
 */
const THEME_INIT = `try{var t=localStorage.getItem("visionone:theme");var l=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches;if(t==="light"||(!t&&l)){document.documentElement.classList.remove("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/*
         * گام ۷ (CLS): فونت same-origin خیلی زود preload می‌شود تا پنجرهٔ
         * fallback↔Vazirmatn (font-display: swap) به حداقل برسد — بدون درخواست شخص ثالث.
         */}
        <link
          rel="preload"
          href="/fonts/Vazirmatn-var.woff2"
          as="font"
          type="font/woff2"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <PerfReporter />
        <PwaRegister />
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
