import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ویژن وان | کتاب وب تعاملی زبان انگلیسی پایه دهم",
  description:
    "کتاب وب تعاملی جزوه جامع زبان انگلیسی پایه دهم (Vision One) — واژگان، گرامر، مکالمه، روایت صوتی، آزمون تعاملی و دستیار هوشمند",
  keywords: [
    "زبان انگلیسی دهم",
    "Vision One",
    "ویژن وان",
    "کتاب تعاملی",
    "آزمون زبان",
    "واژگان انگلیسی",
  ],
  authors: [{ name: "جمال احمدی و همکاران" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4faf6" },
    { media: "(prefers-color-scheme: dark)", color: "#14231d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="dark">
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
