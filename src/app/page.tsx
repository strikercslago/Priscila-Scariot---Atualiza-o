import { Header, Hero, ExpertiseBar } from '@/components/landing';
import { Identification } from '@/components/identification';
import { ClinicalMethod } from '@/components/clinical-method';
import { AreasSection } from '@/components/areas-section';
import { LifeManifesto } from '@/components/life-manifesto';
import { AboutJourneySection } from '@/components/about-journey';
import { HowItWorksSection } from '@/components/how-it-works';
import { TestimonialsClosingSection, TestimonialsSection } from '@/components/testimonials';
import { GoogleReviewsSection } from '@/components/google-reviews';
import { LocationSection } from '@/components/location-section';
import type { Metadata } from 'next';
import { homeDescription, homeStructuredData, homeTitle, siteUrl, socialImage } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Priscila Scariot Nutrição',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: [{ url: socialImage.url, alt: socialImage.alt }],
  },
};

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c') }} /><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><ExpertiseBar /><Identification /><ClinicalMethod /><AreasSection /><LifeManifesto /><AboutJourneySection /><HowItWorksSection /><TestimonialsSection /><GoogleReviewsSection /><TestimonialsClosingSection /><LocationSection /></main></>;
}
