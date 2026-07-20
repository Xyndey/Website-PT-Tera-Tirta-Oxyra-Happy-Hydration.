import React, { useEffect, useState } from 'react';
import api from '../../api/client.js';
import useReveal from '../../hooks/useReveal.js';

export default function Club() {
  const [club, setClub] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    api
      .getClub()
      .then((data) => {
        if (!active) return;
        setClub(data);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useReveal([club]);

  return (
    <section id="club" className="sec">
      <div className="speed-lines" aria-hidden="true" />
      <div className="floating-droplet" style={{ left: '15%', top: '25%', animationDelay: '1.5s' }} />
      <div
        className="floating-droplet"
        style={{ right: '18%', bottom: '10%', width: 18, height: 22, animationDelay: '3.8s' }}
      />

      <div className="inner">
        <div className="rv">
          <span className="sec-chip">04</span>
          <span className="sec-kicker">Happy Hydration Club</span>
          <h2 className="sec-title">
            Every Drop. <em>Every Move.</em>
          </h2>
          <div className="sec-bar" />
        </div>

        {status === 'loading' && <p className="section-loading">Memuat komunitas…</p>}
        {status === 'error' && (
          <p className="section-error">Gagal memuat konten. Silakan segarkan halaman.</p>
        )}

        {status === 'ready' && club && (
          <>
            <div className="club-hero rv">
              <img src={club.heroImage} alt="OXYRA Happy Hydration Club Lifestyle" />
              <div className="club-hero-badge">{club.heroBadge}</div>
            </div>

            <p className="club-intro rv">{club.intro}</p>

            <div className="activity-grid">
              {club.activities.map((activity) => (
                <div className="act-card rv" key={activity.id}>
                  <span className="act-emoji">{activity.emoji}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              ))}
            </div>

            <div className="benefits-strip rv">
              {club.benefits.map((benefit) => (
                <div className="ben-pill" key={benefit.id}>
                  <b>{benefit.title}</b>
                  <span>{benefit.description}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
