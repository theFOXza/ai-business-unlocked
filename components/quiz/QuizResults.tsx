'use client';

import { useEffect, useMemo, useState } from 'react';
import type { QuizResult } from '@/lib/quiz-scoring';
import OpportunityBadge from './OpportunityBadge';

interface QuizResultsProps {
  result: QuizResult;
  onRequestEmailGate: () => void;
}

const formatCurrency = (value: number): string =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const levelLabel = (level: QuizResult['opportunityAreas'][number]['level']): string => {
  switch (level) {
    case 'very_high':
      return 'Very High';
    case 'high':
      return 'High';
    case 'moderate':
      return 'Moderate';
    default:
      return 'Low';
  }
};

export default function QuizResults({ result, onRequestEmailGate }: QuizResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const monthlyHours = useMemo(() => {
    const min = Math.round(result.estimatedHoursPerWeek.min * 4.3);
    const max = Math.round(result.estimatedHoursPerWeek.max * 4.3);
    return { min, max };
  }, [result]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setAnimatedScore(result.score);
      return;
    }

    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const nextValue = Math.round(progress * result.score);
      setAnimatedScore(nextValue);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [result.score]);

  const topAreas = [...result.opportunityAreas]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <div className="text-5xl font-black text-[var(--color-text)] sm:text-6xl">
          {animatedScore}
        </div>
        <div className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          AI Opportunity Score
        </div>
        <div className="mt-4">
          <OpportunityBadge label={result.gradeLabel} color={result.gradeColor} />
        </div>
        <div className="mt-2 text-sm text-[var(--color-text-muted)]">
          Score: {result.score} / {result.maxScore}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Estimated Time Savings
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {result.estimatedHoursPerWeek.min}–{result.estimatedHoursPerWeek.max}
              {result.estimatedHoursPerWeek.max === 25 ? '+' : ''} hours per week
            </div>
            <div className="mt-1 text-sm text-[var(--color-text-muted)]">
              ({monthlyHours.min}–{monthlyHours.max}
              {result.estimatedHoursPerWeek.max === 25 ? '+' : ''} hours per month)
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Estimated Labor-Value Recapture
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {formatCurrency(result.estimatedMonthlyImpact.min)}–{formatCurrency(result.estimatedMonthlyImpact.max)}
            </div>
            <div className="mt-1 text-sm text-[var(--color-text-muted)]">
              per month redirected to higher-value work
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Your Top Opportunity Areas
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {topAreas.map((area) => (
              <li key={area.name} className="flex items-center justify-between gap-3">
                <span className="font-semibold text-[var(--color-text)]">{area.name}</span>
                <span className="text-[var(--color-text-muted)]">{levelLabel(area.level)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[var(--color-text-muted)]">{result.resultsCopy}</p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Want your full breakdown + first step?
          </p>
          <button className="btn btn-primary btn-full mt-3" onClick={onRequestEmailGate}>
            Get Your Personalized AI Snapshot →
          </button>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            No spam. No sales calls. Just your personalized results.
          </p>
        </div>
      </div>
    </div>
  );
}
