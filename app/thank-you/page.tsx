import PurchaseTracking from '@/components/PurchaseTracking';
import { getStripe } from '@/lib/stripe';
import Link from 'next/link';
import { contactEmail } from '@/lib/site';

type ThankYouPageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = (await searchParams) || {};
  const sessionId = params.session_id;

  let purchaseValue = 197;
  let purchaseCurrency = 'USD';

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (typeof session.amount_total === 'number') {
        purchaseValue = session.amount_total / 100;
      }

      if (session.currency) {
        purchaseCurrency = session.currency.toUpperCase();
      }
    } catch (error) {
      console.error('[thank-you] Failed to retrieve checkout session', error);
    }
  }

  return (
    <div className="section">
      <div className="container container-narrow">
        <PurchaseTracking
          value={purchaseValue}
          currency={purchaseCurrency}
          transactionId={sessionId}
        />
        <div className="section-label">You&apos;re In</div>
        <h1 className="section-title">🎉 You&apos;re In! See You April 25th.</h1>
        <p className="section-desc">Here&apos;s what happens next:</p>
        <div className="value-stack" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="value-row">
            <span className="value-item-name">1. ✅ Check your email for a confirmation receipt</span>
          </div>
          <div className="value-row">
            <span className="value-item-name">
              2. 📧 You&apos;ll receive a pre-workshop setup guide 1 week before (April 18)
            </span>
          </div>
          <div className="value-row">
            <span className="value-item-name">3. 💻 Make sure you have a laptop + free ChatGPT account ready</span>
          </div>
          <div className="value-row">
            <span className="value-item-name">4. 📍 <a href="https://maps.google.com/?q=Best+Western+Gateway+Grand+4200+NW+97th+Blvd+Gainesville+FL+32606" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Best Western Gateway Grand, 4200 NW 97th Blvd, Gainesville, FL 32606</a> — 8:30 AM</span>
          </div>
        </div>
        <p className="section-desc">Questions? Email {contactEmail}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <Link href="/" className="btn btn-primary btn-lg">
            Return to the workshop page
          </Link>
          <button className="btn btn-primary btn-lg" type="button">
            Invite a fellow business owner
          </button>
        </div>
      </div>
    </div>
  );
}
