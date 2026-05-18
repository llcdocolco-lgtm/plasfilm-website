---
name: cult-ui
description: >
  Integración de componentes Cult UI (nolly-studio/cult-ui) sin npm,
  adaptados a la paleta SR.DEV. Usar cuando se pidan: TextAnimate,
  Typewriter, Animated Number, Border Beam, Shift Card, o cualquier
  componente animado de cult-ui.com. Siempre adaptar colores a olive.
---

# Skill: Cult UI Components — SR.DEV

## TextAnimate (blur-in / slide-up / split)
```javascript
function textAnimate(el, effect='blur-in', delay=0) {
  const text = el.textContent; el.textContent = '';
  if (effect === 'blur-in') {
    el.textContent = text;
    el.style.cssText += `opacity:0;filter:blur(10px);
      transition:opacity .7s ${delay}s,filter .7s ${delay}s`;
    requestAnimationFrame(() => { el.style.opacity='1'; el.style.filter='none'; });
  } else if (effect === 'slide-up') {
    el.textContent = text;
    el.style.cssText += `opacity:0;transform:translateY(28px);
      transition:opacity .6s ${delay}s,transform .6s ${delay}s`;
    requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='none'; });
  }
}
// Activar con IntersectionObserver en [data-animate]
```

## Animated Number
```javascript
function animateNumber(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const dur = parseInt(el.dataset.duration || 2000);
  const start = performance.now();
  function update(now) {
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = prefix + Math.round(eased*target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

## Border Beam Button (borde animado — paleta olive)
```css
.border-beam {
  position:relative; overflow:hidden;
  border:1px solid rgba(107,122,62,0.3);
  color:var(--olive);
  background:transparent; padding:.85rem 1.8rem;
  font-weight:700; cursor:none;
}
.border-beam::before {
  content:''; position:absolute; inset:-2px;
  background:conic-gradient(from var(--a,0deg),
    transparent 0%,#6B7A3E 10%,transparent 20%);
  animation:beam 2.5s linear infinite; z-index:-1;
}
.border-beam::after {
  content:''; position:absolute; inset:1.5px;
  background:var(--black); z-index:-1;
}
@property --a { syntax:'<angle>'; inherits:false; initial-value:0deg; }
@keyframes beam { to { --a:360deg; } }
```

## Shift Card (hover 3D)
```javascript
document.querySelectorAll('.shift-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - 0.5;
    const y = (e.clientY-r.top)/r.height - 0.5;
    card.style.transform =
      `perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform='');
});
```

## Regla de adaptación
Cualquier componente de cult-ui.com:
1. Copiar lógica de animación
2. Reemplazar colores por --olive, --olive-light, --gold
3. Reemplazar Framer Motion por transitions CSS + JS vanilla
4. Probar en variaciones/{nombre}/ antes de merge a main
