# OptionUp - Complete Setup Guide (Step by Step)

**Start here** if you want to go from where you are now to a fully working app with payments.

---

## 📍 **Where You Are Now**

✅ App is working locally  
✅ Landing page created  
✅ Auth screens created  
✅ Paywall logic implemented  
✅ Backend API code written  

🔲 **What's missing:** Stripe account, Supabase setup, deployment

---

## 🎯 **Phase 1: Set Up Stripe (15 minutes)**

### Step 1.1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign up"
3. Enter your email and create password
4. Verify your email
5. You'll land on the Stripe Dashboard

**You're now in TEST MODE** (see toggle in top right - it should say "Test mode")

---

### Step 1.2: Create Your Products

1. In Stripe Dashboard, click **"Products"** in left sidebar
2. Click **"+ Add product"** button

**Create Product #1 - Monthly:**
- Product name: `OptionUp Monthly`
- Description: `Monthly subscription to OptionUp`
- Pricing model: `Standard pricing`
- Price: `$9.99`
- Billing period: `Recurring` → `Monthly`
- Click **"Add product"**

3. **COPY THE PRICE ID** - looks like `price_1ABC123...`
   - It shows under the price in small gray text
   - Save it somewhere - you'll need it soon

**Create Product #2 - Yearly:**
- Click **"+ Add product"** again
- Product name: `OptionUp Yearly`
- Description: `Annual subscription to OptionUp (save 33%)`
- Pricing model: `Standard pricing`
- Price: `$79.99`
- Billing period: `Recurring` → `Yearly`
- Click **"Add product"**

4. **COPY THIS PRICE ID TOO** - save it with the monthly one

You should now have:
```
Monthly Price ID: price_1ABC123...
Yearly Price ID: price_1XYZ789...
```

---

### Step 1.3: Get Your API Keys

1. In Stripe Dashboard, click **"Developers"** in left sidebar
2. Click **"API keys"**
3. You'll see two keys:

**Publishable key** (starts with `pk_test_`)
- Click "Reveal test key" button
- Copy the entire key
- Save it as: `STRIPE_PUBLISHABLE_KEY`

**Secret key** (starts with `sk_test_`)
- Click "Reveal test key" button
- Copy the entire key
- Save it as: `STRIPE_SECRET_KEY`
- ⚠️ **NEVER share or commit this key!**

---

## 🎯 **Phase 2: Set Up Supabase (20 minutes)**

### Step 2.1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Click "New project"
5. Fill in:
   - Name: `OptionUp`
   - Database Password: (create a strong one - save it!)
   - Region: (choose closest to you)
   - Plan: Free
6. Click "Create new project"
7. Wait ~2 minutes for database to initialize

---

### Step 2.2: Create Database Tables

1. Once ready, click **"SQL Editor"** in left sidebar
2. Click **"+ New query"**
3. **Copy and paste this entire SQL script:**

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

-- RLS Policies for user_progress
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

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

-- RLS Policies for subscriptions
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
```

4. Click **"Run"** button (bottom right)
5. You should see "Success. No rows returned"

---

### Step 2.3: Enable Email Authentication

1. Click **"Authentication"** in left sidebar
2. Click **"Providers"**
3. **Email** should already be enabled (it is by default)
4. If you want Google login:
   - Click on "Google"
   - Toggle "Enable Sign in with Google"
   - Follow instructions to set up Google OAuth
   - (Optional - you can skip this for now)

---

### Step 2.4: Get Your Supabase Credentials

1. Click **"Settings"** (gear icon) in left sidebar
2. Click **"API"**

You need THREE keys:

**Project URL:**
- Under "Project URL" section
- Copy the URL (like `https://abcdefgh.supabase.co`)
- Save as: `SUPABASE_URL`

**anon/public key:**
- Under "Project API keys"
- Find "anon public" key
- Click "Copy" button
- Save as: `SUPABASE_ANON_KEY`

**service_role key:**
- Under "Project API keys"  
- Find "service_role" key
- Click "Reveal" then "Copy"
- Save as: `SUPABASE_SERVICE_KEY`
- ⚠️ **NEVER share or commit this key!**

---

## 🎯 **Phase 3: Configure Local Environment (5 minutes)**

### Step 3.1: Update Your .env File

1. Open `/Users/nickdame/Documents/Documents - MacBook Air (2)/Projects/OptionUp/.env`
2. Replace with your real values:

```bash
# Supabase Configuration (Frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_key_here

# Stripe Configuration (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# API URL (for local testing)
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_APP_ENV=development
```

3. **Save the file**

---

### Step 3.2: Install API Dependencies

Open terminal and run:

```bash
cd "/Users/nickdame/Documents/Documents - MacBook Air (2)/Projects/OptionUp/api"
npm install
cd ..
```

This installs Stripe and Supabase packages for your serverless functions.

---

## 🎯 **Phase 4: Test Locally (10 minutes)**

### Step 4.1: Install Vercel CLI

In terminal:

```bash
npm install -g vercel
```

If you get permission errors, use:

```bash
sudo npm install -g vercel
```

---

### Step 4.2: Login to Vercel

```bash
vercel login
```

- Choose your preferred method (GitHub, email, etc.)
- Complete login in browser
- Return to terminal

---

### Step 4.3: Create Local Environment File for API

Create a new file: `/Users/nickdame/Documents/Documents - MacBook Air (2)/Projects/OptionUp/.env.local`

```bash
# Backend environment variables (for local testing)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
STRIPE_PRICE_ID_YEARLY=price_your_yearly_price_id
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
FRONTEND_URL=http://localhost:3000
```

Fill in with your real values from earlier steps.

---

### Step 4.4: Run Local Dev Server

```bash
cd "/Users/nickdame/Documents/Documents - MacBook Air (2)/Projects/OptionUp"
vercel dev
```

- It will ask "Set up and develop project?"  → **Yes**
- "Which scope?" → Choose your account
- "Link to existing project?" → **No**
- "What's your project's name?" → `optionup`
- "In which directory is your code located?" → `./` (just press Enter)
- "Want to modify these settings?" → **No**

**Wait for it to start...**

You should see:
```
> Ready! Available at http://localhost:3000
```

---

### Step 4.5: Test Your App

1. Open browser to `http://localhost:3000`
2. You should see your landing page
3. Click "Start Learning Free"
4. Sign up with a test email (like `test@example.com`)
5. You should be able to:
   - Browse first 15 lessons
   - Complete lessons (progress saves)
   - Click lesson 16 → See paywall
   - Click "Upgrade" → See pricing screen
6. **Try to subscribe:**
   - Choose a plan
   - Click "Subscribe"
   - You should be redirected to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`
   - Any future date, any CVC
   - Complete payment
7. Check Supabase:
   - Go to Supabase dashboard
   - Click "Table Editor"
   - Click "subscriptions" table
   - You should see your subscription!

---

## 🎯 **Phase 5: Deploy to Production (30 minutes)**

### Step 5.1: Deploy to Vercel

In terminal (make sure you're in project root):

```bash
vercel --prod
```

Wait for deployment to finish. You'll get a URL like:
```
https://optionup-abc123.vercel.app
```

**Copy this URL** - this is your production site!

---

### Step 5.2: Add Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your "optionup" project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar

Add these variables **ONE BY ONE**:

**Frontend Variables:**

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your anon key | Production, Preview, Development |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | Production, Preview, Development |

**Backend Variables:**

| Name | Value | Environment |
|------|-------|-------------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key | Production, Preview, Development |
| `STRIPE_WEBHOOK_SECRET` | (leave blank for now) | Production |
| `STRIPE_PRICE_ID_MONTHLY` | Your monthly price ID | Production, Preview, Development |
| `STRIPE_PRICE_ID_YEARLY` | Your yearly price ID | Production, Preview, Development |
| `SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `SUPABASE_SERVICE_KEY` | Your service role key | Production, Preview, Development |
| `FRONTEND_URL` | Your Vercel URL | Production, Preview, Development |

**How to add each one:**
1. Click "Add Environment Variable"
2. Enter Name (exact spelling matters!)
3. Paste Value
4. Check all three: Production, Preview, Development
5. Click "Save"
6. Repeat for each variable

---

### Step 5.3: Redeploy After Adding Variables

```bash
vercel --prod
```

This redeploys with your new environment variables.

---

### Step 5.4: Set Up Stripe Webhook (Using New Workbench)

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Click **"Developers"** in left sidebar
3. Click **"Workbench"**
4. Click **"Webhooks"** tab
5. Click **"+ Destination"** (or **"+ Add Destination"**)

**Configure the destination:**

**Step 1: Events Configuration**
- **Events From**: Select **"Your account"**
- **Version**: Leave as latest API version (or select your preferred version)
- **Event Types**: Click **"Select event types"** and choose these 6 events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- Click **"Continue"**

**Step 2: Destination Type**
- Select **"Webhook Endpoint"**
- Click **"Continue"**

**Step 3: Endpoint Details**
- **Endpoint URL**: `https://your-vercel-url.vercel.app/api/stripe-webhook`
  - ⚠️ Replace `your-vercel-url` with YOUR actual Vercel URL!
- **Description** (optional): `OptionUp Production Webhook`
- Click **"Create Destination"**

---

### Step 5.5: Get Webhook Signing Secret

1. After creating the destination, you'll be taken to the destination details page
   - OR: Find your webhook destination in the list and click on it
2. Look for the **"Signing secret"** section
3. Click **"Reveal"** (or the eye icon)
4. Copy the secret (starts with `whsec_`)
5. ⚠️ **Keep this secret safe** - you'll need it for the next step!

---

### Step 5.6: Add Webhook Secret to Vercel

1. Back to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `STRIPE_WEBHOOK_SECRET` (or add it if not there)
3. Update value with your webhook secret
4. Select "Production" only
5. Save

---

### Step 5.7: Final Redeploy

```bash
vercel --prod
```

---

## 🎯 **Phase 6: Test Production (15 minutes)**

### Step 6.1: Test Complete Flow

1. **Visit your production URL** (your Vercel URL)
2. **Sign up** with a real email (you'll use this)
3. **Browse free lessons** (1-15)
4. **Try to access lesson 16** → Should show paywall
5. **Click "Upgrade Now"**
6. **Choose a plan** (monthly or yearly)
7. **Click "Subscribe"**
8. **Should redirect to Stripe Checkout**

---

### Step 6.2: Make Test Payment

Use Stripe test card:
- Card number: `4242 4242 4242 4242`
- Expiration: Any future date (like `12/25`)
- CVC: Any 3 digits (like `123`)
- ZIP: Any 5 digits (like `12345`)

Complete the payment.

---

### Step 6.3: Verify Everything Works

**Check #1: Stripe Dashboard**
1. Go to Stripe Dashboard → Customers
2. You should see your customer
3. Click on them → You should see the subscription

**Check #2: Supabase**
1. Go to Supabase Dashboard → Table Editor
2. Click "subscriptions" table
3. You should see a row with:
   - Your user_id
   - status: "active"
   - The Stripe IDs

**Check #3: Your App**
1. Go back to your app
2. Reload the page
3. You should see "⭐ PREMIUM" badge in header
4. You should be able to access lessons 16+

**If all three work → YOU'RE DONE!** 🎉

---

## 🔧 **TROUBLESHOOTING: If Subscription Doesn't Work**

### Problem: Getting 406 Errors from Supabase

If you're seeing `Failed to load resource: the server responded with a status of 406` errors when trying to fetch subscriptions, follow these steps:

#### Step 1: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"** → Click your latest deployment
3. Click **"Functions"** tab → Click **"View Function Logs"**
4. OR click **"Logs"** in the top menu
5. Look for webhook logs after you made the payment
6. Check if you see:
   - ✅ `"Subscription created for user: ..."` = **Webhook is working!**
   - ❌ `"Error creating subscription: ..."` = **See error details**
   - ❌ `"No userId in checkout session"` = **userId not passed correctly**
   - ❌ No logs at all = **Webhook not receiving events**

#### Step 2: Verify ALL Environment Variables

Go to Vercel → Settings → Environment Variables and confirm these are set for **Production**:

- `STRIPE_SECRET_KEY` (starts with `sk_test_`)
- `STRIPE_WEBHOOK_SECRET` (starts with `whsec_`)
- `SUPABASE_URL` (your Supabase project URL)
- `SUPABASE_SERVICE_KEY` (⚠️ the **service_role** key, NOT the anon key!)
- `STRIPE_PRICE_ID_MONTHLY` (starts with `price_`)
- `STRIPE_PRICE_ID_YEARLY` (starts with `price_`)
- `FRONTEND_URL` (your Vercel production URL)

**After changing any variables, you MUST redeploy:**
```bash
vercel --prod
```

#### Step 3: Check Webhook is Receiving Events

1. Go to Stripe Dashboard → Developers → Workbench → Webhooks
2. Click on your webhook destination
3. Scroll down to **"Recent events"** section
4. You should see recent events listed
5. Click on an event to see details:
   - ✅ Status 200 = Success
   - ❌ Status 400/500 = Error (check error message)
   - ❌ No events shown = Webhook never called

#### Step 4: Test Webhook Manually

1. In Stripe Dashboard → Developers → Workbench → Webhooks → Your destination
2. Click **"Test webhook"** button
3. Select `checkout.session.completed` from the dropdown
4. Click **"Send test webhook"**
5. Check if it succeeds
6. Then check Vercel logs for any errors

#### Step 5: Verify Supabase Table & RLS Policies

1. Go to Supabase Dashboard → Table Editor
2. Check if `subscriptions` table exists
3. Go to SQL Editor and run this to check policies:

```sql
SELECT * FROM pg_policies WHERE tablename = 'subscriptions';
```

You should see a policy called `"Users can read own subscription"`. If it's missing, run:

```sql
-- Policy: Users can read their own subscription
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
```

#### Step 6: Clean Up Test Data

If you ran multiple test payments, clean up:

**In Stripe:**
1. Dashboard → Customers → Find your test customer
2. Cancel all active subscriptions
3. Optionally delete the test customer

**In Supabase:**
1. Table Editor → subscriptions table
2. Delete test subscription records (click the trash icon)

**In Your App:**
1. Sign out
2. Clear browser cache/cookies
3. Sign up with a fresh email
4. Try the payment flow again

#### Step 7: Check Browser Console for Detailed Errors

1. Open your app in the browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to **Console** tab
4. Look for red error messages
5. Also check **Network** tab:
   - Filter by "subscriptions"
   - Click on the failed request
   - Look at the **Response** tab for error details

Common 406 error causes:
- **Missing Accept header**: Supabase client expects `Accept: application/json`
- **RLS policy blocking reads**: Make sure the policy exists
- **Wrong API key**: Frontend should use anon key, webhook should use service key
- **Table schema mismatch**: Verify table structure matches the code

#### Step 8: Verify vercel.json Configuration

Check if you have a `vercel.json` file with proper configuration for the webhook:

```json
{
  "functions": {
    "api/stripe-webhook.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

---

## 🎯 **Phase 7: Going Live (When Ready)**

When you're ready to accept real money:

### Step 7.1: Switch Stripe to Live Mode

1. Stripe Dashboard → Toggle "Test mode" to "Live mode" (top right)
2. Recreate your two products in Live mode
3. Get new Price IDs
4. Go to Developers → API Keys
5. Get your LIVE keys (pk_live_ and sk_live_)

### Step 7.2: Update Vercel Environment Variables

1. Update these to LIVE values:
   - `VITE_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `STRIPE_PRICE_ID_MONTHLY` → Live monthly price ID
   - `STRIPE_PRICE_ID_YEARLY` → Live yearly price ID

### Step 7.3: Create Live Webhook

1. In Stripe (Live mode) → Developers → Webhooks
2. Add endpoint with same URL and events
3. Get the LIVE webhook secret
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel

### Step 7.4: Final Deploy

```bash
vercel --prod
```

### Step 7.5: Test With Your Own Card

Make a real purchase to verify everything works!

---

## 📞 **Troubleshooting**

### "Invalid Supabase URL"
- Make sure you copied the FULL URL including `https://`
- Make sure there are no spaces
- Restart dev server after updating .env

### "Webhook signature verification failed"
- Make sure you copied the webhook secret correctly
- Make sure it's added to Vercel environment variables
- Redeploy after adding it

### "Stripe checkout not working"
- Check browser console for errors
- Make sure API environment variables are set in Vercel
- Check Vercel function logs (Dashboard → Deployments → Functions)

### Subscription not appearing in database
- Check Stripe webhook events (Dashboard → Developers → Webhooks → Your webhook)
- Look for errors
- Check Vercel function logs

### Can't access premium content after paying
- Check Supabase subscriptions table - is status "active"?
- Hard refresh browser (Cmd+Shift+R)
- Try logging out and back in

---

## ✅ **Success Checklist**

You're done when you can check ALL of these:

- [ ] Stripe account created
- [ ] Two products created in Stripe (monthly + yearly)
- [ ] Supabase project created
- [ ] Database tables created
- [ ] All environment variables set in .env
- [ ] Local dev server runs (`vercel dev`)
- [ ] Can sign up locally
- [ ] Can make test payment locally
- [ ] Deployed to Vercel production
- [ ] All environment variables added in Vercel
- [ ] Webhook created and configured
- [ ] Can sign up on production
- [ ] Can make test payment on production
- [ ] Subscription appears in Stripe
- [ ] Subscription appears in Supabase
- [ ] Premium content is accessible after payment

---

## 🎉 **You're Live!**

Once all checkboxes are checked, your app is fully functional with real payments!

**Next steps:**
- Replace Stripe test mode with live mode (when ready for real $$$)
- Add custom domain to Vercel
- Start marketing!

**Questions?** Check the DEPLOYMENT.md file for more details!

