"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const FAQ_DATA = [
  { question: "What specific methodologies do you employ when designing systems for high availability and horizontal scalability?", answer: "I utilize a multi-layered approach incorporating Redis for distributed caching, round-robin DNS for load balancing, and database sharding for MariaDB/PostgreSQL time-series data. By adhering to the CAP theorem and implementing asynchronous message queues, I ensure the system remains fault-tolerant and responsive under peak traffic loads.", category: "Architecture" },
  { question: "How do you handle technical disagreements within a team, particularly when your manager's decision differs from your architectural approach?", answer: "I facilitate resolution by presenting data-driven trade-offs between competing solutions, prioritizing the project's long-term health and technical debt over personal preference.", category: "Leadership" },
  { question: "Can you describe your process for learning and deploying a new programming language or framework within a tight project deadline?", answer: "I employ an immersive research strategy, utilizing official documentation, community-vetted best practices, and AI-assisted prototyping to build a foundational understanding quickly.", category: "Learning" },
  { question: "What is your systematic approach to diagnosing and resolving critical production bugs in a microservices environment?", answer: "I utilize distributed tracing and centralized logging to isolate the failure point, followed by an iterative debugging process that addresses the root cause rather than symptoms.", category: "Operations" },
  { question: "How do you balance the requirement for shipping new features quickly with the need to refactor and manage technical debt?", answer: "I treat technical debt as a strategic variable, opting for 'pragmatism over technical purity' when speed-to-market is critical, while documenting all debt for scheduled refactoring.", category: "Strategy" },
  { question: "What is your approach to mentoring junior developers and improving the overall code quality of an engineering team?", answer: "I focus on fostering a culture of rigorous code reviews, clear documentation, and pair programming to share institutional knowledge and technical expertise.", category: "Leadership" },
  { question: "How do you apply the four pillars of object-oriented programming (OOP) to enhance the modularity of your system designs?", answer: "I use encapsulation to hide implementation details, inheritance for code reuse, polymorphism for flexible interfaces, and abstraction to simplify complex systems.", category: "Engineering" },
  { question: "What metrics and tools do you use to proactively monitor and detect performance bottlenecks in high-traffic applications?", answer: "I use performance instrumentation and heat maps to track p99 latency, request throughput, and cache hit ratios, allowing for data-driven optimization of resource-intensive components.", category: "Optimization" },
  { question: "Describe your methodology for scoping projects and defining system constraints when requirements are incomplete or ambiguous.", answer: "I employ the 'R-E-S-A-D-E' framework, starting with intensive problem scoping to clarify functional requirements and define non-functional constraints like scale and availability.", category: "Product" },
  { question: "Why are you interested in this specific role, and how does your technical expertise align with our current challenges?", answer: "I am motivated by the opportunity to apply my expertise in scalable distributed systems and AI integration to solve your specific technical challenges.", category: "General" },
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
