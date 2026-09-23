'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import analysisImage from '../../public/priscila-analise-exames.png';
import lectureImage from '../../public/priscila-palestra.png';
import transitionImage from '../../public/transition-apples.png';
import styles from './clinical-method.module.css';

const factors = [
  'Metabolismo',
  'Exames',
  'Rotina',
  'Comportamento alimentar',
  'Saúde hormonal',
  'Medicações',
  'Preferências',
  'Histórico',
];

export function ClinicalMethod() {
  const transitionRef = useRef<HTMLElement>(null);
  const transitionMediaRef = useRef<HTMLDivElement>(null);
  const clinicalRef = useRef<HTMLElement>(null);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [clinicalVisible, setClinicalVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observe = (element: HTMLElement | null, reveal: () => void) => {
      if (!element) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      }, { threshold: 0.14 });
      observer.observe(element);
      observers.push(observer);
    };

    observe(transitionRef.current, () => setTransitionVisible(true));
    observe(clinicalRef.current, () => setClinicalVisible(true));
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const section = transitionRef.current;
    const media = transitionMediaRef.current;
    if (!section || !media) return;

    const mobile = window.matchMedia('(max-width: 760px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!mobile.matches || reducedMotion.matches) {
        media.style.transform = '';
        media.style.removeProperty('--parallax-overscan');
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      const viewportCenter = (viewport?.offsetTop ?? 0) + viewportHeight / 2;
      // Keep the existing mobile parallax within an editorial, low-motion range.
      const maxTravel = 18;
      const offset = Math.max(-maxTravel, Math.min(maxTravel, (viewportCenter - rect.top - rect.height / 2) * 0.08));
      media.style.setProperty('--parallax-overscan', `${maxTravel + 2}px`);
      media.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.visualViewport?.addEventListener('resize', scheduleUpdate);
    window.visualViewport?.addEventListener('scroll', scheduleUpdate);
    mobile.addEventListener('change', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(section);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.visualViewport?.removeEventListener('resize', scheduleUpdate);
      window.visualViewport?.removeEventListener('scroll', scheduleUpdate);
      mobile.removeEventListener('change', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={transitionRef}
        className={`${styles.transition} ${transitionVisible ? styles.visible : ''}`}
        aria-labelledby="perspective-title"
      >
        <div ref={transitionMediaRef} className={styles.transitionMedia} aria-hidden="true">
          <Image src={transitionImage} alt="" fill sizes="100vw" className={styles.transitionPhoto} />
        </div>
        <div className={styles.transitionOverlay} aria-hidden="true" />
        <svg className={styles.organicLines} viewBox="0 0 1440 520" fill="none" aria-hidden="true">
          <path d="M-80 352C212 245 335 475 588 373C835 274 967 40 1538 123" />
          <path d="M-34 415C238 323 355 516 640 418C956 309 1114 121 1502 174" />
        </svg>
        <div className={styles.transitionCopy}>
          <p className={styles.transitionLabel}>Uma nova perspectiva</p>
          <h2 id="perspective-title" className={styles.transitionTitle}>
            <span>Não se trata de comer perfeito.</span>
            <span>Trata-se de construir uma estratégia</span>
            <span>que você consiga <em>sustentar.</em></span>
          </h2>
        </div>
      </section>

      <section
        ref={clinicalRef}
        id="abordagem"
        className={`${styles.clinical} ${clinicalVisible ? styles.visible : ''}`}
        aria-labelledby="clinical-title"
      >
        <div className={styles.clinicalInner}>
          <header className={styles.clinicalHeader}>
            <p className={styles.eyebrow}>Abordagem individualizada</p>
            <h2 id="clinical-title" className={styles.clinicalTitle}>
              Nutrição clínica para cuidar da causa,<br /> não apenas do <em>prato.</em>
            </h2>
          </header>

          <div className={styles.stage}>
            <p className={styles.intro}>Cada pessoa chega à consulta com uma história diferente.</p>

            <figure className={`${styles.figure} ${styles.mainFigure}`}>
              <Image
                src={lectureImage}
                alt="Dra. Priscila apresentando uma palestra para profissionais de saúde"
                fill
                placeholder="blur"
                sizes="(max-width: 760px) 86vw, (max-width: 1200px) 34vw, 470px"
                className={styles.photo}
              />
              <figcaption className={`${styles.floatingNote} ${styles.noteRight}`}>Rotina<br /><span>+ comportamento</span></figcaption>
            </figure>

            <p className={styles.body}>Metabolismo, exames, rotina, comportamento alimentar, saúde hormonal, medicações, preferências e experiências anteriores precisam ser considerados para que a alimentação seja realmente individualizada.</p>

            <ul className={styles.factors} aria-label="Fatores considerados no acompanhamento">
              {factors.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>

            <figure className={`${styles.figure} ${styles.secondaryFigure}`}>
              <Image
                src={analysisImage}
                alt="Dra. Priscila analisando exames e registrando observações clínicas"
                fill
                placeholder="blur"
                sizes="(max-width: 760px) 86vw, (max-width: 1200px) 24vw, 330px"
                className={styles.photo}
              />
              <figcaption className={`${styles.floatingNote} ${styles.noteLeft}`}>Metabolismo<br /><span>+ exames</span></figcaption>
            </figure>

            <p className={styles.closing}>Por isso, o acompanhamento da Priscila combina sua experiência em Nutrição Clínica e Metabolismo, Nutrição Funcional e diferentes áreas da prática clínica para desenvolver uma estratégia nutricional adequada a cada paciente.</p>
          </div>
        </div>
      </section>
    </>
  );
}
