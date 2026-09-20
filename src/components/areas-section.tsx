import Image, { type StaticImageData } from 'next/image';
import area01 from '../../public/areas/01_emagrecimento_obesidade.png';
import area02 from '../../public/areas/02_saude_metabolica.png';
import area03 from '../../public/areas/03_saude_da_mulher.png';
import area04 from '../../public/areas/04_comportamento_alimentar.png';
import area05 from '../../public/areas/05_saude_digestiva.png';
import area06 from '../../public/areas/06_nutricao_funcional_preventiva.png';
import styles from './areas-section.module.css';
import { AdaptiveCardStack } from './adaptive-card-stack';

type AreaFeature = { icon: string; label: string };
type Area = {
  number: string;
  title: string;
  copy: string[];
  image: StaticImageData;
  alt: string;
  tone: 'green' | 'cream' | 'paper' | 'sage';
  decoration: 'leaf' | 'curve' | 'line';
  position?: string;
  features: AreaFeature[];
};

const areas: Area[] = [
  {
    number: '01',
    title: 'Emagrecimento e obesidade',
    copy: [
      'Para quem enfrenta dificuldade para emagrecer, já passou por ciclos de perda e recuperação de peso ou precisa de acompanhamento nutricional durante o tratamento da obesidade.',
      'O acompanhamento considera alimentação, metabolismo, rotina, comportamento e contexto clínico, incluindo o suporte nutricional para pacientes que utilizam medicamentos e canetas emagrecedoras prescritos por seus médicos.',
    ],
    image: area01,
    alt: 'Pessoa ajustando uma calça durante um processo de cuidado com o peso',
    tone: 'green',
    decoration: 'curve',
    position: '50% 46%',
    features: [
      { icon: 'alimentacao', label: 'Emagrecimento' },
      { icon: 'metabolismo', label: 'Obesidade' },
      { icon: 'comportamento', label: 'Metabolismo' },
      { icon: 'rotina', label: 'Canetas emagrecedoras' },
    ],
  },
  {
    number: '02',
    title: 'Saúde metabólica',
    copy: [
      'Alterações metabólicas muitas vezes aparecem nos exames antes mesmo de provocarem sintomas evidentes.',
      'O acompanhamento nutricional atua no cuidado de condições como resistência à insulina, diabetes tipo 2, síndrome metabólica e esteatose hepática, considerando alimentação, composição corporal, rotina e contexto clínico de cada paciente.',
    ],
    image: area02,
    alt: 'Resultados de exames sendo analisados durante o acompanhamento clínico',
    tone: 'cream',
    decoration: 'leaf',
    position: '50% 54%',
    features: [
      { icon: 'glicemia', label: 'Diabetes tipo 2' },
      { icon: 'colesterol', label: 'Resistência à insulina' },
      { icon: 'resistencia_insulina', label: 'Síndrome metabólica' },
      { icon: 'exames', label: 'Esteatose hepática' },
    ],
  },
  {
    number: '03',
    title: 'Saúde da mulher',
    copy: [
      'A saúde da mulher muda ao longo das diferentes fases da vida e pode exigir estratégias nutricionais específicas.',
      'O acompanhamento considera metabolismo, saúde hormonal, sintomas, rotina e necessidades individuais em condições como endometriose, SOMP/SOP, menopausa e infertilidade.',
    ],
    image: area03,
    alt: 'Mulher segurando flores junto ao corpo em uma cena delicada e acolhedora',
    tone: 'paper',
    decoration: 'line',
    position: '50% 45%',
    features: [
      { icon: 'ciclo_menstrual', label: 'Endometriose' },
      { icon: 'fertilidade', label: 'SOMP / SOP' },
      { icon: 'climaterio', label: 'Menopausa' },
      { icon: 'bem_estar_hormonal', label: 'Infertilidade' },
    ],
  },
  {
    number: '04',
    title: 'Comportamento alimentar',
    copy: [
      'Uma alimentação saudável não depende apenas de saber o que comer. A relação com a comida também precisa ser compreendida.',
      'O acompanhamento considera comportamento alimentar, emoções, rotina e histórico individual, inclusive em situações que envolvem compulsão alimentar e transtornos alimentares, sempre respeitando a necessidade de acompanhamento multidisciplinar quando indicado.',
    ],
    image: area04,
    alt: 'Pessoa escrevendo sobre escolhas conscientes em um caderno',
    tone: 'green',
    decoration: 'leaf',
    position: '50% 52%',
    features: [
      { icon: 'consciencia', label: 'Compulsão alimentar' },
      { icon: 'equilibrio', label: 'Relação com a comida' },
      { icon: 'liberdade', label: 'Consciência alimentar' },
      { icon: 'sustentabilidade', label: 'Estratégia sustentável' },
    ],
  },
  {
    number: '05',
    title: 'Nutrição Materno-Infantil',
    copy: [
      'A nutrição acompanha mãe e bebê em algumas das fases de maior transformação do organismo feminino.',
      'Durante a gestação, o pós-parto e a amamentação, as necessidades nutricionais mudam e o acompanhamento individualizado contribui para cuidar da saúde materna e oferecer suporte nutricional adequado a cada etapa.',
    ],
    image: area05,
    alt: 'Refeição equilibrada com vegetais, grãos e sementes',
    tone: 'cream',
    decoration: 'curve',
    position: '50% 49%',
    features: [
      { icon: 'inchaco', label: 'Gestação' },
      { icon: 'intestino', label: 'Pós-parto' },
      { icon: 'tolerancia_alimentar', label: 'Amamentação' },
      { icon: 'conforto_digestivo', label: 'Saúde materna' },
    ],
  },
  {
    number: '06',
    title: 'Nutrição Funcional Integrativa',
    copy: [
      'Uma abordagem que observa o organismo de forma integrada, considerando alimentação, metabolismo, saúde intestinal, rotina, sono, estresse e individualidade.',
      'A estratégia pode combinar alimentação, prevenção e suplementação individualizada quando indicada, com foco em corrigir desequilíbrios nutricionais e promover saúde e qualidade de vida ao longo do tempo.',
    ],
    image: area06,
    alt: 'Folha verde com gotas de água representando vitalidade e prevenção',
    tone: 'sage',
    decoration: 'line',
    position: '50% 50%',
    features: [
      { icon: 'prevencao', label: 'Prevenção' },
      { icon: 'imunidade', label: 'Suplementação' },
      { icon: 'energia', label: 'Saúde intestinal' },
      { icon: 'longevidade', label: 'Longevidade' },
    ],
  },
];

function AreasIntro() {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Áreas de atuação</p>
      <h2 id="areas-title" className={styles.title}>
        Um acompanhamento que considera muito mais do que o que está no <em>seu prato.</em>
      </h2>
      <p className={styles.lead}>Cada pessoa tem uma história, um corpo, uma rotina e um contexto único. Por isso, o acompanhamento integra diferentes áreas da nutrição clínica para construir uma estratégia adequada à realidade de cada paciente.</p>
    </header>
  );
}

function AreaFeatures({ features }: { features: AreaFeature[] }) {
  return (
    <ul className={styles.features} aria-label="Aspectos considerados">
      {features.map((feature, index) => (
        <li key={feature.label} style={{ '--feature-index': index } as React.CSSProperties}>
          <Image src={`/icons/${feature.icon}.svg`} alt="" width={26} height={26} aria-hidden="true" />
          <span>{feature.label}</span>
        </li>
      ))}
    </ul>
  );
}

function AreaCard({ area, index }: { area: Area; index: number }) {
  return (
    <article
      className={`${styles.card} ${styles[area.tone]}`}
      style={{ '--card-index': index } as React.CSSProperties}
      aria-labelledby={`area-${area.number}`}
    >
      <img className={styles.decoration} src={`/decor/${area.decoration === 'leaf' ? 'folha_01' : area.decoration === 'curve' ? 'curva_organica' : 'linha_editorial'}.svg`} alt="" aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.numberLine}><span>{area.number}</span><i aria-hidden="true" /></div>
        <h3 id={`area-${area.number}`}>{area.title}</h3>
        <div className={styles.copy}>{area.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <AreaFeatures features={area.features} />
      </div>
      <figure className={styles.figure}>
        <Image
          src={area.image}
          alt={area.alt}
          fill
          placeholder="blur"
          sizes="(max-width: 760px) 86vw, (max-width: 1100px) 42vw, 560px"
          className={styles.photo}
          style={{ objectPosition: area.position }}
        />
      </figure>
    </article>
  );
}

function AreaStack() {
  return <AdaptiveCardStack className={styles.stack}>{areas.map((area, index) => <AreaCard key={area.number} area={area} index={index} />)}</AdaptiveCardStack>;
}

export function AreasSection() {
  return (
    <section id="areas" className={styles.section} aria-labelledby="areas-title">
      <div className={styles.inner}>
        <AreasIntro />
        <AreaStack />
      </div>
    </section>
  );
}
