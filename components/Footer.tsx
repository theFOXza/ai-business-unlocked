import { contactEmail } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="logo" aria-label="AI for Business Unlocked">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
              <path
                d="M16 6C12.69 6 10 8.69 10 12v1.5H8.5A1.5 1.5 0 0 0 7 15v9a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 25 24v-9a1.5 1.5 0 0 0-1.5-1.5H22V12c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v1.5h-8V12c0-2.21 1.79-4 4-4zm0 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                fill="white"
              />
            </svg>
            <span className="logo-text">
              AI for Business <strong>Unlocked</strong>
            </span>
          </a>
          <p className="footer-tagline">April 25, 2026 · Gainesville, FL</p>
        </div>
        <div className="footer-contact">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <p className="footer-copy">© 2026 AI Business Unlocked. All rights reserved.</p>
      </div>
    </footer>
  );
}
