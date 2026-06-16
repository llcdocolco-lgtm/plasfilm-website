import { motion } from 'framer-motion';

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(26,47,168,${0.03 + i * 0.015})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg
        style={{ width: '100%', height: '100%', color: 'var(--color-primary)' }}
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({ title = '' }) {
  const words = title.trim() ? title.split(' ') : [];

  return (
    <div style={{
      position: 'relative', minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {words.length > 0 && (
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ maxWidth: 896, margin: '0 auto' }}
          >
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,6vw,5rem)', marginBottom: 32, letterSpacing: '-0.05em', color: 'var(--color-dark)' }}>
              {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', marginRight: '1rem' }}>
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: 'spring',
                        stiffness: 150,
                        damping: 25,
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <button
              onClick={() => document.getElementById('reserva-form')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                borderRadius: 12, padding: '14px 36px', fontSize: 16, fontWeight: 600,
                background: 'var(--color-primary)', color: 'white',
                border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                transition: 'all 0.3s ease', backdropFilter: 'blur(4px)',
              }}
            >
              Consultar disponibilidad <span style={{ marginLeft: 8 }}>→</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
