"use client";

/**
 * راهنمای نصب PWA — دیالوگ دوتبی «اندروید / آیفون» (فاز ۱۲ «انتشار و رشد»)
 *
 * - همیشه‌مونت در page.tsx؛ فقط با رویداد «visionone:open-install» باز می‌شود
 *   (هدر/قفسه فقط dispatch می‌کنند — قرارداد مشترک فاز ۱۲)
 * - تب اندروید: مراحل منوی کروم + دکمهٔ هوشمند «نصب فوری» وقتی رویداد
 *   beforeinstallprompt موجود باشد (event در ref نگه داشته می‌شود؛ فقط در
 *   handler رویداد state به‌روز می‌شود — نه در بدنهٔ effect)
 * - تب آیفون: مراحل Share سافاری + نکتهٔ آفلاین/بی‌تبلیغ
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Smartphone, Share2, Zap, Leaf, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

/** رویداد پنجره‌ای باز کردن راهنما (قرارداد مشترک فاز ۱۲) */
export const OPEN_INSTALL_EVENT = "visionone:open-install";

/** رویداد استاندارد نصب PWA کروم — تایپ محلی (بدون any) */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallStep {
  n: string;
  text: string;
}

const ANDROID_STEPS: InstallStep[] = [
  { n: "۱", text: "با مرورگر کروم وارد ویژن‌وان شو" },
  { n: "۲", text: "منوی سه‌نقطهٔ ⋮ بالای صفحه را باز کن" },
  { n: "۳", text: "گزینهٔ «Add to Home screen / افزودن به صفحهٔ اصلی» را بزن" },
  { n: "۴", text: "آیکون ویژن‌وان کنار بقیهٔ اپ‌ها می‌نشیند — با یک لمس باز می‌شود" },
];

const IOS_STEPS: InstallStep[] = [
  { n: "۱", text: "سایت را با سافاری باز کن (نه کروم)" },
  { n: "۲", text: "دکمهٔ اشتراک ⬆️ را در نوار پایین صفحه بزن" },
  { n: "۳", text: "گزینهٔ «Add to Home Screen» را انتخاب کن" },
  { n: "۴", text: "«Add» را بزن تا تأیید شود — آیکون روی صفحهٔ اصلی می‌نشیند" },
];

function StepList({ steps }: { steps: InstallStep[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((s) => (
        <li key={s.n} className="flex items-start gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[11px] font-black text-primary"
            aria-hidden
          >
            {s.n}
          </span>
          <span className="text-[12.5px] font-medium leading-6">{s.text}</span>
        </li>
      ))}
    </ol>
  );
}

export function PwaInstallGuide() {
  const [open, setOpen] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);

    // رویداد نصب خودکار کروم — نگه‌داری در ref؛ به‌روزرسانی state در handler مجاز است
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e as BeforeInstallPromptEvent;
      setCanPrompt(true);
    };

    window.addEventListener(OPEN_INSTALL_EVENT, onOpen);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => {
      window.removeEventListener(OPEN_INSTALL_EVENT, onOpen);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  async function quickInstall() {
    const evt = deferredRef.current;
    if (!evt) return;
    try {
      await evt.prompt();
      const choice = await evt.userChoice;
      if (choice.outcome === "accepted") {
        toast.success("عالی! ویژن‌وان دارد روی گوشی‌ات نصب می‌شود 🌱");
      } else {
        toast.info("نصب لغو شد — هر وقت خواستی از منوی کروم در دسترس است");
      }
      deferredRef.current = null;
      setCanPrompt(false);
    } catch {
      toast.error("نصب خودکار ممکن نشد — از منوی کروم اقدام کن");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg gap-4 rounded-3xl p-5 sm:p-6" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-2 text-lg font-black">
            <Smartphone size={19} className="text-primary" aria-hidden />
            نصب ویژن‌وان روی گوشی
          </DialogTitle>
          <DialogDescription className="text-[12.5px] leading-6">
            ویژن‌وان یک اپ واقعی است — روی صفحهٔ اصلی گوشی بگذارش تا بدون تایپ آدرس، همیشه یک لمسی باشد
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="android" dir="rtl">
          <TabsList className="grid w-full grid-cols-2 bg-card p-1">
            <TabsTrigger value="android" className="gap-1.5 text-[12.5px]">
              <Smartphone size={14} aria-hidden /> اندروید
            </TabsTrigger>
            <TabsTrigger value="ios" className="gap-1.5 text-[12.5px]">
              <Share2 size={14} aria-hidden /> آیفون / آیپد
            </TabsTrigger>
          </TabsList>

          {/* ─── اندروید ─── */}
          <TabsContent value="android" className="rise-in mt-4 space-y-4">
            <Image
              src="/pwa-android.png"
              alt="نمایی از مراحل افزودن ویژن‌وان به صفحهٔ اصلی در اندروید"
              width={864}
              height={1152}
              className="mx-auto h-auto w-full max-w-[210px] rounded-2xl border bg-card"
            />
            <StepList steps={ANDROID_STEPS} />

            <div className="rounded-2xl border bg-card/60 p-3.5">
              {canPrompt ? (
                <Button onClick={quickInstall} className="w-full gap-2 font-black">
                  <Zap size={16} aria-hidden />
                  نصب فوری ⚡
                </Button>
              ) : (
                <p className="flex items-start gap-2 text-[12px] leading-6 text-muted-foreground">
                  <CircleCheck size={14} className="mt-1 shrink-0 text-primary" aria-hidden />
                  در این مرورگر نصب خودکار نیست — از منوی کروم بزن
                </p>
              )}
            </div>
          </TabsContent>

          {/* ─── آیفون / آیپد ─── */}
          <TabsContent value="ios" className="rise-in mt-4 space-y-4">
            <Image
              src="/pwa-ios.png"
              alt="نمایی از مراحل افزودن ویژن‌وان به صفحهٔ اصلی در آیفون با دکمهٔ اشتراک سافاری"
              width={864}
              height={1152}
              className="mx-auto h-auto w-full max-w-[210px] rounded-2xl border bg-card"
            />
            <StepList steps={IOS_STEPS} />

            <p className="flex items-start gap-2 rounded-2xl border border-primary/25 bg-primary/8 p-3.5 text-[12px] font-medium leading-6">
              <Leaf size={15} className="mt-0.5 shrink-0 text-primary" aria-hidden />
              ویژن‌وان آفلاین هم کار می‌کند و هیچ تبلیغی ندارد 🌱
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default PwaInstallGuide;
