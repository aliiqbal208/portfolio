"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

const SERVICES = [
  { title: "Creative Design", desc: "Crafting visually stunning and highly functional user interfaces that blend art with usability. We focus on storytelling through design, ensuring your brand leaves a lasting impression.", features: ["UI/UX Design", "Brand Identity", "Motion Graphics", "Design Systems"] },
  { title: "Full Stack Development", desc: "Building robust, scalable web applications from the ground up. Our expertise covers both frontend and backend technologies, ensuring a seamless and high-performance user experience.", features: ["React & Next.js", "Node.js & NestJS", "Database Architecture", "API Development"] },
  { title: "AI Integration", desc: "Empowering your business with cutting-edge artificial intelligence. We integrate LLMs, computer vision, and predictive analytics to automate workflows and enhance decision-making.", features: ["LLM Integration", "Custom AI Agents", "Predictive Modeling", "NLP Solutions"] },
  { title: "Cloud Architecture", desc: "Designing and managing high-availability cloud ecosystems. We ensure your infrastructure is secure, cost-effective, and capable of scaling with your business needs.", features: ["AWS / Azure", "Docker & Kubernetes", "Serverless Computing", "Cloud Security"] },
  { title: "Cybersecurity & IAM", desc: "Implementing zero-trust security architectures and robust identity management. We specialize in OAuth 2.0, OpenID Connect, and multi-factor authentication to protect your digital assets.", features: ["Zero-Trust Auth", "OAuth 2.0 / OIDC", "Security Auditing", "Identity Management"] },
  { title: "Distributed Systems", desc: "Architecting high-throughput, fault-tolerant distributed networks. We specialize in microservices orchestration, load balancing, and ensuring 99.9% uptime for global scale applications.", features: ["Microservices", "Load Balancing", "Fault Tolerance", "Scalable Logic"] },
  { title: "IoT & Edge Solutions", desc: "Bridging the gap between hardware and software. We build systems that handle massive IoT data streams and perform real-time processing at the edge.", features: ["Fleet Tracking", "Edge Computing", "Sensor Integration", "OTA Updates"] },
  { title: "Data Engineering", desc: "Transforming raw data into actionable insights. We build robust data pipelines, implement semantic search, and design high-performance database architectures.", features: ["Data Pipelines", "Elasticsearch", "Vector Databases", "ETL Processes"] },
];

interface ServiceType {
  title: string;
  desc: string;
  features: string[];
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ServiceType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const handler = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(glow, {
        maskImage: `radial-gradient(circle 150px at ${x}px ${y}px, black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 150px at ${x}px ${y}px, black 0%, transparent 100%)`,
        duration: 0.1,
        ease: "none",
      });
    };
    section.addEventListener("mousemove", handler);
    return () => section.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (selected && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, [selected]);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: "power2.in", onComplete: () => setSelected(null) });
    } else {
      setSelected(null);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-navy py-32 overflow-hidden" id="services">
      <div className="container mx-auto px-8 relative">
        <div className="relative mb-20">
          <h2 className="text-[15vw] font-bebas leading-none select-none tracking-tighter text-[#0000003d] text-center uppercase [webkit-text-stroke:1px_rgba(255,255,255,0.1)]">
            Services
          </h2>
          <div ref={glowRef} className="absolute inset-0 pointer-events-none select-none"
            style={{ maskImage: "radial-gradient(circle 150px at -100% -100%, black 0%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle 150px at -100% -100%, black 0%, transparent 100%)" }}>
            <h2 className="text-[15vw] font-bebas leading-none text-primary tracking-tighter text-center uppercase">Services</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => (
            <div key={i} className="group glass-dark p-10 border-t-2 border-primary/20 hover:border-primary transition-all duration-500 hover:bg-white/5 cursor-pointer"
              onClick={() => setSelected(svc)}>
              <span className="text-primary font-orbitron text-xs mb-4 block opacity-50">0{i + 1}</span>
              <h3 className="text-2xl font-bebas text-white tracking-widest group-hover:text-primary transition-colors">{svc.title}</h3>
              <p className="text-sm text-muted-foreground mt-4 font-inter leading-relaxed">
                Developing high-performance solutions with precision and cutting-edge technology.
              </p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-md" onClick={closeModal}>
          <div ref={modalRef} className="glass-dark border border-primary/30 p-8 md:p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-white/50 hover:text-primary transition-colors cursor-pointer">
              <X className="w-6 h-6" />
            </button>
            <span className="text-primary font-orbitron text-xs uppercase tracking-widest mb-4 block">Service Details</span>
            <h2 className="text-5xl font-bebas text-white tracking-widest mb-6">{selected.title}</h2>
            <p className="text-lg text-muted-foreground font-inter leading-relaxed mb-8">{selected.desc}</p>
            <div className="grid grid-cols-2 gap-4">
              {selected.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-sm font-orbitron text-white/80 uppercase">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <button className="w-full py-4 border border-primary text-primary font-orbitron uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => { closeModal(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
