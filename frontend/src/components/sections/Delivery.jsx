import React from 'react';

/**
 * @param {{ brand: { whatsapp: { link: string, partnershipLink: string } } }} props
 */
export default function Delivery({ brand }) {
  return (
    <section id="antar" className="sec">
      <div className="floating-droplet" style={{ right: '20%', top: '25%', animationDelay: '3.1s' }} />
      <div className="inner">
        <div className="rv">
          <span className="sec-chip">07</span>
          <span className="sec-kicker">Pengantaran</span>
          <h2 className="sec-title">
            Antar setiap hari, ke seluruh <em>Batam.</em>
          </h2>
          <div className="sec-bar" />
        </div>
        <p className="lead rv">Satu pesan, langsung diantar.</p>
        <p className="area rv">BATAM · SETIAP HARI</p>
        <div className="rv">
          <a href={brand.whatsapp.link} className="cta-btn" target="_blank" rel="noopener noreferrer">
            Pesan via WhatsApp
          </a>
          <a
            href={brand.whatsapp.partnershipLink}
            className="cta-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kemitraan &amp; grosir →
          </a>
        </div>
      </div>
    </section>
  );
}
