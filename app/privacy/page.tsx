import Link from 'next/link';

export const metadata = { title: 'Privacy Policy — AI for Business Unlocked' };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">← Back to home</Link>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: April 3, 2026</p>

        <h2>Information We Collect</h2>
        <p>When you register for our workshop, we collect your name, email address, phone number, business name, and payment information. Payment processing is handled securely by Stripe — we never store your card details.</p>

        <h2>How We Use Your Information</h2>
        <p>We use your information to process your registration, send event updates and reminders, provide workshop materials, and communicate about future events you may be interested in.</p>

        <h2>Information Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties except as necessary to process payments (Stripe) and send communications (email service provider).</p>

        <h2>Data Security</h2>
        <p>We implement reasonable security measures to protect your information. All payment processing occurs over encrypted connections.</p>

        <h2>Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>

        <h2>Contact</h2>
        <p>For privacy-related questions, email us at <a href="mailto:legal@aibusinessunlock.com">legal@aibusinessunlock.com</a>.</p>
      </div>
    </main>
  );
}
