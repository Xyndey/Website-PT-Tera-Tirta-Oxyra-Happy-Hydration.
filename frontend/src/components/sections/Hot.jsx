import React from 'react';

export default function Hot() {
  return (
    <section id="hot" className="sec snap-sec">
      <div className="floating-droplet" style={{ left: '18%', top: '35%', animationDelay: '0.5s' }} />
      <div
        className="floating-droplet"
        style={{ right: '22%', top: '25%', width: 16, height: 20, animationDelay: '2.1s' }}
      />

      <div className="inner-sm">
        <div className="time">12:47 · BATAM · 34°C</div>
        <h1>
          <span>Panas</span> tidak menunggu siapa-siapa.
        </h1>
        <p className="desc">
          Lampu merah. Helm. Shift siang. Kerongkonganmu sudah tahu apa yang kurang.
        </p>
        <div className="cue">Turun untuk lega</div>
      </div>
    </section>
  );
}
