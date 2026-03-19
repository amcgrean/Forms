import { Resend } from 'resend';

function buildEmailBody(fields) {
  return [
    `New Service Request Submission`,
    `---------------------------------------`,
    `PROJECT LOCATION`,
    `Street:       ${fields.streetAddress}`,
    `Line 2:       ${fields.addressLine2 || ''}`,
    `City:         ${fields.city}`,
    ``,
    `SUBMITTER INFORMATION`,
    `Name:             ${fields.yourName}`,
    `Email:            ${fields.yourEmail || 'Not provided'}`,
    `Beisser Sales Rep:${fields.salesRep}`,
    `Point of Contact: ${fields.pointOfContact}`,
    `Billing Party:    ${fields.billingParty}`,
    ``,
    `BUILDER INFO`,
    `Builder Name:  ${fields.builderName}`,
    `Phone:         ${fields.builderPhone || 'Not provided'}`,
    `Email:         ${fields.builderEmail || 'Not provided'}`,
    ``,
    `HOMEOWNER INFO`,
    `Home Occupied? ${fields.homeOccupied}`,
    `Close Date:    ${fields.closeDate || 'Not provided'}`,
    `Name:          ${fields.homeownerName || 'Not provided'}`,
    `Phone:         ${fields.homeownerPhone || 'Not provided'}`,
    `Email:         ${fields.homeownerEmail || 'Not provided'}`,
    ``,
    `ISSUE DETAILS`,
    `Related SO:    ${fields.relatedSalesOrder || 'None'}`,
    `Related PO:    ${fields.relatedPurchaseOrder || 'None'}`,
    `Description:`,
    fields.issueDescription,
    `---------------------------------------`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'Email service is not configured.' });

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const emailBody = buildEmailBody(req.body || {});
    const city = req.body?.city || 'Unknown Location';

    const { error: sendError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'delivered@resend.dev',
      subject: `New Service Request - ${city}`,
      text: emailBody,
    });

    if (sendError) {
      console.error('Resend API error:', sendError);
      return res.status(500).json({ error: 'Failed to send email via Resend.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error submitting service request:', err);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
