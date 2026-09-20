'use client';

import type { MouseEvent, ReactNode } from 'react';

export function SectionLink({ href, className, children }: { href: `#${string}`; className: string; children: ReactNode }) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    if (window.location.hash !== href) window.history.pushState(window.history.state, '', href);
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  return <a href={href} className={className} onClick={navigate}>{children}</a>;
}
