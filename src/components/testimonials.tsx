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
    name: 'Vanderlise',
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

function TestimonialIntro() {
  return (
    <header className={styles.intro} data-motion-reveal>
      <p className={styles.eyebrow}>Experiências de pacientes</p>
      <h2 id="stories-title"><em>Histórias reais</em> por trás do acompanhamento.</h2>
      <p className={styles.lead}>Cada pessoa chega com uma história, necessidades e objetivos diferentes. Alguns desses relatos mostram experiências de pacientes que passaram pelo acompanhamento nutricional da Dra. Priscila.</p>
    </header>
  );
}

function Story({ story }: { story: PatientStory }) {
  const headingId = `story-${story.number}`;
  return (
    <article className={styles.story} data-story-card data-motion-reveal aria-labelledby={headingId}>
      <figure className={styles.figure}>
        <Image src={story.image} alt={story.alt} fill placeholder="blur" sizes="(max-width: 760px) 80vw, (max-width: 900px) 52vw, 380px" className={styles.photo} draggable={false} />
      </figure>
      <div className={styles.content}>
        <div className={styles.meta}><span className={styles.number} aria-hidden="true">{story.number}</span><p className={styles.category}>{story.category}</p></div>
        <h3 id={headingId}>{story.name}</h3>
        <p className={styles.storyTitle}>{story.title}</p>
        <div className={styles.body}>{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
    </article>
  );
}

function StoriesCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const settleTimerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const cardLeft = useCallback((index: number) => {
    const cards = viewportRef.current?.querySelectorAll<HTMLElement>('[data-story-card]');
    return cards?.[index] && cards[0] ? cards[index].offsetLeft - cards[0].offsetLeft : 0;
  }, []);

  const destinationFor = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    return Math.min(cardLeft(index), Math.max(0, viewport.scrollWidth - viewport.clientWidth));
  }, [cardLeft]);

  const nearestCard = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    let nearest = 0;
    let distance = Infinity;
    patientStories.forEach((_, index) => {
      const gap = Math.abs(destinationFor(index) - viewport.scrollLeft);
      if (gap < distance) { distance = gap; nearest = index; }
    });
    return nearest;
  }, [destinationFor]);

  const settle = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || dragRef.current.active) return;
    const nearest = nearestCard();
    currentRef.current = nearest;
    setActiveIndex(nearest);
  }, [nearestCard]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    viewportRef.current?.style.removeProperty('scroll-snap-type');
  }, []);

  const goTo = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.scrollWidth <= viewport.clientWidth + 1) return;
    stopAnimation();
    const target = Math.max(0, Math.min(storyCount - 1, index));
    currentRef.current = target;
    setActiveIndex(target);
    const destination = destinationFor(target);
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
  }, [destinationFor, reducedMotion, stopAnimation]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      setCanScroll(viewport.scrollWidth > viewport.clientWidth + 1);
      viewport.scrollLeft = destinationFor(currentRef.current);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [destinationFor]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => () => {
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
  }, []);

  const onScroll = () => {
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(settle, 180);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !canScroll) return;
    stopAnimation();
    const viewport = event.currentTarget;
    dragRef.current = { active: true, startX: event.clientX, startScroll: viewport.scrollLeft };
    viewport.style.scrollSnapType = 'none';
    viewport.setPointerCapture(event.pointerId);
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
    goTo(nearestCard());
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselToolbar}>
        <div className={styles.progress} aria-label={`História ${activeIndex + 1} de ${storyCount}`}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span><span className={styles.progressTrack}><span style={{ width: `${((activeIndex + 1) / storyCount) * 100}%` }} /></span><span>{String(storyCount).padStart(2, '0')}</span>
        </div>
        <div className={styles.controls}>
          <button type="button" disabled={!canScroll || activeIndex === 0} onMouseDown={(event) => event.preventDefault()} onClick={() => goTo(currentRef.current - 1)} aria-label="Depoimento anterior"><ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" /></button>
          <button type="button" disabled={!canScroll || activeIndex === storyCount - 1} onMouseDown={(event) => event.preventDefault()} onClick={() => goTo(currentRef.current + 1)} aria-label="Próximo depoimento"><ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></button>
        </div>
      </div>
      <div className={styles.viewport} ref={viewportRef} role="region" aria-roledescription="carrossel" aria-label="Histórias de pacientes" tabIndex={0} onScroll={onScroll} onWheel={stopAnimation} onTouchStart={stopAnimation} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentRef.current + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
        <div className={styles.stories}>{patientStories.map((story) => <Story key={story.number} story={story} />)}</div>
      </div>
    </div>
  );
}

function TestimonialsClosing() {
  return (
    <div className={styles.closing} data-motion-reveal data-motion-final>
      <p className={styles.eyebrow}>Cada história é única</p>
      <h2>O próximo processo<br />pode começar por <em>você.</em></h2>
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
      </div>
    </section>
  );
}

export function TestimonialsClosingSection() {
  return (
    <section className={styles.closingSection} aria-label="Agendamento de consulta">
      <div className={styles.inner}>
        <TestimonialsClosing />
      </div>
    </section>
  );
}
