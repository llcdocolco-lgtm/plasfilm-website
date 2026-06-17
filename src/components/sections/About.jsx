import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SmokeBackground } from '../ui/SmokeBackground';

const pills = ['Plásticos', 'Caucho', 'PVC', 'Asesoría técnica', 'Bogotá · Nacional'];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="acerca" style={{ background: 'var(--color-bg-light)', scrollMarginTop: 64, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}>
        <SmokeBackground smokeColor="#1A2FA8" />
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem', position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="reveal about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>

          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            style={{
              border: '1px solid var(--color-border)', padding: '2.5rem',
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1.2rem',
              background: 'var(--color-white)', borderRadius: 8,
            }}
          >
            <img
              src="/logo.png"
              alt="Plasfilm S.A.S."
              style={{ width: '100%', maxWidth: 200, objectFit: 'contain', display: 'block' }}
            />
            <div style={{ width: '55%', height: 2, background: 'var(--color-primary)', opacity: 0.25 }} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.78rem', color: 'var(--color-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Bogotá D.C. · Colombia
            </div>
          </motion.div>

          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 28, height: 2, background: 'var(--color-primary)', display: 'inline-block' }} />
              Nuestra historia
            </div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
              Aliados del<br/>sector plástico
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.7, marginBottom: '1.2rem', fontSize: '.97rem' }}>
              Plasfilm S.A.S. es un proveedor especializado en insumos químicos para la industria plástica y del caucho en Colombia. Ofrecemos un portafolio integral de aditivos de alto rendimiento que responde a los más exigentes estándares de calidad y eficiencia técnica.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.7, marginBottom: '1.2rem', fontSize: '.97rem' }}>
              Nuestro catálogo incluye plastificantes como DOP, Aceite de Soya Epoxidado y DOA; estabilizantes como Estaño y Bario/Zinc; y Alcohol Polivinilo en sus variantes estándar y con antiespumante. Con sede en Bogotá, brindamos asesoría técnica personalizada en cada etapa del proceso productivo.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '1.5rem' }}>
              {pills.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .08, duration: .4 }}
                  viewport={{ once: true }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid var(--color-border)', background: 'var(--color-white)', color: 'var(--color-primary)',
                    borderRadius: 20,
                    padding: '4px 14px', fontSize: 12, fontWeight: 500,
                    cursor: 'default',
                  }}
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #acerca .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
