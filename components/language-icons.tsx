"use client"

import type { ReactElement } from "react"

type Props = { name: string; size?: number; className?: string; title?: string }

// simple brand-like SVGs (not official marks) with recognizable colors
function TypeScriptIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="TypeScript">
      <rect width="48" height="48" rx="8" fill="#3178C6" />
      <path d="M12 19h24v4h-9v14h-6V23h-9z" fill="white" />
    </svg>
  )
}

function NextJSIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Next.js">
      <circle cx="24" cy="24" r="22" fill="black" />
      <path d="M14 24c0-5.523 4.477-10 10-10 2.39 0 4.59.84 6.3 2.24L14 34.54V24z" fill="white" />
      <path d="M26 22l8 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function MongoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="MongoDB">
      <path d="M24 4s10 9 10 22-10 18-10 18-10-5-10-18 10-22 10-22z" fill="#10A34A" />
      <path d="M24 8v32" stroke="#0B5C2B" strokeWidth="2" />
    </svg>
  )
}

function SupabaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Supabase">
      <path d="M28 6L10 28h14l-4 14L38 20H24l4-14z" fill="#3ECF8E" />
    </svg>
  )
}

function CloudinaryIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Cloudinary">
      <circle cx="24" cy="20" r="8" fill="#2A6EEA" />
      <path d="M10 30h28a6 6 0 0 0-6-6H16a6 6 0 0 0-6 6z" fill="#7EB6FF" />
    </svg>
  )
}

function AuthJSIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Auth.js">
      <rect width="48" height="48" rx="8" fill="#000" />
      <path d="M16 24a8 8 0 1 1 16 0v8h-4v-8a4 4 0 1 0-8 0v8h-4v-8z" fill="#fff" />
    </svg>
  )
}

function GroqIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Groq">
      <rect width="48" height="48" rx="12" fill="#FF4154" />
      <path d="M14 24a10 10 0 1 0 0 .1V24zm8 0h12v4H26v-4z" fill="white" />
    </svg>
  )
}

function PythonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Python">
      <rect x="6" y="6" width="18" height="18" rx="6" fill="#3776AB" />
      <rect x="24" y="24" width="18" height="18" rx="6" fill="#FFE873" />
    </svg>
  )
}

const registry: Record<string, (p?: { size?: number }) => ReactElement> = {
  "next.js": NextJSIcon,
  nextjs: NextJSIcon,
  next: NextJSIcon,
  typescript: TypeScriptIcon,
  "type script": TypeScriptIcon,
  mongodb: MongoIcon,
  "mongo db": MongoIcon,
  supabase: SupabaseIcon,
  cloudinary: CloudinaryIcon,
  "auth js": AuthJSIcon,
  authjs: AuthJSIcon,
  groq: GroqIcon,
  python: PythonIcon,
}

export function TechIcon({ name, size = 16, className, title }: Props) {
  const key = name.toLowerCase().trim()
  const Icon = registry[key]
  if (Icon)
    return (
      <span className={className} title={title || name}>
        <Icon size={size} />
      </span>
    )

  // fallback: simple dot badge with first letter
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-foreground/10 text-[10px] leading-none ${className || ""}`}
      style={{ width: size, height: size }}
      title={title || name}
      aria-label={name}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

export default TechIcon
