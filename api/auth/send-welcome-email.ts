/**
 * Next.js API Route: Send Welcome Email
 * Can be called after successful signup
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail } from '../../src/lib/email/send-email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userName, dashboardUrl } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await sendWelcomeEmail({
      to: email,
      userName: userName || email.split('@')[0],
      dashboardUrl: dashboardUrl || `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/dashboard`,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Welcome email sent successfully',
        messageId: result.data?.id,
      });
    } else {
      return res.status(500).json({
        error: 'Failed to send welcome email',
        details: result.error,
      });
    }
  } catch (error) {
    console.error('Send welcome email error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

