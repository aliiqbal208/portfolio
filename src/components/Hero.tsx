"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-dvh min-h-dvh bg-navy flex flex-col justify-between overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 flex justify-between items-start px-8 pt-20 text-[10px] md:text-sm font-orbitron tracking-[0.2em] text-muted-foreground uppercase"
      >
        <div className="flex flex-col gap-1">
          <span>Based in Pakistan</span>
          <span className="text-white">Lahore</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>Full Stack Architect</span>
          <span className="text-white">Tech Lead</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex-1 flex items-center justify-center"
      >
        <h1 className="absolute inset-0 flex items-center justify-center text-[45vw] font-bebas leading-none text-white/5 select-none pointer-events-none tracking-tighter">
          M. Ali
        </h1>
        <div className="relative z-10 w-full max-w-4xl aspect-4/3 flex items-center justify-center group mt-[25px]">
          <Image
            src="/assets/images/musman.jpg"
            alt="M. Ali"
            width={800}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-full object-contain grayscale hover:grayscale-0 transition-all duration-700 brightness-75 hover:brightness-100"
          />
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
            <span className="text-4xl font-bebas text-white tracking-widest">
              Portfolio<span className="text-primary">.</span>
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 px-8 pb-12 flex flex-col items-center gap-10 mt-[-135px]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] md:text-sm font-orbitron text-white/80 tracking-[0.4em] uppercase leading-relaxed max-w-3xl mx-auto">
            Strategic Tech Lead{" "}
            <span className="text-primary">Architecting</span> Scalable
            Ecosystems, Crafting{" "}
            <span className="text-secondary">High-Performance</span> AI
            Solutions With Precision.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[8px] font-orbitron tracking-[0.3em] text-white uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-primary" />
        </div>
      </motion.div>
    </section>
  );
}
