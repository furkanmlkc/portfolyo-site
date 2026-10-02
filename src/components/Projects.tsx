import { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
export default function Projects() {
 const [selected, setSelected] = useState<Project | null>(null);
 return <section id="work" className="work section-pad"><div className="section-label"><span>02 / SELECTED WORK</span><span>BUILT TO CONNECT. DESIGNED TO LAST.</span></div><div className="section-heading reveal"><h2>SELECTED<br/><span className="muted">WORK.</span></h2><p>From the systems behind the scenes<br/>to the experiences in front of you.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected}/>)}</div><ProjectDialog project={selected} onClose={() => setSelected(null)}/></section>;
}
