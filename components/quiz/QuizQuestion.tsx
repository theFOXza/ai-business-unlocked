'use client';

import type { QuizQuestion as QuizQuestionType } from '@/lib/quiz-questions';

interface QuizQuestionProps {
  question: QuizQuestionType;
  index: number;
  total: number;
  value?: string | string[];
  onSelect: (value: string) => void;
  onToggle: (value: string) => void;
  onContinue?: () => void;
}

const isSelected = (value: string, selected?: string | string[]) => {
  if (!selected) return false;
  if (Array.isArray(selected)) return selected.includes(value);
  return selected === value;
};

export default function QuizQuestion({
  question,
  index,
  total,
  value,
  onSelect,
  onToggle,
  onContinue,
}: QuizQuestionProps) {
  const multiSelect = question.multiSelect;
  const selectionCount = Array.isArray(value) ? value.length : value ? 1 : 0;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        Question {index} of {total}
      </div>
      <h2 className="text-lg font-semibold text-[var(--color-text)] sm:text-xl">{question.text}</h2>

      <div className="mt-6 space-y-3" role={multiSelect ? 'group' : 'radiogroup'}>
        {question.options.map((option) => {
          const selected = isSelected(option.value, value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => (multiSelect ? onToggle(option.value) : onSelect(option.value))}
              className={`flex w-full items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-left transition-all focus-visible:outline-none ${
                selected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]'
              }`}
              style={{ minHeight: '52px' }}
              role={multiSelect ? 'checkbox' : 'radio'}
              aria-checked={selected}
            >
              <span className="text-sm font-semibold text-[var(--color-text)] sm:text-base">{option.label}</span>
              <span
                className={`ml-auto inline-flex h-6 w-6 items-center justify-center border ${
                  selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-[var(--color-border)] text-transparent'
                } ${multiSelect ? 'rounded-[6px]' : 'rounded-full'}`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>

      {multiSelect && (
        <div className="mt-6">
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={onContinue}
            disabled={selectionCount === 0}
            style={{
              opacity: selectionCount === 0 ? 0.6 : 1,
              pointerEvents: selectionCount === 0 ? 'none' : 'auto',
            }}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
