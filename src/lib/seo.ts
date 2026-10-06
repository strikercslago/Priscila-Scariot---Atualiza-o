export const siteUrl = 'https://nutripriscilascariot.com.br/';

export const homeTitle = 'Priscila Scariot | Nutricionista em Passo Fundo - RS';
export const homeDescription = 'Dra. Priscila Scariot, nutricionista em Passo Fundo - RS. Acompanhamento personalizado para emagrecimento, saúde metabólica e saúde da mulher. Consultas presenciais e online.';

// Existing photograph, also used by the hero. No additional image download on the page.
export const socialImage = {
  url: `${siteUrl}hero-original.png`,
  width: 1672,
  height: 941,
  alt: 'Dra. Priscila Scariot em seu consultório, com alimentos frescos à mesa',
};

// Keep the same source and normalization as the existing WhatsApp link.
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '555499283530').replace(/\D/g, '');

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}#priscila-scariot`,
      name: 'Priscila Scariot',
      honorificPrefix: 'Dra.',
      jobTitle: 'Nutricionista',
      url: siteUrl,
      image: socialImage.url,
      worksFor: { '@id': `${siteUrl}#consultorio` },
    },
    {
      '@type': 'MedicalBusiness',
      '@id': `${siteUrl}#consultorio`,
      name: 'Priscila Scariot Nutrição',
      url: siteUrl,
      description: homeDescription,
      logo: `${siteUrl}logo-original.png`,
      image: socialImage.url,
      ...(whatsappNumber ? { telephone: `+${whatsappNumber}` } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Clinical Center, R. Uruguai, 1969 - Sala 201, Centro',
        addressLocality: 'Passo Fundo',
        addressRegion: 'RS',
        postalCode: '99010-111',
        addressCountry: 'BR',
      },
      areaServed: {
        '@type': 'City',
        name: 'Passo Fundo',
        containedInPlace: { '@type': 'State', name: 'Rio Grande do Sul' },
      },
    },
  ],
};
