import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import MolecularBackground from './MolecularBackground';
import AuroraBackground from './AuroraBackground';

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <>
      <Navbar />
      {/* Hero oscuro con molecular */}
      <section style={{
        background: 'var(--dark)', paddingTop: 64,
        position: 'relative', overflow: 'hidden',
        minHeight: 220, display: 'flex', alignItems: 'center',
      }}>
        <MolecularBackground count={50} linkDist={110} opacity={0.45} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem', position: 'relative' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            color: 'rgba(255,255,255,.5)', fontSize: '.8rem',
            textDecoration: 'none', marginBottom: '1.2rem',
            transition: 'color .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--orange)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.5)'}
          >
            ← Volver al inicio
          </Link>
          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(2.5rem,5vw,4rem)',
            color: 'white', lineHeight: 1,
            letterSpacing: '.02em', marginBottom: '.6rem',
          }}>{title}</h1>
          {subtitle && (
            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.9rem' }}>{subtitle}</p>
          )}
        </div>
      </section>

      {/* Contenido con aurora */}
      <section style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <AuroraBackground />
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative' }}>
          {children}
        </div>
      </section>

      <Footer />
    </>
  );
}
