export default function AuroraBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '-25%', left: '-10%',
        width: '70%', height: '80%',
        background: 'radial-gradient(ellipse at center, rgba(26,47,168,0.08) 0%, rgba(26,47,168,0.02) 45%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'aurora-1 24s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '-8%', right: '-14%',
        width: '60%', height: '70%',
        background: 'radial-gradient(ellipse at center, rgba(26,47,168,0.06) 0%, rgba(26,47,168,0.015) 45%, transparent 70%)',
        filter: 'blur(46px)',
        animation: 'aurora-2 28s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-30%', left: '15%',
        width: '55%', height: '65%',
        background: 'radial-gradient(ellipse at center, rgba(209,46,46,0.05) 0%, rgba(209,46,46,0.012) 45%, transparent 70%)',
        filter: 'blur(44px)',
        animation: 'aurora-3 32s ease-in-out infinite',
      }} />
    </div>
  );
}
