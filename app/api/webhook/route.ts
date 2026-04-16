import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getResend, fromEmail, notifyEmails } from '@/lib/resend';
import { confirmationEmail, notificationEmail, type RegistrationData } from '@/lib/emails';
import { createRegistration, markSent } from '@/lib/registrations-api';

export const dynamic = 'force-dynamic';

const DEFAULT_EVENT_DATE = '2026-05-16';
const SUPPORT_EMAIL = 'support@aibusinessunlock.com';

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
      eventDate: 'Saturday, May 16, 2026',
    };

    if (!data.email) {
      console.error('No email found on checkout session:', session.id);
      return NextResponse.json({ received: true, warning: 'no email' });
    }

    const resend = getResend();
    let registrationId: string | undefined;

    try {
      const confirmation = confirmationEmail(data);
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: confirmation.subject,
        html: confirmation.html,
        replyTo: SUPPORT_EMAIL,
      });
      console.log(`✅ Confirmation email sent to ${data.email}`);

      try {
        const registration = await createRegistration({
          stripe_session_id: session.id,
          stripe_customer_id:
            typeof session.customer === 'string' ? session.customer : session.customer?.id || null,
          name: data.name,
          email: data.email,
          phone: data.phone,
          business_name: data.businessName,
          industry: data.industry,
          pain_point: data.painPoint,
          ai_familiarity: data.aiFamiliarity,
          amount_cents: data.amount,
          currency: session.currency || undefined,
          event_date: metadata.eventDate || DEFAULT_EVENT_DATE,
          metadata,
        });
        registrationId = registration.id;
        await markSent(registration.id, 'confirmation');
        console.log(`✅ Registration persisted for ${data.email}`);
      } catch (registrationErr) {
        console.error('Registration persistence error:', registrationErr);
      }
    } catch (emailErr) {
      console.error('Confirmation email send error:', emailErr);
    }

    if (notifyEmails.length > 0) {
      try {
        const notification = notificationEmail(data);
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmails,
          subject: notification.subject,
          html: notification.html,
          replyTo: SUPPORT_EMAIL,
        });
        console.log(`✅ Notification sent to ${notifyEmails.join(', ')}`);
      } catch (notificationErr) {
        console.error('Notification email send error:', notificationErr);
      }
    }

    return NextResponse.json({ received: true, registrationId });
  }

  return NextResponse.json({ received: true });
}
