import React, { useEffect, useState } from 'react';
import api from '../../api/client.js';
import useReveal from '../../hooks/useReveal.js';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    api
      .getTestimonials()
      .then((data) => {
        if (!active) return;
        setTestimonials(data);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useReveal([testimonials]);

  return (
    <section id="testimoni" className="sec">
      <div className="subtle-splash-bg" style={{ left: '-5%', bottom: '15%', width: 300 }}>
        <img src="https://i.imgur.com/SKOAvML.png" alt="" />
      </div>
      <div className="floating-droplet" style={{ right: '25%', top: '15%', animationDelay: '2.3s' }} />

      <div className="inner">
        <div className="rv">
          <span className="sec-chip">05</span>
          <span className="sec-kicker">Testimoni</span>
          <h2 className="sec-title">
            Kata <em>Mereka</em>
          </h2>
          <div className="sec-bar" />
        </div>

        {status === 'loading' && <p className="section-loading">Memuat testimoni…</p>}
        {status === 'error' && (
          <p className="section-error">Gagal memuat testimoni. Silakan segarkan halaman.</p>
        )}

        {status === 'ready' && (
          <div className="testi-grid">
            {testimonials.map((testimonial) => (
              <div className="testi-card rv" key={testimonial.id}>
                <div className="stars">{'⭐'.repeat(testimonial.rating)}</div>
                <p className="testi-quote">“{testimonial.quote}”</p>
                <div className="testi-author">{testimonial.author}</div>
                <div className="testi-loc">{testimonial.location}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
