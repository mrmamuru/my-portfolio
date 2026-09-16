import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Instagram, Mail, MessageCircle, Play, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FilmmakingGallery } from './components/FilmmakingGallery';

const film = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

const creations = [
  { number: '01', title: 'Filmmaking', tags: ['Films', 'Visual Stories', 'Behind the Scenes'], image: '/images/film-baba.jpg' },
  { number: '02', title: 'Content', tags: ['Digital Content', 'Social Media', 'Creative Campaigns'], image: '/images/mr-mamuru-portrait.png' },
  { number: '03', title: 'Production', tags: ['Concept', 'Production', 'Post Production'], image: '/images/the-purest-solutions-launch.png' },
  { number: '04', title: 'ALIXA', tags: ['Founder', 'International Perfume Brand'], image: '/images/alixa-woodland.jpg', link: 'https://thealixa.com' },
];

const projects = [
  { title: 'The Purest Solutions', category: 'Production', description: 'Leading launch-event production and influencer management for the Turkish cosmetics brand.', image: '/images/the-purest-solutions-launch.png', scope: 'Launch Event · Influencer Management', year: '2026', client: 'The Purest Solutions', role: 'Creative Director & Producer', services: 'Event Production, Influencer Management', results: 'A complete brand launch experience, built to translate global beauty credentials into a culturally resonant live moment.' },
  { title: 'ALIXA', category: 'Founder Venture', description: 'Building an international perfume brand through fragrance, visual identity and cinematic storytelling.', image: '/images/alixa-woodland.jpg', scope: 'Brand Direction · Storytelling', year: 'International', client: 'ALIXA', role: 'Founder & Creative Director', services: 'Brand Direction, Product, Storytelling', results: 'A fragrance house imagined as a cinematic world—uniting product, image and story under one distinct point of view.', link: 'https://thealixa.com' },
];

const alixaPhotos = [
 { image: '/images/alixa-botanical.jpg', title: 'Rooted in nature', detail: 'Foliage & texture', alt: 'ALIXA Signature bottle nestled among green leaves and natural roots' },
 { image: '/images/alixa-midnight-blue.jpg', title: 'Midnight blue', detail: 'Colour & atmosphere', alt: 'ALIXA Signature bottle and packaging in deep blue studio light' },
 { image: '/images/alixa-soft-shadow.jpg', title: 'Quiet contrast', detail: 'Light & shadow', alt: 'ALIXA Signature bottle against a muted grey-green surface with a defined shadow' },
];

const reveal = { initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] as const } };

export default function App() {
  const [filmmakingOpen, setFilmmakingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [showreel, setShowreel] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const heroImage = useRef<HTMLImageElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, .85], [1, .2]);

  useEffect(() => { const t = setTimeout(() => setLoading(false), reduceMotion ? 100 : 1100); return () => clearTimeout(t); }, [reduceMotion]);
  useEffect(() => { document.body.style.overflow = activeProject || showreel ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [activeProject, showreel]);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setActiveProject(null); setShowreel(false); } }; addEventListener('keydown', key); return () => removeEventListener('keydown', key); }, []);
  useEffect(() => {
    if (reduceMotion) return;
    const move = (event: PointerEvent) => {
      if (!heroImage.current || event.pointerType === 'touch') return;
      const x = (event.clientX / window.innerWidth - .5) * 14;
      const y = (event.clientY / window.innerHeight - .5) * 10;
      heroImage.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.025)`;
    };
    const reset = () => { if (heroImage.current) heroImage.current.style.transform = 'translate3d(0,0,0) scale(1.02)'; };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerleave', reset); };
  }, [reduceMotion]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

  return <div className="cinematic-site">
    <a className="skip-link" href="#about">Skip to content</a>
    <AnimatePresence>{loading && <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: .55 }}><motion.strong initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4 }}>MMZ</motion.strong><span><i />Loading experience</span></motion.div>}</AnimatePresence>
    <Navbar onNavigate={scrollTo} />
    <main>
      <section id="home" className="hero" ref={hero}>
        <motion.div className="hero__media-frame" style={{ y: reduceMotion ? 0 : heroY }}><img ref={heroImage} className="hero__media" src="/images/mr-mamuru-portrait.png" alt="Mr. Mamuru" fetchPriority="high" /></motion.div>
        <div className="hero__veil" /><div className="hero__grain" />
        <motion.div className="hero__content" style={{ opacity: heroOpacity }}>
          <motion.p className="hero__edition" initial={{opacity:0}} animate={!loading?{opacity:1}:{}}>Portfolio / 2026</motion.p>
          <motion.h1 initial={{opacity:0,y:45}} animate={!loading?{opacity:1,y:0}:{}} transition={{duration:1,delay:.1}}>Mr. Mamuru</motion.h1>
          <motion.p className="hero__roles eyebrow" initial={{opacity:0,y:20}} animate={!loading?{opacity:1,y:0}:{}} transition={{delay:.45}}>Director&nbsp;&nbsp;·&nbsp;&nbsp; Content Creator&nbsp;&nbsp;·&nbsp;&nbsp; Founder</motion.p>
          <motion.p className="hero__tagline" initial={{opacity:0}} animate={!loading?{opacity:1}:{}} transition={{delay:.7}}>I Build Brands Through<br/>Cinematic Storytelling.</motion.p>
          <motion.button className="showreel" onClick={() => setShowreel(true)} initial={{opacity:0}} animate={!loading?{opacity:1}:{}} transition={{delay:.9}}><span><Play size={14} fill="currentColor" /></span> Watch showreel</motion.button>
        </motion.div>
        <button className="hero__scroll" onClick={() => scrollTo('work')}><span>Explore work</span><ArrowDown size={16}/></button>
      </section>

      <div className="role-strip"><span>Creative Director</span><i/><span>Filmmaker</span><i/><span>Content Creator</span><i/><span>Founder of ALIXA</span><i/><span>Production House Owner</span></div>

      <section id="about" className="section about">
        <motion.div {...reveal} className="about__copy"><p className="eyebrow">01 / About</p><h2>Stories become<br/><em>experiences.</em></h2><p>I’m a filmmaker, content creator, and entrepreneur based in Bangladesh. I create cinematic stories for brands and build visual experiences that connect with audiences—with 9 years of experience across content, production and brand promotion.</p></motion.div>
        <motion.figure {...reveal} className="about__visual"><img src="/images/the-purest-solutions-launch.png" alt="The Purest Solutions launch event production" loading="lazy"/><figcaption><span>On production</span><span>Dhaka, BD</span></figcaption></motion.figure>
      </section>

      <section id="create" className="section create">
        <motion.div {...reveal} className="section-heading section-heading--row"><div><p className="eyebrow">02 / Creative ecosystem</p><h2>One vision.<br/><em>Four expressions.</em></h2></div><p>Film, content, production and brand-building shaped by a single creative point of view.</p></motion.div>
        <div className="create-grid">{creations.map(item => <motion.article {...reveal} key={item.number} className={`create-card${item.title === 'Filmmaking' ? ' create-card--filmmaking' : ''}`} style={{'--card-image':`url(${item.image})`} as React.CSSProperties}><div className="create-card__media"/><span>{item.number}</span><div><h3>{item.title}</h3><ul>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div>{item.title === 'Filmmaking' ? <button className="create-card__open" onClick={() => setFilmmakingOpen(true)} aria-label="Explore Filmmaking projects"><ArrowUpRight/></button> : item.link?<a href={item.link} target="_blank" rel="noreferrer" aria-label="Visit ALIXA"><ArrowUpRight/></a>:<ArrowUpRight/>}</motion.article>)}</div>
      </section>

      <section id="work" className="section work">
        <motion.div {...reveal} className="section-heading section-heading--row"><div><p className="eyebrow">03 / Selected work</p><h2>Featured <em>work.</em></h2></div><p>A closer look at the worlds I create. From a live brand experience to the smallest detail of a fragrance.</p></motion.div>
        <div className="project-grid">{projects.map((project,index)=><motion.button {...reveal} className={`project project--${index+1}`} key={project.title} onClick={()=>setActiveProject(project)} aria-label={`View ${project.title} case study`}><img src={project.image} alt="" loading="lazy"/><div className="project__shade"/><div className="project__top"><span>0{index+1}</span><span>{project.year}</span></div><div className="project__overlay"><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><b>View project <ArrowUpRight size={15}/></b></div></motion.button>)}</div>
      </section>

      <section className="section visual-story" aria-labelledby="visual-story-title">
        <motion.div {...reveal} className="section-heading section-heading--row"><div><p className="eyebrow">In focus / ALIXA Signature</p><h2 id="visual-story-title">One fragrance.<br/><em>Three perspectives.</em></h2></div><div className="visual-story__intro"><p>A study in colour, light and atmosphere. Explore the visual world of Ocean Blue.</p><button onClick={() => setActiveProject(projects[1])}>Explore ALIXA <ArrowUpRight size={16}/></button></div></motion.div>
        <div className="photo-story">{alixaPhotos.map((photo, index) => <motion.figure {...reveal} key={photo.image}><button onClick={() => setActiveProject(projects[1])} aria-label={'Explore ALIXA: ' + photo.title}><img src={photo.image} alt={photo.alt} loading="lazy" width="1200" height="1800"/><span>ALIXA / 0{index + 1}<ArrowUpRight size={18}/></span></button><figcaption><h3>{photo.title}</h3><p>{photo.detail}</p></figcaption></motion.figure>)}</div>
        <div className="visual-story__foot"><span>Signature collection / Ocean Blue</span><a href="https://thealixa.com" target="_blank" rel="noreferrer">Discover the brand <ArrowUpRight size={16}/></a></div>
      </section>

      <section id="clients" className="section clients"><motion.p {...reveal} className="eyebrow">04 / Selected collaborations</motion.p><motion.div {...reveal} className="client-row">{['The Purest Solutions','Mortein','Polar','Zeros','Dettol','Kacchi Dine','The Bubbles','TikTok','Fuoco','bKash','Tecno','vivo'].map(x=><span key={x}>{x}</span>)}</motion.div></section>

      <section id="contact" className="contact"><div className="contact__bg"/><motion.div {...reveal}><p className="eyebrow">Have a story worth telling?</p><h2>Let’s Create<br/><em>Something</em><br/>Extraordinary.</h2></motion.div><motion.div {...reveal} className="contact__links"><a href="mailto:info@mrmamuru.com"><Mail/>Email<ArrowUpRight/></a><a href="https://www.instagram.com/mr.mamuru/" target="_blank" rel="noreferrer"><Instagram/>Instagram<ArrowUpRight/></a><a href="https://wa.me/8801610779589" target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp<ArrowUpRight/></a></motion.div></section>
    </main><Footer/>

    {filmmakingOpen && <FilmmakingGallery onClose={() => setFilmmakingOpen(false)}/>}
    <AnimatePresence>{showreel&&<motion.div className="film-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="Showreel"><button onClick={()=>setShowreel(false)} aria-label="Close showreel"><X/></button><motion.video initial={{scale:.96}} animate={{scale:1}} src={film} poster="/images/mr-mamuru-portrait.png" controls autoPlay playsInline/></motion.div>}</AnimatePresence>
    <AnimatePresence>{activeProject&&<motion.div className="case" initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{duration:.7,ease:[.16,1,.3,1]}} role="dialog" aria-modal="true" aria-label={activeProject.title + " project details"}><button className="case__close" onClick={()=>setActiveProject(null)}><ArrowLeft/> Back to work</button><div className="case__hero"><img src={activeProject.image} alt={activeProject.title}/><div/><p>{activeProject.category}</p><h2>{activeProject.title}</h2></div><div className="case__body"><aside><dl><dt>Client</dt><dd>{activeProject.client}</dd><dt>Role</dt><dd>{activeProject.role}</dd><dt>Services</dt><dd>{activeProject.services}</dd><dt>Year</dt><dd>{activeProject.year}</dd></dl></aside><article><p className="eyebrow">Project overview</p><h3>{activeProject.description}</h3>{activeProject.title === 'ALIXA' ? <div className="case__gallery">{alixaPhotos.map(photo => <figure key={photo.image}><img src={photo.image} alt={photo.alt} loading="lazy"/><figcaption>{photo.title}</figcaption></figure>)}</div> : <img src={activeProject.image} alt={activeProject.title + ' project detail'}/>} <p className="eyebrow">The result</p><p className="case__result">{activeProject.results}</p>{activeProject.link&&<a href={activeProject.link} target="_blank" rel="noreferrer">Visit ALIXA <ArrowUpRight/></a>}</article></div><button className="case__next" onClick={()=>setActiveProject(projects.find(p=>p!==activeProject)||projects[0])}><span>Related project</span>{projects.find(p=>p!==activeProject)?.title}<ArrowUpRight/></button></motion.div>}</AnimatePresence>
  </div>;
}
