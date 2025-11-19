/**
 * Email Testing API Route
 * 
 * Preview emails in browser:
 * GET /api/test-emails?template=welcome
 * GET /api/test-emails?template=payment-confirmation
 * GET /api/test-emails?template=renewal-reminder
 * 
 * Send test emails:
 * POST /api/test-emails
 * Body: { template: 'welcome', to: 'test@example.com' }
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WelcomeEmail } from '../src/lib/email/templates/welcome.js';
import { PaymentConfirmationEmail } from '../src/lib/email/templates/payment-confirmation.js';
import { RenewalReminderEmail } from '../src/lib/email/templates/renewal-reminder.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sample test data for each template
const testData = {
  welcome: {
    userName: 'John Doe',
    loginUrl: 'https://optionup.app/dashboard',
  },
  'payment-confirmation': {
    userName: 'John Doe',
    planName: 'Premium Monthly',
    amount: '$9.99',
    billingPeriod: 'monthly',
    nextBillingDate: 'December 13, 2025',
    accountUrl: 'https://optionup.app/account',
  },
  'renewal-reminder': {
    userName: 'John Doe',
    planName: 'Premium',
    renewalDate: 'November 20, 2025',
    renewalAmount: '$9.99',
    manageSubscriptionUrl: 'https://optionup.app/account/subscription',
  },
};

function renderTemplate(template: string): string {
  switch (template) {
    case 'welcome':
      return renderToStaticMarkup(
        React.createElement(WelcomeEmail, testData.welcome)
      );
    case 'payment-confirmation':
      return renderToStaticMarkup(
        React.createElement(PaymentConfirmationEmail, testData['payment-confirmation'])
      );
    case 'renewal-reminder':
      return renderToStaticMarkup(
        React.createElement(RenewalReminderEmail, testData['renewal-reminder'])
      );
    default:
      throw new Error(`Unknown template: ${template}`);
  }
}

function getSubject(template: string): string {
  switch (template) {
    case 'welcome':
      return '🎉 Welcome to your options trading journey!';
    case 'payment-confirmation':
      return '✅ Payment confirmed – Your Options Academy subscription is active';
    case 'renewal-reminder':
      return '📅 Your Options Academy subscription renews in 7 days';
    default:
      return 'Test Email from OptionUp';
  }
}

export default async function handler(req: Request) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const url = new URL(req.url);
  const template = url.searchParams.get('template');

  // GET - Preview email in browser
  if (req.method === 'GET') {
    if (!template) {
      // Show template selector
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Template Tester - OptionUp</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            h1 {
              color: #1a1a1a;
              margin-bottom: 10px;
            }
            p {
              color: #666;
              margin-bottom: 30px;
            }
            .templates {
              display: grid;
              gap: 15px;
            }
            .template-card {
              border: 2px solid #e5e5e5;
              padding: 20px;
              border-radius: 8px;
              text-decoration: none;
              color: inherit;
              display: block;
              transition: all 0.2s;
            }
            .template-card:hover {
              border-color: #2563eb;
              background: #f8fafc;
            }
            .template-card h3 {
              margin: 0 0 8px 0;
              color: #1a1a1a;
            }
            .template-card p {
              margin: 0;
              font-size: 14px;
              color: #666;
            }
            .badge {
              display: inline-block;
              padding: 4px 12px;
              background: #e0e7ff;
              color: #4338ca;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📧 Email Template Tester</h1>
            <p>Select a template to preview:</p>
            <div class="templates">
              <a href="/api/test-emails?template=welcome" class="template-card">
                <h3>🎉 Welcome Email</h3>
                <p>Sent to new users after signup</p>
                <span class="badge">View Preview</span>
              </a>
              <a href="/api/test-emails?template=payment-confirmation" class="template-card">
                <h3>✅ Payment Confirmation</h3>
                <p>Sent after successful subscription payment</p>
                <span class="badge">View Preview</span>
              </a>
              <a href="/api/test-emails?template=renewal-reminder" class="template-card">
                <h3>📅 Renewal Reminder</h3>
                <p>Sent 7 days before subscription renewal</p>
                <span class="badge">View Preview</span>
              </a>
            </div>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      const html = renderTemplate(template);
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Invalid template',
        message: error instanceof Error ? error.message : 'Unknown error',
        availableTemplates: ['welcome', 'payment-confirmation', 'renewal-reminder'],
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // POST - Send test email
  if (req.method === 'POST') {
    const body = await req.json();
    const { template: postTemplate, to } = body;

    if (!postTemplate || !to) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        required: ['template', 'to'],
        availableTemplates: ['welcome', 'payment-confirmation', 'renewal-reminder'],
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({
        error: 'RESEND_API_KEY not configured',
        message: 'Set RESEND_API_KEY in your environment variables',
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      const html = renderTemplate(postTemplate);
      const subject = getSubject(postTemplate);

      const data = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'OptionUp <noreply@optionup.app>',
        to: [to],
        subject,
        html,
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Test email sent successfully',
        template: postTemplate,
        to,
        messageId: data.data?.id || data.id || 'unknown',
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error sending test email:', error);
      return new Response(JSON.stringify({
        error: 'Failed to send test email',
        message: error instanceof Error ? error.message : 'Unknown error',
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

