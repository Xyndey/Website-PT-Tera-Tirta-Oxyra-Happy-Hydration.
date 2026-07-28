import { Injectable, NgZone, inject, signal } from '@angular/core';
import { ThemeService } from './theme.service';

interface Palette {
  hotBg: [number, number, number];
  coolBg: [number, number, number];
  hotInk: [number, number, number];
  coolInk: [number, number, number];
}

const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    hotBg: [244, 230, 205],
    coolBg: [255, 255, 255],
    hotInk: [70, 50, 25],
    coolInk: [17, 24, 39],
  },
  dark: {
    hotBg: [39, 30, 22],
    coolBg: [15, 17, 21],
    hotInk: [243, 237, 228],
    coolInk: [240, 242, 245],
  },
};

const SNAP_SECTION_IDS = ['hot', 'dry', 'turn', 'relief'];

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Recreates the original page's "hot -> cool" scroll physics:
 *  - Interpolates page background/ink colour as the visitor scrolls past
 *    the Relief section (palette adapts to the active light/dark theme).
 *  - Ticks a fake temperature readout from 34.2°C down to 8.0°C.
 *  - Drives a left-edge progress gauge.
 *  - Tracks which "snap slide" (hot/dry/turn/relief) is currently active,
 *    and whether the crystallized snowflake state should be shown.
 */
@Injectable({ providedIn: 'root' })
export class ScrollPhysicsService {
  private readonly themeService = inject(ThemeService);
  private readonly zone = inject(NgZone);

  private readonly temperatureSignal = signal('34.2°C');
  private readonly gaugePercentSignal = signal(0);
  private readonly activeSectionSignal = signal('hot');
  private readonly crystallizedSignal = signal(false);
  private readonly dotsVisibleSignal = signal(true);

  readonly temperature = this.temperatureSignal.asReadonly();
  readonly gaugePercent = this.gaugePercentSignal.asReadonly();
  readonly activeSection = this.activeSectionSignal.asReadonly();
  readonly crystallized = this.crystallizedSignal.asReadonly();
  readonly dotsVisible = this.dotsVisibleSignal.asReadonly();

  private ticking = false;
  private onScroll = () => this.requestUpdate();
  private started = false;

  start(): void {
    if (this.started) return;
    this.started = true;

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });

    this.updatePhysics();
  }

  stop(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    this.started = false;
  }

  private requestUpdate(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.updatePhysics();
      this.ticking = false;
    });
  }

  private updatePhysics(): void {
    const palette = PALETTES[this.themeService.theme()];

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    this.gaugePercentSignal.set(scrollPct * 100);

    const coolPct = Math.min(1, Math.max(0, scrollPct / 0.45));
    this.temperatureSignal.set(`${lerp(34.2, 8.0, coolPct).toFixed(1)}°C`);

    const r = Math.round(lerp(palette.hotBg[0], palette.coolBg[0], coolPct));
    const g = Math.round(lerp(palette.hotBg[1], palette.coolBg[1], coolPct));
    const b = Math.round(lerp(palette.hotBg[2], palette.coolBg[2], coolPct));
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    const ir = Math.round(lerp(palette.hotInk[0], palette.coolInk[0], coolPct));
    const ig = Math.round(lerp(palette.hotInk[1], palette.coolInk[1], coolPct));
    const ib = Math.round(lerp(palette.hotInk[2], palette.coolInk[2], coolPct));
    document.body.style.color = `rgb(${ir}, ${ig}, ${ib})`;

    const reliefEl = document.getElementById('relief');
    if (reliefEl) {
      const rect = reliefEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
        this.crystallizedSignal.set(true);
      }
      this.dotsVisibleSignal.set(rect.bottom >= window.innerHeight * 0.2);
    }

    let currentSection = 'hot';
    for (const id of SNAP_SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        currentSection = id;
      }
    }
    this.activeSectionSignal.set(currentSection);
  }
}
