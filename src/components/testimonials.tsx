import Image, { type StaticImageData } from 'next/image';
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
    name: 'Relato de paciente',
    title: 'Quando o acompanhamento passa a fazer sentido na vida real.',
    paragraphs: [
      'Cada processo acontece de maneira diferente.',
      'Neste relato, a paciente compartilha sua percepção sobre cuidado, acolhimento e as mudanças que vivenciou ao longo do acompanhamento nutricional.',
    ],
    image: patient,
    alt: 'Paciente em arte de relato sobre acompanhamento nutricional, identificada pela categoria endometriose.',
  },
];

function TestimonialIntro() {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Experiências de pacientes</p>
      <h2 id="stories-title"><em>Histórias reais</em> por trás do acompanhamento.</h2>
      <p className={styles.lead}>Cada pessoa chega com uma história, necessidades e objetivos diferentes. Alguns desses relatos mostram experiências de pacientes que passaram pelo acompanhamento nutricional da Dra. Priscila.</p>
    </header>
  );
}

function Story({ story, index }: { story: PatientStory; index: number }) {
  const featured = index === 0;
  return (
    <article className={`${styles.story} ${featured ? styles.featured : styles.secondary} ${index === 1 ? styles.reversed : ''}`} aria-labelledby={`story-${story.number}`}>
      <figure className={styles.figure}>
        <Image src={story.image} alt={story.alt} fill placeholder="blur" sizes={featured ? '(max-width: 760px) 86vw, (max-width: 1100px) 43vw, 560px' : '(max-width: 760px) 86vw, (max-width: 1100px) 41vw, 480px'} className={styles.photo} />
      </figure>
      <div className={styles.content}>
        <span className={styles.number} aria-hidden="true">{story.number}</span>
        <p className={styles.category}>{story.category}</p>
        <h3 id={`story-${story.number}`}>{story.name}</h3>
        <p className={styles.storyTitle}>{story.title}</p>
        <div className={styles.body}>{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
    </article>
  );
}

function TestimonialsClosing() {
  return (
    <div className={styles.closing}>
      <p className={styles.eyebrow}>Cada história é única</p>
      <h3>O próximo processo<br />pode começar por <em>você.</em></h3>
      <BookingButton heroButton />
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="historias-reais" className={styles.section} aria-labelledby="stories-title">
      <div className={styles.inner}>
        <TestimonialIntro />
        <div className={styles.stories}>{patientStories.map((story, index) => <Story key={story.number} story={story} index={index} />)}</div>
        <TestimonialsClosing />
      </div>
    </section>
  );
}
