'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X, Leaf, Activity, Heart, Sprout, Monitor, ShieldCheck } from 'lucide-react';
import hero from '../../public/hero.webp';

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export function BookingButton({heroButton = false}: {heroButton?: boolean}) {
  const [notice, setNotice] = useState(false);
  const label = heroButton ? 'Agendar minha consulta' : 'Agendar consulta';
  return <span className="booking-wrap">{bookingUrl ? <a className="button" data-motion-cta href={bookingUrl} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={17}/></a> : <button className="button" data-motion-cta onClick={() => setNotice(!notice)} aria-expanded={notice}>{label}<ArrowUpRight size={17}/></button>}{notice && <span className="booking-notice" role="status">O agendamento online estará disponível em breve.</span>}</span>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener('scroll', update, { passive:true }); return () => window.removeEventListener('scroll', update); }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    navigationRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onResize = () => { if (window.innerWidth > 1000) setOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const focusable = [...(navigationRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []), toggleRef.current].filter((element): element is HTMLElement => Boolean(element));
      const current = focusable.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && current === 0) {
        event.preventDefault();
        focusable[focusable.length - 1]?.focus();
      } else if (!event.shiftKey && current === focusable.length - 1) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); window.removeEventListener('resize', onResize); };
  }, [open]);
  const items = [{label:'Início',href:'#inicio'},{label:'Sobre',href:'#sobre'},{label:'Especialidades',href:'#especialidades'},{label:'Como funciona',href:'#como-funciona'},{label:'Conteúdos'},{label:'Contato'}];
  return <header className={`header ${scrolled ? 'is-scrolled' : ''}`}><div className="header-inner"><a href="#inicio" aria-label="Priscila Scariot Nutrição — início" className="logo" onClick={() => setOpen(false)}><Image src="/logo-original.png" width={1080} height={1350} alt="Priscila Scariot Nutrição" priority /></a><nav ref={navigationRef} className={open ? 'navigation is-open' : 'navigation'} id="navigation" aria-label="Navegação principal">{items.map(item => item.href ? <a key={item.label} href={item.href} className={item.label === 'Início' ? 'active' : ''} onClick={() => { if (open) { setOpen(false); requestAnimationFrame(() => { const target = document.getElementById(item.href.slice(1)); if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); } }); } }}>{item.label}</a> : <span key={item.label} className="nav-pending" aria-disabled="true" title="Disponível nas próximas seções">{item.label}</span>)}<div className="mobile-booking"><BookingButton/></div></nav><div className="header-booking"><BookingButton/></div><button ref={toggleRef} className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}

export function HeroActions() {
  return <div className="hero-actions entrance"><BookingButton heroButton/><a className="text-link" href="#especialidades">Conheça meu trabalho<ArrowRight size={17}/></a></div>;
}
export function HeroTrust() {
  return <div className="hero-trust entrance"><span><Monitor size={15}/>Consultas presenciais e online</span><i aria-hidden="true"/><span><ShieldCheck size={15}/>Nutrição baseada em evidências</span></div>;
}
export function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title"><div className="hero-photo"><Image src={hero} alt="Dra. Priscila Scariot em seu consultório, com alimentos frescos à mesa" fill priority placeholder="blur" sizes="(max-width: 760px) 150vw, 100vw"/></div><div className="photo-blend"/><svg className="organic-line" viewBox="0 0 400 700" fill="none" aria-hidden="true"><path d="M-80 650C350 520 310 180 100 80S-60 120 120 300S320 500 400 430" stroke="currentColor"/></svg><div className="hero-content"><p className="eyebrow entrance"><span/>Nutrição clínica <b>·</b> Metabolismo <b>·</b> Saúde</p><h1 id="hero-title"><span>Nutrição para</span><span>transformar</span><span className="highlight">sua saúde</span><span>sem transformar</span><span>sua vida em uma dieta.</span></h1><p className="subheadline entrance">Estratégias nutricionais personalizadas para quem busca emagrecimento, mais saúde e qualidade de vida com acompanhamento profissional.</p><HeroActions/><HeroTrust/></div><div className="portrait-caption"><span className="caption-line"/><div>Dra. Priscila Scariot<small>NUTRIÇÃO COM CIÊNCIA E ACOLHIMENTO</small></div></div></section>;
}
export function ExpertiseBar() {
  const specialties = [{title:'Emagrecimento',Icon:Leaf},{title:'Metabolismo',Icon:Activity},{title:'Saúde da mulher',Icon:Heart},{title:'Prevenção e qualidade de vida',Icon:Sprout}];
  return <section className="expertise" id="especialidades" aria-label="Especialidades"><ul>{specialties.map(({title,Icon},i)=><li key={title}><div className="expertise-top"><span>0{i+1}</span><Icon size={30} strokeWidth={1.25}/></div><h2>{title}</h2></li>)}</ul></section>;
}

