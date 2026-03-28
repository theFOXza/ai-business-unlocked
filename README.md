# AI for Business Unlocked — Workshop Site

Sales page + registration for the April 25, 2026 workshop in Gainesville, FL.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout (hosted)
- **Hosting:** Vercel

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env.local` and fill in your Stripe keys:
   ```bash
   cp .env.example .env.local
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Vercel Deployment

This repo is connected to Vercel and auto-deploys on push to `main`.

**Required Vercel Environment Variables:**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_EARLY_BIRD`
- `STRIPE_PRICE_REGULAR`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SEATS_REMAINING=25`
- `NEXT_PUBLIC_EARLY_BIRD_ACTIVE=true`
- `NEXT_PUBLIC_EARLY_BIRD_DEADLINE=2026-04-11T23:59:59-04:00`

Set these in the Vercel dashboard: **Project Settings → Environment Variables**

## Assets Needed

Replace placeholder images in `public/`:
- `pj-headshot.jpg` — PJ's headshot photo
- `james-headshot.jpg` — James's headshot photo
- `og-image.jpg` — Social sharing image (1200×630)

## Structure

```
app/
├── page.tsx                 # Landing page (all sections)
├── thank-you/page.tsx      # Post-purchase confirmation
├── api/checkout/route.ts   # Stripe checkout session
components/                  # All page sections
lib/
├── stripe.ts               # Stripe client
└── site.ts                 # Site config
```

## PRD

Full spec in `PRD.md`

---

Built by Lucius 🔧
