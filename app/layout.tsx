import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Muhammad Ali - Senior Full-Stack AI Engineer",
  description: "Senior Full-Stack AI Engineer specializing in TypeScript, React, Next.js, Python, AWS, and AI-powered solutions. Based in Lahore, Pakistan.",
  keywords: ["Muhammad Ali", "Full-Stack Developer", "AI Engineer", "TypeScript", "React", "Next.js", "Python", "AWS", "Software Engineer"],
  authors: [{ name: "Muhammad Ali", url: "https://github.com/aliiqbal208" }],
  creator: "Muhammad Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliiqbal208.vercel.app",
    title: "Muhammad Ali - Senior Full-Stack AI Engineer",
    description: "Senior Full-Stack AI Engineer specializing in TypeScript, React, Next.js, Python, AWS, and AI-powered solutions.",
    siteName: "Muhammad Ali Portfolio",
    images: [{
      url: "https://res.cloudinary.com/daeki8yrd/image/upload/v1764756241/Screenshot_2025-12-03_at_3.03.39_PM_dl7pas.png",
      width: 1200,
      height: 630,
      alt: "Muhammad Ali Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali - Senior Full-Stack AI Engineer",
    description: "Senior Full-Stack AI Engineer specializing in TypeScript, React, Next.js, Python, AWS, and AI-powered solutions.",
    creator: "@aliiqbal208",
    images: ["https://res.cloudinary.com/daeki8yrd/image/upload/v1764756241/Screenshot_2025-12-03_at_3.03.39_PM_dl7pas.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
