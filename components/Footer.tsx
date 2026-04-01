import Image from 'next/image';
import { contactEmail } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="logo" aria-label="AI for Business Unlocked">
            <Image
              src="/logo.jpg"
              alt="AI for Business Unlocked"
              width={32}
              height={32}
              style={{ borderRadius: '6px' }}
            />
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
