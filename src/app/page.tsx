import { Header, Hero, ExpertiseBar } from '@/components/landing';
import { Identification } from '@/components/identification';
import { ClinicalMethod } from '@/components/clinical-method';
import { AreasSection } from '@/components/areas-section';
import { LifeManifesto } from '@/components/life-manifesto';
import { AboutJourneySection } from '@/components/about-journey';
import { HowItWorksSection } from '@/components/how-it-works';
import { TestimonialsSection } from '@/components/testimonials';

export default function Home() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><ExpertiseBar /><Identification /><ClinicalMethod /><AreasSection /><LifeManifesto /><AboutJourneySection /><HowItWorksSection /><TestimonialsSection /></main></>;
}
