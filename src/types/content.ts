// TypeScript types for site content

import type { Variant } from "@/lib/variant";

/* Array items tagged with `only` appear in that variant alone (see lib/content.ts). */
interface VariantScoped {
  only?: Variant;
}

export interface MetaContent {
  title: string;
  description: string;
  jobTitle: string;
  ogTags: string[];
}

export interface HeroContent {
  title: string;
  headline: {
    name: string;
    title: string;
  };
  cta: {
    primary: string;
    secondary: string;
    /* Anchor the secondary button scrolls to; defaults to #portfolio. */
    secondaryHref?: string;
  };
  proof: { value: string; label: string }[];
  location: {
    region: string;
    city: string;
  };
  specialty: {
    label: string;
    value: string;
  };
  tagline: {
    before: string;
    highlight: string;
    after: string;
  };
  scrollLabel: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
  color: "ember" | "ice" | "white";
}

export interface VisionBodySegment {
  text: string;
  highlight: boolean;
}

export interface AboutContent {
  profile: {
    name: string;
    title: string;
    image: {
      src: string;
      alt: string;
    };
  };
  stats: StatItem[];
  vision: {
    headingLine1: string;
    headingLine2: string;
    body: VisionBodySegment[];
    specializationLabel: string;
    specializations: string[];
  };
  status: {
    label: string;
    value: string;
  };
  card: {
    title: string;
    subtitle: string;
    cta: string;
    ctaLink: string;
  };
  techStack: string[];
  github: {
    label: string;
    heading: string;
    username: string;
    url: string;
  };
}

export interface ServiceItem extends VariantScoped {
  title: string;
  desc: string;
  features: string[];
}

export interface ServicesContent {
  sectionTitle: string;
  modalLabel: string;
  ctaButton: string;
  items: ServiceItem[];
}

export interface ExperienceItem extends VariantScoped {
  company: string;
  role: string;
  date: string;
  desc: string[];
}

export interface ExperienceContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: ExperienceItem[];
}

export interface ProjectItem extends VariantScoped {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export interface ProjectsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  visitLabel: string;
  items: ProjectItem[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface SkillsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  categories: SkillCategory[];
}

export interface TestimonialItem extends VariantScoped {
  company: string;
  icon: string;
  headline: string;
  content: string;
  author: string;
  role: string;
}

export interface TestimonialsContent {
  heading: {
    line1: string;
    line2: string;
  };
  items: TestimonialItem[];
}

export interface FAQItem extends VariantScoped {
  question: string;
  answer: string;
  category: string;
}

export interface FAQContent {
  sectionTitle: string;
  sectionSubtitle: string;
  diveDeeper: string;
  items: FAQItem[];
}

export interface ContactContent {
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  email: string;
  calendlyUrl: string;
  calendlyLabel: string;
  resumeLabel: string;
  globe: {
    locationLabel: string;
    location: string;
    availabilityLabel: string;
    availability: string;
    dragHint: string;
    timezone: string;
    timezoneLabel: string;
  };
}

export interface ConsultationContent {
  label: string;
  heading: string;
  description: string;
  points: string[];
  ctaLabel: string;
  ctaUrl: string;
}

export interface SocialItem {
  label: string;
  href: string;
  icon: string;
}

export interface FooterContent {
  name: string;
  copyright: string;
  bottomText: string;
  topButtonLabel: string;
  socials: SocialItem[];
}

export interface SiteContent {
  meta: MetaContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  consultation: ConsultationContent;
  contact: ContactContent;
  footer: FooterContent;
}
