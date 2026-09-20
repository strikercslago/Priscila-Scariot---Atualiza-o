'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './life-manifesto.module.css';
import { SectionLink } from './section-link';

function ManifestoAction() {
  return (
    <div className={styles.actionGroup}>
      <span className={styles.actionWrap}>
        <SectionLink className={styles.button} href="#como-funciona">
          Quero entender como funciona <ArrowUpRight size={17} />
        </SectionLink>
      </span>
      <span className={styles.microcopy}>Consulta presencial e online</span>
    </div>
  );
}

export function LifeManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.manifesto} ${visible ? styles.visible : ''}`}
      aria-labelledby="life-manifesto-title"
    >
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <p className={styles.eyebrow}><i aria-hidden="true" />Acompanhamento que cabe na vida real</p>
          <h2 id="life-manifesto-title" className={styles.title}>
            <span>Você não precisa caber em uma dieta.</span>
            <span>A estratégia precisa caber <em>na sua vida.</em></span>
          </h2>
          <p className={styles.support}>Um acompanhamento realmente individualizado precisa considerar quem você é, como você vive e o que é possível sustentar na sua rotina. A alimentação precisa funcionar fora do consultório também.</p>
          <p className={styles.closing}>
            <i aria-hidden="true" />
            <span>Porque resultado não é seguir perfeitamente por alguns dias.<br />É construir algo que possa continuar fazendo sentido ao longo do tempo.</span>
          </p>
          <ManifestoAction />
        </div>
      </div>
    </section>
  );
}
