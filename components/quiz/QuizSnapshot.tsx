import Link from 'next/link';
import type { QuizResult } from '@/lib/quiz-scoring';
import OpportunityBadge from './OpportunityBadge';
import OpportunityChart from './OpportunityChart';

interface QuizSnapshotProps {
  result: QuizResult;
  shareUrl: string;
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

export default function QuizSnapshot({ result, shareUrl }: QuizSnapshotProps) {
  const monthlyHours = {
    min: Math.round(result.estimatedHoursPerWeek.min * 4.3),
    max: Math.round(result.estimatedHoursPerWeek.max * 4.3),
  };
  const topArea = [...result.opportunityAreas].sort((a, b) => b.score - a.score)[0];

  const shareText = `I just took the AI Opportunity Assessment and scored ${result.score}/${result.maxScore}. Curious where your business stands?`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              AI Opportunity Snapshot
            </p>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-text)] sm:text-4xl">
              {result.score}/{result.maxScore}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">Your AI Opportunity Score</p>
          </div>
          <OpportunityBadge label={result.gradeLabel} color={result.gradeColor} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Estimated Time Savings
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {result.estimatedHoursPerWeek.min}–{result.estimatedHoursPerWeek.max}
              {result.estimatedHoursPerWeek.max === 25 ? '+' : ''} hours/week
            </div>
            <div className="mt-1 text-sm text-[var(--color-text-muted)]">
              ({monthlyHours.min}–{monthlyHours.max}
              {result.estimatedHoursPerWeek.max === 25 ? '+' : ''} hours/month)
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
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Opportunity Breakdown</h2>
          <div className="mt-4">
            <OpportunityChart areas={result.opportunityAreas} />
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">Your Opportunity Areas</h2>
        <div className="mt-6 space-y-6">
          {result.opportunityAreas.map((area) => (
            <div key={area.name}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-[var(--color-text)]">{area.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {levelLabel(area.level)}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">Recommended First Step</h2>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          {topArea?.firstStep}
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Pick one repeatable workflow, drop in a real example, and ask AI to draft a reusable template your team can tweak and reuse.
        </p>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-primary-soft)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">What this means for your business</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            You have clear, near-term opportunities to reduce repetitive work and redirect time into higher-value projects. Focus on the top area first, prove the time savings, then expand to the next opportunity.
          </p>
        </div>
        <div className="mt-6">
          <Link href="/#register" className="btn btn-primary btn-full">
            Ready to implement this? Join AI for Business Unlocked →
          </Link>
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">Share your results</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {shareLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)]"
            >
              Share on {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
