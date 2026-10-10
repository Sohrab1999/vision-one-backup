import type { MetadataRoute } from "next";

/**
 * robots.txt پویا (فاز ۱۱ — SEO):
 * همهٔ مسیرها برای خزنده‌ها آزاد است به‌جز APIها؛ sitemap نمی‌گذاریم چون
 * اپ تک‌مسیره است (فقط «/») و مسیرهای دیگری برای ایندکس وجود ندارد.
 * (نسخهٔ قدیمی public/robots.txt حذف شد تا این قرارداد metadata اپ روتر سرو شود.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
  };
}
