# PRD: AI for Business Unlocked — Workshop Sales & Registration Site

**Version:** 1.0
**Date:** March 28, 2026
**Author:** Alfred 🦇
**For:** Lucius (build) → PJ & James (review)
**Domain:** aibusinessunlock.com

---

## 1. Overview

Build a single-page sales + registration site for "AI for Business Unlocked" — a one-day, in-person workshop teaching local business owners how to use AI practically. The site must sell the event, handle registration, collect intake data, and process Stripe payments. Mobile-first, high-converting, no fluff.

**This is NOT a complex web app.** It's a single high-converting landing page with a Stripe checkout flow. Ship fast.

---

## 2. Locked Decisions (Source: #decisions channel)

| Item | Decision |
|------|----------|
| **Workshop name** | AI for Business Unlocked |
| **Community name** | AI Business Lab (Skool — separate from this site) |
| **Date** | Friday, April 25, 2026 |
| **Time** | 8:30 AM – 4:30 PM |
| **Venue** | Best Western Gateway Grand, Gainesville, FL |
| **Pricing** | $197 early bird / $297 regular |
| **Capacity** | 15–20 ideal, 25 max |
| **Lunch** | 12:00–1:00 PM, optional (hotel lunch room available) |
| **Bonus** | Live AI demo during lunch for those who stay |
| **Post-workshop** | 30-day free Skool community access included with ticket |
| **Skool price** | $97/mo after 30-day trial |
| **Payment** | Stripe Checkout |
| **Intake form** | Business name, industry, biggest pain point, AI familiarity |
| **Hosts** | PeterJohn Fox & James Parris |
| **Logo** | Provided (padlock + AI circuit board, blue gradient) |
| **Domain** | aibusinessunlock.com |

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14+ (App Router) | Fast, SSR, great DX |
| **Styling** | Tailwind CSS | Rapid, mobile-first |
| **Payments** | Stripe Checkout (hosted) | PCI-compliant, fast integration |
| **Hosting** | Vercel | Free tier, instant deploys |
| **Analytics** | Vercel Analytics + Meta Pixel (optional) | Track conversions |
| **Forms** | React Hook Form + Zod | Intake validation |
| **Database** | None needed initially | Stripe handles orders; intake data stored as Stripe metadata |
| **Email** | Stripe receipt + optional webhook → email service | Confirmation on purchase |

**Why Stripe Checkout (hosted) over custom form:**
- Zero PCI scope
- Built-in mobile optimization
- Apple Pay / Google Pay automatic
- Less code = ship faster

---

## 4. Design System

### Brand Colors (derived from logo)
- **Primary:** `#1B3A5C` (deep navy from logo)
- **Secondary:** `#2B7BD5` (bright blue from logo)
- **Accent:** `#4FC3F7` (light blue / circuit glow)
- **Background:** `#FFFFFF` (clean white)
- **Text:** `#1A1A2E` (near-black)
- **Success:** `#22C55E` (green for CTAs, urgency)
- **Urgent/Scarcity:** `#EF4444` (red for countdown, limited seats)

### Typography
- **Headlines:** Inter Bold or Plus Jakarta Sans Bold
- **Body:** Inter Regular
- **Sizes:** Mobile-first scaling (clamp-based)

### Logo
- Provided asset: padlock with "AI" circuit board design
- Use in navbar (small) and hero section (large)
- File location: `/public/logo.png` (supplied by PJ)

### Design Principles
- **Mobile-first** — 70%+ traffic will be mobile from social ads/shares
- **Single column** on mobile, max-width 1200px on desktop
- **No sidebar, no nav links that go elsewhere** — every element drives to CTA
- **Sticky CTA button** on mobile (bottom of screen)
- **Fast** — target < 2s LCP, no heavy images except logo + host photos

---

## 5. Page Structure & Copy Framework

### Conversion Architecture (Hormozi-Inspired)

The page follows the **Value Equation** framework:
> **Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort)**

Every section increases the numerator or decreases the denominator.

The flow also applies the **"100M Offers" stack** principle: pile so much value that the price feels stupid not to pay.

---

### Section-by-Section Breakdown

#### 5.1 — NAVBAR (sticky)
- Logo (left)
- "Register Now — $197" button (right)
- On scroll: compact navbar with CTA always visible
- Mobile: hamburger unnecessary (single page) — just logo + CTA button

#### 5.2 — HERO SECTION
**Purpose:** Hook + Promise + CTA in 5 seconds

```
[Logo — large, centered]

HEADLINE:
"Stop Guessing. Start Using AI to Grow Your Business."

SUBHEADLINE:
"Join 20 local business owners for a hands-on workshop where you'll
build real AI tools for YOUR business — in one day."

EVENT DETAILS (icon row):
📅 Friday, April 25, 2026
📍 Best Western Gateway Grand, Gainesville, FL
⏰ 8:30 AM – 4:30 PM
👥 Limited to 25 Seats

[CTA BUTTON — large, green]
"Reserve My Seat — $197"

[Urgency line below CTA]
"Only XX seats remaining" (dynamic or hardcoded)
```

**Design notes:**
- Clean white background, bold navy text
- Logo centered above headline
- CTA button: `#22C55E` green, large, rounded, subtle shadow
- Event details as horizontal icon row on desktop, stacked on mobile

#### 5.3 — PROBLEM / PAIN AGITATION
**Purpose:** Make them feel the pain of NOT using AI (Hormozi: "Call out the problem")

```
HEADLINE: "Your Competitors Are Already Using AI. Are You?"

BODY (bullet points, conversational):
- You're spending hours writing social media posts that get ignored
- You're paying someone $500/month for tasks AI can do in 5 minutes
- You know AI is important but have no idea where to start
- You've tried ChatGPT once, got a weird response, and gave up
- Every week you delay costs you time, money, and customers

"This workshop fixes all of that. In one day."
```

#### 5.4 — WHAT YOU'LL LEARN (Transformation, not features)
**Purpose:** Show the Dream Outcome

```
HEADLINE: "What You'll Walk Out With"

[Grid of 4-6 outcome cards, icons + short text]

✅ 3 AI-generated marketing assets ready to post TODAY
✅ A repeatable workflow to create a week of content in 10 minutes
✅ Customer service scripts that handle FAQs without hiring anyone
✅ A competitor analysis done in minutes (not days)
✅ Your personal AI action plan for the next 30 days
✅ 30 days FREE access to the AI Business Lab community ($97/mo value)

"You won't just learn about AI. You'll BUILD with it."
```

#### 5.5 — AGENDA / WHAT THE DAY LOOKS LIKE
**Purpose:** Reduce uncertainty (Hormozi: reduce perceived effort/time)

```
HEADLINE: "Your Day, Hour by Hour"

[Timeline layout — clean, visual]

8:30 AM   ☕ Registration + Coffee & Setup
9:00 AM   🎤 Welcome + "Why AI, Why Now"
9:20 AM   🧠 Module 1: AI Foundations + Your First Win
10:30 AM  ☕ Break
10:45 AM  🔧 Module 2: Build Real Business Assets
12:00 PM  🥪 Lunch Break (optional bonus AI demo for those who stay)
1:00 PM   ⚡ Module 3: Workflows & Automation
2:15 PM   ☕ Break
2:30 PM   🎯 Module 4: 1-on-1 Implementation for YOUR Business
3:30 PM   🚀 Community Launch + Your 7-Day AI Challenge
4:00 PM   🎬 Closing + Group Photo

"Every session is hands-on. You'll have something working before lunch."
```

#### 5.6 — VALUE STACK
**Purpose:** Make $197 feel like robbery (Hormozi: "Stack the value")

```
HEADLINE: "Here's Everything You Get"

[Stack items with "value" on the right]

✅ Full-day hands-on workshop (8 hours)         — $500 value
✅ AI Prompt Pack for Business (50+ prompts)     — $97 value
✅ Workbook + Implementation Checklist           — $47 value
✅ 7-Day AI Challenge (guided daily tasks)       — $47 value
✅ 30-Day AI Business Lab Community Access       — $97 value
✅ 1-on-1 Implementation Help (Module 4)         — $200 value
✅ Workshop Recording + Slide Deck               — $97 value
✅ Coffee, tea, and snacks included              — Priceless 😄

TOTAL VALUE: $1,085+

YOUR PRICE: $197 (Early Bird) / $297 (Regular)

[CTA BUTTON]
"Get All of This for $197 →"
```

**Design notes:**
- Each item has a checkmark, description, and right-aligned value
- Strikethrough on total value
- Big price reveal with green highlight
- CTA button immediately below

#### 5.7 — ABOUT YOUR HOSTS
**Purpose:** Build trust + credibility

```
HEADLINE: "Meet Your Hosts"

[Two cards side by side — photo + bio]

PETERJOHN FOX
"PeterJohn has been using AI to build businesses, automate workflows,
and create content since before most people knew what ChatGPT was.
He runs multiple businesses and uses AI daily to save hours of work."

JAMES PARRIS
"James is a local business owner and entrepreneur who's been in the
trenches — running a deli, managing teams, and building businesses
from scratch. He knows what small business owners actually need
because he IS one."

"We're not AI researchers. We're business owners who use AI every day
to save time, make money, and work smarter. That's what we'll teach you."
```

**Note:** PJ/James to provide headshot photos and approve final bios.

#### 5.8 — WHO THIS IS FOR / WHO IT'S NOT FOR
**Purpose:** Qualify + create belonging (Hormozi: "If... then")

```
HEADLINE: "Is This Workshop For You?"

THIS IS FOR YOU IF:                    THIS IS NOT FOR YOU IF:
✅ You own or run a small business     ❌ You want to become an AI engineer
✅ You're curious but overwhelmed      ❌ You're already an advanced AI user
✅ You want practical, not theory      ❌ You just want to watch, not do
✅ You're in the Gainesville area      ❌ You're looking for a magic button
✅ You can bring a laptop              ❌ You don't have a business to apply it to
```

#### 5.9 — FAQ
**Purpose:** Handle objections

```
HEADLINE: "Questions? We've Got Answers."

Q: Do I need to be tech-savvy?
A: Not at all. If you can send an email, you can use AI. We start from
   zero and build up. Most attendees have never used AI before.

Q: What do I need to bring?
A: A laptop (charged) and a free ChatGPT account. We'll send setup
   instructions before the event.

Q: Is lunch included?
A: Coffee, tea, and snacks are provided. For lunch (12-1 PM), the hotel
   has dining available, or you can bring your own. We'll also run a
   bonus live AI demo during the lunch hour if you want to stay.

Q: What if I can't make it?
A: Tickets are non-refundable but transferable. Send someone in your place.

Q: What happens after the workshop?
A: You get 30 days free in our AI Business Lab community — ongoing support,
   weekly office hours, new resources, and a network of business owners
   using AI. After 30 days, membership is $97/month (optional).

Q: How many people will be there?
A: We cap it at 25 so everyone gets personal attention.
   This isn't a lecture — it's a workshop.
```

#### 5.10 — URGENCY / SCARCITY
**Purpose:** Drive action NOW

```
[Highlighted banner section — dark background]

"Only 25 Seats Available. When They're Gone, They're Gone."

[Optional countdown timer to April 25]

[CTA BUTTON — large]
"Reserve My Seat Now — $197"

[Below CTA]
"Early bird pricing ends [DATE]. Regular price: $297."
```

#### 5.11 — FOOTER
- Logo (small)
- "AI for Business Unlocked — April 25, 2026 — Gainesville, FL"
- Contact email
- © 2026 [Business Entity TBD]
- No unnecessary links — keep them on the page

---

## 6. Registration & Checkout Flow

### Flow:
1. User clicks any "Register" CTA button
2. → Scrolls to / opens registration section (or modal)
3. → Intake form collects:
   - Full name
   - Email
   - Phone number
   - Business name
   - Industry (dropdown: Restaurant, Retail, Services, Health/Wellness, Real Estate, Construction, Other)
   - Biggest pain point (short text)
   - AI familiarity (dropdown: Never used it / Tried it once / Use it sometimes / Use it regularly)
4. → "Continue to Payment" button
5. → Stripe Checkout session (hosted page)
   - Product: "AI for Business Unlocked — April 25, 2026"
   - Price: $197 (or $297 depending on early bird status)
   - Success URL: `/thank-you`
   - Cancel URL: back to landing page
6. → Stripe processes payment
7. → Redirect to `/thank-you` page

### Stripe Configuration:
- Create Product in Stripe Dashboard: "AI for Business Unlocked"
- Create two Prices: $197 (early bird) and $297 (regular)
- Use `stripe.checkout.sessions.create()` via API route
- Store intake form data as Stripe Checkout `metadata` (name, business, industry, pain point, AI level)
- Enable: Card payments, Apple Pay, Google Pay
- Stripe webhook (optional Phase 2): trigger confirmation email

### Thank You Page (`/thank-you`):
```
🎉 You're In! See You April 25th.

Here's what happens next:

1. ✅ Check your email for a confirmation receipt
2. 📧 You'll receive a pre-workshop setup guide 1 week before (April 18)
3. 💻 Make sure you have a laptop + free ChatGPT account ready
4. 📍 Best Western Gateway Grand, Gainesville, FL — 8:30 AM

Questions? Email [contact email]

[Share buttons: "Invite a fellow business owner"]
```

---

## 7. Seats Remaining Counter

### Option A: Simple (Recommended for MVP)
- Hardcode the number or use an environment variable
- `NEXT_PUBLIC_SEATS_REMAINING=22`
- Update manually as registrations come in
- Display: "Only {n} seats remaining"

### Option B: Dynamic (Phase 2)
- Stripe webhook counts successful payments
- Stores count in KV store or simple JSON
- Auto-decrements on the page
- Shows "SOLD OUT" when capacity hit

**Recommendation:** Ship with Option A. Switch to B after launch if needed.

---

## 8. Mobile Optimization Requirements

- **Sticky bottom CTA bar** on mobile (always visible "Register — $197" button)
- **No horizontal scroll** — everything single column below 768px
- **Touch-friendly** — all buttons minimum 48px height
- **Font sizes:** minimum 16px body (prevents iOS zoom)
- **Images:** lazy-loaded, WebP format, max 200KB each
- **Scroll performance:** no heavy animations, no parallax
- **LCP target:** < 2.5 seconds on 3G
- **Test on:** iPhone SE (small), iPhone 14 (mid), Samsung Galaxy (Android)

---

## 9. SEO & Meta

```html
<title>AI for Business Unlocked — Hands-On AI Workshop | Gainesville, FL</title>
<meta name="description" content="Learn to use AI for your business in one day. Hands-on workshop for local business owners. April 25, 2026 in Gainesville, FL. Limited to 25 seats." />

<!-- Open Graph -->
<meta property="og:title" content="AI for Business Unlocked" />
<meta property="og:description" content="One-day hands-on AI workshop for business owners. Build real tools for YOUR business." />
<meta property="og:image" content="/og-image.jpg" />  <!-- 1200x630 -->
<meta property="og:url" content="https://aibusinessunlock.com" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
```

**OG Image:** Create a 1200×630 image with logo, event name, date, location. Use for social sharing.

---

## 10. Environment Variables

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_EARLY_BIRD=price_...      # $197
STRIPE_PRICE_REGULAR=price_...          # $297
STRIPE_WEBHOOK_SECRET=whsec_...         # Optional Phase 2
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Site Config
NEXT_PUBLIC_SEATS_REMAINING=25
NEXT_PUBLIC_EARLY_BIRD_ACTIVE=true      # Toggle early bird pricing
NEXT_PUBLIC_EARLY_BIRD_DEADLINE=2026-04-11T23:59:59-04:00

# Optional
NEXT_PUBLIC_GA_ID=G-...                 # Google Analytics
NEXT_PUBLIC_META_PIXEL_ID=...           # Facebook Pixel
```

---

## 11. File Structure

```
ai-business-unlocked/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page (all sections)
│   ├── thank-you/
│   │   └── page.tsx            # Post-purchase confirmation
│   └── api/
│       └── checkout/
│           └── route.ts        # Stripe checkout session creation
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── WhatYoullLearn.tsx
│   ├── Agenda.tsx
│   ├── ValueStack.tsx
│   ├── HostBios.tsx
│   ├── WhoItsFor.tsx
│   ├── FAQ.tsx
│   ├── UrgencyBanner.tsx
│   ├── RegistrationForm.tsx    # Intake form → Stripe redirect
│   ├── StickyMobileCTA.tsx
│   ├── SeatsCounter.tsx
│   └── Footer.tsx
├── lib/
│   └── stripe.ts               # Stripe client init
├── public/
│   ├── logo.png                # Provided by PJ
│   ├── og-image.jpg            # Social sharing image
│   ├── pj-headshot.jpg         # Host photo (PJ to provide)
│   └── james-headshot.jpg      # Host photo (James to provide)
├── .env.local
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## 12. API Route: Stripe Checkout

```typescript
// app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    email,
    phone,
    businessName,
    industry,
    painPoint,
    aiFamiliarity,
  } = body;

  const isEarlyBird = process.env.NEXT_PUBLIC_EARLY_BIRD_ACTIVE === 'true';
  const priceId = isEarlyBird
    ? process.env.STRIPE_PRICE_EARLY_BIRD!
    : process.env.STRIPE_PRICE_REGULAR!;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      name,
      phone,
      businessName,
      industry,
      painPoint,
      aiFamiliarity,
    },
    success_url: `${req.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.nextUrl.origin}/#register`,
  });

  return NextResponse.json({ url: session.url });
}
```

---

## 13. Conversion Best Practices Applied

### From Alex Hormozi ($100M Offers / $100M Leads):
1. **Value Equation** — Every section either increases dream outcome / likelihood or reduces time / effort
2. **Grand Slam Offer** — Stack value so price feels absurd ($1,085 value → $197)
3. **Scarcity** — Real capacity limit (25 seats, venue constraint)
4. **Urgency** — Early bird deadline creates time pressure
5. **Risk Reversal** — Transferable tickets reduce risk of "what if I can't make it"
6. **Naming** — "AI for Business Unlocked" implies transformation (locked → unlocked)

### From Russell Brunson (ClickFunnels):
7. **One page, one offer, one CTA** — No distractions
8. **Hook, Story, Offer** structure throughout
9. **Epiphany bridge** — Host bios tell the story of "we were where you are"

### General High-Converting Landing Page Principles:
10. **Above-the-fold CTA** — Don't make them scroll to buy
11. **Repeat CTA** — Minimum 3 times on the page (hero, after value stack, urgency section)
12. **Social proof** — Add testimonials after first workshop (Phase 2)
13. **Specificity** — "3 AI-generated marketing assets" not "learn about AI"
14. **Single column mobile** — No cognitive overload
15. **Sticky mobile CTA** — Always one tap away from registering
16. **Speed** — Page loads in < 2s (Vercel + Next.js + optimized images)

---

## 14. Phase 2 Enhancements (Post-Launch)

- [ ] Stripe webhook → automated confirmation email with setup guide
- [ ] Dynamic seats counter (webhook-driven)
- [ ] Testimonial section (after April 25 workshop)
- [ ] Video hero (PJ + James 60-second pitch)
- [ ] Facebook Pixel + conversion tracking
- [ ] Google Analytics events (scroll depth, CTA clicks, form starts)
- [ ] A/B test headline variants
- [ ] Countdown timer (JS-based, synced to early bird deadline)
- [ ] Referral discount ("Bring a friend, save $50")
- [ ] Past event photos/video gallery (after first workshop)

---

## 15. Assets Needed from PJ & James

| Asset | Owner | Status |
|-------|-------|--------|
| Logo file (high-res PNG, transparent bg) | PJ | ✅ Provided |
| PJ headshot photo | PJ | ⬜ Needed |
| James headshot photo | James | ⬜ Needed |
| Stripe account (connected, products created) | PJ | ⬜ Needed |
| Host bio copy (approve/edit drafts above) | Both | ⬜ Needed |
| Contact email for site | PJ | ⬜ Needed |
| Domain DNS pointed to Vercel | PJ | ⬜ Needed |
| Early bird deadline date | PJ | ⬜ Needed |
| OG image (1200×630) — or Alfred will generate | Alfred | ⬜ To create |

---

## 16. Success Metrics

| Metric | Target |
|--------|--------|
| Page load (LCP) | < 2.5s |
| Mobile PageSpeed score | > 90 |
| Conversion rate (visit → register) | > 5% |
| Bounce rate | < 50% |
| Seats sold | 20+ |
| Revenue | $3,940+ (20 × $197) |

---

## 17. Timeline

| Date | Milestone |
|------|-----------|
| Mar 29 | PRD approved, Lucius starts build |
| Mar 30 | Core page structure + Stripe integration |
| Mar 31 | Copy in place, mobile optimization |
| Apr 1 | **Landing page live, registration open** |
| Apr 7 | Phase 2 tweaks (analytics, countdown) |
| Apr 11 | Early bird deadline (if set) |
| Apr 18 | Go/no-go on minimum attendance |
| Apr 25 | **Workshop day** |

---

*This PRD gives Lucius everything needed to build and ship. No ambiguity, no "TBD later." Questions → #ask-pj or #ask-james.*
