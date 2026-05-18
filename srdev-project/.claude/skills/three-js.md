---
name: three-js
description: >
  Escenas 3D con Three.js r128 vía CDN para proyectos SR.DEV.
  Usar cuando se pidan efectos 3D, partículas, pellets plásticos
  (Plasfilm), constelaciones de puntos, o cualquier hero WebGL.
  SIEMPRE CDN r128, NUNCA npm. Colores SIEMPRE de la paleta SR.DEV.
---

# Skill: Three.js — SR.DEV

## Setup obligatorio
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```
Cargarlo dinámicamente desde JS:
```javascript
const s = document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
s.onload = () => initScene(container);
document.head.appendChild(s);
```

## Colores por proyecto
- SR.DEV marca:    0x6B7A3E (olive), líneas opacity 0.07
- Portafolio serv: 0x6B7A3E (olive), igual
- Plasfilm:        0x1A2FA8 (blue) + 0xF05A22 (orange) para pellets

## Escena partículas SR.DEV (constelación)
```javascript
function initScene(container) {
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55,
    container.clientWidth/container.clientHeight, 0.1, 100);
  camera.position.z = 7;

  const count = 150;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count*3; i++) pos[i] = (Math.random()-.5)*14;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x6B7A3E, size: 0.05, transparent:true, opacity:0.75
  });
  scene.add(new THREE.Points(geo, mat));

  const mouse = { x:0, y:0 };
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX/window.innerWidth - 0.5) * 0.35;
    mouse.y = (e.clientY/window.innerHeight - 0.5) * 0.35;
  });

  new ResizeObserver(() => {
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }).observe(container);

  const pts = scene.children[0];
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate); t += 0.0006;
    pts.rotation.y += (mouse.x - pts.rotation.y) * 0.025;
    pts.rotation.x += (-mouse.y - pts.rotation.x) * 0.025;
    pts.rotation.z = t * 0.08;
    renderer.render(scene, camera);
  })();
}
```

## Escena pellets Plasfilm
Ver .claude/skills/variantes.md → sección Plasfilm 3D.

## Performance
- Max 150 partículas mobile, 200 desktop
- Siempre `Math.min(devicePixelRatio, 2)`
- Siempre `ResizeObserver` en lugar de window resize
- Solo activar si `window.innerWidth > 600`
