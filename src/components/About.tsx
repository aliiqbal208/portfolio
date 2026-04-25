"use client";

import Image from "next/image";
import { Code, Cloud } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative min-h-screen py-20 bg-navy">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* Photo card */}
          <div className="glass-dark border-t-2 border-primary/20 flex flex-col justify-between relative overflow-hidden group">
            <Image
              src="/assets/images/m.ali-about.png"
              alt="Muhammad Ali"
              width={400}
              height={600}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="eager"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 via-black/50 to-transparent">
              <p className="font-bebas text-2xl text-white tracking-widest mb-1">Muhammad Ali</p>
              <p className="text-[10px] font-orbitron text-ember uppercase tracking-[0.2em]">Tech Lead & Architect</p>
            </div>
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-6 justify-between h-full">
            <div className="glass-dark p-8 border-l-4 border-ember flex-1 flex flex-col justify-center transition-all duration-500 hover:bg-white/5">
              <h3 className="text-6xl font-bebas text-ember tracking-widest leading-none">8+</h3>
              <p className="text-[10px] font-orbitron uppercase tracking-[0.3em] text-muted-foreground mt-2">Years Exp.</p>
            </div>
            <div className="glass-dark p-8 border-l-4 border-ice flex-1 flex flex-col justify-center transition-all duration-500 hover:bg-white/5">
              <h3 className="text-6xl font-bebas text-ice tracking-widest leading-none">35+</h3>
              <p className="text-[10px] font-orbitron uppercase tracking-[0.3em] text-muted-foreground mt-2">Projects</p>
            </div>
            <div className="glass-dark p-8 border-l-4 border-white flex-1 flex flex-col justify-center transition-all duration-500 hover:bg-white/5">
              <h3 className="text-6xl font-bebas text-white tracking-widest leading-none">25+</h3>
              <p className="text-[10px] font-orbitron uppercase tracking-[0.3em] text-muted-foreground mt-2">Frameworks</p>
            </div>
          </div>

          {/* Vision card */}
          <div className="glass-dark p-10 border-t-2 border-primary/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code className="w-24 h-24 text-primary" />
            </div>
            <div>
              <h2 className="text-5xl font-bebas text-white mb-8 uppercase leading-[0.9]">
                The <br />
                <span className="text-primary italic">Vision</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-inter">
                Building at the intersection of{" "}
                <span className="text-white">precision engineering</span> and{" "}
                <span className="text-white">human-centric design</span> — architecting{" "}
                <span className="text-white">scalable systems</span>,{" "}
                <span className="text-white">cloud-native platforms</span>, and{" "}
                <span className="text-white">AI-driven ecosystems</span> that perform under real-world pressure.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[10px] font-orbitron text-ice uppercase tracking-widest mb-2">Specialization</p>
              <div className="flex flex-wrap gap-2">
                {["AI/ML", "Full Stack", "Scalable Systems", "RAG Pipelines"].map((s) => (
                  <span key={s} className="text-[10px] px-2 py-1 bg-white/5 text-white/60 rounded border border-white/5">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Status + Cloud column */}
          <div className="flex flex-col gap-6 h-full">
            <div className="glass-dark p-8 border border-emerald-500/20 flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center animate-pulse-slow mx-auto mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                </div>
                <p className="text-[10px] font-orbitron text-emerald-500 uppercase tracking-[0.3em] mb-1">Current Status</p>
                <p className="text-sm text-white font-bold uppercase tracking-widest">Available</p>
              </div>
            </div>
            <div className="glass-dark p-8 border border-ice/20 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-ice/50 transition-colors">
              <div className="absolute inset-0 bg-ice/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Cloud className="w-12 h-12 text-ice mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-2xl font-bebas text-white tracking-widest mb-2">Cloud Native</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Solutions Architect</p>
              <a href="#contact" className="z-10 mt-6 text-[10px] font-orbitron text-ice border-b border-ice/30 pb-1 hover:text-white hover:border-white transition-all">
                Let&apos;s Discuss
              </a>
            </div>
          </div>

          {/* Tech marquee */}
          <div className="md:col-span-4 glass-dark p-8 overflow-hidden relative">
            <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap items-center opacity-30">
              {["React", "Next.js", "Node.js", "TypeScript", "Python", "Golang", "AWS", "GCP", "Azure", "Docker", "NestJS", "FastAPI", "OpenAI", "RAG", "LLMs", "Kafka", "PostgreSQL", "MongoDB", "Redis", "WebSockets"].map((t) => (
                <span key={t} className="text-4xl font-bebas text-white tracking-[0.2em] px-8">{t}</span>
              ))}
              {["React", "Next.js", "Node.js", "TypeScript", "Python", "Golang", "AWS", "GCP", "Azure", "Docker", "NestJS", "FastAPI", "OpenAI", "RAG", "LLMs", "Kafka", "PostgreSQL", "MongoDB", "Redis", "WebSockets"].map((t) => (
                <span key={t + "-dup"} className="text-4xl font-bebas text-white tracking-[0.2em] px-8">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
