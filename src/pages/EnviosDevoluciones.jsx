import LegalLayout from '../components/ui/LegalLayout';

const S = {
  h2: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.7rem', color: 'var(--orange)', letterSpacing: '.04em', margin: '2.5rem 0 .8rem' },
  p: { color: 'var(--muted)', lineHeight: 1.85, fontSize: '.96rem', marginBottom: '.9rem' },
  ul: { color: 'var(--muted)', lineHeight: 1.85, fontSize: '.96rem', paddingLeft: '1.4rem', marginBottom: '.9rem' },
  tag: { display: 'inline-block', background: 'rgba(26,47,168,.08)', border: '1px solid rgba(26,47,168,.2)', color: 'var(--blue)', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.2rem .7rem', marginBottom: '1.5rem' },
  divider: { border: 'none', borderTop: '1px solid var(--mid)', margin: '2rem 0' },
  box: { background: 'rgba(240,90,34,.06)', border: '1px solid rgba(240,90,34,.2)', padding: '1.2rem 1.5rem', marginBottom: '1.2rem' },
};

export default function EnviosDevoluciones() {
  return (
    <LegalLayout
      title="Política de Envíos y Devoluciones"
      subtitle="Última actualización: junio de 2026"
    >
      <div style={S.tag}>Ley 1480 de 2011 · Estatuto del Consumidor</div>

      <p style={S.p}>
        La presente política describe las condiciones de despacho, entrega y devolución aplicables a los productos comercializados por <strong>Plasfilm S.A.S.</strong> en el territorio colombiano. Al realizar una solicitud de compra, el cliente acepta las condiciones aquí establecidas.
      </p>

      <hr style={S.divider} />

      <h2 style={S.h2}>1. Zona de cobertura</h2>
      <p style={S.p}>Plasfilm S.A.S. despacha sus productos a todo el territorio nacional colombiano. Los envíos se realizan desde nuestra bodega ubicada en Bogotá D.C.</p>

      <h2 style={S.h2}>2. Tiempos de entrega</h2>
      <div style={S.box}>
        <p style={{ ...S.p, marginBottom: '.4rem', color: 'var(--text)' }}><strong>Bogotá D.C. y municipios aledaños</strong></p>
        <p style={{ ...S.p, marginBottom: 0 }}>2 a 4 días hábiles a partir de la confirmación del pedido.</p>
      </div>
      <div style={S.box}>
        <p style={{ ...S.p, marginBottom: '.4rem', color: 'var(--text)' }}><strong>Resto del país — ciudades principales</strong></p>
        <p style={{ ...S.p, marginBottom: 0 }}>4 a 7 días hábiles (Medellín, Cali, Barranquilla, Bucaramanga, etc.).</p>
      </div>
      <div style={S.box}>
        <p style={{ ...S.p, marginBottom: '.4rem', color: 'var(--text)' }}><strong>Municipios y zonas apartadas</strong></p>
        <p style={{ ...S.p, marginBottom: 0 }}>7 a 15 días hábiles. Los tiempos pueden variar por condiciones de acceso vial o disponibilidad del transportador.</p>
      </div>
      <p style={S.p}>Los tiempos indicados son estimativos y pueden verse afectados por situaciones de fuerza mayor, festivos nacionales, restricciones de movilidad o condiciones ajenas a Plasfilm.</p>

      <h2 style={S.h2}>3. Proceso de despacho</h2>
      <p style={S.p}>Una vez confirmado el pago o aprobado el crédito comercial, el equipo de Plasfilm procederá a:</p>
      <ul style={S.ul}>
        <li>Verificar disponibilidad del producto en inventario</li>
        <li>Coordinar el embalaje adecuado según la naturaleza del insumo químico</li>
        <li>Gestionar el servicio de transporte con el operador logístico correspondiente</li>
        <li>Compartir el número de guía o seguimiento al correo registrado por el cliente</li>
      </ul>
      <p style={S.p}>Para pedidos de gran volumen (IBC 1000 L, varias toneladas), las condiciones y tiempos de entrega se acordarán de forma directa con el cliente mediante cotización formal.</p>

      <h2 style={S.h2}>4. Condiciones para devoluciones</h2>
      <p style={S.p}>Plasfilm S.A.S. aceptará devoluciones únicamente en los siguientes casos:</p>
      <ul style={S.ul}>
        <li><strong>Producto defectuoso o en mal estado:</strong> el cliente deberá notificar dentro de los cinco (5) días hábiles siguientes a la recepción, adjuntando evidencia fotográfica.</li>
        <li><strong>Producto diferente al solicitado:</strong> error en el despacho imputable a Plasfilm, notificado dentro de los cinco (5) días hábiles.</li>
        <li><strong>Incumplimiento de especificaciones técnicas documentadas:</strong> acordadas previamente por escrito en la cotización.</li>
      </ul>
      <p style={S.p}>No se aceptarán devoluciones por cambio de decisión del cliente, variaciones en el proceso productivo no comunicadas al momento del pedido, ni por productos correctamente despachados según la orden de compra.</p>

      <h2 style={S.h2}>5. Proceso de devolución</h2>
      <p style={S.p}>Para iniciar una devolución, el cliente deberá:</p>
      <ul style={S.ul}>
        <li>Enviar un correo a <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a> con asunto <strong>"Solicitud de devolución"</strong></li>
        <li>Incluir: número de pedido o factura, descripción del inconveniente y evidencia fotográfica</li>
        <li>Aguardar confirmación y autorización escrita de Plasfilm antes de realizar el envío de retorno</li>
        <li>El producto debe ser devuelto en su embalaje original, sin uso adicional y en las mismas condiciones en que fue recibido</li>
      </ul>
      <p style={S.p}>Los costos de transporte para la devolución serán asumidos por Plasfilm S.A.S. únicamente cuando el motivo sea un error de despacho imputable a la empresa. En los demás casos aceptados, los costos serán acordados caso a caso.</p>

      <h2 style={S.h2}>6. Reembolsos</h2>
      <p style={S.p}>Una vez aprobada la devolución y verificado el estado del producto:</p>
      <ul style={S.ul}>
        <li>Se procederá al reembolso total o parcial según corresponda, mediante el mismo medio de pago utilizado en la transacción original</li>
        <li>El plazo para efectuar el reembolso es de hasta quince (15) días hábiles a partir de la recepción y verificación del producto devuelto</li>
        <li>Alternativamente, y según acuerdo con el cliente, podrá efectuarse un cambio por otro producto del portafolio de igual valor</li>
      </ul>

      <h2 style={S.h2}>7. Contacto para envíos y devoluciones</h2>
      <p style={S.p}>Para cualquier inquietud relacionada con el estado de su pedido, envíos o devoluciones, contáctenos a <a href="mailto:plasfilmsas@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>plasfilmsas@gmail.com</a> o a través del formulario de contacto en nuestro sitio web.</p>
    </LegalLayout>
  );
}
