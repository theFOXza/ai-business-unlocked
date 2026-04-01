import Image from 'next/image';

export default function HostBios() {
  return (
    <section className="section section-dark" id="hosts">
      <div className="container">
        <div className="section-label reveal">Your Hosts</div>
        <h2 className="section-title reveal reveal-delay-1">
          We&apos;re business owners,<br />not AI researchers.
        </h2>
        <p className="section-desc" style={{ maxWidth: '52ch', margin: '0 auto var(--space-12)' }}>
          We use AI every single day to save time, make money, and stay ahead. We built this
          workshop to share exactly what works.
        </p>

        <div className="hosts-grid">
          <div className="host-card reveal">
            <div className="host-avatar">
              <Image
                src="/pj-headshot.webp"
                alt="PeterJohn Fox"
                width={160}
                height={160}
                className="host-photo"
                style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="host-info">
              <h3 className="host-name">PeterJohn Fox</h3>
              <p className="host-role">AI-First Business Builder</p>
              <p className="host-bio">
                Has been using AI to build businesses, automate workflows, and create content at
                scale. Brings the technical playbook translated into plain English.
              </p>
            </div>
          </div>
          <div className="host-card reveal reveal-delay-1">
            <div className="host-avatar">
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="host-info">
              <h3 className="host-name">James Parris</h3>
              <p className="host-role">Local Business Operator</p>
              <p className="host-bio">
                Has been running a deli and managing local businesses as an entrepreneur. Brings
                the real-world operator&apos;s lens — what actually works on the ground.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
