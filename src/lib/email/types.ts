/**
 * Email-related TypeScript types and interfaces
 */

export type EmailTemplate = 'welcome' | 'payment-confirmation' | 'renewal-reminder';

export interface BaseEmailOptions {
  to: string | string[];
  from?: string;
  subject?: string;
  replyTo?: string;
}

export interface WelcomeEmailOptions extends BaseEmailOptions {
  template: 'welcome';
  props: {
    userName?: string;
    loginUrl?: string;
  };
}

export interface PaymentConfirmationEmailOptions extends BaseEmailOptions {
  template: 'payment-confirmation';
  props: {
    userName?: string;
    planName?: string;
    amount?: string;
    billingPeriod?: 'monthly' | 'yearly';
    nextBillingDate?: string;
    accountUrl?: string;
  };
}

export interface RenewalReminderEmailOptions extends BaseEmailOptions {
  template: 'renewal-reminder';
  props: {
    userName?: string;
    planName?: string;
    renewalDate?: string;
    renewalAmount?: string;
    manageSubscriptionUrl?: string;
  };
}

export type SendEmailOptions =
  | WelcomeEmailOptions
  | PaymentConfirmationEmailOptions
  | RenewalReminderEmailOptions;

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailConfig {
  fromEmail: string;
  fromName?: string;
  replyToEmail?: string;
}

