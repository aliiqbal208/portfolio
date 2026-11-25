/* Single source of truth for the public site URL.
   Metadata, sitemap, robots, structured data, and the OG image all follow it.
   Each Vercel project sets NEXT_PUBLIC_SITE_URL to its own domain so the job
   and independent sites don't canonicalize to each other. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://aliwithai.vercel.app").replace(/\/$/, "");

export const SITE_HOST = new URL(SITE_URL).host;

export const RESUME_URL = "/assets/MuhammadAli_Resume.pdf";
export const RESUME_FILENAME = "MuhammadAli_Resume.pdf";
