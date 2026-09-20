import Image from 'next/image';
import aboutPortrait from '../../public/priscila-about-new.png';
import consultation from '../../public/manifesto-consulta.webp';
import clinicalAnalysis from '../../public/clinical-analysis.png';
import { BookingButton } from './landing';
import styles from './about-journey.module.css';

const expertise = [
  'Nutrição clínica',
  'Metabolismo',
  'Terapia nutricional',
  'Saúde da mulher',
  'Docência',
];

const highlights = [
  { number: '01', title: 'Formação clínica', description: 'Nutrição Clínica e Metabolismo.' },
  { number: '02', title: 'Experiência hospitalar', description: 'Vivência em terapia nutricional e ambiente multidisciplinar.' },
  { number: '03', title: 'Aperfeiçoamento contínuo', description: 'Formação complementar em diferentes áreas da prática nutricional.' },
  { number: '04', title: 'Ensino e experiência profissional', description: 'Participação em educação e formação de profissionais.' },
];

function ExpertiseStrip() {
  return (
    <div className={styles.expertiseStrip} aria-label="Áreas presentes na trajetória profissional">
      <ul>{expertise.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function AboutIntro() {
  return (
    <div className={styles.aboutBlock}>
      <figure className={`${styles.figure} ${styles.aboutPortrait}`}>
        <Image src={aboutPortrait} alt="Dra. Priscila Scariot segurando uma maçã vermelha." fill placeholder="blur" sizes="(max-width: 760px) 86vw, (max-width: 1100px) 42vw, 530px" className={styles.photo} />
      </figure>
      <div className={styles.aboutPanel}>
        <p className={styles.eyebrow}>Sobre a profissional</p>
        <h2 id="about-title" className={styles.aboutTitle}>Conheça a Dra.<br /><em>Priscila Scariot.</em></h2>
        <div className={styles.bodyLight}>
          <p>A trajetória de Priscila Scariot na nutrição foi construída entre a prática clínica, o ambiente hospitalar, o estudo contínuo e o contato próximo com pacientes.</p>
          <p>Ao longo da carreira, diferentes áreas da nutrição passaram a fazer parte de sua formação e da maneira como enxerga cada pessoa que chega ao consultório.</p>
          <p>Hoje, esse conhecimento é aplicado de forma individualizada, considerando não apenas a alimentação, mas o contexto clínico e a realidade de cada paciente.</p>
        </div>
      </div>
    </div>
  );
}

function CareerHighlights() {
  return (
    <ol className={styles.highlights}>
      {highlights.map((highlight, index) => (
        <li key={highlight.number} style={{ '--highlight-index': index } as React.CSSProperties}>
          <div className={styles.highlightLine}><span>{highlight.number}</span><i aria-hidden="true" /></div>
          <h4>{highlight.title}</h4>
          <p>{highlight.description}</p>
        </li>
      ))}
    </ol>
  );
}

function JourneyBlock() {
  return (
    <div className={styles.journeyBlock}>
      <div className={styles.journeyCopy}>
        <p className={styles.eyebrow}>Trajetória</p>
        <h3>Experiência construída<br /><em>dentro e fora</em> do consultório.</h3>
        <div className={styles.bodyDark}>
          <p>Cada etapa da trajetória profissional acrescentou uma nova camada à forma como Priscila conduz seus atendimentos.</p>
          <p>Sua experiência inclui atuação em Nutrição Clínica e Metabolismo, Nutrição Funcional, Terapia Nutricional e diferentes áreas da prática clínica.</p>
          <p>A vivência em ambientes hospitalares, o contato com equipes multidisciplinares e a experiência em educação e formação profissional contribuíram para uma visão mais ampla sobre saúde e alimentação.</p>
        </div>
        <CareerHighlights />
      </div>
      <figure className={`${styles.figure} ${styles.journeyPortrait}`}>
        <Image src={consultation} alt="Dra. Priscila durante uma consulta, conversando e escrevendo ao lado de uma paciente" fill placeholder="blur" sizes="(max-width: 760px) 86vw, (max-width: 1100px) 41vw, 520px" className={styles.photo} />
      </figure>
    </div>
  );
}

function AboutClosing() {
  return (
    <div className={styles.closingBlock}>
      <div className={styles.closingInner}>
        <figure className={`${styles.figure} ${styles.closingFigure}`}>
          <Image src={clinicalAnalysis} alt="Análise de documentos e registros clínicos durante o planejamento nutricional" fill placeholder="blur" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 43vw, 560px" className={styles.photo} />
        </figure>
        <div className={styles.closingCopy}>
          <p className={styles.eyebrow}>Hoje</p>
          <h3>Conhecimento clínico que se transforma em uma estratégia <em>individual.</em></h3>
          <p className={styles.closingBody}>Hoje, toda essa trajetória se encontra no acompanhamento individual de cada paciente, unindo conhecimento técnico, escuta, contexto clínico e uma estratégia nutricional construída para a vida real.</p>
          <p className={styles.finalPhrase}>Experiência importa.<br />Mas entender quem está do outro lado também.</p>
          <div className={styles.closingAction}><BookingButton heroButton /></div>
        </div>
      </div>
    </div>
  );
}

export function AboutJourneySection() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="about-title">
      <ExpertiseStrip />
      <div className={styles.editorialInner}>
        <AboutIntro />
        <JourneyBlock />
      </div>
      <AboutClosing />
    </section>
  );
}
