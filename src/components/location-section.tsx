import { ArrowUpRight } from 'lucide-react';
import styles from './location-section.module.css';

const address = 'Clinical Center, R. Uruguai, 1969 - Sl 201, Centro, Passo Fundo - RS, 99010-111';
const encodedAddress = encodeURIComponent(address);
const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

export function LocationSection() {
  return (
    <section id="localizacao" className={styles.section} aria-labelledby="location-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Localização</p>
          <h2 id="location-title">Onde encontrar<br />a Dra. Priscila</h2>
          <p className={styles.intro}>Um espaço preparado para receber você com conforto e tranquilidade.</p>
          <address className={styles.address}>
            <strong>Clinical Center</strong>
            <span>R. Uruguai, 1969 - Sala 201</span>
            <span>Centro, Passo Fundo - RS</span>
            <span>CEP 99010-111</span>
          </address>
          <a className={styles.directions} href={directionsUrl} target="_blank" rel="noopener noreferrer">
            Como chegar <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.map}>
          <iframe
            src={mapUrl}
            title="Localização do consultório da Dra. Priscila Scariot no Clinical Center"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
