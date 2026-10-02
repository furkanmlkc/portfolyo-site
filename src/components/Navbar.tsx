import { useEffect, useState } from 'react';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 32); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}><a className="logo" href="#home" aria-label="FM home">FM<span>.</span></a><nav aria-label="Main navigation">{['Work', 'About', 'Expertise', 'Contact'].map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</nav><a className="nav-note" href="#contact">LET’S CONNECT <span>↗</span></a></header>;
}
