import LegalLayout from '../components/ui/LegalLayout';

const S = {
  h2: { fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.7rem', color: 'var(--color-dark)', margin: '2.5rem 0 .8rem' },
  p: { fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.85, fontSize: '.96rem', marginBottom: '.9rem' },
  ul: { fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)', lineHeight: 1.85, fontSize: '.96rem', paddingLeft: '1.4rem', marginBottom: '.9rem' },
  tag: { display: 'inline-block', background: 'rgba(26,47,168,0.08)', border: '1px solid rgba(26,47,168,0.2)', color: 'var(--color-primary)', fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.2rem .7rem', marginBottom: '1.5rem' },
  divider: { border: 'none', borderTop: '1px solid var(--color-border)', margin: '2rem 0' },
};

export default function TerminosCondiciones() {
  return (
    <LegalLayout
      title="Términos y Condiciones de Uso"
      subtitle="Última actualización: junio de 2026"
    >
      <div style={S.tag}>Ley 1480 de 2011 · Estatuto del Consumidor</div>

      <p style={S.p}>
        Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de <strong>Plasfilm S.A.S.</strong> Al ingresar y utilizar este sitio, el usuario declara haber leído, comprendido y aceptado íntegramente las condiciones aquí establecidas. Si no está de acuerdo con alguna de ellas, le solicitamos abstenerse de utilizar el sitio.
      </p>

      <hr style={S.divider} />

      <h2 style={S.h2}>1. Objeto</h2>
      <p style={S.p}>El presente sitio web tiene como propósito presentar el portafolio de insumos químicos de Plasfilm S.A.S. para la industria plástica colombiana, facilitar el contacto con clientes y empresas del sector, y ofrecer información técnica sobre los productos comercializados.</p>

      <h2 style={S.h2}>2. Uso permitido</h2>
      <p style={S.p}>El usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral y las buenas costumbres. Queda expresamente prohibido:</p>
      <ul style={S.ul}>
        <li>Reproducir, distribuir o modificar el contenido del sitio sin autorización expresa de Plasfilm</li>
        <li>Utilizar el sitio con fines ilícitos o que puedan causar daño a terceros</li>
        <li>Transmitir virus, código malicioso o cualquier elemento que pueda dañar los sistemas informáticos</li>
        <li>Realizar acciones que sobrecarguen indebidamente la infraestructura del sitio</li>
      </ul>

      <h2 style={S.h2}>3. Propiedad intelectual</h2>
      <p style={S.p}>Todos los contenidos del sitio web —incluyendo textos, imágenes, logotipos, diseño gráfico y código fuente— son propiedad de Plasfilm S.A.S. o de terceros que han autorizado su uso, y están protegidos por las leyes colombianas e internacionales de propiedad intelectual. Su reproducción total o parcial sin autorización escrita está prohibida.</p>

      <h2 style={S.h2}>4. Exactitud de la información</h2>
      <p style={S.p}>Plasfilm procura mantener la información del sitio actualizada y precisa. No obstante, las especificaciones técnicas de los productos pueden estar sujetas a variaciones sin previo aviso. Para información técnica vinculante, el usuario deberá solicitar una cotización formal o comunicarse directamente con nuestro equipo comercial.</p>

      <h2 style={S.h2}>5. Limitación de responsabilidad</h2>
      <p style={S.p}>Plasfilm S.A.S. no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del sitio web, incluyendo interrupciones técnicas, errores en la información o accesos no autorizados. El uso del sitio se realiza por cuenta y riesgo del usuario.</p>

      <h2 style={S.h2}>6. Tasa de cambio USD/COP</h2>
      <p style={S.p}>El indicador de tasa de cambio USD/COP visible en el sitio se obtiene de fuentes de acceso público con fines informativos. Plasfilm S.A.S. no garantiza la exactitud en tiempo real de dicho dato y no asume responsabilidad por decisiones comerciales basadas en él. Para operaciones de importación, consulte siempre la TRM oficial del Banco de la República de Colombia.</p>

      <h2 style={S.h2}>7. Relaciones comerciales</h2>
      <p style={S.p}>Plasfilm S.A.S. opera principalmente en el segmento B2B (empresa a empresa). Las condiciones comerciales específicas —precios, plazos de entrega, descuentos y modalidades de pago— se establecen mediante cotizaciones formales emitidas directamente por nuestro equipo. El contenido del sitio no constituye oferta mercantil vinculante.</p>

      <h2 style={S.h2}>8. Modificaciones</h2>
      <p style={S.p}>Plasfilm se reserva el derecho de modificar los presentes términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. Es responsabilidad del usuario revisar periódicamente las actualizaciones.</p>

      <h2 style={S.h2}>9. Legislación aplicable y jurisdicción</h2>
      <p style={S.p}>Los presentes términos se rigen por las leyes de la República de Colombia. Para cualquier controversia derivada del uso del sitio, las partes se someten a la jurisdicción de los jueces competentes de la ciudad de Bogotá D.C., renunciando expresamente a cualquier otro fuero que pudiera corresponderles.</p>

      <h2 style={S.h2}>10. Contacto</h2>
      <p style={S.p}>Para consultas sobre estos términos, comuníquese a <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a>.</p>
    </LegalLayout>
  );
}
