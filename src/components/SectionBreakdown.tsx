import React from 'react';
import { motion } from 'motion/react';
import { SHOWCASE_SECTIONS } from '../data/showcaseData';
import { Sparkles, Clapperboard, UserCheck, Layers, Cpu } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SectionBreakdownProps {
  onSelectSectionIndex: (index: number) => void;
  onOpenContactHub: () => void;
}

export const SectionBreakdown: React.FC<SectionBreakdownProps> = ({
  onSelectSectionIndex,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Clapperboard':
        return <Clapperboard className="w-6 h-6 text-rose-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-blue-400" />;
      default:
        return <Layers className="w-6 h-6 text-amber-400" />;
    }
  };

  // Variants for staggered futuristic grid entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.92,
      rotateX: -15,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom futuristic cubic-bezier
      },
    },
  };

  return (
    <motion.section
      id="showcase-sections"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
      style={{ perspective: '1200px' }}
    >
      
      {/* Futuristic Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Section Header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30, filter: 'blur(10px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
        }}
        className="text-center max-w-3xl mx-auto mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Cpu className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '8s' }} />
          <span>কী কী সেকশনে কাজ করা হয় (Domains of Expertise)</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          2 Core Domains & Creative Verticals
        </h2>
        
        <p className="mt-4 text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
          Bangladesh's first luxury perfumer — fusing traditional craftsmanship with modern perfumery, and telling Bangladesh's story through cinematic content and scent.
        </p>
      </motion.div>

      {/* Grid of 2 Core Clean Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {SHOWCASE_SECTIONS.map((section, idx) => (
          <motion.div
            key={section.id}
            variants={cardVariants}
            onClick={() => {
              playClickSound();
              onSelectSectionIndex(idx + 1);
              const el = document.getElementById('hero-3d-stage');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              rotateY: idx === 0 ? 3 : idx === 2 ? -3 : 0,
              boxShadow: '0 20px 40px -15px rgba(245, 158, 11, 0.25)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="group relative bg-black/80 backdrop-blur-2xl border border-amber-500/20 hover:border-amber-400/80 rounded-3xl p-8 transition-colors duration-300 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Cyber Scanline Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-10 transition duration-500" />
            
            {/* Neon Accent Corner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 group-hover:bg-amber-500/20 rounded-full blur-2xl transition duration-500 pointer-events-none" />

            {/* Content Upper */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-amber-500/20 group-hover:border-amber-400/50 transition duration-300 shadow-lg">
                  {getIcon(section.iconName)}
                </div>
                <span className={`px-3.5 py-1 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${section.badgeColor}`}>
                  Section 0{idx + 1}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition duration-300">
                {section.name}
              </h3>
              <p className="text-xs font-mono text-amber-400/90 mt-1.5">
                {section.bnName}
              </p>
              <p className="text-[11px] text-gray-400 font-mono mt-2 italic">
                {section.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-5">
                {section.description}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

    </motion.section>
  );
};
