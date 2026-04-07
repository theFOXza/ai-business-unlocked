'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

type NavbarProps = {
  homeHref?: string;
  showQuizButton?: boolean;
  registerHref?: string;
};

export default function Navbar({
  homeHref = '#hero',
  showQuizButton = true,
  registerHref = '#register',
}: NavbarProps) {
  useEffect(() => {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href={homeHref} className="logo" aria-label="AI for Business Unlocked home">
          <img src="/logo.png" alt="AI for Business Unlocked" width={48} height={48} style={{ borderRadius: '6px' }} />
        </Link>

        <div className="nav-right">
          {showQuizButton && (
            <Link
              href="/quiz"
              className="btn btn-sm"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
            >
              Free Assessment
            </Link>
          )}
          <Link href={registerHref} className="btn btn-primary btn-sm">
            Register Now — ${ticketPrice}
          </Link>
        </div>
      </nav>
    </header>
  );
}
