/**
 * Vercel Serverless Function: Send Welcome Email
 * Can be called after successful signup
 */

import { sendWelcomeEmail } from '../../src/lib/email/send-email.js';

export default async function handler(req: Request) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await req.json();
    const { email, userName, dashboardUrl } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const result = await sendWelcomeEmail({
      to: email,
      userName: userName || email.split('@')[0],
      dashboardUrl: dashboardUrl || `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/dashboard`,
    });

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Welcome email sent successfully',
        messageId: result.data?.id || (result.data as any)?.id || 'unknown',
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } else {
      return new Response(JSON.stringify({
        error: 'Failed to send welcome email',
        details: result.error,
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    console.error('Send welcome email error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
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

