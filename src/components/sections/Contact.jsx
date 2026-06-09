import { useState } from 'react';
import emailjs from '../../lib/emailjs';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name:  `${form.nombre} ${form.apellido}`.trim() || 'Sin nombre',
        from_email: form.email,
        phone:      form.tel || 'No indicado',
        message:    form.msg || 'Sin mensaje',
      }, EMAILJS_KEY);
      setSent(true);
      toast.success('¡Mensaje enviado!');
    } catch {
      toast.error('Error al enviar. Escríbenos a plasfilmsas@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const fieldStyle = { background: 'transparent', color: 'white', padding: '.6rem 0', fontFamily: 'DM Sans, sans-serif', fontSize: '.95rem', outline: 'none', width: '100%', border: 'none', borderBottom: '1px solid rgba(255,255,255,.2)' };
  const labelStyle = { display: 'block', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '.4rem' };

  return (
    <section id="contacto" style={{ background: 'var(--dark)', scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
        <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div style={{ border: '2px solid var(--blue)', padding: '2rem', fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem', color: 'var(--blue)', lineHeight: 1, marginBottom: '2rem' }}>
              PONTE<br/>EN<br/>CONTAC<br/>TO
            </div>
            <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.9rem', lineHeight: 2 }}>
              <p><strong style={{ color: 'white', fontWeight: 600 }}>Email</strong><br/><a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a></p>
              <p><strong style={{ color: 'white', fontWeight: 600 }}>Ciudad</strong><br/>Bogotá D.C., Colombia</p>
              <p><strong style={{ color: 'white', fontWeight: 600 }}>Dirección</strong><br/>Calle 20 C No 42-60 int 3</p>
              <p><strong style={{ color: 'white', fontWeight: 600 }}>Mayoristas</strong><br/>Para consultas al mayoreo, contáctenos por correo.</p>
            </div>
            <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '2rem' }}>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: 'var(--blue)', letterSpacing: '.05em', marginBottom: '.6rem' }}>MAYORISTAS</h3>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.9rem' }}>
                Para consultas sobre marcas y productos al mayoreo, envíanos un correo a <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a>
              </p>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 28, height: 2, background: 'var(--orange)', display: 'inline-block' }} />
              Formulario
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, color: 'white', marginBottom: '1.5rem' }}>Escríbenos</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', marginBottom: '2rem', fontSize: '.9rem' }}>Usa el siguiente formulario y contáctanos para cualquier solicitud especial, consulta, o duda.</p>

            {sent ? (
              <div style={{ background: 'rgba(26,47,168,.2)', border: '1px solid var(--blue)', padding: '1rem 1.5rem', color: 'white', fontSize: '.9rem' }}>
                ✔ ¡Gracias por escribirnos! Te contactaremos pronto.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={labelStyle}>Nombre</label><input style={fieldStyle} placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} /></div>
                  <div><label style={labelStyle}>Apellido</label><input style={fieldStyle} placeholder="Tu apellido" value={form.apellido} onChange={set('apellido')} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={labelStyle}>Email *</label><input type="email" style={fieldStyle} placeholder="correo@empresa.com" value={form.email} onChange={set('email')} /></div>
                  <div><label style={labelStyle}>Teléfono</label><input type="tel" style={fieldStyle} placeholder="+57 300 000 0000" value={form.tel} onChange={set('tel')} /></div>
                </div>
                <div><label style={labelStyle}>Mensaje</label><textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: 100 }} placeholder="Escribe tu mensaje aquí..." value={form.msg} onChange={set('msg')} /></div>
                <button
                  onClick={submit}
                  disabled={sending}
                  style={{
                    background: 'var(--orange)', color: 'white', border: 'none',
                    padding: '1rem 2.5rem', fontFamily: 'DM Sans, sans-serif',
                    fontSize: '.95rem', fontWeight: 700, letterSpacing: '.06em',
                    cursor: 'pointer', alignSelf: 'flex-start',
                    transition: 'background .2s, transform .15s',
                    opacity: sending ? .7 : 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.transform = 'none'; }}
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
