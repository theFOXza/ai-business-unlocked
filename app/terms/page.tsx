import Link from 'next/link';

export const metadata = { title: 'Terms & Conditions — AI for Business Unlocked' };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">← Back to home</Link>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: April 3, 2026</p>

        <h2>Event Registration</h2>
        <p>By registering, you agree to attend the AI for Business Unlocked workshop on the scheduled date. Registration is confirmed upon successful payment.</p>

        <h2>Refund Policy</h2>
        <p>Full refunds are available up to 7 days before the event. Within 7 days, registrations may be transferred to another attendee but are non-refundable. No-shows are not eligible for refunds.</p>

        <h2>Workshop Content</h2>
        <p>Workshop content is for educational purposes only. We do not guarantee specific business results. AI tools and strategies demonstrated may change as technology evolves.</p>

        <h2>Intellectual Property</h2>
        <p>Workshop materials, presentations, and handouts are the property of the organizers. Attendees may use learned concepts in their business but may not redistribute workshop materials.</p>

        <h2>Liability</h2>
        <p>Organizers are not liable for any business decisions made based on workshop content. Attendees participate at their own risk.</p>

        <h2>Photography &amp; Recording</h2>
        <p>We may take photos or video during the event for promotional purposes. By attending, you consent to being photographed. Let us know if you prefer not to be included.</p>

        <h2>Changes</h2>
        <p>We reserve the right to modify event details (venue, schedule, speakers) as needed. Registered attendees will be notified of any material changes.</p>
      </div>
    </main>
  );
}
