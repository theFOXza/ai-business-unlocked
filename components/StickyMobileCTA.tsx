import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-blue/10 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link href="#register" className="btn-primary w-full text-base">
        Register — ${ticketPrice}
      </Link>
    </div>
  );
}
