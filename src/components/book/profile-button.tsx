"use client";

import { useState } from "react";
import { User, Check } from "lucide-react";
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
import { useUserName, setName } from "@/lib/name-store";

export function ProfileButton() {
  const name = useUserName();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(name);

  function save() {
    setName(value);
    setOpen(false);
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
