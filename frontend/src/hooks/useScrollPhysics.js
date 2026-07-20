import { useEffect, useRef, useState } from 'react';

const HOT_RGB = [244, 230, 205];
const COOL_RGB = [255, 255, 255];
const HOT_INK = [70, 50, 25];
const COOL_INK = [17, 24, 39];

const SNAP_SECTION_IDS = ['hot', 'dry', 'turn', 'relief'];

function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Recreates the original page's "hot -> cool" scroll physics:
 *  - Interpolates page background/ink colour as the visitor scrolls past
 *    the Relief section.
 *  - Ticks a fake temperature readout from 34.2°C down to 8.0°C.
 *  - Drives a left-edge progress gauge.
 *  - Tracks which "snap slide" (hot/dry/turn/relief) is currently active,
 *    and whether the crystallized snowflake state should be shown.
 *
 * @returns {{
 *   temperature: string,
 *   gaugePercent: number,
 *   activeSection: string,
 *   crystallized: boolean,
 *   dotsVisible: boolean,
 * }}
 */
export function useScrollPhysics() {
  const [temperature, setTemperature] = useState('34.2°C');
  const [gaugePercent, setGaugePercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hot');
  const [crystallized, setCrystallized] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    function updatePhysics() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      setGaugePercent(scrollPct * 100);

      const coolPct = Math.min(1, Math.max(0, scrollPct / 0.45));
      setTemperature(`${lerp(34.2, 8.0, coolPct).toFixed(1)}°C`);

      const r = Math.round(lerp(HOT_RGB[0], COOL_RGB[0], coolPct));
      const g = Math.round(lerp(HOT_RGB[1], COOL_RGB[1], coolPct));
      const b = Math.round(lerp(HOT_RGB[2], COOL_RGB[2], coolPct));
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      const ir = Math.round(lerp(HOT_INK[0], COOL_INK[0], coolPct));
      const ig = Math.round(lerp(HOT_INK[1], COOL_INK[1], coolPct));
      const ib = Math.round(lerp(HOT_INK[2], COOL_INK[2], coolPct));
      document.body.style.color = `rgb(${ir}, ${ig}, ${ib})`;

      const reliefEl = document.getElementById('relief');
      if (reliefEl) {
        const rect = reliefEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          setCrystallized(true);
        }
        setDotsVisible(rect.bottom >= window.innerHeight * 0.2);
      }

      let currentSec = 'hot';
      SNAP_SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          currentSec = id;
        }
      });
      setActiveSection(currentSec);

      tickingRef.current = false;
    }

    function onScroll() {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updatePhysics);
        tickingRef.current = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updatePhysics();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { temperature, gaugePercent, activeSection, crystallized, dotsVisible };
}

export default useScrollPhysics;
