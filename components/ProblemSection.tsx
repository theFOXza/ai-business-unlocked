import Link from 'next/link';

export default function ProblemSection() {
  return (
    <section className="section section-dark" id="pain">
      <div className="container">
        <div className="section-label reveal">Sound Familiar?</div>
        <h2 className="section-title reveal reveal-delay-1">
          Your competitors are already using AI.<br />
          <em>Are you?</em>
        </h2>

        <div className="pain-grid">
          <div className="pain-card reveal">
            <div className="pain-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <p>
              You&apos;re spending <strong>hours writing social posts</strong> that get ignored
            </p>
          </div>
          <div className="pain-card reveal reveal-delay-1">
            <div className="pain-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <p>
              You&apos;re paying <strong>$500/month</strong> for tasks AI can do in 5 minutes
            </p>
          </div>
          <div className="pain-card reveal reveal-delay-2">
            <div className="pain-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
              </svg>
            </div>
            <p>
              You know AI is important but <strong>have no idea where to start</strong>
            </p>
          </div>
          <div className="pain-card reveal reveal-delay-3">
            <div className="pain-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <p>
              You tried ChatGPT once, got a <strong>weird response, and gave up</strong>
            </p>
          </div>
          <div className="pain-card reveal reveal-delay-2">
            <div className="pain-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p>
              Every week you delay costs you <strong>time, money, and customers</strong>
            </p>
          </div>
          <div className="pain-card pain-card-cta reveal reveal-delay-1">
            <p className="pain-resolution">
              This workshop fixes all of that. <strong>In one day.</strong>
            </p>
            <Link href="#register" className="btn btn-primary">
              Fix it →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
