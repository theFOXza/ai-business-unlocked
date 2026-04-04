'use client';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2" aria-live="polite">
      <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-[var(--color-surface-offset)]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          className="h-2 rounded-full bg-[var(--color-primary)]"
          style={{
            width: `${percentage}%`,
            transition: 'width var(--duration-base) var(--ease-spring)',
          }}
        />
      </div>
    </div>
  );
}
