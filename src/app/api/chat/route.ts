import type { NextRequest } from "next/server";
import content from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 30;

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";
const MAX_HISTORY = 12;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* Build a compact knowledge base from the site content so the assistant
   answers from real data and stays in sync with the rest of the site. */
function buildKnowledge(): string {
  const c = content;
  const lines: string[] = [];

  lines.push(
    `Name: ${c.about.profile.name} ("${c.hero.title}"). Title: ${c.about.profile.title}.`
  );
  lines.push(`Roles: ${c.hero.roles.primary}; ${c.hero.roles.secondary}.`);
  lines.push(`Location: ${c.contact.globe.location} (${c.contact.globe.timezone}).`);
  lines.push(`Stats: ${c.about.stats.map((s) => `${s.value} ${s.label}`).join(", ")}.`);
  lines.push(`Specializations: ${c.about.vision.specializations.join(", ")}.`);
  lines.push(
    `Availability: ${c.contact.globe.availability}. Email: ${c.contact.email}. Book a call: ${c.contact.calendlyUrl}.`
  );
  lines.push(`Core tech stack: ${c.about.techStack.join(", ")}.`);

  lines.push("\nSkills by category:");
  c.skills.categories.forEach((cat) => lines.push(`- ${cat.title}: ${cat.items.join(", ")}`));

  lines.push("\nServices offered:");
  c.services.items.forEach((s) => lines.push(`- ${s.title}: ${s.desc}`));

  lines.push("\nWork experience:");
  c.experience.items.forEach((e) =>
    lines.push(`- ${e.role} @ ${e.company} (${e.date}): ${e.desc.join(" ")}`)
  );

  lines.push("\nProjects:");
  c.projects.items.forEach((p) =>
    lines.push(`- ${p.title} [${p.tech.join(", ")}] (${p.link}): ${p.description}`)
  );

  lines.push("\nFAQ:");
  c.faq.items.forEach((f) => lines.push(`Q: ${f.question}\nA: ${f.answer}`));

  return lines.join("\n");
}

const KNOWLEDGE = buildKnowledge();

const SYSTEM_PROMPT = `You are MA-Assistant, the assistant embedded on Muhammad Ali's portfolio site. You help visitors learn about Muhammad Ali (Ali) — his background, skills, projects, experience, services, and availability.

Rules:
- Answer only from the knowledge base below. If a question falls outside it, say you focus on Ali's work and offer to connect the visitor with him.
- Refer to Muhammad Ali in the third person ("Ali", "he").
- Be concise and helpful: 2-4 sentences by default. Use short markdown bullet lists only when listing multiple items.
- When a visitor shows hiring intent, point them to the contact email or the booking link.
- Never invent facts, metrics, clients, or links that are not in the knowledge base.

KNOWLEDGE BASE:
${KNOWLEDGE}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? (body.messages as ChatMessage[]) : [];
  const history = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (history.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  const upstream = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.4,
      max_tokens: 500,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      { error: `Upstream error ${upstream.status}`, detail: detail.slice(0, 500) },
      { status: 502 }
    );
  }

  /* Parse the OpenAI SSE stream and re-emit only the text deltas as a
     plain-text stream the client can append directly. */
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const token = JSON.parse(data)?.choices?.[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            /* ignore keep-alive / partial lines */
          }
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
