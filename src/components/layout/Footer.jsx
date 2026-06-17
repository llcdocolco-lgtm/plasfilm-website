import { Link } from 'react-router-dom';
import MolecularBackground from '../ui/MolecularBackground';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#acerca', label: 'Acerca de' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#contacto', label: 'Contacto' },
  { href: '#reserva', label: 'Reserva online' },
];

const legalLinks = [
  { to: '/politica-de-privacidad', label: 'Política de Privacidad' },
  { to: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  { to: '/envios-y-devoluciones', label: 'Envíos y Devoluciones' },
];

const linkStyle = { color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '.85rem', textDecoration: 'none', transition: 'color .2s' };
const legalLinkStyle = { color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '.8rem', textDecoration: 'none', transition: 'color .2s' };

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)', color: 'rgba(255,255,255,0.7)', borderTop: '4px solid var(--color-primary)', padding: '3rem 2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <MolecularBackground count={35} linkDist={100} opacity={0.28} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '2rem' }}>

          {/* Logo + redes */}
          <div>
            <a href="#inicio" style={{ display: 'inline-block', marginBottom: '.5rem', textDecoration: 'none' }}>
              <img src="/logo.png" alt="Plasfilm S.A.S." style={{ height: 40, objectFit: 'contain', display: 'block' }} />
            </a>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '.82rem', marginTop: '.6rem' }}>
              Insumos químicos para la industria plástica · Bogotá, Colombia
            </div>
            <div style={{ display: 'flex', gap: '.8rem', marginTop: '1rem' }}>
              {[
                { href: '#', label: 'Facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { href: '#', label: 'Instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
                { href: 'https://wa.me/573000000000', label: 'WhatsApp', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
                { href: 'mailto:plasfilmsas@gmail.com', label: 'Email', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'border-color .2s, background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Navegación principal */}
          <nav aria-label="Navegación footer" style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '.3rem' }}>Navegación</div>
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{label}</a>
            ))}
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '.3rem' }}>Legal</div>
            {legalLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={legalLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{label}</Link>
            ))}
          </nav>

        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)',
          borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, marginBottom: '1rem',
        }}>
          Plasfilm S.A.S. es una empresa vinculada a Docolco LLC (Estados Unidos).
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>© 2026 Plasfilm S.A.S. Todos los derechos reservados.</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>plasfilmsas@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
