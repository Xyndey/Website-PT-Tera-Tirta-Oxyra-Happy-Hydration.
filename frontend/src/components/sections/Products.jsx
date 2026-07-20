import React, { useEffect, useState } from 'react';
import api from '../../api/client.js';
import useReveal from '../../hooks/useReveal.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([productData, categoryData]) => {
        if (!active) return;
        setProducts(productData);
        setCategories(categoryData);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useReveal([products, activeTab]);

  const visibleProducts =
    activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  return (
    <section id="produk" className="sec">
      <div className="hex-bg" />
      <div
        className="subtle-splash-bg"
        style={{ right: '-4%', top: '25%', width: 340, transform: 'scaleX(-1)' }}
      >
        <img src="https://i.imgur.com/SKOAvML.png" alt="" />
      </div>
      <div className="floating-droplet" style={{ left: '10%', top: '12%', animationDelay: '0.8s' }} />
      <div
        className="floating-droplet"
        style={{ right: '14%', bottom: '20%', animationDelay: '2.9s' }}
      />

      <div className="inner">
        <div className="rv">
          <span className="sec-chip">03</span>
          <span className="sec-kicker">Daftar Produk</span>
          <h2 className="sec-title">
            Produk &amp; <em>Harga Resmi</em>
          </h2>
          <div className="sec-bar" />
        </div>

        {status === 'loading' && <p className="section-loading">Memuat katalog produk…</p>}
        {status === 'error' && (
          <p className="section-error">Gagal memuat katalog. Silakan segarkan halaman.</p>
        )}

        {status === 'ready' && (
          <>
            <div className="product-tabs rv">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`tab-btn${activeTab === cat.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {visibleProducts.map((product) => (
                <div className="product-card rv" data-cat={product.category} key={product.id}>
                  <div>
                    <span className={`p-badge${product.badgeVariant !== 'default' ? ` ${product.badgeVariant}` : ''}`}>
                      {product.badge}
                    </span>
                    <h3>{product.name}</h3>
                    <p className="p-vol">{product.volumeLabel}</p>
                    <div className="p-price">
                      {product.priceLabel} <span className="p-unit">{product.unit}</span>
                    </div>
                    <p className="p-desc">{product.description}</p>
                  </div>
                  <a href={product.orderLink} className="card-wa-btn" target="_blank" rel="noopener noreferrer">
                    Pesan Sekarang →
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
