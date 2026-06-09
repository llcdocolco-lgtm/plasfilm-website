import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const pills = ['Plásticos', 'Caucho', 'PVC', 'Asesoría técnica', 'Bogotá · Nacional'];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="acerca" style={{ background: 'var(--white)', scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
        <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
            style={{ border: '2px solid var(--blue)', padding: '2.5rem', textAlign: 'center' }}
          >
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', color: 'var(--blue)', lineHeight: 1 }}>
              ACERCA<br/>DE
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '1rem', letterSpacing: '.06em' }}>
              PLASFILM S.A.S.
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
              Plasfilm S.A.S. se consolida en el mercado colombiano como un aliado estratégico de alto nivel para la industria transformadora del plástico y el caucho. Especializada en la comercialización de insumos químicos de vanguardia, la compañía ofrece un portafolio integral que equilibra eficiencia técnica y sostenibilidad.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '.97rem' }}>
              Nuestro catálogo abarca desde plastificantes esenciales como el DOP y el aceite de soya epoxidado, hasta estabilizantes térmicos de máxima potencia como el estaño y el bario-zinc. Con sede en Bogotá, no solo suministramos materias primas de calidad internacional, sino que potenciamos la productividad de nuestros clientes mediante asesoría técnica personalizada.
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
