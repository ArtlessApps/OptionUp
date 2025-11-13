import { buffer } from 'micro';
import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentConfirmationEmail, sendRenewalReminderEmail } from '@/lib/email/send-email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service key for admin access
);

// Disable body parsing, need raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log('Received webhook event:', event.type);

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Get customer details
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer;
        
        // Get user from Supabase using customer email
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('email', customer.email)
          .single();

        if (user) {
          await sendPaymentConfirmationEmail({
            to: user.email,
            userName: user.name || user.email.split('@')[0],
            amount: (invoice.amount_paid / 100).toFixed(2),
            billingDate: new Date(invoice.created * 1000).toLocaleDateString(),
            nextBillingDate: invoice.next_payment_attempt 
              ? new Date(invoice.next_payment_attempt * 1000).toLocaleDateString()
              : 'N/A',
            receiptUrl: invoice.hosted_invoice_url || '',
            manageSubscriptionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account/subscription`,
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Send payment failed email
        // TODO: Implement sendPaymentFailedEmail
        console.log('Payment failed for invoice:', invoice.id);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Check if renewal is coming up (7 days before)
        const renewalDate = new Date(subscription.current_period_end * 1000);
        const today = new Date();
        const daysUntilRenewal = Math.floor((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilRenewal === 7) {
          // Get customer and user details
          const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
          
          const { data: user } = await supabase
            .from('users')
            .select('*, user_progress(*)')
            .eq('email', customer.email)
            .single();

          if (user) {
            const paymentMethod = await stripe.paymentMethods.retrieve(
              subscription.default_payment_method as string
            );

            await sendRenewalReminderEmail({
              to: user.email,
              userName: user.name || user.email.split('@')[0],
              renewalDate: renewalDate.toLocaleDateString(),
              amount: ((subscription.items.data[0].price.unit_amount || 0) / 100).toFixed(2),
              cardLast4: paymentMethod.card?.last4 || '****',
              lessonsCompleted: user.user_progress?.lessons_completed || 0,
              currentStreak: user.user_progress?.current_streak || 0,
              badgesEarned: user.user_progress?.badges_earned || 0,
              updatePaymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account/payment`,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
              manageSubscriptionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account/subscription`,
            });
          }
        }
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
}