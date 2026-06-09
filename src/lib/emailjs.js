const emailjs = window.emailjs || {
  send: () => Promise.reject(new Error('EmailJS no disponible')),
};

export default emailjs;
