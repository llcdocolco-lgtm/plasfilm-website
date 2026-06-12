import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MolecularBackground from '../ui/MolecularBackground';
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

      {/* RIGHT — SVG */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--dark)' }}>
        <MolecularBackground count={45} linkDist={110} opacity={0.45} />
        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}>
            <defs>
              <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F05A22" stopOpacity=".25"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1A2FA8" stopOpacity=".3"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
            </defs>
            <ellipse cx="300" cy="300" rx="280" ry="250" fill="url(#glow2)"/>
            <ellipse cx="420" cy="180" rx="180" ry="150" fill="url(#glow1)"/>
            <g opacity=".9">
              <ellipse cx="180" cy="340" rx="12" ry="7" fill="#E8E8E4" transform="rotate(-15 180 340)"/>
              <ellipse cx="145" cy="360" rx="10" ry="6" fill="#D0D0CB" transform="rotate(10 145 360)"/>
              <ellipse cx="165" cy="375" rx="11" ry="6.5" fill="#E8E8E4" transform="rotate(-5 165 375)"/>
              <ellipse cx="200" cy="358" rx="10" ry="6" fill="#C8C8C4" transform="rotate(20 200 358)"/>
              <ellipse cx="125" cy="345" rx="9" ry="5.5" fill="#E0E0DC" transform="rotate(-20 125 345)"/>
              <ellipse cx="280" cy="370" rx="11" ry="6.5" fill="#F05A22" transform="rotate(8 280 370)"/>
              <ellipse cx="260" cy="355" rx="10" ry="6" fill="#D94E1A" transform="rotate(-12 260 355)"/>
              <ellipse cx="300" cy="355" rx="9" ry="5.5" fill="#F06A32" transform="rotate(5 300 355)"/>
              <ellipse cx="340" cy="365" rx="11" ry="6.5" fill="#1A2FA8" transform="rotate(-8 340 365)"/>
              <ellipse cx="360" cy="350" rx="10" ry="6" fill="#2840C8" transform="rotate(15 360 350)"/>
              <ellipse cx="325" cy="380" rx="9" ry="5.5" fill="#1A2FA8" transform="rotate(-20 325 380)"/>
              <ellipse cx="400" cy="370" rx="10" ry="6" fill="#2A8A4A" transform="rotate(5 400 370)"/>
              <ellipse cx="420" cy="355" rx="9" ry="5.5" fill="#3AAA5A" transform="rotate(-10 420 355)"/>
              <ellipse cx="385" cy="355" rx="10" ry="6" fill="#2A8A4A" transform="rotate(18 385 355)"/>
              <ellipse cx="460" cy="360" rx="10" ry="6" fill="#1C1C1C" transform="rotate(-5 460 360)"/>
              <ellipse cx="480" cy="345" rx="9" ry="5.5" fill="#2A2A2A" transform="rotate(12 480 345)"/>
              <ellipse cx="445" cy="345" rx="10" ry="6" fill="#1C1C1C" transform="rotate(-18 445 345)"/>
            </g>
            <g opacity=".85">
              <rect x="420" y="200" width="40" height="80" rx="2" fill="#1A2FA8" opacity=".7"/>
              <rect x="430" y="185" width="20" height="20" rx="1" fill="#2840B8" opacity=".8"/>
              <rect x="435" y="178" width="10" height="10" rx="1" fill="#3050C8" opacity=".9"/>
              <ellipse cx="440" cy="278" rx="20" ry="8" fill="#0E1E88" opacity=".8"/>
              <rect x="421" y="230" width="38" height="49" rx="2" fill="#2840C8" opacity=".5"/>
              <text x="440" y="222" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TiO₂</text>
              <rect x="485" y="210" width="35" height="70" rx="2" fill="#C8820A" opacity=".7"/>
              <rect x="493" y="197" width="19" height="16" rx="1" fill="#D89020" opacity=".8"/>
              <rect x="497" y="190" width="11" height="9" rx="1" fill="#E89A28" opacity=".9"/>
              <ellipse cx="503" cy="278" rx="17" ry="7" fill="#A86E08" opacity=".8"/>
              <rect x="486" y="240" width="33" height="39" rx="2" fill="#E89028" opacity=".4"/>
              <text x="503" y="230" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">DOP</text>
              <rect x="350" y="175" width="50" height="110" rx="4" fill="#E8E8E4" opacity=".9"/>
              <rect x="362" y="162" width="26" height="16" rx="2" fill="#D0D0CC"/>
              <rect x="368" y="156" width="14" height="8" rx="1" fill="#C0C0BC"/>
              <rect x="355" y="210" width="40" height="50" rx="2" fill="#D8D8D4" opacity=".7"/>
              <text x="375" y="198" textAnchor="middle" fill="#333" fontSize="7" fontWeight="bold">PVC</text>
              <text x="375" y="208" textAnchor="middle" fill="#555" fontSize="6">Additives</text>
            </g>
            <g transform="translate(80 200)" opacity=".8">
              <ellipse cx="50" cy="20" rx="50" ry="18" fill="#D12E2E"/>
              <rect x="0" y="20" width="100" height="100" fill="#C02020"/>
              <ellipse cx="50" cy="120" rx="50" ry="18" fill="#B01A1A"/>
              <ellipse cx="50" cy="70" rx="30" ry="11" fill="#E83030" opacity=".5"/>
            </g>
            <g transform="translate(100 250)" opacity=".7">
              <path d="M 0 120 Q 10 60 40 20 Q 70 -10 120 10 Q 100 80 60 110 Z" fill="#888"/>
              <path d="M 50 115 L 180 80 Q 200 75 195 65 L 60 100 Z" fill="#999"/>
            </g>
            <text x="162" y="330" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" letterSpacing="1">POLÍMEROS</text>
            <text x="380" y="335" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" letterSpacing="1">ADITIVOS</text>
            <rect x="0" y="420" width="600" height="30" fill="rgba(240,90,34,.15)"/>
            <text x="300" y="439" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" letterSpacing="3">PLASFILM S.A.S. · BOGOTÁ</text>
          </svg>
        </motion.div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(14,14,20,.7) 0%, transparent 60%)',
          padding: '2rem 2rem 1.5rem',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: .5 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(3rem, 5vw, 6rem)',
              lineHeight: .82,
              color: 'rgba(255,255,255,.13)',
              letterSpacing: '.06em',
              pointerEvents: 'none',
              userSelect: 'none',
              marginLeft: '-.2rem',
            }}
          >CALIDAD<br/>INTERNACIONAL</motion.div>
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
