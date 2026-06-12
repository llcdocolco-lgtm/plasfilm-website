import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import FilterBar from '../portfolio/FilterBar';
import ProductCard from '../portfolio/ProductCard';
import ProductModal from '../portfolio/ProductModal';
import products from '../../data/products';
import AuroraBackground from '../ui/AuroraBackground';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const ref = useScrollReveal();
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

  return (
    <section id="portafolio" style={{ background: 'var(--light)', scrollMarginTop: 64, position: 'relative', overflow: 'hidden' }}>
      <AuroraBackground />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem', position: 'relative' }}>
        <div ref={ref} className="reveal">
          <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
            <span style={{ width: 28, height: 2, background: 'var(--orange)', display: 'inline-block' }} />
            Catálogo
          </div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
            Portafolio de<br/>Soluciones Químicas
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: 560, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Insumos químicos de alto rendimiento para la industria plástica colombiana. Cada producto de nuestro portafolio está respaldado por asesoría técnica personalizada para optimizar su proceso productivo.
          </p>
        </div>
        <FilterBar active={filter} onChange={setFilter} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'transparent' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #portafolio .products-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #portafolio .products-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
