export async function sendEmail(serviceId, templateId, params) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:      serviceId,
      template_id:     templateId,
      user_id:         import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS error: ${res.status}`);
  return res;
}
