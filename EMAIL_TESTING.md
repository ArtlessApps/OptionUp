# Email Testing Guide

This guide explains how to test and preview all email templates in OptionUp.

## 📧 Available Email Templates

1. **Welcome Email** (`welcome`)
   - Sent to new users after signup
   - Subject: "🎉 Welcome to your options trading journey!"

2. **Payment Confirmation** (`payment-confirmation`)
   - Sent after successful subscription payment
   - Subject: "✅ Payment confirmed – Your Options Academy subscription is active"

3. **Renewal Reminder** (`renewal-reminder`)
   - Sent 7 days before subscription renewal
   - Subject: "📅 Your Options Academy subscription renews in 7 days"

---

## 🌐 Method 1: Preview in Browser (Recommended)

### Start your dev server:
```bash
npm run dev
```

### Visit the email tester page:
```
http://localhost:5173/api/test-emails
```

This will show a dashboard where you can click to preview each email template.

### Preview specific template:
```
http://localhost:5173/api/test-emails?template=welcome
http://localhost:5173/api/test-emails?template=payment-confirmation
http://localhost:5173/api/test-emails?template=renewal-reminder
```

---

## 🖥️ Method 2: Command Line Preview

### List all templates:
```bash
node scripts/test-emails.js list
```

### Preview a template (saves to HTML file):
```bash
node scripts/test-emails.js preview welcome
node scripts/test-emails.js preview payment-confirmation
node scripts/test-emails.js preview renewal-reminder
```

This saves HTML files to `email-previews/` that you can open in your browser.

---

## 📨 Method 3: Send Real Test Emails

### Prerequisites:
1. Set your Resend API key:
   ```bash
   export RESEND_API_KEY=re_your_key_here
   ```

2. (Optional) Set custom sender email:
   ```bash
   export FROM_EMAIL="OptionUp <noreply@optionup.app>"
   ```

### Send a single test email:
```bash
node scripts/test-emails.js send welcome your-email@example.com
node scripts/test-emails.js send payment-confirmation your-email@example.com
node scripts/test-emails.js send renewal-reminder your-email@example.com
```

### Send all test emails at once:
```bash
node scripts/test-emails.js send-all your-email@example.com
```

This will send all 3 templates to the specified email address (with 1 second delay between each).

---

## 🧪 Method 4: API Testing with cURL

### Preview in terminal:
```bash
curl http://localhost:5173/api/test-emails?template=welcome
```

### Send test email:
```bash
curl -X POST http://localhost:5173/api/test-emails \
  -H "Content-Type: application/json" \
  -d '{"template": "welcome", "to": "your-email@example.com"}'
```

---

## 🛠️ Customizing Test Data

To modify the sample data used in email previews, edit `api/test-emails.ts`:

```typescript
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
  // ... etc
};
```

---

## 📋 Checklist for Testing Emails

Before deploying to production, test each email template:

- [ ] **Welcome Email**
  - [ ] Preview in browser - layout looks correct
  - [ ] All links work and point to correct URLs
  - [ ] Personalization (userName) displays correctly
  - [ ] Mobile responsive
  - [ ] Send test email and check inbox

- [ ] **Payment Confirmation**
  - [ ] Preview in browser - layout looks correct
  - [ ] Payment details display correctly
  - [ ] All links work
  - [ ] Mobile responsive
  - [ ] Send test email and check inbox

- [ ] **Renewal Reminder**
  - [ ] Preview in browser - layout looks correct
  - [ ] Renewal date and amount display correctly
  - [ ] All links work
  - [ ] Mobile responsive
  - [ ] Send test email and check inbox

---

## 🐛 Troubleshooting

### "Cannot find module" error
Make sure you're running commands from the project root directory.

### "RESEND_API_KEY not configured"
Set the environment variable:
```bash
export RESEND_API_KEY=your_key_here
```

### Emails not sending
1. Check your Resend API key is valid
2. Verify your domain is configured in Resend dashboard
3. Check the API logs for error messages

### Preview shows blank page
1. Make sure your dev server is running (`npm run dev`)
2. Check browser console for errors
3. Verify the template name is correct

---

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Email Best Practices](https://resend.com/docs/knowledge-base/email-best-practices)
- Email template files: `src/lib/email/templates/`
- Send email functions: `src/lib/email/send-email.ts`

