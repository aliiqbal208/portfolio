"use client";

import { ArrowUp } from "lucide-react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0m6 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0"/><path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/><path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"/><path d="M9 10l-1-2"/><path d="M15 10l1-2"/></svg>
);
// Actual Medium "M" logo (three overlapping circles)
const MediumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/aliiqbal208/",    icon: LinkedinIcon,  color: "hover:text-[#0a66c2]",  bg: "group-hover:bg-[#0a66c2]/15"  },
  { label: "GitHub",    href: "https://github.com/aliiqbal208",               icon: GithubIcon,    color: "hover:text-white",       bg: "group-hover:bg-white/10"       },
  { label: "X",         href: "https://x.com/aliiqbal208",                    icon: XIcon,         color: "hover:text-white",       bg: "group-hover:bg-white/10"       },
  { label: "Medium",    href: "https://medium.com/@aliiqbal208",              icon: MediumIcon,    color: "hover:text-white",       bg: "group-hover:bg-white/10"       },
  { label: "Instagram", href: "https://www.instagram.com/aliiqbal208/",       icon: InstagramIcon, color: "hover:text-[#e1306c]",   bg: "group-hover:bg-[#e1306c]/15"   },
  { label: "Discord",   href: "https://discord.com/users/aliiqbal208",        icon: DiscordIcon,   color: "hover:text-[#5865f2]",   bg: "group-hover:bg-[#5865f2]/15"   },
];

export default function Footer() {
  return (
    <footer className="relative py-12 px-8 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl font-bebas text-white tracking-widest">
                Muhammad Ali<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-[10px] font-orbitron text-muted-foreground uppercase tracking-[0.2em]">
              © 2026 Architecting the Future
            </p>
          </div>

          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`group relative p-3 text-muted-foreground ${s.color} transition-all duration-300`}
              >
                <div className={`absolute inset-0 scale-0 rounded-full ${s.bg} group-hover:scale-100 transition-transform duration-300`} />
                <span className="relative z-10 block transition-transform duration-300 group-hover:scale-110">
                  <s.icon />
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-[10px] font-orbitron text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors"
          >
            <span>Top</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[8px] font-orbitron text-white/10 uppercase tracking-[1.5em]">
            ALL RIGHTS RESERVED • MUHAMMAD ALI
          </p>
        </div>
      </div>
    </footer>
  );
}
