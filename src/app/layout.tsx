import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Orbitron, Cormorant_Garamond } from "next/font/google";
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
  title: "Muhammad Ali | Tech Lead & Full Stack Architect",
  description: "Strategic Tech Lead architecting scalable ecosystems and high-performance AI solutions with precision.",
  metadataBase: new URL("https://themuhammadali.dev"),
  openGraph: {
    title: "Muhammad Ali | Tech Lead & Full Stack Architect",
    description: "Strategic Tech Lead architecting scalable ecosystems and high-performance AI solutions.",
    type: "website",
    url: "https://themuhammadali.dev",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Muhammad Ali — Tech Lead & Full Stack Architect" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali | Tech Lead & Full Stack | AI Solutions Architect",
    description: "Strategic Tech Lead architecting scalable ecosystems and high-performance AI solutions.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${orbitron.variable} ${cormorant.variable} dark`}>
      <head>
        {/* Prevent flash of default theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t&&t!=='default')document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
      </head>
      <body className="bg-navy text-foreground font-inter antialiased selection:bg-primary selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Ali Iqbal",
              jobTitle: "Tech Lead & Full Stack | AI Solutions Architect",
              url: "https://themuhammadali.dev",
              email: "codewithmuhammadali@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
              sameAs: [
                "https://github.com/aliiqbal208",
                "https://calendly.com/codewithmuhammadali",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
