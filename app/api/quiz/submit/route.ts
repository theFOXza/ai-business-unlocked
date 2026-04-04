import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import React from 'react';
import { calculateQuizResult, type QuizSubmission } from '@/lib/quiz-scoring';
import { getResend, fromEmail } from '@/lib/resend';
import { QuizEmailTemplate, type QuizEmailTemplateProps } from '@/lib/quiz-email-template';

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

const ensureDataDir = async () => {
  const dir = path.join(process.cwd(), 'data', 'quiz-results');
  await fs.mkdir(dir, { recursive: true });
  return dir;
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
      createdAt: new Date().toISOString(),
    };

    const dir = await ensureDataDir();
    const filePath = path.join(dir, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(submission, null, 2), 'utf-8');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aibusinessunlock.com';
    const snapshotUrl = `${siteUrl}/quiz/snapshot?id=${id}`;

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

    return Response.json({ ok: true, id });
  } catch (error) {
    console.error('[quiz-submit]', error);
    return Response.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
