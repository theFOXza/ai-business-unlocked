import { z } from 'zod';
import React from 'react';
import { calculateQuizResult, type QuizResult, type QuizSubmission } from '@/lib/quiz-scoring';
import { getResend, fromEmail } from '@/lib/resend';
import { QuizEmailTemplate, type QuizEmailTemplateProps } from '@/lib/quiz-email-template';
import { encodeQuizSnapshotToken } from '@/lib/quiz-snapshot-token';

const submissionSchema = z.object({
  answers: z.record(z.union([z.string(), z.array(z.string())])),
  contact: z.object({
    firstName: z.string().min(1),
    email: z.string().email(),
    businessName: z.string().optional(),
  }),
  utm: z
    .object({
      utmSource: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmMedium: z.string().optional(),
      utmContent: z.string().optional(),
    })
    .optional(),
});

const normalizeAnswers = (answers: Record<string, string | string[]>): Record<number, string | string[]> => {
  const normalized: Record<number, string | string[]> = {};
  for (const [key, value] of Object.entries(answers)) {
    const parsedKey = Number.parseInt(key, 10);
    if (!Number.isNaN(parsedKey)) {
      normalized[parsedKey] = value;
    }
  }
  return normalized;
};

const levelLabel = (level: QuizResult['opportunityAreas'][number]['level']): string => {
  switch (level) {
    case 'very_high':
      return 'Very High';
    case 'high':
      return 'High';
    case 'moderate':
      return 'Moderate';
    default:
      return 'Low';
  }
};

const formatCurrency = (value: number): string =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const escapeHtml = (value?: string): string =>
  (value ?? 'Not provided')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderLeadNotificationHtml = ({
  contact,
  result,
  snapshotUrl,
  utm,
}: {
  contact: { firstName: string; email: string; businessName?: string };
  result: QuizResult;
  snapshotUrl: string;
  utm?: { utmSource?: string; utmCampaign?: string; utmMedium?: string; utmContent?: string };
}): string => {
  const topAreas = [...result.opportunityAreas].sort((a, b) => b.score - a.score).slice(0, 3);

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f8f7f4;color:#1a1916;font-family:Arial,sans-serif;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2dfd9;border-radius:16px;padding:24px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b6a67;">New Quiz Lead</p>
      <h1 style="margin:0 0 18px;font-size:28px;line-height:1.2;">${escapeHtml(contact.firstName)}${contact.businessName ? ` (${escapeHtml(contact.businessName)})` : ''}</h1>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="padding:8px 0;font-weight:bold;">First name</td><td style="padding:8px 0;">${escapeHtml(contact.firstName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Business name</td><td style="padding:8px 0;">${escapeHtml(contact.businessName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">UTM source</td><td style="padding:8px 0;">${escapeHtml(utm?.utmSource)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">UTM campaign</td><td style="padding:8px 0;">${escapeHtml(utm?.utmCampaign)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">UTM medium</td><td style="padding:8px 0;">${escapeHtml(utm?.utmMedium)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">UTM content</td><td style="padding:8px 0;">${escapeHtml(utm?.utmContent)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Score</td><td style="padding:8px 0;">${result.score}/${result.maxScore}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Grade</td><td style="padding:8px 0;">${escapeHtml(result.gradeLabel)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Estimated hours/week</td><td style="padding:8px 0;">${result.estimatedHoursPerWeek.min}-${result.estimatedHoursPerWeek.max}${result.estimatedHoursPerWeek.max === 25 ? '+' : ''}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Estimated monthly impact</td><td style="padding:8px 0;">${formatCurrency(result.estimatedMonthlyImpact.min)}-${formatCurrency(result.estimatedMonthlyImpact.max)}</td></tr>
      </table>

      <h2 style="margin:20px 0 12px;font-size:20px;">Top opportunity areas</h2>
      <ul style="padding-left:20px;margin:0 0 20px;">
        ${topAreas
          .map(
            (area) =>
              `<li style="margin-bottom:10px;"><strong>${escapeHtml(area.name)}</strong> (${levelLabel(area.level)}): ${escapeHtml(area.description)}</li>`
          )
          .join('')}
      </ul>

      <p style="margin:0 0 8px;"><strong>Snapshot URL:</strong></p>
      <p style="margin:0;"><a href="${escapeHtml(snapshotUrl)}">${escapeHtml(snapshotUrl)}</a></p>
    </div>
  </body>
</html>`;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    const { answers, contact, utm } = parsed.data;
    const normalizedAnswers = normalizeAnswers(answers);

    const id = crypto.randomUUID();
    const result = calculateQuizResult(normalizedAnswers, id);

    const submission: QuizSubmission = {
      ...result,
      contact,
      utmSource: utm?.utmSource || undefined,
      utmCampaign: utm?.utmCampaign || undefined,
      utmMedium: utm?.utmMedium || undefined,
      utmContent: utm?.utmContent || undefined,
      createdAt: new Date().toISOString(),
    };

    const token = encodeQuizSnapshotToken(submission);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aibusinessunlock.com';
    const snapshotUrl = `${siteUrl}/quiz/snapshot?token=${encodeURIComponent(token)}`;

    const { error } = await getResend().emails.send({
      from: fromEmail,
      to: [contact.email],
      subject: `Your AI Opportunity Score: ${result.score} — Here's What It Means`,
      react: React.createElement(QuizEmailTemplate, { result, snapshotUrl, siteUrl } satisfies QuizEmailTemplateProps),
    });

    if (error) {
      console.error('[quiz-submit] Resend error:', error);
      return Response.json({ ok: false, error: 'Email failed to send' }, { status: 500 });
    }

    try {
      const leadNotificationHtml = renderLeadNotificationHtml({
        contact,
        result,
        snapshotUrl,
        utm,
      });

      const { error: notifyError } = await getResend().emails.send({
        from: fromEmail,
        to: ['peterjohn@aibusinessunlock.com'],
        subject: `New Quiz Lead: ${contact.firstName}${contact.businessName ? ` (${contact.businessName})` : ''} — Score ${result.score}/${result.maxScore}`,
        html: leadNotificationHtml,
      });

      if (notifyError) {
        console.error('[quiz-submit] Lead notification error:', notifyError);
      }
    } catch (notifyError) {
      console.error('[quiz-submit] Lead notification exception:', notifyError);
    }

    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            firstName: contact.firstName,
            email: contact.email,
            businessName: contact.businessName || '',
            score: result.score,
            maxScore: result.maxScore,
            grade: result.gradeLabel,
            estimatedHoursMin: result.estimatedHoursPerWeek.min,
            estimatedHoursMax: result.estimatedHoursPerWeek.max,
            estMonthlyImpactMin: result.estimatedMonthlyImpact.min,
            estMonthlyImpactMax: result.estimatedMonthlyImpact.max,
            topArea1: result.topAreas[0] || '',
            topArea2: result.topAreas[1] || '',
            topArea3: result.topAreas[2] || '',
            businessType: result.businessType,
            teamSize: result.teamSize,
            aiFamiliarity: result.aiFamiliarity,
            utmSource: utm?.utmSource || '',
            utmCampaign: utm?.utmCampaign || '',
            utmMedium: utm?.utmMedium || '',
            utmContent: utm?.utmContent || '',
            snapshotUrl,
          }),
        });
      } catch (err) {
        console.error('[quiz-submit] Sheets webhook error:', err);
      }
    }

    return Response.json({ ok: true, id, token });
  } catch (error) {
    console.error('[quiz-submit]', error);
    return Response.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
