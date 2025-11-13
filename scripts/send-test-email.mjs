#!/usr/bin/env node

/**
 * Send Test Emails via Resend
 * 
 * Usage:
 *   node scripts/send-test-email.mjs welcome your-email@example.com
 *   node scripts/send-test-email.mjs payment-confirmation your-email@example.com
 *   node scripts/send-test-email.mjs renewal-reminder your-email@example.com
 *   node scripts/send-test-email.mjs all your-email@example.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found');
    console.log('\nCreate a .env.local file with:');
    console.log('RESEND_API_KEY=your_key_here');
    console.log('FROM_EMAIL=OptionUp <noreply@optionup.app>');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
      // Don't overwrite existing environment variables (allows override via env vars)
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });

  return envVars;
}

const env = loadEnv();

if (!env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  process.exit(1);
}

const resend = new Resend(env.RESEND_API_KEY);
// Use Resend's verified test domain for testing
// Prioritize environment variable over .env.local
const fromEmail = process.env.FROM_EMAIL || env.FROM_EMAIL || 'OptionUp <onboarding@resend.dev>';

const templates = {
  welcome: {
    name: 'Welcome Email',
    subject: '🎉 Welcome to your options trading journey!',
    getData: (email) => ({
      userName: email.split('@')[0],
      loginUrl: 'https://optionup.app/dashboard',
    }),
  },
  'payment-confirmation': {
    name: 'Payment Confirmation',
    subject: '✅ Payment confirmed – Your Options Academy subscription is active',
    getData: (email) => ({
      userName: email.split('@')[0],
      planName: 'Premium Monthly',
      amount: '$9.99',
      billingPeriod: 'monthly',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      accountUrl: 'https://optionup.app/account',
    }),
  },
  'renewal-reminder': {
    name: 'Renewal Reminder',
    subject: '📅 Your Options Academy subscription renews in 7 days',
    getData: (email) => ({
      userName: email.split('@')[0],
      planName: 'Premium',
      renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      renewalAmount: '$9.99',
      manageSubscriptionUrl: 'https://optionup.app/account/subscription',
    }),
  },
};

function generateWelcomeHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to OptionUp!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0 0 10px 0; font-size: 32px;">📊 Options Academy</h1>
              <p style="margin: 0; opacity: 0.9;">Learn to trade options like a pro</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hey ${data.userName}! 👋
              </p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Welcome to <strong>Options Academy</strong> – the gamified way to master options trading!
              </p>
              <p style="margin: 0 0 15px; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Here's what happens next:</strong>
              </p>
              <ol style="margin: 0 0 20px; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li><strong>Start with Lesson 1:</strong> "What is a Call Option?" (5 minutes)</li>
                <li><strong>Earn XP & badges</strong> as you progress</li>
                <li><strong>Build your streak</strong> – learn daily to maximize growth</li>
              </ol>
              <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                  <strong>🎯 Your Goal:</strong> Complete 10 fundamental lessons to unlock advanced strategies
                </p>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Start Your First Lesson →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e5e5e5; text-align: center;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">Happy learning!</p>
              <p style="margin: 0; color: #999999; font-size: 12px;">The OptionUp Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generatePaymentConfirmationHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation - OptionUp</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #10b981; border-radius: 50%; margin: 0 auto 20px; line-height: 60px; font-size: 30px; color: white;">✓</div>
              <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: bold;">Payment Confirmed!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">Hi ${data.userName},</p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for your subscription! Your payment has been successfully processed.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Plan:</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.planName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Amount:</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.amount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Billing Period:</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.billingPeriod === 'yearly' ? 'Yearly' : 'Monthly'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Next Billing Date:</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.nextBillingDate}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 20px; font-weight: 600;">You Now Have Access To:</h2>
              <ul style="margin: 0; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li>All 76+ premium lessons</li>
                <li>Advanced trading strategies</li>
                <li>Interactive simulations</li>
                <li>Progress tracking and analytics</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="${data.accountUrl}" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                View Your Account
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e5e5e5; text-align: center;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">Questions? Reply to this email or visit our support center.</p>
              <p style="margin: 0; color: #999999; font-size: 12px;">The OptionUp Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateRenewalReminderHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Renewal Reminder - OptionUp</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #f59e0b; border-radius: 50%; margin: 0 auto 20px; line-height: 60px; font-size: 30px;">⏰</div>
              <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: bold;">Subscription Renewal Reminder</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">Hi ${data.userName},</p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                This is a friendly reminder that your ${data.planName} subscription will renew soon.
              </p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Your subscription will automatically renew on <strong>${data.renewalDate}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">Renewal Amount:</td>
                  <td style="padding: 8px 0; text-align: right; color: #92400e; font-size: 18px; font-weight: bold;">${data.renewalAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">Renewal Date:</td>
                  <td style="padding: 8px 0; text-align: right; color: #92400e; font-size: 14px; font-weight: 600;">${data.renewalDate}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Your payment method on file will be charged automatically. No action is required if you'd like to continue your subscription.
              </p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                If you'd like to make any changes to your subscription, you can manage it anytime from your account settings.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="${data.manageSubscriptionUrl}" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                Manage Subscription
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px; line-height: 1.6;">
                <strong>Questions?</strong> If you have any concerns about your subscription or need assistance, please don't hesitate to reach out to our support team.
              </p>
              <p style="margin: 20px 0 0; color: #999999; font-size: 12px; text-align: center;">The OptionUp Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateHTML(template, data) {
  switch (template) {
    case 'welcome':
      return generateWelcomeHTML(data);
    case 'payment-confirmation':
      return generatePaymentConfirmationHTML(data);
    case 'renewal-reminder':
      return generateRenewalReminderHTML(data);
    default:
      throw new Error(`Unknown template: ${template}`);
  }
}

async function sendEmail(template, to) {
  const config = templates[template];
  
  if (!config) {
    console.error(`❌ Unknown template: ${template}`);
    console.log('\nAvailable templates:', Object.keys(templates).join(', '));
    process.exit(1);
  }

  console.log(`\n📧 Sending ${config.name}...`);
  console.log(`   To: ${to}`);
  console.log(`   Subject: ${config.subject}`);

  const data = config.getData(to);
  const html = generateHTML(template, data);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: config.subject,
      html,
    });

    console.log(`   ✅ Sent successfully!`);
    if (result.data?.id) {
      console.log(`   Message ID: ${result.data.id}\n`);
    } else if (result.id) {
      console.log(`   Message ID: ${result.id}\n`);
    } else {
      console.log(`   Response:`, result, '\n');
    }
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to send: ${error.message}\n`);
    return false;
  }
}

async function sendAll(to) {
  console.log(`\n📧 Sending all test emails to ${to}...\n`);
  
  let success = 0;
  let failed = 0;

  for (const template of Object.keys(templates)) {
    const result = await sendEmail(template, to);
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    // Wait 1 second between sends
    if (template !== Object.keys(templates)[Object.keys(templates).length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n✅ Done! Sent ${success} email(s), ${failed} failed.\n`);
}

// Main
const [,, template, to] = process.argv;

if (!template || !to) {
  console.log(`
📧 Send Test Emails via Resend

Usage:
  node scripts/send-test-email.mjs <template> <email>
  node scripts/send-test-email.mjs all <email>

Templates:
  welcome                     Send welcome email
  payment-confirmation        Send payment confirmation
  renewal-reminder            Send renewal reminder
  all                         Send all emails

Examples:
  node scripts/send-test-email.mjs welcome test@example.com
  node scripts/send-test-email.mjs all test@example.com

Environment:
  RESEND_API_KEY: ${env.RESEND_API_KEY ? '✅ Set' : '❌ Not set'}
  FROM_EMAIL: ${fromEmail}

`);
  process.exit(0);
}

if (template === 'all') {
  await sendAll(to);
} else {
  await sendEmail(template, to);
}

