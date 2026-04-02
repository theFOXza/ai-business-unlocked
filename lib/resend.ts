import { Resend } from 'resend';

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(key);
}

export const fromEmail =
  process.env.RESEND_FROM_EMAIL || 'AI For Business Unlocked <noreply@system.aibusinessunlock.com>';

export const notifyEmails = (process.env.NOTIFY_EMAILS || '').split(',').filter(Boolean);
