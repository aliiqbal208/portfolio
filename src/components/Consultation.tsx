"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, CalendarCheck } from "lucide-react";
import content from "@/lib/content";
import { openCalendlyPopup } from "@/lib/calendly";

const { consultation } = content;

export default function Consultation() {
  return (
    <section id="consultation" className="relative py-20 md:py-28 px-6 md:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="relative glass-dark rounded-3xl px-6 py-12 md:px-14 md:py-16 overflow-hidden text-center flex flex-col items-center group">
          {/* Hover sheen */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />

          <span className="relative z-10 inline-flex items-center gap-2 text-[10px] md:text-xs font-orbitron text-primary uppercase tracking-[0.25em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            {consultation.label}
          </span>

          <h2 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bebas text-white uppercase leading-[0.9] tracking-tight mb-6">
            {consultation.heading}
          </h2>

          <p className="relative z-10 text-base md:text-lg text-muted-foreground font-inter leading-relaxed max-w-2xl mb-8">
            {consultation.description}
          </p>

          <ul className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
            {consultation.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm md:text-base text-white/80 font-inter">
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-primary/40 bg-primary/10">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <a
            href={consultation.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openCalendlyPopup(consultation.ctaUrl).then((ok) => {
                if (!ok) window.open(consultation.ctaUrl, "_blank", "noopener,noreferrer");
              });
            }}
            className="relative z-10 group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-orbitron text-sm md:text-base uppercase tracking-widest font-bold transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(8,136,174,0.45)] hover:scale-[1.03]"
          >
            <CalendarCheck className="w-5 h-5" />
            {consultation.ctaLabel}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
