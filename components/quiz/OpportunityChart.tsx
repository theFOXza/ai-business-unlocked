'use client';

import type { QuizResult } from '@/lib/quiz-scoring';

interface OpportunityChartProps {
  areas: QuizResult['opportunityAreas'];
}

const areaMaxByName: Record<string, number> = {
  'Customer Communication': 10,
  'Admin & Process Efficiency': 10,
  'Marketing & Content Creation': 5,
  'Documentation & Training': 5,
};

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

export default function OpportunityChart({ areas }: OpportunityChartProps) {
  return (
    <div className="space-y-4">
      {areas.map((area) => {
        const max = areaMaxByName[area.name] ?? 10;
        const percentage = Math.min(100, Math.round((area.score / max) * 100));

        return (
          <div key={area.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[var(--color-text)]">{area.name}</span>
              <span className="text-[var(--color-text-muted)]">{levelLabel(area.level)}</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[var(--color-surface-offset)]">
              <div
                className="h-2.5 rounded-full bg-[var(--color-primary)] transition-all"
                style={{ width: `${percentage}%`, transitionTimingFunction: 'var(--ease-spring)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
