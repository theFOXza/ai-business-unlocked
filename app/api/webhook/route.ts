import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getResend, fromEmail, notifyEmails } from '@/lib/resend';
import { confirmationEmail, notificationEmail, type RegistrationData } from '@/lib/emails';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // Fallback: parse without signature verification (for initial testing)
      event = JSON.parse(body) as Stripe.Event;
      console.warn('⚠️ Webhook signature not verified — STRIPE_WEBHOOK_SECRET not set');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed';
    console.error('Webhook error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const data: RegistrationData = {
      name: metadata.name || 'Unknown',
      email: session.customer_email || metadata.email || '',
      phone: metadata.phone,
      businessName: metadata.businessName,
      industry: metadata.industry,
      painPoint: metadata.painPoint,
      aiFamiliarity: metadata.aiFamiliarity,
      amount: session.amount_total || undefined,
    };

    if (!data.email) {
      console.error('No email found on checkout session:', session.id);
      return NextResponse.json({ received: true, warning: 'no email' });
    }

    try {
      const resend = getResend();

      // 1. Send confirmation email to attendee
      const confirmation = confirmationEmail(data);
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: confirmation.subject,
        html: confirmation.html,
        replyTo: 'foxinnovationsllc@gmail.com',
      });
      console.log(`✅ Confirmation email sent to ${data.email}`);

      // 2. Send notification to PJ + James
      if (notifyEmails.length > 0) {
        const notification = notificationEmail(data);
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmails,
          subject: notification.subject,
          html: notification.html,
        });
        console.log(`✅ Notification sent to ${notifyEmails.join(', ')}`);
      }
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      // Don't fail the webhook — payment already succeeded
    }
  }

  return NextResponse.json({ received: true });
}
