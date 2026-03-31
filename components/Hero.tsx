import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="event-badge reveal">
          <span className="badge-dot"></span>
          <span>Friday, April 25, 2026 · Gainesville, FL</span>
        </div>

        <h1 className="hero-headline reveal reveal-delay-1">
          Stop guessing.<br />
          <span className="headline-accent">Start using AI</span>
          <br />
          to grow your business.
        </h1>

        <p className="hero-sub reveal reveal-delay-2">
          Join 20 local business owners for a <strong>hands-on, one-day workshop</strong> where
          you&apos;ll build real AI tools for YOUR business — not theory, not slides. You&apos;ll
          leave with assets ready to use.
        </p>

        <div className="hero-meta reveal reveal-delay-3">
          <div className="meta-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Friday, April 25, 2026</span>
          </div>
          <div className="meta-divider" aria-hidden="true"></div>
          <div className="meta-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Best Western Gateway Grand, Gainesville, FL</span>
          </div>
          <div className="meta-divider" aria-hidden="true"></div>
          <div className="meta-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>8:30 AM – 4:30 PM</span>
          </div>
          <div className="meta-divider" aria-hidden="true"></div>
          <div className="meta-item meta-urgent">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Limited to 25 Seats</span>
          </div>
        </div>

        <div className="hero-cta-group reveal reveal-delay-2">
          <Link href="#register" className="btn btn-primary btn-lg">
            Reserve My Seat — ${ticketPrice}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="cta-urgency">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Early bird pricing ends April 12 · Only 25 seats available
          </p>
        </div>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
