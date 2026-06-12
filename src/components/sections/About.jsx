import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import AuroraBackground from '../ui/AuroraBackground';

const pills = ['Plásticos', 'Caucho', 'PVC', 'Asesoría técnica', 'Bogotá · Nacional'];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="acerca" style={{ background: 'var(--white)', scrollMarginTop: 64, position: 'relative', overflow: 'hidden' }}>
      <AuroraBackground />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem', position: 'relative' }}>
        <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>

          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            style={{
              border: '2px solid var(--blue)', padding: '2.5rem',
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1.2rem',
              background: 'rgba(255,255,255,0.85)',
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Plasfilm S.A.S."
              style={{ width: '100%', maxWidth: 200, objectFit: 'contain', display: 'block' }}
            />
            <div style={{ width: '55%', height: 2, background: 'var(--blue)', opacity: 0.25 }} />
            <div style={{ fontSize: '.78rem', color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Bogotá D.C. · Colombia
            </div>
          </motion.div>

          <div>
            <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 28, height: 2, background: 'var(--orange)', display: 'inline-block' }} />
              Nuestra historia
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
              Aliados del<br/>sector plástico
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '.97rem' }}>
              Plasfilm S.A.S. es un proveedor especializado en insumos químicos para la industria plástica y del caucho en Colombia. Ofrecemos un portafolio integral de aditivos de alto rendimiento que responde a los más exigentes estándares de calidad y eficiencia técnica.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '.97rem' }}>
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
                    border: '1px solid var(--blue)', color: 'var(--blue)',
                    padding: '.35rem .9rem', fontSize: '.8rem', fontWeight: 600,
                    letterSpacing: '.05em', textTransform: 'uppercase',
                    cursor: 'default', transition: 'background .2s, color .2s',
                  }}
                  whileHover={{ backgroundColor: '#1A2FA8', color: '#fff' }}
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
