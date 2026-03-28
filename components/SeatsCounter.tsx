import { seatsRemaining } from '@/lib/site';

export default function SeatsCounter() {
  const count = Number.isFinite(seatsRemaining) ? seatsRemaining : 25;
  return (
    <p className="mt-3 text-sm font-semibold text-urgent">
      Only {count} seats remaining
    </p>
  );
}
