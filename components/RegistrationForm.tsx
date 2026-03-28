'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(7, 'Enter a valid phone number.'),
  businessName: z.string().min(2, 'Business name is required.'),
  industry: z.string().min(1, 'Select an industry.'),
  painPoint: z.string().min(5, 'Share your biggest pain point.'),
  aiFamiliarity: z.string().min(1, 'Select your AI familiarity.'),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  priceLabel: string;
}

export default function RegistrationForm({ priceLabel }: RegistrationFormProps) {
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
    <section id="register" className="py-16">
      <div className="container-pad">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="section-title">Register for the Workshop</h2>
            <p className="section-subtitle">
              Complete the intake form below, then continue to secure Stripe checkout.
            </p>
            <div className="mt-6 rounded-2xl border border-blue/10 bg-blue/5 p-6 text-sm text-text/80">
              <p className="font-semibold text-navy">What happens next:</p>
              <ul className="mt-3 space-y-2">
                <li>• You'll be redirected to secure Stripe checkout.</li>
                <li>• Payment confirms your seat instantly.</li>
                <li>• You'll receive a confirmation email from Stripe.</li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft"
          >
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-semibold text-navy">Full name</label>
                <input
                  {...register('name')}
                  className="mt-2 w-full rounded-xl border border-blue/20 px-4 py-3 text-base"
                  placeholder="Full name"
                />
                {errors.name && <p className="mt-1 text-sm text-urgent">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-2 w-full rounded-xl border border-blue/20 px-4 py-3 text-base"
                  placeholder="Email address"
                />
                {errors.email && <p className="mt-1 text-sm text-urgent">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Phone number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="mt-2 w-full rounded-xl border border-blue/20 px-4 py-3 text-base"
                  placeholder="Phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-urgent">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Business name</label>
                <input
                  {...register('businessName')}
                  className="mt-2 w-full rounded-xl border border-blue/20 px-4 py-3 text-base"
                  placeholder="Business name"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-urgent">{errors.businessName.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Industry</label>
                <select
                  {...register('industry')}
                  className="mt-2 w-full rounded-xl border border-blue/20 bg-white px-4 py-3 text-base"
                >
                  <option value="">Select industry</option>
                  <option>Restaurant</option>
                  <option>Retail</option>
                  <option>Services</option>
                  <option>Health/Wellness</option>
                  <option>Real Estate</option>
                  <option>Construction</option>
                  <option>Other</option>
                </select>
                {errors.industry && <p className="mt-1 text-sm text-urgent">{errors.industry.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Biggest pain point</label>
                <textarea
                  {...register('painPoint')}
                  className="mt-2 w-full rounded-xl border border-blue/20 px-4 py-3 text-base"
                  rows={3}
                  placeholder="What's your biggest pain point right now?"
                />
                {errors.painPoint && <p className="mt-1 text-sm text-urgent">{errors.painPoint.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">AI familiarity</label>
                <select
                  {...register('aiFamiliarity')}
                  className="mt-2 w-full rounded-xl border border-blue/20 bg-white px-4 py-3 text-base"
                >
                  <option value="">Select familiarity</option>
                  <option>Never used it</option>
                  <option>Tried it once</option>
                  <option>Use it sometimes</option>
                  <option>Use it regularly</option>
                </select>
                {errors.aiFamiliarity && (
                  <p className="mt-1 text-sm text-urgent">{errors.aiFamiliarity.message}</p>
                )}
              </div>
            </div>
            {error && <p className="mt-4 text-sm text-urgent">{error}</p>}
            <button type="submit" className="btn-primary mt-6 w-full text-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Redirecting to Stripe…' : `Continue to Payment — ${priceLabel}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
