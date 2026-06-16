import LegalLayout from '../components/ui/LegalLayout';

const S = {
  h2: { fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.7rem', color: 'var(--color-dark)', margin: '2.5rem 0 .8rem' },
  p: { fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.85, fontSize: '.96rem', marginBottom: '.9rem' },
  ul: { fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.85, fontSize: '.96rem', paddingLeft: '1.4rem', marginBottom: '.9rem' },
  tag: { display: 'inline-block', background: 'rgba(26,47,168,0.08)', border: '1px solid rgba(26,47,168,0.2)', color: 'var(--color-primary)', fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.2rem .7rem', marginBottom: '1.5rem' },
  divider: { border: 'none', borderTop: '1px solid var(--color-border)', margin: '2rem 0' },
};

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad y Tratamiento de Datos"
      subtitle="Última actualización: junio de 2026"
    >
      <div style={S.tag}>Ley 1581 de 2012 · Decreto 1377 de 2013</div>

      <p style={S.p}>
        Plasfilm S.A.S. (en adelante <strong>"Plasfilm"</strong>), sociedad domiciliada en Bogotá D.C., Colombia, actúa como responsable del tratamiento de los datos personales recopilados a través de su sitio web y en el marco de sus relaciones comerciales. El presente documento establece las condiciones bajo las cuales se recopilan, almacenan y utilizan dichos datos, de conformidad con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013.
      </p>

      <hr style={S.divider} />

      <h2 style={S.h2}>1. Responsable del tratamiento</h2>
      <p style={S.p}><strong>Razón social:</strong> Plasfilm S.A.S.<br />
        <strong>Domicilio:</strong> Calle 20 C No 42-60 int 3, Bogotá D.C., Colombia<br />
        <strong>Correo electrónico:</strong> plasfilmsas@gmail.com
      </p>

      <h2 style={S.h2}>2. Datos que recopilamos</h2>
      <p style={S.p}>En el ejercicio de nuestra actividad comercial podemos recopilar los siguientes datos personales:</p>
      <ul style={S.ul}>
        <li>Nombre completo y cargo</li>
        <li>Nombre o razón social de la empresa</li>
        <li>Correo electrónico corporativo</li>
        <li>Número de teléfono o celular</li>
        <li>Ciudad y dirección de entrega</li>
        <li>Información sobre los procesos industriales de su interés</li>
      </ul>

      <h2 style={S.h2}>3. Finalidades del tratamiento</h2>
      <p style={S.p}>Los datos recopilados se utilizan exclusivamente para:</p>
      <ul style={S.ul}>
        <li>Gestionar solicitudes de cotización, pedidos y asesoría técnica</li>
        <li>Enviar comunicaciones comerciales sobre nuestro portafolio de productos</li>
        <li>Agendar reuniones y visitas técnicas</li>
        <li>Cumplir obligaciones legales y contractuales</li>
        <li>Mejorar la calidad del servicio prestado</li>
      </ul>
      <p style={S.p}>Plasfilm no comparte, vende ni cede datos personales a terceros sin autorización previa, expresa e informada del titular, salvo obligación legal.</p>

      <h2 style={S.h2}>4. Derechos del titular</h2>
      <p style={S.p}>De acuerdo con la Ley 1581 de 2012, el titular de los datos personales tiene derecho a:</p>
      <ul style={S.ul}>
        <li><strong>Conocer</strong> los datos personales que Plasfilm almacena sobre su persona</li>
        <li><strong>Actualizar y rectificar</strong> información inexacta o incompleta</li>
        <li><strong>Solicitar la supresión</strong> de sus datos cuando resulte procedente</li>
        <li><strong>Revocar</strong> la autorización de tratamiento en cualquier momento</li>
        <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC)</li>
      </ul>
      <p style={S.p}>Para ejercer cualquiera de estos derechos, el titular deberá enviar una solicitud escrita al correo <strong>plasfilmsas@gmail.com</strong>, indicando nombre completo, descripción de la solicitud y datos de contacto. Plasfilm dará respuesta en un término máximo de diez (10) días hábiles.</p>

      <h2 style={S.h2}>5. Seguridad de la información</h2>
      <p style={S.p}>Plasfilm adopta medidas técnicas y administrativas razonables para proteger los datos personales contra pérdida, acceso no autorizado, divulgación indebida o alteración. No obstante, ningún sistema de transmisión de datos por internet es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.</p>

      <h2 style={S.h2}>6. Conservación de datos</h2>
      <p style={S.p}>Los datos personales se conservarán por el tiempo necesario para cumplir con la finalidad que motivó su recopilación y las obligaciones legales aplicables. Una vez cumplida la finalidad, los datos serán suprimidos de forma segura.</p>

      <h2 style={S.h2}>7. Modificaciones a esta política</h2>
      <p style={S.p}>Plasfilm se reserva el derecho de actualizar la presente política en cualquier momento. Los cambios serán publicados en este sitio web con indicación de la fecha de última actualización. El uso continuado del sitio web implica la aceptación de las modificaciones realizadas.</p>

      <h2 style={S.h2}>8. Contacto</h2>
      <p style={S.p}>Para consultas relacionadas con el tratamiento de sus datos personales, comuníquese con nosotros a través de <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a>.</p>
    </LegalLayout>
  );
}
