import React, { useEffect, useState } from 'react';
import api from '../../api/client.js';
import Icon from '../common/Icon.jsx';
import useReveal from '../../hooks/useReveal.js';

export default function WhyOxyra() {
  const [reasons, setReasons] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    api
      .getWhyOxyra()
      .then((data) => {
        if (!active) return;
        setReasons(data);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useReveal([reasons]);

  return (
    <section id="kenapa" className="sec">
      <div className="hex-bg" />
      <div className="subtle-splash-bg" style={{ left: '-6%', top: '18%', width: 320 }}>
        <img src="https://i.imgur.com/SKOAvML.png" alt="" />
      </div>
      <div className="floating-droplet" style={{ right: '15%', top: '20%', animationDelay: '1.8s' }} />
      <div
        className="floating-droplet"
        style={{ left: '20%', bottom: '15%', width: 16, height: 20, animationDelay: '4.2s' }}
      />

      <div className="inner">
        <div className="rv">
          <span className="sec-chip">02</span>
          <span className="sec-kicker">Kenapa Oxyra</span>
          <h2 className="sec-title">
            Dibuat untuk <em>hidup yang bergerak.</em>
          </h2>
          <div className="sec-bar" />
        </div>

        {status === 'loading' && <p className="section-loading">Memuat alasan memilih OXYRA…</p>}
        {status === 'error' && (
          <p className="section-error">Gagal memuat konten. Silakan segarkan halaman.</p>
        )}

        {status === 'ready' && (
          <div className="why-grid">
            {reasons.map((reason) => (
              <div className="why-card rv" key={reason.id}>
                <Icon name={reason.icon} />
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
