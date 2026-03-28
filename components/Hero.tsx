import Image from 'next/image';
import Link from 'next/link';
import SeatsCounter from '@/components/SeatsCounter';
import { ticketPrice } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="bg-hero-gradient pt-16">
      <div className="container-pad flex flex-col items-center text-center">
        <Image
          src="/logo.jpg"
          alt="AI for Business Unlocked"
          width={140}
          height={140}
          className="rounded-2xl shadow-soft"
          priority
        />
        <h1 className="mt-8 font-display text-4xl font-bold text-navy sm:text-5xl">
          Stop Guessing. Start Using AI to Grow Your Business.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-text/80 sm:text-xl">
          Join 20 local business owners for a hands-on workshop where you'll
          build real AI tools for YOUR business — in one day.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 text-left text-sm text-text/80 sm:flex-row sm:justify-center sm:text-base">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>Friday, April 25, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Best Western Gateway Grand, Gainesville, FL</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰</span>
            <span>8:30 AM – 4:30 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>Limited to 25 Seats</span>
          </div>
        </div>
        <Link href="#register" className="btn-primary mt-8 text-lg">
          Reserve My Seat — ${ticketPrice}
        </Link>
        <SeatsCounter />
      </div>
    </section>
  );
}
