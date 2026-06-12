import { useEffect, useRef } from 'react';

function rand(a, b) { return a + Math.random() * (b - a); }

const PALETTE = [
  '255,255,255',
  '255,255,255',
  '255,255,255',
  '255,255,255',
  '240,90,34',
  '120,160,255',
];

export default function MolecularBackground({ count = 70, linkDist = 120, opacity = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let pts = [];

    const setup = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;
      pts = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(1.5, 3.8),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        a: rand(0.4, 0.8),
        phase: rand(0, Math.PI * 2),
        spd: rand(0.006, 0.016),
      }));
    };

    const tick = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)); }
        if (p.y <= 0 || p.y >= H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)); }
        p.phase += p.spd;
      }

      const ld2 = linkDist * linkDist;
      for (let i = 0; i < pts.length; i++) {
        const pi = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const pj = pts[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ld2) {
            const lineA = (1 - Math.sqrt(d2) / linkDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(180,200,255,${lineA})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const pulse = 1 + Math.sin(p.phase) * 0.22;
        const r = p.r * pulse;

        if (r > 2) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.5);
          g.addColorStop(0, `rgba(${p.color},${p.a * 0.22})`);
          g.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    setup();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(setup);
    ro.observe(canvas.parentElement);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [count, linkDist]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
}
