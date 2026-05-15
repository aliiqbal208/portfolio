"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import content from "@/lib/content";

const { faq } = content;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 px-8 overflow-hidden bg-navy">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-ice/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title={faq.sectionTitle} subtitle={faq.sectionSubtitle} align="left" className="mb-24" />

        <div className="space-y-0 border-y border-white/10">
          {faq.items.map((item, i) => (
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
                        <span className="text-[10px] font-orbitron text-primary uppercase tracking-widest border-b border-primary/20 pb-1 group-hover/link:border-primary transition-all">{faq.diveDeeper}</span>
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
