import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const creations = [
  { number: '01', title: 'Filmmaking', tags: ['Commercials', 'Brand Films', 'Visual Stories'] },
  { number: '02', title: 'Content', tags: ['Digital Content', 'Social Media', 'Creative Campaigns'] },
  { number: '03', title: 'Production', tags: ['Concept', 'Production', 'Post Production'] },
  { number: '04', title: 'ALIXA', tags: ['Founder', 'International Perfume Brand'], link: 'https://thealixa.com' },
];

const projects = [
  {
    title: 'The Purest Solutions',
    category: 'Production',
    description: 'Leading launch-event production and influencer management for the Turkish cosmetics brand.',
    image: '/images/the-purest-solutions-launch.png',
    scope: 'Launch Event · Influencer Management',
    year: '2026',
  },
  {
    title: 'ALIXA',
    category: 'Founder Venture',
    description: 'Building an international perfume brand through fragrance, visual identity and cinematic storytelling.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=85&w=1200&auto=format&fit=crop',
    scope: 'Brand Direction · Storytelling',
    year: 'International',
    link: 'https://thealixa.com',
  },
];

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const heroMedia = useRef<HTMLImageElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), reduceMotion ? 100 : 1250);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const onPointerMove = (event: PointerEvent) => {
      if (!heroMedia.current || event.pointerType === 'touch') return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      heroMedia.current.style.transform = `scale(1.045) translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [reduceMotion]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="cinematic-site">
      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <motion.strong initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>MMZ</motion.strong>
            <span><i />Loading experience</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onNavigate={scrollTo} />

      <main>
        <section id="home" className="hero">
          <img
            ref={heroMedia}
            className="hero__media"
            src="/images/mr-mamuru-portrait.png"
            alt="Mr. Mamuru"
            fetchPriority="high"
          />
          <div className="hero__veil" />
          <div className="hero__grain" />
          <div className="hero__content">
            <motion.p
              className="hero__edition"
              initial={{ opacity: 0 }}
              animate={!loading ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Portfolio / 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1 }}
            >
              Mr. Mamuru
            </motion.h1>
            <motion.p
              className="eyebrow hero__roles"
              initial={{ opacity: 0, y: 18 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.45 }}
            >
              Director&nbsp;&nbsp;·&nbsp;&nbsp; Content Creator&nbsp;&nbsp;·&nbsp;&nbsp; Founder
            </motion.p>
            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 18 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              I Build Brands Through<br />Cinematic Storytelling.
            </motion.p>
          </div>
          <motion.button
            className="hero__scroll"
            initial={{ opacity: 0 }}
            animate={!loading ? { opacity: 1 } : {}}
            transition={{ delay: 1.05 }}
            onClick={() => scrollTo('work')}
          >
            <span>Explore work</span><ArrowDown size={16} />
          </motion.button>
        </section>

        <div className="role-strip" aria-label="Professional roles">
          <span>Director</span><i />
          <span>Content Creator</span><i />
          <span>Founder</span><i />
          <span>Creative Entrepreneur</span><i />
          <span>9 Years of Experience</span>
        </div>

        <section id="about" className="section about">
          <motion.div {...reveal} className="about__copy">
            <p className="eyebrow">About</p>
            <h2>Stories become<br />experiences.</h2>
            <p>
              I&apos;m a filmmaker, content creator, and entrepreneur based in Bangladesh. I create cinematic
              stories for brands and build visual experiences that connect with audiences—with 9 years of
              experience across content, production and brand promotion.
            </p>
          </motion.div>
          <motion.figure {...reveal} className="about__visual">
            <img
              src="/images/the-purest-solutions-launch.png"
              alt="The Purest Solutions launch event production"
              loading="lazy"
            />
            <figcaption>On production · Dhaka</figcaption>
          </motion.figure>
        </section>

        <section id="create" className="section create">
          <motion.div {...reveal} className="section-heading section-heading--row">
            <div><p className="eyebrow">What I create</p><h2>One vision.<br />Four expressions.</h2></div>
            <p>Film, content, production and brand-building shaped by a single creative point of view.</p>
          </motion.div>
          <div className="create-grid">
            {creations.map((item) => (
              <motion.article {...reveal} key={item.number} className="create-card">
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label="Visit the ALIXA website">
                    <ArrowUpRight size={20} />
                  </a>
                ) : (
                  <ArrowUpRight size={20} />
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="section work">
          <motion.div {...reveal} className="section-heading section-heading--row">
            <div><p className="eyebrow">Portfolio</p><h2>Featured Work</h2></div>
            <p>A focused view of the work I lead and the brands I build.</p>
          </motion.div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article {...reveal} className={`project ${index === 0 ? 'project--wide' : 'project--venture'}`} key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project__meta"><span>{project.scope}</span><span>{project.year}</span></div>
                <div className="project__overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Visit the brand <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="clients" className="section clients">
          <motion.p {...reveal} className="eyebrow">Selected Collaborations</motion.p>
          <motion.div {...reveal} className="client-row">
            <span>The Purest Solutions</span>
            <span>Mortein</span>
            <span>Polar</span>
            <span>Zeros</span>
            <span>Dettol</span>
            <span>Kacchi Dine</span>
            <span>The Bubbles</span>
            <span>TikTok</span>
            <span>Fuoco</span>
            <span>bKash</span>
            <span>Tecno</span>
            <span>vivo</span>
          </motion.div>
        </section>

        <section id="contact" className="contact">
          <motion.div {...reveal}>
            <p className="eyebrow">The next story starts here</p>
            <h2>Let&apos;s Create<br />Something Great.</h2>
            <a className="contact__email" href="mailto:info@mrmamuru.com">
              info@mrmamuru.com <ArrowUpRight size={20} />
            </a>
          </motion.div>
          <motion.div {...reveal} className="contact__links">
            <a href="https://wa.me/8801610779589" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp</a>
            <a href="mailto:info@mrmamuru.com"><Mail size={18} /> Email</a>
            <a href="https://www.instagram.com/mr.mamuru/" target="_blank" rel="noopener noreferrer"><Instagram size={18} /> Instagram</a>
            <a href="https://www.facebook.com/mamuruzaman" target="_blank" rel="noopener noreferrer"><Facebook size={18} /> Facebook</a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
