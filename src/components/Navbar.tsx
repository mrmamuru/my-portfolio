import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const links = [
  ['about', 'About'],
  ['create', 'What I Create'],
  ['work', 'Work'],
  ['contact', 'Contact'],
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const navigate = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <button className="nav__mark" onClick={() => navigate('home')} aria-label="Mr. Mamuru — Home">MMZ<span>.</span></button>
      <nav className={open ? 'nav__links nav__links--open' : 'nav__links'} aria-label="Main navigation">
        {links.map(([id, label]) => (
          <button key={id} onClick={() => navigate(id)}>{label}</button>
        ))}
      </nav>
      <button className="nav__menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
};
