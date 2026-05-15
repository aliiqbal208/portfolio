"use client";

import {
  Code, Server, Cpu, Cloud, Database, Layers, Zap,
  FileCode, GitBranch, Brain, Flame, Container,
  Wind, Atom, Boxes, RefreshCcw, FileBraces,
  Radio, MessageSquare, Mic, Bot, Workflow, Network,
  HardDrive, GitPullRequest, BarChart3, Globe, Plug, Shield,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import content from "@/lib/content";

const { skills } = content;

// Icon mapping from string to component
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Server, Cpu, Cloud, Database, Layers, Zap,
  FileCode, GitBranch, Brain, Flame, Container,
  Wind, Atom, Boxes, RefreshCcw, FileBraces,
  Radio, MessageSquare, Mic, Bot, Workflow, Network,
  HardDrive, GitPullRequest, BarChart3, Globe, Plug, Shield,
};

// Skill item icon mapping
const SKILL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "JavaScript": FileBraces, "TypeScript": FileBraces,
  "Node.js": Zap, "Python": FileCode, "Golang": Flame,
  "React": Atom, "Next.js": Boxes, "Angular": Layers,
  "Redux": RefreshCcw, "RxJS": Radio,
  "Redux Toolkit": RefreshCcw, "Redux-Saga": Workflow,
  "Tailwind CSS": Wind, "Styled Components": FileCode,
  "Ant Design": Layers, "Angular Material": Layers,
  "WebGL": Cpu, "SSE": Radio,
  "Web Audio API": Mic, "SASS / LESS": FileCode,
  "NestJS": Server, "Express": Zap, "Fastify": Flame,
  "Go Fiber": Wind, "FastAPI": Zap,
  "Prisma": Database, "Mongoose": Database,
  "Zod": FileBraces, "Kysely": Database,
  "Stripe": Plug, "REST APIs": Network, "3rd Party APIs": Plug,
  "OpenAI": Brain, "Hugging Face": Bot,
  "LLMs": Cpu, "RAG Pipelines": GitBranch,
  "Semantic Search": Globe, "Chatbot Dev": MessageSquare,
  "Speech Processing": Mic, "AI Automations": Workflow,
  "Agentic AI": Bot, "MCP": Plug,
  "Vector DBs": Database, "Prompt Engineering": MessageSquare,
  "Data Pipelines": Workflow, "LangChain": GitBranch, "NLP": Brain,
  "AWS": Cloud, "S3": HardDrive, "Lambda": Zap,
  "EC2": Server, "API Gateway": Network,
  "GCP": Cloud, "Cloud Run": Container,
  "Cloud Functions": Zap, "Eventarc": Radio,
  "Azure": Cloud, "Docker": Container,
  "Redis": Radio, "Sentry": BarChart3,
  "GitHub Actions": GitPullRequest, "Bitbucket": GitBranch,
  "PostgreSQL": Database, "MongoDB": Database,
  "MySQL": Database, "DynamoDB": Database,
  "Jest": Zap, "Playwright": Globe,
  "Cypress": Layers, "React Testing Lib": Atom,
  "Mocha / Chai": FileCode, "Jasmine / Karma": Flame,
  "TDD": RefreshCcw, "e2e Testing": Network,
  "AB Testing": BarChart3, "Unit & Integration": Boxes,
  "OAuth 2.0": Plug, "SSO": Network,
  "2FA": Zap, "JWT": FileBraces,
  "DDoS Mitigation": Layers, "SQL Injection": Database,
  "MitM Prevention": Radio, "XSS / CSRF": Code,
  "Microservices": Boxes, "Micro-frontends": Layers,
  "Scalable Systems": Network, "Serverless": Cloud,
  "Event-driven": Zap, "MVC / MVVM": RefreshCcw,
  "SOLID": Code, "Flux": Workflow,
  "Kafka": Radio, "WebSockets": Radio,
  "Pub/Sub": Radio, "Agile / Scrum": GitPullRequest,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-8 bg-navy-light/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={skills.sectionTitle} subtitle={skills.sectionSubtitle} className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((cat, i) => {
            const CategoryIcon = ICON_MAP[cat.icon] || Code;
            return (
              <div key={i} className="glass-dark p-8 border-t-2 border-primary/20 hover:border-primary transition-all duration-500 group/card">
                <CategoryIcon className="w-8 h-8 text-primary mb-6 group-hover/card:scale-110 transition-transform" />
                <h3 className="text-2xl font-bebas text-white mb-4 uppercase tracking-widest">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => {
                    const ItemIcon = SKILL_ICON_MAP[item] || Code;
                    return (
                      <div key={j} className="relative group/skill">
                        <span className="cursor-default block text-xs font-inter text-muted-foreground group-hover/skill:text-primary transition-colors duration-300 px-2 py-1 border border-white/5 bg-white/5 rounded relative z-10">
                          {item}
                        </span>
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-28 h-28 bg-primary rounded-xl opacity-0 translate-y-4 scale-75 invisible group-hover/skill:opacity-100 group-hover/skill:translate-y-0 group-hover/skill:scale-100 group-hover/skill:visible transition-all duration-500 z-50 pointer-events-none shadow-[0_20px_50px_rgba(8,136,174,0.4)] flex flex-col items-center justify-center">
                          <ItemIcon className="w-10 h-10 text-white mb-2" />
                          <span className="text-[10px] text-white font-bold uppercase tracking-widest text-center px-1 leading-tight">{item}</span>
                          <div className="absolute inset-0 bg-white/10 blur-xl -z-10 rounded-xl" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
