import Link from 'next/link';
import Image from 'next/image';

const headline = 'How Much Repetitive Work Could AI Reduce in Your Business?';

export default function QuizIntro() {
  return (
    <section className="section">
      <div className="container-narrow">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          AI Opportunity Assessment for Small Business Owners
        </p>
        <h1
          className="mt-3 text-3xl font-black text-[var(--color-text)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          {headline}
        </h1>
        <p className="mt-4 text-base text-[var(--color-text-muted)]">
          Discover where AI could help reduce repetitive work, save time, and improve productivity in your business.
        </p>

        <div className="mt-6 grid gap-3 text-sm text-[var(--color-text)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-success)]">✓</span>
            <span>Takes 2 minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-success)]">✓</span>
            <span>10 simple questions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-success)]">✓</span>
            <span>Instant personalized results</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-success)]">✓</span>
            <span>No sign-up required to start</span>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/quiz/take" className="btn btn-primary btn-lg btn-full">
            Take the Free Assessment →
          </Link>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            “Most small businesses are spending 15–25 hours/week on tasks AI can assist with. See where you stand.”
          </p>
        </div>

        <div className="mt-12 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Built by
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full border border-[var(--color-border)]">
                <Image src="/pj-headshot.webp" alt="PeterJohn Fox" width={56} height={56} />
              </div>
              <div>
                <p className="text-sm font-semibold">PeterJohn Fox</p>
                <p className="text-xs text-[var(--color-text-muted)]">AI-First Business Builder</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full border border-[var(--color-border)]">
                <Image
                  src="/james-headshot.png"
                  alt="James Parris"
                  width={56}
                  height={56}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold">James Parris</p>
                <p className="text-xs text-[var(--color-text-muted)]">Local Business Operator</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Hosts of AI for Business Unlocked.
          </p>
        </div>
      </div>
    </section>
  );
}
