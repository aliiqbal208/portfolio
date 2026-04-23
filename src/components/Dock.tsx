"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Settings, X } from "lucide-react";

const THEMES = [
  { name: "Default", id: "default", primary: "#0888ae", accent: "#00d4ff" },
  { name: "Mocha", id: "mocha", primary: "#8b5e3c", accent: "#d4a373" },
  { name: "Sage", id: "sage", primary: "#4f7942", accent: "#8a9a5b" },
  { name: "Beige", id: "beige", primary: "#d4b996", accent: "#a68a64" },
  { name: "Terracotta", id: "terracotta", primary: "#aa4a44", accent: "#e38e7d" },
  { name: "Teal", id: "teal", primary: "#004953", accent: "#20b2aa" },
  { name: "Emerald", id: "emerald", primary: "#046307", accent: "#c5a021" },
  { name: "Amethyst", id: "amethyst", primary: "#6c244c", accent: "#9b59b6" },
  { name: "Sunset", id: "sunset", primary: "#ff8c00", accent: "#ff4500" },
];

interface DockItemData {
  id: string;
  icon: typeof Download;
  label: string;
  isDownload?: boolean;
  isSettings?: boolean;
}

const DOCK_ITEMS: DockItemData[] = [
  { id: "resume", icon: Download, label: "Resume", isDownload: true },
  { id: "settings", icon: Settings, label: "Settings", isSettings: true },
];

function DockItem({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: DockItemData;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const size = useTransform(distance, [-140, 0, 140], [48, 68, 48]);
  const springSize = useSpring(size, { mass: 0.1, stiffness: 120, damping: 20 });

  return (
    <div
      className="relative flex items-end justify-center cursor-pointer group"
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        style={{ width: springSize, height: springSize }}
        className={`flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${
          isActive
            ? "bg-primary/20 border-primary/40 shadow-[0_0_25px_rgba(8,136,174,0.3)]"
            : "group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        }`}
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <item.icon
          className={`w-1/2 h-1/2 transition-colors duration-500 ${
            isActive ? "text-primary" : "text-white/60 group-hover:text-primary"
          }`}
        />
        {isActive && (
          <motion.div
            layoutId="active-dot"
            className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(8,136,174,0.8)]"
          />
        )}
      </motion.div>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur px-3 py-1 rounded text-xs font-bold whitespace-nowrap border border-white/10 uppercase tracking-widest pointer-events-none shadow-xl">
        {item.label}
      </span>
    </div>
  );
}

export default function Dock() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "default";
    }
    return "default";
  });
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 100;
      setVisible(show);
      if (!show) setSettingsOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (id: string) => {
    setActiveTheme(id);
    if (id === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
    localStorage.setItem("portfolio-theme", id);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/assets/MuhammadAli_Iqbal.pdf";
    a.download = "MuhammadAli_Iqbal_Resume.pdf";
    a.click();
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none">
          {/* Settings Panel */}
          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                className="relative p-5 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[280px] mb-3 pointer-events-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-white text-sm font-semibold tracking-wider uppercase opacity-80">
                      Appearance
                    </h3>
                    <button
                      onClick={() => setSettingsOpen(false)}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all group/close"
                    >
                      <X size={14} className="group-hover/close:rotate-90 transition-transform" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => applyTheme(theme.id)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${
                          activeTheme === theme.id
                            ? "bg-white/10 ring-2 ring-primary/50 -translate-y-0.5"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-white/20 shadow-lg overflow-hidden flex transition-transform hover:scale-110"
                          style={{ background: theme.primary }}
                        >
                          <div className="w-1/2 h-full" style={{ background: theme.primary }} />
                          <div className="w-1/2 h-full" style={{ background: theme.accent }} />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium leading-none">
                          {theme.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-end gap-2 px-3 pb-2.5 pt-2.5 rounded-2xl bg-black/30 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] pointer-events-auto relative transition-all duration-700 hover:bg-black/40 hover:border-white/15"
          >
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {DOCK_ITEMS.map((item) => (
              <DockItem
                key={item.id}
                item={item}
                mouseX={mouseX}
                isActive={!!item.isSettings && settingsOpen}
                onClick={() => {
                  if (item.isSettings) setSettingsOpen(!settingsOpen);
                  else if (item.isDownload) handleDownload();
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
