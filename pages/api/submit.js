import { Resend } from 'resend';

function validateFields({ fullName, email, phone, businessName }) {
  if (!fullName || !fullName.trim()) return 'Full name is required.';
  if (!email || !email.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Invalid email address.';
  if (!phone || !phone.trim()) return 'Phone number is required.';
  if (!/^[\d\s\-().+]{7,20}$/.test(phone.trim())) return 'Invalid phone number.';
  if (!businessName || !businessName.trim()) return 'Business name is required.';
  return null;
}

function formatTimestamp() {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' CST';
}

function buildEmailBody({ fullName, email, phone, businessName, accountNumber, notes }) {
  const acctDisplay = accountNumber && accountNumber.trim() ? accountNumber.trim() : 'Not provided';
  const notesDisplay = notes && notes.trim() ? notes.trim() : '';

  return [
    'New Pro Account Request',
    '---------------------------------------',
    `Name:             ${fullName.trim()}`,
    `Email:            ${email.trim()}`,
    `Phone:            ${phone.trim()}`,
    `Business Name:    ${businessName.trim()}`,
    `Account Number:   ${acctDisplay}`,
    notesDisplay ? `Notes:            ${notesDisplay}` : 'Notes:            (none)',
    '',
    `Submitted:        ${formatTimestamp()}`,
    '---------------------------------------',
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return res.status(500).json({ error: 'Email service is not configured. Please contact us directly.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { fullName, email, phone, businessName, accountNumber, notes } = req.body || {};

  const validationError = validateFields({ fullName, email, phone, businessName });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const emailBody = buildEmailBody({ fullName, email, phone, businessName, accountNumber, notes });

  try {
    const { error: sendError } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `New Pro Account Request - ${businessName.trim()}`,
      text: emailBody,
    });

    if (sendError) {
      console.error('Resend API error:', sendError);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
