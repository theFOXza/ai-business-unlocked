import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-new">
      <div className="container footer-main">
        <div className="footer-brand-row">
          <a href="#hero" className="footer-logo-link" aria-label="Back to top">
            <img src="/logo.png" alt="AI for Business Unlocked" width={32} height={32} />
            <span className="footer-logo-text">AI for Business Unlocked</span>
          </a>
        </div>
        <nav className="footer-legal" aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
      </div>
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} AI Business Unlocked. All rights reserved.</p>
      </div>
    </footer>
  );
}
