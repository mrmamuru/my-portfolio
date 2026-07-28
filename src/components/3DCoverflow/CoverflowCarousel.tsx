import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShowcaseItem } from '../../types';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Phone, Play, Pause } from 'lucide-react';
import { playSlideSound, playClickSound, playOpenModalSound } from '../../utils/audio';

interface CoverflowCarouselProps {
  items: ShowcaseItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenDetailModal: (item: ShowcaseItem) => void;
}

export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
  items,
  activeIndex,
  setActiveIndex,
  onOpenDetailModal,
}) => {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (items.length === 0) return;
    playSlideSound();
    setActiveIndex((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, setActiveIndex]);

  const handlePrev = useCallback(() => {
    if (items.length === 0) return;
    playSlideSound();
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, setActiveIndex]);

  // Autoplay Timer (Advances every 3.5 seconds when not hovered)
  useEffect(() => {
    if (!isAutoplay || isHovered || items.length === 0) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoplay, isHovered, items.length, setActiveIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch & Drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX === null) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diffX = clientX - dragStartX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragStartX(null);
  };

  const currentActiveItem = items[activeIndex] || items[2] || items[0];

  // Custom visual rendering for each card
  const renderCardVisual = (item: ShowcaseItem, isActive: boolean) => {
    switch (item.id) {
      case 'item-1':
        return (
          <div className="relative w-full h-full bg-[#0d0e12] flex flex-col justify-between p-6 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
              alt="The Alixa"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
                {item.categoryLabel}
              </span>
            </div>

            <div className="relative z-10 text-center my-auto">
              <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2 opacity-80" />
              <h2 className="text-3xl font-serif font-black tracking-widest text-amber-100 uppercase drop-shadow-md">
                THE ALIXA
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-amber-400/90 mt-1 uppercase">
                UPCOMING
              </p>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold text-white">Alixa</h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Perfume Brand</p>
            </div>
          </div>
        );

      case 'item-2':
        return (
          <div className="relative w-full h-full bg-[#12100b] flex flex-col justify-between p-6 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
              alt="Content Creator"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-color-dodge"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                Cinematic Reels
              </span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-1">
              <div className="inline-block px-3 py-1 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase font-bold tracking-wider">
                PRODUCTION · TAKE 01
              </div>
              <h2 className="text-4xl font-black font-serif text-amber-300 tracking-tighter uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                CONTENT!
              </h2>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold text-white">Content Creator</h3>
              <p className="text-xs text-gray-300 font-sans mt-0.5">Cinematic Brand Content</p>
            </div>
          </div>
        );

      case 'item-3':
        return (
          <div className="relative w-full h-full bg-[#0a0a0c] flex flex-col justify-between p-6 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              alt="Mahmud Mamuru Zaman"
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/20 pointer-events-none" />

            <div className="relative z-10">
              <span className="w-3 h-3 rounded-full bg-amber-200 inline-block shadow-[0_0_12px_#fbbf24]" />
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                Mahmud Mamuru Zaman
              </h3>
              <p className="text-xs text-amber-300 font-sans mt-1">
                Content Creator · Founder · Perfumer
              </p>
            </div>
          </div>
        );

      case 'item-4':
        return (
          <div className="relative w-full h-full bg-[#09090b] flex flex-col justify-between p-6 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop"
              alt="Production House"
              className="absolute inset-0 w-full h-full object-cover opacity-70 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                RED 8K Studio
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-xl font-serif font-bold text-white">Production House</h3>
              <p className="text-xs text-gray-300 font-sans mt-0.5">
                Client Shoots · Promos · Editing
              </p>
            </div>
          </div>
        );

      case 'item-5':
        return (
          <div className="relative w-full h-full bg-[#120805] flex flex-col justify-between p-6 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
              alt="Contact"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10 text-right">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                Inquiry Hub
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <Phone className="w-8 h-8 text-amber-400 mb-2 opacity-90" />
              <p className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                Ready to switch to Concept Recall...
              </p>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold text-white">Contact</h3>
              <p className="text-xs text-gray-300 font-sans mt-0.5">Let's Work Together</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden min-h-[600px] lg:min-h-[680px] flex flex-col items-center justify-between py-6 px-4 select-none"
    >
      
      {/* Background Astronomical Orbital HUD Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-amber-500/15 blur-[120px]" />

        <div className="absolute w-[750px] h-[750px] sm:w-[1050px] sm:h-[1050px] border border-amber-500/15 rounded-full flex items-center justify-center animate-[spin_180s_linear_infinite]">
          <div className="w-[80%] h-[80%] border border-amber-400/20 rounded-full flex items-center justify-center border-dashed">
            <div className="w-[60%] h-[60%] border border-amber-500/15 rounded-full" />
          </div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
        </div>
      </div>

      {/* 3D Coverflow Perspective Container */}
      <div
        ref={containerRef}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-6xl h-[380px] sm:h-[450px] lg:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing my-auto"
        style={{ perspective: '1200px' }}
      >
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
          const spacing = isMobile ? 130 : 220;
          const translateX = offset * spacing;
          const rotateY = isActive ? 0 : offset < 0 ? 32 : -32;
          const scale = isActive ? 1.12 : Math.max(0.72, 1 - absOffset * 0.16);
          const translateZ = isActive ? 120 : -absOffset * 90;
          const opacity = isActive ? 1 : Math.max(0.3, 1 - absOffset * 0.35);
          const zIndex = 50 - absOffset * 10;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isActive) {
                  playOpenModalSound();
                  onOpenDetailModal(item);
                } else {
                  playSlideSound();
                  setActiveIndex(index);
                }
              }}
              className="absolute transition-all duration-500 ease-out transform-gpu will-change-transform"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
            >
              <div
                className={`relative w-[260px] h-[360px] sm:w-[310px] sm:h-[420px] rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.4)]'
                    : 'hover:ring-1 hover:ring-amber-400/50'
                }`}
              >
                {renderCardVisual(item, isActive)}

                {isActive && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-amber-400/50 text-amber-300 hover:scale-110 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Control Pill at Bottom */}
      {currentActiveItem && (
        <div className="relative z-30 w-full max-w-2xl mx-auto mt-2 px-2">
          <div className="bg-black/85 backdrop-blur-2xl border border-amber-500/30 rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/90">
            
            {/* Left Controls: Prev & Autoplay Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                title="Previous Item"
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 text-white transition-all active:scale-95 flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Autoplay Play/Pause Toggle */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsAutoplay(!isAutoplay);
                }}
                title={isAutoplay ? 'Pause Autoplay' : 'Enable Autoplay'}
                className={`p-2 sm:p-2.5 rounded-full border transition-all active:scale-95 flex-shrink-0 ${
                  isAutoplay && !isHovered
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {isAutoplay ? (
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Active Card Info */}
            <div
              onClick={() => {
                playOpenModalSound();
                onOpenDetailModal(currentActiveItem);
              }}
              className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-xl hover:bg-white/5 transition max-w-[200px] sm:max-w-[320px] overflow-hidden"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-400/50 flex-shrink-0">
                <img
                  src={currentActiveItem.coverImage}
                  alt={currentActiveItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left overflow-hidden">
                <h4 className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-amber-300 transition truncate">
                  {currentActiveItem.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-sans truncate">
                  {currentActiveItem.role}
                </p>
              </div>
            </div>

            {/* Counter */}
            <div className="hidden sm:flex items-center gap-1.5 font-serif text-sm font-semibold text-amber-400 px-2">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">{String(items.length).padStart(2, '0')}</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleNext}
                title="Next Item"
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => {
                  playOpenModalSound();
                  onOpenDetailModal(currentActiveItem);
                }}
                title="View Full Details"
                className="p-2 sm:p-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/50 transition-all shadow-md shadow-amber-500/20 active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
