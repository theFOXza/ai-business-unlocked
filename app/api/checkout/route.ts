import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      businessName,
      industry,
      painPoint,
      aiFamiliarity,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const stripe = getStripe();

    const isEarlyBird = process.env.NEXT_PUBLIC_EARLY_BIRD_ACTIVE === 'true';
    const priceId = isEarlyBird
      ? process.env.STRIPE_PRICE_EARLY_BIRD
      : process.env.STRIPE_PRICE_REGULAR;

    if (!priceId) {
      return NextResponse.json({ error: 'Payment not configured yet. Check back soon!' }, { status: 503 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        name,
        email,
        phone,
        businessName,
        industry,
        painPoint,
        aiFamiliarity,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
      },
      success_url: `${req.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/#register`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
