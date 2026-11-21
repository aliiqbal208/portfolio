import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";
import { variantConfig } from "@/lib/variant";

export default function sitemap(): MetadataRoute.Sitemap {
  /* A noindex variant has nothing to submit. */
  if (!variantConfig.indexable) return [];
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
