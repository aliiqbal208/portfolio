// TypeScript types for site content

export interface HeroContent {
  title: string;
  portfolioLabel: string;
  location: {
    region: string;
    city: string;
  };
  roles: {
    primary: string;
    secondary: string;
  };
  tagline: {
    prefix: string;
    highlight1: string;
    line2: {
      highlight1: string;
      text1: string;
      highlight2: string;
      text2: string;
      highlight3: string;
      text3: string;
    };
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

export interface ServiceItem {
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

export interface ExperienceItem {
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

export interface ProjectItem {
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

export interface TestimonialItem {
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

export interface FAQItem {
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
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  contact: ContactContent;
  footer: FooterContent;
}
