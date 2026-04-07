'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizProgress from '@/components/quiz/QuizProgress';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import QuizEmailGate, { type QuizEmailFormValues } from '@/components/quiz/QuizEmailGate';
import { quizQuestions, quizQuestionCount } from '@/lib/quiz-questions';
import { calculateQuizResult, quizDisclaimer } from '@/lib/quiz-scoring';

const ANSWERS_KEY = 'quiz-answers';
const INDEX_KEY = 'quiz-current-index';

const getStoredAnswers = (): Record<number, string | string[]> => {
  if (typeof window === 'undefined') return {};
  const stored = sessionStorage.getItem(ANSWERS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as Record<number, string | string[]>;
  } catch {
    return {};
  }
};

const getStoredIndex = (): number => {
  if (typeof window === 'undefined') return 0;
  const stored = sessionStorage.getItem(INDEX_KEY);
  if (!stored) return 0;
  const parsed = Number.parseInt(stored, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getStoredUtm = (): { utmSource?: string; utmCampaign?: string; utmMedium?: string } => {
  if (typeof window === 'undefined') return {};
  const stored = sessionStorage.getItem('quiz-utm');
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

export default function QuizTakePage() {
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedAnswers = getStoredAnswers();
    const storedIndex = getStoredIndex();
    setAnswers(storedAnswers);
    setCurrentIndex(Math.min(storedIndex, quizQuestionCount - 1));

    const allAnswered = quizQuestions.every((question) => !!storedAnswers[question.id]);
    if (allAnswered) {
      setShowResults(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(INDEX_KEY, currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    if (transitionState !== 'enter') return;
    const id = requestAnimationFrame(() => setTransitionState('idle'));
    return () => cancelAnimationFrame(id);
  }, [transitionState]);

  const allAnswered = quizQuestions.every((question) => !!answers[question.id]);
  const result = useMemo(() => (allAnswered ? calculateQuizResult(answers) : null), [answers, allAnswered]);

  const currentQuestion = quizQuestions[currentIndex];

  const advance = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionState('exit');

    window.setTimeout(() => {
      setTransitionState('enter');
      setIsTransitioning(false);

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= quizQuestionCount) {
          setShowResults(true);
          return prev;
        }
        return nextIndex;
      });
    }, 220);
  };

  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    advance();
  };

  const handleToggle = (value: string) => {
    const questionId = currentQuestion.id;
    setAnswers((prev) => {
      const existing = prev[questionId];
      const list = Array.isArray(existing) ? existing : existing ? [existing] : [];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [questionId]: next };
    });
  };

  const handleContinue = () => {
    if (!Array.isArray(answers[currentQuestion.id]) || answers[currentQuestion.id].length === 0) return;
    advance();
  };

  const handleShowEmailGate = () => {
    setShowEmailGate(true);
    window.setTimeout(() => {
      document.getElementById('email-gate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleEmailSubmit = async (values: QuizEmailFormValues) => {
    if (!result) throw new Error('Missing result');
    const utm = getStoredUtm();

    const response = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers,
        contact: values,
        utm,
      }),
    });

    if (!response.ok) {
      throw new Error('Submit failed');
    }

    const payload = await response.json();
    if (payload?.token) {
      window.location.href = `/quiz/snapshot?token=${encodeURIComponent(payload.token)}`;
      return;
    }

    if (payload?.id) {
      window.location.href = `/quiz/snapshot?id=${payload.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar homeHref="/" showQuizButton={false} registerHref="/#register" />
      <main className="section">
        <div className="container-narrow space-y-6">
          {!showResults && (
            <QuizProgress current={currentIndex + 1} total={quizQuestionCount} />
          )}

          {!showResults && currentQuestion && (
            <div
              className={`transition-all duration-[220ms] ${
                transitionState === 'exit'
                  ? 'translate-x-[-12px] opacity-0'
                  : transitionState === 'enter'
                    ? 'translate-x-[12px] opacity-0'
                    : 'translate-x-0 opacity-100'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-spring)' }}
            >
              <QuizQuestion
                question={currentQuestion}
                index={currentIndex + 1}
                total={quizQuestionCount}
                value={answers[currentQuestion.id]}
                onSelect={handleSelect}
                onToggle={handleToggle}
                onContinue={handleContinue}
              />
            </div>
          )}

          {showResults && result && (
            <div className="space-y-6">
              <QuizResults result={result} onRequestEmailGate={handleShowEmailGate} />
              {showEmailGate && (
                <div id="email-gate" className="space-y-4">
                  <QuizEmailGate onSubmit={handleEmailSubmit} />
                </div>
              )}
              <p className="text-xs text-[var(--color-text-muted)]">{quizDisclaimer}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
