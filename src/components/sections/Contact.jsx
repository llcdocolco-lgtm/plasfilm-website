import { useState } from 'react';
import { Mail, MapPin, Users } from 'lucide-react';
import { sendEmail } from '../../lib/emailjs';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SmokeBackground } from '../ui/SmokeBackground';

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function Contact() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', tel: '', msg: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.email) return;
    setSending(true);
    try {
      await sendEmail(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name:  `${form.nombre} ${form.apellido}`.trim() || 'Sin nombre',
        from_email: form.email,
        phone:      form.tel || 'No indicado',
        message:    form.msg || 'Sin mensaje',
      });
      setSent(true);
      toast.success('¡Mensaje enviado!');
    } catch {
      toast.error('Error al enviar. Escríbenos a plasfilmsas@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const fieldStyle = { background: 'var(--color-white)', color: 'var(--color-dark)', padding: '.6rem .8rem', fontFamily: 'Inter, sans-serif', fontSize: '.95rem', outline: 'none', width: '100%', border: '1px solid var(--color-border)', borderRadius: 6, transition: 'border-color .2s' };
  const labelStyle = { display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '.4rem' };
  const focusField = e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; };
  const blurField = e => { e.currentTarget.style.borderColor = 'var(--color-border)'; };

  const infoItems = [
    { icon: Mail, label: 'Email', value: <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a> },
    { icon: MapPin, label: 'Ciudad', value: 'Bogotá D.C., Colombia' },
    { icon: MapPin, label: 'Dirección', value: 'Calle 20 C No 42-60 int 3' },
    { icon: Users, label: 'Mayoristas', value: 'Para consultas al mayoreo, contáctenos por correo.' },
  ];

  return (
    <section id="contacto" style={{ background: 'var(--color-white)', scrollMarginTop: 64, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.28, pointerEvents: 'none' }}>
        <SmokeBackground smokeColor="#1A2FA8" />
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem', position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="reveal contact-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--color-dark)', lineHeight: 1.1, marginBottom: '2rem' }}>
              Ponte en<br/>contacto
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '.9rem', alignItems: 'flex-start' }}>
                  <Icon size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '.9rem', color: 'var(--color-dark)' }}>{label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.9rem', color: 'var(--color-muted)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 28, height: 2, background: 'var(--color-primary)', display: 'inline-block' }} />
              Formulario
            </div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Escríbenos</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '.9rem' }}>Usa el siguiente formulario y contáctanos para cualquier solicitud especial, consulta, o duda.</p>

            {sent ? (
              <div style={{ background: 'rgba(26,47,168,0.08)', border: '1px solid var(--color-primary)', padding: '1rem 1.5rem', color: 'var(--color-dark)', fontFamily: 'Inter, sans-serif', fontSize: '.9rem', borderRadius: 6 }}>
                ✔ ¡Gracias por escribirnos! Te contactaremos pronto.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-row-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={labelStyle}>Nombre</label><input style={fieldStyle} onFocus={focusField} onBlur={blurField} placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} /></div>
                  <div><label style={labelStyle}>Apellido</label><input style={fieldStyle} onFocus={focusField} onBlur={blurField} placeholder="Tu apellido" value={form.apellido} onChange={set('apellido')} /></div>
                </div>
                <div className="form-row-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={labelStyle}>Email *</label><input type="email" style={fieldStyle} onFocus={focusField} onBlur={blurField} placeholder="correo@empresa.com" value={form.email} onChange={set('email')} /></div>
                  <div><label style={labelStyle}>Teléfono</label><input type="tel" style={fieldStyle} onFocus={focusField} onBlur={blurField} placeholder="+57 300 000 0000" value={form.tel} onChange={set('tel')} /></div>
                </div>
                <div><label style={labelStyle}>Mensaje</label><textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: 100 }} onFocus={focusField} onBlur={blurField} placeholder="Escribe tu mensaje aquí..." value={form.msg} onChange={set('msg')} /></div>
                <button
                  onClick={submit}
                  disabled={sending}
                  style={{
                    background: 'var(--color-primary)', color: 'white', border: 'none',
                    borderRadius: 6, padding: '1rem 2.5rem', fontFamily: 'Inter, sans-serif',
                    fontSize: '.95rem', fontWeight: 700, letterSpacing: '.02em',
                    cursor: 'pointer', alignSelf: 'flex-start',
                    transition: 'background .2s, transform .15s',
                    opacity: sending ? .7 : 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {sending ? 'ENVIANDO...' : 'ENVIAR'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contacto .contact-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #contacto .form-row-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
