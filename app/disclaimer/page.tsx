import Link from 'next/link';

export const metadata = { title: 'Disclaimer — AI for Business Unlocked' };

export default function DisclaimerPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">← Back to home</Link>
        <h1>Disclaimer</h1>
        <p className="legal-updated">Last updated: April 3, 2026</p>

        <h2>Educational Purpose</h2>
        <p>The AI for Business Unlocked workshop is designed for educational and informational purposes only. Content presented reflects the knowledge and experience of the hosts at the time of the event.</p>

        <h2>No Guarantee of Results</h2>
        <p>We do not guarantee that implementing AI tools or strategies discussed in the workshop will produce specific financial results. Business outcomes depend on many factors beyond the scope of this event.</p>

        <h2>AI Tools &amp; Services</h2>
        <p>AI tools demonstrated during the workshop are third-party services with their own terms, pricing, and limitations. We are not affiliated with these tools unless explicitly stated. Pricing and features may change at any time.</p>

        <h2>Professional Advice</h2>
        <p>Nothing in this workshop constitutes legal, financial, or professional advice. Consult qualified professionals for specific business, legal, or financial decisions.</p>

        <h2>External Links</h2>
        <p>Our website and materials may contain links to third-party sites. We are not responsible for their content, privacy practices, or availability.</p>
      </div>
    </main>
  );
}
