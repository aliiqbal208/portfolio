import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Orbitron, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";
import content from "@/lib/content";
import { variantConfig } from "@/lib/variant";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-cormorant", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f1e",
};

const { meta, contact, footer, about, skills, experience } = content;
const DESCRIPTION = meta.description;

/* Public profiles for the Person schema; the booking link only where calls are offered. */
const SAME_AS = [
  ...footer.socials
    .filter((s) => ["linkedin", "github", "x", "medium"].includes(s.icon))
    .map((s) => s.href),
  ...(variantConfig.primaryAction === "calendly" ? [contact.calendlyUrl] : []),
];

const current = experience.items.find((e) => /present/i.test(e.date));
const aiSkills = skills.categories.find((c) => /\bai\b/i.test(c.title))?.items ?? [];

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Ali Iqbal",
  alternateName: "Muhammad Ali",
  jobTitle: meta.jobTitle,
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${about.profile.image.src}`,
  email: contact.email,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
  knowsAbout: [...new Set([...about.vision.specializations, ...aiSkills.slice(0, 10)])],
  sameAs: SAME_AS,
};

export const metadata: Metadata = {
  title: meta.title,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: variantConfig.indexable, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: meta.title,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Muhammad Ali Iqbal — ${meta.jobTitle}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${orbitron.variable} ${cormorant.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of default theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t&&t!=='default')document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PERSON_SCHEMA),
          }}
        />
      </head>
      <body className="bg-navy text-foreground font-inter antialiased selection:bg-primary selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
