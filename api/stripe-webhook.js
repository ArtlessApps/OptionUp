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

// Map Stripe subscription statuses to our database statuses
function mapSubscriptionStatus(stripeStatus) {
  const statusMap = {
    'active': 'active',
    'canceled': 'canceled',
    'past_due': 'past_due',
    'trialing': 'trialing',
    'unpaid': 'unpaid',
    'incomplete': 'unpaid', // Map incomplete to unpaid
    'incomplete_expired': 'canceled', // Map expired to canceled
    'paused': 'canceled', // Map paused to canceled
  };
  
  const mappedStatus = statusMap[stripeStatus] || 'none';
  if (!statusMap[stripeStatus]) {
    console.warn(`⚠️ Unknown Stripe status '${stripeStatus}', mapping to 'none'`);
  }
  return mappedStatus;
}

export default async function handler(req, res) {
  console.log('🔔 Webhook received!');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log('📝 Environment check:', {
    hasWebhookSecret: !!webhookSecret,
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_KEY,
  });

  let event;

  try {
    // Get raw body as buffer
    const buf = await buffer(req);
    const body = buf.toString('utf8');
    
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log('✅ Webhook signature verified. Event type:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
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
  console.log('🛒 Processing checkout.session.completed');
  const userId = session.metadata.userId || session.client_reference_id;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  console.log('👤 User ID:', userId);
  console.log('📝 Subscription ID:', subscriptionId);

  if (!userId) {
    console.error('❌ No userId in checkout session');
    return;
  }

  if (!subscriptionId) {
    console.error('❌ No subscriptionId in checkout session');
    return;
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = session.metadata.plan || 'monthly';
  
  console.log('📊 Subscription status from Stripe:', subscription.status);
  console.log('📊 Mapped status for DB:', mapSubscriptionStatus(subscription.status));

  // Create or update subscription in database
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      status: mapSubscriptionStatus(subscription.status),
      plan: plan,
      current_period_end: subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000).toISOString() 
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('❌ Error creating subscription:', JSON.stringify(error, null, 2));
    throw error; // Throw to trigger 500 response
  } else {
    console.log('✅ Subscription created for user:', userId);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdate(subscription) {
  console.log('📦 Processing subscription update/create');
  const userId = subscription.metadata.userId;
  
  console.log('👤 User ID from metadata:', userId);
  console.log('📊 Subscription status from Stripe:', subscription.status);
  console.log('📊 Mapped status for DB:', mapSubscriptionStatus(subscription.status));
  
  if (!userId) {
    console.error('❌ No userId in subscription metadata');
    return;
  }

  const subscriptionData = {
    user_id: userId,
    stripe_customer_id: subscription.customer,
    stripe_subscription_id: subscription.id,
    status: mapSubscriptionStatus(subscription.status),
    plan: subscription.metadata.plan || 'monthly',
    current_period_end: subscription.current_period_end 
      ? new Date(subscription.current_period_end * 1000).toISOString() 
      : null,
    cancel_at_period_end: subscription.cancel_at_period_end || false,
    updated_at: new Date().toISOString(),
  };
  
  console.log('💾 Attempting to upsert subscription:', JSON.stringify(subscriptionData, null, 2));

  // Use upsert to create or update the subscription
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('❌ Error updating subscription:', JSON.stringify(error, null, 2));
    throw error; // Throw to trigger 500 response
  } else {
    console.log('✅ Subscription created/updated for user:', userId);
    console.log('✅ Response data:', data);
  }
}

// Handle subscription cancellation
async function handleSubscriptionDeleted(subscription) {
  console.log('🗑️ Processing subscription deletion');
  const userId = subscription.metadata.userId;
  
  if (!userId) {
    console.error('❌ No userId in subscription metadata');
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
    console.error('❌ Error canceling subscription:', JSON.stringify(error, null, 2));
    throw error;
  } else {
    console.log('✅ Subscription canceled for user:', userId);
  }
}

// Handle successful payment
async function handlePaymentSucceeded(invoice) {
  console.log('💰 Processing payment succeeded');
  const subscriptionId = invoice.subscription;
  
  if (!subscriptionId) {
    console.log('⚠️ No subscription ID in invoice, skipping');
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata.userId;

  if (!userId) {
    console.error('❌ No userId in subscription metadata');
    return;
  }

  // Ensure subscription is active
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_end: subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000).toISOString() 
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('❌ Error updating subscription after payment:', JSON.stringify(error, null, 2));
    throw error;
  } else {
    console.log('✅ Subscription marked active for user:', userId);
  }
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
  console.log('❌ Processing payment failed');
  const subscriptionId = invoice.subscription;
  
  if (!subscriptionId) {
    console.log('⚠️ No subscription ID in invoice, skipping');
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata.userId;

  if (!userId) {
    console.error('❌ No userId in subscription metadata');
    return;
  }

  // Mark subscription as past_due
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('❌ Error updating subscription after failed payment:', JSON.stringify(error, null, 2));
    throw error;
  } else {
    console.log('⚠️ Subscription marked past_due for user:', userId);
  }
}

