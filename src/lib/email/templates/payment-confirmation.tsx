import React from 'react';

interface PaymentConfirmationEmailProps {
  userName?: string;
  planName?: string;
  amount?: string;
  billingPeriod?: string;
  nextBillingDate?: string;
  accountUrl?: string;
}

export function PaymentConfirmationEmail({
  userName = 'there',
  planName = 'Premium',
  amount = '$9.99',
  billingPeriod = 'monthly',
  nextBillingDate,
  accountUrl = '#',
}: PaymentConfirmationEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Confirmation - OptionUp</title>
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
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px',
                      }}
                    >
                      ✓
                    </div>
                    <h1 style={{ margin: 0, color: '#1a1a1a', fontSize: '28px', fontWeight: 'bold' }}>
                      Payment Confirmed!
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
                      Thank you for your subscription! Your payment has been successfully processed.
                    </p>
                  </td>
                </tr>

                {/* Payment Details */}
                <tr>
                  <td style={{ padding: '0 40px 30px' }}>
                    <table
                      role="presentation"
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#f9fafb',
                        borderRadius: '6px',
                        padding: '20px',
                      }}
                    >
                      <tr>
                        <td style={{ padding: '8px 0', color: '#666666', fontSize: '14px' }}>Plan:</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>
                          {planName}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#666666', fontSize: '14px' }}>Amount:</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>
                          {amount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#666666', fontSize: '14px' }}>Billing Period:</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>
                          {billingPeriod === 'yearly' ? 'Yearly' : 'Monthly'}
                        </td>
                      </tr>
                      {nextBillingDate && (
                        <tr>
                          <td style={{ padding: '8px 0', color: '#666666', fontSize: '14px' }}>Next Billing Date:</td>
                          <td style={{ padding: '8px 0', textAlign: 'right', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>
                            {nextBillingDate}
                          </td>
                        </tr>
                      )}
                    </table>
                  </td>
                </tr>

                {/* Benefits */}
                <tr>
                  <td style={{ padding: '0 40px 30px' }}>
                    <h2 style={{ margin: '0 0 20px', color: '#1a1a1a', fontSize: '20px', fontWeight: '600' }}>
                      You Now Have Access To:
                    </h2>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#333333', fontSize: '16px', lineHeight: '1.8' }}>
                      <li>All 76+ premium lessons</li>
                      <li>Advanced trading strategies</li>
                      <li>Interactive simulations</li>
                      <li>Progress tracking and analytics</li>
                    </ul>
                  </td>
                </tr>

                {/* CTA Button */}
                <tr>
                  <td style={{ padding: '0 40px 30px', textAlign: 'center' }}>
                    <a
                      href={accountUrl}
                      style={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '600',
                      }}
                    >
                      View Your Account
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '30px 40px', borderTop: '1px solid #e5e5e5', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 10px', color: '#666666', fontSize: '14px' }}>
                      Questions? Reply to this email or visit our support center.
                    </p>
                    <p style={{ margin: '0', color: '#999999', fontSize: '12px' }}>
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

