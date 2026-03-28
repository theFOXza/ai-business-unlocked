import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    email,
    phone,
    businessName,
    industry,
    painPoint,
    aiFamiliarity,
  } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const isEarlyBird = process.env.NEXT_PUBLIC_EARLY_BIRD_ACTIVE === 'true';
  const priceId = isEarlyBird
    ? process.env.STRIPE_PRICE_EARLY_BIRD
    : process.env.STRIPE_PRICE_REGULAR;

  if (!priceId) {
    return NextResponse.json({ error: 'Price configuration missing.' }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      name,
      phone,
      businessName,
      industry,
      painPoint,
      aiFamiliarity,
    },
    success_url: `${req.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.nextUrl.origin}/#register`,
  });

  return NextResponse.json({ url: session.url });
}
