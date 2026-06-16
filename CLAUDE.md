# CLAUDE.md — Plasfilm S.A.S.

Contexto completo del proyecto. **Lee este archivo antes de tocar cualquier archivo del repo.**  
Versión: 2.0 — Identidad corporativa tradicional B2B + efectos visuales premium selectivos.

---

## 1. Proyecto

**Plasfilm S.A.S.** — Distribuidor colombiano de insumos químicos especializados para la industria plástica y del caucho. Sede en Bogotá, operando desde 2010. Mercado 100% B2B industrial.

- **Posicionamiento:** Proveedor técnico premium. Compite por pureza, consistencia y asesoría, no por precio.
- **Relación corporativa:** Empresa vinculada a Docolco LLC (Estados Unidos).
- **URL producción:** https://plasfilm.netlify.app/
- **Deploy:** Netlify, 100% estático. SPA redirect `/* → /index.html` (netlify.toml).

---

## 2. Stack técnico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | React 18.3 + Vite 5 | Sin TypeScript, sin Next.js |
| Rutas | react-router-dom v6 | Páginas legales en /pages |
| Animaciones | framer-motion 11 | Ya instalado, usar para transiciones |
| 3D | three + @react-three/fiber + @react-three/drei | Solo en Hero (PolymerScene) |
| Notificaciones | react-hot-toast | Confirmaciones de formulario |
| Email | EmailJS REST API | Sin backend, fetch directo |
| CSS | Inline styles + `:root` en `src/index.css` | **Sin Tailwind. Sin CSS Modules.** |
| Tipografías actuales | Bebas Neue, DM Sans, JetBrains Mono | Google Fonts — cambiar (ver §5) |

> ⚠️ El proyecto **no usa Tailwind**. Los componentes de 21dev que se integran usan clases Tailwind en su código fuente original — hay que **convertir todas las clases Tailwind a estilos inline** antes de pegarlos. Ver §9 para instrucciones de conversión.

---

## 3. Estructura del repo

```
src/
  components/
    layout/         ← Navbar.jsx, Footer.jsx
    sections/       ← Hero.jsx, About.jsx, Portfolio.jsx, Contact.jsx, Reserva.jsx, Ticker.jsx
    portfolio/      ← ProductCard.jsx, ProductModal.jsx
    ui/             ← Componentes reutilizables
      BackgroundPaths.jsx   ← NUEVO: efecto flotante (21dev) para Reserva
      SmokeBackground.jsx   ← NUEVO: efecto humo WebGL (21dev) para About y Portfolio
    three/          ← PolymerScene.jsx (escena 3D Hero — conservar)
  pages/            ← PrivacyPolicy.jsx, Terms.jsx, Shipping.jsx → LegalLayout
  data/
    products.js     ← FUENTE DE VERDAD del catálogo. No duplicar en otro lado.
  hooks/
  lib/
    emailjs.js      ← Credenciales vía .env

assets/    ← CÓDIGO MUERTO (sitio viejo). No tocar, no borrar.
dist/      ← CÓDIGO MUERTO (build commiteado). No tocar, no borrar.
emailjs-template.html  ← No modificar.
```

**Eliminar:** `src/components/ui/PaperBackground.jsx` — experimento sin usar, borrar sin reemplazar.

---

## 4. Assets de marca

| Asset | Estado | Instrucción |
|---|---|---|
| `logo.jpeg` | Raster 148KB, no vectorial | Mostrar con `object-fit: contain`. No aplicar filtros CSS. |
| Fotos de producto | No existen | Usar iconos Lucide (ver §8). Sin emojis. |
| `MolecularBackground` | canvas 2D, colores hardcodeados | Migrar colores a variables nuevas (ver §6) |
| `AuroraBackground` | gradientes hardcodeados | Migrar a paleta nueva o eliminar si no queda bien |
| `PolymerScene` | Three.js Hero | Conservar, solo ajustar colores a paleta nueva |
| `PaperBackground.jsx` | Sin usar | **Eliminar** |

---

## 5. Sistema tipográfico — NUEVO

Eliminar Bebas Neue. Cambiar las importaciones en `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&family=Inter:wght@400;500&display=swap');
```

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Títulos H1–H4 | `Montserrat` | 800 (ExtraBold) | Encabezados de sección, nombre de producto en cards |
| Cuerpo y UI | `Inter` | 400 / 500 | Párrafos, labels, botones, inputs |
| Datos técnicos | `Inter` | 500 | Specs, tablas, temperaturas, phr, empaques |

> JetBrains Mono se **elimina** del uso general. Si se conserva algo de la escena 3D que lo requiera, solo allí.

---

## 6. Paleta de colores oficial — IDENTIDAD CORPORATIVA

Reemplaza **todas** las variables en `src/index.css`:

```css
:root {
  /* Primarios de marca */
  --color-primary:    #1A2FA8;   /* Azul Industrial — CTAs, navbar, encabezados */
  --color-secondary:  #D12E2E;   /* Rojo Químico — hover activo, alertas, certificaciones */
  --color-dark:       #15206B;   /* Oscuro Corporativo — texto principal, párrafos */

  /* Fondos */
  --color-bg-light:   #F5F5F2;   /* Gris Técnico — fondo de secciones alternas */
  --color-white:      #FFFFFF;   /* Blanco puro — fondo principal, cards */

  /* Soporte */
  --color-border:     #D8D8D8;   /* Bordes de cards y tablas */
  --color-muted:      #6B7280;   /* Texto secundario, placeholders */
  --color-primary-hover: #142380; /* Azul primario oscurecido para hover */
}
```

**Regla de fondos por sección (alternancia):**
- Hero → `--color-primary` (azul oscuro con texto blanco)
- Ticker → `--color-primary` fila 1, `--color-secondary` fila 2
- About → `--color-bg-light`
- Portfolio → `--color-white`
- Reserva → `--color-bg-light`
- Contact → `--color-white`
- Footer → `--color-dark`

**Después de cambiar variables:** hacer grep de todos los hex hardcodeados en componentes y migrar. Especialmente `AuroraBackground.jsx` y `MolecularBackground.jsx`.

---

## 7. Guía de componentes (rediseño completo)

### 7.1 Navbar
```js
{
  background: 'var(--color-white)',
  borderBottom: '2px solid var(--color-primary)',
  boxShadow: '0 2px 8px rgba(26,47,168,0.08)',
  position: 'sticky', top: 0, zIndex: 100,
}
// Logo: img src="logo.jpeg", height 48px, object-fit contain
// Links: color var(--color-dark), fontFamily Inter, fontWeight 500
// Links hover: color var(--color-primary)
// CTA "Cotizar": bg var(--color-primary), color white, borderRadius 6px,
//   padding '10px 20px', fontWeight 600, hover bg var(--color-primary-hover)
```

### 7.2 Hero
```js
// Sección principal:
{ background: 'var(--color-primary)', color: 'var(--color-white)', minHeight: '100vh' }

// Badge: border '1px solid rgba(255,255,255,0.3)', color white, bg rgba(255,255,255,0.1)
//        fontFamily Inter, fontSize 12px, letterSpacing '0.06em'

// H1: fontFamily Montserrat, fontWeight 800, fontSize clamp(2.5rem,5vw,4rem)
//     color white, lineHeight 1.1

// Párrafo: color rgba(255,255,255,0.8), fontFamily Inter, fontSize 1.05rem

// CTA primario: bg white, color var(--color-primary), fontWeight 700
//   hover: bg var(--color-bg-light)
// CTA ghost: border '2px solid rgba(255,255,255,0.5)', color white
//   hover: bg rgba(255,255,255,0.1)

// Contadores: número en white (Montserrat 800), label en rgba(255,255,255,0.6)
//   separador borderLeft '2px solid rgba(255,255,255,0.2)'
```

### 7.3 Ticker
```js
// Fila 1 (→): bg var(--color-primary), color white, fontFamily Inter, fontWeight 600
// Fila 2 (←): bg var(--color-secondary), color white, fontFamily Inter, fontWeight 600
// Separador entre productos: ' · '
// fontSize 13px, letterSpacing '0.04em', padding '10px 0'
```

### 7.4 Cards de producto (Portfolio)
```js
{
  background: 'var(--color-white)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.2s ease',
}
// Hover: borderColor var(--color-primary), boxShadow '0 4px 20px rgba(26,47,168,0.15)'
//        transform 'translateY(-2px)'
```

**Íconos de producto** — reemplazar emojis por íconos Lucide según categoría:
- `Plastificante` → `<Droplets />` (color `var(--color-primary)`)
- `Estabilizante` → `<ShieldCheck />` (color `var(--color-secondary)`)
- `Aditivo` → `<FlaskConical />` (color `var(--color-muted)`)

**Nombre producto:** Montserrat 800, `var(--color-dark)`, 16px  
**Badge de categoría:**
- Plastificante → bg `rgba(26,47,168,0.08)`, color `var(--color-primary)`, border `1px solid rgba(26,47,168,0.2)`
- Estabilizante → bg `rgba(209,46,46,0.08)`, color `var(--color-secondary)`, border `1px solid rgba(209,46,46,0.2)`
- Aditivo → bg `rgba(107,114,128,0.08)`, color `var(--color-muted)`, border `1px solid var(--color-border)`

**Specs en modal:** Inter 500, tabla con `border-top: 1px solid var(--color-border)`, fondo `var(--color-bg-light)` en filas alternas.

**Botón "Solicitar cotización":** bg `var(--color-primary)`, color white, hover bg `var(--color-secondary)`.

### 7.5 About
```js
// Fondo sección: var(--color-bg-light)
// Título: Montserrat 800, var(--color-dark)
// Tags: bg white, border '1px solid var(--color-border)', color var(--color-primary)
//       borderRadius 20px, fontFamily Inter, fontSize 12px, fontWeight 500
// Fondo visual: SmokeBackground con smokeColor="#1A2FA8" (ver §9.2)
//   Colocar como fondo absoluto con opacity 0.07, pointer-events none
```

### 7.6 Reserva (Booking)
```js
// Fondo sección: var(--color-bg-light)
// Efecto de fondo: BackgroundPaths (ver §9.1) — colocar como capa absoluta detrás del formulario
// Card del formulario: bg white, border '1px solid var(--color-border)',
//   borderRadius 12px, boxShadow '0 4px 24px rgba(26,47,168,0.1)'
// Inputs: border '1px solid var(--color-border)', borderRadius 6px,
//   focus borderColor var(--color-primary), color var(--color-dark)
// Botón submit: bg var(--color-primary), color white, hover bg var(--color-primary-hover)
```

### 7.7 Contact
```js
// Fondo: var(--color-white)
// Inputs: mismos estilos que Reserva
// Info de contacto: ícono Lucide en var(--color-primary), texto en var(--color-dark)
// Submit: bg var(--color-primary), color white
```

### 7.8 Footer
```js
{
  background: 'var(--color-dark)',
  color: 'rgba(255,255,255,0.7)',
  borderTop: '4px solid var(--color-primary)',
}
// Logo: mostrar con filter brightness(0) invert(1) para versión blanca
// Links: color rgba(255,255,255,0.6), hover color white
// Línea institucional (OBLIGATORIA, texto pequeño):
//   "Plasfilm S.A.S. es una empresa vinculada a Docolco LLC (Estados Unidos)."
//   fontFamily Inter, fontSize 12px, color rgba(255,255,255,0.4)
// Copyright: Inter 12px, rgba(255,255,255,0.4)
// IMPORTANTE: Los href de redes sociales y WhatsApp son placeholders —
//   NO cambiar hasta tener URLs reales del cliente.
```

### 7.9 LegalLayout
```js
// bg var(--color-bg-light)
// Texto: var(--color-dark)
// NO tocar el contenido textual de ninguna página legal.
```

---

## 8. Íconos — Lucide React

Instalar si no está: `npm install lucide-react`

Íconos a usar por contexto:

| Contexto | Ícono Lucide |
|---|---|
| Plastificante | `Droplets` |
| Estabilizante | `ShieldCheck` |
| Aditivo / genérico | `FlaskConical` |
| Email / contacto | `Mail` |
| Dirección | `MapPin` |
| Teléfono / WhatsApp | `Phone` |
| Año / experiencia | `Calendar` |
| Clientes | `Users` |
| Calidad / certificación | `Award` |
| Descargar ficha técnica | `Download` |
| Flecha CTA | `ArrowRight` |

**Tamaño estándar:** 20px inline, 24px en cards, 32px en secciones hero/about.  
**Color:** siempre heredado del padre o explícito con `color` CSS. Nunca hardcodeado en el atributo `stroke`.

---

## 9. Efectos visuales de 21dev — integración sin Tailwind

El proyecto no usa Tailwind. Los efectos deben convertirse a estilos inline.  
Crear los archivos en `src/components/ui/`.

### 9.1 BackgroundPaths — para sección Reserva

**Archivo:** `src/components/ui/BackgroundPaths.jsx`

Convierte las clases Tailwind del componente original así:

```jsx
// ORIGINAL (Tailwind):  className="absolute inset-0 pointer-events-none"
// CONVERTIDO (inline):  style={{ position:'absolute', inset:0, pointerEvents:'none' }}

// ORIGINAL:  className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
// CONVERTIDO: style={{ position:'relative', minHeight:'100%', width:'100%',
//              display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}
```

Exportar como `BackgroundPaths` y aceptar prop `title` (string) igual que el original.

**Uso en Reserva.jsx:**
```jsx
import { BackgroundPaths } from '../ui/BackgroundPaths';

// Dentro del JSX de Reserva, como primer hijo del wrapper:
<div style={{ position:'relative' }}>
  <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.35, pointerEvents:'none' }}>
    <BackgroundPaths title="" />
  </div>
  <div style={{ position:'relative', zIndex:1 }}>
    {/* Contenido del formulario de reserva */}
  </div>
</div>
```

**Ajuste de colores** — las paths del SVG deben usar el azul de marca:
```js
// En FloatingPaths, cambiar el color de los paths:
color: `rgba(26,47,168,${0.03 + i * 0.015})`
// stroke="currentColor" heredará el color del svg
// En el svg, añadir: style={{ color: 'var(--color-primary)' }}
```

**Dependencias necesarias:**
```bash
npm install framer-motion  # ya instalado
npm install @radix-ui/react-slot class-variance-authority  # para el Button del componente
```

El `Button` de shadcn que usa internamente BackgroundPaths — adaptarlo como componente inline simple en JSX sin TypeScript ni shadcn, ya que el proyecto no tiene esa estructura. Crear un botón equivalente:
```jsx
// Reemplazar el <Button> shadcn por:
<button style={{
  borderRadius: '12px', padding: '12px 32px', fontSize: '16px', fontWeight: 600,
  backdropFilter: 'blur(8px)', background: 'rgba(26,47,168,0.85)',
  color: 'white', border: '1px solid rgba(255,255,255,0.15)',
  cursor: 'pointer', transition: 'all 0.3s ease',
}}>
  Consultar disponibilidad <span style={{ marginLeft: 8 }}>→</span>
</button>
```

### 9.2 SmokeBackground (WebGL) — para About y Portfolio

**Archivo:** `src/components/ui/SmokeBackground.jsx`

El componente es puro React + WebGL (canvas), sin dependencias de UI externas. Copiar el código completo del shader y la clase `Renderer` exactamente como está. Solo cambios:

1. Renombrar el componente a `SmokeBackground` (ya lo tiene como nombre).
2. Eliminar TypeScript (interfaces, tipos) — convertir a JS puro.
3. La prop se llama `smokeColor` (string hex), default `"#808080"`.

**Uso en About.jsx:**
```jsx
import { SmokeBackground } from '../ui/SmokeBackground';

// Como capa de fondo absoluta:
<div style={{ position:'relative', overflow:'hidden' }}>
  <div style={{
    position:'absolute', inset:0, zIndex:0,
    opacity:0.06,  // muy sutil — solo textura
    pointerEvents:'none',
  }}>
    <SmokeBackground smokeColor="#1A2FA8" />
  </div>
  <div style={{ position:'relative', zIndex:1 }}>
    {/* Contenido de About */}
  </div>
</div>
```

**Uso en Portfolio.jsx:**
```jsx
// Misma estructura, pero color secundario y opacidad levemente mayor:
<SmokeBackground smokeColor="#D12E2E" />
// opacity: 0.04 en el wrapper — aún más sutil en sección con cards blancas
```

> El efecto debe sentirse como una textura atmosférica de fondo, no como un protagonista visual. Si en cualquier sección interfiere con la legibilidad del contenido, reducir opacity o eliminar.

---

## 10. Catálogo de productos — `src/data/products.js`

Fuente de verdad. No duplicar datos en componentes.

| Producto | Categoría | Uso principal | Presentación |
|---|---|---|---|
| DOP (Ftalato de Dioctilo) | Plastificante | PVC rígido/flexible, cables, pisos vinílicos | Tambores 200kg / IBC 1000L |
| Aceite de Soya Epoxidado | Plastificante | PVC flexible, films, recubrimientos | Tambores 200kg |
| DOA (Dioctil Adipato) | Plastificante | PVC flexible, resistencia al frío | Tambores 200kg |
| Estabilizante Bario/Zinc | Estabilizante | PVC flexible, cables, perfiles, hasta 200°C | Líquido y sólido |
| Estabilizante de Estaño | Estabilizante | PVC rígido transparente, tuberías | 1–2 phr |
| Alcohol Polivinilo (sin AE) | Aditivo | Adhesivos, films solubles | Sacos 25kg |
| Alcohol Polivinilo (con AE) | Aditivo | Procesos con control de espuma | Sacos 25kg |

---

## 11. Datos de contacto

```
Email:     plasfilmsas@gmail.com
Dirección: Calle 20 C No 42-60 int 3, Bogotá D.C.
WhatsApp:  wa.me/573000000000   ← PLACEHOLDER — no publicar hasta confirmar número real
Facebook:  href="#"             ← PLACEHOLDER — pendiente URL real
Instagram: href="#"             ← PLACEHOLDER — pendiente URL real
```

---

## 12. EmailJS

```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
```

Credenciales en `.env` (nunca al repo). Sin backend. Sin funciones serverless.  
No modificar `emailjs-template.html`.

---

## 13. Reglas absolutas del proyecto

1. **No tocar** `assets/` ni `dist/` en la raíz.
2. **No tocar** el contenido de las páginas legales (solo el LegalLayout wrapper).
3. **No tocar** `emailjs-template.html`.
4. **No usar Tailwind** — todo estilo es inline o en `:root`.
5. **No usar TypeScript** — el proyecto es JS puro (.jsx).
6. **No hardcodear colores** — toda referencia de color debe usar una variable CSS de §6.
7. **No usar emojis** como íconos — usar Lucide React (ver §8).
8. **No duplicar** el catálogo de productos fuera de `src/data/products.js`.
9. La línea de Docolco en el footer es **obligatoria** — no omitir.
10. Los efectos de 21dev son **capas de fondo opcionales** — si degradan legibilidad, bajar opacity antes de eliminar.

---

## 14. Checklist de implementación

### Fase 1 — Base
- [ ] Variables CSS actualizadas en `src/index.css`
- [ ] Tipografías actualizadas (Montserrat + Inter, eliminar Bebas Neue)
- [ ] Grep de colores hardcodeados → migrar a variables
- [ ] PaperBackground.jsx eliminado
- [ ] lucide-react instalado

### Fase 2 — Componentes
- [ ] Navbar rediseñado (fondo blanco, borde azul, logo limpio)
- [ ] Hero rediseñado (fondo azul primario, tipografía Montserrat)
- [ ] Ticker rediseñado (azul + rojo, Inter)
- [ ] Cards de producto (fondo blanco, íconos Lucide, badges por categoría)
- [ ] Modal de producto (tabla de specs, Inter 500)
- [ ] About rediseñado (fondo gris técnico)
- [ ] Contact rediseñado
- [ ] Footer rediseñado (fondo oscuro corporativo + línea Docolco)
- [ ] LegalLayout rediseñado

### Fase 3 — Efectos 21dev
- [ ] BackgroundPaths.jsx creado y adaptado (sin Tailwind, sin TypeScript, sin shadcn)
- [ ] BackgroundPaths integrado en sección Reserva
- [ ] SmokeBackground.jsx creado y adaptado (sin TypeScript)
- [ ] SmokeBackground integrado en About (smokeColor="#1A2FA8", opacity 0.06)
- [ ] SmokeBackground integrado en Portfolio (smokeColor="#D12E2E", opacity 0.04)

### Fase 4 — QA
- [ ] Revisar legibilidad de texto en todas las secciones con efectos activos
- [ ] Verificar responsive en mobile (los efectos WebGL no deben romper el layout)
- [ ] Confirmar que EmailJS sigue funcionando después del rediseño
- [ ] Build de producción sin errores (`npm run build`)

---

## 15. Bug fix — SmokeBackground no visible (v2.1)

### Diagnóstico

El componente original de 21dev tiene 3 problemas al integrarse en este proyecto:

1. **`className="w-full h-full block"`** en el `<canvas>` → Tailwind no está instalado → el canvas renderiza en `0×0 px` → invisible.
2. **`updateScale()` usa `window.innerWidth/innerHeight`** → el canvas toma el tamaño de la ventana completa, no de la sección donde está → desborda el layout.
3. **TypeScript en clase JS** → `private`, tipos explícitos, `as WebGL2RenderingContext` → Vite en modo `.jsx` puede fallar silenciosamente.

### Archivo correcto — `src/components/ui/SmokeBackground.jsx`

Reemplaza el archivo completo con esta versión corregida y lista para JSX puro:

```jsx
import { useEffect, useRef } from 'react';

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}
void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);
  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);
  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);
  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));
  col=mix(vec3(.08),col,min(time*.1,1.));
  col=clamp(col,.08,1.);
  O=vec4(col,1);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1],16)/255, parseInt(result[2],16)/255, parseInt(result[3],16)/255]
    : null;
}

class Renderer {
  constructor(canvas, fragmentSource) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2');
    this.color = [0.5, 0.5, 0.5];
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this._setup(fragmentSource);
    this._init();
  }

  updateColor(newColor) { this.color = newColor; }

  // FIX: usa el contenedor padre, no window
  updateScale() {
    const dpr = Math.max(1, window.devicePixelRatio);
    const parent = this.canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  _compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }

  _setup(fragmentSource) {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!this.vs || !this.fs || !program) return;
    this._compile(this.vs, vertexSrc);
    this._compile(this.fs, fragmentSource);
    this.program = program;
    gl.attachShader(program, this.vs);
    gl.attachShader(program, this.fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(program));
    }
  }

  _init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    program._resolution = gl.getUniformLocation(program, 'resolution');
    program._time      = gl.getUniformLocation(program, 'time');
    program._u_color   = gl.getUniformLocation(program, 'u_color');
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl.isProgram(program)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f(program._resolution, canvas.width, canvas.height);
    gl.uniform1f(program._time, now * 1e-3);
    gl.uniform3fv(program._u_color, this.color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export function SmokeBackground({ smokeColor = '#808080' }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) { console.warn('WebGL2 no disponible'); return; }

    const renderer = new Renderer(canvas, fragmentShaderSource);
    rendererRef.current = renderer;

    const handleResize = () => renderer.updateScale();
    handleResize();
    window.addEventListener('resize', handleResize);

    let rafId;
    const loop = (now) => { renderer.render(now); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      renderer.reset();
    };
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rgb = hexToRgb(smokeColor);
    if (rgb) renderer.updateColor(rgb);
  }, [smokeColor]);

  // FIX: estilos inline en vez de className Tailwind
  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
```

### Patrón de integración correcto

El wrapper del padre **DEBE** tener `position: absolute`, `inset: 0` y un tamaño explícito. Si el padre no tiene dimensiones, el canvas tampoco las tiene.

```jsx
// About.jsx, Portfolio.jsx, Contact.jsx — mismo patrón:
<section style={{ position: 'relative', overflow: 'hidden' }}>

  {/* Capa de humo — SIEMPRE absoluta, con width/height 100% explícitos */}
  <div style={{
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',        // ← crítico: sin esto el canvas es 0px
    zIndex: 0,
    opacity: 0.07,         // About: 0.07 | Portfolio: 0.04 | Contact: 0.05
    pointerEvents: 'none',
  }}>
    <SmokeBackground smokeColor="#1A2FA8" />
    {/* About → #1A2FA8 | Portfolio → #D12E2E | Contact → #1A2FA8 */}
  </div>

  {/* Contenido — SIEMPRE con zIndex mayor a 0 */}
  <div style={{ position: 'relative', zIndex: 1, padding: '80px 0' }}>
    {/* contenido de la sección */}
  </div>

</section>
```

### Valores de opacity por sección

| Sección | smokeColor | opacity |
|---|---|---|
| About | `#1A2FA8` | `0.07` |
| Portfolio | `#D12E2E` | `0.04` |
| Contact | `#1A2FA8` | `0.05` |

### Verificación rápida

Después de integrar, abre DevTools → Elements y confirma que el `<canvas>` tiene `width` y `height` con valores en píxeles (ej. `1920` × `600`). Si muestra `0`, el padre no tiene altura definida — revisa que la sección tenga `minHeight` o contenido que le dé altura natural.