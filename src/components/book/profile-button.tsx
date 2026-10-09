"use client";

import { useRef, useState } from "react";
import { User, Check, Download, Upload, HardDriveDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserName, setName } from "@/lib/name-store";
import { downloadBackup, parseBackup, restoreBackup } from "@/lib/progress-backup";
import { toast } from "sonner";

export function ProfileButton() {
  const name = useUserName();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(name);
  const fileRef = useRef<HTMLInputElement>(null);

  function save() {
    setName(value);
    setOpen(false);
  }

  function exportProgress() {
    const count = downloadBackup();
    toast.success(`فایل پشتیبان با ${count.toLocaleString("fa-IR")} بخش داده دانلود شد — جایش امن! 💾`);
  }

  async function importProgress(file: File) {
    try {
      const text = await file.text();
      const res = parseBackup(text);
      if (!res.ok) {
        toast.error(res.error ?? "فایل پشتیبان معتبر نیست");
        return;
      }
      const count = restoreBackup(res.entries);
      toast.success(`${count.toLocaleString("fa-IR")} بخش پیشرفت بازیابی شد — صفحه رفرش می‌شود…`);
      setTimeout(() => window.location.reload(), 900);
    } catch {
      toast.error("خواندن فایل ممکن نشد");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setValue(name); }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="نام من"
          className="hidden sm:flex h-9 gap-1.5 rounded-full px-3 text-[12px] font-bold text-muted-foreground hover:text-foreground"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
            <User size={13} />
          </span>
          {name || "نام من"}
        </Button>
      </DialogTrigger>
      <Button
        variant="ghost"
        size="icon"
        aria-label="نام من"
        onClick={() => setOpen(true)}
        className="sm:hidden h-9 w-9 rounded-full"
      >
        <User size={16} />
      </Button>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-right">نام تو چیست؟</DialogTitle>
          <DialogDescription className="text-right text-[12px] leading-6">
            نامت فقط برای نمایش در کارنامه‌ها و پیشرفت استفاده می‌شود و روی همین دستگاه ذخیره می‌ماند.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-1">
          <Label htmlFor="profile-name" className="text-[12px]">
            نام نمایشی
          </Label>
          <Input
            id="profile-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="مثلاً: آرش"
            maxLength={40}
            autoFocus
          />
        </div>

        <Separator />

        {/* ── پشتیبان‌گیری پیشرفت ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HardDriveDownload size={15} />
            </span>
            <div>
              <p className="text-[13px] font-black">پشتیبان پیشرفت</p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                واژه‌های یادگرفته، ستاره‌ها، SRS، زنجیره و چالش‌ها — همه در یک فایل JSON برای انتقال به دستگاه دیگر.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={exportProgress} className="gap-1.5">
              <Download size={14} />
              دریافت فایل
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="gap-1.5">
              <Upload size={14} />
              بازیابی از فایل
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importProgress(f);
                e.target.value = "";
              }}
              aria-label="انتخاب فایل پشتیبان"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-start">
          <Button onClick={save} className="gap-1.5">
            <Check size={15} />
            ذخیره
          </Button>
          {name && (
            <Button
              variant="outline"
              onClick={() => {
                setName("");
                setValue("");
              }}
            >
              پاک کردن
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
