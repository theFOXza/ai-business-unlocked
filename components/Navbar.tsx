'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function Navbar() {
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
        <Link href="#hero" className="logo" aria-label="AI for Business Unlocked home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
            <path
              d="M16 6C12.69 6 10 8.69 10 12v1.5H8.5A1.5 1.5 0 0 0 7 15v9a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 25 24v-9a1.5 1.5 0 0 0-1.5-1.5H22V12c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v1.5h-8V12c0-2.21 1.79-4 4-4zm0 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
              fill="white"
            />
          </svg>
          <span className="logo-text">
            AI for Business <strong>Unlocked</strong>
          </span>
        </Link>

        <div className="nav-right">
          <Link href="#register" className="btn btn-primary btn-sm">
            Register Now — ${ticketPrice}
          </Link>
        </div>
      </nav>
    </header>
  );
}
