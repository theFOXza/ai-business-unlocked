import { NextResponse } from 'next/server';
import { prepEmail } from '@/lib/emails';
import { sendStageEmails } from '@/lib/cron-email';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const results = await sendStageEmails('t7', prepEmail);
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'failed to send prep emails' },
      { status: 500 }
    );
  }
}
