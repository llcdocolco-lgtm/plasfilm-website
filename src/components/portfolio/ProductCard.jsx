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
        background: 'var(--white)', padding: '2rem',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        width: 36, height: 36, borderRadius: '50%',
        display: 'grid', placeItems: 'center', fontSize: '1.1rem',
        background: product.iconBg,
        border: product.id === 'tio2' ? '1px solid #eee' : 'none',
      }}>
        {product.icon}
      </div>
      <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '.6rem' }}>
        {product.catLabel}
      </div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', lineHeight: 1, color: 'var(--blue)', marginBottom: '.7rem' }}>
        {product.name}
      </div>
      <div style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        {product.desc}
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
