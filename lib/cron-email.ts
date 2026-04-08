import { getResend, fromEmail } from '@/lib/resend';
import { fetchPendingRegistrations, markSent } from '@/lib/registrations-api';
import type { RegistrationData } from '@/lib/emails';

const SUPPORT_EMAIL = 'support@aibusinessunlock.com';

export type RegistrationStage = 't7' | 't1' | 'day_of';
export type SentStage = 't7' | 't1' | 'day_of';

export interface CronResult {
  stage: RegistrationStage;
  total: number;
  sent: number;
  failed: number;
  errors: string[];
}

export async function sendStageEmails(
  stage: RegistrationStage,
  buildEmail: (data: RegistrationData) => { subject: string; html: string }
): Promise<CronResult> {
  const { registrations } = await fetchPendingRegistrations(stage);
  const resend = getResend();
  const results: CronResult = {
    stage,
    total: registrations.length,
    sent: 0,
    failed: 0,
    errors: [],
  };

  for (const registration of registrations) {
    try {
      const email = buildEmail({
        name: registration.name,
        email: registration.email,
        phone: registration.phone || undefined,
        businessName: registration.business_name || undefined,
        industry: registration.industry || undefined,
        painPoint: registration.pain_point || undefined,
        aiFamiliarity: registration.ai_familiarity || undefined,
        amount: registration.amount_cents || undefined,
        eventDate: registration.event_date,
      });

      await resend.emails.send({
        from: fromEmail,
        to: registration.email,
        subject: email.subject,
        html: email.html,
        replyTo: SUPPORT_EMAIL,
      });

      await markSent(registration.id, stage as SentStage);
      results.sent++;
    } catch (err) {
      results.failed++;
      results.errors.push(
        `${registration.email}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return results;
}
