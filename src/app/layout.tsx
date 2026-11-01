import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Orbitron, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  title: "Muhammad Ali Iqbal | Lead Full Stack AI Engineer",
  description: "Lead Full Stack AI Engineer building RAG pipelines, LLM products, and cloud platforms for enterprises.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
    title: "Muhammad Ali Iqbal | Lead Full Stack AI Engineer",
    description: "Lead Full Stack AI Engineer building RAG pipelines, LLM products, and cloud platforms for enterprises.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Muhammad Ali Iqbal — Lead Full Stack AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali Iqbal | Lead Full Stack AI Engineer",
    description: "Lead Full Stack AI Engineer building RAG pipelines, LLM products, and cloud platforms for enterprises.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Ali Iqbal",
              jobTitle: "Lead Full Stack AI Engineer",
              url: SITE_URL,
              email: "codewithmuhammadali@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
              sameAs: [
                "https://github.com/aliiqbal208",
                "https://calendly.com/codewithmuhammadali",
              ],
            }),
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
