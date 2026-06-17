import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendEmail } from '../../lib/emailjs';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { BackgroundPaths } from '../ui/BackgroundPaths';

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const today = new Date().toISOString().split('T')[0];

export default function Reserva() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', producto: '', fecha: '', hora: '', msg: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = k => e => {
    setForm(f => ({ ...f, [k]: e.target.value }));
  };

  const step2Active = !!form.producto;
  const step3Active = !!(form.producto && form.fecha && form.hora);

  const submit = async () => {
    if (!form.nombre || !form.email) { toast.error('Nombre y email son requeridos'); return; }
    setSending(true);
    try {
      await sendEmail(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name:  form.nombre,
        from_email: form.email,
        phone:      form.empresa || 'Reserva Online',
        message:    `Empresa: ${form.empresa || 'No indicada'}\nProducto: ${form.producto || 'No especificado'}\nFecha: ${form.fecha || 'No especificada'}\nHora: ${form.hora || 'No especificada'}\nComentarios: ${form.msg || 'Ninguno'}`,
      });
      setSent(true);
      toast.success('¡Reserva confirmada!');
    } catch {
      toast.error('Error al enviar. Escríbenos a plasfilmsas@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = { width: '100%', background: 'var(--color-white)', border: '1px solid var(--color-border)', color: 'var(--color-dark)', padding: '.65rem .8rem', fontFamily: 'Inter, sans-serif', fontSize: '.95rem', outline: 'none', borderRadius: 6, appearance: 'none', transition: 'border-color .2s' };
  const labelStyle = { display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '.4rem' };
  const focusField = e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; };
  const blurField = e => { e.currentTarget.style.borderColor = 'var(--color-border)'; };

  const steps = [
    { n: '01', title: 'Elige producto de interés', body: 'Selecciona el insumo sobre el que necesitas asesoría técnica.', active: true },
    { n: '02', title: 'Elige fecha y hora', body: 'Selecciona el día y la franja horaria que más te convenga.', active: step2Active },
    { n: '03', title: 'Confirmación inmediata', body: 'Recibirás un correo de confirmación con los detalles de tu cita.', active: step3Active },
  ];

  return (
    <section id="reserva" style={{ background: 'var(--color-bg-light)', scrollMarginTop: 72, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <BackgroundPaths title="" />
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem', position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 28, height: 2, background: 'var(--color-primary)', display: 'inline-block' }} />
              Agenda tu cita
            </div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
              Reserva<br/>Online
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Agenda una reunión con nuestro equipo técnico para recibir asesoría personalizada sobre los insumos más adecuados para tu proceso de producción.
            </p>
            <div>
              {steps.map(({ n, title, body, active }, i) => (
                <div key={n} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 0', borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none', alignItems: 'flex-start' }}>
                  <motion.div
                    animate={{ color: active ? 'var(--color-primary)' : 'var(--color-border)' }}
                    transition={{ duration: .3 }}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '2.2rem', lineHeight: 1, flexShrink: 0, width: 52 }}
                  >
                    {n}
                  </motion.div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '.95rem', marginBottom: '.3rem', color: 'var(--color-dark)' }}>{title}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '.85rem', color: 'var(--color-muted)' }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 12, boxShadow: '0 4px 24px rgba(26,47,168,0.1)', padding: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Agenda tu asesoría</h3>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(26,47,168,0.08)', border: '1px solid var(--color-primary)', color: 'var(--color-dark)', padding: '1rem 1.5rem', fontFamily: 'Inter, sans-serif', fontSize: '.9rem', borderRadius: 6 }}
              >
                ✔ ¡Reserva confirmada! Te enviaremos los detalles a tu correo.
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div><label style={labelStyle}>Nombre completo *</label><input style={inputStyle} onFocus={focusField} onBlur={blurField} placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} /></div>
                <div><label style={labelStyle}>Empresa</label><input style={inputStyle} onFocus={focusField} onBlur={blurField} placeholder="Nombre de tu empresa" value={form.empresa} onChange={set('empresa')} /></div>
                <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} onFocus={focusField} onBlur={blurField} placeholder="correo@empresa.com" value={form.email} onChange={set('email')} /></div>
                <div>
                  <label style={labelStyle}>Producto de interés</label>
                  <select style={inputStyle} onFocus={focusField} onBlur={blurField} value={form.producto} onChange={set('producto')}>
                    <option value="">— Selecciona —</option>
                    <option>DOP — Plastificante</option>
                    <option>Aceite de Soya Epoxidado</option>
                    <option>DOA — Dioctil Adipato</option>
                    <option>Estabilizante Ba/Zn</option>
                    <option>Estabilizante de Estaño</option>
                    <option>Alcohol Polivinilo (sin antiespumante)</option>
                    <option>Alcohol Polivinilo (con antiespumante)</option>
                    <option>Otro / Consulta general</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={labelStyle}>Fecha preferida</label><input type="date" style={inputStyle} onFocus={focusField} onBlur={blurField} min={today} value={form.fecha} onChange={set('fecha')} /></div>
                  <div>
                    <label style={labelStyle}>Hora preferida</label>
                    <select style={inputStyle} onFocus={focusField} onBlur={blurField} value={form.hora} onChange={set('hora')}>
                      <option value="">— Hora —</option>
                      {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'].map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Comentarios adicionales</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} onFocus={focusField} onBlur={blurField} placeholder="Cuéntanos brevemente sobre tu proceso o necesidad..." value={form.msg} onChange={set('msg')} />
                </div>
                <button
                  onClick={submit}
                  disabled={sending}
                  style={{
                    width: '100%', background: 'var(--color-primary)', color: 'white',
                    border: 'none', borderRadius: 6, padding: '1.1rem',
                    fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 700,
                    cursor: 'pointer', marginTop: '1rem', transition: 'background .2s',
                    opacity: sending ? .7 : 1,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
                >
                  {sending ? 'CONFIRMANDO...' : 'CONFIRMAR RESERVA'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #reserva > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
