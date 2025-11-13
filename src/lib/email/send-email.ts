import { Resend } from 'resend';
import { welcomeEmailTemplate } from './templates/welcome';
import { paymentConfirmationTemplate } from './templates/payment-confirmation';
import { renewalReminderTemplate } from './templates/renewal-reminder';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'team@yourdomain.com',
      to: [to],
      subject,
      html,
    });
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

// Welcome email
export async function sendWelcomeEmail(params: {
  to: string;
  userName: string;
  dashboardUrl: string;
}) {
  const html = welcomeEmailTemplate({
    userName: params.userName,
    dashboardUrl: params.dashboardUrl,
  });

  return sendEmail({
    to: params.to,
    subject: '🎉 Welcome to your options trading journey!',
    html,
  });
}

// Payment confirmation email
export async function sendPaymentConfirmationEmail(params: {
  to: string;
  userName: string;
  amount: string;
  billingDate: string;
  nextBillingDate: string;
  receiptUrl: string;
  manageSubscriptionUrl: string;
}) {
  const html = paymentConfirmationTemplate(params);

  return sendEmail({
    to: params.to,
    subject: '✅ Payment confirmed – Your Options Academy subscription is active',
    html,
  });
}

// Renewal reminder email
export async function sendRenewalReminderEmail(params: {
  to: string;
  userName: string;
  renewalDate: string;
  amount: string;
  cardLast4: string;
  lessonsCompleted: number;
  currentStreak: number;
  badgesEarned: number;
  updatePaymentUrl: string;
  dashboardUrl: string;
  manageSubscriptionUrl: string;
}) {
  const html = renewalReminderTemplate(params);

  return sendEmail({
    to: params.to,
    subject: '📅 Your Options Academy subscription renews in 7 days',
    html,
  });
}