const START_RGB: [number, number, number] = [120, 200, 232];
const ORD = {
  silver: [150, 160, 172] as [number, number, number],
  pink: [255, 20, 147] as [number, number, number],
  cyan: [53, 196, 232] as [number, number, number],
};

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const easeK = (t: number) => t * t * (3 - 2 * t);
const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

interface Node {
  tx: number | null;
  ty: number | null;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  dx: number;
  dy: number;
  ph: number;
  amp: number;
  oc: [number, number, number];
  big: boolean;
  rx: number;
  ry: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  a: number;
}

/**
 * Draws the ambient droplet field on the given canvas. As the `#relief`
 * section (Step into Wonder) approaches viewport centre, the droplets
 * snap into an OXYRA hexagonal snowflake lattice, breathing gently, then
 * disperse again once the user scrolls away. Clicking the flake image
 * scatters nearby particles with a ripple.
 *
 * Plain TypeScript class (not an Angular service) — instantiated once per
 * ReliefComponent instance and torn down via `destroy()` in ngOnDestroy.
 */
export class DropfieldAnimation {
  private ctx: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private DPR = 1;
  private nodes: Node[] = [];
  private links: Array<[number, number]> = [];
  private M = 0;
  private ripples: Ripple[] = [];
  private rafId: number | null = null;
  private running = true;
  private kSmooth = 0;
  private reduced: boolean;

  private resizeHandler = () => this.resize();
  private visibilityHandler = () => this.handleVisibilityChange();
  private flakeClickHandler = () => this.handleFlakeClick();

  constructor(
    private canvas: HTMLCanvasElement,
    private reliefSection: HTMLElement,
    private flakeImage: HTMLImageElement | null
  ) {
    this.ctx = canvas.getContext('2d')!;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  start(): void {
    this.resize();
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    document.addEventListener('visibilitychange', this.visibilityHandler);
    this.flakeImage?.addEventListener('click', this.flakeClickHandler);

    if (this.reduced) {
      window.addEventListener('scroll', () => requestAnimationFrame(() => this.frame()), { passive: true });
      this.frame();
    } else {
      this.rafId = requestAnimationFrame(() => this.frame());
    }
  }

  destroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    this.flakeImage?.removeEventListener('click', this.flakeClickHandler);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.running = false;
  }

  private buildTargets(): Array<{ x: number; y: number }> {
    const cx = this.W / 2;
    const cy = this.H * 0.42;
    const R = Math.min(this.W, this.H) * 0.4;
    const t: Array<{ x: number; y: number }> = [{ x: cx, y: cy }];
    this.links = [];
    const arms = 6;
    const steps = 7;

    for (let a = 0; a < arms; a += 1) {
      const ang = (a * Math.PI) / 3 - Math.PI / 2;
      let prev = 0;
      for (let s = 1; s <= steps; s += 1) {
        const r = (R * s) / steps;
        const idx = t.length;
        t.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        this.links.push([prev, idx]);
        prev = idx;

        if (s === 3 || s === 5) {
          const bl = R * 0.13;
          for (let d = -1; d <= 1; d += 2) {
            const bang = ang + (d * Math.PI) / 3;
            const bi = t.length;
            t.push({ x: t[idx].x + Math.cos(bang) * bl, y: t[idx].y + Math.sin(bang) * bl });
            this.links.push([idx, bi]);
          }
        }
      }
    }

    const hs = t.length;
    for (let a = 0; a < 6; a += 1) {
      const an = (a * Math.PI) / 3 - Math.PI / 2 + Math.PI / 6;
      const rr = R * 0.3;
      t.push({ x: cx + Math.cos(an) * rr, y: cy + Math.sin(an) * rr });
    }
    for (let a = 0; a < 6; a += 1) this.links.push([hs + a, hs + ((a + 1) % 6)]);

    return t;
  }

  private ambientCount(): number {
    return Math.min(80, Math.round((this.W * this.H) / 14000));
  }

  private build(): void {
    const t = this.buildTargets();
    this.M = t.length;
    const need = this.M + this.ambientCount();

    if (this.nodes.length !== need) {
      this.nodes = [];
      for (let i = 0; i < this.M; i += 1) {
        const type = i % 7 === 0 ? 'pink' : i % 5 === 0 ? 'cyan' : 'silver';
        this.nodes.push({
          tx: t[i].x,
          ty: t[i].y,
          cx: Math.random() * this.W,
          cy: Math.random() * this.H,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          dx: 0,
          dy: 0,
          ph: Math.random() * 6.28,
          amp: 2 + Math.random() * 3,
          oc: ORD[type],
          big: type !== 'silver',
          rx: 0,
          ry: 0,
        });
      }
      const A = this.ambientCount();
      for (let j = 0; j < A; j += 1) {
        this.nodes.push({
          tx: null,
          ty: null,
          cx: Math.random() * this.W,
          cy: Math.random() * this.H,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          dx: 0,
          dy: 0,
          ph: 0,
          amp: 0,
          oc: ORD.silver,
          big: false,
          rx: 0,
          ry: 0,
        });
      }
    } else {
      for (let m = 0; m < this.M; m += 1) {
        this.nodes[m].tx = t[m].x;
        this.nodes[m].ty = t[m].y;
      }
    }
  }

  private resize(): void {
    this.DPR = Math.min(window.devicePixelRatio || 1, 2);
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.canvas.width = this.W * this.DPR;
    this.canvas.height = this.H * this.DPR;
    this.canvas.style.width = `${this.W}px`;
    this.canvas.style.height = `${this.H}px`;
    this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    this.build();
  }

  private handleFlakeClick(): void {
    if (!this.flakeImage) return;
    const fr = this.flakeImage.getBoundingClientRect();
    const px = fr.left + fr.width / 2;
    const py = fr.top + fr.height / 2;

    this.nodes.forEach((n) => {
      const nx = n.rx;
      const ny = n.ry;
      const ddx = nx - px;
      const ddy = ny - py;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < 22000) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d2 / 22000) * 34;
        n.dx += (ddx / d) * f;
        n.dy += (ddy / d) * f;
      }
    });
    this.ripples.push({ x: px, y: py, r: 6, a: 0.6 });
  }

  private frame(): void {
    const time = performance.now() / 1000;
    const vh = window.innerHeight;
    const rt = this.reliefSection.getBoundingClientRect().top;
    const kT = this.reduced ? 1 : clamp((vh * 0.85 - rt) / (vh * 0.7), 0, 1);
    this.kSmooth = this.reduced ? kT : this.kSmooth + (kT - this.kSmooth) * 0.1;
    const ke = easeK(this.kSmooth);

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    for (let i = this.ripples.length - 1; i >= 0; i -= 1) {
      const rp = this.ripples[i];
      rp.r += 2.6;
      rp.a *= 0.93;
      ctx.globalAlpha = Math.max(0, rp.a);
      ctx.strokeStyle = '#35c4e8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, 6.2832);
      ctx.stroke();
      if (rp.a < 0.05 || rp.r > 120) this.ripples.splice(i, 1);
    }
    ctx.globalAlpha = 1;

    this.nodes.forEach((n) => {
      if (!this.reduced) {
        n.cx += n.vx;
        if (n.cx < 0) n.cx += this.W;
        else if (n.cx > this.W) n.cx -= this.W;
        n.cy += n.vy;
        if (n.cy < 0) n.cy += this.H;
        else if (n.cy > this.H) n.cy -= this.H;
      }
      n.dx *= 0.9;
      n.dy *= 0.9;

      if (n.tx != null && n.ty != null) {
        const wob = this.reduced ? 0 : Math.sin(time * 1.3 + n.ph) * n.amp * ke;
        const wob2 = this.reduced ? 0 : Math.cos(time * 1.1 + n.ph) * n.amp * ke;
        n.rx = n.cx + (n.tx + wob - n.cx) * ke + n.dx;
        n.ry = n.cy + (n.ty + wob2 - n.cy) * ke + n.dy;
      } else {
        n.rx = n.cx + n.dx;
        n.ry = n.cy + n.dy;
      }
    });

    if (ke > 0.4) {
      const la = ((ke - 0.4) / 0.6) * 0.38;
      ctx.strokeStyle = `rgba(150,160,172,${la})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      this.links.forEach((e) => {
        ctx.moveTo(this.nodes[e[0]].rx, this.nodes[e[0]].ry);
        ctx.lineTo(this.nodes[e[1]].rx, this.nodes[e[1]].ry);
      });
      ctx.stroke();
    }

    this.nodes.forEach((n) => {
      const c = mix(START_RGB, n.oc, ke);
      const al = n.tx != null ? 0.4 + 0.5 * ke : 0.22;
      ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${al})`;
      ctx.beginPath();
      ctx.arc(n.rx, n.ry, n.tx != null ? (n.big ? 3.4 : 2.4) : 1.8, 0, 6.2832);
      ctx.fill();
    });

    if (!this.reduced && this.running) {
      this.rafId = requestAnimationFrame(() => this.frame());
    }
  }

  private handleVisibilityChange(): void {
    this.running = !document.hidden;
    if (this.running && !this.reduced) {
      this.rafId = requestAnimationFrame(() => this.frame());
    }
  }
}
