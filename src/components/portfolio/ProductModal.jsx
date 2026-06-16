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
          background: 'rgba(21,32,107,0.5)', backdropFilter: 'blur(4px)',
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
          style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 10, maxWidth: 540, width: '100%', padding: '2.5rem', position: 'relative' }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-muted)' }}>✕</button>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '.4rem' }}>
            {product.catLabel}
          </div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: 'var(--color-dark)', marginBottom: '1rem', lineHeight: 1.1 }}>
            {product.fullName}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-muted)', lineHeight: 1.75, fontSize: '.95rem', marginBottom: '1.5rem' }}>
            {product.longDesc}
          </p>
          <dl style={{ marginBottom: '1.5rem' }}>
            {product.specs.map(({ label, value }, i) => (
              <div key={label} style={{ background: i % 2 === 0 ? 'var(--color-bg-light)' : 'transparent', borderTop: '1px solid var(--color-border)', padding: '.7rem 1rem' }}>
                <dt style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--color-muted)' }}>{label}</dt>
                <dd style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '.9rem', color: 'var(--color-dark)' }}>{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#contacto"
            onClick={onClose}
            style={{
              display: 'inline-block', background: 'var(--color-primary)', color: 'white',
              padding: '.9rem 2rem', fontFamily: 'Inter, sans-serif',
              fontSize: '.95rem', fontWeight: 700, letterSpacing: '.02em',
              textDecoration: 'none', transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-secondary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            Solicitar cotización →
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
