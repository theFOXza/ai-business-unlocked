import Link from 'next/link';
import { contactEmail } from '@/lib/site';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-blue/5 py-20">
      <div className="container-pad">
        <div className="rounded-3xl border border-blue/10 bg-white p-10 text-center shadow-soft">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">🎉 You're In! See You April 25th.</h1>
          <p className="mt-6 text-base text-text/80">Here's what happens next:</p>
          <div className="mx-auto mt-6 max-w-2xl space-y-3 text-left text-base text-text/80">
            <p>1. ✅ Check your email for a confirmation receipt</p>
            <p>2. 📧 You'll receive a pre-workshop setup guide 1 week before (April 18)</p>
            <p>3. 💻 Make sure you have a laptop + free ChatGPT account ready</p>
            <p>4. 📍 Best Western Gateway Grand, Gainesville, FL — 8:30 AM</p>
          </div>
          <p className="mt-6 text-base text-text/80">Questions? Email {contactEmail}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/" className="btn-secondary">Return to the workshop page</Link>
            <button className="btn-primary" type="button">Invite a fellow business owner</button>
          </div>
        </div>
      </div>
    </div>
  );
}
