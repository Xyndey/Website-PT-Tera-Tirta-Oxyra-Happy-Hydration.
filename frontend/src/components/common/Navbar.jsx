import React from 'react';

/**
 * @param {{ brand: { name: string, logoUrl: string, whatsapp: { link: string } } }} props
 */
export default function Navbar({ brand }) {
  return (
    <nav className="navbar">
      <a href="#hot" className="nav-brand">
        <img src={brand.logoUrl} alt="OXYRA" className="nav-logo-img" />
        <span className="nav-brand-text">{brand.name}</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#hot">Home</a>
        </li>
        <li>
          <a href="#kenapa">Kenapa</a>
        </li>
        <li>
          <a href="#produk">Produk &amp; Harga</a>
        </li>
        <li>
          <a href="#club">Komunitas</a>
        </li>
        <li>
          <a href="#bukti">Uji Lab</a>
        </li>
        <li>
          <a href="#testimoni">Testimoni</a>
        </li>
      </ul>
      <a href={brand.whatsapp.link} className="nav-cta" target="_blank" rel="noopener noreferrer">
        Pesan WA
      </a>
    </nav>
  );
}
