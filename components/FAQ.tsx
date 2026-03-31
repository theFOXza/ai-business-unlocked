const faqItems = [
  {
    q: 'Do I need to be tech-savvy?',
    a: 'Not at all. If you can send an email, you can use AI. We start from zero and build up together. Most attendees have never used AI tools before — that\'s exactly who this is designed for.',
  },
  {
    q: 'What do I need to bring?',
    a: "A laptop (charged) and a free ChatGPT account. That's it. We'll send setup instructions before the event so you're ready to go on day one.",
  },
  {
    q: 'Is lunch included?',
    a: 'Coffee, tea, and snacks are provided throughout the day. For lunch (12–1 PM), the hotel has dining available nearby. Or stay for the optional bonus live AI demo during the lunch hour.',
  },
  {
    q: "What if I can't make it?",
    a: 'Tickets are non-refundable but transferable. You can send someone else in your place — just let us know in advance.',
  },
  {
    q: 'What happens after the workshop?',
    a: 'You get 30 days free in our AI Business Lab community — ongoing support, weekly office hours, and new resources dropped regularly. After that, it\'s $97/month if you choose to stay.',
  },
  {
    q: 'How many people will be there?',
    a: 'We cap it at 25 so everyone gets personal attention. This isn\'t a lecture hall — it\'s a working session where you\'ll actually build things alongside people who run businesses like yours.',
  },
];

export default function FAQ() {
  return (
    <section className="section section-offset" id="faq">
      <div className="container container-narrow">
        <div className="section-label reveal">Questions</div>
        <h2 className="section-title reveal reveal-delay-1">We&apos;ve got answers.</h2>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.q} className="faq-item reveal" open={index === 0}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
