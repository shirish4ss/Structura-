export type SectionType =
  | "hero"
  | "features"
  | "testimonials"
  | "contact"
  | "gallery"
  | "faq"
  | "about"
  | "services"
  | "pricing"
  | "team"
  | "footer"
  | "cta"
  | "announcement-bar"
  | "custom-code";

export interface SectionStyle {
  variant?: "minimal" | "bold" | "corporate" | "playful" | "luxury";
  paddingY?: "none" | "small" | "medium" | "large";
  backgroundColor?: string;
  textColor?: string;
  glassmorphism?: boolean;
}

export interface BaseSection {
  id: string;
  type: SectionType;
  style?: SectionStyle;
}

export interface HeroSection extends BaseSection {
  type: "hero";
  content: {
    title: string;
    subtitle?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image?: string;
    video?: string;
  };
}

export interface FeaturesSection extends BaseSection {
  type: "features";
  content: {
    title?: string;
    subtitle?: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon?: string;
    }>;
  };
}

export interface TestimonialsSection extends BaseSection {
  type: "testimonials";
  content: {
    title?: string;
    testimonials: Array<{
      id: string;
      quote: string;
      author: string;
      role?: string;
      avatar?: string;
    }>;
  };
}

export interface ContactSection extends BaseSection {
  type: "contact";
  content: {
    title: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    showForm?: boolean;
  };
}

export interface PricingSection extends BaseSection {
  type: "pricing";
  content: {
    title?: string;
    plans: Array<{
      id: string;
      name: string;
      price: string;
      description?: string;
      features: string[];
      isPopular?: boolean;
      ctaText?: string;
      ctaLink?: string;
    }>;
  };
}

export interface AnnouncementBarSection extends BaseSection {
  type: "announcement-bar";
  content: {
    text: string;
    link?: string;
  };
}

export interface CustomCodeSection extends BaseSection {
  type: "custom-code";
  content: {
    code: string;
  };
}

export type Section =
  | HeroSection
  | FeaturesSection
  | TestimonialsSection
  | ContactSection
  | PricingSection
  | AnnouncementBarSection
  | CustomCodeSection;

export interface PageConfig {
  id: string;
  slug: string;
  title: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  sections: Section[];
}

export interface SiteTheme {
  primary: string;
  secondary: string;
  accent?: string;
  fontSans: string;
  fontHeading?: string;
  borderRadius: "none" | "small" | "medium" | "large" | "full";
  mode: "light" | "dark" | "system";
}

export interface SiteConfig {
  id: string;
  name: string;
  industry: string;
  subdomain: string;
  customDomain?: string;
  theme: SiteTheme;
  pages: PageConfig[];
}
