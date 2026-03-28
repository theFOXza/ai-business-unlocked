const faqItems = [
  {
    q: 'Do I need to be tech-savvy?',
    a: 'Not at all. If you can send an email, you can use AI. We start from zero and build up. Most attendees have never used AI before.',
  },
  {
    q: 'What do I need to bring?',
    a: "A laptop (charged) and a free ChatGPT account. We'll send setup instructions before the event.",
  },
  {
    q: 'Is lunch included?',
    a: "Coffee, tea, and snacks are provided. For lunch (12-1 PM), the hotel has dining available, or you can bring your own. We'll also run a bonus live AI demo during the lunch hour if you want to stay.",
  },
  {
    q: "What if I can't make it?",
    a: 'Tickets are non-refundable but transferable. Send someone in your place.',
  },
  {
    q: 'What happens after the workshop?',
    a: 'You get 30 days free in our AI Business Lab community — ongoing support, weekly office hours, new resources, and a network of business owners using AI. After 30 days, membership is $97/month (optional).',
  },
  {
    q: 'How many people will be there?',
    a: "We cap it at 25 so everyone gets personal attention. This isn't a lecture — it's a workshop.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16">
      <div className="container-pad">
        <h2 className="section-title">Questions? We've Got Answers.</h2>
        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
              <p className="text-base font-semibold text-navy">Q: {item.q}</p>
              <p className="mt-2 text-base text-text/80">A: {item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
