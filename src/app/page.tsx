"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

/* ── Lazy-load below-the-fold & heavy components ── */
const Skills = dynamic(() => import("@/components/Skills"));
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact")); // Three.js heavy
const Footer = dynamic(() => import("@/components/Footer"));
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const Dock = dynamic(() => import("@/components/Dock"), { ssr: false });

function LogoMark() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="fixed top-8 left-8 z-[100] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-1 font-orbitron text-2xl font-bold tracking-tighter">
        <span className="text-primary italic">M</span>
        <span className="text-foreground">A</span>
        {hovered && (
          <span className="text-foreground/80 font-normal text-sm ml-2 tracking-widest uppercase">
            Muhammad Ali
          </span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = () => setLoading(false);
    if (document.readyState === "complete") done();
    else {
      window.addEventListener("load", done);
      const t = setTimeout(done, 3000);
      return () => {
        window.removeEventListener("load", done);
        clearTimeout(t);
      };
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      <SmoothScroll>
        <main className="relative bg-background">
          <CustomCursor />
          <LogoMark />
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Services />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
      <ChatBot />
      <Dock />
    </>
  );
}