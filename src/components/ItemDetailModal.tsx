import React, { useState } from 'react';
import { ShowcaseItem } from '../types';
import { X, Play, ArrowUpRight, CheckCircle2, ShoppingCart, Sparkles, Layers, Share2, Mail, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface ItemDetailModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
  onOpenContactHub: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onOpenContactHub }) => {
  if (!item) return null;

  const [selectedImage, setSelectedImage] = useState<string>(item.coverImage);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    playClickSound();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto text-white flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {item.categoryLabel}
            </span>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">
              Mahmud Mamuru Zaman Portfolio
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
              title="Share Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 text-white transition"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* Main Visual Showcase (Image / Video Player) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Visual Media Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/30 bg-black group shadow-xl">
                
                {isPlayingVideo && item.videoUrl ? (
                  <video
                    src={item.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={selectedImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Video Overlay Button if video exists */}
                    {item.videoUrl && (
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition group"
                      >
                        <Play className="w-6 h-6 fill-black ml-1" />
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {item.galleryImages && item.galleryImages.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {item.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playClickSound();
                        setIsPlayingVideo(false);
                        setSelectedImage(img);
                      }}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                        selectedImage === img && !isPlayingVideo
                          ? 'border-amber-400 scale-105'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Creator Details Column */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase text-amber-400">
                {item.role}
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                {item.title}
              </h2>

              <p className="text-xs text-amber-300/90 font-sans">
                Directed / Created by <span className="font-semibold text-white">{item.creator}</span>
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                {item.description}
              </p>

              {/* Section Breakdown Badge Box */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono">
                  <Layers className="w-4 h-4" />
                  <span>Domain / Section Classification:</span>
                </div>
                <p className="font-semibold text-white">{item.sectionInfo.sectionName}</p>
                <p className="text-gray-400 text-[11px]">{item.sectionInfo.sectionRole}</p>
              </div>

              {/* Direct Booking Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    playClickSound();
                    onClose();
                    onOpenContactHub();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Transmit Direct Booking Inquiry</span>
                </button>
              </div>

            </div>
          </div>

          {/* Perfume / Luxury Scent Pyramid (if item is perfume) */}
          {item.scentNotes && (
            <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
              <h3 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Fragrance & Olfactory Notes</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-mono uppercase text-[10px]">Top Notes</span>
                  <div className="font-medium text-white flex flex-wrap gap-1 mt-1">
                    {item.scentNotes.top.map((note, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200">{note}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-mono uppercase text-[10px]">Heart Notes</span>
                  <div className="font-medium text-white flex flex-wrap gap-1 mt-1">
                    {item.scentNotes.heart.map((note, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200">{note}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-mono uppercase text-[10px]">Base Notes</span>
                  <div className="font-medium text-white flex flex-wrap gap-1 mt-1">
                    {item.scentNotes.base.map((note, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200">{note}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specifications Table & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Specs Table */}
            {item.specs && item.specs.length > 0 && (
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Key Specifications
                </h4>
                <div className="space-y-2 text-xs divide-y divide-white/10">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="pt-2 flex items-center justify-between">
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Checklist */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Section Deliverables
              </h4>
              <div className="space-y-2 text-xs">
                {item.sectionInfo.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Metrics Stats Banner */}
          {item.stats && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-black border border-amber-500/20 grid grid-cols-3 gap-4 text-center">
              {item.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-lg sm:text-2xl font-serif font-bold text-amber-300">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
