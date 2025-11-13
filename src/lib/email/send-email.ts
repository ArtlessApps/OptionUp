import { Resend } from 'resend';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WelcomeEmail } from './templates/welcome';
import { PaymentConfirmationEmail } from './templates/payment-confirmation';
import { RenewalReminderEmail } from './templates/renewal-reminder';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'OptionUp <onboarding@resend.dev>',
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
  const html = renderToStaticMarkup(
    React.createElement(WelcomeEmail, {
      userName: params.userName,
      dashboardUrl: params.dashboardUrl,
    })
  );

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
  const html = renderToStaticMarkup(
    React.createElement(PaymentConfirmationEmail, {
      userName: params.userName,
      planName: 'Premium Monthly',
      amount: params.amount,
      billingPeriod: 'monthly',
      nextBillingDate: params.nextBillingDate,
      accountUrl: params.receiptUrl,
    })
  );

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
  const html = renderToStaticMarkup(
    React.createElement(RenewalReminderEmail, {
      userName: params.userName,
      planName: 'Premium',
      renewalDate: params.renewalDate,
      renewalAmount: params.amount,
      manageSubscriptionUrl: params.manageSubscriptionUrl,
    })
  );

  return sendEmail({
    to: params.to,
    subject: '📅 Your Options Academy subscription renews in 7 days',
    html,
  });
}