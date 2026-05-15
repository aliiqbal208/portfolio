"use client";

import {
  Code, Server, Cpu, Cloud, Database, Layers, Zap,
  FileCode, GitBranch, Brain, Flame, Container,
  Wind, Atom, Boxes, RefreshCcw, FileBraces,
  Radio, MessageSquare, Mic, Bot, Workflow, Network,
  HardDrive, GitPullRequest, BarChart3, Globe, Plug, Shield,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const SKILL_CATEGORIES = [
  {
    title: "Languages", icon: Code, items: [
      { name: "JavaScript", icon: FileBraces }, { name: "TypeScript", icon: FileBraces },
      { name: "Node.js", icon: Zap }, { name: "Python", icon: FileCode }, { name: "Golang", icon: Flame },
    ],
  },
  {
    title: "Frontend", icon: Atom, items: [
      { name: "React", icon: Atom }, { name: "Next.js", icon: Boxes }, { name: "Angular", icon: Layers },
      { name: "Redux", icon: RefreshCcw }, { name: "RxJS", icon: Radio },
      { name: "Redux Toolkit", icon: RefreshCcw }, { name: "Redux-Saga", icon: Workflow },
      { name: "Tailwind CSS", icon: Wind }, { name: "Styled Components", icon: FileCode },
      { name: "Ant Design", icon: Layers }, { name: "Angular Material", icon: Layers },
      { name: "WebGL", icon: Cpu }, { name: "SSE", icon: Radio },
      { name: "Web Audio API", icon: Mic }, { name: "SASS / LESS", icon: FileCode },
    ],
  },
  {
    title: "Backend", icon: Server, items: [
      { name: "NestJS", icon: Server }, { name: "Express", icon: Zap }, { name: "Fastify", icon: Flame },
      { name: "Go Fiber", icon: Wind }, { name: "FastAPI", icon: Zap },
      { name: "Prisma", icon: Database }, { name: "Mongoose", icon: Database },
      { name: "Zod", icon: FileBraces }, { name: "Kysely", icon: Database },
      { name: "Stripe", icon: Plug }, { name: "REST APIs", icon: Network },
      { name: "3rd Party APIs", icon: Plug },
    ],
  },
  {
    title: "AI & Data", icon: Brain, items: [
      { name: "OpenAI", icon: Brain }, { name: "Hugging Face", icon: Bot },
      { name: "LLMs", icon: Cpu }, { name: "RAG Pipelines", icon: GitBranch },
      { name: "Semantic Search", icon: Globe }, { name: "Chatbot Dev", icon: MessageSquare },
      { name: "Speech Processing", icon: Mic }, { name: "AI Automations", icon: Workflow },
      { name: "Agentic AI", icon: Bot }, { name: "MCP", icon: Plug },
      { name: "Vector DBs", icon: Database }, { name: "Prompt Engineering", icon: MessageSquare },
      { name: "Data Pipelines", icon: Workflow }, { name: "LangChain", icon: GitBranch },
      { name: "NLP", icon: Brain },
    ],
  },
  {
    title: "Cloud & Infra", icon: Cloud, items: [
      { name: "AWS", icon: Cloud }, { name: "S3", icon: HardDrive }, { name: "Lambda", icon: Zap },
      { name: "EC2", icon: Server }, { name: "API Gateway", icon: Network },
      { name: "GCP", icon: Cloud }, { name: "Cloud Run", icon: Container },
      { name: "Cloud Functions", icon: Zap }, { name: "Eventarc", icon: Radio },
      { name: "Azure", icon: Cloud }, { name: "Docker", icon: Container },
      { name: "Redis", icon: Radio }, { name: "Sentry", icon: BarChart3 },
      { name: "GitHub Actions", icon: GitPullRequest }, { name: "Bitbucket", icon: GitBranch },
    ],
  },
  {
    title: "Databases", icon: Database, items: [
      { name: "PostgreSQL", icon: Database }, { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database }, { name: "DynamoDB", icon: Database },
      { name: "Vector DBs", icon: HardDrive },
    ],
  },
  {
    title: "Testing", icon: GitPullRequest, items: [
      { name: "Jest", icon: Zap }, { name: "Playwright", icon: Globe },
      { name: "Cypress", icon: Layers }, { name: "React Testing Lib", icon: Atom },
      { name: "Mocha / Chai", icon: FileCode }, { name: "Jasmine / Karma", icon: Flame },
      { name: "TDD", icon: RefreshCcw }, { name: "e2e Testing", icon: Network },
      { name: "AB Testing", icon: BarChart3 }, { name: "Unit & Integration", icon: Boxes },
    ],
  },
  {
    title: "Security", icon: Shield, items: [
      { name: "OAuth 2.0", icon: Plug }, { name: "SSO", icon: Network },
      { name: "2FA", icon: Zap }, { name: "JWT", icon: FileBraces },
      { name: "DDoS Mitigation", icon: Layers }, { name: "SQL Injection", icon: Database },
      { name: "MitM Prevention", icon: Radio }, { name: "XSS / CSRF", icon: Code },
    ],
  },
  {
    title: "Architecture & Patterns", icon: BarChart3, items: [
      { name: "Microservices", icon: Boxes }, { name: "Micro-frontends", icon: Layers },
      { name: "Scalable Systems", icon: Network }, { name: "Serverless", icon: Cloud },
      { name: "Event-driven", icon: Zap }, { name: "MVC / MVVM", icon: RefreshCcw },
      { name: "SOLID", icon: Code }, { name: "Flux", icon: Workflow },
      { name: "Kafka", icon: Radio }, { name: "WebSockets", icon: Radio },
      { name: "Pub/Sub", icon: Radio }, { name: "Agile / Scrum", icon: GitPullRequest },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-8 bg-navy-light/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills Matrix" subtitle="Technical Stack" className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="glass-dark p-8 border-t-2 border-primary/20 hover:border-primary transition-all duration-500 group/card">
              <cat.icon className="w-8 h-8 text-primary mb-6 group-hover/card:scale-110 transition-transform" />
              <h3 className="text-2xl font-bebas text-white mb-4 uppercase tracking-widest">{cat.title}</h3>
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
