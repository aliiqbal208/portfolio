"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const FAQ_DATA = [
  {
    question: "What is your background and how many years of experience do you have?",
    answer: "I'm Muhammad Ali — a Tech Lead and Senior Software Engineer with 8+ years of experience building scalable web platforms, cloud-native infrastructure, and AI-driven systems. I've been based in Lahore, Pakistan (GMT+5) and am currently a Tech Lead at Arthur Technologies, where I was among the first engineers and helped architect a platform now serving 10K+ users. Across 35+ projects and 25+ technologies, I've led cross-functional teams, designed enterprise SaaS products, and shipped production systems that handle real-world pressure.", category: "Background"
  },
  {
    question: "What services do you offer and what is your primary tech stack?",
    answer: "I offer Full Stack Development (React/Next.js, Node.js/NestJS, Golang, Python), AI & LLM Integration (RAG pipelines, vector DBs, intelligent agents), Cloud Architecture (AWS/GCP multi-cloud, Docker, serverless), Real-Time Systems (WebSockets, event-driven, sub-200ms latency), Cybersecurity & IAM (zero-trust, RBAC/PBAC, XDR), Data Engineering (Elasticsearch, pgvector, ETL), and Enterprise Solutions (ERP, SSO, SaaS). My core stack is TypeScript/JavaScript, Golang, Python, React, NestJS, PostgreSQL, MongoDB, Redis, and AWS/GCP.", category: "Services"
  },
  {
    question: "How have you architected systems that handle millions of requests with near-perfect uptime?",
    answer: "At Arthur Technologies I engineered high-throughput APIs that handle 1M+ requests/hour with 99.99% uptime — including during 10x traffic spikes. The approach combines multi-cloud infrastructure on AWS and GCP to eliminate single points of failure, Redis for distributed caching, asynchronous message queues to absorb burst load, and stateless microservices behind load balancers for horizontal scaling. Observability via distributed tracing and p99 latency monitoring allows proactive intervention before issues surface.", category: "Architecture"
  },
  {
    question: "How do you build and integrate AI and LLM features into production applications?",
    answer: "My most complete example is Arthur Vibe — an end-to-end AI transformation agent I built at Arthur Technologies using Golang, AWS Lambda, pgvector, and OpenAI. It performs document ingestion, runs async stakeholder interviews, and uses semantic search over pgvector to surface contextual answers. The resulting RAG pipeline improved query latency by 35% and answer accuracy by 40%. Beyond RAG, I've built real-time speech pipelines, AI-driven chatbot systems supporting 5K concurrent users at under 200ms latency, and agentic workflows with LangChain and Hugging Face models.", category: "AI & LLM"
  },
  {
    question: "How do you approach real-time systems and what kind of scale have you tested them at?",
    answer: "For Arthur Companion — a real-time group communication platform — I built the entire real-time layer in Golang using WebSockets and Redis Pub/Sub, sustaining 5K+ concurrent users at under 200ms latency. The architecture uses an event-driven model with BullMQ for job queues, Kafka for high-throughput event streams, and Redis for session state and channel routing. I've also built live audio/video streaming pipelines and AI speech processing systems under similar real-time constraints.", category: "Real-Time"
  },
  {
    question: "What is your approach to cloud architecture and how do you avoid vendor lock-in?",
    answer: "I design cloud-native solutions as provider-agnostic by default — abstracting infrastructure behind interfaces and favoring portable runtimes like Docker and Kubernetes over proprietary managed services where alternatives exist. At Arthur Technologies this multi-cloud strategy across AWS and GCP reduced vendor lock-in by 70%. I leverage AWS Lambda and GCP serverless for compute, S3 and equivalent object storage for assets, and DynamoDB or managed PostgreSQL depending on access patterns. Infrastructure is code-first via GitHub Actions CI/CD pipelines.", category: "Cloud"
  },
  {
    question: "Are you available for new projects, and how do you prefer to collaborate?",
    answer: "Yes — I'm currently available for new projects. I work effectively both as a solo technical lead on end-to-end builds and as an embedded engineer within larger teams. My timezone is GMT+5 (Lahore, Pakistan), and I'm comfortable with async-first collaboration. For new engagements I start with a scoping session to clarify functional requirements, non-functional constraints (scale, uptime, latency), and delivery milestones before writing a line of code. You can reach me directly at codewithmuhammadali@gmail.com.", category: "Availability"
  },
  {
    question: "How do you lead engineering teams and what does your tech lead style look like?",
    answer: "At Arthur Technologies I led the engineering team that delivered 20+ product features on schedule. My approach centers on clear technical ownership, structured code reviews, and pair programming to transfer institutional knowledge rather than gate-keep it. I write architecture decision records for significant design choices, break large milestones into testable increments, and treat disagreements as trade-off discussions grounded in data — not seniority. Mentoring junior engineers is deliberate: I identify where they're blocked, not just where they're wrong.", category: "Leadership"
  },
  {
    question: "What types of projects have you shipped and which are you most proud of?",
    answer: "I've shipped 35+ projects across enterprise SaaS, AI platforms, cybersecurity, e-learning, and community management. Stand-outs include: Arthur Vibe (AI enterprise transformation agent), Arthur Companion (real-time communication platform at scale), ViXa (AI-powered identity-first cybersecurity platform with XDR integration), Govava (AI gift discovery with Elasticsearch and DynamoDB), Adology AI (AI ad analysis pipeline in Python/Flask/AWS Batch), and Remar VT (SaaS e-learning platform for nursing). Each represented a distinct architectural challenge — from sub-millisecond latency to ML pipeline design to zero-trust security.", category: "Projects"
  },
  {
    question: "How do you approach security in the systems you build?",
    answer: "Security is structural, not a post-release checklist. For ViXa — an identity-first cybersecurity platform — I implemented zero-trust architecture, AI-powered threat detection, OAuth 2.0/OIDC flows, and XDR integration. Across all projects I enforce RBAC/PBAC at the API layer, validate all inputs at system boundaries, use parameterized queries to prevent injection, and apply least-privilege IAM policies in AWS/Azure. For authentication-critical systems I've worked with SSO, MFA, and session token standards that satisfy compliance requirements.", category: "Security"
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 px-8 overflow-hidden bg-navy">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-ice/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Curated Insights" subtitle="Frequently Asked Questions" align="left" className="mb-24" />

        <div className="space-y-0 border-y border-white/10">
          {FAQ_DATA.map((item, i) => (
            <motion.div
              key={i}
              initial={false}
              className={`group border-b border-white/10 last:border-b-0 transition-colors duration-500 p-2 ${openIndex === i ? "bg-white/5" : "hover:bg-white/2"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-10 md:py-12 flex items-start gap-6 md:gap-12 text-left"
              >
                <div className="flex flex-col items-center pt-2">
                  <span className={`font-orbitron text-xs font-bold transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-white/20 group-hover:text-white/40"}`}>
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-orbitron text-ice uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{item.category}</span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bebas tracking-wider leading-tight transition-all duration-500 ${openIndex === i ? "text-white italic" : "text-white/60 group-hover:text-white"}`}>
                    {item.question}
                  </h3>
                </div>
                <div className="pt-2">
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors duration-500 ${openIndex === i ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(8,136,174,0.5)]" : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white"}`}
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 md:pb-16 pl-[72px] md:pl-[116px] pr-8 md:pr-24">
                      <div className="flex gap-8 md:gap-12 items-start">
                        <div className="w-1 h-12 bg-linear-to-b from-primary to-ice rounded-full mt-2 shrink-0" />
                        <p className="text-base md:text-lg text-muted-foreground font-inter leading-relaxed max-w-3xl">{item.answer}</p>
                      </div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex items-center gap-4 group/link cursor-pointer"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        <span className="text-[10px] font-orbitron text-primary uppercase tracking-widest border-b border-primary/20 pb-1 group-hover/link:border-primary transition-all">Dive Deeper into this Topic</span>
                        <ChevronRight className="w-3 h-3 text-primary group-hover/link:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
