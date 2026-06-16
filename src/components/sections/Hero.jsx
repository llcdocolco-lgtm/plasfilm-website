import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MolecularBackground from '../ui/MolecularBackground';
import useDollarRate from '../../hooks/useDollarRate';

function StatWrapper({ children, separator = false }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      animate={{ y: hov ? -5 : 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      style={{
        position: 'relative', paddingBottom: '.5rem', cursor: 'default',
        borderLeft: separator ? '2px solid rgba(255,255,255,0.2)' : 'none',
        paddingLeft: separator ? '2.5rem' : 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: .22 }}
        style={{
          position: 'absolute', bottom: 0, left: separator ? '2.5rem' : 0, right: 0,
          height: 2,
          background: 'white',
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
      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '2.4rem', lineHeight: 1, color: 'white' }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.3rem' }}
        dangerouslySetInnerHTML={{ __html: label.replace('\n', '<br/>') }}
      />
    </div>
  );
}

const heroLines = ['INSUMOS', 'PARA LA', 'INDUSTRIA', 'PLÁSTICA'];

export default function Hero() {
  const dollarRate = useDollarRate();
  return (
    <section id="inicio" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-primary)', color: 'var(--color-white)', position: 'relative', overflow: 'hidden',
    }}>
      <MolecularBackground count={70} linkDist={120} opacity={0.3} />

      {/* Estado del sistema */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <span style={{ width: 8, height: 8, background: 'white', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '.75rem', color: 'rgba(255,255,255,0.6)' }}>Disponible ahora</span>
      </div>

      <div className="hero-left" style={{ maxWidth: 760, padding: '5rem 2rem', textAlign: 'center', position: 'relative' }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1, duration: .6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px', fontWeight: 500, letterSpacing: '.06em',
            padding: '.3rem .8rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ width: 8, height: 8, background: 'white', borderRadius: '50%', animation: 'pulse 1.5s infinite', flexShrink: 0 }} />
          Bogotá, Colombia · Desde 2010
        </motion.span>

        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.1, color: 'white', marginBottom: '1.5rem' }}>
          {heroLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 + i * .12, duration: .6, ease: 'easeOut' }}
              style={{ display: 'block' }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .75, duration: .6 }}
          style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2.5rem' }}
        >
          Insumos químicos especializados para la industria plástica en Colombia. Asesoría técnica personalizada en cada solución.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .9, duration: .5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="#portafolio" style={{
            background: 'white', color: 'var(--color-primary)', border: 'none',
            padding: '.9rem 2rem', fontFamily: 'Inter, sans-serif',
            fontSize: '.95rem', fontWeight: 700, letterSpacing: '.02em',
            textDecoration: 'none', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; }}
          >Ver portafolio</a>
          <a href="#contacto" style={{
            border: '2px solid rgba(255,255,255,0.5)', color: 'white',
            padding: '.9rem 2rem', fontFamily: 'Inter, sans-serif',
            fontSize: '.95rem', fontWeight: 500, background: 'transparent',
            textDecoration: 'none', transition: 'border-color .2s, background .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >Contáctanos</a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: .6 }}
          style={{ display: 'flex', gap: '0', marginTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', justifyContent: 'center' }}
        >
          <StatWrapper><StatCounter value="+15" label={"Años\nde experiencia"} /></StatWrapper>
          <StatWrapper separator><StatCounter value="+200" label={"Clientes\nactivos"} /></StatWrapper>
          <StatWrapper separator>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '2.4rem', lineHeight: 1, color: 'white' }}>
                {dollarRate ? `$${dollarRate.toLocaleString('es-CO')}` : '···'}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.3rem' }}>
                USD · COP<br/>Tiempo real
              </div>
            </div>
          </StatWrapper>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hero-stats { flex-direction: column; gap: 1.5rem !important; }
          .hero-stats > div {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
