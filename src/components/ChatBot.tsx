"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack")) {
      return "Ali is proficient in: **Frontend** (React, Next.js, Angular, TypeScript, Tailwind), **Backend** (Node.js, NestJS, Django, Flask), **AI/ML** (LangChain, OpenAI, PyTorch, TensorFlow), **Cloud** (AWS, Azure, Docker, K8s), and **Databases** (PostgreSQL, MongoDB, Redis). Over 25+ frameworks mastered!";
    }
    if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) {
      return "Some notable projects include:\n• **Arthur Vibe** – AI transformation agent for enterprises (Go, pgvector, OpenAI)\n• **Arthur Web App** – React/WebGL platform with real-time AV and RBAC\n• **Govava** – World's first AI gift discovery engine (Elasticsearch, ML recommendations)\n• **ViXa Identity-First** – AI-powered cybersecurity anomaly detection platform\n• **Adology AI** – Ad intelligence platform processing millions of Facebook & TikTok ads\n• **Remar VT** – SaaS e-learning platform for nursing education with Stripe integration";
    }
    if (msg.includes("experience") || msg.includes("year") || msg.includes("career")) {
      return "Ali has 8+ years of experience as a Tech Lead & Full Stack Architect. He has delivered 35+ projects across AI, distributed systems, and cloud architecture, working with global teams and handling millions of users.";
    }
    if (msg.includes("contact") || msg.includes("hire") || msg.includes("available")) {
      return "Ali is currently **available for projects**! You can reach out via the Contact section below, or scroll down to schedule a call. He's based in Lahore, Pakistan (GMT+5).";
    }
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hey there! 👋 I'm Ali's AI assistant. Ask me about his skills, projects, experience, or services!";
    }
    if (msg.includes("service")) {
      return "Ali offers: Creative Design, Full Stack Development, AI Integration, Cloud Architecture, Cybersecurity & IAM, Distributed Systems, IoT & Edge Solutions, and Data Engineering.";
    }
    if (msg.includes("ai") || msg.includes("machine learning") || msg.includes("ml")) {
      return "Ali specializes in AI/ML integration using LangChain, OpenAI, TensorFlow, and PyTorch. He's built AI chat platforms, real-time transcription systems, image-to-3D pipelines, and conversational avatar systems with sub-200ms latency.";
    }
    return "That's a great question! Ali is a Tech Lead with 8+ years building scalable AI-driven platforms. Feel free to ask about his specific skills, projects, services, or experience — I'm here to help!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[99]" style={{ userSelect: "none", touchAction: "none" }}>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="absolute bottom-16 left-0 w-[calc(100vw-4rem)] sm:w-[350px] h-[60vh] sm:h-[500px] glass-dark flex flex-col border border-white/10 overflow-hidden rounded-2xl origin-bottom-left"
          style={{ opacity: 1, transform: "none" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-primary/10 flex items-center gap-2">
            <Bot className="text-primary w-5 h-5" />
            <div className="font-orbitron text-xs font-bold tracking-widest text-white uppercase">
              MA-Assistant
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-xs mt-10 font-inter">
                Hi! I am Ali&apos;s AI assistant. Ask me anything about his projects, skills, or experience!
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white/5 text-white/80 border border-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg rounded-bl-none px-3 py-2 text-sm text-white/60">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer"
        style={{ transform: "none" }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
