const outcomes = [
  {
    text: (
      <>
        <strong>3 AI-generated marketing assets</strong> ready to post today
      </>
    ),
  },
  {
    text: (
      <>
        A <strong>repeatable workflow</strong> to create a week of content in 10 minutes
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Customer service scripts</strong> that handle FAQs without hiring anyone
      </>
    ),
  },
  {
    text: (
      <>
        A <strong>competitor analysis</strong> done in minutes, not days
      </>
    ),
  },
  {
    text: (
      <>
        Your <strong>personal AI action plan</strong> for the next 30 days
      </>
    ),
  },
  {
    text: (
      <>
        <strong>30 days FREE access</strong> to the AI Business Lab community{' '}
        <span className="value-tag">$97/mo value</span>
      </>
    ),
  },
];

export default function WhatYoullLearn() {
  return (
    <section className="section" id="outcomes">
      <div className="container">
        <div className="section-label reveal">What You'll Walk Out With</div>
        <h2 className="section-title reveal reveal-delay-1">
          You won&apos;t just <em>learn</em> about AI.<br />You&apos;ll <em>build</em> with it.
        </h2>
        <p className="section-desc reveal reveal-delay-2">
          Every outcome below is something you&apos;ll create at the workshop — not homework for later.
        </p>

        <div className="outcomes-grid">
          {outcomes.map((item, index) => (
            <div
              key={index}
              className={`outcome-item reveal${index % 3 === 1 ? ' reveal-delay-1' : ''}`}
            >
              <div className="outcome-check" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
