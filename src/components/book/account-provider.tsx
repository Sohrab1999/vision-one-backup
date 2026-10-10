"use client";

import { useEffect, useRef } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { toast } from "sonner";
import { installSyncWatcher, pullMergePush } from "@/lib/account-sync";
import { captureSrsLocal, srsPullMergePush, setSrsAuthed } from "@/lib/srs-sync";

/**
 * تأمین‌کنندهٔ حساب (فاز ۱): سشن NextAuth + موتور همگام‌سازی.
 * حالت مهمان کاملاً بدون سشن کار می‌کند — هیچ اجباری به ورود نیست.
 */

function SyncController() {
  const { status } = useSession();
  const mergedRef = useRef(false);

  useEffect(() => {
    installSyncWatcher();
  }, []);

  // پس از ورود موفق: کشیدن → ادغام → فقط اگر داده‌ای تغییر کرد، یک رفرش
  // (قفل sessionStorage جلوی حلقهٔ رفرش را می‌گیرد)
  useEffect(() => {
    if (status !== "authenticated" || mergedRef.current) return;
    mergedRef.current = true;
    setSrsAuthed(true);
    const url = new URL(window.location.href);
    if (url.searchParams.get("welcome") === "1") {
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.toString());
    }
    captureSrsLocal(); // نسخهٔ محلی SRS قبل از ادغام کلی حفظ شود (فاز ۲)
    void pullMergePush()
      .then(async (changed) => {
        let srsChanged = 0;
        try {
          srsChanged = await srsPullMergePush(); // ادغام ساختاریافتهٔ کارت‌ها (فاز ۲)
        } catch {
          /* noop */
        }
        let alreadyMerged = false;
        try {
          alreadyMerged = sessionStorage.getItem("v1:merged") === "1";
          sessionStorage.setItem("v1:merged", "1");
        } catch {
          /* noop */
        }
        const total = changed + srsChanged;
        if (total > 0 && !alreadyMerged) {
          toast.success(
            `${total.toLocaleString("fa-IR")} بخش پیشرفت از حسابات بازیابی شد — خوش برگشتی! 🎉`,
          );
          window.location.reload(); // تضمین تازگی همهٔ کَش‌های محلی — فقط یک‌بار
        }
      })
      .catch(() => {
        /* خطای شبکه: ادامه بدون رفرش */
      });
  }, [status]);

  // آپ‌سل نرم پس از اولین آزمون در حالت مهمان (یک‌بار برای همیشه)
  useEffect(() => {
    function onAttemptSaved() {
      if (status === "authenticated") return;
      try {
        if (localStorage.getItem("visionone:upsell")) return;
        localStorage.setItem("visionone:upsell", "1");
      } catch {
        return;
      }
      toast.info("پیشرفتت فقط روی همین دستگاه است — از دکمهٔ حساب در بالا، یک حساب بساز تا همه‌جا ذخیره شود 👆", {
        duration: 6000,
      });
    }
    window.addEventListener("visionone:attempt-saved", onAttemptSaved);
    return () => window.removeEventListener("visionone:attempt-saved", onAttemptSaved);
  }, [status]);

  // خروج یا حالت مهمان: سینک سروری SRS قطع شود (داده محلی دست‌نخورده می‌ماند)
  useEffect(() => {
    if (status === "authenticated") return;
    setSrsAuthed(false);
  }, [status]);

  return null;
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <SyncController />
      {children}
    </SessionProvider>
  );
}
