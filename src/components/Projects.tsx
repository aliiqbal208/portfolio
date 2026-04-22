"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const PROJECTS = [
  { title: "ChaseLabs AI", description: "AI-powered meeting orchestration and scheduling platform. Features real-time transcription, automated action item extraction, and intelligent calendar optimization using various LLMs.", tech: ["React", "Python", "FastAPI", "MySQL", "OpenAI", "Whisper", "WebSockets"], link: "https://www.meetchase.ai/", image: "/assets/images/projects/chaselab.png" },
  { title: "OneX Studio", description: "Advanced AI observability platform that goes beyond surface-level telemetry. It exposes a model's internal mechanics, activations, embeddings, and hidden states to provide deep visibility into the 'why' behind AI behavior.", tech: ["NestJS", "Python", "PyTorch", "React", "D3.js", "PostgreSQL", "Redis"], link: "https://getonex.ai", image: "/assets/images/projects/onex.png" },
  {
    title: "ViXa Identity-First Platform",
    description: "AI-powered cybersecurity anomaly detection platform integrated into a CSMS, providing end-to-end vehicle lifecycle coverage with continuous threat monitoring, real-time incident detection, ML-based cross-layer threat correlation, automated response workflows, and full system observability through centralized telemetry, structured logging, and security event tracking ensuring regulatory compliance.",
    tech: ["React", "NestJS", "TypeScript", "Python", "AI/ML", "Pandas", "Azure", "Docker", "XDR"], link: "https://cyberwissen.io/", image: "/assets/images/projects/vixa.png"
  },
  { title: "Adology AI", description: "AI-driven platform that analyzes digital ads to uncover creative and performance insights for brands. Built scalable Python data pipelines on AWS, integrated OpenAI for ad labeling and trend detection across millions of Facebook and TikTok ads, with an interactive React dashboard for campaign intelligence.", tech: ["Python", "Flask", "React", "OpenAI", "Pandas", "AWS Lambda", "AWS Batch", "Docker", "Apify"], link: "https://app.getadology.ai/", image: "/assets/images/projects/adology.png" },
  {
    title: "Arthur Web App", description: "React app for Arthur VR with User hierarchy management, RBAC/PBAC, onboarding flows, real-time AV and 3D/WebGL, built as a scalable monorepo deployed on AWS and GCP.", tech: ["TypeScript",
      "React",
      "Redux",
      "Tailwind CSS",
      "Monorepo",
      "Three.js",
      "Node.js",
      "Express",
      "Fastify",
      "Golang",
      "Python",
      "FastAPI",
      "AWS",
      "GCP"], link: "https://portal.arthur.digital/login", image: "/assets/images/projects/arthur.png"
  },
  { title: "Arthur Vibe", description: "Intelligent, scalable communication and analytics platform processing speech, analyzing sentiment, and generating adaptive AI-driven insights. Go-powered backend with serverless AWS Lambda workflows, multi-cloud infrastructure (AWS/GCP), speech intelligence pipelines, and pgvector-based semantic search.", tech: ["Golang", "AWS Lambda", "MongoDB", "PostgreSQL", "pgvector", "GCP", "OpenAI"], link: "https://arthur.digital/vibe", image: "/assets/images/projects/arthur-vibe.png" },
  { title: "Remar VT", description: "SaaS e-learning platform for nursing education delivering interactive video training. Built with React, TypeScript, Redux in a monorepo supporting students, admins, and institutions with Stripe payments.", tech: ["React", "TypeScript", "Redux", "Material-UI", "Nest.js", "Stripe", "Monorepo"], link: "https://vt.remarnurse.com/", image: "/assets/images/projects/remar.png" },
  { title: "Vyoo", description: "Community management platform for creators to build, engage, and monetize online communities with content creation, member management, event organization, and analytics.", tech: ["React", "TypeScript", "Redux", "TailwindCSS", "Nest.js", "MongoDB", "AWS", "Stripe"], link: "https://www.vyoo.me/", image: "/assets/images/projects/vyoo.png" },
  {
    title: "Govava", description: "World's first AI-driven gift discovery platform curating personalized recommendations based on lifestyle, preferences, and interests. Built semantic search over millions of records with Elasticsearch, scalable microservices, and AI-based recommendation algorithms.",
    tech: ["React", "Node.js", "Redis", "PostgreSQL", "Elasticsearch", "DynamoDB", "BullMQ", "AWS", "AWS Lambda", "Nginx"
    ], link: "https://www.govava.com/", image: "/assets/images/projects/govava.png"
  },
  { title: "Arthur Companion", description: "Go-based platform enabling real-time group communication and peer chat within organizations. Designed connected architecture with real-time WebSocket pipelines, scalable backend services, Redis caching, and high-performance AWS deployment.", tech: ["Golang", "Gorilla WebSockets", "Redis", "PostgreSQL", "AWS"], link: "https://arthur.digital/", image: "/assets/images/projects/arthur-companion.png" },
];

export default function Projects() {
  return (
    <section id="portfolio" className="relative py-20 px-8">
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
