import React from 'react';

export default function Dry() {
  return (
    <section id="dry" className="sec snap-sec">
      <div
        className="floating-droplet"
        style={{ left: '30%', top: '40%', width: 14, height: 18, animationDelay: '1.2s' }}
      />
      <div className="inner-sm">
        <p className="main-text rv">
          Sebagian besar air hanya membasahi. Tidak semua air menyelesaikan dahaga.
        </p>
      </div>
    </section>
  );
}
