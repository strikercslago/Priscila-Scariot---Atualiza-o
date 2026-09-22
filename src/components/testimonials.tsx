'use client';

import Image, { type StaticImageData } from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import pamela from '../../public/stories-pamela.png';
import zelia from '../../public/stories-zelia.png';
import patient from '../../public/stories-patient.png';
import { BookingButton } from './landing';
import styles from './testimonials.module.css';

type PatientStory = {
  number: string;
  category: string;
  name: string;
  title: string;
  paragraphs: string[];
  image: StaticImageData;
  alt: string;
};

const patientStories: PatientStory[] = [
  {
    number: '01',
    category: 'Endometriose',
    name: 'Pâmela',
    title: 'Uma experiência de cuidado que foi além da alimentação.',
    paragraphs: [
      'Pâmela compartilhou sua experiência durante o acompanhamento nutricional voltado à endometriose e à melhora da qualidade de vida.',
      'Seu relato mostra a importância de olhar para sintomas, rotina, alimentação e contexto clínico de forma individualizada.',
    ],
    image: pamela,
    alt: 'Pâmela em arte de relato sobre acompanhamento nutricional, identificada pela categoria endometriose.',
  },
  {
    number: '02',
    category: 'Saúde metabólica',
    name: 'Dona Zélia',
    title: 'Uma nova relação com a saúde metabólica.',
    paragraphs: [
      'Dona Zélia compartilhou sua experiência durante o acompanhamento nutricional em um contexto de alterações metabólicas.',
      'O processo envolveu atenção à alimentação, rotina e necessidades clínicas, acompanhado de perto ao longo da evolução.',
    ],
    image: zelia,
    alt: 'Dona Zélia em arte de relato sobre acompanhamento nutricional, identificada pela categoria saúde metabólica.',
  },
  {
    number: '03',
    category: 'Endometriose',
    name: 'Relato de paciente',
    title: 'Quando o acompanhamento passa a fazer sentido na vida real.',
    paragraphs: [
      'Cada processo acontece de maneira diferente.',
      'Neste relato, a paciente compartilha sua percepção sobre cuidado, acolhimento e as mudanças que vivenciou ao longo do acompanhamento nutricional.',
    ],
    image: patient,
    alt: 'Paciente em arte de relato sobre acompanhamento nutricional, identificada pela categoria endometriose.',
  },
];

const storyCount = patientStories.length;
const loopedStories = [...patientStories, ...patientStories, ...patientStories];

function TestimonialIntro() {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Experiências de pacientes</p>
      <h2 id="stories-title"><em>Histórias reais</em> por trás do acompanhamento.</h2>
      <p className={styles.lead}>Cada pessoa chega com uma história, necessidades e objetivos diferentes. Alguns desses relatos mostram experiências de pacientes que passaram pelo acompanhamento nutricional da Dra. Priscila.</p>
    </header>
  );
}

function Story({ story, isClone }: { story: PatientStory; isClone: boolean }) {
  const headingId = `story-${story.number}`;
  return (
    <article className={styles.story} data-story-card aria-hidden={isClone || undefined} aria-labelledby={isClone ? undefined : headingId}>
      <figure className={styles.figure}>
        <Image src={story.image} alt={isClone ? '' : story.alt} fill placeholder="blur" sizes="(max-width: 760px) 80vw, (max-width: 900px) 52vw, 380px" className={styles.photo} draggable={false} />
      </figure>
      <div className={styles.content}>
        <div className={styles.meta}><span className={styles.number} aria-hidden="true">{story.number}</span><p className={styles.category}>{story.category}</p></div>
        <h3 id={isClone ? undefined : headingId}>{story.name}</h3>
        <p className={styles.storyTitle}>{story.title}</p>
        <div className={styles.body}>{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
    </article>
  );
}

function StoriesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(storyCount);
  const settleTimerRef = useRef<number | null>(null);
  const interactionTimerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const cardLeft = useCallback((index: number) => {
    const cards = viewportRef.current?.querySelectorAll<HTMLElement>('[data-story-card]');
    return cards?.[index] && cards[0] ? cards[index].offsetLeft - cards[0].offsetLeft : 0;
  }, []);

  const nearestCard = useCallback(() => {
    const viewport = viewportRef.current;
    const cards = viewport?.querySelectorAll<HTMLElement>('[data-story-card]');
    if (!viewport || !cards?.length) return storyCount;
    let nearest = storyCount;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const gap = Math.abs(card.offsetLeft - cards[0].offsetLeft - viewport.scrollLeft);
      if (gap < distance) { distance = gap; nearest = index; }
    });
    return nearest;
  }, []);

  const settle = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || dragRef.current.active) return;
    const nearest = nearestCard();
    const normalized = nearest < storyCount ? nearest + storyCount : nearest >= storyCount * 2 ? nearest - storyCount : nearest;
    if (normalized !== nearest) viewport.scrollLeft = cardLeft(normalized);
    currentRef.current = normalized;
    setActiveIndex(normalized - storyCount);
  }, [cardLeft, nearestCard]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    viewportRef.current?.style.removeProperty('scroll-snap-type');
  }, []);

  const pauseInteraction = () => {
    setInteracting(true);
    if (interactionTimerRef.current !== null) window.clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = window.setTimeout(() => setInteracting(false), 1800);
  };

  const goTo = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    stopAnimation();
    const target = Math.max(0, Math.min(loopedStories.length - 1, index));
    currentRef.current = target;
    setActiveIndex((target - storyCount + storyCount * 3) % storyCount);
    const destination = cardLeft(target);
    if (reducedMotion) { viewport.scrollLeft = destination; return; }
    const start = viewport.scrollLeft;
    const started = performance.now();
    viewport.style.scrollSnapType = 'none';
    const frame = (now: number) => {
      const progress = Math.min((now - started) / 950, 1);
      const eased = progress * progress * (3 - 2 * progress);
      viewport.scrollLeft = start + (destination - start) * eased;
      if (progress < 1) animationRef.current = window.requestAnimationFrame(frame);
      else {
        animationRef.current = null;
        viewport.style.removeProperty('scroll-snap-type');
      }
    };
    animationRef.current = window.requestAnimationFrame(frame);
  }, [cardLeft, reducedMotion, stopAnimation]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = cardLeft(storyCount);
    const observer = new ResizeObserver(() => { viewport.scrollLeft = cardLeft(currentRef.current); });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [cardLeft]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion || hovered || focused || dragging || interacting || storyCount < 2) return;
    const timer = window.setInterval(() => { if (!document.hidden) goTo(currentRef.current + 1); }, 5000);
    return () => window.clearInterval(timer);
  }, [dragging, focused, goTo, hovered, inView, interacting, reducedMotion]);

  useEffect(() => () => {
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    if (interactionTimerRef.current !== null) window.clearTimeout(interactionTimerRef.current);
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
  }, []);

  const onScroll = () => {
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(settle, 180);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    stopAnimation();
    const viewport = event.currentTarget;
    dragRef.current = { active: true, startX: event.clientX, startScroll: viewport.scrollLeft };
    viewport.style.scrollSnapType = 'none';
    viewport.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    event.currentTarget.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const viewport = event.currentTarget;
    dragRef.current.active = false;
    viewport.style.removeProperty('scroll-snap-type');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    setDragging(false);
    goTo(nearestCard());
  };

  return (
    <div className={styles.carousel} ref={carouselRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}>
      <div className={styles.carouselToolbar}>
        <div className={styles.progress} aria-label={`História ${activeIndex + 1} de ${storyCount}`}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span><span className={styles.progressTrack}><span style={{ width: `${((activeIndex + 1) / storyCount) * 100}%` }} /></span><span>{String(storyCount).padStart(2, '0')}</span>
        </div>
        <div className={styles.controls}>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => goTo(currentRef.current - 1)} aria-label="Depoimento anterior"><ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" /></button>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => goTo(currentRef.current + 1)} aria-label="Próximo depoimento"><ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></button>
        </div>
      </div>
      <div className={styles.viewport} ref={viewportRef} role="region" aria-roledescription="carrossel" aria-label="Histórias de pacientes" tabIndex={0} onScroll={onScroll} onWheel={() => { stopAnimation(); pauseInteraction(); }} onTouchStart={() => { stopAnimation(); pauseInteraction(); }} onTouchMove={pauseInteraction} onTouchEnd={pauseInteraction} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentRef.current + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
        <div className={styles.stories}>{loopedStories.map((story, index) => <Story key={`${story.number}-${index}`} story={story} isClone={index < storyCount || index >= storyCount * 2} />)}</div>
      </div>
    </div>
  );
}

function TestimonialsClosing() {
  return (
    <div className={styles.closing}>
      <p className={styles.eyebrow}>Cada história é única</p>
      <h3>O próximo processo<br />pode começar por <em>você.</em></h3>
      <BookingButton heroButton />
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="historias-reais" className={styles.section} aria-labelledby="stories-title">
      <div className={styles.inner}>
        <TestimonialIntro />
        <StoriesCarousel />
        <TestimonialsClosing />
      </div>
    </section>
  );
}
