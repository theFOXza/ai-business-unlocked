'use client';

interface OpportunityBadgeProps {
  label: string;
  color: string;
}

export default function OpportunityBadge({ label, color }: OpportunityBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
      style={{ borderColor: color, color }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      {label}
    </span>
  );
}
