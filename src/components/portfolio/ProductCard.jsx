import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, FlaskConical } from 'lucide-react';

const CAT_ICON = {
  plastificante: Droplets,
  estabilizante: ShieldCheck,
  aditivo: FlaskConical,
};

const CAT_BADGE = {
  plastificante: { bg: 'rgba(26,47,168,0.08)', color: 'var(--color-primary)', border: '1px solid rgba(26,47,168,0.2)' },
  estabilizante: { bg: 'rgba(209,46,46,0.08)', color: 'var(--color-secondary)', border: '1px solid rgba(209,46,46,0.2)' },
  aditivo:       { bg: 'rgba(107,114,128,0.08)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' },
};

export default function ProductCard({ product, onClick }) {
  const Icon = CAT_ICON[product.cat] || FlaskConical;
  const badge = CAT_BADGE[product.cat] || CAT_BADGE.aditivo;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: .95 }}
      whileHover={{ y: -2, borderColor: 'var(--color-primary)', boxShadow: '0 4px 20px rgba(26,47,168,0.15)' }}
      onClick={() => onClick(product)}
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '1.5rem',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <Icon size={24} color={badge.color} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem' }} />

      <div style={{ paddingRight: '3rem' }}>
        <div style={{
          display: 'inline-block', background: badge.bg, color: badge.color, border: badge.border,
          borderRadius: 20, padding: '.25rem .75rem',
          fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
          marginBottom: '.8rem',
        }}>
          {product.catLabel}
        </div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '16px', lineHeight: 1.2, color: 'var(--color-dark)', marginBottom: '.7rem' }}>
          {product.name}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.85rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
          {product.desc}
        </div>
      </div>
    </motion.div>
  );
}
