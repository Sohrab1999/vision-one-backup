"use client";

/**
 * نگهبان خروج استاندارد بازی‌ها — فاز G1-04 نقشه راه بازی‌ها.
 *
 * پوششی یکدست روی AlertDialog با متن پیش‌فرض واحد؛ الگوی همان سه دیالوگ G0-06
 * (مار‌و‌پله/ماجراجویی/جدول) — بازی‌های بعدی به‌جای درج دستی، از همین استفاده می‌کنند.
 * Esc و کلیک بیرون = انصراف (ادامهٔ بازی) — رفتار خود AlertDialog.
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface GameExitGuardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** تأیید خروج — بازی اینجا پیشرفت را رها و به setup/hub برمی‌گردد */
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function GameExitGuard({
  open,
  onOpenChange,
  onConfirm,
  title = "برگردم به آزمایشگاه؟ 🎮",
  description = "پیشرفت این دور هنوز کامل نشده — با خروج، از دست می‌رود.",
  confirmLabel = "آره، خروج",
  cancelLabel = "نه، ادامه می‌دهم",
}: GameExitGuardProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center sm:text-right">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-start">
          <AlertDialogCancel className="min-h-11">{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            className="min-h-11 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80"
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
