const outcomes = [
  '3 AI-generated marketing assets ready to post TODAY',
  'A repeatable workflow to create a week of content in 10 minutes',
  'Customer service scripts that handle FAQs without hiring anyone',
  'A competitor analysis done in minutes (not days)',
  'Your personal AI action plan for the next 30 days',
  '30 days FREE access to the AI Business Lab community ($97/mo value)',
];

export default function WhatYoullLearn() {
  return (
    <section className="py-16 bg-blue/5">
      <div className="container-pad">
        <h2 className="section-title">What You'll Walk Out With</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item} className="rounded-2xl border border-blue/10 bg-white p-5 shadow-soft">
              <p className="text-base font-semibold text-navy">✅ {item}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base font-semibold text-navy">
          You won't just learn about AI. You'll BUILD with it.
        </p>
      </div>
    </section>
  );
}
