import { motion } from 'framer-motion';

export default function ProductCard({ product, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: .95 }}
      whileHover={{ y: -6, boxShadow: '5px 5px 0 var(--orange)' }}
      onClick={() => onClick(product)}
      style={{
        background: 'rgba(255,255,255,0.68)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.55)',
        padding: '2rem',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background .25s',
      }}
      onHoverStart={e => { e.target.style && (e.target.style.background = 'rgba(255,255,255,0.82)'); }}
      onHoverEnd={e => { e.target.style && (e.target.style.background = 'rgba(255,255,255,0.68)'); }}
    >
      <div style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem',
        width: 'clamp(28px, 3.2vw, 38px)', height: 'clamp(28px, 3.2vw, 38px)',
        borderRadius: '50%',
        display: 'grid', placeItems: 'center',
        fontSize: 'clamp(.85rem, 1.5vw, 1.05rem)',
        background: product.iconBg,
        flexShrink: 0,
      }}>
        {product.icon}
      </div>

      <div style={{ paddingRight: '3rem' }}>
        <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '.6rem' }}>
          {product.catLabel}
        </div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.1, color: 'var(--blue)', marginBottom: '.7rem' }}>
          {product.name}
        </div>
        <div style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          {product.desc}
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: 'var(--orange)' }}
        transition={{ duration: .3 }}
      />
    </motion.div>
  );
}
