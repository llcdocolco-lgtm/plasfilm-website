export default function AuroraBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '-35%', left: '-8%',
        width: '85%', height: '95%',
        background: 'radial-gradient(ellipse at center, rgba(240,90,34,0.48) 0%, rgba(240,90,34,0.12) 45%, transparent 70%)',
        filter: 'blur(32px)',
        animation: 'aurora-1 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '-5%', right: '-12%',
        width: '72%', height: '85%',
        background: 'radial-gradient(ellipse at center, rgba(26,47,168,0.40) 0%, rgba(26,47,168,0.10) 45%, transparent 70%)',
        filter: 'blur(38px)',
        animation: 'aurora-2 25s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-35%', left: '10%',
        width: '80%', height: '75%',
        background: 'radial-gradient(ellipse at center, rgba(255,165,0,0.32) 0%, rgba(255,165,0,0.08) 45%, transparent 70%)',
        filter: 'blur(36px)',
        animation: 'aurora-3 30s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '25%', left: '-12%',
        width: '58%', height: '70%',
        background: 'radial-gradient(ellipse at center, rgba(20,160,130,0.28) 0%, rgba(20,160,130,0.07) 45%, transparent 70%)',
        filter: 'blur(42px)',
        animation: 'aurora-4 22s ease-in-out infinite',
      }} />
    </div>
  );
}
