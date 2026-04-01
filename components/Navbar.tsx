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
          <img src="/logo.jpg" alt="AI for Business Unlocked" width={48} height={48} style={{ borderRadius: '6px' }} />
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
