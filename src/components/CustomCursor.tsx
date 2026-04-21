"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isListItem, setIsListItem] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Use GSAP quickSetter for performance
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // Dot follows immediately
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    // Ring follows with lerp via GSAP ticker
    const onTick = () => {
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.15;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.15;
      setRingX(smoothMouse.current.x);
      setRingY(smoothMouse.current.y);
    };

    gsap.ticker.add(onTick);

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute("data-cursor-text");
      const isLi = target.tagName.toLowerCase() === "li" || !!target.closest("li");
      setIsHovering(true);
      setIsListItem(isLi);
      if (text) setCursorText(text);

      gsap.to(ring, {
        scale: text ? 4 : isLi ? 2.5 : 2,
        backgroundColor: "rgba(8, 136, 174, 0.1)",
        borderColor: "#0888ae",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      setIsHovering(false);
      setIsListItem(false);
      setCursorText("");

      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(8, 136, 174, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const bindHoverables = () => {
      document
        .querySelectorAll("a, button, [data-cursor-text], li, .clickable")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter as EventListener);
          el.addEventListener("mouseleave", onLeave as EventListener);
        });
    };
    bindHoverables();

    const observer = new MutationObserver(() => bindHoverables());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(onTick);
      observer.disconnect();
      document
        .querySelectorAll("a, button, [data-cursor-text], li, .clickable")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter as EventListener);
          el.removeEventListener("mouseleave", onLeave as EventListener);
        });
    };
  }, []);

  return (
    <>
      {/* Ring - follows with lerp */}
      <div
        ref={ringRef}
        id="custom-cursor-ring"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center border transition-colors duration-300 hidden md:flex"
        style={{
          width: "40px",
          height: "40px",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          borderColor: "rgba(8, 136, 174, 0.5)",
        }}
      >
        {cursorText && (
          <span className="text-[6px] font-bold uppercase tracking-wider text-primary whitespace-nowrap px-2">
            {cursorText}
          </span>
        )}
        {isListItem && !cursorText && (
          <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
        )}
      </div>

      {/* Dot - follows immediately */}
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-primary hidden md:block"
        style={{
          width: "6px",
          height: "6px",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
