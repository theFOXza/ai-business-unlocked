export default function WhoItsFor() {
  return (
    <section className="section" id="fit">
      <div className="container">
        <div className="section-label reveal">Is This For You?</div>
        <h2 className="section-title reveal reveal-delay-1">A quick check before you register</h2>

        <div className="fit-grid">
          <div className="fit-card fit-yes reveal">
            <div className="fit-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h3>This IS for you if…</h3>
            </div>
            <ul className="fit-list">
              <li>You own or run a small business</li>
              <li>You&apos;re curious but overwhelmed by AI</li>
              <li>You want practical skills, not theory</li>
              <li>You&apos;re in the Gainesville area</li>
              <li>You can bring a laptop</li>
            </ul>
          </div>
          <div className="fit-card fit-no reveal reveal-delay-1">
            <div className="fit-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <h3>This is NOT for you if…</h3>
            </div>
            <ul className="fit-list">
              <li>You want to become an AI engineer</li>
              <li>You&apos;re already an advanced AI user</li>
              <li>You just want to watch, not do</li>
              <li>You&apos;re looking for a magic button</li>
              <li>You don&apos;t have a business to apply it to</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
