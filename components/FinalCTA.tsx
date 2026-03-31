import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ maxWidth: '18ch', margin: '0 auto var(--space-6)' }}>
          April 25, 2026 · Gainesville, FL
        </h2>
        <p className="section-desc" style={{ margin: '0 auto var(--space-8)' }}>
          One day. Real tools. Your business, smarter.
        </p>
        <Link href="#register" className="btn btn-primary btn-lg">
          Reserve My Seat Now — ${ticketPrice}
        </Link>
      </div>
    </section>
  );
}
