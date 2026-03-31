import Link from 'next/link';
import { ticketPrice } from '@/lib/site';

const values = [
  { item: 'Full-day hands-on workshop (8 hours)', price: '$500' },
  { item: 'AI Prompt Pack for Business (50+ prompts)', price: '$97' },
  { item: 'Workbook + Implementation Checklist', price: '$47' },
  { item: '7-Day AI Challenge (guided daily tasks)', price: '$47' },
  { item: '30-Day AI Business Lab Community Access', price: '$97' },
  { item: '1-on-1 Implementation Help (Module 4)', price: '$200' },
  { item: 'Workshop Recording + Slide Deck', price: '$97' },
  { item: 'Coffee, tea & snacks', price: 'Priceless', highlight: true },
];

export default function ValueStack() {
  return (
    <section className="section" id="value">
      <div className="container">
        <div className="value-layout">
          <div className="value-left">
            <div className="section-label reveal">The Value Breakdown</div>
            <h2 className="section-title reveal reveal-delay-1">Here&apos;s everything you get</h2>
            <p className="section-desc reveal reveal-delay-2">
              Most of this you can&apos;t find in a YouTube video. You get it all in one day.
            </p>
            <Link href="#register" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-8)' }}>
              Get All of This for ${ticketPrice} →
            </Link>
          </div>
          <div className="value-right">
            <div className="value-stack reveal">
              {values.map((value) => (
                <div key={value.item} className="value-row">
                  <span className="value-item-name">{value.item}</span>
                  <span className={`value-price${value.highlight ? ' value-price-heart' : ''}`}>
                    {value.price}
                  </span>
                </div>
              ))}
              <div className="value-total">
                <div className="value-total-row">
                  <span>Total Value</span>
                  <span className="value-total-amount">$1,085+</span>
                </div>
                <div className="value-your-price">
                  <span>Your Price</span>
                  <div className="price-stack">
                    <span className="early-bird">$197 Early Bird</span>
                    <span className="regular-price">$297 Regular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
