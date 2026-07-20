import React, { useRef } from 'react';
import useDropfieldCanvas from '../../hooks/useDropfieldCanvas.js';
import { FLAKE_IMAGE_SRC } from '../../assets/flakeImage.js';

/**
 * @param {{ crystallized: boolean }} props
 */
export default function Relief({ crystallized }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const flakeRef = useRef(null);

  useDropfieldCanvas(canvasRef, sectionRef, flakeRef);

  return (
    <section
      id="relief"
      ref={sectionRef}
      className={`sec snap-sec${crystallized ? ' crystallized' : ''}`}
    >
      <canvas id="wonder-canvas" ref={canvasRef} />

      <div className="wonder-badge" id="wonder-badge">
        ❄️ Tetesan air menyelaraskan diri menjadi kristal OXYRA
      </div>

      <div className="floating-bubbles" id="interactive-bubbles">
        <div className="bubble" style={{ width: 32, height: 32, left: '16%', animationDelay: '0s', animationDuration: '7s' }} />
        <div className="bubble" style={{ width: 20, height: 20, left: '30%', animationDelay: '2s', animationDuration: '9s' }} />
        <div className="bubble" style={{ width: 44, height: 44, left: '68%', animationDelay: '1s', animationDuration: '8s' }} />
        <div className="bubble" style={{ width: 24, height: 24, left: '84%', animationDelay: '3s', animationDuration: '6s' }} />
      </div>

      <div className="decor splash-r" aria-hidden="true">
        <img src="https://i.imgur.com/SKOAvML.png" alt="Oxyra Vertical Water Splash" />
      </div>

      <img id="flakeimg" ref={flakeRef} src={FLAKE_IMAGE_SRC} alt="" />

      <div className="brand-name">OXYRA</div>
      <p className="era-line">Welcome to the Happy Hydration Era</p>
      <p className="sub-line">
        Tetap terhidrasi setiap hari dengan pengalaman minum yang lebih menyenangkan.
      </p>

      <div className="hydro-pool-wrap" aria-hidden="true">
        <div className="hydro-droplet" />
        <div className="pool-ripples">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}
