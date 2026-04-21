"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const PROJECTS = [
  { title: "ChaseLabs AI", description: "AI-powered meeting orchestration and scheduling platform. Features real-time transcription, automated action item extraction, and intelligent calendar optimization using various LLMs.", tech: ["React", "Python", "FastAPI", "MySQL", "OpenAI", "Whisper", "WebSockets"], link: "https://www.meetchase.ai/", image: "/assets/images/projects/chaselab.png" },
  { title: "OneX Studio", description: "Advanced AI observability platform that goes beyond surface-level telemetry. It exposes a model's internal mechanics, activations, embeddings, and hidden states to provide deep visibility into the 'why' behind AI behavior.", tech: ["NestJS", "Python", "PyTorch", "React", "D3.js", "PostgreSQL", "Redis"], link: "https://getonex.ai", image: "/assets/images/projects/onex.png" },
  { title: "Memotar AI", description: "Real-time AI conversational avatar platform. Features sub-200ms low-latency WebRTC streams for global users, emotional analysis, and high-fidelity lip-syncing for immersive interactions.", tech: ["Next.js", "WebRTC", "Zustand", "Socket.io", "FastAPI", "AWS MediaLive", "Azure Speech"], link: "https://memotar.app/landing/index.html", image: "/assets/images/projects/memotar.png" },
  { title: "Demdikk", description: "National transit management system for Senegal. Engineered high-scale microservices handling 10k+ concurrent IoT pings for fleet tracking, route optimization, and passenger analytics.", tech: ["Microservices", "React", "Docker", "Kubernetes", "Node.js", "Kafka", "PostGIS"], link: "https://demdikk.sn/", image: "/assets/images/projects/dimdak.png" },
  { title: "Ideawake", description: "Collaborative idea management platform for enterprise innovation. Built Elasticsearch-driven analytics and semantic search for 100k+ global users to discover and rank high-impact internal ideas.", tech: ["Angular", "NestJS", "Elasticsearch", "Redis", "AWS Lambda", "DynamoDB", "BullMQ"], link: "https://ideawake.com/", image: "/assets/images/projects/ideawake.png" },
  { title: "Revbits", description: "Unified cybersecurity authentication suite. Integrated zero-trust OAuth 2.0/MFA across 15+ standalone security modules, implementing hardware key support and biometric verification.", tech: ["React", "OAuth 2.0", "OIDC", "Node.js", "WebAuthn", "Security Headers", "Vault"], link: "https://www.revbits.com/", image: "/assets/images/projects/revbit.png" },
];

export default function Projects() {
  return (
    <section id="portfolio" className="relative py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Projects" subtitle="Selected Works" className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              href={project.link}
              target="_blank"
              className="group glass-dark p-1 flex flex-col hover:scale-[1.02] transition-all duration-500 border border-white/5 overflow-hidden"
            >
              <div className="aspect-video bg-navy-light relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute inset-0 w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 opacity-100 md:opacity-50 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-40 transition-opacity flex items-center justify-center font-orbitron text-xs">
                  <span className="bg-navy/80 px-4 py-2 border border-ice/30 backdrop-blur-sm">VISIT_PROJECT</span>
                </div>
                <div className="absolute bottom-4 left-4 font-bebas text-2xl text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {project.title}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-[10px] uppercase font-bold text-primary/80 tracking-tighter">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
