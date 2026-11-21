import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";
import { variantConfig } from "@/lib/variant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    /* Crawling stays allowed on the noindex variant so crawlers can see the
       noindex tag; it just doesn't advertise a sitemap. */
    ...(variantConfig.indexable && { sitemap: `${BASE_URL}/sitemap.xml` }),
    host: BASE_URL,
  };
}
