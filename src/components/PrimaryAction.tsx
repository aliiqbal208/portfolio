"use client";

import { Calendar, FileText } from "lucide-react";
import content from "@/lib/content";
import { openCalendlyPopup } from "@/lib/calendly";
import { RESUME_URL } from "@/lib/site";
import { openResumeViewer } from "@/lib/resume";
import { variantConfig } from "@/lib/variant";

const { contact } = content;

/* The site's main call to action: book a call (independent) or view the
   résumé (job), per lib/variant.ts. Styling is left to the caller. */
export default function PrimaryAction({
  label,
  className,
  iconClassName = "w-4 h-4",
}: {
  label: string;
  className: string;
  iconClassName?: string;
}) {
  if (variantConfig.primaryAction === "resume") {
    return (
      <a
        href={RESUME_URL}
        onClick={(e) => {
          // Let modified clicks (new tab / window) fall through to the PDF.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          openResumeViewer();
        }}
        className={className}
      >
        <FileText className={iconClassName} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={contact.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openCalendlyPopup(contact.calendlyUrl).then((ok) => {
          if (!ok) window.open(contact.calendlyUrl, "_blank", "noopener,noreferrer");
        });
      }}
      className={className}
    >
      <Calendar className={iconClassName} />
      {label}
    </a>
  );
}
