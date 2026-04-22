"use client";

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const EXPERIENCES = [
  {
    company: "NgXoft Solutions", role: "Tech Lead / Principal Engineer", date: "2024 – Present",
    desc: [
      "Designed and implemented a cloud-ready AI chat platform, enabling scalable, real-time audio and text communication with production-grade reliability.",
      "Developed reusable and extensible AI interaction modules, supporting personalized conversations, session intelligence, and long-term memory tracking.",
      "Engineered real-time communication pipelines, delivering low-latency, natural conversational experiences at scale.",
      "Delivered a modular, high-performance front-end architecture, optimized for scalability, security best practices, and long-term maintainability.",
    ],
  },
  {
    company: "IdeaToLife", role: "Senior Software Engineer", date: "2022 – 2024",
    desc: [
      "Led the design and development of AI-driven platforms, including intelligent code generation, auto-completion, project understanding, documentation, test creation, and automated deployment workflows.",
      "Architected and delivered large-scale desktop and web applications, including a real-time public bus line management system in Senegal.",
      "Built and scaled AI-powered systems and digital platforms, including image-to-3D model generation pipelines and high-traffic marketplaces.",
      "Defined complex system architecture, scalability strategies, and performance optimizations, while leading cross-functional teams.",
    ],
  },
  {
    company: "Invozone", role: "Tech Lead", date: "2020 – 2022",
    desc: [
      "Designed and deployed a Unified Authentication and Access Management Platform, enabling Single Sign-On (SSO) across products.",
      "Architected centralized Auth and Update Portals, modernizing legacy systems to achieve improved usability and stability.",
      "Built reusable, secure authentication and security libraries, adopted across cross-platform applications.",
      "Developed cross-platform applications and secure workflow components, supporting complex document workflows.",
    ],
  },
  {
    company: "Ashlar", role: "Senior Software Engineer", date: "2018 – 2020",
    desc: [
      "Designed and implemented a cloud-ready AI chat platform, enabling scalable, real-time audio and text communication.",
      "Developed reusable AI interaction modules, supporting personalized conversations and session intelligence.",
      "Engineered real-time communication pipelines, delivering low-latency conversational experiences at scale.",
      "Delivered a modular, high-performance front-end architecture, optimized for scalability and maintainability.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Work History" subtitle="Career Path" align="right" className="mb-16" />

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative group pl-8 md:pl-0"
            >
              <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-secondary/20 md:left-1/2 md:-translate-x-1/2 z-10" />
              <div className="absolute left-0 top-8 w-6 h-6 rounded-full bg-navy border-2 border-primary z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2 transition-transform duration-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(8,136,174,0.5)]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>

              <div className={`flex flex-col md:flex-row gap-8 items-start glass-dark p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden ${i % 2 === 0 ? "md:flex-row-reverse md:pr-12" : "md:pl-12"}`}>
                <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className={`p-4 pt-0 md:w-1/2 flex flex-col ${i % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}>
                  <span className="text-xs font-orbitron text-primary mb-3 tracking-[0.3em] uppercase">{exp.date}</span>
                  <div className="flex items-center gap-3 mb-2">
                    {i % 2 !== 0 && <Building2 className="w-6 h-6 text-primary/50 hidden md:block" />}
                    <h3 className="text-3xl font-bebas text-white tracking-widest leading-none">{exp.company}</h3>
                    {(i % 2 === 0 || i === 0) && <Building2 className="w-6 h-6 text-primary/50 block" />}
                  </div>
                  <h4 className="text-sm font-orbitron text-primary/80 uppercase tracking-widest mb-4">{exp.role}</h4>
                </div>
                <div className="md:w-1/2 space-y-4 relative z-10">
                  <div className="text-muted-foreground leading-relaxed text-sm font-inter space-y-3">
                    {exp.desc.map((d, j) => (
                      <div key={j} className="flex gap-3 items-start group/line">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 transition-transform group-hover/line:scale-150" />
                        <p className="hover:text-white/90 transition-colors">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
