import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

const valueItems = [
  { item: 'Full-day hands-on workshop (8 hours)', value: '$500 value' },
  { item: 'AI Prompt Pack for Business (50+ prompts)', value: '$97 value' },
  { item: 'Workbook + Implementation Checklist', value: '$47 value' },
  { item: '7-Day AI Challenge (guided daily tasks)', value: '$47 value' },
  { item: '30-Day AI Business Lab Community Access', value: '$97 value' },
  { item: '1-on-1 Implementation Help (Module 4)', value: '$200 value' },
  { item: 'Workshop Recording + Slide Deck', value: '$97 value' },
  { item: 'Coffee, tea, and snacks included', value: 'Priceless 😄' },
];

export default function ValueStack() {
  return (
    <section className="py-16 bg-blue/5">
      <div className="container-pad">
        <h2 className="section-title">Here's Everything You Get</h2>
        <div className="mt-8 space-y-3">
          {valueItems.map((value) => (
            <div
              key={value.item}
              className="flex flex-col justify-between gap-2 rounded-2xl border border-blue/10 bg-white p-5 shadow-soft sm:flex-row sm:items-center"
            >
              <span className="text-base font-semibold text-navy">✅ {value.item}</span>
              <span className="text-base font-semibold text-text/70">{value.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
          <p className="text-lg font-semibold text-text/70 line-through">TOTAL VALUE: $1,085+</p>
          <p className="mt-4 text-3xl font-bold text-navy">
            YOUR PRICE: $197 (Early Bird) / $297 (Regular)
          </p>
          <Link href="#register" className="btn-primary mt-6 text-lg">
            Get All of This for ${ticketPrice} →
          </Link>
        </div>
      </div>
    </section>
  );
}
