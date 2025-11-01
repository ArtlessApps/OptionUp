# OptionUp - Quick Start Guide 🚀

## What's New?

Your app now has a complete **authentication and monetization system**! Here's what you can do:

### 🎯 New Features

1. **User Authentication**
   - Sign up / Sign in with email & password
   - Google OAuth login
   - Persistent sessions across page refreshes

2. **Premium Subscription**
   - First 15 lessons FREE (Module 1)
   - Lessons 16-76 require premium subscription
   - Pricing: **$9.99/month** or **$79.99/year** (save 33%)

3. **User Profile**
   - View your XP, streak, and progress
   - Manage subscription
   - Sign out

4. **Cloud Sync**
   - Your progress saves to the cloud when logged in
   - Access your progress from any device

---

## Testing Right Now (No Setup Required)

You can test the app immediately without configuring Supabase or Stripe:

```bash
npm run dev
```

**What works without setup:**
- ✅ All lesson content
- ✅ Local progress tracking (localStorage)
- ✅ Paywall UI (locks lessons 16+)
- ✅ Auth screens (UI only)
- ✅ Profile page (UI only)
- ✅ Upgrade screens (UI only)

**What requires setup:**
- ❌ Actual user signup/login
- ❌ Cloud progress sync
- ❌ Real payment processing

The app gracefully handles missing credentials - everything still works, just without cloud features.

---

## Next Steps for Production

To make your app production-ready, follow these steps:

### 1. Configure Supabase (30 minutes)

**Why:** Enable user authentication and cloud progress sync

**Steps:**
1. Create a free Supabase project at https://supabase.com
2. Run the SQL commands in `SETUP.md` to create tables
3. Get your API credentials
4. Add to `.env` file:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```
5. Restart dev server

**Test:** Try creating an account and completing a lesson. Your progress should sync!

---

### 2. Configure Stripe (15 minutes)

**Why:** Accept real payments from users

**Steps:**
1. Create a Stripe account at https://stripe.com
2. Create two products:
   - Monthly: $9.99/month
   - Yearly: $79.99/year
3. Get your publishable key
4. Add to `.env`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

**Note:** You'll also need a backend API for secure checkout (see `SETUP.md` for details)

---

### 3. Build Backend API (1-2 hours)

**Why:** Securely create Stripe checkout sessions and handle webhooks

**Options:**
- Use Vercel/Netlify Functions (easiest)
- Build a Node.js/Express API
- Use Supabase Edge Functions

**See:** `SETUP.md` for example code

---

### 4. Deploy (30 minutes)

**Frontend:**
```bash
npm run build
```

Deploy `dist/` folder to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Your own hosting

**Backend:**
- Deploy your API functions
- Set up Stripe webhooks pointing to your API
- Configure production environment variables

---

## File Structure Overview

```
src/
├── lib/
│   ├── AuthContext.tsx           # User authentication logic
│   ├── SubscriptionContext.tsx   # Subscription & paywall logic
│   ├── LessonContext.tsx         # Lesson management (updated)
│   ├── supabase.ts               # Supabase client
│   ├── cloudProgressTracker.ts   # Cloud sync
│   └── progressTracker.ts        # Local storage (existing)
│
├── components/
│   ├── screens/
│   │   ├── AuthScreen.tsx        # Login/signup UI
│   │   ├── ProfileScreen.tsx     # User profile
│   │   ├── UpgradeScreen.tsx     # Subscription purchase
│   │   └── PaywallScreen.tsx     # Locked content modal
│   │
│   ├── containers/
│   │   └── SkillTree.tsx         # Updated with premium locks
│   │
│   └── atomic/
│       └── LessonNode.tsx        # Updated with premium badges
│
├── App.tsx                        # Main router (updated)
└── main.tsx                       # App providers (updated)
```

---

## Environment Variables

Create a `.env` file in your project root:

```bash
# Supabase (required for auth & cloud sync)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Stripe (required for payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Optional
VITE_APP_ENV=development
```

**Security Note:** Never commit `.env` to git! It's already in `.gitignore`.

---

## Testing Checklist

### Without Real Accounts:
- [ ] App loads without errors
- [ ] Can view first 15 lessons
- [ ] Lessons 16+ show ⭐ premium badge
- [ ] Clicking premium lesson shows paywall screen
- [ ] "Sign In" button shows auth screen
- [ ] "Upgrade" button shows pricing screen
- [ ] Local progress saves (check localStorage)

### With Supabase:
- [ ] Can create an account
- [ ] Can log in
- [ ] Can log out
- [ ] Progress syncs to cloud (check Supabase dashboard)
- [ ] Google login works (if configured)

### With Stripe:
- [ ] Can click "Upgrade Now"
- [ ] Checkout session creates
- [ ] Test payment with card `4242 4242 4242 4242`
- [ ] Subscription appears in Stripe dashboard
- [ ] User gets access to premium lessons

---

## Pricing Strategy

**Current Setup:**
- **Free:** Lessons 1-15 (Module 1 - Fundamentals)
- **Premium:** Lessons 16-76 (Modules 2-7)
  - $9.99/month
  - $79.99/year (33% savings)

**Why this makes sense:**
- Module 1 provides enough value to hook users
- 15 lessons = ~2 hours of content (solid free tier)
- Yearly plan incentivizes commitment (8 months for the price of 12)
- ~4,167 paying subscribers = $1M ARR at $20/mo (you chose $9.99, so ~8,334 subscribers needed)

**Future Pricing Ideas:**
- Add 7-day free trial (Stripe supports this)
- Lifetime access option ($299?)
- Team plans (2-5 users)
- Student discounts (with .edu email verification)

---

## Marketing Angles

Now that you have a monetizable product:

1. **Reddit:**
   - r/options (be careful with self-promotion rules)
   - r/investing
   - r/Daytrading
   - r/SideProject (for indie makers)

2. **Product Hunt:**
   - Launch with "Duolingo for Options Trading" tagline
   - Best day: Tuesday-Thursday
   - Prepare images, video demo, and first comment

3. **LinkedIn:**
   - Share your journey building this
   - Target financial professionals
   - Post bite-sized lessons as content

4. **YouTube Shorts / TikTok:**
   - One concept per video
   - "Did you know?" hooks
   - Link to app in bio

5. **SEO:**
   - Blog posts: "How to trade options"
   - Target long-tail keywords
   - Build backlinks

---

## Common Questions

**Q: Do I need a backend server?**  
A: Yes, for Stripe checkout sessions. But you can use serverless functions (Vercel/Netlify) - no need for a full Express server.

**Q: Can I just use a payment link instead of Stripe Checkout?**  
A: Yes, but you'll lose user tracking and can't automatically grant access. Better to use proper integration.

**Q: What if users share their login?**  
A: Not much you can do initially. Focus on getting users first. Later, you can add device limits or concurrent session detection.

**Q: Should I require email verification?**  
A: Not essential for MVP. Adds friction. Enable it later if you see abuse.

**Q: How do I handle refunds?**  
A: Stripe handles refunds. You'll need webhook logic to revoke access when a refund is issued.

---

## Support

If you run into issues:

1. Check the browser console for errors
2. Check Supabase logs (Supabase Dashboard → Logs)
3. Check Stripe logs (Stripe Dashboard → Developers → Logs)
4. Read `SETUP.md` for detailed troubleshooting

---

**Ready to ship? 🚢**

Remember: Better to launch with a basic working payment system than to wait for perfection. You can always improve the UI and add features based on real user feedback!

Good luck with your launch! 🎉

