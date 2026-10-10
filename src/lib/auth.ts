import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * احراز هویت سادهٔ نوجوان‌پسند — نام کاربری + کد ۴ رقمی (فاز ۱ نقشه راه جامع).
 * بدون ایمیل/پیچیدگی؛ هش PIN با scrypt و مقایسهٔ زمان‌ثابت.
 */

// ─── هش PIN ───

export function hashPin(pin: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pin, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPin(pin: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const candidate = scryptSync(pin, salt, 32);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

// ─── اعتبارسنجی ورودی ───

export const USERNAME_RE = /^[a-zA-Z0-9_\u0600-\u06FF]{3,20}$/;
export const PIN_RE = /^\d{4}$/;

/** rate-limit سبک درون‌حافظه‌ای — حداکثر N تلاش در پنجرهٔ زمانی */
const rateMap = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || entry.reset < now) {
    rateMap.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export function clientIp(req: { headers: { get(k: string): string | null } }): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

// ─── تنظیمات NextAuth ───

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 3600 },
  providers: [
    CredentialsProvider({
      name: "ورود با نام کاربری",
      credentials: {
        username: { label: "نام کاربری", type: "text" },
        pin: { label: "کد ۴ رقمی", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim() ?? "";
        const pin = credentials?.pin ?? "";
        if (!USERNAME_RE.test(username) || !PIN_RE.test(pin)) return null;
        if (!rateLimit(`login:${username.toLowerCase()}`, 8, 60_000)) return null;
        const user = await db.user.findUnique({ where: { username } });
        if (!user || !verifyPin(pin, user.pinHash)) return null;
        return { id: user.id, name: user.username, avatar: user.avatar, grade: user.grade };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.username = (user as { name?: string }).name ?? token.username;
        token.avatar = (user as { avatar?: string | null }).avatar;
        token.grade = (user as { grade?: string | null }).grade;
      }
      // به‌روزرسانی پروفایل (آواتار/پایه) بدون خروج
      if (trigger === "update" && session && typeof session === "object") {
        const s = session as { avatar?: string | null; grade?: string | null };
        if (s.avatar !== undefined) token.avatar = s.avatar;
        if (s.grade !== undefined) token.grade = s.grade;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.uid as string) ?? "";
        session.user.username = (token.username as string) ?? "";
        session.user.avatar = (token.avatar as string | null) ?? null;
        session.user.grade = (token.grade as string | null) ?? null;
      }
      return session;
    },
  },
  pages: { signIn: "/" },
};
