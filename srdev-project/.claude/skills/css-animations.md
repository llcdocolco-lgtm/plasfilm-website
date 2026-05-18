---
name: css-animations
description: >
  Animaciones CSS y JS vanilla para proyectos SR.DEV sin librerías.
  Usar cuando se pidan: scroll reveal, contadores, parallax, loader,
  cursor personalizado, progress bar, stagger, hover magnético.
  Paleta siempre olive. Sin GSAP, sin Anime.js.
---

# Skill: CSS Animations Vanilla — SR.DEV

## 1. Scroll Reveal + Stagger
```css
.reveal { opacity:0; transform:translateY(22px); transition:.6s; }
.reveal.in { opacity:1; transform:none; }
@media (prefers-reduced-motion:reduce) {
  .reveal { transition:opacity .3s; transform:none!important; }
}
```
```javascript
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
```

## 2. Scroll Progress Bar (olive)
```css
#scroll-line {
  position:fixed; top:0; left:0; z-index:200;
  height:2px; width:0%;
  background:linear-gradient(90deg, var(--olive-dim), var(--olive));
}
```
```javascript
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  document.getElementById('scroll-line').style.width =
    (window.scrollY/total*100) + '%';
}, { passive:true });
```

## 3. Cursor personalizado (solo desktop)
```javascript
const cursor = document.getElementById('cursor');
if (window.innerWidth > 900) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,.service-card,.project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}
```

## 4. Hover magnético en CTAs
```javascript
document.querySelectorAll('.btn-primary,.btn-ghost,.nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*.18}px,${y*.28}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform='');
});
```

## 5. Loader splash (olive)
```css
#loader { position:fixed; inset:0; z-index:999;
  background:var(--black);
  display:flex; align-items:center; justify-content:center;
  transition:opacity .6s, visibility .6s; }
#loader.hidden { opacity:0; visibility:hidden; }
.loader-bar { width:180px; height:2px; background:rgba(107,122,62,.15); position:relative; overflow:hidden; }
.loader-bar::after { content:''; position:absolute; top:0; left:-100%;
  width:100%; height:100%;
  background:linear-gradient(90deg,var(--olive-dim),var(--olive));
  animation:load 1.2s ease forwards; }
@keyframes load { to { left:0; } }
```
```javascript
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 1400);
});
```

## 6. Parallax sutil hero (solo desktop)
```javascript
if (window.innerWidth > 900) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hc = document.querySelector('.hero-content');
    if (hc) hc.style.transform = `translateY(${y*.12}px)`;
  }, { passive:true });
}
```

## Performance checklist
- [ ] `{ passive:true }` en todos los scroll listeners
- [ ] Animar solo `transform` y `opacity` (GPU)
- [ ] `IntersectionObserver` en lugar de scroll + getBoundingClientRect
- [ ] `will-change:transform` solo en elementos que realmente animan
- [ ] `prefers-reduced-motion` siempre respetado
