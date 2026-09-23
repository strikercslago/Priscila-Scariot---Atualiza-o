'use client';

import { usePathname } from 'next/navigation';
import styles from './whatsapp-float.module.css';

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '555499283530').replace(/\D/g, '');

export function WhatsAppFloat() {
  const pathname = usePathname();
  const isProjetoVerao = pathname === '/projeto-verao' || pathname?.startsWith('/projeto-verao/');
  const message = isProjetoVerao
    ? 'Olá, Dra. Priscila! Vim pela página do Projeto Verão e gostaria de saber mais sobre como funciona o projeto.'
    : 'Olá, Dra. Priscila! Vim pelo site e gostaria de saber mais sobre o acompanhamento nutricional. Pode me explicar como funciona?';

  if (!whatsappNumber) return null;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  function handleClick() {
    const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer?.push({
      event: 'whatsapp_click',
      source: isProjetoVerao ? 'projeto_verao' : 'site_institucional',
      page_path: pathname,
    });
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={isProjetoVerao ? 'Falar sobre o Projeto Verão pelo WhatsApp' : 'Falar com a Dra. Priscila pelo WhatsApp'}
      className={`${styles.float} ${isProjetoVerao ? styles.project : ''}`}
    >
      <WhatsAppIcon />
      <span className={styles.label}>{isProjetoVerao ? 'Dúvidas sobre o projeto' : 'Fale com a Priscila'}</span>
      <span className={styles.tooltip} aria-hidden="true">
        {isProjetoVerao ? 'Quer saber mais? Fale comigo.' : 'Posso te explicar como funciona.'}
      </span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={styles.icon}>
      <path d="M19.11 17.23c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.11 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.18-.52-.32ZM16.03 4.8c-6.18 0-11.2 5.01-11.2 11.18 0 1.97.52 3.9 1.5 5.59L4.73 27.4l5.97-1.57a11.18 11.18 0 0 0 5.33 1.36h.01c6.17 0 11.19-5.02 11.19-11.19S22.2 4.8 16.03 4.8Zm0 20.49h-.01a9.26 9.26 0 0 1-4.72-1.29l-.34-.2-3.54.93.94-3.45-.22-.35a9.3 9.3 0 1 1 7.89 4.36Z" />
    </svg>
  );
}
