import React from 'react';

/**
 * @param {{ brand: { name: string, tagline: string, logoUrl: string, instagram: { handle: string, url: string }, whatsapp: { displayNumber: string, link: string }, copyrightYear: number, serviceArea: string } }} props
 */
export default function Footer({ brand }) {
  return (
    <footer>
      <img src={brand.logoUrl} alt={brand.name} className="footer-logo-img" />
      <div className="links">
        <a href="#produk">Produk &amp; Harga</a>
        <br />
        <a href="#club">Happy Hydration Club</a>
        <br />
        <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
          @{brand.instagram.handle}
        </a>
        <br />
        <a href={brand.whatsapp.link} target="_blank" rel="noopener noreferrer">
          WhatsApp {brand.whatsapp.displayNumber}
        </a>
      </div>
      <p className="tiny">
        © {brand.copyrightYear} {brand.name} · {brand.tagline} · Melayani {brand.serviceArea}
      </p>
    </footer>
  );
}
