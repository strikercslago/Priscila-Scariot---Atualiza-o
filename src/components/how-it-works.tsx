import Image, { type StaticImageData } from 'next/image';
import consultation from '../../public/manifesto-consulta.webp';
import analysis from '../../public/clinical-analysis.png';
import planning from '../../public/hero.webp';
import followUp from '../../public/clinical-consultation.png';
import { BookingButton } from './landing';
import styles from './how-it-works.module.css';

type ProcessStep = {
  number: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: StaticImageData;
  alt: string;
  position: string;
};

const processSteps: ProcessStep[] = [
  {
    number: '01',
    eyebrow: 'Primeira consulta',
    title: 'Tudo começa entendendo você.',
    paragraphs: [
      'A primeira consulta é o momento de conhecer sua história, sua rotina, seus objetivos e as dificuldades que trouxeram você até aqui.',
      'Mais do que perguntar o que você come, o atendimento considera seu histórico clínico, relação com a alimentação, exames, hábitos, preferências, uso de medicamentos e contexto de vida.',
      'Esse primeiro encontro cria a base para que as próximas decisões façam sentido para você.',
    ],
    image: consultation,
    alt: 'Dra. Priscila conversando com uma paciente durante a consulta.',
    position: '44% center',
  },
  {
    number: '02',
    eyebrow: 'Avaliação clínica e nutricional',
    title: 'Olhar para o conjunto antes de definir o caminho.',
    paragraphs: [
      'A avaliação reúne as informações necessárias para compreender como seu organismo, sua rotina e seus hábitos estão se relacionando.',
      'Quando necessário, exames laboratoriais, composição corporal, sintomas, histórico metabólico e outros fatores clínicos ajudam a construir uma visão mais completa.',
      'O objetivo é evitar estratégias genéricas e entender o que realmente precisa de atenção.',
    ],
    image: analysis,
    alt: 'Análise de exames e anotações durante o planejamento nutricional.',
    position: '52% center',
  },
  {
    number: '03',
    eyebrow: 'Estratégia individualizada',
    title: 'Uma estratégia feita para funcionar na sua vida.',
    paragraphs: [
      'Com as informações da avaliação, o acompanhamento passa para a construção da estratégia nutricional.',
      'Ela considera seus objetivos, necessidades clínicas, rotina, preferências, horários, dificuldades e aquilo que você realmente consegue sustentar.',
      'A proposta não é entregar uma dieta perfeita no papel, mas construir um caminho possível de aplicar fora do consultório.',
    ],
    image: planning,
    alt: 'Dra. Priscila no consultório, com alimentos frescos à mesa.',
    position: '70% center',
  },
  {
    number: '04',
    eyebrow: 'Acompanhamento e ajustes',
    title: 'O plano evolui junto com você.',
    paragraphs: [
      'O acompanhamento não termina na primeira orientação.',
      'Nos retornos, avaliamos sua evolução, dificuldades, sintomas, exames, rotina e resposta às estratégias propostas.',
      'A partir disso, os ajustes são feitos de forma progressiva, respeitando mudanças no corpo, nos objetivos e na vida.',
      'O processo é dinâmico: observar, ajustar e continuar avançando.',
    ],
    image: followUp,
    alt: 'Conversa com paciente e revisão de anotações durante uma consulta.',
    position: '50% center',
  },
];

function ProcessIntro() {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Como funciona</p>
      <h2 id="process-title">Um acompanhamento construído <em>etapa por etapa.</em></h2>
      <p>O processo começa entendendo você, seu momento e seus objetivos. A partir disso, cada etapa é construída de forma individualizada, com avaliação, estratégia e ajustes ao longo do acompanhamento.</p>
    </header>
  );
}

function ProcessTimeline() {
  return (
    <div className={styles.timeline}>
      {processSteps.map((step, index) => (
        <article className={`${styles.step} ${index % 2 ? styles.reverse : ''}`} key={step.number} aria-labelledby={`process-step-${step.number}`}>
          <span className={styles.marker} aria-hidden="true" />
          <div className={styles.stepContent}>
            <span className={styles.number} aria-hidden="true">{step.number}</span>
            <p className={styles.stepEyebrow}>{step.eyebrow}</p>
            <h3 id={`process-step-${step.number}`}>{step.title}</h3>
            <div className={styles.body}>
              {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <figure className={styles.figure}>
            <Image src={step.image} alt={step.alt} fill placeholder="blur" sizes="(max-width: 760px) 77vw, (max-width: 1100px) 39vw, 510px" className={styles.photo} style={{ objectPosition: step.position }} />
          </figure>
        </article>
      ))}
    </div>
  );
}

function ProcessClosing() {
  return (
    <div className={styles.closing}>
      <p>O objetivo não é depender de uma dieta.<br />É construir <em>autonomia</em> para cuidar da sua saúde.</p>
      <BookingButton heroButton />
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="process-title">
      <div className={styles.inner}>
        <ProcessIntro />
        <ProcessTimeline />
        <ProcessClosing />
      </div>
    </section>
  );
}
