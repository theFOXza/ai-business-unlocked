import Image from 'next/image';
import { contactEmail } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-blue/10 py-10">
      <div className="container-pad flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="AI for Business Unlocked" width={40} height={40} />
          <span className="text-sm font-semibold text-navy">AI for Business Unlocked</span>
        </div>
        <div className="text-sm text-text/70">
          AI for Business Unlocked — April 25, 2026 — Gainesville, FL
        </div>
        <div className="text-sm text-text/70">{contactEmail}</div>
        <div className="text-sm text-text/70">© 2026 AI Business Unlocked</div>
      </div>
    </footer>
  );
}
