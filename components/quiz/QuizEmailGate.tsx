'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Enter a valid email address'),
  businessName: z.string().optional(),
});

export type QuizEmailFormValues = z.infer<typeof formSchema>;

interface QuizEmailGateProps {
  onSubmit: (values: QuizEmailFormValues) => Promise<void>;
}

export default function QuizEmailGate({ onSubmit }: QuizEmailGateProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizEmailFormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (values: QuizEmailFormValues) => {
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
      console.error('[quiz-email-gate]', error);
    }
  };

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
      <h3 className="text-xl font-semibold text-[var(--color-text)]">Get your personalized snapshot</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Enter your details and we&apos;ll send the full AI Opportunity Snapshot straight to your inbox.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div>
          <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
          />
          {errors.firstName && <p className="mt-1 text-xs text-[var(--color-accent)]">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
          />
          {errors.email && <p className="mt-1 text-xs text-[var(--color-accent)]">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="businessName">
            Business name (optional)
          </label>
          <input
            id="businessName"
            type="text"
            {...register('businessName')}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
          />
        </div>

        {submitError && <p className="text-sm text-[var(--color-accent)]">{submitError}</p>}

        <button className="btn btn-primary btn-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Get Your Personalized AI Opportunity Snapshot'}
        </button>
        <p className="text-xs text-[var(--color-text-muted)]">
          No spam. No sales calls. Just your personalized results.
        </p>
      </form>
    </div>
  );
}
