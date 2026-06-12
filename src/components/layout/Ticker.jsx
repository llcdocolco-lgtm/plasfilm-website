const ITEMS = [
  'DOP — Plastificante Primario',
  'Aceite de Soya Epoxidado',
  'DOA — Dioctil Adipato',
  'Estabilizante Bario/Zinc',
  'Estabilizante de Estaño',
  'Alcohol Polivinilo',
];

function TickerRow({ items, reverse = false, bg = 'var(--orange)', color = 'white', dotColor = 'rgba(255,255,255,.5)' }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: bg, overflow: 'hidden', height: 44, display: 'flex', alignItems: 'center' }}>
      <div style={{
        display: 'flex', gap: '4rem', whiteSpace: 'nowrap',
        animation: `${reverse ? 'tickerReverse' : 'ticker'} 22s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4rem' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color, letterSpacing: '.1em' }}>
              {item}
            </span>
            <span style={{ color: dotColor }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <div aria-hidden="true">
      <TickerRow items={ITEMS} />
      <TickerRow
        items={ITEMS}
        reverse
        bg="var(--blue)"
        color="rgba(255,255,255,.8)"
        dotColor="var(--orange)"
      />
    </div>
  );
}
