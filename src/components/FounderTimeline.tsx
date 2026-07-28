import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FOUNDER_TIMELINE } from '../data/showcaseData';
import { Award, CheckCircle2, Briefcase, Sparkles, Terminal } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export const FounderTimeline: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('all');

  const filteredMilestones = FOUNDER_TIMELINE.filter(
    (m) => activeYear === 'all' || m.year === activeYear
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.94,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      id="founder-story"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10"
    >
      
      {/* Background Cyber Laser Stream */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30, filter: 'blur(8px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
        }}
        className="text-center max-w-3xl mx-auto mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Founder Journey & Experience</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          Mahmud Mamuru Zaman — Timeline & Milestones
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
          The evolution of a multi-hyphenate creative leader—building Alixa Parfums, directing RED 8K cinema commercials, and shaping futuristic digital experiences.
        </p>

        {/* Year Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {['all', '2026', '2024', '2022', '2020'].map((year) => (
            <button
              key={year}
              onClick={() => {
                playClickSound();
                setActiveYear(year);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeYear === year
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-black/60 text-gray-400 border border-white/10 hover:border-amber-400/50 hover:text-white'
              }`}
            >
              {year === 'all' ? 'All Era' : year}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Futuristic Vertical Glowing Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-gradient-to-b from-amber-500/80 via-amber-400/40 to-transparent space-y-12 my-8 relative z-10">
        
        {/* Animated Laser Pulse along the timeline line */}
        <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-amber-400 via-amber-200 to-amber-600 animate-pulse" />

        {filteredMilestones.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="relative group"
          >
            
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[49px] top-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] group-hover:scale-125 transition-transform duration-300 z-20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            {/* Content Glass Card with Futuristic Hover & Scale */}
            <motion.div
              whileHover={{
                x: 6,
                scale: 1.01,
                borderColor: 'rgba(245, 158, 11, 0.6)',
                boxShadow: '0 20px 40px -15px rgba(245,158,11,0.2)',
              }}
              className="bg-black/80 backdrop-blur-2xl border border-amber-500/20 rounded-3xl p-6 sm:p-8 transition-colors duration-300 shadow-2xl relative overflow-hidden"
            >
              {/* Corner Cyber Scan Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  {item.year} · {item.badge}
                </span>

                <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.company}</span>
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition duration-300">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-amber-400 mt-1">
                Role: {item.role}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-3">
                {item.description}
              </p>

              {/* Highlights List */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-sans px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>

            </motion.div>

          </motion.div>
        ))}
      </div>

    </motion.section>
  );
};
