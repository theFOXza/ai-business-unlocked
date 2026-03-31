'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketPrice } from '@/lib/site';

const formSchema = z.object({
  name: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  industry: z.string().optional(),
  painPoint: z.string().optional(),
  aiFamiliarity: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to start checkout.');
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-dark" id="register">
      <div className="container container-narrow">
        <div className="section-label reveal">Secure Your Spot</div>
        <h2 className="section-title reveal reveal-delay-1">
          Only 25 seats available.<br />When they&apos;re gone, they&apos;re gone.
        </h2>
        <p className="section-desc reveal reveal-delay-2">
          Complete the form below, then continue to secure Stripe checkout. Your seat is confirmed
          the moment payment goes through.
        </p>

        <div className="urgency-bar reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          Early bird pricing of $197 ends April 12, 2026. Regular price: $297.
        </div>

        <form className="reg-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="full-name">
                Full Name <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="full-name"
                placeholder="Jane Smith"
                autoComplete="name"
                {...register('name')}
                required
              />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="jane@yourbusiness.com"
                autoComplete="email"
                {...register('email')}
                required
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="(352) 555-0100"
                autoComplete="tel"
                {...register('phone')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="business-name">Business Name</label>
              <input
                type="text"
                id="business-name"
                placeholder="Acme Local LLC"
                autoComplete="organization"
                {...register('businessName')}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <select id="industry" {...register('industry')}>
                <option value="">Select your industry…</option>
                <option>Restaurant / Food & Beverage</option>
                <option>Retail</option>
                <option>Health & Wellness</option>
                <option>Real Estate</option>
                <option>Professional Services</option>
                <option>Trades / Home Services</option>
                <option>Marketing / Creative</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ai-familiarity">AI Familiarity</label>
              <select id="ai-familiarity" {...register('aiFamiliarity')}>
                <option value="">Select level…</option>
                <option>Complete beginner</option>
                <option>Tried it once or twice</option>
                <option>Use it occasionally</option>
                <option>Use it regularly</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pain-point">Biggest pain point in your business right now</label>
            <textarea
              id="pain-point"
              rows={3}
              placeholder="e.g. Not enough time to create content, struggling to follow up with leads…"
              {...register('painPoint')}
            ></textarea>
          </div>

          <div className="form-steps">
            <div className="step-item step-active">
              <div className="step-num">1</div>
              <span>Fill out this form</span>
            </div>
            <div className="step-arrow" aria-hidden="true">→</div>
            <div className="step-item">
              <div className="step-num">2</div>
              <span>Secure Stripe checkout</span>
            </div>
            <div className="step-arrow" aria-hidden="true">→</div>
            <div className="step-item">
              <div className="step-num">3</div>
              <span>Confirmation email</span>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-xl btn-full" disabled={isSubmitting}>
            {isSubmitting ? 'Redirecting to checkout…' : `Continue to Checkout — $${ticketPrice}`}
            {!isSubmitting && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <p className="form-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secured by Stripe. Your payment confirms your seat instantly.
          </p>
        </form>
      </div>
    </section>
  );
}
