"use client";

import {
  Code, Server, Cpu, Cloud, Terminal, Layers, Zap, Hexagon,
  FileCode, Coffee, GitBranch, Brain, Flame, Settings,
  CloudFog, Container, Repeat, Smartphone, Monitor, Database,
  Wind, Atom, Boxes, RefreshCcw, FileBraces,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const SKILL_CATEGORIES = [
  {
    title: "Frontend", icon: Code, items: [
      { name: "ReactJS", icon: Atom }, { name: "Next.js", icon: Boxes }, { name: "Angular", icon: Layers },
      { name: "Redux", icon: RefreshCcw }, { name: "TypeScript", icon: FileBraces }, { name: "Tailwind", icon: Wind },
    ],
  },
  {
    title: "Backend", icon: Server, items: [
      { name: "Node.js", icon: Zap }, { name: "NestJS", icon: Hexagon }, { name: "Express", icon: Terminal },
      { name: "Django", icon: FileCode }, { name: "Flask", icon: Coffee }, { name: "Strapi", icon: Layers },
    ],
  },
  {
    title: "Data & AI", icon: Cpu, items: [
      { name: "LangChain", icon: GitBranch }, { name: "OpenAI", icon: Brain }, { name: "TensorFlow", icon: Cpu },
      { name: "PyTorch", icon: Flame }, { name: "ML Ops", icon: Settings },
    ],
  },
  {
    title: "Cloud / DevOps", icon: Cloud, items: [
      { name: "AWS", icon: Cloud }, { name: "Azure", icon: CloudFog }, { name: "Docker", icon: Container },
      { name: "Kubernetes", icon: Container }, { name: "CI/CD", icon: Repeat },
    ],
  },
  {
    title: "Mobile / Desktop", icon: Terminal, items: [
      { name: "React Native", icon: Smartphone }, { name: "Ionic", icon: Smartphone }, { name: "ElectronJS", icon: Monitor },
    ],
  },
  {
    title: "Databases", icon: Database, items: [
      { name: "PostgreSQL", icon: Database }, { name: "MongoDB", icon: Database }, { name: "MySQL", icon: Database },
      { name: "Redis", icon: Zap }, { name: "Firebase", icon: Flame },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-8 bg-navy-light/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills Matrix" subtitle="Technical Stack" className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="glass-dark p-8 border-t-2 border-primary/20 hover:border-primary transition-all duration-500 group/card">
              <cat.icon className="w-8 h-8 text-primary mb-6 group-hover/card:scale-110 transition-transform" />
              <h3 className="text-xl font-orbitron text-white mb-4 uppercase tracking-tighter">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <div key={j} className="relative group/skill">
                    <span className="cursor-default block text-xs font-inter text-muted-foreground group-hover/skill:text-primary transition-colors duration-300 px-2 py-1 border border-white/5 bg-white/5 rounded relative z-10">
                      {item.name}
                    </span>
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-28 h-28 bg-primary rounded-xl opacity-0 translate-y-4 scale-75 invisible group-hover/skill:opacity-100 group-hover/skill:translate-y-0 group-hover/skill:scale-100 group-hover/skill:visible transition-all duration-500 z-50 pointer-events-none shadow-[0_20px_50px_rgba(8,136,174,0.4)] flex flex-col items-center justify-center">
                      <item.icon className="w-10 h-10 text-white mb-2" />
                      <span className="text-[10px] text-white font-bold uppercase tracking-widest text-center px-1 leading-tight">{item.name}</span>
                      <div className="absolute inset-0 bg-white/10 blur-xl -z-10 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
