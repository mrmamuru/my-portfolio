import React, { useState } from 'react';
import { ShowcaseItem, ShowcaseCategory } from '../types';
import { X, Sparkles, Image, Plus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playOpenModalSound } from '../utils/audio';

interface ProductStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomItem: (item: ShowcaseItem) => void;
}

export const ProductStudioModal: React.FC<ProductStudioModalProps> = ({
  isOpen,
  onClose,
  onAddCustomItem,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('My Brand / Creator Studio');
  const [role, setRole] = useState('Luxury Perfume & Brand Showcase');
  const [category, setCategory] = useState<ShowcaseCategory>('perfume');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Sample preset images if user wants quick test photos
  const presetImages = [
    { label: 'Perfume Flacon', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop' },
    { label: 'Cinematic Reel', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop' },
    { label: 'Studio Camera', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop' },
    { label: 'App Interface', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    const finalImage = imageUrl.trim() || presetImages[0].url;
    const finalTitle = title.trim() || 'Custom Showcase Product';

    const newItem: ShowcaseItem = {
      id: `custom-${Date.now()}`,
      title: finalTitle,
      creator: creator.trim() || 'Custom Creator',
      role: role.trim() || 'Custom Product Showcase',
      category: category,
      categoryLabel:
        category === 'perfume'
          ? 'Luxury Perfume Brand'
          : category === 'content'
          ? 'Cinematic Content'
          : category === 'production'
          ? 'Production House'
          : category === 'ecommerce'
          ? 'Digital Storefront'
          : 'Founder Portfolio',
      summary: description.trim() || 'Custom live item created in 3D Product Studio.',
      description: description.trim() || 'Added via live interactive product studio for immediate 3D coverflow carousel testing.',
      coverImage: finalImage,
      galleryImages: [finalImage],
      sectionInfo: {
        sectionName: `${category.toUpperCase()} Product Section`,
        sectionRole: role,
        targetAudience: 'Global Clients & Customers',
        deliverables: ['3D Showcase Slot', 'Interactive Card', 'Custom Branding'],
      },
      tags: ['Live Test', category],
      featured: true,
    };

    onAddCustomItem(newItem);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#fbbf24', '#ffffff'],
      });
    } catch (e) {
      console.debug('Confetti error', e);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Live Product Studio</h3>
              <p className="text-xs text-amber-400/90 font-mono">
                Test placing your own product in the 3D Coverflow
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Product Title */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-300 mb-1">
              Product / Item Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Alixa Noir Fragrance / Brand Commercial Reel"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-gray-500"
              required
            />
          </div>

          {/* Section Category */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-300 mb-1">
              Showcase Section (কী সেকশনে দেখাবেন)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ShowcaseCategory)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white"
            >
              <option value="perfume">Brand & Luxury Products (Perfumes, Apparel)</option>
              <option value="content">Cinematic Brand Content (Reels, Commercials)</option>
              <option value="production">Production House (Studio Shoots, VFX)</option>
              <option value="ecommerce">Digital E-Commerce & Tech App</option>
              <option value="creative">Founder & Personal Portfolio</option>
            </select>
          </div>

          {/* Creator / Brand Name */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-300 mb-1">
              Brand / Creator Name
            </label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="e.g. Mahmud Mamuru Zaman / Your Studio"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-300 mb-1">
              Product Image URL (or select preset below)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-gray-500"
            />

            {/* Presets */}
            <div className="mt-2 flex flex-wrap gap-2">
              {presetImages.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setImageUrl(p.url);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                    imageUrl === p.url
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-300 mb-1">
              Short Description / Summary
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief overview of features, scent notes, or video details..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-gray-500 resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Place Product In 3D Coverflow</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
