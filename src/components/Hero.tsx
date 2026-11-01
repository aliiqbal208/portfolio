"use client";

import Image from "next/image";
import { ArrowDown, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/lib/content";
import { openCalendlyPopup } from "@/lib/calendly";

const { hero, contact } = content;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh lg:h-dvh bg-navy flex flex-col justify-between overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 flex justify-between items-start px-8 md:[@media(max-height:830px)]:pr-20 pt-20 text-[10px] md:text-sm font-orbitron tracking-[0.2em] text-muted-foreground uppercase"
      >
        <div className="flex flex-col gap-1">
          <span>{hero.location.region}</span>
          <span className="text-white">{hero.location.city}</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>{hero.specialty.label}</span>
          <span className="text-white whitespace-nowrap tracking-[0.1em] sm:tracking-[0.2em]">{hero.specialty.value}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex-1 flex items-center justify-center"
      >
        {/* The visible h1 lives in the identity block below; the watermark is decorative. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-[45vw] font-bebas leading-none text-white/5 select-none pointer-events-none tracking-tighter"
        >
          {hero.title}
        </div>
        <div className="relative z-10 w-full max-w-4xl aspect-4/3 max-h-[42dvh] lg:max-h-none lg:[@media(max-height:820px)]:max-h-[calc(100dvh-280px)] flex items-center justify-center group mt-[25px]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={800}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 brightness-75 hover:brightness-100"
          />
        </div>
      </motion.div>

      {/* Identity block: stacks under the photo on small screens, sits left of it on desktop. */}
      <div className="relative z-20 px-8 mt-4 lg:mt-0 lg:px-0 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(32vw,420px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center gap-5 lg:gap-6 lg:items-start lg:text-left"
        >
          <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 font-orbitron text-[10px] uppercase tracking-[0.2em] text-white/80">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {contact.globe.availability}
          </span>

          <h1 className="font-bebas uppercase leading-[0.9] tracking-wide text-white text-[clamp(2.75rem,12vw,4rem)] lg:text-[clamp(3.25rem,5vw,6rem)]">
            {hero.headline.name}
            <span className="mt-4 block font-orbitron text-xs md:text-sm font-normal leading-snug tracking-[0.2em] text-primary">
              {hero.headline.title}
            </span>
          </h1>

          <div className="order-last lg:order-none flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={contact.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openCalendlyPopup(contact.calendlyUrl).then((ok) => {
                  if (!ok) window.open(contact.calendlyUrl, "_blank", "noopener,noreferrer");
                });
              }}
              className="inline-flex items-center justify-center gap-2 bg-primary text-navy font-orbitron font-bold text-[11px] uppercase tracking-[0.12em] px-4 py-3 border-2 border-primary shadow-[4px_4px_0_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.9)]"
            >
              <Calendar className="w-4 h-4" />
              {hero.cta.primary}
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-orbitron font-bold text-[11px] uppercase tracking-[0.12em] px-4 py-3 border-2 border-white shadow-[4px_4px_0_0_rgba(14,165,199,0.9)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(14,165,199,0.9)]"
            >
              <ArrowDown className="w-4 h-4" />
              {hero.cta.secondary}
            </a>
          </div>

          <div className="flex gap-6 lg:gap-8 border-t border-white/10 pt-4 lg:pt-5">
            {hero.proof.map((p) => (
              <div key={p.label} className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-bebas text-3xl leading-none text-white">{p.value}</span>
                <span className="font-orbitron text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{p.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 px-8 pb-12 flex flex-col items-center gap-10 mt-8 lg:mt-[-135px]"
      >
        {/* Fades the portrait's lower edge into the page so the tagline stays readable. */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-x-0 bottom-0 -z-10 h-64 pointer-events-none bg-linear-to-t from-navy via-navy/85 to-transparent"
        />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs md:text-sm font-orbitron text-white/90 tracking-[0.2em] uppercase leading-relaxed max-w-3xl mx-auto">
            {hero.tagline.before}{" "}
            <span className="text-primary font-semibold">{hero.tagline.highlight}</span>{" "}
            {hero.tagline.after}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[8px] font-orbitron tracking-[0.3em] text-white uppercase">
            {hero.scrollLabel}
          </span>
          <ChevronDown className="w-4 h-4 text-primary" />
        </div>
      </motion.div>
    </section>
  );
}
