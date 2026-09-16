import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

const works = [
  { image: 'film-baba', title: 'Baba', category: 'Film poster' },
  { image: 'film-90s-love', title: '90s Love', category: 'Film poster' },
  { image: 'film-our-childhood', title: 'Our Childhood', category: 'Film poster' },
  { image: 'film-tea', title: 'Cha Sobar Sathe Khaowa Jay Na', category: 'Film poster' },
  { image: 'film-noyon-tara', title: 'Noyon Tara', category: 'Film poster' },
  { image: 'film-eka', title: 'Eka', category: 'Film poster' },
  { image: 'film-noyon-tara-bts', title: 'Noyon Tara', category: 'Behind the scenes' },
  { image: 'film-cinematic-still', title: 'Cinematic still', category: 'Frame study' },
];

export function FilmmakingGallery({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <dialog ref={dialog} className="filmmaking-gallery" aria-labelledby="filmmaking-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="filmmaking-gallery__bar"><button onClick={onClose} autoFocus><ArrowLeft size={18}/> Back to portfolio</button><span>Film / Visual stories</span></div>
    <div className="filmmaking-gallery__content">
      <header><p className="eyebrow">Selected stories & frames</p><h2 id="filmmaking-title">Filmmaking<span>.</span></h2><p>Stories of love, family and the moments that stay with us.</p></header>
      <div className="filmmaking-gallery__grid">{works.map((work, index) => <figure key={work.image}>
        <img src={`/images/${work.image}.jpg`} alt={`${work.title} — ${work.category}`} loading={index < 3 ? 'eager' : 'lazy'}/>
        <figcaption><div><p>{work.category}</p><h3>{work.title}</h3></div><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
      </figure>)}</div>
    </div>
  </dialog>;
}
