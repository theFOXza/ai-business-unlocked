/** Email template helpers — plain HTML, no dependencies */

export interface RegistrationData {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  industry?: string;
  painPoint?: string;
  aiFamiliarity?: string;
  amount?: number;
  eventDate?: string;
}

const DEFAULT_EVENT_DATE = 'Saturday, April 25, 2026';
const DEFAULT_EVENT_TIME = '8:30 AM – 4:30 PM';
const DEFAULT_VENUE = 'Best Western Gateway Grand, Gainesville, FL';
const SUPPORT_EMAIL = 'support@aibusinessunlock.com';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function renderWorkshopEmail({
  eyebrow,
  title,
  intro,
  sections,
  closing,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: string;
  closing: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 0; background: #f4f4f5; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #3730a3 0%, #6366f1 100%); padding: 40px 32px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 8px; }
    .header p { color: #c4b5fd; font-size: 16px; margin: 0; }
    .body { padding: 32px; }
    .body h2 { font-size: 20px; color: #3730a3; margin: 0 0 16px; }
    .body p { margin: 0 0 16px; color: #374151; }
    .checklist { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .checklist h3 { margin: 0 0 12px; color: #166534; font-size: 16px; }
    .checklist ul { margin: 0; padding-left: 20px; color: #374151; }
    .checklist li { padding: 6px 0; }
    .details { background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .details h3 { margin: 0 0 12px; color: #3730a3; font-size: 16px; }
    .details p { margin: 4px 0; color: #374151; font-size: 14px; }
    .details strong { color: #1e1b4b; }
    .footer { padding: 24px 32px; text-align: center; color: #9ca3af; font-size: 13px; border-top: 1px solid #e5e7eb; }
    .footer a, .body a { color: #4f46e5; text-decoration: none; }
  </style>
</head>
<body>
  <div style="padding: 24px;">
    <div class="container">
      <div class="header">
        <h1>${title}</h1>
        <p>${eyebrow}</p>
      </div>
      <div class="body">
        ${intro}
        ${sections}
        ${closing}
      </div>
      <div class="footer">
        <p>AI for Business Unlocked<br>
        <a href="https://aibusinessunlock.com">aibusinessunlock.com</a></p>
        <p>© 2026 AI Business Unlocked. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function renderEventDetails(eventDate: string) {
  return `
    <div class="details">
      <h3>📍 Event Details</h3>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Time:</strong> ${DEFAULT_EVENT_TIME}</p>
      <p><strong>Venue:</strong> ${DEFAULT_VENUE}</p>
      <p><strong>Parking:</strong> Free on-site</p>
    </div>`;
}

function renderSupportLine() {
  return `<p>Questions? Email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> and we'll get right back to you.</p>`;
}

export function confirmationEmail(data: RegistrationData): { subject: string; html: string } {
  const firstName = data.name.split(' ')[0];
  const eventDate = data.eventDate || DEFAULT_EVENT_DATE;

  return {
    subject: `🎉 You're in, ${firstName}! See you April 25th`,
    html: renderWorkshopEmail({
      eyebrow: 'AI for Business Unlocked — April 25, 2026',
      title: "🎉 You're In!",
      intro: `
        <p>Hey ${escapeHtml(firstName)}! 👋</p>
        <p>Your seat is confirmed for <strong>AI for Business Unlocked</strong>. You're about to learn how to put AI to work in your business, and leave with real tools you can use immediately.</p>
        ${renderEventDetails(eventDate)}
        <div class="checklist">
          <h3>What to Bring</h3>
          <ul>
            <li>Laptop (fully charged + charger)</li>
            <li>Create a free ChatGPT account at <a href="https://chat.openai.com">chat.openai.com</a></li>
            <li>Think of 3 tasks you repeat every week that eat your time</li>
            <li>Your business social media logins (optional but helpful)</li>
          </ul>
        </div>
      `,
      sections: `
        <h2>What Happens Next</h2>
        <p><strong>1 week before (April 18)</strong> — You'll get a prep email with setup instructions and a quick exercise to get the most out of the day.</p>
        <p><strong>Day of</strong> — Arrive at 8:30 AM for registration and coffee. We start building at 9:00 AM sharp.</p>
        ${renderSupportLine()}
      `,
      closing: `<p>See you there! 🚀<br><strong>PeterJohn & James</strong></p>`,
    }),
  };
}

export function prepEmail(data: RegistrationData): { subject: string; html: string } {
  const firstName = data.name.split(' ')[0];
  const eventDate = data.eventDate || DEFAULT_EVENT_DATE;

  return {
    subject: 'One week to go! 📚 Prep for AI for Business Unlocked',
    html: renderWorkshopEmail({
      eyebrow: 'AI for Business Unlocked — One week out',
      title: '📚 One Week To Go!',
      intro: `
        <p>Hey ${escapeHtml(firstName)}! 👋</p>
        <p>Your workshop is just one week away, and we're excited to help you turn AI into something practical for your business.</p>
        ${renderEventDetails(eventDate)}
      `,
      sections: `
        <div class="checklist">
          <h3>Your quick prep checklist</h3>
          <ul>
            <li>Charge your laptop and bring your charger</li>
            <li>Create a free ChatGPT account at <a href="https://chat.openai.com">chat.openai.com</a> if you haven't yet</li>
            <li>Write down 3 tasks you repeat every week that eat your time</li>
            <li>Bring login info for your business social media accounts, optional but helpful</li>
            <li>Confirm directions and parking at Best Western Gateway Grand, Gainesville FL, with free on-site parking</li>
          </ul>
        </div>
        ${renderSupportLine()}
      `,
      closing: `<p>See you soon,<br><strong>PeterJohn & James</strong></p>`,
    }),
  };
}

export function reminderEmail(data: RegistrationData): { subject: string; html: string } {
  const firstName = data.name.split(' ')[0];
  const eventDate = data.eventDate || DEFAULT_EVENT_DATE;

  return {
    subject: 'Tomorrow! See you at 8:30 AM 🚀',
    html: renderWorkshopEmail({
      eyebrow: 'AI for Business Unlocked — Tomorrow',
      title: '🚀 Tomorrow Is The Day!',
      intro: `
        <p>Hey ${escapeHtml(firstName)}! 👋</p>
        <p>Tomorrow is the day. We're excited to get building with you.</p>
        ${renderEventDetails(eventDate)}
      `,
      sections: `
        <div class="checklist">
          <h3>Quick reminders for tomorrow</h3>
          <ul>
            <li>Arrive at 8:30 AM for check-in and coffee, we start building at 9:00 AM sharp</li>
            <li>Best Western Gateway Grand, Gainesville, FL, with free parking</li>
            <li>Bring your charged laptop, charger, ChatGPT account, and your 3-tasks list</li>
            <li>Wear something casual and comfortable</li>
          </ul>
        </div>
        ${renderSupportLine()}
      `,
      closing: `<p>See you tomorrow,<br><strong>PeterJohn & James</strong></p>`,
    }),
  };
}

export function dayOfEmail(data: RegistrationData): { subject: string; html: string } {
  const firstName = data.name.split(' ')[0];
  const eventDate = data.eventDate || DEFAULT_EVENT_DATE;

  return {
    subject: 'See you this morning at 8:30! ☕',
    html: renderWorkshopEmail({
      eyebrow: 'AI for Business Unlocked — Today',
      title: '☕ See You This Morning!',
      intro: `
        <p>Good morning ${escapeHtml(firstName)}! 👋</p>
        <p>We're excited to see you in just a few hours.</p>
        ${renderEventDetails(eventDate)}
      `,
      sections: `
        <div class="checklist">
          <h3>Before you head over</h3>
          <ul>
            <li>Free parking is available on-site at the venue</li>
            <li>The check-in table will be in the main lobby</li>
            <li>WiFi info will be waiting for you at the check-in table</li>
            <li>Running late? Text us at {{HOST_PHONE}}</li>
          </ul>
        </div>
        <p><!-- PJ needs to provide the host phone number for the day-of email placeholder. --></p>
        ${renderSupportLine()}
      `,
      closing: `<p>Safe travels,<br><strong>PeterJohn & James</strong></p>`,
    }),
  };
}

export function notificationEmail(data: RegistrationData): { subject: string; html: string } {
  return {
    subject: `🎟️ New Registration: ${data.name} (${data.industry || 'No industry'})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 24px; background: #f4f4f5; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background: #16a34a; padding: 20px 24px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; }
    .body { padding: 24px; }
    .field { margin-bottom: 12px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 600; }
    .value { font-size: 15px; color: #111827; margin-top: 2px; }
    .pain-point { background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-top: 16px; }
    .pain-point .label { color: #92400e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎟️ New Registration!</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `<div class="field"><div class="label">Phone</div><div class="value">${data.phone}</div></div>` : ''}
      ${data.businessName ? `<div class="field"><div class="label">Business</div><div class="value">${data.businessName}</div></div>` : ''}
      ${data.industry ? `<div class="field"><div class="label">Industry</div><div class="value">${data.industry}</div></div>` : ''}
      ${data.aiFamiliarity ? `<div class="field"><div class="label">AI Familiarity</div><div class="value">${data.aiFamiliarity}</div></div>` : ''}
      ${data.amount ? `<div class="field"><div class="label">Amount Paid</div><div class="value">$${(data.amount / 100).toFixed(2)}</div></div>` : ''}
      ${data.painPoint ? `
      <div class="pain-point">
        <div class="label">Biggest Pain Point</div>
        <div class="value">${data.painPoint}</div>
      </div>` : ''}
    </div>
  </div>
</body>
</html>`,
  };
}
