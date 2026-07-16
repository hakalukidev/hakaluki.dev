import nodemailer from 'nodemailer';

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? 'contact@hakaluki.dev';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHeaderInjection(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  services?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? stripHeaderInjection(body.name).slice(0, 200) : '';
  const email = typeof body.email === 'string' ? stripHeaderInjection(body.email).slice(0, 200) : '';
  const phone = typeof body.phone === 'string' ? stripHeaderInjection(body.phone).slice(0, 60) : '';
  const projectType =
    typeof body.projectType === 'string' ? stripHeaderInjection(body.projectType).slice(0, 120) : '';
  const services = Array.isArray(body.services)
    ? body.services.filter((item): item is string => typeof item === 'string').slice(0, 20)
    : [];
  const message = typeof body.message === 'string' ? body.message.slice(0, 300) : '';

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('Contact form: missing SMTP_HOST/SMTP_USER/SMTP_PASS env vars.');
    return Response.json(
      { error: 'Email service is not configured yet. Please email us directly.' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: smtpUser, pass: smtpPass },
  });

  const summaryRows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Project type', projectType || '—'],
    ['Services', services.length ? services.join(', ') : '—'],
  ];

  const textBody = [
    ...summaryRows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    message,
  ].join('\n');

  const htmlBody = `
    <table style="font-family: sans-serif; font-size: 14px; color: #0B0501;">
      ${summaryRows
        .map(
          ([label, value]) =>
            `<tr><td style="padding: 4px 12px 4px 0; color: #666;">${escapeHtml(label)}</td><td>${escapeHtml(
              value
            )}</td></tr>`
        )
        .join('')}
    </table>
    <p style="margin-top: 16px; white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? smtpUser,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New Client Message from ${name}`,
      text: textBody,
      html: htmlBody,
    });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return Response.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
