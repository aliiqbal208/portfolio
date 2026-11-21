/* Which version of the portfolio this build is.

   - "independent": portfolio + freelance services + booking calls.
   - "job":         candidate profile for AI engineering roles.

   The `job` and `independent` branches each pin PINNED below; that line is
   the only thing they change, so merging master into them never conflicts.
   NEXT_PUBLIC_SITE_VARIANT overrides it for local previews. */
export type Variant = "job" | "independent";

const PINNED: Variant = "job";

const fromEnv = process.env.NEXT_PUBLIC_SITE_VARIANT;
export const VARIANT: Variant =
  fromEnv === "job" || fromEnv === "independent" ? fromEnv : PINNED;

export type SectionId =
  | "about"
  | "portfolio"
  | "labs"
  | "experience"
  | "skills"
  | "services"
  | "testimonials"
  | "faq"
  | "contact";

/* "calendly" opens the booking popup; "resume" downloads the PDF. */
export type PrimaryAction = "calendly" | "resume";

interface VariantConfig {
  /* Sections between Hero and Footer, in render order. Also drives the nav. */
  sections: SectionId[];
  primaryAction: PrimaryAction;
  /* Only one variant should be in search results: both sites share most of
     their content, so the other is noindex and shared by direct link. */
  indexable: boolean;
}

const CONFIG: Record<Variant, VariantConfig> = {
  independent: {
    sections: ["about", "portfolio", "labs", "experience", "skills", "services", "testimonials", "faq", "contact"],
    primaryAction: "calendly",
    indexable: false,
  },
  job: {
    sections: ["about", "experience", "skills", "portfolio", "labs", "contact"],
    primaryAction: "resume",
    indexable: true,
  },
};

export const variantConfig = CONFIG[VARIANT];

export const hasSection = (id: SectionId) => variantConfig.sections.includes(id);
