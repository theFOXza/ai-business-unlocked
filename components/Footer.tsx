import { contactEmail } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="logo" aria-label="AI for Business Unlocked">
            <img src="/logo.jpg" alt="AI for Business Unlocked" width={36} height={36} style={{ borderRadius: '6px' }} />
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
