"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building2, Rocket, Brain, User, Globe, CodeXml } from "lucide-react";

const TESTIMONIALS = [
  { company: "The TEA Group", logo: Building2, headline: "Highly Responsive", content: "Muhammad Ali proved to be a highly responsive and helpful individual, who demonstrated a keen understanding of both the technical issues at hand as well as the project's scope. He was able to swiftly address all of my inquiries and possessed a precise understanding of my requirements.", author: "Dr. Fatima Hafiz", role: "CEO" },
  { company: "Ideawake", logo: Rocket, headline: "Remarkable Speed", content: "Muhammad Ali is a proficient developer who consistently completes assigned tasks with remarkable speed and efficiency. He has shown dedication to the project by working diligently and going the extra mile to ensure all deliverables are met.", author: "Coby Skonord", role: "CEO" },
  { company: "Focusteck", logo: Brain, headline: "Top Notch Developer", content: "Working with Muhammad Ali was like he is a key solution to all the complexities been faced working on the projects. He has a sea of knowledge about the tech stacks and when it comes to technical requirements he knows how to mold the business logics into technical requirement.", author: "Huzefa Mughal", role: "TPM" },
  { company: "ChaseLabs AI", logo: CodeXml, headline: "AI Excellence", content: "Ali architected our AI-powered meeting platform with exceptional precision. His expertise in real-time transcription, LLM integration, and WebSocket optimization delivered a product that exceeded our vision.", author: "Alex Rivers", role: "Founder & CEO" },
  { company: "OneX Studio", logo: Globe, headline: "Deep Visibility", content: "Working with Ali on our AI observability platform was transformative. He built a system that exposes model internals with incredible depth—activations, embeddings, hidden states—all visualized beautifully.", author: "Shuja", role: "Co-Founder" },
  { company: "Memotar AI", logo: User, headline: "Low Latency Master", content: "Ali delivered a real-time conversational avatar platform with sub-200ms latency globally. His expertise in WebRTC, emotional analysis, and lip-syncing created an immersive experience that our users love.", author: "Marcus Thorne", role: "Lead Architect" },
  { company: "Demdikk", logo: Globe, headline: "High Scale Expert", content: "For our national transit system, Ali engineered microservices that handle massive scale with precision. His work on fleet tracking, route optimization, and real-time analytics transformed how we manage transportation.", author: "Atif", role: "Director of Operations" },
  { company: "Revbits", logo: CodeXml, headline: "Security First", content: "Ali integrated our cybersecurity suite with zero-trust OAuth 2.0 and MFA across all modules. His implementation of hardware key support and biometric verification set a new standard.", author: "Sarah Jenkins", role: "Chief Security Officer" },
];

function TestimonialCard({
  data, index, total, radiusX, radiusY, rotation,
}: {
  data: typeof TESTIMONIALS[0]; index: number; total: number; radiusX: number; radiusY: number; rotation: any;
}) {
  const x = useTransform(rotation, (v: number) => Math.cos((index / total * 360 + v) * Math.PI / 180) * radiusX);
  const y = useTransform(rotation, (v: number) => Math.sin((index / total * 360 + v) * Math.PI / 180) * radiusY);
  const opacity = useTransform(y, [-radiusY, 0, radiusY], [0.2, 0.4, 1]);
  const scale = useTransform(y, [-radiusY, radiusY], [0.6, 1]);

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%", opacity, scale }}
      className="absolute top-1/2 left-1/2 group z-10"
    >
      <div className="relative w-[260px] md:w-[320px] glass-dark rounded-2xl p-4 md:p-5 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(8,136,174,0.2)] select-none">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between mb-3 md:mb-4 pointer-events-none">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-navy-light flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider leading-none mb-1 group-hover:text-primary transition-colors">{data.author}</span>
              <span className="text-[8px] md:text-[10px] text-zinc-400 font-medium uppercase tracking-wide">{data.role}, {data.company}</span>
            </div>
          </div>
          <data.logo className="w-5 h-5 md:w-6 md:h-6 text-primary/80 group-hover:text-primary transition-colors" />
        </div>
        <div className="relative z-10 bg-navy/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/5 group-hover:border-primary/20 transition-colors pointer-events-none">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light italic">&quot;{data.content}&quot;</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const rotationValue = useMotionValue(0);
  const rotation = useSpring(rotationValue, { stiffness: 50, damping: 20, mass: 1 });
  const [radiusX, setRadiusX] = useState(480);
  const [radiusY, setRadiusY] = useState(220);

  return (
    <section className="relative min-h-[150vh] bg-navy overflow-hidden flex items-center justify-center py-16 md:py-20" id="testimonials">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)" }} />

      {/* Orbital ellipses */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <svg className="w-full h-full max-w-[1200px] max-h-[1200px]" viewBox="0 0 1000 1000">
          <ellipse cx="500" cy="500" rx={radiusX} ry={radiusY} fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx="500" cy="500" rx={radiusX + 80} ry={radiusY + 80} fill="none" stroke="var(--color-ice)" strokeWidth="0.5" strokeDasharray="2 8" />
          <ellipse cx="500" cy="500" rx={radiusX - 80} ry={radiusY - 80} fill="none" stroke="var(--color-primary)" strokeWidth="0.5" strokeDasharray="8 2" />
        </svg>
      </div>

      {/* Center text */}
      <div className="relative z-10 text-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-8xl lg:text-[10rem] font-cormorant italic select-none leading-none tracking-tighter bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent"
        >
          You win.<br /><span className="z-0"> We grin.</span>
        </motion.h1>
      </div>

      {/* Cards */}
      <motion.div
        onPan={(_, info) => { rotationValue.set(rotationValue.get() + info.delta.x * 0.4); }}
        className="absolute inset-0 flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} data={t} index={i} total={TESTIMONIALS.length} radiusX={radiusX} radiusY={radiusY} rotation={rotation} />
        ))}
      </motion.div>
    </section>
  );
}
