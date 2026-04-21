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
  metadataBase: new URL("https://muhammadali.dev"),
  openGraph: {
    title: "Muhammad Ali | Tech Lead & Full Stack Architect",
    description: "Strategic Tech Lead architecting scalable ecosystems and high-performance AI solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${orbitron.variable} ${cormorant.variable} dark`}>
      <body className="bg-navy text-foreground font-inter antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
