import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
gsap.registerPlugin(ScrollTrigger);
export default function App(){useEffect(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.from(el,{y:38,opacity:0,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));});return()=>mm.revert()},[]);return <><a className="skip" href="#intro">Skip to content</a><Navbar/><main><Hero/><Intro/><Projects/><Expertise/><About/><Contact/></main><Footer/></>}
