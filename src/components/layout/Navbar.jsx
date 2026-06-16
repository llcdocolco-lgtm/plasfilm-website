import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#acerca', label: 'Acerca de' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#contacto', label: 'Contacto' },
  { href: '#reserva', label: 'Reserva online' },
];

export default function Navbar() {
  const [active, setActive] = useState('#inicio');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let cur = '#inicio';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) cur = '#' + s.id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        height: 64,
        background: 'var(--color-white)',
        borderBottom: '2px solid var(--color-primary)',
        boxShadow: '0 2px 8px rgba(26,47,168,0.08)',
      }}
    >
      <a href="#inicio" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/logo.jpeg" alt="Plasfilm S.A.S." style={{ height: 48, objectFit: 'contain' }} />
      </a>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '.9rem', fontWeight: 500,
                color: active === href ? 'var(--color-primary)' : 'var(--color-dark)',
                position: 'relative', paddingBottom: 2,
                transition: 'color .2s',
              }}
            >
              {label}
              {active === href && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute', bottom: -2, left: 0, right: 0,
                    height: 2, background: 'var(--color-primary)',
                  }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <a href="#reserva" style={{
        background: 'var(--color-primary)', color: 'var(--color-white)',
        borderRadius: 6, padding: '10px 20px', fontFamily: 'Inter, sans-serif',
        fontSize: '.88rem', fontWeight: 600,
        textDecoration: 'none', transition: 'background .2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        className="nav-cta-desktop"
      >
        Cotizar
      </a>

      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
        className="hamburger-btn"
        style={{
          display: 'none', flexDirection: 'column', gap: 5,
          cursor: 'pointer', background: 'none', border: 'none', padding: 4,
        }}
      >
        <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 24, height: 2, background: 'var(--color-dark)' }} />
        <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: 24, height: 2, background: 'var(--color-dark)' }} />
        <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 24, height: 2, background: 'var(--color-dark)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'absolute', top: 64, left: 0, right: 0,
              background: 'var(--color-white)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
            }}
            className="mobile-menu"
          >
            {links.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                style={{
                  color: active === href ? 'var(--color-primary)' : 'var(--color-dark)',
                  textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1rem',
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
