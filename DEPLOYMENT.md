# Deployment Guide - OptionUp

## 🚀 Deploy to Vercel (Recommended)

Vercel has the best support for Vite + Serverless Functions.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? optionup
# - In which directory is your code located? ./
# - Want to override settings? No
```

### Step 4: Set Environment Variables in Vercel

Go to your project dashboard → Settings → Environment Variables

Add these variables:

**Production:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_PRICE_ID_YEARLY=price_...
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...
FRONTEND_URL=https://your-app.vercel.app
```

**For Frontend (also in Vercel):**
```
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Step 5: Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe-webhook`
3. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret
5. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

### Step 6: Redeploy

```bash
vercel --prod
```

---

## 🧪 Test Locally with Stripe

### Install Dependencies

```bash
# Install API dependencies
cd api
npm install
cd ..
```

### Run with Vercel Dev Server

```bash
# This runs both frontend and API functions
vercel dev
```

Your app will be at `http://localhost:3000` with API at `http://localhost:3000/api/*`

### Test Stripe Webhooks Locally

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```
4. Copy the webhook signing secret it prints
5. Add to your `.env` as `STRIPE_WEBHOOK_SECRET`

---

## 📋 Pre-Deployment Checklist

### Stripe Setup
- [ ] Created products in Stripe Dashboard
  - [ ] Monthly plan: $9.99/month
  - [ ] Yearly plan: $79.99/year
- [ ] Copied Price IDs
- [ ] Set up webhook endpoint
- [ ] Tested with test cards

### Supabase Setup
- [ ] Created tables (user_progress, subscriptions)
- [ ] Set up RLS policies
- [ ] Got service role key (for backend)
- [ ] Enabled Email auth
- [ ] (Optional) Configured Google OAuth

### Environment Variables
- [ ] All Vercel env vars set
- [ ] Frontend env vars set
- [ ] Webhook secret configured
- [ ] Frontend URL points to production

### Testing
- [ ] Can sign up
- [ ] Can sign in
- [ ] Progress saves
- [ ] Paywall works
- [ ] Upgrade flow redirects to Stripe
- [ ] Payment succeeds
- [ ] Subscription appears in database
- [ ] Premium content unlocks

---

## 🔄 Continuous Deployment

Once set up, every push to your main branch will auto-deploy:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will:
1. Build your frontend
2. Deploy serverless functions
3. Update your production site
4. Show you a preview URL

---

## 🐛 Troubleshooting

### API not working
- Check Vercel function logs: Dashboard → Deployments → [Latest] → Functions
- Verify environment variables are set
- Check CORS headers in API functions

### Stripe webhook not firing
- Verify webhook URL in Stripe Dashboard
- Check webhook signing secret matches
- Look at Stripe Dashboard → Developers → Webhooks → [Your webhook] → Events

### Subscriptions not updating
- Check Vercel function logs
- Verify Supabase service key has permissions
- Check RLS policies allow service key writes

### Frontend not connecting to API
- Verify `VITE_API_URL` is set (or defaults to `/api`)
- Check network tab for API calls
- Ensure CORS is enabled in API functions

---

## 💰 Going Live

### Switch to Live Mode

1. **Stripe:**
   - Toggle from Test mode to Live mode
   - Update env vars with `pk_live_...` and `sk_live_...`
   - Recreate products and get new Price IDs
   - Set up production webhook

2. **Supabase:**
   - Already in production
   - No changes needed

3. **Vercel:**
   - Update environment variables to live keys
   - Redeploy: `vercel --prod`

### Launch Checklist
- [ ] Test with real credit card (your own)
- [ ] Verify subscription appears in Stripe
- [ ] Confirm access is granted
- [ ] Test cancellation flow
- [ ] Set up Stripe customer portal for self-serve management

---

## 📈 Monitoring

### Key Metrics to Watch
- Conversion rate (signups → paid)
- Churn rate (cancellations)
- Failed payments
- API errors
- Page load times

### Tools
- **Vercel Analytics:** Built-in performance monitoring
- **Stripe Dashboard:** Revenue, subscriptions, failed payments
- **Supabase:** Database queries, auth metrics

---

## 🆘 Support

If you run into issues:
1. Check Vercel function logs
2. Check Stripe webhook events
3. Check Supabase logs
4. Check browser console

Common fixes:
- Clear cache: `vercel --prod --force`
- Rebuild: `rm -rf .vercel && vercel`
- Check env vars: Vercel Dashboard → Settings → Environment Variables

---

Good luck with your launch! 🎉

