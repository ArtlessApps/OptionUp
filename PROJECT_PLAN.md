# OptionUp - Project Plan

## Executive Summary

**Product:** Gamified options trading education platform (web-first PWA)  

**Business Model:** $20/month subscription (~4,167 subscribers = $1M ARR)  

**Target Market:** Retail traders intimidated by options (millions of potential users)  

**Founder Advantage:** Financial professional with app development experience (Cursor)  

**Timeline:** 6-week MVP → Launch → Validate → Native app (if metrics warrant)

---

## Core Product Decisions

### Platform Strategy

- **Start:** Progressive Web App (PWA) - mobile-responsive web app
- **Why:** Fast validation (6 weeks vs 6 months), instant deployment, SEO discovery, no App Store friction
- **Later:** Port to React Native or wrap with Capacitor if validation succeeds
- **Design:** Mobile-first (feels native even though it's web)

### UX Philosophy

- **Model:** Duolingo-style micro-lessons (5-10 min each)
- **Engagement:** Gamification (XP, streaks, badges, leaderboards)
- **Learning:** Progressive unlocking (can't skip ahead)
- **Core Loop:** Hook → Teach → Practice → Reinforce → Reward

---

## Curriculum Design

### Content Framework

**Foundation:** CFA curriculum (Levels 1-2 derivatives) adapted for retail traders  

**Application:** Most common retail option strategies  

**Differentiator:** Real trade autopsies + common mistakes + "when NOT to trade"

### Module 1: Fundamentals (18 lessons including subsections)

1. Options vs Stocks
2. Calls vs Puts
3. Strike Price & Expiration
4. Premium: Intrinsic vs Time Value
5. Profit/Loss Diagram
6. Buying a Call
7. Buying a Put
7a. Bid-Ask Spreads & The Hidden Tax ⭐ NEW
7b. Order Types - Never Use Market Orders ⭐ NEW
8. In the Money vs Out of the Money
9. Theta - Why Options Decay
10. Assignment & Exercise (EXPANDED with early assignment risk)
11. Max Loss vs Max Gain
12. Position Sizing
13. Liquidity & Bid-Ask Spread
14. Choosing Expiration Dates (EXPANDED with expiration week dynamics)
15. Reading an Options Chain
15a. Understanding Buying Power ⭐ NEW

### Module 2: Income Strategies (14 lessons including subsections)

16. Covered Call Basics (EXPANDED with dividend capture)
17-21. Covered Call mechanics & case studies
21a. Choosing Your Trading Platform ⭐ NEW
22-27. Cash-Secured Puts & Wheel Strategy
27a. Rolling Positions ⭐ NEW

### Module 3: Spreads & Advanced (15 lessons including subsections)

28-41. Spreads, calendars, diagonals, LEAPS, PMCC
41a. Synthetic Positions ⭐ NEW
42. When NOT to Trade

### Module 4: Neutral Strategies (12 lessons)

43-54. Iron condors, butterflies, strangles, adjustments

### Module 5: The Greeks (10 lessons)

55-64. Delta, Gamma, Theta, Vega, IV, Rho, Greeks in spreads

### Module 6: Risk Management & Taxes (12 lessons)

65-76. Earnings, VIX, portfolio heat, correlation, taxes, wash sales

### Module 7: Real Trades & Next Steps (11 lessons including subsections)

77-85. Real trade autopsies, trading plan, backtesting, journal
85a. Paper Trading Mastery ⭐ NEW
86. Next Steps (EXPANDED with 10-point "Ready to Trade?" checklist)

**Total: 93 lessons** (86 original + 7 new gap-fill lessons with letter suffixes)

---

## Technical Architecture

### Lesson Flow Structure (Each Lesson = 7-12 Screens)

```
1. HOOK (1 screen, 15 sec)
   └─ "Why this matters" moment

2. TEACH (2-4 screens, 2-3 min)
   ├─ Core definition
   ├─ Real-world analogy
   ├─ Interactive example
   └─ [Optional] Edge case

3. PRACTICE (3-5 screens, 3-5 min)
   ├─ Multiple choice (easy - recognition)
   ├─ Calculation (medium - application)
   ├─ Scenario (hard - judgment)
   └─ [Optional] Simulation (synthesis)

4. REINFORCE (1 screen, 1-2 min)
   └─ 3 key takeaways summary

5. REWARD (1 screen, 15 sec)
   └─ XP + streak + badge + next lesson CTA
```

### Component System (Reusable Architecture)

**Level 1: Atomic Components**

- `Button`, `Card`, `ProgressBar`, `XPBadge`, `InteractivePriceChart`

**Level 2: Screen Components (9 reusable templates)**

1. `HookScreen` - Opening hook
2. `DefinitionScreen` - Term + explanation
3. `AnalogyScreen` - Real-world metaphor
4. `InteractiveExampleScreen` - Sliders, toggles, simulations
5. `MultipleChoiceScreen` - Question + options + feedback
6. `CalculationScreen` - Input field + validation + explanation
7. `SimulationScreen` - Paper trading scenarios
8. `SummaryScreen` - Flip cards with key points
9. `RewardScreen` - Celebration + progress

**Level 3: Lesson Container**

- `LessonFlow` - Orchestrates screens, manages navigation, tracks XP

### Content Structure (JSON-driven)

```json
{
  "id": "call-option-basics",
  "title": "What is a Call Option?",
  "estimatedTime": "6 min",
  "totalXP": 60,
  "screens": [
    {
      "type": "hook",
      "props": { "visual": "/images/...", "headline": "..." }
    },
    {
      "type": "multipleChoice",
      "props": { "question": "...", "options": [...], "xpReward": 10 }
    }
    // ... 7 more screens
  ]
}
```

**Key Insight:** All lesson content lives in JSON files. Components render dynamically based on screen `type`.

### File Structure

```
src/
├── components/
│   ├── atomic/          (Button, Card, etc.)
│   ├── screens/         (9 screen templates)
│   └── containers/      (LessonFlow, Dashboard)
├── content/
│   └── lessons/         (JSON files for each lesson)
├── lib/
│   ├── lessonEngine.ts
│   └── progressTracker.ts
└── types/
    └── lesson.types.ts
```

---

## Animation Strategy

### Tier 1: Essential (Must Have)

- Correct/incorrect feedback (green checkmark slide, red X shake)
- Button press effects (scale 0.95x)
- Progress bar smooth fill
- Screen transitions (fade or slide)

**Time:** 1-2 days with Framer Motion

### Tier 2: Delightful (Nice to Have)

- Celebration confetti (canvas-confetti library)
- XP count-up animation (react-countup)
- Card flip interactions
- Streak flame pulse

**Time:** 2-3 days

### Tier 3: Polish (Optional for MVP)

- Custom mascot
- Complex chart animations
- Loading skeletons

**Libraries:** Framer Motion (primary), canvas-confetti, react-countup

---

## 6-Week Development Roadmap

### Week 1: Validate Everything

**Goal:** One perfect lesson + extracted components

- **Days 1-3:** Hard-code "What is a Call Option?" (all 9 screens)
- **Days 4-5:** Refactor into reusable screen components
- **Deliverable:** Working lesson + component library

### Week 2: Prove Scalability

**Goal:** Architecture that works

- **Day 1:** Build lesson #2 using components ("What is a Put Option?")
- **Day 2:** Build lesson #3 ("Intrinsic vs Time Value")
- **Days 3-5:** Refine architecture based on friction
- **Success Metric:** Lesson #2 takes 2 hours, not 2 days

**Deliverable:** 3 complete lessons + proven JSON → component system

### Week 3-4: Content Sprint

**Goal:** Complete Module 1 (18 lessons including subsections)

- Build lessons 4-15a (2-4 hours each)
- Content includes: Greeks, position sizing, covered calls, cash-secured puts, bid-ask spreads, order types, buying power
- **Deliverable:** Full Module 1 ready to launch

### Week 5: Build the Wrapper

**Goal:** Make it feel like a product

- Lesson map / home screen (skill tree view)
- User accounts + authentication
- Progress tracking (XP, streaks, completed lessons)
- Basic analytics

**Deliverable:** Complete user experience

### Week 6: Polish & Launch

**Goal:** Ship it

- Add Tier 1 + 2 animations
- Build landing page
- Deploy as PWA
- Soft launch (Product Hunt, Reddit, Twitter)

**Deliverable:** Live product with 93 lessons (complete curriculum)

---

## Tech Stack

**Frontend:**

- React + TypeScript (type safety)
- Vite (fast dev server)
- Tailwind CSS (rapid styling)
- Framer Motion (animations)
- Zustand or Context API (state management)

**Data/Storage:**

- JSON files for content (easy to edit, version control)
- Local storage for progress (offline-first)
- Later: Supabase or Firebase for sync across devices

**Deployment:**

- Vercel or Netlify (one-click PWA deployment)
- PWA features: service workers, offline mode, "Add to Home Screen"

---

## Critical Success Factors

### Week 1 Validation Questions

- ✅ Does the lesson flow feel engaging?
- ✅ Is 6 minutes the right length?
- ✅ Do practice questions test actual understanding?

### Week 2 Scalability Test

- ✅ Can you build lesson #2 in 2 hours (just content)?
- ✅ Are components flexible enough for all lesson types?
- ✅ Is JSON structure intuitive?

**If lesson #2 takes 2 hours → Architecture works ✅**  
**If lesson #2 takes 2 days → Refactor before continuing ❌**

### Post-Launch Metrics (Validate before native app)

- 500+ active users on web
- Positive curriculum feedback
- $20/month pricing validated
- 3+ lessons/week engagement

---

## Regulatory Considerations

**Critical:** This is education, not financial advice

- Never give specific trade recommendations
- Clear disclaimers on every lesson
- Consider consulting fintech lawyer ($1-2k) before launch
- Avoid triggering investment advisor registration requirements

**Safe language:** "Here's how covered calls work" vs "You should sell covered calls on AAPL"

---

## Curriculum Updates (November 2025)

**Gap Analysis Implementation:**
- ✅ All 12 critical gaps addressed
- ✅ 7 new lessons created (bid-ask spreads, order types, buying power, broker selection, rolling, synthetics, paper trading)
- ✅ 4 existing lessons expanded (early assignment risk, expiration week dynamics, dividend capture, go-live checklist)
- ✅ Letter suffix numbering system implemented (07a, 07b, etc.) for proper sequencing
- ✅ Total curriculum: 93 lessons (86 original + 7 new)
- See `GAP_ANALYSIS_IMPLEMENTATION.md` for complete details

## Monetization Strategy

**Freemium Model:**

- First 3 lessons free (hook users)
- $20/month for full access (all 93 lessons)
- No trial period initially (avoid churn complexity)

**Target:** 4,167 paying subscribers = $1M ARR

**Acquisition Channels:**

1. SEO ("learn options trading", "call option tutorial")
2. Reddit (r/options, r/investing - careful with rules)
3. LinkedIn posts (financial professional credibility)
4. YouTube shorts (one concept per video)
5. Product Hunt launch

---

## Next Immediate Steps

### Step 1: Set Up Project (1 hour)

```bash
npm create vite@latest duolingo-options -- --template react-ts
cd duolingo-options
npm install
npm install framer-motion tailwindcss
npm install canvas-confetti react-countup
```

### Step 2: Build First Screen (Hard-coded)

Create `src/pages/LessonOne.tsx`:

- Start with Hook screen
- Hard-code everything
- Make it work, don't worry about beauty

### Step 3: Build All 9 Screens (Days 1-3)

Complete the full "What is a Call Option?" lesson as one component.

### Step 4: Extract Components (Days 4-5)

Refactor into:

- `HookScreen.tsx`
- `MultipleChoiceScreen.tsx`
- etc.

### Step 5: Create JSON Content (Day 5)

Move all content from hard-coded version into `call-option-basics.json`

### Step 6: Build LessonFlow Orchestrator (Day 5)

Dynamic component that reads JSON and renders appropriate screens.

---

## Key Design Principles

1. **Mobile-first:** Every interaction thumb-friendly
2. **One action per screen:** Never overwhelm user
3. **Immediate feedback:** No waiting for "submit"
4. **Visual > text:** Show, don't just tell
5. **Celebrate micro-wins:** +10 XP on every correct answer
6. **No punishment:** Wrong answers = explanation + retry
7. **Progress always visible:** Top bar showing completion
8. **Skippable animations:** Never block user flow

---

## Open Questions / Decisions Needed

1. **User authentication:** Email/password vs Google OAuth vs magic links?
2. **Payment processor:** Stripe vs Paddle vs LemonSqueezy?
3. **Analytics:** PostHog vs Mixpanel vs simple GA4?
4. **Hosting:** Vercel vs Netlify vs Cloudflare Pages?
5. **Paper trading data:** Real-time API (expensive) vs simulated (free)?

**Recommendation:** Start simple (email/password, Stripe, GA4, Vercel, simulated data). Upgrade later if needed.

---

## Resources to Reference

- **Duolingo:** Study their lesson pacing and micro-interactions
- **Brilliant.org:** Great interactive examples for complex concepts
- **Khan Academy:** Clear explanations, good video pacing
- **CFA Curriculum:** Level 1 & 2 Derivatives sections (your content source)

