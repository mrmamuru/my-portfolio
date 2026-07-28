import { ShowcaseItem, ShowcaseSectionInfo, TimelineMilestone } from '../types';

export const SHOWCASE_SECTIONS: ShowcaseSectionInfo[] = [
  {
    id: 'content',
    name: 'Cinematic Content Creation',
    bnName: 'কনটেন্ট ক্রিয়েশন ও সোশ্যাল মিডিয়া ফিল্মস',
    tagline: 'High-Impact 4K Cinema · Vertical Reels · Brand Storytelling',
    description: 'Directing cinematic short-form & long-form video campaigns for lifestyle brands, luxury products, and global startups with custom color grading and kinetic motion.',
    iconName: 'Clapperboard',
    badgeColor: 'border-rose-500/50 text-rose-300 bg-rose-950/40',
    suitableFor: ['9:16 Viral Reels & Shorts', '16:9 Brand Cinema', 'Product Launch Films', 'Influencer Commercials'],
    features: ['Embedded 4K Video Player', 'Audience Reach & Analytics', 'Color LUT Presets', 'Sound Design & Scoring'],
    stats: [
      { label: 'Total Organic Views', value: '38.5 Million' },
      { label: 'Avg View Duration', value: '88%' },
      { label: 'Brand Campaigns', value: '42 Projects' }
    ],
    accentColor: '#f43f5e'
  },
  {
    id: 'founder',
    name: 'Mahmud Mamuru Zaman (Founder)',
    bnName: 'ফাউন্ডার ও স্ট্র্যাটেজিক ডিরেক্টর',
    tagline: 'Personal Brand · Keynotes · Venture Building · Press',
    description: 'Mahmud Mamuru Zaman’s personal portfolio—content creator, founder of Alixa Parfums, and director at Concept Recall Studio.',
    iconName: 'UserCheck',
    badgeColor: 'border-blue-500/50 text-blue-300 bg-blue-950/40',
    suitableFor: ['Venture Pitching', 'Keynote Speaking', 'Brand Strategy Consulting', 'Executive Media Kit'],
    features: ['Interactive Career Timeline', 'Keynote Video Highlights', 'Direct Booking Calendar', 'Press Coverage Links'],
    stats: [
      { label: 'Years Experience', value: '8+ Years' },
      { label: 'Ventures Founded', value: '3 Companies' },
      { label: 'Global Clients', value: '50+' }
    ],
    accentColor: '#3b82f6'
  }
];

export const THREE_PORTFOLIO_ITEMS: ShowcaseItem[] = [
  {
    id: 'item-1',
    title: 'The Alixa',
    creator: 'Alixa Parfums',
    role: 'Perfume Brand · Upcoming Fragrance',
    category: 'perfume',
    categoryLabel: 'Luxury Perfume Brand',
    summary: 'Bangladesh’s first luxury perfumer — fusing traditional craftsmanship with modern perfumery.',
    description: 'The Alixa represents the peak of artisan perfumery in Bangladesh. Blending rare Sylhet agarwood (oud) with French rose and Calabrian bergamot in Grasse, each hand-poured flacon offers an 18-hour sillage enclosed in obsidian matte glass.',
    coverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop'
    ],
    sectionInfo: {
      sectionName: 'The Alixa — Perfume Brand Section',
      sectionRole: 'Master Perfumer & Bottle Designer',
      targetAudience: 'Luxury fragrance collectors, boutique stores, perfume lovers',
      deliverables: ['Custom Fragrance Formulation', '3D Obsidian Flacon Render', 'Luxury Matte Packaging', 'Global Distribution']
    },
    tags: ['Luxury Fragrance', 'Extrait de Parfum', 'Artisan Oud', 'Packaging Design'],
    scentNotes: {
      top: ['Calabrian Bergamot', 'French Lavender', 'Cardamom Pods'],
      heart: ['Smoky Agarwood (Oud)', 'Bulgarian Rose', 'Golden Amber'],
      base: ['Sandalwood', 'Bourbon Vanilla', 'Rich Oakmoss']
    },
    specs: [
      { label: 'Concentration', value: 'Extrait de Parfum (30% Pure Oils)' },
      { label: 'Volume', value: '100ml / 3.4 fl. oz.' },
      { label: 'Longevity', value: '18+ Hours' },
      { label: 'Origin', value: 'Dhaka, Grasse & Dubai' }
    ],
    stats: [
      { label: 'Formulations', value: '18 Fragrances' },
      { label: 'User Rating', value: '4.95 / 5.0' },
      { label: 'Availability', value: 'Dubai, London, Dhaka' }
    ],
    year: '2026',
    featured: true
  },
  {
    id: 'item-2',
    title: 'Content Creator',
    creator: 'Mahmud Mamuru Zaman',
    role: 'Cinematic Brand Content · Vertical Reels',
    category: 'content',
    categoryLabel: 'Cinematic Content',
    summary: 'Telling Bangladesh’s story through cinematic content and viral video storytelling.',
    description: 'Directing and editing high-impact commercial films, 9:16 vertical reels, and brand campaigns. Combining 60fps high-speed cinematography, custom kinetic typography, and deep bass sound scoring.',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop'
    ],
    sectionInfo: {
      sectionName: 'Cinematic Content Creator Section',
      sectionRole: 'Commercial Director & Storyteller',
      targetAudience: 'Global lifestyle brands, tech startups, fashion labels',
      deliverables: ['9:16 Vertical Reels', '16:9 Brand Cinema', 'Color Grading LUTs', 'Sound Design Scoring']
    },
    tags: ['Brand Commercial', '4K Cinema', 'Color Grading', 'Viral Reels'],
    stats: [
      { label: 'Organic Views', value: '38.5 Million' },
      { label: 'Shares & Saves', value: '420,000+' },
      { label: 'Brand Clients', value: '40+ Campaigns' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    year: '2026',
    featured: true
  },
  {
    id: 'item-3',
    title: 'Mahmud Mamuru Zaman',
    creator: 'Founder Profile',
    role: 'Content Creator · Founder · Perfumer',
    category: 'founder',
    categoryLabel: 'Founder & Personal Brand',
    summary: 'Content Creator · Production House Owner · Founder of Alixa.',
    description: 'Mahmud Mamuru Zaman is an entrepreneur and creative director whose work spans luxury perfumery, high-end video production, and cutting-edge digital experiences. Bangladesh’s first luxury perfumer — fusing traditional craftsmanship with modern perfumery, and telling Bangladesh’s story through cinematic content and scent.',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'
    ],
    sectionInfo: {
      sectionName: 'Founder Portfolio & Leadership',
      sectionRole: 'Founder & Strategic Director',
      targetAudience: 'Investors, brand partners, media press, executive clients',
      deliverables: ['Executive Brand Identity', 'Keynotes & Lectures', 'Brand Advisory', 'Media Appearances']
    },
    tags: ['Founder', 'Creative Director', 'Perfumer', 'Keynote Speaker'],
    specs: [
      { label: 'Ventures', value: 'Alixa Parfums, Concept Recall Studio' },
      { label: 'Core Expertise', value: 'Perfumer Alchemy, RED Cinema, 3D Web UX' },
      { label: 'HQs', value: 'Dhaka, Dubai, London' }
    ],
    stats: [
      { label: 'Experience', value: '8+ Years' },
      { label: 'Projects Directed', value: '120+' },
      { label: 'Global Press', value: '24 Media Features' }
    ],
    year: '2026',
    featured: true
  }
];

// Alias FIVE_PORTFOLIO_ITEMS to THREE_PORTFOLIO_ITEMS for backward compatibility
export const FIVE_PORTFOLIO_ITEMS = THREE_PORTFOLIO_ITEMS;

export const FOUNDER_TIMELINE: TimelineMilestone[] = [
  {
    year: '2026',
    title: 'Global Expansion & Modern Perfumery',
    role: 'Founder & CEO',
    company: 'Alixa Parfums & Concept Recall',
    description: 'Expanded Alixa Parfums distribution across Dubai Mall and London boutiques. Fusing traditional Bangladesh craftsmanship with French perfumery.',
    highlights: ['500 Limited Gold Flacons sold out', '38.5M+ video campaign reach', 'Exclusive luxury fragrance formulations'],
    category: 'perfume',
    badge: 'PRESENT ERA'
  },
  {
    year: '2024',
    title: 'Founded Concept Recall Studio',
    role: 'Creative Director',
    company: 'Concept Recall Production House',
    description: 'Built a 3,500 sq ft acoustic soundstage equipped with RED 8K cinema gear to produce high-converting brand films and commercials.',
    highlights: ['95+ Commercial Shoots', 'RED V-Raptor 8K Integration', 'HDR DaVinci Resolve Suite'],
    category: 'production',
    badge: 'STUDIO LAUNCH'
  },
  {
    year: '2022',
    title: 'Established Alixa Parfums',
    role: 'Master Perfumer & Brand Director',
    company: 'Alixa Parfums House',
    description: 'Fused traditional Eastern agarwood alchemy with French perfumery techniques in Grasse. Designed iconic matte obsidian bottle.',
    highlights: ['Formulated Alixa signature fragrances', 'First 14,000 bottles sold', 'Grasse & Dubai sourcing'],
    category: 'perfume',
    badge: 'PERFUME LAUNCH'
  },
  {
    year: '2020',
    title: 'Content Creator & Brand Storyteller',
    role: 'Director of Visual Media',
    company: 'Independent Studio',
    description: 'Pioneered viral short-form video storytelling for global lifestyle brands, achieving over 38M organic views across platforms.',
    highlights: ['38M+ Organic Views', 'Partnered with 40+ brands', 'Kinetic cinematic style'],
    category: 'content',
    badge: 'GENESIS'
  }
];
