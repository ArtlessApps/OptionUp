/**
 * Stripe Webhook Handler
 * Handles subscription events from Stripe
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for admin access
);

// Disable body parsing, need raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Get raw body as buffer
    const buf = await buffer(req);
    const body = buf.toString('utf8');
    
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Handle successful checkout
async function handleCheckoutCompleted(session) {
  const userId = session.metadata.userId || session.client_reference_id;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  if (!userId) {
    console.error('No userId in checkout session');
    return;
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = session.metadata.plan || 'monthly';

  // Create or update subscription in database
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      status: subscription.status,
      plan: plan,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating subscription:', error);
  } else {
    console.log('Subscription created for user:', userId);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdate(subscription) {
  const userId = subscription.metadata.userId;
  
  if (!userId) {
    console.error('No userId in subscription metadata');
    return;
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating subscription:', error);
  } else {
    console.log('Subscription updated for user:', userId);
  }
}

// Handle subscription cancellation
async function handleSubscriptionDeleted(subscription) {
  const userId = subscription.metadata.userId;
  
  if (!userId) {
    console.error('No userId in subscription metadata');
    return;
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error canceling subscription:', error);
  } else {
    console.log('Subscription canceled for user:', userId);
  }
}

// Handle successful payment
async function handlePaymentSucceeded(invoice) {
  const subscriptionId = invoice.subscription;
  
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata.userId;

  if (!userId) return;

  // Ensure subscription is active
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating subscription after payment:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
  const subscriptionId = invoice.subscription;
  
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata.userId;

  if (!userId) return;

  // Mark subscription as past_due
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating subscription after failed payment:', error);
  }
}

