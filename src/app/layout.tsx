import type { Metadata } from 'next';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dra. Priscila Scariot | Nutrição para sua saúde',
  description: 'Estratégias nutricionais personalizadas para quem busca emagrecimento, mais saúde e qualidade de vida. Consultas presenciais e online com Dra. Priscila Scariot.',
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
