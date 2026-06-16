const filters = [
  { key: 'all',          label: 'Todos' },
  { key: 'plastificante', label: 'Plastificantes' },
  { key: 'estabilizante', label: 'Estabilizantes' },
  { key: 'aditivo',      label: 'Aditivos' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2.5rem' }}>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            border: active === key ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
            background: active === key ? 'var(--color-primary)' : 'var(--color-bg-light)',
            color: active === key ? 'white' : 'var(--color-muted)',
            borderRadius: 20,
            padding: '.45rem 1.1rem',
            fontFamily: 'Inter, sans-serif', fontSize: '.82rem',
            fontWeight: 600, letterSpacing: '.02em',
            cursor: 'pointer', transition: '.2s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
