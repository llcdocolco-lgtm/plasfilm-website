import { motion, AnimatePresence } from 'framer-motion';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(14,14,20,.75)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: .9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: .95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{ background: 'white', maxWidth: 540, width: '100%', padding: '2.5rem', position: 'relative' }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--muted)' }}>✕</button>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '.4rem' }}>
            {product.catLabel}
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.8rem', color: 'var(--blue)', marginBottom: '1rem', lineHeight: 1 }}>
            {product.fullName}
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '.95rem', marginBottom: '1.5rem' }}>
            {product.longDesc}
          </p>
          <dl style={{ marginBottom: '1.5rem' }}>
            {product.specs.map(({ label, value }) => (
              <div key={label}>
                <dt style={{ fontWeight: 700, fontSize: '.82rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>{label}</dt>
                <dd style={{ fontSize: '.88rem', color: 'var(--muted)', marginBottom: '.8rem' }}>{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#contacto"
            onClick={onClose}
            style={{
              display: 'inline-block', background: 'var(--orange)', color: 'white',
              padding: '.9rem 2rem', fontFamily: 'DM Sans, sans-serif',
              fontSize: '.95rem', fontWeight: 700, letterSpacing: '.04em',
              textDecoration: 'none', transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
          >
            Solicitar cotización →
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
