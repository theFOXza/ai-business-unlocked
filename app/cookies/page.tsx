import Link from 'next/link';

export const metadata = { title: 'Cookie Policy — AI for Business Unlocked' };

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">← Back to home</Link>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Last updated: April 3, 2026</p>

        <h2>What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help the site function properly and provide usage information.</p>

        <h2>Cookies We Use</h2>
        <ul>
          <li><strong>Essential cookies:</strong> Required for the site to function (e.g., form submissions, payment processing).</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use the site so we can improve it. These are anonymized.</li>
        </ul>

        <h2>Third-Party Cookies</h2>
        <p>Stripe (our payment processor) may set cookies during checkout. These are governed by Stripe&apos;s own cookie policy.</p>

        <h2>Managing Cookies</h2>
        <p>You can disable cookies in your browser settings. Note that disabling essential cookies may prevent registration from working properly.</p>
      </div>
    </main>
  );
}
