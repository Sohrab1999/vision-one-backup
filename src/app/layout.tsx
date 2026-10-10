import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PwaRegister } from "@/components/book/pwa-register";

export const metadata: Metadata = {
  title: "کتابخانه ویژن | جزوه‌های تعاملی زبان انگلیسی پایه ۷ تا ۱۲",
  description:
    "کتابخانه وب تعاملی جزوه‌های زبان انگلیسی متوسطه (پایه هفتم تا دوازدهم) — واژگان، گرامر، مکالمه، روایت صوتی، آزمون تعاملی و دستیار هوشمند برای هر پایه",
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
  ],
  authors: [{ name: "جمال احمدی و همکاران" }],
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
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <PwaRegister />
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
