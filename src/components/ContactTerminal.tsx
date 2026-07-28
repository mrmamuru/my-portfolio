import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Check, Globe, MessageSquare, ShieldCheck, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound } from '../utils/audio';

export const ContactTerminal: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('perfume');
  const [budget, setBudget] = useState('$5k - $15k USD');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch (err) {
      console.debug('Confetti error', err);
    }
  };

  return (
    <motion.section
      id="contact-hub"
      initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10"
    >
      
      {/* Container Box with Cyber Glass Border */}
      <div className="relative bg-black/85 backdrop-blur-3xl border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(245,158,11,0.15)] overflow-hidden">
        
        {/* Glow accent corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Terminal className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Direct Collaboration Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Let’s Craft Something Extraordinary.
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Inquire about Alixa Parfums distribution, book Concept Recall RED 8K commercial shoots, or request brand consultation with Mahmud Mamuru Zaman.
            </p>

            {/* Quick Contact Specs */}
            <div className="space-y-4 pt-6 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Direct Executive Email</p>
                  <p className="font-semibold text-white">mahmud@alixaparfums.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Global HQ Hubs</p>
                  <p className="font-semibold text-white">Dubai (UAE) · Dhaka · London (UK)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">Response SLA</p>
                  <p className="font-semibold text-amber-300">Within 6 Hours (Global Desk)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Terminal Column */}
          <div className="lg:col-span-7 bg-stone-950/90 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl relative">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Inquiry Transmitted</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-300 font-semibold">{name}</span>. Mahmud Mamuru Zaman’s executive team will review your requirements and respond to <span className="text-white underline">{email}</span>.
                </p>
                <button
                  onClick={() => {
                    playClickSound();
                    setSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-xs text-amber-300 font-mono transition mt-4 border border-amber-500/30"
                >
                  Send Another Transmission
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-amber-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-gray-500 transition shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-amber-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@brand.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-gray-500 transition shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-amber-300 mb-1">
                      Inquiry Section (কী সেকশনের জন্য)
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    >
                      <option value="perfume">Alixa Parfums Distribution / Orders</option>
                      <option value="content">Cinematic Brand Video & Reel Campaign</option>
                      <option value="founder">Founder Consultation & Keynotes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-amber-300 mb-1">
                      Estimated Project Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white"
                    >
                      <option value="$2.5k - $5k USD">$2,500 - $5,000 USD</option>
                      <option value="$5k - $15k USD">$5,000 - $15,000 USD</option>
                      <option value="$15k - $50k USD">$15,000 - $50,000 USD</option>
                      <option value="$50k+ USD">$50,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-amber-300 mb-1">
                    Project Requirements / Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your brand vision, campaign goals, or perfume order quantity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-gray-500 resize-none transition shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition duration-300 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Collaboration Request</span>
                </motion.button>

              </form>
            )}

          </div>

        </div>

      </div>
    </motion.section>
  );
};
