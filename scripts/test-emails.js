#!/usr/bin/env node

/**
 * Email Testing Script
 * 
 * Usage:
 *   node scripts/test-emails.js preview welcome
 *   node scripts/test-emails.js preview payment-confirmation
 *   node scripts/test-emails.js preview renewal-reminder
 *   node scripts/test-emails.js send welcome your-email@example.com
 *   node scripts/test-emails.js send-all your-email@example.com
 */

const fs = require('fs');
const path = require('path');

const templates = {
  welcome: {
    name: 'Welcome Email',
    subject: '🎉 Welcome to your options trading journey!',
    description: 'Sent to new users after signup',
  },
  'payment-confirmation': {
    name: 'Payment Confirmation',
    subject: '✅ Payment confirmed – Your Options Academy subscription is active',
    description: 'Sent after successful subscription payment',
  },
  'renewal-reminder': {
    name: 'Renewal Reminder',
    subject: '📅 Your Options Academy subscription renews in 7 days',
    description: 'Sent 7 days before subscription renewal',
  },
};

function showUsage() {
  console.log(`
📧 Email Testing Script for OptionUp

Usage:
  node scripts/test-emails.js <command> [options]

Commands:
  list                          List all available email templates
  preview <template>            Preview an email template (saves to HTML file)
  send <template> <email>       Send a test email
  send-all <email>              Send all test emails to an address

Templates:
  - welcome                     Welcome email for new users
  - payment-confirmation        Payment confirmation email
  - renewal-reminder           Subscription renewal reminder

Examples:
  node scripts/test-emails.js list
  node scripts/test-emails.js preview welcome
  node scripts/test-emails.js send welcome test@example.com
  node scripts/test-emails.js send-all test@example.com

Environment Variables:
  RESEND_API_KEY               Required for sending emails
  FROM_EMAIL                   Optional sender email (default: noreply@optionup.app)
`);
}

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

async function previewTemplate(template) {
  if (!templates[template]) {
    console.error(`❌ Unknown template: ${template}`);
    console.log('\nAvailable templates:', Object.keys(templates).join(', '));
    process.exit(1);
  }

  console.log(`\n📧 Previewing ${templates[template].name}...\n`);

  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/test-emails?template=${template}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const outputDir = path.join(__dirname, '..', 'email-previews');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${template}.html`);
    fs.writeFileSync(outputPath, html);

    console.log(`✅ Preview saved to: ${outputPath}`);
    console.log(`\nOpen in browser: file://${outputPath}\n`);
  } catch (error) {
    console.error('❌ Failed to preview template:', error.message);
    console.log('\nMake sure your API server is running on http://localhost:3000');
    process.exit(1);
  }
}

async function sendTestEmail(template, to) {
  if (!templates[template]) {
    console.error(`❌ Unknown template: ${template}`);
    console.log('\nAvailable templates:', Object.keys(templates).join(', '));
    process.exit(1);
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY environment variable is not set');
    console.log('\nSet it with: export RESEND_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log(`\n📧 Sending ${templates[template].name} to ${to}...\n`);

  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/test-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ template, to }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(`✅ Email sent successfully!`);
      console.log(`   Template: ${template}`);
      console.log(`   To: ${to}`);
      console.log(`   Message ID: ${result.messageId}\n`);
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    console.log('\nMake sure:');
    console.log('1. Your API server is running');
    console.log('2. RESEND_API_KEY is set correctly');
    console.log('3. FROM_EMAIL is configured\n');
    process.exit(1);
  }
}

async function sendAllEmails(to) {
  console.log(`\n📧 Sending all test emails to ${to}...\n`);
  
  for (const template of Object.keys(templates)) {
    await sendTestEmail(template, to);
    // Wait 1 second between sends to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('✅ All emails sent!\n');
}

// Main
const [,, command, ...args] = process.argv;

(async () => {
  switch (command) {
    case 'list':
      listTemplates();
      break;
    
    case 'preview':
      if (!args[0]) {
        console.error('❌ Template name required');
        showUsage();
        process.exit(1);
      }
      await previewTemplate(args[0]);
      break;
    
    case 'send':
      if (!args[0] || !args[1]) {
        console.error('❌ Template name and email address required');
        showUsage();
        process.exit(1);
      }
      await sendTestEmail(args[0], args[1]);
      break;
    
    case 'send-all':
      if (!args[0]) {
        console.error('❌ Email address required');
        showUsage();
        process.exit(1);
      }
      await sendAllEmails(args[0]);
      break;
    
    default:
      showUsage();
      break;
  }
})();

