import Image from 'next/image';
import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue/10 bg-white/90 backdrop-blur">
      <div className="container-pad flex h-16 items-center justify-between">
        <Link href="#top" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="AI for Business Unlocked" width={40} height={40} />
          <span className="text-sm font-semibold text-navy sm:text-base">
            AI for Business Unlocked
          </span>
        </Link>
        <Link href="#register" className="btn-primary text-sm sm:text-base">
          Register Now — ${ticketPrice}
        </Link>
      </div>
    </header>
  );
}
