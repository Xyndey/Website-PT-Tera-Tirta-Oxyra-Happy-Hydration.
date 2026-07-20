import { useEffect, useRef } from 'react';

const START_RGB = [120, 200, 232];
const ORD = {
  silver: [150, 160, 172],
  pink: [255, 20, 147],
  cyan: [53, 196, 232],
};

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const easeK = (t) => t * t * (3 - 2 * t);
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/**
 * Draws the ambient droplet field on the given canvas ref. As the
 * `#relief` section (Step into Wonder) approaches viewport centre, the
 * droplets snap into an OXYRA hexagonal snowflake lattice, breathing
 * gently, then disperse again once the user scrolls away.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {React.RefObject<HTMLElement>} reliefSectionRef
 * @param {React.RefObject<HTMLImageElement>} flakeImageRef Optional — clicking it scatters nearby particles.
 */
export function useDropfieldCanvas(canvasRef, reliefSectionRef, flakeImageRef) {
  const stateRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const reliefSec = reliefSectionRef.current;
    if (!canvas || !reliefSec) return undefined;

    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let nodes = [];
    let links = [];
    let M = 0;
    let ripples = [];
    let rafId = null;
    let running = true;
    let kSmooth = 0;

    function buildTargets() {
      const cx = W / 2;
      const cy = H * 0.42;
      const R = Math.min(W, H) * 0.4;
      const t = [{ x: cx, y: cy }];
      links = [];
      const arms = 6;
      const steps = 7;

      for (let a = 0; a < arms; a += 1) {
        const ang = (a * Math.PI) / 3 - Math.PI / 2;
        let prev = 0;
        for (let s = 1; s <= steps; s += 1) {
          const r = (R * s) / steps;
          const idx = t.length;
          t.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
          links.push([prev, idx]);
          prev = idx;

          if (s === 3 || s === 5) {
            const bl = R * 0.13;
            for (let d = -1; d <= 1; d += 2) {
              const bang = ang + (d * Math.PI) / 3;
              const bi = t.length;
              t.push({ x: t[idx].x + Math.cos(bang) * bl, y: t[idx].y + Math.sin(bang) * bl });
              links.push([idx, bi]);
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
      for (let a = 0; a < 6; a += 1) links.push([hs + a, hs + ((a + 1) % 6)]);

      return t;
    }

    const ambientCount = () => Math.min(80, Math.round((W * H) / 14000));

    function build() {
      const t = buildTargets();
      M = t.length;
      const need = M + ambientCount();

      if (nodes.length !== need) {
        nodes = [];
        for (let i = 0; i < M; i += 1) {
          const type = i % 7 === 0 ? 'pink' : i % 5 === 0 ? 'cyan' : 'silver';
          nodes.push({
            tx: t[i].x,
            ty: t[i].y,
            cx: Math.random() * W,
            cy: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9,
            dx: 0,
            dy: 0,
            ph: Math.random() * 6.28,
            amp: 2 + Math.random() * 3,
            oc: ORD[type],
            big: type !== 'silver',
            _rx: null,
            _ry: null,
          });
        }
        const A = ambientCount();
        for (let j = 0; j < A; j += 1) {
          nodes.push({
            tx: null,
            ty: null,
            cx: Math.random() * W,
            cy: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            dx: 0,
            dy: 0,
            ph: 0,
            amp: 0,
            oc: ORD.silver,
            big: false,
            _rx: null,
            _ry: null,
          });
        }
      } else {
        for (let m = 0; m < M; m += 1) {
          nodes[m].tx = t[m].x;
          nodes[m].ty = t[m].y;
        }
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }

    function handleFlakeClick() {
      const flake = flakeImageRef && flakeImageRef.current;
      if (!flake) return;
      const fr = flake.getBoundingClientRect();
      const px = fr.left + fr.width / 2;
      const py = fr.top + fr.height / 2;

      nodes.forEach((n) => {
        const nx = n._rx != null ? n._rx : n.cx;
        const ny = n._ry != null ? n._ry : n.cy;
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
      ripples.push({ x: px, y: py, r: 6, a: 0.6 });
    }

    function frame() {
      const time = performance.now() / 1000;
      const vh = window.innerHeight;
      const rt = reliefSec.getBoundingClientRect().top;
      const kT = reduced ? 1 : clamp((vh * 0.85 - rt) / (vh * 0.7), 0, 1);
      kSmooth = reduced ? kT : kSmooth + (kT - kSmooth) * 0.1;
      const ke = easeK(kSmooth);

      ctx.clearRect(0, 0, W, H);

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const rp = ripples[i];
        rp.r += 2.6;
        rp.a *= 0.93;
        ctx.globalAlpha = Math.max(0, rp.a);
        ctx.strokeStyle = '#35c4e8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, 6.2832);
        ctx.stroke();
        if (rp.a < 0.05 || rp.r > 120) ripples.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      nodes.forEach((n) => {
        if (!reduced) {
          n.cx += n.vx;
          if (n.cx < 0) n.cx += W;
          else if (n.cx > W) n.cx -= W;
          n.cy += n.vy;
          if (n.cy < 0) n.cy += H;
          else if (n.cy > H) n.cy -= H;
        }
        n.dx *= 0.9;
        n.dy *= 0.9;

        if (n.tx != null) {
          const wob = reduced ? 0 : Math.sin(time * 1.3 + n.ph) * n.amp * ke;
          const wob2 = reduced ? 0 : Math.cos(time * 1.1 + n.ph) * n.amp * ke;
          n._rx = n.cx + (n.tx + wob - n.cx) * ke + n.dx;
          n._ry = n.cy + (n.ty + wob2 - n.cy) * ke + n.dy;
        } else {
          n._rx = n.cx + n.dx;
          n._ry = n.cy + n.dy;
        }
      });

      if (ke > 0.4) {
        const la = ((ke - 0.4) / 0.6) * 0.38;
        ctx.strokeStyle = `rgba(150,160,172,${la})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        links.forEach((e) => {
          ctx.moveTo(nodes[e[0]]._rx, nodes[e[0]]._ry);
          ctx.lineTo(nodes[e[1]]._rx, nodes[e[1]]._ry);
        });
        ctx.stroke();
      }

      nodes.forEach((n) => {
        const c = mix(START_RGB, n.oc, ke);
        const al = n.tx != null ? 0.4 + 0.5 * ke : 0.22;
        ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${al})`;
        ctx.beginPath();
        ctx.arc(n._rx, n._ry, n.tx != null ? (n.big ? 3.4 : 2.4) : 1.8, 0, 6.2832);
        ctx.fill();
      });

      if (!reduced && running) rafId = requestAnimationFrame(frame);
    }

    function handleVisibilityChange() {
      running = !document.hidden;
      if (running && !reduced) rafId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const flake = flakeImageRef && flakeImageRef.current;
    if (flake) flake.addEventListener('click', handleFlakeClick);

    if (reduced) {
      const onScrollOnce = () => requestAnimationFrame(frame);
      window.addEventListener('scroll', onScrollOnce, { passive: true });
      frame();
      stateRef.current.cleanupScroll = () => window.removeEventListener('scroll', onScrollOnce);
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (flake) flake.removeEventListener('click', handleFlakeClick);
      if (stateRef.current.cleanupScroll) stateRef.current.cleanupScroll();
      if (rafId) cancelAnimationFrame(rafId);
      running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDropfieldCanvas;
