# /deploy-check
Valida que un sitio esté listo para mostrar al cliente.

Revisa en el index.html indicado:
1. ✅ Meta charset UTF-8 y viewport presentes
2. ✅ Título correcto (no "Untitled" ni placeholder)
3. ✅ Datos de contacto reales de Samuel (no lorem ipsum)
   - WhatsApp: +57 304 353 8450
   - Email: samueldavidvida@gmail.com
4. ✅ Paleta SR.DEV aplicada — sin naranja (#F05A22) ni azul (#1A2FA8)
5. ✅ Google Fonts cargando (Bebas Neue + DM Sans)
6. ✅ Links de nav funcionan (todos los href="#seccion" existen)
7. ✅ Sin texto placeholder ("Lorem ipsum", "TODO", "CAMBIAR")
8. ✅ Logo SVG SR.DEV presente en el nav
9. ✅ CTA principal apunta a WhatsApp real
10. ✅ assets/css/styles.css y assets/js/main.js referenciados

Reporta cada punto con ✅ o ❌ y sugiere el fix exacto si hay problemas.
Al final: "Listo para mostrar al cliente" o lista de fixes pendientes.
