"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { RESUME_FILENAME, RESUME_URL } from "@/lib/site";
import { RESUME_OPEN_EVENT } from "@/lib/resume";

/* Phones (and browsers without a built-in PDF viewer) can't render a PDF in an
   iframe reliably, so they get a card with Open / Download instead. */
function canEmbedPdf() {
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const nav = navigator as Navigator & { pdfViewerEnabled?: boolean };
  return wide && nav.pdfViewerEnabled !== false;
}

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [embed, setEmbed] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setEmbed(canEmbedPdf());
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener(RESUME_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(RESUME_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const btn =
    "inline-flex items-center justify-center gap-2 font-orbitron font-bold text-[10px] md:text-[11px] uppercase tracking-[0.12em] px-3 md:px-4 py-2.5 border-2 transition-all duration-200";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-viewer"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Résumé"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-8"
        >
          <motion.div
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex w-full max-w-5xl flex-col overflow-hidden border-2 border-white/15 bg-navy shadow-[8px_8px_0_0_rgba(14,165,199,0.6)] ${
              embed ? "h-[90vh]" : ""
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 md:px-5">
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <h2 className="mr-auto truncate font-orbitron text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-white">
                Résumé
              </h2>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open résumé in a new tab"
                className={`${btn} hidden sm:inline-flex border-white/30 text-white hover:border-white`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden md:inline">New Tab</span>
              </a>
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                className={`${btn} bg-primary border-primary text-navy shadow-[3px_3px_0_0_rgba(255,255,255,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.9)]`}
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close résumé"
                className="group ml-1 rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Body */}
            {embed ? (
              <div className="relative flex-1 bg-white/5">
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                  </div>
                )}
                <iframe
                  src={`${RESUME_URL}#view=FitH`}
                  title="Muhammad Ali résumé"
                  onLoad={() => setLoaded(true)}
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 px-6 py-10 text-center">
                <FileText className="h-12 w-12 text-primary" />
                <p className="max-w-xs text-sm text-muted-foreground">
                  Open the PDF to read it on this device, or download a copy.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btn} border-white text-white`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open PDF
                  </a>
                  <a
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    className={`${btn} bg-primary border-primary text-navy`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
