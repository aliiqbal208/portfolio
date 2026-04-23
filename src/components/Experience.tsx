"use client";

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const EXPERIENCES = [
  {
    company: "Arthur Technologies", role: "Tech Lead / Senior Software Engineer", date: "2020 – Present",
    desc: [
      "Among first engineers hired — architected Web XR App, backend, and scalable infrastructure for Arthur platform, enabling 100K+ users to collaborate seamlessly.",
      "Led engineering team to deliver 20+ features on schedule, boosting productivity and fostering a high-performing culture.",
      "Built Arthur Vibe — an end-to-end AI transformation agent with document ingestion, async stakeholder interviews, and pgvector semantic search guiding enterprises through discovery, analysis, and implementation.",
      "Deployed custom LLMs with RAG pipelines and vector databases (Pinecone, pgvector), improving query latency by 35% and accuracy by 40%.",
      "Built real-time speech pipelines and chatbot systems supporting 5K concurrent users at <200ms latency, increasing engagement by 55%.",
      "Developed AI-driven collaboration workflows reducing meeting time by 40% through automated opinion clustering and actionable insights.",
      "Engineered high-throughput APIs handling 1M+ requests/hour with 99.99% uptime during 10x traffic spikes.",
      "Architected cloud-native solutions on AWS/GCP achieving high availability and fault tolerance, reducing vendor lock-in by 70%.",
    ],
  },
  {
    company: "TazteqPk", role: "Senior Software Engineer", date: "2018 – 2020",
    desc: [
      "First engineering hire — designed scalable ERP architecture from scratch, establishing best practices that became the foundation for product growth.",
      "Built and optimized core ERP modules (Inventory, HRM, Sales/Purchase, Reporting) with real-time stock tracking, payroll management, and dynamic dashboards.",
      "Developed reusable Angular components, pipes, and directives, ensuring consistency and reducing development effort across the platform.",
      "Implemented role-based access control (RBAC) and SSE-based real-time notifications for secure, instant updates across modules.",
      "Optimized performance with lazy loading, change detection tuning, and code splitting, achieving faster load times and improved scalability.",
      "Delivered comprehensive unit/integration tests using Jasmine & Karma, reducing regressions and maintaining high code quality.",
    ],
  },
  {
    company: "Whitehats", role: "Software Engineer", date: "2016 – 2018",
    desc: [
      "Delivered pixel-perfect, responsive Angular applications, translating complex UI/UX designs into polished interfaces.",
      "Architected reusable, modular components, reducing code duplication and accelerating development cycles.",
      "Worked with cross-functional teams to integrate RESTful APIs, ensuring seamless data flow and optimal performance.",
      "Implemented performance optimizations and profiling techniques, achieving fast load times and high responsiveness.",
      "Led code reviews to enforce coding standards, share best practices, and drive team-wide quality improvements.",
      "Enhanced accessibility and cross-browser compatibility, delivering consistent experiences across all devices.",
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
