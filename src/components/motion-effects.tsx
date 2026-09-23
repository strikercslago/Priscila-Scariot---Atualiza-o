'use client';

import { useEffect } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** One scroll frame updates the few effects that follow the visitor's position. */
export function MotionEffects() {
  useEffect(() => {
    const timeline = document.querySelector<HTMLElement>('[data-motion-timeline]');
    const steps = timeline ? Array.from(timeline.querySelectorAll<HTMLElement>('article')) : [];
    const stack = document.querySelector<HTMLElement>('[data-motion-stack]');
    const cards = stack ? Array.from(stack.querySelectorAll<HTMLElement>('[data-motion-card]')) : [];
    const manifesto = document.querySelector<HTMLElement>('[data-motion-manifesto]');
    const whatsapp = document.querySelector<HTMLElement>('[data-motion-whatsapp]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)');
    let frame = 0;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.motionInview = 'true';
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    document.querySelectorAll<HTMLElement>('[data-motion-reveal]').forEach((element) => revealObserver.observe(element));

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const isReduced = reducedMotion.matches;

      if (whatsapp) {
        whatsapp.dataset.motionReady = 'true';
        if (window.scrollY > 320) whatsapp.dataset.motionShown = 'true';
        else delete whatsapp.dataset.motionShown;
      }

      if (timeline) {
        if (isReduced) {
          timeline.style.removeProperty('--timeline-progress');
          steps.forEach((step) => step.style.removeProperty('--number-drift'));
        } else {
          const rect = timeline.getBoundingClientRect();
          const inset = mobile.matches ? 55 : 130;
          const progress = clamp((viewportHeight * .55 - rect.top - inset) / Math.max(1, rect.height - inset * 2));
          timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
          for (const step of steps) {
            const stepRect = step.getBoundingClientRect();
            const position = clamp((viewportHeight - stepRect.top) / (viewportHeight + stepRect.height));
            const amplitude = mobile.matches ? 12 : 20;
            step.style.setProperty('--number-drift', `${((.5 - position) * amplitude * 2).toFixed(1)}px`);
          }
        }
      }

      if (manifesto) {
        if (isReduced) {
          manifesto.style.removeProperty('--manifesto-shift');
          manifesto.style.removeProperty('--manifesto-scale');
        } else {
          const rect = manifesto.getBoundingClientRect();
          const position = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
          const amplitude = mobile.matches ? 18 : 35;
          manifesto.style.setProperty('--manifesto-shift', `${((position - .5) * amplitude * 2).toFixed(1)}px`);
          manifesto.style.setProperty('--manifesto-scale', (1.03 + position * .03).toFixed(3));
        }
      }

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next || isReduced) {
          card.style.removeProperty('--stack-depth');
          card.style.removeProperty('--stack-opacity');
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const overlap = clamp((cardRect.top + 140 - nextRect.top) / 140);
        card.style.setProperty('--stack-depth', (1 - overlap * .02).toFixed(3));
        card.style.setProperty('--stack-opacity', (1 - overlap * .09).toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(schedule);
    if (timeline) resizeObserver.observe(timeline);
    if (stack) resizeObserver.observe(stack);
    if (manifesto) resizeObserver.observe(manifesto);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    mobile.addEventListener('change', schedule);
    document.addEventListener('visibilitychange', schedule);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      revealObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      mobile.removeEventListener('change', schedule);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, []);

  return null;
}
