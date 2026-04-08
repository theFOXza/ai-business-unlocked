import { NextResponse } from 'next/server';
import { reminderEmail } from '@/lib/emails';
import { sendStageEmails } from '@/lib/cron-email';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const results = await sendStageEmails('t1', reminderEmail);
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'failed to send reminder emails' },
      { status: 500 }
    );
  }
}
