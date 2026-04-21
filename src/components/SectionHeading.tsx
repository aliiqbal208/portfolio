"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  reveal?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "left",
  reveal = true,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const rect = glow.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(glow, {
        maskImage: `radial-gradient(circle 200px at ${x}px ${y}px, black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 200px at ${x}px ${y}px, black 0%, transparent 100%)`,
        duration: 0.1,
        ease: "none",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!reveal || !titleRef.current) return;
    const el = titleRef.current;
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map(
        (c) =>
          `<span class="char inline-block translate-y-[100%] opacity-0">${c === " " ? "&nbsp;" : c}</span>`
      )
      .join("");
    const chars = el.querySelectorAll(".char");
    gsap.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    if (glowRef.current) {
      const glowTitle = glowRef.current.querySelector("h2");
      if (glowTitle) {
        glowTitle.innerHTML = el.innerHTML;
        const glowChars = glowTitle.querySelectorAll(".char");
        gsap.to(glowChars, {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }
  }, [reveal]);

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maskValue = isMobile
    ? "radial-gradient(circle 2000px at 50% 50%, black 0%, transparent 100%)"
    : "radial-gradient(circle 120px at -100% -100%, black 0%, transparent 100%)";

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-10 flex flex-col ${alignClasses[align]} ${className}`}
    >
      <div className="relative inline-block">
        <h2
          ref={titleRef}
          className="text-[10vw] md:text-[12vw] font-bebas leading-[0.85] select-none tracking-tighter text-[#0000003d] uppercase [webkit-text-stroke:1px_rgba(255,255,255,0.1)] whitespace-pre"
        >
          {title}
        </h2>
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none select-none transition-opacity"
          style={{
            maskImage: maskValue,
            WebkitMaskImage: maskValue,
          }}
        >
          <h2 className="text-[10vw] md:text-[12vw] font-bebas leading-[0.85] text-primary tracking-tighter uppercase whitespace-pre">
            {title}
          </h2>
        </div>
      </div>
      {subtitle && (
        <div className="mt-4 flex items-center gap-4">
          <div className="h-[2px] w-12 bg-primary/40" />
          <span className="text-xs md:text-sm font-orbitron text-primary italic uppercase tracking-widest">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
