'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import portrait from '../../public/identification-weight-frustration.png';
import styles from './identification.module.css';
import { SectionLink } from './section-link';

export function Identification() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} id="acolhimento" className={`${styles.section} ${visible ? styles.visible : ''}`} aria-labelledby="identification-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.label}>Nutrição clínica e metabolismo</p>
          <h2 id="identification-title" className={styles.title}>Talvez o problema não seja falta de <em>força de vontade.</em></h2>
          <p className={styles.body}>Você já sabe que precisa comer melhor. Talvez já tenha feito dietas, eliminado alimentos, perdido peso e recuperado tudo novamente. Pode ser que seus exames tenham começado a mudar, que o peso esteja cada vez mais difícil de controlar ou que sua relação com a comida tenha se transformado em culpa, ansiedade e recomeços.</p>
          <p className={styles.emphasis}>Nutrição não deveria ser mais uma fonte de frustração.</p>
          <p className={styles.body}>O acompanhamento nutricional precisa entender o que está por trás da sua dificuldade e construir uma estratégia que faça sentido para a sua realidade.</p>
          <div className={styles.action}>
            <SectionLink className={styles.button} href="#como-funciona">Entender como funciona<ArrowUpRight size={18} aria-hidden="true"/></SectionLink>
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image src={portrait} alt="Mulher frustrada ao fundo, com uma balança e fita métrica em primeiro plano" fill sizes="(max-width: 760px) 210vw, 1500px" placeholder="blur" className={styles.image}/>
        </figure>
      </div>
    </section>
  );
}
