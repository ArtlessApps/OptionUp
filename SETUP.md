# OptionUp Setup Guide

## 🎉 What's Been Built

Your authentication and monetization system is now complete! Here's what's ready:

### ✅ Completed Features

1. **Authentication System**
   - Email/password signup and login
   - Google OAuth integration
   - Session management with Supabase

2. **Subscription Management**
   - Free tier: First 15 lessons (Module 1)
   - Premium tier: All 76+ lessons
   - Pricing: $9.99/month or $79.99/year (33% savings)

3. **Paywall Logic**
   - Lessons 16+ are locked for non-subscribers
   - Premium lessons show ⭐ badge
   - Smooth upgrade flow

4. **User Screens**
   - Login/Signup screen with Google OAuth
   - Profile page with stats and subscription info
   - Upgrade screen with pricing plans
   - Paywall screen for locked content

5. **Cloud Sync**
   - Progress automatically syncs to Supabase
   - Works across devices when logged in
   - Merges local and cloud progress intelligently

---

## 🚀 Setup Instructions

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the database to initialize (~2 minutes)

### Step 2: Create Database Tables

Go to the SQL Editor in Supabase and run these commands:

```sql
-- User Progress Table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_xp INTEGER DEFAULT 0,
  completed_lessons TEXT[] DEFAULT '{}',
  lesson_progress JSONB DEFAULT '{}',
  current_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own progress
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'none' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'unpaid', 'none')),
  plan TEXT DEFAULT 'monthly' CHECK (plan IN ('monthly', 'yearly')),
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own subscription
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
```

### Step 3: Configure Google OAuth (Optional but Recommended)

1. In Supabase, go to **Authentication → Providers**
2. Enable **Google** provider
3. Follow Supabase's instructions to:
   - Create a Google OAuth app in Google Cloud Console
   - Add authorized redirect URIs
   - Copy Client ID and Client Secret to Supabase
4. Save changes

### Step 4: Get Your Supabase Credentials

1. In Supabase, go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 5: Set Up Stripe

1. Go to [https://stripe.com](https://stripe.com) and create an account
2. Go to **Developers → API Keys**
3. Copy your **Publishable key** (starts with `pk_test_...` for test mode)
4. Create two products in Stripe Dashboard → Products:
   - **OptionUp Monthly**: $9.99/month recurring
   - **OptionUp Yearly**: $79.99/year recurring
5. Note the **Price IDs** for each (starts with `price_...`)

### Step 6: Configure Environment Variables

Create a `.env` file in your project root:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Environment
VITE_APP_ENV=development
```

⚠️ **Important**: Never commit the `.env` file to git!

### Step 7: Backend API for Stripe (Required)

You'll need a backend API to create Stripe Checkout sessions securely. Here's a minimal example using Node.js:

```javascript
// api/create-checkout-session.js (example for Vercel/Netlify Functions)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, userId } = req.body;
  
  const priceId = plan === 'yearly' 
    ? process.env.STRIPE_PRICE_ID_YEARLY 
    : process.env.STRIPE_PRICE_ID_MONTHLY;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
      metadata: { userId },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

You'll also need to:
1. Set up Stripe webhooks to update the `subscriptions` table
2. Listen for events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## 🧪 Testing Locally

### Without Real Auth (Quick Test)
The app will work without Supabase configured - it just won't save progress to the cloud.

### With Supabase (Full Test)
1. Set up your `.env` file with real credentials
2. Run: `npm run dev`
3. Try signing up with a test email
4. Check Supabase Dashboard → Authentication to see the new user
5. Complete a lesson and check the `user_progress` table

### With Stripe (Payment Test)
1. Use Stripe's test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. See the subscription in Stripe Dashboard → Customers

---

## 📋 What's Next

### Immediate TODOs:
1. ✅ Set up Supabase project and tables
2. ✅ Configure environment variables  
3. ⏳ Build backend API for Stripe checkout
4. ⏳ Set up Stripe webhooks
5. ⏳ Test end-to-end user flow

### Future Enhancements:
- Email verification requirement
- Password reset flow
- Subscription management portal (Stripe Customer Portal)
- Cancellation flow
- Team/family plans
- Lifetime access option
- Referral program

---

## 🐛 Troubleshooting

### "Supabase credentials not configured"
- Make sure your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after adding environment variables

### Auth not working
- Check that you've enabled Email provider in Supabase → Authentication → Providers
- For Google OAuth, verify redirect URLs are correctly configured
- Check browser console for specific error messages

### Subscriptions not showing
- Verify the `subscriptions` table exists in Supabase
- Check Row Level Security policies are set up correctly
- Manually insert a test subscription to verify queries work

### Progress not syncing
- Check that `user_progress` table exists
- Verify the user is authenticated (check console logs)
- Look for errors in browser console during lesson completion

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Stripe Testing Cards](https://stripe.com/docs/testing#cards)
- [React Context API](https://react.dev/reference/react/useContext)

---

## 🎯 Architecture Overview

```
App.tsx (Main Router)
├── AuthProvider (manages user session)
│   └── SubscriptionProvider (manages subscription status)
│       └── LessonProvider (manages lessons & progress)
│           └── Views:
│               ├── Home (SkillTree)
│               ├── Lesson Flow
│               ├── Auth Screen
│               ├── Profile Screen
│               ├── Upgrade Screen
│               └── Paywall Screen
```

### Key Files:
- `src/lib/AuthContext.tsx` - Authentication logic
- `src/lib/SubscriptionContext.tsx` - Subscription logic & paywall
- `src/lib/cloudProgressTracker.ts` - Cloud sync
- `src/lib/progressTracker.ts` - Local storage
- `src/components/screens/` - All UI screens
- `src/App.tsx` - Main app routing logic

---

Good luck with your launch! 🚀

