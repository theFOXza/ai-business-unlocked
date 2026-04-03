import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendConfirmationEmail, sendNotificationEmail } from '@/lib/emails';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata || {};
    const email = session.customer_email || session.customer_details?.email;
    const name = meta.name || 'Attendee';
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const ticketType = amount === 197 ? 'Early Bird ($197)' : 'Regular ($297)';

    console.log(`✅ New registration: ${name} (${email}) — ${ticketType}`);

    // Send confirmation email to attendee
    if (email) {
      try {
        await sendConfirmationEmail({
          to: email,
          name,
          ticketType,
          amount,
          sessionId: session.id,
        });
        console.log(`📧 Confirmation email sent to ${email}`);
      } catch (e) {
        console.error('Failed to send confirmation email:', e);
      }
    }

    // Send notification to PJ + James
    try {
      await sendNotificationEmail({
        name,
        email: email || 'Unknown',
        phone: meta.phone || '',
        businessName: meta.businessName || '',
        industry: meta.industry || '',
        painPoint: meta.painPoint || '',
        aiFamiliarity: meta.aiFamiliarity || '',
        ticketType,
        amount,
      });
      console.log('📧 Notification sent to PJ + James');
    } catch (e) {
      console.error('Failed to send notification email:', e);
    }
  }

  return NextResponse.json({ received: true });
}
