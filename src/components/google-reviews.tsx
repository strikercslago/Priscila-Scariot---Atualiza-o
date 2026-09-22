import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from './google-reviews.module.css';

type GoogleReview = {
  id: string;
  name: string;
  rating: number;
  reviewCountLabel?: string;
  dateLabel?: string;
  comment: string | null;
  avatar?: string;
};

// Add a new review here and place its original avatar in public/reviews/avatars/.
// A review without legible comment stays in the data but is not published.
const googleReviews: GoogleReview[] = [
  {
    id: 'rafael-gomes',
    name: 'Rafael Gomes',
    avatar: '/reviews/avatars/rafael-gomes.png',
    rating: 5,
    reviewCountLabel: '1 review · 5 photos',
    comment: 'Excelente profissional! A Dra. Priscila é muito atenciosa e demonstra muito conhecimento durante todo o atendimento. O que mais gostei foi a forma como ela busca entender a rotina, os hábitos e as dificuldades antes de simplesmente passar ...',
  },
  {
    id: 'lauren-furini',
    name: 'Lauren Furini',
    avatar: '/reviews/avatars/lauren-furini.png',
    rating: 5,
    reviewCountLabel: '1 review',
    dateLabel: '3 months ago',
    comment: 'Vim falar do quanto estou satisfeita com os resultados que adquiri junto a Nutricionista Priscila Scariot em 45 dias de controle alimentar e cuidados com a saúde. Eliminei 6kg e 17 cm do abdômen. Me surpreendi com tamanho resultado em tão ...',
  },
  {
    id: 'maria-victoria-batista-ferreira',
    name: 'Maria Victória Batista Ferreira',
    avatar: '/reviews/avatars/maria-victoria-batista-ferreira.png',
    rating: 5,
    reviewCountLabel: '3 reviews',
    dateLabel: '5 months ago',
    comment: 'Amei a consulta de nutrição para menopausa com a Dra Priscila, estava sofrendo com falta de orientação por falta de saber qual melhor dieta e principalmente a parte hormonal, ela acertou, super indico.',
  },
  {
    id: 'nathaly-bento',
    name: 'Nathaly Bento',
    avatar: '/reviews/avatars/nathaly-bento.png',
    rating: 5,
    reviewCountLabel: '3 reviews',
    dateLabel: '3 months ago',
    comment: 'Melhor nutri da vidaa! Melhorou minha qualidade de vida além de regular toda a parte hormonal! Amei o atendimento!',
  },
  {
    id: 'jussaniapedroso',
    name: 'Jussaniapedroso',
    avatar: '/reviews/avatars/jussaniapedroso.png',
    rating: 5,
    reviewCountLabel: '2 reviews',
    dateLabel: '2 months ago',
    comment: 'A Nutri Priscila Scariot é uma profissional com grandes conhecimentos e estudos. Esclarece tudo com firmeza, explica tudo de maneira simples e fácil. Seu atendimento tem um diferencial. Estamos eu, minha filha e meu esposo se tratando com ...',
  },
  {
    id: 'vanderlise-schena',
    name: 'Vanderlise Schena',
    avatar: '/reviews/avatars/vanderlise-schena.png',
    rating: 5,
    reviewCountLabel: '4 reviews',
    dateLabel: '6 months ago',
    comment: 'Atendimento excelente da Dra Priscila! Fui recebida com muito carinho, acolhimento e atenção, ela ouviu tudo com cuidado e desenvolveu um plano totalmente adequado às minhas necessidades e à minha patologia, que aliás é um caso delicado. ...',
  },
  {
    id: 'nadia-gloria-de-freitas',
    name: 'Nadia Gloria de Freitas',
    avatar: '/reviews/avatars/nadia-gloria-de-freitas.png',
    rating: 5,
    reviewCountLabel: '9 reviews',
    dateLabel: 'a year ago',
    comment: 'Minha experiência com a Dra. Pri nutricionista tem sido excelente. Ela é empática e adapta as orientações ao meu estilo de vida, promovendo acolhimento.\nSuas explicações claras melhoraram minha compreensão sobre nutrição e resultaram em benefícios para minha saúde. Recomendo fortemente! Bjoo Pri, obrigada por tanto cuidado. 🖋😍🙏',
  },
  {
    id: 'sueli-gouveia',
    name: 'Sueli Gouveia',
    avatar: '/reviews/avatars/sueli-gouveia.png',
    rating: 5,
    reviewCountLabel: '5 reviews',
    dateLabel: 'a year ago',
    comment: 'Uma excelente profissional! Superou minhas expectativas! Muito atenciosa e dedicada no seu trabalho. Uma das melhores nutricionistas que já encontrei. Realmente com resultados excelentes e surpreendentes! Super indico os serviços da Dra Priscila Scariot! Sensacional! 😍🙏🫶',
  },
  {
    id: 'anne-flores',
    name: 'Anne Flôres',
    avatar: '/reviews/avatars/anne-flores.png',
    rating: 5,
    reviewCountLabel: '9 reviews · 2 photos',
    dateLabel: 'a year ago',
    comment: 'Sou muito grata pelas consultas com a nutricionista Priscila Scariot. Ela oferece uma abordagem personalizada e atenciosa, ajudando-me a entender melhor minhas necessidades alimentares. Recomendo seus serviços a quem busca orientação nutricional de qualidade!',
  },
  {
    id: 'everson-sabino-cardoso',
    name: 'Everson sabino Cardoso',
    avatar: '/reviews/avatars/everson-sabino-cardoso.png',
    rating: 5,
    reviewCountLabel: '3 reviews · 1 photo',
    dateLabel: 'a year ago',
    comment: 'Já havia ido em outras profissionais, mas a Dra Priscila realmente me surpreendeu. Pela primeira vez tive um plano alimentar realmente personalizado, sem frescuras. Foi muito atenciosa e percebe-se que vc realmente tem experiência pra lidar ...',
  },
  {
    id: 'marcos-brollo',
    name: 'Marcos Brollo',
    avatar: '/reviews/avatars/marcos-brollo.png',
    rating: 5,
    reviewCountLabel: '6 reviews',
    dateLabel: 'a year ago',
    comment: 'Obrigado Dra pelo tratamento !\nFoi a melhor escolha que fiz.\nMe sinto melhor, menos inchado e comendo mais saudável. ...',
  },
  {
    id: 'marcelo-aparecido-de-oliveira',
    name: 'MARCELO APARECIDO DE OLIVEIRA',
    avatar: '/reviews/avatars/marcelo-aparecido-de-oliveira.png',
    rating: 5,
    reviewCountLabel: '2 reviews',
    dateLabel: 'a year ago',
    comment: 'Profissional de excelência, trouxe resultados muito bons, oferecendo sempre apoio e cuidado com sua pós consulta, mostrando algo diferenciado e positivo',
  },
  {
    id: 'rodolpho-leite',
    name: 'Rodolpho Leite',
    avatar: '/reviews/avatars/rodolpho-leite.png',
    rating: 5,
    reviewCountLabel: '8 reviews',
    dateLabel: 'a year ago',
    comment: 'Drª Priscila é uma profissional admirável, caiu como uma luva ter chego em Maringá, atendimento foi objetivo, excelente para o que eu precisava, me ajudou e continua ajudando muito. Depois atendeu minha filha de 8 anos e ambos já estamos ...',
  },
  {
    id: 'willianbass',
    name: 'WillianBASS',
    avatar: '/reviews/avatars/willianbass.png',
    rating: 5,
    reviewCountLabel: '3 reviews',
    dateLabel: 'a year ago',
    comment: 'Excelente profissional! Muito atenciosa, dedicada e com orientações que realmente funcionam. Recomendo demais!',
  },
  {
    id: 'reni-rodrigues-de-oliveira',
    name: 'Reni Rodrigues de oliveira',
    avatar: '/reviews/avatars/reni-rodrigues-de-oliveira.png',
    rating: 5,
    dateLabel: '3 months ago',
    comment: null, // TODO: Publish only when the original review text is legible.
  },
  {
    id: 'geovana-goedel',
    name: 'Geovana Goedel',
    avatar: '/reviews/avatars/geovana-goedel.png',
    rating: 5,
    reviewCountLabel: '1 review',
    dateLabel: '5 months ago',
    comment: 'Quero deixar aqui meu feedback sobre a querida Nutricionista Priscila Scariot que ganhou meu coração já na primeira consulta, percebi que ela era diferente de todas as outras que já fui, foi uma consulta muito esclarecedora e de muitas ...',
  },
  {
    id: 'cesar-galvani-marques',
    name: 'César Galvani Marques',
    avatar: '/reviews/avatars/cesar-galvani-marques.png',
    rating: 5,
    reviewCountLabel: '1 review',
    dateLabel: '5 months ago',
    comment: 'Excelente nutricionista super indico',
  },
];

const publishedReviews = googleReviews.filter(
  (review): review is GoogleReview & { comment: string } => review.comment !== null,
);

const localizedDates: Record<string, string> = {
  '2 months ago': 'há 2 meses',
  '3 months ago': 'há 3 meses',
  '5 months ago': 'há 5 meses',
  '6 months ago': 'há 6 meses',
  'a year ago': 'há 1 ano',
};

function localizeReviewCount(label: string) {
  return label
    .replace(/(\d+) reviews?/, (_, count: string) => `${count} ${count === '1' ? 'avaliação' : 'avaliações'}`)
    .replace(/(\d+) photos?/, (_, count: string) => `${count} ${count === '1' ? 'foto' : 'fotos'}`);
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={14} strokeWidth={1.4} fill={index < rating ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview & { comment: string } }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        {review.avatar && (
          <Image
            className={styles.avatar}
            src={review.avatar}
            alt={`Avatar de ${review.name}`}
            width={46}
            height={46}
          />
        )}
        <div className={styles.author}>
          <h3>{review.name}</h3>
          {review.reviewCountLabel && <p>{localizeReviewCount(review.reviewCountLabel)}</p>}
        </div>
      </div>
      <div className={styles.cardRating}>
        <span className={styles.ratingNumber}>{review.rating.toFixed(1)}</span>
        <RatingStars rating={review.rating} />
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles.cardFooter}>
        <span className={styles.googleMark} aria-label="Avaliação do Google">Google</span>
        {review.dateLabel && <span className={styles.date}>{localizedDates[review.dateLabel] ?? review.dateLabel}</span>}
      </div>
    </article>
  );
}

export function GoogleReviewsSection() {
  return (
    <section className={styles.section} aria-labelledby="google-reviews-title">
      <div className={styles.shell}>
        <div className={styles.panel}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Avaliações no Google</p>
            <h2 id="google-reviews-title">O que dizem sobre <em>o acompanhamento.</em></h2>
            <p className={styles.subtitle}>Relatos reais de pacientes que confiaram no acompanhamento nutricional da Dra. Priscila Scariot.</p>
            <div className={styles.overallRating}>
              <strong>5.0</strong>
              <div>
                <RatingStars rating={5} />
                <p>17 avaliações no Google</p>
              </div>
            </div>
          </header>
          <div className={styles.grid}>
            {publishedReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
