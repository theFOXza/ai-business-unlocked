import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function UrgencyBanner() {
  return (
    <section className="py-16 bg-navy text-white">
      <div className="container-pad text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Only 25 Seats Available. When They&apos;re Gone, They&apos;re Gone.
        </h2>
        <Link href="#register" className="btn-primary mt-8 text-lg">
          Reserve My Seat Now — ${ticketPrice}
        </Link>
        <p className="mt-4 text-base text-white/80">$197 early bird for the first 10 seats. Regular price: $297.</p>
      </div>
    </section>
  );
}
