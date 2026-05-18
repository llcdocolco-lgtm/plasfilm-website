---
name: variantes
description: >
  Gestión de variaciones visuales en proyectos SR.DEV. Usar cuando
  se quiera crear una variación nueva, comparar versiones, hacer
  merge a main, o preparar para mostrar al cliente. Define el
  workflow completo git + carpetas para iterar sin romper nada.
---

# Skill: Gestión de Variaciones — SR.DEV

## Flujo estándar
```bash
# 1. Siempre desde main
git checkout main

# 2. Nueva rama
git checkout -b feat/nombre-variacion

# 3. Claude genera la variación en su carpeta
# variaciones/nombre/index.html

# 4. Preview independiente
npx serve variaciones/nombre -p 3001

# 5a. Gustó → merge
git add -A
git commit -m "feat: descripción de la variación"
git checkout main && git merge feat/nombre-variacion

# 5b. No gustó → descarta
git checkout main
git branch -D feat/nombre-variacion
```

## Prompts listos para cada variación

### Three.js hero (partículas SR.DEV)
```
Lee .claude/skills/three-js.md. Crea variaciones/hero-3d/index.html
basándote en srdev-marca/index.html. Reemplaza el #hero-canvas por
la escena de partículas olive. Mantén todo el contenido del hero.
```

### Cult UI (TextAnimate + Border Beam)
```
Lee .claude/skills/cult-ui.md. Crea variaciones/hero-cultui/index.html.
Añade TextAnimate blur-in en todos los .section-title,
Animated Number en .stat-n, Border Beam en .btn-primary,
Shift Card en .service-card.
```

### Micro animaciones full
```
Lee .claude/skills/css-animations.md. Crea variaciones/full-anims/index.html.
Añade: loader olive 1.2s, scroll progress bar, stagger en grids,
parallax sutil en hero, cursor personalizado expandido, hover magnético.
```

### Plasfilm 3D (pellets)
```
Lee .claude/skills/three-js.md sección pellets Plasfilm.
Crea variaciones/hero-pellets/index.html en plasfilm/.
Reemplaza el SVG del hero-right por escena Three.js:
80 pellets achatados en colores Plasfilm reactivos al mouse.
```

## Comparador de variaciones
Archivo: variaciones/comparar.html
Permite ver dos variaciones lado a lado con iframes.
Al crearlo, incluir selector de: main, hero-3d, hero-cultui, full-anims.

## README por variación
Cada variaciones/{nombre}/README.md debe incluir:
- Nombre y descripción
- Stack añadido
- Sección modificada
- Estado: En prueba / Aprobada / Descartada
- Fecha
- Preview: npx serve variaciones/{nombre} -p 3001
