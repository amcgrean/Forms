import { Resend } from 'resend';

function buildEmailBody(fields) {
  return [
    `New Contact Form Submission`,
    `---------------------------------------`,
    `Name:       ${fields.firstName} ${fields.lastName}`,
    `Email:      ${fields.email}`,
    `Phone:      ${fields.phone || 'Not provided'}`,
    `Department: ${fields.department}`,
    ``,
    `Message:`,
    fields.message,
    `---------------------------------------`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'Email service is not configured.' });

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const emailBody = buildEmailBody(req.body || {});
    const department = req.body?.department || 'General Inquiry';

    const { error: sendError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'delivered@resend.dev',
      subject: `New Contact Inquiry - ${department}`,
      text: emailBody,
    });

    if (sendError) {
      console.error('Resend API error:', sendError);
      return res.status(500).json({ error: 'Failed to send email via Resend.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error submitting contact form:', err);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
