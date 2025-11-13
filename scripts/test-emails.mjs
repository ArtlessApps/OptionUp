#!/usr/bin/env node

/**
 * Email Testing Script (ES Module)
 * 
 * Usage:
 *   node scripts/test-emails.mjs list
 *   node scripts/test-emails.mjs preview-all
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import email templates
const templatesPath = path.join(__dirname, '..', 'src', 'lib', 'email', 'templates');

const templates = {
  welcome: {
    name: 'Welcome Email',
    subject: '🎉 Welcome to your options trading journey!',
    description: 'Sent to new users after signup',
    testData: {
      userName: 'John Doe',
      loginUrl: 'https://optionup.app/dashboard',
    },
  },
  'payment-confirmation': {
    name: 'Payment Confirmation',
    subject: '✅ Payment confirmed – Your Options Academy subscription is active',
    description: 'Sent after successful subscription payment',
    testData: {
      userName: 'John Doe',
      planName: 'Premium Monthly',
      amount: '$9.99',
      billingPeriod: 'monthly',
      nextBillingDate: 'December 13, 2025',
      accountUrl: 'https://optionup.app/account',
    },
  },
  'renewal-reminder': {
    name: 'Renewal Reminder',
    subject: '📅 Your Options Academy subscription renews in 7 days',
    description: 'Sent 7 days before subscription renewal',
    testData: {
      userName: 'John Doe',
      planName: 'Premium',
      renewalDate: 'November 20, 2025',
      renewalAmount: '$9.99',
      manageSubscriptionUrl: 'https://optionup.app/account/subscription',
    },
  },
};

function listTemplates() {
  console.log('\n📧 Available Email Templates:\n');
  Object.entries(templates).forEach(([key, info]) => {
    console.log(`  ${info.name}`);
    console.log(`    Template: ${key}`);
    console.log(`    Subject: ${info.subject}`);
    console.log(`    Description: ${info.description}`);
    console.log('');
  });
}

async function previewAll() {
  console.log('\n📧 Generating email previews...\n');

  const outputDir = path.join(__dirname, '..', 'email-previews');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [key, info] of Object.entries(templates)) {
    try {
      console.log(`  Generating ${info.name}...`);
      
      // Dynamic import of the template
      const templatePath = path.join(templatesPath, `${key}.tsx`);
      
      // Read the template file and generate HTML manually
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
      // Generate a simple HTML preview
      const html = generatePreviewHTML(key, info);
      
      const outputPath = path.join(outputDir, `${key}.html`);
      fs.writeFileSync(outputPath, html);
      
      console.log(`    ✅ Saved to: ${outputPath}`);
    } catch (error) {
      console.error(`    ❌ Failed: ${error.message}`);
    }
  }

  console.log(`\n✅ All previews generated in: ${outputDir}`);
  console.log(`\nOpen them in your browser:\n`);
  Object.keys(templates).forEach(key => {
    console.log(`  file://${path.join(outputDir, key + '.html')}`);
  });
  console.log('');
}

function generatePreviewHTML(templateKey, info) {
  const data = info.testData;
  
  if (templateKey === 'welcome') {
    return generateWelcomeHTML(data);
  } else if (templateKey === 'payment-confirmation') {
    return generatePaymentConfirmationHTML(data);
  } else if (templateKey === 'renewal-reminder') {
    return generateRenewalReminderHTML(data);
  }
}

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

// Main
const [,, command] = process.argv;

if (command === 'list') {
  listTemplates();
} else if (command === 'preview-all') {
  await previewAll();
} else {
  console.log(`
📧 Email Testing Script

Usage:
  node scripts/test-emails.mjs list          List all templates
  node scripts/test-emails.mjs preview-all   Generate HTML previews

`);
}

