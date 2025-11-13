/**
 * Next.js API Route: Signup with Welcome Email
 * Handles user signup and sends welcome email
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '../../src/lib/email/send-email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/auth/callback`,
        data: {
          name: name || email.split('@')[0],
        },
      },
    });

    if (error) {
      console.error('Signup error:', error);
      return res.status(400).json({ error: error.message });
    }

    if (data.user) {
      // Send welcome email
      try {
        await sendWelcomeEmail({
          to: data.user.email!,
          userName: data.user.user_metadata?.name || data.user.email!.split('@')[0],
          dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/dashboard`,
        });
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        // Log email error but don't fail the signup
        console.error('Failed to send welcome email:', emailError);
        // Continue with successful signup response
      }

      return res.status(200).json({
        success: true,
        user: data.user,
        session: data.session,
      });
    }

    return res.status(400).json({ error: 'Failed to create user' });
  } catch (error) {
    console.error('Signup API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

