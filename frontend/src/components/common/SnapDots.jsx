import React from 'react';

const DOTS = [
  { id: 'hot', label: '01 · Panas 34°C' },
  { id: 'dry', label: '02 · Dahaga' },
  { id: 'turn', label: '03 · Transisi' },
  { id: 'relief', label: '04 · Step Into Wonder' },
];

/**
 * @param {{ activeSection: string, visible: boolean }} props
 */
export default function SnapDots({ activeSection, visible }) {
  return (
    <div id="snap-dots" style={{ opacity: visible ? 1 : 0 }}>
      {DOTS.map((dot) => (
        <a
          key={dot.id}
          href={`#${dot.id}`}
          className={`snap-dot${activeSection === dot.id ? ' active' : ''}`}
          data-label={dot.label}
          aria-label={`Menuju bagian ${dot.label}`}
        />
      ))}
    </div>
  );
}
