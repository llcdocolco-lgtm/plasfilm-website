import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <>
      <Navbar />
      <section style={{
        background: 'var(--color-bg-light)',
        position: 'relative', overflow: 'hidden',
        minHeight: 220, display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem', position: 'relative' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            color: 'var(--color-muted)', fontFamily: 'Inter, sans-serif', fontSize: '.8rem',
            textDecoration: 'none', marginBottom: '1.2rem',
            transition: 'color .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
          >
            ← Volver al inicio
          </Link>
          <h1 style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.5rem,5vw,4rem)',
            color: 'var(--color-dark)', lineHeight: 1,
            marginBottom: '.6rem',
          }}>{title}</h1>
          {subtitle && (
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-muted)', fontSize: '.9rem' }}>{subtitle}</p>
          )}
        </div>
      </section>

      <section style={{ background: 'var(--color-bg-light)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative' }}>
          {children}
        </div>
      </section>

      <Footer />
    </>
  );
}
