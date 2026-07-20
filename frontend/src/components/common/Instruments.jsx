import React from 'react';

/**
 * @param {{ temperature: string, gaugePercent: number }} props
 */
export default function Instruments({ temperature, gaugePercent }) {
  return (
    <>
      <div id="temp-pill">{temperature}</div>
      <div id="gauge">
        <div id="gauge-fill" style={{ height: `${gaugePercent}%` }} />
      </div>
      <div id="mock-label">MOCK · DATA ILUSTRASI · INTERNAL</div>
    </>
  );
}
