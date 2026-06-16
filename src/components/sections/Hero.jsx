import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MolecularBackground from '../ui/MolecularBackground';
import PolymerScene from '../three/PolymerScene';
import useDollarRate from '../../hooks/useDollarRate';

function StatWrapper({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      animate={{ y: hov ? -5 : 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      style={{ position: 'relative', paddingBottom: '.5rem', cursor: 'default' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: .22 }}
        style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 2, width: '100%',
          background: 'var(--orange)',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
}

function StatCounter({ value, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const inView = useInView(ref, { once: true });
  const target = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : '';

  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.8rem', lineHeight: 1, color: 'var(--orange)' }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.2rem' }}
        dangerouslySetInnerHTML={{ __html: label.replace('\n', '<br/>') }}
      />
    </div>
  );
}

const heroLines = ['INSUMOS', 'PARA LA', 'INDUSTRIA', 'PLÁSTICA'];

export default function Hero() {
  const dollarRate = useDollarRate();
  return (
    <section id="inicio" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: 64 }}>
      {/* LEFT */}
      <div style={{
        background: 'var(--dark)', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '5rem 3.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <MolecularBackground count={65} linkDist={125} opacity={0.55} />
        {/* Blue diagonal gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,47,168,.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        {/* Watermark inferior — PLASFILM */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            position: 'absolute', bottom: '-2rem', left: '-1rem',
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '11rem',
            color: 'rgba(255,255,255,.04)', letterSpacing: '.05em',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          }}
        >PLASFILM</motion.div>


        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1, duration: .6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'var(--orange)', color: 'white',
            fontSize: '.75rem', fontWeight: 700, letterSpacing: '.12em',
            textTransform: 'uppercase', padding: '.3rem .8rem',
            marginBottom: '1.5rem', width: 'fit-content',
          }}
        >
          <span style={{ width: 8, height: 8, background: 'rgba(255,255,255,.7)', borderRadius: '50%', animation: 'pulse 1.5s infinite', flexShrink: 0 }} />
          Bogotá, Colombia · Desde 2010
        </motion.span>

        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: .95, color: 'white', letterSpacing: '.02em', marginBottom: '1.5rem' }}>
          {heroLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 + i * .12, duration: .6, ease: 'easeOut' }}
              style={{ display: 'block', color: line === 'PLÁSTICA' ? 'var(--orange)' : 'white' }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .75, duration: .6 }}
          style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 420, marginBottom: '2.5rem' }}
        >
          Insumos químicos especializados para la industria plástica en Colombia. Asesoría técnica personalizada en cada solución.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .9, duration: .5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a href="#portafolio" style={{
            background: 'var(--orange)', color: 'white', border: 'none',
            padding: '.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
            fontSize: '.95rem', fontWeight: 700, letterSpacing: '.04em',
            textDecoration: 'none', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.transform = 'none'; }}
          >Ver portafolio</a>
          <a href="#contacto" style={{
            border: '1.5px solid rgba(255,255,255,.35)', color: 'white',
            padding: '.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
            fontSize: '.95rem', fontWeight: 500, background: 'transparent',
            textDecoration: 'none', transition: 'border-color .2s, background .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; e.currentTarget.style.background = 'transparent'; }}
          >Contáctanos</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: .6 }}
          style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '2rem' }}
        >
          <StatWrapper><StatCounter value="+15" label={"Años\nde experiencia"} /></StatWrapper>
          <StatWrapper><StatCounter value="+200" label={"Clientes\nactivos"} /></StatWrapper>
          <StatWrapper>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.8rem', lineHeight: 1, color: 'var(--orange)' }}>
                {dollarRate ? `$${dollarRate.toLocaleString('es-CO')}` : '···'}
              </div>
              <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.2rem' }}>
                USD · COP<br/>Tiempo real
              </div>
            </div>
          </StatWrapper>
        </motion.div>
      </div>

      {/* RIGHT — 3D */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--dark)' }}>
        <MolecularBackground count={45} linkDist={110} opacity={0.45} />
        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <PolymerScene />
        </motion.div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(14,14,20,.55) 0%, transparent 60%)',
          padding: '2rem 2rem 1.5rem',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)' }}>Disponible ahora</span>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            #inicio { grid-template-columns: 1fr !important; min-height: auto !important; }
            #inicio > div:last-child { height: 55vw; }
          }
        `}</style>
      </div>
    </section>
  );
}
