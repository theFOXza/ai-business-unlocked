import React from 'react';
import type { QuizResult } from './quiz-scoring';

export interface QuizEmailTemplateProps {
  result: QuizResult;
  snapshotUrl: string;
  siteUrl: string;
}

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

const formatCurrency = (value: number): string =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export function QuizEmailTemplate({ result, snapshotUrl, siteUrl }: QuizEmailTemplateProps) {
  const topAreas = [...result.opportunityAreas].sort((a, b) => b.score - a.score).slice(0, 3);
  const topArea = topAreas[0];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your AI Opportunity Snapshot</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8f7f4', color: '#1a1916' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              border: '1px solid #e2dfd9',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(26,25,22,0.14)',
            }}
          >
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid #e2dfd9' }}>
              <p style={{ margin: 0, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6a67' }}>
                AI Opportunity Assessment
              </p>
              <h1 style={{ margin: '10px 0 8px', fontSize: 28, lineHeight: 1.2 }}>
                Your AI Opportunity Score: {result.score}/{result.maxScore}
              </h1>
              <p style={{ margin: 0, fontSize: 16, color: '#6b6a67' }}>{result.gradeLabel}</p>
            </div>

            <div style={{ padding: '24px 28px' }}>
              <div style={{ backgroundColor: '#f3f2ef', borderRadius: 14, padding: '16px 18px', marginBottom: 16 }}>
                <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Estimated Time Savings</strong>
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  {result.estimatedHoursPerWeek.min}–{result.estimatedHoursPerWeek.max}
                  {result.estimatedHoursPerWeek.max === 25 ? '+' : ''} hours/week
                </span>
              </div>

              <div style={{ backgroundColor: '#f3f2ef', borderRadius: 14, padding: '16px 18px', marginBottom: 16 }}>
                <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Estimated Labor-Value Recapture</strong>
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  {formatCurrency(result.estimatedMonthlyImpact.min)}–{formatCurrency(result.estimatedMonthlyImpact.max)} per month
                </span>
              </div>

              <h2 style={{ fontSize: 18, margin: '24px 0 12px' }}>Your Top Opportunity Areas</h2>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {topAreas.map((area) => (
                  <li key={area.name} style={{ marginBottom: 12 }}>
                    <strong>{area.name}</strong> — {levelLabel(area.level)}
                    <div style={{ fontSize: 13, color: '#6b6a67', marginTop: 4 }}>{area.description}</div>
                  </li>
                ))}
              </ul>

              <h2 style={{ fontSize: 18, margin: '24px 0 12px' }}>Recommended First Step</h2>
              <p style={{ margin: 0 }}>{topArea?.firstStep}</p>

              <div style={{ marginTop: 24, padding: '16px 18px', backgroundColor: '#eef2ff', borderRadius: 14 }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>View your full snapshot online</strong>
                <a href={snapshotUrl} style={{ color: '#3730a3', textDecoration: 'underline' }}>
                  {snapshotUrl}
                </a>
              </div>

              <div style={{ marginTop: 20 }}>
                <a
                  href={`${siteUrl}/#register`}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#3730a3',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  Want help implementing this? Join our next workshop →
                </a>
              </div>
            </div>
          </div>
          <p style={{ margin: '16px 8px 0', fontSize: 12, color: '#6b6a67' }}>
            This assessment provides estimates based on your self-reported answers. Actual results will vary based on your specific business, team, and implementation. The AI Opportunity Score is a directional tool designed to help you identify areas of potential improvement — not a guarantee of specific savings. AI assists with tasks but does not replace professional judgment, leadership, or strategy.
          </p>
        </div>
      </body>
    </html>
  );
}
