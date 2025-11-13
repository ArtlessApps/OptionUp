import React from 'react';

interface RenewalReminderEmailProps {
  userName?: string;
  planName?: string;
  renewalDate?: string;
  renewalAmount?: string;
  manageSubscriptionUrl?: string;
}

export function RenewalReminderEmail({
  userName = 'there',
  planName = 'Premium',
  renewalDate,
  renewalAmount = '$9.99',
  manageSubscriptionUrl = '#',
}: RenewalReminderEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Subscription Renewal Reminder - OptionUp</title>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
        <table
          role="presentation"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f5f5f5',
            padding: '20px',
          }}
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                style={{
                  maxWidth: '600px',
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {/* Header */}
                <tr>
                  <td style={{ padding: '40px 40px 20px', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#f59e0b',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px',
                      }}
                    >
                      ⏰
                    </div>
                    <h1 style={{ margin: 0, color: '#1a1a1a', fontSize: '28px', fontWeight: 'bold' }}>
                      Subscription Renewal Reminder
                    </h1>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ padding: '0 40px 30px' }}>
                    <p style={{ margin: '0 0 20px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                      Hi {userName},
                    </p>
                    <p style={{ margin: '0 0 20px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                      This is a friendly reminder that your {planName} subscription will renew soon.
                    </p>
                    {renewalDate && (
                      <p style={{ margin: '0 0 20px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                        Your subscription will automatically renew on <strong>{renewalDate}</strong>.
                      </p>
                    )}
                  </td>
                </tr>

                {/* Renewal Details */}
                <tr>
                  <td style={{ padding: '0 40px 30px' }}>
                    <table
                      role="presentation"
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fffbeb',
                        border: '1px solid #fcd34d',
                        borderRadius: '6px',
                        padding: '20px',
                      }}
                    >
                      <tr>
                        <td style={{ padding: '8px 0', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                          Renewal Amount:
                        </td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#92400e', fontSize: '18px', fontWeight: 'bold' }}>
                          {renewalAmount}
                        </td>
                      </tr>
                      {renewalDate && (
                        <tr>
                          <td style={{ padding: '8px 0', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                            Renewal Date:
                          </td>
                          <td style={{ padding: '8px 0', textAlign: 'right', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                            {renewalDate}
                          </td>
                        </tr>
                      )}
                    </table>
                  </td>
                </tr>

                {/* Info */}
                <tr>
                  <td style={{ padding: '0 40px 30px' }}>
                    <p style={{ margin: '0 0 20px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                      Your payment method on file will be charged automatically. No action is required if you'd like to
                      continue your subscription.
                    </p>
                    <p style={{ margin: '0 0 20px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                      If you'd like to make any changes to your subscription, you can manage it anytime from your account
                      settings.
                    </p>
                  </td>
                </tr>

                {/* CTA Buttons */}
                <tr>
                  <td style={{ padding: '0 40px 30px', textAlign: 'center' }}>
                    <a
                      href={manageSubscriptionUrl}
                      style={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginRight: '10px',
                      }}
                    >
                      Manage Subscription
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '30px 40px', borderTop: '1px solid #e5e5e5' }}>
                    <p style={{ margin: '0 0 10px', color: '#666666', fontSize: '14px', lineHeight: '1.6' }}>
                      <strong>Questions?</strong> If you have any concerns about your subscription or need assistance,
                      please don't hesitate to reach out to our support team.
                    </p>
                    <p style={{ margin: '20px 0 0', color: '#999999', fontSize: '12px', textAlign: 'center' }}>
                      The OptionUp Team
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

