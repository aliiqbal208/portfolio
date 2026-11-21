"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import content from "@/lib/content";
import { hasSection, variantConfig } from "@/lib/variant";
import { RESUME_URL } from "@/lib/site";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BULLET = /^\s*[-*•]\s+/;

/* **bold** → <strong>. Built as React nodes, so nothing is injected as HTML. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*\n]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

/* Minimal markdown for assistant replies: paragraphs, bullet lists, bold. */
function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc pl-4 space-y-1">
        {bullets.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
      </ul>
    );
    bullets = [];
  };

  for (const line of text.split("\n")) {
    if (BULLET.test(line)) {
      bullets.push(line.replace(BULLET, ""));
    } else {
      flush();
      if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{renderInline(line)}</p>);
    }
  }
  flush();

  return <div className="space-y-2">{blocks}</div>;
}

const { about, contact, services, skills, projects, experience } = content;

/* Fallback answers, used when /api/chat is unavailable. Every fact is read
   from site-content.json so these never drift from the rest of the site. */
const stat = (label: RegExp) => about.stats.find((s) => label.test(s.label))?.value;
const list = (lines: string[]) => lines.map((l) => `- ${l}`).join("\n");

const REPLIES: { match: RegExp; reply: () => string }[] = [
  {
    match: /\b(skills?|tech|technolog(y|ies)|stack|tools?)\b/,
    reply: () => {
      const frameworks = stat(/framework/i);
      const rows = skills.categories
        .slice(0, 6)
        .map((c) => `**${c.title}**: ${c.items.slice(0, 5).join(", ")}`);
      return `Ali's core skills:\n${list(rows)}${frameworks ? `\n\nAcross ${frameworks} frameworks and tools.` : ""}`;
    },
  },
  {
    match: /\b(experience|years?|career|background)\b/,
    reply: () => {
      const years = stat(/year/i);
      const delivered = stat(/project/i);
      const summary = [years && `${years} years of experience`, delivered && `${delivered} projects delivered`]
        .filter(Boolean)
        .join(" and ");
      const current = experience.items[0];
      return `${summary ? `Ali has ${summary}. ` : ""}Most recently he's ${current.role} at ${current.company} (${current.date}).`;
    },
  },
  {
    match: /\b(projects?|portfolio|work|built)\b/,
    reply: () => {
      const rows = projects.items.slice(0, 6).map((p) => `**${p.title}** (${p.tech.slice(0, 3).join(", ")})`);
      return `Featured projects:\n${list(rows)}\n\nThe Projects section has the details.`;
    },
  },
  {
    match: /\b(contact|hire|hiring|available|availability|email|book|call|reach)\b/,
    reply: () => {
      const next =
        variantConfig.primaryAction === "calendly"
          ? `book a call: ${contact.calendlyUrl}`
          : `download his résumé: ${RESUME_URL}`;
      return `Ali is ${contact.globe.availability.toLowerCase()}. Email ${contact.email} or ${next}. He's based in ${contact.globe.location} (${contact.globe.timezone}).`;
    },
  },
  ...(hasSection("services")
    ? [{
        match: /\b(services?|offers?)\b/,
        reply: () => `Ali offers:\n${list(services.items.map((s) => s.title))}`,
      }]
    : []),
  {
    match: /\b(ai|machine learning|ml|llm|rag)\b/,
    reply: () => {
      const focus = hasSection("services")
        ? services.items.find((s) => /\bai\b/i.test(s.title))?.features
        : about.vision.specializations;
      const tools = skills.categories.find((c) => /\bai\b/i.test(c.title));
      if (!focus) return DEFAULT_REPLY;
      return `AI is Ali's main focus. He works on:\n${list(focus)}${tools ? `\n\nTools include ${tools.items.slice(0, 6).join(", ")}.` : ""}`;
    },
  },
  {
    match: /\b(hi|hello|hey)\b/,
    reply: () =>
      `Hi! I'm Ali's AI assistant. Ask me about his skills, projects, experience${hasSection("services") ? ", or services" : ", or availability"}.`,
  },
];

const DEFAULT_REPLY = `That one's outside what this assistant covers. Ask about Ali's skills, projects, ${hasSection("services") ? "services, " : ""}experience, or availability, or use the Contact section to reach him.`;

function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  return REPLIES.find((r) => r.match.test(msg))?.reply() ?? DEFAULT_REPLY;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  /* Locked from send until the whole reply has streamed in. The ref also
     blocks a second send in the same tick (e.g. a held Enter key). */
  const [isBusy, setIsBusy] = useState(false);
  const busyRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Keep the cursor in the input: on open, and after each reply finishes. */
  useEffect(() => {
    if (isOpen && !isBusy) inputRef.current?.focus();
  }, [isOpen, isBusy]);

  const handleSend = async () => {
    if (!input.trim() || busyRef.current) return;
    busyRef.current = true;
    setIsBusy(true);

    const userMsg: Message = { role: "user", content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setIsTyping(true);

    let started = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error(`Request failed: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });

        if (!started) {
          // First token arrived — swap the "Thinking..." indicator for the message.
          started = true;
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "assistant", content: acc }]);
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: acc };
            return next;
          });
        }
      }

      // Empty stream — fall back so the visitor always gets a reply.
      if (!started) throw new Error("Empty response");
    } catch {
      /* If the stream broke midway, keep the partial answer instead of
         appending a second, unrelated canned reply. */
      if (!started) {
        const response = generateResponse(userMsg.content);
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      }
    } finally {
      setIsTyping(false);
      busyRef.current = false;
      setIsBusy(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[99]" style={{ userSelect: "none", touchAction: "none" }}>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="absolute bottom-16 left-0 w-[calc(100vw-4rem)] sm:w-[350px] h-[60vh] sm:h-[500px] glass-dark flex flex-col border border-white/10 overflow-hidden rounded-2xl origin-bottom-left"
          style={{ opacity: 1, transform: "none", backgroundColor: "rgba(18, 24, 42, 0.98)" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-primary/10 flex items-center gap-2">
            <Bot className="text-primary w-5 h-5" />
            <div className="font-orbitron text-xs font-bold tracking-widest text-white uppercase">
              MA-Assistant
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
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
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-none whitespace-pre-wrap"
                      : "bg-white/5 text-white/80 border border-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.role === "user" ? msg.content : <RichText text={msg.content} />}
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
              ref={inputRef}
              aria-label="Message"
              disabled={isBusy}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              disabled={isBusy || !input.trim()}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer"
        style={{ transform: "none" }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
