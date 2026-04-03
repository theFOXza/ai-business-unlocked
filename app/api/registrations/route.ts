import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

/**
 * GET /api/registrations?key=<ADMIN_KEY>
 * Lists all paid workshop registrations from Stripe.
 * Protected by ADMIN_KEY env var.
 */
export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('key');
  if (password !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stripe = getStripe();

    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
    });

    const registrations = sessions.data
      .filter((s) => s.payment_status === 'paid')
      .map((session) => ({
        id: session.id,
        name: session.metadata?.name || 'Unknown',
        email:
          session.customer_email ||
          session.customer_details?.email ||
          'Unknown',
        phone: session.metadata?.phone || '',
        businessName: session.metadata?.businessName || '',
        industry: session.metadata?.industry || '',
        painPoint: session.metadata?.painPoint || '',
        aiFamiliarity: session.metadata?.aiFamiliarity || '',
        amount: session.amount_total ? session.amount_total / 100 : 0,
        ticketType: session.amount_total === 19700 ? 'Early Bird' : 'Regular',
        paidAt: session.created
          ? new Date(session.created * 1000).toISOString()
          : '',
      }));

    const summary = {
      totalRegistrations: registrations.length,
      totalRevenue: registrations.reduce((sum, r) => sum + r.amount, 0),
      earlyBirdCount: registrations.filter((r) => r.ticketType === 'Early Bird').length,
      regularCount: registrations.filter((r) => r.ticketType === 'Regular').length,
      seatsRemaining: 25 - registrations.length,
      workshopDate: '2026-04-25',
      daysUntilWorkshop: Math.ceil(
        (new Date('2026-04-25').getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ),
    };

    return NextResponse.json({ summary, registrations });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch registrations';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
