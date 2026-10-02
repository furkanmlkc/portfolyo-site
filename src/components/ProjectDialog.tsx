import AetherProjectPreview from './AetherProjectPreview';
import { useEffect, useId, useRef } from 'react';
import type { Project } from '../data/projects';
export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null); const titleId = useId();
  useEffect(() => {
    const element = dialog.current; if (!project || !element) return;
    const trigger = document.activeElement as HTMLElement | null; const previous = document.body.style.overflow;
    element.showModal(); document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previous; trigger?.focus({ preventScroll: true }); };
  }, [project]);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose(); }}>{project && <div className="dialog-content"><button className="dialog-close" onClick={onClose} aria-label="Close project">×</button><p className="eyebrow">{project.category}</p><h2 id={titleId}>{project.name}</h2>{project.id === 'aether' ? <div className="aether-dialog-visual"><AetherProjectPreview/></div> : <img src={project.image} alt="Abstract monochrome film still" width="1280" height="800"/>}<p className="dialog-description">{project.description}</p><h3>PROJECT SCOPE</h3><ul>{project.scope.map(item => <li key={item}>{item}</li>)}</ul><div className="tags">{project.technologies.map(item => <span key={item}>{item}</span>)}</div></div>}</dialog>;
}

