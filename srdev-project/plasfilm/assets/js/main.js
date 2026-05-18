/* PLASFILM S.A.S. — main.js */

/* ── NAV scroll effect & active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  // Update active link
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ── Hamburger ── */
const ham = document.getElementById('hamburger');
const nl = document.getElementById('navLinks');
ham.addEventListener('click', () => {
  nl.classList.toggle('open');
  const spans = ham.querySelectorAll('span');
  const isOpen = nl.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Product filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const match = f === 'all' || c.dataset.cat === f;
      c.dataset.hidden = !match;
    });
  });
});

/* ── Product Modal ── */
const overlay = document.getElementById('modalOverlay');
const mCat    = document.getElementById('mCat');
const mName   = document.getElementById('mName');
const mBody   = document.getElementById('mBody');
const mSpecs  = document.getElementById('mSpecs');

cards.forEach(card => {
  card.addEventListener('click', () => {
    mCat.textContent  = card.dataset.cat.charAt(0).toUpperCase() + card.dataset.cat.slice(1);
    mName.textContent = card.dataset.name;
    mBody.textContent = card.dataset.desc;
    // Build specs
    mSpecs.innerHTML = '';
    card.dataset.specs.split('|').forEach(spec => {
      const [k, v] = spec.split(':');
      if (k && v) {
        const dt = document.createElement('dt'); dt.textContent = k.trim();
        const dd = document.createElement('dd'); dd.textContent = v.trim();
        mSpecs.append(dt, dd);
      }
    });
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Contact Form ── */
document.getElementById('contactSubmit').addEventListener('click', () => {
  const email = document.getElementById('cEmail').value.trim();
  if (!email) { document.getElementById('cEmail').focus(); return; }
  document.getElementById('contactSubmit').textContent = 'Enviando...';
  setTimeout(() => {
    document.getElementById('contactSubmit').style.display = 'none';
    document.getElementById('contactSuccess').classList.add('show');
  }, 900);
});

/* ── Booking Form + step indicator ── */
const bookingFields = ['bProducto', 'bFecha', 'bHora'];
function updateSteps() {
  const prod = document.getElementById('bProducto').value;
  const fecha = document.getElementById('bFecha').value;
  const hora  = document.getElementById('bHora').value;
  document.getElementById('step1').classList.toggle('active', true);
  document.getElementById('step2').classList.toggle('active', !!prod);
  document.getElementById('step3').classList.toggle('active', !!(prod && fecha && hora));
}
['bProducto','bFecha','bHora'].forEach(id => {
  document.getElementById(id).addEventListener('change', updateSteps);
});

document.getElementById('bookingSubmit').addEventListener('click', () => {
  const nombre = document.getElementById('bNombre').value.trim();
  const email  = document.getElementById('bEmail').value.trim();
  if (!nombre || !email) {
    if (!nombre) document.getElementById('bNombre').focus();
    else document.getElementById('bEmail').focus();
    return;
  }
  document.getElementById('bookingSubmit').textContent = 'Confirmando...';
  setTimeout(() => {
    document.getElementById('bookingSubmit').style.display = 'none';
    document.getElementById('bookingSuccess').classList.add('show');
    document.getElementById('step3').classList.add('active');
  }, 900);
});

/* ── Set min date for booking ── */
const today = new Date().toISOString().split('T')[0];
document.getElementById('bFecha').setAttribute('min', today);