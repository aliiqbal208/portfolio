"use client";

// Set to false to hide the Labs section and its navbar tab
export const SHOW_LABS = false;

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const STATUS_STYLE = {
  live:     { label: "Live",     classes: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  wip:      { label: "WIP",      classes: "text-amber-400  bg-amber-400/10  border-amber-400/30"  },
  archived: { label: "Archived", classes: "text-zinc-500   bg-zinc-500/10   border-zinc-500/30"   },
} as const;

const BORDER_COLOR = {
  live:     "border-l-emerald-500/50",
  wip:      "border-l-amber-500/50",
  archived: "border-l-zinc-600/50",
} as const;

type Status = keyof typeof STATUS_STYLE;

interface Lab {
  name: string;
  description: string;
  tech: string[];
  status: Status;
  github: string | null;
  demo: string | null;
}

const LABS: Lab[] = [
  {
    name: "RAG Forge",
    description: "Open-source production-ready RAG pipeline boilerplate. Covers chunking strategies, hybrid pgvector + BM25 search, reranking, and a retrieval quality evaluation harness out of the box.",
    tech: ["Python", "FastAPI", "pgvector", "LangChain", "Docker"],
    status: "live",
    github: "https://github.com/aliiqbal208/rag-forge",
    demo: null,
  },
  {
    name: "GoStream",
    description: "Minimal WebSocket pub/sub server built in Go. Redis-backed channel routing handles 10k+ concurrent connections with a dead-simple client API and automatic reconnection.",
    tech: ["Go", "Redis", "WebSockets", "Docker"],
    status: "live",
    github: "https://github.com/aliiqbal208/gostream",
    demo: null,
  },
  {
    name: "LLM Bench",
    description: "CLI tool for benchmarking prompts across OpenAI, Anthropic, and local Ollama models simultaneously. Outputs latency, token cost, and quality scoring side by side in the terminal.",
    tech: ["Python", "Click", "OpenAI", "Anthropic", "Ollama"],
    status: "wip",
    github: "https://github.com/aliiqbal208/llm-bench",
    demo: null,
  },
  {
    name: "VectoNode",
    description: "Lightweight in-process vector similarity search for TypeScript and Node.js. Cosine, dot-product, and Euclidean distance — zero dependencies, ships as an npm package.",
    tech: ["TypeScript", "Node.js", "npm"],
    status: "live",
    github: "https://github.com/aliiqbal208/vectonode",
    demo: null,
  },
  {
    name: "HireSignal",
    description: "Job signal aggregator that monitors LinkedIn, HN Who's Hiring, and GitHub Jobs for roles matching your stack, then sends a curated daily digest via email.",
    tech: ["Python", "FastAPI", "Celery", "AWS Lambda", "SES"],
    status: "wip",
    github: "https://github.com/aliiqbal208/hiresignal",
    demo: null,
  },
  {
    name: "Logpilot",
    description: "Structured log explorer for the terminal. Parses JSON logs from any source, filters by level and time range, and renders an interactive TUI dashboard with live streaming.",
    tech: ["Go", "Bubble Tea", "Charm"],
    status: "archived",
    github: "https://github.com/aliiqbal208/logpilot",
    demo: null,
  },
];

export default function Labs() {
  if (!SHOW_LABS) return null;

  return (
    <section id="labs" className="relative py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Labs" subtitle="Side Projects & Experiments" className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LABS.map((project, i) => {
            const status = STATUS_STYLE[project.status];
            const border = BORDER_COLOR[project.status];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`glass-dark border-l-2 ${border} flex flex-col gap-5 p-6 group hover:bg-white/[0.03] transition-colors duration-300`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-orbitron text-primary/40 tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-bebas text-white tracking-widest group-hover:text-primary transition-colors duration-300 leading-none">
                      {project.name}
                    </h3>
                  </div>
                  <span className={`flex-shrink-0 text-[9px] font-orbitron uppercase tracking-widest px-2 py-1 rounded border ${status.classes}`}>
                    {status.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-inter leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-orbitron text-primary/60 uppercase tracking-tighter">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-5 pt-3 border-t border-white/5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-orbitron text-muted-foreground hover:text-white transition-colors uppercase tracking-widest"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-orbitron text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
