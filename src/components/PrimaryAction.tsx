"use client";

import { Calendar, Download } from "lucide-react";
import content from "@/lib/content";
import { openCalendlyPopup } from "@/lib/calendly";
import { RESUME_FILENAME, RESUME_URL } from "@/lib/site";
import { variantConfig } from "@/lib/variant";

const { contact } = content;

/* The site's main call to action: book a call (independent) or download the
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
      <a href={RESUME_URL} download={RESUME_FILENAME} className={className}>
        <Download className={iconClassName} />
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
