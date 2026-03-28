export const seatsRemaining = Number.parseInt(
  process.env.NEXT_PUBLIC_SEATS_REMAINING || '25',
  10
);

export const earlyBirdActive = process.env.NEXT_PUBLIC_EARLY_BIRD_ACTIVE === 'true';

export const earlyBirdDeadline =
  process.env.NEXT_PUBLIC_EARLY_BIRD_DEADLINE || '2026-04-11T23:59:59-04:00';

export const ticketPrice = earlyBirdActive ? 197 : 297;

export const contactEmail = 'hello@aibusinessunlock.com';
