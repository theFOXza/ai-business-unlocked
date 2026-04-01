import Link from 'next/link';
import { contactEmail } from '@/lib/site';

export default function ThankYouPage() {
  return (
    <div className="section">
      <div className="container container-narrow">
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
