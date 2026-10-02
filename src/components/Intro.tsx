import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectDialog from './ProjectDialog';
import AetherProjectPreview from './AetherProjectPreview';

export default function Intro() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const card = cards.current[active]; const container = rail.current;
    if (!card || !container) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      const rect = card.getBoundingClientRect(); const bounds = container.getBoundingClientRect();
      if (rect.left < bounds.left || rect.right > bounds.right) container.scrollTo({ left: container.scrollLeft + rect.left - bounds.left, behavior: reduced ? 'instant' : 'smooth' });
    }, reduced ? 0 : 720);
    return () => window.clearTimeout(timer);
  }, [active]);
  function move(direction: number) { setActive(index => (index + direction + projects.length) % projects.length); }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % projects.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + projects.length) % projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus({ preventScroll: true });
  }
  return <section id="intro" className="intro project-gallery section-pad" aria-labelledby="gallery-title">
    <div className="section-label"><span>01 / THE PROJECTS</span><span>EXPLORE THE CONNECTIONS</span></div>
    <div className="gallery-heading reveal"><h2 id="gallery-title">BUILT TO<br/><span className="muted">CONNECT.</span></h2><div className="gallery-heading-right"><p>Different disciplines.<br/>One connected perspective.</p><div className="gallery-controls"><span className="gallery-counter" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></span><button onClick={() => move(-1)} aria-label="Previous project">←</button><button onClick={() => move(1)} aria-label="Next project">→</button></div></div></div>
    <div ref={rail} className="project-rail reveal" aria-label="Browse projects">{projects.map((project, index) => <article key={project.id} ref={element => { cards.current[index] = element; }} className={`rail-card ${active === index ? 'is-active' : ''}`} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index); }}>
      {project.id === 'aether' ? <AetherProjectPreview/> : <img className="rail-image" src={project.image} alt="" loading="lazy" width="1280" height="800"/>}<div className="rail-shade"/>
      <button className="rail-select" ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)} onFocus={() => setActive(index)} onKeyDown={event => onKeyDown(event, index)} aria-label={`Show ${project.name}`} aria-expanded={active === index} aria-controls={`rail-detail-${project.id}`}><span className="rail-number">{String(index + 1).padStart(2, '0')}</span><span className="rail-vertical" aria-hidden="true">{project.name}</span><span className="rail-symbol" aria-hidden="true">+</span></button>
      <div id={`rail-detail-${project.id}`} className="rail-detail" inert={active !== index} aria-hidden={active !== index}><p className="rail-category">{project.category}</p><h3>{project.name}</h3><p className="rail-description">{project.description}</p><button className="rail-open" onClick={() => setSelected(project)} aria-label={`Open ${project.name} details`}>EXPLORE PROJECT <span aria-hidden="true">↗</span></button></div>
    </article>)}</div><div className="gallery-foot"><span>NETWORK / CLOUD / WEB</span><span>SELECT A PROJECT. EXPLORE ITS WORLD.</span></div><ProjectDialog project={selected} onClose={() => setSelected(null)}/>
  </section>;
}
