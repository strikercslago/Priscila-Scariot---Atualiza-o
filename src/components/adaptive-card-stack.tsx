'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Keep tall cards readable before they pin, without an inner scroll area. */
export function AdaptiveCardStack({ children, className }: { children: ReactNode; className: string }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.children) as HTMLElement[];
    const header = document.querySelector<HTMLElement>('.header');
    let frame = 0;

    const measure = () => {
      frame = 0;
      const style = getComputedStyle(stack);
      const clearance = parseFloat(style.getPropertyValue('--stack-clearance'));
      const step = parseFloat(style.getPropertyValue('--stack-step'));
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      // Read every height before writing styles. No work is needed on page scroll.
      const tops = cards.map((card, index) => Math.min(
        headerHeight + clearance + index * step,
        viewportHeight - card.getBoundingClientRect().height - clearance,
      ));
      cards.forEach((card, index) => card.style.setProperty('--sticky-top', `${tops[index]}px`));
    };
    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    cards.forEach(card => observer.observe(card));
    if (header) observer.observe(header);
    window.addEventListener('resize', scheduleMeasure);
    window.visualViewport?.addEventListener('resize', scheduleMeasure);
    scheduleMeasure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      window.visualViewport?.removeEventListener('resize', scheduleMeasure);
    };
  }, []);

  return <div ref={stackRef} className={className} data-motion-stack>{children}</div>;
}
