# Muhammad Ali — Portfolio

Personal portfolio for **Muhammad Ali Iqbal**, Tech Lead & Full Stack Architect. Built with Next.js 16 App Router, Tailwind CSS v4, Three.js, Framer Motion, and GSAP.

**Live:** [themuhammadali.dev](https://themuhammadali.dev)

---

## Sections

| Section | Highlights |
|---|---|
| Hero | Full-viewport photo with grayscale-to-color hover, animated watermark |
| About | Bento-grid stats, tech marquee, availability status |
| Projects | 8 featured projects, lazy-loaded image grid with hover overlays |
| Experience | Alternating timeline — Arthur Technologies, TazteqPk, Whitehats |
| Skills | 7 categories, 40+ skills with icon tooltips |
| Services | 8 service cards with GSAP mouse-glow heading and modal detail view |
| Testimonials | Orbital drag carousel (desktop) / animated stack (mobile) |
| FAQ | Animated accordion, 10 Q&As |
| Contact | WebGL globe (Three.js) with connection arcs from Lahore to 5 cities |
| Footer | Social links with per-brand hover colors |

---

## Tech Stack

| Layer | Libraries |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12, GSAP 3 |
| 3D / WebGL | Three.js, React Three Fiber, Drei |
| Smooth scroll | Lenis |
| Fonts | Inter, Bebas Neue, Orbitron, Cormorant Garamond (Google Fonts) |
| Icons | Lucide React |

---

## Features

- **Custom cursor** — GSAP-powered dot + lagged ring, pointer-device only
- **Theme switcher** — 9 colour themes persisted to `localStorage`, FOUC-free
- **Floating dock** — macOS-style magnification, resume download, theme panel
- **WebGL globe** — Fibonacci dot distribution, atmosphere shader, city arcs
- **Orbital carousel** — Framer Motion spring physics, responsive (orbital on desktop, stack on mobile)
- **AI chatbot** — Keyword-matched assistant (client-side, no API)
- **Dynamic OG image** — Edge-rendered 1200×630 via `next/og`
- **JSON-LD** — `Person` schema for Google knowledge panels

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3007
```

## Build & Deploy

```bash
npm run build
npm start
```

Deploys to Vercel with zero config. The `opengraph-image.tsx` route runs on the Edge runtime.

---

## Performance Notes

- Project images: only the first 2 cards use `priority`; the rest lazy-load
- All heavy sections (`Skills`, `Services`, `Contact`, etc.) are `next/dynamic` imports
- `ChatBot` and `Dock` are `ssr: false` dynamic imports
- Images served as WebP/AVIF via Next.js image optimisation (`avif`, `webp` formats configured)
- `experimental.optimizePackageImports` enabled for `framer-motion`, `three`, `lucide-react`
