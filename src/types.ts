export type ShowcaseCategory = 
  | 'all' 
  | 'perfume' 
  | 'content' 
  | 'production' 
  | 'ecommerce' 
  | 'founder'
  | 'contact';

export type PortfolioView = 
  | '3d-stage' 
  | 'sections-matrix' 
  | 'studio-reel' 
  | 'founder-story' 
  | 'contact';

export interface ShowcaseSectionInfo {
  id: ShowcaseCategory;
  name: string;
  bnName: string; // Bengali description for "কী কী সেকশনে কাজ করা হয়"
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  suitableFor: string[];
  features: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
}

export interface ScentNote {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  creator: string;
  role: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  sectionInfo: {
    sectionName: string;
    sectionRole: string;
    targetAudience: string;
    deliverables: string[];
  };
  tags: string[];
  scentNotes?: ScentNote; // For Alixa Parfums
  specs?: ProductSpec[];
  stats?: { label: string; value: string }[];
  videoUrl?: string;
  audioTrackUrl?: string;
  externalLink?: string;
  featured?: boolean;
  year?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  category: ShowcaseCategory;
  badge: string;
}

export type VisualTheme = 'luxury-dark' | 'amber-glass' | 'cyber-neon';
