import type { Metadata } from 'next';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import './globals.css';
import './motion.css';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { MotionEffects } from '@/components/motion-effects';
import { homeDescription, homeTitle } from '@/lib/seo';

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '96x96' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}<WhatsAppFloat /><MotionEffects /></body></html>;
}
