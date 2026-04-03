import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="container hero-inner" style={{ alignItems: 'center', textAlign: 'center', maxWidth: '100%' }}>
        <img
          src="/logo.png"
          alt="AI for Business Unlocked logo"
          className="reveal"
          style={{
            width: 'clamp(80px, 15vw, 140px)',
            height: 'auto',
            marginBottom: 'var(--space-4)',
          }}
        />

        <h1
          className="reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--color-text)',
            width: '100%',
            marginBottom: 'var(--space-8)',
          }}
        >
          AI for Business <span style={{ color: 'var(--color-primary)' }}>Unlocked</span>
        </h1>

        <div className="event-badge reveal reveal-delay-1">
          <span className="badge-dot"></span>
          <span>Saturday, April 25, 2026 · Gainesville, FL</span>
        </div>

        <h2 className="hero-headline reveal reveal-delay-2" style={{ textAlign: 'left', alignSelf: 'flex-start' }}>
          Stop guessing.<br />
          <span className="headline-accent">Start using AI</span>
          <br />
          to grow your business.
        </h2>

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
            <span>Saturday, April 25, 2026</span>
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
            <a href="https://maps.google.com/?q=Best+Western+Gateway+Grand+4200+NW+97th+Blvd+Gainesville+FL+32606" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>Best Western Gateway Grand, Gainesville, FL</a>
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
            Early bird pricing for the first 10 seats · Only 25 seats available
          </p>
        </div>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
