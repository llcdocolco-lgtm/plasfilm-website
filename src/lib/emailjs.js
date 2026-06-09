const _ejs = window.emailjs;
if (_ejs) _ejs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export default {
  send: (serviceId, templateId, params) => {
    if (!_ejs) return Promise.reject(new Error('EmailJS no cargó'));
    return _ejs.send(serviceId, templateId, params);
  },
};
