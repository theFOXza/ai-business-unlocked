import Link from 'next/link';
import { earlyBirdDeadline, ticketPrice } from '@/lib/site';

function formatDeadline(deadline: string) {
  if (!deadline) return 'Early bird pricing ends soon.';
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return 'Early bird pricing ends soon.';
  return `Early bird pricing ends ${date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}. Regular price: $297.`;
}

export default function UrgencyBanner() {
  return (
    <section className="py-16 bg-navy text-white">
      <div className="container-pad text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Only 25 Seats Available. When They're Gone, They're Gone.
        </h2>
        <Link href="#register" className="btn-primary mt-8 text-lg">
          Reserve My Seat Now — ${ticketPrice}
        </Link>
        <p className="mt-4 text-base text-white/80">{formatDeadline(earlyBirdDeadline)}</p>
      </div>
    </section>
  );
}
