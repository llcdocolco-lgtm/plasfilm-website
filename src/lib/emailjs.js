let _initialized = false;

function getEmailJS() {
  if (window.emailjs) return Promise.resolve(window.emailjs);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    s.onload = () => resolve(window.emailjs);
    s.onerror = () => reject(new Error('No se pudo cargar EmailJS'));
    document.head.appendChild(s);
  });
}

export async function sendEmail(serviceId, templateId, params) {
  const ejs = await getEmailJS();
  if (!_initialized) {
    ejs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    _initialized = true;
  }
  return ejs.send(serviceId, templateId, params);
}
