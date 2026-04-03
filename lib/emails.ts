import { getResend, FROM_EMAIL, NOTIFY_EMAILS } from './resend';

interface ConfirmationEmailData {
  to: string;
  name: string;
  ticketType: string;
  amount: number;
  sessionId: string;
}

interface NotificationEmailData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  painPoint: string;
  aiFamiliarity: string;
  ticketType: string;
  amount: number;
}

export async function sendConfirmationEmail(data: ConfirmationEmailData) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.to,
    subject: '🎯 You\'re In! AI For Business Unlocked — April 25',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; padding: 30px 0;">
          <h1 style="color: #1a1a2e; margin: 0;">🎯 You're In!</h1>
          <p style="color: #666; font-size: 18px;">Your seat is confirmed.</p>
        </div>

        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <p style="margin: 0 0 12px;">Hey ${data.name},</p>
          <p>You just made one of the smartest business decisions of 2026.</p>
          <p><strong>Your ticket to AI For Business Unlocked is confirmed.</strong></p>
        </div>

        <div style="background: #1a1a2e; color: white; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h2 style="margin: 0 0 16px; color: #a78bfa;">📅 Workshop Details</h2>
          <p style="margin: 4px 0;"><strong>Date:</strong> Friday, April 25, 2026</p>
          <p style="margin: 4px 0;"><strong>Time:</strong> 9:00 AM – 4:00 PM ET</p>
          <p style="margin: 4px 0;"><strong>Venue:</strong> Best Western Gateway Grand</p>
          <p style="margin: 4px 0;"><strong>Address:</strong> 4200 NW 97th Blvd, Gainesville, FL 32606</p>
          <p style="margin: 4px 0;"><strong>Ticket:</strong> ${data.ticketType}</p>
          <p style="margin: 4px 0;"><strong>Confirmation:</strong> ${data.sessionId.slice(0, 16)}...</p>
        </div>

        <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h2 style="margin: 0 0 16px; color: #166534;">✅ Before the Workshop</h2>
          <ol style="padding-left: 20px;">
            <li style="margin: 8px 0;">Think about your <strong>#1 time-waster</strong> — that task eating your hours every week</li>
            <li style="margin: 8px 0;">Bring your <strong>laptop</strong> — fully charged, Chrome or Edge installed</li>
            <li style="margin: 8px 0;">Create a free <a href="https://chat.openai.com" style="color: #7c3aed;">ChatGPT account</a> if you don't have one</li>
          </ol>
        </div>

        <div style="text-align: center; padding: 20px 0;">
          <p style="color: #666;">Questions? Reply to this email or reach us at<br>
          <a href="mailto:hello@aibusinessunlock.com" style="color: #7c3aed;">hello@aibusinessunlock.com</a></p>
          <p style="color: #999; font-size: 14px;">See you April 25th! 🚀<br>
          <strong>PeterJohn Fox & James Parris</strong></p>
        </div>
      </div>
    `,
  });
}

export async function sendNotificationEmail(data: NotificationEmailData) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAILS,
    subject: `🎟️ New Registration: ${data.name} (${data.ticketType})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #166534;">🎟️ New Workshop Registration!</h1>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Email</td>
            <td style="padding: 8px 0;">${data.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Phone</td>
            <td style="padding: 8px 0;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Business</td>
            <td style="padding: 8px 0;">${data.businessName || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Industry</td>
            <td style="padding: 8px 0;">${data.industry || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Pain Point</td>
            <td style="padding: 8px 0;">${data.painPoint || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">AI Familiarity</td>
            <td style="padding: 8px 0;">${data.aiFamiliarity || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold;">Ticket</td>
            <td style="padding: 8px 0;">${data.ticketType} — $${data.amount}</td>
          </tr>
        </table>

        <p style="color: #666; font-size: 14px;">Check all registrations at:<br>
        <code>https://www.aibusinessunlock.com/api/registrations?key=YOUR_ADMIN_KEY</code></p>
      </div>
    `,
  });
}
