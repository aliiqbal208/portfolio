"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building2, Rocket, Brain, User, Globe, CodeXml } from "lucide-react";

const TESTIMONIALS = [
  { company: "Arthur Technologies", logo: Brain, headline: "Excellent Full-Stack Developer", content: "Muhammad Ali was an excellent Full-Stack Developer on our team, consistently demonstrating strong technical skills, great problem-solving ability, and an impressive work ethic. He approached every task with diligence and dedication, often going the extra mile to ensure high-quality results. Beyond his technical strengths, Ali was a fantastic team player — collaborative, positive, and always contributing to a supportive team spirit.", author: "Christoph Fleischmann", role: "Founder" },
  { company: "Arthur Technologies", logo: CodeXml, headline: "Vital to Our Core Team", content: "Ali had been a vital part of our core team at Arthur — he led efforts to optimise and scale many of our core backend services successfully. He brought several optimisations that improved our performance and scalability. His ability to manage a cross-functional team and take up responsibilities played a vital role in the timely completion of mission-critical projects.", author: "Dinesh Babu", role: "Head of Cloud Engineering" },
  { company: "Remar Nurse", logo: Building2, headline: "E-Learning Done Right", content: "Ali delivered Remar VT on time and to spec — a full SaaS e-learning platform supporting students, admins, and institutions in a single monorepo. The Stripe integration is clean, the video delivery is reliable, and the multi-role architecture scales effortlessly. Our nursing students finally have a platform built for them.", author: "Claire Bennett", role: "Director of Digital Learning" },
  // { company: "Vyoo", logo: Globe, headline: "Community Platform Nailed", content: "Building a community management SaaS is complex — content creation, member management, events, analytics, and monetization all in one product. Ali handled every layer with confidence. The NestJS backend is solid, the React frontend is fast, and the AWS deployment has been rock-stable since launch.", author: "Jordan Lee", role: "Co-Founder" },
  { company: "Govava", logo: Rocket, headline: "AI Discovery at Scale", content: "Ali built the world's first AI-driven gift discovery engine for us — semantic search over millions of product records using Elasticsearch, personalized recommendations via ML algorithms, and a microservices backend that handles real traffic without breaking a sweat. The quality of engineering matched the ambition of the vision.", author: "Carl Richards", role: "CEO" },
  // { company: "Arthur Technologies", logo: User, headline: "Real-Time Comms Mastered", content: "Arthur Companion needed to handle group communication at scale with no compromise on latency. Ali designed the entire real-time layer in Go — WebSocket pipelines, Redis Pub/Sub for channel routing, PostgreSQL for persistence — and it held up perfectly under load. The architecture is clean, observable, and easy to extend.", author: "Omar Patel", role: "Engineering Lead" },
  { company: "Cyberwissen", logo: CodeXml, headline: "Security at Every Layer", content: "ViXa is a demanding product — AI anomaly detection, ML-based cross-layer threat correlation, XDR integration, and full regulatory compliance, all inside a CSMS. Ali delivered every piece with precision. The real-time incident detection pipeline and centralized telemetry gave us observability we never had before.", author: "Shadrack Xavier", role: "Chief Technology Officer" },
  { company: "Adology", logo: Brain, headline: "Ad Intelligence Unlocked", content: "Ali built our entire data backbone — scalable Python pipelines on AWS Batch processing millions of Facebook and TikTok ads, OpenAI integration for labeling and trend detection, and a React dashboard that makes the insights actionable. The platform went from concept to production in record time and hasn't missed a beat since.", author: "James Donner", role: "Head of Product" },
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
  const rotationValue = useMotionValue(90);
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
