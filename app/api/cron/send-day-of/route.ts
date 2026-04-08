import { NextResponse } from 'next/server';
import { dayOfEmail } from '@/lib/emails';
import { sendStageEmails } from '@/lib/cron-email';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const results = await sendStageEmails('day_of', dayOfEmail);
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'failed to send day-of emails' },
      { status: 500 }
    );
  }
}
