import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Muhammad Ali",
  description: "Senior Full-Stack AI Engineer",
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
      </body>
    </html>
  )
}
