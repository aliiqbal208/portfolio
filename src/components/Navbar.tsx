"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House, User, Trophy, Briefcase, Cpu, LayoutGrid, Quote, CircleHelp, Mail, Menu, X, FlaskConical,
} from "lucide-react";
import { SHOW_LABS } from "./Labs";

const NAV_ITEMS = [
  { id: "hero",         icon: House,        label: "Home"        },
  { id: "about",        icon: User,         label: "About"       },
  { id: "portfolio",    icon: Trophy,       label: "Projects"    },
  ...(SHOW_LABS ? [{ id: "labs", icon: FlaskConical, label: "Labs" }] : []),
  { id: "experience",   icon: Briefcase,    label: "Experience"  },
  { id: "skills",       icon: Cpu,          label: "Skills"      },
  { id: "services",     icon: LayoutGrid,   label: "Services"    },
  { id: "testimonials", icon: Quote,        label: "Testimonials"},
  { id: "faq",          icon: CircleHelp,   label: "FAQ"         },
  { id: "contact",      icon: Mail,         label: "Contact"     },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-8 right-8 z-[100] md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-primary border border-white/10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] glass-dark flex flex-col items-center justify-center gap-6 p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 text-3xl font-bebas text-white tracking-widest hover:text-primary transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} title={item.label}
            className="group flex items-center justify-center w-12 h-12 rounded-full glass-dark hover:bg-primary/20 transition-colors duration-300 relative cursor-pointer">
            <item.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors pointer-events-none" />
            <span className="absolute right-14 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur px-3 py-1 rounded text-xs font-bold whitespace-nowrap border border-white/10 uppercase tracking-widest pointer-events-none">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
