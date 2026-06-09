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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#inicio');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        height: 64,
        background: 'rgba(14,14,20,.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--orange)' : '1px solid rgba(255,255,255,.08)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.35)' : 'none',
        transition: 'border-color .3s, box-shadow .3s',
      }}
    >
      <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: '.7rem', textDecoration: 'none' }}>
        <img src="/logo.jpeg" alt="Plasfilm S.A.S." style={{ height: 44, objectFit: 'contain' }} />
      </a>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                textDecoration: 'none', fontSize: '.9rem', fontWeight: 500,
                color: active === href ? 'var(--orange)' : 'rgba(255,255,255,.8)',
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
                    height: 2, background: 'var(--orange)',
                  }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <a href="#reserva" style={{
        background: 'var(--orange)', color: 'white',
        padding: '.55rem 1.3rem', fontFamily: 'DM Sans, sans-serif',
        fontSize: '.88rem', fontWeight: 700, letterSpacing: '.04em',
        textDecoration: 'none', transition: 'background .2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
        className="nav-cta-desktop"
      >
        Reserva ahora
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
        <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 24, height: 2, background: 'rgba(255,255,255,.8)' }} />
        <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: 24, height: 2, background: 'rgba(255,255,255,.8)' }} />
        <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 24, height: 2, background: 'rgba(255,255,255,.8)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'absolute', top: 64, left: 0, right: 0,
              background: 'rgba(14,14,20,.97)',
              borderBottom: '1px solid rgba(255,255,255,.08)',
              padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
            }}
            className="mobile-menu"
          >
            {links.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                style={{
                  color: active === href ? 'var(--orange)' : 'rgba(255,255,255,.8)',
                  textDecoration: 'none', fontWeight: 500, fontSize: '1rem',
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
