# PRD: AI Opportunity Assessment Quiz

**Product:** AI Opportunity Assessment — Interactive Lead Generation Quiz
**URL:** `aibusinessunlock.com/quiz`
**Repo:** `theFOXza/ai-business-unlocked`
**Author:** Alfred (compiled from Alfred + Eli inputs)
**Date:** April 3, 2026
**Status:** Ready for Engineering (Lucius)

---

## 1. Overview

### What We're Building
A self-hosted, interactive quiz that lives at `/quiz` on the existing AI for Business Unlocked site. Small business owners answer 10 multiple-choice questions, receive an instant AI Opportunity Score with diagnostic breakdown, then exchange their email for a personalized "AI Opportunity Snapshot" report.

### Why
- **Lead generation** — quiz funnels convert 30-50% (vs ~5-10% for static lead magnets)
- **Cold email value-add** — "We built a free AI assessment for business owners like you. Takes 2 minutes: [link]"
- **Qualification** — high scorers are ideal workshop prospects; score data informs follow-up
- **Brand credibility** — positions PJ + James as experts who diagnose before they sell

### Strategic Framing (per Eli's refinement)
Position this as a **practical business assessment**, NOT a flashy "AI savings calculator." The tone should be:
- Assessment-driven, not hype-driven
- Diagnostic, not just numerical
- Believable and grounded
- Useful to a skeptical business owner

**Title:** "AI Opportunity Assessment for Small Business Owners"
**Tagline:** "Discover where AI could help reduce repetitive work, save time, and improve productivity in your business."

---

## 2. Tech Stack & Constraints

### Existing Stack (MUST match)
| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 14.2.5** | App Router (`/app` directory) |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS 3.4.6** | Custom config in `tailwind.config.ts` |
| Fonts | **Cabinet Grotesk** (display) + **Satoshi** (body) | Loaded via Fontshare CDN in `layout.tsx` |
| Forms | **react-hook-form** + **zod** | Already installed |
| Email | **Resend** | Already configured (send snapshot report) |
| Payments | **Stripe** | Already configured (not needed for quiz, but available) |
| Hosting | **Vercel** | Auto-deploy from GitHub |
| React | **18.3.x** | |

### Design System (from `globals.css`)
```
Background:     #f8f7f4 (warm off-white)
Surface:        #ffffff
Primary:        #3730a3 (indigo)
Primary Hover:  #2e27a0
Accent:         #d97706 (amber)
Text:           #1a1916
Text Muted:     #6b6a67
Success:        #16a34a
Divider:        #e2dfd9
Border:         #d8d5cf

Radius SM:      0.375rem
Radius MD:      0.625rem
Radius LG:      1rem
Radius XL:      1.5rem

Shadow SM:      0 1px 3px rgba(26,25,22,0.08)
Shadow MD:      0 4px 16px rgba(26,25,22,0.1)
Shadow LG:      0 12px 40px rgba(26,25,22,0.14)

Easing:         cubic-bezier(0.16, 1, 0.3, 1) (spring)
Duration:       220ms (base), 140ms (fast)

Content Max:    980px (default), 640px (narrow)
```

### Component Pattern
Follow the existing pattern in `/components/`:
- One component per file (PascalCase `.tsx`)
- Tailwind utility classes (no CSS modules)
- CSS custom properties for colors: `var(--color-primary)`, etc.
- No external component library (no shadcn/ui, no MUI — everything custom)

---

## 3. File Structure

```
app/
├── quiz/
│   ├── page.tsx              # Quiz landing/intro page
│   ├── take/
│   │   └── page.tsx          # Quiz flow (questions + results)
│   └── snapshot/
│       └── page.tsx          # Post-email thank-you / snapshot preview
├── api/
│   └── quiz/
│       ├── submit/
│       │   └── route.ts      # POST: save results + send snapshot email
│       └── results/
│           └── route.ts      # GET: fetch results by ID (for snapshot page)
components/
├── quiz/
│   ├── QuizIntro.tsx         # Hero/intro section for /quiz
│   ├── QuizQuestion.tsx      # Single question card (reusable)
│   ├── QuizProgress.tsx      # Progress bar (1 of 10)
│   ├── QuizResults.tsx       # Score reveal + diagnostic breakdown
│   ├── QuizEmailGate.tsx     # Email capture form (before full snapshot)
│   ├── QuizSnapshot.tsx      # Full snapshot report view
│   ├── OpportunityBadge.tsx  # Color-coded score badge
│   └── OpportunityChart.tsx  # Visual breakdown of opportunity areas
lib/
├── quiz-scoring.ts           # Scoring logic, time/dollar calculations
├── quiz-questions.ts         # Question data (separated from UI)
├── quiz-results-copy.ts      # Results copy per score range
└── quiz-email-template.tsx   # React Email template for snapshot
```

---

## 4. User Flow

```
[Ad / Cold Email / Social Post]
        │
        ▼
  /quiz (Landing)
  "AI Opportunity Assessment for Small Business Owners"
  [Take the Free Assessment →]
        │
        ▼
  /quiz/take (Quiz Flow)
  ┌─────────────────────────┐
  │  Q1 → Q2 → ... → Q10   │  One question per screen
  │  Progress bar at top     │  Mobile-first, tap-friendly
  │  ~2-3 minutes            │  No typing, all multiple choice
  └─────────────────────────┘
        │
        ▼
  Results Reveal (same page, scroll transition)
  ┌─────────────────────────────────┐
  │  🟡 AI Opportunity Score: 34    │
  │  Grade: Moderate                │
  │  Est. Time Savings: 6-10 hrs/wk│
  │  Est. Labor Value: $645-$1,075  │
  │  Top Areas:                     │
  │   • Customer Communication      │
  │   • Admin & Scheduling          │
  │   • Marketing Content           │
  │                                 │
  │  [Get Your Full Snapshot →]     │
  │  (email gate below)             │
  └─────────────────────────────────┘
        │ (enters email)
        ▼
  /quiz/snapshot?id=xxx
  ┌─────────────────────────────────┐
  │  Full Personalized Snapshot     │
  │  + Recommended First Step       │
  │  + Workshop CTA                 │
  │  (also sent to email via Resend)│
  └─────────────────────────────────┘
```

### Key UX Decisions
- **No account required** — email only at the end, after value is shown
- **Show partial results before email gate** — score + grade + top areas visible; full snapshot (detailed breakdown + first step + dollar estimates) requires email
- **One question per screen** — reduces cognitive load, increases completion
- **No back button** — simpler state management, faster flow (can revisit by retaking)
- **Client-side scoring** — instant results, no loading spinner; API call only on email submission
- **Shareable results URL** — `/quiz/snapshot?id=xxx` for social sharing

---

## 5. Quiz Questions

10 questions. All single-select except Q6 (multi-select). No open-ended. No typing.

### Q1 — Business Type (context)
**"What type of business do you run?"**
- a) Service-based (landscaping, salon, plumbing, consulting, etc.)
- b) Retail or e-commerce
- c) Restaurant or food service
- d) Professional services (law, accounting, real estate, etc.)
- e) Other

### Q2 — Team Size (scale)
**"How many people work in your business (including you)?"**
- a) Just me
- b) 2–5
- c) 6–15
- d) 16–50
- e) 50+

### Q3 — Communication Volume
**"How much time per week does your team spend writing emails, replies, or follow-ups?"**
- a) Less than 1 hour
- b) 1–3 hours
- c) 4–8 hours
- d) 9–15 hours
- e) 16+ hours

### Q4 — Content Creation Frequency
**"How often does someone in your business create social media posts, ads, or marketing content?"**
- a) Rarely or never
- b) A few times a month
- c) Weekly
- d) Several times a week
- e) Daily

### Q5 — Admin Load
**"How much time per week goes into scheduling, admin, or paperwork?"**
- a) Less than 1 hour
- b) 1–3 hours
- c) 4–8 hours
- d) 9–15 hours
- e) 16+ hours

### Q6 — Document Variety (multi-select)
**"Does your business regularly create any of the following?"** *(select all that apply)*
- a) Proposals or quotes
- b) Job descriptions or hiring posts
- c) SOPs or training materials
- d) Reports or summaries
- e) Customer review responses

### Q7 — Follow-Up Gap
**"How do you currently handle customer follow-up after a sale or service?"**
- a) We don't really follow up
- b) Manually — someone sends emails/texts one by one
- c) We have a basic system but it takes time
- d) We have an automated system already
- e) Not sure

### Q8 — Repetition Frequency
**"How often do you or your team repeat the same type of task with minor variations?"**
- a) Rarely
- b) A few times a week
- c) Daily
- d) Multiple times a day
- e) It's most of what we do

### Q9 — Motivation
**"If you could get back 10 hours a week, what would you do with that time?"**
- a) Focus on sales and revenue
- b) Spend time on strategy and growth
- c) Reduce stress and work-life balance
- d) Train or develop my team
- e) All of the above

### Q10 — AI Familiarity (inverse scored)
**"How familiar are you with AI tools like ChatGPT?"**
- a) Never heard of it
- b) Heard of it, never tried it
- c) Tried it once or twice
- d) Use it occasionally
- e) Use it regularly

---

## 6. Scoring Engine

### File: `lib/quiz-scoring.ts`

### Point System
Standard: a=1, b=2, c=3, d=4, e=5
Exception: Q10 is **inverse** (a=5, b=4, c=3, d=2, e=1) — less familiar = more opportunity

### Weights
| Question | Category | Weight |
|----------|----------|--------|
| Q1 | Business Type (context only) | 1x |
| Q2 | Team Size | 1.5x |
| Q3 | Communication | 2x |
| Q4 | Content Creation | 1.5x |
| Q5 | Admin/Process | 2x |
| Q6 | Documentation | 1x per item selected (max 5) |
| Q7 | Follow-Up Gap | 1.5x |
| Q8 | Repetition | 2x |
| Q9 | Motivation | 1x |
| Q10 | AI Familiarity (inverse) | 1x |

### Maximum Score: ~60 points

### Opportunity Area Mapping (Eli's diagnostic approach)
Map answers to 4 opportunity categories, each with its own sub-score:

| Category | Derived From | Label |
|----------|-------------|-------|
| **Communication** | Q3 (email volume) + Q7 (follow-up gap) | "Customer Communication" |
| **Admin & Process** | Q5 (admin load) + Q8 (repetition) | "Admin & Process Efficiency" |
| **Marketing Content** | Q4 (content creation) | "Marketing & Content Creation" |
| **Documentation** | Q6 (document variety) | "Documentation & Training" |

Each category scored independently: Low / Moderate / High / Very High.
Top 3 highest-scoring categories displayed as "Your Top Opportunity Areas."

### Time Savings Estimate
Based on raw scores of Q3 + Q4 + Q5 + Q8:

| Combined Raw Score | Estimated Hours/Week |
|-------------------|---------------------|
| 4–8 | 3–5 |
| 9–12 | 6–10 |
| 13–16 | 11–18 |
| 17–20 | 19–25+ |

**Display:** "Based on your answers, AI could help your team save an estimated **X–Y hours per week**."

### Labor-Value Impact
Formula: `estimated_hours_per_week × $25 × 4.3`

| Hours/Week | Monthly Impact |
|-----------|---------------|
| 3–5 | $325–$540 |
| 6–10 | $645–$1,075 |
| 11–18 | $1,180–$1,935 |
| 19–25 | $2,040–$2,690 |

**Display:** "That's approximately **$X–$Y per month** in labor time that could be redirected to higher-value work."

**Framing rule (Eli):** Always frame as "labor-value recapture" and "time redirected to higher-value work." NEVER say "replace employees," "cut payroll," or "run your business with AI."

### Score Ranges
| Range | Grade | Color | Label |
|-------|-------|-------|-------|
| 10–20 | 🟢 Low | `var(--color-success)` | "Your business is lean — AI could still help in targeted areas" |
| 21–35 | 🟡 Moderate | `#eab308` (yellow-500) | "Clear areas where AI could save you real time" |
| 36–48 | 🟠 High | `var(--color-accent)` | "Significant time on tasks AI can handle" |
| 49–60 | 🔴 Very High | `#ef4444` (red-500) | "AI could transform how your business operates" |

---

## 7. Results Page — Before Email Gate

Shown immediately after Q10, on the same `/quiz/take` page (scroll/transition).

### Layout
```
┌────────────────────────────────────────────┐
│ [Animated score counter: 0 → 34]           │
│                                            │
│  🟡 MODERATE AI OPPORTUNITY                │
│  Score: 34 / 60                            │
│                                            │
│ ┌──────────────────────────────────────┐   │
│ │ Estimated Time Savings               │   │
│ │ 6–10 hours per week                  │   │
│ │ (26–43 hours per month)              │   │
│ └──────────────────────────────────────┘   │
│                                            │
│ ┌──────────────────────────────────────┐   │
│ │ Estimated Labor-Value Recapture      │   │
│ │ $645–$1,075 per month               │   │
│ └──────────────────────────────────────┘   │
│                                            │
│  YOUR TOP OPPORTUNITY AREAS                │
│  ● Customer Communication — High           │
│  ● Admin & Process — Moderate              │
│  ● Marketing Content — Moderate            │
│                                            │
│  ── 2-3 sentence explanation ──            │
│                                            │
│  Want your full breakdown + first step?    │
│                                            │
│  [Get Your Personalized AI Snapshot →]     │
│  (email form appears)                      │
│                                            │
│  "No spam. No sales calls. Just your       │
│   personalized results."                   │
└────────────────────────────────────────────┘
```

### Results Copy (per score range)

**LOW (10–20):**
"Your business is already running lean — nice work. But even efficient operations have pockets where AI could tighten up communication, speed up content, or handle the small stuff that adds up. Your full snapshot shows exactly where."

**MODERATE (21–35):**
"Your team is spending a solid chunk of time on repetitive tasks that AI can assist with — emails, follow-ups, content, admin. The opportunity is real, and your full snapshot breaks down exactly where it's concentrated."

**HIGH (36–48):**
"There's a significant amount of time being spent on work that AI tools can handle faster and more consistently. This isn't about replacing anyone — it's about freeing your team for the work that actually moves the needle."

**VERY HIGH (49–60):**
"Your business has one of the highest opportunity scores we've seen. There's a massive amount of repetitive, process-driven work happening that AI could assist with. The good news: this is fixable, and it doesn't require a tech background."

---

## 8. Email Gate & Snapshot Delivery

### Email Capture Form (QuizEmailGate component)
Fields:
- **First name** (required)
- **Email** (required, validated with zod)
- **Business name** (optional)

CTA Button: **"Get Your Personalized AI Opportunity Snapshot"**
Trust line: "No spam. No sales calls. Just your personalized results."

### On Submit (`POST /api/quiz/submit`)
1. Validate with zod
2. Generate unique result ID (nanoid or uuid)
3. Store to JSON file or Vercel KV (see Data Storage below)
4. Send snapshot email via **Resend**
5. Redirect to `/quiz/snapshot?id=xxx`

### Snapshot Email (via Resend)
**From:** `hello@aibusinessunlock.com` (or whatever Resend is configured for)
**Subject:** `Your AI Opportunity Score: [SCORE] — Here's What It Means`
**Body:** React Email template containing:
- Score + grade + color badge
- Estimated time savings
- Estimated labor-value recapture
- Top 3 opportunity areas with explanations
- Recommended first step (based on top opportunity area)
- CTA: "Want help implementing this? Join our next workshop → [link]"
- Link to view results online: `/quiz/snapshot?id=xxx`

### Recommended First Step Logic
Based on highest-scoring opportunity area:
- **Communication:** "Start by using AI to draft customer follow-up emails and routine replies."
- **Admin & Process:** "Start by using AI to create templates for your most repeated tasks."
- **Marketing Content:** "Start by using AI to batch-create a week of social posts in one sitting."
- **Documentation:** "Start by using AI to generate SOPs for your most common processes."

---

## 9. Data Storage

### Option A: Vercel KV (Recommended if available)
```ts
// Simple key-value store
await kv.set(`quiz:${resultId}`, {
  score, answers, areas, savings, contact, createdAt
}, { ex: 90 * 86400 }); // 90 day TTL
```

### Option B: JSON file (simplest, works for MVP)
```ts
// /data/quiz-results/[id].json
// Gitignored, Vercel ephemeral — fine for MVP volume
```

### Option C: Add to existing Stripe customer metadata
If the user later registers for the workshop, attach quiz score to their Stripe customer record.

### Recommended: Start with Option B, migrate to KV when volume justifies it.

---

## 10. Quiz Landing Page (`/quiz`)

### Purpose
Standalone page that cold emails and ads link to. Must work without context from the main site.

### Layout
```
┌─────────────────────────────────────────────┐
│  [Navbar — same as main site]               │
│                                             │
│  AI Opportunity Assessment                  │
│  for Small Business Owners                  │
│                                             │
│  Discover where AI could help reduce        │
│  repetitive work, save time, and improve    │
│  productivity in your business.             │
│                                             │
│  ✓ Takes 2 minutes                          │
│  ✓ 10 simple questions                      │
│  ✓ Instant personalized results             │
│  ✓ No sign-up required to start             │
│                                             │
│  [Take the Free Assessment →]               │
│                                             │
│  "Most small businesses are spending         │
│   15–25 hours/week on tasks AI can assist   │
│   with. See where you stand."              │
│                                             │
│  ── TRUST SIGNALS ──                        │
│  "Built by PeterJohn Fox & James Parris,    │
│   hosts of AI for Business Unlocked"        │
│  [Small headshots from existing HostBios]   │
│                                             │
│  [Footer — same as main site]               │
└─────────────────────────────────────────────┘
```

### Headlines to A/B Test (Eli-recommended, credibility-first)
1. **"How Much Repetitive Work Could AI Reduce in Your Business?"** ← default
2. "See Where AI Could Save Time in Your Business"
3. "Find the Best Places to Start Using AI in Your Business"
4. "How AI-Ready Is Your Business for Smarter, Faster Work?"

---

## 11. Quiz Flow Page (`/quiz/take`)

### UX Specifications

**One question per screen:**
- Card centered on screen (max-width: 640px)
- Question number + text at top
- Answer options as large tap-friendly buttons (full width, min-height 52px)
- Clicking an answer auto-advances to next question (220ms delay for visual feedback)
- Selected answer gets indigo highlight with checkmark

**Progress bar:**
- Fixed at top of quiz area
- Indigo fill, percentage width
- Shows "Question X of 10"
- Smooth width transition (var(--ease-spring))

**Transitions:**
- Questions slide in from right, slide out to left
- Use CSS transforms + opacity (no heavy animation library)
- Duration: 220ms with spring easing

**Mobile-first:**
- Full viewport quiz area on mobile
- Answer buttons minimum 48px tap target
- No horizontal scrolling
- Progress bar always visible

**Q6 special handling:**
- Multi-select with checkboxes instead of radio buttons
- "Continue →" button appears after at least 1 selection
- Visual difference from single-select questions (checkbox icons)

### State Management
- `useState` array of 10 answers (client-side only)
- Score calculated client-side on completion (instant results)
- No API call until email submission
- Browser `sessionStorage` backup (so refresh doesn't lose progress)

---

## 12. Snapshot Page (`/quiz/snapshot`)

Full results page, accessible after email or via emailed link.

### Content
- Full score breakdown (same as results, but expanded)
- Detailed explanation per opportunity area (2-3 sentences each)
- Recommended first step with mini how-to
- "What This Means for Your Business" section
- Workshop CTA: "Ready to implement this? Join AI for Business Unlocked →"
- Social share buttons (LinkedIn, X, Facebook) with pre-filled text: "I just took the AI Opportunity Assessment and scored [X]/60. Curious where your business stands? [link]"

### SEO
- `noindex, nofollow` (personalized results, not for indexing)
- Dynamic OG image would be nice-to-have (score badge) but not MVP

---

## 13. Follow-Up Email Sequence

Triggered by quiz email submission. Delivered via Resend.

### Email 1 — Immediate (auto-send on submit)
**Subject:** "Your AI Opportunity Score: [SCORE] — Here's What It Means"
Full snapshot report (see Section 8)

### Email 2 — Day 2
**Subject:** "A real example of [TOP OPPORTUNITY AREA] with AI"
A simple case study of how a business like theirs used AI in their top area. Practical, no sell.

### Email 3 — Day 4
**Subject:** "The #1 mistake business owners make with AI (and how to avoid it)"
Common mistake: trying to do everything at once instead of starting with one high-impact workflow. Educational.

### Email 4 — Day 7
**Subject:** "Want hands-on help implementing AI in your business?"
Direct invite to the workshop. Link to aibusinessunlock.com. Early bird pricing if applicable.

> **Note:** Email sequence content will be drafted separately. This PRD defines the triggers and timing; Lucius just needs to set up the submit endpoint to tag the lead for the sequence (or pass to Resend's audience/sequence feature).

---

## 14. Navigation & Integration

### Main Site Nav
Add "Free Assessment" link to the existing `Navbar.tsx`:
- Desktop: text link in nav bar, styled as subtle CTA (e.g., accent color or outlined)
- Mobile: in hamburger menu

### Footer
Add link: "Take the AI Opportunity Assessment →" in footer links

### Sticky Mobile CTA
On `/quiz` landing page only, show a sticky bottom CTA bar (similar to `StickyMobileCTA.tsx` pattern on main page) with "Start Assessment →"

### Cross-linking
- Workshop registration confirmation email → mention the quiz for sharing
- Quiz snapshot page → workshop CTA
- Main site hero → optional "Not ready to commit? Try our free assessment first →" link below main CTA

---

## 15. Analytics & Tracking

### Events to Track (if analytics is set up)
| Event | Trigger | Properties |
|-------|---------|-----------|
| `quiz_started` | User clicks "Take Assessment" | `source` (ad, cold_email, organic) |
| `quiz_question_answered` | Each answer selected | `question_number`, `answer` |
| `quiz_completed` | All 10 answered | `score`, `grade`, `time_taken_seconds` |
| `quiz_email_submitted` | Email form submitted | `score`, `grade`, `business_type` |
| `quiz_snapshot_viewed` | Snapshot page loaded | `score`, `source` (email_link, redirect) |
| `quiz_shared` | Social share button clicked | `platform`, `score` |

### UTM Support
Quiz landing page should read and preserve UTM params:
- `?utm_source=cold_email&utm_campaign=april_batch1`
- Store in sessionStorage, attach to submission payload

---

## 16. Accessibility

- All interactive elements keyboard-navigable
- Answer buttons have focus-visible ring (indigo outline)
- Progress bar has `role="progressbar"` with `aria-valuenow`
- Score reveal respects `prefers-reduced-motion` (skip counting animation)
- Color grades have text labels (not color-only indicators)
- Form fields have proper labels and error messages

---

## 17. Performance Targets

- Lighthouse score: 90+ on mobile
- First Contentful Paint: < 1.5s
- No heavy dependencies (no framer-motion, no chart libraries)
- CSS animations only (transforms + opacity)
- Questions pre-rendered client-side (no API calls during quiz)
- Total JS bundle for quiz pages: < 50KB gzipped

---

## 18. Disclaimer

Display at bottom of results page and in snapshot email:

*"This assessment provides estimates based on your self-reported answers. Actual results will vary based on your specific business, team, and implementation. The AI Opportunity Score is a directional tool designed to help you identify areas of potential improvement — not a guarantee of specific savings. AI assists with tasks but does not replace professional judgment, leadership, or strategy."*

---

## 19. MVP Scope vs Future

### MVP (This Build)
- [x] `/quiz` landing page
- [x] `/quiz/take` — 10 questions, one per screen, progress bar
- [x] Client-side scoring with instant results
- [x] Results page with score, areas, time/dollar estimates
- [x] Email gate with form validation
- [x] `POST /api/quiz/submit` — store results + send snapshot email
- [x] `/quiz/snapshot` — full results page
- [x] Resend email with React Email template
- [x] Mobile-responsive, matches site design system
- [x] Nav integration (link from main site)
- [x] UTM param capture
- [x] Disclaimer

### Phase 2 (Post-Launch)
- [ ] Email drip sequence (emails 2-4 via Resend sequences)
- [ ] Dynamic OG image for social sharing (score badge)
- [ ] Admin dashboard: view quiz submissions, filter by score/type
- [ ] Vercel KV storage (replace JSON files)
- [ ] A/B test headlines on landing page
- [ ] Retargeting pixel integration (Meta, Google)
- [ ] PDF download of snapshot report
- [ ] Aggregate analytics (average score, most common opportunity areas)

---

## 20. Implementation Notes for Lucius

1. **Start from the existing repo** — `git pull` the latest `ai-business-unlocked` and branch off `main`
2. **Branch name:** `feature/ai-opportunity-quiz`
3. **Use existing design tokens** — all colors via `var(--color-*)`, all fonts via `var(--font-display)` / `var(--font-body)`
4. **No new dependencies** unless absolutely necessary — react-hook-form, zod, and Resend are already installed
5. **Scoring logic in `lib/`** — keep it pure TypeScript, no UI dependencies, easy to unit test
6. **Questions data in `lib/`** — typed array of question objects, not hardcoded in components
7. **Resend API key** should already be in Vercel env vars — check before adding
8. **Test the email** — use Resend's test mode or a test email before going live
9. **PR to main** when ready for review — PJ and James will review before merge/deploy

### Env Vars Needed
```
RESEND_API_KEY=           # Should already exist
NEXT_PUBLIC_SITE_URL=     # https://www.aibusinessunlock.com (for snapshot links in emails)
```

### Type Definitions
```ts
// lib/quiz-questions.ts
interface QuizQuestion {
  id: number;
  text: string;
  category: 'context' | 'communication' | 'content' | 'admin' | 'documentation' | 'followup' | 'repetition' | 'motivation' | 'familiarity';
  multiSelect?: boolean;
  inverseScoring?: boolean;
  weight: number;
  options: {
    label: string;
    value: string; // 'a' | 'b' | 'c' | 'd' | 'e'
    points: number;
  }[];
}

// lib/quiz-scoring.ts
interface QuizResult {
  id: string;
  score: number;
  maxScore: number;
  grade: 'low' | 'moderate' | 'high' | 'very_high';
  gradeLabel: string;
  gradeColor: string;
  estimatedHoursPerWeek: { min: number; max: number };
  estimatedMonthlyImpact: { min: number; max: number };
  opportunityAreas: {
    name: string;
    level: 'low' | 'moderate' | 'high' | 'very_high';
    score: number;
    description: string;
    firstStep: string;
  }[];
  topAreas: string[]; // top 3 area names
  resultsCopy: string; // paragraph based on grade
  answers: Record<number, string | string[]>;
  businessType: string;
  teamSize: string;
  aiFamiliarity: string;
}

interface QuizSubmission extends QuizResult {
  contact: {
    firstName: string;
    email: string;
    businessName?: string;
  };
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  createdAt: string;
}
```

---

*End of PRD. Ready for Lucius to build.*
