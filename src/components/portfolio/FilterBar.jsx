const filters = [
  { key: 'all', label: 'Todos' },
  { key: 'plastificante', label: 'Plastificantes' },
  { key: 'estabilizante', label: 'Estabilizantes' },
  { key: 'pigmento', label: 'Pigmentos' },
  { key: 'aditivo', label: 'Aditivos' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2.5rem' }}>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            border: active === key ? '1.5px solid var(--blue)' : '1.5px solid var(--mid)',
            background: active === key ? 'var(--blue)' : 'transparent',
            color: active === key ? 'white' : 'var(--muted)',
            padding: '.45rem 1.1rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '.82rem',
            fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase',
            cursor: 'pointer', transition: '.2s',
          }}
          onMouseEnter={e => { if (active !== key) { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'white'; } }}
          onMouseLeave={e => { if (active !== key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--mid)'; e.currentTarget.style.color = 'var(--muted)'; } }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
